// app/sitemap.ts
import { MetadataRoute } from 'next';

const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://compressor.io';

const COMPRESS_TOOLS = ['jpeg', 'png', 'webp', 'gif', 'svg', 'avif'];
const CONVERT_TOOLS = [
    'png-to-jpg', 'jpg-to-png', 'png-to-webp', 'jpg-to-webp',
    'webp-to-jpg', 'webp-to-png', 'gif-to-mp4', 'mp4-to-gif',
    'svg-to-png', 'video-to-audio', 'to-avif', 'from-avif',
    'video-convert', 'mov-to-mp4', 'avi-to-mp4', 'mkv-to-mp4',
    'to-webm', 'compress-video',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const lang of LANGUAGES) {
        // Главная
        entries.push({
            url: `${BASE_URL}/${lang}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
            alternates: {
                languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}`])),
            },
        });

        // Сжатие
        for (const tool of COMPRESS_TOOLS) {
            entries.push({
                url: `${BASE_URL}/${lang}/compress/${tool}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: {
                    languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/compress/${tool}`])),
                },
            });
        }

        // Конвертация
        for (const tool of CONVERT_TOOLS) {
            entries.push({
                url: `${BASE_URL}/${lang}/convert/${tool}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: {
                    languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/convert/${tool}`])),
                },
            });
        }

        // Resize
        entries.push({
            url: `${BASE_URL}/${lang}/resize`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: {
                languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/resize`])),
            },
        });
    }

    return entries;
}