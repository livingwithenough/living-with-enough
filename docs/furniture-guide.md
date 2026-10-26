# English furniture guide — review and release notes

Date: 2026-10-23. Branch: english-furniture-guide. Base: main d06aad36f5c75475d7f51d0bf66fd5c4756b711d. This is a separate article PR; it contains none of PR #6's analytics changes and must not merge that branch as a dependency.

## Search intent and editorial decisions

Primary query: where to buy quality furniture in Japan. Supporting queries: buy furniture in Japan; furniture delivery Japan; solid wood furniture Japan; space-saving furniture Japan; furniture shopping in Japan in English. These are qualitative targets from current search results, not measured search volumes or guaranteed traffic. Search volume, keyword difficulty, predicted clicks and predicted revenue remain uncollected.

Audience: English-reading residents buying for a home in Japan, rather than tourists or buyers arranging international export. The article answers where to shop first, then covers materials/fit, five product examples, the delivery route, service scope, lead times, cancellations/returns and language support. Each example includes a specific use and a reason it might not suit the reader.

Competitors inspected:
- https://japan-dev.com/blog/best-places-to-get-furniture-in-japan — broad new/used retailer coverage and service information.
- https://mailmate.jp/blog/best-furniture-shops-in-japan — retailer/price/style comparison, secondhand options and FAQs.
- https://www.realestate-tokyo.com/living-in-tokyo/shopping/furniture-buying-guide/ — Tokyo resident/expat shopping and rental context.

Our approach: offer national domestic-purchase context, concrete product dimensions and order-term checks rather than another long store ranking. No star scores, fictional hands-on testing or blanket English-support claims. Retailer conditions are verified from official sources, not copied from competitor fee summaries. Article copy is original; no competitor images are used.

## Selection and source verification

All 24 approved records remain unchanged. Five examples are linked to their existing English detail pages:
- masterwal-wildwood-dining-table — a dining/work surface; selected link is W120 × D100 × H71.5cm.
- woodlife-g1-7236 — expanding tabletop; does not claim folding legs. Official page shows two sizes and a special-order estimate around 40–60 business days, with assembly options.
- masterwal-mark-stool — stacks up to four; W38 × D38 × H44cm.
- flymee-moheim-by-tray-table — detachable tray; 43 × 43 × H53.5cm.
- flymee-dulton-folding-trolley — a movable surface that folds to about 7.5cm deep.

Official product pages and required options were inspected in the browser on 2026-10-23. FLYMEe's non-JavaScript text extraction showed SOLD OUT, but the rendered pages offered color selection and an estimate. White MOHEIM and silver DULTON showed approximately 5–10 days with normal delivery when selected. No item was added to a cart. We deliberately avoid promising stock or a fixed delivery date in the article. Other variants may differ.

Retailer sources in the article:
- MASTERWAL ordering guide: https://www.masterwal.jp/shop/pages/shopping_guide01.aspx
- FLYMEe delivery methods: https://flymee.jp/guide/48/
- WOODLIFE returns: https://www.woodlife.jp/guides/return (checked in the rendered official page during preparation)
- IKEA Japan delivery in English: https://www.ikea.com/jp/en/customer-service/services/delivery/
- Nitori delivery conditions: https://www.nitori-net.jp/ec/characteristic/shipping-perks/
- MUJI official service information: https://www.muji.com/jp/shop/service-list/

The article distinguishes doorstep handover from room placement/assembly, product size from package size, and defect-reporting deadlines from convenience returns. It does not assert English checkout/support for the three affiliate retailers. No blanket shipping fee, current product price or manufacturing origin is invented. Existing detail-page price dates remain intact; readers are told to confirm current selected prices and conditions at the retailer.

## Revenue path and disclosure

Entry: search result or a quiet contextual link on /en/.
Journey: article -> five existing /en/products/{id}/ pages -> existing issued retailer advertising links. The full catalog and an optional review-tool link remain available. No new advertising URL, HTML, image, campaign parameter or pixel is issued, copied or rewritten. The article uses the existing site living-room photo, not retailer product photography.

Advertising is disclosed before the article body with a link to the existing English disclosure page. Product examples carry nonvisual product/category/provider data attributes compatible with PR #6's delegated product-click measurement after that PR is independently merged. This article has no analytics dependency; it works on current main. GA4 activation/GSC ownership from P0 remain external tasks. No actual conversions, approval rates or earnings were measured or forecast here.

## SEO and language routing

- Route: /en/guides/where-to-buy-quality-furniture-in-japan/
- Title: Where to Buy Quality Furniture in Japan (root template adds Living with Enough)
- Description: Compare furniture shops in Japan, solid-wood and space-saving options, delivery, assembly and returns. A practical guide for people living in Japan.
- Self-canonical to production; index/follow in source. Preview may have Cloudflare's noindex header, as expected for previews.
- Explicit empty language alternatives override the bilingual root's links; no nonexistent Japanese article or x-default is emitted.
- Sitemap: preserve all 58 existing entries and append one English-only article (59 total).
- BlogPosting + BreadcrumbList; actual editorial organization, English language and checked/modified date. No invented publication date, rating, product-offer schema or testing claims.
- Article's Japanese switch goes to the existing Japanese home, with an explicit accessible label. Existing bilingual switch destinations are unchanged. Japanese guide drafts/noindex are unchanged.
- No new guide-index route or empty translated article is introduced.

## Code scope

New: article page + scoped CSS; furniture-guide data; guide-routing helper; furniture-guide test; this document.
Existing files changed: English home (one internal link), sitemap (one English URL), language switcher (untranslated-guide fallback). No file overlaps PR #6's changed-file list. Japanese page source, five questions/decision rules, product records and approved creatives are untouched.

## Validation and publication decision

Local tests: 28/28 passed (24 existing + 4 article/SEO/routing checks). TypeScript: passed. The article render test checks all five approved targets, disclosure, no embedded affiliate/pixel URLs and structured data. Sitemap tests protect all prior 58 URLs and avoid fabricated translations. Existing catalog/advertising baseline tests pass.

Cloudflare preview build passed for ee5975bb50ac9326c3d6635984bbfb0f1f332abb (https://b8bda341.living-with-enough.pages.dev). Rendered article: HTTP 200, one H1, lang=en, production canonical, index/follow metadata, no alternate-language link tags and valid structured data. Cloudflare preview sends its expected noindex response header. All 59 sitemap URLs returned HTTP 200; robots allows crawling and names the production sitemap. Desktop (1280px) and 390px views checked: no horizontal overflow, loaded hero image, readable headings/copy/links; contents anchor reached the examples. The MOHEIM internal link navigated to its existing English detail with the issued A8 link and 1px tracking image. English home still shows the original four products and exposes the article link. Browser console had no warnings/errors. Remote source matches local tested content after normalizing CRLF/LF. The PR #6 file list has no overlap. Do not merge or change GA4/GSC settings in this task. Publishing exposes a factual editorial draft to readers, not a revenue guarantee. Recheck rapidly changing order conditions if publication is delayed.


Build compatibility: a later Cloudflare rebuild compiled and typechecked successfully, then failed during page-data collection with ERR_WORKER_INVALID_EXEC_ARGV because the environment supplies NODE_OPTIONS=--use-openssl-ca. Switch Next page-generation workers to child processes (workerThreads:false), preserving the existing two-worker limit and all static export settings. This changes build execution only, not rendered content or security settings. Local Windows build separately fails before compilation with SWC path canonicalization access denied; the Cloudflare Linux build is the release check.
