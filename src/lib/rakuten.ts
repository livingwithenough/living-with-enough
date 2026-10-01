import 'server-only';
import type { Product } from '@/types/product';
// Reserved for a future server-side import job. No API calls or automatic publication in v0.1.
export function getRakutenConfig() {
  const { RAKUTEN_APPLICATION_ID, RAKUTEN_ACCESS_KEY, RAKUTEN_AFFILIATE_ID } = process.env;
  if (!RAKUTEN_APPLICATION_ID || !RAKUTEN_ACCESS_KEY || !RAKUTEN_AFFILIATE_ID) throw new Error('楽天のサーバー設定が不足しています。');
  return { applicationId: RAKUTEN_APPLICATION_ID, accessKey: RAKUTEN_ACCESS_KEY, affiliateId: RAKUTEN_AFFILIATE_ID };
}
export function asCandidate(input: Omit<Product, 'status' | 'isSample'>): Product {
  return { ...input, status: 'candidate', isSample: false };
}
