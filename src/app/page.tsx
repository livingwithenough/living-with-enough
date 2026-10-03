import Image from 'next/image';
import Link from 'next/link';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { ProductCard } from '@/components/product-card';
import { getApprovedProducts } from '@/lib/products';

export default function Home() {
  return <>
    <section className="hero">
      <Image className="hero-background" src="/images/japandi-room-hero.png" alt="明るい木、ラタン、和紙、陶器を取り入れた自然光の入るJapandiの部屋" fill priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <AffiliateNotice />
        <p className="hero-brand">Living with Enough</p>
        <h1>足るものを知る、<br/>静かな暮らし。</h1>
        <p className="hero-en" lang="en">Japandi for a quieter life in Japan.<br/>Japanese restraint, Nordic warmth, and pieces worth keeping.</p>
        <p className="hero-ja">和の余白と北欧のぬくもり。今ある暮らしを生かしながら、長く残したいものを選ぶ。</p>
        <Link className="button" href="/products/">Japandiのものを探す</Link>
      </div>
    </section>

    <section className="japandi-intro" aria-labelledby="what-is-japandi">
      <div>
        <p className="eyebrow">Japanese restraint × Nordic warmth</p>
        <h2 id="what-is-japandi">Japandiとは。<span lang="en">What is Japandi?</span></h2>
      </div>
      <div className="intro-copy">
        <p>Japandiは、日本の簡素さや余白と、北欧の温かさや機能性を合わせたインテリアの考え方です。ものを減らすこと自体が目的ではなく、自然素材と長く使えるものを選び、落ち着いて暮らせる空間をつくります。</p>
        <p lang="en">Japandi brings together Japanese simplicity and Nordic warmth. It favors natural materials, functional forms and fewer, better pieces — creating a home that feels calm rather than empty.</p>
      </div>
      <aside className="resident-note">
        <h3 lang="en">For English-speaking residents in Japan</h3>
        <p lang="en">Discover Japandi furniture and everyday objects available from Japanese retailers, with practical guidance for shopping in Japan.</p>
      </aside>
    </section>

    <section className="home-products">
      <div className="section-heading"><div><p className="eyebrow">Pieces worth keeping</p><h2>Japandiの暮らしに合うもの。</h2></div><Link className="text-link" href="/products/">すべての商品を見る</Link></div>
      <p className="sample-notice">素材、形、空間の使い方から、なぜJapandiに合うかを具体的に紹介します。商品画像はA8.netの商品リンク機能で生成された広告素材です。</p>
      <div className="product-grid">{getApprovedProducts().map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </section>

    <section className="guide-teaser">
      <div><p className="eyebrow">Guides for life in Japan</p><h2>買う場所と、選ぶ基準を。</h2></div>
      <p>日本で暮らす人が、素材や住まいの広さ、国内配送まで含めてJapandiのものを選べるガイドを準備しています。</p>
      <Link className="text-link" href="/guides/">ガイドを見る</Link>
    </section>
  </>;
}
