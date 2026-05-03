// app/[lang]/resize/page.tsx
import type { Metadata } from 'next';
import ToolTemplate from '@/components/ToolTemplate';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ru';

const LANGUAGES: Lang[] = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const BASE_URL = 'https://zipply.io';

const seoTexts: Record<Lang, { howTitle: string; howSteps: string[]; benefitsTitle: string; benefits: string[] }> = {
    en: {
        howTitle: 'How to Resize Images Online',
        howSteps: [
            'Upload your image – drag & drop or click to browse. Supports JPEG, PNG, WebP, GIF up to 50MB.',
            'Enter new dimensions or choose a preset percentage (25%, 50%, 75%).',
            'Keep aspect ratio or stretch to exact size – you decide.',
            'Click "Resize Now" – processed instantly in your browser.',
            'Download the resized image – perfect for websites, social media, or email.',
        ],
        benefitsTitle: 'Why Resize Images?',
        benefits: [
            'Fit perfectly on any platform – resize for Instagram, Facebook, LinkedIn headers.',
            'Reduce file size even further – smaller dimensions mean smaller files.',
            'Optimize for websites – serve properly sized images to improve page speed.',
            'Prepare photos for printing – set exact DPI and dimensions.',
            'Batch processing – resize multiple images at once on Zipply.',
        ],
    },
    ru: {
        howTitle: 'Как изменить размер изображения онлайн',
        howSteps: [
            'Загрузите изображение – перетащите или выберите файл. Поддерживаются JPEG, PNG, WebP, GIF до 50 МБ.',
            'Укажите новые размеры или выберите готовый процент (25%, 50%, 75%).',
            'Сохраняйте пропорции или растяните до точных размеров – по вашему желанию.',
            'Нажмите «Изменить размер» – обработка происходит мгновенно в браузере.',
            'Скачайте изменённое изображение – идеально для сайтов, соцсетей или почты.',
        ],
        benefitsTitle: 'Зачем изменять размер изображений?',
        benefits: [
            'Идеальная подгонка под любые платформы – для Instagram, Facebook, LinkedIn.',
            'Дополнительное уменьшение размера файла – меньше пикселей, меньше вес.',
            'Оптимизация для веба – правильно подобранные размеры ускоряют загрузку сайта.',
            'Подготовка к печати – установите точные DPI и размеры.',
            'Пакетная обработка – изменяйте размер нескольких изображений сразу на Zipply.',
        ],
    },
    es: {
        howTitle: 'Cómo cambiar el tamaño de imágenes en línea',
        howSteps: [
            'Sube tu imagen – arrastra y suelta o haz clic. Formatos JPEG, PNG, WebP, GIF.',
            'Ingresa nuevas dimensiones o elige un porcentaje predefinido.',
            'Mantén la proporción o estira – tú decides.',
            'Haz clic en «Redimensionar» – procesado al instante en tu navegador.',
            'Descarga la imagen redimensionada.',
        ],
        benefitsTitle: '¿Por qué cambiar el tamaño de las imágenes?',
        benefits: [
            'Ajuste perfecto para cualquier plataforma.',
            'Archivos aún más pequeños.',
            'Optimización para la web.',
            'Preparación para impresión.',
            'Procesamiento por lotes.',
        ],
    },
    pt: {
        howTitle: 'Como redimensionar imagens online',
        howSteps: [
            'Envie sua imagem – arraste e solte ou clique. Formatos JPEG, PNG, WebP, GIF.',
            'Insira novas dimensões ou escolha uma porcentagem.',
            'Mantenha a proporção ou estique.',
            'Clique em «Redimensionar» – processado instantaneamente.',
            'Baixe a imagem redimensionada.',
        ],
        benefitsTitle: 'Por que redimensionar imagens?',
        benefits: [
            'Ajuste perfeito para qualquer plataforma.',
            'Arquivos ainda menores.',
            'Otimização para web.',
            'Preparação para impressão.',
            'Processamento em lote.',
        ],
    },
    fr: {
        howTitle: 'Comment redimensionner des images en ligne',
        howSteps: [
            'Téléchargez votre image – glissez-déposez ou cliquez. Formats JPEG, PNG, WebP, GIF.',
            'Entrez de nouvelles dimensions ou choisissez un pourcentage.',
            'Conservez les proportions ou étirez.',
            'Cliquez sur « Redimensionner » – traité instantanément.',
            'Téléchargez l\'image redimensionnée.',
        ],
        benefitsTitle: 'Pourquoi redimensionner des images ?',
        benefits: [
            'Ajustement parfait pour toutes les plateformes.',
            'Fichiers encore plus petits.',
            'Optimisation pour le web.',
            'Préparation pour l\'impression.',
            'Traitement par lots.',
        ],
    },
    de: {
        howTitle: 'Wie man Bilder online skaliert',
        howSteps: [
            'Laden Sie Ihr Bild hoch – per Drag & Drop oder Klick. Formate JPEG, PNG, WebP, GIF.',
            'Geben Sie neue Abmessungen ein oder wählen Sie einen Prozentsatz.',
            'Seitenverhältnis beibehalten oder strecken.',
            'Klicken Sie auf «Skalieren» – wird sofort im Browser verarbeitet.',
            'Laden Sie das skalierte Bild herunter.',
        ],
        benefitsTitle: 'Warum Bilder skalieren?',
        benefits: [
            'Perfekte Anpassung für jede Plattform.',
            'Noch kleinere Dateien.',
            'Optimierung für das Web.',
            'Vorbereitung für den Druck.',
            'Stapelverarbeitung.',
        ],
    },
};

