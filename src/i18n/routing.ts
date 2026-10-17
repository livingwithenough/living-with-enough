export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';
export const publishedLocales = locales;
export const localeConfig = {
  ja: { basePath: '', htmlLang: 'ja', openGraphLocale: 'ja_JP' },
  en: { basePath: '/en', htmlLang: 'en', openGraphLocale: 'en_US' },
} as const;
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export function localizedPath(locale: Locale, path = '/') {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${localeConfig[locale].basePath}${normalized}`;
}
export function languageAlternate(path: string, locale: Locale) {
  const base = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return localizedPath(locale, base);
}
export const rootLocaleDestination = '/';
