import type { AuditService } from '@/types/audit';

// 審査結果の確認後、承認済みの正式な広告URLだけを設定します。
// pending / rejected、またはaffiliateUrlが空の案件は画面に表示されません。
export const auditServices: AuditService[] = [
  { id: 'buy-sell-kimono', name: 'バイセル（着物）', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['kimono'] },
  { id: 'buy-sell-records', name: 'バイセル（レコード）', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['records'] },
  { id: 'buy-sell-tableware', name: 'バイセル（食器）', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '新規査定問合せ・電話申込', itemTypes: ['tableware'] },
  { id: 'instrument-buyer', name: '楽器の買取屋さん', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '新規査定完了', itemTypes: ['instruments'] },
  { id: 'audio-buyer', name: 'オーディオの買取屋さん', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '新規査定完了', itemTypes: ['audio'] },
  { id: 'brand-off', name: 'ブランドオフ宅配買取', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '無料買取申込・着荷', itemTypes: ['clothes-bags'] },
  { id: 'netoff', name: 'ネットオフ', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'sell', rewardMemo: '買取申込', itemTypes: ['books', 'hobbies', 'electronics'] },
  { id: 'minikura', name: 'minikura', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'store', rewardMemo: '新規ボックス注文', itemTypes: ['clothes-bags', 'books', 'records', 'hobbies', 'seasonal', 'other'] },
  { id: 'yourmeister', name: 'ユアマイスター', status: 'pending', affiliateUrl: '', provider: 'a8', category: 'outsource', rewardMemo: '作業完了', itemTypes: ['clothes-bags', 'kimono', 'books', 'records', 'instruments', 'audio', 'electronics', 'tableware', 'hobbies', 'seasonal', 'furniture', 'other'] },
];

export function visibleAuditServices(category: AuditService['category'], item: AuditService['itemTypes'][number]) {
  return auditServices.filter(service =>
    service.category === category &&
    service.itemTypes.includes(item) &&
    service.status === 'approved' &&
    service.affiliateUrl.trim().startsWith('https://')
  );
}
