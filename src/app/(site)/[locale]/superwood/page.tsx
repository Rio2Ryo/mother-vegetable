'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/* Lumber line-up — keyed by cross-section, with available lengths in mm. */
const lumberSizes: { section: string; lengths: number[] }[] = [
  { section: '30×105',   lengths: [3000, 4000] },
  { section: '45×45',    lengths: [3000, 4000] },
  { section: '90×90',    lengths: [3000, 4000] },
  { section: '105×105',  lengths: [3000, 4000] },
  { section: '120×120',  lengths: [3000, 4000] },
  { section: '105×180',  lengths: [3000, 4000, 6000] },
  { section: '120×180',  lengths: [3000, 4000] },
  { section: '120×210',  lengths: [4000] },
  { section: '120×240',  lengths: [4000, 6000] },
];

function renderLines(text: string) {
  return text.split('\n').map((line, index) => (
    <span key={`${line}-${index}`} className="block whitespace-nowrap">
      {line}
    </span>
  ));
}

export default function SuperWoodPage() {
  const t = useTranslations('superwood');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ─── Hero ─── */}
      <section
        className="relative py-32 px-6 text-center overflow-hidden bg-black"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/cdn/superwood_hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Soft vignette so title stays readable — no green tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-[clamp(2rem,9.5vw,4rem)] font-extrabold tracking-tight leading-[1.08] mb-4 text-balance">
            {renderLines(t('hero.title'))}
          </h1>
          <p className="text-[clamp(0.9rem,4.2vw,1.5rem)] leading-relaxed text-gray-300 mb-2 text-balance">
            {renderLines(t('hero.subtitle'))}
          </p>
          <div className="mt-6 h-1 w-24 mx-auto rounded-full bg-[#25c760]" />
        </div>
      </section>

      {/* ─── Section 1: Super Wood lumber line-up — dimensions only, no images ─── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t('blocks.heading')}
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('blocks.description')}
        </p>
        <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-[0.25em]">
          Lumber Line-up
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {lumberSizes.map((row) => (
            <div
              key={row.section}
              className="border border-[#25c760]/30 rounded-xl bg-[#0d1f12] hover:border-[#25c760] transition-colors duration-300 px-5 py-5 md:px-6 md:py-6 flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-500 tracking-[0.2em] uppercase">Section</span>
                <span className="text-2xl md:text-3xl font-extrabold text-white tabular-nums">
                  {row.section}
                  <span className="text-base text-gray-500 ml-1">mm</span>
                </span>
              </div>
              <div className="h-px bg-[#25c760]/15" />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-500 tracking-[0.2em] uppercase">Length</span>
                <div className="flex flex-wrap gap-2">
                  {row.lengths.map((L) => (
                    <span
                      key={L}
                      className="inline-flex items-baseline rounded-md border border-[#25c760]/30 bg-[#25c760]/10 text-[#25c760] font-semibold px-2.5 py-1 text-sm tabular-nums"
                    >
                      {L.toLocaleString()}
                      <span className="text-[10px] text-[#25c760]/70 ml-0.5">mm</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 2: 1/100 Scale SEF ─── */}
      <section className="bg-[#0a1a0f] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {t('scaleSef.heading')}
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            {t('scaleSef.description')}
          </p>

          <div className="border border-[#25c760]/30 rounded-2xl overflow-hidden bg-[#0d1f12]">
            {/* SEF Side-by-side — flex row stretches children to equal height on desktop */}
            <div className="flex flex-col md:flex-row md:items-stretch">
              {/* Left: Full SEF illustration */}
              <div
                className="w-full md:w-1/2 h-64 md:h-auto md:self-stretch bg-center bg-no-repeat bg-contain md:bg-cover"
                style={{
                  backgroundImage: 'url(/cdn/sef_building_v2.png)',
                  backgroundColor: '#0d1f12',
                }}
              />
              {/* Right: 1/100 Grid — its natural height drives the row height */}
              <div className="w-full md:w-1/2 p-4 md:p-5 bg-[#0a1a0f]">
                <div className="grid grid-cols-10 gap-0.5 md:gap-1">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-cover bg-center rounded-sm"
                      style={{
                        backgroundImage: 'url(/cdn/sef_building_v2.png)',
                        opacity: i < 2 ? 1 : 0.25,
                        border: i < 2 ? '1px solid #25c760' : '1px solid transparent',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 text-center">
            <p className="text-[#25c760] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 whitespace-nowrap">¥1,500,000</p>
            <p className="text-gray-400 text-sm mb-1">($10,000) / 1口</p>
            <p className="text-white/70 text-sm mb-8">100人で¥1.5億 ＝ 実物SEF1棟が完成します</p>

            <button className="px-8 py-2.5 md:py-3 rounded-full bg-[#25c760] text-black font-semibold text-sm md:text-base hover:bg-[#1da84e] transition-colors cursor-pointer">
              {t('scaleSef.buy')}
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Mother Vegetable AquaCulture Kit — 小 (small) + 大 (big) sub-sections ─── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Mother Vegetable アクアカルチャーキット
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          個人向けの「小」と、廃校などの大型施設向け「大」の2サイズをご用意。
        </p>

        {/* --- 小 (small) --- */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25c760]/20 border border-[#25c760]/40 text-[#25c760] text-xl font-bold">
              小
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              個人・小規模向け — すでにある池に養殖機能を付与
            </h3>
          </div>

          <div className="border border-[#25c760]/30 rounded-2xl overflow-hidden bg-[#0d1f12]">
            <div
              className="w-full h-64 md:h-96"
              style={{
                backgroundImage: 'url(/cdn/aquaculture_kit_clean.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="p-8 md:p-12">
              <div className="text-center mb-8 space-y-2">
                <p className="text-lg md:text-xl text-white/80">
                  すでにある池に養殖機能を付与します。
                </p>
                <p className="text-[#25c760] text-3xl sm:text-4xl md:text-5xl font-extrabold whitespace-nowrap">¥2,000,000</p>
                <p className="text-gray-400 text-sm">($13,400) — 設置・導入サポート込み</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1a2e1f] rounded-xl p-5">
                  <h4 className="font-bold text-[#25c760] mb-2">キット内容</h4>
                  <ul className="text-gray-300 text-sm space-y-1.5">
                    <li>• Mother Vegetable培養装置</li>
                    <li>• 水質浄化フィルターシステム</li>
                    <li>• 養殖用マザベジフィード</li>
                    <li>• CO₂吸収・酸素生成モジュール</li>
                    <li>• 水質モニタリングセンサー</li>
                    <li>• 設置マニュアル・リモートサポート</li>
                  </ul>
                </div>
                <div className="bg-[#1a2e1f] rounded-xl p-5">
                  <h4 className="font-bold text-[#25c760] mb-2">ここがスゴい</h4>
                  <ul className="text-gray-300 text-sm space-y-1.5">
                    <li>• 池・水槽があればどこでも導入可</li>
                    <li>• 空き家やビルの屋内でも養殖OK</li>
                    <li>• AIで遠隔チェック（ノッティンガムシステム）</li>
                    <li>• 全分析データをリアルタイム管理</li>
                    <li>• 餌と魚が自動で循環生産される</li>
                    <li>• 収穫した魚・餌の買取提案も可能</li>
                  </ul>
                </div>
                <div className="bg-[#1a2e1f] rounded-xl p-5">
                  <h4 className="font-bold text-[#25c760] mb-2">ランニングコスト</h4>
                  <ul className="text-gray-300 text-sm space-y-1.5">
                    <li>• メンテナンスフィー（月額）</li>
                    <li>• 魚の稚魚（補充時）</li>
                  </ul>
                  <p className="text-gray-400 text-xs mt-3">※ 詳細はお問い合わせください</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/about"
                  className="inline-block px-8 py-2.5 md:py-3 rounded-full bg-[#25c760] text-black font-semibold text-sm md:text-base hover:bg-[#1da84e] transition-colors no-underline"
                >
                  お問い合わせ・導入相談
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- 大 (big) --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/50 text-[#fbbf24] text-xl font-bold">
              大
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              廃校・大型施設向け — まるごと魚が育つ場所に
            </h3>
          </div>

          <div className="border border-[#fbbf24]/30 rounded-2xl overflow-hidden bg-[#0d1f12]">
            <div
              className="w-full h-56 md:h-72"
              style={{
                backgroundImage: 'url(/cdn/agriculture_kit_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl text-white/80 mb-2">
                  廃校など、大型施設まるごと魚が育つ場所に。
                </p>
                <p className="text-[#25c760] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 whitespace-nowrap">¥20,000,000</p>
                <p className="text-gray-400 text-sm">($134,000) — 設置・導入サポート込み</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1a2e1f] rounded-xl p-5">
                  <h4 className="font-bold text-[#25c760] mb-2">キット内容</h4>
                  <ul className="text-gray-300 text-sm space-y-1.5">
                    <li>• Mother Vegetable大型水槽 / 循環養殖システム</li>
                    <li>• LED光源システム（24h自動制御）</li>
                    <li>• 水質浄化・酸素供給モジュール</li>
                    <li>• CO₂吸収・酸素生成サブシステム</li>
                    <li>• 水温・水質自動管理センサー</li>
                    <li>• 出荷・加工マニュアル</li>
                  </ul>
                </div>
                <div className="bg-[#1a2e1f] rounded-xl p-5">
                  <h4 className="font-bold text-[#25c760] mb-2">導入効果</h4>
                  <ul className="text-gray-300 text-sm space-y-1.5">
                    <li>• 廃校などの大型施設で魚を養殖できる</li>
                    <li>• 年間を通じた安定供給</li>
                    <li>• 天候・赤潮・海洋汚染の影響なし</li>
                    <li>• CO₂を杉の700倍吸収（併設のMV栽培）</li>
                    <li>• 収穫した魚の販売で収益化</li>
                    <li>• 24/7 リモートモニタリング</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/about"
                  className="inline-block px-8 py-2.5 md:py-3 rounded-full bg-[#25c760] text-black font-semibold text-sm md:text-base hover:bg-[#1da84e] transition-colors no-underline"
                >
                  お問い合わせ・導入相談
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Mother Vegetable AgriCulture Kit — indoor farming ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Mother Vegetable アグリカルチャーキット
        </h2>
        <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          空き家や遊休施設を、Mother Vegetable を育てるスーパー農場に。
        </p>

        <div className="border border-[#25c760]/30 rounded-2xl overflow-hidden bg-[#0d1f12]">
          <div
            className="w-full h-56 md:h-72 bg-gradient-to-br from-[#0a2e14] via-[#0d3b1a] to-[#1a6b30] flex items-center justify-center"
            role="img"
            aria-label="Mother Vegetable AgriCulture Kit"
          >
            <span className="text-white/80 text-xl md:text-3xl font-bold tracking-wider">
              AGRICULTURE KIT
            </span>
          </div>
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-[#25c760] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 whitespace-nowrap">¥1,000,000</p>
              <p className="text-gray-400 text-sm">($6,700) — 設置・導入サポート込み</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1a2e1f] rounded-xl p-5">
                <h4 className="font-bold text-[#25c760] mb-2">キット内容</h4>
                <ul className="text-gray-300 text-sm space-y-1.5">
                  <li>• Mother Vegetable 室内栽培装置</li>
                  <li>• LED光源システム（24h自動制御）</li>
                  <li>• 培養液循環システム</li>
                  <li>• CO₂吸収・酸素生成モジュール</li>
                  <li>• 温度・湿度自動管理センサー</li>
                  <li>• 収穫・加工マニュアル</li>
                </ul>
              </div>
              <div className="bg-[#1a2e1f] rounded-xl p-5">
                <h4 className="font-bold text-[#25c760] mb-2">導入効果</h4>
                <ul className="text-gray-300 text-sm space-y-1.5">
                  <li>• 室内で Mother Vegetable を栽培</li>
                  <li>• 年間を通じた安定生産</li>
                  <li>• 天候・害虫の影響なし</li>
                  <li>• CO₂を杉の700倍吸収</li>
                  <li>• 収穫物の販売で収益化</li>
                  <li>• 24/7 リモートモニタリング</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/about"
                className="inline-block px-8 py-2.5 md:py-3 rounded-full bg-[#25c760] text-black font-semibold text-sm md:text-base hover:bg-[#1da84e] transition-colors no-underline"
              >
                お問い合わせ・導入相談
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
