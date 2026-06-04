import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import PartnerSwitch from '@/components/PartnerSwitch';

const recommended = [
  'Mother Vegetableの考え方に共感してくださる方',
  'Mother Vegetableの商品を販売したい方',
  '健康や美容に関心のあるお客様がいる方',
  'ご自身でも商品をお得に継続したい方',
];

const enRecommended = [
  'People who resonate with the philosophy of Mother Vegetable.',
  'People who want to sell Mother Vegetable products.',
  'People who already have customers interested in health and beauty.',
  'People who also want to continue using the products at a better price.',
];

const enText = {
  heroSub: 'Sell Mother Vegetable products and help heal the Earth',
  heroLead1: 'We are looking for partners who will help bring Mother Vegetable to the world —',
  heroLead2: 'a product line that is kind to the Earth, people’s health, and regional economies through everyday use.',
  aboutTitle: 'What is a Mazavege Dealer?',
  about1: 'Mazavege Dealer is a partner program for people who resonate with the philosophy and products of Mother Vegetable and want to help expand them together.',
  about2: 'By becoming a Mazavege Dealer, you can sell Mother Vegetable products and also purchase products at a better price for yourself.',
  benefitsTitle: 'Benefits of becoming a Dealer',
  benefit1Title: 'Sell Shop products and receive a 15% reward',
  benefit1Body: 'You will receive your own sales link and will be able to sell and introduce products from Mazavege Shop. You can deliver Mother Vegetable products to customers interested in health, beauty, food, and lifestyle.',
  benefit2Title: 'Purchase all products at 15% off',
  benefit2Body: 'You can purchase all products on Mazavege Shop at 15% off the regular price. This is also recommended for those who want to continue using the products personally or with their family. After purchasing through your own sales link, the 15% is paid later as a sales reward.',
  feeTitle: 'Dealer registration fee',
  feeMain: 'USD 100 / year + tax',
  feeSub: '(JPY 15,000 + tax / year)',
  recommendedTitle: 'Recommended for people like this',
  ctaTitle: 'Register as a Mazavege Dealer',
  ctaLead: 'Bring Mother Vegetable, which is kind to the Earth, health, and regional communities, to the world.',
  ctaButton: 'Register as a Dealer',
};

export default async function DealerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const list = isEn ? enRecommended : recommended;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.22),transparent_42%)]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Partner Program</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Mazavege Dealer</h1>
          <p className="mt-6 text-2xl font-semibold text-white/90 md:text-3xl">{isEn ? enText.heroSub : 'Mother Vegetableの商品を販売して地球を癒す'}</p>
          <p className="mt-6 max-w-4xl text-lg leading-9 text-gray-300 md:text-xl md:leading-10">
            <span className="block md:inline">{isEn ? enText.heroLead1 : '使うことで地球にも、人々の健康にも、そして地域の経済にも優しいMother Vegetableを、'}</span>
            <br className="hidden md:block" />
            <span className="block md:inline">{isEn ? enText.heroLead2 : '世界へと広げる仲間を募集します。'}</span>
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <PartnerSwitch active="dealer" locale={locale} />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#25C760]">About Dealer</p>
          <h2 className="mt-3 text-3xl font-black">{isEn ? enText.aboutTitle : 'Mazavege Dealerとは'}</h2>
          <div className="mt-6 text-lg leading-9 text-gray-300">
            <p>{isEn ? enText.about1 : 'Mother Vegetableの考え方や商品に共感し、一緒に広げてくださる方に向けたパートナー制度です。'}</p>
            <p className="mt-5">{isEn ? enText.about2 : 'Mazavege Dealerになると、Mother Vegetableの商品を販売できるようになるほか、ご自身もお得に商品をご購入いただけます。'}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#25C760]/[0.04] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-[#25C760]">{isEn ? enText.benefitsTitle : 'Dealerになるメリット'}</h2>
          <div className="mt-8 rounded-3xl border border-[#25C760]/30 bg-black/60 p-7 md:p-9">
            <article>
              <span className="text-sm font-bold text-[#25C760]">01</span>
              <h3 className="mt-3 text-2xl font-bold">{isEn ? enText.benefit1Title : 'Shopの商品を販売して15%報酬'}</h3>
              <p className="mt-4 leading-8 text-gray-300">{isEn ? enText.benefit1Body : 'あなた専用の販売リンクが発行され、Mazavege Shopの商品を販売・紹介できるようになります。健康、美容、食、ライフスタイルに関心のあるお客様へ、Mother Vegetableの商品を届けることができます。'}</p>
            </article>
            <div className="my-8 h-px bg-[#25C760]/20" />
            <article>
              <span className="text-sm font-bold text-[#25C760]">02</span>
              <h3 className="mt-3 text-2xl font-bold">{isEn ? enText.benefit2Title : '全商品を15%オフで購入'}</h3>
              <p className="mt-4 leading-8 text-gray-300">{isEn ? enText.benefit2Body : 'Mazavege Shopの全商品を通常価格より15%オフでご購入いただけます。ご自身やご家族で継続利用したい方にもオススメです。（ご自身の販売リンクからご購入後、15%が販売報酬として後日振り込まれます。）'}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#25C760]">{isEn ? enText.feeTitle : 'Dealer登録費用'}</h2>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-3xl font-black">{isEn ? enText.feeMain : '年額 100ドル＋tax'}</p>
            <p className="mt-2 text-gray-300">{isEn ? enText.feeSub : '(年額15,000円＋税)'}</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#25C760]">{isEn ? enText.recommendedTitle : 'このような方にオススメです'}</h2>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <ul className="space-y-3 text-gray-300">
              {list.map((item) => (
                <li key={item} className="flex gap-3"><span className="text-[#25C760]">●</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#25C760]/40 bg-[#25C760]/10 p-10">
          <h2 className="text-3xl font-black">{isEn ? enText.ctaTitle : 'Mazavege Dealerに登録する'}</h2>
          <p className="mt-4 text-lg text-gray-300">{isEn ? enText.ctaLead : '地球にも健康にも地域にも優しいMother Vegetableを世界へ。'}</p>
          <Link href="/dealer/apply" className="mt-8 inline-flex rounded-full bg-[#25C760] px-8 py-4 font-black text-black no-underline transition hover:bg-white">
            {isEn ? enText.ctaButton : 'Dealer登録する'}
          </Link>
        </div>
      </section>
    </main>
  );
}
