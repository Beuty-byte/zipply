// app/[lang]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ru';

const LANGUAGES: Lang[] = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://zipply.io';

const data: Record<Lang, {
    badge: string;
    heroTitle: string;
    heroSub: string;
    cta: string;
    formatsLabel: string;
    formatsTitle: string;
    whyLabel: string;
    whyTitle: string;
    toolsTitle: string;
    compressLabel: string;
    convertLabel: string;
    readyTitle: string;
    readySub: string;
    readyCta: string;
    aboutTitle: string;
    aboutText1: string;
    aboutText2: string;
    aboutText3: string;
}> = {
    en: {
        badge: 'Free & Private',
        heroTitle: 'Compress images in seconds',
        heroSub: 'Reduce file size up to 80% while maintaining quality. Free, fast, and processed entirely in your browser.',
        cta: 'Start Compressing',
        formatsLabel: 'SUPPORTED FORMATS',
        formatsTitle: 'Convert between all major image formats',
        whyLabel: 'WHY ZIPPLY',
        whyTitle: 'Built for speed, security, and simplicity',
        toolsTitle: 'All Tools',
        compressLabel: 'Compress',
        convertLabel: 'Convert',
        readyTitle: 'Ready to compress your images?',
        readySub: 'Free, fast, and completely private.',
        readyCta: 'Start for Free',
        aboutTitle: 'Free Online Image Compressor & Converter',
        aboutText1: 'Zipply is a free online tool for compressing and converting images. Reduce the file size of your JPEG, PNG, WebP, GIF, SVG, and AVIF images without losing quality. All processing happens directly in your browser — your files never leave your device.',
        aboutText2: 'No registration, no uploads, no limits. Just fast, private, and secure image optimization for web, email, social media, and more.',
        aboutText3: 'With support for modern formats like WebP and AVIF, batch processing, and smart compression algorithms, Zipply helps you improve website performance, save storage space, and boost SEO rankings.',
    },
    ru: {
        badge: 'Бесплатно и приватно',
        heroTitle: 'Сжимайте изображения за секунды',
        heroSub: 'Уменьшайте размер до 80% без потери качества. Бесплатно, быстро и полностью в браузере.',
        cta: 'Начать сжатие',
        formatsLabel: 'ПОДДЕРЖИВАЕМЫЕ ФОРМАТЫ',
        formatsTitle: 'Конвертируйте между всеми популярными форматами',
        whyLabel: 'ПОЧЕМУ ZIPPLY',
        whyTitle: 'Создан для скорости, безопасности и простоты',
        toolsTitle: 'Все инструменты',
        compressLabel: 'Сжатие',
        convertLabel: 'Конвертация',
        readyTitle: 'Готовы сжать изображения?',
        readySub: 'Бесплатно, быстро и полностью приватно.',
        readyCta: 'Начать бесплатно',
        aboutTitle: 'Бесплатное сжатие и конвертация изображений онлайн',
        aboutText1: 'Zipply — это бесплатный онлайн-инструмент для сжатия и конвертации изображений.',
        aboutText2: 'Без регистрации, без загрузок на сервер, без ограничений.',
        aboutText3: 'Поддержка WebP, AVIF, пакетная обработка и умные алгоритмы сжатия.',
    },
    es: {
        badge: 'Gratis y privado', heroTitle: 'Comprime imágenes en segundos', heroSub: 'Reduce el tamaño hasta un 80% manteniendo la calidad.', cta: 'Comenzar a comprimir',
        formatsLabel: 'FORMATOS COMPATIBLES', formatsTitle: 'Convierte entre los principales formatos', whyLabel: 'POR QUÉ ZIPPLY', whyTitle: 'Velocidad, seguridad y simplicidad',
        toolsTitle: 'Todas las herramientas', compressLabel: 'Comprimir', convertLabel: 'Convertir', readyTitle: '¿Listo para comprimir?', readySub: 'Gratis, rápido y privado.', readyCta: 'Comenzar gratis',
        aboutTitle: 'Compresor de imágenes online gratuito', aboutText1: 'Zipply es una herramienta online gratuita para comprimir y convertir imágenes.', aboutText2: 'Sin registro, sin subidas, sin límites.', aboutText3: 'Soporte para formatos modernos y algoritmos inteligentes.',
    },
    pt: {
        badge: 'Grátis e privado', heroTitle: 'Comprima imagens em segundos', heroSub: 'Reduza o tamanho até 80% mantendo a qualidade.', cta: 'Começar a comprimir',
        formatsLabel: 'FORMATOS SUPORTADOS', formatsTitle: 'Converta entre os principais formatos', whyLabel: 'POR QUE ZIPPLY', whyTitle: 'Velocidade, segurança e simplicidade',
        toolsTitle: 'Todas as ferramentas', compressLabel: 'Comprimir', convertLabel: 'Converter', readyTitle: 'Pronto para comprimir?', readySub: 'Grátis, rápido e privado.', readyCta: 'Começar grátis',
        aboutTitle: 'Compressor de imagens online grátis', aboutText1: 'Zipply é uma ferramenta online gratuita para comprimir e converter imagens.', aboutText2: 'Sem registro, sem uploads, sem limites.', aboutText3: 'Suporte para formatos modernos e algoritmos inteligentes.',
    },
    fr: {
        badge: 'Gratuit et privé', heroTitle: 'Compressez des images en quelques secondes', heroSub: 'Réduisez la taille jusqu\'à 80%.', cta: 'Commencer à compresser',
        formatsLabel: 'FORMATS SUPPORTÉS', formatsTitle: 'Convertissez entre tous les formats', whyLabel: 'POURQUOI ZIPPLY', whyTitle: 'Vitesse, sécurité et simplicité',
        toolsTitle: 'Tous les outils', compressLabel: 'Compresser', convertLabel: 'Convertir', readyTitle: 'Prêt à compresser ?', readySub: 'Gratuit, rapide et privé.', readyCta: 'Commencer gratuitement',
        aboutTitle: 'Compresseur d\'images en ligne gratuit', aboutText1: 'Zipply est un outil en ligne gratuit pour compresser et convertir des images.', aboutText2: 'Pas d\'inscription, pas de limites.', aboutText3: 'Formats modernes et algorithmes intelligents.',
    },
    de: {
        badge: 'Kostenlos & privat', heroTitle: 'Bilder in Sekunden komprimieren', heroSub: 'Reduzieren Sie die Dateigröße um bis zu 80%.', cta: 'Jetzt komprimieren',
        formatsLabel: 'UNTERSTÜTZTE FORMATE', formatsTitle: 'Konvertieren Sie zwischen allen Formaten', whyLabel: 'WARUM ZIPPLY', whyTitle: 'Geschwindigkeit, Sicherheit, Einfachheit',
        toolsTitle: 'Alle Tools', compressLabel: 'Komprimieren', convertLabel: 'Konvertieren', readyTitle: 'Bereit zum Komprimieren?', readySub: 'Kostenlos, schnell und privat.', readyCta: 'Kostenlos starten',
        aboutTitle: 'Kostenloser Online-Bildkompressor', aboutText1: 'Zipply ist ein kostenloses Online-Tool zum Komprimieren und Konvertieren von Bildern.', aboutText2: 'Keine Registrierung, keine Limits.', aboutText3: 'Moderne Formate und intelligente Algorithmen.',
    },
};

