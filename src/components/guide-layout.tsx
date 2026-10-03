import Link from 'next/link';

export function GuideLayout({ eyebrow, title, lead, children }: {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return <article className="guide-layout page-shell">
    <nav className="breadcrumbs" aria-label="パンくず"><Link href="/">TOP</Link><span>/</span><Link href="/guides/">Guides</Link></nav>
    <header className="guide-header"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lead}</p></header>
    <div className="guide-body">{children}</div>
    <aside className="guide-products"><p>日本で購入できる家具と生活用品</p><Link className="text-link" href="/products/">商品を探す</Link></aside>
  </article>;
}
