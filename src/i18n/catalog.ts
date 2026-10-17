import type { Category } from '@/types/product';
export const categoryLabelsEn:Record<Category,string>={Furniture:'Furniture',Lighting:'Lighting',Tableware:'Tableware',Textiles:'Textiles',Plants:'Plants',Everyday:'Everyday essentials',SmallFurniture:'Small furniture',Storage:'Storage',LongLasting:'Made to last'};
export const editorialEnglish:Record<string,{title:string;description:string}>={
 'lasting-furniture':{title:'Furniture made to last',description:'Everyday pieces for dining and relaxing. Check dimensions and materials before choosing what stays.'},
 'small-furniture':{title:'Furniture that uses less space',description:'Fold it, move it, use it for more than one purpose. Furniture that helps without taking over.'},
 'lighter-routines':{title:'Tools that make daily life easier',description:'Drying, carrying and preparing: make everyday tasks easier in the space you already have.'},
 'organize-space':{title:'Organize without adding more storage',description:'Use walls and closet space to give things a home while keeping the floor clear.'},
 'daily-essentials':{title:'Everyday essentials',description:'Choose sizes and quantities around how often you use and wash them.'},
 'other-products':{title:'More everyday essentials',description:'Choose according to where and how you will use them.'},
};
