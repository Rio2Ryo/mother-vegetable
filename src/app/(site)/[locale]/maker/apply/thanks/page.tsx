import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'ご提案ありがとうございます｜Mazavege Maker',
  description: 'Mazavege Makerアイデア提案の送信完了ページです。',
};

export default async function MakerApplyThanksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const t = (ja: string, en: string, zh: string) => (isEn ? en : isZh ? zh : ja);

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#25C760]/40 bg-[#25C760]/10 p-8 text-center md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Thank you</p>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">
          {t('ご提案ありがとうございます', 'Thank you for your proposal', '感谢您的提案')}
        </h1>
        <p className="mt-6 text-lg leading-9 text-gray-300">
          {t(
            'Mazavege Makerのアイデア提案を受け付けました。控えのメールをお送りします。審査結果は原則2週間以内にメールでご連絡します。',
            'We have received your Mazavege Maker idea proposal. A confirmation email will be sent to you. In principle, we will contact you by email with the review result within two weeks.',
            '我们已收到您的Mazavege Maker创意提案。我们会向您发送确认邮件。原则上，审核结果将在两周内通过邮件通知您。',
          )}
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 text-left text-sm leading-7 text-gray-300">
          <p className="font-bold text-white">
            {t('この後の流れ', 'What happens next', '接下来的流程')}
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>
              {t(
                'Mother Vegetable社が素材・容器・デザイン案を確認します。',
                'Mother Vegetable will review the material, container, and design proposal.',
                'Mother Vegetable将审核素材、容器和设计方案。',
              )}
            </li>
            <li>
              {t(
                '審査が通った場合のみ、Mazavege Makerの登録と月額200ドル（月額30,000円＋税）の支払い手続きへ進みます。',
                'Only if the proposal passes review, you will proceed to Mazavege Maker registration and the payment process for USD 200 per month (JPY 30,000 + tax per month).',
                '仅在审核通过后，您才会进入Mazavege Maker注册以及每月200美元（每月30,000日元＋税）的付款流程。',
              )}
            </li>
            <li>
              {t(
                '審査に通らなかった場合は、費用は発生いたしません。',
                'If the proposal does not pass review, no fee will be charged.',
                '如果审核未通过，则不会产生任何费用。',
              )}
            </li>
          </ol>
        </div>
        <Link href="/maker" className="mt-8 inline-flex rounded-full bg-[#25C760] px-8 py-4 font-black text-black no-underline transition hover:bg-white">
          {t('Makerページへ戻る', 'Back to Maker page', '返回Maker页面')}
        </Link>
      </section>
    </main>
  );
}