const compressTools = [
    { href: 'compress/jpeg', label: { en: 'Compress JPEG', ru: 'Сжать JPEG', es: 'Comprimir JPEG', pt: 'Comprimir JPEG', fr: 'Compresser JPEG', de: 'JPEG komprimieren' } },
    { href: 'compress/png', label: { en: 'Compress PNG', ru: 'Сжать PNG', es: 'Comprimir PNG', pt: 'Comprimir PNG', fr: 'Compresser PNG', de: 'PNG komprimieren' } },
    { href: 'compress/webp', label: { en: 'Compress WebP', ru: 'Сжать WebP', es: 'Comprimir WebP', pt: 'Comprimir WebP', fr: 'Compresser WebP', de: 'WebP komprimieren' } },
    { href: 'compress/gif', label: { en: 'Compress GIF', ru: 'Сжать GIF', es: 'Comprimir GIF', pt: 'Comprimir GIF', fr: 'Compresser GIF', de: 'GIF komprimieren' } },
    { href: 'compress/svg', label: { en: 'Compress SVG', ru: 'Сжать SVG', es: 'Comprimir SVG', pt: 'Comprimir SVG', fr: 'Compresser SVG', de: 'SVG komprimieren' } },
    { href: 'compress/avif', label: { en: 'Compress AVIF', ru: 'Сжать AVIF', es: 'Comprimir AVIF', pt: 'Comprimir AVIF', fr: 'Compresser AVIF', de: 'AVIF komprimieren' } },
    { href: 'video/compress', label: { en: 'Compress Video', ru: 'Сжать видео', es: 'Comprimir video', pt: 'Comprimir vídeo', fr: 'Compresser vidéo', de: 'Video komprimieren' } },
    { href: 'resize', label: { en: 'Resize Image', ru: 'Изменить размер', es: 'Redimensionar', pt: 'Redimensionar', fr: 'Redimensionner', de: 'Bild skalieren' } },
];

