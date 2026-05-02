// lib/api-client.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface CompressionResult {
    originalSize: number;
    compressedSize: number;
    compressionPercent: number;
    downloadUrl: string;
    blob: Blob;
}

export async function compressImage(
    file: File,
    format: string,
    options: Record<string, any> = {}
): Promise<CompressionResult> {
    const formData = new FormData();
    formData.append('files', file);

    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    const response = await fetch(`${API_BASE}/compress/${format}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error((errorData as any).error || `Compression failed: ${response.statusText}`);
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    return {
        originalSize: Number(response.headers.get('X-Original-Size') || 0),
        compressedSize: Number(response.headers.get('X-Compressed-Size') || 0),
        compressionPercent: Number(response.headers.get('X-Compression-Percent') || 0),
        downloadUrl,
        blob,
    };
}

export async function convertImage(
    file: File,
    conversion: string,
    options: Record<string, any> = {}
): Promise<{ downloadUrl: string; blob: Blob; originalSize: number; convertedSize: number }> {
    const formData = new FormData();
    formData.append('files', file);

    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    const response = await fetch(`${API_BASE}/convert/${conversion}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error((errorData as any).error || `Conversion failed: ${response.statusText}`);
    }

    const blob = await response.blob();

    return {
        downloadUrl: URL.createObjectURL(blob),
        blob,
        originalSize: Number(response.headers.get('X-Original-Size') || 0),
        convertedSize: Number(response.headers.get('X-Converted-Size') || 0),
    };
}