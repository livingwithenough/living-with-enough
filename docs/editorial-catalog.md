# Japan everyday editorial catalog
Checked: 2026-10-29. Branch begins at main bc421aff71928f40f645b33fc42b259b81d69455.
## Publication and advertising are separate
26 new investigated records; 15 editorial selections, 11 private candidates. Existing 24 affiliate records and their order/HTML/images/pixels remain unchanged. Public total after approval: 39. TOP still takes the first four legacy records.
New selections have no verified issued advertising material and earn no commission. Their links are ordinary manufacturer links. BOS also has the manufacturer’s domestic shop link. No new ASP application or contract was submitted.
The adapter maps editorial publication to the legacy view status only after validation. This does NOT indicate affiliate approval. Canonical state lives in editorial-products.json. Candidate records never reach catalog props, detail routes or sitemap.
Images: placeholder only. No manufacturer/Rakuten photograph downloaded, reused or altered. The shared neutral placeholder is original interface artwork, not a product image.
## Batch workflow
One UTF-8 JSON array: src/data/editorial-products.json. See src/types/editorial-product.ts for fields. Every factual record carries dated source URLs. Official English names remain null unless verified; English display names are editorial translations.
- npm run products:validate
- npm run products:import -- path/to/batch.json (validate without writing)
- npm run products:import -- path/to/batch.json --write (replace new editorial catalog only after validation)
- Review git diff, npm test, npm run typecheck, npm run build, preview, review/approval.
An import is a full replacement of the NEW catalog, not an append. Include retained new records. It never writes legacy products.ts. New public product detail routes, category filters and sitemap entries are automatic. Feature product lists are derived from feature tags; existing featured legacy examples are retained.
Errors stop the import/build: duplicate IDs, official URLs or model collisions, missing bilingual copy/sources, unsafe URLs, invalid prices/basis, blockers on a published record, missing food fields, unverified image rights, or invented affiliate fields.
Unknown price is null, never zero. Held records need a reason. Unknown facts stay explicitly unverified. Suggested retail prices are labelled, not represented as a confirmed checkout quote.
## Holds
- CLK-211 キャニスター 100ml: 詳細ページを取得できず材質・手入れ・在庫未確認 (https://kinto.co.jp/collections/ceramic-lab/products/29701)
- しゅろのやさしいたわし むすび: 公式でSOLD OUT。再入荷未確認 (https://takada1948.shop-pro.jp/?pid=146303278)
- 天然木ちりとり: 公式でSOLD OUT。価格・再入荷未確認 (https://takada1948.shop-pro.jp/?pid=146303242)
- しゅろのやさしいほうき はたき 焼檜柄: 公式でSOLD OUT。再入荷未確認 (https://takada1948.shop-pro.jp/?pid=150392081)
- 100g尾西のアレルギー対応五目ごはん: 型番1008の全原材料・保存条件の詳細照合が未完了 (https://www.onisifoods.co.jp/products/spec.html)
- Explorer EX-X777D: 販売先価格は確認したが、現行材質・購入先の在庫・取扱条件の照合が未完了 (https://www.gentos.jp/products/ex-x777d/)
- Anker 521 Portable Power Station (PowerHouse 256Wh): 公式に販売終了表示 (https://www.ankerjapan.com/products/a1720)
- Anker 521 Power Bank (PowerCore Fusion, 45W): 公式在庫切れ。再入荷未確認 (https://www.ankerjapan.com/collections/mobilebattery/products/a1626)
- 家具転倒防止伸縮棒S KTB-30: KTB-30は生産終了。後継型番と天井・家具適合条件は別途照合が必要 (https://www.irisohyama.co.jp/products/tool-diy-material/emergency-supplies/earthquake-preparedness-products/furniture-fall-prevention-rod-prop-type/)
- 極上ほうじ茶100g袋: 公式に販売終了表示。11月1日発売の80g後継品を現時点で購入可能とは扱わない (https://www.ippodo-tea.co.jp/products/bancha601102)
- 三河産大豆の八丁味噌300g: 原材料・大豆アレルゲン・価格は確認済みだが、型番に対応する保存条件の一次確認が未完了 (https://www.8miso-shop.jp/?pid=119988446)
## Sources / factual limits
Every record includes maker/seller sources. Purchase availability means the recorded page state, never a live inventory guarantee. Prices and policies can change. Food ingredients, allergy statements, storage and shelf-life are recorded separately; unverified allergen information is not treated as absence.
OIGEN: current 15 cm ¥9,350 and 20 cm ¥11,000, not stale search prices. Takada long broom ¥19,800; short/custom versions differ. Asahi water ¥200 before food tax = ¥216 suggested, not store stock. Onisi white rice ¥410 suggested, not a retailer quote. Imuraya delivered shelf-life listing is a range, not a universal 5.5-year promise. Ippodo 100 g hojicha is discontinued; the announced replacement is not assumed currently available.
Disaster guide uses MAFF, Tokorozawa and JNTO/Japan Tourism Agency. Quantities are planning references and municipal conditions take precedence. No new diagnostic questions or medical claims.
## Revenue paths and owner actions
Existing towel affiliate details remain reachable from objects/gifts features; furniture/essentials guides remain intact. New ordinary links are not counted as affiliate_click. New internal details use existing product_click; GA consent and capture observer are unchanged.
Before main merge: review the preview and approve editorial publication. Optional future monetization requires actual ASP approval/materials and a separately reviewed schema migration. Do not infer any tracking URL.
