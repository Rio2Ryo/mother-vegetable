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
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable Achieve' }],
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
    priceMvt: '10 MVT',
    inStock: getProductBySlug('achieve')?.inStock ?? true,
    productImage: '/cdn/products_achieve_10001.png',
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

    leftSection: {
      title: isJa ? '飲み物' : 'Drink',
      items: [
        { name: isJa ? '水' : 'Water', image: '/Images/Assets/achieve/mazekomu/water_green.png' },
        { name: isJa ? 'ジュース' : 'Juice', image: '/Images/Assets/achieve/mazekomu/juice.png' },
        { name: isJa ? 'コーラ' : 'Cola', image: '/Images/Assets/achieve/mazekomu/cola.png' },
        { name: isJa ? 'ビール' : 'Beer', image: '/Images/Assets/achieve/mazekomu/beer.png' },
        { name: isJa ? 'ワイン' : 'White wine', image: '/Images/Assets/achieve/mazekomu/whiteWine.png' },
        { name: isJa ? 'ハイボール' : 'Highball', image: '/Images/Assets/achieve/mazekomu/highball.png' },
      ],
    },
    rightSection: {
      title: isJa ? '食べ物' : 'Food',
      items: [
        { name: isJa ? 'チャーハン' : 'Fried Rice', image: '/Images/Assets/achieve/mazekomu/friedRice.png' },
        { name: isJa ? 'ラーメン' : 'Ramen', image: '/Images/Assets/achieve/mazekomu/ramen.png' },
        { name: isJa ? 'サラダ' : 'Salad', image: '/Images/Assets/achieve/mazekomu/salad.png' },
        { name: isJa ? 'ヨーグルト' : 'Yogurt', image: '/Images/Assets/achieve/mazekomu/yogurt.png' },
        { name: isJa ? 'パスタ' : 'Pasta', image: '/Images/Assets/achieve/mazekomu/pasta.png' },
        { name: isJa ? '天ぷら' : 'Tempura', image: '/Images/Assets/achieve/mazekomu/tempura.png' },
      ],
    },
    centerTitle: isJa ? '混ぜる' : 'Mix In',
    centerImage: '/Images/Assets/achieve/mazekomu/mazekomu.png',

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
        { name: isJa ? '食塩相当量' : 'Salt Equivalent', value: '1,050mg' },
        { name: isJa ? 'マンガン' : 'Manganese', value: '1.9mg' },
        { name: isJa ? 'ビタミンB6' : 'Vitamin B6', value: '0.36mg' },
        { name: isJa ? 'トリプトファン' : 'Tryptophan', value: '0.93g' },
        { name: isJa ? 'ヒスチジン' : 'Histidine', value: '1.09g' },
        { name: isJa ? 'プロリン' : 'Proline', value: '2.38g' },
        { name: isJa ? 'カリウム' : 'Potassium', value: '1,410mg' },
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
        image="/cdn/products_achieve_10001.png"
        price={36.70}
        slug="achieve"
      />
      <ProductPage product={achieveProduct} />
    </>
  );
}
