import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideLayout } from '@/components/guide-layout';
import { guideSummaries } from '@/data/guides';
import { guideSeo } from '@/lib/guide-seo';

export const metadata: Metadata = {
  ...guideSeo(
    'Japandi Guides｜日本で選ぶためのガイド',
    '日本の住まい、国内配送、自然素材を踏まえてJapandiの家具と生活用品を選ぶためのガイド。',
  ),
  robots: { index: false, follow: true },
};

export default function Guides() {
  return <GuideLayout eyebrow="Guides for life in Japan" title="Japandiを、日本の暮らしで選ぶ。" lead="見た目の印象だけでなく、住まいの広さ、素材、国内配送、購入前の確認事項まで扱うガイドです。">
    <div className="guide-index">
      {guideSummaries.map(guide=><section key={guide.slug}><p className="guide-status">Coming soon</p><h2>{guide.titleJa ?? guide.titleEn}</h2><p>{guide.descriptionJa ?? guide.descriptionEn}</p></section>)}
    </div>
    <p className="small">個別ガイドは順次追加します。現在の商品情報は<Link href="/products/">商品一覧</Link>から確認できます。</p>
  </GuideLayout>;
}
