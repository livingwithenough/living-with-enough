import type { MetadataRoute } from 'next';
import { furnitureGuide } from '@/data/furniture-guide';
import { getApprovedProducts } from '@/lib/products';
import { siteUrl } from '@/lib/seo';
import { localizedPath } from '@/i18n/routing';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {
  const paths=['/','/audit/','/products/','/about/','/affiliate-disclosure/',...getApprovedProducts().map(p=>`/products/${p.id}/`)];
  const bilingual = paths.flatMap(path=>(['ja','en'] as const).map(locale=>({url:new URL(localizedPath(locale,path),siteUrl).href,alternates:{languages:{ja:new URL(path,siteUrl).href,en:new URL(localizedPath('en',path),siteUrl).href,'x-default':new URL(path,siteUrl).href}}})));
  return [...bilingual, {url:new URL(furnitureGuide.path,siteUrl).href}];
}
