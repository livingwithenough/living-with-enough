import type { AuditAnswers, AuditResultKind } from '@/types/audit';

export type AuditResult = {
  kind: AuditResultKind;
  label: string;
  title: string;
  description: string;
  today: string;
  freeActions: string[];
  showBuyLater: boolean;
};

export function getAuditResult(answers: AuditAnswers): AuditResult {
  if (answers.concern === 'cleaning') {
    return {
      kind: 'outsource', label: '任せる', title: '手が回らない部分を、任せる。',
      description: '物を減らすことより、掃除にかかる時間が負担になっている状態です。自分でやる範囲を小さく決め、それ以外を任せる方法があります。',
      today: '掃除が負担な場所を、ひとつだけ書き出す。',
      freeActions: ['10分で終わる範囲だけ自分で整える', '家族と分担できる場所を一つ決める', '頼む場合は、作業範囲と上限金額を先に決める'],
      showBuyLater: false,
    };
  }

  if (answers.lastUsed === 'often' || (answers.futureUse === 'clear' && answers.lettingGo !== 'sell')) {
    return {
      kind: 'keep', label: '残す', title: '使っているものは、残す。',
      description: 'よく使うものを手放す必要はありません。収納を増やす前に、戻しやすい定位置をつくることから始めます。',
      today: 'よく使うものを一つ選び、戻す場所を決める。',
      freeActions: ['同じ用途のものを一か所に集める', '出し入れを妨げているものだけ移動する', '一週間使わなかった収納用品は買い足さない'],
      showBuyLater: answers.concern === 'want-to-organize' || answers.concern === 'not-enough-storage',
    };
  }

  if (answers.lettingGo === 'sell' && (answers.lastUsed === 'over-year' || answers.lastUsed === 'unknown' || answers.futureUse === 'probably-not')) {
    return {
      kind: 'sell', label: '売る', title: '捨てる前に、価値を確かめる。',
      description: '使っておらず、手放してもよいものです。処分を急がず、まず買取対象かどうかを確認します。',
      today: '1年以上使っていないものを、3つだけ出す。',
      freeActions: ['型番や付属品を確認する', '汚れを落とし、明るい場所で状態を見る', '査定前に、手放す最低条件を決める'],
      showBuyLater: false,
    };
  }

  if (answers.lettingGo === 'store' || answers.futureUse === 'probably') {
    return {
      kind: 'store', label: '預ける', title: '使う理由があるなら、家の外に預ける。',
      description: '今は使わなくても、次に使う時期や理由があるものです。家の中に置き続ける以外の方法を検討できます。',
      today: '次に使う時期を、カレンダーに一つ書く。',
      freeActions: ['使う予定日が決められないものは一度保留箱へ入れる', '預ける費用と、買い直す費用を比べる', '写真を撮り、中身と保管期限を記録する'],
      showBuyLater: false,
    };
  }

  return {
    kind: 'keep', label: '残す', title: '今日は、決めない。',
    description: '判断できないものを、無理に手放す必要はありません。期限を決めて残し、使ったかどうかを見直します。',
    today: '迷っているものを一つだけ、保留箱に入れる。',
    freeActions: ['保留期限を一か月後に決める', '残した理由を短く書く', '期限まで新しい収納用品を買わない'],
    showBuyLater: false,
  };
}
