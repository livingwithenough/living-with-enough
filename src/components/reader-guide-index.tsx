import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { guideKeys,guideRoutes,readerGuides } from '@/data/reader-guides';
import { furnitureGuide } from '@/data/furniture-guide';
export function ReaderGuideIndex({locale}:{locale:Locale}) {const en=locale==='en';return <div className="reader-guide page-shell"><h1>{en?'Practical guides for life in Japan':'暮らしの目的から選ぶガイド'}</h1><p>{en?'Start with what you need to solve. Buying comes after reviewing what you have.':'今あるものを見直し、困っていることから一つずつ。買うのは本当に必要な場合だけ。'}</p><div className="pathway-grid">{guideKeys.map(k=><article key={k}><h2><Link href={guideRoutes[k][locale]}>{readerGuides[k][locale].title}</Link></h2><p>{readerGuides[k][locale].description}</p></article>)}</div>{en&&<p><Link className="text-link" href={furnitureGuide.path}>{furnitureGuide.title} →</Link></p>}</div>;}
