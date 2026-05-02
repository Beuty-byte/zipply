// lib/i18n.ts

const translations: Record<string, Record<string, string>> = {
    en: {
        'dropzone.title': 'Drop your file here',
        'dropzone.subtitle': 'or click to browse',
        'quality.label': 'Quality',
        'mode.label': 'Compression mode',
        'mode.fast': 'Fast (lossless)',
        'mode.deep': 'Deep (maximum)',
        'button.compress': 'Compress Now',
        'button.processing': 'Processing...',
        'result.title': 'Compression Complete!',
        'result.original': 'Original',
        'result.compressed': 'Compressed',
        'result.saved': 'Saved',
        'button.download': 'Download',
    },
    ru: {
        'dropzone.title': 'Перетащите файл сюда',
        'dropzone.subtitle': 'или нажмите для выбора',
        'quality.label': 'Качество',
        'mode.label': 'Режим сжатия',
        'mode.fast': 'Быстрое (без потерь)',
        'mode.deep': 'Глубокое (максимальное)',
        'button.compress': 'Сжать',
        'button.processing': 'Обработка...',
        'result.title': 'Сжатие завершено!',
        'result.original': 'Исходный',
        'result.compressed': 'Сжатый',
        'result.saved': 'Сэкономлено',
        'button.download': 'Скачать',
    },
    es: {
        'dropzone.title': 'Suelta tu archivo aquí',
        'dropzone.subtitle': 'o haz clic para seleccionar',
        'quality.label': 'Calidad',
        'button.compress': 'Comprimir',
        'button.processing': 'Procesando...',
        'result.title': '¡Compresión completa!',
        'button.download': 'Descargar',
    },
    pt: {
        'dropzone.title': 'Solte seu arquivo aqui',
        'dropzone.subtitle': 'ou clique para selecionar',
        'quality.label': 'Qualidade',
        'button.compress': 'Comprimir',
        'button.processing': 'Processando...',
        'result.title': 'Compressão concluída!',
        'button.download': 'Baixar',
    },
    de: {
        'dropzone.title': 'Datei hier ablegen',
        'dropzone.subtitle': 'oder klicken zum Auswählen',
        'quality.label': 'Qualität',
        'button.compress': 'Komprimieren',
        'button.processing': 'Verarbeitung...',
        'result.title': 'Komprimierung abgeschlossen!',
        'button.download': 'Herunterladen',
    },
    fr: {
        'dropzone.title': 'Déposez votre fichier ici',
        'dropzone.subtitle': 'ou cliquez pour sélectionner',
        'quality.label': 'Qualité',
        'button.compress': 'Compresser',
        'button.processing': 'Traitement...',
        'result.title': 'Compression terminée !',
        'button.download': 'Télécharger',
    },
};

export async function loadTranslations(lang: string): Promise<Record<string, string>> {
    return translations[lang] || translations.en;
}