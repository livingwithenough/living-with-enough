import type { Metadata } from 'next';
import { languageAlternate, localeConfig, type Locale } from '@/i18n/routing';
import { brand } from './brand';
export const siteUrl = new URL(process.env.SITE_URL || 'https://living-with-enough.pages.dev');
export function seo(title: string, description: string, path: string, image = '/images/social.jpg', locale: Locale = 'ja'): Metadata {
  return { title, description, alternates:{canonical:path,languages:path.startsWith('/guides')?undefined:{ja:languageAlternate(path,'ja'),en:languageAlternate(path,'en'),'x-default':languageAlternate(path,'ja')}}, openGraph:{title,description,url:path,siteName:brand.name,locale:localeConfig[locale].openGraphLocale,type:'website',images:[{url:new URL(image,siteUrl).href}]},twitter:{card:'summary_large_image',title,description,images:[new URL(image,siteUrl).href]} };
}

