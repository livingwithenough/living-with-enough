# Living with Enough v0.1

「足るものを知る、静かな暮らし。」を核にした、日本語の商品発見メディアです。現在のv0.1ではJapandiを入口に、Lighting / Furniture / Decorを扱います。

## 公開方法：GitHub + Cloudflare Pages（0円）

このサイトはNext.jsの静的書き出しです。公開先にはCloudflare PagesのFreeプランを使います。独自ドメインを買わなくても `https://プロジェクト名.pages.dev` で公開でき、GitHubへ変更を送るたびに自動で再公開されます。

### 1. GitHubへ保存する

1. GitHubにサインインし、右上の `+` → `New repository` を選びます。
2. Repository nameを `living-with-enough` にします。
3. PublicまたはPrivateを選び、READMEや.gitignoreは追加せずに作成します。サイトの公開範囲とは別なので、ソースを非公開にしたい場合はPrivateで構いません。
4. このフォルダーで次のコマンドを実行します。`YOUR_NAME` はGitHubのユーザー名に置き換えます。

```sh
git init
git add .
git commit -m "Publish Living with Enough v0.1"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/living-with-enough.git
git push -u origin main
```

Gitが名前とメールを求めた場合は、GitHubで使う情報を設定してからcommitをやり直します。

```sh
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL"
```

### 2. Cloudflare Pagesへ公開する

