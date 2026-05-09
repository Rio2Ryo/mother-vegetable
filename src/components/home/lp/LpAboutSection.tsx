import Image from 'next/image';
import { getLpLocale, lpCopy, type LpLocale } from './lpCopy';

export default function LpAboutSection({ locale = 'ja' }: { locale?: LpLocale }) {
  const copy = lpCopy[getLpLocale(locale)];

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 18% 14%, rgba(37,199,96,0.13), transparent 34%), radial-gradient(circle at 78% 52%, rgba(37,199,96,0.10), transparent 28%), linear-gradient(180deg, #020705 0%, #000 100%)',
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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-14 items-center">
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

            <div className="space-y-5 md:space-y-6 font-bold text-left" style={{ color: '#fff', fontSize: 'clamp(16px, 1.7vw, 22px)', lineHeight: 1.75, textAlign: 'left' }}>
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

          <div className="relative flex justify-center lg:justify-end items-end min-h-[300px] lg:min-h-[520px]">
            <div
              className="absolute left-1/2 lg:left-auto lg:right-2 bottom-[7%] -translate-x-1/2 lg:translate-x-0 rounded-full pointer-events-none"
              style={{
                width: 'min(330px, 82vw)',
                height: 'min(330px, 82vw)',
                background:
                  'radial-gradient(circle, rgba(37,199,96,0.24), rgba(60,128,99,0.10) 48%, transparent 72%)',
                filter: 'blur(2px)',
                opacity: 0.76,
              }}
            />
            <Image
              src="/cdn/mv-search-character.png"
              alt="Mother Vegetable character"
              width={340}
              height={415}
              className="relative z-10 w-full max-w-[230px] md:max-w-[300px] lg:max-w-[340px] h-auto object-contain"
              style={{
                filter:
                  'drop-shadow(0 22px 32px rgba(0,0,0,0.54)) drop-shadow(0 0 22px rgba(37,199,96,0.24))',
              }}
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
