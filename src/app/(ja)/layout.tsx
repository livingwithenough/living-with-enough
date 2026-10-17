import type { Metadata } from 'next';
import { siteUrl, seo } from '@/lib/seo';
import { brand } from '@/lib/brand';
import { SiteShell } from '@/components/site-shell';
import '../globals.css';
export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...seo(`${brand.name}｜${brand.tagline}`, brand.description, '/'),
  title: { default: `${brand.name}｜${brand.tagline}`, template: `%s | ${brand.name}` },
};
export default function Layout({children}:{children:React.ReactNode}) { return <SiteShell locale="ja">{children}</SiteShell>; }
