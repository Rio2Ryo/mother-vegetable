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
      subtitle: isJa ? '飲むタイプ' : 'Drinkable Type',
      subName: 'Flesh Dry Protein',
      tagline: isJa ? '48種類の栄養を一度に摂取' : '48 different nutrients at once.',
      videoUrl: '/new_achieve_video.mp4',
      imageUrl: null,
      features: isJa
        ? ['48種類の栄養を一度に摂取', '毎日の健康を大切な人と']
        : ['48 different nutrients in one serving', 'Share daily wellness with your loved ones'],
      howToUseLabel: isJa ? 'Achieveの料理/ドリンク一覧' : 'Achieve Recipes & Drinks',
      howToLink: '/achieve-howto',
      productLink: '/product/achieve',
    },
    {
      id: 'confidence',
      name: 'Confidence',
      subtitle: isJa ? '肌に塗るタイプ' : 'Topical Type',
      subName: 'Flesh Bridge Collagen',
      tagline: isJa ? '肌の気になるところに直接塗布' : 'Skin Healing Effect',
      videoUrl: '/new_confidence_video.mp4',
      imageUrl: null,
      features: isJa
        ? ['肌の気になるところに直接塗布', 'お気に入りコスメに混ぜて使用']
        : ['Apply directly to areas of skin concern', 'Mix into your favorite cosmetics'],
      howToUseLabel: isJa ? 'Confidenceの混ぜ方/使い方一覧' : 'Confidence Mixing & Usage Guide',
      howToLink: '/confidence-howto',
      productLink: '/product/confidence',
    },
    {
      id: 'tilapia',
      name: isJa ? 'マザベジフィッシュ' : 'MV Fish',
      subtitle: isJa ? 'ティラピア / 1匹' : 'Tilapia / 1 fish',
      subName: '',
      tagline: isJa ? 'スピルリナで育てた新鮮なティラピア' : 'Fresh tilapia enriched with spirulina',
      videoUrl: null,
      imageUrl: '/images/mv_tilapia.jpg',
      features: isJa
        ? ['48種類の栄養素を含む高タンパク食品', 'オメガ3脂肪酸・必須ミネラル豊富']
        : ['High protein with 48 different nutrients', 'Rich in omega-3 fatty acids & minerals'],
      howToUseLabel: isJa ? '調理方法を見る' : 'How to Cook',
      howToLink: '/product/tilapia',
      productLink: '/product/tilapia',
    },
    {
      id: 'mv-salt',
      name: isJa ? 'マザベジ塩' : 'MV Salt',
      subtitle: '50g',
      subName: '',
      tagline: isJa ? 'スピルリナ配合の緑色の塩' : 'Green spirulina infused salt',
      videoUrl: null,
      imageUrl: '/images/mv_salt.jpg',
      features: isJa
        ? ['48種類の栄養素が摂れる緑の塩', '毎日の料理に混ぜるだけ']
        : ['Green salt with 48 different nutrients', 'Simply add to everyday cooking'],
      howToUseLabel: isJa ? '使い方を見る' : 'How to Use',
      howToLink: '/product/mv-salt',
      productLink: '/product/mv-salt',
    },
    {
      id: 'mv-soy-sauce',
      name: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? 'スピルリナ配合プレミアム醤油' : 'Premium spirulina dark soy sauce',
      videoUrl: null,
      imageUrl: '/images/mv_soy_sauce.jpg',
      features: isJa
        ? ['48種類の栄養素入りプレミアム醤油', '豊かな旨味と栄養素で毎日をサポート']
        : ['Premium soy sauce with 48 nutrients', 'Rich umami with added health benefits'],
      howToUseLabel: isJa ? '使い方を見る' : 'How to Use',
      howToLink: '/product/mv-soy-sauce',
      productLink: '/product/mv-soy-sauce',
    },
    {
      id: 'mv-toner',
      name: isJa ? 'マザベジ化粧水' : 'MV Toner',
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? 'Confidenceコラーゲン配合の化粧水' : 'Confidence-powered skin toner',
      videoUrl: null,
      imageUrl: '/images/mv_toner.jpg',
      features: isJa
        ? ['肌トラブル改善・Confidenceコラーゲン配合', 'スピルリナで深い保湿・シワ軽減']
        : ['Skin Healing Effect — Confidence collagen', 'Deep hydration & wrinkle reduction'],
      howToUseLabel: isJa ? '使い方を見る' : 'How to Use',
      howToLink: '/product/mv-toner',
      productLink: '/product/mv-toner',
    },
    {
      id: 'mv-balm',
      name: isJa ? 'マザベジバウム' : 'MV Balm',
      subtitle: '50g',
      subName: '',
      tagline: isJa ? 'Confidenceコラーゲン配合のラグジュアリーバウム' : 'Confidence-powered luxury balm',
      videoUrl: null,
      imageUrl: '/images/mv_balm.jpg',
      features: isJa
        ? ['肌トラブル改善・集中的な肌修復', '顔・唇・ボディのマルチユース']
        : ['Skin Healing Effect — intensive repair', 'Multi-use for face, lips & body'],
      howToUseLabel: isJa ? '使い方を見る' : 'How to Use',
      howToLink: '/product/mv-balm',
      productLink: '/product/mv-balm',
    },
    {
      id: 'mv-soap',
      name: isJa ? 'マザベジ石鹸' : 'MV Soap',
      subtitle: '100g',
      subName: '',
      tagline: isJa ? 'Confidenceコラーゲン配合の手作り石鹸' : 'Confidence-powered spirulina soap',
      videoUrl: null,
      imageUrl: '/images/mv_soap.jpg',
      features: isJa
        ? ['肌トラブル改善・洗いながら肌を修復', 'スピルリナのディープクレンジング']
        : ['Skin Healing Effect — cleanses & heals', 'Natural spirulina deep cleanse'],
      howToUseLabel: isJa ? '使い方を見る' : 'How to Use',
      howToLink: '/product/mv-soap',
      productLink: '/product/mv-soap',
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
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
              {/* Video or Image */}
              <div className="flex-shrink-0 self-stretch md:self-auto md:mb-4 md:flex md:justify-center">
                {product.videoUrl ? (
                  <video
                    src={product.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-24 h-full md:w-28 md:h-52 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={product.imageUrl!}
                    alt={product.name}
                    className="w-24 h-24 md:w-28 md:h-52 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col">
                {/* Title & Subtitle */}
                <div className="mb-1 md:text-center">
                  <h3 className="text-lg md:text-3xl font-bold" style={{ color: '#25c760' }}>
                    {product.name}
                  </h3>
                  <p className="text-green-400 text-xs md:text-sm">{product.subtitle}</p>
                  {product.subName && <p className="text-green-400 text-xs md:text-sm">{product.subName}</p>}
                </div>

                {/* Features */}
                <div className="space-y-1 mb-2 mt-5">
                  {product.features.map((feature, idx) => (
                    <p key={idx} className="text-white text-[10px] md:text-lg flex items-start md:justify-center">
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

    </motion.div>
  );
}
