'use client';
import { useEffect, useState } from 'react';
import { categories, type Category, type Product } from '@/types/product';
import { filterProducts } from '@/lib/catalog';
import { ProductCard } from './product-card';
export function Catalog({products}:{products:Product[]}) {
  const [category,setCategory]=useState<Category|'all'>('all');
  const [ceiling,setCeiling]=useState<number|null>(null);
  useEffect(()=>{ const sync=()=>{const q=new URLSearchParams(location.search);const c=q.get('category');const n=Number(q.get('under'));setCategory(categories.includes(c as Category)?c as Category:'all');setCeiling([3000,5000,10000].includes(n)?n:null);};sync();addEventListener('popstate',sync);return()=>removeEventListener('popstate',sync);},[]);
  function update(c:Category|'all',n:number|null){setCategory(c);setCeiling(n);const q=new URLSearchParams();if(c!=='all')q.set('category',c);if(n)q.set('under',String(n));history.pushState(null,'',`${location.pathname}${q.size?'?'+q:''}`);}
  const visible=filterProducts(products,category,ceiling);
  return <><div className="filters"><fieldset><legend>カテゴリー</legend><div className="filter-options">{(['all',...categories] as const).map(c=><button key={c} aria-pressed={category===c} onClick={()=>update(c,ceiling)}>{c==='all'?'すべて':c}</button>)}</div></fieldset><fieldset><legend>予算から探す</legend><div className="filter-options">{[null,3000,5000,10000].map(n=><button key={n??'all'} aria-pressed={ceiling===n} onClick={()=>update(category,n)}>{n?`Under ¥${n.toLocaleString('ja-JP')}`:'指定なし'}</button>)}</div></fieldset><p className="small">Under は表示価格が指定金額未満の商品です。</p></div><p className="result-count" aria-live="polite">{visible.length}件の商品 <span>価格は2026年10月1日の確認時点</span></p>{visible.length?<div className="product-grid">{visible.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><h2>この条件の商品はまだありません。</h2><p>予算やカテゴリーを変えてお探しください。</p><button className="button" onClick={()=>update('all',null)}>条件をリセット</button></div>}</>;
}
