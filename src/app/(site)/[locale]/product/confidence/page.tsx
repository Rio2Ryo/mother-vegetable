import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'Confidence — Skin Care Support',
  description:
    'Mother Vegetable Confidence cream for all skin types. Natural skin care and vitality. ¥5,500 with free worldwide shipping.',
  openGraph: {
    title: 'Mother Vegetable Confidence — Skin Care Support',
    description: 'Natural skin care cream for all skin types.',
    images: [{ url: '/cdn/products_confidence_10001.png', width: 800, height: 800, alt: 'Mother Vegetable Confidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable Confidence — Skin Care Support',
    description: 'Natural skin care cream for all skin types.',
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
    tagline: isJa ? '肌のうるおいケア' : 'Skin Care Support',
    price: 36.70,
    currency: 'USD',
    priceDisplay: 'USD 36.70',
    priceJpy: '¥5,500',

    inStock: getProductBySlug('confidence')?.inStock ?? true,
    productImage: '/cdn/products_confidence_10001.png',
    videoUrls: [
      '/new_confidence_video.mp4',
      '/04.mp4',
    ],
    mainVideoUrl: '/new_confidence_video.mp4',
    benefits: isJa
      ? [
          'エイジングケア。',
          '肌のお悩みケアをサポート。',
        ]
      : [
          'Aging care support.',
          'Supports daily skin care concerns.',
        ],
    howToUse: isJa
      ? '直接塗るか、お使いの化粧品に混ぜてご使用ください。'
      : 'Apply directly or mix into your current cosmetics.',
    howToLink: '/confidence-howto',

    leftSection: {
      title: isJa ? '直接塗る' : 'Apply Directly',
      items: [
        { name: isJa ? '顔' : 'Face', image: '/Images/Assets/confidence/mazekomu/darkSpot.png' },
        { name: isJa ? '首・デコルテ' : 'Neck', image: '/Images/Assets/confidence/mazekomu/acne.png' },
        { name: isJa ? '手・指先' : 'Hands', image: '/Images/Assets/confidence/mazekomu/woundBurn.png' },
        { name: isJa ? 'ボディ' : 'Body', image: '/Images/Assets/confidence/mazekomu/smell.png' },
        { name: isJa ? '足元' : 'Feet', image: '/Images/Assets/confidence/mazekomu/freckles.png' },
        { name: isJa ? '頭皮・髪' : 'Scalp & Hair', image: '/Images/Assets/confidence/mazekomu/allergy.png' },
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
      circles: [],
      ingredientInfo: [
        { label: isJa ? '主成分' : 'Main Component', value: '97.1g' },
        { label: isJa ? 'タンパク質' : 'Protein', value: '2.4~2.6g' },
        { label: isJa ? '炭水化物（食物繊維）' : 'Carbohydrates (Dietary Fiber)', value: '0.3~0.5g' },
        { label: isJa ? '脂質' : 'Fat', value: isJa ? '0.1g以下' : '0.1g or less' },
        { label: isJa ? '水分' : 'Moisture', value: '0.1g' },
      ],
      characteristics: isJa
        ? [
            'マザーベジタブル（植物・藻類の祖先）由来の天然素材・栄養素のみで製造',
            'PM2.5、昆虫、鳥類、その他汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小限に抑制',
            '保存料・人工着色料・香料不使用',
            '化学処理を行わない自然形態',
            '農薬・化学肥料不使用',
            '医薬部外品原料規格に適合',
            '動物や植物にも使用可能',
            '長期保存に適している',
          ]
        : [
            'Made entirely from natural materials/nutrients derived solely from Mother Vegetable, the ancestor of plants and algae',
            'Complete indoor cultivation free from PM2.5, insects, birds, and other contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Natural form without chemical processing',
            'No pesticides or chemical fertilizers',
            'Meets quasi-drug raw material standards',
            'Can be used on animals and plants',
            'Suitable for long-term storage',
          ],
      medicalText: isJa
        ? '医薬部外品として認定されたマザーベジタブルは、肌のコンディションを整え、自然な美しさをサポートします。'
        : 'Mother Vegetable, certified as a quasi-drug, helps condition the skin and supports its natural beauty.',
      skinVideoUrl: '/Images/Assets/homepage/product/skin.mp4',
      benefits: [],
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
        description="Natural skin care cream for all skin types. Aging care support."
        image="/cdn/products_confidence_10001.png"
        price={36.70}
        slug="confidence"
      />
      <ProductPage product={confidenceProduct} />
    </>
  );
}
