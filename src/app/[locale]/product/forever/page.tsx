import { setRequestLocale } from 'next-intl/server';
import ProductPage from '@/components/ProductPage';

const foreverProduct = {
  id: 'forever',
  name: 'Forever',
  fullName: 'Mother Vegetable Forever - 30 sticks',
  subtitle: 'for Pet',
  taglineJp: "'MAZEKOMU'",
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
  howToUse: "Simply 'MAZEKOMU' one capsule into your pet's food.",
  howToLink: '/forever-howto',
  foodItems: [
    { name: 'Dry Food', image: '/Images/Assets/forever/mazekomu/dryFood.png' },
    { name: 'Wet Food', image: '/Images/Assets/forever/mazekomu/wetFood.png' },
    { name: 'Dog Water', image: '/Images/Assets/forever/mazekomu/dogWater.png' },
    { name: 'Cat Water', image: '/Images/Assets/forever/mazekomu/catWater.png' },
    { name: 'Dog Treats', image: '/Images/Assets/forever/mazekomu/dogTreats.png' },
    { name: 'Cat Treats', image: '/Images/Assets/forever/mazekomu/catTreats.png' },
  ],
};

export default async function ForeverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductPage product={foreverProduct} />;
}
