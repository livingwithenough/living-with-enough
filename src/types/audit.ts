export type AuditConcern =
  | 'too-many'
  | 'small-room'
  | 'unused'
  | 'hard-to-discard'
  | 'cleaning'
  | 'not-enough-storage'
  | 'want-to-organize';

export type AuditItem =
  | 'clothes-bags'
  | 'kimono'
  | 'books'
  | 'records'
  | 'instruments'
  | 'audio'
  | 'electronics'
  | 'tableware'
  | 'hobbies'
  | 'seasonal'
  | 'furniture'
  | 'other';

export type LastUsed = 'often' | 'within-six-months' | 'over-year' | 'unknown';
export type FutureUse = 'clear' | 'probably' | 'unknown' | 'probably-not';
export type LettingGo = 'sell' | 'store' | 'keep' | 'undecided';

export type AuditAnswers = {
  concern: AuditConcern;
  item: AuditItem;
  lastUsed: LastUsed;
  futureUse: FutureUse;
  lettingGo: LettingGo;
};

export type AuditResultKind = 'sell' | 'store' | 'keep' | 'outsource';
export type AuditEventName =
  | 'audit_start'
  | 'audit_complete'
  | 'result_sell'
  | 'result_store'
  | 'result_keep'
  | 'result_outsource'
  | 'result_buy'
  | 'affiliate_click'
  | 'product_click';

export type AffiliateStatus = 'pending' | 'approved' | 'rejected';
export type AuditServiceCategory = 'sell' | 'store' | 'outsource';

export type AuditService = {
  id: string;
  name: string;
  status: AffiliateStatus;
  affiliateUrl: string;
  provider: 'A8.net';
  advertiser?: string;
  programName?: string;
  programId?: string;
  trackingCategory?: 'instrument' | 'audio' | 'cleaning' | 'brand-goods';
  category: AuditServiceCategory;
  rewardMemo: string;
  conditionsMemo?: string;
  rejectionMemo?: string;
  isPublished?: boolean;
  itemTypes: AuditItem[];
  headline?: string;
  description?: string;
  ctaLabel?: string;
};
