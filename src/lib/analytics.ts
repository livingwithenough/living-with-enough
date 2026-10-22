import type { AuditEventName } from '@/types/audit';

type EventDetails = Record<string, string | number | boolean | undefined>;
type Consent = 'granted' | 'denied';
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
const consentKey = 'lwe:analytics-consent:v1';
let consent: Consent = 'denied';
let measurementId = '';
let hostname = '';
let initialized = false;
let lastPage = '';
let currentPath = '/';

export function analyticsContext(path: string) {
  const locale = path === '/en' || path.startsWith('/en/') ? 'en' : 'ja';
  const localPath = locale === 'en' ? path.slice(3) || '/' : path;
  const source = localPath === '/' ? 'home' : localPath.startsWith('/audit') ? 'audit'
    : /^\/products\/[^/]+/.test(localPath) ? 'product_detail'
    : localPath.startsWith('/products') ? 'product_list'
    : localPath.startsWith('/guides') ? 'guide' : 'page';
  return { locale, source };
}

export function getAnalyticsConsent(): Consent {
  if (typeof window === 'undefined') return 'denied';
  try { return window.localStorage.getItem(consentKey) === 'granted' ? 'granted' : 'denied'; }
  catch { return consent; }
}

function allowed() {
  return typeof window !== 'undefined' && consent === 'granted'
    && /^G-[A-Z0-9]+$/.test(measurementId) && window.location.hostname === hostname;
}

function safeReferrer() {
  try { const url = new URL(document.referrer); return url.origin + url.pathname; }
  catch { return ''; }
}

function google() {
  if (!allowed()) return undefined;
  const w = window as AnalyticsWindow;
  if (!initialized) {
    // Fail closed if another installation owns Google tracking. Never install a second tag.
    if (w.gtag || document.querySelector('script[src*="googletagmanager.com"],script[src*="google-analytics.com"]')) return undefined;
    initialized = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('consent', 'update', { analytics_storage: 'granted' });
    w.gtag('js', new Date());
    w.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false, cookie_domain: 'none',
      page_location: window.location.origin + currentPath, page_referrer: safeReferrer() });
    const script = document.createElement('script');
    script.id = 'lwe-ga4'; script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
  return w.gtag;
}

function pageView() {
  const gtag = google();
  if (!gtag || lastPage === currentPath) return;
  lastPage = currentPath;
  gtag('event', 'page_view', { ...analyticsContext(currentPath), page_path: currentPath,
    page_location: window.location.origin + currentPath, page_referrer: safeReferrer(), send_to: measurementId });
}

/** Static export: public values are supplied by the client component at build time. */
export function configureAnalytics(id: string, allowedHostname: string, path: string) {
  measurementId = id; hostname = allowedHostname;
  currentPath = path.split(/[?#]/)[0] || '/';
  consent = getAnalyticsConsent();
  pageView();
}

export function setAnalyticsConsent(value: Consent) {
  consent = value;
  try { window.localStorage.setItem(consentKey, value); } catch { /* Honor the in-memory choice. */ }
  const w = window as unknown as AnalyticsWindow & Record<string, unknown>;
  if (initialized) {
    w[`ga-disable-${measurementId}`] = value !== 'granted';
    // Stop sends on refusal rather than sending cookieless pings.
    if (value === 'granted') w.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  }
  if (value === 'granted') pageView();
  window.dispatchEvent(new CustomEvent('living-with-enough:consent-changed'));
}

export function trackEvent(name: AuditEventName, details: EventDetails = {}) {
  if (typeof window === 'undefined') return;
  const payload = { ...analyticsContext(currentPath), ...details };
  // Preserve local integrations with no ID, no consent, blocked scripts or an existing tag.
  window.dispatchEvent(new CustomEvent('living-with-enough:event', { detail: { name, ...payload } }));
  const gtag = google();
  if (gtag) gtag('event', name, { ...payload, page_location: window.location.origin + currentPath,
    page_path: currentPath, page_referrer: safeReferrer(), send_to: measurementId });
}

/** Observe issued HTML from its wrapper; never rewrite creatives or navigation. */
export function trackProductLink(anchor: HTMLAnchorElement) {
  const marked = anchor.closest<HTMLElement>('[data-measure-link]');
  const product = anchor.closest<HTMLElement>('[data-measure-product]');
  if (!product) return;
  const details = { product: product.dataset.measureProduct, category: product.dataset.measureCategory,
    affiliate_provider: product.dataset.measureProvider, placement: marked?.dataset.measureLink };
  if (marked) trackEvent('affiliate_click', details);
  else {
    const url = new URL(anchor.href, window.location.origin);
    if (url.origin === window.location.origin && /^\/(en\/)?products\/[^/]+\/$/.test(url.pathname))
      trackEvent('product_click', { ...details, placement: 'product_detail_link' });
  }
}

