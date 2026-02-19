'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const products = [
  {
    id: 'achieve', name: 'Achieve', subtitle: 'for Body',
    taglineJp: "'TORIKOMU'", tagline: '48 different nutrients at once.',
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
    benefits: ['Supports a healthy gut, Regeneration of cells throughout the body.', 'Helps relieve constipation, improve sleep, and aid weight management.'],
    howToUse: "Simply 'TORIKOMU' one capsule into your drink or meal.",
    howToLink: '/achieve-howto', productLink: '/product/achieve',
    cardClass: 'achieve-card',
  },
  {
    id: 'confidence', name: 'Confidence', subtitle: 'For All Skin',
    taglineJp: "'SURIKOMU' , 'MAZEKOMU'", tagline: 'Skin Healing Effect',
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
    benefits: ['Powerful anti-aging benefits.', 'Helps improve dark spots, acne, odor, and skin damage.'],
    howToUse: " 'SURIKOMU' directly or 'MAZEKOMU' into your current cosmetics.",
    howToLink: '/confidence-howto', productLink: '/product/confidence',
    cardClass: 'heal-card',
  },
  {
    id: 'forever', name: 'Forever', subtitle: 'for Pet',
    taglineJp: "'MAZEKOMU'", tagline: "to extend your pet's healthy life.",
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
    benefits: ['Supports tear stain reduction and gut health.', 'Helps reduce body and waste odors, boosts appetite.'],
    howToUse: "Simply 'MAZEKOMU' one capsule into your pet's food.\"",
    howToLink: '/forever-howto', productLink: '/product/forever',
    cardClass: 'forever-card',
  },
];

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