const convertTools = [
    { href: 'convert/png-to-jpg', label: { en: 'PNG to JPG', ru: 'PNG в JPG', es: 'PNG a JPG', pt: 'PNG para JPG', fr: 'PNG en JPG', de: 'PNG zu JPG' } },
    { href: 'convert/jpg-to-png', label: { en: 'JPG to PNG', ru: 'JPG в PNG', es: 'JPG a PNG', pt: 'JPG para PNG', fr: 'JPG en PNG', de: 'JPG zu PNG' } },
    { href: 'convert/png-to-webp', label: { en: 'PNG to WebP', ru: 'PNG в WebP', es: 'PNG a WebP', pt: 'PNG para WebP', fr: 'PNG en WebP', de: 'PNG zu WebP' } },
    { href: 'convert/jpg-to-webp', label: { en: 'JPG to WebP', ru: 'JPG в WebP', es: 'JPG a WebP', pt: 'JPG para WebP', fr: 'JPG en WebP', de: 'JPG zu WebP' } },
    { href: 'convert/webp-to-jpg', label: { en: 'WebP to JPG', ru: 'WebP в JPG', es: 'WebP a JPG', pt: 'WebP para JPG', fr: 'WebP en JPG', de: 'WebP zu JPG' } },
    { href: 'convert/webp-to-png', label: { en: 'WebP to PNG', ru: 'WebP в PNG', es: 'WebP a PNG', pt: 'WebP para PNG', fr: 'WebP en PNG', de: 'WebP zu PNG' } },
    { href: 'convert/svg-to-png', label: { en: 'SVG to PNG', ru: 'SVG в PNG', es: 'SVG a PNG', pt: 'SVG para PNG', fr: 'SVG en PNG', de: 'SVG zu PNG' } },
    { href: 'convert/gif-to-mp4', label: { en: 'GIF to MP4', ru: 'GIF в MP4', es: 'GIF a MP4', pt: 'GIF para MP4', fr: 'GIF en MP4', de: 'GIF zu MP4' } },
    { href: 'convert/mp4-to-gif', label: { en: 'MP4 to GIF', ru: 'MP4 в GIF', es: 'MP4 a GIF', pt: 'MP4 para GIF', fr: 'MP4 en GIF', de: 'MP4 zu GIF' } },
    { href: 'convert/video-to-audio', label: { en: 'Video to Audio', ru: 'Видео в аудио', es: 'Video a audio', pt: 'Vídeo para áudio', fr: 'Vidéo en audio', de: 'Video zu Audio' } },
    { href: 'convert/video-convert', label: { en: 'Video Converter', ru: 'Конвертер видео', es: 'Convertidor de video', pt: 'Conversor de vídeo', fr: 'Convertisseur vidéo', de: 'Video-Konverter' } },
    { href: 'convert/mov-to-mp4', label: { en: 'MOV to MP4', ru: 'MOV в MP4', es: 'MOV a MP4', pt: 'MOV para MP4', fr: 'MOV en MP4', de: 'MOV zu MP4' } },
    { href: 'convert/avi-to-mp4', label: { en: 'AVI to MP4', ru: 'AVI в MP4', es: 'AVI a MP4', pt: 'AVI para MP4', fr: 'AVI en MP4', de: 'AVI zu MP4' } },
    { href: 'convert/mkv-to-mp4', label: { en: 'MKV to MP4', ru: 'MKV в MP4', es: 'MKV a MP4', pt: 'MKV para MP4', fr: 'MKV en MP4', de: 'MKV zu MP4' } },
    { href: 'convert/to-webm', label: { en: 'To WebM', ru: 'В WebM', es: 'A WebM', pt: 'Para WebM', fr: 'En WebM', de: 'Zu WebM' } },
];

