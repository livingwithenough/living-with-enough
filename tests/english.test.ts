import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { englishProducts } from '../src/data/products-en';
import { localizeProduct, hasLocaleContent } from '../src/lib/localize-product';
import { localizedPath, languageAlternate } from '../src/i18n/routing';
import { englishAuditResult } from '../src/i18n/audit';
import { getAuditResult } from '../src/lib/audit';
import { seo } from '../src/lib/seo';
import type { ProductRecord } from '../src/types/product';
import type { AuditAnswers } from '../src/types/audit';

const moduleExports:{products?:ProductRecord[]}={};
runInNewContext(ts.transpileModule(readFileSync('src/data/products.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:moduleExports,require:(name:string)=>name==='./products-en'?{englishProducts}:{}});
const records=moduleExports.products!;
const japanese=/[\u3040-\u30ff\u3400-\u9fff]/;

test('all 24 products have complete English content without requiring invented official names or legacy style copy',()=>{
 assert.equal(records.length,24);
 assert.equal(Object.keys(englishProducts).length,24);
 for(const record of records){
  assert.ok(hasLocaleContent(record,'en'),record.id);
  const p=localizeProduct(record,'en')!;
  for(const value of [p.name,p.livingBenefit,p.material,p.dimensions,p.priceLabel,p.shop,...p.tags,...p.caveats,...Object.values(p.purchaseNotes).flat()]){
   assert.ok(value);assert.equal(japanese.test(String(value)),false,`${record.id}: ${value}`);
  }
  assert.equal(p.officialName,record.productNameEn||record.productNameJa);
  for(const key of ['affiliateUrl','a8BannerHtml','a8TextHtml','image','price','modelNumber','priceCheckedAt'] as const)assert.equal(p[key],record[key]);
  assert.ok(localizeProduct({...record,japandiFitEn:null,productNameEn:null},'en'));
 }
 assert.deepEqual(Array.from(records.slice(0,4),p=>p.id),['woodlife-ysys-a3122','masterwal-wildwood-dining-table','masterwal-tr-chair','woodlife-sx-001']);
});

test('Japanese records, order, factual fields and issued advertising assets match the pre-English baseline',()=>{
 const protectedData=records.map(p=>Object.fromEntries(Object.entries(p).filter(([key])=>!key.endsWith('En'))));
 const digest=createHash('sha256').update(JSON.stringify(protectedData)).digest('hex');
 assert.equal(digest,'b5d5cf86cd9ba09f28e860e976b1ffd5a8b331d91faaaf15219490755387c6e8');
});

test('language paths keep Japanese URLs and product IDs, and SEO pairs canonical alternatives',()=>{
 for(const path of ['/','/audit/','/products/','/about/','/affiliate-disclosure/',...records.map(p=>`/products/${p.id}/`)]){
  const en=localizedPath('en',path);
  assert.equal(localizedPath('ja',path),path);
  assert.equal(languageAlternate(en,'ja'),path);
  assert.equal(languageAlternate(path,'en'),en);
  for(const [url,locale] of [[path,'ja'],[en,'en']] as const){
   const metadata=seo('Title','Description',url,undefined,locale);
   assert.equal(metadata.alternates?.canonical,url);
   assert.deepEqual(metadata.alternates?.languages,{ja:path,en,'x-default':path});
   assert.equal((metadata.openGraph as {locale:string}).locale,locale==='en'?'en_US':'ja_JP');
  }
 }
 for(const locale of ['(ja)','(en)/en'])for(const page of ['page.tsx','products/page.tsx','products/[id]/page.tsx','audit/page.tsx','about/page.tsx','affiliate-disclosure/page.tsx'])assert.ok(existsSync(`src/app/${locale}/${page}`));
 assert.match(readFileSync('src/components/site-shell.tsx','utf8'),/<html lang=\{locale\}>/);
});

test('every shared audit result receives English presentation without changing result flags',()=>{
 const common:AuditAnswers={concern:'unused',item:'other',lastUsed:'unknown',futureUse:'unknown',lettingGo:'undecided'};
 const cases=[common,{...common,concern:'cleaning' as const},{...common,lastUsed:'often' as const},{...common,lettingGo:'sell' as const},{...common,lettingGo:'store' as const}];
 for(const answers of cases){const ja=getAuditResult(answers);const en=englishAuditResult(ja);assert.equal(en.kind,ja.kind);assert.equal(en.showBuyLater,ja.showBuyLater);assert.equal(japanese.test(JSON.stringify(en)),false);}
});
