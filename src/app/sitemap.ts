import type { MetadataRoute } from 'next';
import { getApprovedProducts } from '@/lib/products';
import { siteUrl } from '@/lib/seo';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['/', '/products/','/about/','/affiliate-disclosure/',...getApprovedProducts().map(p=>`/products/${p.id}/`)].map(path=>({url:new URL(path,siteUrl).href}));}
