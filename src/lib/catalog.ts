import type { Category, Product } from '@/types/product';
export const priceBands = ['all', 'up-to-10000', '10000-30000', '30000-100000', 'over-100000'] as const;
export type PriceBand = typeof priceBands[number];
export const approvedOnly = (items: Product[]) => items.filter(p => p.status === 'approved');
export function matchesPriceBand(price: number, band: PriceBand) {
  if (band === 'up-to-10000') return price <= 10000;
  if (band === '10000-30000') return price > 10000 && price <= 30000;
  if (band === '30000-100000') return price > 30000 && price <= 100000;
  if (band === 'over-100000') return price > 100000;
  return true;
}
export function filterProducts(items: Product[], category: Category | 'all', band: PriceBand = 'all') {
  return approvedOnly(items).filter(p => (category === 'all' || p.category === category) && matchesPriceBand(p.price, band));
}
export const yen = (price: number) => `¥${price.toLocaleString('ja-JP')}`;
export function purchaseUrl(p: Product) {
  if (p.isSample || p.status !== 'approved' || !p.affiliateUrl) return null;
  try { const u = new URL(p.affiliateUrl); return u.protocol === 'https:' ? u.href : null; } catch { return null; }
}
