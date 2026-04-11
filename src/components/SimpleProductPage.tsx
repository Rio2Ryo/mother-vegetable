'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useCartStore } from '@/store/cart';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getStoredReferralCode } from '@/lib/affiliate';

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
  };
}

export default function SimpleProductPage({ product }: { product: SimpleProductPageData }) {
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const t = useTranslations();
  const referralCode = getStoredReferralCode();

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

  const isCosmetic = product.category === 'cosmetic';

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              <Image
                src={product.productImage}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">{product.subtitle}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#25C760] mb-2">{product.name}</h1>
              <p className="text-base text-gray-300 leading-relaxed">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-white">{product.priceJpy}</span>
              <span className="text-gray-500">/</span>
              <span className="flex items-center gap-1.5 text-[#25C760] font-bold text-lg">
                <img src="/cdn/mvt_coin.png" alt="MVT" width={22} height={22} />
                {product.priceMvt}
              </span>
            </div>

            {/* Free Shipping */}
            <div className="inline-flex items-center gap-2 border border-[#25C760] rounded-md px-3 py-1.5 w-fit">
              <span className="text-[#25C760] text-xs">🚚 送料無料 / Free Shipping</span>
            </div>

            {/* Benefits */}
            <div className="space-y-2.5">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#25C760] font-bold mt-0.5">✓</span>
                  <span className="text-sm text-gray-200 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">数量</span>
                <div className="flex items-center border-2 border-[#25C760] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-800 transition"
                  >−</button>
                  <span className="w-10 h-10 flex items-center justify-center text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-800 transition"
                  >+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-3.5 bg-white text-black font-bold rounded-lg text-sm uppercase tracking-wider border-2 border-[#25C760] hover:bg-[#25C760] hover:text-white transition disabled:opacity-50"
              >
                {addedFeedback ? '✓ カートに追加しました' : 'カートに入れる / Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 bg-[#25C760] text-white font-bold rounded-lg text-sm uppercase tracking-wider hover:bg-[#1da84e] transition disabled:opacity-50"
              >
                今すぐ購入 / Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-xl font-bold text-[#25C760] mb-6 text-center">
            {isCosmetic ? '使い方 / How to Use' : '調理方法 / How to Use'}
          </h2>
          <p className="text-gray-300 text-center leading-relaxed max-w-2xl mx-auto">{product.howToUse}</p>
        </div>
      </section>

      {/* Function / Nutrients */}
      <section className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl font-bold text-[#25C760] mb-2 text-center">
            {isCosmetic ? 'Cosmetic Function' : 'Food Function'}
          </h2>
          <p className="text-gray-400 text-center mb-10">{product.functionSection.subtitle}</p>

          {/* Circles */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {product.functionSection.circles.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-28">
                <div className="w-20 h-20 rounded-full border-2 border-[#25C760] flex items-center justify-center">
                  <span className="text-[#25C760] font-bold text-xs text-center px-1">{c.detail}</span>
                </div>
                <span className="text-xs text-gray-300 text-center leading-tight">{c.name}</span>
              </div>
            ))}
          </div>

          {/* Benefit Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.functionSection.benefits.map((cat, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h3 className="text-[#25C760] font-bold text-sm mb-3">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-[#25C760] mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-xl font-bold text-[#25C760] mb-6">Our Trust</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {product.trust.partners.map((logo, i) => (
              <img key={i} src={logo} alt="Partner" className="h-12 md:h-14 object-contain" />
            ))}
          </div>
          <p className="text-[#25C760] text-sm mb-1">{product.trust.productName}</p>
          <p className="text-gray-400 text-xs">{product.trust.certification}</p>
        </div>
      </section>
    </div>
  );
}
