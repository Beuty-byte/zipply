// app/[lang]/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://compressor.io';

interface Article {
    slug: string;
    title: Record<string, string>;
    description: Record<string, string>;
}

const articles: Article[] = [
    {
        slug: 'how-to-compress-images',
        title: { en: 'How to Compress Images – Complete Guide', ru: 'Как сжимать изображения – Полное руководство' },
        description: { en: 'Learn how to compress JPEG, PNG, WebP images.', ru: 'Узнайте, как сжимать изображения.' },
    },
    {
        slug: 'jpeg-vs-png-vs-webp',
        title: { en: 'JPEG vs PNG vs WebP – Which Format to Choose', ru: 'JPEG vs PNG vs WebP – Какой формат выбрать' },
        description: { en: 'Compare image formats.', ru: 'Сравнение форматов изображений.' },
    },
    {
        slug: 'what-is-webp',
        title: { en: 'What is WebP? Complete Guide', ru: 'Что такое WebP? Полное руководство' },
        description: { en: 'Everything about WebP format.', ru: 'Всё о формате WebP.' },
    },
    {
        slug: 'what-is-avif',
        title: { en: 'What is AVIF? Next-Gen Image Format', ru: 'Что такое AVIF? Формат нового поколения' },
        description: { en: 'Learn about AVIF format.', ru: 'Узнайте о формате AVIF.' },
    },
    {
        slug: 'lossy-vs-lossless',
        title: { en: 'Lossy vs Lossless Compression', ru: 'Сжатие с потерями vs без потерь' },
        description: { en: 'Understand compression types.', ru: 'Понимание типов сжатия.' },
    },
    {
        slug: 'compress-images-for-website',
        title: { en: 'How to Compress Images for Website', ru: 'Как сжать изображения для сайта' },
        description: { en: 'Speed up your website.', ru: 'Ускорьте ваш сайт.' },
    },
];

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const isRu = params.lang === 'ru';
    return {
        title: isRu ? 'Блог – Compressor.io' : 'Blog – Compressor.io',
        description: isRu
            ? 'Статьи о сжатии изображений, форматах и оптимизации.'
            : 'Articles about image compression, formats, and optimization.',
        alternates: {
            canonical: `${BASE_URL}/${params.lang}/blog`,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/blog`])),
        },
    };
}

export default function BlogPage({ params }: { params: { lang: string } }) {
    const { lang } = params;

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: 'Blog', url: `/${lang}/blog` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold mb-8">
                {lang === 'ru' ? 'Блог' : 'Blog'}
            </h1>
            <div className="grid gap-6">
                {articles.map((article: Article) => (
                    <Link
                        key={article.slug}
                        href={`/${lang}/blog/${article.slug}`}
                        className="block p-6 border rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {article.title[lang] || article.title.en}
                        </h2>
                        <p className="text-gray-600">
                            {article.description[lang] || article.description.en}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}