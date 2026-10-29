import { featureKeys, type EditorialProduct } from '../types/editorial-product';
const bilingual=['name','specification','material','origin','role','suitability','care','availability','shipping','returns','language','international','gift','unknowns'] as const;
const https=(value:unknown)=>{try{const u=new URL(String(value));return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}};
export function validateEditorialProducts(input:unknown,existing:{id:string;officialUrl:string;modelNumber:string|null}[]=[]):string[]{
 const errors:string[]=[];if(!Array.isArray(input))return ['Expected a JSON array'];
 const ids=new Set(existing.map(p=>p.id)),urls=new Set(existing.map(p=>p.officialUrl)),models=new Set<string>();
 input.forEach((p,i)=>{const key=p?.id||'row '+i;const fail=(s:string)=>errors.push(key+': '+s);
 if(!p||typeof p!=='object'){fail('record required');return;}
 if(typeof p.id!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id))fail('invalid id');
 if(ids.has(p.id))fail('duplicate id');ids.add(p.id);
 if(urls.has(p.officialUrl))fail('duplicate official URL');urls.add(p.officialUrl);
 if(p.model){const m=p.brand+'|'+p.model;if(models.has(m)||existing.some(e=>e.modelNumber===p.model))fail('duplicate model');models.add(m);}
 for(const field of ['brand','officialName'])if(typeof p[field]!=='string'||!p[field].trim())fail(field+' required');
 if(!['Everyday','Tableware','Preparedness','Food'].includes(p.category))fail('invalid category');
 for(const field of bilingual)for(const locale of ['ja','en'])if(typeof p[field]?.[locale]!=='string'||!p[field][locale].trim())fail(field+'.'+locale+' required');
 if(!https(p.officialUrl)||p.buyingUrl!==null&&!https(p.buyingUrl))fail('invalid official/buying URL');
 if(!Array.isArray(p.sources)||!p.sources.length||p.sources.some((s:any)=>!s.title||!https(s.url)))fail('sources required with HTTPS URLs');
 if(!Array.isArray(p.features)||!p.features.length||p.features.some((f:any)=>!featureKeys.includes(f)))fail('invalid features');
 if(typeof p.checkedAt!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(p.checkedAt)||!Number.isFinite(Date.parse(p.checkedAt)))fail('invalid date');
 if(p.price!==null&&(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<=0))fail('price must be positive or null');
 if(!['retail-tax-included','suggested-tax-included','unconfirmed'].includes(p.priceKind)||(p.price===null)!==(p.priceKind==='unconfirmed'))fail('price basis mismatch');
 if(p.imageRights!=='placeholder-only')fail('unverified image rights');
 if(p.affiliate?.status!=='not-partnered'||p.affiliate.url!==null||p.affiliate.html!==null||p.affiliate.imageUrl!==null)fail('issued advertising requires a separate verified migration; never infer links');
 if(!['published','candidate'].includes(p.publication)||!Array.isArray(p.blockers)||p.blockers.some((b:any)=>typeof b!=='string'||!b.trim()))fail('invalid publication state');
 if(p.publication==='published'&&(p.blockers?.length||!p.buyingUrl||p.price===null))fail('publication blocked: unresolved facts, buying URL or price');
 if(p.publication==='candidate'&&!p.blockers?.length)fail('candidate needs hold reason');
 if(p.category==='Food'||p.food){for(const f of ['ingredients','allergens','storage','expiry'])for(const l of ['ja','en'])if(!p.food?.[f]?.[l])fail('food '+f+'.'+l+' required');}
 });return errors;
}
export function isEditorialPublishable(p:EditorialProduct){return p.publication==='published'&&validateEditorialProducts([p]).length===0;}
