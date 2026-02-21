'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

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
  const locale = useLocale();
  const isJa = locale === 'ja';

  const certifications = [
    { id: 1, src: '/Images/Assets/homepage/company/partner_1.png', alt: '100% Organic' },
    { id: 2, src: '/Images/Assets/homepage/company/partner_2.png', alt: 'Certified Vegan' },
    { id: 3, src: '/Images/Assets/homepage/company/partner_3.png', alt: 'GMP Quality' },
    { id: 4, src: '/Images/Assets/homepage/company/partner_4.png', alt: 'Halal' },
    { id: 5, src: '/Images/Assets/homepage/company/partner_5.png', alt: 'HACCP' },
    { id: 6, src: '/Images/Assets/homepage/company/partner_6.png', alt: 'JFRL' },
  ];

  const trustItems = [
    {
      label: 'Achieve',
      text: isJa
        ? 'GMP認証取得工場にて製造され、ハラル・ヴィーガン・オーガニック認証原料を使用した製品です。'
        : 'GMP-certified manufacturing. Halal, Vegan, and Organic certified.',
    },
    {
      label: 'Confidence',
      text: isJa
        ? '厚生労働省が定める医薬部外品原料規格を満たした原料を使用しています。'
        : 'Materials compliant with Japanese quasi-drug ingredient standards.',
    },
  ];

  return (
    <motion.div
      className="bg-black border-2 border-[#25C760] rounded-lg p-4 md:p-8 my-5 md:my-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-4" style={{ color: '#25c760' }}>
        Our Trust
      </h2>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-12 opacity-80" />

      {/* Certification Logos */}
      <motion.div
        className="flex justify-center items-center gap-1 md:gap-10 mb-6 md:mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {certifications.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants}>
            <Image
              src={cert.src}
              alt={cert.alt}
              width={120}
              height={120}
              className="w-[15vw] max-w-[96px] md:w-auto md:h-24 object-contain transition-all duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Text */}
      <div className="flex justify-center">
        <div className="space-y-3 md:space-y-1 text-left inline-block">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-[10px] md:text-base"
            >
              <p className="text-green-400 font-semibold md:inline md:mr-4">{item.label}</p>
              <p className="text-gray-300 md:inline">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
