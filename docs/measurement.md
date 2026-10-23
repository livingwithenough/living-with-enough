# P0 measurement operations — 2026-10-22

Base: main d06aad36f5c75475d7f51d0bf66fd5c4756b711d. This PR does not activate a GA property, verify a GSC property, change ASP settings, or merge main.

## Before production activation (owner actions)

1. Create/select the correct GA4 web stream. Supply its real `G-...` ID as `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in Cloudflare Pages **production** build environment and rebuild. This public identifier is not a secret. Blank/invalid ID means no Google tag. Do not add GTM or another GA tag alongside this implementation.
2. `NEXT_PUBLIC_GA4_HOSTNAME=living-with-enough.pages.dev` limits collection to that exact hostname. Preview and localhost do not send production traffic. Use a dedicated TEST property + exact preview hostname to validate Google delivery, never a made-up production ID. On a future domain move update this value and `SITE_URL`, rebuild and re-verify GSC. Production `SITE_URL` must be `https://living-with-enough.pages.dev`, not the localhost example value.
3. In the GA4 web stream, turn off Enhanced Measurement (especially **page changes based on browser history** and **outbound clicks**). `send_page_view:false` disables the config page view, not Enhanced Measurement history page views. This integration owns manual page_view and affiliate_click. Never add GA's automatic `click` to the affiliate_click KPI. Also disable form collection/site search so query strings or form values are not collected by that feature.
4. Review the JP/EN analytics disclosure appended to the existing affiliate-disclosure page. It explains Google LLC, purpose, information, refusal, and the separation from existing ASP creatives. Existing footer links reach these settings. There is intentionally no new banner or redesign: analytics defaults to OFF and visitors opt in on this page. This opt-in sample is not a census of all visits. If a CMP/banner is desired later, obtain design approval and connect it to `setAnalyticsConsent`; do not silently grant consent.
5. Confirm the site's applicable privacy/external-transmission obligations, data retention (suggest 2 months unless the owner needs longer), access roles and processor terms. Review existing A8/Rakuten external transmissions separately: the GA setting does **not** stop existing advertising pixels or retailer transfers. This PR preserves them exactly as requested; a complete external-transmission notice for ASPs is a separate review. No claim is made that GA consent alone satisfies every jurisdiction's requirements.
6. After configuration: use a clean browser, verify zero Google requests before opt-in; allow -> one page_view on entry/navigation/back, one custom event per action; refuse -> subsequent events stop; reload preserves refusal. Confirm real arrivals in DebugView/Realtime using the TEST property first. This last-mile Google delivery cannot be certified without a real ID/property and externally configured stream settings. No account settings were changed in this task.
7. Register event-scoped custom dimensions as needed: locale, source, affiliate_provider, placement, category, service, product. Do not register arbitrary user data, URL queries, program text or other high-cardinality values. audit_complete is the behavioral key event, **not** a sale. ASP reports remain authoritative for money.

## Implementation and event contract

The existing `living-with-enough:event` CustomEvent remains available whether configured, refused, offline or blocked. GA4 receives it only through trackEvent, not through a second CustomEvent listener. One shared client component initializes the tag once and observes App Router pathname changes. Repeated effect initialization on the same pathname is deduplicated; navigation away and back counts again. No pre-consent events are replayed. Query strings/fragments are excluded from manually sent page URLs/referrers; no advertising URL, tracking parameter or answer/free-text payload is sent.

Consent changes are synchronized across open tabs using the storage event. Consent is stored under `lwe:analytics-consent:v1` in this browser. Missing/unavailable storage defaults to denied; a choice still works in memory if storage is blocked. Advertising consent remains denied; Google Signals and ad personalization are disabled. Withdrawing consent sets Google's disable flag and blocks our sends (it does not remove already-created cookies or retroactively erase Google records). Browser privacy controls can delete existing cookies. An already-present gtag/GTM/Analytics script makes this implementation fail closed rather than installing a duplicate; resolve such a conflict before activation.

| Event | Trigger / dimensions |
| --- | --- |
| page_view | Initial opted-in page + pathname navigation; locale, source, page_path, sanitized page_location/referrer |
| audit_start | First answer once per review attempt; locale, source=audit |
| audit_complete | Existing completion handler; locale, source=audit, category=item, result |
| result_sell/store/keep/outsource/buy | Existing result dispatches; locale, source=audit, category=item |
| affiliate_click | Audit CTA: service/category/result, advertiser/program, provider=a8, placement=audit_service |
| affiliate_click | Product card/detail: product/category/provider; placement=a8_banner, a8_text or shop_link; source=home/product_list/product_detail |
| product_click | Existing audit browse CTA (placement=browse_products) or internal card link (placement=product_detail_link); product when applicable |

