import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { furnitureGuide, furnitureExamples, furnitureSources } from '../src/data/furniture-guide';
import type { ProductRecord } from '../src/types/product';
import { englishProducts } from '../src/data/products-en';
import { localizeProduct } from '../src/lib/localize-product';
import { isPublishedProduct } from '../src/lib/product-publication';
import { guideSwitchDestination } from '../src/lib/guide-routing';
import { guideKeys,guideRoutes } from '../src/data/reader-guides';
import { languageAlternate } from '../src/i18n/routing';

const records:{products?:ProductRecord[]}={};
runInNewContext(ts.transpileModule(readFileSync('src/data/products.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:records,require:(name:string)=>name==='./products-en'?{englishProducts}:{}});
const products=records.products!;
const approved=products.filter(isPublishedProduct).map(p=>localizeProduct(p,'en')!);
function load(source:string) {
 const exports:Record<string,any>={};const require=createRequire(resolve('package.json'));
 runInNewContext(ts.transpileModule(readFileSync(source,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,{exports,URL,require:(name:string)=>{
  if(name==='@/data/reader-guides')return {guideKeys,guideRoutes};
  if(name==='@/data/furniture-guide')return {furnitureGuide,furnitureExamples,furnitureSources};
  if(name==='@/lib/products')return {getApprovedProduct:(id:string)=>approved.find(p=>p.id===id),getApprovedProducts:()=>approved};
  if(name==='@/lib/seo')return {siteUrl:new URL('https://living-with-enough.pages.dev')};
  if(name==='@/i18n/routing')return {localizedPath:(locale:string,path:string)=>locale==='en'?'/en'+path:path};
  if(name==='next/link')return {__esModule:true,default:({children,...props}:any)=>createElement('a',props,children)};
  if(name==='next/image')return {__esModule:true,default:({priority,...props}:any)=>createElement('img',props)};
  if(name.endsWith('.module.css'))return {__esModule:true,default:{}};
  return require(name);
 }});return exports;
}
const pagePath='src/app/(en)/en/guides/where-to-buy-quality-furniture-in-japan/page.tsx';

test('furniture guide selects five real approved products without changing product advertising data',()=>{
 assert.equal(products.length,24);assert.equal(furnitureExamples.length,5);
 assert.deepEqual(furnitureExamples.map(p=>p.id),Array.from(furnitureGuide.productIds));
 for(const example of furnitureExamples){const p=approved.find(p=>p.id===example.id);assert.ok(p,example.id);assert.equal(p.status,'approved');assert.equal(p.isSample,false);assert.ok(p.affiliateUrl);}
});

test('rendered article discloses advertising and links only to existing detail pages for product conversion',()=>{
 const page=load(pagePath);const html=renderToStaticMarkup(createElement(page.default));
 assert.match(html,/<h1>Where to Buy Quality Furniture in Japan<\/h1>/);
 assert.match(html,/Advertising disclosure/);assert.match(html,/40–60 business days/);
 assert.match(html,/legs are not confirmed to fold/);assert.match(html,/not a reservation or a stock guarantee/);
 assert.match(html,/We have not verified English checkout or customer support/);
 for(const id of furnitureGuide.productIds){assert.ok(html.includes(`href="/en/products/${id}/"`));assert.ok(html.includes(`data-measure-product="${id}"`));}
 assert.equal((html.match(/href="\/en\/products\/[^/]+\/"/g)||[]).length,5);
 assert.ok(!html.includes('px.a8.net')&&!html.includes('hb.afl.rakuten')&&!html.includes('0.gif'));
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1]);
 assert.equal(schema['@graph'][0]['@type'],'BlogPosting');assert.equal(schema['@graph'][0].inLanguage,'en');
 assert.equal(schema['@graph'][0].mainEntityOfPage,'https://living-with-enough.pages.dev'+furnitureGuide.path);
 assert.ok(!html.includes('href="/en/guides/"'));
});

test('guide metadata and sitemap add one English-only canonical while preserving the existing 58 URLs',()=>{
 const metadata=load(pagePath).metadata;
 assert.equal(metadata.title,furnitureGuide.title);assert.equal(metadata.description,furnitureGuide.description);
 assert.equal(metadata.alternates.canonical,'https://living-with-enough.pages.dev'+furnitureGuide.path);
 assert.equal(Object.keys(metadata.alternates.languages).length,0);assert.equal(metadata.robots.index,true);
 const sitemap=load('src/app/sitemap.ts').default();
 assert.equal(sitemap.length,67);assert.equal(new Set(sitemap.map((p:any)=>p.url)).size,67);
 for(const path of ['/','/audit/','/products/','/about/','/affiliate-disclosure/',...products.map(p=>`/products/${p.id}/`)]){
  for(const prefix of ['','/en']){const entry=sitemap.find((p:any)=>p.url==='https://living-with-enough.pages.dev'+prefix+path);assert.ok(entry);assert.equal(Object.keys(entry.alternates.languages).length,3);}
 }
 const article=sitemap.find((p:any)=>p.url.endsWith(furnitureGuide.path));assert.ok(article);assert.equal(article.alternates,undefined);
 assert.ok(!sitemap.some((p:any)=>p.url==='https://living-with-enough.pages.dev'+furnitureGuide.path.replace('/en','')));
});

test('guide language switching avoids a nonexistent translation and preserves all bilingual destinations',()=>{
 assert.equal(guideSwitchDestination(furnitureGuide.path,'ja'),'/');
 assert.equal(guideSwitchDestination('/guides/','en'),'/en/guides/');
 for(const path of ['/','/audit/','/products/','/about/',...products.map(p=>`/products/${p.id}/`)]){
  for(const prefix of ['','/en'])for(const target of ['ja','en'] as const)assert.equal(guideSwitchDestination(prefix+path,target),languageAlternate(prefix+path,target));
 }
 const home=readFileSync('src/app/(en)/en/page.tsx','utf8');assert.match(home,/href=\{furnitureGuide.path\}/);assert.match(home,/slice\(0,4\)/);
});
