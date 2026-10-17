import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApprovedProduct,getApprovedProducts } from '@/lib/products';
import { yen } from '@/lib/catalog';
import { seo } from '@/lib/seo';
import { categoryLabelsEn } from '@/i18n/catalog';
import { ProductImage,ShopLink } from '@/components/product-card';
import { AffiliateNotice } from '@/components/affiliate-notice';
export const dynamicParams=false;
export function generateStaticParams(){return getApprovedProducts('en').map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id,'en');return p?seo(`${p.name} — Furniture & Essentials in Japan`,p.livingBenefit,`/en/products/${p.id}/`,p.image,'en'):{};}
export default async function Detail({params}:{params:Promise<{id:string}>}){
  const p=getApprovedProduct((await params).id,'en');if(!p)notFound();const n=p.purchaseNotes;
  return <div className="page-shell"><AffiliateNotice locale="en"/><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en/">Home</Link><span>/</span><Link href="/en/products/">Products</Link><span>/</span><span>{categoryLabelsEn[p.category]}</span></nav><article className="detail"><div><ProductImage product={p} detail/></div><div className="detail-copy"><p className="eyebrow">{categoryLabelsEn[p.category]} · {p.brand}</p><h1>{p.name}</h1><div className="official-product"><p>{p.officialNameLanguage==='ja'?'Japanese product name:':'Product name:'} <span lang={p.officialNameLanguage}>{p.officialName}</span></p>{p.modelNumber&&<p>Model: {p.modelNumber}</p>}</div><p className="detail-price">{p.priceLabel??yen(p.price)}</p><p className="small">Price checked: {p.priceCheckedAt??'Not recorded'}. Prices are in JPY.</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><section><h2>Role in your home</h2><p>{p.livingBenefit}</p></section><dl>{[['Material',p.material],['Dimensions',p.dimensions],['Retailer',p.shop],['Availability',n.availableInJapan],['Delivery estimate',n.deliveryLeadTime],['Shipping in Japan',n.domesticShipping],['Payment',n.paymentOptions],['Returns and cancellations',n.returnCancellationNotes]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><section><h2>Before you buy</h2><ul>{Array.from(new Set([...n.thingsToKnowBeforeBuying,...p.caveats])).map(t=><li key={t}>{t}</li>)}</ul></section><ShopLink product={p}/><p className="small">Prices, stock, shipping charges and specifications may change. Check the retailer’s latest information. Retailer websites, checkout and support may be primarily in Japanese. <Link href="/en/affiliate-disclosure/">Affiliate disclosure</Link></p></div></article></div>;
}
