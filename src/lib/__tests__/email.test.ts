import { describe, it, expect, vi, beforeEach } from "vitest";
import { countryToLocale, resolveLocale } from "../email-i18n";

// Mock the resend module before importing email functions
vi.mock("../resend", () => ({
  sendMail: vi.fn().mockResolvedValue(undefined),
}));

import { sendMail } from "../resend";
import {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendInstructorWelcomeEmail,
  sendSaleNotificationEmail,
  sendReferralSuccessEmail,
  sendSubscriptionRenewalEmail,
} from "../email";

const mockSendMail = vi.mocked(sendMail);

beforeEach(() => {
  mockSendMail.mockClear();
});

// ---------------------------------------------------------------------------
// countryToLocale
// ---------------------------------------------------------------------------
describe("countryToLocale", () => {
  it('maps "Japan" → "ja"', () => {
    expect(countryToLocale("Japan")).toBe("ja");
  });

  it('maps "japan" (lowercase) → "ja"', () => {
    expect(countryToLocale("japan")).toBe("ja");
  });

  it('maps "日本" → "ja"', () => {
    expect(countryToLocale("日本")).toBe("ja");
  });

  it('maps "JP" → "ja"', () => {
    expect(countryToLocale("JP")).toBe("ja");
  });

  it('maps "China" → "zh"', () => {
    expect(countryToLocale("China")).toBe("zh");
  });

  it('maps "中国" → "zh"', () => {
    expect(countryToLocale("中国")).toBe("zh");
  });

  it('maps "CN" → "zh"', () => {
    expect(countryToLocale("CN")).toBe("zh");
  });

  it('maps "Taiwan" → "zh"', () => {
    expect(countryToLocale("Taiwan")).toBe("zh");
  });

  it('maps "台湾" → "zh"', () => {
    expect(countryToLocale("台湾")).toBe("zh");
  });

  it('maps "Hong Kong" → "zh"', () => {
    expect(countryToLocale("Hong Kong")).toBe("zh");
  });

  it('maps "香港" → "zh"', () => {
    expect(countryToLocale("香港")).toBe("zh");
  });

  it('maps "Macau" → "zh"', () => {
    expect(countryToLocale("Macau")).toBe("zh");
  });

  it('maps "United States" → "en"', () => {
    expect(countryToLocale("United States")).toBe("en");
  });

  it('maps "France" → "en"', () => {
    expect(countryToLocale("France")).toBe("en");
  });

  it('maps unknown country → "en"', () => {
    expect(countryToLocale("Narnia")).toBe("en");
  });

  it('handles undefined → "en"', () => {
    expect(countryToLocale(undefined)).toBe("en");
  });

  it('handles null → "en"', () => {
    expect(countryToLocale(null)).toBe("en");
  });

  it('handles empty string → "en"', () => {
    expect(countryToLocale("")).toBe("en");
  });

  it("handles whitespace-padded input", () => {
    expect(countryToLocale("  Japan  ")).toBe("ja");
  });
});

// ---------------------------------------------------------------------------
// resolveLocale
// ---------------------------------------------------------------------------
describe("resolveLocale", () => {
  it('returns "ja" for "ja"', () => {
    expect(resolveLocale("ja")).toBe("ja");
  });

  it('returns "zh" for "zh"', () => {
    expect(resolveLocale("zh")).toBe("zh");
  });

  it('returns "en" for "en"', () => {
    expect(resolveLocale("en")).toBe("en");
  });

  it('returns "en" for unsupported locale', () => {
    expect(resolveLocale("fr")).toBe("en");
  });

  it('returns "en" for undefined', () => {
    expect(resolveLocale(undefined)).toBe("en");
  });

  it('returns "en" for null', () => {
    expect(resolveLocale(null)).toBe("en");
  });

  it('returns "en" for empty string', () => {
    expect(resolveLocale("")).toBe("en");
  });
});

