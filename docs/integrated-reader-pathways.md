# Integrated reader pathways — review packet

Checked 2026-10-25. Base main: f3c5f5d6cbf897d9cd9bf973441a59c6faeb0426.
Local integration reuses PR #6 head 13862144b0488895957554007bd58b3694bcc387 and PR #7 head 21e482d18b7195ccfae949aaae4a0d943b2f46f1. Both merged cleanly into the local integration branch. The original remote PRs remain open and unmerged; this proposal does not close or merge them or change main. If this integration is chosen, do not separately merge the superseded implementations without reviewing overlap. GitHub review should use this one integrated PR.

## Reader journeys and publication scope

- Home: existing copy and audit CTA on the left; existing full-frame living-room image on the right, capped at 350px high. Mobile keeps copy and primary CTA before the photograph. No new imagery or green UI.
- Three direct entrances, in both languages: moving/decluttering; starting a home in Japan; useful Japanese everyday objects. Existing four actions remain. Only the original four featured products remain on home. Browse-all becomes a charcoal CTA.
- Moving: /guides/moving-and-unwanted-items/ and /en/guides/dispose-furniture-japan/. Direct sell / municipal disposal / storage / cleaning sections; audit is optional. Explicitly separates resale from household-waste collection. No new waste-removal advertiser. No claim that an instrument buyer or cleaning directory is a furniture disposer.
- Starting a home: /guides/starting-a-home/ and /en/guides/starting-a-home-in-japan/. First-night needs, what can wait, room/access measurements, laundry, ordering and cancellation. Five existing comparisons: Hiorie towel, MAWA hangers, tower drying rack, tower leg basket and WOODLIFE folding chair. Not a bundle recommendation. Existing caveats retain the single-towel price, colour pricing and folding-leg-only distinction. Links PR #7's furniture guide rather than duplicating retailer comparisons.
- Objects: /guides/japanese-everyday-objects/ and /en/guides/japanese-everyday-objects/. Shuro brush/broom, OIGEN ironware, ceramics and existing towels. Ordinary maker links; no new craft advertising, copied photography, made-up experience, certification or English checkout claim.
- /guides/ and /en/guides/ now list actual published guide routes. Existing unimplemented draft records remain drafts and are not invented as URLs. Furniture guide remains English-only; no fake Japanese alternate.
- Product detail: original image/name and dated price, important purchase notes, exactly one existing retailer text creative/link, role, specifications, care limitations and suitability. Care absent from records is marked unrecorded, not invented. Image creatives remain external ad links with an explanatory label; internal details and retailer links have distinct presentation and 44px+ target areas.

## Search intent, competition and differentiation

No keyword-volume, difficulty, traffic or conversion dataset was obtained. The following are qualitative research hypotheses, not ranking or income forecasts.

| Pair | Query themes | Search-result competition inspected | Our useful distinction | Revenue path |
|---|---|---|---|---|
| Moving JA/EN | 引っ越し 不用品 買取 処分 / dispose furniture Japan / sodai gomi | Yokohama official English process; KONOMACHI-note Tokyo ward guide appeared in search (full retrieval failed); resident forum questions show deadline/access confusion | Purpose-first routes, municipal permission distinction, disposal fallback if resale fails, item-specific approved services, no blanket fee/day promise | Article → suitable existing service; disposal readers can finish with the municipality without buying |
| Starting JA/EN | 日本 新生活 必要なもの / starting a home Japan essentials | Home in Nihon furnishing-cost article; Dinos and Nitori checklist results | Confirm supplied inventory; first-night needs vs purchases that can wait; recorded affordable everyday tools alongside later furniture | Article → existing product detail → issued retailer ad; furniture decisions → PR #7 |
| Objects JA/EN | 棕櫚たわし 手入れ / Japanese everyday objects / shuro broom care | MADE in JAPAN.JP desk-broom/harimi guide; manufacturer English broom feature | Maker-specific claims and limitations, raw-material vs manufacturing origin, product-specific care, no untested durability or certification claim | Ordinary maker links + existing towel details; new craft ads are a future verified option |

Competitor URLs (content not copied):
- https://homeinnihon.com/articles/furniture-appliance-costs-new-home-japan
- https://made-in-japan.jp/en/guide/desk-broom/
- https://konomachi-note.jp/en/tokyo/guides/live-sodaigomi-tokyo/ (search-result observation only)
- https://www.dinos.co.jp/newlife_s/article_checklist/
- https://www.nitori-net.jp/ec/feature/newlife-checklist/
Furniture-guide competition and retailer checks remain in docs/furniture-guide.md.

## Primary sources and limits

