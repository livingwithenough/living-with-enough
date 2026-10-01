import type { Metadata } from 'next';
import { localeConfig, type Locale } from '@/i18n/routing';
import { brand } from './brand';
export const siteUrl = new URL(process.env.SITE_URL || 'http://127.0.0.1:3000');
export function seo(title: string, description: string, path: string, image = '/images/social.jpg', locale: Locale = 'ja'): Metadata {
  return { title, description, alternates:{canonical:path}, openGraph:{title,description,url:path,siteName:brand.name,locale:localeConfig[locale].openGraphLocale,type:'website',images:[{url:new URL(image,siteUrl).href}]},twitter:{card:'summary_large_image',title,description,images:[new URL(image,siteUrl).href]} };
}

