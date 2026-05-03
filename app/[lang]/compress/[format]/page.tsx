// app/[lang]/compress/[format]/page.tsx
import type { Metadata } from 'next';
import ToolTemplate from '@/components/ToolTemplate';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ru';

const LANGUAGES: Lang[] = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://zipply.io';

// ── SEO-тексты ──
const seoTexts: Record<string, Record<Lang, { howTitle: string; howSteps: string[]; benefitsTitle: string; benefits: string[] }>> = {
    jpeg: {
        en: {
            howTitle: 'How to Compress JPEG Images Online',
            howSteps: [
                'Upload your JPEG image — drag & drop or click to browse. Zipply accepts files up to 50MB.',
                'Adjust the quality slider — 80% is ideal for websites, 60% works well for email attachments.',
                'Click "Compress Now" — your file is processed instantly in your browser using WebAssembly.',
                'Download the compressed JPEG — use the comparison slider to see the difference before & after.',
            ],
            benefitsTitle: 'Why Compress JPEG Images?',
            benefits: [
                'Faster website loading — smaller images improve Core Web Vitals and user experience.',
                'Better SEO rankings — Google rewards fast-loading pages with higher positions.',
                'Save storage space — reduce file size by up to 80% without visible quality loss.',
                'Email-friendly — compressed JPEGs are small enough for any email provider.',
                'Bandwidth savings — reduce hosting costs and data usage for your visitors.',
            ],
        },
        ru: {
            howTitle: 'Как сжать JPEG изображения онлайн',
            howSteps: [
                'Загрузите JPEG изображение — перетащите мышкой или выберите файл. Zipply принимает файлы до 50 МБ.',
                'Настройте качество ползунком — 80% идеально для сайтов и соцсетей, 60% для отправки по email.',
                'Нажмите «Сжать» — обработка происходит мгновенно в вашем браузере через WebAssembly.',
                'Скачайте сжатый JPEG — используйте ползунок сравнения, чтобы увидеть разницу до и после.',
            ],
            benefitsTitle: 'Зачем сжимать JPEG изображения?',
            benefits: [
                'Ускорение загрузки сайта — маленькие изображения улучшают Core Web Vitals и пользовательский опыт.',
                'Рост позиций в поиске — Google и Яндекс повышают быстрые сайты в выдаче.',
                'Экономия места на диске — уменьшение размера до 80% без видимой потери качества.',
                'Подходит для почты — сжатые JPEG легко отправить через любой email-сервис.',
                'Экономия трафика — снижение нагрузки на хостинг и расхода данных у посетителей.',
            ],
        },
        es: {
            howTitle: 'Cómo comprimir imágenes JPEG en línea',
            howSteps: [
                'Sube tu imagen JPEG — arrastra y suelta o haz clic para seleccionar. Zipply acepta archivos de hasta 50 MB.',
                'Ajusta el control deslizante de calidad — 80% es ideal para sitios web, 60% para correo electrónico.',
                'Haz clic en «Comprimir» — tu archivo se procesa al instante en tu navegador mediante WebAssembly.',
                'Descarga el JPEG comprimido — usa el control deslizante de comparación para ver el antes y el después.',
            ],
            benefitsTitle: '¿Por qué comprimir imágenes JPEG?',
            benefits: [
                'Carga más rápida del sitio web — las imágenes más pequeñas mejoran la experiencia del usuario.',
                'Mejor posicionamiento SEO — Google premia las páginas que cargan rápido.',
                'Ahorra espacio de almacenamiento — reduce el tamaño hasta un 80% sin pérdida visible de calidad.',
                'Ideal para correo electrónico — los JPEG comprimidos son lo suficientemente pequeños para cualquier proveedor.',
                'Ahorro de ancho de banda — reduce los costos de alojamiento y el consumo de datos de los visitantes.',
            ],
        },
        pt: {
            howTitle: 'Como comprimir imagens JPEG online',
            howSteps: [
                'Envie sua imagem JPEG — arraste e solte ou clique para selecionar. O Zipply aceita arquivos de até 50 MB.',
                'Ajuste o controle deslizante de qualidade — 80% é ideal para sites, 60% para anexos de e-mail.',
                'Clique em «Comprimir» — seu arquivo é processado instantaneamente no navegador via WebAssembly.',
                'Baixe o JPEG comprimido — use o controle deslizante de comparação para ver o antes e depois.',
            ],
            benefitsTitle: 'Por que comprimir imagens JPEG?',
            benefits: [
                'Carregamento mais rápido do site — imagens menores melhoram a experiência do usuário.',
                'Melhor classificação no SEO — o Google recompensa páginas que carregam rapidamente.',
                'Economize espaço de armazenamento — reduza o tamanho em até 80% sem perda visível de qualidade.',
                'Ideal para e-mail — JPEGs comprimidos são pequenos o suficiente para qualquer provedor.',
                'Economia de largura de banda — reduza custos de hospedagem e consumo de dados dos visitantes.',
            ],
        },
        fr: {
            howTitle: 'Comment compresser des images JPEG en ligne',
            howSteps: [
                'Téléchargez votre image JPEG — glissez-déposez ou cliquez pour sélectionner. Zipply accepte les fichiers jusqu\'à 50 Mo.',
                'Réglez le curseur de qualité — 80% est idéal pour le web, 60% pour les pièces jointes.',
                'Cliquez sur « Compresser » — votre fichier est traité instantanément dans votre navigateur via WebAssembly.',
                'Téléchargez le JPEG compressé — utilisez le curseur de comparaison pour voir l\'avant et l\'après.',
            ],
            benefitsTitle: 'Pourquoi compresser des images JPEG ?',
            benefits: [
                'Chargement plus rapide du site — les images plus petites améliorent l\'expérience utilisateur.',
                'Meilleur référencement SEO — Google récompense les pages qui se chargent rapidement.',
                'Économisez de l\'espace de stockage — réduisez la taille jusqu\'à 80% sans perte de qualité visible.',
                'Idéal pour les e-mails — les JPEG compressés sont suffisamment petits pour tous les fournisseurs.',
                'Économie de bande passante — réduisez les coûts d\'hébergement et la consommation de données.',
            ],
        },
        de: {
            howTitle: 'Wie man JPEG-Bilder online komprimiert',
            howSteps: [
                'Laden Sie Ihr JPEG-Bild hoch — per Drag & Drop oder Klick zum Auswählen. Zipply akzeptiert Dateien bis zu 50 MB.',
                'Passen Sie den Qualitätsregler an — 80% ist ideal für Websites, 60% für E-Mail-Anhänge.',
                'Klicken Sie auf «Komprimieren» — Ihre Datei wird sofort in Ihrem Browser per WebAssembly verarbeitet.',
                'Laden Sie das komprimierte JPEG herunter — nutzen Sie den Vergleichsregler, um Vorher und Nachher zu sehen.',
            ],
            benefitsTitle: 'Warum JPEG-Bilder komprimieren?',
            benefits: [
                'Schnellere Website — kleinere Bilder verbessern die Benutzererfahrung.',
                'Besseres SEO-Ranking — Google belohnt schnell ladende Seiten.',
                'Speicherplatz sparen — reduzieren Sie die Größe um bis zu 80% ohne sichtbaren Qualitätsverlust.',
                'Ideal für E-Mails — komprimierte JPEGs sind klein genug für jeden Anbieter.',
                'Bandbreite sparen — reduzieren Sie Hosting-Kosten und Datenverbrauch Ihrer Besucher.',
            ],
        },
    },
    png: {
        en: {
            howTitle: 'How to Compress PNG Images Online',
            howSteps: [
                'Upload your PNG image — drag & drop or click to browse. Zipply supports files up to 50MB.',
                'Choose compression mode — "Fast" for lossless optimization, "Deep" for maximum size reduction.',
                'Click "Compress Now" — your PNG is optimized instantly in your browser using oxipng via WebAssembly.',
                'Download the compressed PNG — compare quality with the interactive slider.',
            ],
            benefitsTitle: 'Why Compress PNG Images?',
            benefits: [
                'Lossless compression available — reduce file size without losing a single pixel of quality.',
                'Faster website performance — optimized PNGs load quicker, improving Lighthouse scores.',
                'Better SEO — page speed is a confirmed ranking factor for Google.',
                'Preserve transparency — PNG compression keeps alpha channel intact for logos and graphics.',
                'Reduce bandwidth usage — smaller files mean lower hosting costs and faster user experience.',
            ],
        },
        ru: {
            howTitle: 'Как сжать PNG изображения онлайн',
            howSteps: [
                'Загрузите PNG изображение — перетащите мышкой или выберите файл. Zipply принимает файлы до 50 МБ.',
                'Выберите режим сжатия — «Быстрый» для оптимизации без потерь, «Глубокий» для максимального сжатия.',
                'Нажмите «Сжать» — PNG оптимизируется мгновенно в браузере через oxipng и WebAssembly.',
                'Скачайте сжатый PNG — сравните качество с помощью интерактивного ползунка.',
            ],
            benefitsTitle: 'Зачем сжимать PNG изображения?',
            benefits: [
                'Сжатие без потерь — уменьшайте размер, не теряя ни пикселя качества.',
                'Ускорение работы сайта — оптимизированные PNG загружаются быстрее, улучшая показатели Lighthouse.',
                'Рост позиций в поиске — скорость страницы подтверждённый фактор ранжирования Google.',
                'Сохранение прозрачности — PNG-сжатие сохраняет альфа-канал для логотипов и графики.',
                'Экономия трафика — меньший размер файлов снижает затраты на хостинг.',
            ],
        },
        es: {
            howTitle: 'Cómo comprimir imágenes PNG en línea',
            howSteps: [
                'Sube tu imagen PNG — arrastra y suelta o haz clic para seleccionar. Zipply admite archivos de hasta 50 MB.',
                'Elige el modo de compresión — "Rápido" para optimización sin pérdida, "Profundo" para máxima reducción.',
                'Haz clic en «Comprimir» — tu PNG se optimiza al instante en tu navegador.',
                'Descarga el PNG comprimido — compara la calidad con el control deslizante interactivo.',
            ],
            benefitsTitle: '¿Por qué comprimir imágenes PNG?',
            benefits: [
                'Compresión sin pérdida disponible — reduce el tamaño sin perder calidad.',
                'Rendimiento web más rápido — los PNG optimizados mejoran la puntuación de Lighthouse.',
                'Mejor SEO — la velocidad de la página es un factor de posicionamiento confirmado.',
                'Conserva la transparencia — la compresión PNG mantiene el canal alfa para logotipos.',
                'Menor uso de ancho de banda — archivos más pequeños reducen los costos de alojamiento.',
            ],
        },
        pt: {
            howTitle: 'Como comprimir imagens PNG online',
            howSteps: [
                'Envie sua imagem PNG — arraste e solte ou clique para selecionar. O Zipply aceita arquivos de até 50 MB.',
                'Escolha o modo de compressão — "Rápido" para otimização sem perdas, "Profundo" para máxima redução.',
                'Clique em «Comprimir» — seu PNG é otimizado instantaneamente no navegador.',
                'Baixe o PNG comprimido — compare a qualidade com o controle deslizante interativo.',
            ],
            benefitsTitle: 'Por que comprimir imagens PNG?',
            benefits: [
                'Compressão sem perdas disponível — reduza o tamanho sem perder qualidade.',
                'Desempenho mais rápido do site — PNGs otimizados melhoram a pontuação do Lighthouse.',
                'Melhor SEO — a velocidade da página é um fator de classificação confirmado.',
                'Preserva a transparência — a compressão PNG mantém o canal alfa para logotipos.',
                'Reduza o uso de largura de banda — arquivos menores reduzem os custos de hospedagem.',
            ],
        },
        fr: {
            howTitle: 'Comment compresser des images PNG en ligne',
            howSteps: [
                'Téléchargez votre image PNG — glissez-déposez ou cliquez pour sélectionner. Zipply accepte les fichiers jusqu\'à 50 Mo.',
                'Choisissez le mode de compression — "Rapide" pour une optimisation sans perte, "Profond" pour une réduction maximale.',
                'Cliquez sur « Compresser » — votre PNG est optimisé instantanément dans votre navigateur.',
                'Téléchargez le PNG compressé — comparez la qualité avec le curseur interactif.',
            ],
            benefitsTitle: 'Pourquoi compresser des images PNG ?',
            benefits: [
                'Compression sans perte disponible — réduisez la taille sans perdre en qualité.',
                'Performances web plus rapides — les PNG optimisés améliorent le score Lighthouse.',
                'Meilleur SEO — la vitesse de la page est un facteur de classement confirmé.',
                'Préserve la transparence — la compression PNG conserve le canal alpha pour les logos.',
                'Réduisez l\'utilisation de la bande passante — fichiers plus petits, coûts d\'hébergement réduits.',
            ],
        },
        de: {
            howTitle: 'Wie man PNG-Bilder online komprimiert',
            howSteps: [
                'Laden Sie Ihr PNG-Bild hoch — per Drag & Drop oder Klick zum Auswählen. Zipply akzeptiert Dateien bis zu 50 MB.',
                'Wählen Sie den Komprimierungsmodus — "Schnell" für verlustfreie Optimierung, "Tief" für maximale Reduzierung.',
                'Klicken Sie auf «Komprimieren» — Ihr PNG wird sofort in Ihrem Browser optimiert.',
                'Laden Sie das komprimierte PNG herunter — vergleichen Sie die Qualität mit dem interaktiven Schieberegler.',
            ],
            benefitsTitle: 'Warum PNG-Bilder komprimieren?',
            benefits: [
                'Verlustfreie Komprimierung verfügbar — reduzieren Sie die Größe ohne Qualitätsverlust.',
                'Schnellere Website-Performance — optimierte PNGs verbessern den Lighthouse-Score.',
                'Besseres SEO — die Seitengeschwindigkeit ist ein bestätigter Ranking-Faktor.',
                'Transparenz bleibt erhalten — PNG-Komprimierung behält den Alphakanal für Logos bei.',
                'Bandbreite reduzieren — kleinere Dateien senken die Hosting-Kosten.',
            ],
        },
    },
    webp: {
        en: {
            howTitle: 'How to Compress WebP Images Online',
            howSteps: [
                'Upload your WebP image — drag & drop or click to browse. Zipply accepts files up to 50MB.',
                'Adjust the quality slider — 80% is recommended for an optimal balance of size and quality.',
                'Click "Compress Now" — your WebP is optimized instantly in your browser using the libwebp codec via WebAssembly.',
                'Download the compressed WebP — use the slider to compare original and compressed versions.',
            ],
            benefitsTitle: 'Why Compress WebP Images?',
            benefits: [
                'Even smaller than JPEG and PNG — WebP offers 25-35% better compression than legacy formats.',
                'Supports both lossy and lossless modes — flexibility for any type of image content.',
                'Alpha channel support — WebP preserves transparency with smaller file sizes than PNG.',
                'Improve Core Web Vitals — smaller images directly boost your Lighthouse performance score.',
                'Modern browser support — WebP is supported by 97%+ of browsers worldwide.',
            ],
        },
        ru: {
            howTitle: 'Как сжать WebP изображения онлайн',
            howSteps: [
                'Загрузите WebP изображение — перетащите мышкой или выберите файл. Zipply принимает файлы до 50 МБ.',
                'Настройте качество ползунком — 80% рекомендуется для оптимального баланса размера и качества.',
                'Нажмите «Сжать» — ваш WebP оптимизируется мгновенно в браузере через кодек libwebp и WebAssembly.',
                'Скачайте сжатый WebP — используйте ползунок для сравнения оригинала со сжатой версией.',
            ],
            benefitsTitle: 'Зачем сжимать WebP изображения?',
            benefits: [
                'Ещё меньше чем JPEG и PNG — WebP обеспечивает на 25-35% лучшее сжатие, чем старые форматы.',
                'Поддержка сжатия с потерями и без — гибкость для любого типа изображений.',
                'Поддержка альфа-канала — WebP сохраняет прозрачность с меньшим размером файла, чем PNG.',
                'Улучшение Core Web Vitals — маленькие изображения напрямую повышают оценку производительности.',
                'Поддержка современными браузерами — WebP работает в 97%+ браузеров по всему миру.',
            ],
        },
        es: {
            howTitle: 'Cómo comprimir imágenes WebP en línea',
            howSteps: [
                'Sube tu imagen WebP — arrastra y suelta o haz clic para seleccionar.',
                'Ajusta el control de calidad — se recomienda 80% para un equilibrio óptimo.',
                'Haz clic en «Comprimir» — tu WebP se optimiza al instante en tu navegador.',
                'Descarga el WebP comprimido — compara las versiones original y comprimida.',
            ],
            benefitsTitle: '¿Por qué comprimir imágenes WebP?',
            benefits: [
                'Más pequeño que JPEG y PNG — WebP ofrece una compresión 25-35% mejor.',
                'Soporte para modos con y sin pérdida — flexibilidad para cualquier contenido.',
                'Soporte de canal alfa — transparencia con archivos más pequeños que PNG.',
                'Mejora Core Web Vitals — imágenes más pequeñas aumentan tu puntuación de rendimiento.',
                'Soporte de navegadores modernos — WebP está soportado por el 97%+ de los navegadores.',
            ],
        },
        pt: {
            howTitle: 'Como comprimir imagens WebP online',
            howSteps: [
                'Envie sua imagem WebP — arraste e solte ou clique para selecionar.',
                'Ajuste o controle de qualidade — 80% é recomendado para um equilíbrio ideal.',
                'Clique em «Comprimir» — seu WebP é otimizado instantaneamente no navegador.',
                'Baixe o WebP comprimido — compare as versões original e comprimida.',
            ],
            benefitsTitle: 'Por que comprimir imagens WebP?',
            benefits: [
                'Menor que JPEG e PNG — WebP oferece compressão 25-35% melhor.',
                'Suporte a modos com e sem perdas — flexibilidade para qualquer conteúdo.',
                'Suporte a canal alfa — transparência com arquivos menores que PNG.',
                'Melhore as Core Web Vitals — imagens menores aumentam sua pontuação de desempenho.',
                'Suporte de navegadores modernos — WebP é suportado por 97%+ dos navegadores.',
            ],
        },
        fr: {
            howTitle: 'Comment compresser des images WebP en ligne',
            howSteps: [
                'Téléchargez votre image WebP — glissez-déposez ou cliquez pour sélectionner.',
                'Réglez le curseur de qualité — 80% est recommandé pour un équilibre optimal.',
                'Cliquez sur « Compresser » — votre WebP est optimisé instantanément dans votre navigateur.',
                'Téléchargez le WebP compressé — comparez les versions originale et compressée.',
            ],
            benefitsTitle: 'Pourquoi compresser des images WebP ?',
            benefits: [
                'Plus petit que JPEG et PNG — WebP offre une compression 25-35% meilleure.',
                'Modes avec et sans perte — flexibilité pour tout type de contenu.',
                'Support du canal alpha — transparence avec des fichiers plus petits que PNG.',
                'Améliorez Core Web Vitals — des images plus petites augmentent votre score de performance.',
                'Support des navigateurs modernes — WebP est supporté par 97%+ des navigateurs.',
            ],
        },
        de: {
            howTitle: 'Wie man WebP-Bilder online komprimiert',
            howSteps: [
                'Laden Sie Ihr WebP-Bild hoch — per Drag & Drop oder Klick zum Auswählen.',
                'Passen Sie den Qualitätsregler an — 80% wird für eine optimale Balance empfohlen.',
                'Klicken Sie auf «Komprimieren» — Ihr WebP wird sofort in Ihrem Browser optimiert.',
                'Laden Sie das komprimierte WebP herunter — vergleichen Sie Original und komprimierte Version.',
            ],
            benefitsTitle: 'Warum WebP-Bilder komprimieren?',
            benefits: [
                'Kleiner als JPEG und PNG — WebP bietet 25-35% bessere Kompression.',
                'Unterstützt verlustbehaftete und verlustfreie Modi — Flexibilität für alle Inhalte.',
                'Alpha-Kanal-Unterstützung — Transparenz mit kleineren Dateien als PNG.',
                'Verbessern Sie Core Web Vitals — kleinere Bilder steigern Ihren Performance-Score.',
                'Moderne Browser-Unterstützung — WebP wird von 97%+ der Browser weltweit unterstützt.',
            ],
        },
    },
    gif: {
        en: {
            howTitle: 'How to Compress GIF Images Online',
            howSteps: [
                'Upload your GIF — drag & drop or click to browse. Zipply supports files up to 50MB.',
                'Choose the number of colors — fewer colors mean smaller file size. 128 is a great balance.',
                'Click "Compress Now" — your GIF is optimized instantly. Animation and transparency are preserved.',
                'Download the compressed GIF — use the slider to compare the original and optimized versions.',
            ],
            benefitsTitle: 'Why Compress GIF Images?',
            benefits: [
                'Reduce file size by up to 70% — fewer colors without ruining the animation.',
                'Faster page loads — smaller GIFs improve website speed and user experience.',
                'Preserves animation — all frames and timing remain intact after compression.',
                'Ideal for social media and messaging — small enough to share anywhere.',
                'Supports transparency — optimized GIFs keep their transparent backgrounds.',
            ],
        },
        ru: {
            howTitle: 'Как сжать GIF изображения онлайн',
            howSteps: [
                'Загрузите GIF — перетащите мышкой или выберите файл. Zipply принимает файлы до 50 МБ.',
                'Выберите количество цветов — меньше цветов значит меньше размер. 128 — хороший баланс.',
                'Нажмите «Сжать» — ваш GIF оптимизируется мгновенно. Анимация и прозрачность сохраняются.',
                'Скачайте сжатый GIF — используйте ползунок, чтобы сравнить оригинал и оптимизированную версию.',
            ],
            benefitsTitle: 'Зачем сжимать GIF изображения?',
            benefits: [
                'Уменьшение размера до 70% — сокращаем количество цветов без потери анимации.',
                'Быстрая загрузка сайта — маленькие GIF улучшают скорость и пользовательский опыт.',
                'Сохраняет анимацию — все кадры и задержки остаются без изменений.',
                'Идеально для соцсетей и мессенджеров — маленький размер для обмена.',
                'Поддержка прозрачности — оптимизированные GIF сохраняют прозрачный фон.',
            ],
        },
        es: {
            howTitle: 'Cómo comprimir imágenes GIF en línea',
            howSteps: [
                'Sube tu GIF — arrastra y suelta o haz clic para seleccionar.',
                'Elige el número de colores — menos colores reducen el tamaño. 128 es un buen equilibrio.',
                'Haz clic en «Comprimir» — tu GIF se optimiza al instante. Se conservan la animación y la transparencia.',
                'Descarga el GIF comprimido — compara las versiones original y optimizada.',
            ],
            benefitsTitle: '¿Por qué comprimir imágenes GIF?',
            benefits: [
                'Reduce el tamaño hasta un 70% — menos colores sin estropear la animación.',
                'Carga más rápida de la página — los GIF más pequeños mejoran la velocidad.',
                'Conserva la animación — todos los fotogramas y tiempos permanecen intactos.',
                'Ideal para redes sociales y mensajería — tamaño pequeño para compartir.',
                'Soporta transparencia — los GIF optimizados mantienen fondos transparentes.',
            ],
        },
        pt: {
            howTitle: 'Como comprimir imagens GIF online',
            howSteps: [
                'Envie seu GIF — arraste e solte ou clique para selecionar.',
                'Escolha o número de cores — menos cores reduzem o tamanho. 128 é um ótimo equilíbrio.',
                'Clique em «Comprimir» — seu GIF é otimizado instantaneamente. Animação e transparência são preservadas.',
                'Baixe o GIF comprimido — compare as versões original e otimizada.',
            ],
            benefitsTitle: 'Por que comprimir imagens GIF?',
            benefits: [
                'Reduza o tamanho em até 70% — menos cores sem prejudicar a animação.',
                'Carregamento mais rápido — GIFs menores melhoram a velocidade do site.',
                'Preserva a animação — todos os quadros e tempos permanecem intactos.',
                'Ideal para redes sociais e mensagens — tamanho pequeno para compartilhamento.',
                'Suporta transparência — GIFs otimizados mantêm fundos transparentes.',
            ],
        },
        fr: {
            howTitle: 'Comment compresser des images GIF en ligne',
            howSteps: [
                'Téléchargez votre GIF — glissez-déposez ou cliquez pour sélectionner.',
                'Choisissez le nombre de couleurs — moins de couleurs réduisent la taille. 128 est un bon équilibre.',
                'Cliquez sur « Compresser » — votre GIF est optimisé instantanément. L\'animation et la transparence sont conservées.',
                'Téléchargez le GIF compressé — comparez les versions originale et optimisée.',
            ],
            benefitsTitle: 'Pourquoi compresser des images GIF ?',
            benefits: [
                'Réduisez la taille jusqu\'à 70% — moins de couleurs sans abîmer l\'animation.',
                'Chargement plus rapide — des GIF plus petits améliorent la vitesse du site.',
                'Conserve l\'animation — toutes les images et les temps restent intacts.',
                'Idéal pour les réseaux sociaux et la messagerie — taille réduite pour le partage.',
                'Supporte la transparence — les GIF optimisés conservent leur fond transparent.',
            ],
        },
        de: {
            howTitle: 'Wie man GIF-Bilder online komprimiert',
            howSteps: [
                'Laden Sie Ihr GIF hoch — per Drag & Drop oder Klick zum Auswählen.',
                'Wählen Sie die Anzahl der Farben — weniger Farben bedeuten kleinere Dateien. 128 ist eine gute Balance.',
                'Klicken Sie auf «Komprimieren» — Ihr GIF wird sofort optimiert. Animation und Transparenz bleiben erhalten.',
                'Laden Sie das komprimierte GIF herunter — vergleichen Sie Original und optimierte Version.',
            ],
            benefitsTitle: 'Warum GIF-Bilder komprimieren?',
            benefits: [
                'Größe um bis zu 70% reduzieren — weniger Farben ohne die Animation zu beeinträchtigen.',
                'Schnellere Seitenladezeiten — kleinere GIFs verbessern die Geschwindigkeit.',
                'Bewahrt die Animation — alle Frames und Zeitabläufe bleiben intakt.',
                'Ideal für soziale Medien und Messenger — klein genug zum Teilen.',
                'Unterstützt Transparenz — optimierte GIFs behalten ihren transparenten Hintergrund.',
            ],
        },
    },
    svg: {
        en: {
            howTitle: 'How to Compress SVG Images Online',
            howSteps: [
                'Upload your SVG file — drag & drop or click to browse. Zipply accepts files up to 50MB.',
                'Choose compression level — "Safe" removes only comments and whitespace, "Medium" also removes editor metadata, "Aggressive" simplifies coordinates.',
                'Click "Compress Now" — your SVG code is optimized instantly in your browser.',
                'Download the compressed SVG — the visual appearance remains identical.',
            ],
            benefitsTitle: 'Why Compress SVG Images?',
            benefits: [
                'Reduce file size by up to 70% without visual changes — perfect for web icons and logos.',
                'Faster website loading — smaller SVGs improve page speed and Core Web Vitals.',
                'Cleaner code — removes unnecessary metadata, comments, and hidden data.',
                'Better SEO — search engines can crawl and index lightweight SVG content.',
                'Works perfectly with responsive design — compressed SVGs scale without quality loss.',
            ],
        },
        ru: {
            howTitle: 'Как сжать SVG изображения онлайн',
            howSteps: [
                'Загрузите SVG — перетащите или выберите файл. Zipply принимает файлы до 50 МБ.',
                'Выберите уровень сжатия — «Безопасный» удаляет комментарии и пробелы, «Средний» — метаданные редакторов, «Агрессивный» упрощает координаты.',
                'Нажмите «Сжать» — SVG-код оптимизируется мгновенно прямо в браузере.',
                'Скачайте сжатый SVG — внешний вид изображения не изменится.',
            ],
            benefitsTitle: 'Зачем сжимать SVG изображения?',
            benefits: [
                'Уменьшение размера до 70% без визуальных изменений — идеально для иконок и логотипов.',
                'Быстрая загрузка сайта — маленькие SVG улучшают скорость и Core Web Vitals.',
                'Чистый код — удаляются ненужные метаданные, комментарии и скрытые данные.',
                'Улучшение SEO — поисковые системы лучше индексируют лёгкий SVG-контент.',
                'Отлично подходит для адаптивного дизайна — сжатые SVG масштабируются без потери качества.',
            ],
        },
        es: {
            howTitle: 'Cómo comprimir imágenes SVG en línea',
            howSteps: [
                'Sube tu SVG — arrastra y suelta o haz clic. Zipply acepta hasta 50 MB.',
                'Elige el nivel de compresión — Seguro, Medio o Agresivo.',
                'Haz clic en «Comprimir» — tu código SVG se optimiza al instante.',
                'Descarga el SVG comprimido — el aspecto visual es idéntico.',
            ],
            benefitsTitle: '¿Por qué comprimir imágenes SVG?',
            benefits: [
                'Reduce el tamaño hasta un 70% sin cambios visuales.',
                'Carga más rápida del sitio web.',
                'Código más limpio y mantenible.',
                'Mejor indexación en buscadores.',
                'Perfecto para diseño responsive.',
            ],
        },
        pt: {
            howTitle: 'Como comprimir imagens SVG online',
            howSteps: [
                'Envie seu SVG — arraste e solte ou clique. O Zipply aceita até 50 MB.',
                'Escolha o nível de compressão — Seguro, Médio ou Agressivo.',
                'Clique em «Comprimir» — seu código SVG é otimizado instantaneamente.',
                'Baixe o SVG comprimido — a aparência visual permanece a mesma.',
            ],
            benefitsTitle: 'Por que comprimir imagens SVG?',
            benefits: [
                'Reduza o tamanho em até 70% sem alterações visuais.',
                'Carregamento mais rápido do site.',
                'Código mais limpo.',
                'Melhor SEO.',
                'Ideal para design responsivo.',
            ],
        },
        fr: {
            howTitle: 'Comment compresser des images SVG en ligne',
            howSteps: [
                'Téléchargez votre SVG — glissez-déposez ou cliquez. Zipply accepte jusqu\'à 50 Mo.',
                'Choisissez le niveau de compression — Sécurisé, Moyen ou Agressif.',
                'Cliquez sur « Compresser » — votre code SVG est optimisé instantanément.',
                'Téléchargez le SVG compressé — l\'apparence visuelle est identique.',
            ],
            benefitsTitle: 'Pourquoi compresser des images SVG ?',
            benefits: [
                'Réduisez la taille jusqu\'à 70% sans changement visuel.',
                'Chargement plus rapide du site.',
                'Code plus propre.',
                'Meilleur référencement.',
                'Parfait pour le responsive design.',
            ],
        },
        de: {
            howTitle: 'Wie man SVG-Bilder online komprimiert',
            howSteps: [
                'Laden Sie Ihr SVG hoch — per Drag & Drop oder Klick. Zipply akzeptiert bis zu 50 MB.',
                'Wählen Sie die Komprimierungsstufe — Sicher, Mittel oder Aggressiv.',
                'Klicken Sie auf «Komprimieren» — Ihr SVG-Code wird sofort optimiert.',
                'Laden Sie das komprimierte SVG herunter — das Aussehen bleibt gleich.',
            ],
            benefitsTitle: 'Warum SVG-Bilder komprimieren?',
            benefits: [
                'Größe um bis zu 70% reduzieren ohne sichtbare Änderungen.',
                'Schnellere Website.',
                'Sauberer Code.',
                'Bessere SEO.',
                'Perfekt für Responsive Design.',
            ],
        },
    },
    avif: {
        en: {
            howTitle: 'How to Compress AVIF Images Online',
            howSteps: [
                'Upload your AVIF image — drag & drop or click to browse. Zipply accepts files up to 50MB.',
                'Adjust the quality slider — 50% offers excellent compression with minimal quality loss.',
                'Click "Compress Now" — your AVIF is optimized instantly in your browser using advanced encoding.',
                'Download the compressed AVIF — the next-gen format with superior efficiency.',
            ],
            benefitsTitle: 'Why Compress AVIF Images?',
            benefits: [
                'Next-generation compression — AVIF is up to 50% smaller than JPEG at the same quality.',
                'Superior image quality — supports HDR, wide color gamut, and both lossy & lossless modes.',
                'Smaller than WebP — ideal for modern websites aiming for top performance scores.',
                'Royalty-free and open standard — no licensing fees, wide industry support.',
                'Perfect for Core Web Vitals — drastically reduces image payload without visible degradation.',
            ],
        },
        ru: {
            howTitle: 'Как сжать AVIF изображения онлайн',
            howSteps: [
                'Загрузите AVIF — перетащите или выберите файл. Zipply принимает до 50 МБ.',
                'Настройте качество ползунком — 50% даёт отличное сжатие при минимальной потере качества.',
                'Нажмите «Сжать» — AVIF оптимизируется мгновенно в браузере с помощью продвинутого кодирования.',
                'Скачайте сжатый AVIF — формат нового поколения с превосходной эффективностью.',
            ],
            benefitsTitle: 'Зачем сжимать AVIF изображения?',
            benefits: [
                'Сжатие нового поколения — AVIF до 50% меньше JPEG при том же качестве.',
                'Превосходное качество — поддержка HDR, широкого цветового охвата, сжатия с потерями и без.',
                'Меньше чем WebP — идеально для современных сайтов, нацеленных на максимальную производительность.',
                'Свободный и открытый стандарт — без лицензионных отчислений, поддерживается индустрией.',
                'Идеально для Core Web Vitals — радикально снижает размер изображений без видимой деградации.',
            ],
        },
        es: {
            howTitle: 'Cómo comprimir imágenes AVIF en línea',
            howSteps: [
                'Sube tu AVIF — arrastra y suelta o haz clic. Hasta 50 MB.',
                'Ajusta la calidad — 50% ofrece una excelente compresión.',
                'Haz clic en «Comprimir» — tu AVIF se optimiza al instante.',
                'Descarga el AVIF comprimido — formato de nueva generación.',
            ],
            benefitsTitle: '¿Por qué comprimir imágenes AVIF?',
            benefits: [
                'Hasta 50% más pequeño que JPEG.',
                'Calidad superior con soporte HDR.',
                'Más pequeño que WebP.',
                'Formato abierto y sin regalías.',
                'Perfecto para Core Web Vitals.',
            ],
        },
        pt: {
            howTitle: 'Como comprimir imagens AVIF online',
            howSteps: [
                'Envie seu AVIF — arraste e solte ou clique. Até 50 MB.',
                'Ajuste a qualidade — 50% oferece ótima compressão.',
                'Clique em «Comprimir» — seu AVIF é otimizado instantaneamente.',
                'Baixe o AVIF comprimido — formato de nova geração.',
            ],
            benefitsTitle: 'Por que comprimir imagens AVIF?',
            benefits: [
                'Até 50% menor que JPEG.',
                'Qualidade superior com HDR.',
                'Menor que WebP.',
                'Formato aberto e gratuito.',
                'Ideal para Core Web Vitals.',
            ],
        },
        fr: {
            howTitle: 'Comment compresser des images AVIF en ligne',
            howSteps: [
                'Téléchargez votre AVIF — glissez-déposez ou cliquez. Jusqu\'à 50 Mo.',
                'Réglez la qualité — 50% offre une excellente compression.',
                'Cliquez sur « Compresser » — votre AVIF est optimisé instantanément.',
                'Téléchargez l\'AVIF compressé — format nouvelle génération.',
            ],
            benefitsTitle: 'Pourquoi compresser des images AVIF ?',
            benefits: [
                'Jusqu\'à 50% plus petit que JPEG.',
                'Qualité supérieure avec HDR.',
                'Plus petit que WebP.',
                'Format ouvert et libre de droits.',
                'Parfait pour Core Web Vitals.',
            ],
        },
        de: {
            howTitle: 'Wie man AVIF-Bilder online komprimiert',
            howSteps: [
                'Laden Sie Ihr AVIF hoch — per Drag & Drop oder Klick. Bis zu 50 MB.',
                'Passen Sie die Qualität an — 50% bietet eine hervorragende Kompression.',
                'Klicken Sie auf «Komprimieren» — Ihr AVIF wird sofort optimiert.',
                'Laden Sie das komprimierte AVIF herunter — Format der nächsten Generation.',
            ],
            benefitsTitle: 'Warum AVIF-Bilder komprimieren?',
            benefits: [
                'Bis zu 50% kleiner als JPEG.',
                'Überlegene Qualität mit HDR.',
                'Kleiner als WebP.',
                'Offenes und lizenzfreies Format.',
                'Perfekt für Core Web Vitals.',
            ],
        },
    },
};

