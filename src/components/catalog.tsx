'use client';
import { useEffect, useMemo, useState } from 'react';
import { categories, categoryLabels, type Category, type Product } from '@/types/product';
import { filterProducts, priceBands, type PriceBand } from '@/lib/catalog';
import { ProductCard } from './product-card';
import { categoryLabelsEn, editorialEnglish } from '@/i18n/catalog';
import type { Locale } from '@/i18n/routing';
import { groupCatalogProducts } from '@/lib/catalog-editorial';

const priceLabels: Record<PriceBand, string> = {
  all: 'すべて',
  'up-to-10000': '〜¥10,000',
  '10000-30000': '¥10,000〜¥30,000',
  '30000-100000': '¥30,000〜¥100,000',
  'over-100000': '¥100,000〜',
};

export function Catalog({products,locale='ja'}:{products:Product[];locale?:Locale}) {
  const en=locale==='en';
  const labels=en?categoryLabelsEn:categoryLabels;
  const prices:Record<PriceBand,string>=en?{all:'All','up-to-10000':'Up to ¥10,000','10000-30000':'¥10,000–¥30,000','30000-100000':'¥30,000–¥100,000','over-100000':'¥100,000+'}:priceLabels;
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
  const sections=groupCatalogProducts(visible);
  return <>
    <div className="filters">
      <fieldset><legend>{en?'Category':'カテゴリー'}</legend><div className="filter-options">{(['all',...visibleCategories] as const).map(c=><button key={c} aria-pressed={category===c} onClick={()=>update(c,priceBand)}>{c==='all'?(en?'All':'すべて'):labels[c]}</button>)}</div></fieldset>
      <fieldset><legend>{en?'Price':'価格帯'}</legend><div className="filter-options">{priceBands.map(band=><button key={band} aria-pressed={priceBand===band} onClick={()=>update(category,band)}>{prices[band]}</button>)}</div></fieldset>
      <p className="small">{en?'Use price ranges to find products within your budget.':'価格帯は、予算に合う商品を探すための補助機能です。'}</p>
    </div>
    <p className="result-count" aria-live="polite">{en?`${visible.length} ${visible.length===1?'product':'products'}`:`${visible.length}件の商品`}</p>
    {visible.length?<div className="catalog-editorial">{sections.map(section=><section className="catalog-section" key={section.id} aria-labelledby={`section-${section.id}`}><header className="catalog-section-heading"><h2 id={`section-${section.id}`}>{en?editorialEnglish[section.id].title:section.title}</h2><p>{en?editorialEnglish[section.id].description:section.description}</p></header><div className="product-grid">{section.items.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>)}</div>:<div className="empty"><h2>{en?'No products match these filters yet.':'この条件の商品はまだありません。'}</h2><p>{en?'Try a different category or price range.':'価格帯やカテゴリーを変えてお探しください。'}</p><button className="button" onClick={()=>update('all','all')}>{en?'Reset filters':'条件をリセット'}</button></div>}
  </>;
}
