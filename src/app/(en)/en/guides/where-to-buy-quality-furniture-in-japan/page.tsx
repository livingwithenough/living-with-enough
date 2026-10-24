import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { furnitureGuide, furnitureExamples, furnitureSources as sources } from '@/data/furniture-guide';
import { getApprovedProduct } from '@/lib/products';
import { siteUrl } from '@/lib/seo';
import styles from './article.module.css';

const canonical = new URL(furnitureGuide.path, siteUrl).href;
export const metadata: Metadata = {
  title: furnitureGuide.title,
  description: furnitureGuide.description,
  // English-only article: explicitly clear the bilingual root layout's alternatives.
  alternates: { canonical, languages: {} },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', title: furnitureGuide.title, description: furnitureGuide.description,
    url: canonical, siteName: 'Living with Enough', locale: 'en_US',
    images: [{ url: new URL('/images/social.jpg', siteUrl).href }] },
  twitter: { card: 'summary_large_image', title: furnitureGuide.title, description: furnitureGuide.description,
    images: [new URL('/images/social.jpg', siteUrl).href] },
};

const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'BlogPosting', headline: furnitureGuide.title, description: furnitureGuide.description,
      inLanguage: 'en', mainEntityOfPage: canonical, dateModified: furnitureGuide.checkedAt,
      author: { '@type': 'Organization', name: 'Living with Enough', url: new URL('/en/about/', siteUrl).href },
      publisher: { '@type': 'Organization', name: 'Living with Enough' },
      image: new URL('/images/social.jpg', siteUrl).href },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: new URL('/en/', siteUrl).href },
      { '@type': 'ListItem', position: 2, name: furnitureGuide.title, item: canonical },
    ] },
  ],
};

function ProductExample({ example }: { example: typeof furnitureExamples[number] }) {
  const product = getApprovedProduct(example.id, 'en');
  if (!product || product.isSample) return null;
  return <article className={styles.example} data-measure-product={product.id}
    data-measure-category={product.category} data-measure-provider={product.affiliateProvider || 'none'}>
    <h3>{example.heading}</h3><p className={styles.name}>{product.name}</p>
    <p>{example.benefit}</p><p><strong>Before you choose:</strong> {example.caution}</p>
    <p className={styles.spec}>Recorded dimensions: {product.dimensions}.</p>
    <Link className="text-link" href={`/en/products/${product.id}/`}>Compare {product.name}: dimensions and buying notes →</Link>
  </article>;
}

