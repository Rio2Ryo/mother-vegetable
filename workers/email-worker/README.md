# Mother Vegetable — Email Worker

Cloudflare Workers + MailChannels API によるメール送信サービス。

## 仕組み

```
Next.js (Webhook等) → POST → Cloudflare Worker → MailChannels API → 受信者
```

MailChannels は Cloudflare Workers 経由のリクエストを無料で処理します。
送信量制限なし、従量課金なし。

## セットアップ

### 1. DNS レコード追加 (Cloudflare Dashboard)

対象ドメイン（例: `mothervegetable.com`）の DNS に以下を追加：

| Type | Name            | Content                                          |
|------|-----------------|--------------------------------------------------|
| TXT  | `@`             | `v=spf1 include:relay.mailchannels.net -all`     |
| TXT  | `_mailchannels` | `v=mc1 cfid=mv-email-worker`                     |

DKIM を設定する場合は [MailChannels ドキュメント](https://support.mailchannels.com/hc/en-us/articles/7122849237389) を参照。

### 2. Worker デプロイ

```bash
cd workers/email-worker
npm install
wrangler secret put API_KEY    # 任意の強いキーを入力
npm run deploy
```

### 3. Next.js 環境変数

`.env` に以下を設定：

```
EMAIL_WORKER_URL=https://mv-email-worker.<your-subdomain>.workers.dev
EMAIL_WORKER_KEY=<wrangler secret put で設定した値と同じ>
```

## ローカル開発

```bash
cd workers/email-worker
npm install
npm run dev
```

`http://localhost:8787` でテスト可能（API_KEY は `wrangler dev` 時にプロンプトで入力）。

## API 仕様

### `POST /`

**Headers:**
- `Content-Type: application/json`
- `X-API-Key: <API_KEY>`

**Body:**
```json
{
  "from": "Mother Vegetable <noreply@mothervegetable.com>",
  "to": "user@example.com",
  "subject": "件名",
  "html": "<h1>本文</h1>"
}
```

**Response:**
```json
{ "success": true }
```
