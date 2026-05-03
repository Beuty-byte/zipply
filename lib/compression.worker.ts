// public/compression.worker.ts
// Этот файл должен лежать в папке public/ и загружаться как обычный скрипт

import { decode as jpegDecode, encode as jpegEncode } from '@jsquash/jpeg';
import { optimise as oxipngOptimise } from '@jsquash/oxipng';
import { decode as webpDecode, encode as webpEncode } from '@jsquash/webp';

export type WorkerTask =
    | { type: 'compress-jpeg'; buffer: ArrayBuffer; quality: number; name: string; originalSize: number }
    | { type: 'compress-png';  buffer: ArrayBuffer; name: string; originalSize: number }
    | { type: 'compress-webp'; buffer: ArrayBuffer; quality: number; name: string; originalSize: number }
    | { type: 'convert';       buffer: ArrayBuffer; outputFormat: string; quality: number; mimeType: string; name: string; originalSize: number };

export type WorkerResult =
    | { status: 'ok';    buffer: ArrayBuffer; originalSize: number; compressedSize: number; compressionPercent: number; name: string; mimeType: string }
    | { status: 'error'; message: string; name: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx = self as any;

ctx.onmessage = async (e: MessageEvent<WorkerTask>) => {
    const task = e.data;

    try {
        let resultBuffer: ArrayBuffer;
        let mimeType = 'image/jpeg';

        if (task.type === 'compress-jpeg') {
            const imageData = await jpegDecode(task.buffer);
            resultBuffer = await jpegEncode(imageData, { quality: Math.round(task.quality) });
            mimeType = 'image/jpeg';

        } else if (task.type === 'compress-png') {
            resultBuffer = await oxipngOptimise(task.buffer, { level: 3 });
            mimeType = 'image/png';

        } else if (task.type === 'compress-webp') {
            const imageData = await webpDecode(task.buffer);
            resultBuffer = await webpEncode(imageData, { quality: task.quality / 100 });
            mimeType = 'image/webp';

        } else if (task.type === 'convert') {
            // Decode source
            let imageData: ImageData;
            if (task.mimeType === 'image/jpeg' || task.mimeType === 'image/jpg') {
                imageData = await jpegDecode(task.buffer);
            } else if (task.mimeType === 'image/webp') {
                imageData = await webpDecode(task.buffer);
            } else {
                throw new Error(`Unsupported source format for worker: ${task.mimeType}`);
            }

            // Encode target
            if (task.outputFormat === 'jpeg' || task.outputFormat === 'jpg') {
                resultBuffer = await jpegEncode(imageData, { quality: Math.round(task.quality) });
                mimeType = 'image/jpeg';
            } else if (task.outputFormat === 'webp') {
                resultBuffer = await webpEncode(imageData, { quality: task.quality / 100 });
                mimeType = 'image/webp';
            } else {
                throw new Error(`Unsupported output format for worker: ${task.outputFormat}`);
            }

        } else {
            throw new Error('Unknown task type');
        }

        const compressedSize = resultBuffer.byteLength;
        const compressionPercent =
            task.originalSize > 0 ? 100 - (compressedSize / task.originalSize) * 100 : 0;

        const result: WorkerResult = {
            status: 'ok',
            buffer: resultBuffer,
            originalSize: task.originalSize,
            compressedSize,
            compressionPercent,
            name: task.name,
            mimeType,
        };

        // Transferable — не копируем буфер, а передаём владение
        ctx.postMessage(result, { transfer: [resultBuffer] });

    } catch (err: any) {
        const result: WorkerResult = {
            status: 'error',
            message: err?.message || 'Unknown error in worker',
            name: task.name,
        };
        ctx.postMessage(result);
    }
};
