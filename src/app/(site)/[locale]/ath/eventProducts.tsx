import Image from 'next/image';

export type EventProductKey = 'ath' | 'wn' | 'ti';

export type EventProduct = {
  key: EventProductKey;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  eyebrow: string;
  title: string;
  lead: string;
  productName: string;
  shortName: string;
  price: string;
  image: string;
  imageAlt: string;
  stripeEnv: string;
  accent: string;
  storyTitle: string;
  storyBody: string;
  detailTitle: string;
  detailBody: string;
  achieveTitle: string;
  achieveBody: string;
  conceptTitle: string;
  conceptBody: string;
  benefits: string[];
  closingTitle: string;
  closingBody: string;
};

export const eventProducts: Record<EventProductKey, EventProduct> = {
  ath: {
    key: 'ath',
    metaTitle: 'After Sun Care Spray｜Mother Vegetable',
    metaDescription:
      'マレーシアイベント会場限定。Confidenceを日焼け後のケアスプレーとして提案する当日購入ページです。',
    badge: 'Mother Vegetable Confidence',
    eyebrow: 'MALAYSIA EVENT LIMITED',
    title: '日差しを浴びた肌に、\nやさしいクールダウンを。',
    lead:
      'マレーシアのイベント会場で、日焼け後の肌をすぐにいたわりたい方へ。Confidenceの植物由来ケアを、持ち運びやすいアフターサンスプレーとして提案します。',
    productName: 'Confidence After Sun Care Spray',
    shortName: '日焼け後ケアスプレー',
    price: 'US$20',
    image: '/cdn/mv_body_mist_top.png',
    imageAlt: 'Mother Vegetable Confidence after-sun spray bottle',
    stripeEnv: 'NEXT_PUBLIC_STRIPE_LINK_ATH_SPRAY',
    accent: 'from-sky-300 via-emerald-200 to-lime-200',
    storyTitle: 'イベント当日の肌を、すぐに整える。',
    storyBody:
      '屋外移動や強い日差しのあと、肌にうるおいと心地よさを届けるためのケアアイテムです。軽くスプレーするだけで、日焼け後の乾燥が気になる肌をやさしくサポートします。',
    detailTitle: 'Confidence の魅力',
    detailBody:
      'Mother Vegetable Confidence は、毎日のセルフケアをやさしく支えるプロダクトです。イベント会場では、日差しを浴びた後の肌をいたわるアフターサンケアとして使いやすく仕立てました。',
    achieveTitle: 'スプレータイプの使いやすさ',
    achieveBody:
      '手を汚さずにさっと使えるスプレータイプ。会場での移動中、屋外で過ごしたあと、ホテルに戻る前のひと吹きなど、マレーシアの強い日差しを浴びた日のケア習慣として取り入れやすいアイテムです。',
    conceptTitle: '日差しを楽しんだあとに',
    conceptBody:
      'イベントを思いきり楽しんだ肌に、うるおいとクールダウンを。現地で試して、そのまま持ち帰れる当日購入用のConfidenceケアスプレーです。',
    benefits: ['After Sun Care', 'Quick Spray', 'Event Limited'],
    closingTitle: '会場で体験して、\nそのまま持ち帰る。',
    closingBody: '数量限定100個まで。マレーシアイベント当日の購入用リンクからお申し込みください。',
  },
  wn: {
    key: 'wn',
    metaTitle: '永原和可那 × 十勝 Honey Achieve｜Mother Vegetable',
    metaDescription:
      '永原和可那選手の想いと北海道十勝の恵みを込めた、Achieve入りハチミツのイベント購入ページです。',
    badge: 'Wakana Nagahara × Tokachi',
    eyebrow: 'HONEY ACHIEVE',
    title: '北海道十勝の恵みと、\n世界を制した想いを。',
    lead:
      '世界を制したチャンピオンの想い、北海道十勝の大地の恵み、そして35億年前から続く生命の栄養をひとつに。子どもたちの未来を応援する、新しいハチミツです。',
    productName: '永原和可那 × 十勝 Honey Achieve',
    shortName: '北海道 永原さん はちみつ',
    price: 'US$35',
    image: '/cdn/mv_honey_top.png',
    imageAlt: 'Tokachi Honey Achieve',
    stripeEnv: 'NEXT_PUBLIC_STRIPE_LINK_WN_HONEY',
    accent: 'from-amber-200 via-yellow-300 to-emerald-200',
    storyTitle: '北海道十勝の恵み',
    storyBody:
      '十勝は、北海道の東部に広がる日本最大級の農業地帯です。地平線まで続く広大な大地と澄んだ空気に育まれ、「日本の食料庫」とも呼ばれています。この雄大な自然の中で採れた蜂蜜は、豊かな香りとしっかりとしたコクが魅力です。',
    detailTitle: '永原和可那選手について',
    detailBody:
      '永原和可那選手は、女子ダブルスで日本初となる世界選手権2連覇を達成した世界トップクラスのアスリートです。世界の頂点に立った経験を持ち、次世代の子どもたちの成長を応援しています。その想いを込めて、この商品づくりに参加しました。',
    achieveTitle: 'Achieve の魅力',
    achieveBody:
      'Mother Vegetable Achieve は、35億年前に誕生した生命の栄養を凝縮したナチュラルパウダーです。たんぱく質、鉄分、ビタミン、フィコシアニンなどを豊富に含み、毎日のコンディションづくりをサポートします。',
    conceptTitle: '子どもたちの未来のために',
    conceptBody:
      '世界を制したチャンピオンの想い。\n北海道の大地の恵み。\nそして、35億年前から続く生命の栄養。\n子どもたちの未来を応援する、新しいハチミツです。',
    benefits: ['Tokachi Honey', 'Rich Aroma', 'Kids Future'],
    closingTitle: '子どもたちの未来を応援する、\n新しいハチミツ。',
    closingBody:
      '世界を制したチャンピオンの想い、北海道の大地の恵み、35億年前から続く生命の栄養をひとつに。数量限定100個まで。',
  },
  ti: {
    key: 'ti',
    metaTitle: '伊藤友広 × 大仙市 Honey Achieve｜Mother Vegetable',
    metaDescription:
      '伊藤友広選手の想いと秋田県大仙市の恵みを込めた、Achieve入りハチミツのイベント購入ページです。',
    badge: 'Tomohiro Ito × Daisen',
    eyebrow: 'HONEY ACHIEVE',
    title: '秋田県大仙市の恵みと、\n挑戦を支える想いを。',
    lead:
      '世界で戦ったアスリートの経験、故郷の自然の恵み、そして35億年前から続く生命の栄養をひとつに。子どもたちの挑戦を支える、新しいハチミツです。',
    productName: '伊藤友広 × 大仙市 Honey Achieve',
    shortName: '秋田 伊藤さん はちみつ',
    price: 'US$35',
    image: '/cdn/mv_honey_top.png',
    imageAlt: 'Daisen Honey Achieve',
    stripeEnv: 'NEXT_PUBLIC_STRIPE_LINK_TI_HONEY',
    accent: 'from-orange-200 via-amber-300 to-lime-200',
    storyTitle: '秋田県大仙市の恵み',
    storyBody:
      '秋田県大仙市は、日本有数の米どころとして知られる、自然豊かな地域です。冬の雪が大地を潤し、春から夏にかけて咲く花々から、蜜蜂たちは香り豊かな蜜を集めます。日本の原風景が残るこの土地で育まれた蜂蜜は、やさしく上品な甘さが特徴です。',
    detailTitle: '伊藤友広選手について',
    detailBody:
      '伊藤友広選手は、アテネオリンピック男子4×100mリレー日本代表として世界の舞台を走ったトップアスリートです。現在は毎年1,000人以上の子どもたちに走る楽しさと挑戦する大切さを伝えています。子どもたちの未来を応援したいという想いから、この商品づくりに参加しました。',
    achieveTitle: 'Achieve の魅力',
    achieveBody:
      'Mother Vegetable Achieve は、35億年前に誕生した生命の栄養を現代に届けるナチュラルパウダーです。たんぱく質、鉄分、ビタミン、フィコシアニンなどを豊富に含み、毎日の栄養補給をやさしくサポートします。',
    conceptTitle: '子どもたちの未来のために',
    conceptBody:
      '世界で戦ったアスリートの経験。\n故郷の自然の恵み。\nそして、35億年前から続く生命の栄養。\n子どもたちの挑戦を支える、新しいハチミツです。',
    benefits: ['Daisen Honey', 'Gentle Sweetness', 'Challenge Support'],
    closingTitle: '子どもたちの挑戦を支える、\n新しいハチミツ。',
    closingBody:
      '世界で戦ったアスリートの経験、故郷の自然の恵み、35億年前から続く生命の栄養をひとつに。数量限定100個まで。',
  },
};

