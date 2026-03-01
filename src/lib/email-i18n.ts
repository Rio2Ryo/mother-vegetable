export type Locale = "en" | "ja" | "zh";

/**
 * Map a country name (or code) to one of the supported locales.
 * Falls back to "en" for any unrecognized value.
 */
export function countryToLocale(country: string | undefined | null): Locale {
  if (!country) return "en";
  const c = country.trim().toLowerCase();
  if (!c) return "en";

  // Japanese
  if (["japan", "\u65e5\u672c", "jp"].includes(c)) return "ja";

  // Chinese (Simplified & Traditional regions)
  if (
    [
      "china",
      "\u4e2d\u56fd",
      "cn",
      "taiwan",
      "\u53f0\u6e7e",
      "tw",
      "hong kong",
      "\u9999\u6e2f",
      "hk",
      "macau",
      "\u6fb3\u95e8",
      "mo",
    ].includes(c)
  )
    return "zh";

  return "en";
}

/**
 * Resolve an arbitrary locale string to a supported Locale.
 */
export function resolveLocale(locale: string | undefined | null): Locale {
  if (!locale) return "en";
  const l = locale.trim().toLowerCase();
  if (l === "ja") return "ja";
  if (l === "zh") return "zh";
  return "en";
}

// ---------------------------------------------------------------------------
// Email translation dictionaries
// ---------------------------------------------------------------------------

