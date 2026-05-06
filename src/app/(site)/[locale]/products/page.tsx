'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Search, X, MapPin, Tag, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { products, type ProductData } from '@/data/products';
import { STORY_TAGS } from '@/data/tags';
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

// Derive unique region tags and story tags actually used in the products list
const ALL_REGION_TAGS = Array.from(
  new Set(products.flatMap((p) => p.regionTags ?? []))
).sort();

const ALL_STORY_TAG_KEYS = Array.from(
  new Set(products.flatMap((p) => p.storyTags ?? []))
);

type CategoryFilter = 'all' | 'food' | 'cosmetic' | 'pet';

interface FilterState {
  category: CategoryFilter;
  regionTags: Set<string>;
  storyTags: Set<string>;
  searchQuery: string;
}

function toggleSet(prev: Set<string>, key: string): Set<string> {
  const next = new Set(prev);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  return next;
}

export default function ProductsListingPage() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';
  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const [filter, setFilter] = useState<FilterState>({
    category: 'all',
    regionTags: new Set(),
    storyTags: new Set(),
    searchQuery: '',
  });
  const [hasReferral, setHasReferral] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [regionExpanded, setRegionExpanded] = useState(true);
  const [storyExpanded, setStoryExpanded] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      setHasReferral(Boolean(getStoredReferralCode()));
    });
  }, []);

  const filteredProducts = useMemo(() => {
    const q = filter.searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      // Category filter
      if (filter.category !== 'all' && p.category !== filter.category) return false;
      // Region tag filter (OR within selected)
      if (filter.regionTags.size > 0) {
        const hit = (p.regionTags ?? []).some((r) => filter.regionTags.has(r));
        if (!hit) return false;
      }
      // Story tag filter (OR within selected)
      if (filter.storyTags.size > 0) {
        const hit = (p.storyTags ?? []).some((s) => filter.storyTags.has(s));
        if (!hit) return false;
      }
      // Full-text search
      if (q) {
        const text = [
          p.name, p.nameJa, p.fullName, p.slug,
          p.description, p.descriptionJa,
          p.tagline, p.taglineJp, p.subtitle, p.sku,
          p.category, p.tier,
          p.producer, p.region,
          p.storyDescription,
          ...(p.regionTags ?? []),
          ...(p.storyTags ?? []),
        ].filter(Boolean).join(' ').toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [filter]);

  const regularProducts = filteredProducts.filter((p) => p.tier === 'regular');
  const product100Products = filteredProducts.filter((p) => p.tier === 'product100');

  const activeFilterCount =
    (filter.category !== 'all' ? 1 : 0) +
    filter.regionTags.size +
    filter.storyTags.size;

  const clearAllFilters = () =>
    setFilter((f) => ({ ...f, category: 'all', regionTags: new Set(), storyTags: new Set() }));

  const categoryButtons: { key: CategoryFilter; ja: string; en: string; zh: string }[] = [
    { key: 'all', ja: 'すべて', en: 'All', zh: '全部' },
    { key: 'food', ja: 'フード', en: 'Food', zh: '食品' },
    { key: 'cosmetic', ja: 'コスメ', en: 'Cosmetic', zh: '化妆品' },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ── Hero / Search bar ─────────────────────────────────────────── */}
      <section className="relative py-12 md:py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            {t('Products', '製品一覧', '产品列表')}
          </h1>
          <p className="text-sm md:text-base text-gray-400 mb-6">
            {t(
              'Find products by story, region, and maker.',
              '作り手の物語・地域・思いから、あなたの商品に出会う。',
              '通过故事、地区和制造商找到您的产品。',
            )}
          </p>

          <form
            className="mx-auto max-w-3xl"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex items-center gap-2 rounded-full border-2 border-[#25C760]/70 bg-white p-2 shadow-[0_18px_60px_rgba(37,199,96,0.25)] transition focus-within:border-[#25C760] focus-within:shadow-[0_22px_70px_rgba(37,199,96,0.35)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25C760] text-black md:h-14 md:w-14">
                <Search className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={filter.searchQuery}
                onChange={(e) => setFilter((f) => ({ ...f, searchQuery: e.target.value }))}
                placeholder={t(
                  'Search by product, maker, region, story…',
                  '商品名・作り手・地域・ストーリーで検索',
                  '搜索商品、制造商、地区、故事…',
                )}
                aria-label={t('Search products', '商品を検索', '搜索商品')}
                className="h-12 min-w-0 flex-1 bg-transparent px-1 text-base font-medium text-black outline-none placeholder:text-gray-500 md:h-14 md:text-lg"
              />
              {filter.searchQuery && (
                <button
                  type="button"
                  onClick={() => setFilter((f) => ({ ...f, searchQuery: '' }))}
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
            <p className="mt-2 text-sm text-gray-500">
              {t(
                `${filteredProducts.length} products found`,
                `${filteredProducts.length}件の商品が見つかりました`,
                `找到${filteredProducts.length}件商品`,
              )}
            </p>
          </form>
        </div>
      </section>

      {/* ── Body: Sidebar + Grid ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pb-20 lg:flex lg:gap-8">

        {/* Mobile: filter toggle button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(37,199,96,0.4)] text-sm font-semibold text-[#25C760] hover:bg-[rgba(37,199,96,0.08)] transition"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t('Filter', 'フィルタ', '筛选')}
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-[#25C760] text-black text-xs px-2 py-0.5 font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-400 hover:text-white underline transition"
            >
              {t('Clear all', 'すべて解除', '清除全部')}
            </button>
          )}
        </div>

        {/* ── Sidebar ────────────────────────────────────────────────── */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block lg:w-56 xl:w-64 shrink-0 mb-6 lg:mb-0`}
        >
          <div className="sticky top-4 space-y-6">
            {/* Clear filters (desktop) */}
            {activeFilterCount > 0 && (
              <div className="hidden lg:flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t('Filters', 'フィルタ', '筛选')} ({activeFilterCount})
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-white underline transition"
                >
                  {t('Clear all', 'すべて解除', '清除全部')}
                </button>
              </div>
            )}

            {/* Category */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {t('Category', 'カテゴリ', '分类')}
              </p>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {categoryButtons.map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setFilter((f) => ({ ...f, category: btn.key }))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition text-left ${
                      filter.category === btn.key
                        ? 'bg-[#25C760] text-black'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isJa ? btn.ja : isZh ? btn.zh : btn.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Region tags */}
            {ALL_REGION_TAGS.length > 0 && (
              <div>
                <button
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  onClick={() => setRegionExpanded((v) => !v)}
                >
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {t('Region', '地域', '地区')}
                  </span>
                  {regionExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {regionExpanded && (
                  <div className="space-y-1">
                    {ALL_REGION_TAGS.map((tag) => (
                      <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filter.regionTags.has(tag)}
                          onChange={() =>
                            setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))
                          }
                          className="accent-[#25C760] h-3.5 w-3.5 rounded"
                        />
                        <span
                          className={`text-sm transition ${
                            filter.regionTags.has(tag) ? 'text-[#25C760] font-medium' : 'text-gray-300 group-hover:text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Story tags */}
            {ALL_STORY_TAG_KEYS.length > 0 && (
              <div>
                <button
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  onClick={() => setStoryExpanded((v) => !v)}
                >
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {t('Story Tags', 'ストーリータグ', '故事标签')}
                  </span>
                  {storyExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {storyExpanded && (
                  <div className="space-y-1">
                    {ALL_STORY_TAG_KEYS.map((key) => {
                      const def = STORY_TAGS.find((s) => s.key === key);
                      if (!def) return null;
                      return (
                        <label key={key} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filter.storyTags.has(key)}
                            onChange={() =>
                              setFilter((f) => ({ ...f, storyTags: toggleSet(f.storyTags, key) }))
                            }
                            className="accent-[#25C760] h-3.5 w-3.5 rounded"
                          />
                          <span
                            className={`text-sm transition ${
                              filter.storyTags.has(key) ? 'text-[#25C760] font-medium' : 'text-gray-300 group-hover:text-white'
                            }`}
                          >
                            {def.icon} {isJa ? def.labelJa : def.labelEn}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* ── Product grid ───────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips (inline summary) */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {filter.category !== 'all' && (
                <FilterChip
                  label={isJa
                    ? (categoryButtons.find((b) => b.key === filter.category)?.ja ?? filter.category)
                    : (categoryButtons.find((b) => b.key === filter.category)?.en ?? filter.category)}
                  onRemove={() => setFilter((f) => ({ ...f, category: 'all' }))}
                />
              )}
              {[...filter.regionTags].map((tag) => (
                <FilterChip
                  key={tag}
                  label={tag}
                  onRemove={() => setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))}
                />
              ))}
              {[...filter.storyTags].map((key) => {
                const def = STORY_TAGS.find((s) => s.key === key);
                return (
                  <FilterChip
                    key={key}
                    label={def ? `${def.icon} ${isJa ? def.labelJa : def.labelEn}` : key}
                    onRemove={() => setFilter((f) => ({ ...f, storyTags: toggleSet(f.storyTags, key) }))}
                  />
                );
              })}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">
                {t('No products found.', '製品が見つかりません。', '未找到产品。')}
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-[#25C760] text-sm underline hover:no-underline"
              >
                {t('Clear all filters', 'フィルタを解除する', '清除所有筛选')}
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {regularProducts.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-[#25C760]">
                    {t('Regular', 'レギュラー商品', '常规产品')}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {regularProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        locale={locale}
                        isJa={isJa}
                        t={t}
                        hasReferral={hasReferral}
                        onTagClick={(tag) =>
                          setFilter((f) => ({ ...f, storyTags: toggleSet(f.storyTags, tag) }))
                        }
                        onRegionClick={(tag) =>
                          setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))
                        }
                      />
                    ))}
                  </div>
                </section>
              )}

              {product100Products.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-[#25C760]">
                    {t('MV Product 100', 'MV プロダクト100', 'MV Product 100')}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {product100Products.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        locale={locale}
                        isJa={isJa}
                        t={t}
                        hasReferral={hasReferral}
                        onTagClick={(tag) =>
                          setFilter((f) => ({ ...f, storyTags: toggleSet(f.storyTags, tag) }))
                        }
                        onRegionClick={(tag) =>
                          setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))
                        }
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#25C760]/20 text-[#25C760] border border-[#25C760]/40">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full hover:bg-[#25C760]/30 transition p-0.5"
        aria-label="remove filter"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function ProductCard({
  product,
  locale,
  isJa,
  t,
  hasReferral,
  onTagClick,
  onRegionClick,
}: {
  product: ProductData;
  locale: string;
  isJa: boolean;
  t: (en: string, ja: string, zh: string) => string;
  hasReferral: boolean;
  onTagClick: (tag: string) => void;
  onRegionClick: (tag: string) => void;
}) {
  const displayName = isJa && product.nameJa ? product.nameJa : product.name;
  const priceJpy = product.priceJpy;
  const productImage = TOP_PAGE_PRODUCT_IMAGES[product.slug] || product.images[0] || '/Images/Assets/General/logo.png';

  return (
    <div className="flex flex-col border border-[rgba(37,199,96,0.25)] rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.02)] hover:border-[#25C760]/60 hover:bg-[rgba(37,199,96,0.04)] transition-all duration-300 group">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative block w-full aspect-[4/3] bg-black/50 overflow-hidden">
        {product.slug === 'achieve' ? (
          <video
            src="/new_achieve_video.mp4"
            autoPlay loop muted playsInline
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : product.slug === 'confidence' ? (
          <video
            src="/new_confidence_video.mp4"
            autoPlay loop muted playsInline
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image
            src={productImage}
            alt={product.fullName}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {/* Category badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full border ${getCategoryBadgeColor(product.category)}`}>
          {getCategoryLabel(product.category, locale)}
        </span>
        {/* Story tag badge (first tag) */}
        {product.storyTags?.[0] && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-black/70 text-gray-300 border border-white/10 backdrop-blur-sm">
            {getStoryTagIcon(product.storyTags[0])}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name */}
        <Link href={`/product/${product.slug}`} className="no-underline">
          <h2 className="text-white font-bold text-base leading-snug group-hover:text-[#25C760] transition-colors duration-300 line-clamp-1">
            {displayName}
          </h2>
        </Link>

        {/* Producer + Region */}
        {(product.producer || product.region) && (
          <div className="flex items-start gap-1.5 text-xs text-gray-400">
            <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#25C760]/70 shrink-0" />
            <span>
              {product.producer && <span className="text-gray-300">{product.producer}</span>}
              {product.producer && product.region && <span className="mx-1 text-gray-600">·</span>}
              {product.region && <span>{product.region}</span>}
            </span>
          </div>
        )}

        {/* Story description */}
        {product.storyDescription && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {product.storyDescription}
          </p>
        )}

        {/* Story + region tags */}
        {((product.storyTags?.length ?? 0) > 0 || (product.regionTags?.length ?? 0) > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {product.storyTags?.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => { e.preventDefault(); onTagClick(tag); }}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#25C760]/10 text-[#25C760] border border-[#25C760]/25 hover:bg-[#25C760]/20 transition cursor-pointer"
              >
                {getStoryTagDisplay(tag, isJa)}
              </button>
            ))}
            {product.regionTags?.slice(0, 2).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => { e.preventDefault(); onRegionClick(tag); }}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-300 transition cursor-pointer"
              >
                📍 {tag}
              </button>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <PriceDisplay product={product} locale={locale} isJa={isJa} hasReferral={hasReferral} />
          <Link
            href={`/product/${product.slug}`}
            className="shrink-0 ml-3 rounded-full bg-[#25C760] text-black text-xs font-bold px-4 py-2 hover:bg-[#2ee873] transition no-underline"
          >
            {t('Details', '詳細', '详情')}
          </Link>
        </div>
      </div>
    </div>
  );
}

function PriceDisplay({
  product,
  locale,
  isJa,
  hasReferral,
}: {
  product: ProductData;
  locale: string;
  isJa: boolean;
  hasReferral: boolean;
}) {
  const priceJpy = product.priceJpy;
  if (isJa) {
    if (hasReferral && priceJpy) {
      const discounted = formatJpyPrice(
        Math.round(parseJpyPrice(priceJpy) * (1 - REFERRAL_DISCOUNT_RATE))
      );
      return (
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="line-through text-gray-600 text-xs">{priceJpy}</span>
          <span className="text-[#25C760] font-bold text-sm">{discounted}</span>
          <span className="text-[10px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1.5 py-0.5">10%OFF</span>
        </div>
      );
    }
    return <span className="text-[#25C760] font-bold text-sm">{priceJpy}</span>;
  }
  // non-JA
  if (hasReferral) {
    const discounted = (product.price * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2);
    return (
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="line-through text-gray-600 text-xs">USD {product.price.toFixed(2)}</span>
        <span className="text-[#25C760] font-bold text-sm">USD {discounted}</span>
        <span className="text-[10px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1.5 py-0.5">10%OFF</span>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[#25C760] font-bold text-sm">USD {product.price.toFixed(2)}</span>
      {priceJpy && <span className="text-gray-600 text-xs">({priceJpy})</span>}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStoryTagDisplay(key: string, isJa: boolean): string {
  const def = STORY_TAGS.find((s) => s.key === key);
  if (!def) return key;
  return `${def.icon} ${isJa ? def.labelJa : def.labelEn}`;
}

function getStoryTagIcon(key: string): string {
  const def = STORY_TAGS.find((s) => s.key === key);
  return def ? def.icon : '🏷';
}

function getCategoryLabel(category: string, locale: string): string {
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';
  if (category === 'food') return isJa ? 'フード' : isZh ? '食品' : 'Food';
  if (category === 'cosmetic') return isJa ? 'コスメ' : isZh ? '化妆品' : 'Cosmetic';
  if (category === 'pet') return isJa ? 'ペット' : isZh ? '宠物' : 'Pet';
  return category;
}

function getCategoryBadgeColor(category: string): string {
  switch (category) {
    case 'food':     return 'bg-[#25C760]/20 text-[#25C760] border-[#25C760]/40';
    case 'cosmetic': return 'bg-pink-500/20 text-pink-400 border-pink-500/40';
    case 'pet':      return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    default:         return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
}
