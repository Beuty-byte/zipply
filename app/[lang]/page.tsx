// app/[lang]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://compressor.io';

const compressTools = [
    { href: 'compress/jpeg', label: 'Compress JPEG', icon: '🖼️' },
    { href: 'compress/png', label: 'Compress PNG', icon: '🖼️' },
    { href: 'compress/webp', label: 'Compress WebP', icon: '🖼️' },
    { href: 'compress/gif', label: 'Compress GIF', icon: '🎞️' },
    { href: 'compress/svg', label: 'Compress SVG', icon: '📐' },
    { href: 'compress/avif', label: 'Compress AVIF', icon: '🖼️' },
];

const convertTools = [
    { href: 'convert/png-to-jpg', label: 'PNG to JPG', icon: '🔄' },
    { href: 'convert/jpg-to-png', label: 'JPG to PNG', icon: '🔄' },
    { href: 'convert/png-to-webp', label: 'PNG to WebP', icon: '🔄' },
    { href: 'convert/jpg-to-webp', label: 'JPG to WebP', icon: '🔄' },
    { href: 'convert/webp-to-jpg', label: 'WebP to JPG', icon: '🔄' },
    { href: 'convert/webp-to-png', label: 'WebP to PNG', icon: '🔄' },
    { href: 'convert/svg-to-png', label: 'SVG to PNG', icon: '🔄' },
    { href: 'convert/gif-to-mp4', label: 'GIF to MP4', icon: '🎬' },
    { href: 'convert/mp4-to-gif', label: 'MP4 to GIF', icon: '🎬' },
    { href: 'convert/video-to-audio', label: 'Video to Audio', icon: '🎵' },
];

const avifTools = [
    { href: 'convert/to-avif', label: 'To AVIF', icon: '🔄' },
    { href: 'convert/from-avif', label: 'From AVIF', icon: '🔄' },
];

const videoTools = [
    { href: 'convert/video-convert', label: 'Video Converter', icon: '🎬' },
    { href: 'convert/mov-to-mp4', label: 'MOV to MP4', icon: '🎬' },
    { href: 'convert/avi-to-mp4', label: 'AVI to MP4', icon: '🎬' },
    { href: 'convert/mkv-to-mp4', label: 'MKV to MP4', icon: '🎬' },
    { href: 'convert/to-webm', label: 'To WebM', icon: '🎬' },
    { href: 'convert/compress-video', label: 'Compress Video', icon: '🎬' },
];

const titles: Record<string, string> = {
    en: 'Free Online Image Compressor & Converter',
    es: 'Compresor y convertidor de imágenes online gratuito',
    pt: 'Compressor e conversor de imagens online gratuito',
    fr: 'Compresseur et convertisseur d\'images en ligne gratuit',
    de: 'Kostenloser Online-Bildkompressor und -Konverter',
    ru: 'Бесплатное сжатие и конвертация изображений онлайн',
};

const descriptions: Record<string, string> = {
    en: 'Compress JPEG, PNG, WebP, GIF and SVG images. Convert between formats. Free, fast, no registration required.',
    es: 'Comprima JPEG, PNG, WebP, GIF y SVG. Convierta entre formatos. Gratis, rápido, sin registro.',
    pt: 'Comprima JPEG, PNG, WebP, GIF e SVG. Converta entre formatos. Grátis, rápido, sem cadastro.',
    fr: 'Compressez JPEG, PNG, WebP, GIF et SVG. Convertissez entre formats. Gratuit, rapide, sans inscription.',
    de: 'Komprimieren Sie JPEG, PNG, WebP, GIF und SVG. Konvertieren Sie zwischen Formaten. Kostenlos, schnell, keine Anmeldung.',
    ru: 'Сжимайте JPEG, PNG, WebP, GIF и SVG. Конвертируйте между форматами. Бесплатно, быстро, без регистрации.',
};

const blogLabels: Record<string, string> = {
    en: '📝 Image Compression Guides & Tips',
    es: '📝 Guías y consejos de compresión de imágenes',
    pt: '📝 Guias e dicas de compressão de imagens',
    fr: '📝 Guides et astuces de compression d\'images',
    de: '📝 Leitfäden und Tipps zur Bildkomprimierung',
    ru: '📝 Руководства и советы по сжатию изображений',
};

const blogDescriptions: Record<string, string> = {
    en: 'Learn how to compress images, choose the best format, and optimize your website.',
    ru: 'Узнайте, как сжимать изображения, выбирать лучший формат и оптимизировать сайт.',
};

const blogLinks: Record<string, string> = {
    en: 'Read our blog →',
    ru: 'Читать блог →',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const title = titles[lang] || titles.en;
    const description = descriptions[lang] || descriptions.en;

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${lang}`,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}`])),
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${lang}`,
            type: 'website',
            locale: lang,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const title = titles[lang] || titles.en;
    const description = descriptions[lang] || descriptions.en;

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Compressor.io',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            <div className="max-w-5xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
                <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">{description}</p>

                <Section title={lang === 'ru' ? 'Сжатие изображений' : 'Image Compression'}>
                    {compressTools.map(tool => (
                        <ToolCard key={tool.href} lang={lang} tool={tool} />
                    ))}
                </Section>

                <Section title={lang === 'ru' ? 'Конвертация форматов' : 'Format Conversion'}>
                    {convertTools.map(tool => (
                        <ToolCard key={tool.href} lang={lang} tool={tool} />
                    ))}
                </Section>

                <Section title="AVIF">
                    {avifTools.map(tool => (
                        <ToolCard key={tool.href} lang={lang} tool={tool} />
                    ))}
                </Section>

                <Section title={lang === 'ru' ? 'Видео' : 'Video'}>
                    {videoTools.map(tool => (
                        <ToolCard key={tool.href} lang={lang} tool={tool} />
                    ))}
                </Section>

                <Section title={lang === 'ru' ? 'Изменение размера' : 'Resize'}>
                    <ToolCard lang={lang} tool={{ href: 'resize', label: lang === 'ru' ? 'Изменить размер' : 'Resize Image', icon: '📏' }} />
                </Section>

                {/* БЛОГ */}
                <section className="mt-12 p-8 bg-white border rounded-2xl shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">
                                {blogLabels[lang] || blogLabels.en}
                            </h2>
                            <p className="text-gray-600 max-w-lg">
                                {blogDescriptions[lang] || blogDescriptions.en}
                            </p>
                        </div>
                        <Link
                            href={`/${lang}/blog`}
                            className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap transition-colors"
                        >
                            {blogLinks[lang] || blogLinks.en}
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {children}
            </div>
        </section>
    );
}

function ToolCard({ lang, tool }: { lang: string; tool: { href: string; label: string; icon: string } }) {
    return (
        <Link
            href={`/${lang}/${tool.href}`}
            className="p-3 bg-white border rounded-xl hover:shadow-lg hover:border-blue-300 text-center transition-all"
        >
            <span className="text-2xl block mb-1">{tool.icon}</span>
            <span className="text-sm font-medium">{tool.label}</span>
        </Link>
    );
}