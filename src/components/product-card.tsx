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
    ? <Image className="detail-image" src={product.image} width={600} height={900} alt={product.name} priority/>
    : <Link href={`/products/${product.id}/`} className="product-image"><Image src={product.image} alt={product.name} width={600} height={900}/></Link>;
}
export function ProductCard({ product:p, compact = false }: {product:Product; compact?:boolean}) {
  const fitCopy=compact?`${p.japandiFit.split('。')[0]}。`:p.japandiFit;
  return <article className={`product-card${compact?' product-card--compact':''}`}><ProductImage product={p}/><div className="card-meta"><span>{p.brand}</span><span>{yen(p.price)}</span></div><h3><Link href={`/products/${p.id}/`}>{p.name}</Link></h3>{!compact&&<p className="official-name">{p.brand} · {p.officialName}</p>}<div className="card-reason"><h4>なぜJapandiに合うか</h4><p className="reason">{fitCopy}</p></div><div className="card-actions"><Link className="detail-link" href={`/products/${p.id}/`}>詳細を見る</Link><ShopLink product={p}/></div></article>;
}
