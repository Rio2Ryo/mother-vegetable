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
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Mazavege Maker 募集</h1>
          <p className="mt-6 text-2xl font-semibold text-white/90">あなたのオリジナル商品をリスクなく世界へ</p>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-300">
            Mother Vegetableを使ったオリジナル商品を作り、あなたの夢を叶えながら、地球再生・人々の健康・地域活性化を実現します。
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-5xl">
          <PartnerSwitch active="maker" />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#25C760]">About Maker</p>
            <h2 className="mt-3 text-3xl font-black">Mazavege Makerとは</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-lg leading-9 text-gray-300">
            <p>Mazavege Makerとは、Mother Vegetableと日本の食品や化粧品などと組み合わせて、自分のオリジナル商品を作りたい方に向けたパートナー制度です。</p>
            <p className="mt-5">自分の商品アイデアを提案し、審査で承認された場合、Mazavege Shopで販売されます。</p>
          </div>
        </div>
      </section>

      <section className="bg-[#25C760]/[0.04] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black text-[#25C760]">コラボできる素材</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-[#25C760]/30 bg-black/60 p-7">
              <h3 className="text-2xl font-black">Mother Vegetable Achieve</h3>
              <p className="mt-3 font-bold text-[#25C760]">高たんぱく質＋全48種類の天然栄養</p>
              <p className="mt-4 leading-8 text-gray-300">Mother Vegetableから生まれた高栄養食品「Achieve」。たんぱく質、ミネラル、ビタミン、フィコシアニンなどを含み、食事、調味料、飲料、ペット、スポーツ栄養まで幅広く活用できます。</p>
              <Link href="/products?search=Achieve" className="mt-6 inline-flex rounded-full border border-[#25C760] px-5 py-3 text-sm font-bold text-[#25C760] no-underline hover:bg-[#25C760] hover:text-black">Achieveとのコラボ商品はこちら</Link>
            </article>
            <article className="rounded-3xl border border-[#25C760]/30 bg-black/60 p-7">
              <h3 className="text-2xl font-black">Mother Vegetable Confidence</h3>
              <p className="mt-3 font-bold text-[#25C760]">純度97%の天然シリカで、やさしく整える。</p>
              <p className="mt-4 leading-8 text-gray-300">Mother Vegetableから生まれた白いパウダー「Confidence」。医薬部外品原料規格もクリアしたシリカは、肌や髪、愛するペットにも使用可能で、化粧水やシャンプーに混ぜて1ランク上のアイテムに。</p>
              <Link href="/products?search=Confidence" className="mt-6 inline-flex rounded-full border border-[#25C760] px-5 py-3 text-sm font-bold text-[#25C760] no-underline hover:bg-[#25C760] hover:text-black">Confidenceとのコラボ商品はこちら</Link>
            </article>
            <article className="rounded-3xl border border-[#25C760]/30 bg-black/60 p-7">
              <h3 className="text-2xl font-black">Japanese Raw Material</h3>
              <p className="mt-3 font-bold text-[#25C760]">日本の地方を支える天然食 / 化粧品</p>
              <p className="mt-4 leading-8 text-gray-300">日本各地の道の駅や小さな町に眠る、地元ならではの食品・素材・産品の総称です。地球にやさしいMother Vegetableと組み合わせ、世界へ日本の魅力を発信していきます。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
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
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
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
          <Link href="/dealer/apply" className="mt-8 inline-flex rounded-full bg-[#25C760] px-8 py-4 font-black text-black no-underline transition hover:bg-white">
            Maker登録について相談する
          </Link>
        </div>
      </section>
    </main>
  );
}
