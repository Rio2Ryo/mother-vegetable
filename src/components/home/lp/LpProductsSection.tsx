import { Link } from '@/i18n/navigation';

export default function LpProductsSection() {
  return (
    <section className="bg-black py-32">
      <div className="w-full max-w-[1180px] mx-auto px-5">
        {/* Section head */}
        <div className="max-w-[980px] mx-auto mb-16 text-center">
          <h2
            className="font-bold"
            style={{
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(28px, 3.4vw, 48px)',
              color: '#25C760',
              lineHeight: 1.22,
              textShadow: '0 0 18px rgba(37,199,96,0.30)',
            }}
          >
            <span className="block">Mother Vegetableから生まれた</span>
            <span className="block">2つの「地球の力」がすべてのアイテムに。</span>
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

        {/* Cards */}
        <div className="flex flex-col gap-10">
          {/* Achieve card */}
          <article
            className="relative w-full p-12 overflow-hidden"
            style={{
              borderRadius: 14,
              border: '1px solid #25C760',
              background: '#000',
            }}
          >
            {/* Glow accent */}
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
            <h3
              className="font-extrabold mb-2"
              style={{
                fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                fontSize: 'clamp(38px, 4.2vw, 58px)',
                color: '#25C760',
                lineHeight: 1.18,
              }}
            >
              Achieve
            </h3>
            <strong
              className="block font-extrabold mb-4"
              style={{
                color: '#fff',
                fontSize: 'clamp(19px, 2vw, 28px)',
                lineHeight: 1.45,
              }}
            >
              高たんぱく質＋全48種類の天然栄養
            </strong>
            <p
              className="max-w-[620px]"
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: 16,
                lineHeight: 2,
              }}
            >
              Mother Vegetableから生まれた高栄養食品「Achieve」。
              <br />
              たんぱく質、ミネラル、ビタミン、フィコシアニンなどを含み、
              <br />
              食事、調味料、飲料、ペット、スポーツ栄養まで幅広く活用できます。
              <br />
              現代の食に、地球最古の生命力を加える素材です。
            </p>
            <div className="mt-7 flex">
              <Link
                href="/product/achieve"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#25C760',
                  color: '#001d0c',
                  border: '1px solid #25C760',
                  boxShadow: '0 0 20px rgba(37,199,96,0.42)',
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}
              >
                Achieveとのコラボ商品はこちら
              </Link>
            </div>
          </article>

          {/* Confidence card */}
          <article
            className="relative w-full p-12 overflow-hidden text-right ml-auto"
            style={{
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.78)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(37,199,96,0.06) 42%, #000 100%)',
              maxWidth: '100%',
            }}
          >
            {/* Glow accent */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 300,
                height: 300,
                left: -90,
                top: -70,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.24), rgba(37,199,96,0.10) 44%, transparent 72%)',
              }}
            />
            <h3
              className="font-extrabold mb-2"
              style={{
                fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                fontSize: 'clamp(38px, 4.2vw, 58px)',
                color: '#fff',
                textShadow: '0 0 20px rgba(255,255,255,0.34)',
                lineHeight: 1.18,
              }}
            >
              Confidence
            </h3>
            <strong
              className="block font-extrabold mb-4 ml-auto"
              style={{
                color: 'rgba(255,255,255,0.90)',
                fontSize: 'clamp(19px, 2vw, 28px)',
                lineHeight: 1.45,
              }}
            >
              純度97%の天然シリカで、やさしく整える。
            </strong>
            <p
              className="ml-auto"
              style={{
                color: 'rgba(255,255,255,0.90)',
                fontSize: 16,
                lineHeight: 2,
                maxWidth: 620,
              }}
            >
              Mother Vegetableから生まれた白いパウダー「Confidence」。
              <br />
              育つ過程で、純度97%の非晶質シリカを生み出します。
              <br />
              医薬部外品原料規格もクリアしたシリカは
              <br />
              肌や髪、愛するペットにも使用可能で、
              <br />
              化粧水やシャンプーに混ぜて1ランク上のアイテムに。
            </p>
            <div className="mt-7 flex justify-end">
              <Link
                href="/product/confidence"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#fff',
                  color: '#001d0c',
                  border: '1px solid #fff',
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}
              >
                Confidenceとのコラボ商品はこちら
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
