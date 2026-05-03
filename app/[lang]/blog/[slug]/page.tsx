// app/[lang]/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSchema from '@/components/FAQSchema';
import Link from 'next/link';

type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ru';

const LANGUAGES: Lang[] = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://zipply.io';

interface ArticleData {
    title: Record<Lang, string>;
    description: Record<Lang, string>;
    content: Record<Lang, string>;
    faq: Record<Lang, Array<{ question: string; answer: string }>>;
    relatedTools?: string[];
}

const articles: Record<string, ArticleData> = {
    'compress-jpeg-for-instagram': {
        title: {
            en: 'How to Compress JPEG for Instagram Without Losing Quality',
            ru: 'Как сжать JPEG для Instagram без потери качества',
            es: 'Cómo comprimir JPEG para Instagram sin perder calidad',
            pt: 'Como comprimir JPEG para o Instagram sem perder qualidade',
            fr: 'Comment compresser un JPEG pour Instagram sans perte de qualité',
            de: 'JPEG für Instagram komprimieren ohne Qualitätsverlust',
        },
        description: {
            en: 'Learn the best settings to compress JPEG images for Instagram. Keep your photos crisp while meeting size requirements.',
            ru: 'Узнайте лучшие настройки сжатия JPEG для Instagram. Сохраните качество и соответствуйте требованиям платформы.',
            es: 'Aprenda las mejores configuraciones para comprimir JPEG para Instagram.',
            pt: 'Aprenda as melhores configurações para comprimir JPEG para o Instagram.',
            fr: 'Découvrez les meilleurs réglages pour compresser un JPEG pour Instagram.',
            de: 'Erfahren Sie die besten Einstellungen zum Komprimieren von JPEG für Instagram.',
        },
        content: {
            en: `<p>Instagram recommends uploading JPEG files with a maximum resolution of 1080 pixels on the long edge. However, the app also applies its own compression, which can degrade quality if your file isn't properly prepared.</p>
<h2>Best JPEG Settings for Instagram</h2>
<ul><li><strong>Quality:</strong> 85-90% – preserves detail while keeping file size low.</li><li><strong>Resolution:</strong> 1080px on the longest side (square, portrait, or landscape).</li><li><strong>Color space:</strong> sRGB – ensures colors display correctly.</li></ul>
<h2>How to Compress JPEG for Instagram with Zipply</h2>
<ol><li>Upload your photo to Zipply's <a href="/en/compress/jpeg">JPEG compressor</a>.</li><li>Set quality to 85% and resize to 1080px.</li><li>Click "Compress" and download the optimized file.</li></ol>
<p>Using Zipply, your file never leaves your browser – it's fast, private, and free.</p>`,
            ru: `<p>Instagram рекомендует загружать JPEG с разрешением до 1080 пикселей по длинной стороне. Но приложение также применяет своё сжатие, что может ухудшить качество, если файл не подготовлен заранее.</p>
<h2>Лучшие настройки JPEG для Instagram</h2>
<ul><li><strong>Качество:</strong> 85-90% – сохраняет детали при небольшом размере.</li><li><strong>Разрешение:</strong> 1080px по длинной стороне.</li><li><strong>Цветовое пространство:</strong> sRGB – гарантирует правильные цвета.</li></ul>
<h2>Как сжать JPEG для Instagram через Zipply</h2>
<ol><li>Загрузите фото в <a href="/ru/compress/jpeg">JPEG компрессор</a> Zipply.</li><li>Установите качество 85% и размер 1080px.</li><li>Нажмите «Сжать» и скачайте оптимизированный файл.</li></ol>
<p>С Zipply ваш файл не покидает браузер – это быстро, приватно и бесплатно.</p>`,
            es: `<p>Instagram recomienda subir archivos JPEG con una resolución máxima de 1080 píxeles en el lado más largo. Sin embargo, la aplicación también aplica su propia compresión, lo que puede degradar la calidad si el archivo no está bien preparado.</p><h2>Mejores ajustes de JPEG para Instagram</h2><ul><li><strong>Calidad:</strong> 85-90%.</li><li><strong>Resolución:</strong> 1080px en el lado más largo.</li><li><strong>Espacio de color:</strong> sRGB.</li></ul><p>Usa el <a href="/es/compress/jpeg">compresor JPEG de Zipply</a> – es rápido y privado.</p>`,
            pt: `<p>Instagram recomenda enviar arquivos JPEG com resolução máxima de 1080 pixels no lado maior. Mas o app também aplica sua própria compressão, o que pode reduzir a qualidade se o arquivo não estiver bem preparado.</p><h2>Melhores configurações de JPEG para o Instagram</h2><ul><li><strong>Qualidade:</strong> 85-90%.</li><li><strong>Resolução:</strong> 1080px no lado maior.</li><li><strong>Espaço de cor:</strong> sRGB.</li></ul><p>Use o <a href="/pt/compress/jpeg">compressor JPEG do Zipply</a> – é rápido e privado.</p>`,
            fr: `<p>Instagram recommande de télécharger des fichiers JPEG avec une résolution maximale de 1080 pixels sur le côté le plus long. Cependant, l'application applique également sa propre compression, ce qui peut dégrader la qualité si le fichier n'est pas bien préparé.</p><h2>Meilleurs réglages JPEG pour Instagram</h2><ul><li><strong>Qualité :</strong> 85-90%.</li><li><strong>Résolution :</strong> 1080px sur le côté le plus long.</li><li><strong>Espace colorimétrique :</strong> sRGB.</li></ul><p>Utilisez le <a href="/fr/compress/jpeg">compresseur JPEG de Zipply</a> – rapide et privé.</p>`,
            de: `<p>Instagram empfiehlt, JPEG-Dateien mit einer maximalen Auflösung von 1080 Pixeln auf der langen Seite hochzuladen. Die App wendet jedoch auch eine eigene Komprimierung an, was die Qualität beeinträchtigen kann, wenn die Datei nicht richtig vorbereitet ist.</p><h2>Beste JPEG-Einstellungen für Instagram</h2><ul><li><strong>Qualität:</strong> 85-90%.</li><li><strong>Auflösung:</strong> 1080px auf der längsten Seite.</li><li><strong>Farbraum:</strong> sRGB.</li></ul><p>Nutzen Sie den <a href="/de/compress/jpeg">JPEG-Kompressor von Zipply</a> – schnell und privat.</p>`,
        },
        faq: {
            en: [{ question: 'Does Instagram compress JPEG images?', answer: 'Yes, Instagram applies its own compression. Pre-compressing with Zipply gives you more control over the final quality.' }],
            ru: [{ question: 'Сжимает ли Instagram JPEG?', answer: 'Да, Instagram применяет своё сжатие. Предварительное сжатие через Zipply даёт больше контроля над качеством.' }],
            es: [], pt: [], fr: [], de: [],
        },
    },
    'how-to-open-webp': {
        title: {
            en: 'How to Open WebP Files on Computer and Online',
            ru: 'Чем открыть WebP на компьютере и онлайн',
            es: 'Cómo abrir archivos WebP en la computadora y en línea',
            pt: 'Como abrir arquivos WebP no computador e online',
            fr: 'Comment ouvrir des fichiers WebP sur ordinateur et en ligne',
            de: 'WebP-Dateien auf dem Computer und online öffnen',
        },
        description: {
            en: 'Struggling to open a WebP file? Learn the easiest ways to view, edit, and convert WebP images on any device.',
            ru: 'Не знаете, чем открыть WebP? Узнайте самые простые способы просмотра, редактирования и конвертации WebP на любом устройстве.',
            es: '¿No sabe cómo abrir un archivo WebP? Descubra las formas más fáciles de ver, editar y convertir imágenes WebP.',
            pt: 'Não sabe como abrir um arquivo WebP? Descubra as maneiras mais fáceis de visualizar, editar e converter imagens WebP.',
            fr: 'Vous ne savez pas comment ouvrir un fichier WebP ? Découvrez les moyens les plus simples de visualiser, éditer et convertir des images WebP.',
            de: 'Sie wissen nicht, wie Sie eine WebP-Datei öffnen sollen? Entdecken Sie die einfachsten Möglichkeiten zum Anzeigen, Bearbeiten und Konvertieren.',
        },
        content: {
            en: `<p>WebP is a modern format that offers excellent compression, but not every program supports it natively. If you've downloaded a WebP image and can't open it, here are the quickest solutions.</p>
<h2>How to Open WebP on Windows</h2><p>Windows Photos app now supports WebP natively. If not, install the WebP codec from Microsoft Store or simply convert the file to JPEG using Zipply's <a href="/en/convert/webp-to-jpg">free WebP to JPG converter</a>.</p>
<h2>How to Open WebP on Mac</h2><p>Preview app supports WebP starting from macOS Ventura. For older systems, use Chrome or convert online.</p>
<h2>How to Open WebP Online</h2><p>Just drag and drop the file into Zipply – you can view, compress, or convert it instantly without installing anything.</p>`,
            ru: `<p>WebP – современный формат с отличным сжатием, но не все программы его понимают. Если вы скачали WebP и не можете открыть, вот самые быстрые решения.</p>
<h2>Чем открыть WebP на Windows</h2><p>Приложение «Фотографии» теперь поддерживает WebP. Если нет – установите кодек из Microsoft Store или просто конвертируйте файл в JPEG через <a href="/ru/convert/webp-to-jpg">бесплатный конвертер WebP в JPG</a> от Zipply.</p>
<h2>Чем открыть WebP на Mac</h2><p>Preview поддерживает WebP начиная с macOS Ventura. Для старых систем используйте Chrome или онлайн-конвертер.</p>
<h2>Чем открыть WebP онлайн</h2><p>Просто перетащите файл в Zipply – вы можете просмотреть, сжать или конвертировать его мгновенно без установки.</p>`,
            es: `<p>WebP es un formato moderno con excelente compresión, pero no todos los programas lo soportan. Si descargó una imagen WebP y no puede abrirla, aquí están las soluciones más rápidas.</p><h2>Cómo abrir WebP en Windows</h2><p>La aplicación Fotos ahora soporta WebP. Si no, instale el códec desde Microsoft Store o convierta el archivo a JPEG con el <a href="/es/convert/webp-to-jpg">conversor gratuito de WebP a JPG</a> de Zipply.</p>`,
            pt: `<p>WebP é um formato moderno com excelente compressão, mas nem todos os programas o suportam. Se você baixou uma imagem WebP e não consegue abri-la, aqui estão as soluções mais rápidas.</p><h2>Como abrir WebP no Windows</h2><p>O aplicativo Fotos agora suporta WebP. Se não, instale o codec da Microsoft Store ou converta o arquivo para JPEG com o <a href="/pt/convert/webp-to-jpg">conversor gratuito de WebP para JPG</a> do Zipply.</p>`,
            fr: `<p>WebP est un format moderne avec une excellente compression, mais tous les programmes ne le supportent pas. Si vous avez téléchargé une image WebP et ne pouvez pas l'ouvrir, voici les solutions les plus rapides.</p><h2>Comment ouvrir WebP sur Windows</h2><p>L'application Photos supporte désormais WebP. Sinon, installez le codec depuis le Microsoft Store ou convertissez le fichier en JPEG avec le <a href="/fr/convert/webp-to-jpg">convertisseur WebP vers JPG gratuit</a> de Zipply.</p>`,
            de: `<p>WebP ist ein modernes Format mit hervorragender Kompression, aber nicht jedes Programm unterstützt es. Wenn Sie ein WebP-Bild heruntergeladen haben und es nicht öffnen können, hier die schnellsten Lösungen.</p><h2>Wie man WebP unter Windows öffnet</h2><p>Die Fotos-App unterstützt jetzt WebP. Falls nicht, installieren Sie den Codec aus dem Microsoft Store oder konvertieren Sie die Datei mit dem <a href="/de/convert/webp-to-jpg">kostenlosen WebP-zu-JPG-Konverter</a> von Zipply.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'compress-png-without-losing-transparency': {
        title: {
            en: 'How to Compress PNG Without Losing Transparency',
            ru: 'Как сжать PNG без потери прозрачности',
            es: 'Cómo comprimir PNG sin perder transparencia',
            pt: 'Como comprimir PNG sem perder transparência',
            fr: 'Comment compresser un PNG sans perdre la transparence',
            de: 'PNG komprimieren ohne Transparenzverlust',
        },
        description: {
            en: 'Keep your logos and graphics crisp. Learn how to compress PNG files while preserving the alpha channel.',
            ru: 'Сохраните логотипы и графику чёткими. Узнайте, как сжать PNG с сохранением альфа-канала.',
            es: 'Mantenga sus logotipos y gráficos nítidos. Aprenda a comprimir PNG conservando el canal alfa.',
            pt: 'Mantenha seus logotipos e gráficos nítidos. Aprenda a comprimir PNG preservando o canal alfa.',
            fr: 'Gardez vos logos et graphiques nets. Apprenez à compresser un PNG en conservant le canal alpha.',
            de: 'Halten Sie Ihre Logos und Grafiken scharf. Erfahren Sie, wie Sie PNG unter Beibehaltung des Alphakanals komprimieren.',
        },
        content: {
            en: `<p>PNG is the go-to format for images that need transparency – logos, icons, and overlays. But PNG files can be large. Here's how to reduce their size without losing the transparent background.</p>
<h2>Use Lossless Compression</h2><p>Zipply's <a href="/en/compress/png">PNG compressor</a> offers a "Fast" mode that uses lossless optimization. Your image will be smaller, but pixel-for-pixel identical to the original – including all transparency data.</p>
<h2>Use the Right Tool</h2><p>Many tools convert PNG to JPEG and destroy transparency. Always use a dedicated PNG compressor that explicitly preserves the alpha channel.</p>
<h2>How to Compress PNG with Zipply</h2><ol><li>Go to <a href="/en/compress/png">Zipply's PNG compressor</a>.</li><li>Upload your file.</li><li>Choose "Fast" mode for lossless compression.</li><li>Click "Compress" and download.</li></ol>`,
            ru: `<p>PNG – идеальный формат для изображений с прозрачностью: логотипов, иконок, наложений. Но PNG-файлы могут быть тяжёлыми. Вот как уменьшить их размер, не теряя прозрачный фон.</p>
<h2>Используйте сжатие без потерь</h2><p><a href="/ru/compress/png">PNG-компрессор</a> Zipply предлагает режим «Быстрый» – это оптимизация без потерь. Изображение станет меньше, но пиксель-в-пиксель останется идентичным оригиналу, включая все данные прозрачности.</p>
<h2>Выбирайте правильный инструмент</h2><p>Многие инструменты конвертируют PNG в JPEG и уничтожают прозрачность. Всегда используйте специализированный PNG-компрессор.</p>
<h2>Как сжать PNG через Zipply</h2><ol><li>Откройте <a href="/ru/compress/png">PNG-компрессор Zipply</a>.</li><li>Загрузите файл.</li><li>Выберите «Быстрый» режим.</li><li>Нажмите «Сжать» и скачайте.</li></ol>`,
            es: `<p>PNG es el formato ideal para imágenes que necesitan transparencia. Pero los archivos PNG pueden ser grandes. Así es como puedes reducir su tamaño sin perder el fondo transparente.</p><h2>Usa compresión sin pérdida</h2><p>El <a href="/es/compress/png">compresor PNG de Zipply</a> ofrece un modo "Rápido" que utiliza optimización sin pérdida, preservando toda la transparencia.</p>`,
            pt: `<p>PNG é o formato ideal para imagens que precisam de transparência. Mas os arquivos PNG podem ser grandes. Veja como reduzir o tamanho sem perder o fundo transparente.</p><h2>Use compressão sem perdas</h2><p>O <a href="/pt/compress/png">compressor PNG do Zipply</a> oferece um modo "Rápido" que usa otimização sem perdas, preservando toda a transparência.</p>`,
            fr: `<p>PNG est le format idéal pour les images nécessitant de la transparence. Mais les fichiers PNG peuvent être volumineux. Voici comment réduire leur taille sans perdre le fond transparent.</p><h2>Utilisez la compression sans perte</h2><p>Le <a href="/fr/compress/png">compresseur PNG de Zipply</a> propose un mode "Rapide" qui utilise une optimisation sans perte, préservant toute la transparence.</p>`,
            de: `<p>PNG ist das ideale Format für Bilder, die Transparenz benötigen. Aber PNG-Dateien können groß sein. So reduzieren Sie ihre Größe, ohne den transparenten Hintergrund zu verlieren.</p><h2>Verwenden Sie verlustfreie Kompression</h2><p>Der <a href="/de/compress/png">PNG-Kompressor von Zipply</a> bietet einen "Schnell"-Modus, der verlustfreie Optimierung nutzt und die gesamte Transparenz beibehält.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'webp-vs-avif': {
        title: {
            en: 'WebP vs AVIF: Which Modern Image Format Is Better?',
            ru: 'Что лучше: WebP или AVIF? Полный разбор форматов',
            es: 'WebP vs AVIF: ¿Qué formato de imagen moderno es mejor?',
            pt: 'WebP vs AVIF: Qual formato de imagem moderno é melhor?',
            fr: 'WebP vs AVIF : Quel format d\'image moderne est le meilleur ?',
            de: 'WebP vs AVIF: Welches moderne Bildformat ist besser?',
        },
        description: {
            en: 'Compare WebP and AVIF – compression efficiency, quality, browser support, and features. Find the best format for your website.',
            ru: 'Сравнение WebP и AVIF – эффективность сжатия, качество, поддержка браузерами и возможности. Выберите лучший формат для сайта.',
            es: 'Compare WebP y AVIF: eficiencia de compresión, calidad, soporte de navegadores y características.',
            pt: 'Compare WebP e AVIF: eficiência de compressão, qualidade, suporte de navegadores e recursos.',
            fr: 'Comparez WebP et AVIF : efficacité de compression, qualité, support des navigateurs et fonctionnalités.',
            de: 'Vergleichen Sie WebP und AVIF: Kompressionseffizienz, Qualität, Browser-Unterstützung und Funktionen.',
        },
        content: {
            en: `<h2>WebP Overview</h2><p>Developed by Google, WebP delivers 25-35% better compression than JPEG and PNG. It supports both lossy and lossless modes, transparency, and animation. WebP is supported by 97%+ of browsers.</p>
<h2>AVIF Overview</h2><p>Based on the AV1 video codec, AVIF offers up to 50% better compression than JPEG. It supports HDR, wide color gamut, transparency, and both lossy/lossless modes. Browser support exceeds 90%.</p>
<h2>Key Differences</h2><table><tr><th>Feature</th><th>WebP</th><th>AVIF</th></tr><tr><td>Compression</td><td>25-35% better than JPEG</td><td>50%+ better than JPEG</td></tr><tr><td>Browser support</td><td>97%+</td><td>90%+</td></tr><tr><td>Encoding speed</td><td>Fast</td><td>Slower (improving)</td></tr></table>
<h2>Which Should You Choose?</h2><p>For maximum compatibility today, use WebP. For future-proof projects and the smallest file sizes, use AVIF with a JPEG/WebP fallback.</p>
<p>Try both with Zipply's free <a href="/en/compress/webp">WebP</a> and <a href="/en/compress/avif">AVIF compressors</a>.</p>`,
            ru: `<h2>Обзор WebP</h2><p>Разработан Google, WebP обеспечивает на 25-35% лучшее сжатие, чем JPEG и PNG. Поддерживает сжатие с потерями и без, прозрачность и анимацию. Работает в 97%+ браузеров.</p>
<h2>Обзор AVIF</h2><p>Основан на кодеке AV1, AVIF предлагает до 50% лучшее сжатие, чем JPEG. Поддерживает HDR, широкий цветовой охват, прозрачность и оба режима сжатия. Поддержка браузерами превышает 90%.</p>
<h2>Ключевые различия</h2><table><tr><th>Характеристика</th><th>WebP</th><th>AVIF</th></tr><tr><td>Сжатие</td><td>на 25-35% лучше JPEG</td><td>на 50%+ лучше JPEG</td></tr><tr><td>Поддержка браузерами</td><td>97%+</td><td>90%+</td></tr><tr><td>Скорость кодирования</td><td>Быстрое</td><td>Медленнее (улучшается)</td></tr></table>
<h2>Что выбрать?</h2><p>Для максимальной совместимости сегодня используйте WebP. Для проектов на будущее и минимального размера файлов – AVIF с фолбэком на JPEG/WebP.</p>
<p>Попробуйте оба формата с бесплатными компрессорами Zipply: <a href="/ru/compress/webp">WebP</a> и <a href="/ru/compress/avif">AVIF</a>.</p>`,
            es: `<h2>WebP</h2><p>Ofrece 25-35% mejor compresión que JPEG. 97%+ de soporte en navegadores.</p><h2>AVIF</h2><p>Hasta 50% mejor compresión. 90%+ de soporte.</p><h2>Conclusión</h2><p>Usa WebP para compatibilidad, AVIF para el futuro.</p>`,
            pt: `<h2>WebP</h2><p>Oferece 25-35% melhor compressão que JPEG. 97%+ de suporte nos navegadores.</p><h2>AVIF</h2><p>Até 50% melhor compressão. 90%+ de suporte.</p><h2>Conclusão</h2><p>Use WebP para compatibilidade, AVIF para o futuro.</p>`,
            fr: `<h2>WebP</h2><p>Offre une compression 25-35% meilleure que JPEG. 97%+ de support navigateur.</p><h2>AVIF</h2><p>Jusqu'à 50% de meilleure compression. 90%+ de support.</p><h2>Conclusion</h2><p>Utilisez WebP pour la compatibilité, AVIF pour l'avenir.</p>`,
            de: `<h2>WebP</h2><p>Bietet 25-35% bessere Kompression als JPEG. 97%+ Browser-Unterstützung.</p><h2>AVIF</h2><p>Bis zu 50% bessere Kompression. 90%+ Unterstützung.</p><h2>Fazit</h2><p>Nutzen Sie WebP für Kompatibilität, AVIF für die Zukunft.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'compress-gif-for-telegram': {
        title: {
            en: 'How to Compress GIF for Telegram: Step-by-Step Guide',
            ru: 'Как сжать гифку для Телеграм: пошаговая инструкция',
            es: 'Cómo comprimir GIF para Telegram: guía paso a paso',
            pt: 'Como comprimir GIF para o Telegram: guia passo a passo',
            fr: 'Comment compresser un GIF pour Telegram : guide étape par étape',
            de: 'GIF für Telegram komprimieren: Schritt-für-Schritt-Anleitung',
        },
        description: {
            en: 'Telegram has file size limits for GIFs. Learn how to compress your GIFs without losing animation quality.',
            ru: 'Telegram имеет ограничения по размеру для GIF. Узнайте, как сжать гифку без потери качества анимации.',
            es: 'Telegram tiene límites de tamaño para GIFs. Aprenda a comprimir sus GIFs sin perder calidad de animación.',
            pt: 'O Telegram tem limites de tamanho para GIFs. Aprenda a comprimir seus GIFs sem perder a qualidade da animação.',
            fr: 'Telegram a des limites de taille pour les GIFs. Apprenez à compresser vos GIFs sans perdre la qualité d\'animation.',
            de: 'Telegram hat Dateigrößenbeschränkungen für GIFs. Erfahren Sie, wie Sie Ihre GIFs ohne Verlust der Animationsqualität komprimieren.',
        },
        content: {
            en: `<p>Telegram allows sending GIFs up to 10 MB. If your GIF is larger, it may fail to send or be converted to a muted video. Here's how to fix it.</p>
<h2>How to Compress GIF for Telegram with Zipply</h2>
<ol><li>Go to Zipply's <a href="/en/compress/gif">GIF compressor</a>.</li><li>Upload your GIF.</li><li>Reduce the number of colors – try 128 for a good balance, or 64 for aggressive compression.</li><li>Click "Compress" and download the smaller GIF.</li></ol>
<p>Your GIF will stay animated, but the file size will be small enough to send via Telegram.</p>`,
            ru: `<p>Telegram позволяет отправлять GIF до 10 МБ. Если ваша гифка больше, она может не отправиться или конвертироваться в беззвучное видео. Вот как это исправить.</p>
<h2>Как сжать GIF для Телеграм через Zipply</h2>
<ol><li>Откройте <a href="/ru/compress/gif">GIF-компрессор Zipply</a>.</li><li>Загрузите ваш GIF.</li><li>Уменьшите количество цветов – попробуйте 128 для хорошего баланса или 64 для агрессивного сжатия.</li><li>Нажмите «Сжать» и скачайте уменьшенный GIF.</li></ol>
<p>Ваша гифка останется анимированной, но размер файла станет достаточно маленьким для отправки через Телеграм.</p>`,
            es: `<p>Telegram permite enviar GIFs de hasta 10 MB. Si tu GIF es más grande, puede fallar o convertirse en un video mudo. Aquí te mostramos cómo comprimirlo con Zipply.</p><ol><li>Ve al <a href="/es/compress/gif">compresor de GIF de Zipply</a>.</li><li>Sube tu GIF.</li><li>Reduce los colores a 128 o 64.</li><li>Haz clic en "Comprimir" y descarga.</li></ol>`,
            pt: `<p>O Telegram permite enviar GIFs de até 10 MB. Se o seu GIF for maior, pode falhar ou ser convertido em um vídeo mudo. Veja como comprimi-lo com o Zipply.</p><ol><li>Acesse o <a href="/pt/compress/gif">compressor de GIF do Zipply</a>.</li><li>Envie seu GIF.</li><li>Reduza as cores para 128 ou 64.</li><li>Clique em "Comprimir" e baixe.</li></ol>`,
            fr: `<p>Telegram autorise l'envoi de GIFs jusqu'à 10 Mo. Si votre GIF est plus volumineux, il peut échouer ou être converti en vidéo muette. Voici comment le compresser avec Zipply.</p><ol><li>Accédez au <a href="/fr/compress/gif">compresseur de GIF de Zipply</a>.</li><li>Téléchargez votre GIF.</li><li>Réduisez les couleurs à 128 ou 64.</li><li>Cliquez sur "Compresser" et téléchargez.</li></ol>`,
            de: `<p>Telegram erlaubt das Senden von GIFs bis zu 10 MB. Wenn Ihr GIF größer ist, kann es fehlschlagen oder in ein stummes Video umgewandelt werden. So komprimieren Sie es mit Zipply.</p><ol><li>Gehen Sie zum <a href="/de/compress/gif">GIF-Kompressor von Zipply</a>.</li><li>Laden Sie Ihr GIF hoch.</li><li>Reduzieren Sie die Farben auf 128 oder 64.</li><li>Klicken Sie auf "Komprimieren" und laden Sie es herunter.</li></ol>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'svg-vs-png-for-logo': {
        title: {
            en: 'SVG vs PNG for Logo: Which Format to Choose',
            ru: 'Какой формат выбрать для логотипа: SVG или PNG?',
            es: 'SVG vs PNG para logotipos: ¿Qué formato elegir?',
            pt: 'SVG vs PNG para logotipo: Qual formato escolher?',
            fr: 'SVG vs PNG pour un logo : Quel format choisir ?',
            de: 'SVG vs PNG für Logos: Welches Format wählen?',
        },
        description: {
            en: 'Should you use SVG or PNG for your logo? Compare scalability, file size, transparency, and browser support.',
            ru: 'SVG или PNG для логотипа? Сравнение масштабируемости, размера файла, прозрачности и поддержки браузерами.',
            es: '¿Debería usar SVG o PNG para su logotipo? Compare escalabilidad, tamaño de archivo, transparencia y soporte.',
            pt: 'Devo usar SVG ou PNG para meu logotipo? Compare escalabilidade, tamanho do arquivo, transparência e suporte.',
            fr: 'Devez-vous utiliser SVG ou PNG pour votre logo ? Comparez évolutivité, taille de fichier, transparence et support.',
            de: 'Sollten Sie SVG oder PNG für Ihr Logo verwenden? Vergleichen Sie Skalierbarkeit, Dateigröße, Transparenz und Unterstützung.',
        },
        content: {
            en: `<p>Choosing between SVG and PNG for a logo depends on where and how you'll use it.</p>
<h2>SVG (Scalable Vector Graphics)</h2><ul><li>Infinitely scalable without quality loss – perfect for responsive websites and print.</li><li>Tiny file size – ideal for web performance.</li><li>Editable with code or vector editors.</li></ul>
<h2>PNG (Portable Network Graphics)</h2><ul><li>Raster format – fixed resolution. Enlarging causes blur.</li><li>Larger file size than SVG for logos.</li><li>Excellent for previews, social media, and places where SVG isn't accepted.</li></ul>
<h2>Recommendation</h2><p>Use SVG as your primary logo format. Keep a high-resolution PNG (e.g., 1000x1000px) as a fallback for platforms that don't support SVG.</p>
<p>Need to convert? Try Zipply's <a href="/en/convert/svg-to-png">free SVG to PNG converter</a>.</p>`,
            ru: `<p>Выбор между SVG и PNG для логотипа зависит от того, где и как вы будете его использовать.</p>
<h2>SVG (масштабируемая векторная графика)</h2><ul><li>Бесконечное масштабирование без потери качества – идеально для адаптивных сайтов и печати.</li><li>Минимальный размер файла – отлично для скорости загрузки.</li><li>Редактируется через код или в векторных редакторах.</li></ul>
<h2>PNG (портативная сетевая графика)</h2><ul><li>Растровый формат – фиксированное разрешение. Увеличение вызывает размытие.</li><li>Больший размер файла, чем у SVG для логотипов.</li><li>Отлично подходит для превью, соцсетей и платформ, не принимающих SVG.</li></ul>
<h2>Рекомендация</h2><p>Используйте SVG как основной формат логотипа. Держите PNG высокого разрешения (например, 1000x1000px) как запасной вариант.</p>
<p>Нужна конвертация? Попробуйте <a href="/ru/convert/svg-to-png">бесплатный конвертер SVG в PNG</a> от Zipply.</p>`,
            es: `<p>La elección entre SVG y PNG para un logotipo depende de dónde y cómo lo uses.</p><h2>SVG</h2><ul><li>Escalable sin pérdida de calidad.</li><li>Tamaño de archivo mínimo.</li></ul><h2>PNG</h2><ul><li>Resolución fija.</li><li>Mayor tamaño de archivo.</li></ul><p>Recomendación: usa SVG como principal, PNG como respaldo.</p>`,
            pt: `<p>A escolha entre SVG e PNG para um logotipo depende de onde e como você o usará.</p><h2>SVG</h2><ul><li>Escalável sem perda de qualidade.</li><li>Tamanho de arquivo mínimo.</li></ul><h2>PNG</h2><ul><li>Resolução fixa.</li><li>Tamanho de arquivo maior.</li></ul><p>Recomendação: use SVG como principal, PNG como backup.</p>`,
            fr: `<p>Le choix entre SVG et PNG pour un logo dépend de l'endroit et de la manière dont vous l'utiliserez.</p><h2>SVG</h2><ul><li>Évolutif sans perte de qualité.</li><li>Taille de fichier minimale.</li></ul><h2>PNG</h2><ul><li>Résolution fixe.</li><li>Taille de fichier plus grande.</li></ul><p>Recommandation : utilisez SVG comme principal, PNG comme solution de secours.</p>`,
            de: `<p>Die Wahl zwischen SVG und PNG für ein Logo hängt davon ab, wo und wie Sie es verwenden.</p><h2>SVG</h2><ul><li>Skalierbar ohne Qualitätsverlust.</li><li>Minimale Dateigröße.</li></ul><h2>PNG</h2><ul><li>Feste Auflösung.</li><li>Größere Dateigröße.</li></ul><p>Empfehlung: Verwenden Sie SVG als Hauptformat, PNG als Fallback.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'compress-photo-for-email': {
        title: {
            en: 'How to Compress Photos for Email Attachments',
            ru: 'Как сжать фото для email-рассылки',
            es: 'Cómo comprimir fotos para adjuntar en correos electrónicos',
            pt: 'Como comprimir fotos para anexos de e-mail',
            fr: 'Comment compresser des photos pour les pièces jointes d\'e-mail',
            de: 'Fotos für E-Mail-Anhänge komprimieren',
        },
        description: {
            en: 'Avoid bounced emails. Learn how to compress photo attachments to under 10 MB or 25 MB for Gmail and Outlook.',
            ru: 'Избегайте возврата писем. Узнайте, как сжать фото до 10 или 25 МБ для Gmail и Outlook.',
            es: 'Evite correos rebotados. Aprenda a comprimir fotos a menos de 10 o 25 MB.',
            pt: 'Evite e-mails devolvidos. Aprenda a comprimir fotos para menos de 10 ou 25 MB.',
            fr: 'Évitez les e-mails rejetés. Apprenez à compresser les photos à moins de 10 ou 25 Mo.',
            de: 'Vermeiden Sie zurückgewiesene E-Mails. Erfahren Sie, wie Sie Fotos auf unter 10 oder 25 MB komprimieren.',
        },
        content: {
            en: `<p>Most email providers limit attachments to 25 MB (Gmail, Outlook) or even 10 MB. Large photos are the most common reason emails bounce. Here's how to fix it.</p>
<h2>Best Practices for Email Attachments</h2><ul><li><strong>Resize first:</strong> For emails, 1200-1600px wide photos are usually enough. Use Zipply's <a href="/en/resize">image resizer</a>.</li><li><strong>Compress:</strong> Use JPEG format with 60-70% quality – the difference is barely noticeable on screen.</li><li><strong>Batch process:</strong> If you have multiple photos, compress them all at once with Zipply.</li></ul>
<h2>How to Compress Photos for Email with Zipply</h2>
<ol><li>Go to the <a href="/en/compress/jpeg">JPEG compressor</a>.</li><li>Upload your photo.</li><li>Set quality to 65%.</li><li>Optionally resize to 1600px.</li><li>Click "Compress" and download.</li></ol>`,
            ru: `<p>Большинство почтовых сервисов ограничивают вложения до 25 МБ (Gmail, Outlook) или даже до 10 МБ. Крупные фото – самая частая причина возврата писем. Вот как это исправить.</p>
<h2>Лучшие практики для email-вложений</h2><ul><li><strong>Сначала измените размер:</strong> Для писем обычно достаточно ширины 1200-1600px. Используйте <a href="/ru/resize">изменение размера</a> от Zipply.</li><li><strong>Сожмите:</strong> Используйте JPEG с качеством 60-70% – разница на экране почти незаметна.</li><li><strong>Пакетная обработка:</strong> Если фото несколько, сожмите их все сразу через Zipply.</li></ul>
<h2>Как сжать фото для email через Zipply</h2>
<ol><li>Откройте <a href="/ru/compress/jpeg">JPEG-компрессор</a>.</li><li>Загрузите фото.</li><li>Установите качество 65%.</li><li>Опционально измените размер до 1600px.</li><li>Нажмите «Сжать» и скачайте.</li></ol>`,
            es: `<p>La mayoría de los proveedores limitan los adjuntos a 25 MB. Comprime tus fotos con Zipply.</p><ol><li>Ve al <a href="/es/compress/jpeg">compresor JPEG</a>.</li><li>Sube tu foto.</li><li>Calidad al 65%.</li><li>Redimensiona a 1600px si es necesario.</li><li>Descarga.</li></ol>`,
            pt: `<p>A maioria dos provedores limita os anexos a 25 MB. Comprima suas fotos com o Zipply.</p><ol><li>Acesse o <a href="/pt/compress/jpeg">compressor JPEG</a>.</li><li>Envie sua foto.</li><li>Qualidade em 65%.</li><li>Redimensione para 1600px se necessário.</li><li>Baixe.</li></ol>`,
            fr: `<p>La plupart des fournisseurs limitent les pièces jointes à 25 Mo. Compressez vos photos avec Zipply.</p><ol><li>Accédez au <a href="/fr/compress/jpeg">compresseur JPEG</a>.</li><li>Téléchargez votre photo.</li><li>Qualité à 65%.</li><li>Redimensionnez à 1600px si nécessaire.</li><li>Téléchargez.</li></ol>`,
            de: `<p>Die meisten Anbieter begrenzen Anhänge auf 25 MB. Komprimieren Sie Ihre Fotos mit Zipply.</p><ol><li>Gehen Sie zum <a href="/de/compress/jpeg">JPEG-Kompressor</a>.</li><li>Laden Sie Ihr Foto hoch.</li><li>Qualität auf 65%.</li><li>Bei Bedarf auf 1600px skalieren.</li><li>Herunterladen.</li></ol>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'reduce-image-size-for-website': {
        title: {
            en: '5 Ways to Reduce Image Size for Your Website',
            ru: '5 способов уменьшить размер картинки для сайта',
            es: '5 maneras de reducir el tamaño de las imágenes para tu sitio web',
            pt: '5 maneiras de reduzir o tamanho das imagens para o seu site',
            fr: '5 façons de réduire la taille des images pour votre site web',
            de: '5 Wege, um die Bildgröße für Ihre Website zu reduzieren',
        },
        description: {
            en: 'Speed up your website. Learn five proven techniques to reduce image file size and improve Core Web Vitals.',
            ru: 'Ускорьте свой сайт. Пять проверенных способов уменьшить размер изображений и улучшить Core Web Vitals.',
            es: 'Acelere su sitio web. Cinco técnicas probadas para reducir el tamaño de las imágenes.',
            pt: 'Acelere seu site. Cinco técnicas comprovadas para reduzir o tamanho das imagens.',
            fr: 'Accélérez votre site web. Cinq techniques éprouvées pour réduire la taille des images.',
            de: 'Beschleunigen Sie Ihre Website. Fünf bewährte Techniken zur Reduzierung der Bildgröße.',
        },
        content: {
            en: `<ol><li><strong>Choose the right format:</strong> JPEG for photos, PNG for graphics with transparency, WebP/AVIF for modern websites.</li><li><strong>Compress before uploading:</strong> Use Zipply's <a href="/en/compress/jpeg">compression tools</a> to reduce file size by up to 80%.</li><li><strong>Resize to display dimensions:</strong> Don't upload a 4000px photo if it's displayed at 800px. Use the <a href="/en/resize">image resizer</a>.</li><li><strong>Use lazy loading:</strong> Add <code>loading="lazy"</code> to images below the fold.</li><li><strong>Serve next-gen formats:</strong> Use <code>&lt;picture&gt;</code> to serve WebP or AVIF to supporting browsers.</li></ol>`,
            ru: `<ol><li><strong>Выберите правильный формат:</strong> JPEG для фото, PNG для графики с прозрачностью, WebP/AVIF для современных сайтов.</li><li><strong>Сжимайте перед загрузкой:</strong> Используйте <a href="/ru/compress/jpeg">инструменты сжатия</a> Zipply для уменьшения размера до 80%.</li><li><strong>Изменяйте размер под отображение:</strong> Не загружайте фото 4000px, если оно показывается как 800px. Используйте <a href="/ru/resize">изменение размера</a>.</li><li><strong>Используйте ленивую загрузку:</strong> Добавьте <code>loading="lazy"</code> к изображениям вне экрана.</li><li><strong>Современные форматы:</strong> Используйте <code>&lt;picture&gt;</code> для WebP или AVIF.</li></ol>`,
            es: `<ol><li>Elige el formato correcto.</li><li>Comprime con Zipply.</li><li>Redimensiona.</li><li>Usa lazy loading.</li><li>Sirve formatos modernos.</li></ol>`,
            pt: `<ol><li>Escolha o formato certo.</li><li>Comprima com o Zipply.</li><li>Redimensione.</li><li>Use carregamento lento (lazy loading).</li><li>Sirva formatos modernos.</li></ol>`,
            fr: `<ol><li>Choisissez le bon format.</li><li>Compressez avec Zipply.</li><li>Redimensionnez.</li><li>Utilisez le chargement différé (lazy loading).</li><li>Servez des formats modernes.</li></ol>`,
            de: `<ol><li>Wählen Sie das richtige Format.</li><li>Komprimieren Sie mit Zipply.</li><li>Skalieren Sie.</li><li>Verwenden Sie Lazy Loading.</li><li>Liefern Sie moderne Formate aus.</li></ol>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'free-tinypng-alternatives': {
        title: {
            en: 'Best Free TinyPNG Alternatives in 2026',
            ru: 'Бесплатные аналоги TinyPNG: обзор онлайн-компрессоров',
            es: 'Mejores alternativas gratuitas a TinyPNG en 2026',
            pt: 'Melhores alternativas gratuitas ao TinyPNG em 2026',
            fr: 'Meilleures alternatives gratuites à TinyPNG en 2026',
            de: 'Beste kostenlose TinyPNG-Alternativen 2026',
        },
        description: {
            en: 'Looking for a free alternative to TinyPNG? Compare the best image compressors that offer unlimited free compression.',
            ru: 'Ищете бесплатный аналог TinyPNG? Сравнение лучших компрессоров с неограниченным бесплатным сжатием.',
            es: '¿Busca una alternativa gratuita a TinyPNG? Compare los mejores compresores de imágenes.',
            pt: 'Procurando uma alternativa gratuita ao TinyPNG? Compare os melhores compressores de imagem.',
            fr: 'Vous cherchez une alternative gratuite à TinyPNG ? Comparez les meilleurs compresseurs d\'images.',
            de: 'Suchen Sie eine kostenlose Alternative zu TinyPNG? Vergleichen Sie die besten Bildkompressoren.',
        },
        content: {
            en: `<p>TinyPNG is popular, but it limits you to 20 images at a time and 5 MB per file. Here are the best free alternatives in 2026.</p>
<h2>1. Zipply</h2><p><strong>Best overall.</strong> Unlimited files, up to 50 MB each. Supports JPEG, PNG, WebP, GIF, SVG, and AVIF. Works entirely in your browser – private and secure. Includes batch processing, resizing, and format conversion.</p>
<h2>2. Compressor.io</h2><p>Good quality, but limited to 10 MB per file and lacks modern format support like AVIF.</p>
<h2>3. ILoveIMG</h2><p>Offers many tools, but free version has ads and requires account for batch processing.</p>
<h2>Why Zipply Wins</h2><ul><li>No limits – compress as many files as you want.</li><li>No uploads – all processing is local.</li><li>Modern formats – WebP and AVIF support.</li><li>Batch processing built-in.</li></ul>
<p>Try Zipply's <a href="/en/compress/jpeg">free JPEG compressor</a>.</p>`,
            ru: `<p>TinyPNG популярен, но ограничивает 20 изображениями за раз и 5 МБ на файл. Вот лучшие бесплатные альтернативы в 2026 году.</p>
<h2>1. Zipply</h2><p><strong>Лучший в целом.</strong> Без ограничений, до 50 МБ на файл. Поддержка JPEG, PNG, WebP, GIF, SVG, AVIF. Работает полностью в браузере – приватно и безопасно. Пакетная обработка, изменение размера и конвертация.</p>
<h2>2. Compressor.io</h2><p>Хорошее качество, но ограничение 10 МБ на файл и нет поддержки AVIF.</p>
<h2>3. ILoveIMG</h2><p>Много инструментов, но бесплатная версия с рекламой и требует аккаунт для пакетной обработки.</p>
<h2>Почему Zipply лучше</h2><ul><li>Без лимитов – сжимайте сколько угодно.</li><li>Без загрузок – вся обработка локальна.</li><li>Современные форматы – WebP и AVIF.</li><li>Встроенная пакетная обработка.</li></ul>
<p>Попробуйте <a href="/ru/compress/jpeg">бесплатный JPEG-компрессор Zipply</a>.</p>`,
            es: `<p>TinyPNG es popular pero limitado. Zipply es la mejor alternativa gratuita: sin límites, procesamiento local, y soporte para formatos modernos.</p><p>Prueba el <a href="/es/compress/jpeg">compresor JPEG gratuito de Zipply</a>.</p>`,
            pt: `<p>O TinyPNG é popular, mas limitado. O Zipply é a melhor alternativa gratuita: sem limites, processamento local e suporte a formatos modernos.</p><p>Experimente o <a href="/pt/compress/jpeg">compressor JPEG gratuito do Zipply</a>.</p>`,
            fr: `<p>TinyPNG est populaire mais limité. Zipply est la meilleure alternative gratuite : sans limites, traitement local et prise en charge des formats modernes.</p><p>Essayez le <a href="/fr/compress/jpeg">compresseur JPEG gratuit de Zipply</a>.</p>`,
            de: `<p>TinyPNG ist beliebt, aber eingeschränkt. Zipply ist die beste kostenlose Alternative: unbegrenzt, lokale Verarbeitung und Unterstützung moderner Formate.</p><p>Testen Sie den <a href="/de/compress/jpeg">kostenlosen JPEG-Kompressor von Zipply</a>.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'avif-vs-jpeg': {
        title: {
            en: 'AVIF vs JPEG: Should You Switch in 2026?',
            ru: 'AVIF против JPEG: стоит ли переходить в 2026 году?',
            es: 'AVIF vs JPEG: ¿Vale la pena cambiar en 2026?',
            pt: 'AVIF vs JPEG: Vale a pena mudar em 2026?',
            fr: 'AVIF vs JPEG : Faut-il passer à l\'AVIF en 2026 ?',
            de: 'AVIF vs JPEG: Lohnt sich der Wechsel 2026?',
        },
        description: {
            en: 'AVIF promises 50% better compression than JPEG. But is it ready for production? Full comparison.',
            ru: 'AVIF обещает сжатие на 50% лучше JPEG. Готов ли он для использования? Полное сравнение.',
            es: 'AVIF promete una compresión un 50% mejor que JPEG. Pero, ¿está listo para producción?',
            pt: 'AVIF promete compressão 50% melhor que JPEG. Mas está pronto para produção?',
            fr: 'L\'AVIF promet une compression 50% meilleure que le JPEG. Mais est-il prêt pour la production ?',
            de: 'AVIF verspricht 50% bessere Kompression als JPEG. Aber ist es bereit für den Produktiveinsatz?',
        },
        content: {
            en: `<h2>JPEG</h2><p>Universal, supported everywhere, but larger file sizes and no transparency.</p>
<h2>AVIF</h2><p>Superior compression, HDR support, transparency, royalty-free. Browser support is growing rapidly (90%+).</p>
<h2>Comparison</h2><p>AVIF files are often half the size of JPEG at equivalent quality. Encoding is slower, but for static assets this is a one-time cost.</p>
<p><strong>Verdict:</strong> For new projects, use AVIF with a JPEG fallback. For maximum compatibility today, stick with JPEG. Convert between both with Zipply's free tools: <a href="/en/compress/jpeg">compress JPEG</a> and <a href="/en/avif/to-avif">convert to AVIF</a>.</p>`,
            ru: `<h2>JPEG</h2><p>Универсален, поддерживается везде, но больший размер файлов и нет прозрачности.</p>
<h2>AVIF</h2><p>Превосходное сжатие, поддержка HDR, прозрачность, без лицензионных отчислений. Поддержка браузерами быстро растёт (90%+).</p>
<h2>Сравнение</h2><p>Файлы AVIF часто вдвое меньше JPEG при сопоставимом качестве. Кодирование медленнее, но для статичных изображений это разовая операция.</p>
<p><strong>Вердикт:</strong> Для новых проектов используйте AVIF с фолбэком на JPEG. Для максимальной совместимости сегодня – JPEG. Конвертируйте между ними с бесплатными инструментами Zipply: <a href="/ru/compress/jpeg">сжать JPEG</a> и <a href="/ru/avif/to-avif">конвертировать в AVIF</a>.</p>`,
            es: `<p>AVIF ofrece mejor compresión que JPEG. Para nuevos proyectos, úsalo con respaldo JPEG. Zipply puede ayudarte a convertir.</p>`,
            pt: `<p>AVIF oferece melhor compressão que JPEG. Para novos projetos, use-o com fallback JPEG. O Zipply pode ajudar na conversão.</p>`,
            fr: `<p>L'AVIF offre une meilleure compression que le JPEG. Pour les nouveaux projets, utilisez-le avec un fallback JPEG. Zipply peut vous aider à convertir.</p>`,
            de: `<p>AVIF bietet bessere Kompression als JPEG. Für neue Projekte mit JPEG-Fallback verwenden. Zipply hilft bei der Konvertierung.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'compress-image-to-100kb': {
        title: {
            en: 'How to Compress an Image to Exactly 100 KB Online',
            ru: 'Как сжать изображение до 100 КБ онлайн',
            es: 'Cómo comprimir una imagen a exactamente 100 KB en línea',
            pt: 'Como comprimir uma imagem para exatamente 100 KB online',
            fr: 'Comment compresser une image à exactement 100 Ko en ligne',
            de: 'Wie man ein Bild online auf genau 100 KB komprimiert',
        },
        description: {
            en: 'Need a file to be exactly under 100 KB? Step-by-step guide to hit your target file size for forms, CVs, or portfolios.',
            ru: 'Нужен файл ровно до 100 КБ? Пошаговое руководство для достижения целевого размера для форм, резюме или портфолио.',
            es: 'Guía para lograr que tu archivo pese exactamente 100 KB.',
            pt: 'Guia para atingir exatamente 100 KB no seu arquivo.',
            fr: 'Guide pour obtenir un fichier de exactement 100 Ko.',
            de: 'Anleitung, um Ihre Datei auf genau 100 KB zu bringen.',
        },
        content: {
            en: `<p>Many online forms and platforms require images under 100 KB. Here's how to do it precisely.</p>
<ol><li>Go to Zipply's <a href="/en/compress/jpeg">JPEG compressor</a>.</li><li>Upload your image.</li><li>Start with quality 85%. If the result is above 100 KB, reduce quality gradually.</li><li>If compression isn't enough, use the <a href="/en/resize">image resizer</a> to reduce dimensions.</li><li>Download when you hit the target.</li></ol>
<p>Zipply processes everything locally – your files stay private.</p>`,
            ru: `<p>Многие формы и платформы требуют изображения до 100 КБ. Вот как это сделать точно.</p>
<ol><li>Откройте <a href="/ru/compress/jpeg">JPEG-компрессор Zipply</a>.</li><li>Загрузите изображение.</li><li>Начните с качества 85%. Если результат больше 100 КБ, постепенно снижайте качество.</li><li>Если сжатия недостаточно, используйте <a href="/ru/resize">изменение размера</a>.</li><li>Скачайте, когда достигнете цели.</li></ol>
<p>Zipply обрабатывает всё локально – ваши файлы остаются приватными.</p>`,
            es: `<ol><li>Usa el <a href="/es/compress/jpeg">compresor JPEG</a>.</li><li>Sube la imagen.</li><li>Ajusta la calidad.</li><li>Redimensiona si es necesario.</li></ol>`,
            pt: `<ol><li>Use o <a href="/pt/compress/jpeg">compressor JPEG</a>.</li><li>Envie a imagem.</li><li>Ajuste a qualidade.</li><li>Redimensione se necessário.</li></ol>`,
            fr: `<ol><li>Utilisez le <a href="/fr/compress/jpeg">compresseur JPEG</a>.</li><li>Téléchargez l'image.</li><li>Ajustez la qualité.</li><li>Redimensionnez si nécessaire.</li></ol>`,
            de: `<ol><li>Nutzen Sie den <a href="/de/compress/jpeg">JPEG-Kompressor</a>.</li><li>Bild hochladen.</li><li>Qualität anpassen.</li><li>Bei Bedarf skalieren.</li></ol>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'convert-heic-to-jpeg-windows': {
        title: {
            en: 'How to Convert HEIC to JPEG on Windows Quickly',
            ru: 'Как быстро конвертировать HEIC в JPEG на Windows',
            es: 'Cómo convertir HEIC a JPEG en Windows rápidamente',
            pt: 'Como converter HEIC para JPEG no Windows rapidamente',
            fr: 'Comment convertir rapidement HEIC en JPEG sur Windows',
            de: 'HEIC schnell in JPEG unter Windows konvertieren',
        },
        description: {
            en: 'Windows doesn\'t open HEIC files natively. Learn the fastest way to convert iPhone photos to JPEG.',
            ru: 'Windows не открывает HEIC без дополнительных кодеков. Самый быстрый способ конвертировать фото iPhone в JPEG.',
            es: 'Windows no abre HEIC de forma nativa. Aprenda la forma más rápida de convertir fotos de iPhone a JPEG.',
            pt: 'O Windows não abre HEIC nativamente. Aprenda a maneira mais rápida de converter fotos do iPhone para JPEG.',
            fr: 'Windows n\'ouvre pas les fichiers HEIC nativement. Apprenez le moyen le plus rapide de convertir des photos iPhone en JPEG.',
            de: 'Windows öffnet HEIC-Dateien nicht nativ. Erfahren Sie den schnellsten Weg, iPhone-Fotos in JPEG zu konvertieren.',
        },
        content: {
            en: `<p>HEIC is Apple's default photo format. Here's how to convert HEIC to JPEG on Windows without installing software.</p>
<ol><li>Go to Zipply – our converter works directly in your browser.</li><li>Upload your HEIC file.</li><li>Choose JPEG as the output format.</li><li>Click "Convert" and download the JPEG.</li></ol>
<p>Zipply processes your file locally – it never leaves your device.</p>`,
            ru: `<p>HEIC – формат фотографий Apple по умолчанию. Вот как конвертировать HEIC в JPEG на Windows без установки программ.</p>
<ol><li>Откройте Zipply – конвертер работает прямо в браузере.</li><li>Загрузите HEIC-файл.</li><li>Выберите JPEG в качестве выходного формата.</li><li>Нажмите «Конвертировать» и скачайте JPEG.</li></ol>
<p>Zipply обрабатывает файл локально – он никогда не покидает ваше устройство.</p>`,
            es: `<p>Convierte HEIC a JPEG sin instalar nada usando Zipply en tu navegador.</p>`,
            pt: `<p>Converta HEIC para JPEG sem instalar nada usando o Zipply no seu navegador.</p>`,
            fr: `<p>Convertissez HEIC en JPEG sans rien installer en utilisant Zipply dans votre navigateur.</p>`,
            de: `<p>Konvertieren Sie HEIC in JPEG, ohne etwas zu installieren, mit Zipply in Ihrem Browser.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'website-slow-because-of-images': {
        title: {
            en: 'Is Your Website Slow? Optimize Images to Speed It Up',
            ru: 'Почему ваш сайт тормозит? Оптимизация изображений для ускорения',
            es: '¿Tu sitio web es lento? Optimiza las imágenes para acelerarlo',
            pt: 'Seu site está lento? Otimize as imagens para acelerá-lo',
            fr: 'Votre site est lent ? Optimisez les images pour l\'accélérer',
            de: 'Ist Ihre Website langsam? Optimieren Sie Bilder zur Beschleunigung',
        },
        description: {
            en: 'Unoptimized images are the #1 cause of slow websites. Learn how to fix it with proper compression and resizing.',
            ru: 'Неоптимизированные изображения — причина №1 медленных сайтов. Узнайте, как это исправить.',
            es: 'Las imágenes no optimizadas son la causa #1 de sitios lentos. Aprenda a solucionarlo.',
            pt: 'Imagens não otimizadas são a causa nº 1 de sites lentos. Aprenda a corrigir isso.',
            fr: 'Les images non optimisées sont la cause n°1 des sites lents. Apprenez à y remédier.',
            de: 'Nicht optimierte Bilder sind die Hauptursache für langsame Websites. Erfahren Sie, wie Sie das beheben können.',
        },
        content: {
            en: `<p>Images typically account for 50-70% of a webpage's total size. Here's how to fix the most common image-related performance issues.</p>
<h2>1. Compress Images</h2><p>Use Zipply's <a href="/en/compress/jpeg">JPEG compressor</a> or <a href="/en/compress/png">PNG compressor</a> to reduce file size without visible quality loss.</p>
<h2>2. Serve Scaled Images</h2><p>Don't load a 2000px image when it's displayed at 300px. Use Zipply's <a href="/en/resize">resize tool</a> to create properly sized versions.</p>
<h2>3. Use Modern Formats</h2><p>WebP and AVIF offer 25-50% better compression than JPEG. <a href="/en/convert/jpg-to-webp">Convert to WebP</a> for free.</p>
<h2>4. Implement Lazy Loading</h2><p>Add <code>loading="lazy"</code> to images below the fold.</p>`,
            ru: `<p>Изображения обычно составляют 50-70% общего размера веб-страницы. Вот как исправить самые частые проблемы с производительностью.</p>
<h2>1. Сжимайте изображения</h2><p>Используйте <a href="/ru/compress/jpeg">JPEG-компрессор</a> или <a href="/ru/compress/png">PNG-компрессор</a> Zipply.</p>
<h2>2. Отдавайте масштабированные изображения</h2><p>Не загружайте картинку 2000px, если она отображается как 300px. Используйте <a href="/ru/resize">инструмент изменения размера</a>.</p>
<h2>3. Используйте современные форматы</h2><p>WebP и AVIF сжимают на 25-50% лучше JPEG. <a href="/ru/convert/jpg-to-webp">Конвертируйте в WebP</a> бесплатно.</p>
<h2>4. Внедрите ленивую загрузку</h2><p>Добавьте <code>loading="lazy"</code> к изображениям вне экрана.</p>`,
            es: `<p>Las imágenes representan el 50-70% del tamaño de una página. Comprímelas, redimensiónalas y usa formatos modernos con Zipply.</p>`,
            pt: `<p>As imagens representam 50-70% do tamanho de uma página. Comprima, redimensione e use formatos modernos com o Zipply.</p>`,
            fr: `<p>Les images représentent 50 à 70 % de la taille d'une page. Compressez, redimensionnez et utilisez des formats modernes avec Zipply.</p>`,
            de: `<p>Bilder machen 50-70% der Seitengröße aus. Komprimieren, skalieren und moderne Formate mit Zipply nutzen.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'online-video-to-gif-converters': {
        title: {
            en: 'Best Online Video to GIF Converters Compared',
            ru: 'Сравнение онлайн-конвертеров видео в GIF',
            es: 'Comparativa de los mejores conversores online de video a GIF',
            pt: 'Comparação dos melhores conversores online de vídeo para GIF',
            fr: 'Comparatif des meilleurs convertisseurs vidéo en GIF en ligne',
            de: 'Vergleich der besten Online-Video-zu-GIF-Konverter',
        },
        description: {
            en: 'Compare the top online tools for converting MP4 to GIF. Find the fastest, highest-quality, and most private option.',
            ru: 'Сравнение лучших онлайн-инструментов для конвертации MP4 в GIF. Найдите самый быстрый, качественный и приватный вариант.',
            es: 'Compare las mejores herramientas online para convertir MP4 a GIF.',
            pt: 'Compare as melhores ferramentas online para converter MP4 para GIF.',
            fr: 'Comparez les meilleurs outils en ligne pour convertir MP4 en GIF.',
            de: 'Vergleichen Sie die besten Online-Tools zum Konvertieren von MP4 in GIF.',
        },
        content: {
            en: `<p>Here are the best online video to GIF converters:</p>
<h2>1. Zipply</h2><p>Free, unlimited, private. Converts directly in your browser – no uploads. Supports frame rate and size control. <a href="/en/convert/mp4-to-gif">Try Zipply's MP4 to GIF converter</a>.</p>
<h2>2. EZGIF</h2><p>Popular and feature-rich, but has ads and file size limits.</p>
<h2>3. GIPHY</h2><p>Great for creating GIFs to share, but not ideal for high-quality output.</p>
<h2>Why Zipply Wins</h2><p>Privacy-first, no watermarks, no limits, fast local processing.</p>`,
            ru: `<p>Вот лучшие онлайн-конвертеры видео в GIF:</p>
<h2>1. Zipply</h2><p>Бесплатно, без ограничений, приватно. Конвертирует прямо в браузере – без загрузок. Управление частотой кадров и размером. <a href="/ru/convert/mp4-to-gif">Попробуйте конвертер MP4 в GIF от Zipply</a>.</p>
<h2>2. EZGIF</h2><p>Популярный и функциональный, но с рекламой и ограничениями по размеру.</p>
<h2>3. GIPHY</h2><p>Отлично для создания GIF для обмена, но не для качественного результата.</p>
<h2>Почему Zipply лучше</h2><p>Приватность, без водяных знаков, без лимитов, быстрая локальная обработка.</p>`,
            es: `<h2>1. Zipply</h2><p>Gratuito, privado, sin límites. <a href="/es/convert/mp4-to-gif">Prueba el conversor de MP4 a GIF</a>.</p>`,
            pt: `<h2>1. Zipply</h2><p>Grátis, privado, sem limites. <a href="/pt/convert/mp4-to-gif">Experimente o conversor de MP4 para GIF</a>.</p>`,
            fr: `<h2>1. Zipply</h2><p>Gratuit, privé, sans limites. <a href="/fr/convert/mp4-to-gif">Essayez le convertisseur MP4 en GIF</a>.</p>`,
            de: `<h2>1. Zipply</h2><p>Kostenlos, privat, unbegrenzt. <a href="/de/convert/mp4-to-gif">Testen Sie den MP4-zu-GIF-Konverter</a>.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
    'compress-pdf-without-quality-loss': {
        title: {
            en: 'How to Compress PDF Without Losing Text Quality',
            ru: 'Как сжать PDF без потери читаемости текста',
            es: 'Cómo comprimir un PDF sin perder la calidad del texto',
            pt: 'Como comprimir PDF sem perder a qualidade do texto',
            fr: 'Comment compresser un PDF sans perte de qualité du texte',
            de: 'PDF komprimieren ohne Verlust der Textqualität',
        },
        description: {
            en: 'Need a smaller PDF but text must stay sharp? Step-by-step guide to PDF compression with maximum readability.',
            ru: 'Нужен PDF меньшего размера, но текст должен остаться чётким? Пошаговое руководство по сжатию PDF с максимальной читаемостью.',
            es: 'Guía para comprimir PDF manteniendo el texto nítido.',
            pt: 'Guia para comprimir PDF mantendo o texto nítido.',
            fr: 'Guide pour compresser un PDF en gardant le texte net.',
            de: 'Anleitung zum Komprimieren von PDFs bei gleichbleibender Textschärfe.',
        },
        content: {
            en: `<p>PDFs with images can be huge, but you want the text to stay readable. Here's how.</p>
<ol><li>Use Zipply's PDF compression tool – it reduces file size while keeping text crisp.</li><li>Choose "ebook" quality for a great balance between size and readability.</li><li>If the PDF is still too large, use "screen" quality for maximum compression.</li></ol>
<p>Zipply processes your PDF locally – your document never leaves your device.</p>`,
            ru: `<p>PDF с изображениями могут быть огромными, но текст должен оставаться читаемым. Вот как это сделать.</p>
<ol><li>Используйте инструмент сжатия PDF от Zipply – уменьшает размер, сохраняя текст чётким.</li><li>Выберите качество "ebook" для оптимального баланса.</li><li>Если PDF всё ещё слишком большой, используйте качество "screen" для максимального сжатия.</li></ol>
<p>Zipply обрабатывает PDF локально – ваш документ не покидает устройство.</p>`,
            es: `<p>Comprime tu PDF con Zipply: elige calidad "ebook" y procesa localmente.</p>`,
            pt: `<p>Comprima seu PDF com o Zipply: escolha qualidade "ebook" e processe localmente.</p>`,
            fr: `<p>Compressez votre PDF avec Zipply : choisissez la qualité "ebook" et traitez localement.</p>`,
            de: `<p>Komprimieren Sie Ihr PDF mit Zipply: Wählen Sie "E-Book"-Qualität und verarbeiten Sie es lokal.</p>`,
        },
        faq: { en: [], ru: [], es: [], pt: [], fr: [], de: [] },
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const article = articles[slug];
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const title = article?.title[langKey] || article?.title.en || 'Blog';
    const description = article?.description[langKey] || article?.description.en || '';

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${lang}/blog/${slug}`,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/blog/${slug}`])),
        },
        openGraph: { title, description, type: 'article', locale: lang },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const article = articles[slug];

    if (!article) {
        return <div className="p-10 text-center text-red-500">Article not found</div>;
    }

    const title = article.title[langKey] || article.title.en;
    const content = article.content[langKey] || article.content.en;
    const faqs = article.faq[langKey] || article.faq.en || [];

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: 'Blog', url: `/${lang}/blog` },
        { name: title, url: `/${lang}/blog/${slug}` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {faqs.length > 0 && <FAQSchema faqs={faqs} />}
            <Breadcrumbs items={breadcrumbs} />

            <article className="prose lg:prose-lg max-w-none">
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>

            {faqs.length > 0 && (
                <section className="mt-12 border-t pt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {langKey === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
                    </h2>
                    {faqs.map((faq, i) => (
                        <details key={i} className="mb-3 border rounded-lg p-4">
                            <summary className="cursor-pointer font-medium">{faq.question}</summary>
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        </details>
                    ))}
                </section>
            )}
        </div>
    );
}