- Ministry: https://www.env.go.jp/recycle/kaden/tv-recycle/qa.html — municipal household-waste route, no confusing resale/industrial licences with collection authority, special appliance recycling. The page is legal/environmental guidance; local permissions, commissioning and any statutory exception must be checked with the municipality for the actual collector and place. No new collector was approved here.
- Yokohama: https://www.city.yokohama.lg.jp/lang/residents/en/garbage/oversizedgarbage.html — advance booking, fees, collection point, approximate timing and stated English reception. Only a labelled municipal example, not a national rule.
- https://gakkikaitori.co.jp/faq/ — item/area exceptions, valuation fee and last-minute cancellation qualification. Do not reproduce outdated identity-document examples; ask for currently accepted documents.
- https://brandear.jp/ct/faq/98 — official indexed shipping/application information; full direct fetch returned 403. Do not infer current identity eligibility or acceptance-after-cancellation rules.
- https://www.moclean.jp/view/guide and https://www.moclean.jp/html/page3.html — official indexed guide/FAQ, clothing exclusions, regional/additional charges and cancellation stages. Full guide fetch was inconsistent. Exact selected-course price, postcode surcharge and return window require current confirmation. No blanket free shipping or same-day claim.
- https://takada1948.jp/ and https://takadatawashi.com/ — maker and English introduction. Japanese/overseas fibre distinction. English domestic checkout/support not verified.
- https://takada1948.shop-pro.jp/?pid=146303278 and ?pid=146303236 — individual brush/broom specifications, Kainan production and caveats. A static page may show SOLD OUT; these are reference links, not approved buy-now offers or live-stock guarantees. An old care PDF returned 404 and is deliberately not linked.
- https://oigen.jp/pages/q-a, https://enjoy.oigen.jp/aboutoigen and https://enjoy.oigen.jp/contact_repair — object-specific care, maker history and conditional repair consultation. No brand-wide craft designation or English support asserted.

## Advertising inventory and pending work

All 24 product records, order, affiliate URLs, A8 HTML/images/pixels and Rakuten materials are untouched. TOP4 are unchanged. All product/service ad sources come from existing records; no generated URLs, parameters or pixels.
Existing direct services: instrument-buyer, audio-buyer, Brandear, Moclean (clothes only), Yourmeister (cleaning). Approval/publication filtering is reused, not duplicated. Exact issued Moclean text HTML appears once per guide with its original pixel; no extra pixel is appended. Audit still uses its existing implementation and five questions. Lenet, Brand Off, pending programs and Hello Storage remain absent. Hello Storage is rejected; no link is added.

Craft acquisition research:
- Takada Rakuten shop https://www.rakuten.co.jp/tawashitsushin/ ; company page https://www.rakuten.co.jp/tawashitsushin/info.html identifies 株式会社コーゾー, matching the maker's company page https://takada1948.jp/about/. It is a concrete future candidate. No issued affiliate URL/image or terms verified, so no record/advertising CTA is added.
- OIGEN official store/care/repair verified; an eligible authorised Rakuten listing and affiliate material are not yet verified. Do not guess one.
- A8's existing session showed Moclean issued materials, but opening program search required re-authentication. No new program existence/approval can be certified from this session. No application or account change was made.
- Before main merge, review the new guide placements against each advertiser's current rules and register/submit the Japanese/English publication URLs where required. Moclean's existing notes require publication-URL submission after release. External registration and any preapproval remain owner tasks. No new permissions or agreements were accepted.

## Measurement and 30/90-day plan

PR #6 consent logic, SPA referrer and re-grant regression fixes are reused. No ID was set and no external analytics/GSC setting was changed. Existing event names are intact. Add catalog_click to distinguish catalog entry from a product-detail click. Service guide clicks reuse affiliate_click with service/category/provider/placement; internal product links reuse product_click. Existing audit clicks still have their single handler. All GA sends remain consent/ID/hostname gated; local CustomEvent integrations remain available. Sources do not send ad destination URLs or free-text inputs.

