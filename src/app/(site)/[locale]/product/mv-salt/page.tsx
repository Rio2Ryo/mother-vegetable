import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ塩 — Mother Vegetable',
  description:
    'Green spirulina infused salt. 50g. Rich in minerals and 48 nutrients. ¥2,000.',
  openGraph: {
    title: 'マザベジ塩 — Mother Vegetable',
    description: 'Green spirulina salt rich in minerals and 48 nutrients.',
    images: [{ url: '/images/mv_salt.jpg', width: 800, height: 800, alt: 'マザベジ塩' }],
  },
};

function getMvSaltProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'mv-salt',
    name: isJa ? 'マザベジ塩' : 'MV Salt',
    fullName: isJa ? 'マザベジ塩 / 50g' : 'Mother Vegetable Salt / 50g',
    subtitle: '50g',
    taglineJp: '',
    tagline: isJa ? 'スピルリナ配合の緑色の塩。' : 'Green spirulina infused salt.',
    price: 13.50,
    currency: 'USD',
    priceDisplay: 'USD 13.50',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-salt')?.inStock ?? true,
    productImage: '/images/mv_salt.jpg',
    videoUrls: [],
    mainVideoUrl: '',
    benefits: isJa
      ? [
          'スピルリナ配合の緑色の塩で48種の栄養素を補給。',
          '毎日の料理に混ぜるだけで栄養価アップ。',
        ]
      : [
          'Green spirulina salt provides 48 different nutrients.',
          'Simply add to everyday cooking for a nutritional boost.',
        ],
    howToUse: isJa ? '普通の塩と同様に料理や調味に使用してください。' : 'Use as everyday salt in cooking and seasoning.',
    howToLink: '#',
    leftSection: { title: '', items: [] },
    rightSection: { title: '', items: [] },
    centerTitle: '',
    centerImage: '',
    trust: {
      productName: isJa ? 'マザベジ塩' : 'MV Salt',
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
      subtitle: isJa ? 'マザベジ塩' : 'MV Salt',
      method: isJa ? '加える / 振りかける' : 'Add / Sprinkle',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Essential Fatty Acids', detail: '9 types' },
        { name: 'Amino Acids', detail: '10 types' },
        { name: 'Vital Vitamins', detail: '18 types' },
        { name: 'Key Minerals', detail: '3 types' },
        { name: 'Spirulina Nutrients', detail: '48 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description: 'Spirulina-infused green salt provides essential minerals, vitamins, and nutrients in every pinch.',
      },
      benefits: isJa
        ? [
            { title: '子ども', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['ミネラル補給', '免疫力の向上', '骨の成長をサポート'] },
            { title: '成人', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['毎日の栄養補給', '代謝の改善', '疲労軽減'] },
            { title: '高齢者', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['ミネラルバランスの維持', '食欲と栄養摂取の向上', '骨密度の促進'] },
            { title: 'アスリート', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['電解質補給', '筋肉回復のサポート', '効率的な栄養吸収'] },
          ]
        : [
            { title: 'Children', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['Mineral supplementation', 'Boosts immunity', 'Supports bone growth'] },
            { title: 'Adults', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Daily nutrition', 'Improves metabolism', 'Reduces fatigue'] },
            { title: 'Seniors', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Maintains mineral balance', 'Boosts nutrient intake', 'Promotes bone density'] },
            { title: 'Athletes', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Electrolyte replenishment', 'Supports muscle recovery', 'Efficient nutrient absorption'] },
          ],
    },
  };
}

export default async function MvSaltPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvSaltProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ塩"
        description="Green spirulina infused salt. 50g. Rich in minerals and 48 nutrients."
        image="/images/mv_salt.jpg"
        price={13.50}
        slug="mv-salt"
      />
      <ProductPage product={product} />
    </>
  );
}
