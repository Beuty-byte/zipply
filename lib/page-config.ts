// lib/page-config.ts

export interface ToolPageConfig {
    key: string;
    type: 'compress' | 'convert' | 'avif' | 'video' | 'resize';
    urlParams: Record<string, string>;
    apiEndpoint: string;
    defaultParams: Record<string, any>;
    outputMimeType: string;
    outputExtension: string;
    seo: {
        title: Record<string, string>;
        description: Record<string, string>;
        h1: Record<string, string>;
    };
    faq: Record<string, Array<{ question: string; answer: string }>>;
}

export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ru', name: 'Русский' },
] as const;

export const ALL_TOOLS: ToolPageConfig[] = [
    // ── СЖАТИЕ ──
    {
        key: 'compress-jpeg',
        type: 'compress',
        urlParams: { format: 'jpeg' },
        apiEndpoint: '/api/v1/compress/jpeg',
        defaultParams: { quality: 80 },
        outputMimeType: 'image/jpeg',
        outputExtension: 'jpg',
        seo: {
            title: {
                en: 'Compress JPEG Images Online – Free JPEG Compressor',
                es: 'Comprimir imágenes JPEG en línea',
                pt: 'Comprimir imagens JPEG online',
                fr: 'Compresser des images JPEG en ligne',
                de: 'JPEG-Bilder online komprimieren',
                ru: 'Сжать JPEG онлайн – Бесплатный JPEG компрессор',
            },
            description: {
                en: 'Compress JPEG images online for free.',
                ru: 'Сжимайте JPEG изображения онлайн бесплатно.',
            },
            h1: {
                en: 'Compress JPEG Images',
                ru: 'Сжать JPEG изображения',
            },
        },
        faq: { en: [], ru: [] },
    },
    {
        key: 'compress-png',
        type: 'compress',
        urlParams: { format: 'png' },
        apiEndpoint: '/api/v1/compress/png',
        defaultParams: { mode: 'fast' },
        outputMimeType: 'image/png',
        outputExtension: 'png',
        seo: {
            title: { en: 'Compress PNG Images Online', ru: 'Сжать PNG онлайн' },
            description: { en: 'Compress PNG images online.', ru: 'Сжимайте PNG изображения онлайн.' },
            h1: { en: 'Compress PNG Images', ru: 'Сжать PNG изображения' },
        },
        faq: { en: [], ru: [] },
    },
    // Здесь остальные инструменты сжатия и конвертации...
    // Полную версию с 24 инструментами вы можете скопировать из предыдущего ответа
];

// Маппинг URL → конфиг
export function getToolByParams(params: Record<string, string>): ToolPageConfig | undefined {
    return ALL_TOOLS.find(tool =>
        Object.entries(tool.urlParams).every(([key, value]) => params[key] === value)
    );
}

// Генерация всех возможных URL для static generation
export function generateAllToolPaths() {
    const paths: Array<{ lang: string; params: Record<string, string[]> }> = [];

    for (const lang of LANGUAGES) {
        for (const tool of ALL_TOOLS) {
            paths.push({
                lang: lang.code,
                params: Object.fromEntries(
                    Object.entries(tool.urlParams).map(([key, value]) => [key, [value]])
                ),
            });
        }
    }

    return paths;
}