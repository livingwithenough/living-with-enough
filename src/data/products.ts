import 'server-only';
import type { Product } from '@/types/product';
// All three records are fictional. Prices, dimensions and materials are demo values.
export const products: Product[] = [
  { id:'paper-glow', name:'和紙シェードの小さな灯り', category:'Lighting', price:4800, image:'/images/lamp.jpg', shop:'架空のサンプルショップ', url:'', affiliateUrl:'', material:'和紙・オーク材（想定）', dimensions:'幅24 × 奥行24 × 高さ32cm（想定）', tags:['やわらかな光','和紙','生成り'], whySelected:'手持ちの棚の一角に置く、小さな灯りを考えました。家具を増やさず、過ごす場所の明かりを見直すきっかけに。まずは今ある照明の位置を変えて、足りない光を確かめたいと思います。', caveats:['架空の商品です。購入はできません。','明るさ・電球の仕様・安全性は未確認です。シェードの清掃方法や交換の可否も確認が必要です。'], status:'approved', isSample:true },
  { id:'oak-stool', name:'木目を楽しむラウンドスツール', category:'Furniture', price:8900, image:'/images/stool.jpg', shop:'架空のサンプルショップ', url:'', affiliateUrl:'', material:'オーク材（想定）', dimensions:'幅30 × 奥行30 × 高さ42cm（想定）', tags:['天然木','丸いかたち','ナチュラル'], whySelected:'飾るための家具を足す前に、必要な座る場所をひとつ考える。動かすときの大きさと、手入れしながら木の表情に付き合うことを軸に、この簡素な形を選びました。', caveats:['架空の商品です。購入はできません。','耐荷重・安定性・表面仕上げは未確認です。補修方法や木の色の変化も不明で、長く使えることを保証するものではありません。'], status:'approved', isSample:true },
  { id:'ivory-vase', name:'余白をつくる陶器の一輪挿し', category:'Decor', price:2400, image:'/images/vase.jpg', shop:'架空のサンプルショップ', url:'', affiliateUrl:'', material:'陶器（想定）', dimensions:'幅12 × 奥行12 × 高さ19cm（想定）', tags:['陶器','アイボリー','一輪挿し'], whySelected:'棚を飾りで埋めず、一輪と空いた場所を楽しむための形です。手元の器で代用できるなら、まずはそこから。迎えるときも、いくつも並べず、ひとつを置く姿を考えます。', caveats:['架空の商品です。購入はできません。','水漏れの有無・釉薬の質感は未確認です。画像の枝は付属品ではありません。'], status:'approved', isSample:true }
];
