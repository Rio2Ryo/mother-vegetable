import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const SYSTEM_PROMPT_EN = `You are Mother Vegetable's customer support assistant. Answer questions about products (Achieve for body wellness, Confidence for skin care, Forever for pets), pricing ($36.70 each), shipping (free worldwide), and usage. Achieve is a food supplement with 48 nutrients — add one stick to your drink or meal. Confidence is a certified quasi-drug cosmetic — apply directly or mix into your cosmetics. Forever is a pet supplement — mix one stick into your pet's food. All products are certified by Japanese government agencies. Keep answers concise and helpful. If you cannot answer a question, direct the user to support@mothervegetable.com. Always end every reply with exactly this line on its own: "For further assistance, contact us at support@mothervegetable.com"`;

const SYSTEM_PROMPT_JA = `あなたはマザーベジタブルのカスタマーサポートアシスタントです。製品（身体のためのAchieve、肌のためのConfidence、ペットのためのForever）、価格（各$36.70）、配送（全世界送料無料）、使い方についての質問にお答えください。Achieveは48種の栄養素を含む食品サプリメントです。スティック1本をお飲み物やお食事に加えてください。Confidenceは医薬部外品認定のコスメです。直接塗るか化粧品に混ぜてください。Foreverはペット用サプリメントです。スティック1本をペットのフードに混ぜてください。すべての製品は日本の政府機関により認定されています。簡潔で分かりやすい回答をしてください。お答えできない場合は、support@mothervegetable.comへご案内ください。必ず毎回の返答の最後に次の一行を追加してください: 「その他のご質問は support@mothervegetable.com までお問い合わせください」`;

function getSystemPrompt(locale: string): string {
  if (locale === 'ja') return SYSTEM_PROMPT_JA;
  return SYSTEM_PROMPT_EN;
}

// ---------------------------------------------------------------------------
// Demo fallback — keyword-based responses when ANTHROPIC_API_KEY is not set
// ---------------------------------------------------------------------------

interface DemoEntry {
  keywords: RegExp;
  en: string;
  ja: string;
}

