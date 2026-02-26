import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Become a Certified Instructor',
  description:
    'Join the Mother Vegetable instructor affiliate program. Earn 25% commission on direct sales and 10% on referral sales. $250/year subscription.',
  openGraph: {
    title: 'Become a Certified Instructor — Mother Vegetable',
    description: 'Join the Mother Vegetable instructor affiliate program. Earn 25% commission on direct sales and 10% on referral sales.',
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become a Certified Instructor — Mother Vegetable',
    description: 'Join the Mother Vegetable instructor affiliate program. Earn 25% commission on direct sales and 10% on referral sales.',
  },
};

/* ------------------------------------------------------------------ */
/*  Certified Instructor Page – Mother Vegetable Partners              */
/* ------------------------------------------------------------------ */

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default async function CertifiedInstructorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isJa = locale === 'ja';

  /* ---------- static data ------------------------------------------- */

  const benefits = [
    {
      title: isJa ? '日常的な使用とシェア' : 'Daily Use & Sharing',
      desc: isJa
        ? 'マザーベジタブルを食事に混ぜたり、肌や小さな傷に塗ったり—日常生活で使い、その効果を実感してください。興味を持った方がいれば、製品をシェアし、その価値が自然に広まるようにしましょう。'
        : 'Mix it into meals, apply it to the skin or minor wounds\u2014use Mother Vegetable in your daily life and experience its effects firsthand. When someone shows interest, share the product with them and allow its value to spread naturally.',
    },
    {
      title: isJa ? '国際認定と信頼性' : 'International Certification & Credibility',
      desc: isJa
        ? 'ASEAN パートナー、大学、大企業と連携した国際プロジェクトの認定インストラクターとして活動できます。グローバルに信頼されるデジタルID/名刺を受け取れます。'
        : 'You can act as a certified instructor within an international project in collaboration with ASEAN partners, universities, and major corporations. You will receive a globally trusted digital ID/business card.',
    },
    {
      title: isJa ? 'シンプルな情報提供' : 'Simple Information Delivery',
      desc: isJa
        ? '必要な情報はすべてガイドカードとウェブサイトに掲載。難しい説明は不要—使うだけで製品の価値が伝わります。'
        : 'All essential details are available on the guide card and website. No difficult explanation is needed\u2014the product\u2019s value is conveyed simply through use.',
    },
    {
      title: isJa ? 'インストラクションキット提供' : 'Instruction Kit Provided',
      desc: isJa
        ? '「Achieve」30本（飲用）と「Confidence」30本（外用）のパックを受け取れます。届いたその日から活動を開始できます。'
        : 'You will receive a pack of 30 \u201CAchieve\u201D (for drinking) and 30 \u201CConfidence\u201D (for topical use). You can start your activities the moment they arrive.',
    },
    {
      title: isJa ? 'インストラクション報酬' : 'Instruction Reward',
      desc: isJa
        ? 'あなたが紹介した方の製品購入ごとに25%の報酬を受け取れます。'
        : 'For every product purchase made by people you introduce, you will receive a 25% reward.',
    },
    {
      title: isJa ? 'グロース報酬' : 'Growth Reward',
      desc: isJa
        ? '新しい認定インストラクターがあなたを通じて参加すると、USD 50の報酬を受け取り、翌年の更新時にも同額を受け取れます。さらに、あなたの生徒内の利用から10%の報酬を受け取れます。'
        : 'When a new certified instructor joins through you, you receive a USD 50 reward, and the same amount again upon their renewal the following year. In addition, you receive a 10% reward from the usage generated within your students.',
    },
    {
      title: isJa ? '専用システムによる管理' : 'Management Through a Dedicated System',
      desc: isJa
        ? '生徒の拡大やユーザーの活動をリアルタイムで監視できます。販売、物流、顧客管理は自動的に処理され、活動に集中できます。'
        : 'You can monitor your students\u2019 expansion and user activity in real time. Sales, logistics, and customer management are handled automatically, allowing you to focus on your activities.',
    },
  ];

  const planDetails = [
    { label: isJa ? '参加条件' : 'Join Requirements', value: isJa ? '年間250 USD自動更新' : 'Annual 250 USD auto-renewal' },
    { label: isJa ? 'インストラクション報酬' : 'Instruction Reward', value: isJa ? '25%（在庫、販売経費、ツール不要）' : '25% (No inventory, sales expenses, or tools required)' },
    { label: isJa ? 'グロース報酬' : 'Growth Reward', value: isJa ? 'インストラクターからの10%' : '10% from your instructors' },
    { label: isJa ? '招待ボーナス' : 'Invitation Bonus', value: isJa ? '招待1件につき50 USD' : '50 USD per invitation' },
    { label: isJa ? '販売サポート特典' : 'Sales Support Benefits', value: isJa ? '公式価格から10%割引で販売' : 'Sell at 10% off the official price' },
  ];

  const heroProducts = [
    {
      name: 'Achieve',
      subtitle: isJa ? '身体のために（人間＆動物）' : 'for Body (Human & Animal)',
      price: '$33.00',
      instructionReward: '$8.25',
      growthReward: '$3.30',
    },
    {
      name: 'Confidence',
      subtitle: isJa ? 'すべての肌に（人間＆動物）' : 'for All Skin (Human & Animal)',
      price: '$33.00',
      instructionReward: '$8.25',
      growthReward: '$3.30',
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 py-8">

        {/* ============================================================ */}
        {/*  SECTION 1 — Page Title                                      */}
        {/* ============================================================ */}
        <div className="text-center mb-2">
          <h1 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider leading-[1.4]">
            <span className="block">{isJa ? '役割と特典' : 'Roles & Benefits'}</span>
            <span className="block">{isJa ? 'マザーベジタブル認定インストラクター' : 'Mother Vegetable Certified Instructor'}</span>
          </h1>
          <Image
            src="/Images/Assets/homepage/underline.png"
            alt="Underline"
            width={250}
            height={10}
            className="mx-auto mt-2 mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]"
          />
        </div>

        {/* ============================================================ */}
        {/*  SECTION 2 — Program Introduction                            */}
        {/* ============================================================ */}
        <div className="text-center mb-8">
          <h2 className="text-[#25C760] font-bold text-lg md:text-xl mb-4">
            {isJa
              ? '使えば使うほど地球と人を癒す、新しい世界を体験してください'
              : 'Experience a new world where the more you use it, the more it heals the Earth and its people'}
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed opacity-90 max-w-[900px] mx-auto">
            {isJa
              ? 'マザーベジタブルは35億年前に誕生した地球最古の植物であり、地球と人間の両方を同時に癒すユニークな力を持っています。天然杉の約700倍のレベルでCO₂を吸収し酸素を生成し、地球環境の回復を助けます。摂取したり肌に塗布すると、健康、肌の状態、傷の治癒をサポートします。このプログラムの目的は、この「地球と人を癒す体験」を世界と共有することです。'
              : <>Mother Vegetable is the Earth&apos;s oldest plant, born 3.5 billion years ago, with the unique
            ability to heal both the planet and human beings simultaneously. It absorbs CO&#8322; and generates
            oxygen at a level roughly 700 times greater than natural cedar, helping restore the global
            environment. When consumed or applied to the skin, it supports health, skin condition, and
            wound healing. The purpose of this program is to share this &ldquo;Earth- and human-healing
            experience&rdquo; with the world.</>}
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION 3 — Animation Video                                 */}
        {/* ============================================================ */}
        <div className="flex justify-center mb-10">
          <video
            className="w-full max-w-[35%] h-auto rounded-lg max-md:max-w-[50%] max-sm:max-w-[75%]"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/Instructor_anime.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* ============================================================ */}
        {/*  SECTION 4 — Roles & Benefits Cards                          */}
        {/* ============================================================ */}
        <div className="border-2 border-[#25C760] rounded-xl p-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-[rgba(5,15,10,0.9)] border border-[rgba(37,199,96,0.35)] rounded-2xl p-5 hover:border-[#25C760] transition-colors"
              >
                <h3 className="text-[#25C760] font-bold text-base md:text-lg mb-2">{b.title}</h3>
                <p className="text-white text-sm leading-relaxed opacity-85">{b.desc}</p>
              </div>
            ))}

            {/* Quick Registration card with CTA */}
            <div className="bg-[rgba(5,15,10,0.9)] border border-[rgba(37,199,96,0.35)] rounded-2xl p-5 hover:border-[#25C760] transition-colors text-center flex flex-col justify-center">
              <h3 className="text-[#25C760] font-bold text-base md:text-lg mb-2">{isJa ? '簡単登録' : 'Quick Registration'}</h3>
              <p className="text-white text-sm leading-relaxed opacity-85 mb-4">
                {isJa ? '登録はたった1分で、すぐに始められます。' : 'Registration takes just one minute, and you can begin immediately.'}
              </p>
              <div className="flex justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-black font-bold py-2 px-8 rounded border-2 border-white hover:bg-[#25C760] hover:border-[#25C760] hover:text-white transition-all"
                >
                  {isJa ? '今すぐ参加' : 'Join Us Today'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION 5 — Group Structure and Reward Logic                 */}
        {/* ============================================================ */}
        <div className="text-center mb-6">
          <h2 className="text-[#25C760] font-bold text-2xl md:text-3xl tracking-wider">
            {isJa ? 'グループ構造と報酬ロジック' : 'Group Structure and Reward Logic'}
          </h2>
          <Image
            src="/Images/Assets/homepage/underline.png"
            alt="Underline"
            width={250}
            height={10}
            className="mx-auto mt-2 mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]"
          />
        </div>

        {/* Plan Card */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-[600px] bg-[rgba(5,15,10,0.9)] border-2 border-[rgba(37,199,96,0.35)] rounded-2xl p-7 shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
            <h3 className="text-[#25C760] font-bold text-2xl mb-5 font-[Ubuntu,sans-serif]">
              {isJa ? '認定インストラクター' : 'Certified Instructor'}
            </h3>
            <ul className="space-y-4">
              {planDetails.map((item) => (
                <li key={item.label} className="flex flex-col gap-1">
                  <span className="text-white font-bold text-base">{item.label}</span>
                  <span className="text-white/85 text-[15px] leading-relaxed">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <Link
                href="/signup"
                className="inline-block bg-white text-black font-bold py-2 px-8 rounded border-2 border-white hover:bg-[#25C760] hover:border-[#25C760] hover:text-white transition-all"
              >
                {isJa ? '今すぐ参加' : 'Join Us Today'}
              </Link>
            </div>
          </div>
        </div>

        {/* Group Structure Image */}
        <div className="flex justify-center mb-12">
          <Image
            src="/Images/Assets/mv/groupStructure_img.png"
            alt="Group Structure"
            width={800}
            height={500}
            className="max-w-full h-auto"
          />
        </div>

        {/* ============================================================ */}
        {/*  SECTION 6 — Hero Product Rewards                            */}
        {/* ============================================================ */}
        <div className="text-center mb-6">
          <h2 className="text-[#25C760] font-bold text-2xl md:text-3xl tracking-wider">
            {isJa ? 'ヒーロー製品報酬' : 'Hero Product Rewards'}
          </h2>
          <Image
            src="/Images/Assets/homepage/underline.png"
            alt="Underline"
            width={250}
            height={10}
            className="mx-auto mt-2 mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
          {heroProducts.map((product) => (
            <div
              key={product.name}
              className="bg-[rgba(5,15,10,0.9)] border-2 border-[rgba(37,199,96,0.35)] rounded-2xl overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.4)]"
            >
              {/* Product Header */}
              <div className="bg-gradient-to-r from-[#25C760]/20 to-[#25C760]/5 border-b border-[rgba(37,199,96,0.35)] p-5 text-center">
                <h3 className="text-[#25C760] font-bold text-xl md:text-2xl">{product.name}</h3>
                <span className="text-white/70 text-sm">{product.subtitle}</span>
              </div>

              {/* Product Metrics */}
              <ul className="p-5 space-y-4">
                <li className="flex justify-between items-center pb-3 border-b border-[rgba(37,199,96,0.15)]">
                  <span className="text-white/80 text-sm">{isJa ? '小売価格' : 'Retail Price'}</span>
                  <strong className="text-white text-lg font-bold">{product.price}</strong>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-[rgba(37,199,96,0.15)]">
                  <span className="text-white/80 text-sm">{isJa ? 'インストラクション報酬' : 'Instruction Reward'}</span>
                  <strong className="text-[#25C760] text-lg font-bold">{product.instructionReward}</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">{isJa ? 'エデュケーショングロース報酬' : 'Education Growth Reward'}</span>
                  <strong className="text-[#3C8063] text-lg font-bold">{product.growthReward}</strong>
                </li>
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
