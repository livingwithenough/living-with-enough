import type { Metadata } from 'next';
import { AuditTool } from '@/components/audit-tool';
import { seo } from '@/lib/seo';

const title = '暮らしの棚卸し｜売る・残す・預けるを整理する';
const description = '片付けたいけれど何から始めればいいか分からない。今あるものを見直し、売る・残す・預ける・任せる・買う前に考える、次の一手を整理します。';
export const metadata: Metadata = seo(title, description, '/audit/');

export default function AuditPage() {
  return <div className="audit-page"><AuditTool/></div>;
}
