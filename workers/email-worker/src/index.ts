// ==========================================================================
// Mother Vegetable — Email Sending Worker
// Cloudflare Workers + Brevo (旧Sendinblue) API でメールを送信する
//
// デプロイ手順:
//   1. cd workers/email-worker
//   2. npm install
//   3. wrangler secret put API_KEY        ← Next.js 側の EMAIL_WORKER_KEY と同じ値
//   4. wrangler secret put BREVO_API_KEY  ← Brevo ダッシュボードで取得した API キー
//   5. npm run deploy
//
// Brevo セットアップ:
//   1. https://app.brevo.com で無料アカウント作成
//   2. Settings → SMTP & API → API Keys で API キーを取得
//   3. Settings → Senders & IP → 送信元ドメインを認証 (SPF/DKIM)
//
// DNS 設定 (Cloudflare Dashboard → 対象ドメイン → DNS):
//   - SPF:   TXT  @  "v=spf1 include:sendinblue.com -all"
//   - DKIM:  Brevo ダッシュボードの指示に従い TXT レコードを追加
//   - DMARC: TXT  _dmarc  "v=DMARC1; p=quarantine;"
// ==========================================================================

export interface Env {
  API_KEY: string;
  BREVO_API_KEY: string;
}

interface EmailRequest {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // API キー認証
    const apiKey = request.headers.get("X-API-Key");
    if (!env.API_KEY || apiKey !== env.API_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }

    let body: EmailRequest;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (!body.to || !body.subject || !body.html) {
      return new Response(
        JSON.stringify({ error: "to, subject, html are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // from を "Name <email>" 形式からパース
    const fromMatch = body.from?.match(/^(.+?)\s*<(.+?)>$/);
    const fromName = fromMatch ? fromMatch[1].trim() : "Mother Vegetable";
    const fromEmail = fromMatch
      ? fromMatch[2].trim()
      : body.from || "noreply@example.com";

    // Brevo Transactional Email API で送信
    try {
      const brevoResponse = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: fromName, email: fromEmail },
            to: [{ email: body.to }],
            subject: body.subject,
            htmlContent: body.html,
          }),
        }
      );

      if (!brevoResponse.ok) {
        const errText = await brevoResponse.text();
        console.error(`Brevo error ${brevoResponse.status}: ${errText}`);
        return new Response(
          JSON.stringify({ error: "Brevo send failed", detail: errText }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Brevo request failed:", err);
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
