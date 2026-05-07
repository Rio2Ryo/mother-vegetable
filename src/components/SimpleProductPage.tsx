'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { useCartStore } from '@/store/cart';
import { useRouter } from '@/i18n/navigation';
import { getStoredReferralCode } from '@/lib/affiliate';
import { useLocale } from 'next-intl';
import ProductMetaBadges from '@/components/ProductMetaBadges';

const REFERRAL_DISCOUNT_RATE = 0.10;

function parseJpyPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[¥,]/g, ''), 10);
}

function formatJpyPrice(amount: number): string {
  return '¥' + amount.toLocaleString();
}

export interface GalleryImageData {
  url: string;
  alt: string;
}

export interface SimpleProductPageData {
  id: string;
  name: string;
  fullName: string;
  subtitle: string;
  tagline: string;
  price: number;
  currency: string;
  priceJpy: string;
  inStock: boolean;
  productImage: string;
  galleryImages?: GalleryImageData[];
  benefits: string[];
  howToUse: string;
  category: 'food' | 'cosmetic';
  trust: {
    productName: string;
    certification: string;
    partners: string[];
  };
  functionSection: {
    subtitle: string;
    ingredientInfo?: { label: string; value: string }[];
    nutritionalDetails?: { name: string; value: string }[];
    characteristics?: string[];
    benefits: { title: string; items: string[] }[];
    nutrientCount?: string;
    nutrientList?: string;
    medicalText?: string;
  };
}

export default function SimpleProductPage({ product }: { product: SimpleProductPageData }) {
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  // Show one main product image only; thumbnail strip is intentionally removed.
  const activeImage = product.galleryImages?.[0] ?? { url: product.productImage, alt: product.name };
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [hasReferral, setHasReferral] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const code = getStoredReferralCode();
      if (code) setHasReferral(true);
    });
  }, []);

  const discountedPrice = parseFloat((product.price * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2));

  const handleAddToCart = useCallback(() => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: hasReferral ? discountedPrice : undefined,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }, [addItem, product, hasReferral, discountedPrice, quantity]);

  const handleBuyNow = useCallback(() => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: hasReferral ? discountedPrice : undefined,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    router.push('/checkout');
  }, [addItem, product, hasReferral, discountedPrice, quantity, router]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="flex flex-col items-center gap-3">
            {/* Main image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <ProductMetaBadges slug={product.id} isJa={isJa} />
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.subtitle}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#25C760] mb-3">{product.name}</h1>
              <p className="text-sm text-gray-300 leading-relaxed">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              {hasReferral ? (
                <>
                  <span className="text-lg text-white/50 line-through">{product.priceJpy}</span>
                  <span className="text-2xl font-bold text-white">
                    {formatJpyPrice(Math.round(parseJpyPrice(product.priceJpy) * (1 - REFERRAL_DISCOUNT_RATE)))}
                  </span>
                  <span className="text-xs font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-2 py-0.5">
                    10% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-white">{product.priceJpy}</span>
              )}
              <span className="ml-2 text-[#25C760] text-xs border border-[#25C760] rounded px-2 py-0.5">{isJa ? '送料無料' : 'Free Shipping'}</span>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#25C760] font-bold text-sm mt-0.5">✓</span>
                  <span className="text-sm text-gray-200 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{isJa ? '数量' : 'Qty'}</span>
                <div className="flex items-center border-2 border-[#25C760] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-white hover:bg-gray-800 transition text-lg"
                  >−</button>
                  <span className="w-8 h-9 flex items-center justify-center text-white font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-white hover:bg-gray-800 transition text-lg"
                  >+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-3 bg-white text-black font-bold rounded-lg text-sm uppercase tracking-wider border-2 border-[#25C760] hover:bg-[#25C760] hover:text-white transition disabled:opacity-50"
              >
                {addedFeedback ? (isJa ? '✓ カートに追加しました' : '✓ Added to Cart') : (isJa ? 'カートに入れる' : 'Add to Cart')}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3 bg-[#25C760] text-white font-bold rounded-lg text-sm uppercase tracking-wider hover:bg-[#1da84e] transition disabled:opacity-50"
              >
                {isJa ? '今すぐ購入' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <h2 className="text-lg font-bold text-[#25C760] mb-4 text-center uppercase tracking-wider">{isJa ? '使い方' : 'How to Use'}</h2>
          <p className="text-gray-300 text-left md:text-center leading-relaxed text-sm">{product.howToUse}</p>
        </div>
      </section>

      {/* Function Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-2 text-center">
            {product.category === 'food' ? 'Food Function' : 'Cosmetic Function'}
          </h2>
          {/* Subtitle */}
          <p className="text-sm md:text-base text-gray-400 text-center mb-10">
            {product.functionSection.subtitle}
          </p>

          {/* Ingredient Information Table */}
          {product.functionSection.ingredientInfo && product.functionSection.ingredientInfo.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg md:text-xl font-bold text-[#25C760] mb-4">
                {isJa ? '成分情報' : 'Ingredient Information'}
                <span className="text-xs text-gray-500 font-normal ml-2">/ 100g</span>
              </h3>
              <div className="border border-gray-800 rounded-lg overflow-hidden">
                {product.functionSection.ingredientInfo.map((row, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-4 py-3 text-sm ${
                      i < product.functionSection.ingredientInfo!.length - 1 ? 'border-b border-gray-800' : ''
                    }`}
                  >
                    <span className="text-gray-300">{row.label}</span>
                    <span className="text-white font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food: Nutritional Breakdown */}
          {product.category === 'food' && product.functionSection.nutritionalDetails && product.functionSection.nutritionalDetails.length > 0 && (
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#25C760] mb-2">
                {isJa ? '栄養素詳細' : 'Nutritional Breakdown'}
              </h3>
              {product.functionSection.nutrientCount && (
                <p className="text-sm text-gray-400 mb-4">{product.functionSection.nutrientCount}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {product.functionSection.nutritionalDetails.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300 text-sm">{item.name}</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food fallback: nutrient list text */}
          {product.category === 'food' && !product.functionSection.nutritionalDetails && product.functionSection.nutrientCount && (
            <div className="mt-10 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#25C760] mb-4">
                {product.functionSection.nutrientCount}
              </h3>
              {product.functionSection.nutrientList && (
                <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto">
                  {product.functionSection.nutrientList}
                </p>
              )}
            </div>
          )}

          {/* Cosmetic: Characteristics checklist */}
          {product.category === 'cosmetic' && product.functionSection.characteristics && product.functionSection.characteristics.length > 0 && (
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#25C760] mb-4">
                {isJa ? '特徴' : 'Characteristics'}
              </h3>
              <ul className="space-y-3">
                {product.functionSection.characteristics.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#25C760] mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cosmetic fallback: medical text */}
          {product.category === 'cosmetic' && !product.functionSection.characteristics && product.functionSection.medicalText && (
            <div className="mt-10 text-center">
              <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto">
                {product.functionSection.medicalText}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap justify-center items-center gap-6">
          {product.trust.partners.map((logo, i) => (
            <img key={i} src={logo} alt="Certification" className="h-10 object-contain opacity-70" />
          ))}
        </div>
      </section>
    </div>
  );
}
