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
    orDrop: string;
    privacyNote: string;
    formatsLabel: string;
    formatsTitle: string;
    whyLabel: string;
    whyTitle: string;
    allTools: string;
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
        cta: 'Browse Files',
        orDrop: 'or drop files',
        privacyNote: 'Your files are processed locally in your browser',
        formatsLabel: 'SUPPORTED FORMATS',
        formatsTitle: 'Convert between all major image formats',
        whyLabel: 'WHY ZIPPLY',
        whyTitle: 'Built for speed, security, and simplicity',
        allTools: 'All Tools',
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
        cta: 'Выбрать файлы',
        orDrop: 'или перетащите',
        privacyNote: 'Файлы обрабатываются локально в браузере',
        formatsLabel: 'ПОДДЕРЖИВАЕМЫЕ ФОРМАТЫ',
        formatsTitle: 'Конвертируйте между всеми популярными форматами',
        whyLabel: 'ПОЧЕМУ ZIPPLY',
        whyTitle: 'Создан для скорости, безопасности и простоты',
        allTools: 'Все инструменты',
        readyTitle: 'Готовы сжать изображения?',
        readySub: 'Бесплатно, быстро и полностью приватно.',
        readyCta: 'Начать бесплатно',
        aboutTitle: 'Бесплатное сжатие и конвертация изображений онлайн',
        aboutText1: 'Zipply — это бесплатный онлайн-инструмент для сжатия и конвертации изображений. Уменьшайте размер файлов JPEG, PNG, WebP, GIF, SVG и AVIF без потери качества. Вся обработка происходит прямо в вашем браузере — файлы никогда не покидают ваше устройство.',
        aboutText2: 'Без регистрации, без загрузок на сервер, без ограничений. Просто быстрая, приватная и безопасная оптимизация изображений для веба, email, соцсетей и не только.',
        aboutText3: 'Благодаря поддержке современных форматов (WebP, AVIF), пакетной обработке и умным алгоритмам сжатия, Zipply помогает ускорить сайты, сэкономить место и улучшить позиции в поисковых системах.',
    },
    es: {
        badge: 'Gratis y privado',
        heroTitle: 'Comprime imágenes en segundos',
        heroSub: 'Reduce el tamaño hasta un 80% manteniendo la calidad. Gratis, rápido y procesado en tu navegador.',
        cta: 'Seleccionar archivos',
        orDrop: 'o arrastra y suelta',
        privacyNote: 'Tus archivos se procesan localmente en tu navegador',
        formatsLabel: 'FORMATOS COMPATIBLES',
        formatsTitle: 'Convierte entre los principales formatos de imagen',
        whyLabel: 'POR QUÉ ZIPPLY',
        whyTitle: 'Diseñado para velocidad, seguridad y simplicidad',
        allTools: 'Todas las herramientas',
        readyTitle: '¿Listo para comprimir tus imágenes?',
        readySub: 'Gratis, rápido y completamente privado.',
        readyCta: 'Comenzar gratis',
        aboutTitle: 'Compresor y convertidor de imágenes online gratuito',
        aboutText1: 'Zipply es una herramienta online gratuita para comprimir y convertir imágenes. Reduce el tamaño de tus archivos JPEG, PNG, WebP, GIF, SVG y AVIF sin perder calidad. Todo el procesamiento ocurre directamente en tu navegador: tus archivos nunca salen de tu dispositivo.',
        aboutText2: 'Sin registro, sin subidas, sin límites. Solo optimización de imágenes rápida, privada y segura para web, email, redes sociales y más.',
        aboutText3: 'Con soporte para formatos modernos como WebP y AVIF, procesamiento por lotes y algoritmos inteligentes de compresión, Zipply te ayuda a mejorar el rendimiento web, ahorrar espacio y potenciar tu SEO.',
    },
    pt: {
        badge: 'Grátis e privado',
        heroTitle: 'Comprima imagens em segundos',
        heroSub: 'Reduza o tamanho até 80% mantendo a qualidade. Grátis, rápido e processado no seu navegador.',
        cta: 'Selecionar arquivos',
        orDrop: 'ou arraste e solte',
        privacyNote: 'Seus arquivos são processados localmente no seu navegador',
        formatsLabel: 'FORMATOS SUPORTADOS',
        formatsTitle: 'Converta entre os principais formatos de imagem',
        whyLabel: 'POR QUE ZIPPLY',
        whyTitle: 'Feito para velocidade, segurança e simplicidade',
        allTools: 'Todas as ferramentas',
        readyTitle: 'Pronto para comprimir suas imagens?',
        readySub: 'Grátis, rápido e completamente privado.',
        readyCta: 'Começar grátis',
        aboutTitle: 'Compressor e conversor de imagens online grátis',
        aboutText1: 'Zipply é uma ferramenta online gratuita para comprimir e converter imagens. Reduza o tamanho dos seus arquivos JPEG, PNG, WebP, GIF, SVG e AVIF sem perder qualidade. Todo o processamento acontece diretamente no seu navegador — seus arquivos nunca saem do seu dispositivo.',
        aboutText2: 'Sem registro, sem uploads, sem limites. Apenas otimização de imagens rápida, privada e segura para web, e-mail, redes sociais e muito mais.',
        aboutText3: 'Com suporte para formatos modernos como WebP e AVIF, processamento em lote e algoritmos inteligentes de compressão, o Zipply ajuda você a melhorar o desempenho do site, economizar espaço e impulsionar o SEO.',
    },
    fr: {
        badge: 'Gratuit et privé',
        heroTitle: 'Compressez des images en quelques secondes',
        heroSub: 'Réduisez la taille jusqu\'à 80% tout en conservant la qualité. Gratuit, rapide et traité dans votre navigateur.',
        cta: 'Sélectionner des fichiers',
        orDrop: 'ou glissez-déposez',
        privacyNote: 'Vos fichiers sont traités localement dans votre navigateur',
        formatsLabel: 'FORMATS SUPPORTÉS',
        formatsTitle: 'Convertissez entre tous les principaux formats d\'image',
        whyLabel: 'POURQUOI ZIPPLY',
        whyTitle: 'Conçu pour la vitesse, la sécurité et la simplicité',
        allTools: 'Tous les outils',
        readyTitle: 'Prêt à compresser vos images ?',
        readySub: 'Gratuit, rapide et totalement privé.',
        readyCta: 'Commencer gratuitement',
        aboutTitle: 'Compresseur et convertisseur d\'images en ligne gratuit',
        aboutText1: 'Zipply est un outil en ligne gratuit pour compresser et convertir des images. Réduisez la taille de vos fichiers JPEG, PNG, WebP, GIF, SVG et AVIF sans perte de qualité. Tout le traitement se fait directement dans votre navigateur — vos fichiers ne quittent jamais votre appareil.',
        aboutText2: 'Pas d\'inscription, pas de téléchargement, pas de limites. Juste une optimisation d\'image rapide, privée et sécurisée pour le web, les emails, les réseaux sociaux et plus encore.',
        aboutText3: 'Grâce à la prise en charge des formats modernes comme WebP et AVIF, au traitement par lots et aux algorithmes de compression intelligents, Zipply vous aide à améliorer les performances de votre site, à économiser de l\'espace et à booster votre SEO.',
    },
    de: {
        badge: 'Kostenlos & privat',
        heroTitle: 'Bilder in Sekunden komprimieren',
        heroSub: 'Reduzieren Sie die Dateigröße um bis zu 80% bei hoher Qualität. Kostenlos, schnell und im Browser verarbeitet.',
        cta: 'Dateien auswählen',
        orDrop: 'oder per Drag & Drop',
        privacyNote: 'Ihre Dateien werden lokal in Ihrem Browser verarbeitet',
        formatsLabel: 'UNTERSTÜTZTE FORMATE',
        formatsTitle: 'Konvertieren Sie zwischen allen gängigen Bildformaten',
        whyLabel: 'WARUM ZIPPLY',
        whyTitle: 'Entwickelt für Geschwindigkeit, Sicherheit und Einfachheit',
        allTools: 'Alle Tools',
        readyTitle: 'Bereit, Ihre Bilder zu komprimieren?',
        readySub: 'Kostenlos, schnell und absolut privat.',
        readyCta: 'Kostenlos starten',
        aboutTitle: 'Kostenloser Online-Bildkompressor und -Konverter',
        aboutText1: 'Zipply ist ein kostenloses Online-Tool zum Komprimieren und Konvertieren von Bildern. Reduzieren Sie die Größe Ihrer JPEG-, PNG-, WebP-, GIF-, SVG- und AVIF-Dateien ohne Qualitätsverlust. Die gesamte Verarbeitung findet direkt in Ihrem Browser statt — Ihre Dateien verlassen nie Ihr Gerät.',
        aboutText2: 'Keine Registrierung, keine Uploads, keine Limits. Nur schnelle, private und sichere Bildoptimierung für Web, E-Mail, soziale Medien und mehr.',
        aboutText3: 'Mit Unterstützung für moderne Formate wie WebP und AVIF, Stapelverarbeitung und intelligenten Komprimierungsalgorithmen hilft Ihnen Zipply, die Website-Performance zu verbessern, Speicherplatz zu sparen und Ihr SEO zu verbessern.',
    },
};

