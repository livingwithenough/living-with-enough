import { visibleAuditServices } from '@/data/audit-services';
import { serviceGuideNotes } from '@/data/service-guide';
import { englishServices } from '@/i18n/audit';
import type { Locale } from '@/i18n/routing';
export function ServiceOptions({kind,locale}:{kind:'sell'|'store'|'outsource';locale:Locale}) {
 const en=locale==='en';
 const items=kind==='sell'?['instruments','audio','clothes-bags'] as const:kind==='store'?['clothes-bags'] as const:['other'] as const;
 const services=items.flatMap(item=>visibleAuditServices(kind,item));
 return <div className="reader-services"><p className="small">{en?'Advertising · Only currently approved and published services. Confirm the fit before applying.':'PR・広告：既存の承認済み・公開中サービスだけを案内しています。申込前に条件を確認してください。'}</p>{services.map(s=>{
 const n=serviceGuideNotes[s.id]?.[locale]; if(!n)return null;
 return <article key={s.id} className="reader-service"><h3>{kind==='store'?(en?'If you want to store clothing: ':'衣類を預けたい場合：'):''}{en?(englishServices[s.id]?.name||s.name):s.name}</h3>
 <dl>{([[en?'Eligible items / area':'対象品目・地域',n.scope],[en?'Costs':'費用',n.fees],[en?'Timing':'日時',n.timing],[en?'How to apply':'申込方法',n.apply],[en?'Prepare':'準備',n.prepare],[en?'Cancellation':'キャンセル',n.cancel],[en?'Language / eligibility':'言語・利用条件',n.language]]).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
 {n.source&&<p className="small"><a href={n.source}>{en?'Official service information (ordinary link)':'公式の利用案内（通常リンク）'}</a></p>}
 <p className="small">{en?'The following is an external advertising link.':'以下は外部サイトへの広告リンクです。'}</p>
 <div data-measure-service={s.id} data-measure-category={kind} data-measure-provider="a8" data-measure-link="guide_service" className="service-purchase">
 {s.a8TextHtml?<span dangerouslySetInnerHTML={{__html:s.a8TextHtml}}/>:<a href={s.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">{en?'Check service and application conditions →':'サービス・申込条件を確認する →'}</a>}
 </div></article>;
 })}</div>;
}
