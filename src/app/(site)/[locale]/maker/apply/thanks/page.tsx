import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: '送信ありがとうございました｜Mazavege Maker',
  description: 'Mazavege Makerアイデア提案の送信完了ページです。',
};

export default async function MakerApplyThanksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#25C760]/40 bg-[#25C760]/10 p-8 text-center md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Thank you</p>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">送信ありがとうございました</h1>
        <p className="mt-6 text-lg leading-9 text-gray-300">
          Mazavege Makerのアイデア提案を受け付けました。控えのメールをお送りします。
          審査結果は原則2週間以内にメールでご連絡します。
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 text-left text-sm leading-7 text-gray-300">
          <p className="font-bold text-white">次の流れ</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Mother Vegetable社が素材・容器・デザイン案を確認します。</li>
            <li>審査OKの場合のみ、Maker登録と月額200ドル（または月額30,000円＋税）の支払い手続きへ進みます。</li>
            <li>審査OKにならなかった場合、費用は発生しません。</li>
          </ol>
        </div>
        <Link href="/maker" className="mt-8 inline-flex rounded-full bg-[#25C760] px-8 py-4 font-black text-black no-underline transition hover:bg-white">
          Makerページへ戻る
        </Link>
      </section>
    </main>
  );
}
