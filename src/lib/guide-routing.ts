import { languageAlternate, type Locale } from '@/i18n/routing';
import guideRoutes from '@/data/reader-guide-routes.json';
/** Only actual translations receive counterpart links; the furniture article remains English-only. */
export function guideSwitchDestination(path:string,target:Locale) {
 const normalized=path.endsWith('/')?path:path+'/';
 const key=(Object.keys(guideRoutes) as Array<keyof typeof guideRoutes>).find(k=>Object.values(guideRoutes[k]).includes(normalized));if(key)return guideRoutes[key][target];
 if(['/guides','/guides/','/en/guides','/en/guides/'].includes(path))return target==='en'?'/en/guides/':'/guides/';
 if(path.startsWith('/guides'))return '/en/';
 if(path.startsWith('/en/guides/'))return '/';
 return languageAlternate(path,target);
}
