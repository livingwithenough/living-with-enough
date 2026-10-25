import type { Metadata } from 'next';
import { guideRoutes, readerGuides, editorialCheckedAt, type GuideKey } from '@/data/reader-guides';
import type { Locale } from '@/i18n/routing';
import { siteUrl } from '@/lib/seo';
export function readerMetadata(key:GuideKey,locale:Locale):Metadata {
 const c=readerGuides[key][locale],r=guideRoutes[key];const canonical=new URL(r[locale],siteUrl).href;
 return {title:c.title,description:c.description,robots:{index:true,follow:true},alternates:{canonical,languages:{ja:new URL(r.ja,siteUrl).href,en:new URL(r.en,siteUrl).href,'x-default':new URL(r.ja,siteUrl).href}},openGraph:{type:'article',title:c.title,description:c.description,url:canonical,locale:locale==='en'?'en_US':'ja_JP',siteName:'Living with Enough',images:[new URL('/images/social.jpg',siteUrl).href]}};
}
export function readerSchema(key:GuideKey,locale:Locale) {const c=readerGuides[key][locale],url=new URL(guideRoutes[key][locale],siteUrl).href;return {'@context':'https://schema.org','@graph':[{'@type':'Article',headline:c.title,description:c.description,inLanguage:locale,dateModified:editorialCheckedAt,mainEntityOfPage:url,author:{'@type':'Organization',name:'Living with Enough',url:new URL(locale==='en'?'/en/about/':'/about/',siteUrl).href}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:locale==='en'?'Home':'TOP',item:new URL(locale==='en'?'/en/':'/',siteUrl).href},{'@type':'ListItem',position:2,name:locale==='en'?'Guides':'ガイド',item:new URL(locale==='en'?'/en/guides/':'/guides/',siteUrl).href},{'@type':'ListItem',position:3,name:c.title,item:url}]}]};}
