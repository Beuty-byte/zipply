// lib/svg-compress-local.ts

export function compressSvgLocal(svgText: string): string {
    // Удаляем комментарии
    svgText = svgText.replace(/<!--[\s\S]*?-->/g, '');
    // Удаляем лишние пробелы
    svgText = svgText.replace(/\s+/g, ' ');
    // Убираем пробелы между тегами
    svgText = svgText.replace(/> </g, '><');
    // Убираем пробелы перед > и после <
    svgText = svgText.replace(/ >/g, '>').replace(/< /g, '<');

    return svgText.trim();
}

export async function compressSvgFileLocal(file: File): Promise<Blob> {
    const text = await file.text();
    const compressed = compressSvgLocal(text);
    return new Blob([compressed], { type: 'image/svg+xml' });
}