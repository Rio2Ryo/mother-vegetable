import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  slug: string;
  publishedAt: string | null;
}

async function fetchNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/public/news/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchNewsBySlug(slug);
  if (!article) {
    return { title: 'Not Found — Mother Vegetable' };
  }
  const description = article.content.length > 160
    ? article.content.slice(0, 160).trimEnd() + '...'
    : article.content;
  return {
    title: `${article.title} — Mother Vegetable News`,
    description,
    openGraph: {
      title: `${article.title} — Mother Vegetable News`,
      description,
    },
    twitter: {
      card: 'summary',
      title: `${article.title} — Mother Vegetable News`,
      description,
    },
  };
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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';

  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const article = await fetchNewsBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Back link */}
      <section className="pt-8 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-[#25C760] text-sm font-semibold no-underline hover:text-white transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            {t('Back to News', 'ニュース一覧へ', '返回新闻列表')}
          </Link>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <time className="text-[#25C760] text-sm font-mono block mb-4">
            {formatDate(article.publishedAt, locale)}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="w-full h-px bg-[rgba(37,199,96,0.3)] mb-8" />
          <div className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </article>

      {/* Bottom back link */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href={`/${locale}/news`}
            className="inline-block px-8 py-3 border-2 border-[#25C760] text-[#25C760] font-semibold text-base rounded-full hover:bg-[#25C760]/10 transition-colors duration-300 no-underline"
          >
            {t('View All News', 'すべてのニュースを見る', '查看所有新闻')}
          </Link>
        </div>
      </section>
    </main>
  );
}
