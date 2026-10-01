import 'server-only';
import { products } from '@/data/products';
import { defaultLocale, type Locale } from '@/i18n/routing';
import { localizeProduct } from './localize-product';

export const getApprovedProducts = (locale: Locale = defaultLocale) =>
  products
    .filter(product => product.status === 'approved')
    .map(product => localizeProduct(product, locale))
    .filter(product => product !== null);

export const getApprovedProduct = (id: string, locale: Locale = defaultLocale) =>
  getApprovedProducts(locale).find(product => product.id === id);
