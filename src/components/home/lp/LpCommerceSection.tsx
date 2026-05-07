'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';

const SEARCH_OPTIONS = ['想いで探す', '出身地でさがす', '発案者の職業で探す'] as const;
type SearchOption = (typeof SEARCH_OPTIONS)[number];

export default function LpCommerceSection() {
  const [activeOption, setActiveOption] = useState<SearchOption>('想いで探す');

  return (
    <section className="bg-black py-32">
      <div className="w-full max-w-[1180px] mx-auto px-5">
        {/* Section head */}
        <div className="max-w-[1040px] mx-auto mb-16 text-center">
          <div
            className="mb-3 font-semibold uppercase tracking-widest"
            style={{ color: '#25C760', fontSize: 13, letterSpacing: '0.10em' }}
          >
            Searching System
          </div>
          <h2
            className="font-bold"
            style={{
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(30px, 3.8vw, 52px)',
              color: '#25C760',
              lineHeight: 1.18,
              textShadow: '0 0 18px rgba(37,199,96,0.30)',
            }}
          >
            商品は、物語から検索しよう
          </h2>
          {/* Underline */}
          <div
            className="mx-auto mt-5 rounded-full"
            style={{
              width: 'min(280px, 62%)',
              height: 3,
              background: 'linear-gradient(90deg, transparent, #25C760, #3C8063, transparent)',
              boxShadow: '0 0 20px rgba(37,199,96,0.42)',
            }}
          />
          <p
            className="mt-4 font-extrabold"
            style={{
              color: '#fff',
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.45,
            }}
          >
            探すこと自体が、楽しくなるECへ
          </p>
        </div>

        {/* Commerce copy + search panel */}
        <div className="max-w-[900px] mx-auto text-center">
          <p
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 16,
              lineHeight: 2.05,
              maxWidth: 760,
              margin: '0 auto',
            }}
          >
            MVプロダクトは、商品カテゴリーや、5段階レビューなどで探すものではありません。
            <br />
            誰のアイデアか。どこの地域のものか。どんな想いが込められているのか。
            <br />
            その背景から商品と出会える、新しいサーチングシステムです。
            <br />
            広告やSNSなどで誘導されるのではなく、自分の感性で出会うECへ。
          </p>

          {/* Search panel */}
          <div
            className="relative mt-9 mx-auto p-10 overflow-hidden"
            style={{
              maxWidth: 860,
              borderRadius: 14,
              border: '1px solid rgba(37,199,96,0.84)',
              background:
                'radial-gradient(circle at 50% 0%, rgba(37,199,96,0.18), transparent 42%), linear-gradient(180deg, rgba(37,199,96,0.08), rgba(0,0,0,0.98))',
              boxShadow:
                '0 0 0 1px rgba(37,199,96,0.14), 0 28px 80px rgba(0,0,0,0.42), 0 0 44px rgba(37,199,96,0.16)',
            }}
            aria-label="MV Product検索導線"
          >
            {/* Inner border accent */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: 14,
                border: '1px solid rgba(37,199,96,0.20)',
                borderRadius: 6,
              }}
            />
            {/* Top highlight line */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: 0,
                width: '72%',
                height: 1,
                transform: 'translateX(-50%)',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), #25C760, transparent)',
                boxShadow: '0 0 18px rgba(37,199,96,0.55)',
              }}
            />

            <p
              className="relative font-black text-center mb-6"
              style={{
                color: '#fff',
                fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                fontSize: 'clamp(22px, 2.8vw, 38px)',
                lineHeight: 1.35,
                textShadow: '0 0 22px rgba(37,199,96,0.28)',
              }}
            >
              早速検索してみよう
            </p>

            {/* Search options */}
            <div
              className="relative grid gap-3 mb-5 sm:grid-cols-3 grid-cols-1"
              aria-label="検索方法の選択肢"
            >
              {SEARCH_OPTIONS.map((option) => {
                const isActive = option === activeOption;
                return (
                  <button
                    key={option}
                    onClick={() => setActiveOption(option)}
                    className="flex items-center justify-center gap-2 min-h-[48px] px-4 py-2 rounded-full font-extrabold transition-all duration-200"
                    style={{
                      border: `1px solid ${isActive ? '#25C760' : 'rgba(37,199,96,0.62)'}`,
                      background: isActive ? 'rgba(37,199,96,0.14)' : 'rgba(0,0,0,0.62)',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.86)',
                      boxShadow: isActive
                        ? 'inset 0 0 20px rgba(37,199,96,0.10), 0 0 24px rgba(37,199,96,0.14)'
                        : 'inset 0 0 18px rgba(37,199,96,0.07)',
                      lineHeight: 1.35,
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontSize: 14,
                    }}
                    aria-current={isActive}
                  >
                    {/* Checkbox indicator */}
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-[5px]"
                      style={{
                        border: '1px solid #25C760',
                        background: isActive ? '#25C760' : 'rgba(37,199,96,0.08)',
                        boxShadow: isActive
                          ? '0 0 12px rgba(37,199,96,0.52)'
                          : '0 0 10px rgba(37,199,96,0.22)',
                      }}
                    />
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Search shell (mock) */}
            <div
              className="relative flex items-center gap-3 min-h-[76px] px-6 py-2"
              style={{
                borderRadius: 999,
                border: '1px solid rgba(37,199,96,0.78)',
                background: 'rgba(0,0,0,0.78)',
                boxShadow:
                  'inset 0 0 24px rgba(37,199,96,0.10), 0 0 28px rgba(37,199,96,0.14)',
              }}
              role="search"
              aria-label="検索フォームのイメージ"
            >
              {/* Search icon */}
              <span
                className="flex-shrink-0 relative w-8 h-8 rounded-full"
                style={{
                  border: '2px solid #25C760',
                  boxShadow: '0 0 14px rgba(37,199,96,0.32)',
                }}
                aria-hidden="true"
              />
              <span
                className="flex-1 font-extrabold text-left"
                style={{
                  color: 'rgba(255,255,255,0.86)',
                  letterSpacing: '0.01em',
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}
              >
                {activeOption}
              </span>
              <span
                className="flex-shrink-0 inline-flex items-center justify-center min-w-[132px] min-h-[54px] px-6 rounded-full font-black"
                style={{
                  background: '#25C760',
                  color: '#001d0c',
                  fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                  boxShadow: '0 0 20px rgba(37,199,96,0.42)',
                }}
              >
                Search
              </span>
            </div>

            <p
              className="relative mt-5 text-center font-extrabold"
              style={{ color: '#fff', lineHeight: 1.8 }}
            >
              探すこと自体が楽しくなる、Mother Vegetableの検索体験です。
            </p>
          </div>

          {/* CTA link */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid #25C760',
                background: 'transparent',
                color: '#25C760',
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              商品一覧で検索体験を試す →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
