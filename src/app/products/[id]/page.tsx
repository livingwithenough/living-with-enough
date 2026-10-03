import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApprovedProduct,getApprovedProducts } from '@/lib/products';
import { yen } from '@/lib/catalog';
import { seo } from '@/lib/seo';
import { ProductImage, ShopLink } from '@/components/product-card';
import { AffiliateNotice } from '@/components/affiliate-notice';
export const dynamicParams=false;
export function generateStaticParams(){return getApprovedProducts().map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id);if(!p)return {};return seo(`${p.name}｜${p.officialName}`,p.japandiFit,`/products/${p.id}/`,p.image);}
const dateLabel=(value:string|null)=>value?new Intl.DateTimeFormat('ja-JP',{dateStyle:'long'}).format(new Date(`${value}T00:00:00+09:00`)):'未確認';
export default async function ProductDetail({params}:{params:Promise<{id:string}>}){
  const p=getApprovedProduct((await params).id);if(!p)notFound();
  const notes=p.purchaseNotes;
  return <div className="page-shell"><AffiliateNotice/><nav className="breadcrumbs" aria-label="パンくず"><Link href="/">TOP</Link><span>/</span><Link href="/products/">商品一覧</Link><span>/</span><span>{p.category}</span></nav><article className="detail"><div><ProductImage product={p} detail/></div><div className="detail-copy"><p className="eyebrow">{p.category} · {p.brand}</p><h1>{p.name}</h1><div className="official-product"><p>正式商品名：{p.officialName}</p>{p.modelNumber&&<p>型番：{p.modelNumber}</p>}</div><p className="detail-price">参考価格 {yen(p.price)}<span>{dateLabel(p.priceCheckedAt)}確認</span></p><p className="price-note">価格は確認時点のものです。最新価格は販売サイトでご確認ください。</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><section><h2>なぜJapandiに合うか <span lang="en">/ Why it works in Japandi</span></h2><p>{p.japandiFit}</p></section><dl><div><dt>素材</dt><dd>{p.material}</dd></div><div><dt>サイズ</dt><dd>{p.dimensions}</dd></div><div><dt>販売元</dt><dd>{p.shop}</dd></div><div><dt>納期</dt><dd>{notes.deliveryLeadTime}</dd></div><div><dt>配送</dt><dd>{notes.domesticShipping}</dd></div><div><dt>返品等</dt><dd>{notes.returnCancellationNotes}</dd></div></dl><section><h2>購入前に知っておきたいこと</h2><ul>{notes.thingsToKnowBeforeBuying.map(note=><li key={note}>{note}</li>)}</ul></section><ShopLink product={p}/><p className="small">リンク先で最新の価格・送料・在庫・仕様をご確認ください。<Link href="/affiliate-disclosure/">広告について</Link></p></div></article></div>;
}
