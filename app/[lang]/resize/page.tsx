// app/[lang]/resize/page.tsx
import type { Metadata } from 'next';
import ToolTemplate from '@/components/ToolTemplate';
import Breadcrumbs from '@/components/Breadcrumbs';

const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://compressor.io';

const titles: Record<string, string> = {
    en: 'Resize Image Online – Free Image Resizer',
    es: 'Redimensionar imagen online – Gratis',
    pt: 'Redimensionar imagem online – Grátis',
    fr: 'Redimensionner une image en ligne – Gratuit',
    de: 'Bild online skalieren – Kostenlos',
    ru: 'Изменить размер изображения онлайн – Бесплатно',
};

const descriptions: Record<string, string> = {
    en: 'Resize images online. Change dimensions, keep aspect ratio. JPEG, PNG, WebP supported.',
    ru: 'Изменяйте размер изображений онлайн. Меняйте размеры, сохраняйте пропорции. Поддержка JPEG, PNG, WebP.',
};

const translations: Record<string, Record<string, string>> = {
    en: {
        drop: 'Drop your image here',
        orClick: 'or click to browse',
        quality: 'Quality',
        compress: 'Resize',
        compressing: 'Resizing...',
        done: 'Resize Complete!',
        original: 'Original',
        compressed: 'Result',
        saved: 'Size',
        download: 'Download',
    },
    ru: {
        drop: 'Перетащите изображение сюда',
        orClick: 'или нажмите для выбора',
        quality: 'Качество',
        compress: 'Изменить',
        compressing: 'Изменение...',
        done: 'Готово!',
        original: 'Исходный',
        compressed: 'Результат',
        saved: 'Размер',
        download: 'Скачать',
    },
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const title = titles[params.lang] || titles.en;
    const description = descriptions[params.lang] || descriptions.en;
    const url = `${BASE_URL}/${params.lang}/resize`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/resize`])),
        },
        openGraph: { title, description, url, type: 'website', locale: params.lang },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default function ResizePage({ params }: { params: { lang: string } }) {
    const t = translations[params.lang] || translations.en;
    const title = titles[params.lang] || titles.en;
    const description = descriptions[params.lang] || descriptions.en;

    const breadcrumbs = [
        { name: 'Home', url: `/${params.lang}` },
        { name: 'Resize Image', url: `/${params.lang}/resize` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
            <p className="text-gray-500 text-center mb-8">{description}</p>
            <ToolTemplate
                format="jpg"
                apiEndpoint="/api/v1/resize"
                lang={params.lang}
                translations={t}
            />
        </div>
    );
}