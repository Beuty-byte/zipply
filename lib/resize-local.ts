// lib/resize-local.ts

interface ResizeResult {
    blob: Blob;
    width: number;
    height: number;
}

export async function resizeImageLocal(
    file: File,
    maxWidth: number,
    maxHeight: number,
    format: string = 'image/jpeg',
    quality: number = 0.85
): Promise<ResizeResult> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            let { width, height } = img;

            if (maxWidth > 0 && width > maxWidth) {
                height = (maxWidth / width) * height;
                width = maxWidth;
            }
            if (maxHeight > 0 && height > maxHeight) {
                width = (maxHeight / height) * width;
                height = maxHeight;
            }

            const canvas = document.createElement('canvas');
            canvas.width = Math.round(width);
            canvas.height = Math.round(height);

            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve({ blob, width: canvas.width, height: canvas.height });
                    } else {
                        reject(new Error('Canvas toBlob failed'));
                    }
                },
                format,
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Image load failed'));
        };

        img.src = url;
    });
}