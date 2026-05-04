import {
  Sun,
  ShieldCheck,
  Fish,
  Sprout,
  Globe,
  Leaf,
  TrendingUp,
  Wrench,
  MapPin,
  Building2,
  Globe2,
  ArrowRight,
} from "lucide-react";

const ACCENT = "#25c760";

const mainFeatures = [
  {
    icon: Sun,
    title: "太陽光で自家発電",
    body: "屋根のソーラーパネルで電力を自給自足し、ランニングコストを削減。",
  },
  {
    icon: ShieldCheck,
    title: "スーパーウッドで安心・安全",
    body: "接続部分に金属を使わない、高耐久・高強度の木造構造。",
  },
  {
    icon: Fish,
    title: "漁協と連携・稚魚の仕入れ可能",
    body: "定期的に稚魚が届き、これまで個人や他業種ではできなかった本格養殖が可能に。",
  },
  {
    icon: Sprout,
    title: "高速栽培LEDシステム",
    body: "AIと連動したLED照明システムで、魚の餌となる Mother Vegetable を高速培養。",
  },
  {
    icon: Globe,
    title: "未来の食料危機を解決する仕組み",
    body: "限られた水資源・土地で、魚と餌を同時に生産。持続可能で、誰もが始められる未来の食を。",
  },
];

const subFeatures = [
  {
    icon: Leaf,
    title: "ノーケミカルで安心",
    body: "オーガニックのエサと AI による水質管理で安心養殖。",
  },
  {
    icon: TrendingUp,
    title: "高い生産効率",
    body: "魚と餌を同時生産し、誰でも食料生産に貢献。",
  },
  {
    icon: Wrench,
    title: "どこでも簡単に設置",
    body: "キット化で、工具も少なく短期間で施工可能。",
  },
  {
    icon: MapPin,
    title: "どこでも設置可能",
    body: "庭・屋上・遊休地など、様々な場所に対応。",
  },
  {
    icon: Building2,
    title: "中小企業に最適",
    body: "小規模から始められ、事業拡大も容易。",
  },
  {
    icon: Globe2,
    title: "持続可能な未来へ",
    body: "環境に優しく、次世代につなぐ食のインフラ。",
  },
];

export default function SefsPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ─── Top Bar ─── */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <span
              aria-hidden
              className="inline-block h-3.5 w-3.5 rounded-full"
              style={{ background: ACCENT }}
            />
            <span className="font-extrabold tracking-tight text-[15px] sm:text-base text-gray-900">
              MOTHER VEGETABLE
            </span>
          </a>
          <a
            href="mailto:support@mothervegetable.com?subject=SEFS%20%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border-2 transition-colors"
            style={{
              borderColor: ACCENT,
              color: ACCENT,
            }}
          >
            お問い合わせ
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section
        id="top"
        className="relative overflow-hidden border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="order-2 md:order-1">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              SEFS — Sustainable Eco Farming System
            </p>
            <h1
              className="font-extrabold tracking-tight leading-[1.15] text-balance text-gray-900"
              style={{
                fontSize: "clamp(1.75rem, 6.2vw, 3.5rem)",
                wordBreak: "keep-all",
                overflowWrap: "break-word",
              }}
            >
              家庭や他業種の企業でも、
              <br className="hidden sm:block" />
              簡単に魚の養殖が
              <span style={{ color: ACCENT }}>始められる。</span>
            </h1>
            <p
              className="mt-6 text-gray-600 leading-relaxed text-balance"
              style={{ fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)" }}
            >
              食の未来を支える、持続可能な循環型システム。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:support@mothervegetable.com?subject=SEFS%20%E5%B0%8E%E5%85%A5%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                style={{ background: ACCENT }}
              >
                導入のご相談
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 transition-colors"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                詳細を見る
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200/70 aspect-[4/3] bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Images/sefs/sefs-hero.jpg"
                alt="SEFS の循環型養殖システム設備"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1.5"
                style={{ background: ACCENT }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── About SEFS ─── */}
      <section id="about" className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 md:py-28 text-center">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: ACCENT }}
          >
            About
          </p>
          <h2
            className="font-extrabold tracking-tight leading-tight text-gray-900 mb-6"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
          >
            SEFS とは
          </h2>
          <p className="text-gray-600 leading-loose text-[15px] sm:text-base md:text-lg text-balance">
            SEFS は Mother Vegetable が提供する循環型養殖システムです。
            太陽光発電・スーパーウッド・高速栽培LED・AI水質管理を組み合わせ、
            家庭から中小企業まで、どこでも誰でも持続可能な食料生産を始められる仕組みを実現します。
          </p>
        </div>
      </section>

      {/* ─── 5 Main Features ─── */}
      <section className="bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-20">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              Key Features
            </p>
            <h2
              className="font-extrabold tracking-tight leading-tight text-gray-900"
              style={{ fontSize: "clamp(1.6rem, 4.6vw, 2.5rem)" }}
            >
              SEFS の5つの特徴
            </h2>
          </div>

          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mainFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.title}
                  className="relative bg-white rounded-2xl p-7 md:p-8 ring-1 ring-gray-200/80 hover:ring-[color:var(--accent)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ ["--accent" as never]: ACCENT } as React.CSSProperties}
                >
                  <div
                    className="inline-flex items-center justify-center h-12 w-12 rounded-xl mb-5"
                    style={{ background: `${ACCENT}15`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: ACCENT }}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-bold text-lg leading-snug text-gray-900">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {f.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6 Sub Features ─── */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-20">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              Why SEFS
            </p>
            <h2
              className="font-extrabold tracking-tight leading-tight text-gray-900"
              style={{ fontSize: "clamp(1.6rem, 4.6vw, 2.5rem)" }}
            >
              選ばれる理由
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {subFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-4">
                  <div
                    className="flex-shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-lg"
                    style={{ background: `${ACCENT}12`, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base mb-1.5 text-gray-900 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[14.5px]">
                      {f.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-28 text-center">
          <h2
            className="font-extrabold tracking-tight leading-tight text-gray-900 mb-5 text-balance"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.75rem)" }}
          >
            持続可能な養殖を、
            <br className="sm:hidden" />
            あなたの場所から。
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base md:text-lg mb-10 text-balance">
            導入相談・お見積もりは無料です。お気軽にお問い合わせください。
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:support@mothervegetable.com?subject=SEFS%20%E5%B0%8E%E5%85%A5%E7%9B%B8%E8%AB%87"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ background: ACCENT }}
            >
              導入相談する
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:support@mothervegetable.com?subject=SEFS%20%E8%B3%87%E6%96%99%E8%AB%8B%E6%B1%82"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border-2 transition-colors"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              資料を請求する
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: ACCENT }}
            />
            <span className="font-extrabold tracking-tight text-sm text-gray-900">
              MOTHER VEGETABLE
            </span>
            <span className="text-gray-400 text-sm ml-2">© {year}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-md">
            本サイトは Mother Vegetable の SEFS（循環型養殖システム）専用LPです。
          </p>
          <a
            href="https://mothervegetable.co.jp"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Mother Vegetable 本体サイトへ
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </main>
  );
}
