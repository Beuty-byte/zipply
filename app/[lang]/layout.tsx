import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import { dictionaries, Locale } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = dictionaries[lang] || dictionaries.en;

    return {
        title: dict.title,
        description: dict.description,
        alternates: {
            languages: {
                'en': '/en',
                'ru': '/ru',
                'de': '/de',
                'fr': '/fr',
                'es': '/es',
            },
        },
        icons: {
            icon: '/favicon.ico',
        }
    };
}

export default async function RootLayout({
                                             children,
                                             params,
                                         }: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = dictionaries[lang] || dictionaries.en;

    return (
        <html lang={lang}>
        <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased bg-[#F9FAFB]`}>
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Твой SVG логотип Zipply здесь */}
                        <span className="font-jakarta font-extrabold text-2xl tracking-tight text-blue-600 italic">ZIPPLY</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <a href={`/${lang}`} className="hover:text-blue-600 transition-colors">Compress</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Converter</a>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="border-t border-gray-100 bg-white py-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Zipply — {dict.footer}
                    </p>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
