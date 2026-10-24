import { languageAlternate, type Locale } from '@/i18n/routing';

/** Untranslated guides lead to the other language's home, never to a nonexistent translation. */
export function guideSwitchDestination(path: string, target: Locale) {
  if (path.startsWith('/guides')) return '/en/';
  if (path === '/en/guides' || path.startsWith('/en/guides/')) return '/';
  return languageAlternate(path, target);
}
