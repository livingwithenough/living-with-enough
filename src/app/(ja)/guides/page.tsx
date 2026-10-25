import { seo } from '@/lib/seo';
import { ReaderGuideIndex } from '@/components/reader-guide-index';
export const metadata={...seo('暮らしの目的から選ぶガイド','引っ越しの不用品整理、日本での新生活、長く使いたい道具を役割から考える実用ガイド。','/guides/',undefined,'ja'),alternates:{canonical:'/guides/',languages:{ja:'/guides/',en:'/en/guides/','x-default':'/guides/'}},robots:{index:true,follow:true}};
export default function Page(){return <ReaderGuideIndex locale="ja"/>;}
