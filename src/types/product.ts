import type { Locale } from '@/i18n/routing';

// Future categories can be added here without changing the catalog filter.
// The UI only shows categories that are present in approved product data.
export const categories = ['Furniture', 'Lighting', 'Tableware', 'Textiles', 'Plants', 'Everyday'] as const;
export type Category = typeof categories[number];
export type ProductStatus = 'candidate' | 'approved';
export type AffiliateProvider = 'a8' | 'rakuten' | 'amazon' | 'other' | null;

export type PurchaseNotes = {
  availableInJapan: string;
  domesticShipping: string;
  paymentOptions: string;
  deliveryLeadTime: string;
  returnCancellationNotes: string;
  thingsToKnowBeforeBuying: string[];
};

// Storage model. English fields stay null until a human-reviewed translation exists.
export type ProductRecord = {
  id: string;
  productNameJa: string;
  productNameEn: string | null;
  displayNameJa: string;
  displayNameEn: string | null;
  livingBenefitJa: string;
  livingBenefitEn: string | null;
  japandiFitJa: string;
  japandiFitEn: string | null;
  caveatsJa: string[];
  caveatsEn: string[] | null;
  materialJa: string;
  materialEn: string | null;
  purchaseNotesJa: PurchaseNotes;
  purchaseNotesEn: PurchaseNotes | null;
  brand: string;
  category: Category;
  price: number;
  officialUrl: string;
  affiliateUrl: string;
  affiliateProvider: AffiliateProvider;
  image: string;
  a8BannerHtml: string | null;
  priceCheckedAt: string | null;
  status: ProductStatus;
  dimensions: string;
  modelNumber: string | null;
  shopNameJa: string;
  shopNameEn: string | null;
  tagsJa: string[];
  tagsEn: string[] | null;
  isSample: boolean;
};

// View model used by the existing pages. This keeps the Japanese UI unchanged.
export type Product = {
  id: string;
  locale: Locale;
  name: string;
  officialName: string;
  brand: string;
  category: Category;
  price: number;
  image: string;
  a8BannerHtml?: string | null;
  shop: string;
  officialUrl: string;
  affiliateUrl: string;
  affiliateProvider: AffiliateProvider;
  material: string;
  dimensions: string;
  modelNumber: string | null;
  tags: string[];
  livingBenefit: string;
  japandiFit: string;
  caveats: string[];
  purchaseNotes: PurchaseNotes;
  priceCheckedAt: string | null;
  status: ProductStatus;
  isSample: boolean;
};
