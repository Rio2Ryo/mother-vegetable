'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

export default function HeroSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';

  return (
    <motion.section
      className="relative md:min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/Assets/homepage/bannerImg.png"
          alt="Earth Regeneration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 transition-all duration-1500 pt-40 md:pt-48 lg:pt-56">
        {/* Title Section */}
        <div className="mb-12">
          {/* Logo */}
          <motion.div
            className="mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          >
            <Image
              src="/Images/favicon.png"
              alt="Mother Vegetable Logo"
              width={140}
              height={140}
              className="mx-auto w-12 h-12 sm:w-32 sm:h-32 md:w-32 md:h-32 drop-shadow-[0_0_20px_rgba(37,199,96,0.6)]"
              priority
            />
          </motion.div>

          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(34, 197, 94, 0.2))',
            }}
          >
            <h1 className="text-sm sm:text-2xl md:text-3xl lg:text-3xl font-semibold leading-tight">
              <div>MOTHER VEGETABLE PROJECT</div>
            </h1>
          </motion.div>

          <div className="w-40 md:w-48 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-6 opacity-80" />
        </div>

        {/* Description */}
        <motion.div
          className="max-w-4xl mx-auto mb-2 mt-8 md:mt-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
        >
          <div className="space-y-3">
            <p className="text-xs md:text-xl text-[#4ade80] leading-relaxed">
              {isJa ? '35億年前の地球のはじまりの植物' : 'The vegetable from 3.5 billion years ago'}
            </p>
            <p className="text-xs md:text-xl text-[#4ade80] leading-relaxed">
              {isJa ? '「マザーベジタブル」' : '"Mother Vegetable"'}
            </p>
            <p className="text-xs md:text-xl text-[#4ade80] leading-relaxed">
              {isJa ? '地球が生み出した生命力を、あなたに。' : "Earth\u2019s life force, for you."}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
