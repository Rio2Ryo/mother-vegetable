import { getLpLocale, lpCopy, type LpLocale } from './lpCopy';

export default function LpAboutSection({ locale = 'ja' }: { locale?: LpLocale }) {
  const copy = lpCopy[getLpLocale(locale)];

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 18% 14%, rgba(37,199,96,0.13), transparent 34%), linear-gradient(180deg, #020705 0%, #000 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,199,96,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(37,199,96,0.28) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-[980px]">
          <h2
            className="font-black leading-tight tracking-[0.02em]"
            style={{
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(40px, 7vw, 82px)',
              color: '#25C760',
              lineHeight: 1.14,
              textShadow: '0 0 20px rgba(37,199,96,0.28)',
            }}
          >
            {copy.aboutTitle.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>

          <div
            className="mt-5 mb-7 rounded-full"
            style={{
              width: 'min(330px, 48vw)',
              height: 3,
              background: 'linear-gradient(90deg, #25C760, rgba(37,199,96,0.55), transparent)',
              boxShadow: '0 0 18px rgba(37,199,96,0.46)',
            }}
          />

          <div className="space-y-5 md:space-y-6 font-bold" style={{ color: '#fff', fontSize: 'clamp(16px, 1.7vw, 22px)', lineHeight: 1.75 }}>
            <p>
              {copy.aboutLead.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < copy.aboutLead.length - 1 && <><br /><br className="hidden md:block" /></>}
                </span>
              ))}
            </p>
            <p>
              {copy.aboutBody.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < copy.aboutBody.length - 1 && <><br /><br className="hidden md:block" /></>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
