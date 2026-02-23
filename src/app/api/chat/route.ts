import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT_EN = `You are Mother Vegetable's customer support assistant. Answer questions about products (Achieve for body wellness, Confidence for skin care, Forever for pets), pricing ($36.70 each), shipping (free worldwide), and usage. Achieve is a food supplement with 48 nutrients — add one stick to your drink or meal. Confidence is a certified quasi-drug cosmetic — apply directly or mix into your cosmetics. Forever is a pet supplement — mix one stick into your pet's food. All products are certified by Japanese government agencies. Keep answers concise and helpful. If you cannot answer a question, direct the user to support@mothervegetable.com. Always end every reply with exactly this line on its own: "For further assistance, contact us at support@mothervegetable.com"`;

const SYSTEM_PROMPT_JA = `あなたはマザーベジタブルのカスタマーサポートアシスタントです。製品（身体のためのAchieve、肌のためのConfidence、ペットのためのForever）、価格（各$36.70）、配送（全世界送料無料）、使い方についての質問にお答えください。Achieveは48種の栄養素を含む食品サプリメントです。スティック1本をお飲み物やお食事に加えてください。Confidenceは医薬部外品認定のコスメです。直接塗るか化粧品に混ぜてください。Foreverはペット用サプリメントです。スティック1本をペットのフードに混ぜてください。すべての製品は日本の政府機関により認定されています。簡潔で分かりやすい回答をしてください。お答えできない場合は、support@mothervegetable.comへご案内ください。必ず毎回の返答の最後に次の一行を追加してください: 「その他のご質問は support@mothervegetable.com までお問い合わせください」`;

function getSystemPrompt(locale: string): string {
  if (locale === 'ja') return SYSTEM_PROMPT_JA;
  return SYSTEM_PROMPT_EN;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured' },
      { status: 500 }
    );
  }

  const { messages, locale } = await request.json();

  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model: 'claude-3-haiku-20240307',
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
