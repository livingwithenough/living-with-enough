import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorialSections, groupCatalogProducts } from '../src/lib/catalog-editorial';
import type { Product } from '../src/types/product';

const ids = editorialSections.flatMap(section => [...section.products]);
const item = (id: string) => ({ id } as Product);

test('editorial order covers 24 unique products independently of registration order', () => {
  assert.equal(ids.length, 24);
  assert.equal(new Set(ids).size, 24);
  const reversed = [...ids].reverse().map(item);
  const before = reversed.map(product => product.id);
  const groups = groupCatalogProducts(reversed);
  assert.deepEqual(groups.map(group => group.title), editorialSections.map(section => section.title));
  assert.deepEqual(groups.flatMap(group => group.items.map(product => product.id)), ids);
  assert.deepEqual(reversed.map(product => product.id), before);
});

test('filtered subsets keep editorial order and omit empty sections', () => {
  const selected = ['tower-magnetic-hanger-rack-3623', 'flymee-umbra-picket-hook-8', 'mawa-economic-40p-20'];
  const groups = groupCatalogProducts(selected.map(item));
  assert.equal(groups.length, 1);
  assert.equal(groups[0].id, 'organize-space');
  assert.deepEqual(groups[0].items.map(product => product.id), [...selected].reverse());
});

test('unassigned products remain discoverable without duplicating assigned products', () => {
  const groups = groupCatalogProducts([item(ids[0]), item('future-product')]);
  assert.equal(groups.at(-1)?.id, 'other-products');
  assert.deepEqual(groups.flatMap(group => group.items.map(product => product.id)), [ids[0], 'future-product']);
});
