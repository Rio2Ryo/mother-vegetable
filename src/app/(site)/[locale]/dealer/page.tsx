import { Link } from '@/i18n/navigation';
import PartnerSwitch from '@/components/PartnerSwitch';

const recommended = [
  'Mother Vegetableの考え方に共感してくださる方',
  'Mother Vegetableの商品を販売したい方',
  '健康や美容に関心のあるお客様がいる方',
  'ご自身でも商品をお得に継続したい方',
];

export default function DealerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.22),transparent_42%)]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Partner Program</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Mazavege Dealer</h1>
          <p className="mt-6 text-2xl font-semibold text-white/90 md:text-3xl">Mother Vegetableの商品を販売して地球を癒す</p>
          <p className="mt-6 max-w-4xl text-lg leading-9 text-gray-300 md:text-xl md:leading-10">
            <span className="block md:inline">使うことで地球にも、人々の健康にも、そして地域の経済にも優しいMother Vegetableを、</span>
            <br className="hidden md:block" />
            <span className="block md:inline">世界へと広げる仲間を募集します。</span>
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <PartnerSwitch active="dealer" />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#25C760]">About Dealer</p>
          <h2 className="mt-3 text-3xl font-black">Mazavege Dealerとは</h2>
          <div className="mt-6 text-lg leading-9 text-gray-300">
            <p>Mother Vegetableの考え方や商品に共感し、一緒に広げてくださる方に向けたパートナー制度です。</p>
            <p className="mt-5">Mazavege Dealerになると、Mother Vegetableの商品を販売できるようになるほか、ご自身もお得に商品をご購入いただけます。</p>
          </div>
        </div>
      </section>

      <section className="bg-[#25C760]/[0.04] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-[#25C760]">Dealerになるメリット</h2>
          <div className="mt-8 rounded-3xl border border-[#25C760]/30 bg-black/60 p-7 md:p-9">
            <article>
              <span className="text-sm font-bold text-[#25C760]">01</span>
              <h3 className="mt-3 text-2xl font-bold">Shopの商品を販売して15%報酬</h3>
              <p className="mt-4 leading-8 text-gray-300">
                あなた専用の販売リンクが発行され、Mazavege Shopの商品を販売・紹介できるようになります。健康、美容、食、ライフスタイルに関心のあるお客様へ、Mother Vegetableの商品を届けることができます。
              </p>
            </article>
            <div className="my-8 h-px bg-[#25C760]/20" />
            <article>
              <span className="text-sm font-bold text-[#25C760]">02</span>
              <h3 className="mt-3 text-2xl font-bold">全商品を15%オフで購入</h3>
              <p className="mt-4 leading-8 text-gray-300">
                Mazavege Shopの全商品を通常価格より15%オフでご購入いただけます。ご自身やご家族で継続利用したい方にもオススメです。（ご自身の販売リンクからご購入後、15%が販売報酬として後日振り込まれます。）
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#25C760]">Dealer登録費用</h2>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-3xl font-black">月額 100ドル＋tax</p>
            <p className="mt-2 text-gray-300">または 月額15,000円＋税</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#25C760]">このような方にオススメです</h2>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <ul className="space-y-3 text-gray-300">
              {recommended.map((item) => (
                <li key={item} className="flex gap-3"><span className="text-[#25C760]">●</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#25C760]/40 bg-[#25C760]/10 p-10">
          <h2 className="text-3xl font-black">Mazavege Dealerに登録する</h2>
          <p className="mt-4 text-lg text-gray-300">地球にも健康にも地域にも優しいMother Vegetableを世界へ。</p>
          <Link href="/dealer/apply" className="mt-8 inline-flex rounded-full bg-[#25C760] px-8 py-4 font-black text-black no-underline transition hover:bg-white">
            Dealer登録する
          </Link>
        </div>
      </section>
    </main>
  );
}
