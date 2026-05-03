// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['en', 'es', 'pt', 'fr', 'de', 'ru'] as const;
const DEFAULT_LANG = 'en';
const LANG_COOKIE = 'NEXT_LOCALE';

type SupportedLang = typeof SUPPORTED_LANGS[number];

function isSupportedLang(lang: string): lang is SupportedLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

/** Читаем cookie NEXT_LOCALE */
function getLangFromCookie(request: NextRequest): string | null {
  const cookie = request.cookies.get(LANG_COOKIE);
  if (cookie?.value && isSupportedLang(cookie.value)) {
    return cookie.value;
  }
  return null;
}

/** Парсим Accept-Language и находим первый поддерживаемый язык */
function getLangFromHeader(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  if (!acceptLanguage) return DEFAULT_LANG;

  const langs = acceptLanguage
    .split(',')
    .map(part => {
      const [code, q = '1'] = part.trim().split(';q=');
      return { code: code.split('-')[0].toLowerCase(), q: parseFloat(q) };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of langs) {
    if (isSupportedLang(code)) return code;
  }
  return DEFAULT_LANG;
}

/** Определяем язык: cookie → Accept-Language → default */
function getLocale(request: NextRequest): string {
  return getLangFromCookie(request) ?? getLangFromHeader(request);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропускаем статику, API и служебные файлы
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

  // Проверяем, есть ли уже корректный языковой сегмент в начале URL
  const pathnameHasLang = SUPPORTED_LANGS.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (pathnameHasLang) {
    // Язык уже указан — проверяем, совпадает ли он с cookie
    // Если нет — синхронизируем cookie (без редиректа)
    const urlLang = pathname.split('/')[1];
    const cookieLang = getLangFromCookie(request);

    if (cookieLang && cookieLang !== urlLang) {
      // Пользователь перешёл по прямой ссылке с другим языком — обновляем cookie
      const response = NextResponse.next();
      response.cookies.set(LANG_COOKIE, urlLang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.next();
  }

  // Язык не указан — определяем и редиректим
  const locale = getLocale(request);
  const newUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url
  );
  newUrl.search = request.nextUrl.search;
  newUrl.hash = request.nextUrl.hash;

  const response = NextResponse.redirect(newUrl);

  // Устанавливаем cookie если его ещё нет
  if (!getLangFromCookie(request)) {
    response.cookies.set(LANG_COOKIE, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|public|sitemap.xml|robots.txt|favicon.ico).*)'],
};
