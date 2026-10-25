import Link from 'next/link';
import type { Product } from '@/types/product';
import { categoryLabels } from '@/types/product';
import { categoryLabelsEn } from '@/i18n/catalog';
import { localizedPath } from '@/i18n/routing';
import { yen } from '@/lib/catalog';
import { ProductImage,ShopLink } from './product-card';
import { AffiliateNotice } from './affiliate-notice';
export function ProductDetailContent({product:p}:{product:Product}) {
 const en=p.locale==='en',n=p.purchaseNotes,path=(s:string)=>localizedPath(p.locale,s);
 const care=[...n.thingsToKnowBeforeBuying,...p.caveats].filter(t=>/手入れ|洗濯|オイル|研磨|care|wash|oil|clean|finish/i.test(t));
 const labels=en?categoryLabelsEn:categoryLabels;
 return <div className="page-shell"><AffiliateNotice locale={p.locale}/><nav className="breadcrumbs" aria-label={en?'Breadcrumb':'パンくず'}><Link href={path('/')}>{en?'Home':'TOP'}</Link><span>/</span><Link href={path('/products/')}>{en?'Products':'商品一覧'}</Link><span>/</span><span>{labels[p.category]}</span></nav>
 <article className="detail"><div><ProductImage product={p} detail/>{p.a8BannerHtml&&<p className="small">{en?'The image is an advertising link to the retailer.':'商品画像は販売先へ移動する広告リンクです。'}</p>}</div><div className="detail-copy"><p className="eyebrow">{labels[p.category]} · {p.brand}</p><h1>{p.name}</h1><div className="official-product"><p>{en?(p.officialNameLanguage==='ja'?'Japanese product name:':'Product name:'):'正式商品名：'} <span lang={p.officialNameLanguage}>{p.officialName}</span></p>{p.modelNumber&&<p>{en?'Model: ':'型番：'}{p.modelNumber}</p>}</div>
 <p className="detail-price">{p.priceLabel??yen(p.price)}</p><p className="small">{en?'Price checked: ':'価格確認日：'}{p.priceCheckedAt||(en?'Not recorded':'未記録')}{en?'. Prices, stock and shipping may change. Confirm the selected specification and total before buying.':'。価格・在庫・送料は変動します。仕様別の価格と総額を販売先でご確認ください。'}</p>
 <div className="purchase-important"><h2>{en?'Important before you order':'注文前に確認'}</h2><ul>{n.thingsToKnowBeforeBuying.slice(0,2).map(t=><li key={t}>{t}</li>)}</ul></div><div className="detail-purchase"><p>{en?'External retailer · Advertising':'外部の販売サイトへ・PR'}</p><ShopLink product={p}/></div>
 <section><h2>{en?'Role in your home':'暮らしでの役割'}</h2><p>{p.livingBenefit}</p></section><dl>{[[en?'Dimensions':'寸法',p.dimensions],[en?'Material':'素材',p.material],[en?'Retailer':'販売元',p.shop],[en?'Availability':'販売状況',n.availableInJapan],[en?'Lead time':'納期',n.deliveryLeadTime],[en?'Shipping':'配送',n.domesticShipping],[en?'Payment':'支払方法',n.paymentOptions],[en?'Returns / cancellation':'返品・キャンセル',n.returnCancellationNotes]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
 <section><h2>{en?'Care and longer use':'手入れと、長く使うために'}</h2>{care.length?<ul>{Array.from(new Set(care)).map(t=><li key={t}>{t}</li>)}</ul>:<p>{en?'Model-specific care and repair details are not recorded. Before purchase, ask the maker for instructions suitable for the material and finish, and confirm repair or replacement-part availability.':'型番別の手入れ・修理情報は未記録です。購入前に材質・仕上げに合う手順と、修理・交換部材の有無をメーカーへ確認してください。'}</p>}</section>
 <section><h2>{en?'Check whether it suits you':'合わない使い方がないか確認'}</h2><p>{en?'If your existing belongings already do this job, you may not need to add this item.':'今あるもので役割を満たせるなら、買い足す必要はありません。'}</p><ul>{Array.from(new Set([...n.thingsToKnowBeforeBuying,...p.caveats])).map(t=><li key={t}>{t}</li>)}</ul></section><p className="small">{en?'Retailer checkout and support may be primarily in Japanese. ':'販売サイトの最新条件を優先してください。'}<Link href={path('/affiliate-disclosure/')}>{en?'Affiliate disclosure':'広告について'}</Link></p></div></article></div>;
}
