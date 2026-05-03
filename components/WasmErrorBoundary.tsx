'use client';

// components/WasmErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  lang?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

const MESSAGES: Record<string, { title: string; body: string; reload: string; report: string }> = {
  en: {
    title: 'Something went wrong',
    body: 'The image processing module failed to load. This can happen in older browsers or when the page loads offline. Try reloading — it usually helps.',
    reload: 'Reload page',
    report: 'If the problem persists, try a different browser (Chrome or Firefox recommended).',
  },
  ru: {
    title: 'Что-то пошло не так',
    body: 'Модуль обработки изображений не загрузился. Это может происходить в старых браузерах или при загрузке страницы офлайн. Попробуйте перезагрузить — обычно помогает.',
    reload: 'Перезагрузить страницу',
    report: 'Если проблема повторяется, попробуйте другой браузер (рекомендуется Chrome или Firefox).',
  },
  de: {
    title: 'Etwas ist schiefgelaufen',
    body: 'Das Bildverarbeitungsmodul konnte nicht geladen werden. Versuchen Sie, die Seite neu zu laden.',
    reload: 'Seite neu laden',
    report: 'Wenn das Problem weiterhin besteht, versuchen Sie einen anderen Browser (Chrome oder Firefox empfohlen).',
  },
  fr: {
    title: 'Une erreur est survenue',
    body: "Le module de traitement d'images n'a pas pu être chargé. Essayez de recharger la page.",
    reload: 'Recharger la page',
    report: 'Si le problème persiste, essayez un autre navigateur (Chrome ou Firefox recommandé).',
  },
  es: {
    title: 'Algo salió mal',
    body: 'El módulo de procesamiento de imágenes no pudo cargarse. Intenta recargar la página.',
    reload: 'Recargar página',
    report: 'Si el problema persiste, prueba con otro navegador (se recomienda Chrome o Firefox).',
  },
  pt: {
    title: 'Algo deu errado',
    body: 'O módulo de processamento de imagens não pôde ser carregado. Tente recarregar a página.',
    reload: 'Recarregar página',
    report: 'Se o problema persistir, tente outro navegador (recomendado Chrome ou Firefox).',
  },
};

export default class WasmErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unknown error',
    };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Можно добавить отправку в Sentry/LogRocket здесь
    console.error('[WasmErrorBoundary]', error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const lang = this.props.lang ?? 'en';
    const t = MESSAGES[lang] ?? MESSAGES.en;

    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center max-w-lg mx-auto my-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-red-800 mb-2">{t.title}</h3>

        {/* Description */}
        <p className="text-sm text-red-700 mb-4 leading-relaxed">{t.body}</p>

        {/* Technical details (collapsible) */}
        <details className="mb-5 text-left">
          <summary className="text-xs text-red-500 cursor-pointer hover:text-red-700 select-none">
            Technical details
          </summary>
          <pre className="mt-2 text-xs bg-red-100 text-red-800 rounded-lg p-3 overflow-auto whitespace-pre-wrap break-words">
            {this.state.errorMessage}
          </pre>
        </details>

        {/* Reload button */}
        <button
          onClick={this.handleReload}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 104.582 9H4"
            />
          </svg>
          {t.reload}
        </button>

        {/* Fallback tip */}
        <p className="mt-4 text-xs text-red-500">{t.report}</p>
      </div>
    );
  }
}
