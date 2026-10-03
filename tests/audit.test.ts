import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAuditResult } from '../src/lib/audit';
import { visibleAuditServices } from '../src/data/audit-services';
import type { AuditAnswers } from '../src/types/audit';

const base: AuditAnswers = { concern:'unused', item:'records', lastUsed:'over-year', futureUse:'probably-not', lettingGo:'sell' };
test('棚卸しの主要な結果分岐',()=>{
  assert.equal(getAuditResult(base).kind,'sell');
  assert.equal(getAuditResult({...base,lettingGo:'store',futureUse:'probably'}).kind,'store');
  assert.equal(getAuditResult({...base,lastUsed:'often',futureUse:'clear',lettingGo:'keep'}).kind,'keep');
  assert.equal(getAuditResult({...base,concern:'cleaning'}).kind,'outsource');
});
test('購入案内は整理後の補助結果に限る',()=>{
  const result=getAuditResult({...base,concern:'want-to-organize',lastUsed:'often',futureUse:'clear',lettingGo:'keep'});
  assert.equal(result.kind,'keep');
  assert.equal(result.showBuyLater,true);
});
test('審査中またはURL未設定の案件は表示しない',()=>{
  assert.deepEqual(visibleAuditServices('sell','records'),[]);
  assert.deepEqual(visibleAuditServices('store','seasonal'),[]);
  assert.deepEqual(visibleAuditServices('outsource','other'),[]);
});
