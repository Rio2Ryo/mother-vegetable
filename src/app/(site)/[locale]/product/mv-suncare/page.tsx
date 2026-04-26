import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジサンケアジェル — Mother Vegetable',
  description: 'Natural suncare gel with plant-based nutrients. 30g. Daily UV protection.',
  openGraph: {
    title: 'マザベジサンケアジェル — Mother Vegetable',
    description: 'Natural suncare gel with plant-based nutrients. 30g.',
    images: [{ url: 'https://images.unsplash.com/photo-1662729182165-3612bfed89f4?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジサンケアジェル' }],
  },
};

function getMvSuncareProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-suncare',
    category: 'cosmetic',
    name: isJa ? 'マザベジサンケアジェル' : 'MV Suncare Gel',
    fullName: isJa ? 'マザベジサンケアジェル / 30g' : 'Mother Vegetable Suncare Gel / 30g',
    subtitle: '30g',
    tagline: isJa ? '天然植物由来成分配合のサンケアジェル。' : 'Natural plant-based suncare gel.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-suncare')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1662729182165-3612bfed89f4?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-suncare')?.galleryImages,
    benefits: isJa
      ? [
          '紫外線ブロック — 強力な紫外線から肌をやさしく守り、日焼けや乾燥ダメージを軽減。',
          '保湿サポート — 植物由来の保湿成分が肌のうるおいをキープし、乾燥を防ぎます。',
          '透明感ケア — 日焼けによるくすみを防ぎ、明るくクリアな肌印象をサポート。',
          '毎日使える — 軽い付け心地でベタつかず、デイリースキンケアに最適。',
        ]
      : [
          'UV Protection — Gently shields skin from harmful UV rays and reduces sunburn and dryness damage.',
          'Moisture Support — Plant-based moisturizers keep skin hydrated and prevent dryness.',
          'Brightening Care — Helps prevent dullness from sun exposure for a clearer, brighter complexion.',
          'Daily Use — Lightweight and non-sticky texture ideal for everyday skincare.',
        ],
    howToUse: isJa
      ? '洗顔・スキンケアの後、外出前に適量を顔・首・腕など露出部分に伸ばしてください。汗をかいたり長時間屋外で過ごす場合は、こまめに塗り直すと効果的です。ボディにもお使いいただけます。日常使いのデイリーUVケアとしてもおすすめ。'
      : 'After cleansing and skincare, apply an appropriate amount to face, neck, arms, and other exposed areas before going outside. Reapply frequently when sweating or spending extended time outdoors. Suitable for body use. Recommended as daily UV care.',
    trust: {
      productName: isJa ? 'マザベジサンケアジェル' : 'MV Suncare Gel',
      certification: isJa ? '厚生労働省により医薬部外品認定' : 'quasi-drug certified by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
      subtitle: isJa ? 'マザベジサンケアジェル' : 'MV Suncare Gel',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: 'SPF50+ PA++++' },
            { label: 'タンパク質', value: '0.2g' },
            { label: '食物繊維', value: '0.1g' },
            { label: '脂質', value: '2.5g' },
            { label: '水分', value: '95g' },
          ]
        : [
            { label: 'Main Component', value: 'SPF50+ PA++++' },
            { label: 'Protein', value: '0.2g' },
            { label: 'Dietary Fiber', value: '0.1g' },
            { label: 'Fat', value: '2.5g' },
            { label: 'Moisture', value: '95g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '紫外線吸収剤フリーのやさしい処方',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Complete indoor cultivation free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Gentle formula free from chemical UV absorbers',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: 'UVケア', items: ['SPF50+ PA++++', '日焼け防止', 'シミ・そばかす予防', '紫外線ダメージ軽減', '長時間の保護'] },
            { title: '乾燥対策', items: ['保湿成分配合', 'うるおいキープ', '肌バリアサポート', 'なめらかな肌へ', '乾燥小じわをケア'] },
            { title: '美白サポート', items: ['くすみケア', '透明感をサポート', 'ハリのある肌へ', 'メラニン生成を抑制', '明るい肌印象'] },
            { title: '毎日のケア', items: ['ベタつかない使用感', 'メイク前にも使える', 'ボディにも使える', '敏感肌にもやさしい', '家族みんなで使える'] },
          ]
        : [
            { title: 'UV Care', items: ['SPF50+ PA++++', 'Sunburn prevention', 'Dark spot prevention', 'Reduces UV damage', 'Long-lasting protection'] },
            { title: 'Dryness Care', items: ['Moisturizing ingredients', 'Keeps skin hydrated', 'Supports skin barrier', 'For smoother skin', 'Cares for dry fine lines'] },
            { title: 'Brightening Support', items: ['Cares for dullness', 'Supports clarity', 'For firmer skin', 'Suppresses melanin production', 'Brighter skin tone'] },
            { title: 'Daily Care', items: ['Non-sticky feel', 'Use under makeup', 'Suitable for body', 'Gentle for sensitive skin', 'For the whole family'] },
          ],
    },
  };
}

export default async function MvSuncarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvSuncareProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジサンケアジェル"
        description="Natural suncare gel with plant-based nutrients. 30g."
        image="https://images.unsplash.com/photo-1662729182165-3612bfed89f4?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-suncare"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
