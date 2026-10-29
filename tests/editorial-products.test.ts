import {test} from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/editorial-products.json';
import {validateEditorialProducts,isEditorialPublishable} from '../src/lib/editorial-validation';
import type {EditorialProduct} from '../src/types/editorial-product';
import {guideProducts,guideRoutes,guideKeys} from '../src/data/reader-guides';
const records=data as EditorialProduct[];
test('26 sourced candidates separate 15 editorial selections from 11 holds and advertising approval',()=>{
 assert.equal(records.length,26);assert.deepEqual(validateEditorialProducts(records),[]);
 const published=records.filter(isEditorialPublishable);assert.equal(published.length,15);
 assert.equal(records.filter(p=>p.publication==='candidate').length,11);
 for(const p of records){assert.equal(p.affiliate.status,'not-partnered');assert.equal(p.affiliate.url,null);assert.equal(p.affiliate.html,null);assert.equal(p.imageRights,'placeholder-only');assert.ok(p.sources.length);if(p.publication==='candidate')assert.ok(p.blockers.length);}
});
test('batch import rejects duplicates, unsafe URLs, invalid facts, blocked publication and invented advertising',()=>{
 const good=structuredClone(records[0]);
 for(const mutate of [
 (p:any)=>{p.officialUrl='javascript:alert(1)';},
 (p:any)=>{p.sources=[];},(p:any)=>{p.name.en='';},
 (p:any)=>{p.price=0;},(p:any)=>{p.price=null;},
 (p:any)=>{p.blockers=['sold out'];},
 (p:any)=>{p.affiliate.url='https://example.com/invented';},
 (p:any)=>{p.imageRights='copied-from-product-page';},
 (p:any)=>{p.category='Food';p.food=null;},
 ]){const p=structuredClone(good);mutate(p);assert.ok(validateEditorialProducts([p]).length);}
 assert.ok(validateEditorialProducts([good,good]).some(e=>e.includes('duplicate')));
 assert.ok(validateEditorialProducts([good],[{id:good.id,officialUrl:good.officialUrl,modelNumber:good.model}]).length);
 const held=structuredClone(records.find(p=>p.publication==='candidate')!);assert.equal(isEditorialPublishable(held),false);
 held.publication='published';assert.ok(validateEditorialProducts([held]).length);
 assert.ok(validateEditorialProducts({}).length);
});
test('food records retain ingredients/allergen uncertainty/storage/expiry and dated price basis',()=>{
 for(const p of records.filter(p=>p.category==='Food'&&p.publication==='published'))for(const f of ['ingredients','allergens','storage','expiry'] as const)for(const l of ['ja','en'] as const)assert.ok(p.food?.[f][l]);
 assert.equal(records.find(p=>p.id==='asahi-long-life-water-500')!.priceKind,'suggested-tax-included');
 assert.match(records.find(p=>p.id==='imuraya-eiyokan-5')!.food!.expiry.en,/4 years 9 months/);
 assert.equal(records.find(p=>p.id==='ippodo-hojicha-100-discontinued')!.publication,'candidate');
});
test('feature memberships share one product ID and never link held product detail routes',()=>{
 assert.equal(guideKeys.length,6);for(const key of guideKeys){assert.ok(guideRoutes[key].ja&&guideRoutes[key].en);for(const id of (key==='moving'?[]:guideProducts[key])){const p=records.find(p=>p.id===id);if(p)assert.ok(isEditorialPublishable(p));}}
 const tea=records.find(p=>p.id==='ippodo-teabag-12')!;assert.deepEqual(tea.features,['foods','gifts']);
 assert.equal(new Set(records.map(p=>p.id)).size,records.length);
});
