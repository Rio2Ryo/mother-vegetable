'use client';

import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 'achieve', name: 'Achieve', subtitle: 'for Body',
    taglineJp: "'TORIKOMU'", tagline: '48 different nutrients at once.',
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
    benefits: ['Supports a healthy gut, Regeneration of cells throughout the body.', 'Helps relieve constipation, improve sleep, and aid weight management.'],
    howToUse: "Simply 'TORIKOMU' one capsule into your drink or meal.",
    howToLink: '/achieve-howto', productLink: '/product/achieve',
  },
  {
    id: 'confidence', name: 'Confidence', subtitle: 'For All Skin',
    taglineJp: "'SURIKOMU' , 'MAZEKOMU'", tagline: 'Skin Healing Effect',
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
    benefits: ['Powerful anti-aging benefits.', 'Helps improve dark spots, acne, odor, and skin damage.'],
    howToUse: "'SURIKOMU' directly or 'MAZEKOMU' into your current cosmetics.",
    howToLink: '/confidence-howto', productLink: '/product/confidence',
  },
  {
    id: 'forever', name: 'Forever', subtitle: 'for Pet',
    taglineJp: "'MAZEKOMU'", tagline: "to extend your pet's healthy life.",
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
    benefits: ['Supports tear stain reduction and gut health.', 'Helps reduce body and waste odors, boosts appetite.'],
    howToUse: "Simply 'MAZEKOMU' one capsule into your pet's food.",
    howToLink: '/forever-howto', productLink: '/product/forever',
  },
];

export default function ProductsSection() {
  return (
    <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]" id="product-listing">
      <h2 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider mb-2">Products</h2>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <div key={product.id} className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)] cursor-pointer">
            <div className="text-center mb-6">
              <video className="max-w-[120px] h-auto rounded-lg mx-auto object-cover" autoPlay muted loop playsInline>
                <source src={product.videoUrl} type="video/mp4" />
              </video>
            </div>
            <h3 className="text-center mb-4">
              <span className="block font-bold text-2xl text-[#25C760] mb-1">{product.name}</span>
              <span className="block text-sm text-[#25C760]">{product.subtitle}</span>
            </h3>
            <p className="text-center mb-6 text-base text-white leading-relaxed opacity-90 min-h-[3rem]">
              <strong className="text-[#dc3545] block">{product.taglineJp}</strong>
              <span>{product.tagline}</span>
            </p>
            <div className="mb-6 flex-1">
              {product.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 mb-2.5">
                  <span className="text-[#25C760] font-bold text-lg shrink-0 -mt-0.5">✓</span>
                  <span className="text-white text-base leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <Link href={product.howToLink} className="no-underline">
                <h4 className="flex items-center justify-center gap-2 text-[#25C760] font-semibold text-lg mb-2.5">
                  <span>How to use</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </h4>
              </Link>
              <div className="flex items-start gap-2.5">
                <span className="text-[#25C760] font-bold text-lg shrink-0 -mt-0.5">✓</span>
                <span className="text-white text-sm leading-relaxed">{product.howToUse}</span>
              </div>
              <div className="mt-auto pt-5 w-full">
                <Link href={product.productLink} className="block w-full bg-white text-black border-none rounded-lg py-2.5 px-5 text-center font-semibold text-base no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all duration-300">
                  To Buy
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 flex flex-col gap-1 max-w-[820px] mx-auto w-fit">
        {[
          { label: "'TORIKOMU'", desc: 'means of having in Japanese as 「取り込む」' },
          { label: "'MAZEKOMU'", desc: 'means of mixing in Japanese as 「混ぜ込む」' },
          { label: "'SURIKOMU'", desc: 'means of rubbing in Japanese as 「擦り込む」' },
        ].map((term) => (
          <div key={term.label} className="flex justify-center items-center gap-4 text-white text-sm md:text-base">
            <span className="min-w-[110px] text-right font-bold text-[#dc3545]">{term.label}</span>
            <span className="flex-1 text-left">{term.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
