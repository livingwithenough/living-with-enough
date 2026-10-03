import Link from 'next/link';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { ProductCard } from '@/components/product-card';
import { getApprovedProducts } from '@/lib/products';

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <AffiliateNotice />
        <p className="hero-brand">Living with Enough</p>
        <h1>足るものを知る、<br/>静かな暮らし。</h1>
        <p className="hero-en" lang="en">Japandi for a quieter life in Japan.<br/><br/>Japanese restraint, Nordic warmth,<br/>and pieces worth keeping.</p>
        <p className="hero-ja">和の余白と北欧のぬくもり。<br/>今ある暮らしを生かしながら、<br/>長く残したい品を選ぶ。</p>
        <Link className="button" href="#products">商品を見る</Link>
      </div>
      <div className="hero-visual" role="img" aria-label="Japandiの室内全景写真は、利用権を確認した画像へ差し替え予定です">
        <div><span lang="en">Japandi interior</span><small>室内全景写真 差し替え待ち</small></div>
      </div>
    </section>

    <section className="audit-teaser">
      <div><p className="eyebrow">Living with Enough · 暮らしの棚卸し</p><h2>暮らしを棚卸しする</h2></div>
      <p>捨てる、売る、預ける、残す。<br/>今あるものの次を考える。</p>
      <Link className="button" href="/audit/">3分で始める</Link>
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

    <section className="home-products" id="products">
      <div className="section-heading"><div><p className="eyebrow">Pieces worth keeping</p><h2>Japandiをつくる、暮らしの品。</h2></div><Link className="text-link" href="/products/">商品を見る</Link></div>
      <p className="sample-notice">素材、形、空間の使い方から、なぜJapandiに合うかを具体的に紹介します。商品画像はA8.netの商品リンク機能で生成された広告素材です。</p>
      <div className="product-grid">{getApprovedProducts().map(p=><ProductCard key={p.id} product={p} compact/>)}</div>
    </section>

    <section className="about-teaser">
      <div><p className="eyebrow">Living with Enough</p><h2>足るものを知る、静かな暮らし。</h2></div>
      <p>必要以上に増やさず、今ある暮らしを生かしながら、自然素材と長く使える品を選びます。</p>
      <Link className="text-link" href="/about/">Living with Enoughについて</Link>
    </section>

    <section className="guide-teaser">
      <div><p className="eyebrow">Guides for life in Japan</p><h2>買う場所と、選ぶ基準を。</h2></div>
      <p>日本で暮らす人が、素材や住まいの広さ、国内配送まで含めてJapandiの家具や生活用品を選べるガイドを準備しています。</p>
      <Link className="text-link" href="/guides/">ガイドを見る</Link>
    </section>
  </>;
}
