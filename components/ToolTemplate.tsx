'use client';

// components/ToolTemplate.tsx
import { useState, useCallback, useEffect } from 'react';
import ImageCompare from '@/components/ImageCompare';
import WasmErrorBoundary from '@/components/WasmErrorBoundary';
import { compressJpegLocal, compressPngLocal, compressWebpLocal } from '@/lib/local-compressor';
import { resizeImageLocal } from '@/lib/resize-local';
import { compressSvgFileLocal } from '@/lib/svg-compress-local';
import { convertLocal } from '@/lib/convert-local';
import { useCompressionWorker, MAX_FILE_SIZE_BYTES } from '@/lib/use-compression-worker';

interface Props {
    format: string;
    apiEndpoint: string;
    lang: string;
    translations: Record<string, string>;
    acceptType?: string;
}

const SIZE_ERROR_MESSAGES: Record<string, string> = {
    en: `File is too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.`,
    ru: `Файл слишком большой. Максимальный размер — ${MAX_FILE_SIZE_BYTES / 1024 / 1024} МБ.`,
    de: `Datei zu groß. Maximale Größe: ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.`,
    fr: `Fichier trop volumineux. Taille maximale : ${MAX_FILE_SIZE_BYTES / 1024 / 1024} Mo.`,
    es: `Archivo demasiado grande. Tamaño máximo: ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.`,
    pt: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.`,
};

interface ResultItem {
    name: string;
    idx: number;
    error?: string;
    blob?: Blob;
    originalSize: number;
    compressedSize?: number;
    percent?: number;
    previewUrl?: string;
    downloadUrl?: string;
}

function ToolTemplateInner({ format, apiEndpoint, lang, translations, acceptType }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const [results, setResults] = useState<ResultItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quality, setQuality] = useState(80);
    const [dragOver, setDragOver] = useState(false);
    const [originalPreviewUrls, setOriginalPreviewUrls] = useState<Record<string, string>>({});
    const [workerAvailable, setWorkerAvailable] = useState(true);

    const { runTask, terminate } = useCompressionWorker();

    // Определяем доступность Worker при монтировании
    useEffect(() => {
        setWorkerAvailable(typeof window !== 'undefined' && 'Worker' in window);
        return () => terminate();
    }, [terminate]);

    const formatBytes = (bytes: number) => {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const validateFiles = (incoming: File[]): { valid: File[]; sizeError: string | null } => {
        const oversized = incoming.filter(f => f.size > MAX_FILE_SIZE_BYTES);
        if (oversized.length > 0) {
            const msg = SIZE_ERROR_MESSAGES[lang] ?? SIZE_ERROR_MESSAGES.en;
            return { valid: incoming.filter(f => f.size <= MAX_FILE_SIZE_BYTES), sizeError: msg };
        }
        return { valid: incoming, sizeError: null };
    };

    const applyFiles = (incoming: File[]) => {
        const { valid, sizeError } = validateFiles(incoming);
        if (valid.length === 0) {
            setError(sizeError);
            return;
        }
        setFiles(valid);
        setResults([]);
        setError(sizeError); // показываем предупреждение даже если часть файлов допустима
        const urls: Record<string, string> = {};
        valid.forEach((f, i) => { urls[i.toString()] = URL.createObjectURL(f); });
        setOriginalPreviewUrls(urls);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = Array.from(e.dataTransfer.files);
        if (dropped.length > 0) applyFiles(dropped);
    }, [quality, lang]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files ? Array.from(e.target.files) : [];
        if (selected.length > 0) applyFiles(selected);
    };

    // ---------------------------------------------------------------------------
    // Определяем тип задачи для воркера
    // ---------------------------------------------------------------------------
    const getWorkerTaskType = (): 'compress-jpeg' | 'compress-png' | 'compress-webp' | 'convert' | null => {
        if (apiEndpoint.includes('/compress/jpeg') || apiEndpoint.includes('/compress/jpg')) return 'compress-jpeg';
        if (apiEndpoint.includes('/compress/png')) return 'compress-png';
        if (apiEndpoint.includes('/compress/webp')) return 'compress-webp';
        if (apiEndpoint.includes('/convert/')) return 'convert';
        return null;
    };

    // ---------------------------------------------------------------------------
    // Fallback — старая синхронная обработка (PNG, SVG, resize, server API)
    // ---------------------------------------------------------------------------
    const processOneFallback = async (file: File, idx: number): Promise<ResultItem> => {
        if (apiEndpoint.includes('/compress/jpeg') || apiEndpoint.includes('/compress/jpg')) {
            const r = await compressJpegLocal(file, quality);
            const url = URL.createObjectURL(r.blob);
            return { ...r, percent: r.compressionPercent, previewUrl: url, downloadUrl: url, name: file.name, idx };
        }
        if (apiEndpoint.includes('/compress/png')) {
            const r = await compressPngLocal(file);
            const url = URL.createObjectURL(r.blob);
            return { ...r, percent: r.compressionPercent, previewUrl: url, downloadUrl: url, name: file.name, idx };
        }
        if (apiEndpoint.includes('/compress/webp')) {
            const r = await compressWebpLocal(file, quality / 100);
            const url = URL.createObjectURL(r.blob);
            return { ...r, percent: r.compressionPercent, previewUrl: url, downloadUrl: url, name: file.name, idx };
        }
        if (apiEndpoint.includes('/compress/svg')) {
            const blob = await compressSvgFileLocal(file);
            const url = URL.createObjectURL(blob);
            return { blob, originalSize: file.size, compressedSize: blob.size, percent: file.size > 0 ? 100 - (blob.size / file.size * 100) : 0, previewUrl: url, downloadUrl: url, name: file.name, idx };
        }
        if (apiEndpoint.includes('/resize')) {
            const r = await resizeImageLocal(file, 1920, 1080, file.type, quality / 100);
            const url = URL.createObjectURL(r.blob);
            return { blob: r.blob, originalSize: file.size, compressedSize: r.blob.size, percent: file.size > 0 ? 100 - (r.blob.size / file.size * 100) : 0, previewUrl: url, downloadUrl: url, name: file.name, idx };
        }
        if (apiEndpoint.includes('/convert/')) {
            const r = await convertLocal(file, format || 'jpg', quality / 100);
            const url = URL.createObjectURL(r.blob);
            return { blob: r.blob, originalSize: r.originalSize, compressedSize: r.convertedSize, percent: r.originalSize > 0 ? 100 - (r.convertedSize / r.originalSize * 100) : 0, previewUrl: url, downloadUrl: url, name: file.name, idx };
        }
        // Server API fallback
        const fd = new FormData();
        fd.append('files', file);
        fd.append('quality', String(quality));
        const res = await fetch(apiEndpoint, { method: 'POST', body: fd });
        if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error((e as any).error || 'Server error'); }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        return { blob, originalSize: Number(res.headers.get('X-Original-Size')) || file.size, compressedSize: Number(res.headers.get('X-Compressed-Size')) || blob.size, percent: Number(res.headers.get('X-Compression-Percent')) || 0, previewUrl: url, downloadUrl: url, name: file.name, idx };
    };

    // ---------------------------------------------------------------------------
    // Основная обработка — сначала пробуем Worker, при неудаче — fallback
    // ---------------------------------------------------------------------------
    const processOne = async (file: File, idx: number): Promise<ResultItem> => {
        // SVG и resize не поддерживаются воркером — сразу fallback
        if (apiEndpoint.includes('/compress/svg') || apiEndpoint.includes('/resize')) {
            return processOneFallback(file, idx);
        }

        const taskType = getWorkerTaskType();
        if (workerAvailable && taskType) {
            try {
                const result = await runTask({
                    type: taskType,
                    file,
                    quality,
                    outputFormat: format,
                });

                if (result.status === 'error') {
                    // Если воркер упал — пробуем fallback на главном потоке
                    console.warn('[ToolTemplate] Worker failed, falling back:', result.message);
                    return processOneFallback(file, idx);
                }

                const url = URL.createObjectURL(result.blob!);
                return {
                    name: result.name,
                    idx,
                    blob: result.blob,
                    originalSize: result.originalSize,
                    compressedSize: result.compressedSize,
                    percent: result.compressionPercent,
                    previewUrl: url,
                    downloadUrl: url,
                };
            } catch {
                // Worker недоступен — fallback
                return processOneFallback(file, idx);
            }
        }

        return processOneFallback(file, idx);
    };

    const handleSubmit = async () => {
        if (files.length === 0) return;
        setLoading(true);
        setError(null);
        setResults([]);
        const out: ResultItem[] = [];
        for (let i = 0; i < files.length; i++) {
            try {
                const r = await processOne(files[i], i);
                out.push(r);
            } catch (e: any) {
                out.push({ name: files[i].name, error: e.message, idx: i, originalSize: files[i].size });
            }
        }
        setResults(out);
        setLoading(false);
    };

    const totalOriginal = results.reduce((s, r) => s + (r.originalSize || 0), 0);
    const totalCompressed = results.reduce((s, r) => s + (r.compressedSize || 0), 0);
    const totalPercent = totalOriginal > 0 ? Math.round(100 - (totalCompressed / totalOriginal * 100)) : 0;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Dropzone */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${files.length > 0 ? 'bg-green-50 border-green-300' : ''}`}
                onClick={() => document.getElementById('fileInput')?.click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept={acceptType || 'image/*'}
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                />
                {files.length > 0 ? (
                    <div>
                        <p className="text-4xl mb-2">📄</p>
                        <p className="font-medium text-lg">{files.length} file(s)</p>
                        <p className="text-xs text-blue-500 mt-2">Click to change</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-4xl mb-3">📁</p>
                        <p className="font-medium text-lg">{translations['drop'] || 'Drop files here'}</p>
                        <p className="text-sm text-gray-500 mt-2">{translations['orClick'] || 'or click to browse'}</p>
                        <p className="text-xs text-gray-400 mt-3">
                            Max {MAX_FILE_SIZE_BYTES / 1024 / 1024} MB per file
                        </p>
                    </div>
                )}
            </div>

            {/* Quality slider */}
            <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                    {translations['quality'] || 'Quality'}: <strong>{quality}%</strong>
                </label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{translations['smallerFile'] || 'Smaller file'}</span>
                    <span>{translations['betterQuality'] || 'Better quality'}</span>
                </div>
            </div>

            {/* Worker status badge */}
            {!workerAvailable && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                    </svg>
                    Processing on main thread (Web Workers not supported in this browser).
                </div>
            )}

            {/* Submit */}
            <button
                onClick={handleSubmit}
                disabled={files.length === 0 || loading}
                className={`mt-6 w-full py-3 rounded-lg text-white font-medium text-lg transition-colors
          ${files.length === 0 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
                        {translations['compressing'] || 'Processing...'}
          </span>
                ) : (
                    translations['compress'] || 'Process Now'
                )}
            </button>

            {/* Error */}
            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="mt-6 space-y-4">
                    {results.length > 1 && (
                        <div className="p-4 bg-white border rounded-xl shadow-sm">
                            <p className="font-semibold text-center mb-3">✅ {translations['done'] || 'Complete!'}</p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">{translations['original'] || 'Original'}</p>
                                    <p className="text-lg font-bold">{formatBytes(totalOriginal)}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">{translations['compressed'] || 'Result'}</p>
                                    <p className="text-lg font-bold">{formatBytes(totalCompressed)}</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">{translations['saved'] || 'Saved'}</p>
                                    <p className="text-lg font-bold text-green-600">-{totalPercent}%</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {results.map((r, i) => (
                        <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-sm truncate flex-1">{r.name}</p>
                                {r.error ? (
                                    <span className="text-red-500 text-xs ml-2 shrink-0">❌ {r.error}</span>
                                ) : (
                                    <span className="text-green-600 text-xs font-bold ml-2 shrink-0">
                    -{Math.round(r.percent || 0)}%
                  </span>
                                )}
                            </div>
                            {r.previewUrl && originalPreviewUrls[r.idx] && (
                                <div className="mb-3">
                                    <ImageCompare
                                        leftImage={originalPreviewUrls[r.idx]}
                                        rightImage={r.previewUrl}
                                        leftLabel={translations['before'] || 'Before'}
                                        rightLabel={translations['after'] || 'After'}
                                    />
                                </div>
                            )}
                            {!r.error && (
                                <>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                                        <div><span className="text-gray-400">{formatBytes(r.originalSize)}</span></div>
                                        <div><span className="text-gray-400">{formatBytes(r.compressedSize || 0)}</span></div>
                                        <div><span className="text-green-600 font-bold">-{Math.round(r.percent || 0)}%</span></div>
                                    </div>
                                    <a
                                        href={r.downloadUrl}
                                        download={r.name}
                                        className="block w-full text-center py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                                    >
                                        📥 {translations['download'] || 'Download'}
                                    </a>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Оборачиваем в ErrorBoundary — экспортируем именно его
export default function ToolTemplate(props: Props) {
    return (
        <WasmErrorBoundary lang={props.lang}>
            <ToolTemplateInner {...props} />
        </WasmErrorBoundary>
    );
}
