'use client';

import { motion } from 'framer-motion';

export default function NewsSection() {
  return (
    <motion.div
      className="bg-black border-2 border-[#25C760] rounded-lg p-4 md:p-8 my-5 md:my-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-4" style={{ color: '#25c760' }}>
        News
      </h2>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-12 opacity-80" />
    </motion.div>
  );
}
