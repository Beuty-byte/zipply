// lib/use-compression-worker.ts
'use client';

import { useRef, useCallback } from 'react';

export type WorkerTaskType = 'compress-jpeg' | 'compress-png' | 'compress-webp' | 'convert';

export interface CompressionTask {
  type: WorkerTaskType;
  file: File;
  quality?: number;         // 0–100
  outputFormat?: string;    // для convert
}

export interface CompressionWorkerResult {
  status: 'ok' | 'error';
  blob?: Blob;
  originalSize: number;
  compressedSize?: number;
  compressionPercent?: number;
  name: string;
  message?: string;
}

/** Максимальный размер файла, который мы принимаем (50 МБ) */
export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

/**
 * Запускает сжатие/конвертацию в Web Worker.
 * Если Worker недоступен — кидает ошибку, вызывающий код
 * должен сам вызвать fallback (функции из local-compressor.ts).
 */
export function useCompressionWorker() {
  const workerRef = useRef<Worker | null>(null);

  /**
   * Убеждаемся что воркер создан (lazy init).
   * Возвращает null, если Worker API не поддерживается.
   */
  const getWorker = useCallback((): Worker | null => {
    if (typeof window === 'undefined') return null;
    if (!('Worker' in window)) return null;

    if (!workerRef.current) {
      try {
        workerRef.current = new Worker(
          new URL('./compression.worker.ts', import.meta.url),
          { type: 'module' }
        );
      } catch {
        return null;
      }
    }
    return workerRef.current;
  }, []);

  /**
   * Выполняет одну задачу через Worker.
   * Возвращает Promise<CompressionWorkerResult>.
   */
  const runTask = useCallback(
    (task: CompressionTask): Promise<CompressionWorkerResult> => {
      return new Promise(async (resolve) => {
        const { file, quality = 80, outputFormat = 'jpg' } = task;

        // --- Проверка размера ---
        if (file.size > MAX_FILE_SIZE_BYTES) {
          resolve({
            status: 'error',
            name: file.name,
            originalSize: file.size,
            message: `File is too large (max ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB). Please choose a smaller image.`,
          });
          return;
        }

        const worker = getWorker();
        if (!worker) {
          resolve({
            status: 'error',
            name: file.name,
            originalSize: file.size,
            message: 'Web Workers are not supported in this browser.',
          });
          return;
        }

        // Читаем файл в ArrayBuffer
        const buffer = await file.arrayBuffer();

        // Формируем сообщение для воркера
        const message: Record<string, unknown> = {
          type: task.type,
          buffer,
          name: file.name,
          originalSize: file.size,
          quality,
          outputFormat,
          mimeType: file.type,
        };

        const handleMessage = (e: MessageEvent) => {
          worker.removeEventListener('message', handleMessage);
          worker.removeEventListener('error', handleError);

          const data = e.data;
          if (data.status === 'ok') {
            const blob = new Blob([data.buffer], { type: data.mimeType });
            resolve({
              status: 'ok',
              blob,
              originalSize: data.originalSize,
              compressedSize: data.compressedSize,
              compressionPercent: data.compressionPercent,
              name: data.name,
            });
          } else {
            resolve({
              status: 'error',
              name: data.name,
              originalSize: file.size,
              message: data.message || 'Compression failed',
            });
          }
        };

        const handleError = (e: ErrorEvent) => {
          worker.removeEventListener('message', handleMessage);
          worker.removeEventListener('error', handleError);
          resolve({
            status: 'error',
            name: file.name,
            originalSize: file.size,
            message: e.message || 'Worker crashed',
          });
        };

        worker.addEventListener('message', handleMessage);
        worker.addEventListener('error', handleError);
        worker.postMessage(message, [buffer]); // transfer ownership
      });
    },
    [getWorker]
  );

  /** Завершаем воркер при размонтировании компонента */
  const terminate = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  return { runTask, terminate };
}