const relatedTools = [
    { href: 'compress/jpeg', label: { en: 'Compress JPEG', ru: 'Сжать JPEG', es: 'Comprimir JPEG', pt: 'Comprimir JPEG', fr: 'Compresser JPEG', de: 'JPEG komprimieren' } },
    { href: 'compress/png', label: { en: 'Compress PNG', ru: 'Сжать PNG', es: 'Comprimir PNG', pt: 'Comprimir PNG', fr: 'Compresser PNG', de: 'PNG komprimieren' } },
    { href: 'compress/webp', label: { en: 'Compress WebP', ru: 'Сжать WebP', es: 'Comprimir WebP', pt: 'Comprimir WebP', fr: 'Compresser WebP', de: 'WebP komprimieren' } },
    { href: 'convert/png-to-jpg', label: { en: 'PNG to JPG', ru: 'PNG в JPG', es: 'PNG a JPG', pt: 'PNG para JPG', fr: 'PNG en JPG', de: 'PNG zu JPG' } },
];

const translations: Record<Lang, Record<string, string>> = {
    en: { drop: 'Drop your image here', orClick: 'or click to browse', quality: 'Quality', smallerFile: '', betterQuality: '', compress: 'Resize Now', compressing: 'Resizing...', done: 'Resize Complete!', original: 'Original', compressed: 'Result', saved: 'Size', download: 'Download', before: 'Before', after: 'After', relatedTitle: 'Related Tools' },
    ru: { drop: 'Перетащите изображение сюда', orClick: 'или нажмите для выбора', quality: 'Качество', smallerFile: '', betterQuality: '', compress: 'Изменить размер', compressing: 'Изменение...', done: 'Готово!', original: 'Исходный', compressed: 'Результат', saved: 'Размер', download: 'Скачать', before: 'До', after: 'После', relatedTitle: 'Связанные инструменты' },
    es: { drop: 'Suelta tu imagen aquí', orClick: 'o haz clic', quality: 'Calidad', compress: 'Redimensionar', compressing: 'Redimensionando...', done: '¡Listo!', original: 'Original', compressed: 'Resultado', saved: 'Tamaño', download: 'Descargar', before: 'Antes', after: 'Después', relatedTitle: 'Herramientas relacionadas' },
    pt: { drop: 'Solte sua imagem aqui', orClick: 'ou clique', quality: 'Qualidade', compress: 'Redimensionar', compressing: 'Redimensionando...', done: 'Pronto!', original: 'Original', compressed: 'Resultado', saved: 'Tamanho', download: 'Baixar', before: 'Antes', after: 'Depois', relatedTitle: 'Ferramentas relacionadas' },
    fr: { drop: 'Déposez votre image ici', orClick: 'ou cliquez', quality: 'Qualité', compress: 'Redimensionner', compressing: 'Redimensionnement...', done: 'Terminé !', original: 'Original', compressed: 'Résultat', saved: 'Taille', download: 'Télécharger', before: 'Avant', after: 'Après', relatedTitle: 'Outils connexes' },
    de: { drop: 'Bild hier ablegen', orClick: 'oder klicken', quality: 'Qualität', compress: 'Skalieren', compressing: 'Skalierung...', done: 'Fertig!', original: 'Original', compressed: 'Ergebnis', saved: 'Größe', download: 'Herunterladen', before: 'Vorher', after: 'Nachher', relatedTitle: 'Verwandte Tools' },
};

