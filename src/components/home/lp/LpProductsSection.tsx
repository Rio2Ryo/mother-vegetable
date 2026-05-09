import { Link } from '@/i18n/navigation';
import { getLpLocale, lpCopy, type LpLocale } from './lpCopy';

export default function LpProductsSection({ locale = 'ja' }: { locale?: LpLocale }) {
  const lpLocale = getLpLocale(locale);
  const copy = lpCopy[lpLocale];
  const mobileProductsTitle = lpLocale === 'ja'
    ? ['Mother Vegetableから', '生まれた2つの', '「地球最古の生命の力」が', '全てのアイテムに']
    : copy.productsTitle;
  const mobileAchieveLead = lpLocale === 'ja'
    ? ['高たんぱく質', '＋全48種類の天然栄養']
    : [copy.achieveLead];
  const mobileConfidenceLead = lpLocale === 'ja'
    ? ['純度97%の天然シリカで、', 'やさしく整える。']
    : [copy.confidenceLead];
  const mobileConfidenceBody = lpLocale === 'ja'
    ? [
        'Mother Vegetableから生まれた白いパウダー「Confidence」。育つ過程で、純度97%の非晶質シリカを生み出します。',
        '医薬部外品原料規格もクリアしたシリカは肌や髪、愛するペットにも使用可能で、化粧水やシャンプーに混ぜて1ランク上のアイテムに。',
      ]
    : copy.confidenceBody;
  const mobileConfidenceCta = lpLocale === 'ja'
    ? ['Confidenceとの', 'コラボ商品はこちら']
    : [copy.confidenceCta];

  return (
    <section className="bg-black py-32">
      <div className="w-full max-w-[1180px] mx-auto px-5">
        <div className="max-w-[980px] mx-auto mb-16 text-center">
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
            <span className="md:hidden">
              {mobileProductsTitle.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </span>
            <span className="hidden md:block">
              <span className="block">{copy.productsTitle[0]}</span>
              <span className="block">
                {copy.productsTitle[1]}<span className="block md:inline">{copy.productsTitle[2]}</span>
              </span>
            </span>
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
        </div>

        <div className="flex flex-col gap-10">
          <article
            className="relative w-full p-12 overflow-hidden"
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
            <h3 className="font-extrabold mb-2" style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(38px, 4.2vw, 58px)', color: '#25C760', lineHeight: 1.18 }}>
              Achieve
            </h3>
            <strong className="block font-extrabold mb-4" style={{ color: '#fff', fontSize: 'clamp(19px, 2vw, 28px)', lineHeight: 1.45 }}>
              <span className="md:hidden">
                {mobileAchieveLead.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </span>
              <span className="hidden md:inline">{copy.achieveLead}</span>
            </strong>
            <p className="max-w-[620px]" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 2 }}>
              {copy.achieveBody.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < copy.achieveBody.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="mt-7 flex">
              <Link
                href="/product/achieve"
                className="inline-flex items-center justify-center w-[min(100%,290px)] md:w-auto px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#25C760', color: '#001d0c', border: '1px solid #25C760', boxShadow: '0 0 20px rgba(37,199,96,0.42)', fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {copy.achieveCta}
              </Link>
            </div>
          </article>

          <article
            className="relative w-full p-12 overflow-hidden text-left"
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
            <h3 className="font-extrabold mb-2" style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(38px, 4.2vw, 58px)', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.34)', lineHeight: 1.18 }}>
              Confidence
            </h3>
            <strong className="block font-extrabold mb-4" style={{ color: 'rgba(255,255,255,0.90)', fontSize: 'clamp(19px, 2vw, 28px)', lineHeight: 1.45 }}>
              <span className="md:hidden">
                {mobileConfidenceLead.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </span>
              <span className="hidden md:inline">{copy.confidenceLead}</span>
            </strong>
            <p style={{ color: 'rgba(255,255,255,0.90)', fontSize: 16, lineHeight: 2, maxWidth: 620 }}>
              <span className="md:hidden">
                {mobileConfidenceBody.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < mobileConfidenceBody.length - 1 && <br />}
                  </span>
                ))}
              </span>
              <span className="hidden md:inline">
                {copy.confidenceBody.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < copy.confidenceBody.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </p>
            <div className="mt-7 flex justify-start">
              <Link
                href="/product/confidence"
                className="inline-flex items-center justify-center w-[min(100%,290px)] md:w-auto px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#fff', color: '#001d0c', border: '1px solid #fff', fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                <span className="md:hidden">
                  {mobileConfidenceCta.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </span>
                <span className="hidden md:inline">{copy.confidenceCta}</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
