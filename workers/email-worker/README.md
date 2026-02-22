# Mother Vegetable — Email Worker

Cloudflare Workers + Brevo (旧Sendinblue) API によるメール送信サービス。

## 仕組み

```
Next.js (Webhook等) → POST → Cloudflare Worker → Brevo API → 受信者
```

Brevo 無料枠: 300通/日（約9,000通/月）。

## セットアップ

### 1. Brevo アカウント作成

1. https://app.brevo.com で無料アカウント作成
2. Settings → SMTP & API → API Keys で API キーを取得
3. Settings → Senders & IP → ドメイン認証（SPF/DKIM を設定）

### 2. DNS レコード追加 (Cloudflare Dashboard)

対象ドメイン（例: `mothervegetable.com`）の DNS に以下を追加：

| Type | Name     | Content                                                              |
|------|----------|----------------------------------------------------------------------|
| TXT  | `@`      | `v=spf1 include:sendinblue.com -all`                                 |
| TXT  | (DKIM)   | Brevo ダッシュボードの指示に従い設定                                  |
| TXT  | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@mothervegetable.com`       |

### 3. Worker デプロイ

```bash
cd workers/email-worker
npm install
wrangler secret put API_KEY        # Next.js 側の EMAIL_WORKER_KEY と同じ値
wrangler secret put BREVO_API_KEY  # Brevo で取得した API キー
npm run deploy
```

### 4. Next.js 環境変数

`.env` に以下を設定：

```
EMAIL_WORKER_URL=https://mv-email-worker.<your-subdomain>.workers.dev
EMAIL_WORKER_KEY=<wrangler secret put API_KEY で設定した値と同じ>
```

## ローカル開発

```bash
cd workers/email-worker
npm install
npm run dev
```

`http://localhost:8787` でテスト可能。

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

## 無料枠について

| サービス | 無料枠 |
|----------|--------|
| Cloudflare Workers | 10万リクエスト/日 |
| Brevo | 300通/日（約9,000通/月） |
