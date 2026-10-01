import { Catalog } from '@/components/catalog';
import { getApprovedProducts } from '@/lib/products';
import { seo } from '@/lib/seo';
export const metadata=seo('商品一覧','素材や使い方、選んだ理由と気になる点を読み、暮らしに必要なものを考える。カテゴリー・価格で絞り込めます。','/products/');
export default function Products(){return <div className="page-shell"><div className="page-heading"><p className="eyebrow">暮らしに合う、ひとつを</p><h1>商品を探す</h1><p>今あるものと、どう使うか。選んだ理由と気になる点から考える。</p></div><p className="sample-notice">掲載中の3件は架空のサンプルです。画像はAIによるイメージで、購入はできません。</p><Catalog products={getApprovedProducts()}/></div>;}
