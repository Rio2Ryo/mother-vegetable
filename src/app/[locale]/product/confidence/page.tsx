import { setRequestLocale } from 'next-intl/server';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';

const confidenceProduct: ProductPageData = {
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
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_2.mp4',
    'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_1.mp4',
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

  leftSection: {
    title: 'SURIKOMU',
    items: [
      { name: 'Dark Spot', image: '/Images/Assets/confidence/mazekomu/darkSpot.png' },
      { name: 'Acne', image: '/Images/Assets/confidence/mazekomu/acne.png' },
      { name: 'Wound Burn', image: '/Images/Assets/confidence/mazekomu/woundBurn.png' },
      { name: 'Smell', image: '/Images/Assets/confidence/mazekomu/smell.png' },
      { name: 'Freckles', image: '/Images/Assets/confidence/mazekomu/freckles.png' },
      { name: 'Allergy', image: '/Images/Assets/confidence/mazekomu/allergy.png' },
    ],
  },

  rightSection: {
    title: 'MAZEKOMU',
    items: [
      { name: 'Cosmetic', image: '/Images/Assets/confidence/mazekomu/cosmetic.png' },
      { name: 'Manicure', image: '/Images/Assets/confidence/mazekomu/manicure.png' },
      { name: 'Shampoo Conditioner', image: '/Images/Assets/confidence/mazekomu/shampoo.png' },
      { name: 'Bath Tub', image: '/Images/Assets/confidence/mazekomu/bathtub.png' },
      { name: 'Tooth Paste', image: '/Images/Assets/confidence/mazekomu/toothpaste.png' },
      { name: 'Rip Balm', image: '/Images/Assets/confidence/mazekomu/ripbalm.png' },
    ],
  },

  centerTitle: 'MAZEKOMU',
  centerImage: '/Images/Assets/confidence/mazekomu/white_product.png',

  trust: {
    productName: 'Confidence',
    certification: 'certified cosmetic "The Japanese Standards of Quasi-Drug Ingredients (JSQI)" by MHLW, Japan',
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
    type: 'cosmetic',
    title: 'Cosmetic Function',
    subtitle: 'Confidence',
    method: 'SURIKOMU / MAZEKOMU',
    videoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
    circles: [
      { name: 'Dark Spots', detail: 'Freckles' },
      { name: 'Acne', detail: 'Acne scars' },
      { name: 'Wounds', detail: 'Scars, Burn Marks' },
      { name: 'Odor', detail: 'Face, Neck, Underarms, V-Zone, Feet' },
      { name: 'Shine', detail: 'Maintains A Clean Look, Natural/ Earth Tones' },
    ],
    medicalText: 'Mother Vegetable, certified as a medical-grade quasi-drug, is trusted by medical institutions worldwide for its healing properties \u2014 used in post-surgery recovery, burn scar improvement, cancer care, and even to help control skin shine. It supports the skin\u2019s natural ability to heal and restore balance.',
    skinVideoUrl: '/Images/Assets/homepage/product/skin.mp4',
    benefits: [
      {
        title: 'Dark Spots & Freckles',
        image: '/Images/Assets/confidence/mazekomu/darkSpot.png',
        items: [
          'Reduces dark spots and freckles',
          'Promotes even skin tone',
          'Supports skin brightening',
        ],
      },
      {
        title: 'Acne & Scars',
        image: '/Images/Assets/confidence/mazekomu/acne.png',
        items: [
          'Helps improve acne and acne scars',
          'Supports skin recovery',
          'Reduces skin inflammation',
        ],
      },
      {
        title: 'Wounds & Burns',
        image: '/Images/Assets/confidence/mazekomu/woundBurn.png',
        items: [
          'Aids wound and burn scar improvement',
          'Supports post-surgery skin recovery',
          'Promotes natural skin healing',
        ],
      },
      {
        title: 'Odor & Shine Control',
        image: '/Images/Assets/confidence/mazekomu/smell.png',
        items: [
          'Controls odor on face, neck, underarms, V-zone, and feet',
          'Maintains a clean look with natural earth tones',
          'Helps control skin shine',
        ],
      },
    ],
  },
};

export default async function ConfidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductPage product={confidenceProduct} />;
}
