// app/[lang]/convert/[conversion]/page.tsx
import type { Metadata } from 'next';
import ToolTemplate from '@/components/ToolTemplate';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ru';

const LANGUAGES: Lang[] = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://zipply.io';

// ── SEO-тексты для всех конвертеров ──
const seoTexts: Record<string, Record<Lang, { howTitle: string; howSteps: string[]; benefitsTitle: string; benefits: string[] }>> = {
    'png-to-jpg': {
        en: {
            howTitle: 'How to Convert PNG to JPG Online',
            howSteps: [
                'Upload your PNG image — drag & drop or click to browse. Supports files up to 50MB.',
                'Choose quality (optional) – 90% is recommended for photos.',
                'Click "Convert Now" – the conversion happens instantly in your browser.',
                'Download your new JPG file – ready for websites, email, or social media.',
            ],
            benefitsTitle: 'Why Convert PNG to JPG?',
            benefits: [
                'Smaller file size – JPG is 5–10× smaller than PNG for photos.',
                'Universal compatibility – JPG works everywhere, even on older devices.',
                'Ideal for photos – JPG is optimized for photographic content.',
                'Faster websites – smaller images improve Core Web Vitals and SEO.',
                'Easier sharing – JPG files are perfect for email attachments and messaging.',
            ],
        },
        ru: {
            howTitle: 'Как конвертировать PNG в JPG онлайн',
            howSteps: [
                'Загрузите PNG – перетащите или выберите файл (до 50 МБ).',
                'Выберите качество (опционально) – 90% рекомендуется для фотографий.',
                'Нажмите «Конвертировать» – преобразование происходит мгновенно в браузере.',
                'Скачайте JPG – готов для веба, почты и соцсетей.',
            ],
            benefitsTitle: 'Зачем конвертировать PNG в JPG?',
            benefits: [
                'Меньший размер файла – JPG в 5–10× компактнее PNG для фото.',
                'Совместимость – JPG открывается везде, даже на старых устройствах.',
                'Идеален для фотографий – формат оптимизирован для фото.',
                'Ускорение сайта – маленькие изображения улучшают показатели скорости.',
                'Удобство отправки – JPG легко прикреплять к email и сообщениям.',
            ],
        },
        es: { howTitle: 'Cómo convertir PNG a JPG en línea', howSteps: ['Sube tu PNG.', 'Elige calidad (opcional).', 'Haz clic en «Convertir».', 'Descarga el JPG.'], benefitsTitle: '¿Por qué convertir PNG a JPG?', benefits: ['Tamaño más pequeño.', 'Compatibilidad universal.', 'Ideal para fotos.', 'Sitios más rápidos.', 'Fácil de compartir.'] },
        pt: { howTitle: 'Como converter PNG para JPG online', howSteps: ['Envie seu PNG.', 'Escolha a qualidade.', 'Clique em «Converter».', 'Baixe o JPG.'], benefitsTitle: 'Por que converter PNG para JPG?', benefits: ['Tamanho menor.', 'Compatibilidade universal.', 'Ideal para fotos.', 'Sites mais rápidos.', 'Fácil compartilhamento.'] },
        fr: { howTitle: 'Comment convertir PNG en JPG en ligne', howSteps: ['Téléchargez votre PNG.', 'Choisissez la qualité.', 'Cliquez sur «Convertir».', 'Téléchargez le JPG.'], benefitsTitle: 'Pourquoi convertir PNG en JPG ?', benefits: ['Taille réduite.', 'Compatibilité universelle.', 'Idéal pour les photos.', 'Sites plus rapides.', 'Partage facile.'] },
        de: { howTitle: 'PNG in JPG online konvertieren', howSteps: ['Laden Sie Ihr PNG hoch.', 'Qualität wählen.', 'Klicken Sie auf «Konvertieren».', 'JPG herunterladen.'], benefitsTitle: 'Warum PNG in JPG konvertieren?', benefits: ['Kleinere Größe.', 'Universelle Kompatibilität.', 'Ideal für Fotos.', 'Schnellere Websites.', 'Einfaches Teilen.'] },
    },
    'jpg-to-png': {
        en: {
            howTitle: 'How to Convert JPG to PNG Online',
            howSteps: ['Upload your JPG – drag & drop or click.', 'Click "Convert Now" – processed instantly in your browser.', 'Download your PNG – with lossless quality preserved.'],
            benefitsTitle: 'Why Convert JPG to PNG?',
            benefits: ['Lossless quality – perfect for graphics and logos.', 'Supports transparency – ideal for overlays and icons.', 'Better for text – sharp edges without compression artifacts.', 'Future editing – PNG keeps original data for later modifications.', 'Professional presentations – clean rendering at any scale.'],
        },
        ru: {
            howTitle: 'Как конвертировать JPG в PNG онлайн',
            howSteps: ['Загрузите JPG.', 'Нажмите «Конвертировать».', 'Скачайте PNG без потери качества.'],
            benefitsTitle: 'Зачем конвертировать JPG в PNG?',
            benefits: ['Качество без потерь – идеально для графики.', 'Прозрачность – подходит для наложений.', 'Чёткий текст – без артефактов сжатия.', 'Редактирование – сохранение данных для правок.', 'Презентации – чистое отображение в любом масштабе.'],
        },
        es: { howTitle: 'Convertir JPG a PNG', howSteps: ['Sube tu JPG.', 'Haz clic en «Convertir».', 'Descarga el PNG.'], benefitsTitle: '¿Por qué convertir JPG a PNG?', benefits: ['Calidad sin pérdida.', 'Soporta transparencia.', 'Mejor para texto.', 'Edición futura.', 'Presentaciones profesionales.'] },
        pt: { howTitle: 'Converter JPG para PNG', howSteps: ['Envie seu JPG.', 'Clique em «Converter».', 'Baixe o PNG.'], benefitsTitle: 'Por que converter JPG para PNG?', benefits: ['Qualidade sem perdas.', 'Suporte a transparência.', 'Melhor para texto.', 'Edição futura.', 'Apresentações profissionais.'] },
        fr: { howTitle: 'Convertir JPG en PNG', howSteps: ['Téléchargez votre JPG.', 'Cliquez sur «Convertir».', 'Téléchargez le PNG.'], benefitsTitle: 'Pourquoi convertir JPG en PNG ?', benefits: ['Qualité sans perte.', 'Supporte la transparence.', 'Meilleur pour le texte.', 'Édition future.', 'Présentations professionnelles.'] },
        de: { howTitle: 'JPG in PNG konvertieren', howSteps: ['JPG hochladen.', 'Klicken Sie auf «Konvertieren».', 'PNG herunterladen.'], benefitsTitle: 'Warum JPG in PNG konvertieren?', benefits: ['Verlustfreie Qualität.', 'Transparenz.', 'Besser für Text.', 'Zukünftige Bearbeitung.', 'Professionelle Präsentationen.'] },
    },
    'png-to-webp': {
        en: {
            howTitle: 'How to Convert PNG to WebP Online',
            howSteps: ['Upload your PNG.', 'Adjust quality (80% recommended).', 'Click "Convert Now".', 'Download the WebP.'],
            benefitsTitle: 'Why Convert PNG to WebP?',
            benefits: ['Up to 80% smaller than PNG.', 'Lossless and lossy options.', 'Supports transparency.', 'Faster loading websites.', 'Ideal for modern web performance.'],
        },
        ru: {
            howTitle: 'Как конвертировать PNG в WebP онлайн',
            howSteps: ['Загрузите PNG.', 'Настройте качество (80%).', 'Нажмите «Конвертировать».', 'Скачайте WebP.'],
            benefitsTitle: 'Зачем конвертировать PNG в WebP?',
            benefits: ['До 80% меньше PNG.', 'Сжатие с потерями и без.', 'Поддержка прозрачности.', 'Быстрая загрузка сайта.', 'Современный веб-стандарт.'],
        },
        es: { howTitle: 'Convertir PNG a WebP', howSteps: ['Sube tu PNG.', 'Ajusta calidad.', 'Haz clic en «Convertir».', 'Descarga WebP.'], benefitsTitle: '¿Por qué convertir PNG a WebP?', benefits: ['Hasta 80% más pequeño.', 'Modos lossy/lossless.', 'Soporta transparencia.', 'Sitios más rápidos.', 'Formato web moderno.'] },
        pt: { howTitle: 'Converter PNG para WebP', howSteps: ['Envie seu PNG.', 'Ajuste qualidade.', 'Clique em «Converter».', 'Baixe WebP.'], benefitsTitle: 'Por que converter PNG para WebP?', benefits: ['Até 80% menor.', 'Modos lossy/lossless.', 'Suporte a transparência.', 'Sites mais rápidos.', 'Formato web moderno.'] },
        fr: { howTitle: 'Convertir PNG en WebP', howSteps: ['Téléchargez PNG.', 'Réglez qualité.', 'Cliquez sur «Convertir».', 'Téléchargez WebP.'], benefitsTitle: 'Pourquoi convertir PNG en WebP ?', benefits: ['Jusqu\'à 80% plus petit.', 'Modes lossy/lossless.', 'Transparence.', 'Sites plus rapides.', 'Format web moderne.'] },
        de: { howTitle: 'PNG in WebP konvertieren', howSteps: ['PNG hochladen.', 'Qualität einstellen.', 'Klicken Sie auf «Konvertieren».', 'WebP herunterladen.'], benefitsTitle: 'Warum PNG in WebP konvertieren?', benefits: ['Bis zu 80% kleiner.', 'Lossy/lossless.', 'Transparenz.', 'Schnellere Websites.', 'Modernes Webformat.'] },
    },
    'jpg-to-webp': {
        en: {
            howTitle: 'How to Convert JPG to WebP Online',
            howSteps: ['Upload your JPG.', 'Set quality (80% recommended).', 'Click "Convert Now".', 'Download the WebP.'],
            benefitsTitle: 'Why Convert JPG to WebP?',
            benefits: ['Smaller than JPG – 25-35% better compression.', 'Perfect for SEO – improves page speed scores.', 'Supports transparency and animation.', 'Modern format – works in 97%+ browsers.', 'Save bandwidth and hosting costs.'],
        },
        ru: {
            howTitle: 'Как конвертировать JPG в WebP онлайн',
            howSteps: ['Загрузите JPG.', 'Установите качество (80%).', 'Нажмите «Конвертировать».', 'Скачайте WebP.'],
            benefitsTitle: 'Зачем конвертировать JPG в WebP?',
            benefits: ['Меньше JPG – сжатие лучше на 25-35%.', 'Идеально для SEO – ускоряет сайт.', 'Поддержка прозрачности и анимации.', 'Современный формат – 97%+ браузеров.', 'Экономия трафика и хостинга.'],
        },
        es: { howTitle: 'Convertir JPG a WebP', howSteps: ['Sube tu JPG.', 'Ajusta calidad.', 'Haz clic en «Convertir».', 'Descarga WebP.'], benefitsTitle: '¿Por qué convertir JPG a WebP?', benefits: ['Más pequeño que JPG.', 'Mejor SEO.', 'Transparencia y animación.', 'Formato moderno.', 'Ahorra ancho de banda.'] },
        pt: { howTitle: 'Converter JPG para WebP', howSteps: ['Envie seu JPG.', 'Ajuste qualidade.', 'Clique em «Converter».', 'Baixe WebP.'], benefitsTitle: 'Por que converter JPG para WebP?', benefits: ['Menor que JPG.', 'Melhor SEO.', 'Transparência e animação.', 'Formato moderno.', 'Economia de largura de banda.'] },
        fr: { howTitle: 'Convertir JPG en WebP', howSteps: ['Téléchargez JPG.', 'Réglez qualité.', 'Cliquez sur «Convertir».', 'Téléchargez WebP.'], benefitsTitle: 'Pourquoi convertir JPG en WebP ?', benefits: ['Plus petit que JPG.', 'Meilleur SEO.', 'Transparence et animation.', 'Format moderne.', 'Économie de bande passante.'] },
        de: { howTitle: 'JPG in WebP konvertieren', howSteps: ['JPG hochladen.', 'Qualität einstellen.', 'Klicken Sie auf «Konvertieren».', 'WebP herunterladen.'], benefitsTitle: 'Warum JPG in WebP konvertieren?', benefits: ['Kleiner als JPG.', 'Besseres SEO.', 'Transparenz & Animation.', 'Modernes Format.', 'Bandbreite sparen.'] },
    },
    'webp-to-jpg': {
        en: {
            howTitle: 'How to Convert WebP to JPG Online',
            howSteps: ['Upload your WebP.', 'Choose quality (90% recommended).', 'Click "Convert Now".', 'Download the JPG.'],
            benefitsTitle: 'Why Convert WebP to JPG?',
            benefits: ['Universal compatibility – JPG opens everywhere.', 'Perfect for older software and devices.', 'Easier sharing on social media and messaging.', 'Preserve high quality at smaller file sizes.', 'Quick conversion – done entirely in your browser.'],
        },
        ru: {
            howTitle: 'Как конвертировать WebP в JPG онлайн',
            howSteps: ['Загрузите WebP.', 'Выберите качество (90%).', 'Нажмите «Конвертировать».', 'Скачайте JPG.'],
            benefitsTitle: 'Зачем конвертировать WebP в JPG?',
            benefits: ['Универсальная совместимость – JPG открывается везде.', 'Подходит для старых устройств и ПО.', 'Удобная отправка в соцсетях.', 'Высокое качество при небольшом размере.', 'Мгновенная конвертация в браузере.'],
        },
        es: { howTitle: 'Convertir WebP a JPG', howSteps: ['Sube tu WebP.', 'Elige calidad.', 'Haz clic en «Convertir».', 'Descarga JPG.'], benefitsTitle: '¿Por qué convertir WebP a JPG?', benefits: ['Compatibilidad universal.', 'Ideal para dispositivos antiguos.', 'Fácil de compartir.', 'Alta calidad.', 'Conversión rápida.'] },
        pt: { howTitle: 'Converter WebP para JPG', howSteps: ['Envie seu WebP.', 'Escolha qualidade.', 'Clique em «Converter».', 'Baixe JPG.'], benefitsTitle: 'Por que converter WebP para JPG?', benefits: ['Compatibilidade universal.', 'Ideal para dispositivos antigos.', 'Fácil compartilhamento.', 'Alta qualidade.', 'Conversão rápida.'] },
        fr: { howTitle: 'Convertir WebP en JPG', howSteps: ['Téléchargez WebP.', 'Choisissez qualité.', 'Cliquez sur «Convertir».', 'Téléchargez JPG.'], benefitsTitle: 'Pourquoi convertir WebP en JPG ?', benefits: ['Compatibilité universelle.', 'Idéal pour anciens appareils.', 'Partage facile.', 'Haute qualité.', 'Conversion rapide.'] },
        de: { howTitle: 'WebP in JPG konvertieren', howSteps: ['WebP hochladen.', 'Qualität wählen.', 'Klicken Sie auf «Konvertieren».', 'JPG herunterladen.'], benefitsTitle: 'Warum WebP in JPG konvertieren?', benefits: ['Universelle Kompatibilität.', 'Ideal für ältere Geräte.', 'Einfaches Teilen.', 'Hohe Qualität.', 'Schnelle Konvertierung.'] },
    },
    'webp-to-png': {
        en: {
            howTitle: 'How to Convert WebP to PNG Online',
            howSteps: ['Upload your WebP.', 'Click "Convert Now".', 'Download the lossless PNG.'],
            benefitsTitle: 'Why Convert WebP to PNG?',
            benefits: ['Lossless quality – every pixel preserved.', 'Supports transparency – perfect for logos.', 'Ideal for further editing in graphic software.', 'Better text and graphics rendering.', 'Professional output for print and branding.'],
        },
        ru: {
            howTitle: 'Как конвертировать WebP в PNG онлайн',
            howSteps: ['Загрузите WebP.', 'Нажмите «Конвертировать».', 'Скачайте PNG без потерь.'],
            benefitsTitle: 'Зачем конвертировать WebP в PNG?',
            benefits: ['Качество без потерь – каждый пиксель сохранён.', 'Поддержка прозрачности – идеально для логотипов.', 'Удобство для дальнейшего редактирования.', 'Чёткий текст и графика.', 'Профессиональный результат для печати.'],
        },
        es: { howTitle: 'Convertir WebP a PNG', howSteps: ['Sube tu WebP.', 'Haz clic en «Convertir».', 'Descarga PNG.'], benefitsTitle: '¿Por qué convertir WebP a PNG?', benefits: ['Calidad sin pérdida.', 'Soporta transparencia.', 'Ideal para edición.', 'Texto y gráficos nítidos.', 'Resultado profesional.'] },
        pt: { howTitle: 'Converter WebP para PNG', howSteps: ['Envie seu WebP.', 'Clique em «Converter».', 'Baixe PNG.'], benefitsTitle: 'Por que converter WebP para PNG?', benefits: ['Qualidade sem perdas.', 'Suporte a transparência.', 'Ideal para edição.', 'Texto e gráficos nítidos.', 'Resultado profissional.'] },
        fr: { howTitle: 'Convertir WebP en PNG', howSteps: ['Téléchargez WebP.', 'Cliquez sur «Convertir».', 'Téléchargez PNG.'], benefitsTitle: 'Pourquoi convertir WebP en PNG ?', benefits: ['Qualité sans perte.', 'Transparence.', 'Idéal pour l\'édition.', 'Texte net.', 'Résultat professionnel.'] },
        de: { howTitle: 'WebP in PNG konvertieren', howSteps: ['WebP hochladen.', 'Klicken Sie auf «Konvertieren».', 'PNG herunterladen.'], benefitsTitle: 'Warum WebP in PNG konvertieren?', benefits: ['Verlustfreie Qualität.', 'Transparenz.', 'Ideal zur Bearbeitung.', 'Scharfer Text.', 'Professionelles Ergebnis.'] },
    },
    'svg-to-png': {
        en: {
            howTitle: 'How to Convert SVG to PNG Online',
            howSteps: ['Upload your SVG.', 'Set output dimensions (optional).', 'Click "Convert Now".', 'Download the PNG.'],
            benefitsTitle: 'Why Convert SVG to PNG?',
            benefits: ['Rasterize vectors for universal compatibility.', 'Perfect for social media previews and thumbnails.', 'Preserves transparency – great for logos.', 'High-resolution output up to any size.', 'Edit in any photo editor after conversion.'],
        },
        ru: {
            howTitle: 'Как конвертировать SVG в PNG онлайн',
            howSteps: ['Загрузите SVG.', 'Укажите размеры (опционально).', 'Нажмите «Конвертировать».', 'Скачайте PNG.'],
            benefitsTitle: 'Зачем конвертировать SVG в PNG?',
            benefits: ['Растеризация для универсальной совместимости.', 'Идеально для превью соцсетей.', 'Сохраняет прозрачность – отлично для логотипов.', 'Высокое разрешение до любого размера.', 'Редактируйте в любом фоторедакторе.'],
        },
        es: { howTitle: 'Convertir SVG a PNG', howSteps: ['Sube tu SVG.', 'Define dimensiones.', 'Haz clic en «Convertir».', 'Descarga PNG.'], benefitsTitle: '¿Por qué convertir SVG a PNG?', benefits: ['Compatibilidad universal.', 'Ideal para redes sociales.', 'Conserva transparencia.', 'Alta resolución.', 'Editable en cualquier editor.'] },
        pt: { howTitle: 'Converter SVG para PNG', howSteps: ['Envie seu SVG.', 'Defina dimensões.', 'Clique em «Converter».', 'Baixe PNG.'], benefitsTitle: 'Por que converter SVG para PNG?', benefits: ['Compatibilidade universal.', 'Ideal para redes sociais.', 'Preserva transparência.', 'Alta resolução.', 'Editável em qualquer editor.'] },
        fr: { howTitle: 'Convertir SVG en PNG', howSteps: ['Téléchargez SVG.', 'Définissez dimensions.', 'Cliquez sur «Convertir».', 'Téléchargez PNG.'], benefitsTitle: 'Pourquoi convertir SVG en PNG ?', benefits: ['Compatibilité universelle.', 'Idéal pour les réseaux sociaux.', 'Transparence préservée.', 'Haute résolution.', 'Éditable partout.'] },
        de: { howTitle: 'SVG in PNG konvertieren', howSteps: ['SVG hochladen.', 'Größe festlegen.', 'Klicken Sie auf «Konvertieren».', 'PNG herunterladen.'], benefitsTitle: 'Warum SVG in PNG konvertieren?', benefits: ['Universelle Kompatibilität.', 'Ideal für soziale Medien.', 'Transparenz bleibt.', 'Hohe Auflösung.', 'In jedem Editor bearbeitbar.'] },
    },
    'gif-to-mp4': {
        en: {
            howTitle: 'How to Convert GIF to MP4 Online',
            howSteps: ['Upload your animated GIF.', 'Click "Convert Now" – processed instantly in your browser.', 'Download the MP4 video.'],
            benefitsTitle: 'Why Convert GIF to MP4?',
            benefits: ['Up to 90% smaller file size than GIF.', 'Smoother playback on all devices.', 'Better quality with modern video codecs.', 'Easier sharing on social media and messaging apps.', 'Supports audio and longer durations.'],
        },
        ru: {
            howTitle: 'Как конвертировать GIF в MP4 онлайн',
            howSteps: ['Загрузите анимированный GIF.', 'Нажмите «Конвертировать» – обработка в браузере.', 'Скачайте видео MP4.'],
            benefitsTitle: 'Зачем конвертировать GIF в MP4?',
            benefits: ['До 90% меньше размера по сравнению с GIF.', 'Плавное воспроизведение на всех устройствах.', 'Лучшее качество с современными кодеками.', 'Удобная отправка в соцсетях и мессенджерах.', 'Поддерживает звук и большую длительность.'],
        },
        es: { howTitle: 'Convertir GIF a MP4', howSteps: ['Sube tu GIF.', 'Haz clic en «Convertir».', 'Descarga MP4.'], benefitsTitle: '¿Por qué convertir GIF a MP4?', benefits: ['Hasta 90% más pequeño.', 'Reproducción más suave.', 'Mejor calidad.', 'Fácil de compartir.', 'Soporta audio.'] },
        pt: { howTitle: 'Converter GIF para MP4', howSteps: ['Envie seu GIF.', 'Clique em «Converter».', 'Baixe MP4.'], benefitsTitle: 'Por que converter GIF para MP4?', benefits: ['Até 90% menor.', 'Reprodução suave.', 'Melhor qualidade.', 'Fácil compartilhamento.', 'Suporta áudio.'] },
        fr: { howTitle: 'Convertir GIF en MP4', howSteps: ['Téléchargez GIF.', 'Cliquez sur «Convertir».', 'Téléchargez MP4.'], benefitsTitle: 'Pourquoi convertir GIF en MP4 ?', benefits: ['Jusqu\'à 90% plus petit.', 'Lecture fluide.', 'Meilleure qualité.', 'Partage facile.', 'Supporte l\'audio.'] },
        de: { howTitle: 'GIF in MP4 konvertieren', howSteps: ['GIF hochladen.', 'Klicken Sie auf «Konvertieren».', 'MP4 herunterladen.'], benefitsTitle: 'Warum GIF in MP4 konvertieren?', benefits: ['Bis zu 90% kleiner.', 'Flüssige Wiedergabe.', 'Bessere Qualität.', 'Einfaches Teilen.', 'Unterstützt Audio.'] },
    },
    'mp4-to-gif': {
        en: {
            howTitle: 'How to Convert MP4 to GIF Online',
            howSteps: ['Upload your MP4 video.', 'Choose frame rate and maximum width (optional).', 'Click "Convert Now".', 'Download the animated GIF.'],
            benefitsTitle: 'Why Convert MP4 to GIF?',
            benefits: ['Create looping animations from any video clip.', 'Perfect for memes, tutorials, and social media posts.', 'No audio needed – silent autoplay anywhere.', 'Small, shareable files that work in all browsers.', 'Easy to embed in emails and websites.'],
        },
        ru: {
            howTitle: 'Как конвертировать MP4 в GIF онлайн',
            howSteps: ['Загрузите MP4 видео.', 'Выберите частоту кадров и ширину (опционально).', 'Нажмите «Конвертировать».', 'Скачайте анимированный GIF.'],
            benefitsTitle: 'Зачем конвертировать MP4 в GIF?',
            benefits: ['Создавайте зацикленные анимации из видео.', 'Идеально для мемов, уроков и соцсетей.', 'Не требует звука – автовоспроизведение везде.', 'Компактные файлы, работающие во всех браузерах.', 'Легко вставлять в email и на сайты.'],
        },
        es: { howTitle: 'Convertir MP4 a GIF', howSteps: ['Sube tu MP4.', 'Configura FPS y tamaño.', 'Haz clic en «Convertir».', 'Descarga GIF.'], benefitsTitle: '¿Por qué convertir MP4 a GIF?', benefits: ['Crea animaciones en bucle.', 'Ideal para memes y tutoriales.', 'Reproducción automática sin sonido.', 'Archivos pequeños y compatibles.', 'Fácil de insertar.'] },
        pt: { howTitle: 'Converter MP4 para GIF', howSteps: ['Envie seu MP4.', 'Configure FPS e tamanho.', 'Clique em «Converter».', 'Baixe GIF.'], benefitsTitle: 'Por que converter MP4 para GIF?', benefits: ['Crie animações em loop.', 'Ideal para memes e tutoriais.', 'Reprodução automática sem som.', 'Arquivos pequenos e compatíveis.', 'Fácil de incorporar.'] },
        fr: { howTitle: 'Convertir MP4 en GIF', howSteps: ['Téléchargez MP4.', 'Réglez FPS et taille.', 'Cliquez sur «Convertir».', 'Téléchargez GIF.'], benefitsTitle: 'Pourquoi convertir MP4 en GIF ?', benefits: ['Créez des animations en boucle.', 'Idéal pour mèmes et tutoriels.', 'Lecture automatique silencieuse.', 'Fichiers petits et compatibles.', 'Facile à intégrer.'] },
        de: { howTitle: 'MP4 in GIF konvertieren', howSteps: ['MP4 hochladen.', 'FPS und Größe einstellen.', 'Klicken Sie auf «Konvertieren».', 'GIF herunterladen.'], benefitsTitle: 'Warum MP4 in GIF konvertieren?', benefits: ['Erstellen Sie Loop-Animationen.', 'Ideal für Memes und Tutorials.', 'Stumme Autoplay-Funktion.', 'Kleine, kompatible Dateien.', 'Einfach einzubetten.'] },
    },
    'video-to-audio': {
        en: {
            howTitle: 'How to Extract Audio from Video Online',
            howSteps: ['Upload your video file (MP4, MOV, AVI, etc.).', 'Choose audio format – MP3, AAC, WAV, or OGG.', 'Click "Extract Audio" – processed instantly in your browser.', 'Download the audio file.'],
            benefitsTitle: 'Why Extract Audio from Video?',
            benefits: ['Save just the sound – perfect for podcasts and music.', 'Create ringtones or sound effects from any video.', 'Reduce file size dramatically compared to video.', 'Compatible with all audio players and devices.', 'Free and private – no upload to servers required.'],
        },
        ru: {
            howTitle: 'Как извлечь аудио из видео онлайн',
            howSteps: ['Загрузите видео (MP4, MOV, AVI и др.).', 'Выберите формат – MP3, AAC, WAV или OGG.', 'Нажмите «Извлечь аудио» – обработка в браузере.', 'Скачайте аудиофайл.'],
            benefitsTitle: 'Зачем извлекать аудио из видео?',
            benefits: ['Сохраните только звук – идеально для подкастов.', 'Создавайте рингтоны или звуковые эффекты.', 'Размер файла значительно меньше видео.', 'Совместимость со всеми плеерами и устройствами.', 'Бесплатно и приватно – без загрузки на сервер.'],
        },
        es: { howTitle: 'Extraer audio de video', howSteps: ['Sube tu video.', 'Elige formato de audio.', 'Haz clic en «Extraer».', 'Descarga el audio.'], benefitsTitle: '¿Por qué extraer audio?', benefits: ['Solo el sonido – ideal para podcasts.', 'Crea tonos de llamada.', 'Tamaño mucho menor.', 'Compatible con todos los reproductores.', 'Privado y gratuito.'] },
        pt: { howTitle: 'Extrair áudio de vídeo', howSteps: ['Envie seu vídeo.', 'Escolha o formato de áudio.', 'Clique em «Extrair».', 'Baixe o áudio.'], benefitsTitle: 'Por que extrair áudio?', benefits: ['Apenas o som – ideal para podcasts.', 'Crie toques.', 'Tamanho muito menor.', 'Compatível com todos os players.', 'Privado e gratuito.'] },
        fr: { howTitle: 'Extraire l\'audio d\'une vidéo', howSteps: ['Téléchargez la vidéo.', 'Choisissez le format audio.', 'Cliquez sur «Extraire».', 'Téléchargez l\'audio.'], benefitsTitle: 'Pourquoi extraire l\'audio ?', benefits: ['Seulement le son – idéal pour les podcasts.', 'Créez des sonneries.', 'Taille beaucoup plus petite.', 'Compatible avec tous les lecteurs.', 'Privé et gratuit.'] },
        de: { howTitle: 'Audio aus Video extrahieren', howSteps: ['Video hochladen.', 'Audioformat wählen.', 'Klicken Sie auf «Extrahieren».', 'Audio herunterladen.'], benefitsTitle: 'Warum Audio extrahieren?', benefits: ['Nur der Ton – ideal für Podcasts.', 'Erstellen Sie Klingeltöne.', 'Deutlich kleinere Größe.', 'Kompatibel mit allen Playern.', 'Privat und kostenlos.'] },
    },
    'video-convert': {
        en: {
            howTitle: 'How to Use the Online Video Converter',
            howSteps: ['Upload your video – any format supported.', 'Select output format – MP4, WebM, MOV, etc.', 'Choose quality and resolution.', 'Click "Convert Now" – download the converted file.'],
            benefitsTitle: 'Why Use Zipply Video Converter?',
            benefits: ['Universal conversion between all popular video formats.', 'Preserve quality with smart codec selection.', 'No software installation required – works in your browser.', 'Fast processing with optimized encoding settings.', 'Completely private – your videos never leave your device.'],
        },
        ru: {
            howTitle: 'Как использовать онлайн видеоконвертер',
            howSteps: ['Загрузите видео – поддерживаются любые форматы.', 'Выберите выходной формат – MP4, WebM, MOV и др.', 'Настройте качество и разрешение.', 'Нажмите «Конвертировать» – скачайте готовый файл.'],
            benefitsTitle: 'Преимущества видеоконвертера Zipply',
            benefits: ['Универсальная конвертация между всеми популярными форматами.', 'Сохраняйте качество с умным выбором кодеков.', 'Не требует установки – работает прямо в браузере.', 'Быстрая обработка с оптимизированными настройками.', 'Полностью приватно – ваши видео не покидают устройство.'],
        },
        es: { howTitle: 'Convertidor de video en línea', howSteps: ['Sube tu video.', 'Elige formato de salida.', 'Configura calidad y resolución.', 'Haz clic en «Convertir».'], benefitsTitle: '¿Por qué usar el convertidor de Zipply?', benefits: ['Conversión universal.', 'Conserva la calidad.', 'Sin instalación.', 'Procesamiento rápido.', 'Totalmente privado.'] },
        pt: { howTitle: 'Conversor de vídeo online', howSteps: ['Envie seu vídeo.', 'Escolha o formato de saída.', 'Configure qualidade e resolução.', 'Clique em «Converter».'], benefitsTitle: 'Por que usar o conversor do Zipply?', benefits: ['Conversão universal.', 'Preserva a qualidade.', 'Sem instalação.', 'Processamento rápido.', 'Totalmente privado.'] },
        fr: { howTitle: 'Convertisseur vidéo en ligne', howSteps: ['Téléchargez votre vidéo.', 'Choisissez le format de sortie.', 'Réglez qualité et résolution.', 'Cliquez sur «Convertir».'], benefitsTitle: 'Pourquoi utiliser le convertisseur Zipply ?', benefits: ['Conversion universelle.', 'Préserve la qualité.', 'Aucune installation.', 'Traitement rapide.', 'Totalement privé.'] },
        de: { howTitle: 'Online-Videokonverter', howSteps: ['Video hochladen.', 'Ausgabeformat wählen.', 'Qualität und Auflösung einstellen.', 'Klicken Sie auf «Konvertieren».'], benefitsTitle: 'Warum den Zipply-Videokonverter verwenden?', benefits: ['Universelle Konvertierung.', 'Qualität erhalten.', 'Keine Installation.', 'Schnelle Verarbeitung.', 'Völlig privat.'] },
    },
    'mov-to-mp4': {
        en: {
            howTitle: 'How to Convert MOV to MP4 Online',
            howSteps: ['Upload your MOV file.', 'Click "Convert Now".', 'Download the MP4.'],
            benefitsTitle: 'Why Convert MOV to MP4?',
            benefits: ['Universal playback – MP4 works on all devices.', 'Smaller file size with same quality.', 'Ideal for web upload and social media.', 'Compatible with more editing software.', 'Fast and free conversion in your browser.'],
        },
        ru: {
            howTitle: 'Как конвертировать MOV в MP4 онлайн',
            howSteps: ['Загрузите MOV.', 'Нажмите «Конвертировать».', 'Скачайте MP4.'],
            benefitsTitle: 'Зачем конвертировать MOV в MP4?',
            benefits: ['Универсальное воспроизведение на всех устройствах.', 'Меньший размер при том же качестве.', 'Идеально для веба и соцсетей.', 'Совместимость с большинством редакторов.', 'Быстрая и бесплатная конвертация в браузере.'],
        },
        es: { howTitle: 'Convertir MOV a MP4', howSteps: ['Sube tu MOV.', 'Haz clic en «Convertir».', 'Descarga MP4.'], benefitsTitle: '¿Por qué convertir MOV a MP4?', benefits: ['Reproducción universal.', 'Tamaño más pequeño.', 'Ideal para web.', 'Compatible con editores.', 'Conversión rápida y gratuita.'] },
        pt: { howTitle: 'Converter MOV para MP4', howSteps: ['Envie seu MOV.', 'Clique em «Converter».', 'Baixe MP4.'], benefitsTitle: 'Por que converter MOV para MP4?', benefits: ['Reprodução universal.', 'Tamanho menor.', 'Ideal para web.', 'Compatível com editores.', 'Conversão rápida e gratuita.'] },
        fr: { howTitle: 'Convertir MOV en MP4', howSteps: ['Téléchargez MOV.', 'Cliquez sur «Convertir».', 'Téléchargez MP4.'], benefitsTitle: 'Pourquoi convertir MOV en MP4 ?', benefits: ['Lecture universelle.', 'Taille réduite.', 'Idéal pour le web.', 'Compatible avec les éditeurs.', 'Conversion rapide et gratuite.'] },
        de: { howTitle: 'MOV in MP4 konvertieren', howSteps: ['MOV hochladen.', 'Klicken Sie auf «Konvertieren».', 'MP4 herunterladen.'], benefitsTitle: 'Warum MOV in MP4 konvertieren?', benefits: ['Universelle Wiedergabe.', 'Kleinere Größe.', 'Ideal fürs Web.', 'Kompatibel mit Editoren.', 'Schnelle und kostenlose Konvertierung.'] },
    },
    'avi-to-mp4': {
        en: {
            howTitle: 'How to Convert AVI to MP4 Online',
            howSteps: ['Upload your AVI file.', 'Click "Convert Now".', 'Download the MP4.'],
            benefitsTitle: 'Why Convert AVI to MP4?',
            benefits: ['Modern format – better compression than AVI.', 'Wide device and browser support.', 'Smaller file size with preserved quality.', 'Perfect for online streaming and sharing.', 'Free conversion without watermark.'],
        },
        ru: {
            howTitle: 'Как конвертировать AVI в MP4 онлайн',
            howSteps: ['Загрузите AVI.', 'Нажмите «Конвертировать».', 'Скачайте MP4.'],
            benefitsTitle: 'Зачем конвертировать AVI в MP4?',
            benefits: ['Современный формат – лучшее сжатие, чем AVI.', 'Поддержка всех устройств и браузеров.', 'Меньший размер с сохранением качества.', 'Идеально для стриминга и обмена.', 'Бесплатная конвертация без водяных знаков.'],
        },
        es: { howTitle: 'Convertir AVI a MP4', howSteps: ['Sube tu AVI.', 'Haz clic en «Convertir».', 'Descarga MP4.'], benefitsTitle: '¿Por qué convertir AVI a MP4?', benefits: ['Formato moderno.', 'Amplia compatibilidad.', 'Tamaño menor.', 'Ideal para streaming.', 'Sin marca de agua.'] },
        pt: { howTitle: 'Converter AVI para MP4', howSteps: ['Envie seu AVI.', 'Clique em «Converter».', 'Baixe MP4.'], benefitsTitle: 'Por que converter AVI para MP4?', benefits: ['Formato moderno.', 'Ampla compatibilidade.', 'Tamanho menor.', 'Ideal para streaming.', 'Sem marca d\'água.'] },
        fr: { howTitle: 'Convertir AVI en MP4', howSteps: ['Téléchargez AVI.', 'Cliquez sur «Convertir».', 'Téléchargez MP4.'], benefitsTitle: 'Pourquoi convertir AVI en MP4 ?', benefits: ['Format moderne.', 'Large compatibilité.', 'Taille réduite.', 'Idéal pour le streaming.', 'Sans filigrane.'] },
        de: { howTitle: 'AVI in MP4 konvertieren', howSteps: ['AVI hochladen.', 'Klicken Sie auf «Konvertieren».', 'MP4 herunterladen.'], benefitsTitle: 'Warum AVI in MP4 konvertieren?', benefits: ['Modernes Format.', 'Breite Kompatibilität.', 'Kleinere Größe.', 'Ideal für Streaming.', 'Kein Wasserzeichen.'] },
    },
    'mkv-to-mp4': {
        en: {
            howTitle: 'How to Convert MKV to MP4 Online',
            howSteps: ['Upload your MKV video.', 'Click "Convert Now".', 'Download the MP4.'],
            benefitsTitle: 'Why Convert MKV to MP4?',
            benefits: ['Broader compatibility – MP4 plays on more devices.', 'Easier to edit in most video editors.', 'Optimized for web and social media platforms.', 'Preserves high quality with efficient compression.', 'Quick browser-based conversion – no uploads.'],
        },
        ru: {
            howTitle: 'Как конвертировать MKV в MP4 онлайн',
            howSteps: ['Загрузите MKV.', 'Нажмите «Конвертировать».', 'Скачайте MP4.'],
            benefitsTitle: 'Зачем конвертировать MKV в MP4?',
            benefits: ['Широкая совместимость – MP4 работает на большем числе устройств.', 'Проще редактировать в видеоредакторах.', 'Оптимизирован для веба и соцсетей.', 'Высокое качество с эффективным сжатием.', 'Быстрая конвертация в браузере.'],
        },
        es: { howTitle: 'Convertir MKV a MP4', howSteps: ['Sube tu MKV.', 'Haz clic en «Convertir».', 'Descarga MP4.'], benefitsTitle: '¿Por qué convertir MKV a MP4?', benefits: ['Mayor compatibilidad.', 'Fácil de editar.', 'Optimizado para web.', 'Alta calidad.', 'Conversión rápida.'] },
        pt: { howTitle: 'Converter MKV para MP4', howSteps: ['Envie seu MKV.', 'Clique em «Converter».', 'Baixe MP4.'], benefitsTitle: 'Por que converter MKV para MP4?', benefits: ['Maior compatibilidade.', 'Fácil de editar.', 'Otimizado para web.', 'Alta qualidade.', 'Conversão rápida.'] },
        fr: { howTitle: 'Convertir MKV en MP4', howSteps: ['Téléchargez MKV.', 'Cliquez sur «Convertir».', 'Téléchargez MP4.'], benefitsTitle: 'Pourquoi convertir MKV en MP4 ?', benefits: ['Compatibilité étendue.', 'Facile à éditer.', 'Optimisé pour le web.', 'Haute qualité.', 'Conversion rapide.'] },
        de: { howTitle: 'MKV in MP4 konvertieren', howSteps: ['MKV hochladen.', 'Klicken Sie auf «Konvertieren».', 'MP4 herunterladen.'], benefitsTitle: 'Warum MKV in MP4 konvertieren?', benefits: ['Breitere Kompatibilität.', 'Leicht zu bearbeiten.', 'Für Web optimiert.', 'Hohe Qualität.', 'Schnelle Konvertierung.'] },
    },
    'to-webm': {
        en: {
            howTitle: 'How to Convert Video to WebM Online',
            howSteps: ['Upload your video.', 'Click "Convert Now".', 'Download the WebM file.'],
            benefitsTitle: 'Why Convert to WebM?',
            benefits: ['Royalty-free open format – ideal for the web.', 'Excellent compression with high quality.', 'Designed for HTML5 video and streaming.', 'Supported by all modern browsers.', 'Smaller than MP4 at comparable quality levels.'],
        },
        ru: {
            howTitle: 'Как конвертировать видео в WebM онлайн',
            howSteps: ['Загрузите видео.', 'Нажмите «Конвертировать».', 'Скачайте WebM.'],
            benefitsTitle: 'Зачем конвертировать в WebM?',
            benefits: ['Свободный открытый формат – идеален для веба.', 'Отличное сжатие с высоким качеством.', 'Создан для HTML5 видео и стриминга.', 'Поддерживается всеми современными браузерами.', 'Меньше MP4 при сопоставимом качестве.'],
        },
        es: { howTitle: 'Convertir video a WebM', howSteps: ['Sube tu video.', 'Haz clic en «Convertir».', 'Descarga WebM.'], benefitsTitle: '¿Por qué convertir a WebM?', benefits: ['Formato abierto y libre.', 'Excelente compresión.', 'Diseñado para HTML5.', 'Soporte universal en navegadores.', 'Más pequeño que MP4.'] },
        pt: { howTitle: 'Converter vídeo para WebM', howSteps: ['Envie seu vídeo.', 'Clique em «Converter».', 'Baixe WebM.'], benefitsTitle: 'Por que converter para WebM?', benefits: ['Formato aberto e gratuito.', 'Excelente compressão.', 'Projetado para HTML5.', 'Suporte universal em navegadores.', 'Menor que MP4.'] },
        fr: { howTitle: 'Convertir une vidéo en WebM', howSteps: ['Téléchargez votre vidéo.', 'Cliquez sur «Convertir».', 'Téléchargez WebM.'], benefitsTitle: 'Pourquoi convertir en WebM ?', benefits: ['Format ouvert et libre.', 'Excellente compression.', 'Conçu pour HTML5.', 'Support universel des navigateurs.', 'Plus petit que MP4.'] },
        de: { howTitle: 'Video in WebM konvertieren', howSteps: ['Video hochladen.', 'Klicken Sie auf «Konvertieren».', 'WebM herunterladen.'], benefitsTitle: 'Warum in WebM konvertieren?', benefits: ['Offenes, lizenzfreies Format.', 'Hervorragende Kompression.', 'Für HTML5 und Streaming gemacht.', 'Von allen modernen Browsern unterstützt.', 'Kleiner als MP4.'] },
    },
};

