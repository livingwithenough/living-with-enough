import Link from 'next/link';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { ProductCard } from '@/components/product-card';
import { getApprovedProducts } from '@/lib/products';

const actions = [
  { title: '売る', text: '使っていないものは、捨てる前に価値を確かめる。' },
  { title: '残す', text: 'よく使うものには、無理に手放さず定位置をつくる。' },
  { title: '預ける', text: '今は使わないものを、家の外で保管する選択も考える。' },
  { title: '任せる', text: '時間や手間が足りないことは、頼れる相手に任せる。' },
] as const;

export default function Home() {
  const products = getApprovedProducts();
  return <>
    <section className="home-hero">
      <div className="home-hero__main">
        <AffiliateNotice />
        <p className="eyebrow">Living with Enough</p>
        <h1>暮らしを、資産に。</h1>
        <p className="home-hero__lead">家の中のものを見直して、売る・残す・預ける、その次を整理するサイトです。</p>
        <p className="home-hero__copy">使っていないもの。<br/>手放せずにいるもの。<br/>いつか使うと思っているもの。<br/><br/>今あるものを見直すと、<br/>部屋にも、家計にも、<br/>少し余白が生まれます。</p>
        <Link className="button" href="/audit/">3分で見直してみる <span aria-hidden="true">→</span></Link>
      </div>
      <div className="home-hero__aside" aria-hidden="true"><span>Less, chosen well.</span></div>
    </section>

    <section className="hero-paths" aria-label="見直したものの次の選択肢">
      <article><h2>売る</h2><p>使っていないものの価値を確かめる。</p></article>
      <article><h2>預ける</h2><p>また使うものを、家の外に置く。</p></article>
      <article><h2>残す</h2><p>よく使うものに、定位置をつくる。</p></article>
    </section>

    <section className="margin-message">
      <p className="eyebrow">Living with enough.</p>
      <h2>部屋の余白を、<br/>家計の余白に。</h2>
      <p>売る。<br/>残す。<br/>預ける。<br/>任せる。<br/><br/>そして、<br/>本当に必要なものだけを選ぶ。</p>
    </section>

    <section className="review-cta">
      <div><p className="eyebrow">3 minutes</p><h2>迷っているものから、<br/>一つずつ。</h2></div>
      <p>いくつかの質問に答えると、今日できる小さな一歩を整理できます。</p>
      <Link className="button button--outline" href="/audit/">見直してみる <span aria-hidden="true">→</span></Link>
    </section>

    <section className="action-section" aria-labelledby="four-actions">
      <div className="section-heading"><div><p className="eyebrow">Four choices</p><h2 id="four-actions">今あるものの、次を考える。</h2></div></div>
      <div className="action-grid">{actions.map((action, index)=><article key={action.title}><span>0{index + 1}</span><h3>{action.title}</h3><p>{action.text}</p></article>)}</div>
    </section>

    <section className="guide-teaser">
      <div><p className="eyebrow">Guides</p><h2>暮らしを軽くするヒント。</h2></div>
      <p>手放し方、残し方、ものの選び方。暮らしの中で迷ったときに使える基準をまとめます。</p>
      <Link className="text-link" href="/guides/">ガイドを見る →</Link>
    </section>

    <section className="home-products" id="products">
      <div className="section-heading"><div><p className="eyebrow">Choose after reviewing</p><h2>本当に必要なものだけ選ぶ。</h2></div><Link className="text-link" href="/products/">商品を見る →</Link></div>
      <div className="style-note"><strong>Japandiは、選び方のひとつ。</strong><p>ものを見直したあとにも必要なら、素材、形、空間への作用を確かめて選びます。</p></div>
      <div className="product-grid">{products.map(product=><ProductCard key={product.id} product={product} compact/>)}</div>
      <p className="common-price-note">価格・在庫は販売先で変更される場合があります。</p>
    </section>

    <section className="about-teaser">
      <div><p className="eyebrow">About</p><h2>今ある価値を、見落とさない。</h2></div>
      <p>売ることも、買わないことも、残すことも。暮らしに合う選択を自分で決められる場所をつくります。</p>
      <Link className="text-link" href="/about/">私たちについて →</Link>
    </section>
  </>;
}
