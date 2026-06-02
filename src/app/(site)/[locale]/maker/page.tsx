import { Link } from '@/i18n/navigation';
import PartnerSwitch from '@/components/PartnerSwitch';

const benefits = [
  {
    title: 'リスクなく自分の商品を持てる',
    body: '通常、オリジナル商品を作るには大量ロットの製造や契約金などの大きな初期費用が発生するほか在庫リスクが伴います（200〜1000万円ほど）。Mazavege Makerでは、月額200ドル（日本円30,000円＋税）で、自分のオリジナル商品づくりにチャレンジできます。',
  },
  {
    title: 'Japanese Raw Materialとのコラボ商品を作れる',
    body: '日本の伝統的な食品、化粧品素材、地域原料など、Japanese Raw MaterialとMother Vegetableを組み合わせた商品を作ることができます。地域の魅力や日本の素材価値とMother Vegetableを組み合わせ、Made In Japanの製品として世界へ届けることができます。',
  },
  {
    title: '初回100個分の製造費はMother Vegetable社が支援',
    body: '承認された商品については、初回100個分の製造ロットをMother Vegetable社が全額出資・支援します。そのため、Makerは初回100個分の製造費を支払う必要がありません。',
  },
];

const conditions = [
  '製造された商品はMazavege Shopに掲載されます',
  'あなたの商品を世界各地にいるMazavege Dealerが販売してくれます',
  'MakerはDealerの資格も得るため、自分で販売することも可能です',
  '商品をセルフ購入する際は15%オフになります（定価購入後、15%が報酬として振込）',
  '商品が売れた場合、Makerロイヤリティとして10%の報酬が入ります',
  '自分で販売した場合、Dealerロイヤリティ15%＋Makerロイヤリティ10%の合計25%が入ります',
  '8週間で完売できなかった場合、売れ残り分をMakerロイヤリティ10%を差し引いた金額で買い取っていただきます',
  '101個以上の製造を希望の場合は販売価格の30%の支払いで製造が可能です',
];

