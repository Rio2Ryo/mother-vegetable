'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Search, X, MapPin, Tag, SlidersHorizontal, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { products, type ProductData } from '@/data/products';
import { STORY_TAGS, PROPOSER_TAGS, getProposerTagDef } from '@/data/tags';
import { getStoredReferralCode } from '@/lib/affiliate';
import { useCartStore } from '@/store/cart';

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

const MOBILE_PRODUCT_IMAGES: Record<string, string> = {
  tilapia: '/cdn/mobile-cards/tilapia.webp',
  'mv-salt': '/cdn/mobile-cards/mv-salt.webp',
  'mv-soy-sauce': '/cdn/mobile-cards/mv-soy-sauce.webp',
  'mv-toner': '/cdn/mobile-cards/mv-toner.webp',
  'mv-balm': '/cdn/mobile-cards/mv-balm.webp',
  'mv-soap': '/cdn/mobile-cards/mv-soap.webp',
  'mv-miso': '/cdn/mobile-cards/mv-miso.webp',
  'mv-wasabi': '/cdn/mobile-cards/mv-wasabi.webp',
  'mv-matcha': '/cdn/mobile-cards/mv-matcha.webp',
  'mv-dressing': '/cdn/mobile-cards/mv-dressing.webp',
  'mv-olive': '/cdn/mobile-cards/mv-olive.webp',
  'mv-suncare': '/cdn/mobile-cards/mv-suncare.webp',
  'mv-body-mist': '/cdn/mobile-cards/mv-body-mist.webp',
  'mv-handcream': '/cdn/mobile-cards/mv-handcream.webp',
  'mv-ponzu': '/cdn/mobile-cards/mv-ponzu.webp',
  'mv-face-mist': '/cdn/mobile-cards/mv-face-mist.webp',
  'mv-hair-oil': '/cdn/mobile-cards/mv-hair-oil.webp',
  'mv-lipbalm': '/cdn/mobile-cards/mv-lipbalm.webp',
  'mv-vinegar': '/cdn/mobile-cards/mv-vinegar.webp',
  'mv-bathsalt': '/cdn/mobile-cards/mv-bathsalt.webp',
  'mv-ginger-tea': '/cdn/mobile-cards/mv-ginger-tea.webp',
  'mv-honey': '/cdn/mobile-cards/mv-honey.webp',
};

const PRODUCT_NAME_EN: Record<string, string> = {
  tilapia: 'MV Fish',
  'mv-salt': 'MV Salt',
  'mv-soy-sauce': 'MV Soy Sauce',
  'mv-toner': 'MV Toner',
  'mv-balm': 'MV Balm',
  'mv-soap': 'MV Soap',
  'mv-miso': 'MV Miso',
  'mv-wasabi': 'MV Wasabi',
  'mv-matcha-latte': 'MV Matcha Latte Mix',
  'mv-green-smoothie': 'MV Green Smoothie',
  'mv-matcha': 'MV Matcha',
  'mv-olive': 'MV Olive Oil',
  'mv-dressing': 'MV Dressing',
  'mv-herb-salt': 'MV Herb Salt',
  'mv-handcream': 'MV Hand Cream',
  'mv-suncare': 'MV Suncare Gel',
  'mv-body-mist': 'MV Body Mist',
  'mv-ponzu': 'MV Ponzu',
  'mv-tsuyu': 'MV Mentsuyu',
  'mv-furikake': 'MV Furikake',
  'mv-lipbalm': 'MV Lip Balm',
  'mv-face-mist': 'MV Face Mist',
  'mv-hair-oil': 'MV Hair Oil',
  'mv-vinegar': 'MV Vinegar',
  'mv-ponzu-yuzu': 'MV Yuzu Ponzu',
  'mv-cooking-sake': 'MV Cooking Sake',
  'mv-bathsalt': 'MV Bath Salt',
  'mv-bath-bomb': 'MV Bath Bomb',
  'mv-body-cream': 'MV Body Cream',
  'mv-honey': 'MV Honey',
  'mv-ginger-tea': 'MV Ginger Tea',
  'mv-manuka': 'MV Manuka Blend',
};

