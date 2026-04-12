'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useCartStore } from '@/store/cart';
import { useRouter } from '@/i18n/navigation';
import { getStoredReferralCode } from '@/lib/affiliate';
import { useLocale } from 'next-intl';

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
  priceMvt: string;
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
    circles: { name: string; detail: string }[];
    benefits: { title: string; items: string[] }[];
    nutrientCount?: string;
    nutrientList?: string;
    medicalText?: string;
  };
}

export default function SimpleProductPage({ product }: { product: SimpleProductPageData }) {
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  const galleryImages = product.galleryImages ?? [
    { url: product.productImage, alt: product.name },
  ];
  const activeImage = galleryImages[selectedGalleryIndex] ?? galleryImages[0];
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const locale = useLocale();
  const isJa = locale === 'ja';

  const handleAddToCart = useCallback(() => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }, [addItem, product, quantity]);

  const handleBuyNow = useCallback(() => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    router.push('/checkout');
  }, [addItem, product, quantity, router]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="flex flex-col items-center gap-3">
            {/* Main image */}
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            {/* Thumbnail strip */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 justify-center">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGalleryIndex(i)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                      i === selectedGalleryIndex
                        ? 'border-[#25C760]'
                        : 'border-gray-700 hover:border-gray-500'
                    } bg-gray-900`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-contain p-1"
                      sizes="56px"
                    />
                    {/* Placeholder overlay for future images */}
                    {i > 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-[8px] text-gray-400 font-medium">{i + 1}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.subtitle}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#25C760] mb-3">{product.name}</h1>
              <p className="text-sm text-gray-300 leading-relaxed">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{product.priceJpy}</span>
              <span className="text-gray-600">/</span>
              <span className="flex items-center gap-1.5 text-[#25C760] font-bold text-lg">
                <img src="/cdn/mvt_coin.png" alt="MVT" width={20} height={20} />
                {product.priceMvt}
              </span>
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
          <p className="text-gray-300 text-center leading-relaxed text-sm">{product.howToUse}</p>
        </div>
      </section>

      {/* Function Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#25C760] mb-2 text-center">
            {product.category === 'food'
              ? (isJa ? 'Food Function' : 'Food Function')
              : (isJa ? 'Cosmetic Function' : 'Cosmetic Function')}
          </h2>
          {/* Subtitle */}
          <p className="text-sm md:text-base text-gray-400 text-center mb-8">
            {product.functionSection.subtitle}
          </p>

          {/* Oval / Pill-shaped circles */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {product.functionSection.circles.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-5 py-4 md:px-6 md:py-5 rounded-[50px] min-w-[130px] md:min-w-[150px] text-center"
                style={{
                  background: 'linear-gradient(135deg, #0a3d1a 0%, #1a6b2a 40%, #25C760 100%)',
                  border: '1px solid rgba(37, 199, 96, 0.3)',
                }}
              >
                <span className="text-white font-semibold text-xs md:text-sm leading-snug">
                  {c.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Below circles: nutrient list (food) or medical text (cosmetic) */}
          {product.category === 'food' && product.functionSection.nutrientCount && (
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

          {product.category === 'cosmetic' && product.functionSection.medicalText && (
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
