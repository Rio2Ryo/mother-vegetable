import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジフィッシュ — Mother Vegetable',
  description:
    'Fresh MV Fish enriched with 48 natural nutrients for a healthy lifestyle. ¥2,000.',
  openGraph: {
    title: 'マザベジフィッシュ — Mother Vegetable',
    description: 'Fresh MV Fish enriched with 48 natural nutrients.',
    images: [{ url: '/cdn/mv_tilapia.jpg', width: 800, height: 800, alt: 'マザベジフィッシュ' }],
  },
};

function getTilapiaProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'tilapia',
    category: 'food',
    name: isJa ? 'マザベジフィッシュ' : 'MV Fish',
    fullName: isJa ? 'マザベジフィッシュ-1匹' : 'Mother Vegetable Fish - 1 fish',
    subtitle: isJa ? '身体のために' : 'for Body',
    tagline: isJa ? '48種の栄養素で育てた新鮮なマザベジフィッシュ。' : 'Fresh MV Fish enriched with 48 nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('tilapia')?.inStock ?? true,
    productImage: '/cdn/mv_tilapia.jpg',
    galleryImages: getProductBySlug('tilapia')?.galleryImages,
    benefits: isJa
      ? [
          'オメガ3脂肪酸が豊富 — 心臓の健康と脳機能をサポートする良質な不飽和脂肪酸を含有。',
          '良質な完全タンパク質 — 全9種の必須アミノ酸を含み、筋肉の成長・修復を促進。',
          '低脂肪・高栄養 — 余分な脂質を抑えながら48種の栄養素をしっかり摂取。',
          'サステナブル養殖 — 天然栄養素の飼料による環境負荷の低い持続可能な養殖方法で育成。',
        ]
      : [
          'Rich in Omega-3 — High-quality unsaturated fatty acids that support heart health and brain function.',
          'Complete Protein — Contains all 9 essential amino acids to promote muscle growth and repair.',
          'Low-Fat, High-Nutrition — Delivers 48 nutrients while keeping excess fat to a minimum.',
          'Sustainable Aquaculture — Raised using eco-friendly plant-based feed for minimal environmental impact.',
        ],
    howToUse: isJa
      ? 'グリル：塩を振ってシンプルに焼くだけで栄養満点の一品に。蒸し料理：野菜と一緒に蒸して素材の旨味を引き出します。刺身：新鮮なまま薄切りにして、わさび醤油でお楽しみください。煮物・鍋：和風だしとの相性も抜群です。'
      : 'Grill: Season with salt and grill for a simple, nutritious dish. Steam: Steam with vegetables to bring out natural umami. Sashimi: Slice fresh and serve with wasabi soy sauce. Simmer: Excellent in hot pots and simmered dishes with dashi broth.',
    trust: {
      productName: isJa ? 'マザベジフィッシュ' : 'MV Fish',
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
      subtitle: isJa ? 'マザベジフィッシュ' : 'MV Fish',
      ingredientInfo: isJa
        ? [
            { label: 'エネルギー', value: '398kcal' },
            { label: 'タンパク質', value: '65g' },
            { label: '脂質', value: '6.5g' },
            { label: '炭水化物', value: '20g' },
            { label: 'ミネラル', value: '8g' },
          ]
        : [
            { label: 'Energy', value: '398kcal' },
            { label: 'Protein', value: '65g' },
            { label: 'Fat', value: '6.5g' },
            { label: 'Carbohydrates', value: '20g' },
            { label: 'Minerals', value: '8g' },
          ],
      nutritionalDetails: isJa
        ? [
            { name: 'カリウム', value: '含有' },
            { name: 'ナトリウム', value: '含有' },
            { name: 'マグネシウム', value: '含有' },
            { name: 'カルシウム', value: '含有' },
            { name: 'リン', value: '含有' },
            { name: '鉄', value: '含有' },
            { name: 'マンガン', value: '含有' },
            { name: '亜鉛', value: '含有' },
            { name: '銅', value: '含有' },
            { name: 'ビタミンA', value: '含有' },
            { name: 'ビタミンB1', value: '含有' },
            { name: 'ビタミンB2', value: '含有' },
            { name: 'ビタミンB3', value: '含有' },
            { name: 'ビタミンB5', value: '含有' },
            { name: 'ビタミンB6', value: '含有' },
            { name: 'ビタミンB9', value: '含有' },
            { name: 'ビタミンC', value: '含有' },
            { name: 'ビタミンE', value: '含有' },
            { name: 'ビタミンK', value: '含有' },
            { name: 'トリプトファン', value: '含有' },
            { name: 'スレオニン', value: '含有' },
            { name: 'ロイシン', value: '含有' },
            { name: 'イソロイシン', value: '含有' },
            { name: 'リジン', value: '含有' },
            { name: 'メチオニン', value: '含有' },
            { name: 'フェニルアラニン', value: '含有' },
            { name: 'バリン', value: '含有' },
            { name: 'ヒスチジン', value: '含有' },
            { name: 'アルギニン', value: '含有' },
            { name: 'シスチン', value: '含有' },
            { name: 'チロシン', value: '含有' },
            { name: 'アラニン', value: '含有' },
            { name: 'アスパラギン酸', value: '含有' },
            { name: 'グルタミン酸', value: '含有' },
            { name: 'セリン', value: '含有' },
            { name: 'グリシン', value: '含有' },
            { name: 'プロリン', value: '含有' },
            { name: '飽和脂肪酸', value: '含有' },
            { name: 'オメガ3脂肪酸', value: '含有' },
            { name: 'オメガ6脂肪酸', value: '含有' },
            { name: 'C-フィコシアニン', value: '含有' },
            { name: 'クロロフィルa', value: '含有' },
            { name: '総カロテノイド', value: '含有' },
            { name: '核酸', value: '含有' },
            { name: 'グリコーゲン様多糖類', value: '含有' },
            { name: 'グルカン様多糖類', value: '含有' },
            { name: 'セルロース', value: '含有' },
          ]
        : [
            { name: 'Potassium', value: 'Included' },
            { name: 'Sodium', value: 'Included' },
            { name: 'Magnesium', value: 'Included' },
            { name: 'Calcium', value: 'Included' },
            { name: 'Phosphorus', value: 'Included' },
            { name: 'Iron', value: 'Included' },
            { name: 'Manganese', value: 'Included' },
            { name: 'Zinc', value: 'Included' },
            { name: 'Copper', value: 'Included' },
            { name: 'Vitamin A', value: 'Included' },
            { name: 'Vitamin B1', value: 'Included' },
            { name: 'Vitamin B2', value: 'Included' },
            { name: 'Vitamin B3', value: 'Included' },
            { name: 'Vitamin B5', value: 'Included' },
            { name: 'Vitamin B6', value: 'Included' },
            { name: 'Vitamin B9', value: 'Included' },
            { name: 'Vitamin C', value: 'Included' },
            { name: 'Vitamin E', value: 'Included' },
            { name: 'Vitamin K', value: 'Included' },
            { name: 'Tryptophan', value: 'Included' },
            { name: 'Threonine', value: 'Included' },
            { name: 'Leucine', value: 'Included' },
            { name: 'Isoleucine', value: 'Included' },
            { name: 'Lysine', value: 'Included' },
            { name: 'Methionine', value: 'Included' },
            { name: 'Phenylalanine', value: 'Included' },
            { name: 'Valine', value: 'Included' },
            { name: 'Histidine', value: 'Included' },
            { name: 'Arginine', value: 'Included' },
            { name: 'Cystine', value: 'Included' },
            { name: 'Tyrosine', value: 'Included' },
            { name: 'Alanine', value: 'Included' },
            { name: 'Aspartic Acid', value: 'Included' },
            { name: 'Glutamic Acid', value: 'Included' },
            { name: 'Serine', value: 'Included' },
            { name: 'Glycine', value: 'Included' },
            { name: 'Proline', value: 'Included' },
            { name: 'Saturated Fatty Acids', value: 'Included' },
            { name: 'Omega-3 Fatty Acids', value: 'Included' },
            { name: 'Omega-6 Fatty Acids', value: 'Included' },
            { name: 'C-Phycocyanin', value: 'Included' },
            { name: 'Chlorophyll a', value: 'Included' },
            { name: 'Total Carotenoids', value: 'Included' },
            { name: 'Nucleic Acids', value: 'Included' },
            { name: 'Glycogen-like Polysaccharides', value: 'Included' },
            { name: 'Glucan-like Polysaccharides', value: 'Included' },
            { name: 'Cellulose', value: 'Included' },
          ],
      nutrientCount: isJa ? '48種の栄養素' : '48 Nutrients',
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
        name="マザベジフィッシュ"
        description="Fresh MV Fish enriched with 48 natural nutrients."
        image="/cdn/mv_tilapia.jpg"
        price={13.50}
        slug="tilapia"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
