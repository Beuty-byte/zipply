// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

const LANGUAGES = [
    { code: 'en', name: 'EN' },
    { code: 'es', name: 'ES' },
    { code: 'pt', name: 'PT' },
    { code: 'fr', name: 'FR' },
    { code: 'de', name: 'DE' },
    { code: 'ru', name: 'RU' },
];

const BASE_URL = 'https://zipply.io';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const alternates: Record<string, string> = {};
    LANGUAGES.forEach(l => { alternates[l.code] = `${BASE_URL}/${l.code}`; });

    return {
        metadataBase: new URL(BASE_URL),
        alternates: { canonical: `${BASE_URL}/${lang}`, languages: alternates },
        openGraph: { locale: lang, type: 'website', siteName: 'Zipply' },
        twitter: { card: 'summary_large_image' },
    };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href={`/${lang}`} className="flex items-center gap-2">
                        <svg width="140" height="42" viewBox="0 0 200 60" className="h-10 w-auto">
                            <path d="M15 45L25 15M30 45L40 15" stroke="#007BFF" strokeWidth="6" strokeLinecap="round"/>
                            <text x="50" y="42" fill="#007BFF" fontFamily="Arial, sans-serif" fontWeight="bold" fontStyle="italic" fontSize="36" letterSpacing="-1">Zipply</text>
                        </svg>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href={`/${lang}/blog`} className="text-sm text-gray-600 hover:text-[#007BFF] transition-colors">
                            {lang === 'ru' ? 'Блог' : 'Blog'}
                        </Link>
                        <div className="flex gap-1">
                            {LANGUAGES.map(({ code, name }) => (
                                <Link key={code} href={`/${code}`}
                                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${code === lang ? 'bg-[#007BFF] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                                    {name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-white border-t border-gray-100 mt-12">
                <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
                    © 2026 Zipply — {lang === 'ru' ? 'Бесплатное сжатие изображений онлайн' : 'Free Online Image Compression'}
                </div>
            </footer>
        </div>
    );
}