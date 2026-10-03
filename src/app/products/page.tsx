import { Catalog } from '@/components/catalog';
import { AffiliateNotice } from '@/components/affiliate-notice';
import { getApprovedProducts } from '@/lib/products';
import { seo } from '@/lib/seo';
export const metadata=seo('Japandiの商品を探す','日本の販売店で購入できるJapandiの家具と生活用品。素材や形、空間への作用とともに紹介します。','/products/');
export default function Products(){return <div className="page-shell"><AffiliateNotice/><div className="page-heading"><p className="eyebrow">Japandi pieces available in Japan</p><h1>Japandiの商品を探す</h1><p>素材、形、空間の使い方から、なぜJapandiに合うかを考える。</p></div><p className="sample-notice">掲載する6点を、自然素材と静かな余白のある暮らしにどう取り入れられるかという同じ基準で紹介しています。商品画像はA8.netの商品リンク機能で生成された広告素材です。</p><Catalog products={getApprovedProducts()}/></div>;}
