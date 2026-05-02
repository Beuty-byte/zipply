// lib/convert-local.ts
import { decode as jpegDecode, encode as jpegEncode } from '@jsquash/jpeg';
import { decode as webpDecode, encode as webpEncode } from '@jsquash/webp';

const fileToBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });

async function decodeImage(file: File): Promise<ImageData> {
    const buffer = await fileToBuffer(file);

    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        return jpegDecode(buffer);
    }
    if (file.type === 'image/webp') {
        return webpDecode(buffer);
    }
    // PNG и всё остальное — через canvas
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            resolve(ctx.getImageData(0, 0, img.width, img.height));
        };
        img.onerror = reject;
        img.src = url;
    });
}

async function encodeImage(imageData: ImageData, outputFormat: string, quality: number): Promise<Blob> {
    if (outputFormat === 'jpeg' || outputFormat === 'jpg') {
        const buffer = await jpegEncode(imageData, { quality });
        return new Blob([buffer], { type: 'image/jpeg' });
    }
    if (outputFormat === 'webp') {
        const buffer = await webpEncode(imageData, { quality });
        return new Blob([buffer], { type: 'image/webp' });
    }
    // PNG через canvas
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d')!;
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob(
            (blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Canvas toBlob failed'));
            },
            'image/png'
        );
    });
}

export async function convertLocal(
    file: File,
    outputFormat: string,
    quality: number = 0.9
): Promise<{ blob: Blob; originalSize: number; convertedSize: number }> {
    const originalSize = file.size;
    const imageData = await decodeImage(file);
    const blob = await encodeImage(imageData, outputFormat, quality);
    return { blob, originalSize, convertedSize: blob.size };
}