export default function FurnitureGuide() {
  return <article className={`page-shell ${styles.article}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}/>
    <header className={styles.header}>
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Furniture buying guide</span></nav>
      <p className="eyebrow">Buying well in Japan</p><h1>{furnitureGuide.title}</h1>
      <p className={styles.meta}>By <Link href="/en/about/">Living with Enough</Link> · Buying information checked <time dateTime={furnitureGuide.checkedAt}>23 October 2026</time></p>
      <p>For solid-wood pieces you plan to keep, start by comparing MASTERWAL. For an adjustable dining table, look at WOODLIFE. For furniture that folds or combines jobs, compare individual brands at FLYMEe. Include IKEA Japan, Nitori and MUJI in your wider search, especially when you need to compare several kinds of furniture.</p>
      <p>The right place to buy depends on more than appearance. A table needs to fit your room, reach it through the delivery route, arrive when you need it and come with terms you understand. This guide is for people living in Japan and buying for a home here.</p>
      <p className={styles.disclosure}><strong>Advertising disclosure:</strong> Our linked product pages contain affiliate links. We may earn a commission if you buy through them. The examples below are selected for their role in a home; they are not a ranked list or hands-on test. <Link href="/en/affiliate-disclosure/">Read our affiliate disclosure.</Link></p>
    </header>
    <figure className={styles.hero}><Image src="/images/home-living-room.jpg" width={1400} height={900} priority sizes="(max-width:760px) 90vw, 900px" alt="A bright living room with a white sofa, natural wood furniture and space to move"/><figcaption className={styles.caption}>Start with the space you want to keep, then choose what it still needs.</figcaption></figure>
    <div className={styles.body}>
      <nav className={styles.contents} aria-label="In this guide"><h2>In this guide</h2><ul>
        <li><a href="#shops">Where to shop</a></li><li><a href="#quality">What quality means</a></li><li><a href="#examples">Five furniture examples</a></li><li><a href="#measure">Size and access</a></li><li><a href="#delivery">Delivery and lead time</a></li><li><a href="#returns">Returns</a></li><li><a href="#language">Language and questions</a></li>
      </ul></nav>

      <section id="shops"><h2>Where to buy furniture in Japan: choose a starting point</h2>
        <p>Compare retailers by the decision you need to make. A specialist can help you examine a particular piece; a broader store can help you compare sizes and alternatives. Neither a familiar name nor a high price guarantees the right fit.</p>
        <div className={styles.shops}>
          <div className={styles.shop}><h3>MASTERWAL</h3><p>Consider its tables and seating when you have a clear long-term use for a solid-wood piece. Compare the exact wood, finish and dimensions.</p><p>Its <a href={sources.masterwal}>official ordering guide</a> describes furniture as made to order. Check the product-specific production time before planning a move-in date.</p></div>
          <div className={styles.shop}><h3>WOODLIFE.JP</h3><p>Our catalog includes an expanding table and compact seating from this retailer. Compare what changes size with what remains fixed, and read the selected specification carefully.</p><p>Read its <a href={sources.woodlife}>return policy</a> before ordering. Do not assume a size mismatch or failed delivery access will qualify for a return.</p></div>
          <div className={styles.shop}><h3>FLYMEe</h3><p>A retailer carrying multiple brands, rather than the manufacturer of every item it lists. Compare each product’s construction, assembly and delivery method.</p><p>Its <a href={sources.flymee}>delivery guide</a> distinguishes normal doorstep delivery from unpacking and installation. The available service depends on the item and area.</p></div>
          <div className={styles.shop}><h3>IKEA Japan</h3><p>Include IKEA when comparing different sizes and ways to furnish a room. Its <a href={sources.ikea}>English delivery guide</a> is a useful place to check delivery methods and how to obtain the final fee.</p><p>An English information page does not establish that every store or delivery team provides English support.</p></div>
          <div className={styles.shop}><h3>Nitori</h3><p>Include Nitori in a wider furniture comparison. Read the delivery category for the actual item, not just a general free-shipping headline.</p><p>The <a href={sources.nitori}>official delivery offer</a> has conditions involving eligible products and the delivery method. Room placement and other options can cost extra.</p></div>
          <div className={styles.shop}><h3>MUJI</h3><p>Consider MUJI alongside the other options when comparing furniture and storage. Review the item’s dimensions, delivery and assembly requirements before deciding.</p><p>Use the <a href={sources.muji}>official service information</a> as a starting point, then confirm what applies to your item and purchasing channel.</p></div>
        </div>
        <p className="small">We have not verified English checkout or customer support for MASTERWAL, WOODLIFE or FLYMEe. Ask the retailer directly. A site displaying Japanese is not proof that English help is unavailable.</p>
      </section>

      <section id="quality"><h2>What does “quality furniture” mean for your home?</h2>
        <p>Begin with the job: daily dining, a work surface, occasional seating or somewhere to put a cup. Then compare the material description, dimensions, finish and care instructions. Ask whether replaceable parts or repair support are available for the specific piece.</p>
        <p><span lang="ja">無垢材</span> means solid wood; <span lang="ja">突板</span> means veneer. Neither label alone tells you whether a piece is well made or right for your use. Read which parts use which material. A table with a wooden top may have a different base, and a description of one component is not a description of the whole product.</p>
        <p>For a chair, try the seat if you can, or compare seat height and depth with one you already find comfortable. For a table used for work, allow for your chair, knees and equipment. Buying fewer pieces can be sensible; buying one expensive piece that does not work is still a costly mistake.</p>
      </section>

      <section id="examples"><h2>Five pieces to compare by the role they would play</h2>
        <p>These examples come from our existing product selection. Each solves a different problem; they are not a shopping list for a complete room. Follow the internal links for the existing product details, retailer link and purchase notes.</p>
        {furnitureExamples.map(example=><ProductExample key={example.id} example={example}/>)}
        <p className="small">Product pages contain dated price records. Confirm the current price, selected specification, availability and delivery terms at the retailer. The order options checked for this guide are not a reservation or a stock guarantee.</p>
      </section>

      <section id="measure"><h2>Measure the room—and the whole delivery route</h2>
        <p>Product dimensions and package dimensions answer different questions. One tells you how the furniture occupies the room; the other helps establish whether it can reach the room. Ask the retailer for the packaged size and whether any components can be removed for delivery.</p>
        <ol><li><strong>Mark out the footprint.</strong> Use tape or paper on the floor. Allow for chairs pulled out, doors opening and the route you walk every day.</li>
          <li><strong>Measure the access route.</strong> Check the entrance opening, corridor turns, stairs and landings, elevator door and elevator interior. A wide doorway alone does not settle a tight turn.</li>
          <li><strong>Check building rules.</strong> Ask the building manager about delivery bookings, elevator use and protection of shared areas.</li>
          <li><strong>Send the retailer the difficult measurements.</strong> Ask it to assess the route before ordering, especially for assembled or made-to-order furniture.</li></ol>
        <p>Do not rely on a supposed standard doorway width for Japanese apartments. Measure yours. Likewise, a “compact” table can still be deep: the linked WILDWOOD is 100cm deep, while the smaller G1-7236 is 90cm deep even before expansion.</p>
      </section>

      <section id="delivery"><h2>Delivery, assembly and lead time: establish the total plan</h2>
        <p>A delivery fee is not automatically a promise to carry furniture into your room. Ask where the item will be handed over, who assembles it and who removes the packaging. Some delivery arrangements may involve a handover at the building entrance.</p>
        <p>FLYMEe’s normal delivery excludes room placement and assembly. Its unpacking and installation service includes those tasks where applicable, but service availability varies. Check the method on the particular item; do not apply one item’s service to another.</p>
        <p>IKEA Japan explains that final delivery fees depend on the order and delivery choices, including the destination. Nitori’s delivery terms also distinguish the eligible product and delivery method. Use the actual address and intended service when checking the total, rather than budgeting from a single national shipping figure.</p>
        <div className={styles.checklist}><h3>Your pre-order total</h3><ul><li>The exact size, color, wood or finish you selected</li><li>Delivery to your address, including any regional surcharge</li><li>Carry-in, assembly, access-related charges and packaging removal</li><li>The earliest realistic arrival date and whether it can be booked</li></ul></div>
        <p><span lang="ja">納期</span> is the lead time, not a guarantee that an item will arrive immediately after payment. Distinguish dispatch from arrival, and business days from calendar days. The G1-7236 page showed about 40–60 business days for special order when checked. Confirm the estimate again for your configuration and move-in date.</p>
        <p>If you need a table this week, a long special-order estimate may rule it out regardless of how well it fits. If you will move again soon, also consider whether a used or rented piece would better match the length of your stay.</p>
      </section>

      <section id="returns"><h2>Read cancellation and return terms before you pay</h2>
        <p>Make a note of the terms before placing the order. Check when the retailer treats it as confirmed, whether a made-to-order specification can be changed, what happens if delivery access fails and how to report damage or a defect.</p>
        <p>MASTERWAL’s ordering guide states that made-to-order purchases cannot be canceled, returned, exchanged or changed after ordering. WOODLIFE’s policy excludes customer-convenience returns such as a size mismatch or inability to bring the item inside. Read the applicable terms for the exact order; do not assume you can try furniture at home and send it back.</p>
        <p>A deadline for reporting an initial defect is not the same as a free-return period. Keep the order confirmation, selected specification and any written delivery advice. If something arrives damaged, follow the retailer’s reporting instructions promptly and ask what evidence it needs.</p>
      </section>

      <section id="language"><h2>Buying furniture when you do not speak Japanese</h2>
        <p>Separate three questions: can you read the product page, can you complete the purchase, and can you communicate about delivery or a problem afterward? A translated screen answers only part of that. Ask whether English support is available for your order and how the delivery company will contact you.</p>
        <dl className={styles.terms}>
          <div><dt lang="ja">完成品 / 組立品</dt><dd>Assembled product / assembly required. Check who will do the assembly.</dd></div>
          <div><dt lang="ja">玄関先渡し</dt><dd>Doorstep handover. Confirm the handover location and plan for moving it inside.</dd></div>
          <div><dt lang="ja">開梱・設置</dt><dd>Unpacking and placement. Check whether assembly and packaging removal are included.</dd></div>
          <div><dt lang="ja">受注生産 / お取り寄せ</dt><dd>Made to order / ordered in. Confirm the lead time and cancellation terms.</dd></div>
          <div><dt lang="ja">搬入経路</dt><dd>The access route from the delivery point to the room.</dd></div>
        </dl>
        <p>You can adapt this message when asking a retailer before ordering:</p>
        <blockquote className={styles.message} lang="ja">この商品の購入を検討しています。希望する仕様の納期、送料、梱包寸法、室内への搬入・組立の有無、返品・キャンセル条件を教えてください。英語での問い合わせは可能ですか。</blockquote>
        <p className="small">Meaning: I am considering this item. Please confirm the lead time, shipping fee, package dimensions, room delivery and assembly, and return/cancellation terms for my selected specification. Can I communicate with you in English?</p>
      </section>

      <section id="questions"><h2>A few questions before you choose</h2>
        <h3>Is furniture sold in Japan necessarily made in Japan?</h3><p>No. The shop’s location, the brand’s origin and the place of manufacture are different facts. Check the item’s stated origin if that matters to you; we do not infer it from the retailer’s name.</p>
        <h3>Can I return furniture if it does not fit?</h3><p>Do not assume so. Check the retailer’s policy before paying and ask it to review the delivery route. Return and cancellation terms can be particularly restrictive for made-to-order goods.</p>
        <h3>Does paying more solve the language or delivery problem?</h3><p>No. Confirm support, the handover method and the arrival plan independently of the item’s price. Ask for written clarification where a condition matters to your decision.</p>
      </section>

      <section className={styles.end}><h2>Choose the piece your home actually needs</h2>
        <p>Start with one job, one place and a realistic delivery plan. Compare the dimensions and buying notes, then check the retailer’s current terms before making the purchase.</p>
        <p><Link className="text-link" href="/en/products/">Browse furniture and buying notes →</Link></p>
        <p>If you are unsure whether you need to add anything, <Link href="/en/audit/">review what you already own</Link> first. The five-question tool is optional.</p>
      </section>
      <section id="sources"><h2>Sources and how this guide was prepared</h2>
        <p>We reviewed the retailers’ information and selected product options on 23 October 2026. Conditions can change. This is an editorial buying guide, not a claim that we have physically tested these pieces.</p>
        <ul><li><a href={sources.masterwal}>MASTERWAL: ordering, production and cancellation</a></li><li><a href={sources.woodlife}>WOODLIFE: returns and exchanges</a></li><li><a href={sources.flymee}>FLYMEe: delivery methods</a></li><li><a href={sources.ikea}>IKEA Japan: delivery information in English</a></li><li><a href={sources.nitori}>Nitori: delivery offer and conditions</a></li><li><a href={sources.muji}>MUJI: service information</a></li></ul>
        <p className="small">The product pages linked above lead to the original retailer listings. For each purchase, the retailer’s current product details, selected options and terms take priority.</p>
      </section>
    </div>
  </article>;
}
