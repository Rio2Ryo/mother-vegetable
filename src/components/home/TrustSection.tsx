'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function TrustSection() {
  return (
    <motion.div
      className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-2">Our Trust</h2>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

      {/* Partner logos - flex row, shrink on mobile */}
      <motion.div
        className="flex flex-row flex-nowrap justify-center items-center gap-[1px] md:gap-[30px] max-w-[1400px] mx-auto mb-8 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex justify-center items-center p-1 md:p-2.5 flex-shrink-0 w-[16.66%] md:w-auto max-w-[16.66%] md:max-w-none"
          >
            <Image
              src={`/Images/Assets/homepage/company/partner_${i}.png`}
              alt={`Partner ${i}`}
              width={120}
              height={120}
              className="w-full md:max-w-[120px] md:max-h-[120px] max-h-[35px] h-auto object-contain transition-all duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Trust descriptions */}
      <motion.div
        className="flex flex-col gap-1.5 max-w-[820px] mx-auto w-fit py-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { label: 'Achieve', desc: '' },
          { label: 'Confidence', desc: 'certified cosmetic \u201CThe Japanese Standards of Quasi-Drug Ingredients (JSQI)\u201D by MHLW, Japan' },
          { label: 'Forever', desc: 'certified by pet grade food by Ministry of Agriculture, Forestry and Fisheries (MAFF), Japan' },
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white text-sm md:text-base"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="min-w-[110px] text-right font-bold text-[#25C760]">{item.label}</span>
            <span className="flex-1 text-left">{item.desc}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