const PRODUCER_EN: Record<string, string> = {
  '河津町漁協': 'Kawazu Fisheries Cooperative',
  '伊豆海塩工房': 'Izu Sea Salt Studio',
  '河津醸造': 'Kawazu Brewery',
  '伊豆コスメ工房': 'Izu Cosmetics Studio',
  '河津味噌蔵': 'Kawazu Miso Brewery',
  '伊豆わさび農園': 'Izu Wasabi Farm',
  '静岡茶園': 'Shizuoka Tea Farm',
  '伊豆養蜂園': 'Izu Apiary',
};

const REGION_EN: Record<string, string> = {
  '静岡県': 'Shizuoka, Japan',
  '静岡県 河津町': 'Kawazu, Shizuoka, Japan',
  '静岡県 伊豆': 'Izu, Shizuoka, Japan',
  '河津町': 'Kawazu',
  '伊豆': 'Izu',
  '伊豆諸島': 'Izu Islands',
  '沖縄': 'Okinawa',
  '北海道': 'Hokkaido',
};

const STORY_DESCRIPTION_EN: Record<string, string> = {
  achieve: 'An additive-free supplement with 48 nutrients, developed by Mother Vegetable Lab in Shizuoka.',
  confidence: 'An additive-free, naturally derived skincare gel made for every skin type.',
  tilapia: 'MV Fish with 48 nutrients, raised through a local partnership with the Kawazu Fisheries Cooperative.',
  'mv-salt': 'Mineral-rich sea salt with 48 nutrients, slowly cooked from Izu seawater using a traditional flat-kettle method.',
  'mv-soy-sauce': 'Soy sauce with 48 nutrients, crafted by a long-established Kawazu brewery using traditional cedar barrels.',
  'mv-toner': 'An additive-free toner with natural collagen, developed by a lab in Shizuoka.',
  'mv-balm': 'A luxury balm with natural collagen, carefully blended by a lab in Shizuoka.',
  'mv-soap': 'A nutrient-infused soap handmade by an Izu cosmetics studio using a traditional cold-process method.',
  'mv-miso': 'Premium miso with 48 nutrients, long-aged with natural koji by a Kawazu miso brewery.',
  'mv-wasabi': 'A limited regional collaboration product made with natural wasabi grown in the clear streams of Izu.',
  'mv-matcha-latte': 'A latte mix blending stone-milled matcha from a long-established Shizuoka tea farm with 48 nutrients.',
  'mv-green-smoothie': 'A daily green smoothie blending organic greens with 48 nutrients, developed by a lab in Shizuoka.',
  'mv-matcha': 'Stone-milled matcha powder from a long-established Shizuoka tea farm, blended with 48 nutrients.',
  'mv-olive': 'Extra virgin olive oil made from selected organic olives in Shizuoka and blended with 48 nutrients.',
  'mv-dressing': 'An additive-free dressing with 48 nutrients, made from carefully selected oils and vinegars by a Shizuoka lab.',
  'mv-handcream': 'A hand cream with organic natural collagen, developed by a Shizuoka lab to protect hands.',
  'mv-suncare': 'An additive-free suncare gel made with 100% organic plant-derived ingredients, developed by a Shizuoka lab.',
  'mv-body-mist': 'An additive-free body mist with natural nutrients, developed by a Shizuoka lab.',
  'mv-ponzu': 'Citrus ponzu with 48 nutrients, brewed using a traditional method by a long-established Kawazu brewery.',
  'mv-lipbalm': 'An additive-free lip balm with natural collagen, handmade by a Shizuoka lab for soft, plump lips.',
  'mv-face-mist': 'An additive-free face mist with natural collagen, developed by a Shizuoka lab for daytime hydration.',
  'mv-hair-oil': 'Hair oil made from a selected blend of organic plant oils by a Shizuoka lab.',
  'mv-vinegar': 'Premium rice vinegar with 48 nutrients, made by a long-established Kawazu brewery using static fermentation.',
  'mv-bathsalt': 'Traditional bath salt made with mineral-rich Izu sea salt and 48 nutrients.',
  'mv-honey': 'Limited honey blended with 48 nutrients, gathered from regional flowers by an Izu apiary.',
  'mv-ginger-tea': 'A warming ginger tea with 48 nutrients, blended by a long-established Shizuoka tea farm using Japanese ginger.',
  'mv-manuka': 'A limited premium blend of New Zealand manuka honey and 48 nutrients, developed by a Shizuoka lab.',
};

