import Image from 'next/image';
import { getLpLocale, lpCopy, type LpLocale } from './lpCopy';

export default function LpAboutSection({ locale = 'ja' }: { locale?: LpLocale }) {
  const copy = lpCopy[getLpLocale(locale)];

  return (
    <section className="bg-black py-32">
      <div className="w-full max-w-[1180px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                fontSize: 'clamp(46px, 6.4vw, 82px)',
                color: '#25C760',
                textShadow: '0 0 18px rgba(37,199,96,0.30)',
                lineHeight: 1.05,
              }}
            >
              {copy.aboutTitle.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h2>

            <div
              className="mt-5 rounded-full"
              style={{
                width: 'min(280px, 62%)',
                height: 3,
                background: 'linear-gradient(90deg, #25C760, #3C8063, transparent)',
                boxShadow: '0 0 20px rgba(37,199,96,0.42)',
              }}
            />

            <p className="mt-7" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 2.05 }}>
              {copy.aboutLead.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < copy.aboutLead.length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="mt-5" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 2.05 }}>
              {copy.aboutBody.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < copy.aboutBody.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div className="relative flex justify-center items-end min-h-[300px]">
            <div
              className="absolute left-1/2 bottom-[8%] -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                width: 'min(310px, 84%)',
                height: 'min(310px, 84%)',
                background:
                  'radial-gradient(circle, rgba(37,199,96,0.24), rgba(60,128,99,0.10) 48%, transparent 72%)',
                filter: 'blur(2px)',
                opacity: 0.72,
              }}
            />
            <Image
              src="/cdn/mv-search-character.png"
              alt="Mother Vegetable character"
              width={300}
              height={366}
              className="relative z-10 w-full max-w-[300px] h-auto object-contain"
              style={{
                filter:
                  'drop-shadow(0 22px 32px rgba(0,0,0,0.54)) drop-shadow(0 0 20px rgba(37,199,96,0.20))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
