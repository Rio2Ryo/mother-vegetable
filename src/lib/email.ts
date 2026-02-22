import { transporter, FROM_EMAIL } from "./resend";

const APP_NAME = "Mother Vegetable";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailOptions) {
  if (!transporter) {
    console.log(`[Email Skipped] SMTP not configured. To: ${to}, Subject: ${subject}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(`[Email Error] To: ${to}, Subject: ${subject}`, error);
  }
}

// ---------------------------------------------------------------------------
// General User Emails
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  await sendEmail({
    to: user.email,
    subject: `Welcome to ${APP_NAME}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">Welcome to ${APP_NAME}!</h1>
        <p>Hi ${user.name},</p>
        <p>Thank you for creating your account. We're excited to have you!</p>
        <p>Start exploring our products:</p>
        <a href="${APP_URL}" style="display: inline-block; padding: 12px 24px; background-color: #25C760; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">Shop Now</a>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(order: {
  customerEmail: string;
  customerName: string;
  orderId: string;
  total: number;
  currency: string;
  items: { name: string; quantity: number; price: number }[];
}) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td><td style="padding:8px;border-bottom:1px solid #eee;">x${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${item.price.toFixed(2)}</td></tr>`
    )
    .join("");

  await sendEmail({
    to: order.customerEmail,
    subject: `Order Confirmation - ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">Order Confirmed!</h1>
        <p>Hi ${order.customerName},</p>
        <p>Your order <strong>${order.orderId}</strong> has been confirmed.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <thead><tr style="background:#f5f5f5;"><th style="padding:8px;text-align:left;">Product</th><th style="padding:8px;">Qty</th><th style="padding:8px;text-align:right;">Price</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot><tr><td colspan="2" style="padding:8px;font-weight:bold;">Total</td><td style="padding:8px;text-align:right;font-weight:bold;">$${order.total.toFixed(2)} ${order.currency}</td></tr></tfoot>
        </table>
        <p>Thank you for your purchase!</p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Instructor Emails
// ---------------------------------------------------------------------------

export async function sendInstructorWelcomeEmail(instructor: {
  email: string;
  fullName: string;
  referralCode: string;
}) {
  const referralUrl = `${APP_URL}/?ref=${instructor.referralCode}`;

  await sendEmail({
    to: instructor.email,
    subject: `Welcome to ${APP_NAME} Instructor Program!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">Welcome, Instructor!</h1>
        <p>Hi ${instructor.fullName},</p>
        <p>Your instructor registration is complete. Here's your referral information:</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>Referral Code:</strong> ${instructor.referralCode}</p>
          <p style="margin:8px 0 0;"><strong>Referral URL:</strong> <a href="${referralUrl}">${referralUrl}</a></p>
        </div>
        <h3>Commission Structure:</h3>
        <ul>
          <li><strong>25%</strong> on your direct sales</li>
          <li><strong>10%</strong> on sales from instructors you refer</li>
          <li><strong>$50</strong> for each new instructor you refer</li>
        </ul>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">Go to Dashboard</a>
      </div>
    `,
  });
}

export async function sendSaleNotificationEmail(instructor: {
  email: string;
  fullName: string;
  orderId: string;
  orderTotal: number;
  commissionAmount: number;
  commissionType: string;
}) {
  await sendEmail({
    to: instructor.email,
    subject: `New Sale! You earned $${instructor.commissionAmount.toFixed(2)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">New Commission Earned!</h1>
        <p>Hi ${instructor.fullName},</p>
        <p>A ${instructor.commissionType} sale was made through your network.</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>Order ID:</strong> ${instructor.orderId}</p>
          <p style="margin:8px 0 0;"><strong>Order Total:</strong> $${instructor.orderTotal.toFixed(2)}</p>
          <p style="margin:8px 0 0;"><strong>Your Commission:</strong> <span style="color:#25C760;font-weight:bold;">+$${instructor.commissionAmount.toFixed(2)}</span></p>
        </div>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">View Dashboard</a>
      </div>
    `,
  });
}

export async function sendReferralSuccessEmail(instructor: {
  email: string;
  fullName: string;
  referredName: string;
  reward: number;
}) {
  await sendEmail({
    to: instructor.email,
    subject: `New Instructor Referral! +$${instructor.reward.toFixed(2)} bonus`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">Referral Bonus Earned!</h1>
        <p>Hi ${instructor.fullName},</p>
        <p><strong>${instructor.referredName}</strong> has registered as an instructor using your referral code.</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>Referral Bonus:</strong> <span style="color:#25C760;font-weight:bold;">+$${instructor.reward.toFixed(2)}</span></p>
        </div>
        <p>You'll also earn 10% commission on their future sales!</p>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">View Dashboard</a>
      </div>
    `,
  });
}

export async function sendSubscriptionRenewalEmail(instructor: {
  email: string;
  fullName: string;
  nextBillingDate: string;
}) {
  await sendEmail({
    to: instructor.email,
    subject: `Subscription Renewed - ${APP_NAME} Instructor`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">Subscription Renewed!</h1>
        <p>Hi ${instructor.fullName},</p>
        <p>Your annual instructor subscription has been successfully renewed.</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>Amount:</strong> $250.00/year</p>
          <p style="margin:8px 0 0;"><strong>Next billing date:</strong> ${instructor.nextBillingDate}</p>
        </div>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">View Dashboard</a>
      </div>
    `,
  });
}
