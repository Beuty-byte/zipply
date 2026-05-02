// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['en', 'es', 'pt', 'fr', 'de', 'ru'];
const DEFAULT_LANG = 'en';

// Маппинг Accept-Language на наши языки
function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get('accept-language') || '';

    if (!acceptLanguage) return DEFAULT_LANG;

    // Парсим Accept-Language: "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
    const langs = acceptLanguage
        .split(',')
        .map(part => {
            const [code, q = '1'] = part.trim().split(';q=');
            return { code: code.split('-')[0].toLowerCase(), q: parseFloat(q) };
        })
        .sort((a, b) => b.q - a.q);

    for (const { code } of langs) {
        if (SUPPORTED_LANGS.includes(code)) {
            return code;
        }
    }

    return DEFAULT_LANG;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Пропускаем статику, API, sitemap, robots
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/public') ||
        pathname === '/sitemap.xml' ||
        pathname === '/robots.txt' ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // Проверяем, есть ли уже язык в URL
    const pathnameHasLang = SUPPORTED_LANGS.some(
        lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
    );

    if (pathnameHasLang) {
        // Язык уже указан — просто идём дальше
        return NextResponse.next();
    }

    // Определяем язык
    const locale = getLocale(request);

    // Редиректим на URL с языком
    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    newUrl.hash = request.nextUrl.hash;

    return NextResponse.redirect(newUrl);
}

export const config = {
    // Применяем middleware ко всем страницам, кроме статики
    matcher: ['/((?!_next|api|public|sitemap.xml|robots.txt|favicon.ico).*)'],
};