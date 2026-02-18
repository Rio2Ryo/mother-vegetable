import ProductPage from '@/components/ProductPage';

const achieveProduct = {
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
  drinkItems: [
    { name: 'Water', image: '/Images/Assets/achieve/mazekomu/water_green.png' },
    { name: 'Juice', image: '/Images/Assets/achieve/mazekomu/juice.png' },
    { name: 'Cola', image: '/Images/Assets/achieve/mazekomu/cola.png' },
    { name: 'Beer', image: '/Images/Assets/achieve/mazekomu/beer.png' },
    { name: 'Highball', image: '/Images/Assets/achieve/mazekomu/highball.png' },
    { name: 'White Wine', image: '/Images/Assets/achieve/mazekomu/whiteWine.png' },
  ],
  foodItems: [
    { name: 'Yogurt', image: '/Images/Assets/achieve/mazekomu/yogurt.png' },
    { name: 'Salad', image: '/Images/Assets/achieve/mazekomu/salad.png' },
    { name: 'Pasta', image: '/Images/Assets/achieve/mazekomu/pasta.png' },
    { name: 'Ramen', image: '/Images/Assets/achieve/mazekomu/ramen.png' },
    { name: 'Fried Rice', image: '/Images/Assets/achieve/mazekomu/friedRice.png' },
    { name: 'Tempura', image: '/Images/Assets/achieve/mazekomu/tempura.png' },
  ],
};

export default function AchievePage() {
  return <ProductPage product={achieveProduct} />;
}