const formats = [
    { ext: 'jpg', label: 'JPEG', desc: { en: 'Best for photos', ru: 'Лучше для фото', es: 'Mejor para fotos', pt: 'Melhor para fotos', fr: 'Idéal pour les photos', de: 'Am besten für Fotos' } as Record<Lang, string>, color: 'bg-blue-50 text-blue-700' },
    { ext: 'png', label: 'PNG', desc: { en: 'Best for graphics', ru: 'Лучше для графики', es: 'Mejor para gráficos', pt: 'Melhor para gráficos', fr: 'Idéal pour les graphiques', de: 'Am besten für Grafiken' } as Record<Lang, string>, color: 'bg-green-50 text-green-700' },
    { ext: 'webp', label: 'WebP', desc: { en: 'Modern & efficient', ru: 'Современный', es: 'Moderno y eficiente', pt: 'Moderno e eficiente', fr: 'Moderne et efficace', de: 'Modern & effizient' } as Record<Lang, string>, color: 'bg-purple-50 text-purple-700' },
    { ext: 'avif', label: 'AVIF', desc: { en: 'Next-gen format', ru: 'Новое поколение', es: 'Formato de nueva generación', pt: 'Formato de nova geração', fr: 'Format nouvelle génération', de: 'Next-Gen-Format' } as Record<Lang, string>, color: 'bg-orange-50 text-orange-700' },
];

