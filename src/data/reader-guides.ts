import editorialData from './editorial-products.json';
import { isEditorialPublishable } from '@/lib/editorial-validation';
import type { EditorialProduct } from '@/types/editorial-product';
import data from './reader-guides.json';
import type { Locale } from '@/i18n/routing';
export type GuideKey = keyof typeof data.routes;
export const guideKeys = Object.keys(data.routes) as GuideKey[];
export const guideRoutes = data.routes;
export const readerGuides = data.content;
export const editorialCheckedAt = data.checkedAt;
export const guideProducts=Object.fromEntries(guideKeys.map(key=>[key,[...new Set([...(key==='moving'?[]:data.products[key]),...(editorialData as EditorialProduct[]).filter(p=>isEditorialPublishable(p)&&p.features.some(f=>f===key)).map(p=>p.id)])]])) as Record<GuideKey,string[]>;
export function guideAtPath(path:string) { const p=path.endsWith('/')?path:path+'/'; return guideKeys.find(key=>Object.values(guideRoutes[key]).includes(p)); }
export function guidePath(key:GuideKey,locale:Locale) { return guideRoutes[key][locale]; }

export const guideCheckedAt=(key:GuideKey)=>data.checkedDates[key];
