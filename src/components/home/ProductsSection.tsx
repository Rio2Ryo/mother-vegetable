'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { getStoredReferralCode } from '@/lib/affiliate';
import { ArrowRight } from 'lucide-react';

const REFERRAL_DISCOUNT_RATE = 0.10;

function parseJpyPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[¥,]/g, ''), 10);
}

function formatJpyPrice(amount: number): string {
  return '¥' + amount.toLocaleString();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

function getFlagshipProducts(isJa: boolean) {
  return [
    {
      id: 'achieve',
      name: 'Achieve',
      subtitle: isJa ? '飲むタイプ' : 'Drinkable Type',
      subName: isJa ? 'フレッシュドライプロテイン' : 'Fresh Dry Protein',
      tagline: isJa ? '48種類の栄養を一度に摂取' : '48 different nutrients at once.',
      videoUrl: '/new_achieve_video.mp4',
      imageUrl: '/cdn/products_achieve_10001.png',
      features: isJa
        ? ['48種類の栄養を一度に摂取', '毎日の健康を大切な人と']
        : ['48 different nutrients in one serving', 'Share daily wellness with your loved ones'],
      productLink: '/product/achieve',
      priceUsd: '$36.70',
      priceJpy: '¥5,500',
    },
    {
      id: 'confidence',
      name: 'Confidence',
      subtitle: isJa ? '肌に塗るタイプ' : 'Topical Type',
      subName: isJa ? 'フレッシュブリッジコラーゲン' : 'Fresh Bridge Collagen',
      tagline: isJa ? '肌の気になるところに直接塗布' : 'For All Skin Types',
      videoUrl: '/new_confidence_video.mp4',
      imageUrl: '/cdn/products_confidence_10001.png',
      features: isJa
        ? ['肌の気になるところに直接塗布', 'お気に入りコスメに混ぜて使用']
        : ['Apply directly to areas of skin concern', 'Mix into your favorite cosmetics'],
      productLink: '/product/confidence',
      priceUsd: '$36.70',
      priceJpy: '¥5,500',
    },
  ];
}

export default function ProductsSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';
  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const products = getFlagshipProducts(isJa);
  const addItem = useCartStore((s) => s.addItem);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(products.map((p) => [p.id, 1]))
  );
  const [hasReferral, setHasReferral] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setHasReferral(Boolean(getStoredReferralCode()));
    });
  }, []);

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
      <h2 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-4" style={{ color: '#25c760' }}>
        {t('Flagship Products', 'フラッグシップ製品', '旗舰产品')}
      </h2>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-8 opacity-80" />

      {/* Product Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            className="rounded-lg p-4 md:p-6"
            style={{ border: '1px solid #25c760' }}
          >
            <div className="flex flex-col gap-0">
              {/* Video */}
              <div className="mb-4 w-full flex justify-center">
                <video
                  src={product.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-[220px] md:max-w-[260px] aspect-[7/13] object-cover rounded-lg"
                />
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col">
                <div className="mb-1 md:text-center">
                  <h3 className="text-lg md:text-3xl font-bold" style={{ color: '#25c760' }}>
                    {product.name}
                  </h3>
                  <p className="text-green-400 text-xs md:text-sm">{product.subtitle}</p>
                  <p className="text-green-400 text-xs md:text-sm">{product.subName}</p>
                </div>

                <div className="space-y-1 mb-2 mt-5">
                  {product.features.map((feature, idx) => (
                    <p key={idx} className="text-white text-[10px] md:text-lg flex items-start text-left">
                      <span className="text-green-400 mr-1 md:mr-2">✓</span>
                      {feature}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-3 mb-2 items-center justify-center">
                  {hasReferral ? (
                    <>
                      <span className="text-white/50 line-through text-base md:text-lg">{product.priceJpy}</span>
                      <span className="text-white font-bold text-xl md:text-2xl">
                        {formatJpyPrice(Math.round(parseJpyPrice(product.priceJpy) * (1 - REFERRAL_DISCOUNT_RATE)))}
                      </span>
                      <span className="text-xs font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-2 py-0.5">
                        10% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-white font-bold text-xl md:text-2xl">{product.priceJpy}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 px-2 md:px-4 pb-1 md:pb-2 space-y-3">
              <div className="flex items-center justify-center gap-4 py-1">
                <button
                  onClick={() =>
                    setQuantities((prev) => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] ?? 1) - 1) }))
                  }
                  className="w-9 h-9 rounded-full border-2 border-[#25c760] text-[#25c760] font-bold text-xl flex items-center justify-center hover:bg-[#25c760]/20 transition-colors"
                >
                  −
                </button>
                <span className="text-white font-bold text-base w-8 text-center">{quantities[product.id] ?? 1}</span>
                <button
                  onClick={() =>
                    setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 1) + 1 }))
                  }
                  className="w-9 h-9 rounded-full border-2 border-[#25c760] text-[#25c760] font-bold text-xl flex items-center justify-center hover:bg-[#25c760]/20 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  const basePrice = parseFloat(product.priceUsd.replace('$', ''));
                  addItem({
                    id: product.id,
                    productId: product.id,
                    name: product.name,
                    price: basePrice,
                    discountedPrice: hasReferral
                      ? parseFloat((basePrice * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2))
                      : undefined,
                    currency: 'USD',
                    quantity: quantities[product.id] ?? 1,
                    image: product.imageUrl ?? '',
                  });
                }}
                className="block w-full text-center py-2.5 md:py-3 bg-[#25c760] text-black font-semibold text-sm md:text-base rounded-full hover:bg-[#1da84e] transition-colors"
              >
                {t('Add to Cart', 'カートに入れる', '加入购物车')}
              </button>
              <Link
                href={product.productLink}
                className="block w-full text-center py-2 text-white/60 font-medium text-xs md:text-sm hover:text-white transition-colors no-underline"
              >
                {t('View Details', '商品詳細', '查看详情')}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA to /products */}
      <div className="flex flex-col items-center gap-3 pt-4 border-t border-[#25C760]/20">
        <p className="text-gray-400 text-sm md:text-base text-center">
          {t(
            'Discover 24+ products — search by maker story, region, and ingredients.',
            '作り手の物語・地域・思いから商品を探す「物語検索EC」',
            '通过制造商故事、地区和成分探索24+款商品',
          )}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border-2 border-[#25C760] text-[#25C760] font-bold text-sm md:text-base hover:bg-[#25C760] hover:text-black transition-all duration-200 no-underline"
        >
          {t('Browse All Products', 'すべての商品を見る', '查看所有商品')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
