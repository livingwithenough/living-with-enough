import data from '@/data/editorial-products.json';
import { products } from '@/data/products';
import type { EditorialProduct } from '@/types/editorial-product';
import type { ProductRecord, PurchaseNotes } from '@/types/product';
import { validateEditorialProducts, isEditorialPublishable } from './editorial-validation';
export const editorialProducts=data as EditorialProduct[];
const errors=validateEditorialProducts(editorialProducts,products);
if(errors.length)throw new Error('Editorial catalog validation failed: '+errors.join('; '));
export const editorialProductRecords:ProductRecord[]=editorialProducts.filter(isEditorialPublishable).map(p=>{
 const notes=(l:'ja'|'en'):PurchaseNotes=>({availableInJapan:p.availability[l],domesticShipping:p.shipping[l],paymentOptions:l==='ja'?'注文画面で確認':'Check at checkout',deliveryLeadTime:l==='ja'?'確約しません。注文前に販売元へ確認。':'Not guaranteed; confirm with the seller before ordering.',returnCancellationNotes:p.returns[l],thingsToKnowBeforeBuying:[p.suitability[l],p.unknowns[l]]});
 const label=(l:'ja'|'en')=>(p.priceKind==='suggested-tax-included'?(l==='ja'?'希望小売価格 ':'Suggested retail price '):'')+'¥'+p.price!.toLocaleString('ja-JP')+(l==='ja'?'（税込・確認時点）':' (tax included; dated record)');
 return {id:p.id,productNameJa:p.officialName,productNameEn:p.officialNameEn,displayNameJa:p.name.ja,displayNameEn:p.name.en,livingBenefitJa:p.role.ja,livingBenefitEn:p.role.en,japandiFitJa:'',japandiFitEn:null,caveatsJa:[p.care.ja],caveatsEn:[p.care.en],materialJa:p.material.ja,materialEn:p.material.en,purchaseNotesJa:notes('ja'),purchaseNotesEn:notes('en'),brand:p.brand,category:p.category,price:p.price!,priceLabel:label('ja'),priceLabelEn:label('en'),officialUrl:p.officialUrl,affiliateUrl:'',affiliateProvider:null,image:'/images/editorial-placeholder.svg',a8BannerHtml:null,a8TextHtml:null,priceCheckedAt:p.checkedAt,status:'approved',dimensions:p.specification.ja,dimensionsEn:p.specification.en,modelNumber:p.model,shopNameJa:p.brand+' 公式情報',shopNameEn:p.brand+' official information',tagsJa:p.features,tagsEn:p.features,isSample:false,editorial:p};
});