const formats = [
    { ext: 'jpg', label: 'JPEG', desc: { en: 'Best for photos', ru: 'Лучше для фото', es: 'Mejor para fotos', pt: 'Melhor para fotos', fr: 'Idéal pour les photos', de: 'Am besten für Fotos' } as Record<Lang, string>, color: 'bg-blue-50 text-blue-700' },
    { ext: 'png', label: 'PNG', desc: { en: 'Best for graphics', ru: 'Лучше для графики', es: 'Mejor para gráficos', pt: 'Melhor para gráficos', fr: 'Idéal pour les graphiques', de: 'Am besten für Grafiken' } as Record<Lang, string>, color: 'bg-green-50 text-green-700' },
    { ext: 'webp', label: 'WebP', desc: { en: 'Modern & efficient', ru: 'Современный', es: 'Moderno y eficiente', pt: 'Moderno e eficiente', fr: 'Moderne et efficace', de: 'Modern & effizient' } as Record<Lang, string>, color: 'bg-purple-50 text-purple-700' },
    { ext: 'avif', label: 'AVIF', desc: { en: 'Next-gen format', ru: 'Новое поколение', es: 'Formato de nueva generación', pt: 'Formato de nova geração', fr: 'Format nouvelle génération', de: 'Next-Gen-Format' } as Record<Lang, string>, color: 'bg-orange-50 text-orange-700' },
];

