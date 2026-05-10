import { getLpLocale, lpCopy, type LpLocale } from './lpCopy';

export default function LpStorySection({ locale = 'ja' }: { locale?: LpLocale }) {
  const lpLocale = getLpLocale(locale);
  const copy = lpCopy[lpLocale];
  const mobileStoryDiagramTitle = lpLocale === 'ja'
    ? ['MV Productをつくる', '3つの力']
    : [copy.storyDiagramTitle];

  return (
    <section
      className="relative py-28 w-full overflow-hidden"
      style={{ background: '#000', borderTop: '1px solid #25C760', borderBottom: '1px solid #25C760', margin: '30px 0' }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20%',
          background:
            'radial-gradient(circle at 50% 8%, rgba(37,199,96,0.22), transparent 34%), radial-gradient(circle at 12% 78%, rgba(60,128,99,0.18), transparent 32%), radial-gradient(circle at 88% 68%, rgba(37,199,96,0.14), transparent 30%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5">
        <div className="max-w-[900px] mx-auto mb-14 text-center">
          <h2
            className="font-black"
            style={{
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(38px, 5.8vw, 72px)',
              color: '#25C760',
              lineHeight: 1.08,
              letterSpacing: '0.01em',
              textShadow: '0 0 20px rgba(37,199,96,0.42), 0 0 42px rgba(37,199,96,0.18)',
            }}
          >
            MV Product
          </h2>
          <div
            className="mx-auto mt-6 rounded-full"
            style={{
              width: 'min(360px, 70%)',
              height: 3,
              background: 'linear-gradient(90deg, transparent, #25C760, #3C8063, transparent)',
              boxShadow: '0 0 20px rgba(37,199,96,0.42)',
            }}
          />
          <p
            className="mx-auto mt-7 font-extrabold"
            style={{
              maxWidth: 760,
              color: '#fff',
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(17px, 4.6vw, 40px)',
              lineHeight: 1.42,
            }}
          >
            {copy.storySubtitle.map((line, index) => (
              <span key={line}>
                {line}
                {index < copy.storySubtitle.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div
          className="mx-auto max-w-[1080px] p-8"
          style={{ border: '1px solid #25C760', borderRadius: 14, background: 'linear-gradient(135deg, rgba(37,199,96,0.09), rgba(0,0,0,0.94))' }}
          aria-label={copy.storyDiagramTitle}
        >
          <h3
            className="text-center mb-7 font-extrabold"
            style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif", color: '#fff', fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.35 }}
          >
            <span className="md:hidden">
              {mobileStoryDiagramTitle.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </span>
            <span className="hidden md:inline">{copy.storyDiagramTitle}</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
            <ForceCard number="01" title={copy.force1Title} description={copy.force1Description} />
            <PlusSign />
            <ForceCard
              number="02"
              title={
                <>
                  {copy.force2Title[0]}
                  <br />
                  {copy.force2Title[1]}
                </>
              }
              description={copy.force2Description}
              mobileDescriptionLines={lpLocale === 'ja' ? ['土地に根づいた素材、', '文化、技術、物語。'] : undefined}
            />
            <PlusSign />
            <ForceCard
              number="03"
              title={copy.force3Title}
              description={copy.force3Description}
              mobileDescriptionLines={lpLocale === 'ja' ? ['地球最古の生命の力が', '持つ、', '高栄養・浄化・再生の力。'] : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ForceCard({
  number,
  title,
  description,
  mobileDescriptionLines,
}: {
  number: string;
  title: React.ReactNode;
  description: string;
  mobileDescriptionLines?: string[];
}) {
  return (
    <article
      className="relative p-5 sm:p-7 overflow-hidden"
      style={{ border: '1px solid rgba(37,199,96,0.42)', borderRadius: 14, background: '#000', minHeight: 250 }}
    >
      <div
        className="absolute pointer-events-none"
        style={{ right: -72, top: -80, width: 190, height: 190, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,199,96,0.22), transparent 70%)' }}
      />
      <span
        className="block mb-4 font-black tracking-widest"
        style={{ color: '#25C760', fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 13, letterSpacing: '0.12em' }}
      >
        {number}
      </span>
      <h3
        className="relative font-extrabold"
        style={{ color: '#fff', fontFamily: "'Inter', 'Noto Sans JP', sans-serif", fontSize: 'clamp(21px, 2.2vw, 28px)', lineHeight: 1.32, margin: 0 }}
      >
        {title}
      </h3>
      <p
        className="relative mt-4"
        style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: 'clamp(14px, 3.65vw, 15px)',
          lineHeight: 1.9,
          margin: 0,
          wordBreak: 'keep-all',
          overflowWrap: 'normal',
        }}
      >
        {mobileDescriptionLines ? (
          <>
            <span className="md:hidden">
              {mobileDescriptionLines.map((line) => (
                <span key={line} className="block whitespace-nowrap">{line}</span>
              ))}
            </span>
            <span className="hidden md:inline">{description}</span>
          </>
        ) : (
          description
        )}
      </p>
    </article>
  );
}

function PlusSign() {
  return (
    <div
      className="flex items-center justify-center font-black"
      style={{
        color: '#25C760',
        fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
        fontSize: 'clamp(32px, 4vw, 56px)',
        lineHeight: 1,
        textShadow: '0 0 20px rgba(37,199,96,0.42)',
        minHeight: 34,
      }}
      aria-hidden="true"
    >
      ＋
    </div>
  );
}