// ---------------------------------------------------------------------------
// sendWelcomeEmail
// ---------------------------------------------------------------------------
describe("sendWelcomeEmail", () => {
  const user = { name: "John", email: "john@example.com" };

  it("sends English email by default", async () => {
    await sendWelcomeEmail(user);
    expect(mockSendMail).toHaveBeenCalledOnce();
    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toBe("john@example.com");
    expect(call.subject).toBe("Welcome to Mother Vegetable!");
    expect(call.html).toContain("Hi John,");
    expect(call.html).toContain("Thank you for creating your account");
    expect(call.html).toContain("Shop Now");
  });

  it("sends Japanese email for locale ja", async () => {
    await sendWelcomeEmail(user, "ja");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toBe("Mother Vegetableへようこそ！");
    expect(call.html).toContain("Johnさん、こんにちは。");
    expect(call.html).toContain("アカウントを作成いただきありがとうございます");
    expect(call.html).toContain("今すぐ購入");
  });

  it("sends Chinese email for locale zh", async () => {
    await sendWelcomeEmail(user, "zh");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toBe("欢迎加入 Mother Vegetable！");
    expect(call.html).toContain("John，您好。");
    expect(call.html).toContain("感谢您创建账户");
    expect(call.html).toContain("立即购物");
  });

  it("falls back to English for unknown locale", async () => {
    await sendWelcomeEmail(user, "fr");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toBe("Welcome to Mother Vegetable!");
  });
});

// ---------------------------------------------------------------------------
// sendOrderConfirmationEmail
// ---------------------------------------------------------------------------
describe("sendOrderConfirmationEmail", () => {
  const order = {
    customerEmail: "buyer@example.com",
    customerName: "Jane",
    orderId: "ORD-123",
    total: 99.99,
    currency: "USD",
    items: [
      { name: "Product A", quantity: 2, price: 29.99 },
      { name: "Product B", quantity: 1, price: 40.01 },
    ],
  };

  it("sends English order confirmation", async () => {
    await sendOrderConfirmationEmail(order);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toBe("buyer@example.com");
    expect(call.subject).toBe("Order Confirmation - ORD-123");
    expect(call.html).toContain("Order Confirmed!");
    expect(call.html).toContain("Hi Jane,");
    expect(call.html).toContain("ORD-123");
    expect(call.html).toContain("Product A");
    expect(call.html).toContain("Product B");
    expect(call.html).toContain("$99.99");
    expect(call.html).toContain("Thank you for your purchase!");
  });

  it("sends Japanese order confirmation", async () => {
    await sendOrderConfirmationEmail(order, "ja");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toBe("注文確認 - ORD-123");
    expect(call.html).toContain("注文が確認されました！");
    expect(call.html).toContain("Janeさん、こんにちは。");
    expect(call.html).toContain("商品");
    expect(call.html).toContain("数量");
    expect(call.html).toContain("価格");
    expect(call.html).toContain("合計");
    expect(call.html).toContain("ご購入ありがとうございます！");
  });

  it("sends Chinese order confirmation", async () => {
    await sendOrderConfirmationEmail(order, "zh");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toBe("订单确认 - ORD-123");
    expect(call.html).toContain("订单已确认！");
    expect(call.html).toContain("Jane，您好。");
    expect(call.html).toContain("产品");
    expect(call.html).toContain("数量");
    expect(call.html).toContain("价格");
    expect(call.html).toContain("总计");
    expect(call.html).toContain("感谢您的购买！");
  });

  it("includes correct item details in all locales", async () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      mockSendMail.mockClear();
      await sendOrderConfirmationEmail(order, locale);
      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain("Product A");
      expect(call.html).toContain("x2");
      expect(call.html).toContain("$29.99");
      expect(call.html).toContain("Product B");
      expect(call.html).toContain("x1");
      expect(call.html).toContain("$40.01");
    }
  });
});

