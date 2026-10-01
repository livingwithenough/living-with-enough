import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { purchaseUrl, yen } from '@/lib/catalog';
export function ShopLink({ product }: { product: Product }) {
  const url = purchaseUrl(product);
  return url ? <a className="shop-link" href={url} target="_blank" rel="sponsored noopener noreferrer">楽天で見る <span aria-hidden="true">↗</span></a> : <span className="shop-link disabled" aria-disabled="true">楽天で見る <span>サンプル・購入不可</span></span>;
}
export function ProductCard({ product:p }: {product:Product}) {
  return <article className="product-card"><Link href={`/products/${p.id}/`} className="product-image"><Image src={p.image} alt={`${p.name}の架空のイメージ`} width={600} height={900}/><span className="sample-label">架空のサンプル</span></Link><div className="card-meta"><span>{p.category}</span><span>{yen(p.price)}</span></div><h3><Link href={`/products/${p.id}/`}>{p.name}</Link></h3><div className="card-reason"><h4>選んだ理由</h4><p className="reason">{p.whySelected}</p></div><div className="card-caveats"><h4>気になる点</h4><ul>{p.caveats.map(c=><li key={c}>{c}</li>)}</ul></div><ShopLink product={p}/></article>;
}
