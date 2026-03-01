import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'Confidence — Skin Healing Effect',
  description:
    'Mother Vegetable Confidence cream for all skin types. Natural skin healing and vitality. USD 36.70 with free worldwide shipping.',
  openGraph: {
    title: 'Mother Vegetable Confidence — Skin Healing Effect',
    description: 'Natural skin healing cream for all skin types.',
    images: [{ url: '/cdn/products_confidence_10001.png', width: 800, height: 800, alt: 'Mother Vegetable Confidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable Confidence — Skin Healing Effect',
    description: 'Natural skin healing cream for all skin types.',
  },
};

function getConfidenceProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'confidence',
    name: 'Confidence',
    fullName: 'Mother Vegetable Confidence - 30 sticks',
    subtitle: isJa ? 'すべての肌に' : 'For All Skin',
    taglineJp: '',
    tagline: isJa ? '肌のヒーリング効果' : 'Skin Healing Effect',
    price: 36.70,
    currency: 'USD',
    priceDisplay: 'USD 36.70',
    inStock: getProductBySlug('confidence')?.inStock ?? true,
    productImage: '/cdn/products_achieve_10001.png',
    videoUrls: [
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_2.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_1.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_3.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_4.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_5.mp4',
    ],
    mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
    benefits: isJa
      ? [
          '強力なアンチエイジング効果。',
          'シミ、ニキビ、臭い、肌ダメージの改善をサポート。',
        ]
      : [
          'Powerful anti-aging benefits.',
          'Helps improve dark spots, acne, odor, and skin damage.',
        ],
    howToUse: isJa
      ? '直接塗るか、お使いの化粧品に混ぜてご使用ください。'
      : 'Apply directly or mix into your current cosmetics.',
    howToLink: '/confidence-howto',

    leftSection: {
      title: isJa ? '直接塗る' : 'Apply Directly',
      items: [
        { name: isJa ? 'シミ' : 'Dark Spot', image: '/Images/Assets/confidence/mazekomu/darkSpot.png' },
        { name: isJa ? 'ニキビ' : 'Acne', image: '/Images/Assets/confidence/mazekomu/acne.png' },
        { name: isJa ? '傷・火傷' : 'Wound Burn', image: '/Images/Assets/confidence/mazekomu/woundBurn.png' },
        { name: isJa ? '臭い' : 'Smell', image: '/Images/Assets/confidence/mazekomu/smell.png' },
        { name: isJa ? 'そばかす' : 'Freckles', image: '/Images/Assets/confidence/mazekomu/freckles.png' },
        { name: isJa ? 'アレルギー' : 'Allergy', image: '/Images/Assets/confidence/mazekomu/allergy.png' },
      ],
    },

    rightSection: {
      title: isJa ? '混ぜる' : 'Mix In',
      items: [
        { name: isJa ? '化粧品' : 'Cosmetic', image: '/Images/Assets/confidence/mazekomu/cosmetic.png' },
        { name: isJa ? 'マニキュア' : 'Manicure', image: '/Images/Assets/confidence/mazekomu/manicure.png' },
        { name: isJa ? 'シャンプー' : 'Shampoo Conditioner', image: '/Images/Assets/confidence/mazekomu/shampoo.png' },
        { name: isJa ? 'バスタブ' : 'Bath Tub', image: '/Images/Assets/confidence/mazekomu/bathtub.png' },
        { name: isJa ? '歯磨き粉' : 'Tooth Paste', image: '/Images/Assets/confidence/mazekomu/toothpaste.png' },
        { name: isJa ? 'リップバーム' : 'Lip Balm', image: '/Images/Assets/confidence/mazekomu/ripbalm.png' },
      ],
    },

    centerTitle: isJa ? '混ぜる' : 'Mix In',
    centerImage: '/Images/Assets/confidence/mazekomu/white_product.png',

    trust: {
      productName: 'Confidence',
      certification: isJa
        ? '厚生労働省により「日本薬局方医薬部外品原料規格（JSQI）」認定コスメ'
        : 'certified cosmetic "The Japanese Standards of Quasi-Drug Ingredients (JSQI)" by MHLW, Japan',
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
      method: isJa ? '塗る / 混ぜる' : 'Apply / Mix In',
      videoUrl: '/Images/Assets/homepage/product/cosmetic_video.mov',
      circles: [
        { name: 'Dark Spots', detail: 'Freckles' },
        { name: 'Acne', detail: 'Acne scars' },
        { name: 'Wounds', detail: 'Scars, Burn Marks' },
        { name: 'Odor', detail: 'Face, Neck, Underarms, V-Zone, Feet' },
        { name: 'Shine', detail: 'Maintains A Clean Look, Natural/ Earth Tones' },
      ],
      medicalText: isJa
        ? '医薬部外品として認定されたマザーベジタブルは、術後回復、火傷跡の改善、がんケア、皮脂コントロールなど、世界中の医療機関で信頼されています。肌の自然な治癒力とバランス回復をサポートします。'
        : 'Mother Vegetable, certified as a medical-grade quasi-drug, is trusted by medical institutions worldwide for its healing properties \u2014 used in post-surgery recovery, burn scar improvement, cancer care, and even to help control skin shine. It supports the skin\u2019s natural ability to heal and restore balance.',
      skinVideoUrl: '/Images/Assets/homepage/product/skin.mp4',
      benefits: isJa
        ? [
            {
              title: 'シミ・そばかす',
              image: '/Images/Assets/confidence/mazekomu/darkSpot.png',
              items: ['シミ・そばかすの軽減', '均一な肌色を促進', '肌の明るさをサポート'],
            },
            {
              title: 'ニキビ・ニキビ跡',
              image: '/Images/Assets/confidence/mazekomu/acne.png',
              items: ['ニキビ・ニキビ跡の改善をサポート', '肌の回復をサポート', '肌の炎症を軽減'],
            },
            {
              title: '傷・火傷',
              image: '/Images/Assets/confidence/mazekomu/woundBurn.png',
              items: ['傷・火傷跡の改善をサポート', '術後の肌回復をサポート', '自然な肌の治癒を促進'],
            },
            {
              title: '臭い・テカリコントロール',
              image: '/Images/Assets/confidence/mazekomu/smell.png',
              items: ['顔、首、脇、Vゾーン、足の臭いをコントロール', 'ナチュラルなトーンでクリーンな見た目を維持', 'テカリのコントロールをサポート'],
            },
          ]
        : [
            {
              title: 'Dark Spots & Freckles',
              image: '/Images/Assets/confidence/mazekomu/darkSpot.png',
              items: ['Reduces dark spots and freckles', 'Promotes even skin tone', 'Supports skin brightening'],
            },
            {
              title: 'Acne & Scars',
              image: '/Images/Assets/confidence/mazekomu/acne.png',
              items: ['Helps improve acne and acne scars', 'Supports skin recovery', 'Reduces skin inflammation'],
            },
            {
              title: 'Wounds & Burns',
              image: '/Images/Assets/confidence/mazekomu/woundBurn.png',
              items: ['Aids wound and burn scar improvement', 'Supports post-surgery skin recovery', 'Promotes natural skin healing'],
            },
            {
              title: 'Odor & Shine Control',
              image: '/Images/Assets/confidence/mazekomu/smell.png',
              items: ['Controls odor on face, neck, underarms, V-zone, and feet', 'Maintains a clean look with natural earth tones', 'Helps control skin shine'],
            },
          ],
    },
  };
}

export default async function ConfidencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const confidenceProduct = getConfidenceProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="Mother Vegetable Confidence"
        description="Natural skin healing cream for all skin types. Powerful anti-aging benefits."
        image="/cdn/products_confidence_10001.png"
        price={36.70}
        slug="confidence"
      />
      <ProductPage product={confidenceProduct} />
    </>
  );
}
