'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { products, type ProductData } from '@/data/products';
import { getStoredReferralCode } from '@/lib/affiliate';

const REFERRAL_DISCOUNT_RATE = 0.10;

function parseJpyPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[¥,]/g, ''), 10);
}

function formatJpyPrice(amount: number): string {
  return '¥' + amount.toLocaleString();
}

type CategoryFilter = 'all' | 'food' | 'cosmetic';

function getCategoryLabel(category: string, locale: string): string {
  if (locale === 'ja') {
    if (category === 'food') return 'フード';
    if (category === 'cosmetic') return 'コスメ';
    if (category === 'pet') return 'ペット';
    return category;
  }
  if (locale === 'zh') {
    if (category === 'food') return '食品';
    if (category === 'cosmetic') return '化妆品';
    if (category === 'pet') return '宠物';
    return category;
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategoryBadgeColor(category: string): string {
  switch (category) {
    case 'food':
      return 'bg-[#25C760]/20 text-[#25C760] border-[#25C760]/40';
    case 'cosmetic':
      return 'bg-pink-500/20 text-pink-400 border-pink-500/40';
    case 'pet':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
}

export default function ProductsListingPage() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [hasReferral, setHasReferral] = useState(false);

  useEffect(() => {
    const code = getStoredReferralCode();
    if (code) setHasReferral(true);
  }, []);

  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const filteredProducts = filter === 'all'
    ? products
    : products.filter((p) => p.category === filter);

  const regularProducts = filteredProducts.filter((p) => p.tier === 'regular');
  const product100Products = filteredProducts.filter((p) => p.tier === 'product100');

  const tierLabels = {
    regular: t('Regular', 'レギュラー商品', '常规产品'),
    product100: t('Product 100', 'プロダクト100', 'Product 100'),
  };

  const filterButtons: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t('All', 'すべて', '全部') },
    { key: 'food', label: t('Food', 'フード', '食品') },
    { key: 'cosmetic', label: t('Cosmetic', 'コスメ', '化妆品') },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('Products', '製品一覧', '产品列表')}
          </h1>
          <p className="text-lg text-gray-300">
            {t(
              'Discover our complete range of health and beauty products.',
              '健康と美容の製品ラインナップをご覧ください。',
              '探索我们完整的健康与美容产品系列。',
            )}
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <div className="inline-flex border-b-2 border-[rgba(37,199,96,0.2)]">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`relative px-8 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none ${
                  filter === btn.key
                    ? 'text-[#25C760]'
                    : 'text-gray-400 hover:text-[#25C760]/70'
                }`}
              >
                {btn.label}
                {/* Active tab indicator */}
                <span
                  className={`absolute bottom-[-2px] left-0 w-full h-[2px] transition-all duration-300 ${
                    filter === btn.key
                      ? 'bg-[#25C760] scale-x-100'
                      : 'bg-transparent scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid - Tier Grouped */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Regular Products */}
          {regularProducts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: '#25C760' }}>
                {tierLabels.regular}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} t={t} hasReferral={hasReferral} />
                ))}
              </div>
            </div>
          )}

          {/* Product 100 */}
          {product100Products.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: '#25C760' }}>
                {tierLabels.product100}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {product100Products.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} t={t} hasReferral={hasReferral} />
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {t('No products found.', '製品が見つかりません。', '未找到产品。')}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  product,
  locale,
  t,
  hasReferral,
}: {
  product: ProductData;
  locale: string;
  t: (en: string, ja: string, zh: string) => string;
  hasReferral: boolean;
}) {
  const isJa = locale === 'ja';
  const priceJpy = product.priceJpy;

  const displayName = isJa && product.nameJa ? product.nameJa : product.name;
  const displayDescription = isJa && product.descriptionJa ? product.descriptionJa : product.description;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block border border-[rgba(37,199,96,0.3)] rounded-xl overflow-hidden bg-[rgba(37,199,96,0.02)] hover:bg-[rgba(37,199,96,0.08)] hover:border-[#25C760] transition-all duration-300 no-underline"
    >
      {/* Image or Video */}
      <div className="relative w-full aspect-square bg-black/50 flex items-center justify-center p-4">
        {product.slug === 'achieve' ? (
          <video
            src="/new_achieve_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : product.slug === 'confidence' ? (
          <video
            src="/new_confidence_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Image
            src={product.images[0] || '/Images/Assets/General/logo.png'}
            alt={product.fullName}
            width={300}
            height={300}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Category Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full border ${getCategoryBadgeColor(product.category)}`}
        >
          {getCategoryLabel(product.category, locale)}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h2 className="text-white text-lg font-bold mb-2 group-hover:text-[#25C760] transition-colors duration-300">
          {displayName}
        </h2>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {displayDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {isJa ? (
              hasReferral && priceJpy ? (
                <>
                  <span className="text-gray-500 line-through text-sm">
                    {priceJpy}
                  </span>
                  <span className="text-[#25C760] font-bold text-base">
                    {formatJpyPrice(Math.round(parseJpyPrice(priceJpy) * (1 - REFERRAL_DISCOUNT_RATE)))}
                  </span>
                  <span className="text-[10px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1.5 py-0.5">
                    10% OFF
                  </span>
                </>
              ) : (
                <span className="text-[#25C760] font-bold text-base">
                  {priceJpy}
                </span>
              )
            ) : (
              <>
                {hasReferral ? (
                  <>
                    <span className="text-gray-500 line-through text-sm">
                      USD {product.price.toFixed(2)}
                    </span>
                    <span className="text-[#25C760] font-bold text-base">
                      USD {(product.price * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2)}
                    </span>
                    <span className="text-[10px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1.5 py-0.5">
                      10% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-[#25C760] font-bold text-base">
                    USD {product.price.toFixed(2)}
                  </span>
                )}
                {priceJpy && !hasReferral && (
                  <span className="text-gray-500 text-sm ml-2">
                    ({priceJpy})
                  </span>
                )}
              </>
            )}
          </div>
          <span className="text-[#25C760] text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            {t('Details', '詳細', '详情')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
