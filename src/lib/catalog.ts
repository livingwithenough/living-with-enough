import type { Category, Product } from '@/types/product';
export const approvedOnly = (items: Product[]) => items.filter(p => p.status === 'approved');
export function filterProducts(items: Product[], category: Category | 'all', ceiling: number | null) {
  return approvedOnly(items).filter(p => (category === 'all' || p.category === category) && (ceiling === null || p.price < ceiling));
}
export const yen = (price: number) => `¥${price.toLocaleString('ja-JP')}`;
export function purchaseUrl(p: Product) {
  if (p.isSample || p.status !== 'approved' || !p.affiliateUrl) return null;
  try { const u = new URL(p.affiliateUrl); return u.protocol === 'https:' ? u.href : null; } catch { return null; }
}
