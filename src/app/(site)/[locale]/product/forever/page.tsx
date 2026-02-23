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
};

const foreverProduct: ProductPageData = {
  id: 'forever',
  name: 'Forever',
  fullName: 'Mother Vegetable Forever - 30 sticks',
  subtitle: 'for Pet',
  taglineJp: '',
  tagline: "to extend your pet's healthy life.",
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
  benefits: [
    'Supports tear stain reduction and gut health.',
    'Helps reduce body and waste odors, boosts appetite.',
  ],
  howToUse: "Simply mix one stick into your pet's food.",
  howToLink: '/forever-howto',

  leftSection: {
    title: 'Dog',
    items: [
      { name: 'Dry Food', image: '/Images/Assets/forever/mazekomu/dryFood.png' },
      { name: 'Wet Food', image: '/Images/Assets/forever/mazekomu/wetFood.png' },
      { name: 'Water', image: '/Images/Assets/forever/mazekomu/dogWater.png' },
      { name: 'Treats', image: '/Images/Assets/forever/mazekomu/dogTreats.png' },
    ],
  },
  rightSection: {
    title: 'Cat',
    items: [
      { name: 'Dry Food', image: '/Images/Assets/forever/mazekomu/dryFood.png' },
      { name: 'Wet Food', image: '/Images/Assets/forever/mazekomu/wetFood.png' },
      { name: 'Water', image: '/Images/Assets/forever/mazekomu/catWater.png' },
      { name: 'Treats', image: '/Images/Assets/forever/mazekomu/catTreats.png' },
    ],
  },
  centerTitle: 'Mix In',
  centerImage: '/Images/Assets/forever/mazekomu/mazekomu.png',

  trust: {
    productName: 'Forever',
    certification: 'certified by pet grade food by Ministry of Agriculture, Forestry and Fisheries (MAFF), Japan',
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
    method: 'Add / Mix In',
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
    benefits: [
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

export default async function ForeverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
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