// ── Related tools для конвертеров ──
const relatedTools = [
    { href: 'compress/jpeg', label: { en: 'Compress JPEG', ru: 'Сжать JPEG', es: 'Comprimir JPEG', pt: 'Comprimir JPEG', fr: 'Compresser JPEG', de: 'JPEG komprimieren' } },
    { href: 'compress/png', label: { en: 'Compress PNG', ru: 'Сжать PNG', es: 'Comprimir PNG', pt: 'Comprimir PNG', fr: 'Compresser PNG', de: 'PNG komprimieren' } },
    { href: 'compress/webp', label: { en: 'Compress WebP', ru: 'Сжать WebP', es: 'Comprimir WebP', pt: 'Comprimir WebP', fr: 'Compresser WebP', de: 'WebP komprimieren' } },
    { href: 'resize', label: { en: 'Resize Image', ru: 'Изменить размер', es: 'Redimensionar', pt: 'Redimensionar', fr: 'Redimensionner', de: 'Bild skalieren' } },
];

const conversions: Record<string, {
    title: Record<string, string>;
    description: Record<string, string>;
    apiEndpoint: string;
    outputFormat: string;
    acceptType?: string;
    fromLabel: string;
    toLabel: string;
    faq: Record<string, Array<{ question: string; answer: string }>>;
}> = {
    'png-to-jpg': {
        title: {
            en: 'Convert PNG to JPG Online — Free PNG to JPG Converter | Zipply',
            ru: 'Конвертировать PNG в JPG онлайн — Бесплатно | Zipply',
            es: 'Convertir PNG a JPG en línea — Zipply',
            pt: 'Converter PNG para JPG online — Zipply',
            fr: 'Convertir PNG en JPG en ligne — Zipply',
            de: 'PNG in JPG online konvertieren — Zipply',
        },
        description: {
            en: 'Convert PNG images to JPG format online for free. Fast, private, and processed locally in your browser. No uploads required.',
            ru: 'Конвертируйте PNG в JPG онлайн бесплатно. Быстро, приватно, обработка локально в браузере.',
            es: 'Convierta imágenes PNG a JPG en línea gratis. Rápido, privado y procesado localmente.',
            pt: 'Converta imagens PNG para JPG online gratuitamente. Rápido, privado e processado localmente.',
            fr: 'Convertissez des images PNG en JPG en ligne gratuitement. Rapide, privé et traité localement.',
            de: 'Konvertieren Sie PNG-Bilder online in JPG. Schnell, privat und lokal verarbeitet.',
        },
        apiEndpoint: '/api/v1/convert/png-to-jpg',
        outputFormat: 'jpg',
        fromLabel: 'PNG',
        toLabel: 'JPG',
        faq: {
            en: [
                { question: 'Does converting PNG to JPG reduce quality?', answer: 'JPG uses lossy compression, but at 90% quality the difference is barely visible while file size becomes much smaller.' },
                { question: 'Will I lose transparency?', answer: 'Yes, JPG does not support transparency. Transparent areas will become white.' },
            ],
            ru: [
                { question: 'Ухудшается ли качество при конвертации PNG в JPG?', answer: 'JPG использует сжатие с потерями, но при качестве 90% разница почти незаметна, а размер файла значительно уменьшается.' },
                { question: 'Сохранится ли прозрачность?', answer: 'Нет, JPG не поддерживает прозрачность. Прозрачные области станут белыми.' },
            ],
        },
    },
    'jpg-to-png': {
        title: { en: 'Convert JPG to PNG Online — Zipply', ru: 'Конвертировать JPG в PNG онлайн — Zipply', es: 'Convertir JPG a PNG — Zipply', pt: 'Converter JPG para PNG — Zipply', fr: 'Convertir JPG en PNG — Zipply', de: 'JPG in PNG konvertieren — Zipply' },
        description: { en: 'Convert JPG images to PNG format online for free.', ru: 'Конвертируйте JPG в PNG онлайн бесплатно.', es: 'Convierta JPG a PNG gratis.', pt: 'Converta JPG para PNG grátis.', fr: 'Convertissez JPG en PNG gratuitement.', de: 'Konvertieren Sie JPG in PNG kostenlos.' },
        apiEndpoint: '/api/v1/convert/jpg-to-png',
        outputFormat: 'png',
        fromLabel: 'JPG',
        toLabel: 'PNG',
        faq: {
            en: [
                { question: 'Why convert JPG to PNG?', answer: 'PNG offers lossless compression and supports transparency. Great for logos, text, and graphics.' },
            ],
            ru: [
                { question: 'Зачем конвертировать JPG в PNG?', answer: 'PNG обеспечивает сжатие без потерь и поддерживает прозрачность. Идеально для логотипов и графики.' },
            ],
        },
    },
    'png-to-webp': {
        title: { en: 'Convert PNG to WebP Online — Zipply', ru: 'Конвертировать PNG в WebP онлайн — Zipply' },
        description: { en: 'Convert PNG images to WebP format for better web performance.', ru: 'Конвертируйте PNG в WebP для лучшей производительности.' },
        apiEndpoint: '/api/v1/convert/png-to-webp', outputFormat: 'webp', fromLabel: 'PNG', toLabel: 'WebP',
        faq: { en: [{ question: 'Is WebP better than PNG?', answer: 'WebP is usually 25-35% smaller than PNG with comparable quality. It also supports both lossy and lossless modes.' }], ru: [{ question: 'WebP лучше чем PNG?', answer: 'WebP обычно на 25-35% меньше PNG при сопоставимом качестве. Поддерживает сжатие с потерями и без.' }] },
    },
    'jpg-to-webp': {
        title: { en: 'Convert JPG to WebP Online — Zipply', ru: 'Конвертировать JPG в WebP онлайн — Zipply' },
        description: { en: 'Convert JPEG images to modern WebP format.', ru: 'Конвертируйте JPEG в современный формат WebP.' },
        apiEndpoint: '/api/v1/convert/jpg-to-webp', outputFormat: 'webp', fromLabel: 'JPG', toLabel: 'WebP',
        faq: { en: [], ru: [] },
    },
    'webp-to-jpg': {
        title: { en: 'Convert WebP to JPG Online — Zipply', ru: 'Конвертировать WebP в JPG онлайн — Zipply' },
        description: { en: 'Convert WebP images to universally compatible JPG format.', ru: 'Конвертируйте WebP в универсальный формат JPG.' },
        apiEndpoint: '/api/v1/convert/webp-to-jpg', outputFormat: 'jpg', fromLabel: 'WebP', toLabel: 'JPG',
        faq: { en: [], ru: [] },
    },
    'webp-to-png': {
        title: { en: 'Convert WebP to PNG Online — Zipply', ru: 'Конвертировать WebP в PNG онлайн — Zipply' },
        description: { en: 'Convert WebP images to lossless PNG format.', ru: 'Конвертируйте WebP в PNG без потерь.' },
        apiEndpoint: '/api/v1/convert/webp-to-png', outputFormat: 'png', fromLabel: 'WebP', toLabel: 'PNG',
        faq: { en: [], ru: [] },
    },
    'svg-to-png': {
        title: { en: 'Convert SVG to PNG Online — Zipply', ru: 'Конвертировать SVG в PNG онлайн — Zipply' },
        description: { en: 'Rasterize SVG vectors to high-quality PNG images.', ru: 'Растеризуйте SVG в PNG высокого качества.' },
        apiEndpoint: '/api/v1/convert/svg-to-png', outputFormat: 'png', fromLabel: 'SVG', toLabel: 'PNG',
        faq: { en: [], ru: [] },
    },
    'gif-to-mp4': {
        title: { en: 'Convert GIF to MP4 Online — Zipply', ru: 'Конвертировать GIF в MP4 онлайн — Zipply' },
        description: { en: 'Convert animated GIFs to efficient MP4 videos.', ru: 'Конвертируйте анимированные GIF в эффективные MP4 видео.' },
        apiEndpoint: '/api/v1/convert/gif-to-mp4', outputFormat: 'mp4', fromLabel: 'GIF', toLabel: 'MP4',
        faq: { en: [], ru: [] },
    },
    'mp4-to-gif': {
        title: { en: 'Convert MP4 to GIF Online — Zipply', ru: 'Конвертировать MP4 в GIF онлайн — Zipply' },
        description: { en: 'Create animated GIFs from MP4 video clips.', ru: 'Создавайте анимированные GIF из видео MP4.' },
        apiEndpoint: '/api/v1/convert/mp4-to-gif', outputFormat: 'gif', acceptType: 'video/*', fromLabel: 'MP4', toLabel: 'GIF',
        faq: { en: [], ru: [] },
    },
    'video-to-audio': {
        title: { en: 'Extract Audio from Video Online — Zipply', ru: 'Извлечь аудио из видео онлайн — Zipply' },
        description: { en: 'Extract MP3, AAC, or WAV audio from any video file.', ru: 'Извлеките аудио в MP3, AAC или WAV из любого видео.' },
        apiEndpoint: '/api/v1/convert/video-to-audio', outputFormat: 'mp3', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'Audio',
        faq: { en: [], ru: [] },
    },
    'video-convert': {
        title: { en: 'Video Converter Online — Zipply', ru: 'Видеоконвертер онлайн — Zipply' },
        description: { en: 'Convert videos between all popular formats.', ru: 'Конвертируйте видео между всеми популярными форматами.' },
        apiEndpoint: '/api/v1/video/convert', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'MP4',
        faq: { en: [], ru: [] },
    },
    'mov-to-mp4': {
        title: { en: 'Convert MOV to MP4 Online — Zipply', ru: 'Конвертировать MOV в MP4 онлайн — Zipply' },
        description: { en: 'Convert Apple MOV videos to universal MP4 format.', ru: 'Конвертируйте Apple MOV в универсальный MP4.' },
        apiEndpoint: '/api/v1/video/mov-to-mp4', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'MOV', toLabel: 'MP4',
        faq: { en: [], ru: [] },
    },
    'avi-to-mp4': {
        title: { en: 'Convert AVI to MP4 Online — Zipply', ru: 'Конвертировать AVI в MP4 онлайн — Zipply' },
        description: { en: 'Convert legacy AVI files to modern MP4.', ru: 'Конвертируйте устаревшие AVI в современный MP4.' },
        apiEndpoint: '/api/v1/video/avi-to-mp4', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'AVI', toLabel: 'MP4',
        faq: { en: [], ru: [] },
    },
    'mkv-to-mp4': {
        title: { en: 'Convert MKV to MP4 Online — Zipply', ru: 'Конвертировать MKV в MP4 онлайн — Zipply' },
        description: { en: 'Convert Matroska MKV videos to MP4 for wider compatibility.', ru: 'Конвертируйте MKV в MP4 для лучшей совместимости.' },
        apiEndpoint: '/api/v1/video/mkv-to-mp4', outputFormat: 'mp4', acceptType: 'video/*', fromLabel: 'MKV', toLabel: 'MP4',
        faq: { en: [], ru: [] },
    },
    'to-webm': {
        title: { en: 'Convert Video to WebM Online — Zipply', ru: 'Конвертировать видео в WebM онлайн — Zipply' },
        description: { en: 'Convert any video to WebM format for the web.', ru: 'Конвертируйте любое видео в формат WebM для веба.' },
        apiEndpoint: '/api/v1/video/to-webm', outputFormat: 'webm', acceptType: 'video/*', fromLabel: 'Video', toLabel: 'WebM',
        faq: { en: [], ru: [] },
    },
};

