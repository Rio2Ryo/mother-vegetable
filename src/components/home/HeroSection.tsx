'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src="/Images/Assets/homepage/bannerImg.png"
          alt="Cosmic Earth Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.4)_100%)] z-[2]" />
      </div>

      {/* Animated green pulse circle behind icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(37,199,96,0.1)_0%,rgba(37,199,96,0.05)_50%,transparent_70%)] z-[2] animate-[pulse_4s_ease-in-out_infinite]" />

      {/* Hero content */}
      <div className="relative z-[3] text-center max-w-[1400px] mx-auto px-5">
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          <Image
            src="/Images/favicon.png"
            alt="Mother Vegetable Icon"
            width={120}
            height={120}
            className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(37,199,96,0.6)]"
          />
        </motion.div>

        {/* Title with fadeInUp */}
        <motion.h1
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        >
          <span className="block font-bold text-4xl md:text-6xl lg:text-[5rem] text-[#25C760] tracking-wider mb-2.5 [text-shadow:0_0_20px_rgba(37,199,96,0.5)]" style={{ fontFamily: 'Arial, sans-serif' }}>
            MOTHER VEGETABLE
          </span>
          <span className="block font-semibold text-2xl md:text-4xl lg:text-[3rem] text-[#25C760] uppercase tracking-wide mb-4 [text-shadow:0_0_20px_rgba(37,199,96,0.5)]" style={{ fontFamily: 'Arial, sans-serif' }}>
            PRODUCTS
          </span>
          <Image
            src="/Images/Assets/homepage/underline.png"
            alt="Underline"
            width={250}
            height={10}
            className="mx-auto my-5 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]"
          />
        </motion.h1>

        {/* Description with fadeInUp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
        >
          <p className="text-lg md:text-xl lg:text-[1.4rem] font-light mb-4 opacity-90 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] text-[#25C760]" style={{ fontFamily: 'Arial, sans-serif' }}>
            Vegetable at the beginning of Earth, 3.5 billion years ago
          </p>
          <p className="text-xl md:text-2xl lg:text-[1.6rem] font-light text-[#25C760] mb-4 [text-shadow:0_0_15px_rgba(37,199,96,0.3)]" style={{ fontFamily: 'Arial, sans-serif' }}>
            &apos;Mother Vegetable&apos;
          </p>
          <p className="text-base md:text-lg lg:text-[1.2rem] font-light leading-relaxed opacity-95 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] max-w-[600px] mx-auto text-[#25C760]" style={{ fontFamily: 'Arial, sans-serif' }}>
            Earth&apos;s life force, for you.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
