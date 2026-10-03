export type GuideSummary = {
  slug: string;
  titleJa: string | null;
  titleEn: string | null;
  descriptionJa: string | null;
  descriptionEn: string | null;
  published: boolean;
};

// Draft guide records are not linked as articles or included in the sitemap.
export const guideSummaries: GuideSummary[] = [
  {
    slug: 'where-to-buy-japandi-furniture-in-japan',
    titleJa: null,
    titleEn: 'Where to buy Japandi furniture in Japan',
    descriptionJa: '日本の販売店と国内配送を前提に、購入先を比較するためのガイド。',
    descriptionEn: null,
    published: false,
  },
  {
    slug: 'japandi-furniture-small-apartments-japan',
    titleJa: null,
    titleEn: 'Japandi furniture for small apartments in Japan',
    descriptionJa: '限られた空間に余白を残す、サイズと機能の選び方。',
    descriptionEn: null,
    published: false,
  },
  {
    slug: 'oak-and-rattan-japandi',
    titleJa: 'オークとラタンでつくるJapandi',
    titleEn: null,
    descriptionJa: '色をそろえるだけではなく、素材の組み合わせから考える。',
    descriptionEn: null,
    published: false,
  },
];
