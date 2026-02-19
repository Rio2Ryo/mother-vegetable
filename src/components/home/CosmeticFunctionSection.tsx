'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const concerns = [
  { name: 'Dark Spots', desc: 'Freckles' },
  { name: 'Acne', desc: 'Acne scars' },
  { name: 'Wounds', desc: 'Scars, Burn Marks' },
  { name: 'Odor', desc: 'Face, Neck, Underarms, V-Zone, Feet' },
  { name: 'Shine', desc: 'Maintains A Clean Look, Natural/ Earth Tones' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function CosmeticFunctionSection() {
  return (
    <motion.div
      className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10"
      id="cosmetic-function"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-1">Cosmetic Function</h2>
      <h3 className="text-center text-[#25C760] text-lg mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Confidence</h3>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-2 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <h6 className="text-center text-[#dc3545] mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>SURIKOMU / MAZEKOMU</h6>

      {/* Video + Bracket + Concern circles */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <video className="max-w-[100px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/cosmetic_video.mov" type="video/mp4" />
          </video>
        </motion.div>
        <div className="flex justify-center">
          <Image src="/Images/Assets/homepage/bracket_v2.png" alt="Bracket" width={40} height={200} className="h-[200px] w-auto hidden md:block" />
        </div>

        {/* Concern circles with stagger animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {concerns.map((c) => (
            <motion.div
              key={c.name}
              variants={circleVariants}
              className="w-[140px] h-[140px] rounded-full border-2 border-[#25C760] flex flex-col items-center justify-center text-center p-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,199,96,0.3)] hover:scale-105"
            >
              <span className="text-[#25C760] text-xs font-semibold leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>{c.name}</span>
              <span className="text-[#25C760] text-[10px] mt-1 opacity-80" style={{ fontFamily: 'Arial, sans-serif' }}>{c.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Description text + Skin healing video */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-white text-sm md:text-base leading-relaxed opacity-90 flex-1" style={{ fontFamily: 'Arial, sans-serif' }}>
          Mother Vegetable, certified as a medical-grade quasi-drug, is trusted by medical institutions worldwide for its healing properties — used in post-surgery recovery, burn scar improvement, cancer care, and even to help control skin shine. It supports the skin&apos;s natural ability to heal and restore balance.
        </p>
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <video className="max-w-[200px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/skin.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Before & After link */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 text-[#25C760] cursor-pointer hover:text-white transition-colors duration-300">
          <span className="font-bold text-lg">&#10003;</span>
          <span className="font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Before &amp; After</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
