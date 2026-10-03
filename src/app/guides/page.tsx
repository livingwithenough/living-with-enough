import Link from 'next/link';
import { GuideLayout } from '@/components/guide-layout';
import { guideSeo } from '@/lib/guide-seo';

export const metadata = guideSeo(
  'Japandi Guides｜日本で選ぶためのガイド',
  '日本の住まい、国内配送、自然素材を踏まえてJapandiの家具と生活用品を選ぶためのガイド。',
);

const plannedGuides = [
  ['Where to buy Japandi furniture in Japan', '日本の販売店と国内配送を前提に、購入先を比較するためのガイド。'],
  ['Japandi furniture for small apartments in Japan', '限られた空間に余白を残す、サイズと機能の選び方。'],
  ['オークとラタンでつくるJapandi', '色をそろえるだけではなく、素材の組み合わせから考える。'],
];

export default function Guides() {
  return <GuideLayout eyebrow="Guides for life in Japan" title="Japandiを、日本の暮らしで選ぶ。" lead="見た目の印象だけでなく、住まいの広さ、素材、国内配送、購入前の確認事項まで扱うガイドです。">
    <div className="guide-index">
      {plannedGuides.map(([title, description])=><section key={title}><p className="guide-status">Coming soon</p><h2>{title}</h2><p>{description}</p></section>)}
    </div>
    <p className="small">個別ガイドは順次追加します。現在の商品情報は<Link href="/products/">商品一覧</Link>から確認できます。</p>
  </GuideLayout>;
}
