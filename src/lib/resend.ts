// ==========================================================================
// [COMMENTED OUT] nodemailer / SMTP 版
// Resend → nodemailer に切り替え済みだが、Cloudflare Workers 版に移行。
// SMTP版に戻す場合は下記のコメントを解除してください。
// ==========================================================================
//
// import nodemailer from "nodemailer";
//
// function createTransporter() {
//   const host = process.env.SMTP_HOST;
//   const port = Number(process.env.SMTP_PORT || "587");
//   const user = process.env.SMTP_USER;
//   const pass = process.env.SMTP_PASS;
//
//   if (!host) return null;
//
//   return nodemailer.createTransport({
//     host,
//     port,
//     secure: port === 465,
//     ...(user && pass ? { auth: { user, pass } } : {}),
//   });
// }
//
// export const transporter = createTransporter();

// ==========================================================================
// Cloudflare Email Worker 版 (現行)
// EMAIL_WORKER_URL: デプロイした Cloudflare Worker の URL
// EMAIL_WORKER_KEY: Worker 側と共有する API キー
// ==========================================================================

const WORKER_URL = process.env.EMAIL_WORKER_URL || "";
const WORKER_KEY = process.env.EMAIL_WORKER_KEY || "";

export const FROM_EMAIL =
  process.env.FROM_EMAIL || "Mother Vegetable <noreply@mothervegetable.com>";

export interface MailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Cloudflare Email Worker 経由でメールを送信する。
 * Worker URL が未設定の場合はログ出力のみ（開発時はそのまま動く）。
 */
export async function sendMail(payload: MailPayload): Promise<void> {
  if (!WORKER_URL) {
    console.log(
      `[Email Skipped] EMAIL_WORKER_URL not set. To: ${payload.to}, Subject: ${payload.subject}`
    );
    return;
  }

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": WORKER_KEY,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[Email Error] Worker responded ${res.status}: ${body}`
      );
    }
  } catch (error) {
    console.error(
      `[Email Error] To: ${payload.to}, Subject: ${payload.subject}`,
      error
    );
  }
}
