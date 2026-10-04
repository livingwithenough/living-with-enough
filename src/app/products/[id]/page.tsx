import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApprovedProduct,getApprovedProducts } from '@/lib/products';
import { yen } from '@/lib/catalog';
import { seo } from '@/lib/seo';
import { ProductImage, ShopLink } from '@/components/product-card';
import { AffiliateNotice } from '@/components/affiliate-notice';
export const dynamicParams=false;
export function generateStaticParams(){return getApprovedProducts().map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id);if(!p)return {};return seo(`${p.name}｜${p.officialName}`,p.livingBenefit,`/products/${p.id}/`,p.image);}
export default async function ProductDetail({params}:{params:Promise<{id:string}>}){
  const p=getApprovedProduct((await params).id);if(!p)notFound();
  const notes=p.purchaseNotes;
  return <div className="page-shell"><AffiliateNotice/><nav className="breadcrumbs" aria-label="パンくず"><Link href="/">TOP</Link><span>/</span><Link href="/products/">商品一覧</Link><span>/</span><span>{p.category}</span></nav><article className="detail"><div><ProductImage product={p} detail/></div><div className="detail-copy"><p className="eyebrow">{p.category} · {p.brand}</p><h1>{p.name}</h1><div className="official-product"><p>正式商品名：{p.officialName}</p>{p.modelNumber&&<p>型番：{p.modelNumber}</p>}</div><p className="detail-price">{yen(p.price)}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><section><h2>暮らしでの役割</h2><p>{p.livingBenefit}</p></section><dl><div><dt>素材</dt><dd>{p.material}</dd></div><div><dt>サイズ</dt><dd>{p.dimensions}</dd></div><div><dt>販売元</dt><dd>{p.shop}</dd></div><div><dt>納期</dt><dd>{notes.deliveryLeadTime}</dd></div><div><dt>配送</dt><dd>{notes.domesticShipping}</dd></div><div><dt>返品等</dt><dd>{notes.returnCancellationNotes}</dd></div></dl><section><h2>購入前に知っておきたいこと</h2><ul>{notes.thingsToKnowBeforeBuying.map(note=><li key={note}>{note}</li>)}</ul></section><ShopLink product={p}/><p className="small">価格・在庫は販売先で変更される場合があります。リンク先で最新の送料・仕様もご確認ください。<Link href="/affiliate-disclosure/">広告について</Link></p></div></article></div>;
}
