'use client';

import { useState } from 'react';
import Link from 'next/link';

const LANGUAGES = [
    { code: 'en', name: 'EN', label: 'English' },
    { code: 'es', name: 'ES', label: 'Español' },
    { code: 'pt', name: 'PT', label: 'Português' },
    { code: 'fr', name: 'FR', label: 'Français' },
    { code: 'de', name: 'DE', label: 'Deutsch' },
    { code: 'ru', name: 'RU', label: 'Русский' },
];

export default function MobileMenu({ lang }: { lang: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 -mr-2 text-gray-600 hover:text-[#007BFF] transition-colors"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {open ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {open && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
                    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
                        <Link
                            href={`/${lang}/blog`}
                            onClick={() => setOpen(false)}
                            className="block text-sm font-medium text-gray-700 hover:text-[#007BFF] transition-colors"
                        >
                            {lang === 'ru' ? 'Блог' : 'Blog'}
                        </Link>
                        <div>
                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                                {lang === 'ru' ? 'Язык' : 'Language'}
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {LANGUAGES.map(l => (
                                    <Link
                                        key={l.code}
                                        href={`/${l.code}`}
                                        onClick={() => setOpen(false)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                                            l.code === lang
                                                ? 'bg-[#007BFF] text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}