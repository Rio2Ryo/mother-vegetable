import ProductPage from '@/components/ProductPage';

const confidenceProduct = {
  id: 'confidence',
  name: 'Confidence',
  fullName: 'Mother Vegetable Confidence - 30 sticks',
  subtitle: 'For All Skin',
  taglineJp: "'SURIKOMU' , 'MAZEKOMU'",
  tagline: 'Skin Healing Effect',
  price: 36.70,
  currency: 'USD',
  priceDisplay: 'USD 36.70',
  productImage: '/cdn/products_achieve_10001.png',
  videoUrls: [
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_1.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_2.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_3.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_4.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_5.mp4',
  ],
  mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
  benefits: [
    'Powerful anti-aging benefits.',
    'Helps improve dark spots, acne, odor, and skin damage.',
  ],
  howToUse: "'SURIKOMU' directly or 'MAZEKOMU' into your current cosmetics.",
  howToLink: '/confidence-howto',
  cosmeticItems: [
    { name: 'Dark Spots', image: '/Images/Assets/confidence/mazekomu/darkSpot.png' },
    { name: 'Acne', image: '/Images/Assets/confidence/mazekomu/acne.png' },
    { name: 'Freckles', image: '/Images/Assets/confidence/mazekomu/freckles.png' },
    { name: 'Wound/Burn', image: '/Images/Assets/confidence/mazekomu/woundBurn.png' },
    { name: 'Allergy', image: '/Images/Assets/confidence/mazekomu/allergy.png' },
    { name: 'Odor', image: '/Images/Assets/confidence/mazekomu/smell.png' },
    { name: 'Bathtub', image: '/Images/Assets/confidence/mazekomu/bathtub.png' },
    { name: 'Shampoo', image: '/Images/Assets/confidence/mazekomu/shampoo.png' },
    { name: 'Lip Balm', image: '/Images/Assets/confidence/mazekomu/ripbalm.png' },
    { name: 'Toothpaste', image: '/Images/Assets/confidence/mazekomu/toothpaste.png' },
    { name: 'Manicure', image: '/Images/Assets/confidence/mazekomu/manicure.png' },
    { name: 'Cosmetic', image: '/Images/Assets/confidence/mazekomu/cosmetic.png' },
  ],
};

export default function ConfidencePage() {
  return <ProductPage product={confidenceProduct} />;
}
