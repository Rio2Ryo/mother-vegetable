import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';

export const metadata: Metadata = {
  title: 'Forever — Pet Health Supplement',
  description: 'Mother Vegetable Forever supports your pet\'s gut health, reduces tear stains and body odor. Natural supplement for a longer, healthier life.',
  openGraph: {
    title: 'Mother Vegetable Forever — Pet Health Supplement',
    description: 'Natural supplement for your pet\'s gut health and longer, healthier life.',
    images: [{ url: '/cdn/products_forever_10001.png', width: 800, height: 800, alt: 'Mother Vegetable Forever' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable Forever — Pet Health Supplement',
    description: 'Natural supplement for your pet\'s gut health and longer, healthier life.',
  },
};

function getForeverProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'forever',
    name: 'Forever',
    fullName: 'Mother Vegetable Forever - 30 sticks',
    subtitle: isJa ? 'ペットのために' : 'for Pet',
    taglineJp: '',
    tagline: isJa ? 'ペットの健康寿命を延ばす。' : "to extend your pet's healthy life.",
    price: 36.70,
    currency: 'USD',
    priceDisplay: 'USD 36.70',
    productImage: '/cdn/products_achieve_10001.png',
    videoUrls: [
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever/video_1.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever/video_2.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever/video_3.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever/video_4.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever/video_5.mp4',
    ],
    mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
    benefits: isJa
      ? [
          '涙やけの軽減と腸の健康をサポート。',
          '体臭・排泄臭の軽減、食欲増進。',
        ]
      : [
          'Supports tear stain reduction and gut health.',
          'Helps reduce body and waste odors, boosts appetite.',
        ],
    howToUse: isJa
      ? 'スティック1本をペットのフードに混ぜるだけ。'
      : "Simply mix one stick into your pet's food.",
    howToLink: '/forever-howto',

    leftSection: {
      title: isJa ? '犬' : 'Dog',
      items: [
        { name: isJa ? 'ドライフード' : 'Dry Food', image: '/Images/Assets/forever/mazekomu/dryFood.png' },
        { name: isJa ? 'ウェットフード' : 'Wet Food', image: '/Images/Assets/forever/mazekomu/wetFood.png' },
        { name: isJa ? '水' : 'Water', image: '/Images/Assets/forever/mazekomu/dogWater.png' },
        { name: isJa ? 'おやつ' : 'Treats', image: '/Images/Assets/forever/mazekomu/dogTreats.png' },
      ],
    },
    rightSection: {
      title: isJa ? '猫' : 'Cat',
      items: [
        { name: isJa ? 'ドライフード' : 'Dry Food', image: '/Images/Assets/forever/mazekomu/dryFood.png' },
        { name: isJa ? 'ウェットフード' : 'Wet Food', image: '/Images/Assets/forever/mazekomu/wetFood.png' },
        { name: isJa ? '水' : 'Water', image: '/Images/Assets/forever/mazekomu/catWater.png' },
        { name: isJa ? 'おやつ' : 'Treats', image: '/Images/Assets/forever/mazekomu/catTreats.png' },
      ],
    },
    centerTitle: isJa ? '混ぜる' : 'Mix In',
    centerImage: '/Images/Assets/forever/mazekomu/mazekomu.png',

    trust: {
      productName: 'Forever',
      certification: isJa
        ? '農林水産省によりペットフードグレード認定'
        : 'certified by pet grade food by Ministry of Agriculture, Forestry and Fisheries (MAFF), Japan',
      partners: [
        '/Images/Assets/homepage/company/partner_1.png',
        '/Images/Assets/homepage/company/partner_2.png',
        '/Images/Assets/homepage/company/partner_3.png',
        '/Images/Assets/homepage/company/partner_4.png',
        '/Images/Assets/homepage/company/partner_5.png',
        '/Images/Assets/homepage/company/partner_6.png',
      ],
    },

    functionSection: {
      type: 'food',
      title: 'Food Function',
      subtitle: 'Forever',
      method: isJa ? '加える / 混ぜる' : 'Add / Mix In',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Essential Fatty Acids', detail: '9 types' },
        { name: 'Amino Acids', detail: '10 types' },
        { name: 'Vital Vitamins', detail: '18 types' },
        { name: 'Key Minerals For Balance', detail: '3 types' },
        { name: 'Other Functional Ingredients', detail: '9 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description:
          'Potassium, sodium, magnesium, calcium, phosphorus, iron, manganese, zinc, copper, Vitamin A, B1, B2, B3, B5, B6, B9, C, E, K, tryptophan, threonine, leucine, isoleucine, lysine, methionine, phenylalanine, valine, histidine, arginine, cystine, tyrosine, alanine, aspartic acid, glutamic acid, serine, glycine, proline, saturated fatty acids, omega-3 fatty acids, omega-6 fatty acids, C-phycocyanin, chlorophyll a, total carotenoids, nucleic acids, spirulan, glycogen-like polysaccharides, β-glucan-like polysaccharides, cellulose.',
      },
      benefits: isJa
        ? [
            {
              title: '犬',
              image: '/Images/Assets/homepage/foodFunction/dog.png',
              items: [
                '涙やけの軽減',
                '排泄臭の改善',
                '食欲増進',
                '消化の健康をサポート',
                '深い睡眠を促進',
                '体臭の軽減',
              ],
            },
            {
              title: '猫',
              image: '/Images/Assets/homepage/foodFunction/cat.png',
              items: [
                '涙やけの軽減',
                '排泄臭の改善',
                '食欲増進',
                '消化の健康をサポート',
                '深い睡眠を促進',
                '体臭の軽減',
              ],
            },
          ]
        : [
            {
              title: 'Dog',
              image: '/Images/Assets/homepage/foodFunction/dog.png',
              items: [
                'Reduces tear stains',
                'Improves waste odor',
                'Increases appetite',
                'Supports digestive health',
                'Promotes deep sleep',
                'Reduces body odor',
              ],
            },
            {
              title: 'Cat',
              image: '/Images/Assets/homepage/foodFunction/cat.png',
              items: [
                'Reduces tear stains',
                'Improves waste odor',
                'Increases appetite',
                'Supports digestive health',
                'Promotes deep sleep',
                'Reduces body odor',
              ],
            },
          ],
    },
  };
}

export default async function ForeverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const foreverProduct = getForeverProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="Mother Vegetable Forever"
        description="Natural pet health supplement. Supports gut health, reduces tear stains and body odor."
        image="/cdn/products_forever_10001.png"
        price={36.70}
        slug="forever"
      />
      <ProductPage product={foreverProduct} />
    </>
  );
}
