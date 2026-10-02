import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { purchaseUrl, yen } from '@/lib/catalog';
export function ShopLink({ product }: { product: Product }) {
  const url = purchaseUrl(product);
  return url ? <a className="shop-link" href={url} target="_blank" rel="sponsored noopener noreferrer">販売サイトで見る <span aria-hidden="true">↗</span></a> : null;
}
export function ProductImage({ product, detail = false }: { product: Product; detail?: boolean }) {
  if (product.a8BannerHtml) {
    return <div className={`${detail ? 'detail-image' : 'product-image'} a8-product-image`} dangerouslySetInnerHTML={{ __html: product.a8BannerHtml }} />;
  }
  return detail
    ? <><Image className="detail-image" src={product.image} width={600} height={900} alt={`${product.name}の商品画像は準備中です`} priority/><p className="small">画像の利用条件を確認できるまで、プレースホルダーで表示しています。</p></>
    : <Link href={`/products/${product.id}/`} className="product-image"><Image src={product.image} alt={`${product.name}の商品画像は準備中です`} width={600} height={900}/><span className="sample-label">画像準備中</span></Link>;
}
export function ProductCard({ product:p }: {product:Product}) {
  return <article className="product-card"><ProductImage product={p}/><div className="card-meta"><span>{p.category}</span><span>{yen(p.price)}</span></div><h3><Link href={`/products/${p.id}/`}>{p.name}</Link></h3><div className="card-reason"><h4>選んだ理由</h4><p className="reason">{p.whySelected}</p></div><div className="card-caveats"><h4>気になる点</h4><ul>{p.caveats.map(c=><li key={c}>{c}</li>)}</ul></div><p className="price-note">価格は確認時点のものです。最新価格は販売サイトでご確認ください。</p><ShopLink product={p}/></article>;
}