export default function ProductsSection() {
  return (
    <motion.div
      className="bg-black border border-[#25C760] rounded-xl p-5 sm:p-[30px] md:p-10 my-5 md:my-10 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
      id="product-listing"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-2">Products</h2>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

      {/* Bento grid: 3 equal columns on desktop, single col on tablet/mobile with horizontal card layout */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            className="bg-black border border-[#25C760] rounded-xl p-[30px] flex flex-col transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)] cursor-pointer max-[480px]:p-0 max-[768px]:p-[10px] max-[1024px]:p-[15px]"
          >
            {/* Card content: column on desktop, grid on tablet/mobile */}
            <div className="flex flex-col lg:flex-col max-[1024px]:grid max-[1024px]:grid-cols-[auto_1fr_1fr] max-[1024px]:grid-rows-[auto_auto] max-[1024px]:gap-[15px] max-[1024px]:items-start max-[1024px]:text-left max-[768px]:gap-[10px] max-[480px]:grid-cols-[0.5fr_1.3fr] max-[480px]:grid-rows-[auto_auto_auto_auto] max-[480px]:gap-[10px_12px] max-[480px]:p-3">
              {/* Video */}
              <div className="text-center mb-6 lg:mb-6 max-[1024px]:mb-0 max-[1024px]:col-[1] max-[1024px]:row-[1/3] max-[1024px]:flex max-[1024px]:items-start max-[1024px]:pt-[5px] max-[480px]:col-[1] max-[480px]:row-[1/5] max-[480px]:flex max-[480px]:items-center max-[480px]:justify-center max-[480px]:h-full">
                <video
                  className="max-w-[120px] h-auto rounded-lg mx-auto object-cover max-[1024px]:max-w-[100px] max-[768px]:max-w-[80px] max-[480px]:w-full max-[480px]:max-w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={product.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Product title */}
              <h3 className="text-center mb-4 max-[1024px]:text-left max-[1024px]:col-[2] max-[1024px]:row-[1] max-[1024px]:mb-2 max-[1024px]:self-start max-[480px]:col-[2] max-[480px]:row-[1] max-[480px]:mb-0 max-[480px]:leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="block font-bold text-[2rem] text-[#25C760] mb-1 max-[1024px]:text-[1.2rem] max-[767px]:text-[1rem] max-[530px]:text-[1rem] max-[480px]:text-[1rem] max-[400px]:text-[0.85rem] max-[370px]:text-[0.8rem]">{product.name}</span>
                <span className="block text-[0.9rem] text-[#25C760] max-[1024px]:text-[0.9rem] max-[768px]:text-[0.65rem] max-[530px]:text-[0.8rem]">{product.subtitle}</span>
              </h3>

              {/* Tagline */}
              <p className="text-center mb-6 text-base text-white leading-relaxed opacity-90 min-h-[3rem] max-[1024px]:text-left max-[1024px]:col-[2] max-[1024px]:row-[2] max-[1024px]:text-[0.8rem] max-[1024px]:mb-0 max-[1024px]:self-start max-[768px]:text-[0.5rem] max-[767px]:text-[0.7rem] max-[530px]:text-[0.8rem] max-[480px]:text-[0.7rem] max-[480px]:col-[2] max-[480px]:row-[2] max-[480px]:min-h-0 max-[480px]:mb-0 max-[400px]:text-[0.5rem] max-[370px]:text-[0.45rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <strong className="text-[#dc3545] block">{product.taglineJp}</strong>
                <span className="block">{product.tagline}</span>
              </p>

              {/* Benefits */}
              <div className="mb-6 flex-1 max-[1024px]:col-[3] max-[1024px]:row-[1] max-[1024px]:mb-0 max-[1024px]:self-start max-[1024px]:w-full max-[480px]:col-[2] max-[480px]:row-[3] max-[480px]:mb-0 max-[480px]:self-start">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-2.5 max-[1024px]:gap-[6px] max-[1024px]:mb-[6px] max-[768px]:gap-1 max-[768px]:mb-1">
                    <span className="text-[#25C760] font-bold text-[1.2rem] shrink-0 -mt-0.5 max-[1024px]:text-[0.8rem] max-[768px]:text-[0.8rem] max-[480px]:text-[0.8rem]">&#10003;</span>
                    <span className="text-white text-[1.2rem] leading-relaxed max-[1024px]:text-[0.8rem] max-[1024px]:leading-[1.3] max-[767px]:text-[0.7rem] max-[530px]:text-[0.8rem] max-[480px]:text-[0.7rem] max-[480px]:leading-[1.3] max-[400px]:text-[0.45rem] max-[400px]:leading-[1.2]" style={{ fontFamily: 'Arial, sans-serif' }}>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* How to use */}
              <div className="flex-1 flex flex-col justify-between max-[1024px]:col-[3] max-[1024px]:row-[2] max-[1024px]:self-start max-[1024px]:w-full max-[480px]:col-[2] max-[480px]:row-[4] max-[480px]:self-start">
                <Link href={product.howToLink} className="no-underline">
                  <h4 className="flex items-center justify-start gap-2 text-[#25C760] font-semibold text-[1.5rem] mb-2.5 max-[1024px]:text-[1rem] max-[1024px]:mb-[6px] max-[1024px]:justify-start max-[767px]:text-[0.7rem] max-[530px]:text-[0.8rem] max-[480px]:text-[0.7rem] max-[400px]:text-[0.55rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <span>How to use</span>
                    <svg className="w-4 h-4 text-[#25C760] max-[480px]:w-3 max-[480px]:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                </Link>
                <div className="flex items-start gap-2.5 max-[1024px]:gap-[6px] max-[768px]:gap-1">
                  <span className="text-[#25C760] font-bold text-lg shrink-0 -mt-0.5 max-[1024px]:text-[0.8rem] max-[768px]:text-[0.8rem]">&#10003;</span>
                  <span className="text-white text-[0.95rem] leading-relaxed max-[1024px]:text-[0.8rem] max-[1024px]:leading-[1.3] max-[767px]:text-[0.7rem] max-[530px]:text-[0.8rem] max-[480px]:text-[0.7rem] max-[480px]:leading-[1.3] max-[400px]:text-[0.45rem] max-[400px]:leading-[1.2]" style={{ fontFamily: 'Arial, sans-serif' }}>{product.howToUse}</span>
                </div>
              </div>
            </div>

            {/* Buy button */}
            <div className="mt-auto pt-5 w-full max-[480px]:mt-[10px] max-[480px]:ml-[10px] max-[480px]:p-0 max-[480px]:w-auto max-[480px]:z-10 max-[400px]:mt-[8px] max-[400px]:ml-[8px]">
              <Link
                href={product.productLink}
                className="block w-full bg-white text-black border-none rounded-lg py-[5px] px-5 text-center font-semibold no-underline transition-all duration-300 hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 max-[480px]:rounded max-[530px]:py-[10px] max-[530px]:rounded"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-[1.1rem] max-[1024px]:text-[1rem] max-[768px]:text-[0.65rem] max-[530px]:text-[0.9rem] max-[480px]:text-[0.65rem] max-[400px]:text-[0.6rem] max-[375px]:text-[0.55rem]" style={{ color: 'inherit' }}>To Buy</span>
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Japanese terms */}
      <div className="pt-4 flex flex-col gap-[5px] max-w-[820px] mx-auto w-fit max-[480px]:gap-0">
        {[
          { label: "'TORIKOMU'", desc: 'means of having in Japanese as \u300C\u53D6\u308A\u8FBC\u3080\u300D' },
          { label: "'MAZEKOMU'", desc: 'means of mixing in Japanese as \u300C\u6DF7\u305C\u8FBC\u3080\u300D' },
          { label: "'SURIKOMU'", desc: 'means of rubbing in Japanese as \u300C\u64E6\u308A\u8FBC\u3080\u300D' },
        ].map((term) => (
          <div key={term.label} className="flex justify-center items-center gap-4 text-white text-[1rem] max-[1024px]:text-[0.9rem] max-[768px]:text-[0.7rem] max-[480px]:text-[0.65rem] max-[480px]:gap-[5px]" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="min-w-[110px] text-right font-bold text-[#dc3545] max-[480px]:min-w-[70px]">{term.label}</span>
            <span className="flex-1 text-left">{term.desc}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
