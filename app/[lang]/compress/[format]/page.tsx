// app/[lang]/compress/[format]/page.tsx
import type { Metadata } from 'next';
import ToolTemplate from '@/components/ToolTemplate';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';

const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://compressor.io';

const configs: Record<string, {
    title: Record<string, string>;
    description: Record<string, string>;
    apiEndpoint: string;
    defaultParams: Record<string, any>;
    outputFormat: string;
    faq: Record<string, Array<{ question: string; answer: string }>>;
}> = {
    jpeg: {
        title: {
            en: 'Compress JPEG Images Online – Free JPEG Compressor',
            es: 'Comprimir imágenes JPEG en línea – Compresor JPEG gratuito',
            pt: 'Comprimir imagens JPEG online – Compressor JPEG gratuito',
            fr: 'Compresser des images JPEG en ligne – Compresseur JPEG gratuit',
            de: 'JPEG-Bilder online komprimieren – Kostenloser JPEG-Kompressor',
            ru: 'Сжать JPEG онлайн – Бесплатный JPEG компрессор',
        },
        description: {
            en: 'Compress JPEG images online for free. Reduce file size while maintaining high quality.',
            es: 'Comprima imágenes JPEG en línea gratis. Reduzca el tamaño del archivo manteniendo alta calidad.',
            pt: 'Comprima imagens JPEG online gratuitamente. Reduza o tamanho do arquivo mantendo alta qualidade.',
            fr: 'Compressez des images JPEG en ligne gratuitement. Réduisez la taille tout en conservant la qualité.',
            de: 'Komprimieren Sie JPEG-Bilder kostenlos online. Reduzieren Sie die Dateigröße bei hoher Qualität.',
            ru: 'Сжимайте JPEG изображения онлайн бесплатно. Уменьшайте размер файла, сохраняя высокое качество.',
        },
        apiEndpoint: '/api/v1/compress/jpeg',
        defaultParams: { quality: 80 },
        outputFormat: 'jpg',
        faq: {
            en: [
                { question: 'How does JPEG compression work?', answer: 'JPEG compression reduces file size by removing redundant data while preserving visual quality.' },
                { question: 'Is it free to compress JPEG images?', answer: 'Yes, completely free. No registration required.' },
                { question: 'What quality should I choose?', answer: '80-85% is ideal for websites. 60-70% is good for email.' },
            ],
            es: [
                { question: '¿Es gratis comprimir imágenes JPEG?', answer: 'Sí, completamente gratis. Sin registro.' },
            ],
            pt: [
                { question: 'É grátis comprimir imagens JPEG?', answer: 'Sim, totalmente gratuito. Sem cadastro.' },
            ],
            fr: [
                { question: 'Est-ce gratuit de compresser des images JPEG?', answer: 'Oui, totalement gratuit. Sans inscription.' },
            ],
            de: [
                { question: 'Ist es kostenlos, JPEG-Bilder zu komprimieren?', answer: 'Ja, völlig kostenlos. Keine Anmeldung erforderlich.' },
            ],
            ru: [
                { question: 'Как работает сжатие JPEG?', answer: 'Сжатие JPEG уменьшает размер файла, удаляя избыточные данные.' },
                { question: 'Это бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
            ],
        },
    },
    png: {
        title: {
            en: 'Compress PNG Images Online – Free PNG Compressor',
            es: 'Comprimir imágenes PNG en línea – Compresor PNG gratuito',
            pt: 'Comprimir imagens PNG online – Compressor PNG gratuito',
            fr: 'Compresser des images PNG en ligne – Compresseur PNG gratuit',
            de: 'PNG-Bilder online komprimieren – Kostenloser PNG-Kompressor',
            ru: 'Сжать PNG онлайн – Бесплатный PNG компрессор',
        },
        description: {
            en: 'Compress PNG images online. Lossless and lossy compression. Reduce PNG file size by up to 80%.',
            es: 'Comprima imágenes PNG en línea. Compresión sin y con pérdida.',
            pt: 'Comprima imagens PNG online. Compressão sem e com perdas.',
            fr: 'Compressez des images PNG en ligne. Compression sans et avec perte.',
            de: 'Komprimieren Sie PNG-Bilder online. Verlustfreie und verlustbehaftete Kompression.',
            ru: 'Сжимайте PNG изображения онлайн. Сжатие без потерь и с потерями. Уменьшайте размер до 80%.',
        },
        apiEndpoint: '/api/v1/compress/png',
        defaultParams: { mode: 'fast' },
        outputFormat: 'png',
        faq: {
            en: [
                { question: 'Does PNG compression lose quality?', answer: 'In Fast mode, no — it\'s lossless. Deep mode uses pngquant for maximum compression.' },
            ],
            ru: [
                { question: 'Сжатие PNG ухудшает качество?', answer: 'В быстром режиме — нет, это сжатие без потерь.' },
            ],
        },
    },
    webp: {
        title: {
            en: 'Compress WebP Images Online – Free WebP Compressor',
            es: 'Comprimir imágenes WebP en línea – Compresor WebP gratuito',
            pt: 'Comprimir imagens WebP online – Compressor WebP gratuito',
            fr: 'Compresser des images WebP en ligne – Compresseur WebP gratuit',
            de: 'WebP-Bilder online komprimieren – Kostenloser WebP-Kompressor',
            ru: 'Сжать WebP онлайн – Бесплатный WebP компрессор',
        },
        description: {
            en: 'Compress WebP images online. Reduce file size while keeping transparency.',
            es: 'Comprima imágenes WebP en línea.',
            pt: 'Comprima imagens WebP online.',
            fr: 'Compressez des images WebP en ligne.',
            de: 'Komprimieren Sie WebP-Bilder online.',
            ru: 'Сжимайте WebP изображения онлайн. Уменьшайте размер с сохранением прозрачности.',
        },
        apiEndpoint: '/api/v1/compress/webp',
        defaultParams: { quality: 80 },
        outputFormat: 'webp',
        faq: { en: [], es: [], pt: [], fr: [], de: [], ru: [] },
    },
    gif: {
        title: {
            en: 'Compress GIF Images Online – Free GIF Compressor',
            es: 'Comprimir imágenes GIF en línea – Compresor GIF gratuito',
            pt: 'Comprimir imagens GIF online – Compressor GIF gratuito',
            fr: 'Compresser des images GIF en ligne – Compresseur GIF gratuit',
            de: 'GIF-Bilder online komprimieren – Kostenloser GIF-Kompressor',
            ru: 'Сжать GIF онлайн – Бесплатный GIF компрессор',
        },
        description: {
            en: 'Compress animated GIFs online. Reduce colors to shrink file size. Preserves animation.',
            es: 'Comprima GIFs animados en línea.',
            pt: 'Comprima GIFs animados online.',
            fr: 'Compressez des GIF animés en ligne.',
            de: 'Komprimieren Sie animierte GIFs online.',
            ru: 'Сжимайте анимированные GIF онлайн. Уменьшайте количество цветов. Анимация сохраняется.',
        },
        apiEndpoint: '/api/v1/compress/gif',
        defaultParams: { colors: 128 },
        outputFormat: 'gif',
        faq: { en: [], es: [], pt: [], fr: [], de: [], ru: [] },
    },
    svg: {
        title: {
            en: 'Compress SVG Images Online – Free SVG Optimizer',
            es: 'Comprimir imágenes SVG en línea – Optimizador SVG gratuito',
            pt: 'Comprimir imagens SVG online – Otimizador SVG gratuito',
            fr: 'Compresser des images SVG en ligne – Optimiseur SVG gratuit',
            de: 'SVG-Bilder online komprimieren – Kostenloser SVG-Optimierer',
            ru: 'Сжать SVG онлайн – Бесплатный SVG оптимизатор',
        },
        description: {
            en: 'Optimize SVG code. Remove unnecessary metadata, comments, and whitespace.',
            es: 'Optimice código SVG.',
            pt: 'Otimize código SVG.',
            fr: 'Optimisez le code SVG.',
            de: 'Optimieren Sie SVG-Code.',
            ru: 'Оптимизируйте SVG код. Удалите метаданные, комментарии и пробелы.',
        },
        apiEndpoint: '/api/v1/compress/svg',
        defaultParams: { level: 'safe' },
        outputFormat: 'svg',
        faq: { en: [], es: [], pt: [], fr: [], de: [], ru: [] },
    },
    avif: {
        title: {
            en: 'Compress AVIF Images Online – Free AVIF Compressor',
            es: 'Comprimir imágenes AVIF en línea – Compresor AVIF gratuito',
            pt: 'Comprimir imagens AVIF online – Compressor AVIF gratuito',
            fr: 'Compresser des images AVIF en ligne – Compresseur AVIF gratuit',
            de: 'AVIF-Bilder online komprimieren – Kostenloser AVIF-Kompressor',
            ru: 'Сжать AVIF онлайн – Бесплатный AVIF компрессор',
        },
        description: {
            en: 'Compress AVIF images online. Modern format with superior compression.',
            es: 'Comprima imágenes AVIF en línea.',
            pt: 'Comprima imagens AVIF online.',
            fr: 'Compressez des images AVIF en ligne.',
            de: 'Komprimieren Sie AVIF-Bilder online.',
            ru: 'Сжимайте AVIF изображения онлайн. Современный формат с лучшим сжатием.',
        },
        apiEndpoint: '/api/v1/avif/compress',
        defaultParams: { quality: 50 },
        outputFormat: 'avif',
        faq: { en: [], es: [], pt: [], fr: [], de: [], ru: [] },
    },
};

const translations: Record<string, Record<string, string>> = {
    en: {
        drop: 'Drop your image here',
        orClick: 'or click to browse',
        quality: 'Quality',
        smallerFile: 'Smaller file',
        betterQuality: 'Better quality',
        compress: 'Compress Now',
        compressing: 'Compressing...',
        done: 'Compression Complete!',
        original: 'Original',
        compressed: 'Compressed',
        saved: 'Saved',
        download: 'Download',
        before: 'Before',
        after: 'After',
        'private.badge': 'Processed locally on your device',
        'private.local': '100% private: file was processed on your device and never left it.',
        'private.server': 'Processed on server: your browser does not support local compression.',
    },
    es: {
        drop: 'Suelta tu imagen aquí',
        orClick: 'o haz clic para seleccionar',
        quality: 'Calidad',
        smallerFile: 'Archivo más pequeño',
        betterQuality: 'Mejor calidad',
        compress: 'Comprimir ahora',
        compressing: 'Comprimiendo...',
        done: '¡Compresión completa!',
        original: 'Original',
        compressed: 'Comprimido',
        saved: 'Ahorrado',
        download: 'Descargar',
        before: 'Antes',
        after: 'Después',
        'private.badge': 'Procesado localmente en tu dispositivo',
        'private.local': '100% privado: el archivo se procesó en tu dispositivo y nunca lo abandonó.',
        'private.server': 'Procesado en el servidor: tu navegador no admite compresión local.',
    },
    pt: {
        drop: 'Solte sua imagem aqui',
        orClick: 'ou clique para selecionar',
        quality: 'Qualidade',
        smallerFile: 'Arquivo menor',
        betterQuality: 'Melhor qualidade',
        compress: 'Comprimir agora',
        compressing: 'Comprimindo...',
        done: 'Compressão concluída!',
        original: 'Original',
        compressed: 'Comprimido',
        saved: 'Economizado',
        download: 'Baixar',
        before: 'Antes',
        after: 'Depois',
        'private.badge': 'Processado localmente no seu dispositivo',
        'private.local': '100% privado: o arquivo foi processado no seu dispositivo e nunca saiu dele.',
        'private.server': 'Processado no servidor: seu navegador não suporta compressão local.',
    },
    fr: {
        drop: 'Déposez votre image ici',
        orClick: 'ou cliquez pour sélectionner',
        quality: 'Qualité',
        smallerFile: 'Fichier plus petit',
        betterQuality: 'Meilleure qualité',
        compress: 'Compresser maintenant',
        compressing: 'Compression en cours...',
        done: 'Compression terminée !',
        original: 'Original',
        compressed: 'Compressé',
        saved: 'Économisé',
        download: 'Télécharger',
        before: 'Avant',
        after: 'Après',
        'private.badge': 'Traité localement sur votre appareil',
        'private.local': '100% privé : le fichier a été traité sur votre appareil et ne l\'a jamais quitté.',
        'private.server': 'Traité sur le serveur : votre navigateur ne prend pas en charge la compression locale.',
    },
    de: {
        drop: 'Bild hier ablegen',
        orClick: 'oder klicken Sie zum Auswählen',
        quality: 'Qualität',
        smallerFile: 'Kleinere Datei',
        betterQuality: 'Bessere Qualität',
        compress: 'Jetzt komprimieren',
        compressing: 'Komprimierung...',
        done: 'Komprimierung abgeschlossen!',
        original: 'Original',
        compressed: 'Komprimiert',
        saved: 'Gespart',
        download: 'Herunterladen',
        before: 'Vorher',
        after: 'Nachher',
        'private.badge': 'Lokal auf Ihrem Gerät verarbeitet',
        'private.local': '100% privat: Die Datei wurde auf Ihrem Gerät verarbeitet und hat es nie verlassen.',
        'private.server': 'Auf dem Server verarbeitet: Ihr Browser unterstützt keine lokale Komprimierung.',
    },
    ru: {
        drop: 'Перетащите изображение сюда',
        orClick: 'или нажмите для выбора',
        quality: 'Качество',
        smallerFile: 'Меньше размер',
        betterQuality: 'Лучше качество',
        compress: 'Сжать',
        compressing: 'Сжатие...',
        done: 'Сжатие завершено!',
        original: 'Исходный',
        compressed: 'Сжатый',
        saved: 'Сэкономлено',
        download: 'Скачать',
        before: 'До',
        after: 'После',
        'private.badge': 'Обрабатывается локально на устройстве',
        'private.local': '100% приватно: файл обработан на вашем устройстве и не покидал его.',
        'private.server': 'Обработано на сервере: ваш браузер не поддерживает локальное сжатие.',
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; format: string }> }): Promise<Metadata> {
    const { lang, format } = await params;
    const config = configs[format];
    const title = config?.title[lang] || config?.title.en || 'Image Compressor';
    const description = config?.description[lang] || config?.description.en || '';
    const url = `${BASE_URL}/${lang}/compress/${format}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/compress/${format}`])),
        },
        openGraph: { title, description, url, type: 'website', locale: lang },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function CompressPage({ params }: { params: Promise<{ lang: string; format: string }> }) {
    const { lang, format } = await params;
    const config = configs[format];
    const t = translations[lang] || translations.en;

    if (!config) {
        return <div className="p-10 text-center text-red-500">Tool not found</div>;
    }

    const title = config.title[lang] || config.title.en;
    const description = config.description[lang] || config.description.en;
    const faqs = config.faq[lang] || config.faq.en || [];
    const formatLabel = format.toUpperCase();

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: 'Compress', url: `/${lang}/compress/${format}` },
        { name: `Compress ${formatLabel}`, url: `/${lang}/compress/${format}` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <FAQSchema faqs={faqs} />
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
            <p className="text-gray-500 text-center mb-8">{description}</p>
            <ToolTemplate
                format={config.outputFormat}
                apiEndpoint={config.apiEndpoint}
                lang={lang}
                translations={t}
            />
            {faqs.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">
                        {lang === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
                    </h2>
                    {faqs.map((faq, i) => (
                        <details key={i} className="mb-3 border rounded-lg p-3">
                            <summary className="cursor-pointer font-medium text-sm">{faq.question}</summary>
                            <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                        </details>
                    ))}
                </section>
            )}
        </div>
    );
}