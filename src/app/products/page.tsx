import { Catalog } from '@/components/catalog';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { getApprovedProducts } from '@/lib/products';
import { seo } from '@/lib/seo';

export const metadata=seo('暮らしに残したい商品を探す','日本の販売店で購入できる家具と生活用品を、素材や形、空間への作用とともに紹介します。','/products/');

export default function Products(){
  return <div className="page-shell">
    <AffiliateNotice/>
    <div className="page-heading"><h1>本当に必要なものだけ選ぶ。</h1><p>今あるものを見直したあとにも必要なら、素材、形、空間への作用を確かめて選びます。</p></div>
    <p className="sample-notice">自然素材と静かな余白のある暮らしに、商品がどう役立つかを具体的に紹介しています。</p>
    <Catalog products={getApprovedProducts()}/>
    <p className="common-price-note">価格・在庫は販売先で変更される場合があります。</p>
  </div>;
}
