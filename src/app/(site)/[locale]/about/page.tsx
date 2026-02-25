import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Mother Vegetable Project',
  description:
    'Learn about the Mother Vegetable Project — our mission to harness the life force of 45 vegetables for human health and wellness.',
  openGraph: {
    title: 'About — Mother Vegetable Project',
    description:
      'Learn about the Mother Vegetable Project — our mission to harness the life force of 45 vegetables for human health and wellness.',
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Mother Vegetable Project',
    description:
      'Learn about the Mother Vegetable Project — our mission to harness the life force of 45 vegetables for human health and wellness.',
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';

  /* ---------- localized helpers ---------- */
  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t('About Mother Vegetable', 'マザーベジタブルについて', '关于 Mother Vegetable')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {t(
              "Earth's life force, distilled from 45 vegetables — for you.",
              '45種類の野菜から抽出した地球の生命力を、あなたに。',
              '从45种蔬菜中提取地球的生命力，为您而来。',
            )}
          </p>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-8">
            {t('Our Story', '私たちのストーリー', '我们的故事')}
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
            <p>
              {t(
                'The Mother Vegetable Project began with a simple question: what if we could capture the complete nutritional power of vegetables in their most bioavailable form? Our founder discovered that by combining 45 carefully selected vegetables — each chosen for its unique nutrient profile — we could create something greater than the sum of its parts.',
                'マザーベジタブル・プロジェクトは、ひとつのシンプルな問いから始まりました。「野菜の持つ栄養パワーを、最も吸収しやすい形で凝縮できないか？」創業者は、それぞれ独自の栄養プロファイルを持つ45種類の厳選された野菜を組み合わせることで、個々の合計を超えるものを生み出せることを発見しました。',
                'Mother Vegetable 项目始于一个简单的问题：如果我们能以最易吸收的形式捕获蔬菜的完整营养力量会怎样？我们的创始人发现，通过组合45种精心挑选的蔬菜——每种都因其独特的营养特征而被选中——我们可以创造出超越各部分之和的产品。',
              )}
            </p>
            <p>
              {t(
                'Rooted in 3.5 billion years of plant evolution, our proprietary extraction process preserves the full spectrum of vitamins, minerals, amino acids, and phytonutrients. Every batch is produced in GMP- and HACCP-certified facilities in Japan, ensuring the highest standards of quality and safety.',
                '35億年の植物進化に根ざした独自の抽出プロセスにより、ビタミン、ミネラル、アミノ酸、フィトニュートリエントの全スペクトラムを保持しています。すべてのバッチは日本のGMP・HACCP認証施設で製造され、最高水準の品質と安全性を確保しています。',
                '植根于35亿年的植物进化历史，我们专有的提取工艺保留了全谱维生素、矿物质、氨基酸和植物营养素。每批产品均在日本GMP和HACCP认证设施中生产，确保最高质量和安全标准。',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 px-6 bg-[rgba(37,199,96,0.04)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-12 text-center">
            {t('Mission & Vision', 'ミッション＆ビジョン', '使命与愿景')}
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="border border-[rgba(37,199,96,0.3)] rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-[rgba(37,199,96,0.15)] flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {t('Our Mission', '私たちのミッション', '我们的使命')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t(
                  'To make the complete nutritional power of vegetables accessible to everyone — supporting health from the inside out through nature, not synthetics.',
                  '野菜の完全な栄養パワーをすべての人に届けること。合成品ではなく、自然の力で内側から健康をサポートします。',
                  '让每个人都能获得蔬菜的完整营养力量——通过自然而非合成品，从内而外支持健康。',
                )}
              </p>
            </div>
            {/* Vision */}
            <div className="border border-[rgba(37,199,96,0.3)] rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-[rgba(37,199,96,0.15)] flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {t('Our Vision', '私たちのビジョン', '我们的愿景')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t(
                  'A world where plant-based nutrition bridges the gap between modern lifestyles and optimal health — empowering people, animals, and the earth to thrive.',
                  '植物由来の栄養が現代のライフスタイルと最適な健康をつなぐ世界。人、動物、そして地球が共に繁栄できる未来を目指します。',
                  '一个植物营养弥合现代生活方式与最佳健康之间差距的世界——让人类、动物和地球共同繁荣。',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-12 text-center">
            {t('What We Stand For', '私たちが大切にしていること', '我们的价值观')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: t('Quality', '品質', '品质'),
                desc: t(
                  'GMP & HACCP certified. Every product is tested by JFRL, Japan\'s leading food research lab.',
                  'GMP・HACCP認証。すべての製品は日本食品分析センター（JFRL）で検査済み。',
                  'GMP和HACCP认证。所有产品均经日本领先食品研究实验室JFRL检测。',
                ),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: t('Nature-First', '自然第一', '自然优先'),
                desc: t(
                  'Non-synthetic, plant-derived ingredients only. 45 vegetables, zero artificial additives.',
                  '非合成・植物由来成分のみ使用。45種類の野菜、人工添加物ゼロ。',
                  '仅使用非合成植物来源成分。45种蔬菜，零人工添加剂。',
                ),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
                title: t('For All Life', 'すべての命のために', '为所有生命'),
                desc: t(
                  'Products for people, pets, and the planet. Health is a shared journey.',
                  '人にも、ペットにも、地球にも。健康は共に歩む旅です。',
                  '为人类、宠物和地球。健康是共同的旅程。',
                ),
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[rgba(37,199,96,0.12)] flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team / Founder ── */}
      <section className="py-20 px-6 bg-[rgba(37,199,96,0.04)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-8">
            {t('Our Team', '私たちのチーム', '我们的团队')}
          </h2>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            {t(
              'Mother Vegetable is led by a team of nutrition researchers, food scientists, and wellness advocates united by a single purpose: bringing the best of nature to your daily life. Based in Japan, we combine traditional knowledge of plant nutrition with modern science to create products that truly make a difference.',
              'マザーベジタブルは、栄養研究者、食品科学者、ウェルネス推進者からなるチームが「自然の最高のものを日常に届ける」というひとつの目的のもと結集して運営しています。日本を拠点に、植物栄養の伝統的な知識と現代科学を融合し、本当に違いを生む製品を創り出しています。',
              'Mother Vegetable 由营养研究人员、食品科学家和健康倡导者组成的团队领导，他们因一个共同目标而团结：将大自然的精华带入您的日常生活。我们以日本为基地，将植物营养的传统知识与现代科学相结合，创造真正有所不同的产品。',
            )}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t('Experience the Difference', '違いを体感してください', '体验不同')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t(
              'Discover our range of products made from 45 vegetable extracts.',
              '45種類の野菜エキスから作られた製品ラインナップをご覧ください。',
              '探索我们由45种蔬菜提取物制成的产品系列。',
            )}
          </p>
          <Link
            href="/product/achieve"
            className="inline-block bg-[#25C760] text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#1da34d] transition-colors duration-300 no-underline"
          >
            {t('View Products', '製品を見る', '查看产品')}
          </Link>
        </div>
      </section>
    </main>
  );
}
