'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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
  { key: 'item', eyebrow: '02', title: '主に気になっているものは？', options: [
    ['clothes-bags','衣類・バッグ'],['kimono','着物'],['books','本'],['records','レコード'],['instruments','楽器'],['audio','オーディオ'],['electronics','家電・ガジェット'],['tableware','食器'],['hobbies','趣味用品'],['seasonal','季節用品'],['furniture','家具'],['other','その他'],
  ].map(([value,label])=>({value:value as AuditItem,label})) },
  { key: 'lastUsed', eyebrow: '03', title: '最後に使ったのは？', options: [
    ['often','今もよく使う'],['within-six-months','半年以内'],['over-year','1年以上前'],['unknown','覚えていない'],
  ].map(([value,label])=>({value:value as LastUsed,label})) },
  { key: 'futureUse', eyebrow: '04', title: 'また使う予定は？', options: [
    ['clear','明確にある'],['probably','たぶんある'],['unknown','分からない'],['probably-not','たぶんない'],
  ].map(([value,label])=>({value:value as FutureUse,label})) },
  { key: 'lettingGo', eyebrow: '05', title: '手放すことについて', options: [
    ['sell','売れるなら手放したい'],['store','捨てるのは嫌だが、預けるならよい'],['keep','まだ残したい'],['undecided','判断できない'],
  ].map(([value,label])=>({value:value as LettingGo,label})) },
];

export function AuditTool() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [complete, setComplete] = useState(false);
  const result = useMemo(() => complete ? getAuditResult(answers as AuditAnswers) : null, [answers, complete]);
  const services = result && result.kind !== 'keep' ? visibleAuditServices(result.kind, (answers.item || 'other') as AuditItem) : [];

  function start() { setStarted(true); trackEvent('audit_start'); }
  function choose(value: string) {
    const question = questions[step];
    const next = { ...answers, [question.key]: value };
    setAnswers(next);
    if (step === questions.length - 1) {
      const decided = getAuditResult(next as AuditAnswers);
      setComplete(true);
      trackEvent('audit_complete');
      trackEvent(`result_${decided.kind}` as const);
      if (decided.showBuyLater) trackEvent('result_buy');
    } else setStep(step + 1);
  }
  function back() { if (complete) setComplete(false); else if (step > 0) setStep(step - 1); else setStarted(false); }
  function reset() { setAnswers({}); setStep(0); setComplete(false); setStarted(false); }

  if (!started) return <section className="audit-hero">
    <p className="eyebrow">Living with Enough · 暮らしの棚卸し</p>
    <h1>あなたの家に、<br/>眠っているものはありませんか。</h1>
    <div className="audit-intro"><p>捨てる前に、価値を確かめる。<br/>預ける前に、本当に使うか考える。<br/>買う前に、今あるものを見る。</p><strong>暮らしを、資産に。</strong></div>
    <button className="button" onClick={start}>3分で棚卸しする</button>
    <p className="audit-note">入力内容は送信・保存されません。</p>
  </section>;

  if (complete && result) return <section className="audit-result" aria-live="polite">
    <p className="eyebrow">棚卸しの結果</p>
    <div className="today-action"><span>今日やること</span><p>{result.today}</p></div>
    <p className="result-label">{result.label}</p>
    <h1>{result.title}</h1>
    <p className="result-description">{result.description}</p>
    <section className="free-actions"><h2>お金をかけずにできること</h2><ol>{result.freeActions.map(action=><li key={action}>{action}</li>)}</ol></section>
    {services.length > 0 && <section className="audit-services"><h2>次に検討できるサービス</h2>{services.map(service=><a key={service.id} href={service.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" onClick={()=>trackEvent('affiliate_click',{service:service.id})}>{service.name}<span>広告・PR</span></a>)}</section>}
    {result.showBuyLater && <section className="buy-later"><p className="eyebrow">最後に、必要なものだけ選ぶ</p><h2>整理した後にも、必要だったら。</h2><p>定位置を決めても足りないものだけ、長く使えるかを確かめて選びます。</p><Link className="text-link" href="/products/" onClick={()=>trackEvent('product_click',{source:'audit'})}>商品を見る</Link></section>}
    <div className="audit-controls"><button className="text-button" onClick={back}>回答を一つ戻る</button><button className="text-button" onClick={reset}>最初からやり直す</button></div>
  </section>;

  const question = questions[step];
  return <section className="audit-question">
    <div className="audit-progress" aria-label={`${questions.length}問中${step + 1}問目`}><span style={{width:`${((step + 1) / questions.length) * 100}%`}}/></div>
    <p className="eyebrow">{question.eyebrow} / 05</p>
    <h1>{question.title}</h1>
    <div className="audit-options">{question.options.map(option=><button key={option.value} onClick={()=>choose(option.value)} aria-pressed={answers[question.key]===option.value}>{option.label}<span aria-hidden="true">→</span></button>)}</div>
    <button className="text-button audit-back" onClick={back}>← 戻る</button>
  </section>;
}
