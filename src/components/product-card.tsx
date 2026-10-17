import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { localizedPath } from '@/i18n/routing';
import { purchaseUrl, yen } from '@/lib/catalog';
export function ShopLink({ product }: { product: Product }) {
  const url = purchaseUrl(product);
  if (url && product.a8TextHtml) {
    return <span className="issued-shop-link" dangerouslySetInnerHTML={{ __html: product.a8TextHtml }} />;
  }
  return url ? <a className="shop-link" href={url} target="_blank" rel="sponsored noopener noreferrer">{product.locale==='en' ? (product.affiliateProvider==='rakuten'?'View on Rakuten Japan':product.shop==='FLYMEe'?'View on FLYMEe':product.brand==='MASTERWAL'?'View on MASTERWAL':'View at retailer'):'販売サイトで見る'} <span aria-hidden="true">↗</span></a> : null;
}
export function ProductImage({ product, detail = false }: { product: Product; detail?: boolean }) {
  if (product.a8BannerHtml) {
    return <div className={`${detail ? 'detail-image' : 'product-image'} a8-product-image`} dangerouslySetInnerHTML={{ __html: product.a8BannerHtml }} />;
  }
  return detail
    ? <Image className="detail-image" src={product.image} width={600} height={900} alt={product.name} priority/>
    : <Link href={localizedPath(product.locale,`/products/${product.id}/`)} className="product-image"><Image src={product.image} alt={product.name} width={600} height={900}/></Link>;
}
export function ProductCard({ product:p, compact = false }: {product:Product; compact?:boolean}) {
  return <article className={`product-card${compact?' product-card--compact':''}`}><ProductImage product={p}/><div className="card-meta"><span>{p.brand}</span><span>{p.priceLabel ?? yen(p.price)}</span></div><h3><Link href={localizedPath(p.locale,`/products/${p.id}/`)}>{p.name}</Link></h3>{!compact&&<p className="official-name">{p.locale==='en'&&p.officialNameLanguage==='ja'?'Japanese product name: ':`${p.brand} · `}<span lang={p.officialNameLanguage}>{p.officialName}</span></p>}<div className="card-reason"><h4>{p.locale==='en'?'Role in your home':'暮らしでの役割'}</h4><p className="reason">{p.livingBenefit}</p></div><div className="card-actions"><Link className="detail-link" href={localizedPath(p.locale,`/products/${p.id}/`)}>{p.locale==='en'?'View details':'詳細を見る'}</Link><ShopLink product={p}/></div></article>;
}
