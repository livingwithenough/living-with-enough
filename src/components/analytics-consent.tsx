'use client';
import { useEffect, useState } from 'react';
import { getAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics';

/** Optional analytics settings live on the existing disclosure page; no banner or design changes. */
export function AnalyticsConsent({ locale }: { locale: 'ja' | 'en' }) {
  const en = locale === 'en';
  const configured = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '');
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    const sync = () => setGranted(getAnalyticsConsent() === 'granted');
    sync(); window.addEventListener('living-with-enough:consent-changed', sync);
    return () => window.removeEventListener('living-with-enough:consent-changed', sync);
  }, []);
  return <section aria-labelledby="analytics-settings">
    <h2 id="analytics-settings">{en ? 'Optional analytics and privacy' : '任意のアクセス解析とプライバシー'}</h2>
    <p>{en
      ? 'With your permission, Google Analytics 4 helps us improve the site by measuring page visits, language, review starts and completions, and clicks on product and advertising links. Google LLC receives page paths, events, cookie identifiers and device/network information (including the IP address used in transmission). We do not send your name, email address, free text or advertising destination URLs. Query strings and fragments are removed from the page URLs we send. Analytics data does not confirm purchases or affiliate revenue.'
      : '同意いただいた場合のみ、サイト改善のためGoogle Analytics 4を使い、ページ閲覧、表示言語、診断の開始・完了、商品・広告リンクのクリックを計測します。Google LLCへページのパス、イベント、Cookie識別子、端末・通信情報（通信時のIPアドレスを含む）が送信されます。氏名、メールアドレス、自由入力、広告の遷移先URLは送りません。送信するページURLのクエリとフラグメントは除きます。アクセス解析だけで購入や確定報酬を確認することはできません。'}</p>
    <p>{en
      ? 'Analytics is off until you opt in. Your choice is saved only in this browser and can be changed here. Refusal does not affect the review tool or product links. These settings control our GA4 measurement, not the affiliate materials already supplied by A8.net or Rakuten, or the external retailer sites.'
      : '初期設定は解析しない状態です。選択はこのブラウザ内に保存され、このページで変更できます。拒否しても診断や商品リンクは利用できます。この設定は当サイトのGA4計測を対象とし、A8.net・楽天が提供する既存の広告素材や外部の販売サイトを制御するものではありません。'}</p>
    <p><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{en ? 'Google Privacy Policy' : 'Googleのプライバシーポリシー'}</a>{' / '}<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">{en ? 'How Google uses information from partner sites' : 'Googleによるパートナーサイトの情報の利用'}</a></p>
    {configured ? <><p role="status">{en ? `Analytics: ${granted ? 'allowed' : 'not allowed'}` : `アクセス解析：${granted ? '許可' : '許可しない'}`}</p><div className="audit-controls">
      <button className="text-button" aria-pressed={granted} onClick={() => setAnalyticsConsent('granted')}>{en ? 'Allow analytics' : 'アクセス解析を許可する'}</button>
      <button className="text-button" aria-pressed={!granted} onClick={() => setAnalyticsConsent('denied')}>{en ? 'Do not allow analytics' : 'アクセス解析を許可しない'}</button>
    </div></> : <p>{en ? 'Analytics is currently disabled because no measurement ID is configured.' : '現在は測定IDが未設定のため、アクセス解析は無効です。'}</p>}
  </section>;
}
