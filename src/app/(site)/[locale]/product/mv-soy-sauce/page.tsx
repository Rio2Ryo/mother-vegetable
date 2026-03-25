import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ醤油 — Mother Vegetable',
  description:
    'Premium dark soy sauce with spirulina. 150ml. Rich umami with 48 nutrients. USD 13.50.',
  openGraph: {
    title: 'マザベジ醤油 — Mother Vegetable',
    description: 'Spirulina-infused premium dark soy sauce with 48 nutrients.',
    images: [{ url: '/images/mv_soy_sauce.jpg', width: 800, height: 800, alt: 'マザベジ醤油' }],
  },
};

function getMvSoySauceProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'mv-soy-sauce',
    name: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
    fullName: isJa ? 'マザベジ醤油 / 150ml' : 'Mother Vegetable Soy Sauce / 150ml',
    subtitle: '150ml',
    taglineJp: '',
    tagline: isJa ? 'スピルリナ配合のプレミアム醤油。' : 'Premium spirulina dark soy sauce.',
    price: 13.50,
    currency: 'USD',
    priceDisplay: 'USD 13.50',
    inStock: getProductBySlug('mv-soy-sauce')?.inStock ?? true,
    productImage: '/images/mv_soy_sauce.jpg',
    videoUrls: [],
    mainVideoUrl: '',
    benefits: isJa
      ? [
          'スピルリナ配合のプレミアム醤油で48種の栄養素を補給。',
          '豊かな旨味と栄養素で毎日の食事をサポート。',
        ]
      : [
          'Premium spirulina soy sauce provides 48 different nutrients.',
          'Rich umami taste with added health benefits for daily meals.',
        ],
    howToUse: isJa ? '普通の醤油と同様に調理や付け醤油にご使用ください。' : 'Use as everyday soy sauce for cooking and dipping.',
    howToLink: '#',
    leftSection: { title: '', items: [] },
    rightSection: { title: '', items: [] },
    centerTitle: '',
    centerImage: '',
    trust: {
      productName: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
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
      subtitle: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
      method: isJa ? '加える / 付ける' : 'Add / Dip',
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
        description: 'Spirulina-infused premium dark soy sauce delivers essential nutrients with every drop of rich umami flavor.',
      },
      benefits: isJa
        ? [
            { title: '子ども', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['栄養豊富な調味料', '免疫力の向上', '食欲増進'] },
            { title: '成人', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['毎日の栄養補給', '代謝の改善', '細胞の老化抑制'] },
            { title: '高齢者', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['食欲と栄養摂取の向上', '内臓機能のサポート', '骨密度の促進'] },
            { title: 'アスリート', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['効率的な栄養吸収', '筋肉回復のサポート', '炎症軽減'] },
          ]
        : [
            { title: 'Children', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['Nutrient-rich seasoning', 'Boosts immunity', 'Increases appetite'] },
            { title: 'Adults', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Daily nutrition', 'Improves metabolism', 'Suppresses cellular aging'] },
            { title: 'Seniors', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Boosts appetite and nutrient intake', 'Supports internal organ function', 'Promotes bone density'] },
            { title: 'Athletes', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Efficient nutrient absorption', 'Supports muscle recovery', 'Reduces inflammation'] },
          ],
    },
  };
}

export default async function MvSoySaucePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvSoySauceProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ醤油"
        description="Premium dark soy sauce with spirulina. 150ml. Rich umami with 48 nutrients."
        image="/images/mv_soy_sauce.jpg"
        price={13.50}
        slug="mv-soy-sauce"
      />
      <ProductPage product={product} />
    </>
  );
}
