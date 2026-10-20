import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { getAuditResult } from '../src/lib/audit';
import * as routing from '../src/i18n/routing';
import * as auditEnglish from '../src/i18n/audit';
import { visibleAuditServices } from '../src/data/audit-services';

type Element = { type: unknown; props: { children?: unknown; [key: string]: unknown } };
function elements(node: unknown): Element[] {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!node || typeof node !== 'object' || !('props' in node)) return [];
  const element = node as Element;
  return [element, ...elements(element.props.children)];
}
function text(node: unknown): string {
  if (Array.isArray(node)) return node.map(text).join('');
  if (node && typeof node === 'object' && 'props' in node) return text((node as Element).props.children);
  return typeof node === 'string' || typeof node === 'number' ? String(node) : '';
}

// Exercise the component's handlers across renders without a browser or extra test dependency.
function auditHarness(locale:'ja'|'en'='ja') {
  const hooks: unknown[] = [];
  const events: string[] = [];
  const eventDetails: Array<{name:string;details:Record<string,unknown>}> = [];
  let cursor = 0;
  const require = createRequire(resolve('package.json'));
  const exports: { AuditTool?: (props:{locale:'ja'|'en'}) => unknown } = {};
  const code = ts.transpileModule(readFileSync(resolve('src/components/audit-tool.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  runInNewContext(code, { exports, require: (name: string) => {
    if (name === 'react') return {
      useState: (initial: unknown) => { const index = cursor++; if (!(index in hooks)) hooks[index] = initial; return [hooks[index], (value: unknown) => { hooks[index] = value; }]; },
      useRef: (initial: unknown) => { const index = cursor++; if (!(index in hooks)) hooks[index] = { current: initial }; return hooks[index]; },
      useMemo: (compute: () => unknown) => compute(),
    };
    if (name === 'next/link') return { __esModule: true, default: 'a' };
    if (name === '@/lib/analytics') return { trackEvent: (name: string,details:Record<string,unknown>={}) => {events.push(name);eventDetails.push({name,details:{...details}});} };
    if (name === '@/i18n/routing') return routing;
    if (name === '@/i18n/audit') return auditEnglish;
    if (name === '@/lib/audit') return { getAuditResult };
    if (name === '@/data/audit-services') return { visibleAuditServices };
    return require(name);
  } });
  function render() { cursor = 0; return elements(exports.AuditTool!({locale})); }
  function click(label: string) {
    const button = render().find(element => element.type === 'button' && text(element.props.children).replace('→', '').trim() === label);
    assert.ok(button, `Button not found: ${label}`);
    (button.props.onClick as () => void)();
  }
  return { render, click, events, eventDetails };
}

test('audit opens on question one, starts once on answering, and preserves back/completion/reset flow', () => {
  const audit = auditHarness();
  assert.equal(audit.render().find(element => element.type === 'h1')?.props.children, '今、一番気になっていることは？');
  assert.ok(audit.render().some(element => element.type === 'a' && element.props.href === '/' && text(element.props.children).includes('トップページ')));
  assert.deepEqual(audit.events, []);
  audit.click('使っていない物がある');
  assert.deepEqual(audit.events, ['audit_start']);
  assert.equal(audit.render().find(element => element.type === 'h1')?.props.children, '何が一番場所を取っていますか？');
  audit.click('← 戻る');
  audit.click('使っていない物がある');
  assert.deepEqual(audit.events, ['audit_start']);
  audit.click('オーディオ');
  audit.click('1年以上前');
  audit.click('たぶんない');
  audit.click('売れるなら手放したい');
  assert.deepEqual(audit.events, ['audit_start', 'audit_complete', 'result_sell']);
  assert.ok(audit.render().some(element => element.type === 'a' && String(element.props.href).startsWith('https://')));
  audit.click('回答を一つ戻る');
  assert.equal(audit.render().find(element => element.type === 'h1')?.props.children, '手放すとしたら、どう感じますか？');
  assert.equal(audit.events.filter(event => event === 'audit_start').length, 1);
  audit.click('売れるなら手放したい');
  audit.click('もう一度見直す');
  assert.equal(audit.render().find(element => element.type === 'h1')?.props.children, '今、一番気になっていることは？');
  audit.click('物が多い');
  assert.equal(audit.events.filter(event => event === 'audit_start').length, 2);
});

test('Japanese and English clothing STORE results show Moclean, its pixel, and the existing click event',()=>{
 for(const locale of ['ja','en'] as const){
  const audit=auditHarness(locale);
  const labels=locale==='ja'?['使っていない物がある','衣類・バッグ','1年以上前','たぶんある','捨てるのは嫌だが、預けるならよい']:['Things I don’t use','Clothes & bags','More than a year ago','Probably','I’d rather store it than throw it away'];
  for(const label of labels)audit.click(label);
  assert.deepEqual(audit.events,['audit_start','audit_complete','result_store']);
  const rendered=audit.render();
  const allText=rendered.map(e=>text(e.props.children)).join(' ');
  assert.match(allText,locale==='ja'?/衣類の場合/:/For clothing/);
  assert.match(allText,locale==='ja'?/バッグの保管サービスではありません/:/not bag storage/);
  assert.ok(!allText.includes('リネット保管')&&!allText.includes('Lenet Storage'));
  if(locale==='en')assert.match(allText,/The linked service may operate primarily in Japanese/);
  const link=rendered.find(e=>e.type==='a'&&e.props.href==='https://px.a8.net/svt/ejp?a8mat=4BEJHG+DEUKDU+526M+5YJRM');
  assert.ok(link);
  assert.ok(rendered.some(e=>e.type==='img'&&e.props.width==='1'&&e.props.src==='https://www19.a8.net/0.gif?a8mat=4BEJHG+DEUKDU+526M+5YJRM'));
  (link.props.onClick as ()=>void)();
  assert.deepEqual(audit.eventDetails.at(-1),{name:'affiliate_click',details:{service:'moclean-storage',advertiser:'有限会社たんぽぽ',program:'とにかく品質にこだわりまくった【おもてなしクリーニングのモクリン】',category:undefined,result:'store'}});
 }
});

test('English audit uses the same values, result events and service links without an intro',()=>{
 const audit=auditHarness('en');
 assert.equal(audit.render().find(e=>e.type==='h1')?.props.children,'What are you most concerned about right now?');
 assert.ok(audit.render().some(e=>e.type==='a'&&e.props.href==='/en/'));
 audit.click('Things I don’t use'); audit.click('Audio equipment'); audit.click('More than a year ago'); audit.click('Probably not'); audit.click('I’d let it go if I can sell it');
 assert.deepEqual(audit.events,['audit_start','audit_complete','result_sell']);
 assert.ok(audit.render().some(e=>e.type==='h1'&&text(e.props.children)==='Check its value before throwing it away.'));
 assert.ok(audit.render().some(e=>e.type==='a'&&e.props.href==='https://px.a8.net/svt/ejp?a8mat=4BE7ST+5MFEGI+5VHC+BWVTE'));
 assert.ok(audit.render().some(e=>text(e.props.children).includes('primarily in Japanese')));
});
