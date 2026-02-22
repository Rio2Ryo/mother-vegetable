// ==========================================================================
// Mother Vegetable — Email Sending Worker
// Cloudflare Workers + MailChannels API でメールを送信する
//
// デプロイ手順:
//   1. cd workers/email-worker
//   2. npm install
//   3. wrangler secret put API_KEY   ← Next.js 側の EMAIL_WORKER_KEY と同じ値を設定
//   4. npm run deploy
//
// DNS 設定 (Cloudflare Dashboard → 対象ドメイン → DNS):
//   - SPF: TXT  @  "v=spf1 include:relay.mailchannels.net -all"
//   - DKIM: MailChannels のドキュメントに従い TXT レコードを追加
//   - Worker ドメインロック: TXT  _mailchannels  "v=mc1 cfid=mv-email-worker"
// ==========================================================================

export interface Env {
  API_KEY: string;
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
    const fromEmail = fromMatch ? fromMatch[2].trim() : body.from || "noreply@mothervegetable.com";

    // MailChannels API で送信
    try {
      const mcResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: body.to }],
            },
          ],
          from: {
            email: fromEmail,
            name: fromName,
          },
          subject: body.subject,
          content: [
            {
              type: "text/html",
              value: body.html,
            },
          ],
        }),
      });

      if (!mcResponse.ok) {
        const errText = await mcResponse.text();
        console.error(`MailChannels error ${mcResponse.status}: ${errText}`);
        return new Response(
          JSON.stringify({ error: "MailChannels send failed", detail: errText }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("MailChannels request failed:", err);
      return new Response(
        JSON.stringify({ error: "Internal error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
