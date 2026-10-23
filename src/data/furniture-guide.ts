export const furnitureGuide = {
  path: '/en/guides/where-to-buy-quality-furniture-in-japan/',
  title: 'Where to Buy Quality Furniture in Japan',
  description: 'Compare furniture shops in Japan, solid-wood and space-saving options, delivery, assembly and returns. A practical guide for people living in Japan.',
  checkedAt: '2026-10-23',
  productIds: ['masterwal-wildwood-dining-table', 'woodlife-g1-7236', 'masterwal-mark-stool', 'flymee-moheim-by-tray-table', 'flymee-dulton-folding-trolley'],
} as const;

// Editorial notes reference existing approved products; no advertising URL or creative is copied here.
export const furnitureExamples = [
  { id: 'masterwal-wildwood-dining-table', heading: 'One table for meals and work',
    benefit: 'The WILDWOOD combines a solid-wood top with steel legs. If a dining table will also be your work surface, compare both activities before buying a separate desk.',
    caution: 'The linked configuration is 120 × 100cm, so its depth deserves attention in a small room. Allow space for people and pulled-out chairs; confirm the finish, care, selected price and production lead time.' },
  { id: 'woodlife-g1-7236', heading: 'A dining surface that expands when needed',
    benefit: 'The G1-7236 has an expanding top: the smaller version changes from 90 to 120cm wide. This can be useful when an occasional larger surface matters more than keeping a large table open every day.',
    caution: 'The legs are not confirmed to fold. Height is 76cm; check your seat height and legroom. The official page showed a special-order estimate of about 40–60 business days when checked, not immediate delivery. Size and assembly options affect the final total.' },
  { id: 'masterwal-mark-stool', heading: 'Extra seating that stacks',
    benefit: 'The MARK stool can stack up to four high, keeping occasional guest seats together rather than spread around the room. The recorded footprint is 38 × 38cm and the seat height is 44cm.',
    caution: 'Choose somewhere to keep the stack, and check whether a backless seat suits the time you will spend sitting. Confirm your wood, upholstery and price rather than treating the lowest listed variant as the cost of every stool.' },
  { id: 'flymee-moheim-by-tray-table', heading: 'A tray and side table in one',
    benefit: 'The MOHEIM BY has a removable tray and a 43 × 43cm footprint. It can take drinks from one place to another and provide a small surface beside a chair, without buying a separate serving tray and table.',
    caution: 'Check its 53.5cm height against the seat you already own. The selected white version showed normal doorstep delivery when checked; do not assume assembly or placement in your room is included.' },
  { id: 'flymee-dulton-folding-trolley', heading: 'A trolley to put away between uses',
    benefit: 'The DULTON H11907 offers a movable surface for serving or kitchen preparation and folds to about 7.5cm deep. It may make more sense than a permanent extra cabinet if you have a safe place to store it.',
    caution: 'Its open size is 69 × 40.5cm, with a height of 69cm. Check clearance, the folded height, load limits and the floor you will move it across. Confirm assembly and delivery for your chosen color.' },
] as const;

export const furnitureSources = {
  masterwal: 'https://www.masterwal.jp/shop/pages/shopping_guide01.aspx',
  flymee: 'https://flymee.jp/guide/48/',
  woodlife: 'https://www.woodlife.jp/guides/return',
  ikea: 'https://www.ikea.com/jp/en/customer-service/services/delivery/',
  nitori: 'https://www.nitori-net.jp/ec/characteristic/shipping-perks/',
  muji: 'https://www.muji.com/jp/shop/service-list/',
} as const;
