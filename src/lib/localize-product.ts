import type { Locale } from '@/i18n/routing';
import type { Product, ProductRecord } from '@/types/product';

export function hasLocaleContent(product: ProductRecord, locale: Locale) {
  if (locale === 'ja') return true;
  return Boolean(
    product.displayNameEn &&
      product.livingBenefitEn &&
      product.caveatsEn?.length &&
      product.materialEn &&
      product.dimensionsEn &&
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
    name: isJapanese ? product.displayNameJa : product.displayNameEn!,
    officialName: isJapanese ? product.productNameJa : (product.productNameEn || product.productNameJa),
    officialNameLanguage: isJapanese || !product.productNameEn ? 'ja' : 'en',
    brand: product.brand,
    category: product.category,
    price: product.price,
    priceLabel: isJapanese ? product.priceLabel : product.priceLabelEn,
    image: product.image,
    a8BannerHtml: product.a8BannerHtml,
    a8TextHtml: product.a8TextHtml,
    shop: isJapanese ? product.shopNameJa : product.shopNameEn!,
    officialUrl: product.officialUrl,
    affiliateUrl: product.affiliateUrl,
    affiliateProvider: product.affiliateProvider,
    material: isJapanese ? product.materialJa : product.materialEn!,
    dimensions: isJapanese ? product.dimensions : product.dimensionsEn!,
    modelNumber: product.modelNumber,
    tags: isJapanese ? product.tagsJa : product.tagsEn!,
    livingBenefit: isJapanese ? product.livingBenefitJa : product.livingBenefitEn!,
    japandiFit: isJapanese ? product.japandiFitJa : (product.japandiFitEn || ''),
    caveats: isJapanese ? product.caveatsJa : product.caveatsEn!,
    purchaseNotes: isJapanese ? product.purchaseNotesJa : product.purchaseNotesEn!,
    priceCheckedAt: product.priceCheckedAt,
    status: product.status,
    isSample: product.isSample,
  };
}