export default function MakerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.22),transparent_42%)]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Partner Program</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Mazavege Maker</h1>
          <p className="mt-6 text-2xl font-semibold text-white/90 md:text-3xl">あなたのオリジナル商品をリスクなく世界へ</p>
          <p className="mt-6 max-w-4xl text-lg leading-9 text-gray-300 md:text-xl md:leading-10">
            Mother Vegetableを使ったオリジナル商品を作り、あなたの夢を叶えながら、地球再生・人々の健康・地域活性化を実現します。
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <PartnerSwitch active="maker" />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#25C760]">About Maker</p>
          <h2 className="mt-3 text-3xl font-black">Mazavege Makerとは</h2>
          <div className="mt-6 text-lg leading-9 text-gray-300">
            <p>Mazavege Makerとは、Mother Vegetableと日本の食品や化粧品などと組み合わせて、自分のオリジナル商品を作りたい方に向けたパートナー制度です。</p>
            <p className="mt-5">自分の商品アイデアを提案し、審査で承認された場合、Mazavege Shopで販売されます。</p>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-left">
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                fontSize: 'clamp(24px, 2.8vw, 38px)',
                color: '#25C760',
                lineHeight: 1.28,
                textShadow: '0 0 18px rgba(37,199,96,0.30)',
              }}
            >
              コラボできる素材
            </h2>
            <div
              className="mt-5 rounded-full"
              style={{
                width: 'min(280px, 62%)',
                height: 3,
                background: 'linear-gradient(90deg, #25C760, #3C8063, transparent)',
                boxShadow: '0 0 20px rgba(37,199,96,0.42)',
              }}
            />
          </div>

          <div className="flex flex-col gap-10">
            <article
              className="relative w-full overflow-hidden p-8 md:p-12"
              style={{ borderRadius: 14, border: '1px solid #25C760', background: '#000' }}
            >
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 300,
                  height: 300,
                  right: -80,
                  top: -70,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(37,199,96,0.20), transparent 70%)',
                }}
              />
              <div className="relative z-10 text-left">
                <span className="mb-3 block text-sm font-bold tracking-[0.25em]" style={{ color: '#25C760' }}>01</span>
                <h3 className="mb-2 font-extrabold" style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(38px, 4.2vw, 58px)', color: '#25C760', lineHeight: 1.18 }}>
                  Achieve
                </h3>
                <strong className="mb-4 block font-extrabold" style={{ color: '#fff', fontSize: 'clamp(19px, 2vw, 28px)', lineHeight: 1.45 }}>
                  高たんぱく質＋全48種類の天然栄養
                </strong>
                <p className="max-w-[680px]" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 2 }}>
                  Mother Vegetableから生まれた高栄養食品「Achieve」。<br />
                  たんぱく質、ミネラル、ビタミン、フィコシアニンなどを含み、<br className="hidden md:block" />
                  食事、調味料、飲料、ペット、スポーツ栄養まで幅広く活用できます。<br />
                  現代の食に、地球最古の生命力を加える素材です。
                </p>
                <div className="mt-7 flex">
                  <Link
                    href="/products?search=Achieve"
                    className="inline-flex w-[min(100%,290px)] items-center justify-center rounded-full px-6 py-3 text-sm font-bold no-underline transition-all duration-300 hover:-translate-y-1 md:w-auto"
                    style={{ background: '#25C760', color: '#001d0c', border: '1px solid #25C760', boxShadow: '0 0 20px rgba(37,199,96,0.42)', fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    Achieveとのコラボ商品はこちら
                  </Link>
                </div>
              </div>
            </article>

            <article
              className="relative w-full overflow-hidden p-8 text-left md:p-12"
              style={{
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.78)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(37,199,96,0.06) 42%, #000 100%)',
                maxWidth: '100%',
              }}
            >
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 300,
                  height: 300,
                  left: -90,
                  top: -70,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.24), rgba(37,199,96,0.10) 44%, transparent 72%)',
                }}
              />
              <div className="relative z-10 text-left md:max-w-[760px]">
                <span className="mb-3 block text-sm font-bold tracking-[0.25em]" style={{ color: '#fff' }}>02</span>
                <h3 className="mb-2 font-extrabold" style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(38px, 4.2vw, 58px)', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.34)', lineHeight: 1.18 }}>
                  Confidence
                </h3>
                <strong className="mb-4 block font-extrabold" style={{ color: 'rgba(255,255,255,0.90)', fontSize: 'clamp(19px, 2vw, 28px)', lineHeight: 1.45 }}>
                  純度97%の天然シリカで、やさしく整える。
                </strong>
                <p style={{ color: 'rgba(255,255,255,0.90)', fontSize: 16, lineHeight: 2, maxWidth: 680 }}>
                  Mother Vegetableから生まれた白いパウダー「Confidence」。<br />
                  育つ過程で、純度97%の非晶質シリカを生み出します。<br />
                  医薬部外品原料規格もクリアしたシリカは肌や髪、愛するペットにも使用可能で、<br className="hidden md:block" />
                  化粧水やシャンプーに混ぜて1ランク上のアイテムに。
                </p>
                <div className="mt-7 flex justify-start">
                  <Link
                    href="/products?search=Confidence"
                    className="inline-flex w-[min(100%,290px)] items-center justify-center rounded-full px-6 py-3 text-sm font-bold no-underline transition-all duration-300 hover:-translate-y-1 md:w-auto"
                    style={{ background: '#fff', color: '#001d0c', border: '1px solid #fff', fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    Confidenceとのコラボ商品はこちら
                  </Link>
                </div>
              </div>
            </article>

            <article
              className="relative w-full overflow-hidden p-8 md:p-12"
              style={{
                borderRadius: 14,
                border: '1px solid rgba(255,183,197,0.86)',
                background: 'radial-gradient(circle at 82% 8%, rgba(255,183,197,0.20), transparent 28%), radial-gradient(circle at 12% 16%, rgba(255,183,197,0.12), transparent 30%), linear-gradient(180deg, rgba(255,183,197,0.06), #000 72%)',
                boxShadow: '0 0 28px rgba(255,183,197,0.13)',
              }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <span className="absolute right-[12%] top-[16%] h-12 w-7 rotate-45 rounded-[70%_30%_70%_30%] bg-[#ffb7c5]/20 blur-[1px]" />
                <span className="absolute right-[24%] top-[36%] h-9 w-5 -rotate-12 rounded-[70%_30%_70%_30%] bg-white/12 blur-[1px]" />
                <span className="absolute right-[8%] bottom-[18%] h-10 w-6 rotate-[28deg] rounded-[70%_30%_70%_30%] bg-[#ffb7c5]/16 blur-[1px]" />
                <span className="absolute left-[58%] top-[18%] h-7 w-4 -rotate-[32deg] rounded-[70%_30%_70%_30%] bg-[#ffb7c5]/14 blur-[1px]" />
                <span className="absolute left-[48%] bottom-[20%] h-8 w-5 rotate-[18deg] rounded-[70%_30%_70%_30%] bg-white/10 blur-[1px]" />
              </div>
              <div className="relative z-10 text-left">
                <span className="mb-3 block text-sm font-bold tracking-[0.25em]" style={{ color: '#ffb7c5' }}>03</span>
                <h3 className="mb-2 font-extrabold" style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(34px, 4vw, 54px)', color: '#ffb7c5', lineHeight: 1.18, textShadow: '0 0 20px rgba(255,183,197,0.22)' }}>
                  Japanese Raw Material
                </h3>
                <strong className="mb-4 block font-extrabold" style={{ color: '#fff', fontSize: 'clamp(19px, 2vw, 28px)', lineHeight: 1.45 }}>
                  日本各地で作られる高品質の食品/化粧品
                </strong>
                <p className="max-w-[760px]" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 2 }}>
                  日本各地の道の駅や小さな町に眠る、地元ならではの食品・素材・産品の総称です。<br />
                  味噌や塩、果汁ジュース、発酵食品、温泉水や米ぬかコスメなど、地域の自然と暮らしから生まれたものを指します。<br />
                  大量生産品にはない、土地の個性と作り手の物語が価値になります。<br />
                  地球にやさしいMother Vegetableと組み合わせ、世界へ日本の魅力を発信していきます。
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-[#25C760]">Makerになるメリット</h2>
          <div className="mt-8 space-y-5">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <span className="text-sm font-bold text-[#25C760]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-2xl font-bold">{benefit.title}</h3>
                <p className="mt-4 leading-8 text-gray-300">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#25C760]/[0.04] px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-3xl border border-[#25C760]/30 bg-black/60 p-8">
            <h2 className="text-2xl font-black text-[#25C760]">Maker登録費用（提案料無料）</h2>
            <p className="mt-5 text-3xl font-black">月額 200ドル</p>
            <p className="mt-2 text-gray-300">または 月額30,000円＋税</p>
            <p className="mt-6 leading-8 text-gray-300">商品提案をMother Vegetable社が審査し、承認された場合に限り、初月の支払いが発生します。提案は無料なので、たくさんのアイデアをお待ちしています。</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-[#25C760]">特典と条件</h2>
            <ul className="mt-5 space-y-3 text-gray-300">
              {conditions.map((item) => (
                <li key={item} className="flex gap-3"><span className="text-[#25C760]">●</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#25C760]/40 bg-[#25C760]/10 p-10">
          <h2 className="text-3xl font-black">Mazavege Makerに登録する</h2>
          <p className="mt-4 text-lg text-gray-300">Mother Vegetableと日本の素材を組み合わせ、あなたのアイデアを世界へ届けましょう。</p>
          <Link
            href="/dealer/apply"
            className="mt-8 inline-flex rounded-full px-8 py-4 font-black text-black no-underline transition hover:bg-white"
            style={{ background: '#ffb7c5', boxShadow: '0 0 24px rgba(255,183,197,0.34)' }}
          >
            アイデアを提案する
          </Link>
        </div>
      </section>
    </main>
  );
}
