import 'server-only';
import { products } from '@/data/products';
import { approvedOnly } from './catalog';
export const getApprovedProducts = () => approvedOnly(products);
export const getApprovedProduct = (id: string) => getApprovedProducts().find(p => p.id === id);
