// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MobileMenu from '@/components/MobileMenu';

const LANGUAGES = [
    { code: 'en', name: 'EN', label: 'English' },
    { code: 'es', name: 'ES', label: 'Español' },
    { code: 'pt', name: 'PT', label: 'Português' },
    { code: 'fr', name: 'FR', label: 'Français' },
    { code: 'de', name: 'DE', label: 'Deutsch' },
    { code: 'ru', name: 'RU', label: 'Русский' },
] as const;

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
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href={`/${lang}`} className="flex items-center gap-2">
                        <svg width="140" height="42" viewBox="0 0 200 60" className="h-10 w-auto">
                            <path d="M15 45L25 15M30 45L40 15" stroke="#007BFF" strokeWidth="6" strokeLinecap="round"/>
                            <text x="50" y="42" fill="#007BFF" fontFamily="Arial, sans-serif" fontWeight="bold" fontStyle="italic" fontSize="36" letterSpacing="-1">Zipply</text>
                        </svg>
                    </Link>

                    {/* Десктопная навигация */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href={`/${lang}/blog`} className="text-sm font-medium text-gray-600 hover:text-[#007BFF] transition-colors">
                            {lang === 'ru' ? 'Блог' : 'Blog'}
                        </Link>
                        <LanguageSwitcher currentLang={lang} />
                    </div>

                    {/* Мобильное меню (бургер) */}
                    <MobileMenu lang={lang} />
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-gray-100 bg-white py-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Zipply — {lang === 'ru' ? 'Бесплатное сжатие изображений онлайн' : 'Free Online Image Compression'}
                    </p>
                </div>
            </footer>
        </div>
    );
}