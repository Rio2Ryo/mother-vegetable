'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Search, X } from 'lucide-react';
import { products, type ProductData } from '@/data/products';
import { getStoredReferralCode } from '@/lib/affiliate';

const REFERRAL_DISCOUNT_RATE = 0.10;

const TOP_PAGE_PRODUCT_IMAGES: Record<string, string> = {
  achieve: '/cdn/products_achieve_10001.png',
  confidence: '/cdn/products_confidence_10001.png',
  tilapia: '/cdn/mv_tilapia.jpg',
  'mv-salt': '/cdn/mv_salt.jpg',
  'mv-soy-sauce': '/cdn/mv_soy_sauce_top.png',
  'mv-toner': '/cdn/mv_toner_top.png',
  'mv-balm': '/cdn/mv_balm.jpg',
  'mv-soap': '/cdn/mv_soap.jpg',
  'mv-miso': '/cdn/mv_miso_top.jpg',
  'mv-wasabi': '/cdn/mv_wasabi_top.png',
  'mv-matcha': '/cdn/mv_matcha_top.png',
  'mv-dressing': '/cdn/mv_dressing.png',
  'mv-olive': '/cdn/mv_olive.png',
  'mv-suncare': '/cdn/mv_suncare_top.png',
  'mv-body-mist': '/cdn/mv_body_mist_top.png',
  'mv-handcream': '/cdn/mv_handcream_top.png',
  'mv-ponzu': '/cdn/mv_ponzu_top.png',
  'mv-face-mist': '/cdn/mv_face_mist_top.png',
  'mv-hair-oil': '/cdn/mv_hair_oil_top.png',
  'mv-lipbalm': '/cdn/mv_lipbalm_top.png',
  'mv-vinegar': '/cdn/mv_vinegar_top.png',
  'mv-bathsalt': '/cdn/mv_bathsalt_top.png',
  'mv-ginger-tea': '/cdn/mv_ginger_tea_top.png',
  'mv-honey': '/cdn/mv_honey_top.png',
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [hasReferral, setHasReferral] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setHasReferral(Boolean(getStoredReferralCode()));
    });
  }, []);

  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === 'all' || product.category === filter;
    if (!matchesCategory) return false;

    if (!normalizedSearchQuery) return true;

    const searchableText = [
      product.name,
      product.nameJa,
      product.fullName,
      product.slug,
      product.description,
      product.descriptionJa,
      product.tagline,
      product.taglineJp,
      product.subtitle,
      product.sku,
      product.category,
      product.tier,
      product.producer,
      product.region,
      ...(product.regionTags ?? []),
      ...(product.storyTags ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedSearchQuery);
  });

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
      <section className="relative py-16 md:py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('Products', '製品一覧', '产品列表')}
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-8">
            {t(
              'Search our growing lineup of health and beauty products.',
              '健康と美容の製品ラインナップを検索できます。',
              '搜索我们不断扩展的健康与美容产品系列。',
            )}
          </p>

          <form
            className="mx-auto max-w-3xl"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex items-center gap-2 rounded-full border-2 border-[#25C760]/70 bg-white p-2 shadow-[0_18px_60px_rgba(37,199,96,0.25)] transition focus-within:border-[#25C760] focus-within:shadow-[0_22px_70px_rgba(37,199,96,0.35)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25C760] text-black md:h-14 md:w-14">
                <Search className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t(
                  'Search products, categories, ingredients...',
                  '商品名・カテゴリ・素材で検索',
                  '搜索商品、分类、原料...',
                )}
                aria-label={t('Search products', '商品を検索', '搜索商品')}
                className="h-12 min-w-0 flex-1 bg-transparent px-1 text-base font-medium text-black outline-none placeholder:text-gray-500 md:h-14 md:text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black"
                  aria-label={t('Clear search', '検索をクリア', '清除搜索')}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              <button
                type="submit"
                className="hidden rounded-full bg-[#25C760] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#2ee873] md:block"
              >
                {t('Search', '検索', '搜索')}
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              {t(
                `${filteredProducts.length} products found`,
                `${filteredProducts.length}件の商品が見つかりました`,
                `找到${filteredProducts.length}件商品`,
              )}
            </p>
          </form>
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
  const productImage = TOP_PAGE_PRODUCT_IMAGES[product.slug] || product.images[0] || '/Images/Assets/General/logo.png';

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
            src={productImage}
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
