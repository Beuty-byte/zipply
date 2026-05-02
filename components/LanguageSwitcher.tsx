'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const LANGUAGES = [
    { code: 'en', name: 'EN', label: 'English' },
    { code: 'es', name: 'ES', label: 'Español' },
    { code: 'pt', name: 'PT', label: 'Português' },
    { code: 'fr', name: 'FR', label: 'Français' },
    { code: 'de', name: 'DE', label: 'Deutsch' },
    { code: 'ru', name: 'RU', label: 'Русский' },
] as const;

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const [open, setOpen] = useState(false);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

    const switchLang = (newLang: string): string => {
        if (!pathname) return `/${newLang}`;
        return pathname.replace(/^\/[a-z]{2}/, `/${newLang}`) || `/${newLang}`;
    };

    return (
        <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#007BFF] transition-colors"
            >
                <span>{current.name}</span>
                <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl min-w-[180px] z-50">
                    {LANGUAGES.map(l => (
                        <Link
                            key={l.code}
                            href={switchLang(l.code)}
                            onClick={() => setOpen(false)}
                            className={`block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                                l.code === currentLang ? 'bg-blue-50 text-[#007BFF] font-semibold' : 'text-gray-700'
                            }`}
                        >
                            <span className="font-medium">{l.name}</span>
                            <span className="text-gray-400 ml-2">{l.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}