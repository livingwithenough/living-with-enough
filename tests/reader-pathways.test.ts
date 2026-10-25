import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,dirname,extname} from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {guideKeys,guideRoutes,readerGuides} from '../src/data/reader-guides';
import {guideSwitchDestination} from '../src/lib/guide-routing';
const nodeRequire=createRequire(resolve('package.json')),cache=new Map<string,any>();
function load(file:string):any {
 const full=resolve(file);if(cache.has(full))return cache.get(full);
 if(full.endsWith('.json'))return JSON.parse(readFileSync(full,'utf8'));
 const exports:any={};cache.set(full,exports);
 const require=(name:string):any=>{
  if(name==='server-only')return {};
  if(name==='next/link')return {__esModule:true,default:({children,...props}:any)=>createElement('a',props,children)};
  if(name==='next/image')return {__esModule:true,default:({priority,fill,...props}:any)=>createElement('img',props)};
  if(name.startsWith('@/')||name.startsWith('.')){let p=name.startsWith('@/')?resolve('src',name.slice(2)):resolve(dirname(full),name);if(!extname(p)){try{readFileSync(p+'.ts');p+='.ts';}catch{p+='.tsx';}}return load(p);}
  return nodeRequire(name);
 };
 runInNewContext(ts.transpileModule(readFileSync(full,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,resolveJsonModule:true}}).outputText,{exports,require,URL,process:{env:{}}});return exports;
}
function count(text:string,part:string){return text.split(part).length-1;}
test('six actual guide translations are reciprocal and contain concrete sourced steps',()=>{
 for(const key of guideKeys)for(const locale of ['ja','en'] as const){const c=readerGuides[key][locale];assert.ok(c.sections.length>=6);assert.ok(c.title&&c.description&&c.lead);const path=guideRoutes[key][locale];assert.equal(guideSwitchDestination(path,locale==='ja'?'en':'ja'),guideRoutes[key][locale==='ja'?'en':'ja']);const m=load('src/lib/reader-seo.ts').readerMetadata(key,locale);assert.equal(m.alternates.canonical,'https://living-with-enough.pages.dev'+path);assert.equal(m.alternates.languages.en,'https://living-with-enough.pages.dev'+guideRoutes[key].en);assert.equal(m.robots.index,true);}
 const data=JSON.stringify(readerGuides);assert.ok(data.includes('env.go.jp'));assert.ok(data.includes('municipality'));assert.ok(data.includes('古物商'));assert.ok(data.includes('未確認'));assert.ok(!data.includes('0.gif'));assert.ok(!data.includes('px.a8.net'));
});
test('guide service rendering preserves issued links/pixels and excludes unpublished or inappropriate services',()=>{
 const {ServiceOptions}=load('src/components/service-options.tsx');const services=load('src/data/audit-services.ts').auditServices;
 for(const locale of ['ja','en']){const store=renderToStaticMarkup(createElement(ServiceOptions,{kind:'store',locale}));const s=services.find((s:any)=>s.id==='moclean-storage');assert.ok(store.includes(s.a8TextHtml));assert.equal(count(store,s.trackingPixelUrl),1);assert.ok(!store.includes('lenet'));assert.ok(!store.includes('minikura'));assert.ok(!store.includes('ハローストレージ'));assert.ok(store.includes(locale==='en'?'Bags/furniture are excluded':'バッグ・家具は対象外'));const sell=renderToStaticMarkup(createElement(ServiceOptions,{kind:'sell',locale}));assert.ok(sell.includes('brandear'));assert.ok(!sell.includes('brand-off'));assert.ok(!sell.includes('buy-sell-kimono'));assert.ok(!sell.includes('moclean-storage'));}
});
test('reader product links use existing approved records and product detail has exactly one issued text creative',()=>{
 const {ReaderGuide}=load('src/components/reader-guide.tsx');const {ProductDetailContent}=load('src/components/product-detail-content.tsx');const {getApprovedProducts}=load('src/lib/products.ts');
 for(const locale of ['ja','en']){const start=renderToStaticMarkup(createElement(ReaderGuide,{guideKey:'starting',locale}));assert.ok(start.includes('where-to-buy-quality-furniture-in-japan'));assert.ok(!start.includes('0.gif'));assert.equal(count(start,'class="reader-product"'),5);const objects=renderToStaticMarkup(createElement(ReaderGuide,{guideKey:'objects',locale}));assert.ok(objects.includes('takada1948'));assert.ok(objects.includes('oigen.jp'));assert.ok(!objects.includes('affiliate.rakuten'));const products=getApprovedProducts(locale);assert.equal(products.length,24);for(const p of products){const html=renderToStaticMarkup(createElement(ProductDetailContent,{product:p}));if(p.a8TextHtml)assert.equal(count(html,p.a8TextHtml),1,p.id);if(p.a8BannerHtml)assert.equal(count(html,p.a8BannerHtml),1,p.id);assert.ok(html.indexOf('detail-purchase')<html.indexOf(locale==='en'?'Role in your home':'暮らしでの役割'));}}
});
test('home retains four featured records, direct goal links, copy-first mobile and catalog CTA',()=>{
 for(const [file,locale] of [['src/app/(ja)/page.tsx','ja'],['src/app/(en)/en/page.tsx','en']]){const home=readFileSync(file,'utf8');assert.match(home,/slice\(0, ?4\)/);assert.ok(home.includes('<HomePathways locale="'+locale+'"'));assert.ok(home.includes('button home-products__all'));assert.ok(home.includes('data-measure-catalog="home_all_products"'));}
 const css=readFileSync('src/app/globals.css','utf8');assert.ok(css.includes('max-height:350px'));assert.ok(css.includes('grid-template-areas: none'));assert.ok(css.includes('object-fit: contain'));
});

test("preserve all 24 product records, issued advertising and audit rules against the integration baseline",()=>{const baseline={"src/data/products.ts":"aa505c55702b67765fec4537c2d70e6c13b59ebd970de7b1966855a7bd5495a4","src/data/products-en.ts":"31c5fc4a44d1649eea0ce740b5ba90405b40ab5c6b29c00be3e7921e2301f19e","src/data/audit-services.ts":"9bac6f36cf35b004c4f5f285adf04110dcc9ea16656b46a774d5e4471983a3e8","src/lib/audit.ts":"dc43bc3090258ec4b2faa535ea167b0e865bbaeecf71596d0e175c61101ad102","src/i18n/audit.ts":"3e679a2df8d8eac995e4b322d6bdf7a101453978908242002dc37eb5dbb39360"};for(const [file,hash] of Object.entries(baseline)){assert.equal(createHash("sha256").update(readFileSync(file,"utf8").replace(/\r\n/g,"\n")).digest("hex"),hash,file);}});
