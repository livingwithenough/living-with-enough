import Image from 'next/image';
import Link from 'next/link';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { ProductCard } from '@/components/product-card';
import { getApprovedProducts } from '@/lib/products';

const actions = [
  { title: '売る', text: '使っていないものは、捨てる前に価値を確かめる。' },
  { title: '残す', text: 'よく使うものは、手放さずに定位置をつくる。' },
  { title: '預ける', text: '今は使わないものは、家の外に置く選択も考える。' },
  { title: '任せる', text: '時間や手間が足りないことは、頼れる相手に任せる。' },
] as const;

export default function Home() {
  const featuredProducts = getApprovedProducts().slice(0, 4);
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero__main">
        <AffiliateNotice />
        <p className="home-brand">Living with Enough</p>
        <h1 id="home-title">暮らしを、資産に。</h1>
        <p className="home-hero__lead">売る、残す、預ける。<br/>今あるものの、これからを考えるサイトです。</p>
        <p className="home-hero__copy">使っていないもの。<br/>手放せずにいるもの。<br/>いつか使うと思っているもの。</p>
        <p className="home-hero__copy">まず、今あるものから見直します。</p>
        <div className="home-hero__links">
          <Link className="button" href="/audit/">3分で見直してみる <span aria-hidden="true">→</span></Link>
          <Link className="text-link" href="/products/">必要なものを選ぶ</Link>
        </div>
      </div>
      <div className="home-hero__photo"><Image src="/images/home-living-room.jpg" alt="自然光が差し込む、白いソファと明るい木の家具がある整ったリビング" fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div>
    </section>
    <section className="brand-promise" aria-labelledby="promise-title">
      <h2 id="promise-title">部屋の余白を、<br/>家計の余白に。</h2>
      <p>買い足す前に、まず今あるものを見る。<br/>手放すものも、残すものも、<br/>自分で決められるように。</p>
    </section>
    <section className="action-section" aria-labelledby="four-actions">
      <div className="section-heading"><h2 id="four-actions">今あるものの、次を考える。</h2></div>
      <div className="action-grid">{actions.map((action, index)=><article key={action.title}><span>0{index + 1}</span><h3>{action.title}</h3><p>{action.text}</p></article>)}</div>
    </section>
    <section className="audit-invitation" aria-labelledby="audit-title">
      <div><p className="eyebrow">3 MINUTES</p><h2 id="audit-title">迷っているものから、<br/>一つずつ。</h2></div>
      <div><p>いくつかの質問に答えると、<br/>「売る・残す・預ける・任せる」の中から<br/>今日できる一歩を整理できます。</p><Link className="button" href="/audit/">見直してみる <span aria-hidden="true">→</span></Link></div>
    </section>
    <section className="home-products" aria-labelledby="products-title">
      <div className="section-heading"><h2 id="products-title">本当に必要なものだけ選ぶ。</h2></div>
      <p className="home-products__intro">ものを見直したあとにも必要なら、<br/>長く使えるか、場所を取りすぎないか、<br/>暮らしを軽くするかを基準に選びます。</p>
      <div className="product-grid">{featuredProducts.map(product=><ProductCard key={product.id} product={product} compact/>)}</div>
      <p className="common-price-note">価格・在庫は販売先で変更される場合があります。</p>
      <Link className="text-link home-products__all" href="/products/">すべての商品を見る →</Link>
    </section>
    <section className="about-teaser">
      <h2>今ある価値を、見落とさない。</h2>
      <p>売ることも、買わないことも、残すことも。<br/>暮らしに合う選択を自分で決められる場所をつくります。</p>
      <Link className="text-link" href="/about/">Living with Enoughについて →</Link>
    </section>
  </>;
}
