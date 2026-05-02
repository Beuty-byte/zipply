'use client';

import { useState, useCallback } from 'react';
import ImageCompare from '@/components/ImageCompare';
import { compressJpegLocal, compressPngLocal, compressWebpLocal } from '@/lib/local-compressor';
import { resizeImageLocal } from '@/lib/resize-local';
import { compressSvgFileLocal } from '@/lib/svg-compress-local';
import { convertLocal } from '@/lib/convert-local';

interface Props {
    format: string;
    apiEndpoint: string;
    lang: string;
    translations: Record<string, string>;
    acceptType?: string;
}

export default function ToolTemplate({ format, apiEndpoint, lang, translations, acceptType }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quality, setQuality] = useState(80);
    const [dragOver, setDragOver] = useState(false);
    const [originalPreviewUrls, setOriginalPreviewUrls] = useState<Record<string, string>>({});

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = Array.from(e.dataTransfer.files);
        if (dropped.length > 0) {
            setFiles(dropped);
            setResults([]);
            setError(null);
            const urls: Record<string, string> = {};
            dropped.forEach((f, i) => { urls[i.toString()] = URL.createObjectURL(f); });
            setOriginalPreviewUrls(urls);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files ? Array.from(e.target.files) : [];
        if (selected.length > 0) {
            setFiles(selected);
            setResults([]);
            setError(null);
            const urls: Record<string, string> = {};
            selected.forEach((f, i) => { urls[i.toString()] = URL.createObjectURL(f); });
            setOriginalPreviewUrls(urls);
        }
    };

    const formatBytes = (bytes: number) => {
        if (!bytes || bytes === 0) return '0 KB';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const processOne = async (file: File, idx: number): Promise<any> => {
        if (apiEndpoint.includes('/compress/jpeg') || apiEndpoint.includes('/compress/jpg')) {
            try { const r = await compressJpegLocal(file, quality); return { ...r, previewUrl: URL.createObjectURL(r.blob), downloadUrl: URL.createObjectURL(r.blob), name: file.name, idx }; } catch {}
        }
        if (apiEndpoint.includes('/compress/png')) {
            try { const r = await compressPngLocal(file); return { ...r, previewUrl: URL.createObjectURL(r.blob), downloadUrl: URL.createObjectURL(r.blob), name: file.name, idx }; } catch {}
        }
        if (apiEndpoint.includes('/compress/webp')) {
            try { const r = await compressWebpLocal(file, quality / 100); return { ...r, previewUrl: URL.createObjectURL(r.blob), downloadUrl: URL.createObjectURL(r.blob), name: file.name, idx }; } catch {}
        }
        if (apiEndpoint.includes('/compress/svg')) {
            try { const blob = await compressSvgFileLocal(file); const url = URL.createObjectURL(blob); return { blob, originalSize: file.size, compressedSize: blob.size, percent: file.size > 0 ? 100 - (blob.size / file.size * 100) : 0, previewUrl: url, downloadUrl: url, name: file.name, idx }; } catch {}
        }
        if (apiEndpoint.includes('/resize')) {
            try { const r = await resizeImageLocal(file, 1920, 1080, file.type, quality / 100); const url = URL.createObjectURL(r.blob); return { blob: r.blob, originalSize: file.size, compressedSize: r.blob.size, percent: file.size > 0 ? 100 - (r.blob.size / file.size * 100) : 0, previewUrl: url, downloadUrl: url, name: file.name, idx }; } catch {}
        }
        if (apiEndpoint.includes('/convert/')) {
            try { const r = await convertLocal(file, format || 'jpg', quality / 100); const url = URL.createObjectURL(r.blob); return { blob: r.blob, originalSize: r.originalSize, compressedSize: r.convertedSize, percent: r.originalSize > 0 ? 100 - (r.convertedSize / r.originalSize * 100) : 0, previewUrl: url, downloadUrl: url, name: file.name, idx }; } catch {}
        }

        const fd = new FormData();
        fd.append('files', file);
        fd.append('quality', String(quality));
        const res = await fetch(apiEndpoint, { method: 'POST', body: fd });
        if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Server error'); }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        return { blob, originalSize: Number(res.headers.get('X-Original-Size')) || file.size, compressedSize: Number(res.headers.get('X-Compressed-Size')) || blob.size, percent: Number(res.headers.get('X-Compression-Percent')) || 0, previewUrl: url, downloadUrl: url, name: file.name, idx };
    };

    const handleSubmit = async () => {
        if (files.length === 0) return;
        setLoading(true);
        setError(null);
        setResults([]);
        const out: any[] = [];
        for (let i = 0; i < files.length; i++) {
            try { const r = await processOne(files[i], i); out.push(r); } catch (e: any) { out.push({ name: files[i].name, error: e.message, idx: i }); }
        }
        setResults(out);
        setLoading(false);
    };

    const totalOriginal = results.reduce((s, r) => s + (r.originalSize || 0), 0);
    const totalCompressed = results.reduce((s, r) => s + (r.compressedSize || 0), 0);
    const totalPercent = totalOriginal > 0 ? Math.round(100 - (totalCompressed / totalOriginal * 100)) : 0;

    return (
        <div className="max-w-2xl mx-auto">
            <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                 className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} ${files.length > 0 ? 'bg-green-50 border-green-300' : ''}`}
                 onClick={() => document.getElementById('fileInput')?.click()}>
                <input id="fileInput" type="file" accept={acceptType || 'image/*'} onChange={handleFileSelect} className="hidden" multiple />
                {files.length > 0 ? (
                    <div><p className="text-4xl mb-2">📄</p><p className="font-medium text-lg">{files.length} file(s)</p><p className="text-xs text-blue-500 mt-2">Click to change</p></div>
                ) : (
                    <div><p className="text-4xl mb-3">📁</p><p className="font-medium text-lg">{translations['drop'] || 'Drop files here'}</p><p className="text-sm text-gray-500 mt-2">{translations['orClick'] || 'or click to browse'}</p></div>
                )}
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium mb-2">{translations['quality'] || 'Quality'}: <strong>{quality}%</strong></label>
                <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg accent-blue-600" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>{translations['smallerFile'] || ''}</span><span>{translations['betterQuality'] || ''}</span></div>
            </div>

            <button onClick={handleSubmit} disabled={files.length === 0 || loading}
                    className={`mt-6 w-full py-3 rounded-lg text-white font-medium text-lg transition-colors ${files.length === 0 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {loading ? (<span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{translations['compressing'] || 'Processing...'}</span>) : (translations['compress'] || 'Process Now')}
            </button>

            {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">❌ {error}</div>}

            {results.length > 0 && (
                <div className="mt-6 space-y-4">
                    {results.length > 1 && (
                        <div className="p-4 bg-white border rounded-xl shadow-sm">
                            <p className="font-semibold text-center mb-3">✅ {translations['done'] || 'Complete!'}</p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{translations['original'] || 'Original'}</p><p className="text-lg font-bold">{formatBytes(totalOriginal)}</p></div>
                                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{translations['compressed'] || 'Result'}</p><p className="text-lg font-bold">{formatBytes(totalCompressed)}</p></div>
                                <div className="bg-green-50 rounded-lg p-3"><p className="text-xs text-gray-500">{translations['saved'] || 'Saved'}</p><p className="text-lg font-bold text-green-600">-{totalPercent}%</p></div>
                            </div>
                        </div>
                    )}

                    {results.map((r, i) => (
                        <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-sm truncate flex-1">{r.name}</p>
                                {r.error ? <span className="text-red-500 text-xs">❌ {r.error}</span> : <span className="text-green-600 text-xs font-bold">-{Math.round(r.percent || 0)}%</span>}
                            </div>
                            {r.previewUrl && originalPreviewUrls[r.idx] && (
                                <div className="mb-3">
                                    <ImageCompare leftImage={originalPreviewUrls[r.idx]} rightImage={r.previewUrl} leftLabel={translations['before'] || 'Before'} rightLabel={translations['after'] || 'After'} />
                                </div>
                            )}
                            {!r.error && (
                                <>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                                        <div><span className="text-gray-400">{formatBytes(r.originalSize)}</span></div>
                                        <div><span className="text-gray-400">{formatBytes(r.compressedSize)}</span></div>
                                        <div><span className="text-green-600 font-bold">-{Math.round(r.percent || 0)}%</span></div>
                                    </div>
                                    <a href={r.downloadUrl} download={r.name} className="block w-full text-center py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">📥 {translations['download'] || 'Download'}</a>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}