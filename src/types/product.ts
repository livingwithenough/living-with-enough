export const categories = ['Lighting', 'Furniture', 'Decor'] as const;
export type Category = typeof categories[number];
export type Product = {
  id: string; name: string; category: Category; price: number; image: string;
  shop: string; url: string; affiliateUrl: string; material: string; dimensions: string;
  tags: string[]; whySelected: string; caveats: string[]; status: 'candidate' | 'approved';
  isSample: boolean;
};
