'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  slug: string;
  publishedAt: string | null;
}

/* ------------------------------------------------------------------ */
/* Hardcoded fallback list (shown when no published news from API)     */
/* ------------------------------------------------------------------ */
const fallbackNewsList = [
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

function truncate(text: string, maxLen: number) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '...';
}

function formatDate(dateStr: string | null, isJa: boolean) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString(isJa ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function NewsSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/news')
      .then((res) => res.json())
      .then((data: NewsItem[]) => {
        setNews(Array.isArray(data) && data.length > 0 ? data.slice(0, 3) : null);
      })
      .catch(() => setNews(null))
      .finally(() => setLoading(false));
  }, []);

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

      {loading ? (
        /* Loading skeleton */
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 md:gap-6 border-b border-gray-700 pb-3 md:pb-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-24" />
              <div className="h-4 bg-white/10 rounded flex-1" />
            </div>
          ))}
        </div>
      ) : news ? (
        /* API news items */
        <div className="max-w-3xl mx-auto space-y-4">
          {news.map((item) => (
            <div key={item.id} className="flex items-start gap-3 md:gap-6 border-b border-gray-700 pb-3 md:pb-4">
              <span className="text-green-400 text-xs md:text-base font-mono whitespace-nowrap">
                {formatDate(item.publishedAt, isJa)}
              </span>
              <div className="flex-1">
                <span className="text-white text-xs md:text-base font-semibold">{item.title}</span>
                <p className="text-white/60 text-xs md:text-sm mt-1">
                  {truncate(item.content, 120)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Fallback hardcoded list */
        <div className="max-w-3xl mx-auto space-y-4">
          {fallbackNewsList.map((item, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-6 border-b border-gray-700 pb-3 md:pb-4">
              <span className="text-green-400 text-xs md:text-base font-mono whitespace-nowrap">{item.date}</span>
              <span className="text-white text-xs md:text-base">{isJa ? item.titleJa : item.titleEn}</span>
            </div>
          ))}
        </div>
      )}

      {/* View All link */}
      <div className="text-center mt-6 md:mt-8">
        <a
          href="/news"
          className="inline-block px-6 py-2 md:px-8 md:py-3 border-2 border-[#25c760] text-[#25c760] font-semibold text-sm md:text-base rounded-full hover:bg-[#25c760]/10 transition-colors"
        >
          {isJa ? 'すべてのニュースを見る' : 'View All News'}
        </a>
      </div>
    </motion.div>
  );
}
