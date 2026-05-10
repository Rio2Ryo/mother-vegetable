import { Link } from '@/i18n/navigation';

const STEPS = [
  {
    number: '01 / IDEA',
    title: '想い・アイデアを出す',
    description:
      '作りたい商品、地域素材、届けたい相手を描き、商品オーナーとしての夢を言葉にします。',
  },
  {
    number: '02 / MATERIAL',
    title: '素材と組み合わせる',
    description:
      'Mother Vegetableの原材料とあなたのアイデアをつなぎ、商品コンセプトを磨きます。',
  },
  {
    number: '03 / PRODUCT',
    title: '商品として形にする',
    description: '品質と物語を持つプロダクトへ育て、初回製造に進めます。',
  },
  {
    number: '04 / TEAM SALES',
    title: 'メンバーと届ける',
    description:
      '販売メンバーと一緒に広げ、地域と地球を支える商品を世界へ届けます。',
  },
] as const;

export default function LpOwnerFlowSection() {
  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          top: '18%',
          width: 'min(820px, 82vw)',
          height: 'min(820px, 82vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,199,96,0.13), transparent 68%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5">
        {/* Section head */}
        <div className="max-w-[880px] mx-auto mb-12 text-center">
          <div
            className="mb-3 font-semibold uppercase tracking-widest"
            style={{ color: '#25C760', fontSize: 13, letterSpacing: '0.10em' }}
          >
            Product Owner Program
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
            <span className="block">あなたも地域と地球を支える</span>
            <span className="block">商品を開発できる</span>
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
            className="mt-5"
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 16,
              lineHeight: 2.05,
              maxWidth: 760,
              margin: '20px auto 0',
            }}
          >
            あなたの思いを、Mother Vegetableの力で形にしましょう。
          </p>
          <p
            className="mt-7 font-extrabold"
            style={{
              color: '#fff',
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.45,
            }}
          >
            商品化から世界に届くまでのフロー
          </p>
        </div>

        {/* Steps */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          aria-label="商品化から世界に届くまでの4ステップ"
        >
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-7"
              style={{
                borderRadius: 14,
                border: '1px solid #25C760',
                background: 'linear-gradient(180deg, rgba(37,199,96,0.07), rgba(0,0,0,0.96))',
                minHeight: 230,
              }}
            >
              {/* Arrow between steps (desktop) */}
              {idx < STEPS.length - 1 && (
                <span
                  className="hidden lg:block absolute z-10 font-black"
                  style={{
                    top: '50%',
                    right: -24,
                    transform: 'translate(50%, -50%)',
                    color: '#25C760',
                    fontSize: 28,
                    textShadow: '0 0 20px rgba(37,199,96,0.42)',
                  }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
              <div
                className="inline-flex items-center justify-center mb-6 px-3 py-1 rounded-full font-extrabold"
                style={{
                  border: '1px solid #25C760',
                  background: 'rgba(37,199,96,0.10)',
                  color: '#25C760',
                  fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  minHeight: 34,
                }}
              >
                {step.number}
              </div>
              <h3
                className="font-extrabold"
                style={{
                  fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
                  color: '#fff',
                  fontSize: 21,
                  lineHeight: 1.32,
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3"
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 14,
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1"
            style={{
              background: '#25C760',
              color: '#001d0c',
              border: '1px solid #25C760',
              boxShadow: '0 0 20px rgba(37,199,96,0.42)',
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            商品開発についての詳細はこちら
          </Link>
        </div>
      </div>
    </section>
  );
}
