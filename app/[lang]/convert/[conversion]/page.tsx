// app/[lang]/convert/[conversion]/page.tsx
import type { Metadata } from 'next';
import ToolTemplate from '@/components/ToolTemplate';
import Breadcrumbs from '@/components/Breadcrumbs';

const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://compressor.io';

const conversions: Record<string, {
    title: Record<string, string>;
    description: Record<string, string>;
    apiEndpoint: string;
    outputFormat: string;
    acceptType?: string;
    fromLabel: string;
    toLabel: string;
}> = {
    'png-to-jpg': { title: { en: 'Convert PNG to JPG Online – Free PNG to JPG Converter', ru: 'Конвертировать PNG в JPG онлайн' }, description: { en: 'Convert PNG images to JPG format. Free, fast, no registration.', ru: 'Конвертируйте PNG в JPG. Бесплатно и быстро.' }, apiEndpoint: '/api/v1/convert/png-to-jpg', outputFormat: 'jpg', fromLabel: 'PNG', toLabel: 'JPG' },
    'jpg-to-png': { title: { en: 'Convert JPG to PNG Online', ru: 'Конвертировать JPG в PNG онлайн' }, description: { en: 'Convert JPG images to PNG format.', ru: 'Конвертируйте JPG в PNG.' }, apiEndpoint: '/api/v1/convert/jpg-to-png', outputFormat: 'png', fromLabel: 'JPG', toLabel: 'PNG' },
    'png-to-webp': { title: { en: 'Convert PNG to WebP Online', ru: 'Конвертировать PNG в WebP онлайн' }, description: { en: 'Convert PNG images to WebP format for better web performance.', ru: 'Конвертируйте PNG в WebP.' }, apiEndpoint: '/api/v1/convert/png-to-webp', outputFormat: 'webp', fromLabel: 'PNG', toLabel: 'WebP' },
    'jpg-to-webp': { title: { en: 'Convert JPG to WebP Online', ru: 'Конвертировать JPG в WebP онлайн' }, description: { en: 'Convert JPEG images to WebP format.', ru: 'Конвертируйте JPEG в WebP.' }, apiEndpoint: '/api/v1/convert/jpg-to-webp', outputFormat: 'webp', fromLabel: 'JPG', toLabel: 'WebP' },
    'webp-to-jpg': { title: { en: 'Convert WebP to JPG Online', ru: 'Конвертировать WebP в JPG онлайн' }, description: { en: 'Convert WebP images to JPEG format.', ru: 'Конвертируйте WebP в JPEG.' }, apiEndpoint: '/api/v1/convert/webp-to-jpg', outputFormat: 'jpg', fromLabel: 'WebP', toLabel: 'JPG' },
    'webp-to-png': { title: { en: 'Convert WebP to PNG Online', ru: 'Конвертировать WebP в PNG онлайн' }, description: { en: 'Convert WebP images to PNG format.', ru: 'Конвертируйте WebP в PNG.' }, apiEndpoint: '/api/v1/convert/webp-to-png', outputFormat: 'png', fromLabel: 'WebP', toLabel: 'PNG' },
    'gif-to-mp4': { title: { en: 'Convert GIF to MP4 Online', ru: 'Конвертировать GIF в MP4 онлайн' }, description: { en: 'Convert animated GIF to MP4 video.', ru: 'Конвертируйте GIF в MP4.' }, apiEndpoint: '/api/v1/convert/gif-to-mp4', outputFormat: 'mp4', fromLabel: 'GIF', toLabel: 'MP4' },
    'mp4-to-gif': { title: { en: 'Convert MP4 to GIF Online', ru: 'Конвертировать MP4 в GIF онлайн' }, description: { en: 'Convert MP4 video to animated GIF.', ru: 'Конвертируйте MP4 в GIF.' }, apiEndpoint: '/api/v1/convert/mp4-to-gif', outputFormat: 'gif', acceptType: 'video/*', fromLabel: 'MP4', toLabel: 'GIF' },
    'svg-to-png': { title: { en: 'Convert SVG to PNG Online', ru: 'Конвертировать SVG в PNG онлайн' }, description: { en: 'Convert SVG vector to PNG image.', ru: 'Конвертируйте SVG в PNG.' }, apiEndpoint: '/api/v1/convert/svg-to-png', outputFormat: 'png', fromLabel: 'SVG', toLabel: 'PNG' },
    'video-to-audio': { title: { en: 'Extract Audio from Video Online', ru: 'Извлечь аудио из видео онлайн' }, description: { en: 'Extract MP3 from video files.', ru: 'Извлеките MP3 из видео.' }, apiEndpoint: '/api/v1/convert/video-to-audio', outputFormat: 'mp3', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'Audio' },
    'to-avif': { title: { en: 'Convert to AVIF Online', ru: 'Конвертировать в AVIF онлайн' }, description: { en: 'Convert images to AVIF format.', ru: 'Конвертируйте изображения в AVIF.' }, apiEndpoint: '/api/v1/avif/to-avif', outputFormat: 'avif', fromLabel: 'Image', toLabel: 'AVIF' },
    'from-avif': { title: { en: 'Convert AVIF to JPG/PNG Online', ru: 'Конвертировать AVIF в JPG/PNG онлайн' }, description: { en: 'Convert AVIF images to JPG or PNG.', ru: 'Конвертируйте AVIF в JPG/PNG.' }, apiEndpoint: '/api/v1/avif/from-avif', outputFormat: 'jpg', fromLabel: 'AVIF', toLabel: 'JPG/PNG' },
    'video-convert': { title: { en: 'Video Converter Online', ru: 'Конвертер видео онлайн' }, description: { en: 'Convert video to any format.', ru: 'Конвертируйте видео в любой формат.' }, apiEndpoint: '/api/v1/video/convert', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'MP4' },
    'mov-to-mp4': { title: { en: 'Convert MOV to MP4 Online', ru: 'Конвертировать MOV в MP4 онлайн' }, description: { en: 'Convert MOV videos to MP4 format.', ru: 'Конвертируйте MOV в MP4.' }, apiEndpoint: '/api/v1/video/mov-to-mp4', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'MOV', toLabel: 'MP4' },
    'avi-to-mp4': { title: { en: 'Convert AVI to MP4 Online', ru: 'Конвертировать AVI в MP4 онлайн' }, description: { en: 'Convert AVI videos to MP4 format.', ru: 'Конвертируйте AVI в MP4.' }, apiEndpoint: '/api/v1/video/avi-to-mp4', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'AVI', toLabel: 'MP4' },
    'mkv-to-mp4': { title: { en: 'Convert MKV to MP4 Online', ru: 'Конвертировать MKV в MP4 онлайн' }, description: { en: 'Convert MKV videos to MP4 format.', ru: 'Конвертируйте MKV в MP4.' }, apiEndpoint: '/api/v1/video/mkv-to-mp4', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'MKV', toLabel: 'MP4' },
    'to-webm': { title: { en: 'Convert to WebM Online', ru: 'Конвертировать в WebM онлайн' }, description: { en: 'Convert video to WebM format.', ru: 'Конвертируйте видео в WebM.' }, apiEndpoint: '/api/v1/video/to-webm', outputFormat: 'webm', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'WebM' },
    'compress-video': { title: { en: 'Compress Video Online', ru: 'Сжать видео онлайн' }, description: { en: 'Reduce video file size online.', ru: 'Уменьшите размер видео онлайн.' }, apiEndpoint: '/api/v1/video/compress', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'Compressed MP4' },
};

