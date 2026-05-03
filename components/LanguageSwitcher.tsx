'use client';

// components/LanguageSwitcher.tsx
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

/** Название cookie — такое же как у Next.js i18n по умолчанию */
const LANG_COOKIE = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 год

function setLangCookie(lang: string) {
    if (typeof document === 'undefined') return;
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const [open, setOpen] = useState(false);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    // Закрывать по Escape и клику вне
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        const onClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-lang-switcher]')) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [open]);

    const current = LANGUAGES.find(l => l.code === currentLang) ?? LANGUAGES[0];

    const switchUrl = (newLang: string): string => {
        if (!pathname) return `/${newLang}`;
        // Заменяем первый сегмент пути (язык) на новый
        return pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${newLang}$1`) || `/${newLang}`;
    };

    const handleSelect = (langCode: string) => {
        setLangCookie(langCode);
        setOpen(false);
    };

    return (
        <div className="relative" data-lang-switcher>
            <button
                onClick={() => setOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Language: ${current.label}`}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#007BFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007BFF]/30"
            >
                <span>{current.name}</span>
                <svg
                    className={`w-3 h-3 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <ul
                    role="listbox"
                    aria-label="Select language"
                    className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl min-w-[180px] z-50 py-1 overflow-hidden"
                >
                    {LANGUAGES.map(l => (
                        <li key={l.code} role="option" aria-selected={l.code === currentLang}>
                            <Link
                                href={switchUrl(l.code)}
                                onClick={() => handleSelect(l.code)}
                                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                  ${l.code === currentLang
                                    ? 'bg-blue-50 text-[#007BFF] font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                <span>
                  <span className="font-medium">{l.name}</span>
                  <span className="text-gray-400 ml-2">{l.label}</span>
                </span>
                                {l.code === currentLang && (
                                    <svg className="w-3.5 h-3.5 text-[#007BFF]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
