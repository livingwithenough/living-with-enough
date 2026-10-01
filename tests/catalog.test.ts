import { test } from 'node:test';
import assert from 'node:assert/strict';
import { approvedOnly, filterProducts, purchaseUrl } from '../src/lib/catalog';
import type { Product } from '../src/types/product';
const fixture = (id:string,price:number,status:Product['status']='approved'):Product => ({id,price,status,name:id,category:'Decor',image:'/test.jpg',shop:'test',url:'https://example.com/',affiliateUrl:'',material:'',dimensions:'',tags:[],whySelected:'',caveats:[],isSample:false});
test('candidate is excluded even when it matches filters',()=>{const items=[fixture('public',2999),fixture('private',100,'candidate')];assert.deepEqual(approvedOnly(items).map(p=>p.id),['public']);assert.deepEqual(filterProducts(items,'Decor',3000).map(p=>p.id),['public']);assert.equal(purchaseUrl(items[1]),null);});
test('Under is exclusive and combines with category',()=>{const items=[fixture('below',2999),fixture('equal',3000),fixture('above',3001)];assert.deepEqual(filterProducts(items,'Decor',3000).map(p=>p.id),['below']);assert.equal(filterProducts(items,'Lighting',5000).length,0);});
test('sample and unsafe destinations never become purchase links',()=>{assert.equal(purchaseUrl({...fixture('sample',100),isSample:true}),null);assert.equal(purchaseUrl({...fixture('unsafe',100),url:'javascript:alert(1)'}),null);assert.equal(purchaseUrl(fixture('real',100)),'https://example.com/');});
