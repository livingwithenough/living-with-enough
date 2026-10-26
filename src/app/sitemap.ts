import { guideKeys,guideRoutes } from '@/data/reader-guides';
import type { MetadataRoute } from 'next';
import { furnitureGuide } from '@/data/furniture-guide';
import { getApprovedProducts } from '@/lib/products';
import { siteUrl } from '@/lib/seo';
import { localizedPath } from '@/i18n/routing';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {
  const paths=['/','/audit/','/products/','/about/','/affiliate-disclosure/','/guides/',...getApprovedProducts().map(p=>`/products/${p.id}/`)];
  const bilingual = paths.flatMap(path=>(['ja','en'] as const).map(locale=>({url:new URL(localizedPath(locale,path),siteUrl).href,alternates:{languages:{ja:new URL(path,siteUrl).href,en:new URL(localizedPath('en',path),siteUrl).href,'x-default':new URL(path,siteUrl).href}}})));
  const guides=guideKeys.flatMap(key=>(['ja','en'] as const).map(locale=>({url:new URL(guideRoutes[key][locale],siteUrl).href,alternates:{languages:{ja:new URL(guideRoutes[key].ja,siteUrl).href,en:new URL(guideRoutes[key].en,siteUrl).href,'x-default':new URL(guideRoutes[key].ja,siteUrl).href}}})));
  return [...bilingual,...guides, {url:new URL(furnitureGuide.path,siteUrl).href}];
}