// ── Related tools ──
const relatedTools = [
    { href: 'compress/jpeg', label: { en: 'Compress JPEG', ru: 'Сжать JPEG', es: 'Comprimir JPEG', pt: 'Comprimir JPEG', fr: 'Compresser JPEG', de: 'JPEG komprimieren' } },
    { href: 'compress/png', label: { en: 'Compress PNG', ru: 'Сжать PNG', es: 'Comprimir PNG', pt: 'Comprimir PNG', fr: 'Compresser PNG', de: 'PNG komprimieren' } },
    { href: 'compress/webp', label: { en: 'Compress WebP', ru: 'Сжать WebP', es: 'Comprimir WebP', pt: 'Comprimir WebP', fr: 'Compresser WebP', de: 'WebP komprimieren' } },
    { href: 'resize', label: { en: 'Resize Image', ru: 'Изменить размер', es: 'Redimensionar', pt: 'Redimensionar', fr: 'Redimensionner', de: 'Bild skalieren' } },
];

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
            en: 'Compress JPEG Images Online — Free JPEG Compressor | Zipply',
            ru: 'Сжать JPEG онлайн — Бесплатный JPEG компрессор | Zipply',
            es: 'Comprimir imágenes JPEG en línea — Zipply',
            pt: 'Comprimir imagens JPEG online — Zipply',
            fr: 'Compresser des images JPEG en ligne — Zipply',
            de: 'JPEG-Bilder online komprimieren — Zipply',
        },
        description: {
            en: 'Compress JPEG images online for free. Reduce file size by up to 80% without losing quality. Processed locally in your browser — private & secure.',
            ru: 'Сжимайте JPEG онлайн бесплатно. Уменьшайте размер до 80% без потери качества. Обработка локально в браузере — приватно и безопасно.',
            es: 'Comprima imágenes JPEG en línea gratis. Reduzca el tamaño hasta un 80% sin perder calidad.',
            pt: 'Comprima imagens JPEG online gratuitamente. Reduza o tamanho até 80% sem perder qualidade.',
            fr: 'Compressez des images JPEG en ligne gratuitement. Réduisez la taille jusqu\'à 80% sans perte de qualité.',
            de: 'Komprimieren Sie JPEG-Bilder kostenlos online. Reduzieren Sie die Größe um bis zu 80% ohne Qualitätsverlust.',
        },
        apiEndpoint: '/api/v1/compress/jpeg',
        defaultParams: { quality: 80 },
        outputFormat: 'jpg',
        faq: {
            en: [
                { question: 'How does JPEG compression work?', answer: 'JPEG compression works by removing redundant image data while preserving visual quality. Zipply uses the MozJPEG encoder via WebAssembly — your file never leaves your browser.' },
                { question: 'Is it free to compress JPEG images?', answer: 'Yes, completely free. No registration required. No limits.' },
                { question: 'What quality should I choose for JPEG compression?', answer: '80-85% is ideal for websites and social media. 60-70% works well for email attachments.' },
                { question: 'Does JPEG compression reduce image quality?', answer: 'At 80% quality, the difference is barely visible. Use the comparison slider to see before & after.' },
            ],
            ru: [
                { question: 'Как работает сжатие JPEG?', answer: 'Сжатие JPEG удаляет избыточные данные, сохраняя визуальное качество. Zipply использует кодек MozJPEG через WebAssembly — файл не покидает браузер.' },
                { question: 'Это бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
                { question: 'Какое качество выбрать?', answer: '80-85% идеально для сайтов. 60-70% подходит для email.' },
                { question: 'Сжатие JPEG ухудшает качество?', answer: 'При качестве 80% разница почти незаметна. Используйте ползунок сравнения.' },
            ],
        },
    },
    png: {
        title: {
            en: 'Compress PNG Images Online — Free PNG Compressor | Zipply',
            ru: 'Сжать PNG онлайн — Бесплатный PNG компрессор | Zipply',
            es: 'Comprimir imágenes PNG en línea — Zipply',
            pt: 'Comprimir imagens PNG online — Zipply',
            fr: 'Compresser des images PNG en ligne — Zipply',
            de: 'PNG-Bilder online komprimieren — Zipply',
        },
        description: {
            en: 'Compress PNG images online for free. Lossless and lossy compression. Reduce file size by up to 80%. Processed locally — private & secure.',
            ru: 'Сжимайте PNG онлайн бесплатно. Сжатие без потерь и с потерями. Уменьшайте размер до 80%. Обработка локально — приватно и безопасно.',
            es: 'Comprima imágenes PNG en línea gratis. Compresión sin pérdida y con pérdida. Reduzca el tamaño hasta un 80%.',
            pt: 'Comprima imagens PNG online gratuitamente. Compressão sem perdas e com perdas. Reduza o tamanho até 80%.',
            fr: 'Compressez des images PNG en ligne gratuitement. Compression sans perte et avec perte. Réduisez la taille jusqu\'à 80%.',
            de: 'Komprimieren Sie PNG-Bilder kostenlos online. Verlustfreie und verlustbehaftete Kompression. Reduzieren Sie die Größe um bis zu 80%.',
        },
        apiEndpoint: '/api/v1/compress/png',
        defaultParams: { mode: 'fast' },
        outputFormat: 'png',
        faq: {
            en: [
                { question: 'Does PNG compression lose quality?', answer: 'In "Fast" mode, no — it is fully lossless. "Deep" mode uses advanced quantization for maximum compression with minimal quality loss.' },
                { question: 'Is PNG compression free?', answer: 'Yes, completely free. No registration, no limits.' },
                { question: 'Which compression mode should I choose?', answer: '"Fast" for lossless optimization (logos, graphics). "Deep" for maximum size reduction (photos saved as PNG).' },
                { question: 'Does PNG compression preserve transparency?', answer: 'Yes, Zipply fully preserves the alpha channel. Your transparent logos and graphics stay transparent.' },
            ],
            ru: [
                { question: 'Сжатие PNG ухудшает качество?', answer: 'В «Быстром» режиме — нет, это сжатие без потерь. «Глубокий» режим использует продвинутую квантизацию для максимального сжатия.' },
                { question: 'Сжатие PNG бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
                { question: 'Какой режим сжатия выбрать?', answer: '«Быстрый» для сжатия без потерь (логотипы, графика). «Глубокий» для максимального уменьшения размера.' },
                { question: 'Сохраняется ли прозрачность PNG?', answer: 'Да, Zipply полностью сохраняет альфа-канал. Прозрачные логотипы и графика остаются прозрачными.' },
            ],
        },
    },
    webp: {
        title: {
            en: 'Compress WebP Images Online — Free WebP Compressor | Zipply',
            ru: 'Сжать WebP онлайн — Бесплатный WebP компрессор | Zipply',
            es: 'Comprimir imágenes WebP en línea — Zipply',
            pt: 'Comprimir imagens WebP online — Zipply',
            fr: 'Compresser des images WebP en ligne — Zipply',
            de: 'WebP-Bilder online komprimieren — Zipply',
        },
        description: {
            en: 'Compress WebP images online for free. Reduce file size while keeping transparency. Processed locally in your browser — private, fast, secure.',
            ru: 'Сжимайте WebP онлайн бесплатно. Уменьшайте размер, сохраняя прозрачность. Обработка локально в браузере — приватно, быстро, безопасно.',
            es: 'Comprima imágenes WebP en línea gratis. Reduzca el tamaño manteniendo la transparencia. Procesado localmente — privado, rápido, seguro.',
            pt: 'Comprima imagens WebP online gratuitamente. Reduza o tamanho mantendo a transparência. Processado localmente — privado, rápido, seguro.',
            fr: 'Compressez des images WebP en ligne gratuitement. Réduisez la taille tout en conservant la transparence. Traité localement — privé, rapide, sécurisé.',
            de: 'Komprimieren Sie WebP-Bilder kostenlos online. Reduzieren Sie die Größe unter Beibehaltung der Transparenz. Lokal verarbeitet — privat, schnell, sicher.',
        },
        apiEndpoint: '/api/v1/compress/webp',
        defaultParams: { quality: 80 },
        outputFormat: 'webp',
        faq: {
            en: [
                { question: 'What makes WebP better than JPEG and PNG?', answer: 'WebP offers 25-35% better compression than JPEG and PNG while supporting both lossy and lossless modes, plus transparency.' },
                { question: 'Is WebP compression free?', answer: 'Yes, completely free. No registration, no limits on file size or quantity.' },
                { question: 'Which browsers support WebP?', answer: 'WebP is supported by Chrome, Firefox, Safari, Edge, and Opera — covering 97%+ of users worldwide.' },
                { question: 'Does WebP compression preserve transparency?', answer: 'Yes, Zipply fully preserves the alpha channel in WebP images.' },
            ],
            ru: [
                { question: 'Чем WebP лучше JPEG и PNG?', answer: 'WebP обеспечивает на 25-35% лучшее сжатие, поддерживает режимы с потерями и без, а также прозрачность.' },
                { question: 'Сжатие WebP бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
                { question: 'Какие браузеры поддерживают WebP?', answer: 'WebP поддерживают Chrome, Firefox, Safari, Edge и Opera — более 97% пользователей по всему миру.' },
                { question: 'Сохраняется ли прозрачность WebP?', answer: 'Да, Zipply полностью сохраняет альфа-канал в WebP изображениях.' },
            ],
        },
    },
    gif: {
        title: {
            en: 'Compress GIF Images Online — Free GIF Compressor | Zipply',
            ru: 'Сжать GIF онлайн — Бесплатный GIF компрессор | Zipply',
            es: 'Comprimir imágenes GIF en línea — Zipply',
            pt: 'Comprimir imagens GIF online — Zipply',
            fr: 'Compresser des images GIF en ligne — Zipply',
            de: 'GIF-Bilder online komprimieren — Zipply',
        },
        description: {
            en: 'Compress animated GIFs online for free. Reduce file size while preserving animation and transparency. Processed locally — private & secure.',
            ru: 'Сжимайте анимированные GIF онлайн бесплатно. Уменьшайте размер, сохраняя анимацию и прозрачность. Обработка локально — приватно и безопасно.',
            es: 'Comprima GIFs animados en línea gratis. Reduzca el tamaño conservando la animación y la transparencia. Procesado localmente — privado y seguro.',
            pt: 'Comprima GIFs animados online gratuitamente. Reduza o tamanho preservando a animação e a transparência. Processado localmente — privado e seguro.',
            fr: 'Compressez des GIF animés en ligne gratuitement. Réduisez la taille tout en préservant l\'animation et la transparence. Traité localement — privé et sécurisé.',
            de: 'Komprimieren Sie animierte GIFs kostenlos online. Reduzieren Sie die Größe unter Beibehaltung von Animation und Transparenz. Lokal verarbeitet — privat und sicher.',
        },
        apiEndpoint: '/api/v1/compress/gif',
        defaultParams: { colors: 128 },
        outputFormat: 'gif',
        faq: {
            en: [
                { question: 'How does GIF compression work?', answer: 'GIF compression reduces the number of colors in the palette. Fewer colors = smaller file size. Zipply preserves all animation frames and transparency.' },
                { question: 'Is GIF compression free?', answer: 'Yes, completely free. No registration, no limits on file size or number of compressions.' },
                { question: 'How many colors should I choose?', answer: '128 colors gives a great balance. 64 for aggressive compression. 256 for the best quality.' },
                { question: 'Will my GIF still be animated after compression?', answer: 'Yes! All frames, timing, and loop settings are fully preserved.' },
            ],
            ru: [
                { question: 'Как работает сжатие GIF?', answer: 'Сжатие GIF уменьшает количество цветов в палитре. Меньше цветов — меньше размер. Zipply сохраняет все кадры анимации и прозрачность.' },
                { question: 'Сжатие GIF бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
                { question: 'Сколько цветов выбрать?', answer: '128 цветов — хороший баланс. 64 для агрессивного сжатия. 256 для наилучшего качества.' },
                { question: 'Останется ли GIF анимированным после сжатия?', answer: 'Да! Все кадры, задержки и настройки циклов полностью сохраняются.' },
            ],
        },
    },
    svg: {
        title: {
            en: 'Compress SVG Images Online — Free SVG Optimizer | Zipply',
            ru: 'Сжать SVG онлайн — Бесплатный SVG оптимизатор | Zipply',
            es: 'Comprimir imágenes SVG en línea — Zipply',
            pt: 'Comprimir imagens SVG online — Zipply',
            fr: 'Compresser des images SVG en ligne — Zipply',
            de: 'SVG-Bilder online komprimieren — Zipply',
        },
        description: {
            en: 'Optimize and compress SVG files online for free. Remove unnecessary code without changing the appearance. Processed locally — private & secure.',
            ru: 'Оптимизируйте и сжимайте SVG файлы онлайн бесплатно. Удалите лишний код без изменения внешнего вида. Обработка локально — приватно и безопасно.',
            es: 'Optimice y comprima archivos SVG en línea gratis. Elimine código innecesario sin cambiar la apariencia. Procesado localmente.',
            pt: 'Otimize e comprima arquivos SVG online gratuitamente. Remova código desnecessário sem alterar a aparência. Processado localmente.',
            fr: 'Optimisez et compressez des fichiers SVG en ligne gratuitement. Supprimez le code inutile sans changer l\'apparence. Traité localement.',
            de: 'Optimieren und komprimieren Sie SVG-Dateien online kostenlos. Entfernen Sie unnötigen Code, ohne das Aussehen zu verändern. Lokal verarbeitet.',
        },
        apiEndpoint: '/api/v1/compress/svg',
        defaultParams: { level: 'safe' },
        outputFormat: 'svg',
        faq: {
            en: [
                { question: 'What does SVG compression do?', answer: 'It removes comments, whitespace, editor metadata, and optionally simplifies coordinate precision — all without changing how the image looks.' },
                { question: 'Is SVG compression free?', answer: 'Yes, completely free. No registration, no limits.' },
                { question: 'Which compression level should I choose?', answer: '"Safe" works for all SVGs. "Medium" removes editor-specific data. "Aggressive" gives maximum reduction but may slightly alter rendering in extreme cases.' },
                { question: 'Will my SVG still work after compression?', answer: 'Yes, it remains a valid, standard SVG file. All shapes, colors, and gradients are preserved.' },
            ],
            ru: [
                { question: 'Что делает сжатие SVG?', answer: 'Удаляет комментарии, пробелы, метаданные редакторов и может упростить точность координат — всё это без изменения внешнего вида.' },
                { question: 'Сжатие SVG бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
                { question: 'Какой уровень сжатия выбрать?', answer: '«Безопасный» подходит для всех SVG. «Средний» удаляет данные редакторов. «Агрессивный» даёт максимальное сжатие.' },
                { question: 'Будет ли SVG работать после сжатия?', answer: 'Да, он останется корректным стандартным SVG-файлом. Все формы, цвета и градиенты сохраняются.' },
            ],
        },
    },
    avif: {
        title: {
            en: 'Compress AVIF Images Online — Free AVIF Compressor | Zipply',
            ru: 'Сжать AVIF онлайн — Бесплатный AVIF компрессор | Zipply',
            es: 'Comprimir imágenes AVIF en línea — Zipply',
            pt: 'Comprimir imagens AVIF online — Zipply',
            fr: 'Compresser des images AVIF en ligne — Zipply',
            de: 'AVIF-Bilder online komprimieren — Zipply',
        },
        description: {
            en: 'Compress AVIF images online for free. Next-gen format with superior compression. Processed locally — private & secure.',
            ru: 'Сжимайте AVIF изображения онлайн бесплатно. Формат нового поколения с превосходным сжатием. Обработка локально — приватно и безопасно.',
            es: 'Comprima imágenes AVIF en línea gratis. Formato de nueva generación con compresión superior. Procesado localmente.',
            pt: 'Comprima imagens AVIF online gratuitamente. Formato de nova geração com compressão superior. Processado localmente.',
            fr: 'Compressez des images AVIF en ligne gratuitement. Format nouvelle génération avec compression supérieure. Traité localement.',
            de: 'Komprimieren Sie AVIF-Bilder online kostenlos. Next-Gen-Format mit überlegener Kompression. Lokal verarbeitet.',
        },
        apiEndpoint: '/api/v1/avif/compress',
        defaultParams: { quality: 50 },
        outputFormat: 'avif',
        faq: {
            en: [
                { question: 'What is AVIF?', answer: 'AVIF is a modern image format based on the AV1 codec. It offers 50% better compression than JPEG with support for HDR, transparency, and both lossy/lossless modes.' },
                { question: 'Is AVIF compression free?', answer: 'Yes, completely free. No registration, no limits.' },
                { question: 'Which browsers support AVIF?', answer: 'Chrome, Firefox, and Opera fully support AVIF. Safari added support in version 16.4. Over 90% of users can view AVIF today.' },
                { question: 'Is AVIF better than WebP?', answer: 'AVIF generally provides 20-30% better compression than WebP at the same quality, making it the most efficient web image format available.' },
            ],
            ru: [
                { question: 'Что такое AVIF?', answer: 'AVIF — современный формат изображений на основе кодека AV1. Обеспечивает на 50% лучшее сжатие, чем JPEG, с поддержкой HDR, прозрачности и режимов lossy/lossless.' },
                { question: 'Сжатие AVIF бесплатно?', answer: 'Да, полностью бесплатно. Без регистрации и ограничений.' },
                { question: 'Какие браузеры поддерживают AVIF?', answer: 'Chrome, Firefox и Opera полностью поддерживают AVIF. Safari добавил поддержку в версии 16.4. Более 90% пользователей могут просматривать AVIF.' },
                { question: 'AVIF лучше чем WebP?', answer: 'AVIF обычно обеспечивает на 20-30% лучшее сжатие, чем WebP при том же качестве, что делает его самым эффективным форматом для веба.' },
            ],
        },
    },
};

const translations: Record<Lang, Record<string, string>> = {
    en: { drop: 'Drop your image here', orClick: 'or click to browse', quality: 'Quality', smallerFile: 'Smaller file', betterQuality: 'Better quality', compress: 'Compress Now', compressing: 'Compressing...', done: 'Compression Complete!', original: 'Original', compressed: 'Compressed', saved: 'Saved', download: 'Download', before: 'Before', after: 'After', relatedTitle: 'Related Tools' },
    ru: { drop: 'Перетащите изображение сюда', orClick: 'или нажмите для выбора', quality: 'Качество', smallerFile: 'Меньше размер', betterQuality: 'Лучше качество', compress: 'Сжать', compressing: 'Сжатие...', done: 'Готово!', original: 'Исходный', compressed: 'Сжатый', saved: 'Сэкономлено', download: 'Скачать', before: 'До', after: 'После', relatedTitle: 'Связанные инструменты' },
    es: { drop: 'Suelta tu imagen aquí', orClick: 'o haz clic', quality: 'Calidad', compress: 'Comprimir', compressing: 'Comprimiendo...', done: '¡Listo!', original: 'Original', compressed: 'Comprimido', saved: 'Ahorrado', download: 'Descargar', before: 'Antes', after: 'Después', relatedTitle: 'Herramientas relacionadas' },
    pt: { drop: 'Solte sua imagem aqui', orClick: 'ou clique', quality: 'Qualidade', compress: 'Comprimir', compressing: 'Comprimindo...', done: 'Pronto!', original: 'Original', compressed: 'Comprimido', saved: 'Economizado', download: 'Baixar', before: 'Antes', after: 'Depois', relatedTitle: 'Ferramentas relacionadas' },
    fr: { drop: 'Déposez votre image ici', orClick: 'ou cliquez', quality: 'Qualité', compress: 'Compresser', compressing: 'Compression...', done: 'Terminé !', original: 'Original', compressed: 'Compressé', saved: 'Économisé', download: 'Télécharger', before: 'Avant', after: 'Après', relatedTitle: 'Outils connexes' },
    de: { drop: 'Bild hier ablegen', orClick: 'oder klicken', quality: 'Qualität', compress: 'Komprimieren', compressing: 'Komprimierung...', done: 'Fertig!', original: 'Original', compressed: 'Komprimiert', saved: 'Gespart', download: 'Herunterladen', before: 'Vorher', after: 'Nachher', relatedTitle: 'Verwandte Tools' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; format: string }> }): Promise<Metadata> {
    const { lang, format } = await params;
    const config = configs[format];
    return {
        title: config?.title[lang as Lang] || config?.title.en || 'Zipply',
        description: config?.description[lang as Lang] || config?.description.en || '',
        alternates: { canonical: `${BASE_URL}/${lang}/compress/${format}`, languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/compress/${format}`])) },
    };
}

export default async function CompressPage({ params }: { params: Promise<{ lang: string; format: string }> }) {
    const { lang, format } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const config = configs[format];
    const t = translations[langKey];
    const seo = seoTexts[format]?.[langKey];

    if (!config) return <div className="p-10 text-center text-red-500">Tool not found</div>;

    const title = config.title[langKey] || config.title.en;
    const description = config.description[langKey] || config.description.en;
    const faqs = config.faq[langKey] || config.faq.en || [];

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: `Compress ${format.toUpperCase()}`, url: `/${lang}/compress/${format}` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <FAQSchema faqs={faqs} />
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
            <p className="text-gray-500 text-center mb-8">{description}</p>

            <ToolTemplate format={config.outputFormat} apiEndpoint={config.apiEndpoint} lang={lang} translations={t} />

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