import type { AuditService } from '@/types/audit';

// 審査結果の確認後、承認済みの正式な広告URLだけを設定します。
// pending / rejected、またはaffiliateUrlが空の案件は画面に表示されません。
export const auditServices: AuditService[] = [
  { id: 'buy-sell-kimono', name: 'バイセル（着物）', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['kimono'] },
  { id: 'buy-sell-records', name: 'バイセル（レコード）', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['records'] },
  { id: 'buy-sell-tableware', name: 'バイセル（食器）', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['tableware'] },
  { id: 'buy-sell-instruments', name: 'バイセル（楽器）', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['instruments'] },
  { id: 'buy-sell-brand', name: 'バイセル（ブランド品）', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['clothes-bags'] },
  {
    id: 'instrument-buyer',
    name: '楽器の買取屋さん',
    status: 'approved',
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4BE7ST+62I3SI+5VHC+5YJRM',
    provider: 'A8.net',
    advertiser: 'UNI SOUND',
    programName: '楽器買取専門店【楽器の買取屋さん】高額査定&最速の最短30分の無料の出張査定',
    programId: 's00000027408001',
    trackingCategory: 'instrument',
    category: 'sell',
    rewardMemo: '新規査定3,000円（広告主新規、WEBまたは電話申込後30日以内の査定完了）',
    itemTypes: ['instruments'],
    headline: '使っていない楽器は、捨てる前に価値を確かめる。',
    description: '査定してから、残すか手放すか決めても遅くありません。',
    ctaLabel: '査定を申し込む →',
  },
  {
    id: 'audio-buyer',
    name: 'オーディオの買取屋さん',
    status: 'approved',
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4BE7ST+5MFEGI+5VHC+BWVTE',
    provider: 'A8.net',
    advertiser: 'UNI SOUND',
    programName: 'オーディオ買取専門店【オーディオの買取屋さん】高額査定&最速の最短30分の無料の出張査定',
    programId: 's00000027408002',
    trackingCategory: 'audio',
    category: 'sell',
    rewardMemo: '新規査定3,000円（広告主新規、WEBまたは電話申込後30日以内の査定完了）',
    itemTypes: ['audio'],
    headline: '使っていないオーディオも、まず価値を確かめる。',
    description: '手放すかどうかは、査定結果を見てから決められます。',
    ctaLabel: '査定を申し込む →',
  },
  { id: 'brand-off', name: 'ブランドオフ宅配買取', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '無料買取申込・着荷', itemTypes: ['clothes-bags'] },
  { id: 'netoff', name: 'ネットオフ', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '買取申込', itemTypes: ['books', 'hobbies', 'electronics'] },
  { id: 'minikura', name: 'minikura', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'store', rewardMemo: '新規ボックス注文', itemTypes: ['clothes-bags', 'books', 'records', 'hobbies', 'seasonal', 'other'] },
  { id: 'recro', name: 'リクロ', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'sell', rewardMemo: '査定・買取申込', itemTypes: ['clothes-bags'] },
  { id: 'yourmeister', name: 'ユアマイスター', status: 'pending', affiliateUrl: '', provider: 'A8.net', category: 'outsource', rewardMemo: '作業完了', itemTypes: ['clothes-bags', 'kimono', 'books', 'records', 'instruments', 'audio', 'electronics', 'tableware', 'hobbies', 'seasonal', 'furniture', 'other'] },
];

export function visibleAuditServices(category: AuditService['category'], item: AuditService['itemTypes'][number]) {
  return auditServices.filter(service =>
    service.category === category &&
    service.itemTypes.includes(item) &&
    service.status === 'approved' &&
    service.affiliateUrl.trim().startsWith('https://')
  );
}
