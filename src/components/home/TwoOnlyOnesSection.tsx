'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function TwoOnlyOnesSection() {
  return (
    <motion.div
      className="py-[60px] px-5 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-4">Two Only Ones</h2>

      {/* Description text */}
      <motion.div
        className="max-w-[1200px] mx-auto mb-8 py-[30px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-white text-center text-sm md:text-[1.1rem] leading-[1.8] whitespace-pre-line opacity-95" style={{ fontFamily: 'Arial, sans-serif' }}>
          {`The MOTHER VEGETABLE PROJECT is
the world's only project that aims to restore the Earth and all life,
centered around two one-of-a-kind businesses.

In this process, each facility purifies the atmosphere by absorbing CO\u2082
and generating oxygen 24 hours a day, 365 days a year,
while simultaneously contributing to improving the health of humans
and living organisms through Mother Vegetable products and the aquaculture of fish and shellfish.

Furthermore, by expanding these facilities around the world,
it will develop into eight additional industrial sectors.`}
        </p>
      </motion.div>

      {/* Two cards side by side */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Card I - Mother Vegetable */}
        <motion.div variants={cardVariants} className="flex flex-col">
          <div className="text-[#25C760] text-[2em] font-bold text-center mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>I</div>
          <div className="bg-black border border-[#25C760] rounded-lg p-[30px] max-[480px]:p-2.5 flex flex-col flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]">
            <h3 className="text-[#25C760] font-bold text-center text-[1.5rem] mb-[30px]" style={{ fontFamily: 'Arial, sans-serif' }}>Mother Vegetable</h3>
            <div className="flex justify-center mb-6">
              <Image
                src="/Images/Assets/homepage/mother-vegetable-microscopic.png"
                alt="Mother Vegetable Microscopic View"
                width={300}
                height={200}
                className="h-[200px] w-auto object-contain rounded max-[768px]:h-[150px] max-[480px]:h-[120px]"
              />
            </div>
            <p className="text-white text-[1rem] leading-[1.6] mb-5 max-[768px]:text-[0.9rem] max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
              By researching the evolutionary journey of Mother Vegetable, Earth&apos;s first vegetable, which culminated in humanity, we offer the following three types of Mother Vegetable products:
            </p>
            <div className="space-y-[15px] mb-5">
              <div className="text-white text-[1rem] leading-[1.6] max-[768px]:text-[0.9rem] max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="text-[#25C760] text-[1.2em] mr-2 font-bold">&#9312;</span>
                <strong className="text-[#25C760]">Food:</strong><br />
                <span>Food derived from a single life form that provides all 48 nutrients essential for humanity.</span>
              </div>
              <div className="text-white text-[1rem] leading-[1.6] max-[768px]:text-[0.9rem] max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="text-[#25C760] text-[1.2em] mr-2 font-bold">&#9313;</span>
                <strong className="text-[#25C760]">Skincare:</strong><br />
                <span>Skincare products designed to promote reverse aging effects for the skin.</span>
              </div>
              <div className="text-white text-[1rem] leading-[1.6] max-[768px]:text-[0.9rem] max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="text-[#25C760] text-[1.2em] mr-2 font-bold">&#9314;</span>
                <strong className="text-[#25C760]">Aquaculture:</strong><br />
                <span>Aquaculture of high-protein fish and shellfish raised with zero chemical inputs.</span>
              </div>
            </div>
            <div className="flex justify-center mt-auto">
              <video className="max-w-[300px] w-full h-auto rounded-lg max-[480px]:max-w-[200px]" autoPlay muted loop playsInline>
                <source src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/mazavege_top.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>

        {/* Card II - SEF */}
        <motion.div variants={cardVariants} className="flex flex-col">
          <div className="text-[#25C760] text-[2em] font-bold text-center mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>II</div>
          <div className="bg-black border border-[#25C760] rounded-lg p-[30px] max-[480px]:p-2.5 flex flex-col flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]">
            <h3 className="text-[#25C760] font-bold text-center text-[1.5rem] mb-[30px]" style={{ fontFamily: 'Arial, sans-serif' }}>Small Earth Factory (SEF)</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Image
                src="/Images/Assets/homepage/sef-solar-panels.jpg"
                alt="SEF Solar Panels"
                width={300}
                height={200}
                className="w-full h-[200px] object-cover rounded max-[768px]:h-[150px] max-[480px]:h-[120px]"
              />
              <Image
                src="/Images/Assets/homepage/sef.png"
                alt="SEF Greenhouse"
                width={300}
                height={200}
                className="w-full h-[200px] object-cover rounded max-[768px]:h-[150px] max-[480px]:h-[120px]"
              />
            </div>
            <div className="space-y-4 mb-5">
              <div className="text-white text-[1rem] leading-[1.6] max-[768px]:text-[0.9rem] max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="text-[#25C760] text-[1.2em] mr-2 font-bold">&#9312;</span>
                <strong className="text-[#25C760]">CO&#x2082; offset:</strong><br />
                <span>Recreating a small Earth through CO&#x2082; absorption (700 times that of natural cedar) and O&#x2082; emission by Mother Vegetable production.</span>
              </div>
              <div className="text-white text-[1rem] leading-[1.6] max-[768px]:text-[0.9rem] max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="text-[#25C760] text-[1.2em] mr-2 font-bold">&#9313;</span>
                <strong className="text-[#25C760]">ZERO Emission:</strong><br />
                <span>Recreating a small Earth without relying on any CO&#x2082;-emitting energy sources, including external electricity or fossil fuels.</span>
              </div>
            </div>
            <div className="flex justify-center mt-auto">
              <video className="max-w-[300px] w-full h-auto rounded-lg max-[480px]:max-w-[200px]" autoPlay muted loop playsInline>
                <source src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/sef_top.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
