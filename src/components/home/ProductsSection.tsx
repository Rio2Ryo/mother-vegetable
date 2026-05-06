'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { getHomeProductCards } from '@/data/products';
import ProductGrid from './ProductGrid';
import ProductSearchFilter, {
  parseFilterFromSearchParams,
  type FilterState,
} from './ProductSearchFilter';

export default function ProductsSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const searchParams = useSearchParams();

  // Memoize the source list once per locale render — adapter is pure but produces a new array.
  const products = useMemo(() => getHomeProductCards(locale), [locale]);

  // Seed filter from URL on first render. After that, ProductSearchFilter writes URL on change.
  const [filter, setFilter] = useState<FilterState>(() =>
    parseFilterFromSearchParams(
      searchParams ?? new URLSearchParams(),
    ),
  );

  // Subscription plan state — preserved unchanged from the previous implementation.
  const [selectedPlan, setSelectedPlan] = useState<'light' | 'standard' | 'premium'>('standard');
  const [subscribing, setSubscribing] = useState(false);

  // Map UI plan keys to API plan IDs (`light` → `basic` on the server).
  const toApiPlanId = (planKey: 'light' | 'standard' | 'premium'): string => {
    if (planKey === 'light') return 'basic';
    return planKey;
  };

  const handleSubscribe = (planKey: 'light' | 'standard' | 'premium') => {
    if (subscribing) return;
    setSubscribing(true);
    const planId = toApiPlanId(planKey);
    const target = `/${locale || 'ja'}/checkout?subscription=${encodeURIComponent(planId)}`;
    window.location.href = target;
  };

  // Card-level tag chip click: toggle the tag in the active filter.
  const onTagClick = (kind: 'region' | 'story', tag: string) => {
    setFilter((prev) => {
      if (kind === 'region') {
        const has = prev.regions.includes(tag);
        return {
          ...prev,
          regions: has ? prev.regions.filter((t) => t !== tag) : [...prev.regions, tag],
        };
      }
      const has = prev.stories.includes(tag);
      return {
        ...prev,
        stories: has ? prev.stories.filter((t) => t !== tag) : [...prev.stories, tag],
      };
    });
  };

  return (
    <motion.div
      className="bg-black border-2 border-[#25C760] rounded-lg p-4 md:p-8 my-5 md:my-5"
      id="product-listing"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h2
        className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-4"
        style={{ color: '#25c760' }}
      >
        Products
      </h2>
      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-8 opacity-80" />

      {/* Search + tag filter — wraps the grid via render-prop */}
      <ProductSearchFilter products={products} value={filter} onChange={setFilter}>
        {(filtered) => <ProductGrid products={filtered} onTagClick={onTagClick} />}
      </ProductSearchFilter>

      {/* MV Product 100 label for the subscription block */}
      <div className="max-w-4xl mx-auto mt-12 md:mt-16">
        <h3
          className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6"
          style={{ color: '#25c760' }}
        >
          MV Product 100
        </h3>

        {/* Subscription Plan Selector — preserved verbatim from previous implementation */}
        <div className="mb-8 md:mb-10">
          <h4
            className="text-sm md:text-lg font-bold text-center mb-4"
            style={{ color: '#25c760' }}
          >
            {isJa
              ? 'サブスクリプションプラン'
              : locale === 'zh'
                ? '订阅计划'
                : 'Subscription Plans'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {(
              [
                {
                  key: 'light' as const,
                  name: isJa
                    ? 'ライトプラン'
                    : locale === 'zh'
                      ? '轻量计划'
                      : 'Light Plan',
                  desc: isJa
                    ? '毎月ランダムで1個お届け'
                    : locale === 'zh'
                      ? '每月随机配送1件商品'
                      : '1 random product delivered monthly',
                  price: '¥2,000',
                  count: '1',
                },
                {
                  key: 'standard' as const,
                  name: isJa
                    ? 'スタンダードプラン'
                    : locale === 'zh'
                      ? '标准计划'
                      : 'Standard Plan',
                  desc: isJa
                    ? '毎月2個お届け'
                    : locale === 'zh'
                      ? '每月配送2件商品'
                      : '2 products delivered monthly',
                  price: '¥3,500',
                  count: '2',
                },
                {
                  key: 'premium' as const,
                  name: isJa
                    ? 'プレミアムプラン'
                    : locale === 'zh'
                      ? '高级计划'
                      : 'Premium Plan',
                  desc: isJa
                    ? '毎月3個すべてお届け'
                    : locale === 'zh'
                      ? '每月配送全部3件商品'
                      : 'All 3 products delivered monthly',
                  price: '¥5,000',
                  count: '3',
                },
              ]
            ).map((plan) => (
              <button
                key={plan.key}
                onClick={() => setSelectedPlan(plan.key)}
                className={`relative rounded-xl p-4 md:p-5 text-left transition-all duration-200 ${
                  selectedPlan === plan.key
                    ? 'border-2 border-[#25c760] bg-[#25c760]/10 shadow-lg shadow-[#25c760]/20'
                    : 'border border-white/15 bg-white/5 hover:border-white/30'
                }`}
              >
                {/* Radio indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.key ? 'border-[#25c760]' : 'border-white/30'
                    }`}
                  >
                    {selectedPlan === plan.key && (
                      <div className="w-2 h-2 rounded-full bg-[#25c760]" />
                    )}
                  </div>
                  <span
                    className={`text-sm md:text-base font-bold ${
                      selectedPlan === plan.key ? 'text-[#25c760]' : 'text-white/70'
                    }`}
                  >
                    {plan.name}
                  </span>
                </div>
                <p
                  className={`text-[10px] md:text-xs mb-3 ${
                    selectedPlan === plan.key ? 'text-white/70' : 'text-white/40'
                  }`}
                >
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-lg md:text-2xl font-bold ${
                      selectedPlan === plan.key ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-[10px] md:text-xs ${
                      selectedPlan === plan.key ? 'text-white/50' : 'text-white/30'
                    }`}
                  >
                    {isJa ? '/月' : locale === 'zh' ? '/月' : '/mo'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {/* Subscribe Button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={subscribing}
              className="px-8 py-3 md:px-12 md:py-4 bg-[#25c760] text-black font-bold text-sm md:text-lg rounded-full hover:bg-[#1da84e] transition-colors shadow-lg shadow-[#25c760]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isJa ? 'サブスクリプションを開始する' : 'Start Subscription'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
