import { Catalog } from '@/components/catalog';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { JapanResidentsNotice } from '@/components/japan-residents-notice';
import { getApprovedProducts } from '@/lib/products';
import { seo } from '@/lib/seo';
export const metadata=seo('Furniture & Home Essentials You Can Buy in Japan','Furniture for smaller apartments and everyday essentials in Japan, selected for practical roles, long-term use and easier routines.','/en/products/',undefined,'en');
export default function Products(){return <div className="page-shell"><AffiliateNotice locale="en"/><div className="page-heading"><h1>Buy less. Choose better.</h1><p>Furniture and everyday essentials selected for smaller spaces, long-term use, and easier everyday life in Japan.</p></div><JapanResidentsNotice/><Catalog products={getApprovedProducts('en')} locale="en"/><p className="common-price-note">Prices, stock and shipping charges may change. Check the retailer’s latest information before buying.</p></div>;}
