import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

const copy = {
  ja: {
    metaTitle: 'ATH｜Mother Vegetable',
    metaDescription:
      'ATHは、Mother Vegetableの48種類の天然栄養を日常のパフォーマンス習慣に変えるためのランディングページです。',
    badge: 'Mother Vegetable ATH',
    eyebrow: 'ALL MADE IN JAPAN',
    title: '日々のコンディションを、\n植物由来の力で整える。',
    lead:
      'ATHは、忙しい毎日でも自分らしく動き続けたい人へ向けたMother VegetableのウェルネスLPです。高たんぱく質と全48種類の天然栄養を、シンプルな習慣として届けます。',
    primaryCta: '商品を見る',
    secondaryCta: 'Mother Vegetableとは',
    pillarsTitle: 'ATHが届ける3つの価値',
    pillars: [
      ['01', 'High Protein', '毎日のからだづくりを支える、高たんぱく質のスマートな栄養補給。'],
      ['02', '48 Natural Nutrients', '地球最古の生命の力から生まれた、全48種類の天然栄養。'],
      ['03', 'Sustainable Habit', '自分の健康と、未来の食の循環を同時に育てる新しい選択。'],
    ],
    storyTitle: '続ける人のための、\n次世代ウェルネス。',
    storyText:
      'Mother Vegetableは、栄養をただ摂るだけではなく、地球と人を同時に育てるブランドです。ATHでは、Achieveを中心に、毎日のコンディションづくりへ自然に取り入れやすい体験として再構成しました。',
    routineTitle: 'ATH Daily Routine',
    routine: ['朝のスタートに', '運動後のリカバリーに', '仕事や移動の合間に'],
    productsTitle: 'Recommended Product',
    productName: 'Mother Vegetable Achieve',
    productLead: '高たんぱく質＋全48種類の天然栄養を1本に。',
    finalTitle: '今日の一歩を、\n未来の循環へ。',
    finalText:
      'ATHは、からだのための習慣を、地球のための選択にも変えていきます。Mother Vegetableの世界観を保ったまま、/ath 専用LPとして展開しています。',
  },
  en: {
    metaTitle: 'ATH | Mother Vegetable',
    metaDescription:
      'ATH is a Mother Vegetable landing page for turning 48 natural nutrients into a daily performance habit.',
    badge: 'Mother Vegetable ATH',
    eyebrow: 'ALL MADE IN JAPAN',
    title: 'Daily condition,\npowered by plants.',
    lead:
      'ATH is a Mother Vegetable wellness landing page for people who want to keep moving with confidence. High protein and 48 natural nutrients become one simple daily habit.',
    primaryCta: 'View products',
    secondaryCta: 'About Mother Vegetable',
    pillarsTitle: 'Three values from ATH',
    pillars: [
      ['01', 'High Protein', 'Smart protein support for everyday body conditioning.'],
      ['02', '48 Natural Nutrients', 'A complete blend inspired by the oldest life force on Earth.'],
      ['03', 'Sustainable Habit', 'A new choice that supports personal wellness and future food cycles.'],
    ],
    storyTitle: 'Next-generation wellness\nfor people who keep going.',
    storyText:
      'Mother Vegetable is not just about nutrition. It is a brand that grows people and the planet together. ATH reframes Achieve as an easy daily conditioning experience.',
    routineTitle: 'ATH Daily Routine',
    routine: ['Start your morning', 'Recover after exercise', 'Refuel between work and travel'],
    productsTitle: 'Recommended Product',
    productName: 'Mother Vegetable Achieve',
    productLead: 'High protein + 48 natural nutrients in one stick.',
    finalTitle: 'Turn today’s step\ninto tomorrow’s cycle.',
    finalText:
      'ATH turns a habit for your body into a choice for the planet, delivered as a dedicated /ath landing page in the Mother Vegetable design language.',
  },
  zh: {
    metaTitle: 'ATH｜Mother Vegetable',
    metaDescription: 'ATH 是 Mother Vegetable 的专属落地页，将48种天然营养转化为日常健康习惯。',
    badge: 'Mother Vegetable ATH',
    eyebrow: 'ALL MADE IN JAPAN',
    title: '用植物的力量，\n调整每日状态。',
    lead:
      'ATH 面向希望保持行动力与自信的人群。高蛋白与48种天然营养，成为简单、可持续的日常习惯。',
    primaryCta: '查看产品',
    secondaryCta: '了解 Mother Vegetable',
    pillarsTitle: 'ATH 带来的三个价值',
    pillars: [
      ['01', 'High Protein', '支持每日身体状态管理的高蛋白营养补给。'],
      ['02', '48 Natural Nutrients', '源自地球古老生命力的48种天然营养。'],
      ['03', 'Sustainable Habit', '同时支持个人健康与未来食物循环的新选择。'],
    ],
    storyTitle: '为持续前进的人，\n打造下一代健康体验。',
    storyText:
      'Mother Vegetable 不只是提供营养，更希望同时滋养人与地球。ATH 以 Achieve 为核心，重新构建适合日常坚持的健康体验。',
    routineTitle: 'ATH Daily Routine',
    routine: ['清晨开始时', '运动恢复后', '工作与移动间隙'],
    productsTitle: 'Recommended Product',
    productName: 'Mother Vegetable Achieve',
    productLead: '高蛋白＋48种天然营养，一支完成。',
    finalTitle: '今天的一步，\n连接未来的循环。',
    finalText:
      'ATH 将身体习惯转化为地球友好的选择，并以 Mother Vegetable 的设计语言作为 /ath 专属LP呈现。',
  },
} as const;

