import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジフィッシュ-ティラピア — Mother Vegetable',
  description:
    'Fresh tilapia enriched with spirulina. 48 different nutrients for a healthy lifestyle. USD 13.50.',
  openGraph: {
    title: 'マザベジフィッシュ-ティラピア — Mother Vegetable',
    description: 'Fresh tilapia enriched with spirulina. 48 different nutrients.',
    images: [{ url: '/images/mv_tilapia.jpg', width: 800, height: 800, alt: 'マザベジフィッシュ-ティラピア' }],
  },
};

function getTilapiaProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'tilapia',
    name: isJa ? 'マザベジフィッシュ-ティラピア' : 'MV Fish - Tilapia',
    fullName: isJa ? 'マザベジフィッシュ-ティラピア / 1匹' : 'Mother Vegetable Fish - Tilapia / 1 fish',
    subtitle: isJa ? '身体のために' : 'for Body',
    taglineJp: '',
    tagline: isJa ? 'スピルリナで育てた新鮮なティラピア。' : 'Fresh tilapia enriched with spirulina.',
    price: 13.50,
    currency: 'USD',
    priceDisplay: 'USD 13.50',
    inStock: getProductBySlug('tilapia')?.inStock ?? true,
    productImage: '/images/mv_tilapia.jpg',
    videoUrls: [],
    mainVideoUrl: '',
    benefits: isJa
      ? [
          'スピルリナで育てた新鮮なティラピアで48種の栄養素を摂取。',
          '高タンパク・オメガ3脂肪酸・必須ミネラルが豊富。',
        ]
      : [
          '48 different nutrients from tilapia and spirulina.',
          'High protein, omega-3 fatty acids, and essential minerals.',
        ],
    howToUse: isJa ? '調理してお食事としてお楽しみください。' : 'Cook and enjoy as part of your daily meal.',
    howToLink: '#',
    leftSection: { title: '', items: [] },
    rightSection: { title: '', items: [] },
    centerTitle: '',
    centerImage: '',
    trust: {
      productName: isJa ? 'マザベジフィッシュ-ティラピア' : 'MV Fish - Tilapia',
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
      subtitle: isJa ? 'マザベジフィッシュ-ティラピア' : 'MV Fish - Tilapia',
      method: isJa ? '調理する' : 'Cook',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Essential Fatty Acids', detail: 'Omega-3' },
        { name: 'Amino Acids', detail: 'Complete protein' },
        { name: 'Vital Vitamins', detail: 'B12, D' },
        { name: 'Key Minerals', detail: 'Iron, Zinc' },
        { name: 'Spirulina Nutrients', detail: '48 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description: 'Fresh tilapia enriched with spirulina provides a complete nutritional profile including essential fatty acids, amino acids, vitamins, and minerals.',
      },
      benefits: isJa
        ? [
            { title: '子ども', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['高タンパクで成長をサポート', '骨の成長をサポート', '免疫力の向上'] },
            { title: '成人', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['筋肉維持・増強', '疲労軽減', '代謝の改善'] },
            { title: '高齢者', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['筋肉量の維持', '骨密度の促進', '食欲と栄養摂取の向上'] },
            { title: 'アスリート', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['筋肉回復と持久力の向上', '効率的な栄養吸収', 'トレーニング効果の向上'] },
          ]
        : [
            { title: 'Children', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['High protein supports growth', 'Supports bone growth', 'Boosts immunity'] },
            { title: 'Adults', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Muscle maintenance', 'Reduces fatigue', 'Improves metabolism'] },
            { title: 'Seniors', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Maintains muscle mass', 'Promotes bone density', 'Boosts nutrient intake'] },
            { title: 'Athletes', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Aids muscle recovery', 'Efficient nutrient absorption', 'Enhances training effectiveness'] },
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
        name="マザベジフィッシュ-ティラピア"
        description="Fresh tilapia enriched with spirulina. 48 different nutrients."
        image="/images/mv_tilapia.jpg"
        price={13.50}
        slug="tilapia"
      />
      <ProductPage product={product} />
    </>
  );
}
