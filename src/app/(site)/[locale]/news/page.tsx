import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'News — Mother Vegetable',
  description:
    'Stay up to date with the latest news, product launches, and announcements from Mother Vegetable.',
  openGraph: {
    title: 'News — Mother Vegetable',
    description:
      'Stay up to date with the latest news, product launches, and announcements from Mother Vegetable.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News — Mother Vegetable',
    description:
      'Stay up to date with the latest news, product launches, and announcements from Mother Vegetable.',
  },
};

interface NewsItem {
  id: string;
  title: string;
  content: string;
  slug: string;
  publishedAt: string | null;
}

function truncate(text: string, maxLen: number) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '...';
}

function formatDate(dateStr: string | null, locale: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === 'ja' ? 'ja-JP' : locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function fetchNews(): Promise<NewsItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/public/news`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function NewsListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';

  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const news = await fetchNews();

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('News', 'ニュース', '新闻')}
          </h1>
          <p className="text-lg text-gray-300">
            {t(
              'Stay up to date with the latest from Mother Vegetable.',
              'マザーベジタブルの最新情報をお届けします。',
              '了解 Mother Vegetable 的最新动态。',
            )}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {t('No news articles yet.', 'ニュース記事はまだありません。', '暂无新闻文章。')}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/news/${item.slug}`}
                  className="group block border border-[rgba(37,199,96,0.3)] rounded-xl p-6 bg-[rgba(37,199,96,0.02)] hover:bg-[rgba(37,199,96,0.08)] hover:border-[#25C760] transition-all duration-300 no-underline"
                >
                  <time className="text-[#25C760] text-sm font-mono block mb-3">
                    {formatDate(item.publishedAt, locale)}
                  </time>
                  <h2 className="text-white text-lg font-bold mb-3 group-hover:text-[#25C760] transition-colors duration-300">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {truncate(item.content, 200)}
                  </p>
                  <span className="text-[#25C760] text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    {t('Read More', '続きを読む', '阅读更多')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
