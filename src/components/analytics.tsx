'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { configureAnalytics, trackProductLink } from '@/lib/analytics';

export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    configureAnalytics(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
      process.env.NEXT_PUBLIC_GA4_HOSTNAME || 'living-with-enough.pages.dev', pathname);
  }, [pathname]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)) return;
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');
      if (anchor) trackProductLink(anchor);
    };
    document.addEventListener('click', click);
    document.addEventListener('auxclick', click);
    return () => { document.removeEventListener('click', click); document.removeEventListener('auxclick', click); };
  }, []);
  return null;
}
