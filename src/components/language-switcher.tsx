'use client';
import { usePathname } from 'next/navigation';
import { languageAlternate, type Locale } from '@/i18n/routing';
export function LanguageSwitcher({locale}:{locale:Locale}) {
  const path = usePathname();
  const target = locale === 'ja' ? 'en' : 'ja';
  // Guides are not translated; all published bilingual pages keep their counterpart.
  const href = path.startsWith('/guides') ? '/en/' : languageAlternate(path, target);
  return <a className="language-switcher" href={href} hrefLang={target} lang={target} aria-label={locale === 'ja' ? 'Switch to English' : '日本語に切り替え'}>{locale === 'ja' ? 'EN' : '日本語'}</a>;
}
