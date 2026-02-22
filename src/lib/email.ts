import { sendMail } from "./resend";
import { resolveLocale, emailTranslations } from "./email-i18n";

const APP_NAME = "Mother Vegetable";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// ---------------------------------------------------------------------------
// General User Emails
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(
  user: { name: string; email: string },
  locale?: string
) {
  const l = resolveLocale(locale);
  const t = emailTranslations.welcome[l];

  await sendMail({
    to: user.email,
    subject: t.subject(APP_NAME),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">${t.subject(APP_NAME)}</h1>
        <p>${t.greeting(user.name)}</p>
        <p>${t.body}</p>
        <p>${t.preCtaText}</p>
        <a href="${APP_URL}" style="display: inline-block; padding: 12px 24px; background-color: #25C760; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">${t.cta}</a>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(
  order: {
    customerEmail: string;
    customerName: string;
    orderId: string;
    total: number;
    currency: string;
    items: { name: string; quantity: number; price: number }[];
  },
  locale?: string
) {
  const l = resolveLocale(locale);
  const t = emailTranslations.orderConfirmation[l];

  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td><td style="padding:8px;border-bottom:1px solid #eee;">x${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${item.price.toFixed(2)}</td></tr>`
    )
    .join("");

  await sendMail({
    to: order.customerEmail,
    subject: t.subject(order.orderId),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">${t.heading}</h1>
        <p>${t.greeting(order.customerName)}</p>
        <p>${t.body(order.orderId)}</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <thead><tr style="background:#f5f5f5;"><th style="padding:8px;text-align:left;">${t.columnProduct}</th><th style="padding:8px;">${t.columnQty}</th><th style="padding:8px;text-align:right;">${t.columnPrice}</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot><tr><td colspan="2" style="padding:8px;font-weight:bold;">${t.totalLabel}</td><td style="padding:8px;text-align:right;font-weight:bold;">$${order.total.toFixed(2)} ${order.currency}</td></tr></tfoot>
        </table>
        <p>${t.thanks}</p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Instructor Emails
// ---------------------------------------------------------------------------

export async function sendInstructorWelcomeEmail(
  instructor: {
    email: string;
    fullName: string;
    referralCode: string;
  },
  locale?: string
) {
  const l = resolveLocale(locale);
  const t = emailTranslations.instructorWelcome[l];
  const referralUrl = `${APP_URL}/?ref=${instructor.referralCode}`;

  await sendMail({
    to: instructor.email,
    subject: t.subject(APP_NAME),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">${t.heading}</h1>
        <p>${t.greeting(instructor.fullName)}</p>
        <p>${t.body}</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>${t.referralCodeLabel}</strong> ${instructor.referralCode}</p>
          <p style="margin:8px 0 0;"><strong>${t.referralUrlLabel}</strong> <a href="${referralUrl}">${referralUrl}</a></p>
        </div>
        <h3>${t.commissionHeading}</h3>
        <ul>
          <li>${t.commissionDirect}</li>
          <li>${t.commissionReferral}</li>
          <li>${t.commissionBonus}</li>
        </ul>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">${t.cta}</a>
      </div>
    `,
  });
}

export async function sendSaleNotificationEmail(
  instructor: {
    email: string;
    fullName: string;
    orderId: string;
    orderTotal: number;
    commissionAmount: number;
    commissionType: string;
  },
  locale?: string
) {
  const l = resolveLocale(locale);
  const t = emailTranslations.saleNotification[l];

  await sendMail({
    to: instructor.email,
    subject: t.subject(instructor.commissionAmount.toFixed(2)),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">${t.heading}</h1>
        <p>${t.greeting(instructor.fullName)}</p>
        <p>${t.body(instructor.commissionType)}</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>${t.orderIdLabel}</strong> ${instructor.orderId}</p>
          <p style="margin:8px 0 0;"><strong>${t.orderTotalLabel}</strong> $${instructor.orderTotal.toFixed(2)}</p>
          <p style="margin:8px 0 0;"><strong>${t.commissionLabel}</strong> <span style="color:#25C760;font-weight:bold;">+$${instructor.commissionAmount.toFixed(2)}</span></p>
        </div>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">${t.cta}</a>
      </div>
    `,
  });
}

export async function sendReferralSuccessEmail(
  instructor: {
    email: string;
    fullName: string;
    referredName: string;
    reward: number;
  },
  locale?: string
) {
  const l = resolveLocale(locale);
  const t = emailTranslations.referralSuccess[l];

  await sendMail({
    to: instructor.email,
    subject: t.subject(instructor.reward.toFixed(2)),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">${t.heading}</h1>
        <p>${t.greeting(instructor.fullName)}</p>
        <p>${t.body(instructor.referredName)}</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>${t.bonusLabel}</strong> <span style="color:#25C760;font-weight:bold;">+$${instructor.reward.toFixed(2)}</span></p>
        </div>
        <p>${t.futureCommission}</p>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">${t.cta}</a>
      </div>
    `,
  });
}

export async function sendSubscriptionRenewalEmail(
  instructor: {
    email: string;
    fullName: string;
    nextBillingDate: string;
  },
  locale?: string
) {
  const l = resolveLocale(locale);
  const t = emailTranslations.subscriptionRenewal[l];

  await sendMail({
    to: instructor.email,
    subject: t.subject(APP_NAME),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #25C760;">${t.heading}</h1>
        <p>${t.greeting(instructor.fullName)}</p>
        <p>${t.body}</p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;"><strong>${t.amountLabel}</strong> ${t.amountValue}</p>
          <p style="margin:8px 0 0;"><strong>${t.nextBillingLabel}</strong> ${instructor.nextBillingDate}</p>
        </div>
        <a href="${APP_URL}/instructor/dashboard" style="display:inline-block;padding:12px 24px;background-color:#25C760;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">${t.cta}</a>
      </div>
    `,
  });
}
