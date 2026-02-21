'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

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

function getProducts(isJa: boolean) {
  return [
    {
      id: 'achieve',
      name: 'Achieve',
      subtitle: isJa ? '身体のために' : 'for Body',
      taglineJp: "'TORIKOMU'",
      tagline: isJa ? '48種類の栄養を一度に摂取' : '48 different nutrients at once.',
      videoUrl: '/Images/Assets/homepage/product/achieve_video.mp4',
      features: isJa
        ? ['48種類の栄養を一度に摂取', '毎日の健康を大切な人と']
        : ['48 different nutrients in one serving', 'Share daily wellness with your loved ones'],
      howToUse: isJa
        ? "1スティックを飲み物や食事に'TORIKOMU'"
        : "Simply 'TORIKOMU' one capsule into your drink or meal.",
      howToUseLabel: isJa ? 'Achieveの料理/ドリンク一覧' : 'Achieve Recipes & Drinks',
      howToLink: '/achieve-howto',
      productLink: '/product/achieve',
    },
    {
      id: 'confidence',
      name: 'Confidence',
      subtitle: isJa ? 'すべての肌に' : 'for All Skin',
      taglineJp: "'SURIKOMU' , 'MAZEKOMU'",
      tagline: isJa ? '肌の気になるところに直接塗布' : 'Skin Healing Effect',
      videoUrl: '/Images/Assets/homepage/product/confidence_v2.mp4',
      features: isJa
        ? ['肌の気になるところに直接塗布', 'お気に入りコスメに混ぜて使用']
        : ['Apply directly to areas of skin concern', 'Mix into your favorite cosmetics'],
      howToUse: isJa
        ? "直接 'SURIKOMU' または コスメに 'MAZEKOMU'"
        : "'SURIKOMU' directly or 'MAZEKOMU' into your current cosmetics.",
      howToUseLabel: isJa ? 'Confidenceの混ぜ方/使い方一覧' : 'Confidence Mixing & Usage Guide',
      howToLink: '/confidence-howto',
      productLink: '/product/confidence',
    },
    {
      id: 'forever',
      name: 'Forever',
      subtitle: isJa ? 'ペットのために' : 'for Pet',
      taglineJp: "'MAZEKOMU'",
      tagline: isJa ? 'フードに混ぜて栄養48種を摂取' : "to extend your pet's healthy life.",
      videoUrl: '/Images/Assets/homepage/product/forever_video.mp4',
      features: isJa
        ? ['フードに混ぜて栄養48種を摂取', '大切なペットと永く健康に']
        : ['Mix into food for 48 essential nutrients', 'Live a long, healthy life with your beloved pet'],
      howToUse: isJa
        ? "ペットフードに1スティックを'MAZEKOMU'"
        : "Simply 'MAZEKOMU' one capsule into your pet's food.",
      howToUseLabel: isJa ? 'Foreverのペット種類別与え方一覧' : 'Forever Feeding Guide by Pet Type',
      howToLink: '/forever-howto',
      productLink: '/product/forever',
    },
  ];
}

export default function ProductsSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const products = getProducts(isJa);

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
        Products
      </h2>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-12 opacity-80" />

      {/* Product Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            className="rounded-lg p-3 md:p-6"
            style={{ border: '1px solid #25c760' }}
          >
            {/* Mobile: Horizontal Layout / Desktop: Vertical Layout */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-0">
              {/* Video */}
              <div className="flex-shrink-0 self-stretch md:self-auto md:mb-4 md:flex md:justify-center">
                <video
                  src={product.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-24 h-full md:w-28 md:h-52 object-cover rounded-lg"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col">
                {/* Title & Subtitle */}
                <div className="mb-1 md:text-center">
                  <h3 className="text-lg md:text-3xl font-bold" style={{ color: '#25c760' }}>
                    {product.name}
                  </h3>
                  <p className="text-green-400 text-xs md:text-sm">{product.subtitle}</p>
                </div>

                {/* Label */}
                <p className="text-red-600 font-semibold text-xs md:text-sm md:text-center">
                  {product.taglineJp}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-2 mt-5">
                  {product.features.map((feature, idx) => (
                    <p key={idx} className="text-white text-[10px] md:text-lg flex items-start">
                      <span className="text-green-400 mr-1 md:mr-2">{'\u2713'}</span>
                      {feature}
                    </p>
                  ))}
                </div>

                {/* How to use */}
                <div className="mb-2 md:mt-6 md:mb-2">
                  <Link
                    href={product.howToLink}
                    className="text-green-400 font-semibold text-xs md:text-xl mb-1 hover:underline block text-center"
                  >
                    {product.howToUseLabel}
                  </Link>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="mt-4 md:mt-6 px-2 md:px-4 pb-1 md:pb-2">
              <Link
                href={product.productLink}
                className="block w-full text-center py-2.5 md:py-3 bg-white text-black font-semibold text-sm md:text-base rounded-full hover:bg-gray-200 transition-colors no-underline"
              >
                {isJa ? '購入ページ' : 'Purchase'}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Text */}
      <div className="space-y-0 md:space-y-1 text-center mt-8 md:mt-12">
        {[
          { label: "'TORIKOMU'", text: 'means of having in Japanese as \u300C\u53D6\u308A\u8FBC\u3080\u300D' },
          { label: "'MAZEKOMU'", text: 'means of mixing in Japanese as \u300C\u6DF7\u305C\u8FBC\u3080\u300D' },
          { label: "'SURIKOMU'", text: 'means of rubbing in Japanese as \u300C\u64E6\u308A\u8FBC\u3080\u300D' },
        ].map((item, index) => (
          <div key={index} className="text-[10px] md:text-base">
            <span className="text-red-600 font-semibold mr-4">{item.label}</span>
            <span className="text-gray-300">{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