const features = [
    { icon: '🔒', title: { en: '100% Secure', ru: '100% Безопасно', es: '100% Seguro', pt: '100% Seguro', fr: '100% Sécurisé', de: '100% Sicher' } as Record<Lang, string>, desc: { en: 'Your files never leave your browser. All processing happens locally.', ru: 'Файлы не покидают браузер. Обработка локально.', es: 'Tus archivos nunca salen de tu navegador.', pt: 'Seus arquivos nunca saem do seu navegador.', fr: 'Vos fichiers ne quittent jamais votre navigateur.', de: 'Ihre Dateien verlassen nie Ihren Browser.' } as Record<Lang, string> },
    { icon: '⚡', title: { en: 'Lightning Fast', ru: 'Молниеносно', es: 'Rapidísimo', pt: 'Rapidíssimo', fr: 'Ultra rapide', de: 'Blitzschnell' } as Record<Lang, string>, desc: { en: 'Powered by modern browser APIs for instant compression.', ru: 'Современные API браузера для мгновенного сжатия.', es: 'Impulsado por APIs modernas del navegador.', pt: 'Alimentado por APIs modernas do navegador.', fr: 'Propulsé par des API de navigateur modernes.', de: 'Powered by moderne Browser-APIs.' } as Record<Lang, string> },
    { icon: '🛡️', title: { en: 'Privacy First', ru: 'Приватность', es: 'Privacidad primero', pt: 'Privacidade primeiro', fr: 'Confidentialité d\'abord', de: 'Privatsphäre zuerst' } as Record<Lang, string>, desc: { en: 'No uploads, no servers, no data collection.', ru: 'Без загрузок, серверов и сбора данных.', es: 'Sin subidas, sin servidores, sin recolección de datos.', pt: 'Sem uploads, sem servidores, sem coleta de dados.', fr: 'Pas de téléchargement, pas de serveurs, pas de collecte.', de: 'Keine Uploads, keine Server, keine Datensammlung.' } as Record<Lang, string> },
    { icon: '📦', title: { en: 'Batch Processing', ru: 'Пакетная обработка', es: 'Procesamiento por lotes', pt: 'Processamento em lote', fr: 'Traitement par lots', de: 'Stapelverarbeitung' } as Record<Lang, string>, desc: { en: 'Compress multiple images at once.', ru: 'Сжимайте несколько изображений сразу.', es: 'Comprime varias imágenes a la vez.', pt: 'Comprima várias imagens de uma vez.', fr: 'Compressez plusieurs images à la fois.', de: 'Komprimieren Sie mehrere Bilder auf einmal.' } as Record<Lang, string> },
    { icon: '✨', title: { en: 'Quality Preservation', ru: 'Сохранение качества', es: 'Preservación de calidad', pt: 'Preservação de qualidade', fr: 'Préservation de la qualité', de: 'Qualitätserhalt' } as Record<Lang, string>, desc: { en: 'Smart algorithms that reduce size while maintaining visual quality.', ru: 'Умные алгоритмы сохраняют качество.', es: 'Algoritmos inteligentes que mantienen la calidad visual.', pt: 'Algoritmos inteligentes que mantêm a qualidade visual.', fr: 'Algorithmes intelligents qui préservent la qualité visuelle.', de: 'Intelligente Algorithmen, die die visuelle Qualität erhalten.' } as Record<Lang, string> },
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
            <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-24">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {d.badge}
          </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                        {d.heroTitle}
                    </h1>
                    <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        {d.heroSub}
                    </p>
                    <div className="max-w-lg mx-auto">
                        <div className="border-2 border-dashed border-gray-600 rounded-2xl p-12 hover:border-[#007BFF] transition-colors cursor-pointer bg-white/5 backdrop-blur-sm">
                            <p className="text-4xl mb-4">📁</p>
                            <Link
                                href={`/${lang}/compress/jpeg`}
                                className="inline-flex items-center px-8 py-3.5 bg-[#007BFF] hover:bg-[#0056CC] text-white font-semibold rounded-xl text-base transition-all shadow-lg shadow-blue-500/25"
                            >
                                {d.cta}
                            </Link>
                            <p className="text-sm text-gray-500 mt-4">{d.orDrop}</p>
                            <p className="text-xs text-gray-600 mt-3 flex items-center justify-center gap-1">
                                <span>🔒</span> {d.privacyNote}
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            Support for JPG, PNG, WebP, and AVIF formats. Up to 50MB per file.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── ABOUT / SEO-ТЕКСТ ── */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">{d.aboutTitle}</h2>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                        <p>{d.aboutText1}</p>
                        <p>{d.aboutText2}</p>
                        <p>{d.aboutText3}</p>
                    </div>
                </div>
            </section>

            {/* ── FORMATS ── */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-xs font-semibold text-[#007BFF] uppercase tracking-widest mb-3 text-center">
                        {d.formatsLabel}
                    </p>
                    <h2 className="text-3xl font-bold text-center mb-12">{d.formatsTitle}</h2>
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <p className="text-xs font-semibold text-[#007BFF] uppercase tracking-widest mb-3 text-center">
                        {d.whyLabel}
                    </p>
                    <h2 className="text-3xl font-bold text-center mb-12">{d.whyTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map(f => (
                            <div key={f.title.en} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#007BFF] hover:shadow-xl transition-all">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <p className="font-bold text-lg text-gray-900 mb-2">{f.title[langKey]}</p>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.desc[langKey]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 bg-gradient-to-r from-[#007BFF] to-[#0056CC] text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{d.readyTitle}</h2>
                    <p className="text-white/80 text-lg mb-8">{d.readySub}</p>
                    <Link
                        href={`/${lang}/compress/jpeg`}
                        className="inline-flex items-center px-10 py-4 bg-white text-[#007BFF] font-bold rounded-xl text-lg hover:bg-gray-100 transition-all shadow-lg"
                    >
                        {d.readyCta}
                    </Link>
                </div>
            </section>
        </div>
    );
}