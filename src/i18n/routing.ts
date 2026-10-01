export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

// Only Japanese content is published in v0.1. Add "en" after translations are reviewed.
export const publishedLocales = ['ja'] as const satisfies readonly Locale[];

export const localeConfig = {
  ja: { basePath: '/ja', htmlLang: 'ja', openGraphLocale: 'ja_JP' },
  en: { basePath: '/en', htmlLang: 'en', openGraphLocale: 'en_US' },
} as const;

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export function localizedPath(locale: Locale, path = '/') {
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${localeConfig[locale].basePath}${normalizedPath}`;
}

// The current Japanese URLs stay canonical until /ja pages are actually published.
// At that point, the root route can use this value for a language choice or redirect.
export const rootLocaleDestination = localizedPath(defaultLocale);
