import { seo } from '@/lib/seo';
import { ReaderGuideIndex } from '@/components/reader-guide-index';
export const metadata={...seo('Practical guides for life in Japan','Practical guides to moving out, starting a home and choosing everyday tools in Japan.','/en/guides/',undefined,'en'),alternates:{canonical:'/en/guides/',languages:{ja:'/guides/',en:'/en/guides/','x-default':'/guides/'}},robots:{index:true,follow:true}};
export default function Page(){return <ReaderGuideIndex locale="en"/>;}
