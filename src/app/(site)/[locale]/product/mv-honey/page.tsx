import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジハニー — Mother Vegetable',
  description: 'Pure honey blended with Mother Vegetable nutrients. 100g.',
  openGraph: {
    title: 'マザベジハニー — Mother Vegetable',
    description: 'Nutrient-rich premium honey. 100g.',
    images: [{ url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジハニー' }],
  },
};

function getMvHoneyProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-honey',
    category: 'food',
    name: isJa ? 'マザベジハニー' : 'MV Honey',
    fullName: isJa ? 'マザベジハニー / 100g' : 'Mother Vegetable Honey / 100g',
    subtitle: '100g',
    tagline: isJa ? '栄養豊富なマザベジブレンドの天然蜂蜜。' : 'Nutrient-rich pure honey blended with Mother Vegetable.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-honey')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-honey')?.galleryImages,
    benefits: isJa
      ? [
          '天然の甘さ — グルコースとフルクトースが主成分の純粋な蜂蜜。砂糖の代わりに使える、やさしい自然の甘味。',
          '酵素・栄養豊富 — 蜂蜜本来の天然酵素・アミノ酸・ミネラルをそのまま閉じ込めた非加熱仕上げ。',
          '48種の栄養素配合 — マザベジ独自ブレンドで、ビタミン・ミネラル・食物繊維をバランスよく補給。',
          '使い道いろいろ — 飲み物、トースト、ヨーグルト、料理の隠し味まで、毎日の食卓を豊かに。',
        ]
      : [
          'Natural Sweetness — Pure honey rich in glucose and fructose, a gentle natural alternative to sugar.',
          'Enzymes & Nutrients — Unheated to preserve native enzymes, amino acids, and minerals.',
          '48 Nutrients Blended — Mother Vegetable’s proprietary blend supplies balanced vitamins, minerals, and fiber.',
          'Versatile Use — Drinks, toast, yogurt, or as a cooking accent — enriches every meal.',
        ],
    howToUse: isJa
      ? '飲み物に：紅茶・ハーブティー・コーヒー・レモネードに小さじ1杯加えて自然な甘味に。トーストに：パンやパンケーキにそのまま塗って。ヨーグルトに：プレーンヨーグルトやグラノーラのトッピングとして。料理に：ドレッシング、マリネ、煮込み料理のコク出しや照りに。'
      : 'In drinks: Add a teaspoon to tea, herbal tea, coffee, or lemonade for natural sweetness. On toast: Spread directly onto bread or pancakes. With yogurt: Drizzle over plain yogurt or granola. In cooking: Use in dressings, marinades, or to add depth and glaze to braised dishes.',
    trust: {
      productName: isJa ? 'マザベジハニー' : 'MV Honey',
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
      subtitle: isJa ? 'マザベジハニー' : 'MV Honey',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '82.4g' },
            { label: 'タンパク質', value: '0.3〜0.5g' },
            { label: '食物繊維', value: '0.2g' },
            { label: '脂質', value: '0g' },
            { label: '水分', value: '17.0g' },
          ]
        : [
            { label: 'Main Component', value: '82.4g' },
            { label: 'Protein', value: '0.3~0.5g' },
            { label: 'Dietary Fiber', value: '0.2g' },
            { label: 'Fat', value: '0g' },
            { label: 'Moisture', value: '17.0g' },
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
            { title: '自然な甘味', items: ['砂糖の代わりに', 'やさしい甘さ', 'まろやかな後味', 'コクのある風味', '上品な香り'] },
            { title: '健康サポート', items: ['天然酵素配合', 'アミノ酸補給', 'ミネラル補給', 'ビタミン補給', '毎日の栄養補助'] },
            { title: 'アレンジ自在', items: ['ドリンクの甘味料に', 'トーストに', 'ヨーグルトに', 'お菓子作りに', '料理のコク出しに'] },
            { title: 'デイリーケア', items: ['朝食の一品に', 'ティータイムに', '運動後の補給に', '就寝前のリラックスに', '季節の変わり目に'] },
          ]
        : [
            { title: 'Natural Sweetness', items: ['Sugar substitute', 'Gentle sweetness', 'Smooth aftertaste', 'Rich, mellow flavor', 'Elegant aroma'] },
            { title: 'Health Support', items: ['Natural enzymes', 'Amino acid supply', 'Mineral replenishment', 'Vitamin replenishment', 'Daily nutrition support'] },
            { title: 'Versatile Use', items: ['Sweetener for drinks', 'On toast', 'With yogurt', 'In baking', 'Adds depth to cooking'] },
            { title: 'Daily Care', items: ['Breakfast staple', 'Tea time companion', 'Post-workout boost', 'Evening relaxation', 'Seasonal change support'] },
          ],
    },
  };
}

export default async function MvHoneyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvHoneyProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジハニー"
        description="Pure honey blended with Mother Vegetable nutrients. 100g."
        image="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-honey"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
