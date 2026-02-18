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
    howToUse: "'SURIKOMU' directly or 'MAZEKOMU' into your current cosmetics.",
    howToLink: '/confidence-howto', productLink: '/product/confidence',
    cardClass: 'heal-card',
  },
  {
    id: 'forever', name: 'Forever', subtitle: 'for Pet',
    taglineJp: "'MAZEKOMU'", tagline: "to extend your pet's healthy life.",
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
    benefits: ['Supports tear stain reduction and gut health.', 'Helps reduce body and waste odors, boosts appetite.'],
    howToUse: "Simply 'MAZEKOMU' one capsule into your pet's food.",
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
      className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
      id="product-listing"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-2">Products</h2>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

      {/* Bento grid: 3 equal columns on desktop, single col on tablet, 2-col card layout on mobile */}
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
            className="bg-black border border-[#25C760] rounded-xl p-[30px] flex flex-col transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)] cursor-pointer max-[480px]:p-0"
          >
            {/* Card content: column on desktop, grid on mobile */}
            <div className="flex flex-col max-[480px]:grid max-[480px]:grid-cols-[0.5fr_1.3fr] max-[480px]:grid-rows-[auto_auto_auto_auto] max-[480px]:gap-[10px_12px] max-[480px]:items-start max-[480px]:p-3">
              {/* Video */}
              <div className="text-center mb-5 max-[480px]:mb-0 max-[480px]:col-[1] max-[480px]:row-[1/5] max-[480px]:flex max-[480px]:items-center max-[480px]:justify-center max-[480px]:h-full">
                <video
                  className="max-w-[120px] h-auto rounded-lg mx-auto object-cover max-[480px]:w-full max-[480px]:max-w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={product.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Product title */}
              <h3 className="text-center mb-4 max-[480px]:text-left max-[480px]:mb-0 max-[480px]:col-[2] max-[480px]:row-[1] max-[480px]:self-start" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="block font-bold text-[2rem] text-[#25C760] mb-1 max-[768px]:text-base max-[480px]:text-sm">{product.name}</span>
                <span className="block text-sm text-[#25C760] max-[480px]:text-xs">{product.subtitle}</span>
              </h3>

              {/* Tagline */}
              <p className="text-center mb-6 text-base text-white leading-relaxed opacity-90 min-h-[3rem] max-[480px]:text-left max-[480px]:text-[0.7rem] max-[480px]:mb-0 max-[480px]:min-h-0 max-[480px]:col-[2] max-[480px]:row-[2] max-[480px]:self-start" style={{ fontFamily: 'Arial, sans-serif' }}>
                <strong className="text-[#dc3545] block">{product.taglineJp}</strong>
                <span>{product.tagline}</span>
              </p>

              {/* Benefits */}
              <div className="mb-6 flex-1 max-[480px]:mb-0 max-[480px]:col-[2] max-[480px]:row-[3] max-[480px]:self-start">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-2.5">
                    <span className="text-[#25C760] font-bold text-[1.2rem] shrink-0 -mt-0.5">&#10003;</span>
                    <span className="text-white text-[1.2rem] leading-relaxed max-[480px]:text-[0.7rem] max-[768px]:text-[0.8rem]" style={{ fontFamily: 'Arial, sans-serif' }}>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* How to use + Buy button */}
              <div className="flex-1 flex flex-col justify-between max-[480px]:col-[2] max-[480px]:row-[4] max-[480px]:self-start">
                <Link href={product.howToLink} className="no-underline">
                  <h4 className="flex items-center justify-start gap-2 text-[#25C760] font-semibold text-[1.5rem] mb-2.5 max-[480px]:text-[0.7rem] max-[768px]:text-[0.8rem]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <span className="text-[#25C760] text-[1.2rem] max-[480px]:text-[1rem]">&#9654;</span>
                    <span>How to use</span>
                  </h4>
                </Link>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#25C760] font-bold text-lg shrink-0 -mt-0.5">&#10003;</span>
                  <span className="text-white text-sm leading-relaxed max-[480px]:text-[0.7rem]" style={{ fontFamily: 'Arial, sans-serif' }}>{product.howToUse}</span>
                </div>
              </div>
            </div>

            {/* Buy button outside the mobile grid */}
            <div className="mt-auto pt-5 w-full max-[480px]:px-3 max-[480px]:pb-3">
              <Link
                href={product.productLink}
                className="block w-full bg-white text-black border-none rounded-lg py-2.5 px-5 text-center font-semibold text-[1.1rem] no-underline transition-all duration-300 hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>To Buy</span>
                  <svg className="w-5 h-5 transition-transform duration-300" fill="currentColor" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h370.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" /></svg>
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Japanese terms */}
      <div className="pt-6 flex flex-col gap-1 max-w-[820px] mx-auto w-fit">
        {[
          { label: "'TORIKOMU'", desc: 'means of having in Japanese as \u300C\u53D6\u308A\u8FBC\u3080\u300D' },
          { label: "'MAZEKOMU'", desc: 'means of mixing in Japanese as \u300C\u6DF7\u305C\u8FBC\u3080\u300D' },
          { label: "'SURIKOMU'", desc: 'means of rubbing in Japanese as \u300C\u64E6\u308A\u8FBC\u3080\u300D' },
        ].map((term) => (
          <div key={term.label} className="flex justify-center items-center gap-4 text-white text-sm md:text-base" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="min-w-[110px] text-right font-bold text-[#dc3545] max-[480px]:min-w-[70px]">{term.label}</span>
            <span className="flex-1 text-left">{term.desc}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
