import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { getAuditResult } from '../src/lib/audit';
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
function auditHarness() {
  const hooks: unknown[] = [];
  const events: string[] = [];
  let cursor = 0;
  const require = createRequire(resolve('package.json'));
  const exports: { AuditTool?: () => unknown } = {};
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
    if (name === '@/lib/analytics') return { trackEvent: (name: string) => events.push(name) };
    if (name === '@/lib/audit') return { getAuditResult };
    if (name === '@/data/audit-services') return { visibleAuditServices };
    return require(name);
  } });
  function render() { cursor = 0; return elements(exports.AuditTool!()); }
  function click(label: string) {
    const button = render().find(element => element.type === 'button' && text(element.props.children).replace('→', '').trim() === label);
    assert.ok(button, `Button not found: ${label}`);
    (button.props.onClick as () => void)();
  }
  return { render, click, events };
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
