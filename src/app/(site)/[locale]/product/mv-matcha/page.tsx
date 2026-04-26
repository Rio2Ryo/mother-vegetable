import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ抹茶 — Mother Vegetable',
  description: 'Premium matcha green tea powder blended with Mother Vegetable. 30g.',
  openGraph: {
    title: 'マザベジ抹茶 — Mother Vegetable',
    description: 'Nutrient-rich premium matcha blend. 30g.',
    images: [{ url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジ抹茶' }],
  },
};

function getMvMatchaProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-matcha',
    category: 'food',
    name: isJa ? 'マザベジ抹茶' : 'MV Matcha',
    fullName: isJa ? 'マザベジ抹茶 / 30g' : 'Mother Vegetable Matcha / 30g',
    subtitle: '30g',
    tagline: isJa ? 'マザベジブレンドのプレミアム抹茶パウダー。' : 'Premium matcha green tea powder blended with Mother Vegetable.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-matcha')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-matcha')?.galleryImages,
    benefits: isJa
      ? [
          '高品質抹茶 — 厳選された茶葉から作られる、鮮やかな緑色と豊かな旨味のプレミアム抹茶パウダー。',
          '抗酸化サポート — カテキンをはじめとする抗酸化成分が、毎日の健康とリフレッシュをサポート。',
          '48種の栄養素配合 — マザベジ独自ブレンドで、ビタミン・ミネラル・食物繊維をバランスよく補給。',
          'ほどよいカフェイン — テアニンとの相乗効果で、穏やかな集中力とリラックスを両立。',
        ]
      : [
          'Premium Quality — Vibrant green matcha powder made from carefully selected tea leaves with rich umami flavor.',
          'Antioxidant Support — Catechins and other antioxidants support daily wellness and refreshment.',
          '48 Nutrients Blended — Mother Vegetable’s proprietary blend delivers balanced vitamins, minerals, and fiber.',
          'Balanced Caffeine — Synergy with L-theanine offers gentle focus paired with relaxation.',
        ],
    howToUse: isJa
      ? 'お湯で点てる：60〜80℃のお湯に小さじ1（約2g）を入れ、茶筅でよく混ぜます。ラテに：温めたミルクと混ぜて抹茶ラテに。スイーツに：ヨーグルト、アイス、焼き菓子のトッピングや材料として。スムージーに：バナナや豆乳と一緒にブレンドしてグリーンスムージーに。'
      : 'Whisk with hot water: Add 1 teaspoon (about 2g) to 60–80°C water and whisk until frothy. As a latte: Combine with warm milk for a creamy matcha latte. With sweets: Sprinkle over yogurt, ice cream, or fold into baked goods. In smoothies: Blend with banana and soy milk for a green smoothie.',
    trust: {
      productName: isJa ? 'マザベジ抹茶' : 'MV Matcha',
      certification: isJa ? '食品衛生法に基づく品質管理' : 'Quality controlled under the Food Sanitation Act of Japan',
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
      subtitle: isJa ? 'マザベジ抹茶' : 'MV Matcha',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '92.0g' },
            { label: 'タンパク質', value: '24.5〜30.6g' },
            { label: '食物繊維', value: '38.5g' },
            { label: '脂質', value: '5.3g' },
            { label: '水分', value: '5.0g' },
          ]
        : [
            { label: 'Main Component', value: '92.0g' },
            { label: 'Protein', value: '24.5~30.6g' },
            { label: 'Dietary Fiber', value: '38.5g' },
            { label: 'Fat', value: '5.3g' },
            { label: 'Moisture', value: '5.0g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '抽出工程のない自然な形状',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Complete indoor cultivation free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Natural form without extraction processes',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: 'リフレッシュ', items: ['爽やかな香り', '気分転換に', 'すっきりとした味わい', '毎日の一服に', '集中したい時に'] },
            { title: '健康サポート', items: ['抗酸化成分配合', 'ビタミン補給', 'ミネラル補給', '食物繊維配合', '毎日の栄養補助'] },
            { title: 'アレンジ自在', items: ['ラテに', 'スムージーに', 'お菓子作りに', 'ヨーグルトに', 'アイスのトッピングに'] },
            { title: 'デイリーケア', items: ['朝の一杯に', '午後のひと休みに', '運動の前後に', '食事と一緒に', '就寝前のリラックスに'] },
          ]
        : [
            { title: 'Refreshment', items: ['Fresh aroma', 'Mood lift', 'Clean, smooth taste', 'Daily ritual', 'Boost focus'] },
            { title: 'Health Support', items: ['Antioxidant-rich', 'Vitamin replenishment', 'Mineral replenishment', 'Dietary fiber', 'Daily nutrition support'] },
            { title: 'Versatile Use', items: ['Make a latte', 'Add to smoothies', 'Use in baking', 'Top yogurt', 'Top ice cream'] },
            { title: 'Daily Care', items: ['Morning cup', 'Afternoon break', 'Pre/post-workout', 'Pair with meals', 'Evening wind-down'] },
          ],
    },
  };
}

export default async function MvMatchaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvMatchaProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ抹茶"
        description="Premium matcha green tea powder blended with Mother Vegetable. 30g."
        image="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-matcha"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
