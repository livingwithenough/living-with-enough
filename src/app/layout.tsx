import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl, seo } from '@/lib/seo';
import { brand } from '@/lib/brand';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...seo(`${brand.name}｜${brand.tagline}`, brand.description, '/'),
  title: { default: `${brand.name}｜${brand.tagline}`, template: `%s | ${brand.name}` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>
    <a className="skip" href="#main">本文へスキップ</a>
    <header className="site-header">
      <Link href="/" className="brand">{brand.name}</Link>
      <nav aria-label="メインナビゲーション">
        <Link className="nav-primary" href="/audit/">見直す</Link>
        <Link href="/products/">選ぶ</Link>
        <Link href="/about/">Living with Enoughについて</Link>
      </nav>
    </header>
    <main id="main">{children}</main>
    <footer>
      <div><Link href="/" className="footer-brand">{brand.name}</Link><p>今ある価値を生かし、部屋と家計に余白を。</p></div>
      <div className="footer-links"><Link href="/audit/">見直す</Link><Link href="/products/">選ぶ</Link><Link href="/about/">Living with Enoughについて</Link><Link href="/affiliate-disclosure/">広告・アフィリエイトについて</Link></div>
      <small>© {new Date().getFullYear()} {brand.name}</small>
    </footer>
  </body></html>;
}