// ---------------------------------------------------------------------------
// sendInstructorWelcomeEmail
// ---------------------------------------------------------------------------
describe("sendInstructorWelcomeEmail", () => {
  const instructor = {
    email: "teacher@example.com",
    fullName: "Tanaka",
    referralCode: "TANAKA100",
  };

  it("sends English instructor welcome", async () => {
    await sendInstructorWelcomeEmail(instructor);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toBe("teacher@example.com");
    expect(call.subject).toBe(
      "Welcome to Mother Vegetable Instructor Program!"
    );
    expect(call.html).toContain("Welcome, Instructor!");
    expect(call.html).toContain("Hi Tanaka,");
    expect(call.html).toContain("TANAKA100");
    expect(call.html).toContain("25%");
    expect(call.html).toContain("10%");
    expect(call.html).toContain("$50");
    expect(call.html).toContain("Go to Dashboard");
  });

  it("sends Japanese instructor welcome", async () => {
    await sendInstructorWelcomeEmail(instructor, "ja");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("インストラクタープログラムへようこそ");
    expect(call.html).toContain("インストラクターへようこそ！");
    expect(call.html).toContain("Tanakaさん、こんにちは。");
    expect(call.html).toContain("紹介コード:");
    expect(call.html).toContain("TANAKA100");
    expect(call.html).toContain("コミッション構造:");
    expect(call.html).toContain("ダッシュボードへ");
  });

  it("sends Chinese instructor welcome", async () => {
    await sendInstructorWelcomeEmail(instructor, "zh");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("讲师计划");
    expect(call.html).toContain("欢迎，讲师！");
    expect(call.html).toContain("Tanaka，您好。");
    expect(call.html).toContain("推荐代码:");
    expect(call.html).toContain("TANAKA100");
    expect(call.html).toContain("佣金结构:");
    expect(call.html).toContain("前往控制台");
  });

  it("includes referral code and commission info in all locales", async () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      mockSendMail.mockClear();
      await sendInstructorWelcomeEmail(instructor, locale);
      const call = mockSendMail.mock.calls[0][0];
      expect(call.html).toContain("TANAKA100");
      expect(call.html).toContain("25%");
      expect(call.html).toContain("10%");
      expect(call.html).toContain("$50");
    }
  });
});

// ---------------------------------------------------------------------------
// sendSaleNotificationEmail
// ---------------------------------------------------------------------------
describe("sendSaleNotificationEmail", () => {
  const instructor = {
    email: "seller@example.com",
    fullName: "Yuki",
    orderId: "ORD-456",
    orderTotal: 200.0,
    commissionAmount: 50.0,
    commissionType: "direct",
  };

  it("sends English sale notification", async () => {
    await sendSaleNotificationEmail(instructor);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toBe("seller@example.com");
    expect(call.subject).toBe("New Sale! You earned $50.00");
    expect(call.html).toContain("New Commission Earned!");
    expect(call.html).toContain("Hi Yuki,");
    expect(call.html).toContain("direct");
    expect(call.html).toContain("ORD-456");
    expect(call.html).toContain("$200.00");
    expect(call.html).toContain("+$50.00");
    expect(call.html).toContain("View Dashboard");
  });

  it("sends Japanese sale notification", async () => {
    await sendSaleNotificationEmail(instructor, "ja");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("$50.00");
    expect(call.subject).toContain("新しい売上");
    expect(call.html).toContain("新しいコミッションを獲得！");
    expect(call.html).toContain("Yukiさん、こんにちは。");
    expect(call.html).toContain("直接");
    expect(call.html).toContain("注文 ID:");
    expect(call.html).toContain("ダッシュボードを見る");
  });

  it("sends Chinese sale notification", async () => {
    await sendSaleNotificationEmail(instructor, "zh");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("$50.00");
    expect(call.subject).toContain("新销售");
    expect(call.html).toContain("获得新佣金！");
    expect(call.html).toContain("Yuki，您好。");
    expect(call.html).toContain("直接");
    expect(call.html).toContain("订单 ID:");
    expect(call.html).toContain("查看控制台");
  });

  it("renders referral type correctly in Japanese", async () => {
    await sendSaleNotificationEmail(
      { ...instructor, commissionType: "referral" },
      "ja"
    );
    const call = mockSendMail.mock.calls[0][0];
    expect(call.html).toContain("紹介");
  });

  it("renders referral type correctly in Chinese", async () => {
    await sendSaleNotificationEmail(
      { ...instructor, commissionType: "referral" },
      "zh"
    );
    const call = mockSendMail.mock.calls[0][0];
    expect(call.html).toContain("推荐");
  });
});

