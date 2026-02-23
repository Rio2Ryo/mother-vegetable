'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

/* ------------------------------------------------------------------ */
/* ニュースリスト（ここを編集するだけで表示が更新されます）                    */
/* ------------------------------------------------------------------ */
const newsList = [
  {
    date: '2026.02.23',
    titleJa: 'TOPページを大幅修正しました',
    titleEn: 'Major update to the TOP page',
  },
  {
    date: '2026.02.10',
    titleJa: 'マザベジAIをリリースしました',
    titleEn: 'Mother Vegetable AI has been released',
  },
  {
    date: '2026.01.15',
    titleJa: 'ECサイト公開しました',
    titleEn: 'EC site has been launched',
  },
];

export default function NewsSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';

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

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-8 opacity-80" />

      {/* News List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {newsList.map((news, index) => (
          <div key={index} className="flex items-start gap-3 md:gap-6 border-b border-gray-700 pb-3 md:pb-4">
            <span className="text-green-400 text-xs md:text-base font-mono whitespace-nowrap">{news.date}</span>
            <span className="text-white text-xs md:text-base">{isJa ? news.titleJa : news.titleEn}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
