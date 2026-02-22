import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Become a Certified Instructor',
  description:
    'Join the Mother Vegetable instructor affiliate program. Earn 25% commission on direct sales and 10% on referral sales. $250/year subscription.',
};

/* ------------------------------------------------------------------ */
/*  Certified Instructor Page – Mother Vegetable Partners              */
/* ------------------------------------------------------------------ */

/* ---------- static data ------------------------------------------- */

const benefits = [
  {
    title: 'Daily Use & Sharing',
    desc: 'Mix it into meals, apply it to the skin or minor wounds\u2014use Mother Vegetable in your daily life and experience its effects firsthand. When someone shows interest, share the product with them and allow its value to spread naturally.',
  },
  {
    title: 'International Certification & Credibility',
    desc: 'You can act as a certified instructor within an international project in collaboration with ASEAN partners, universities, and major corporations. You will receive a globally trusted digital ID/business card.',
  },
  {
    title: 'Simple Information Delivery',
    desc: 'All essential details are available on the guide card and website. No difficult explanation is needed\u2014the product\u2019s value is conveyed simply through use.',
  },
  {
    title: 'Instruction Kit Provided',
    desc: 'You will receive a pack of 30 \u201CAchieve\u201D (for drinking) and 30 \u201CConfidence\u201D (for topical use). You can start your activities the moment they arrive.',
  },
  {
    title: 'Instruction Reward',
    desc: 'For every product purchase made by people you introduce, you will receive a 25% reward.',
  },
  {
    title: 'Growth Reward',
    desc: 'When a new certified instructor joins through you, you receive a USD 50 reward, and the same amount again upon their renewal the following year. In addition, you receive a 10% reward from the usage generated within your students.',
  },
  {
    title: 'Management Through a Dedicated System',
    desc: 'You can monitor your students\u2019 expansion and user activity in real time. Sales, logistics, and customer management are handled automatically, allowing you to focus on your activities.',
  },
];

const planDetails = [
  { label: 'Join Requirements', value: 'Annual 250 USD auto-renewal' },
  { label: 'Instruction Reward', value: '25% (No inventory, sales expenses, or tools required)' },
  { label: 'Growth Reward', value: '10% from your instructors' },
  { label: 'Invitation Bonus', value: '50 USD per invitation' },
  { label: 'Sales Support Benefits', value: 'Sell at 10% off the official price' },
];

const heroProducts = [
  { name: 'Achieve', subtitle: 'for Body (Human & Animal)', price: '$33.00', instructionReward: '$8.25', growthReward: '$3.30' },
  { name: 'Confidence', subtitle: 'for All Skin (Human & Animal)', price: '$33.00', instructionReward: '$8.25', growthReward: '$3.30' },
];

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

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 py-8">

        {/* ============================================================ */}
        {/*  SECTION 1 — Page Title                                      */}
        {/* ============================================================ */}
        <div className="text-center mb-2">
          <h1 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider leading-[1.4]">
            <span className="block">Roles &amp; Benefits</span>
            <span className="block">Mother Vegetable Certified Instructor</span>
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
            Experience a new world where the more you use it, the more it heals the Earth and its people
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed opacity-90 max-w-[900px] mx-auto">
            Mother Vegetable is the Earth&apos;s oldest plant, born 3.5 billion years ago, with the unique
            ability to heal both the planet and human beings simultaneously. It absorbs CO&#8322; and generates
            oxygen at a level roughly 700 times greater than natural cedar, helping restore the global
            environment. When consumed or applied to the skin, it supports health, skin condition, and
            wound healing. The purpose of this program is to share this &ldquo;Earth- and human-healing
            experience&rdquo; with the world.
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
              <h3 className="text-[#25C760] font-bold text-base md:text-lg mb-2">Quick Registration</h3>
              <p className="text-white text-sm leading-relaxed opacity-85 mb-4">
                Registration takes just one minute, and you can begin immediately.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/signup"
                  className="inline-block bg-white text-black font-bold py-2 px-8 rounded border-2 border-white hover:bg-[#25C760] hover:border-[#25C760] hover:text-white transition-all"
                >
                  Join Us Today
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
            Group Structure and Reward Logic
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
              Certified Instructor
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
                Join Us Today
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
            Hero Product Rewards
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
                  <span className="text-white/80 text-sm">Retail Price</span>
                  <strong className="text-white text-lg font-bold">{product.price}</strong>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-[rgba(37,199,96,0.15)]">
                  <span className="text-white/80 text-sm">Instruction Reward</span>
                  <strong className="text-[#25C760] text-lg font-bold">{product.instructionReward}</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Education Growth Reward</span>
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
