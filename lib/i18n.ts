export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'de', 'fr', 'es'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const dictionaries = {
    en: {
        title: "Zipply | Smart Online Image Compressor",
        description: "Compress JPG, PNG, SVG, and WebP images without losing quality. Fast, free, and secure online image optimization.",
        dropzone: "Drop images here or click to upload",
        stats: "Reduced by",
        downloadAll: "Download All",
        footer: "Free Online Image Compression",
    },
    ru: {
        title: "Zipply | Умное сжатие изображений онлайн",
        description: "Сжимайте изображения JPG, PNG, SVG и WebP без потери качества. Быстрый, бесплатный и безопасный оптимизатор картинок.",
        dropzone: "Перетащите изображения сюда или нажмите для загрузки",
        stats: "Сжато на",
        downloadAll: "Скачать всё",
        footer: "Бесплатное сжатие изображений онлайн",
    },
    de: {
        title: "Zipply | Intelligente Bildkomprimierung",
        description: "Komprimieren Sie JPG-, PNG-, SVG- und WebP-Bilder ohne Qualitätsverlust. Schnell und kostenlos.",
        dropzone: "Bilder hierher ziehen oder zum Hochladen klicken",
        stats: "Reduziert um",
        downloadAll: "Alle herunterladen",
        footer: "Kostenlose Online-Bildkomprimierung",
    },
    fr: {
        title: "Zipply | Compresseur d'images intelligent",
        description: "Compressez vos images JPG, PNG, SVG et WebP sans perte de qualité. Rapide и gratuit.",
        dropzone: "Déposez les images ici или cliquez pour télécharger",
        stats: "Réduit de",
        downloadAll: "Tout télécharger",
        footer: "Compression d'images en ligne gratuite",
    },
    es: {
        title: "Zipply | Compresor de imágenes inteligente",
        description: "Comprime imágenes JPG, PNG, SVG и WebP sin perder calidad. Rápido и gratuito.",
        dropzone: "Arrastra las imágenes aquí o haz clic para subirlas",
        stats: "Reducido por",
        downloadAll: "Descargar todo",
        footer: "Compresión de imágenes en línea gratuita",
    }
};