// ---------------------------------------------------------------------------
// sendReferralSuccessEmail
// ---------------------------------------------------------------------------
describe("sendReferralSuccessEmail", () => {
  const instructor = {
    email: "ref@example.com",
    fullName: "Akiko",
    referredName: "New Instructor",
    reward: 50.0,
  };

  it("sends English referral success email", async () => {
    await sendReferralSuccessEmail(instructor);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toBe("ref@example.com");
    expect(call.subject).toBe("New Instructor Referral! +$50.00 bonus");
    expect(call.html).toContain("Referral Bonus Earned!");
    expect(call.html).toContain("Hi Akiko,");
    expect(call.html).toContain("New Instructor");
    expect(call.html).toContain("+$50.00");
    expect(call.html).toContain("10% commission");
    expect(call.html).toContain("View Dashboard");
  });

  it("sends Japanese referral success email", async () => {
    await sendReferralSuccessEmail(instructor, "ja");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("$50.00");
    expect(call.subject).toContain("新しいインストラクター紹介");
    expect(call.html).toContain("紹介ボーナスを獲得！");
    expect(call.html).toContain("Akikoさん、こんにちは。");
    expect(call.html).toContain("New Instructor");
    expect(call.html).toContain("10%");
    expect(call.html).toContain("ダッシュボードを見る");
  });

  it("sends Chinese referral success email", async () => {
    await sendReferralSuccessEmail(instructor, "zh");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("$50.00");
    expect(call.subject).toContain("新讲师推荐");
    expect(call.html).toContain("获得推荐奖金！");
    expect(call.html).toContain("Akiko，您好。");
    expect(call.html).toContain("New Instructor");
    expect(call.html).toContain("10%");
    expect(call.html).toContain("查看控制台");
  });
});

// ---------------------------------------------------------------------------
// sendSubscriptionRenewalEmail
// ---------------------------------------------------------------------------
describe("sendSubscriptionRenewalEmail", () => {
  const instructor = {
    email: "renew@example.com",
    fullName: "Mei",
    nextBillingDate: "2027-01-01",
  };

  it("sends English renewal email", async () => {
    await sendSubscriptionRenewalEmail(instructor);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toBe("renew@example.com");
    expect(call.subject).toBe(
      "Subscription Renewed - Mother Vegetable Instructor"
    );
    expect(call.html).toContain("Subscription Renewed!");
    expect(call.html).toContain("Hi Mei,");
    expect(call.html).toContain(
      "Your annual instructor subscription has been successfully renewed."
    );
    expect(call.html).toContain("$250.00/year");
    expect(call.html).toContain("2027-01-01");
    expect(call.html).toContain("View Dashboard");
  });

  it("sends Japanese renewal email", async () => {
    await sendSubscriptionRenewalEmail(instructor, "ja");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("サブスクリプション更新");
    expect(call.html).toContain("サブスクリプションが更新されました！");
    expect(call.html).toContain("Meiさん、こんにちは。");
    expect(call.html).toContain("年間インストラクターサブスクリプションが正常に更新されました");
    expect(call.html).toContain("$250.00/年");
    expect(call.html).toContain("2027-01-01");
    expect(call.html).toContain("ダッシュボードを見る");
  });

  it("sends Chinese renewal email", async () => {
    await sendSubscriptionRenewalEmail(instructor, "zh");
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("订阅已续期");
    expect(call.html).toContain("订阅已续期！");
    expect(call.html).toContain("Mei，您好。");
    expect(call.html).toContain("您的年度讲师订阅已成功续期");
    expect(call.html).toContain("$250.00/年");
    expect(call.html).toContain("2027-01-01");
    expect(call.html).toContain("查看控制台");
  });
});
