import { Catalog } from '@/components/catalog';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { getApprovedProducts } from '@/lib/products';
import { seo } from '@/lib/seo';

export const metadata=seo('暮らしに残したい商品を探す','今あるものを見直したあとにも必要な家具や生活用品を、長く使えるか、場所を取りすぎないか、暮らしを軽くするかを基準に紹介します。','/products/');

export default function Products(){
  return <div className="page-shell">
    <AffiliateNotice/>
    <div className="page-heading"><h1>本当に必要なものだけ選ぶ。</h1><p>ものを見直したあとにも必要なら、長く使えるか、場所を取りすぎないか、暮らしを軽くするかを基準に選びます。</p></div>
    <Catalog products={getApprovedProducts()}/>
    <p className="common-price-note">価格・在庫は販売先で変更される場合があります。</p>
  </div>;
}
