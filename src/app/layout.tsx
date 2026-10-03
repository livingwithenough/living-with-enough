import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl, seo } from '@/lib/seo';
import './globals.css';
import { brand } from '@/lib/brand';
export const metadata:Metadata={metadataBase:siteUrl,...seo(`${brand.name}｜${brand.tagline}`,brand.description,'/','/images/japandi-room-hero.png'),title:{default:`${brand.name}｜${brand.tagline}`,template:`%s | ${brand.name}`}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ja"><body><a className="skip" href="#main">本文へスキップ</a><header className="site-header"><Link href="/" className="brand">{brand.name}<span>{brand.tagline}</span></Link><nav aria-label="メインナビゲーション"><Link href="/products/">商品を探す</Link><Link href="/guides/">ガイド</Link><Link href="/about/">私たちについて</Link></nav></header><main id="main">{children}</main><footer><div><Link href="/" className="footer-brand">{brand.name}</Link><p>今あるものを生かし、余白を残す。</p></div><div className="footer-links"><Link href="/products/">商品一覧</Link><Link href="/guides/">Guides</Link><Link href="/about/">About</Link><Link href="/affiliate-disclosure/">広告・アフィリエイトについて</Link></div><small>© {new Date().getFullYear()} {brand.name}</small></footer></body></html>;}
