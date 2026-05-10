import { Link } from '@/i18n/navigation';

export default function LpVisionSection() {
  return (
    <section
      className="relative text-center w-full overflow-hidden"
      style={{
        padding: '110px 0',
        margin: '40px 0',
        background:
          'radial-gradient(circle at 50% 30%, rgba(37,199,96,0.22), transparent 34%), linear-gradient(135deg, #000, #06110a 48%, #000)',
        borderTop: '1px solid #25C760',
        borderBottom: '1px solid #25C760',
        color: '#fff',
      }}
    >
      {/* Decorative radial ring */}
      <div
        className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 720,
          height: 720,
          border: '1px solid rgba(37,199,96,0.28)',
          background:
            'repeating-radial-gradient(circle, rgba(37,199,96,0.10) 0 1px, transparent 1px 34px)',
          opacity: 0.85,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5">
        <div
          className="mb-3 font-semibold uppercase tracking-widest"
          style={{ color: '#25C760', fontSize: 13, letterSpacing: '0.10em' }}
        >
          Vision
        </div>

        <h2
          className="font-extrabold mx-auto"
          style={{
            fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
            fontSize: 'clamp(36px, 5vw, 72px)',
            color: '#25C760',
            lineHeight: 1.13,
            textShadow: '0 0 20px rgba(37,199,96,0.42), 0 0 42px rgba(37,199,96,0.18)',
            maxWidth: 900,
          }}
        >
          選ぶことで全てが始まる
        </h2>

        <p
          className="mx-auto mt-5"
          style={{
            maxWidth: 720,
            color: 'rgba(255,255,255,0.78)',
            fontSize: 18,
            lineHeight: 1.9,
          }}
        >
          大切な人の健康も、地域を守ることも、Mother Vegetableを選ぶことから全てが始まります。
        </p>

        <div className="mt-9 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all duration-300 hover:-translate-y-1"
            style={{
              background: '#25C760',
              color: '#001d0c',
              border: '1px solid #25C760',
              boxShadow: '0 0 20px rgba(37,199,96,0.42), 0 0 42px rgba(37,199,96,0.18)',
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 16,
            }}
          >
            MV Product 一覧はこちら
          </Link>
        </div>
      </div>
    </section>
  );
}
