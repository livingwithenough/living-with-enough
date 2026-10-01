import Link from 'next/link';
export default function NotFound(){return <div className="empty page-shell"><p className="eyebrow">404</p><h1>ページが見つかりません。</h1><p>公開中の商品は、商品一覧からご覧いただけます。</p><Link className="button" href="/products/">商品一覧へ</Link></div>;}
