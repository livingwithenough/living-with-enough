import type { Locale } from '@/i18n/routing';
import type { Product, ProductRecord } from '@/types/product';

export function hasLocaleContent(product: ProductRecord, locale: Locale) {
  if (locale === 'ja') return true;
  return Boolean(
    product.productNameEn &&
      product.whySelectedEn &&
      product.caveatsEn?.length &&
      product.materialEn &&
      product.purchaseNotesEn &&
      product.shopNameEn &&
      product.tagsEn,
  );
}

export function localizeProduct(product: ProductRecord, locale: Locale): Product | null {
  if (!hasLocaleContent(product, locale)) return null;

  const isJapanese = locale === 'ja';
  return {
    id: product.id,
    locale,
    name: isJapanese ? product.productNameJa : product.productNameEn!,
    brand: product.brand,
    category: product.category,
    price: product.price,
    image: product.image,
    shop: isJapanese ? product.shopNameJa : product.shopNameEn!,
    officialUrl: product.officialUrl,
    affiliateUrl: product.affiliateUrl,
    affiliateProvider: product.affiliateProvider,
    material: isJapanese ? product.materialJa : product.materialEn!,
    dimensions: product.dimensions,
    tags: isJapanese ? product.tagsJa : product.tagsEn!,
    whySelected: isJapanese ? product.whySelectedJa : product.whySelectedEn!,
    caveats: isJapanese ? product.caveatsJa : product.caveatsEn!,
    purchaseNotes: isJapanese ? product.purchaseNotesJa : product.purchaseNotesEn!,
    priceCheckedAt: product.priceCheckedAt,
    status: product.status,
    isSample: product.isSample,
  };
}
