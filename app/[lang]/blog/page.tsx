// app/[lang]/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ru';

const LANGUAGES: Lang[] = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://zipply.io';

interface Article {
    slug: string;
    title: Record<Lang, string>;
    description: Record<Lang, string>;
}

const articles: Article[] = [
    {
        slug: 'compress-jpeg-for-instagram',
        title: {
            en: 'How to Compress JPEG for Instagram Without Losing Quality',
            ru: 'Как сжать JPEG для Instagram без потери качества',
            es: 'Cómo comprimir JPEG para Instagram sin perder calidad',
            pt: 'Como comprimir JPEG para o Instagram sem perder qualidade',
            fr: 'Comment compresser un JPEG pour Instagram sans perte de qualité',
            de: 'JPEG für Instagram komprimieren ohne Qualitätsverlust',
        },
        description: {
            en: 'Learn the best settings to compress JPEG images for Instagram.',
            ru: 'Лучшие настройки сжатия JPEG для Instagram.',
            es: 'Aprenda las mejores configuraciones para comprimir JPEG para Instagram.',
            pt: 'Aprenda as melhores configurações para comprimir JPEG para o Instagram.',
            fr: 'Découvrez les meilleurs réglages pour compresser un JPEG pour Instagram.',
            de: 'Erfahren Sie die besten Einstellungen zum Komprimieren von JPEG für Instagram.',
        },
    },
    {
        slug: 'how-to-open-webp',
        title: {
            en: 'How to Open WebP Files on Computer and Online',
            ru: 'Чем открыть WebP на компьютере и онлайн',
            es: 'Cómo abrir archivos WebP en la computadora y en línea',
            pt: 'Como abrir arquivos WebP no computador e online',
            fr: 'Comment ouvrir des fichiers WebP sur ordinateur et en ligne',
            de: 'WebP-Dateien auf dem Computer und online öffnen',
        },
        description: {
            en: 'Struggling to open a WebP file? Learn the easiest ways.',
            ru: 'Не знаете, чем открыть WebP? Узнайте самые простые способы.',
            es: '¿No sabe cómo abrir un archivo WebP? Descubra las formas más fáciles.',
            pt: 'Não sabe como abrir um arquivo WebP? Descubra as maneiras mais fáceis.',
            fr: 'Vous ne savez pas comment ouvrir un fichier WebP ? Découvrez les moyens les plus simples.',
            de: 'Sie wissen nicht, wie Sie eine WebP-Datei öffnen sollen? Entdecken Sie die einfachsten Möglichkeiten.',
        },
    },
    {
        slug: 'compress-png-without-losing-transparency',
        title: {
            en: 'How to Compress PNG Without Losing Transparency',
            ru: 'Как сжать PNG без потери прозрачности',
            es: 'Cómo comprimir PNG sin perder transparencia',
            pt: 'Como comprimir PNG sem perder transparência',
            fr: 'Comment compresser un PNG sans perdre la transparence',
            de: 'PNG komprimieren ohne Transparenzverlust',
        },
        description: {
            en: 'Keep your logos and graphics crisp.',
            ru: 'Сохраните логотипы и графику чёткими.',
            es: 'Mantenga sus logotipos y gráficos nítidos.',
            pt: 'Mantenha seus logotipos e gráficos nítidos.',
            fr: 'Gardez vos logos et graphiques nets.',
            de: 'Halten Sie Ihre Logos und Grafiken scharf.',
        },
    },
    {
        slug: 'webp-vs-avif',
        title: {
            en: 'WebP vs AVIF: Which Modern Image Format Is Better?',
            ru: 'Что лучше: WebP или AVIF? Полный разбор форматов',
            es: 'WebP vs AVIF: ¿Qué formato de imagen moderno es mejor?',
            pt: 'WebP vs AVIF: Qual formato de imagem moderno é melhor?',
            fr: 'WebP vs AVIF : Quel format d\'image moderne est le meilleur ?',
            de: 'WebP vs AVIF: Welches moderne Bildformat ist besser?',
        },
        description: {
            en: 'Compare compression efficiency, quality, and browser support.',
            ru: 'Сравнение эффективности сжатия, качества и поддержки браузерами.',
            es: 'Compare eficiencia de compresión, calidad y soporte de navegadores.',
            pt: 'Compare eficiência de compressão, qualidade e suporte de navegadores.',
            fr: 'Comparez l\'efficacité de compression, la qualité et le support des navigateurs.',
            de: 'Vergleichen Sie Kompressionseffizienz, Qualität und Browser-Unterstützung.',
        },
    },
    {
        slug: 'compress-gif-for-telegram',
        title: {
            en: 'How to Compress GIF for Telegram: Step-by-Step Guide',
            ru: 'Как сжать гифку для Телеграм: пошаговая инструкция',
            es: 'Cómo comprimir GIF para Telegram: guía paso a paso',
            pt: 'Como comprimir GIF para o Telegram: guia passo a passo',
            fr: 'Comment compresser un GIF pour Telegram : guide étape par étape',
            de: 'GIF für Telegram komprimieren: Schritt-für-Schritt-Anleitung',
        },
        description: {
            en: 'Telegram has file size limits for GIFs. Learn how to compress.',
            ru: 'Telegram имеет ограничения по размеру для GIF. Узнайте, как сжать.',
            es: 'Telegram tiene límites de tamaño para GIFs. Aprenda a comprimir.',
            pt: 'O Telegram tem limites de tamanho para GIFs. Aprenda a comprimir.',
            fr: 'Telegram a des limites de taille pour les GIFs. Apprenez à compresser.',
            de: 'Telegram hat Dateigrößenbeschränkungen für GIFs. Erfahren Sie, wie Sie komprimieren.',
        },
    },
    {
        slug: 'svg-vs-png-for-logo',
        title: {
            en: 'SVG vs PNG for Logo: Which Format to Choose',
            ru: 'Какой формат выбрать для логотипа: SVG или PNG?',
            es: 'SVG vs PNG para logotipos: ¿Qué formato elegir?',
            pt: 'SVG vs PNG para logotipo: Qual formato escolher?',
            fr: 'SVG vs PNG pour un logo : Quel format choisir ?',
            de: 'SVG vs PNG für Logos: Welches Format wählen?',
        },
        description: {
            en: 'Should you use SVG or PNG for your logo? Full comparison.',
            ru: 'SVG или PNG для логотипа? Полное сравнение.',
            es: '¿Debería usar SVG o PNG para su logotipo? Comparación completa.',
            pt: 'Devo usar SVG ou PNG para meu logotipo? Comparação completa.',
            fr: 'Devez-vous utiliser SVG ou PNG pour votre logo ? Comparaison complète.',
            de: 'Sollten Sie SVG oder PNG für Ihr Logo verwenden? Vollständiger Vergleich.',
        },
    },
    {
        slug: 'compress-photo-for-email',
        title: {
            en: 'How to Compress Photos for Email Attachments',
            ru: 'Как сжать фото для email-рассылки',
            es: 'Cómo comprimir fotos para adjuntar en correos electrónicos',
            pt: 'Como comprimir fotos para anexos de e-mail',
            fr: 'Comment compresser des photos pour les pièces jointes d\'e-mail',
            de: 'Fotos für E-Mail-Anhänge komprimieren',
        },
        description: {
            en: 'Avoid bounced emails. Compress photo attachments properly.',
            ru: 'Избегайте возврата писем. Правильно сжимайте фото.',
            es: 'Evite correos rebotados. Comprima los adjuntos correctamente.',
            pt: 'Evite e-mails devolvidos. Comprima os anexos corretamente.',
            fr: 'Évitez les e-mails rejetés. Compressez correctement les pièces jointes.',
            de: 'Vermeiden Sie zurückgewiesene E-Mails. Komprimieren Sie Anhänge richtig.',
        },
    },
    {
        slug: 'reduce-image-size-for-website',
        title: {
            en: '5 Ways to Reduce Image Size for Your Website',
            ru: '5 способов уменьшить размер картинки для сайта',
            es: '5 maneras de reducir el tamaño de las imágenes para tu sitio web',
            pt: '5 maneiras de reduzir o tamanho das imagens para o seu site',
            fr: '5 façons de réduire la taille des images pour votre site web',
            de: '5 Wege, um die Bildgröße für Ihre Website zu reduzieren',
        },
        description: {
            en: 'Speed up your website with these proven techniques.',
            ru: 'Ускорьте свой сайт с помощью этих проверенных техник.',
            es: 'Acelere su sitio web con estas técnicas probadas.',
            pt: 'Acelere seu site com estas técnicas comprovadas.',
            fr: 'Accélérez votre site web avec ces techniques éprouvées.',
            de: 'Beschleunigen Sie Ihre Website mit diesen bewährten Techniken.',
        },
    },
    {
        slug: 'free-tinypng-alternatives',
        title: {
            en: 'Best Free TinyPNG Alternatives in 2026',
            ru: 'Бесплатные аналоги TinyPNG: обзор онлайн-компрессоров',
            es: 'Mejores alternativas gratuitas a TinyPNG en 2026',
            pt: 'Melhores alternativas gratuitas ao TinyPNG em 2026',
            fr: 'Meilleures alternatives gratuites à TinyPNG en 2026',
            de: 'Beste kostenlose TinyPNG-Alternativen 2026',
        },
        description: {
            en: 'Looking for a free alternative to TinyPNG? Compare the best.',
            ru: 'Ищете бесплатный аналог TinyPNG? Сравнение лучших.',
            es: '¿Busca una alternativa gratuita a TinyPNG? Compare las mejores.',
            pt: 'Procurando uma alternativa gratuita ao TinyPNG? Compare as melhores.',
            fr: 'Vous cherchez une alternative gratuite à TinyPNG ? Comparez les meilleures.',
            de: 'Suchen Sie eine kostenlose Alternative zu TinyPNG? Vergleichen Sie die besten.',
        },
    },
    {
        slug: 'avif-vs-jpeg',
        title: {
            en: 'AVIF vs JPEG: Should You Switch in 2026?',
            ru: 'AVIF против JPEG: стоит ли переходить в 2026 году?',
            es: 'AVIF vs JPEG: ¿Vale la pena cambiar en 2026?',
            pt: 'AVIF vs JPEG: Vale a pena mudar em 2026?',
            fr: 'AVIF vs JPEG : Faut-il passer à l\'AVIF en 2026 ?',
            de: 'AVIF vs JPEG: Lohnt sich der Wechsel 2026?',
        },
        description: {
            en: 'AVIF promises 50% better compression than JPEG. Is it ready?',
            ru: 'AVIF обещает сжатие на 50% лучше JPEG. Готов ли он?',
            es: 'AVIF promete una compresión un 50% mejor que JPEG. ¿Está listo?',
            pt: 'AVIF promete compressão 50% melhor que JPEG. Está pronto?',
            fr: 'L\'AVIF promet une compression 50% meilleure que le JPEG. Est-il prêt ?',
            de: 'AVIF verspricht 50% bessere Kompression als JPEG. Ist es bereit?',
        },
    },
    {
        slug: 'compress-image-to-100kb',
        title: {
            en: 'How to Compress an Image to Exactly 100 KB Online',
            ru: 'Как сжать изображение до 100 КБ онлайн',
            es: 'Cómo comprimir una imagen a exactamente 100 KB en línea',
            pt: 'Como comprimir uma imagem para exatamente 100 KB online',
            fr: 'Comment compresser une image à exactement 100 Ko en ligne',
            de: 'Wie man ein Bild online auf genau 100 KB komprimiert',
        },
        description: {
            en: 'Need a file exactly under 100 KB? Step-by-step guide.',
            ru: 'Нужен файл ровно до 100 КБ? Пошаговое руководство.',
            es: '¿Necesita un archivo de exactamente 100 KB? Guía paso a paso.',
            pt: 'Precisa de um arquivo exatamente com 100 KB? Guia passo a passo.',
            fr: 'Besoin d\'un fichier de exactement 100 Ko ? Guide étape par étape.',
            de: 'Brauchen Sie eine Datei mit genau 100 KB? Schritt-für-Schritt-Anleitung.',
        },
    },
    {
        slug: 'convert-heic-to-jpeg-windows',
        title: {
            en: 'How to Convert HEIC to JPEG on Windows Quickly',
            ru: 'Как быстро конвертировать HEIC в JPEG на Windows',
            es: 'Cómo convertir HEIC a JPEG en Windows rápidamente',
            pt: 'Como converter HEIC para JPEG no Windows rapidamente',
            fr: 'Comment convertir rapidement HEIC en JPEG sur Windows',
            de: 'HEIC schnell in JPEG unter Windows konvertieren',
        },
        description: {
            en: 'Windows doesn\'t open HEIC natively. Learn the fastest way.',
            ru: 'Windows не открывает HEIC. Самый быстрый способ конвертации.',
            es: 'Windows no abre HEIC de forma nativa. Aprenda la forma más rápida.',
            pt: 'O Windows não abre HEIC nativamente. Aprenda a maneira mais rápida.',
            fr: 'Windows n\'ouvre pas les fichiers HEIC nativement. Apprenez le moyen le plus rapide.',
            de: 'Windows öffnet HEIC nicht nativ. Erfahren Sie den schnellsten Weg.',
        },
    },
    {
        slug: 'website-slow-because-of-images',
        title: {
            en: 'Is Your Website Slow? Optimize Images to Speed It Up',
            ru: 'Почему ваш сайт тормозит? Оптимизация изображений для ускорения',
            es: '¿Tu sitio web es lento? Optimiza las imágenes para acelerarlo',
            pt: 'Seu site está lento? Otimize as imagens para acelerá-lo',
            fr: 'Votre site est lent ? Optimisez les images pour l\'accélérer',
            de: 'Ist Ihre Website langsam? Optimieren Sie Bilder zur Beschleunigung',
        },
        description: {
            en: 'Unoptimized images are the #1 cause of slow websites.',
            ru: 'Неоптимизированные изображения — причина №1 медленных сайтов.',
            es: 'Las imágenes no optimizadas son la causa #1 de sitios lentos.',
            pt: 'Imagens não otimizadas são a causa nº 1 de sites lentos.',
            fr: 'Les images non optimisées sont la cause n°1 des sites lents.',
            de: 'Nicht optimierte Bilder sind die Hauptursache für langsame Websites.',
        },
    },
    {
        slug: 'online-video-to-gif-converters',
        title: {
            en: 'Best Online Video to GIF Converters Compared',
            ru: 'Сравнение онлайн-конвертеров видео в GIF',
            es: 'Comparativa de los mejores conversores online de video a GIF',
            pt: 'Comparação dos melhores conversores online de vídeo para GIF',
            fr: 'Comparatif des meilleurs convertisseurs vidéo en GIF en ligne',
            de: 'Vergleich der besten Online-Video-zu-GIF-Konverter',
        },
        description: {
            en: 'Compare the top online tools for converting MP4 to GIF.',
            ru: 'Сравнение лучших онлайн-инструментов для конвертации MP4 в GIF.',
            es: 'Compare las mejores herramientas online para convertir MP4 a GIF.',
            pt: 'Compare as melhores ferramentas online para converter MP4 para GIF.',
            fr: 'Comparez les meilleurs outils en ligne pour convertir MP4 en GIF.',
            de: 'Vergleichen Sie die besten Online-Tools zum Konvertieren von MP4 in GIF.',
        },
    },
    {
        slug: 'compress-pdf-without-quality-loss',
        title: {
            en: 'How to Compress PDF Without Losing Text Quality',
            ru: 'Как сжать PDF без потери читаемости текста',
            es: 'Cómo comprimir un PDF sin perder la calidad del texto',
            pt: 'Como comprimir PDF sem perder a qualidade do texto',
            fr: 'Comment compresser un PDF sans perte de qualité du texte',
            de: 'PDF komprimieren ohne Verlust der Textqualität',
        },
        description: {
            en: 'Need a smaller PDF but text must stay sharp?',
            ru: 'Нужен PDF меньшего размера, но текст должен остаться чётким?',
            es: '¿Necesita un PDF más pequeño pero con texto nítido?',
            pt: 'Precisa de um PDF menor, mas com texto nítido?',
            fr: 'Besoin d\'un PDF plus petit mais avec un texte net ?',
            de: 'Brauchen Sie ein kleineres PDF, aber der Text muss scharf bleiben?',
        },
    },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const isRu = langKey === 'ru';
    return {
        title: isRu ? 'Блог – Zipply' : 'Blog – Zipply',
        description: isRu
            ? 'Статьи о сжатии изображений, форматах и оптимизации.'
            : 'Articles about image compression, formats, and optimization.',
        alternates: {
            canonical: `${BASE_URL}/${lang}/blog`,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/blog`])),
        },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: 'Blog', url: `/${lang}/blog` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold mb-8">
                {langKey === 'ru' ? 'Блог' : 'Blog'}
            </h1>
            <div className="grid gap-6">
                {articles.map(article => (
                    <Link
                        key={article.slug}
                        href={`/${lang}/blog/${article.slug}`}
                        className="block p-6 border rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {article.title[langKey] || article.title.en}
                        </h2>
                        <p className="text-gray-600">
                            {article.description[langKey] || article.description.en}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}