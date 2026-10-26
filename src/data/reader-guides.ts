import data from './reader-guides.json';
import type { Locale } from '@/i18n/routing';
export type GuideKey = keyof typeof data.routes;
export const guideKeys = Object.keys(data.routes) as GuideKey[];
export const guideRoutes = data.routes;
export const readerGuides = data.content;
export const editorialCheckedAt = data.checkedAt;
export const guideProducts = data.products;
export function guideAtPath(path:string) { const p=path.endsWith('/')?path:path+'/'; return guideKeys.find(key=>Object.values(guideRoutes[key]).includes(p)); }
export function guidePath(key:GuideKey,locale:Locale) { return guideRoutes[key][locale]; }
