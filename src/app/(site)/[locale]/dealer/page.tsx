'use client';

import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function DealerPage() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';

  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t(
              'Dealer Program',
              '代理店プログラム',
              '经销商计划',
            )}
          </h1>
          <p className="text-lg md:text-xl text-[#25C760] font-medium mb-4">
            Mother Vegetable Dealer Program
          </p>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Partner with Mother Vegetable as an authorized dealer. Expand your business with our premium health supplement lineup backed by Japanese quality standards.',
              'マザーベジタブルの正規代理店として、あなたのビジネスを拡大しませんか。日本品質のプレミアム健康食品ラインナップでビジネスチャンスを広げます。',
              '成为Mother Vegetable授权经销商，拓展您的业务。凭借日本品质标准的优质健康食品系列，开拓商业机会。',
            )}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-12 text-center">
            {t('Dealer Benefits', '代理店の特典', '经销商优势')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: t('High Commission', '高コミッション率', '高佣金率'),
                desc: t(
                  '25% commission on all sales. Maximize your revenue with competitive commission rates.',
                  '販売額の25%をコミッションとしてお支払い。業界最高水準の報酬率で収益を最大化できます。',
                  '所有销售额的25%作为佣金。以极具竞争力的佣金率最大化您的收入。',
                ),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
                title: t('Full Support', 'サポート体制', '全面支持'),
                desc: t(
                  'Marketing materials, product training, and ongoing sales support provided at no extra cost.',
                  'マーケティング素材・研修・継続的な営業サポートを無料で提供します。',
                  '免费提供营销材料、产品培训和持续销售支持。',
                ),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                title: t('Exclusive Territory', '独占エリア', '独家区域'),
                desc: t(
                  'Secure exclusive sales rights in your designated area. No competing dealers in your territory.',
                  'エリア限定の販売権を確保。指定エリア内で他の代理店と競合しません。',
                  '在指定区域内获得独家销售权。您的区域内不会有竞争经销商。',
                ),
              },
            ].map((v) => (
              <div key={v.title} className="text-center border border-[rgba(37,199,96,0.3)] rounded-xl p-8">
                <div className="w-14 h-14 rounded-full bg-[rgba(37,199,96,0.12)] flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[rgba(37,199,96,0.04)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-12 text-center">
            {t('How It Works', 'ご利用の流れ', '如何运作')}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: t('Apply', '申し込み', '申请'),
                desc: t(
                  'Submit your application through our online form.',
                  'フォームから応募してください。',
                  '通过在线表单提交申请。',
                ),
              },
              {
                step: '02',
                title: t('Review & Contract', '審査・契約', '审核与签约'),
                desc: t(
                  'We review your application and finalize the dealer agreement.',
                  '審査後に契約を締結します。',
                  '审核通过后签订经销商协议。',
                ),
              },
              {
                step: '03',
                title: t('Start Selling', '販売開始', '开始销售'),
                desc: t(
                  'Get your exclusive dealer link and start selling immediately.',
                  '専用リンクで販売をスタートできます。',
                  '获取专属经销商链接，立即开始销售。',
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#25C760] flex items-center justify-center mx-auto mb-5">
                  <span className="text-[#25C760] text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t(
              'Become a Dealer Today',
              '代理店に応募する',
              '立即成为经销商',
            )}
          </h2>
          <p className="text-gray-400 mb-8">
            {t(
              'Join our growing network of authorized dealers and build your business with Mother Vegetable.',
              'マザーベジタブルの正規代理店ネットワークに参加し、ビジネスを成長させましょう。',
              '加入我们不断壮大的授权经销商网络，与Mother Vegetable一起发展业务。',
            )}
          </p>
          <Link
            href="/dealer/apply"
            className="inline-block bg-[#25C760] text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#1da34d] transition-colors duration-300 no-underline"
          >
            {t('Apply Now', '代理店に応募する', '立即申请')}
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-[rgba(37,199,96,0.04)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#25C760] mb-6">
            {t('Contact Us', 'お問い合わせ', '联系我们')}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {t(
              'Have questions about the dealer program? Contact our partnership team.',
              '代理店プログラムに関するご質問は、パートナーシップチームまでお気軽にお問い合わせください。',
              '对经销商计划有疑问？请联系我们的合作团队。',
            )}
          </p>
          <a
            href="mailto:dealer@mothervegetable.com"
            className="text-[#25C760] hover:underline text-sm"
          >
            dealer@mothervegetable.com
          </a>
        </div>
      </section>
    </main>
  );
}
