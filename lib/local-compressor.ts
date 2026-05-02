// lib/local-compressor.ts
import { decode, encode } from '@jsquash/jpeg';
import { optimise as oxipngOptimise } from '@jsquash/oxipng';
import { decode as webpDecode, encode as webpEncode } from '@jsquash/webp';

interface CompressionResult {
    blob: Blob;
    originalSize: number;
    compressedSize: number;
    compressionPercent: number;
}

const fileToBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });

export async function compressJpegLocal(file: File, quality: number = 80): Promise<CompressionResult> {
    const originalSize = file.size;
    const inputBuffer = await fileToBuffer(file);
    const imageData = await decode(inputBuffer);

    // @jsquash/jpeg ожидает качество 0-100, а не 0-1
    const compressedBuffer = await encode(imageData, { quality: Math.round(quality) });

    const compressedSize = compressedBuffer.byteLength;
    const compressionPercent = originalSize > 0 ? 100 - (compressedSize / originalSize * 100) : 0;

    return {
        blob: new Blob([compressedBuffer], { type: 'image/jpeg' }),
        originalSize,
        compressedSize,
        compressionPercent,
    };
}

export async function compressPngLocal(file: File): Promise<CompressionResult> {
    const originalSize = file.size;
    const inputBuffer = await fileToBuffer(file);
    const compressedBuffer = await oxipngOptimise(inputBuffer, { level: 3 });
    const compressedSize = compressedBuffer.byteLength;
    const compressionPercent = originalSize > 0 ? 100 - (compressedSize / originalSize * 100) : 0;

    return {
        blob: new Blob([compressedBuffer], { type: 'image/png' }),
        originalSize,
        compressedSize,
        compressionPercent,
    };
}

export async function compressWebpLocal(file: File, quality: number = 0.8): Promise<CompressionResult> {
    const originalSize = file.size;
    const inputBuffer = await fileToBuffer(file);
    const imageData = await webpDecode(inputBuffer);
    const compressedBuffer = await webpEncode(imageData, { quality });
    const compressedSize = compressedBuffer.byteLength;
    const compressionPercent = originalSize > 0 ? 100 - (compressedSize / originalSize * 100) : 0;

    return {
        blob: new Blob([compressedBuffer], { type: 'image/webp' }),
        originalSize,
        compressedSize,
        compressionPercent,
    };
}