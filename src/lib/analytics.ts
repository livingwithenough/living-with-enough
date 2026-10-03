import type { AuditEventName } from '@/types/audit';

type EventDetails = Record<string, string | number | boolean | undefined>;

/** 将来の分析サービス導入時は、この関数内だけを接続先に合わせて変更します。 */
export function trackEvent(name: AuditEventName, details: EventDetails = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('living-with-enough:event', { detail: { name, ...details } }));
}