const translations: Record<Lang, Record<string, string>> = {
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
        before: 'Before',
        after: 'After',
        relatedTitle: 'Related Tools',
    },
    ru: {
        drop: 'Перетащите файл сюда',
        orClick: 'или нажмите для выбора',
        quality: 'Качество',
        smallerFile: 'Меньше размер',
        betterQuality: 'Лучше качество',
        compress: 'Конвертировать',
        compressing: 'Конвертация...',
        done: 'Готово!',
        original: 'Исходный',
        compressed: 'Результат',
        saved: 'Размер',
        download: 'Скачать',
        before: 'До',
        after: 'После',
        relatedTitle: 'Связанные инструменты',
    },
    es: {
        drop: 'Suelta tu archivo aquí',
        orClick: 'o haz clic',
        quality: 'Calidad',
        compress: 'Convertir ahora',
        compressing: 'Convirtiendo...',
        done: '¡Conversión completa!',
        original: 'Original',
        compressed: 'Resultado',
        saved: 'Tamaño',
        download: 'Descargar',
        before: 'Antes',
        after: 'Después',
        relatedTitle: 'Herramientas relacionadas',
    },
    pt: {
        drop: 'Solte seu arquivo aqui',
        orClick: 'ou clique',
        quality: 'Qualidade',
        compress: 'Converter agora',
        compressing: 'Convertendo...',
        done: 'Conversão concluída!',
        original: 'Original',
        compressed: 'Resultado',
        saved: 'Tamanho',
        download: 'Baixar',
        before: 'Antes',
        after: 'Depois',
        relatedTitle: 'Ferramentas relacionadas',
    },
    fr: {
        drop: 'Déposez votre fichier ici',
        orClick: 'ou cliquez',
        quality: 'Qualité',
        compress: 'Convertir maintenant',
        compressing: 'Conversion en cours...',
        done: 'Conversion terminée !',
        original: 'Original',
        compressed: 'Résultat',
        saved: 'Taille',
        download: 'Télécharger',
        before: 'Avant',
        after: 'Après',
        relatedTitle: 'Outils connexes',
    },
    de: {
        drop: 'Datei hier ablegen',
        orClick: 'oder klicken Sie',
        quality: 'Qualität',
        compress: 'Jetzt konvertieren',
        compressing: 'Konvertierung...',
        done: 'Konvertierung abgeschlossen!',
        original: 'Original',
        compressed: 'Ergebnis',
        saved: 'Größe',
        download: 'Herunterladen',
        before: 'Vorher',
        after: 'Nachher',
        relatedTitle: 'Verwandte Tools',
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; conversion: string }> }): Promise<Metadata> {
    const { lang, conversion } = await params;
    const config = conversions[conversion];
    const title = config?.title[lang as Lang] || config?.title.en || 'File Converter';
    const description = config?.description[lang as Lang] || config?.description.en || '';
    const url = `${BASE_URL}/${lang}/convert/${conversion}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/convert/${conversion}`])),
        },
        openGraph: { title, description, url, type: 'website', locale: lang },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function ConvertPage({ params }: { params: Promise<{ lang: string; conversion: string }> }) {
    const { lang, conversion } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const config = conversions[conversion];
    const t = translations[langKey];
    const seo = seoTexts[conversion]?.[langKey];

    if (!config) {
        return <div className="p-10 text-center text-red-500">Converter not found</div>;
    }

    const title = config.title[langKey] || config.title.en;
    const description = config.description[langKey] || config.description.en;
    const faqs = config.faq[langKey] || config.faq.en || [];

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: `${config.fromLabel} to ${config.toLabel}`, url: `/${lang}/convert/${conversion}` },
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
                acceptType={config.acceptType}
            />

            {seo && (
                <div className="mt-12 space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold mb-4">{seo.howTitle}</h2>
                        <ol className="space-y-3 text-gray-600">
                            {seo.howSteps.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-[#007BFF] text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">{seo.benefitsTitle}</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                            {seo.benefits.map((b, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            )}

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">{t.relatedTitle || 'Related Tools'}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {relatedTools.map(tool => (
                        <Link key={tool.href} href={`/${lang}/${tool.href}`}
                              className="p-3 bg-white border border-gray-200 rounded-xl hover:border-[#007BFF] hover:shadow-md text-sm font-medium text-gray-700 hover:text-[#007BFF] transition-all text-center">
                            {tool.label[langKey] || tool.label.en}
                        </Link>
                    ))}
                </div>
            </section>

            {faqs.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">
                        {langKey === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
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