import { ProductDetailContent } from '@/components/product-detail-content';
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
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id,'en');return p?seo(p.editorial?`${p.name} — Everyday Essentials in Japan`:`${p.name} — Furniture & Essentials in Japan`,p.livingBenefit,`/en/products/${p.id}/`,p.image,'en'):{};}
export default async function Detail({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id,'en');if(!p)notFound();return <ProductDetailContent product={p}/>;}
