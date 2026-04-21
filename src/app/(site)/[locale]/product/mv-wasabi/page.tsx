import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジわさび — Mother Vegetable',
  description:
    'Premium wasabi paste with 48 nutrients. 50g. ¥2,000.',
  openGraph: {
    title: 'マザベジわさび — Mother Vegetable',
    description: 'Nutrient-rich premium wasabi with 48 natural nutrients.',
    images: [{ url: '/cdn/mv_wasabi.jpg', width: 800, height: 800, alt: 'マザベジわさび' }],
  },
};

function getMvWasabiProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'mv-wasabi',
    category: 'food',
    name: isJa ? 'マザベジわさび' : 'MV Wasabi',
    fullName: isJa ? 'マザベジわさび / 50g' : 'Mother Vegetable Wasabi / 50g',
    subtitle: '50g',
    tagline: isJa ? '48種の栄養素配合のプレミアムわさび。' : 'Nutrient-rich premium wasabi.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-wasabi')?.inStock ?? true,
    productImage: '/cdn/mv_wasabi.jpg',
    galleryImages: (getProductBySlug('mv-wasabi')?.galleryImages?.length ?? 0) > 0
      ? getProductBySlug('mv-wasabi')!.galleryImages
      : undefined,
    benefits: isJa
      ? [
          '栄養豊富 — 48種の植物由来栄養素を配合したプレミアムわさび。',
          '本格的な風味 — 新鮮なわさびの辛味と香りに栄養素をプラス。',
          '手軽に栄養強化 — お寿司やお刺身に添えるだけで栄養価がアップ。',
          '幅広い用途 — 和食だけでなく、ドレッシングやソースにも。',
        ]
      : [
          'Nutrient-Rich — Premium wasabi paste enhanced with 48 plant-based nutrients.',
          'Authentic Flavor — Fresh wasabi kick with added nutritional benefits.',
          'Effortless Nutrition — Simply use as a condiment to boost daily intake.',
          'Versatile Condiment — Perfect for sushi, sashimi, dressings, and sauces.',
        ],
    howToUse: isJa
      ? '薬味として：お寿司・お刺身・そばに添えてお使いください。調味料として：ドレッシングやソースに混ぜて風味をプラス。料理に：ステーキやローストビーフの付け合わせにも。'
      : 'Condiment: Serve alongside sushi, sashimi, and soba noodles. Seasoning: Mix into dressings and sauces for a wasabi kick. Cooking: Pair with steak, roast beef, and grilled dishes.',
    trust: {
      productName: isJa ? 'マザベジわさび' : 'MV Wasabi',
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
      subtitle: isJa ? 'マザベジわさび' : 'MV Wasabi',
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
            { title: '子ども', items: ['成長に必要なミネラル補給', '免疫力の向上', '骨の成長をサポート', '鉄分で集中力アップ', '偏食でもミネラル確保'] },
            { title: '成人', items: ['毎日の栄養補給を手軽に', '代謝の改善', '疲労軽減', '電解質バランスの維持', '抗酸化ミネラルで細胞保護'] },
            { title: '高齢者', items: ['ミネラルバランスの維持', '食欲と栄養摂取の向上', '骨密度の促進', '減塩しながら栄養補給', '消化を助けるミネラル配合'] },
            { title: 'アスリート', items: ['電解質の効率的な補給', '筋肉回復のサポート', '効率的な栄養吸収', '運動後のミネラル補充', '持久力向上をサポート'] },
          ]
        : [
            { title: 'Children', items: ['Essential minerals for growth', 'Boosts immunity', 'Supports bone development', 'Iron improves focus & concentration', 'Ensures mineral intake for picky eaters'] },
            { title: 'Adults', items: ['Effortless daily nutrition', 'Improves metabolism', 'Reduces fatigue', 'Maintains electrolyte balance', 'Antioxidant minerals protect cells'] },
            { title: 'Seniors', items: ['Maintains mineral balance', 'Boosts appetite & nutrient intake', 'Promotes bone density', 'Nutrition boost with less sodium', 'Digestive-friendly mineral blend'] },
            { title: 'Athletes', items: ['Efficient electrolyte replenishment', 'Supports muscle recovery', 'Enhanced nutrient absorption', 'Post-workout mineral restoration', 'Supports endurance performance'] },
          ],
    },
  };
}

export default async function MvWasabiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvWasabiProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジわさび"
        description="Premium wasabi paste with 48 nutrients. 50g."
        image="/cdn/mv_wasabi.jpg"
        price={13.50}
        slug="mv-wasabi"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