function localizeProductName(product: ProductData, isJa: boolean): string {
  if (isJa) return product.nameJa ?? product.name;
  return PRODUCT_NAME_EN[product.slug] ?? product.name;
}

function localizeProducer(value: string | undefined, isJa: boolean): string | undefined {
  if (!value || isJa) return value;
  return PRODUCER_EN[value] ?? value;
}

function localizeRegion(value: string | undefined, isJa: boolean): string | undefined {
  if (!value || isJa) return value;
  return REGION_EN[value] ?? value;
}

function localizeStoryDescription(product: ProductData, isJa: boolean): string | undefined {
  if (isJa) return product.storyDescription;
  return STORY_DESCRIPTION_EN[product.slug] ?? product.description;
}

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
  proposerTags: Set<string>;
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

export default function ProductsListing({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';
  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const [filter, setFilter] = useState<FilterState>({
    category: 'all',
    regionTags: new Set(),
    storyTags: new Set(),
    proposerTags: new Set(),
    searchQuery: '',
  });
  const [hasReferral, setHasReferral] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [regionExpanded, setRegionExpanded] = useState(true);
  const [storyExpanded, setStoryExpanded] = useState(true);
  const [proposerExpanded, setProposerExpanded] = useState(true);

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
      // Proposer tag filter (OR within selected)
      if (filter.proposerTags.size > 0) {
        const hit = (p.proposerTags ?? []).some((pt) => filter.proposerTags.has(pt));
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
          ...(p.proposerTags ?? []),
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
    filter.storyTags.size +
    filter.proposerTags.size;

  const clearAllFilters = () =>
    setFilter((f) => ({ ...f, category: 'all', regionTags: new Set(), storyTags: new Set(), proposerTags: new Set() }));

  const categoryButtons: { key: CategoryFilter; ja: string; en: string; zh: string }[] = [
    { key: 'all', ja: 'すべて', en: 'All', zh: '全部' },
    { key: 'food', ja: 'フード', en: 'Food', zh: '食品' },
    { key: 'cosmetic', ja: 'コスメ', en: 'Cosmetic', zh: '化妆品' },
  ];

  return (
    <div className={`bg-black text-white ${embedded ? '' : 'min-h-screen'}`}>
      {/* ── Compact sticky header ─────────────────────────────────────── */}
      <header className={`${embedded ? 'relative' : 'sticky top-0'} z-30 bg-black/90 backdrop-blur-md border-b border-white/5 px-4`}>
        <div className="max-w-7xl mx-auto h-16 flex items-center gap-4">
          {/* Left: title */}
          <span className="shrink-0 text-xs font-semibold text-gray-400 hidden sm:block">
            {t('Products', '製品一覧', '产品列表')}
          </span>

          {/* Center: search input */}
          <form
            className="flex-1 flex items-center"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full max-w-md mx-auto flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-[#25C760]/70 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={filter.searchQuery}
                onChange={(e) => setFilter((f) => ({ ...f, searchQuery: e.target.value }))}
                placeholder={t(
                  'Search products…',
                  '商品名・地域・ストーリーで検索',
                  '搜索商品…',
                )}
                aria-label={t('Search products', '商品を検索', '搜索商品')}
                className="w-full h-9 pl-9 pr-8 bg-white/5 border border-[#25C760]/40 rounded-full text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#25C760] focus:bg-white/8 transition"
              />
              {filter.searchQuery && (
                <button
                  type="button"
                  onClick={() => setFilter((f) => ({ ...f, searchQuery: '' }))}
                  className="absolute right-2 flex items-center justify-center rounded-full text-gray-500 hover:text-white transition"
                  aria-label={t('Clear search', '検索をクリア', '清除搜索')}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </form>

          {/* Right: count badge */}
          <span className="shrink-0 text-xs font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760]/40 rounded-full px-3 py-1 whitespace-nowrap">
            {filteredProducts.length}{t(' items', '件', '件')}
          </span>
        </div>
      </header>

      {/* ── Body: Sidebar + Grid ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20 lg:flex lg:gap-8">

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
          <div className="sticky top-20 space-y-6">
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

            {/* Proposer tags */}
            <div>
              <button
                className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                onClick={() => setProposerExpanded((v) => !v)}
              >
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {t('Proposer', '発案者', '提案者')}
                </span>
                {proposerExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {proposerExpanded && (
                <div className="space-y-1">
                  {PROPOSER_TAGS.map((def) => (
                    <label key={def.key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filter.proposerTags.has(def.key)}
                        onChange={() =>
                          setFilter((f) => ({ ...f, proposerTags: toggleSet(f.proposerTags, def.key) }))
                        }
                        className="accent-[#25C760] h-3.5 w-3.5 rounded"
                      />
                      <span
                        className={`text-sm transition flex items-center gap-1.5 ${
                          filter.proposerTags.has(def.key) ? 'text-[#25C760] font-medium' : 'text-gray-300 group-hover:text-white'
                        }`}
                      >
                        {def.faceImage ? (
                          <Image
                            src={def.faceImage}
                            alt={def.labelJa}
                            width={18}
                            height={18}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs">{def.icon}</span>
                        )}
                        {isJa ? def.labelJa : def.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
              )}
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
                          {localizeRegion(tag, isJa)}
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
                            {isJa ? def.labelJa : def.labelEn}
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
              {[...filter.proposerTags].map((key) => {
                const def = getProposerTagDef(key);
                return (
                  <FilterChip
                    key={key}
                    label={def ? `${def.icon} ${isJa ? def.labelJa : def.labelEn}` : key}
                    onRemove={() => setFilter((f) => ({ ...f, proposerTags: toggleSet(f.proposerTags, key) }))}
                  />
                );
              })}
              {[...filter.regionTags].map((tag) => (
                <FilterChip
                  key={tag}
                    label={localizeRegion(tag, isJa) ?? tag}
                  onRemove={() => setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))}
                />
              ))}
              {[...filter.storyTags].map((key) => {
                const def = STORY_TAGS.find((s) => s.key === key);
                return (
                  <FilterChip
                    key={key}
                    label={def ? (isJa ? def.labelJa : def.labelEn) : key}
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
                        isJa={isJa}
                        t={t}
                        hasReferral={hasReferral}
                        onTagClick={(tag) =>
                          setFilter((f) => ({ ...f, storyTags: toggleSet(f.storyTags, tag) }))
                        }
                        onRegionClick={(tag) =>
                          setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))
                        }
                        onProposerClick={(tag) =>
                          setFilter((f) => ({ ...f, proposerTags: new Set([tag]) }))
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
                        isJa={isJa}
                        t={t}
                        hasReferral={hasReferral}
                        onTagClick={(tag) =>
                          setFilter((f) => ({ ...f, storyTags: toggleSet(f.storyTags, tag) }))
                        }
                        onRegionClick={(tag) =>
                          setFilter((f) => ({ ...f, regionTags: toggleSet(f.regionTags, tag) }))
                        }
                        onProposerClick={(tag) =>
                          setFilter((f) => ({ ...f, proposerTags: new Set([tag]) }))
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
  isJa,
  t,
  hasReferral,
  onTagClick,
  onRegionClick,
  onProposerClick,
}: {
  product: ProductData;
  isJa: boolean;
  t: (en: string, ja: string, zh: string) => string;
  hasReferral: boolean;
  onTagClick: (tag: string) => void;
  onRegionClick: (tag: string) => void;
  onProposerClick: (tag: string) => void;
}) {
  const displayName = localizeProductName(product, isJa);
  const productImage = TOP_PAGE_PRODUCT_IMAGES[product.slug] || product.images[0] || '/Images/Assets/General/logo.png';
  const mobileProductImage = MOBILE_PRODUCT_IMAGES[product.slug];
  const mainStoryTag = product.storyTags?.[0];
  const secondaryStoryTags = product.storyTags?.slice(1) ?? [];

  // Resolve proposer info for the face strip. Product100 must always show a face below the image.
  const firstProposerKey = product.proposerTags?.[0];
  const proposerKey = firstProposerKey ?? (product.tier === 'product100' ? 'マザーベジタブル社' : undefined);
  const defaultProposerDef = getProposerTagDef('マザーベジタブル社');
  const proposerDef = (firstProposerKey ? getProposerTagDef(firstProposerKey) : undefined)
    ?? (product.tier === 'product100' ? defaultProposerDef : undefined);
  const proposerFaceImage = proposerDef?.faceImage ?? defaultProposerDef?.faceImage;
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [addedFeedback, setAddedFeedback] = useState(false);
  const detailHref = `/product/${product.slug}`;
  const displayProducer = localizeProducer(product.producer, isJa);
  const displayRegion = localizeRegion(product.region, isJa);
  const displayStoryDescription = localizeStoryDescription(product, isJa);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: displayName,
      price: product.price,
      discountedPrice: hasReferral
        ? parseFloat((product.price * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2))
        : undefined,
      currency: product.currency,
      quantity: 1,
      image: mobileProductImage ?? productImage,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="flex flex-row sm:flex-col border-x-0 border-t-0 border-b border-white/10 sm:border sm:border-[rgba(37,199,96,0.25)] rounded-none sm:rounded-2xl overflow-hidden bg-transparent sm:bg-[rgba(255,255,255,0.02)] hover:border-[#25C760]/60 hover:bg-[rgba(37,199,96,0.04)] transition-all duration-300 group">
      {/* Image block (Amazon-like mobile: image left, details right) */}
      <div className="w-[43%] sm:w-full shrink-0 bg-black/40 sm:bg-black/50 overflow-hidden">
      <Link href={detailHref} className="block w-full overflow-hidden">
        {/* Upper tier: product image / video — taller on mobile, 4:3 on desktop */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] overflow-hidden">
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
            <>
              {mobileProductImage && (
                <Image
                  src={mobileProductImage}
                  alt={product.fullName}
                  fill
                  className="object-cover sm:hidden group-hover:scale-105 transition-transform duration-500"
                  sizes="44vw"
                />
              )}
              <Image
                src={productImage}
                alt={product.fullName}
                fill
                className={`${mobileProductImage ? 'hidden sm:block' : 'block'} object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500`}
                sizes="(max-width: 640px) 44vw, (max-width: 1280px) 50vw, 33vw"
              />
            </>
          )}
        </div>
      </Link>

        {/* Lower tier: proposer face strip — Product100 always shows a face below the image */}
        {proposerDef && proposerKey && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onProposerClick(proposerKey); }}
            className="flex w-full flex-col items-center justify-center gap-1 px-1.5 sm:px-2 py-2 bg-black/70 min-h-16 sm:min-h-20 hover:bg-[#25C760]/10 transition text-center"
            aria-label={`${isJa ? proposerDef.labelJa : proposerDef.labelEn} ${t('products', 'の商品で絞り込む', 'products')}`}
          >
            {proposerFaceImage ? (
              <div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden border border-[#25C760]/40">
                <Image
                  src={proposerFaceImage}
                  alt={proposerDef.labelJa}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-base border border-white/15">
                {proposerDef.icon}
              </span>
            )}
            <div className="w-full min-w-0">
              <p className="text-[10px] text-gray-500 leading-none mb-1">
                {t('Proposer', '発案者', '提案者')}
              </p>
              <p className="text-[10px] sm:text-xs font-semibold text-[#25C760] truncate">
                {isJa ? proposerDef.labelJa : proposerDef.labelEn}
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <div
        className="flex flex-col flex-1 min-w-0 px-3 py-2.5 sm:p-4 gap-1.5 sm:gap-3 cursor-pointer"
        role="link"
        tabIndex={0}
        onClick={() => router.push(detailHref)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(detailHref);
          }
        }}
      >
        {/* Detail tap area */}
          <div className="flex flex-col gap-1.5 sm:gap-3">
            {/* Name */}
            <div className="flex items-start gap-2">
            <h2 className="text-white font-medium sm:font-bold text-[13px] sm:text-base leading-snug group-hover:text-[#25C760] transition-colors duration-300 line-clamp-3 sm:line-clamp-1">
              {displayName}
            </h2>
            </div>

            {/* Producer + Region */}
            {(displayProducer || displayRegion) && (
              <div className="flex items-start gap-1.5 text-xs text-gray-400">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#25C760]/70 shrink-0" />
                <span className="line-clamp-2">
                  {displayProducer && <span className="text-gray-300">{displayProducer}</span>}
                  {displayProducer && displayRegion && <span className="mx-1 text-gray-600">·</span>}
                  {displayRegion && <span>{displayRegion}</span>}
                </span>
              </div>
            )}

            {/* Story description */}
            {displayStoryDescription && (
              <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2">
                {displayStoryDescription}
              </p>
            )}
          </div>

        {/* Story + region tags */}
        {(mainStoryTag || secondaryStoryTags.length > 0 || (product.regionTags?.length ?? 0) > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {mainStoryTag && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick(mainStoryTag); }}
                className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-[#25C760]/15 text-[#25C760] border border-[#25C760]/35 hover:bg-[#25C760]/25 transition cursor-pointer"
              >
                {getStoryTagLabel(mainStoryTag, isJa)}
              </button>
            )}
            {secondaryStoryTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick(tag); }}
                className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-[#25C760]/10 text-[#25C760] border border-[#25C760]/25 hover:bg-[#25C760]/20 transition cursor-pointer"
              >
                {getStoryTagLabel(tag, isJa)}
              </button>
            ))}
            {product.regionTags?.slice(0, 2).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRegionClick(tag); }}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-300 transition cursor-pointer"
              >
                📍 {localizeRegion(tag, isJa)}
              </button>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-1 flex flex-col items-start gap-1.5 sm:gap-2 pt-1 sm:pt-2 sm:border-t sm:border-white/5">
          <PriceDisplay product={product} isJa={isJa} hasReferral={hasReferral} />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="inline-flex w-full sm:w-auto justify-center rounded-full bg-[#25C760] text-black text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#2ee873] transition"
          >
            {addedFeedback ? t('✓ Added', '✓ 追加済み', '✓ 已添加') : t('Add to Cart', 'カートに入れる', '加入购物车')}
          </button>
        </div>
      </div>
    </div>
  );
}

function PriceDisplay({
  product,
  isJa,
  hasReferral,
}: {
  product: ProductData;
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
          <span className="text-[#25C760] font-bold text-lg sm:text-sm leading-none">{discounted}</span>
          <span className="text-[10px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1.5 py-0.5">10%OFF</span>
        </div>
      );
    }
    return <span className="text-[#25C760] font-bold text-lg sm:text-sm leading-none">{priceJpy}</span>;
  }
  // non-JA
  if (hasReferral) {
    const discounted = (product.price * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2);
    return (
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="line-through text-gray-600 text-xs">USD {product.price.toFixed(2)}</span>
        <span className="text-[#25C760] font-bold text-lg sm:text-sm leading-none">USD {discounted}</span>
        <span className="text-[10px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1.5 py-0.5">10%OFF</span>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[#25C760] font-bold text-lg sm:text-sm leading-none">USD {product.price.toFixed(2)}</span>
      {priceJpy && <span className="text-gray-600 text-xs">({priceJpy})</span>}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStoryTagLabel(key: string, isJa: boolean): string {
  const def = STORY_TAGS.find((s) => s.key === key);
  if (!def) return key;
  return isJa ? def.labelJa : def.labelEn;
}
