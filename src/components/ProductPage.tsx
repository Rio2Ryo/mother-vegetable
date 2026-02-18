'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

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
      <motion.section
        className="py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1500px] mx-auto px-5">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Thumbnails - vertical strip */}
            <motion.div
              className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {product.videoUrls.map((url, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    selectedVideo === i
                      ? 'border-[#25C760] shadow-[0_0_10px_rgba(37,199,96,0.3)]'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-[rgba(37,199,96,0.3)]'
                  }`}
                  onClick={() => setSelectedVideo(i)}
                >
                  <video className="w-full h-full object-cover" muted preload="metadata" playsInline>
                    <source src={url} type="video/mp4" />
                  </video>
                </div>
              ))}
            </motion.div>

            {/* Main video */}
            <motion.div
              className="flex-1 max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden bg-black border border-[rgba(37,199,96,0.2)]">
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
            </motion.div>

            {/* Product info */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-white font-bold text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>{product.fullName}</h1>
              <h2 className="text-[#25C760] font-bold text-xl md:text-2xl mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>{product.priceDisplay}</h2>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-[rgba(37,199,96,0.1)] border border-[#25C760] rounded-md px-3 py-1.5">
                  <p className="m-0 text-white text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <span className="mr-1">&#128666;</span>
                    Free Shipping Worldwide
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-white text-sm font-medium block mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Quantity</label>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 border border-[#25C760] bg-transparent text-[#25C760] rounded-l-md text-xl cursor-pointer hover:bg-[#25C760] hover:text-black transition-all duration-200"
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
                    className="w-10 h-10 border border-[#25C760] bg-transparent text-[#25C760] rounded-r-md text-xl cursor-pointer hover:bg-[#25C760] hover:text-black transition-all duration-200"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#25C760] text-black font-semibold py-3 px-6 rounded-lg border-none cursor-pointer hover:bg-[#1ea34e] hover:shadow-[0_4px_15px_rgba(37,199,96,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-base"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#3C8063] text-white font-semibold py-3 px-6 rounded-lg border-none cursor-pointer hover:bg-[#2e6650] hover:shadow-[0_4px_15px_rgba(60,128,99,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-base"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Buy Now / Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </div>

          {/* Product details card */}
          <motion.div
            className="mt-12 bg-black border border-[#25C760] rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 flex items-center justify-center">
                <video className="max-w-[120px] h-auto rounded-lg" autoPlay muted loop playsInline>
                  <source src={product.mainVideoUrl} type="video/mp4" />
                </video>
              </div>
              <div className="flex-1">
                <h3 className="mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <span className="block font-bold text-xl text-[#25C760] mb-1">{product.name}</span>
                  <span className="block text-sm text-[#25C760]">{product.subtitle}</span>
                </h3>
                <p className="text-base text-white leading-relaxed opacity-90 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <strong className="text-[#dc3545]">{product.taglineJp}</strong>{' '}
                  <span>{product.tagline}</span>
                </p>
                <div className="space-y-2 mb-4">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#25C760] font-bold text-lg shrink-0">&#10003;</span>
                      <span className="text-white text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <Link href={product.howToLink} className="no-underline">
                  <h4 className="text-[#25C760] font-semibold text-base mb-2 flex items-center gap-2 hover:text-white transition-colors duration-200" style={{ fontFamily: 'Arial, sans-serif' }}>
                    How to use
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </h4>
                </Link>
                <div className="flex items-start gap-2">
                  <span className="text-[#25C760] font-bold text-lg shrink-0">&#10003;</span>
                  <span className="text-white text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{product.howToUse}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Usage items grid */}
          {(product.drinkItems || product.foodItems || product.cosmeticItems) && (
            <motion.div
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {product.drinkItems && (
                <motion.div variants={itemVariants} className="bg-black border border-[#25C760] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]">
                  <h4 className="text-[#25C760] font-bold text-lg text-center mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Drink</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {product.drinkItems.map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                        <span className="text-white text-xs text-center" style={{ fontFamily: 'Arial, sans-serif' }}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {product.foodItems && (
                <motion.div variants={itemVariants} className="bg-black border border-[#25C760] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]">
                  <h4 className="text-[#25C760] font-bold text-lg text-center mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Food</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {product.foodItems.map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                        <span className="text-white text-xs text-center" style={{ fontFamily: 'Arial, sans-serif' }}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {product.cosmeticItems && (
                <motion.div variants={itemVariants} className="bg-black border border-[#25C760] rounded-xl p-6 md:col-span-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]">
                  <h4 className="text-[#25C760] font-bold text-lg text-center mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Mix Into</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {product.cosmeticItems.map((item) => (
                      <div key={item.name} className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                        <span className="text-white text-xs text-center" style={{ fontFamily: 'Arial, sans-serif' }}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
