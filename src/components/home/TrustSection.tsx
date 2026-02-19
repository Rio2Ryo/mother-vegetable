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
      className="bg-black border border-[#25C760] rounded-xl p-[10px] md:p-[25px] lg:p-10 my-5 md:my-10 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-2">Our Trust</h2>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

      {/* Partner logos - flex row on all sizes, matching original exactly */}
      <motion.div
        className="flex flex-row flex-nowrap justify-center items-center gap-[1px] md:gap-[1%] lg:gap-[30px] max-w-[1400px] mx-auto mb-8 overflow-hidden px-0 sm:px-0 md:px-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex justify-center items-center p-[1px] md:p-2 lg:p-2.5 flex-shrink-0 w-[16.66%] max-w-[16.66%] md:w-auto md:max-w-none"
          >
            <Image
              src={`/Images/Assets/homepage/company/partner_${i}.png`}
              alt={`Partner ${i}`}
              width={120}
              height={120}
              className="w-full max-h-[35px] md:max-w-[70px] md:max-h-[70px] lg:max-w-[120px] lg:max-h-[120px] h-auto object-contain transition-all duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Trust descriptions */}
      <motion.div
        className="flex flex-col gap-[5px] max-w-[820px] mx-auto w-fit py-4 max-[480px]:gap-[10px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { label: 'Achieve', desc: 'certified human grade food by Ministry of Health, Labour and Welfare (MHLW), Japan' },
          { label: 'Confidence', desc: 'certified cosmetic \u201CThe Japanese Standards of Quasi-Drug Ingredients (JSQI)\u201D by MHLW, Japan' },
          { label: 'Forever', desc: 'certified by pet grade food by Ministry of Agriculture, Forestry and Fisheries (MAFF), Japan' },
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="flex flex-col max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-[6px] max-[768px]:text-center sm:flex-row justify-center items-center gap-4 text-white text-[1rem] max-[1024px]:text-[0.95rem] max-[768px]:text-[0.7rem] max-[480px]:text-[0.55rem]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="min-w-[110px] text-right font-bold text-[#25C760] max-[768px]:text-center">{item.label}</span>
            <span className="flex-1 text-left max-[768px]:text-center">{item.desc}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
