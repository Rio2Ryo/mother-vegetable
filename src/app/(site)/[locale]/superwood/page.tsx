'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const blocks = [
  { key: 'straight', price: '¥500' },
  { key: 'corner', price: '¥800' },
  { key: 'tJoint', price: '¥1,000' },
  { key: 'flatPanel', price: '¥1,500' },
  { key: 'roofPanel', price: '¥2,000' },
  { key: 'doorWindow', price: '¥3,000' },
] as const;

const SEF_PROGRESS = 23;
const SEF_GOAL = 100;

export default function SuperWoodPage() {
  const t = useTranslations('superwood');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ─── Hero ─── */}
      <section
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a2e14 0%, #0d3b1a 40%, #134d23 70%, #1a6b30 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #25c760 0%, transparent 60%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">{t('hero.subtitle')}</p>
          <div className="mt-6 h-1 w-24 mx-auto rounded-full bg-[#25c760]" />
        </div>
      </section>

      {/* ─── Section 1: Super Wood Blocks ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t('blocks.heading')}
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          {t('blocks.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <div
              key={b.key}
              className="border border-[#25c760]/30 rounded-2xl p-6 bg-[#0d1f12] hover:border-[#25c760] transition-colors duration-300 flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="w-full aspect-square rounded-xl bg-[#1a2e1f] mb-5 flex items-center justify-center">
                <svg className="w-16 h-16 text-[#25c760]/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25" />
                </svg>
              </div>
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
      <section className="bg-[#0a1a0f] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {t('scaleSef.heading')}
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            {t('scaleSef.description')}
          </p>

          <div className="border border-[#25c760]/30 rounded-2xl p-8 md:p-12 bg-[#0d1f12] text-center">
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
      </section>

      {/* ─── Section 3: Full SEF ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          {t('fullSef.heading')}
        </h2>
        <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          {t('fullSef.subtitle')}
        </p>

        <div className="border border-[#25c760]/30 rounded-2xl p-8 md:p-12 bg-[#0d1f12]">
          <div className="text-center mb-8">
            <p className="text-[#25c760] text-5xl font-extrabold mb-1">$1,000,000</p>
            <p className="text-gray-400 text-sm">{t('fullSef.priceNote')}</p>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            <p>{t('fullSef.desc1')}</p>
            <p>{t('fullSef.desc2')}</p>
            <p>{t('fullSef.desc3')}</p>
          </div>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-block px-10 py-4 rounded-xl border-2 border-[#25c760] text-[#25c760] font-bold text-lg hover:bg-[#25c760] hover:text-black transition-colors duration-200 no-underline"
            >
              {t('fullSef.contact')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
