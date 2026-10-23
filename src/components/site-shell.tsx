import Link from 'next/link';
import { Analytics } from './analytics';
import type { Locale } from '@/i18n/routing';
import { localizedPath } from '@/i18n/routing';
import { LanguageSwitcher } from './language-switcher';
export function SiteShell({children,locale}:{children:React.ReactNode;locale:Locale}) {
  const en=locale==='en'; const path=(p:string)=>localizedPath(locale,p);
  return <html lang={locale}><body><Analytics/>
    <a className="skip" href="#main">{en?'Skip to content':'本文へスキップ'}</a>
    <header className="site-header"><Link href={path('/')} className="brand">Living with Enough</Link>
      <nav aria-label={en?'Main navigation':'メインナビゲーション'}>
        <Link className="nav-primary" href={path('/audit/')}>{en?'Review':'見直す'}</Link>
        <Link href={path('/products/')}>{en?'Products':'選ぶ'}</Link>
        <Link href={path('/about/')}>{en?'About':'Living with Enoughについて'}</Link>
        <LanguageSwitcher locale={locale}/>
      </nav>
    </header><main id="main">{children}</main>
    <footer><div><Link href={path('/')} className="footer-brand">Living with Enough</Link><p>{en?'More room at home. More room in your budget.':'今ある価値を生かし、部屋と家計に余白を。'}</p></div>
      <div className="footer-links"><Link href={path('/audit/')}>{en?'Review what you own':'見直す'}</Link><Link href={path('/products/')}>{en?'Products':'選ぶ'}</Link><Link href={path('/about/')}>{en?'About Living with Enough':'Living with Enoughについて'}</Link><Link href={path('/affiliate-disclosure/')}>{en?'Affiliate disclosure':'広告・アフィリエイトについて'}</Link></div>
      <small>© {new Date().getFullYear()} Living with Enough</small>
    </footer></body></html>;
}
