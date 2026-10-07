import type { Product, ProductRecord } from '@/types/product';

// A single publication gate for every catalog surface and static route.
export function isPublishedProduct(product: Pick<Product | ProductRecord, 'status' | 'isSample' | 'affiliateProvider' | 'affiliateUrl'>) {
  if (product.status !== 'approved' || product.isSample) return false;
  if (product.affiliateProvider !== 'rakuten') return true;
  try { return new URL(product.affiliateUrl).protocol === 'https:'; } catch { return false; }
}