const DEMO_RESPONSES: DemoEntry[] = [
  {
    keywords: /achieve/i,
    en: `Achieve is our flagship food supplement containing 48 essential nutrients derived from 35 billion-year-old deep-sea minerals.\n\nHow to use: Simply add one stick to your drink or meal daily.\n\nPrice: $36.70 per box (30 sticks).\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `Achieveは、35億年前の深海ミネラルから抽出した48種の必須栄養素を含む主力食品サプリメントです。\n\n使い方：1日1スティックをお飲み物やお食事に加えてください。\n\n価格：1箱（30スティック入り）$36.70\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /confidence/i,
    en: `Confidence is our certified quasi-drug cosmetic for skin care, formulated with natural deep-sea minerals.\n\nHow to use: Apply directly to your skin or mix into your existing cosmetics.\n\nPrice: $36.70 per tube.\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `Confidenceは、天然の深海ミネラルを配合した医薬部外品認定のスキンケアコスメです。\n\n使い方：直接お肌に塗るか、お手持ちの化粧品に混ぜてご使用ください。\n\n価格：1本 $36.70\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /forever|pet/i,
    en: `Forever is our supplement specially formulated for pets, providing essential nutrients from deep-sea minerals.\n\nHow to use: Mix one stick into your pet's food daily.\n\nPrice: $36.70 per box (30 sticks).\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `Foreverは、深海ミネラル由来の必須栄養素をペットに届けるために開発されたサプリメントです。\n\n使い方：1日1スティックをペットのフードに混ぜてください。\n\n価格：1箱（30スティック入り）$36.70\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /price|cost|how much|値段|価格|いくら/i,
    en: `All Mother Vegetable products are priced at $36.70 each:\n\n• Achieve (food supplement) — $36.70\n• Confidence (skin care) — $36.70\n• Forever (pet supplement) — $36.70\n\nShipping is free worldwide!\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `マザーベジタブル製品はすべて各$36.70です：\n\n• Achieve（食品サプリメント）— $36.70\n• Confidence（スキンケア）— $36.70\n• Forever（ペット用サプリメント）— $36.70\n\n全世界送料無料です！\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /ship|deliver|送料|配送|届/i,
    en: `We offer free worldwide shipping on all orders! Orders are processed within 1-2 business days and typically arrive within 5-10 business days depending on your location.\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `全てのご注文で全世界送料無料です！ご注文は1〜2営業日以内に処理され、お届け先により5〜10営業日程度でお届けします。\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /how to use|usage|使い方|使用方法/i,
    en: `Here's how to use each product:\n\n• Achieve: Add one stick to your drink or meal daily.\n• Confidence: Apply directly to skin or mix into your cosmetics.\n• Forever: Mix one stick into your pet's food daily.\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `各製品の使い方：\n\n• Achieve：1日1スティックをお飲み物やお食事に加えてください。\n• Confidence：直接お肌に塗るか、化粧品に混ぜてください。\n• Forever：1日1スティックをペットのフードに混ぜてください。\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /product|商品|製品/i,
    en: `Mother Vegetable offers three products, all certified by Japanese government agencies:\n\n1. Achieve — A food supplement with 48 nutrients for body wellness ($36.70)\n2. Confidence — A certified quasi-drug cosmetic for skin care ($36.70)\n3. Forever — A pet supplement for your furry friends ($36.70)\n\nAll products are derived from Earth's 3.5 billion-year-old deep-sea life force.\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `マザーベジタブルは、日本の政府機関認定の3つの製品をご提供しています：\n\n1. Achieve — 48種の栄養素を含む食品サプリメント（$36.70）\n2. Confidence — 医薬部外品認定のスキンケアコスメ（$36.70）\n3. Forever — ペット用サプリメント（$36.70）\n\nすべての製品は35億年前の深海の生命力から生まれました。\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
  {
    keywords: /instructor|インストラクター/i,
    en: `Our Certified Instructor program lets you earn commissions by sharing Mother Vegetable products:\n\n• 25% commission on direct sales\n• 10% commission on referred instructor sales\n• $50 reward for each new instructor you refer\n\nAnnual membership: $250/year. Register at our Instructor Portal.\n\nFor further assistance, contact us at support@mothervegetable.com`,
    ja: `認定インストラクタープログラムでは、マザーベジタブル製品を紹介してコミッションを獲得できます：\n\n• 直接販売で25%コミッション\n• 紹介インストラクター経由の販売で10%コミッション\n• 新規インストラクター紹介で$50報酬\n\n年会費：$250/年。インストラクターポータルからご登録ください。\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`,
  },
];

const DEFAULT_RESPONSE_EN = `Thank you for your message! Here's what I can help you with:\n\n• Product information (Achieve, Confidence, Forever)\n• Pricing ($36.70 each)\n• Shipping (free worldwide)\n• How to use our products\n• Instructor program\n\nFeel free to ask about any of these topics!\n\nFor further assistance, contact us at support@mothervegetable.com`;

const DEFAULT_RESPONSE_JA = `お問い合わせありがとうございます！以下についてご案内できます：\n\n• 製品情報（Achieve、Confidence、Forever）\n• 価格（各$36.70）\n• 配送（全世界送料無料）\n• 製品の使い方\n• インストラクタープログラム\n\nお気軽にご質問ください！\n\nその他のご質問は support@mothervegetable.com までお問い合わせください`;

function getDemoResponse(userMessage: string, locale: string): string {
  const lower = userMessage.toLowerCase();
  for (const entry of DEMO_RESPONSES) {
    if (entry.keywords.test(lower)) {
      return locale === 'ja' ? entry.ja : entry.en;
    }
  }
  return locale === 'ja' ? DEFAULT_RESPONSE_JA : DEFAULT_RESPONSE_EN;
}

function textResponse(text: string): Response {
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const { messages, locale } = await request.json();

  // --- Fallback: demo responses when API key is not configured ---
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === 'user');
    const reply = getDemoResponse(lastUserMsg?.content ?? '', locale || 'en');
    return textResponse(reply);
  }

  // --- Live AI mode ---
  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    system: getSystemPrompt(locale || 'en'),
    messages,
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              new TextEncoder().encode(event.delta.text)
            );
          }
        }
        controller.close();
      } catch {
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
