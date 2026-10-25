'use client';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/routing';
import { guideSwitchDestination } from '@/lib/guide-routing';
export function LanguageSwitcher({locale}:{locale:Locale}) {
  const path = usePathname();
  const target = locale === 'ja' ? 'en' : 'ja';
  // Guides are not translated; all published bilingual pages keep their counterpart.
  const href = guideSwitchDestination(path, target);
  const englishGuide = path.startsWith('/en/guides/');
  return <a className="language-switcher" href={href} hrefLang={target} lang={target} aria-label={locale === 'ja' ? 'Switch to English' : englishGuide ? '日本語トップへ' : '日本語に切り替え'}>{locale === 'ja' ? 'EN' : '日本語'}</a>;
}
