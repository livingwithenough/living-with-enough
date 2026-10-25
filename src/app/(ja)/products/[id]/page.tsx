import { ProductDetailContent } from '@/components/product-detail-content';
import Link from 'next/link';
import { categoryLabels } from '@/types/product';
import { notFound } from 'next/navigation';
import { getApprovedProduct,getApprovedProducts } from '@/lib/products';
import { yen } from '@/lib/catalog';
import { seo } from '@/lib/seo';
import { ProductImage, ShopLink } from '@/components/product-card';
import { AffiliateNotice } from '@/components/affiliate-notice';
export const dynamicParams=false;
export function generateStaticParams(){return getApprovedProducts().map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id);if(!p)return {};return seo(`${p.name}｜${p.officialName}`,p.livingBenefit,`/products/${p.id}/`,p.image);}
export default async function Detail({params}:{params:Promise<{id:string}>}){const p=getApprovedProduct((await params).id);if(!p)notFound();return <ProductDetailContent product={p}/>;}