const features = [
    { icon: '🔒', title: { en: '100% Secure', ru: '100% Безопасно', es: '100% Seguro', pt: '100% Seguro', fr: '100% Sécurisé', de: '100% Sicher' } as Record<Lang, string>, desc: { en: 'Your files never leave your browser.', ru: 'Файлы не покидают браузер.', es: 'Tus archivos nunca salen de tu navegador.', pt: 'Seus arquivos nunca saem do seu navegador.', fr: 'Vos fichiers ne quittent jamais votre navigateur.', de: 'Ihre Dateien verlassen nie Ihren Browser.' } as Record<Lang, string> },
    { icon: '⚡', title: { en: 'Lightning Fast', ru: 'Молниеносно', es: 'Rapidísimo', pt: 'Rapidíssimo', fr: 'Ultra rapide', de: 'Blitzschnell' } as Record<Lang, string>, desc: { en: 'Powered by modern browser APIs.', ru: 'Современные API браузера.', es: 'Impulsado por APIs modernas.', pt: 'Alimentado por APIs modernas.', fr: 'Propulsé par des API modernes.', de: 'Powered by moderne Browser-APIs.' } as Record<Lang, string> },
    { icon: '🛡️', title: { en: 'Privacy First', ru: 'Приватность', es: 'Privacidad primero', pt: 'Privacidade primeiro', fr: 'Confidentialité d\'abord', de: 'Privatsphäre zuerst' } as Record<Lang, string>, desc: { en: 'No uploads, no servers, no data collection.', ru: 'Без загрузок, серверов и сбора данных.', es: 'Sin subidas, sin servidores.', pt: 'Sem uploads, sem servidores.', fr: 'Pas de téléchargement, pas de serveurs.', de: 'Keine Uploads, keine Server.' } as Record<Lang, string> },
    { icon: '📦', title: { en: 'Batch Processing', ru: 'Пакетная обработка', es: 'Procesamiento por lotes', pt: 'Processamento em lote', fr: 'Traitement par lots', de: 'Stapelverarbeitung' } as Record<Lang, string>, desc: { en: 'Compress multiple images at once.', ru: 'Сжимайте несколько изображений сразу.', es: 'Comprime varias imágenes a la vez.', pt: 'Comprima várias imagens de uma vez.', fr: 'Compressez plusieurs images à la fois.', de: 'Komprimieren Sie mehrere Bilder auf einmal.' } as Record<Lang, string> },
    { icon: '✨', title: { en: 'Quality Preservation', ru: 'Сохранение качества', es: 'Preservación de calidad', pt: 'Preservação de qualidade', fr: 'Préservation de la qualité', de: 'Qualitätserhalt' } as Record<Lang, string>, desc: { en: 'Smart algorithms reduce size while maintaining visual quality.', ru: 'Умные алгоритмы сохраняют качество.', es: 'Algoritmos inteligentes que mantienen la calidad visual.', pt: 'Algoritmos inteligentes que mantêm a qualidade visual.', fr: 'Algorithmes intelligents qui préservent la qualité visuelle.', de: 'Intelligente Algorithmen, die die visuelle Qualität erhalten.' } as Record<Lang, string> },
    { icon: '🌐', title: { en: 'Works Everywhere', ru: 'Работает везде', es: 'Funciona en todas partes', pt: 'Funciona em todo lugar', fr: 'Fonctionne partout', de: 'Funktioniert überall' } as Record<Lang, string>, desc: { en: 'No installation needed. Works on any device with a modern browser.', ru: 'Не требует установки. Работает на любом устройстве.', es: 'Sin instalación. Funciona en cualquier dispositivo.', pt: 'Sem instalação. Funciona em qualquer dispositivo.', fr: 'Aucune installation nécessaire. Fonctionne sur n\'importe quel appareil.', de: 'Keine Installation nötig. Funktioniert auf jedem Gerät.' } as Record<Lang, string> },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    return {
        title: 'Zipply — ' + data[langKey].heroTitle,
        description: data[langKey].heroSub,
        alternates: { canonical: `${BASE_URL}/${lang}`, languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}`])) },
    };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const d = data[langKey];

    return (
        <div className="bg-white">
            {/* ── HERO ── */}
            <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {d.badge}
          </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">{d.heroTitle}</h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">{d.heroSub}</p>
                    <Link href={`/${lang}/compress/jpeg`} className="inline-flex items-center px-8 py-3.5 bg-[#007BFF] hover:bg-[#0056CC] text-white font-semibold rounded-xl text-base transition-all shadow-lg shadow-blue-500/25">
                        {d.cta} →
                    </Link>
                </div>
            </section>

            {/* ── ALL TOOLS (перемещено сразу под hero) ── */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-10 text-gray-500">{d.toolsTitle}</h2>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#007BFF] rounded-full" />
                            {d.compressLabel}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {compressTools.map(tool => (
                                <Link key={tool.href} href={`/${lang}/${tool.href}`}
                                      className="p-3 bg-white border border-gray-200 rounded-xl hover:border-[#007BFF] hover:shadow-md text-sm font-medium text-gray-700 hover:text-[#007BFF] transition-all text-center">
                                    {tool.label[langKey] || tool.label.en}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            {d.convertLabel}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {convertTools.map(tool => (
                                <Link key={tool.href} href={`/${lang}/${tool.href}`}
                                      className="p-3 bg-white border border-gray-200 rounded-xl hover:border-[#007BFF] hover:shadow-md text-sm font-medium text-gray-700 hover:text-[#007BFF] transition-all text-center">
                                    {tool.label[langKey] || tool.label.en}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-500">{d.aboutTitle}</h2>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                        <p>{d.aboutText1}</p>
                        <p>{d.aboutText2}</p>
                        <p>{d.aboutText3}</p>
                    </div>
                </div>
            </section>

            {/* ── FORMATS ── */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-xs font-semibold text-[#007BFF] uppercase tracking-widest mb-3 text-center">{d.formatsLabel}</p>
                    <h2 className="text-2xl font-bold text-center mb-10 text-gray-500">{d.formatsTitle}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formats.map(f => (
                            <div key={f.ext} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#007BFF] hover:shadow-xl transition-all text-center">
                                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-lg font-bold`}>.{f.ext}</div>
                                <p className="font-bold text-gray-900">{f.label}</p>
                                <p className="text-sm text-gray-500 mt-1">{f.desc[langKey]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <p className="text-xs font-semibold text-[#007BFF] uppercase tracking-widest mb-3 text-center">{d.whyLabel}</p>
                    <h2 className="text-2xl font-bold text-center mb-10 text-gray-500">{d.whyTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map(f => (
                            <div key={f.title.en} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#007BFF] hover:shadow-xl transition-all">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                                <p className="font-bold text-lg text-gray-900 mb-2">{f.title[langKey]}</p>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.desc[langKey]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 bg-gradient-to-r from-[#007BFF] to-[#0056CC] text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">{d.readyTitle}</h2>
                    <p className="text-white/80 text-lg mb-8">{d.readySub}</p>
                    <Link href={`/${lang}/compress/jpeg`} className="inline-flex items-center px-10 py-4 bg-white text-[#007BFF] font-bold rounded-xl text-lg hover:bg-gray-100 transition-all shadow-lg">{d.readyCta}</Link>
                </div>
            </section>
        </div>
    );
}