function Multiline({ text }: { text: string }) {
  return <>{text.split('\n').map((line) => <span key={line} className="block">{line}</span>)}</>;
}

const LIVE_STRIPE_LINKS: Record<EventProductKey, string> = {
  ath: 'https://buy.stripe.com/5kQbJ28ZX0nL7mR7dT5J600',
  wn: 'https://buy.stripe.com/aFa7sM7VTdaxcHb0Pv5J601',
  ti: 'https://buy.stripe.com/eVqdRa5NLeeB5eJfKp5J602',
};

function getStripeLink(product: EventProduct) {
  return LIVE_STRIPE_LINKS[product.key];
}

export function EventProductPage({ product }: { product: EventProduct }) {
  const stripeLink = getStripeLink(product);

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative isolate px-5 pt-20 sm:px-8 lg:px-12">
        <div className={`absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.28),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(245,158,11,0.20),transparent_30%),linear-gradient(180deg,#020617_0%,#070806_62%,#11150b_100%)]`} />
        <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="pt-12 sm:pt-20">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/86 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
              {product.badge}
            </div>
            <p className="mb-4 text-sm font-bold tracking-[0.36em] text-emerald-300/90">{product.eyebrow}</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              <Multiline text={product.title} />
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{product.lead}</p>
            <div className="mt-8 max-w-md rounded-[1.75rem] border border-white/10 bg-black/30 p-5 backdrop-blur">
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/48">Price</p>
                  <p className="mt-1 text-4xl font-black tracking-[-0.04em] text-white">{product.price}</p>
                </div>
                <p className="pb-1 text-right text-xs font-bold uppercase tracking-[0.16em] text-emerald-200/80">Max 100 pcs</p>
              </div>
              {stripeLink ? (
                <a href={stripeLink} target="_blank" rel="noreferrer" className="mt-5 flex w-full items-center justify-center rounded-2xl bg-emerald-300 px-8 py-5 text-lg font-black text-black shadow-[0_18px_50px_rgba(52,211,153,0.36)] transition hover:-translate-y-0.5 hover:bg-white">
                  購入する
                  <span className="ml-3 text-2xl leading-none">→</span>
                </a>
              ) : (
                <span className="mt-5 flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-white/20 px-8 py-5 text-lg font-black text-white/55">
                  リンク準備中
                </span>
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl pb-16 lg:pb-0">
            <div className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${product.accent} opacity-35 blur-3xl`} />
            <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
              <div className={`overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${product.accent} p-8`}>
                <Image src={product.image} alt={product.imageAlt} width={900} height={900} priority className="mx-auto h-auto w-full drop-shadow-[0_35px_65px_rgba(0,0,0,0.42)]" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-bold text-white/76">
                {product.benefits.map((benefit) => <div key={benefit} className="rounded-2xl bg-black/35 px-3 py-4">{benefit}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 sm:p-10">
            <p className="text-sm font-black tracking-[0.3em] text-emerald-300">STORY</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{product.storyTitle}</h2>
            <p className="mt-6 leading-8 text-white/68">{product.storyBody}</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 sm:p-10">
            <p className="text-sm font-black tracking-[0.3em] text-emerald-300">PRODUCT</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{product.detailTitle}</h2>
            <p className="mt-6 leading-8 text-white/68">{product.detailBody}</p>
          </article>
        </div>
        <div className="mx-auto mt-5 grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className={`rounded-[2rem] border border-white/10 bg-gradient-to-br ${product.accent} p-7 text-black sm:p-10`}>
            <p className="text-sm font-black tracking-[0.3em] text-black/60">FEATURE</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{product.achieveTitle}</h2>
            <p className="mt-6 leading-8 text-black/72">{product.achieveBody}</p>
          </article>
          <article className="rounded-[2rem] border border-emerald-200/15 bg-emerald-300/[0.08] p-7 sm:p-10">
            <p className="text-sm font-black tracking-[0.3em] text-emerald-300">MESSAGE</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{product.conceptTitle}</h2>
            <p className="mt-6 whitespace-pre-line leading-8 text-white/72">{product.conceptBody}</p>
          </article>
        </div>
      </section>

      <section className="px-5 pb-24 pt-8 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-[2.25rem] border border-white/10 bg-white/[0.055] p-8 sm:p-12">
          <p className="text-sm font-black tracking-[0.3em] text-emerald-300">{product.productName}</p>
          <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] sm:text-7xl">
            <Multiline text={product.closingTitle} />
          </h2>
          <p className="mx-auto mt-7 max-w-2xl leading-8 text-white/66">{product.closingBody}</p>
          <div className="mx-auto mt-8 max-w-md rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/48">Price</p>
            <p className="mt-1 text-4xl font-black tracking-[-0.04em] text-white">{product.price}</p>
            <p className="mt-2 text-sm font-bold text-white/50">最大100個まで購入できます</p>
            {stripeLink ? (
              <a href={stripeLink} target="_blank" rel="noreferrer" className="mt-5 flex w-full items-center justify-center rounded-2xl bg-emerald-300 px-9 py-5 text-lg font-black text-black transition hover:-translate-y-0.5 hover:bg-white">
                購入する
                <span className="ml-3 text-2xl leading-none">→</span>
              </a>
            ) : (
              <span className="mt-5 flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-white/20 px-9 py-5 text-lg font-black text-white/55">リンク準備中</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
