import { AuditTool } from '@/components/audit-tool';
import { seo } from '@/lib/seo';
export const metadata=seo('Review What You Own — 3 Minutes','Five simple questions to find your next step: sell, keep, store or get help, before buying anything new.','/en/audit/',undefined,'en');
export default function Audit(){return <div className="audit-page"><AuditTool locale="en"/></div>;}
