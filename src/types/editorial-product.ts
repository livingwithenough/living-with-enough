export const featureKeys = ['objects', 'prepare', 'foods', 'gifts'] as const;
export type FeatureKey = typeof featureKeys[number];
export type Bilingual = { ja: string; en: string };
export type EditorialProduct = {
 id:string; brand:string; officialName:string; officialNameEn:string|null; model:string|null;
 name:Bilingual; category:'Everyday'|'Tableware'|'Preparedness'|'Food'; features:FeatureKey[];
 officialUrl:string; buyingUrl:string|null; checkedAt:string; sources:{title:string;url:string}[];
 price:number|null; priceKind:'retail-tax-included'|'suggested-tax-included'|'unconfirmed';
 specification:Bilingual; material:Bilingual; origin:Bilingual; role:Bilingual; suitability:Bilingual;
 care:Bilingual; availability:Bilingual; shipping:Bilingual; returns:Bilingual; language:Bilingual;
 international:Bilingual; gift:Bilingual;
 food:null|{ingredients:Bilingual;allergens:Bilingual;storage:Bilingual;expiry:Bilingual};
 affiliate:{status:'not-partnered';url:null;html:null;imageUrl:null}; imageRights:'placeholder-only';
 publication:'published'|'candidate'; blockers:string[]; unknowns:Bilingual;
};
