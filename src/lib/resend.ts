import nodemailer from "nodemailer";

// SMTP transporter — 環境変数で自前メールサーバーに接続
// SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS を設定してください
// 設定がない場合はメール送信をスキップします（ログのみ出力）

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    ...(user && pass
      ? { auth: { user, pass } }
      : {}),
  });
}

export const transporter = createTransporter();

export const FROM_EMAIL =
  process.env.FROM_EMAIL || "Mother Vegetable <noreply@mothervegetable.com>";