type Locale = keyof typeof copy;

function getLocale(locale: string): Locale {
  return locale === 'ja' || locale === 'zh' ? locale : 'en';
}

function Multiline({ text }: { text: string }) {
  return <>{text.split('\n').map((line) => <span key={line} className="block">{line}</span>)}</>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = copy[getLocale(locale)];

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: '/ath',
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      images: ['/cdn/products_achieve_10001.png'],
    },
  };
}

export default async function AthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = getLocale(locale);
  const t = copy[safeLocale];
  const productHref = `/${safeLocale}/product/achieve`;
  const homeHref = `/${safeLocale}`;

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative isolate min-h-[86vh] px-5 pt-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.32),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.18),transparent_28%),linear-gradient(180deg,#020617_0%,#020403_64%,#07130d_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="pt-12 sm:pt-20">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-300/25 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
              {t.badge}
            </div>
            <p className="mb-4 text-sm font-bold tracking-[0.4em] text-emerald-300/90">{t.eyebrow}</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              <Multiline text={t.title} />
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{t.lead}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={productHref} className="rounded-full bg-emerald-300 px-8 py-4 text-center text-sm font-black text-black shadow-[0_18px_50px_rgba(52,211,153,0.32)] transition hover:bg-white">
                {t.primaryCta}
              </Link>
              <Link href={homeHref} className="rounded-full border border-white/20 bg-white/8 px-8 py-4 text-center text-sm font-bold text-white backdrop-blur transition hover:border-emerald-200/60 hover:bg-white/14">
                {t.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl pb-16 lg:pb-0">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/30 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-emerald-200/15 to-white/5 p-8">
                <Image
                  src="/cdn/products_achieve_10013.jpg"
                  alt="Mother Vegetable Achieve"
                  width={1382}
                  height={920}
                  priority
                  className="mx-auto h-auto w-full drop-shadow-[0_35px_65px_rgba(0,0,0,0.55)]"
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-bold text-white/76">
                <div className="rounded-2xl bg-black/35 px-3 py-4">Protein</div>
                <div className="rounded-2xl bg-black/35 px-3 py-4">48 Nutrients</div>
                <div className="rounded-2xl bg-black/35 px-3 py-4">Japan Made</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">{t.pillarsTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.pillars.map(([number, title, text]) => (
              <div key={number} className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur transition hover:border-emerald-200/40 hover:bg-emerald-300/[0.08]">
                <p className="text-sm font-black text-emerald-300">{number}</p>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-emerald-200/15 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.22),transparent_35%),rgba(255,255,255,0.055)] p-8">
            <p className="text-sm font-black tracking-[0.3em] text-emerald-300">STORY</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] sm:text-6xl">
              <Multiline text={t.storyTitle} />
            </h2>
          </div>
          <div>
            <p className="text-lg leading-9 text-white/72">{t.storyText}</p>
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
              <h3 className="text-xl font-black">{t.routineTitle}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {t.routine.map((item) => (
                  <div key={item} className="rounded-2xl bg-black/35 px-4 py-5 text-sm font-bold text-white/78">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-white/[0.055] p-6 sm:p-10 lg:p-12">
          <p className="text-sm font-black tracking-[0.3em] text-emerald-300">{t.productsTitle}</p>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Image src="/cdn/products_achieve_10013.jpg" alt="Mother Vegetable Achieve" width={1382} height={920} className="mx-auto h-auto w-full max-w-md rounded-[1.5rem]" />
            <div>
              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">{t.productName}</h2>
              <p className="mt-5 text-xl font-bold text-emerald-200">{t.productLead}</p>
              <p className="mt-6 leading-8 text-white/66">{t.finalText}</p>
              <Link href={productHref} className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black text-black transition hover:bg-emerald-200">
                {t.primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-10 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-5xl font-black leading-tight tracking-[-0.06em] sm:text-7xl">
            <Multiline text={t.finalTitle} />
          </h2>
          <p className="mx-auto mt-7 max-w-2xl leading-8 text-white/66">{t.finalText}</p>
        </div>
      </section>
    </div>
  );
}
