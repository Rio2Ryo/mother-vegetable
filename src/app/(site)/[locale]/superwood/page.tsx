'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const blocks = [
  { key: 'straight', price: '¥500', img: 'https://images.unsplash.com/photo-1610505466182-6ca09516b300?w=400&h=400&fit=crop' },
  { key: 'corner', price: '¥800', img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&h=400&fit=crop' },
  { key: 'tJoint', price: '¥1,000', img: 'https://images.unsplash.com/photo-1594844532765-baf0bfc56797?w=400&h=400&fit=crop' },
  { key: 'flatPanel', price: '¥1,500', img: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=400&h=400&fit=crop' },
  { key: 'roofPanel', price: '¥2,000', img: 'https://images.unsplash.com/photo-1622993288687-a9cf4f441354?w=400&h=400&fit=crop' },
  { key: 'doorWindow', price: '¥3,000', img: 'https://images.unsplash.com/photo-1555041469-a586c1b0e114?w=400&h=400&fit=crop' },
] as const;

const SEF_PROGRESS = 23;
const SEF_GOAL = 100;

export default function SuperWoodPage() {
  const t = useTranslations('superwood');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ─── Hero ─── */}
      <section
        className="relative py-32 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a2e14 0%, #0d3b1a 40%, #134d23 70%, #1a6b30 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/cdn/superwood_hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">{t('hero.subtitle')}</p>
          <div className="mt-6 h-1 w-24 mx-auto rounded-full bg-[#25c760]" />
        </div>
      </section>

      {/* ─── Section 1: Super Wood Blocks ─── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t('blocks.heading')}
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto leading-relaxed">
          {t('blocks.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blocks.map((b) => (
            <div
              key={b.key}
              className="border border-[#25c760]/30 rounded-2xl p-6 bg-[#0d1f12] hover:border-[#25c760] transition-colors duration-300 flex flex-col"
            >
              {/* Block product image */}
              <div
                className="w-full aspect-square rounded-xl bg-[#1a2e1f] mb-5 overflow-hidden"
                style={{
                  backgroundImage: `url(${b.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <h3 className="text-lg font-semibold mb-1">{t(`blocks.items.${b.key}.name`)}</h3>
              <p className="text-[#25c760] text-2xl font-bold mb-4">{b.price}</p>
              <button className="mt-auto w-full py-3 rounded-xl bg-[#25c760] text-black font-bold text-sm hover:bg-[#1fb350] transition-colors duration-200 cursor-pointer">
                {t('blocks.addToCart')}
              </button>
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
            {/* SEF Side-by-side */}
            <div className="flex flex-col md:flex-row">
              {/* Left: Full SEF */}
              <div className="w-full md:w-1/2 h-64 md:h-80" style={{
                backgroundImage: 'url(/cdn/sef_greenhouse.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              {/* Right: 1/100 Grid */}
              <div className="w-full md:w-1/2 p-4 bg-[#0a1a0f]">
                <div className="grid grid-cols-10 gap-0.5">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-cover bg-center rounded-sm"
                      style={{
                        backgroundImage: 'url(/cdn/sef_greenhouse.png)',
                        opacity: i < 2 ? 1 : 0.25,
                        border: i < 2 ? '1px solid #25c760' : '1px solid transparent',
                      }}
                    />
                  ))}
                </div>
                <p className="text-center text-gray-400 text-xs mt-2">2 / 100 購入済み</p>
              </div>
            </div>
            <div className="p-8 md:p-12 text-center">
            <p className="text-[#25c760] text-5xl font-extrabold mb-2">¥100,000</p>
            <p className="text-gray-400 text-sm mb-8">($670)</p>

            {/* Progress */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{t('scaleSef.progress', { current: SEF_PROGRESS, goal: SEF_GOAL })}</span>
                <span className="text-[#25c760] font-semibold">{Math.round((SEF_PROGRESS / SEF_GOAL) * 100)}%</span>
              </div>
              <div className="w-full h-4 rounded-full bg-[#1a2e1f] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#25c760] to-[#1fb350] transition-all duration-700"
                  style={{ width: `${(SEF_PROGRESS / SEF_GOAL) * 100}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-3">
                {t('scaleSef.remaining', { count: SEF_GOAL - SEF_PROGRESS })}
              </p>
            </div>

            <button className="px-10 py-4 rounded-xl bg-[#25c760] text-black font-bold text-lg hover:bg-[#1fb350] transition-colors duration-200 cursor-pointer">
              {t('scaleSef.buy')}
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Aquaculture Kit ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          アクアカルチャーキット
        </h2>
        <p className="text-gray-400 text-center mb-4 max-w-2xl mx-auto">
          あなたの池を「スーパー池」に変える — Mother Vegetable養殖システム
        </p>
        <p className="text-xl md:text-2xl text-center text-white/90 font-medium mb-10 max-w-2xl mx-auto">
          池や水槽さえあればOK。<br className="md:hidden" />自分のプロテイン、自分で作りませんか？
        </p>

        <div className="border border-[#25c760]/30 rounded-2xl overflow-hidden bg-[#0d1f12]">
          <div
            className="w-full h-56 md:h-72"
            style={{
              backgroundImage: 'url(/cdn/aquaculture_kit_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="p-8 md:p-12">
            {/* Catch copy */}
            <div className="text-center mb-8 space-y-2">
              <p className="text-lg md:text-xl text-white/80">
                どこでも養殖キット — 空き家でも、ビルの中でも。
              </p>
              <p className="text-[#25c760] text-5xl font-extrabold">¥1,000,000</p>
              <p className="text-gray-400 text-sm">($6,700) — 設置・導入サポート込み</p>
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
                className="inline-block px-10 py-4 rounded-xl bg-[#25c760] text-black font-bold text-lg hover:bg-[#1fb350] transition-colors duration-200 no-underline"
              >
                お問い合わせ・導入相談
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Agriculture Kit ─── */}
      <section className="bg-[#0a1a0f] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            アグリカルチャーキット
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            あなたの農地を「スーパーファーム」に変える — Mother Vegetable栽培システム
          </p>

          <div className="border border-[#25c760]/30 rounded-2xl overflow-hidden bg-[#0d1f12]">
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
                <p className="text-[#25c760] text-5xl font-extrabold mb-1">¥1,000,000</p>
                <p className="text-gray-400 text-sm">($6,700) — 設置・導入サポート込み</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1a2e1f] rounded-xl p-5">
                  <h4 className="font-bold text-[#25c760] mb-2">キット内容</h4>
                  <ul className="text-gray-300 text-sm space-y-1.5">
                    <li>• Mother Vegetable室内栽培装置</li>
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
                    <li>• 室内でMother Vegetableを栽培</li>
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
                  className="inline-block px-10 py-4 rounded-xl bg-[#25c760] text-black font-bold text-lg hover:bg-[#1fb350] transition-colors duration-200 no-underline"
                >
                  お問い合わせ・導入相談
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
