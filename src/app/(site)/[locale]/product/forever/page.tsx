import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

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
    priceJpy: '¥5,500',
    priceMvt: '10 MVT',
    inStock: getProductBySlug('forever')?.inStock ?? true,
    productImage: '/cdn/products_forever_10001.png',
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
      circles: [],
      ingredientInfo: [
        { label: isJa ? 'エネルギー' : 'Energy', value: '398kcal' },
        { label: isJa ? 'たんぱく質' : 'Protein', value: '65g' },
        { label: isJa ? '脂質' : 'Fat', value: '6.5g' },
        { label: isJa ? '炭水化物' : 'Carbohydrates', value: '20g' },
        { label: isJa ? 'ミネラル' : 'Minerals', value: '8g' },
      ],
      nutritionalDetails: [
        { name: 'C-Phycocyanin', value: isJa ? '約16-20g' : 'approx. 16-20g' },
        { name: isJa ? 'バリン' : 'Valine', value: '3.51g' },
        { name: isJa ? 'グリシン' : 'Glycine', value: '3.10g' },
        { name: isJa ? '食塩相当量' : 'Salt Equivalent', value: '1,050mg' },
        { name: isJa ? 'マンガン' : 'Manganese', value: '1.9mg' },
        { name: isJa ? 'ビタミンB6' : 'Vitamin B6', value: '0.36mg' },
        { name: isJa ? 'トリプトファン' : 'Tryptophan', value: '0.93g' },
        { name: isJa ? 'ヒスチジン' : 'Histidine', value: '1.09g' },
        { name: isJa ? 'プロリン' : 'Proline', value: '2.38g' },
        { name: isJa ? 'カリウム' : 'Potassium', value: '1,410mg' },
      ],
      benefits: [],
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
