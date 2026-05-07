import Image from 'next/image';

export default function LpAboutSection() {
  return (
    <section className="bg-black py-32">
      <div className="w-full max-w-[1180px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
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
              <span className="block">What is</span>
              <span className="block">Mother Vegetable</span>
            </h2>

            {/* Underline */}
            <div
              className="mt-5 rounded-full"
              style={{
                width: 'min(280px, 62%)',
                height: 3,
                background: 'linear-gradient(90deg, #25C760, #3C8063, transparent)',
                boxShadow: '0 0 20px rgba(37,199,96,0.42)',
              }}
            />

            <p
              className="mt-7 font-bold"
              style={{
                fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                fontSize: 'clamp(20px, 2.4vw, 32px)',
                color: '#fff',
                lineHeight: 1.35,
              }}
            >
              栄養・浄化・再生の力を持つ
              <br />
              35億年前の地球最初の生命
            </p>

            <p
              className="mt-5"
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: 16,
                lineHeight: 2.05,
              }}
            >
              Mother Vegetableは、35億年前の地球に誕生した最初の生命の力を受け継ぐ存在です。
            </p>
            <p
              className="mt-3"
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: 16,
                lineHeight: 2.05,
              }}
            >
              育つ過程で二酸化炭素を吸収し、人々に必要な高純度のたんぱく質や医薬品原料をも生み出します。
            </p>
          </div>

          {/* Right: Character image */}
          <div className="relative flex justify-center items-end min-h-[300px]">
            {/* Glow circle behind character */}
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
              alt="Mother Vegetableのキャラクター"
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
