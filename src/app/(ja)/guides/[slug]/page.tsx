import { notFound } from 'next/navigation';
import { guideKeys,guideRoutes } from '@/data/reader-guides';
import { readerMetadata } from '@/lib/reader-seo';
import { ReaderGuide } from '@/components/reader-guide';
export const dynamicParams=false;
const locale='ja' as const;
export function generateStaticParams(){return guideKeys.map(k=>({slug:guideRoutes[k][locale].split('/').filter(Boolean).at(-1)!}));}
function keyFor(slug:string){return guideKeys.find(k=>guideRoutes[k][locale].split('/').filter(Boolean).at(-1)===slug);}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const k=keyFor((await params).slug);return k?readerMetadata(k,locale):{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const k=keyFor((await params).slug);if(!k)notFound();return <ReaderGuide guideKey={k} locale={locale}/>;}