const translations: Record<string, Record<string, string>> = {
    en: {
        drop: 'Drop your file here',
        orClick: 'or click to browse',
        quality: 'Quality',
        smallerFile: 'Smaller file',
        betterQuality: 'Better quality',
        compress: 'Convert Now',
        compressing: 'Converting...',
        done: 'Conversion Complete!',
        original: 'Original',
        compressed: 'Result',
        saved: 'Size',
        download: 'Download',
    },
    ru: {
        drop: 'Перетащите файл сюда',
        orClick: 'или нажмите для выбора',
        quality: 'Качество',
        compress: 'Конвертировать',
        compressing: 'Конвертация...',
        done: 'Готово!',
        original: 'Исходный',
        compressed: 'Результат',
        saved: 'Размер',
        download: 'Скачать',
    },
};

export async function generateMetadata({ params }: { params: { lang: string; conversion: string } }): Promise<Metadata> {
    const config = conversions[params.conversion];
    const title = config?.title[params.lang] || config?.title.en || 'File Converter';
    const description = config?.description[params.lang] || config?.description.en || '';
    const url = `${BASE_URL}/${params.lang}/convert/${params.conversion}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/convert/${params.conversion}`])),
        },
        openGraph: { title, description, url, type: 'website', locale: params.lang },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default function ConvertPage({ params }: { params: { lang: string; conversion: string } }) {
    const config = conversions[params.conversion];
    const t = translations[params.lang] || translations.en;

    if (!config) {
        return <div className="p-10 text-center text-red-500">Converter not found</div>;
    }

    const title = config.title[params.lang] || config.title.en;
    const description = config.description[params.lang] || config.description.en;

    const breadcrumbs = [
        { name: 'Home', url: `/${params.lang}` },
        { name: `${config.fromLabel} to ${config.toLabel}`, url: `/${params.lang}/convert/${params.conversion}` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
            <p className="text-gray-500 text-center mb-8">{description}</p>
            <ToolTemplate
                format={config.outputFormat}
                apiEndpoint={config.apiEndpoint}
                lang={params.lang}
                translations={t}
                acceptType={config.acceptType}
            />
        </div>
    );
}