const faqs: Record<Lang, Array<{ question: string; answer: string }>> = {
    en: [
        {
            question: 'Can I resize multiple images at once?',
            answer: 'Yes, Zipply supports batch processing – just select multiple files when uploading.',
        },
        {
            question: 'Does resizing affect image quality?',
            answer: 'Downsizing an image generally maintains quality. Enlarging may cause some blur; we recommend starting with the largest available original.',
        },
        {
            question: 'What formats are supported for resizing?',
            answer: 'JPEG, PNG, WebP, and GIF. The resized output can be saved in any of these formats.',
        },
    ],
    ru: [
        {
            question: 'Можно ли изменить размер нескольких изображений сразу?',
            answer: 'Да, Zipply поддерживает пакетную обработку – просто выберите несколько файлов при загрузке.',
        },
        {
            question: 'Влияет ли изменение размера на качество?',
            answer: 'Уменьшение обычно сохраняет качество. Увеличение может вызвать размытие; рекомендуем начинать с наибольшего доступного оригинала.',
        },
        {
            question: 'Какие форматы поддерживаются?',
            answer: 'JPEG, PNG, WebP и GIF. Результат можно сохранить в любом из этих форматов.',
        },
    ],
    es: [
        {
            question: '¿Puedo redimensionar varias imágenes a la vez?',
            answer: 'Sí, Zipply soporta procesamiento por lotes: simplemente selecciona varios archivos al cargar.',
        },
        {
            question: '¿Cambiar el tamaño afecta la calidad de la imagen?',
            answer: 'Reducir el tamaño generalmente mantiene la calidad. Aumentarlo puede causar algo de borrosidad; recomendamos comenzar con el original más grande disponible.',
        },
        {
            question: '¿Qué formatos son compatibles para redimensionar?',
            answer: 'JPEG, PNG, WebP y GIF. La imagen redimensionada se puede guardar en cualquiera de estos formatos.',
        },
    ],
    pt: [
        {
            question: 'Posso redimensionar várias imagens de uma vez?',
            answer: 'Sim, o Zipply suporta processamento em lote: basta selecionar vários arquivos ao carregar.',
        },
        {
            question: 'Redimensionar afeta a qualidade da imagem?',
            answer: 'Reduzir o tamanho geralmente mantém a qualidade. Aumentar pode causar alguma desfocagem; recomendamos começar com o maior original disponível.',
        },
        {
            question: 'Quais formatos são suportados para redimensionamento?',
            answer: 'JPEG, PNG, WebP e GIF. A imagem redimensionada pode ser salva em qualquer um desses formatos.',
        },
    ],
    fr: [
        {
            question: 'Puis-je redimensionner plusieurs images à la fois ?',
            answer: 'Oui, Zipply prend en charge le traitement par lots – il suffit de sélectionner plusieurs fichiers lors du téléchargement.',
        },
        {
            question: 'Le redimensionnement affecte-t-il la qualité de l\'image ?',
            answer: 'Réduire la taille conserve généralement la qualité. L\'agrandir peut entraîner un léger flou ; nous vous recommandons de partir du plus grand original disponible.',
        },
        {
            question: 'Quels formats sont pris en charge pour le redimensionnement ?',
            answer: 'JPEG, PNG, WebP et GIF. L\'image redimensionnée peut être enregistrée dans n\'importe lequel de ces formats.',
        },
    ],
    de: [
        {
            question: 'Kann ich mehrere Bilder gleichzeitig skalieren?',
            answer: 'Ja, Zipply unterstützt Stapelverarbeitung – wählen Sie einfach mehrere Dateien beim Hochladen aus.',
        },
        {
            question: 'Beeinträchtigt die Größenänderung die Bildqualität?',
            answer: 'Das Verkleinern erhält in der Regel die Qualität. Das Vergrößern kann zu leichter Unschärfe führen; wir empfehlen, mit dem größtmöglichen Original zu beginnen.',
        },
        {
            question: 'Welche Formate werden für die Größenänderung unterstützt?',
            answer: 'JPEG, PNG, WebP und GIF. Die skalierte Ausgabe kann in jedem dieser Formate gespeichert werden.',
        },
    ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const title = {
        en: 'Resize Images Online – Free Image Resizer | Zipply',
        ru: 'Изменить размер изображения онлайн – Бесплатно | Zipply',
        es: 'Redimensionar imágenes en línea – Zipply',
        pt: 'Redimensionar imagens online – Zipply',
        fr: 'Redimensionner des images en ligne – Zipply',
        de: 'Bilder online skalieren – Zipply',
    }[langKey] || 'Resize Images Online – Zipply';

    const description = {
        en: 'Resize images online for free. Change dimensions, keep aspect ratio, or stretch. Supports JPEG, PNG, WebP, GIF. Processed locally – private & secure.',
        ru: 'Изменяйте размер изображений онлайн бесплатно. Меняйте размеры, сохраняйте пропорции или растягивайте. Поддержка JPEG, PNG, WebP, GIF. Обработка локально – приватно и безопасно.',
        es: 'Redimensione imágenes en línea gratis. Cambie dimensiones, mantenga proporción o estire. Formatos JPEG, PNG, WebP, GIF. Procesado localmente – privado y seguro.',
        pt: 'Redimensione imagens online grátis. Altere dimensões, mantenha proporção ou estique. Formatos JPEG, PNG, WebP, GIF. Processado localmente – privado e seguro.',
        fr: 'Redimensionnez des images en ligne gratuitement. Modifiez les dimensions, conservez les proportions ou étirez. Formats JPEG, PNG, WebP, GIF. Traité localement – privé et sécurisé.',
        de: 'Bilder online kostenlos skalieren. Abmessungen ändern, Seitenverhältnis beibehalten oder strecken. Formate JPEG, PNG, WebP, GIF. Lokal verarbeitet – privat und sicher.',
    }[langKey] || '';

    const url = `${BASE_URL}/${lang}/resize`;
    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(LANGUAGES.map(l => [l, `${BASE_URL}/${l}/resize`])),
        },
        openGraph: { title, description, url, type: 'website', locale: lang },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function ResizePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const langKey = (LANGUAGES.includes(lang as Lang) ? lang : 'en') as Lang;
    const t = translations[langKey];
    const seo = seoTexts[langKey];
    const faqList = faqs[langKey] || faqs.en;

    const title = {
        en: 'Resize Images Online – Free Image Resizer',
        ru: 'Изменить размер изображения онлайн – Бесплатно',
        es: 'Redimensionar imágenes en línea',
        pt: 'Redimensionar imagens online',
        fr: 'Redimensionner des images en ligne',
        de: 'Bilder online skalieren',
    }[langKey] || 'Resize Images Online';

    const description = {
        en: 'Resize images online for free. Change dimensions, keep aspect ratio, or stretch. JPEG, PNG, WebP, GIF supported.',
        ru: 'Изменяйте размер изображений онлайн бесплатно. Меняйте размеры, сохраняйте пропорции или растягивайте. Поддержка JPEG, PNG, WebP, GIF.',
        es: 'Redimensione imágenes en línea gratis.',
        pt: 'Redimensione imagens online grátis.',
        fr: 'Redimensionnez des images en ligne gratuitement.',
        de: 'Bilder online kostenlos skalieren.',
    }[langKey] || '';

    const breadcrumbs = [
        { name: 'Home', url: `/${lang}` },
        { name: 'Resize Image', url: `/${lang}/resize` },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <FAQSchema faqs={faqList} />
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
            <p className="text-gray-500 text-center mb-8">{description}</p>

            <ToolTemplate
                format="jpg"
                apiEndpoint="/api/v1/resize"
                lang={lang}
                translations={t}
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

            {faqList.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">
                        {langKey === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
                    </h2>
                    {faqList.map((faq, i) => (
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