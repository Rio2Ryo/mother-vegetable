import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'Achieve — 48 Nutrients in One Stick',
  description:
    'Mother Vegetable Achieve delivers 48 different nutrients in a single stick. Premium health supplement for daily wellness. ¥5,500 with free worldwide shipping.',
  openGraph: {
    title: 'Mother Vegetable Achieve — 48 Nutrients in One Stick',
    description: 'Premium health supplement delivering 48 nutrients in one stick.',
    images: [{ url: '/Images/Assets/General/og-logo.png', width: 1200, height: 630, alt: 'Mother Vegetable' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable Achieve — 48 Nutrients in One Stick',
    description: 'Premium health supplement delivering 48 nutrients in one stick.',
  },
};

function getAchieveProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'achieve',
    name: 'Achieve',
    fullName: 'Mother Vegetable Achieve - 30 sticks',
    subtitle: isJa ? '身体のために' : 'for Body',
    taglineJp: '',
    tagline: isJa ? '48種の栄養素を一度に。' : '48 different nutrients at once.',
    price: 36.70,
    currency: 'USD',
    priceDisplay: 'USD 36.70',
    priceJpy: '¥5,500',

    inStock: getProductBySlug('achieve')?.inStock ?? true,
    productImage: '/cdn/products_achieve_10004.jpg',
    videoUrls: [
      '/new_achieve_video.mp4',
      '/01.mp4',
      '/02.mp4',
      '/03.mp4',
    ],
    mainVideoUrl: '/new_achieve_video.mp4',
    benefits: isJa
      ? [
          '健康な腸をサポートし、全身の細胞再生を促進。',
          '便秘改善、睡眠向上、体重管理をサポート。',
        ]
      : [
          'Supports a healthy gut, Regeneration of cells throughout the body.',
          'Helps relieve constipation, improve sleep, and aid weight management.',
        ],
    howToUse: isJa
      ? 'スティック1本をお飲み物やお食事に加えるだけ。'
      : 'Simply add one stick into your drink or meal.',
    howToLink: '/achieve-howto',

    trust: {
      productName: 'Achieve',
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
      type: 'food',
      title: 'Food Function',
      subtitle: 'Achieve',
      method: isJa ? '加える / 混ぜる' : 'Add / Mix In',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [],
      ingredientInfo: [
        { label: isJa ? 'エネルギー' : 'Energy', value: '398kcal' },
        { label: isJa ? 'タンパク質' : 'Protein', value: '65g' },
        { label: isJa ? '脂質' : 'Fat', value: '6.5g' },
        { label: isJa ? '炭水化物' : 'Carbohydrates', value: '20g' },
        { label: isJa ? 'ミネラル' : 'Minerals', value: '8g' },
      ],
      nutritionalDetails: [
        { name: isJa ? 'C-フィコシアニン' : 'C-Phycocyanin', value: isJa ? '約16〜20g' : 'approx. 16-20g' },
        { name: isJa ? 'バリン' : 'Valine', value: '3.51g' },
        { name: isJa ? 'グリシン' : 'Glycine', value: '3.10g' },
        { name: isJa ? '食塩相当量（推定）' : 'Salt Equivalent (estimated)', value: '1,050mg' },
        { name: isJa ? 'マンガン' : 'Manganese', value: '1.9mg' },
        { name: isJa ? 'ビタミンB6' : 'Vitamin B6', value: '0.36mg' },
        { name: isJa ? 'トリプトファン' : 'Tryptophan', value: '0.93g' },
        { name: isJa ? 'ヒスチジン' : 'Histidine', value: '1.09g' },
        { name: isJa ? 'プロリン' : 'Proline', value: '2.38g' },
        { name: isJa ? 'カリウム' : 'Potassium', value: '1,360mg' },
        { name: isJa ? 'β-カロテン（推定A）' : 'Beta-Carotene (estimated A)', value: isJa ? '約100mg' : 'approx. 100mg' },
        { name: isJa ? 'スレオニン' : 'Threonine', value: '2.97g' },
        { name: isJa ? 'アルギニン' : 'Arginine', value: '4.15g' },
        { name: isJa ? 'セリン' : 'Serine', value: '3.00g' },
        { name: isJa ? 'マグネシウム' : 'Magnesium', value: '195mg' },
        { name: isJa ? 'ビタミンE' : 'Vitamin E', value: '5mg' },
        { name: isJa ? 'ビタミンC' : 'Vitamin C', value: '10mg' },
        { name: isJa ? 'イソロイシン' : 'Isoleucine', value: '3.21g' },
        { name: isJa ? 'システイン' : 'Cysteine', value: '0.66g' },
        { name: isJa ? '飽和脂肪酸（概算）' : 'Saturated Fatty Acids (approx.)', value: isJa ? '約2g' : 'approx. 2g' },
        { name: isJa ? 'カルシウム' : 'Calcium', value: '120mg' },
        { name: isJa ? 'ビタミンK' : 'Vitamin K', value: '25.5ug' },
        { name: isJa ? 'クロロフィルa（葉緑素）' : 'Chlorophyll a', value: '0.3-1.1%' },
        { name: isJa ? 'ロイシン' : 'Leucine', value: '4.95g' },
        { name: isJa ? 'チロシン' : 'Tyrosine', value: '2.58g' },
        { name: isJa ? 'オメガ3脂肪酸（α-リノレン酸含む）' : 'Omega-3 Fatty Acids (incl. α-Linolenic)', value: isJa ? '約100mg' : 'approx. 100mg' },
        { name: isJa ? 'リン' : 'Phosphorus', value: '118mg' },
        { name: isJa ? 'ビタミンB1' : 'Vitamin B1', value: '2.38mg' },
        { name: isJa ? 'カロテノイド' : 'Carotenoids', value: '0.03-0.5%' },
        { name: isJa ? 'リシン' : 'Lysine', value: '3.03g' },
        { name: isJa ? 'アラニン' : 'Alanine', value: '4.52g' },
        { name: isJa ? 'オメガ6脂肪酸（γ-リノレン酸含む）' : 'Omega-6 Fatty Acids (incl. γ-Linolenic)', value: isJa ? '約1.5g' : 'approx. 1.5g' },
        { name: isJa ? '鉄' : 'Iron', value: '28.5mg' },
        { name: isJa ? 'ビタミンB2' : 'Vitamin B2', value: '3.67mg' },
        { name: isJa ? '核酸' : 'Nucleic Acids', value: '4-6%' },
        { name: isJa ? 'メチオニン' : 'Methionine', value: '1.15g' },
        { name: isJa ? 'アスパラギン酸' : 'Aspartic Acid', value: '5.79g' },
        { name: isJa ? '糖質（3種）' : 'Sugars (3 types)', value: '8g' },
        { name: isJa ? '亜鉛' : 'Zinc', value: '2.0mg' },
        { name: isJa ? 'ビタミンB3' : 'Vitamin B3', value: '12.8mg' },
        { name: isJa ? '水分' : 'Moisture', value: '3-7%' },
        { name: isJa ? 'フェニルアラニン' : 'Phenylalanine', value: '2.78g' },
        { name: isJa ? 'グルタミン酸' : 'Glutamic Acid', value: '8.39g' },
        { name: isJa ? '食物繊維' : 'Dietary Fiber', value: '12g' },
        { name: isJa ? '銅' : 'Copper', value: '0.3-0.4mg' },
        { name: isJa ? 'ビタミンB5' : 'Vitamin B5', value: '3.48mg' },
        { name: isJa ? 'ビタミンB9' : 'Vitamin B9', value: '94ug' },
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
      summary: {
        total: '48 Nutrients',
        description:
          'Potassium, sodium, magnesium, calcium, phosphorus, iron, manganese, zinc, copper, Vitamin A, B1, B2, B3, B5, B6, B9, C, E, K, tryptophan, threonine, leucine, isoleucine, lysine, methionine, phenylalanine, valine, histidine, arginine, cystine, tyrosine, alanine, aspartic acid, glutamic acid, serine, glycine, proline, saturated fatty acids, omega-3 fatty acids, omega-6 fatty acids, C-phycocyanin, chlorophyll a, total carotenoids, nucleic acids, sulfated polysaccharides, glycogen-like polysaccharides, beta-glucan-like polysaccharides, cellulose.',
      },
      benefits: [],
    },
  };
}

export default async function AchievePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const achieveProduct = getAchieveProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="Mother Vegetable Achieve"
        description="48 different nutrients in one stick. Premium health supplement for daily wellness."
        image="/cdn/products_achieve_10004.jpg"
        price={36.70}
        slug="achieve"
      />
      <ProductPage product={achieveProduct} />
    </>
  );
}
