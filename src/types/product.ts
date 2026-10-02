import type { Locale } from '@/i18n/routing';

export const categories = ['Furniture', 'Everyday'] as const;
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
  whySelectedJa: string;
  whySelectedEn: string | null;
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
