import type { Product } from '@/types/product';

// Catalog-only editorial order. Stored records and the home page selection stay unchanged.
export const editorialSections = [
  {
    id: 'lasting-furniture', title: '長く使う家具',
    description: '食事やくつろぎの中心に。寸法と素材を確かめ、暮らしに残したい一脚、一台を。',
    products: ['masterwal-wildwood-dining-table', 'woodlife-ysys-a3122', 'masterwal-tr-chair', 'woodlife-y83t76'],
  },
  {
    id: 'small-furniture', title: '小さく使える家具',
    description: 'たたむ、運ぶ、兼ねる。必要なときに役立ち、場所を使いすぎない家具。',
    products: ['flymee-lucano-step-stool-2', 'woodlife-g1-7236', 'masterwal-turm-stool', 'flymee-moheim-by-tray-table', 'masterwal-put-side-table', 'woodlife-sx-001', 'flymee-umbra-pillar-stool-coatrack', 'masterwal-mark-stool', 'masterwal-tango-side-table', 'woodlife-y84m05'],
  },
  {
    id: 'lighter-routines', title: '暮らしを軽くする道具',
    description: '干す、運ぶ、作業する。日々の家事を、今の空間で少し楽に。',
    products: ['tower-folding-drying-rack', 'flymee-dulton-folding-trolley', 'tower-leg-laundry-basket', 'tower-folding-stove-cover'],
  },
  {
    id: 'organize-space', title: '収納を増やさず整える',
    description: '床を空け、壁やクローゼットの余白を使って、持ち物の定位置を作る。',
    products: ['mawa-economic-40p-20', 'flymee-umbra-picket-hook-8', 'tower-magnetic-hanger-rack-3623'],
  },
  {
    id: 'daily-essentials', title: '毎日使うもの',
    description: '使う頻度と洗濯のしやすさから、必要な枚数と大きさを考える。',
    products: ['true-towel-classic-sugoi-mini-bath-towel', 'hiorie-hotel-big-face-towel', 'true-towel-classic-sugoi-face-towel'],
  },
] as const;

export function groupCatalogProducts(products: Product[]) {
  const byId = new Map(products.map(product => [product.id, product]));
  const assigned = new Set<string>();
  const groups = editorialSections.map(section => ({
    ...section,
    items: section.products.flatMap(id => {
      const product = byId.get(id);
      if (!product || assigned.has(id)) return [];
      assigned.add(id);
      return [product];
    }),
  })).filter(section => section.items.length > 0);
  // New records without an editorial assignment must remain discoverable.
  const other = products.filter(product => !assigned.has(product.id));
  return [
    ...groups,
    ...(other.length ? [{ id: 'other-products', title: 'そのほかの暮らしの道具', description: '使う場所と役割から、必要なものを選びます。', items: other }] : []),
  ];
}
