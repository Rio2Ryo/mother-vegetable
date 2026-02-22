import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Achieve — 48 Nutrients in One Stick',
  description:
    'Mother Vegetable Achieve delivers 48 different nutrients in a single stick. Premium health supplement for daily wellness. USD 36.70 with free worldwide shipping.',
  openGraph: {
    title: 'Mother Vegetable Achieve — 48 Nutrients in One Stick',
    description: 'Premium health supplement delivering 48 nutrients in one stick.',
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable Achieve' }],
  },
};

const achieveProduct: ProductPageData = {
  id: 'achieve',
  name: 'Achieve',
  fullName: 'Mother Vegetable Achieve - 30 sticks',
  subtitle: 'for Body',
  taglineJp: "'TORIKOMU'",
  tagline: '48 different nutrients at once.',
  price: 36.70,
  currency: 'USD',
  priceDisplay: 'USD 36.70',
  productImage: '/cdn/products_achieve_10001.png',
  videoUrls: [
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_1.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_2.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_3.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_4.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_5.mp4',
  ],
  mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
  benefits: [
    'Supports a healthy gut, Regeneration of cells throughout the body.',
    'Helps relieve constipation, improve sleep, and aid weight management.',
  ],
  howToUse: "Simply 'TORIKOMU' one capsule into your drink or meal.",
  howToLink: '/achieve-howto',

  leftSection: {
    title: 'Drink',
    items: [
      { name: 'Water', image: '/Images/Assets/achieve/mazekomu/water_green.png' },
      { name: 'Juice', image: '/Images/Assets/achieve/mazekomu/juice.png' },
      { name: 'Cola', image: '/Images/Assets/achieve/mazekomu/cola.png' },
      { name: 'Beer', image: '/Images/Assets/achieve/mazekomu/beer.png' },
      { name: 'White wine', image: '/Images/Assets/achieve/mazekomu/whiteWine.png' },
      { name: 'Highball', image: '/Images/Assets/achieve/mazekomu/highball.png' },
    ],
  },
  rightSection: {
    title: 'Food',
    items: [
      { name: 'Fried Rice', image: '/Images/Assets/achieve/mazekomu/friedRice.png' },
      { name: 'Ramen', image: '/Images/Assets/achieve/mazekomu/ramen.png' },
      { name: 'Salad', image: '/Images/Assets/achieve/mazekomu/salad.png' },
      { name: 'Yogurt', image: '/Images/Assets/achieve/mazekomu/yogurt.png' },
      { name: 'Pasta', image: '/Images/Assets/achieve/mazekomu/pasta.png' },
      { name: 'Tempura', image: '/Images/Assets/achieve/mazekomu/tempura.png' },
    ],
  },
  centerTitle: 'MAZEKOMU',
  centerImage: '/Images/Assets/achieve/mazekomu/mazekomu.png',

  trust: {
    productName: 'Achieve',
    certification: 'certified human grade food by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
    subtitle: 'Achieve',
    method: 'TORIKOMU / MAZEKOMU',
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
        title: 'Children',
        image: '/Images/Assets/homepage/foodFunction/children.png',
        items: [
          'Improves concentration',
          'Enhances learning ability',
          'Supports bone growth',
          'Boosts immunity',
          'Increases appetite',
        ],
      },
      {
        title: 'Adults',
        image: '/Images/Assets/homepage/foodFunction/alduts.png',
        items: [
          'Improves constipation and digestion',
          'Enhances sleep quality',
          'Reduces fatigue',
          'Suppresses cellular aging and inflammation',
          'Supports dieting*',
        ],
      },
      {
        title: 'Seniors',
        image: '/Images/Assets/homepage/foodFunction/seniors.png',
        items: [
          'Improves sleep quality and blood circulation',
          'Boosts appetite and nutrient intake',
          'Supports internal organ function',
          'Promotes bone density',
        ],
      },
      {
        title: 'Athletes',
        image: '/Images/Assets/homepage/foodFunction/athletes.png',
        items: [
          'Detoxifies additives',
          'Aids muscle recovery and improves endurance',
          'Provides efficient nutrient absorption',
          'Reduces inflammation and supports recovery',
          'Enhances training effectiveness',
        ],
      },
    ],
  },
};

export default async function AchievePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductPage product={achieveProduct} />;
}
