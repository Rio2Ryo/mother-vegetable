import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジフィッシュ-イズミ鯛 — Mother Vegetable',
  description:
    'Fresh Izumi Tai enriched with spirulina. 48 different nutrients for a healthy lifestyle. ¥2,000.',
  openGraph: {
    title: 'マザベジフィッシュ-イズミ鯛 — Mother Vegetable',
    description: 'Fresh Izumi Tai enriched with spirulina. 48 different nutrients.',
    images: [{ url: '/cdn/mv_tilapia.jpg', width: 800, height: 800, alt: 'マザベジフィッシュ-イズミ鯛' }],
  },
};

function getTilapiaProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'tilapia',
    category: 'food',
    name: isJa ? 'マザベジフィッシュ-イズミ鯛' : 'MV Fish - Izumi Tai',
    fullName: isJa ? 'マザベジフィッシュ-イズミ鯛 / 1匹' : 'Mother Vegetable Fish - Izumi Tai / 1 fish',
    subtitle: isJa ? '身体のために' : 'for Body',
    tagline: isJa ? 'スピルリナで育てた新鮮なイズミ鯛。' : 'Fresh Izumi Tai enriched with spirulina.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('tilapia')?.inStock ?? true,
    productImage: '/cdn/mv_tilapia.jpg',
    benefits: isJa
      ? [
          'オメガ3脂肪酸が豊富 — 心臓の健康と脳機能をサポートする良質な不飽和脂肪酸を含有。',
          '良質な完全タンパク質 — 全9種の必須アミノ酸を含み、筋肉の成長・修復を促進。',
          '低脂肪・高栄養 — 余分な脂質を抑えながら48種の栄養素をしっかり摂取。',
          'サステナブル養殖 — スピルリナ飼料による環境負荷の低い持続可能な養殖方法で育成。',
        ]
      : [
          'Rich in Omega-3 — High-quality unsaturated fatty acids that support heart health and brain function.',
          'Complete Protein — Contains all 9 essential amino acids to promote muscle growth and repair.',
          'Low-Fat, High-Nutrition — Delivers 48 nutrients while keeping excess fat to a minimum.',
          'Sustainable Aquaculture — Raised using eco-friendly spirulina-based feed for minimal environmental impact.',
        ],
    howToUse: isJa
      ? 'グリル：塩を振ってシンプルに焼くだけで栄養満点の一品に。蒸し料理：野菜と一緒に蒸して素材の旨味を引き出します。刺身：新鮮なまま薄切りにして、わさび醤油でお楽しみください。煮物・鍋：和風だしとの相性も抜群です。'
      : 'Grill: Season with salt and grill for a simple, nutritious dish. Steam: Steam with vegetables to bring out natural umami. Sashimi: Slice fresh and serve with wasabi soy sauce. Simmer: Excellent in hot pots and simmered dishes with dashi broth.',
    trust: {
      productName: isJa ? 'マザベジフィッシュ-イズミ鯛' : 'MV Fish - Izumi Tai',
      certification: isJa
        ? '厚生労働省によりヒューマングレード食品認定'
        : 'certified human grade food by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
      subtitle: isJa ? 'マザベジフィッシュ-イズミ鯛' : 'MV Fish - Izumi Tai',
      circles: [
        { name: 'Omega-3 DHA/EPA', detail: 'Brain & Heart' },
        { name: 'Complete Protein', detail: '20g per serving' },
        { name: 'Vitamin D & B12', detail: 'Bone & Nerve' },
        { name: 'Selenium & Phosphorus', detail: 'Antioxidant' },
        { name: 'Spirulina Boost', detail: '48 nutrients' },
      ],
      benefits: isJa
        ? [
            { title: '子ども', items: ['高タンパクで成長をサポート', '骨の成長をサポート', '免疫力の向上', 'DHAが学習能力を向上', '偏食でも栄養バランスを確保'] },
            { title: '成人', items: ['筋肉維持・増強', '疲労軽減', '代謝の改善', '心血管の健康をサポート', '抗酸化作用で細胞を保護'] },
            { title: '高齢者', items: ['筋肉量の維持', '骨密度の促進', '食欲と栄養摂取の向上', '認知機能の維持に貢献', '消化に優しい良質タンパク源'] },
            { title: 'アスリート', items: ['筋肉回復と持久力の向上', '効率的な栄養吸収', 'トレーニング効果の向上', '抗炎症作用で回復を促進', '低脂肪で体重管理をサポート'] },
          ]
        : [
            { title: 'Children', items: ['High protein supports growth', 'Supports bone development', 'Boosts immunity', 'DHA enhances learning ability', 'Balanced nutrition even for picky eaters'] },
            { title: 'Adults', items: ['Muscle maintenance & growth', 'Reduces fatigue', 'Improves metabolism', 'Supports cardiovascular health', 'Antioxidants protect cells'] },
            { title: 'Seniors', items: ['Maintains muscle mass', 'Promotes bone density', 'Boosts nutrient intake', 'Supports cognitive function', 'Easy-to-digest quality protein'] },
            { title: 'Athletes', items: ['Aids muscle recovery & endurance', 'Efficient nutrient absorption', 'Enhances training effectiveness', 'Anti-inflammatory recovery support', 'Low-fat for weight management'] },
          ],
    },
  };
}

export default async function TilapiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getTilapiaProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジフィッシュ-イズミ鯛"
        description="Fresh Izumi Tai enriched with spirulina. 48 different nutrients."
        image="/cdn/mv_tilapia.jpg"
        price={13.50}
        slug="tilapia"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
