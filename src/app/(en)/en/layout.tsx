import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { seo, siteUrl } from '@/lib/seo';
import '../../globals.css';
export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...seo('Furniture & Everyday Essentials in Japan | Living with Enough', 'An English guide to furniture and everyday essentials you can buy in Japan, selected for smaller spaces, long-term use and easier everyday living.', '/en/', undefined, 'en'),
  title: { default: 'Furniture & Everyday Essentials in Japan | Living with Enough', template: '%s | Living with Enough' },
};
export default function Layout({children}:{children:React.ReactNode}) { return <SiteShell locale="en">{children}</SiteShell>; }