Product tracking is delegated to existing wrappers/anchors, so issued HTML and tracking pixels remain byte-identical. No navigation cancellation or redirects. Native clicks (including keyboard activation) and middle-click auxclick are supported; context-menu “open link” is not observable. A single activation produces affiliate_click **or** product_click, not both. A8 HTML and normal Rakuten links are distinguished by provider/placement. No additional impression pixels are introduced.

Audit's existing back-to-last-answer flow can intentionally complete again; event names and decision behavior are unchanged. For attempt-based completion rates use session+audit_start boundaries to group completions (first completion per attempt), rather than raw completion events divided by starts. result_buy is a supplemental recommendation and must not be added to primary result counts. A separate new review starts only when the existing reset flow resets startTracked.

## Search Console / indexability investigation

- Read-only check on 2026-10-22: the current signed-in GSC account's property picker did **not** list living-with-enough.pages.dev. This is not proof that no other account has verified it. No property was added, verified or submitted.
- No GA/GTM/GSC verification meta or verification file was found in the source. Source absence alone cannot rule out prior DNS or account-based verification.
- Owner should check the relevant Google account. For the current shared pages.dev hostname, use URL-prefix property **https://living-with-enough.pages.dev/**. Do not attempt a Domain property for pages.dev (not owned by this site). Available verification: owner-supplied HTML meta token (add to both root layouts), or Google's unmodified HTML file in public/. DNS is appropriate only for a domain the owner controls. GA-based verification requires a correctly deployed qualifying tag/account; do not assume it follows from this code.
- Submit https://living-with-enough.pages.dev/sitemap.xml only after ownership is verified. Account/property/verification changes require owner approval.
- Sitemap source has 58 JP/EN URLs: home, audit, products, about, disclosure + 24 product pages per language. Every pair has absolute canonical and reciprocal ja/en/x-default hreflang using production origin. robots allows `/` and references this sitemap. Static export routes are supported.
- `/guides/` is a Coming soon index, deliberately noindex, follow, excluded from sitemap; there are no published guide article routes or EN equivalents. Keep that noindex until real articles exist. Other intended indexable routes have no noindex in source. A future article must have its own canonical, real locale alternatives only, sitemap entry and page_view path reporting.
- Live exported HTML, sitemap/robots and headers must also be checked on preview (canonical remains production). GSC coverage and actual indexation cannot be inferred from HTML alone.

## KPI specification (no invented measurements)

All reporting uses Asia/Tokyo day/month boundaries and an explicit extraction timestamp, period, data source and currency JPY. GA and ASP attribution are different and must never be presented as matched revenue attribution. Preserve original ASP rows privately, not in public Git. Empty/missing/not-yet-connected sources are **未取得 / Not collected (null)**, not 0. A measured zero is valid only after successful extraction for a fully covered period. A zero or missing denominator yields unavailable, never 0%.

| KPI | Authoritative source / definition |
| --- | --- |
| JP/EN search traffic | GSC Web search clicks/impressions by landing-page prefix: `/en/` = EN, all other production pages = JA. URL language, not inferred visitor language. GA organic sessions are a separate consented-behavior metric, not interchangeable with GSC clicks. |
| Visits by article | GA sessions with the specific canonical article page_path; also report page_view separately. No published articles currently -> not collected / not applicable, not fabricated 0. |
| Audit starts / completions / rate | GA audit_start and first audit_complete per attempt (session + ordered start boundaries); locale split. Rate = completed attempts / started attempts in the same start-cohort, with a declared observation window. Raw events include re-completion after back; do not treat these as new starts. Use GA BigQuery export/ordered exploration for attempt grouping; until available, label raw events explicitly and attempt rate unavailable. |
| Advertising clicks | GA affiliate_click only, split locale/source/provider/service/product/placement/category. Browser blocks/refusal/context-menu opens are unobserved; not billed clicks or purchases. product_click means internal browsing and is excluded. |
| Page advertising CTR | Sessions with affiliate_click on a page / sessions viewing that same page in the same period, grouped by locale/source/page_path. Do not divide all clicks (can exceed 1 per session) by sessions and call it CTR. Service-card impression CTR is not available (no viewability/impression event); result page views are not card impressions. |
| ASP generated conversions | A8/Rakuten reports: unique ASP transaction/order IDs by occurrence date, provider, status and reported commission. No GA event is a generated sale. |
| Approvals / approval rate | ASP unique approved transactions / (approved + declined transactions) in the same occurrence cohort at extraction time. Pending shown separately, excluded from decided approval-rate denominator; also show cohort age. Avoid mixing occurrence and approval months. |
| Confirmed revenue | Sum ASP-reported finalized commission (JPY), refunds/reversals reflected. Report accrual/finalization date basis and tax treatment as supplied by each ASP; do not sum pending estimates. |
| Revenue per visit | Confirmed ASP revenue for a declared period / GA sessions for that period; explicitly a site-level directional ratio, not session attribution. GA consent coverage and occurrence/finalization lag limit interpretation. If either feed is missing, ratio is null. |

