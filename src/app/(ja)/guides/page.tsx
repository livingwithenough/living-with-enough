import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideLayout } from '@/components/guide-layout';
import { guideSummaries } from '@/data/guides';
import { guideSeo } from '@/lib/guide-seo';

export const metadata: Metadata = {
  ...guideSeo('暮らしを軽くするガイド', '手放し方、残し方、預け方、そして本当に必要なものの選び方を考えるガイド。'),
  robots: { index: false, follow: true },
};

export default function Guides() {
  return <GuideLayout eyebrow="Guides" title="暮らしを軽くするヒント。" lead="手放し方、残し方、ものの選び方。暮らしの中で迷ったときに使える基準をまとめます。">
    <div className="guide-index">
      {guideSummaries.map(guide=><section key={guide.slug}><p className="guide-status">Coming soon</p><h2>{guide.titleJa ?? guide.titleEn}</h2><p>{guide.descriptionJa ?? guide.descriptionEn}</p></section>)}
    </div>
    <p className="small">個別ガイドは順次追加します。今あるものを見直すなら<Link href="/audit/">こちら</Link>、商品情報は<Link href="/products/">商品一覧</Link>から確認できます。</p>
  </GuideLayout>;
}
