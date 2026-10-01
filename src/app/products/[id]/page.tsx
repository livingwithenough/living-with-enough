import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getApprovedProduct,getApprovedProducts } from '@/lib/products';
import { yen } from '@/lib/catalog';
import { seo } from '@/lib/seo';
import { ShopLink } from '@/components/product-card';
export const dynamicParams=false;
export function generateStaticParams(){return getApprovedProducts().map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id);if(!p)return {};return seo(p.name,`架空のサンプル。${p.whySelected}`,`/products/${p.id}/`,p.image);}
export default async function ProductDetail({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id);if(!p)notFound();return <div className="page-shell"><nav className="breadcrumbs" aria-label="パンくず"><Link href="/">TOP</Link><span>/</span><Link href="/products/">商品一覧</Link><span>/</span><span>{p.category}</span></nav><article className="detail"><div><Image className="detail-image" src={p.image} width={600} height={900} alt={`${p.name}の架空のイメージ`} priority/><p className="small">AI生成のサンプル画像。実在商品を示すものではありません。</p></div><div className="detail-copy"><p className="eyebrow">{p.category}</p><h1>{p.name}</h1><p className="detail-price">{yen(p.price)}<span>サンプル価格</span></p><p className="sample-notice">架空の商品です。価格・素材・寸法は仮の設定で、購入はできません。</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><section><h2>選んだ理由</h2><p>{p.whySelected}</p></section><section><h2>気になる点</h2><ul>{p.caveats.map(c=><li key={c}>{c}</li>)}</ul></section><dl><div><dt>素材</dt><dd>{p.material}</dd></div><div><dt>サイズ</dt><dd>{p.dimensions}</dd></div><div><dt>ショップ</dt><dd>{p.shop}</dd></div></dl><ShopLink product={p}/><p className="small">実商品掲載時はリンク先で最新の価格・送料・在庫をご確認ください。<Link href="/affiliate-disclosure/">広告について</Link></p></div></article></div>;}