Suggested normalized private report fields: `period_start, period_end, extracted_at, timezone, provider, transaction_id, occurred_at, decided_at, status[pending|approved|declined|reversed], commission_jpy, source_report, availability`. Missing numerics remain null. No export/actual earnings were retrieved or fabricated in this task.

## References

- Manual page views / history duplication: https://developers.google.com/analytics/devguides/collection/ga4/views?technology=websites
- SPA validation: https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
- Enhanced outbound click measurement: https://support.google.com/analytics/answer/13566436?hl=en
- Basic consent / no pre-consent Google requests: https://developers.google.com/tag-platform/security/concepts/consent-mode
- Consent API: https://developers.google.com/tag-platform/security/guides/consent
- GSC ownership methods: https://support.google.com/webmasters/answer/9008080?hl=en
- Japan external transmission information (Google): https://business.safety.google/intl/ja/tba-jp/

## Verification results (2026-10-22)

- npm test: 31/31 passed (24 existing + 7 analytics tests). npm run typecheck: passed.
- Local npm run build: blocked before compilation by Windows SWC canonical-path Access denied (os error 5). No production workaround or configuration change was introduced. Cloudflare Pages preview build/deploy succeeded for code commit e0d139c and documentation commit d6511ba; preview https://2a330206.living-with-enough.pages.dev/.
- Read-only live SEO audit at 2026-10-22T07:10:15Z: all 58 sitemap URLs return successful responses, matching production canonicals and three locale alternates; no noindex in meta or X-Robots-Tag. robots.txt allows crawling and points to the production sitemap. The unpublished guides index remains noindex. Local evidence: outputs/p0_measurement/seo-audit.json in the parent task workspace (not a public analytics export).
- PC 1280px: JP home/products and EN audit/product detail/disclosure render correctly. TOP retains the exact four IDs. Product listing has 24 cards and no broken images. All 24 cards' external hrefs and image URLs match the production DOM exactly, including tracking images.
- 390px: JP/EN STORE results (five questions completed), EN product list and JP disclosure show no horizontal overflow. Moclean's exact issued href and pixel remain present. No console errors observed on the tested audit tab.
- Measurement ID absent: zero Google tag elements on all inspected preview pages; disclosure states analytics is disabled. Mock-browser tests verify single tag, duplicate effect/page-view suppression, no pre-consent replay, refusal/re-consent, invalid ID, preview-host exclusion, existing-tag exclusion, blocked storage, and product/provider/placement routing.
- Real GA4 delivery, GA account configuration and GSC ownership remain unverified/unconfigured; follow the owner checklist above. No real traffic or revenue values were manufactured. No main merge or external configuration was performed.

## PR #6 final corrections

- Initial page_view uses the sanitized document.referrer. Every later pathname transition uses the immediately previous observed virtual URL (origin + path), including browser back/forward; repeated effects on the same path do not replace it with a self-referrer. Custom events use the same referrer as their current virtual page. Queries/fragments remain excluded.
- Denial clears the last-sent-page deduplication state. Re-granting on the same pathname sends one fresh page_view for the new permission period. Repeated grants, same-route effects and storage notifications do not produce another view. Routes/events during denial are not replayed. Configuring from stored consent also synchronizes Google's disable flag.
- Two regression tests first reproduced both reported bugs on the previous code, then passed after correction. They cover initial referrer, multiple SPA transitions, custom events, back navigation, same-path effects, same-URL re-grant, repeated grant, denied navigation and no replay.
- No design, audit, product or advertising material changes in this follow-up. External activation prerequisites above still apply; code merge and enabling live collection are separate decisions.
