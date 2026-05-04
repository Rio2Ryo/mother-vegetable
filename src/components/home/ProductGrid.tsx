'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { getStoredReferralCode } from '@/lib/affiliate';
import { ShoppingCart, MapPin } from 'lucide-react';
import { getStoryTagDef } from '@/data/tags';
import type { HomeProductCard } from '@/data/products';

const REFERRAL_DISCOUNT_RATE = 0.10;

function parseJpyPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[¥,]/g, ''), 10);
}

function formatJpyPrice(amount: number): string {
  return '¥' + amount.toLocaleString();
}

interface Props {
  /** Pre-filtered list to render. Parent component owns filtering logic. */
  products: HomeProductCard[];
  /** Called when user clicks a tag chip on a card; parent toggles filter. */
  onTagClick?: (kind: 'region' | 'story', tag: string) => void;
}

export default function ProductGrid({ products, onTagClick }: Props) {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const tMvt = useTranslations('mvt');
  const addItem = useCartStore((s) => s.addItem);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [hasReferral, setHasReferral] = useState(false);

  useEffect(() => {
    const code = getStoredReferralCode();
    // Read-once-on-mount of a client-only value (localStorage / cookie). The
    // SSR-safe initializer can't access window, so this single setState is
    // intentional — it transitions false → true once and never re-fires.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (code) setHasReferral(true);
  }, []);

  if (products.length === 0) return null;

  const getQty = (id: string): number => quantities[id] ?? 1;
  const setQty = (id: string, next: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, next) }));
  };

  const handleAddToCart = (product: HomeProductCard) => {
    const basePrice = parseFloat(product.priceUsd.replace('$', ''));
    const qty = getQty(product.id);
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: basePrice,
      discountedPrice: hasReferral
        ? parseFloat((basePrice * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2))
        : undefined,
      currency: 'USD',
      quantity: qty,
      image: product.imageUrl ?? '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
    >
      {products.map((product) => {
        const qty = getQty(product.id);
        const jpyOriginal = parseJpyPrice(product.priceJpy);
        const jpyDiscounted = hasReferral
          ? Math.round(jpyOriginal * (1 - REFERRAL_DISCOUNT_RATE))
          : jpyOriginal;

        // Build chip list: 1 region + up to 2 story tags = max 3 chips.
        const regionChip = product.regionTags?.[0];
        const storyChips = (product.storyTags ?? []).slice(0, 2);

        return (
          <div
            key={product.id}
            className="group bg-zinc-900/60 border border-zinc-800 rounded-lg overflow-hidden hover:border-[#25c760]/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25c760]/10 transition-all duration-200 flex flex-col"
          >
            {/* Thumbnail */}
            <Link
              href={product.productLink}
              className="block relative aspect-square overflow-hidden bg-zinc-800/40 no-underline"
              aria-label={product.name}
            >
              {product.videoUrl ? (
                <video
                  src={product.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                // External CDN thumbnails — using <img> intentionally to avoid the
                // next/image remote-loader config requirement for these grid tiles.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </Link>

            {/* Content */}
            <div className="p-3 space-y-2 flex-1 flex flex-col">
              {/* Name */}
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 min-h-[2.5rem]">
                <Link
                  href={product.productLink}
                  className="text-white hover:text-[#25c760] transition-colors no-underline"
                >
                  {product.name}
                </Link>
              </h3>

              {/* Subtitle */}
              {product.subtitle && (
                <p className="text-xs text-white/50 truncate">{product.subtitle}</p>
              )}

              {/* Tag chips: 1 region + up to 2 story */}
              {(regionChip || storyChips.length > 0) && (
                <div className="flex flex-wrap gap-1">
                  {regionChip && (
                    <button
                      type="button"
                      onClick={() => onTagClick?.('region', regionChip)}
                      className="inline-flex items-center gap-1 rounded-full border border-[#25c760]/30 bg-[#25c760]/10 px-1.5 py-0.5 text-[10px] text-[#25c760] hover:bg-[#25c760]/20 transition-colors max-w-full"
                      title={regionChip}
                    >
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{regionChip}</span>
                    </button>
                  )}
                  {storyChips.map((tagKey: string) => {
                    const def = getStoryTagDef(tagKey);
                    const label = def ? (isJa ? def.labelJa : def.labelEn) : tagKey;
                    const icon = def?.icon;
                    return (
                      <button
                        key={tagKey}
                        type="button"
                        onClick={() => onTagClick?.('story', tagKey)}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70 hover:border-[#25c760]/40 hover:text-[#25c760] transition-colors max-w-full"
                        title={label}
                      >
                        {icon && <span aria-hidden="true">{icon}</span>}
                        <span className="truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-1.5 pt-1">
                {hasReferral ? (
                  <>
                    <span
                      className="text-base font-bold"
                      style={{ color: '#25c760' }}
                    >
                      {formatJpyPrice(jpyDiscounted)}
                    </span>
                    <span className="text-[10px] text-white/40 line-through">
                      {product.priceJpy}
                    </span>
                    <span className="text-[9px] font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-1 py-px">
                      10% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-base font-bold text-white">
                    {product.priceJpy}
                  </span>
                )}
              </div>

              {/* MVT mini-badge */}
              {typeof product.mvtReward === 'number' && product.mvtReward > 0 && (
                <span
                  className="inline-flex items-center gap-1 self-start rounded-full px-1.5 py-0.5 text-[10px] font-semibold border"
                  style={{
                    color: '#25c760',
                    backgroundColor: 'rgba(37, 199, 96, 0.10)',
                    borderColor: 'rgba(37, 199, 96, 0.40)',
                  }}
                  aria-label={tMvt('earnPrefix')}
                >
                  <span aria-hidden="true">🪙</span>
                  <span>+{product.mvtReward} MVT</span>
                </span>
              )}

              {/* Spacer pushes controls to the bottom */}
              <div className="flex-1" />

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex items-center rounded-full border border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setQty(product.id, qty - 1)}
                    aria-label={isJa ? '数量を減らす' : 'Decrease quantity'}
                    className="w-6 h-6 flex items-center justify-center text-[#25c760] hover:bg-[#25c760]/10 rounded-l-full transition-colors text-sm"
                  >
                    {'−'}
                  </button>
                  <span className="text-white text-xs font-bold w-5 text-center select-none">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(product.id, qty + 1)}
                    aria-label={isJa ? '数量を増やす' : 'Increase quantity'}
                    className="w-6 h-6 flex items-center justify-center text-[#25c760] hover:bg-[#25c760]/10 rounded-r-full transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  aria-label={isJa ? 'カートに入れる' : 'Add to cart'}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-[#25c760] text-black text-xs font-semibold py-1.5 hover:bg-[#1da84e] transition-colors"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {isJa ? 'カート' : 'Cart'}
                  </span>
                </button>
              </div>

              {/* Detail link */}
              <Link
                href={product.productLink}
                className="block text-center text-[10px] text-white/40 hover:text-[#25c760] transition-colors no-underline pt-0.5"
              >
                {isJa ? '詳細' : 'Details'}
              </Link>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
