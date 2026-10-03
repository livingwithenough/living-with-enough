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
    slug: 'how-to-review-what-you-own',
    titleJa: '迷っているものを、一つずつ見直す',
    titleEn: null,
    descriptionJa: '残す、売る、預けるを決める前に確かめたいこと。',
    descriptionEn: null,
    published: false,
  },
  {
    slug: 'make-room-without-buying-storage',
    titleJa: '収納を買い足す前にできること',
    titleEn: null,
    descriptionJa: '今ある空間と定位置を見直し、ものを増やさずに整える。',
    descriptionEn: null,
    published: false,
  },
  {
    slug: 'choose-japandi-pieces-in-japan',
    titleJa: 'Japandiを、暮らしに合う基準で選ぶ',
    titleEn: null,
    descriptionJa: '色や雰囲気だけでなく、素材、寸法、国内配送から考える。',
    descriptionEn: null,
    published: false,
  },
];
