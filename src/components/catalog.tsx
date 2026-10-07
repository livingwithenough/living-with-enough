'use client';
import { useEffect, useMemo, useState } from 'react';
import { categories, categoryLabels, type Category, type Product } from '@/types/product';
import { filterProducts, priceBands, type PriceBand } from '@/lib/catalog';
import { ProductCard } from './product-card';

const priceLabels: Record<PriceBand, string> = {
  all: 'すべて',
  'up-to-10000': '〜¥10,000',
  '10000-30000': '¥10,000〜¥30,000',
  '30000-100000': '¥30,000〜¥100,000',
  'over-100000': '¥100,000〜',
};

export function Catalog({products}:{products:Product[]}) {
  const [category,setCategory]=useState<Category|'all'>('all');
  const [priceBand,setPriceBand]=useState<PriceBand>('all');
  const visibleCategories=useMemo(
    ()=>categories.filter(value=>products.some(product=>product.category===value)),
    [products],
  );

  useEffect(()=>{
    const sync=()=>{
      const q=new URLSearchParams(location.search);
      const c=q.get('category');
      const price=q.get('price');
      setCategory(visibleCategories.includes(c as Category)?c as Category:'all');
      setPriceBand(priceBands.includes(price as PriceBand)?price as PriceBand:'all');
    };
    sync();
    addEventListener('popstate',sync);
    return()=>removeEventListener('popstate',sync);
  },[visibleCategories]);

  function update(c:Category|'all',price:PriceBand){
    setCategory(c);
    setPriceBand(price);
    const q=new URLSearchParams();
    if(c!=='all')q.set('category',c);
    if(price!=='all')q.set('price',price);
    history.pushState(null,'',`${location.pathname}${q.size?'?'+q:''}`);
  }

  const visible=filterProducts(products,category,priceBand);
  return <>
    <div className="filters">
      <fieldset><legend>カテゴリー</legend><div className="filter-options">{(['all',...visibleCategories] as const).map(c=><button key={c} aria-pressed={category===c} onClick={()=>update(c,priceBand)}>{c==='all'?'すべて':categoryLabels[c]}</button>)}</div></fieldset>
      <fieldset><legend>価格帯</legend><div className="filter-options">{priceBands.map(band=><button key={band} aria-pressed={priceBand===band} onClick={()=>update(category,band)}>{priceLabels[band]}</button>)}</div></fieldset>
      <p className="small">価格帯は、予算に合う商品を探すための補助機能です。</p>
    </div>
    <p className="result-count" aria-live="polite">{visible.length}件の商品</p>
    {visible.length?<div className="product-grid">{visible.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><h2>この条件の商品はまだありません。</h2><p>価格帯やカテゴリーを変えてお探しください。</p><button className="button" onClick={()=>update('all','all')}>条件をリセット</button></div>}
  </>;
}
