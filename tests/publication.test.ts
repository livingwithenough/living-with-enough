import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPublishedProduct } from '../src/lib/product-publication';
import { categoryLabels, categories } from '../src/types/product';
const base = { status: 'approved' as const, isSample: false, affiliateProvider: 'rakuten' as const, affiliateUrl: 'https://example.com/affiliate' };
test('Rakuten requires approval and a safe affiliate URL on all public surfaces', () => {
  assert.equal(isPublishedProduct(base), true);
  for (const item of [{ ...base, status: 'candidate' as const }, { ...base, affiliateUrl: '' }, { ...base, affiliateUrl: 'javascript:alert(1)' }, { ...base, affiliateUrl: 'http://example.com' }, { ...base, isSample: true }]) assert.equal(isPublishedProduct(item), false);
  assert.equal(isPublishedProduct({ ...base, affiliateProvider: 'a8' }), true);
});
test('every category has a Japanese display label without changing its key', () => {
  assert.equal(categoryLabels.Furniture, '家具');
  assert.equal(categoryLabels.Everyday, '暮らしの道具');
  for (const key of categories) assert.ok(categoryLabels[key]);
});