export const emailTranslations = {
  welcome: {
    en: {
      subject: (appName: string) => `Welcome to ${appName}!`,
      greeting: (name: string) => `Hi ${name},`,
      body: "Thank you for creating your account. We're excited to have you!",
      cta: "Shop Now",
      preCtaText: "Start exploring our products:",
    },
    ja: {
      subject: (appName: string) => `${appName}\u3078\u3088\u3046\u3053\u305d\uff01`,
      greeting: (name: string) => `${name}\u3055\u3093\u3001\u3053\u3093\u306b\u3061\u306f\u3002`,
      body: "\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210\u3044\u305f\u3060\u304d\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002\u3054\u5229\u7528\u3092\u5fc3\u3088\u308a\u304a\u5f85\u3061\u3057\u3066\u304a\u308a\u307e\u3059\uff01",
      cta: "\u4eca\u3059\u3050\u8cfc\u5165",
      preCtaText: "\u5546\u54c1\u3092\u63a2\u3057\u3066\u307f\u307e\u3057\u3087\u3046\uff1a",
    },
    zh: {
      subject: (appName: string) => `\u6b22\u8fce\u52a0\u5165 ${appName}\uff01`,
      greeting: (name: string) => `${name}\uff0c\u60a8\u597d\u3002`,
      body: "\u611f\u8c22\u60a8\u521b\u5efa\u8d26\u6237\u3002\u6211\u4eec\u5f88\u9ad8\u5174\u60a8\u7684\u52a0\u5165\uff01",
      cta: "\u7acb\u5373\u8d2d\u7269",
      preCtaText: "\u5f00\u59cb\u63a2\u7d22\u6211\u4eec\u7684\u4ea7\u54c1\uff1a",
    },
  },

  orderConfirmation: {
    en: {
      subject: (orderId: string) => `Order Confirmation - ${orderId}`,
      heading: "Order Confirmed!",
      greeting: (name: string) => `Hi ${name},`,
      body: (orderId: string) =>
        `Your order <strong>${orderId}</strong> has been confirmed.`,
      columnProduct: "Product",
      columnQty: "Qty",
      columnPrice: "Price",
      totalLabel: "Total",
      thanks: "Thank you for your purchase!",
    },
    ja: {
      subject: (orderId: string) => `\u6ce8\u6587\u78ba\u8a8d - ${orderId}`,
      heading: "\u6ce8\u6587\u304c\u78ba\u8a8d\u3055\u308c\u307e\u3057\u305f\uff01",
      greeting: (name: string) => `${name}\u3055\u3093\u3001\u3053\u3093\u306b\u3061\u306f\u3002`,
      body: (orderId: string) =>
        `\u3054\u6ce8\u6587 <strong>${orderId}</strong> \u304c\u78ba\u8a8d\u3055\u308c\u307e\u3057\u305f\u3002`,
      columnProduct: "\u5546\u54c1",
      columnQty: "\u6570\u91cf",
      columnPrice: "\u4fa1\u683c",
      totalLabel: "\u5408\u8a08",
      thanks: "\u3054\u8cfc\u5165\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\uff01",
    },
    zh: {
      subject: (orderId: string) => `\u8ba2\u5355\u786e\u8ba4 - ${orderId}`,
      heading: "\u8ba2\u5355\u5df2\u786e\u8ba4\uff01",
      greeting: (name: string) => `${name}\uff0c\u60a8\u597d\u3002`,
      body: (orderId: string) =>
        `\u60a8\u7684\u8ba2\u5355 <strong>${orderId}</strong> \u5df2\u786e\u8ba4\u3002`,
      columnProduct: "\u4ea7\u54c1",
      columnQty: "\u6570\u91cf",
      columnPrice: "\u4ef7\u683c",
      totalLabel: "\u603b\u8ba1",
      thanks: "\u611f\u8c22\u60a8\u7684\u8d2d\u4e70\uff01",
    },
  },

  instructorWelcome: {
    en: {
      subject: (appName: string) =>
        `Welcome to ${appName} Instructor Program!`,
      heading: "Welcome, Instructor!",
      greeting: (name: string) => `Hi ${name},`,
      body: "Your instructor registration is complete. Here's your referral information:",
      referralCodeLabel: "Referral Code:",
      referralUrlLabel: "Referral URL:",
      commissionHeading: "Commission Structure:",
      commissionDirect: "<strong>25%</strong> on your direct sales",
      commissionReferral:
        "<strong>10%</strong> on sales from instructors you refer",
      commissionBonus:
        "<strong>$50</strong> for each new instructor you refer",
      cta: "Go to Dashboard",
    },
    ja: {
      subject: (appName: string) =>
        `${appName} \u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u30d7\u30ed\u30b0\u30e9\u30e0\u3078\u3088\u3046\u3053\u305d\uff01`,
      heading: "\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u3078\u3088\u3046\u3053\u305d\uff01",
      greeting: (name: string) => `${name}\u3055\u3093\u3001\u3053\u3093\u306b\u3061\u306f\u3002`,
      body: "\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u767b\u9332\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002\u4ee5\u4e0b\u304c\u7d39\u4ecb\u60c5\u5831\u3067\u3059\uff1a",
      referralCodeLabel: "\u7d39\u4ecb\u30b3\u30fc\u30c9:",
      referralUrlLabel: "\u7d39\u4ecb URL:",
      commissionHeading: "\u30b3\u30df\u30c3\u30b7\u30e7\u30f3\u69cb\u9020:",
      commissionDirect: "\u76f4\u63a5\u8ca9\u58f2\u306e <strong>25%</strong>",
      commissionReferral:
        "\u7d39\u4ecb\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u306e\u58f2\u4e0a\u306e <strong>10%</strong>",
      commissionBonus:
        "\u65b0\u3057\u3044\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u306e\u7d39\u4ecb\u3054\u3068\u306b <strong>$50</strong>",
      cta: "\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u3078",
    },
    zh: {
      subject: (appName: string) => `\u6b22\u8fce\u52a0\u5165 ${appName} \u8bb2\u5e08\u8ba1\u5212\uff01`,
      heading: "\u6b22\u8fce\uff0c\u8bb2\u5e08\uff01",
      greeting: (name: string) => `${name}\uff0c\u60a8\u597d\u3002`,
      body: "\u60a8\u7684\u8bb2\u5e08\u6ce8\u518c\u5df2\u5b8c\u6210\u3002\u4ee5\u4e0b\u662f\u60a8\u7684\u63a8\u8350\u4fe1\u606f\uff1a",
      referralCodeLabel: "\u63a8\u8350\u4ee3\u7801:",
      referralUrlLabel: "\u63a8\u8350\u94fe\u63a5:",
      commissionHeading: "\u4f63\u91d1\u7ed3\u6784:",
      commissionDirect: "\u76f4\u63a5\u9500\u552e\u7684 <strong>25%</strong>",
      commissionReferral:
        "\u63a8\u8350\u8bb2\u5e08\u9500\u552e\u989d\u7684 <strong>10%</strong>",
      commissionBonus:
        "\u6bcf\u63a8\u8350\u4e00\u4f4d\u65b0\u8bb2\u5e08\u53ef\u83b7\u5f97 <strong>$50</strong>",
      cta: "\u524d\u5f80\u63a7\u5236\u53f0",
    },
  },

  saleNotification: {
    en: {
      subject: (amount: string) => `New Sale! You earned $${amount}`,
      heading: "New Commission Earned!",
      greeting: (name: string) => `Hi ${name},`,
      body: (type: string) =>
        `A ${type} sale was made through your network.`,
      orderIdLabel: "Order ID:",
      orderTotalLabel: "Order Total:",
      commissionLabel: "Your Commission:",
      cta: "View Dashboard",
    },
    ja: {
      subject: (amount: string) =>
        `\u65b0\u3057\u3044\u58f2\u4e0a\uff01 $${amount} \u3092\u7372\u5f97\u3057\u307e\u3057\u305f`,
      heading: "\u65b0\u3057\u3044\u30b3\u30df\u30c3\u30b7\u30e7\u30f3\u3092\u7372\u5f97\uff01",
      greeting: (name: string) => `${name}\u3055\u3093\u3001\u3053\u3093\u306b\u3061\u306f\u3002`,
      body: (type: string) =>
        `\u3042\u306a\u305f\u306e\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3067${type === "direct" ? "\u76f4\u63a5" : "\u7d39\u4ecb"}\u58f2\u4e0a\u304c\u3042\u308a\u307e\u3057\u305f\u3002`,
      orderIdLabel: "\u6ce8\u6587 ID:",
      orderTotalLabel: "\u6ce8\u6587\u5408\u8a08:",
      commissionLabel: "\u3042\u306a\u305f\u306e\u30b3\u30df\u30c3\u30b7\u30e7\u30f3:",
      cta: "\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u3092\u898b\u308b",
    },
    zh: {
      subject: (amount: string) =>
        `\u65b0\u9500\u552e\uff01\u60a8\u83b7\u5f97\u4e86 $${amount}`,
      heading: "\u83b7\u5f97\u65b0\u4f63\u91d1\uff01",
      greeting: (name: string) => `${name}\uff0c\u60a8\u597d\u3002`,
      body: (type: string) =>
        `\u60a8\u7684\u7f51\u7edc\u4e2d\u4ea7\u751f\u4e86\u4e00\u7b14${type === "direct" ? "\u76f4\u63a5" : "\u63a8\u8350"}\u9500\u552e\u3002`,
      orderIdLabel: "\u8ba2\u5355 ID:",
      orderTotalLabel: "\u8ba2\u5355\u603b\u989d:",
      commissionLabel: "\u60a8\u7684\u4f63\u91d1:",
      cta: "\u67e5\u770b\u63a7\u5236\u53f0",
    },
  },

  referralSuccess: {
    en: {
      subject: (amount: string) =>
        `New Instructor Referral! +$${amount} bonus`,
      heading: "Referral Bonus Earned!",
      greeting: (name: string) => `Hi ${name},`,
      body: (referredName: string) =>
        `<strong>${referredName}</strong> has registered as an instructor using your referral code.`,
      bonusLabel: "Referral Bonus:",
      futureCommission:
        "You'll also earn 10% commission on their future sales!",
      cta: "View Dashboard",
    },
    ja: {
      subject: (amount: string) =>
        `\u65b0\u3057\u3044\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u7d39\u4ecb\uff01 +$${amount} \u30dc\u30fc\u30ca\u30b9`,
      heading: "\u7d39\u4ecb\u30dc\u30fc\u30ca\u30b9\u3092\u7372\u5f97\uff01",
      greeting: (name: string) => `${name}\u3055\u3093\u3001\u3053\u3093\u306b\u3061\u306f\u3002`,
      body: (referredName: string) =>
        `<strong>${referredName}</strong> \u3055\u3093\u304c\u3042\u306a\u305f\u306e\u7d39\u4ecb\u30b3\u30fc\u30c9\u3092\u4f7f\u7528\u3057\u3066\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u3068\u3057\u3066\u767b\u9332\u3057\u307e\u3057\u305f\u3002`,
      bonusLabel: "\u7d39\u4ecb\u30dc\u30fc\u30ca\u30b9:",
      futureCommission:
        "\u4eca\u5f8c\u3001\u5f7c\u3089\u306e\u58f2\u4e0a\u306e10%\u306e\u30b3\u30df\u30c3\u30b7\u30e7\u30f3\u3082\u7372\u5f97\u3067\u304d\u307e\u3059\uff01",
      cta: "\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u3092\u898b\u308b",
    },
    zh: {
      subject: (amount: string) =>
        `\u65b0\u8bb2\u5e08\u63a8\u8350\uff01+$${amount} \u5956\u91d1`,
      heading: "\u83b7\u5f97\u63a8\u8350\u5956\u91d1\uff01",
      greeting: (name: string) => `${name}\uff0c\u60a8\u597d\u3002`,
      body: (referredName: string) =>
        `<strong>${referredName}</strong> \u5df2\u4f7f\u7528\u60a8\u7684\u63a8\u8350\u4ee3\u7801\u6ce8\u518c\u4e3a\u8bb2\u5e08\u3002`,
      bonusLabel: "\u63a8\u8350\u5956\u91d1:",
      futureCommission:
        "\u60a8\u8fd8\u5c06\u83b7\u5f97\u4ed6\u4eec\u672a\u6765\u9500\u552e\u989d\u768410%\u4f63\u91d1\uff01",
      cta: "\u67e5\u770b\u63a7\u5236\u53f0",
    },
  },

  subscriptionRenewal: {
    en: {
      subject: (appName: string) =>
        `Subscription Renewed - ${appName} Instructor`,
      heading: "Subscription Renewed!",
      greeting: (name: string) => `Hi ${name},`,
      body: "Your annual instructor subscription has been successfully renewed.",
      amountLabel: "Amount:",
      amountValue: "$250.00/year",
      nextBillingLabel: "Next billing date:",
      cta: "View Dashboard",
    },
    ja: {
      subject: (appName: string) =>
        `\u30b5\u30d6\u30b9\u30af\u30ea\u30d7\u30b7\u30e7\u30f3\u66f4\u65b0 - ${appName} \u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc`,
      heading: "\u30b5\u30d6\u30b9\u30af\u30ea\u30d7\u30b7\u30e7\u30f3\u304c\u66f4\u65b0\u3055\u308c\u307e\u3057\u305f\uff01",
      greeting: (name: string) => `${name}\u3055\u3093\u3001\u3053\u3093\u306b\u3061\u306f\u3002`,
      body: "\u5e74\u9593\u30a4\u30f3\u30b9\u30c8\u30e9\u30af\u30bf\u30fc\u30b5\u30d6\u30b9\u30af\u30ea\u30d7\u30b7\u30e7\u30f3\u304c\u6b63\u5e38\u306b\u66f4\u65b0\u3055\u308c\u307e\u3057\u305f\u3002",
      amountLabel: "\u91d1\u984d:",
      amountValue: "$250.00/\u5e74",
      nextBillingLabel: "\u6b21\u56de\u8acb\u6c42\u65e5:",
      cta: "\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u3092\u898b\u308b",
    },
    zh: {
      subject: (appName: string) =>
        `\u8ba2\u9605\u5df2\u7eed\u671f - ${appName} \u8bb2\u5e08`,
      heading: "\u8ba2\u9605\u5df2\u7eed\u671f\uff01",
      greeting: (name: string) => `${name}\uff0c\u60a8\u597d\u3002`,
      body: "\u60a8\u7684\u5e74\u5ea6\u8bb2\u5e08\u8ba2\u9605\u5df2\u6210\u529f\u7eed\u671f\u3002",
      amountLabel: "\u91d1\u989d:",
      amountValue: "$250.00/\u5e74",
      nextBillingLabel: "\u4e0b\u6b21\u8ba1\u8d39\u65e5\u671f:",
      cta: "\u67e5\u770b\u63a7\u5236\u53f0",
    },
  },
  passwordReset: {
    en: {
      subject: "Reset Your Password",
      heading: "Password Reset",
      greeting: (name: string) => `Hi ${name},`,
      body: "We received a request to reset your password. Click the button below to set a new password.",
      cta: "Reset Password",
      expiryNotice: "This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.",
    },
    ja: {
      subject: "パスワードリセット",
      heading: "パスワードリセット",
      greeting: (name: string) => `${name}さん、こんにちは。`,
      body: "パスワードリセットのリクエストを受け付けました。以下のボタンをクリックして新しいパスワードを設定してください。",
      cta: "パスワードをリセット",
      expiryNotice: "このリンクは1時間後に期限切れになります。パスワードリセットをリクエストしていない場合は、このメールを無視してください。",
    },
    zh: {
      subject: "重置您的密码",
      heading: "密码重置",
      greeting: (name: string) => `${name}，您好。`,
      body: "我们收到了重置您密码的请求。请点击下方按钮设置新密码。",
      cta: "重置密码",
      expiryNotice: "此链接将在1小时后过期。如果您没有请求重置密码，请忽略此邮件。",
    },
  },

  orderStatusUpdate: {
    en: {
      subject: (orderId: string, status: string) =>
        `Order ${orderId} — ${status}`,
      heading: "Order Status Updated",
      greeting: (name: string) => `Hi ${name},`,
      body: (orderId: string, status: string) =>
        `Your order <strong>${orderId}</strong> has been updated to <strong>${status}</strong>.`,
      viewOrder: "View Order",
      thanks: "Thank you for shopping with us!",
      statusLabels: {
        pending: "Pending",
        confirmed: "Confirmed",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      } as Record<string, string>,
    },
    ja: {
      subject: (orderId: string, status: string) =>
        `注文 ${orderId} — ${status}`,
      heading: "注文ステータスが更新されました",
      greeting: (name: string) => `${name}さん、こんにちは。`,
      body: (orderId: string, status: string) =>
        `ご注文 <strong>${orderId}</strong> のステータスが <strong>${status}</strong> に更新されました。`,
      viewOrder: "注文を確認",
      thanks: "ご利用ありがとうございます！",
      statusLabels: {
        pending: "保留中",
        confirmed: "確認済み",
        processing: "処理中",
        shipped: "発送済み",
        delivered: "配達完了",
        cancelled: "キャンセル",
      } as Record<string, string>,
    },
    zh: {
      subject: (orderId: string, status: string) =>
        `订单 ${orderId} — ${status}`,
      heading: "订单状态已更新",
      greeting: (name: string) => `${name}，您好。`,
      body: (orderId: string, status: string) =>
        `您的订单 <strong>${orderId}</strong> 已更新为 <strong>${status}</strong>。`,
      viewOrder: "查看订单",
      thanks: "感谢您的购买！",
      statusLabels: {
        pending: "待处理",
        confirmed: "已确认",
        processing: "处理中",
        shipped: "已发货",
        delivered: "已送达",
        cancelled: "已取消",
      } as Record<string, string>,
    },
  },

  emailVerification: {
    en: {
      subject: "Verify Your Email Address",
      heading: "Email Verification",
      greeting: (name: string) => `Hi ${name},`,
      body: "Thank you for signing up! Please click the button below to verify your email address.",
      cta: "Verify Email",
      expiryNotice: "This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.",
    },
    ja: {
      subject: "メールアドレスの確認",
      heading: "メールアドレス確認",
      greeting: (name: string) => `${name}さん、こんにちは。`,
      body: "ご登録ありがとうございます！以下のボタンをクリックしてメールアドレスを確認してください。",
      cta: "メールを確認",
      expiryNotice: "このリンクは24時間後に期限切れになります。アカウントを作成していない場合は、このメールを無視してください。",
    },
    zh: {
      subject: "验证您的电子邮件地址",
      heading: "邮箱验证",
      greeting: (name: string) => `${name}，您好。`,
      body: "感谢您注册！请点击下方按钮验证您的电子邮件地址。",
      cta: "验证邮箱",
      expiryNotice: "此链接将在24小时后过期。如果您没有创建账户，请忽略此邮件。",
    },
  },
} as const;