| KPI | Source / calculation | Breakdowns and interpretation |
|---|---|---|
| Search exposure/clicks | GSC impressions, clicks, CTR, query/landing URL | JA/EN, article; not GA visits; unverified property is 未取得 |
| Organic visits / article visits | GA4 organic sessions and page_view | locale, landing/article path; consent-limited counts, not total audience |
| Catalog entry | catalog_click | placement=home_all_products/home_secondary/guide_catalog; clicks, not users |
| Article → detail | product_click from source=guide | product, category, page_path; count activated detail links, not purchases |
| Ad clicks / CTR | affiliate_click / eligible page views | provider, service/product, source, placement; one click event per activation; native GA outbound click is not added to this KPI |
| Audit start/complete/rate | audit_start, audit_complete | locale; completed/started for comparable cohort; no question changes |
| ASP occurrence | A8/Rakuten occurrence export | ASP, program, date/cohort, status; GA cannot confirm it |
| Approved count/rate | approved / resolved (approved+denied) | same occurrence cohort; pending separate, show denominator |
| Confirmed revenue | ASP confirmed net amount | exclude estimates/occurrence value; keep reversals and currency explicit |
| Revenue per visit | confirmed net / attributable cohort sessions | only if scope/cohort attribution is supportable; otherwise 未取得, never invent a visitor-level join |

Missing values are 未取得 (null), not zero. A real measured zero is allowed only with confirmed coverage. Approval may lag weeks: report pending cases and do not divide calendar-month approvals by unrelated occurrences. Keep gross revenue, net confirmed revenue and profit distinct. No user identity stitching or fabricated attribution.

First 30 days after owner-approved launch/GA/GSC setup: verify consent/one-event sends with DebugView; confirm sitemap ingestion and actual index status; record weekly GSC article/query/locale data; compare article-to-detail and service-ad CTR; inspect mobile link failures; export ASP occurrences, resolved and pending counts. Seek a first confirmed outcome without declaring it achieved. Prioritise pages with actual impressions and unresolved reader needs. Do not infer an English-support conversion problem from tiny samples.

By 90 days: compare mature occurrence cohorts by service/product/article and locale, actual approval rates, confirmed revenue per click, maintenance effort and reader suitability. Improve the strongest useful path before adding more inventory or articles. Stop promoting a service if eligibility or lawful operation cannot be established. Craft is a differentiation hypothesis; services are a revenue hypothesis, neither proven.

The ¥2,000,000/month goal is not a forecast. A scenario can later use measured eligible sessions × ad CTR × occurrence per click × resolved approval probability × confirmed payout, with pending lag and mix accounted for. Required traffic cannot responsibly be calculated before those inputs exist. New-visitor GA counts cannot be substituted for ASP approvals. No expected approval-rate number is invented.

## Release checks

Local integrated tests/typecheck and protected-source hashes are recorded in tests. Final preview must validate 67 sitemap URLs, actual canonical/hreflang pairs, JA/EN goals and product detail/issued ads, PC and 390px, no Google tag with missing ID/denied consent, and all blocked services absent. Local Windows build has a known SWC path canonicalization access-denied failure; report it separately from Cloudflare static-export success. Do not merge this PR or alter external account settings in this task.


### Verified integration preview (2026-10-26 JST)

- PR: https://github.com/livingwithenough/living-with-enough/pull/11 (main is not merged; #6 and #7 remain open).
- Content head: f170c880ae52d7bd598513889316fb4d2e3abefa. Cloudflare Pages check 121328013150 reports Deployed successfully. Preview: https://4c27d9df.living-with-enough.pages.dev/ .
- 41/41 regression tests passed and TypeScript typecheck passed. Protected product/service/audit sources and the hero image match main; the remote integration tree matches the validated local sources after line-ending normalization.
- HTTP crawl: all 67 sitemap URLs returned 200, have the expected production canonical, no HTML noindex, valid emitted JSON-LD and no internal page targets outside the valid sitemap.
- Browser checks at 1280px and 390px: JA/EN homes, practical guides, existing English furniture guide, product details and question-one audit. No horizontal overflow or completed broken images on checked pages. Desktop hero photo height 350px; mobile copy/CTA precede the photo. Existing retailer CTA is before the product role/specification sections, with at least 48px button height.
- JA goal-to-guide and JA-to-EN translation navigation exercised. Five published service IDs only on moving guides: instrument-buyer, audio-buyer, brandear, moclean-storage, yourmeister. Moclean issued HTML/pixel appears once, clothing limitation is explicit. No Lenet, pending storage or Hello Storage ads. No new craft ads.
- Preview has no Google tag (missing/preview ID fail-closed behavior). Consent, one-event dispatch, SPA referrer and re-grant page_view behavior are covered by regression tests; production DebugView and ASP confirmed outcomes remain unmeasured.
- QA screenshots and machine-readable crawl/mobile/desktop results are saved locally under outputs/integrated-reader-pathways/. Screenshots are not added to the production bundle.
- Local Windows build fails before compilation with the known SWC jsc.baseUrl path access error; it is not the Cloudflare result.

Release still requires owner review, and any advertiser-required URL/creative review for the added article placements. A8 re-authentication prevented a fresh new-campaign check; no application or condition is invented. GA4/GSC external account setup is not performed.
