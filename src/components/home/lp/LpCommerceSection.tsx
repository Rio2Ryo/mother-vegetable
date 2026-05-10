'use client';

import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { getLpLocale, lpCopy, type LpLocale } from './lpCopy';

export default function LpCommerceSection({ locale = 'ja' }: { locale?: LpLocale }) {
  const lpLocale = getLpLocale(locale);
  const copy = lpCopy[lpLocale];
  const router = useRouter();
  const [activeOption, setActiveOption] = useState<string>(copy.searchOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setActiveOption(copy.searchOptions[0]);
  }, [copy.searchOptions]);

  const getSearchFocus = () => {
    const index = (Array.from(copy.searchOptions) as string[]).indexOf(activeOption);
    if (index === 1) return 'proposer';
    if (index === 2) return 'region';
    return 'story';
  };

  const getSearchPlaceholder = () => {
    const focus = getSearchFocus();
    if (lpLocale === 'ja') {
      if (focus === 'proposer') return '例：発案者名で探す';
      if (focus === 'region') return '例：静岡県 / 伊豆で探す';
      return '例：無添加 / 栄養 / 美容で探す';
    }
    if (lpLocale === 'zh') {
      if (focus === 'proposer') return '按提案者搜索';
      if (focus === 'region') return '按地区搜索';
      return '按故事或关键词搜索';
    }
    if (focus === 'proposer') return 'Search by creator';
    if (focus === 'region') return 'Search by place';
    return 'Search by story or keyword';
  };

  const handleSearch = () => {
    const params = new URLSearchParams({ focus: getSearchFocus() });
    const trimmed = searchTerm.trim();
    if (trimmed) params.set('search', trimmed);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <section className="bg-black py-32">
      <div className="w-full max-w-[1180px] mx-auto px-5">
        <div className="max-w-[1040px] mx-auto mb-16 text-center">
          <div className="mb-3 font-semibold uppercase tracking-widest" style={{ color: '#25C760', fontSize: 13, letterSpacing: '0.10em' }}>
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
            {copy.searchTitle.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>
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
            style={{ color: '#fff', fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(18px, 2vw, 28px)', lineHeight: 1.45 }}
          >
            {copy.searchSubtitle}
          </p>
        </div>

        <div className="max-w-[900px] mx-auto text-center">
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
            aria-label="MV Product search panel"
          >
            <div className="absolute pointer-events-none" style={{ inset: 14, border: '1px solid rgba(37,199,96,0.20)', borderRadius: 6 }} />
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: 0,
                width: '72%',
                height: 1,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), #25C760, transparent)',
                boxShadow: '0 0 18px rgba(37,199,96,0.55)',
              }}
            />

            <div className="relative grid gap-3 mb-5 sm:grid-cols-3 grid-cols-1" aria-label="Search type options">
              {copy.searchOptions.map((option) => {
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
                    aria-pressed={isActive}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-[5px]"
                      style={{
                        border: '1px solid #25C760',
                        background: isActive ? '#25C760' : 'rgba(37,199,96,0.08)',
                        boxShadow: isActive ? '0 0 12px rgba(37,199,96,0.52)' : '0 0 10px rgba(37,199,96,0.22)',
                      }}
                    />
                    {option}
                  </button>
                );
              })}
            </div>

            <form
              className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 min-h-[76px] px-4 sm:px-6 py-3 sm:py-2"
              style={{
                borderRadius: 28,
                border: '1px solid rgba(37,199,96,0.78)',
                background: 'rgba(0,0,0,0.78)',
                boxShadow: 'inset 0 0 24px rgba(37,199,96,0.10), 0 0 28px rgba(37,199,96,0.14)',
              }}
              role="search"
              aria-label="MV Product search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <span className="hidden sm:block flex-shrink-0 relative w-8 h-8 rounded-full" style={{ border: '2px solid #25C760', boxShadow: '0 0 14px rgba(37,199,96,0.32)' }} aria-hidden="true" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={getSearchPlaceholder()}
                className="hidden sm:block flex-1 min-w-0 bg-transparent font-extrabold text-left outline-none placeholder:text-white/45"
                style={{ color: 'rgba(255,255,255,0.86)', letterSpacing: '0.01em', fontFamily: "'Noto Sans JP', sans-serif" }}
                aria-label={getSearchPlaceholder()}
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center justify-center min-w-[132px] min-h-[54px] px-6 rounded-full font-black transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: '#25C760', color: '#001d0c', fontFamily: "'Inter', 'Noto Sans JP', sans-serif", boxShadow: '0 0 20px rgba(37,199,96,0.42)' }}
              >
                Search
              </button>
            </form>

            <p className="relative mt-5 text-center font-extrabold" style={{ color: '#fff', lineHeight: 1.8 }}>
              {copy.searchNote}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid #25C760', background: 'transparent', color: '#25C760', fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {copy.searchCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
