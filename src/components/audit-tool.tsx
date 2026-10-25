'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { localizedPath } from '@/i18n/routing';
import { englishQuestions, englishAuditResult, englishServices } from '@/i18n/audit';
import { useMemo, useRef, useState } from 'react';
import { visibleAuditServices } from '@/data/audit-services';
import { trackEvent } from '@/lib/analytics';
import { getAuditResult } from '@/lib/audit';
import type { AuditAnswers, AuditConcern, AuditItem, FutureUse, LastUsed, LettingGo } from '@/types/audit';

type Answers = Partial<AuditAnswers>;
type Option = { value: string; label: string };

const questions: Array<{ key: keyof AuditAnswers; eyebrow: string; title: string; options: Option[] }> = [
  { key: 'concern', eyebrow: '01', title: '今、一番気になっていることは？', options: [
    ['too-many','物が多い'],['small-room','部屋が狭く感じる'],['unused','使っていない物がある'],['hard-to-discard','捨てられない'],['cleaning','掃除が大変'],['not-enough-storage','収納が足りない'],['want-to-organize','部屋を整えたい'],
  ].map(([value,label])=>({value:value as AuditConcern,label})) },
  { key: 'item', eyebrow: '02', title: '何が一番場所を取っていますか？', options: [
    ['clothes-bags','衣類・バッグ'],['kimono','着物'],['books','本'],['records','レコード'],['instruments','楽器'],['audio','オーディオ'],['electronics','家電・ガジェット'],['tableware','食器'],['hobbies','趣味用品'],['seasonal','季節用品'],['furniture','家具'],['other','その他'],
  ].map(([value,label])=>({value:value as AuditItem,label})) },
  { key: 'lastUsed', eyebrow: '03', title: '最後に使ったのはいつ頃ですか？', options: [
    ['often','今もよく使う'],['within-six-months','半年以内'],['over-year','1年以上前'],['unknown','覚えていない'],
  ].map(([value,label])=>({value:value as LastUsed,label})) },
  { key: 'futureUse', eyebrow: '04', title: 'また使う予定は？', options: [
    ['clear','明確にある'],['probably','たぶんある'],['unknown','分からない'],['probably-not','たぶんない'],
  ].map(([value,label])=>({value:value as FutureUse,label})) },
  { key: 'lettingGo', eyebrow: '05', title: '手放すとしたら、どう感じますか？', options: [
    ['sell','売れるなら手放したい'],['store','捨てるのは嫌だが、預けるならよい'],['keep','まだ残したい'],['undecided','判断できない'],
  ].map(([value,label])=>({value:value as LettingGo,label})) },
];