1. [Cloudflare](https://dash.cloudflare.com/)で無料アカウントを作成またはサインインします。
2. `Workers & Pages` → `Create application` → `Pages` → `Connect to Git` を選びます。
3. GitHubとの連携を許可し、`living-with-enough` リポジトリだけを選びます。
4. 次の設定を入力します。

| 項目 | 値 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | 空欄 |

5. Environment variablesに `SITE_URL` を追加します。最初はCloudflareが割り当てるURLを使い、例として `https://living-with-enough.pages.dev` を設定します。プロジェクト名が既に使われていた場合は、実際に表示された `pages.dev` URLへ合わせます。
6. `Save and Deploy` を選びます。公開後、サイトURLを開いて確認します。

`SITE_URL` はcanonical、OGP、sitemap、robots.txtの絶対URLに使います。値を変更したら、Cloudflare Pagesで `Retry deployment` を実行するか、GitHubへ新しいcommitをpushして再ビルドしてください。

### 3. 以後の更新

ファイルを編集して確認後、次の3コマンドで公開内容が更新されます。

```sh
git add .
git commit -m "Update site"
git push
```

Cloudflare Pagesが自動でビルドし、同じ `pages.dev` URLへ反映します。Cloudflareの無料枠や画面名は将来変わる可能性があるため、公開時はCloudflareの案内も確認してください。

### 公開前の確認

```sh
npm ci
npm test
npm run typecheck
npm run build
```

`out/` が公開ファイルです。秘密情報を含む `.env.local`、依存パッケージの `node_modules/`、ビルド途中の `.next/` は `.gitignore` によりGitHubへ保存されません。

Next.js App Router / TypeScript / Tailwind CSSを使用し、スマートフォンを優先したレスポンシブ設計です。Next.jsの静的出力を使い、APIキーをブラウザーへ送信しません。

## 起動

Node.js 22以上を使用してください。

```sh
npm ci
cp .env.local.example .env.local
npm run dev
```

PowerShellでは `Copy-Item .env.local.example .env.local` を使用します。

```sh
npm test
npm run typecheck
npm run build
```

本番出力は `out/` です。Cloudflare Pagesではこのフォルダーを配信します。

## ページ

- `/` TOP
- `/products/` 一覧。カテゴリーと価格を組み合わせて絞り込み。状態はURLクエリーに反映
- `/products/[id]/` 承認済み商品の詳細
- `/about/` メディアについて
- `/affiliate-disclosure/` 広告方針
- `/sitemap.xml`, `/robots.txt`

## 商品の管理

`src/data/products.ts` を編集します。3件はすべて架空の商品で、画像はAI生成、価格・素材・寸法も仮設定です。実商品や販売店についての事実ではありません。サンプルは `isSample: true` とし、購入リンクは無効です。

`status: 'candidate'` は一覧・TOP・詳細ページ生成・sitemap・クライアントに渡す商品一覧すべてから除外されます。`src/lib/products.ts` が唯一の公開データ取得口です。データモジュールは `server-only` で保護しています。承認済みから候補へ変更したときも、必ず再ビルド・再デプロイし、配信先の古い静的ファイルを置き換えてください。

実商品を掲載する際は、名称・価格・素材・寸法・画像の利用権・選定理由・注意点・リンクを確認し、`isSample: false` と `status: 'approved'` に変更してください。確認できていない性能や使用経験は記載しないでください。購入先には有効なHTTPS URLを指定してください。`affiliateUrl` があればそれを優先します。リンクには `sponsored noopener noreferrer` を設定しています。

Under ¥3,000 は3,000円未満です。送料を含めた比較ではありません。根拠の曖昧な評価点はありません。

## 楽天APIの境界

`.env.local.example` に以下を用意しています。

- `RAKUTEN_APPLICATION_ID`
- `RAKUTEN_ACCESS_KEY`
- `RAKUTEN_AFFILIATE_ID`

`NEXT_PUBLIC_` を付けないでください。`.env.local` はGit管理対象外です。`src/lib/rakuten.ts` は `server-only` で、設定取得と候補への変換だけを持ちます。API通信・自動公開・書き込みAPIは実装していません。

将来はサーバー上のインポート処理でAPIレスポンスを検証し、`asCandidate()` を通して非公開ストレージへ保存し、人が確認後に承認する設計です。静的サイトのブラウザーからローカルのTypeScriptファイルへ保存することはできません。候補保存を追加するときは別途サーバーのジョブまたはデータベースを導入してください。

## SEO / OGP

`SITE_URL` はサイトの絶対オリジンを設定します。ドメイン変更後は再ビルドが必要です。各ページにタイトル・説明・canonical・OGP・Twitter Cardを設定。詳細では各商品の画像と説明を使います。架空の商品に実在の販売オファーと誤認されるProduct構造化データは付けていません。

## v0.1の範囲

多言語、全文検索、楽天API取得、AIによる部屋提案、ログイン、管理画面は未実装です。実際のアフィリエイト運用を開始する際は広告ページの記載も現状に合わせて更新してください。

## 検証記録

- Next.js 16.3.7 / React 19.3.0 / Tailwind CSS 4.3.3。依存関係はpackage-lock.jsonに固定。
- 本番ビルド成功、TypeScriptチェック成功。
- 候補除外、Underの境界値、サンプル・危険なURLのリンク無効化の3テスト成功。
- 7ページのmetadata、画像参照、sitemap、クライアントJSに楽天の秘密設定が含まれないことを確認。
- ブラウザーで390pxの表示、3,000円未満の1件表示、Lightingとの組合せで0件表示、リセットで3件表示を確認。
- 1440pxで画像読込みと横方向のはみ出しがないことを確認。
- この実行環境では子プロセスの起動がEPERMになるため、ビルドはワーカースレッドとTypeScript 6のAPI経由で実行。テストも同じテストファイルをプロセス内で変換して検証しました。通常の環境では上記npmスクリプトを利用できます。
- GitHub連携のCloudflare Pages向け設定を追加。公開先URLに合わせてSITE_URLを設定して再ビルドしてください。

## ブランドコンセプトの更新

名称はLiving with Enoughとし、「足るものを知る、静かな暮らし。」を中心にコピーを更新しました。`src/lib/brand.ts` の `name` を変更するとヘッダー、フッター、About本文、ページタイトル、OGPのサイト名に反映されます。ドメイン変更は別途SITE_URLで行います。

選定理由と注意点はTOP・一覧カードでも常時表示します。価格は選ぶ条件のひとつとして残し、既存の3カテゴリーとフィルターのロジックは維持しています。Gardenなどのカテゴリー・機能は追加していません。

更新後に本番ビルドと型チェック、既存3テストを実行。ブラウザーでPC 1440px・モバイル390pxを確認し、TOP→一覧→詳細、About、広告ページ、TOPへの戻りをクリック確認しました。価格3段階、カテゴリー、該当なし、リセットも確認。表示幅の横はみ出しはありませんでした。外部公開の状態は前回から変更していません。

