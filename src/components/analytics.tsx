'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { configureAnalytics, getAnalyticsConsent, setAnalyticsConsent, trackProductLink } from '@/lib/analytics';

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
    const storage = (event: StorageEvent) => {
      if (event.key === 'lwe:analytics-consent:v1' || event.key === null)
        setAnalyticsConsent(getAnalyticsConsent());
    };
    window.addEventListener('storage', storage);
    // Observe before Next Link prevents native navigation during React bubbling.
    document.addEventListener('click', click, true);
    document.addEventListener('auxclick', click, true);
    return () => { window.removeEventListener('storage', storage); document.removeEventListener('click', click, true); document.removeEventListener('auxclick', click, true); };
  }, []);
  return null;
}
