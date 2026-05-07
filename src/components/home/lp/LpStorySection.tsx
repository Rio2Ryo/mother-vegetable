export default function LpStorySection() {
  return (
    <section
      className="relative py-28 w-full overflow-hidden"
      style={{
        background: '#000',
        borderTop: '1px solid #25C760',
        borderBottom: '1px solid #25C760',
        margin: '30px 0',
      }}
    >
      {/* Background radial glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20%',
          background:
            'radial-gradient(circle at 50% 8%, rgba(37,199,96,0.22), transparent 34%), radial-gradient(circle at 12% 78%, rgba(60,128,99,0.18), transparent 32%), radial-gradient(circle at 88% 68%, rgba(37,199,96,0.14), transparent 30%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5">
        {/* MV Product head */}
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
          {/* Underline */}
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
              fontSize: 'clamp(22px, 3vw, 40px)',
              lineHeight: 1.42,
            }}
          >
            人の想い。日本の魅力。地球の力。
            <br />
            そのすべてを取り込んだプロダクト。
          </p>
        </div>

        {/* Diagram */}
        <div
          className="mx-auto max-w-[1080px] p-8"
          style={{
            border: '1px solid #25C760',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(37,199,96,0.09), rgba(0,0,0,0.94))',
          }}
          aria-label="MV Productをつくる3つの力の図解"
        >
          <h3
            className="text-center mb-7 font-extrabold"
            style={{
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              color: '#fff',
              fontSize: 'clamp(24px, 3vw, 38px)',
              lineHeight: 1.35,
            }}
          >
            MV Productをつくる3つの力
          </h3>

          {/* Force grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
            {/* 力01 */}
            <ForceCard number="01" title="生産者の想い" description="誰のために、どんな未来を想い作られたのか。" />

            {/* Plus */}
            <PlusSign />

            {/* 力02 */}
            <ForceCard
              number="02"
              title={
                <>
                  日本の素材
                  <br />
                  地域の魅力
                </>
              }
              description="土地に根づいた素材、文化、技術、物語。"
            />

            {/* Plus */}
            <PlusSign />

            {/* 力03 */}
            <ForceCard
              number="03"
              title="Mother Vegetableの力"
              description="地球最古の生命が持つ、栄養・浄化・再生の力。"
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
}: {
  number: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <article
      className="relative p-7 overflow-hidden"
      style={{
        border: '1px solid rgba(37,199,96,0.42)',
        borderRadius: 14,
        background: '#000',
        minHeight: 250,
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: -72,
          top: -80,
          width: 190,
          height: 190,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,199,96,0.22), transparent 70%)',
        }}
      />
      <span
        className="block mb-4 font-black tracking-widest"
        style={{
          color: '#25C760',
          fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
          fontSize: 13,
          letterSpacing: '0.12em',
        }}
      >
        {number}
      </span>
      <h3
        className="relative font-extrabold"
        style={{
          color: '#fff',
          fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
          fontSize: 'clamp(21px, 2.2vw, 28px)',
          lineHeight: 1.32,
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        className="relative mt-4"
        style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: 15,
          lineHeight: 1.9,
          margin: 0,
        }}
      >
        {description}
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