export function AuditTool({locale='ja'}:{locale?:Locale} = {}) {
  const en=locale==='en';
  const path=(p:string)=>localizedPath(locale,p);
  const localizedQuestions=questions.map((q,index)=>en?{...q,title:englishQuestions[index].title,options:q.options.map((option,i)=>({...option,label:englishQuestions[index].options[i]}))}:q);
  const startTracked = useRef(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [complete, setComplete] = useState(false);
  const result = useMemo(() => {if(!complete)return null;const decided=getAuditResult(answers as AuditAnswers);return en?englishAuditResult(decided):decided;}, [answers, complete, en]);
  const services = result && result.kind !== 'keep' ? visibleAuditServices(result.kind, (answers.item || 'other') as AuditItem) : [];

  function choose(value: string) {
    if (step === 0 && !startTracked.current) {
      startTracked.current = true;
      trackEvent('audit_start',{locale,source:'audit'});
    }
    const question = localizedQuestions[step];
    const next = { ...answers, [question.key]: value };
    setAnswers(next);
    if (step === questions.length - 1) {
      const decided = getAuditResult(next as AuditAnswers);
      setComplete(true);
      trackEvent('audit_complete',{locale,source:'audit',category:next.item,result:decided.kind});
      trackEvent(`result_${decided.kind}` as const,{locale,source:'audit',category:next.item});
      if (decided.showBuyLater) trackEvent('result_buy',{locale,source:'audit',category:next.item});
    } else setStep(step + 1);
  }
  function back() { if (complete) setComplete(false); else if (step > 0) setStep(step - 1); }
  function reset() { setAnswers({}); setStep(0); setComplete(false); startTracked.current = false; }

  if (complete && result) return <section className="audit-result" aria-live="polite">
    <p className="eyebrow">{en?'Your next step':'次にすること'}</p>
    <div className="today-action"><span>{en?'What to do today':'今日やること'}</span><p>{result.today}</p></div>
    <p className="result-label">{result.label}</p>
    <h1>{result.title}</h1>
    <p className="result-description">{result.description}</p>
    <section className="free-actions"><h2>{en?'Things you can do first, for free':'お金をかけずにできること'}</h2><ol>{result.freeActions.map(action=><li key={action}>{action}</li>)}</ol></section>
    {services.length > 0 && <section className="audit-services">
      {en&&<p className="small">The linked service may operate primarily in Japanese. Please check language support and service conditions before applying.</p>}
      <p className="audit-service-pr">{en?'Advertising · Affiliate links':'PR・広告'}</p>
      {services.map(service=><article key={service.id}>
        <h2>{en?(englishServices[service.id]?.headline || 'Consider a service in Japan'):service.headline || (result.kind === 'sell' ? '売るなら、まず査定額だけ確かめる。' : result.kind === 'store' ? '預ける場所も、選択肢に入れる。' : '手が回らないことは、頼れる相手を探す。')}</h2>
        {(en?englishServices[service.id]?.description:service.description) && <p>{en?englishServices[service.id]?.description:service.description}</p>}
        <p className="audit-service-external">{en?`External site: ${englishServices[service.id]?.name || service.id} [Ad]`:`ここから先は${service.name}の外部サイトへ移動します［PR］`}</p>
        <a href={service.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" onClick={()=>trackEvent('affiliate_click',{locale,source:'audit',affiliate_provider:'a8',placement:'audit_service',service:service.id,advertiser:service.advertiser,program:service.programName,category:service.trackingCategory || answers.item,result:result.kind})}>{en?(englishServices[service.id]?.cta || 'View service →'):(service.ctaLabel || service.name)}</a>
        {service.trackingPixelUrl && <img src={service.trackingPixelUrl} width="1" height="1" alt="" aria-hidden="true" />}
      </article>)}
    </section>}
    {result.showBuyLater && <section className="buy-later"><p className="eyebrow">{en?'Buying comes last':'最後に、必要なものだけ選ぶ'}</p><h2>{en?'If you still need something afterward':'整理した後にも、必要だったら。'}</h2><p>{en?'Once everything has a place, choose only what is still missing — and consider how long it will serve you.':'定位置を決めても足りないものだけ、長く使えるかを確かめて選びます。'}</p><Link className="text-link" href={path('/products/')} onClick={()=>trackEvent('product_click',{locale,source:'audit',placement:'browse_products',category:answers.item})}>{en?'Browse products':'商品を見る'}</Link></section>}
    <div className="audit-controls"><button className="text-button" onClick={back}>{en?'Back to the last answer':'回答を一つ戻る'}</button><button className="text-button" onClick={reset}>{en?'Review again':'もう一度見直す'}</button></div>
  </section>;

  const question = localizedQuestions[step];
  return <section className="audit-question">
    <div className="audit-progress" aria-label={en?`Question ${step+1} of ${questions.length}`:`${questions.length}問中${step + 1}問目`}><span style={{width:`${((step + 1) / questions.length) * 100}%`}}/></div>
    <p className="eyebrow">{step + 1} / {questions.length}</p>
    <h1>{question.title}</h1>
    <div className="audit-options">{question.options.map(option=><button key={option.value} onClick={()=>choose(option.value)} aria-pressed={answers[question.key]===option.value}>{option.label}<span aria-hidden="true">→</span></button>)}</div>
    {step === 0
      ? <Link className="text-button audit-back" href={path('/')}>{en?'← Back to home':'← トップページへ'}</Link>
      : <button className="text-button audit-back" onClick={back}>{en?'← Back':'← 戻る'}</button>}
  </section>;
}
