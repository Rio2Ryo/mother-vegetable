'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

interface ProductData {
  id: string;
  name: string;
  fullName: string;
  subtitle: string;
  taglineJp: string;
  tagline: string;
  price: number;
  currency: string;
  priceDisplay: string;
  videoUrls: string[];
  mainVideoUrl: string;
  benefits: string[];
  howToUse: string;
  howToLink: string;
  drinkItems?: { name: string; image: string }[];
  foodItems?: { name: string; image: string }[];
  cosmeticItems?: { name: string; image: string }[];
  productImage: string;
}

export default function ProductPage({ product }: { product: ProductData }) {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.fullName,
      price: product.price,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.fullName,
      price: product.price,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
  };

  return (
    <div className="bg-black min-h-screen">
      <section className="py-8">
        <div className="max-w-[1500px] mx-auto px-5">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
              {product.videoUrls.map((url, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    selectedVideo === i ? 'border-[#25C760]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedVideo(i)}
                >
                  <video className="w-full h-full object-cover" muted preload="metadata" playsInline>
                    <source src={url} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>

            {/* Main video */}
            <div className="flex-1 max-w-md">
              <div className="rounded-xl overflow-hidden bg-black">
                <video
                  key={selectedVideo}
                  className="w-full h-auto"
                  muted
                  autoPlay
                  loop
                  playsInline
                >
                  <source src={product.videoUrls[selectedVideo]} type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Product info */}
            <div className="flex-1">
              <h1 className="text-white font-bold text-2xl md:text-3xl mb-2">{product.fullName}</h1>
              <h2 className="text-[#25C760] font-bold text-xl md:text-2xl mb-4">{product.priceDisplay}</h2>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-[rgba(37,199,96,0.1)] border border-[#25C760] rounded-md px-3 py-1.5">
                  <p className="m-0 text-white text-sm">
                    <span className="mr-1">🚚</span>
                    Free Shipping Worldwide
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-white text-sm font-medium block mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 border border-[#25C760] bg-transparent text-[#25C760] rounded-l-md text-xl cursor-pointer hover:bg-[#25C760] hover:text-black transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 bg-transparent text-white text-center border-y border-[#25C760] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    className="w-10 h-10 border border-[#25C760] bg-transparent text-[#25C760] rounded-r-md text-xl cursor-pointer hover:bg-[#25C760] hover:text-black transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#25C760] text-black font-semibold py-3 px-6 rounded-lg border-none cursor-pointer hover:bg-[#1ea34e] transition-colors text-base"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#3C8063] text-white font-semibold py-3 px-6 rounded-lg border-none cursor-pointer hover:bg-[#2e6650] transition-colors text-base"
                >
                  Buy Now / Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Product details card */}
          <div className="mt-12 bg-black border border-[#25C760] rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 flex items-center justify-center">
                <video className="max-w-[120px] h-auto rounded-lg" autoPlay muted loop playsInline>
                  <source src={product.mainVideoUrl} type="video/mp4" />
                </video>
              </div>
              <div className="flex-1">
                <h3 className="mb-2">
                  <span className="block font-bold text-xl text-[#25C760] mb-1">{product.name}</span>
                  <span className="block text-sm text-[#25C760]">{product.subtitle}</span>
                </h3>
                <p className="text-base text-white leading-relaxed opacity-90 mb-4">
                  <strong className="text-[#dc3545]">{product.taglineJp}</strong>{' '}
                  <span>{product.tagline}</span>
                </p>
                <div className="space-y-2 mb-4">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#25C760] font-bold text-lg shrink-0">✓</span>
                      <span className="text-white text-sm">{b}</span>
                    </div>
                  ))}
                </div>
                <Link href={product.howToLink} className="no-underline">
                  <h4 className="text-[#25C760] font-semibold text-base mb-2 flex items-center gap-2">
                    How to use
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </h4>
                </Link>
                <div className="flex items-start gap-2">
                  <span className="text-[#25C760] font-bold text-lg shrink-0">✓</span>
                  <span className="text-white text-sm">{product.howToUse}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Usage items grid */}
          {(product.drinkItems || product.foodItems || product.cosmeticItems) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.drinkItems && (
                <div className="bg-black border border-[#25C760] rounded-xl p-6">
                  <h4 className="text-[#25C760] font-bold text-lg text-center mb-4">Drink</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {product.drinkItems.map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                        <span className="text-white text-xs text-center">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {product.foodItems && (
                <div className="bg-black border border-[#25C760] rounded-xl p-6">
                  <h4 className="text-[#25C760] font-bold text-lg text-center mb-4">Food</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {product.foodItems.map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                        <span className="text-white text-xs text-center">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {product.cosmeticItems && (
                <div className="bg-black border border-[#25C760] rounded-xl p-6 md:col-span-2">
                  <h4 className="text-[#25C760] font-bold text-lg text-center mb-4">Mix Into</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {product.cosmeticItems.map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                        <span className="text-white text-xs text-center">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
