import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function harness(options: { consent?: string; existing?: boolean; storageBlocked?: boolean } = {}) {
  const calls: unknown[][] = [], events: Array<{type:string;detail:Record<string,unknown>}> = [], scripts: unknown[] = [];
  const storage = new Map<string,string>();
  if (options.consent) storage.set('lwe:analytics-consent:v1', options.consent);
  const window = { location: { hostname:'living-with-enough.pages.dev',origin:'https://living-with-enough.pages.dev' },
    localStorage: {getItem:(key:string)=>{if(options.storageBlocked)throw Error('blocked');return storage.get(key);},setItem:(key:string,value:string)=>{if(options.storageBlocked)throw Error('blocked');storage.set(key,value);}},
    dispatchEvent:(event:typeof events[number])=>events.push(event), dataLayer:calls,
    ...(options.existing?{gtag:(...args:unknown[])=>calls.push(args)}:{}) };
  const exports: Record<string,(...args:any[])=>any> = {};
  const code = ts.transpileModule(readFileSync('src/lib/analytics.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  runInNewContext(code,{exports,window,document:{referrer:'https://example.com/search?q=private#secret',querySelector:()=>null,createElement:()=>({}),head:{appendChild:(s:unknown)=>scripts.push(s)}},URL,CustomEvent:class{constructor(public type:string,public options:{detail:Record<string,unknown>}){}get detail(){return this.options?.detail;}}});
  const configure=(path='/')=>exports.configureAnalytics('G-TEST123','living-with-enough.pages.dev',path);
  const googleEvents=()=>Array.from(calls,c=>Array.from(c as unknown as ArrayLike<unknown>)).filter(c=>c[0]==='event');
  return {api:exports,window,calls,events,scripts,configure,googleEvents};
}

test('no ID and no consent preserve CustomEvent without a Google tag or queue',()=>{
 const h=harness();h.api.configureAnalytics('','living-with-enough.pages.dev','/en/audit/');h.api.trackEvent('audit_start');
 assert.equal(h.scripts.length,0);assert.equal(h.calls.length,0);
 assert.equal(h.events[0].detail.name,'audit_start');assert.equal(h.events[0].detail.locale,'en');
 h.configure();h.api.trackEvent('audit_complete');assert.equal(h.scripts.length,0);
 h.api.setAnalyticsConsent('denied');assert.equal(h.calls.length,0);
});

test('opt-in loads one tag, sends one page view per navigation and never replays denied events',()=>{
 const h=harness();h.configure('/en/audit/?private=1#secret');h.api.trackEvent('audit_start');
 h.api.setAnalyticsConsent('granted');h.configure('/en/audit/');h.configure('/en/audit/');
 assert.equal(h.scripts.length,1);assert.equal(h.googleEvents().length,1);
 const first=h.googleEvents()[0][2] as Record<string,unknown>;
 assert.equal(first.page_location,'https://living-with-enough.pages.dev/en/audit/');assert.equal(first.page_referrer,'https://example.com/search');
 h.api.trackEvent('affiliate_click',{service:'moclean-storage',affiliate_provider:'a8'});
 assert.equal(h.googleEvents().filter(c=>c[1]==='affiliate_click').length,1);
 assert.equal(h.googleEvents().filter(c=>c[1]==='audit_start').length,0);
 h.configure('/products/');h.configure('/en/audit/');assert.equal(h.googleEvents().filter(c=>c[1]==='page_view').length,3);
 h.api.setAnalyticsConsent('denied');const count=h.calls.length;h.api.trackEvent('audit_complete');h.configure('/about/');assert.equal(h.calls.length,count);
 assert.equal((h.window as Record<string,unknown>)['ga-disable-G-TEST123'],true);
 h.api.setAnalyticsConsent('granted');assert.equal(h.googleEvents().filter(c=>c[1]==='page_view').length,4);assert.equal(h.scripts.length,1);
});

test('foreign tags, invalid IDs, preview hostnames and unavailable storage fail safely',()=>{
 const existing=harness({consent:'granted',existing:true});existing.configure();existing.api.trackEvent('audit_start');assert.equal(existing.scripts.length,0);assert.equal(existing.calls.length,0);
 const invalid=harness({consent:'granted'});invalid.api.configureAnalytics('GTM-123','living-with-enough.pages.dev','/');assert.equal(invalid.calls.length,0);
 invalid.api.configureAnalytics('G-TEST123','preview.pages.dev','/');assert.equal(invalid.calls.length,0);
 const blocked=harness({storageBlocked:true});blocked.configure();blocked.api.setAnalyticsConsent('granted');blocked.configure('/audit/');assert.equal(blocked.scripts.length,1);
});

test('issued A8 HTML, Rakuten links and internal detail links have distinct placements without URL mutation',()=>{
 const h=harness();h.configure('/products/');
 for(const [provider,placement] of [['a8','a8_banner'],['a8','a8_text'],['rakuten','shop_link']]){
  const href='https://example.com/issued?unchanged=1';
  const anchor={href,closest:(selector:string)=>selector==='[data-measure-link]'?{dataset:{measureLink:placement}}:{dataset:{measureProduct:'product-id',measureCategory:'Storage',measureProvider:provider}}};
  h.api.trackProductLink(anchor);assert.equal(anchor.href,href);
  const payload=h.events.at(-1)!.detail;assert.equal(payload.name,'affiliate_click');assert.equal(payload.placement,placement);assert.equal(payload.affiliate_provider,provider);assert.equal(payload.source,'product_list');
 }
 h.configure('/en/');h.api.trackProductLink({href:'https://living-with-enough.pages.dev/en/products/test/',closest:(s:string)=>s==='[data-measure-link]'?null:{dataset:{measureProduct:'test'}}});
 assert.equal(h.events.at(-1)!.detail.name,'product_click');assert.equal(h.events.at(-1)!.detail.source,'home');assert.equal(h.events.at(-1)!.detail.locale,'en');
 h.configure('/en/products/test/');h.api.trackProductLink({href:'https://example.com/',closest:()=>({dataset:{measureProduct:'test',measureLink:'a8_banner'}})});assert.equal(h.events.at(-1)!.detail.source,'product_detail');
});

test('delegated listener cleans up on remount and counts each native activation once',()=>{
 const effects:Array<()=>void|(()=>void)>=[];
 const listeners=new Map<string,Set<(event:any)=>void>>();
 let activations=0;
 const add=(name:string,fn:(event:any)=>void)=>{if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name)!.add(fn);};
 const remove=(name:string,fn:(event:any)=>void)=>listeners.get(name)?.delete(fn);
 class Target { closest(){return {href:'https://example.com/issued'};} }
 const code=ts.transpileModule(readFileSync('src/components/analytics.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const exports:{Analytics?:()=>unknown}={};
 runInNewContext(code,{exports,process:{env:{}},Element:Target,document:{addEventListener:add,removeEventListener:remove},window:{addEventListener:add,removeEventListener:remove},require:(name:string)=>{
  if(name==='react')return {useEffect:(effect:typeof effects[number])=>effects.push(effect)};
  if(name==='next/navigation')return {usePathname:()=>'/products/'};
  if(name==='@/lib/analytics')return {configureAnalytics:()=>{},trackProductLink:()=>activations++,getAnalyticsConsent:()=> 'denied',setAnalyticsConsent:()=>{}};
  throw Error(name);
 }});
 exports.Analytics!();const cleanup=effects.map(effect=>effect());for(const fn of cleanup)fn?.();
 effects.length=0;exports.Analytics!();for(const effect of effects)effect();
 assert.equal(listeners.get('click')?.size,1);assert.equal(listeners.get('auxclick')?.size,1);assert.equal(listeners.get('storage')?.size,1);
 const fire=(type:string,button:number,defaultPrevented=false)=>{for(const fn of listeners.get(type)||[])fn({type,button,defaultPrevented,target:new Target()});};
 fire('click',0);assert.equal(activations,1);
 fire('click',1);fire('auxclick',1);assert.equal(activations,2);
 fire('auxclick',2);fire('click',0,true);assert.equal(activations,2);
});

test('SPA page views and custom events use the immediately previous virtual URL as referrer',()=>{
 const h=harness({consent:'granted'});const origin='https://living-with-enough.pages.dev';
 h.configure('/en/?private=1#secret');h.configure('/en/');
 h.configure('/en/products/?filter=private');h.configure('/en/products/item/');
 h.api.trackEvent('affiliate_click',{product:'item'});
 const click=h.googleEvents().find(c=>c[1]==='affiliate_click')![2] as Record<string,unknown>;
 assert.equal(click.page_referrer,origin+'/en/products/');
 assert.equal(click.page_location,origin+'/en/products/item/');
 h.configure('/en/products/');h.configure('/en/products/');h.configure('/en/audit/');
 const views=h.googleEvents().filter(c=>c[1]==='page_view').map(c=>c[2] as Record<string,unknown>);
 assert.deepEqual(views.map(p=>p.page_referrer),['https://example.com/search',origin+'/en/',origin+'/en/products/',origin+'/en/products/item/',origin+'/en/products/']);
 assert.equal(h.scripts.length,1);
});

test('re-granting consent on the same URL sends exactly one fresh page view without replay',()=>{
 const h=harness({consent:'granted'});h.configure('/en/audit/');
 h.api.setAnalyticsConsent('denied');const count=h.calls.length;
 h.api.trackEvent('audit_start');h.configure('/en/audit/');
 assert.equal(h.calls.length,count);
 h.api.setAnalyticsConsent('granted');h.api.setAnalyticsConsent('granted');h.configure('/en/audit/');
 assert.equal(h.googleEvents().filter(c=>c[1]==='page_view').length,2);
 assert.equal(h.googleEvents().filter(c=>c[1]==='audit_start').length,0);
 assert.equal((h.window as Record<string,unknown>)['ga-disable-G-TEST123'],false);
 h.api.setAnalyticsConsent('denied');h.configure('/products/');h.configure('/en/audit/');
 h.api.setAnalyticsConsent('granted');
 assert.equal(h.googleEvents().filter(c=>c[1]==='page_view').length,3);
 assert.equal(h.scripts.length,1);
});
