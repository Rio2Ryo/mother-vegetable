'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export default function LpHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/Assets/homepage/bannerImg.png"
          alt="Mother Vegetable Project"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Radial glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(37,199,96,0.10) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-5 pt-24 pb-20">
        {/* Floating logo */}
        <motion.div
          className="mb-6"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
        >
          <Image
            src="/Images/favicon.png"
            alt="Mother Vegetable Logo"
            width={96}
            height={96}
            className="mx-auto drop-shadow-[0_0_18px_rgba(37,199,96,0.52)]"
            priority
          />
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-extrabold leading-tight tracking-wide"
          style={{
            fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
            fontSize: 'clamp(38px, 5.4vw, 66px)',
            color: '#25C760',
            textShadow: '0 0 20px rgba(37,199,96,0.42), 0 2px 8px rgba(0,0,0,0.55)',
            whiteSpace: 'nowrap',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          Mother Vegetable Project
        </motion.h1>

        {/* Green underline */}
        <div
          className="mx-auto mt-5 rounded-full"
          style={{
            width: 'min(280px, 62%)',
            height: 3,
            background: 'linear-gradient(90deg, #25C760, #3C8063, transparent)',
            boxShadow: '0 0 20px rgba(37,199,96,0.42)',
          }}
        />

        {/* Eyebrow */}
        <motion.span
          className="block mt-6 font-semibold"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 'clamp(13px, 1.35vw, 18px)',
            color: '#25C760',
            letterSpacing: '0.025em',
            textShadow: '0 0 15px rgba(37,199,96,0.32), 0 2px 4px rgba(0,0,0,0.55)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
        >
          生産者の想い×日本の魅力×地球最古の生命の力
        </motion.span>

        {/* Lead text */}
        <motion.p
          className="mt-6 mx-auto"
          style={{
            maxWidth: 600,
            color: 'rgba(255,255,255,0.88)',
            fontSize: 'clamp(14px, 1.15vw, 17px)',
            lineHeight: 1.9,
            textShadow: '0 2px 4px rgba(0,0,0,0.55)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.7 }}
        >
          人の思いと地域の素材を、Mother Vegetableの生命力で未来の商品へ。
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.9 }}
        >
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
            MV Productをチェックする
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
