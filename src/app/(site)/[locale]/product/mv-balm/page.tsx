import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジバウム — Mother Vegetable',
  description: 'Luxury spirulina balm with Confidence collagen. 50g. Multi-purpose skin healing.',
  openGraph: {
    title: 'マザベジバウム — Mother Vegetable',
    description: 'Confidence collagen luxury balm for intensive skin repair.',
    images: [{ url: '/cdn/mv_balm.jpg', width: 800, height: 800, alt: 'マザベジバウム' }],
  },
};

function getMvBalmProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-balm',
    name: isJa ? 'マザベジバウム' : 'MV Balm',
    fullName: isJa ? 'マザベジバウム / 50g' : 'Mother Vegetable Balm / 50g',
    subtitle: '50g',
    taglineJp: '',
    tagline: isJa ? 'Confidenceコラーゲン配合のラグジュアリーバウム。' : 'Confidence-powered luxury balm.',
    price: 13.50,
    currency: 'USD',
    priceDisplay: 'USD 13.50',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-balm')?.inStock ?? true,
    productImage: '/cdn/mv_balm.jpg',
    videoUrls: [],
    mainVideoUrl: '',
    benefits: isJa
      ? ['肌トラブル改善 — Confidenceコラーゲンが集中的に肌を修復。', '顔・唇・ボディに使えるマルチユースバウム。']
      : ['Skin Healing Effect — Confidence collagen for intensive skin repair.', 'Multi-use luxury balm for face, lips, and body.'],
    howToUse: isJa ? '必要な部分に少量を取り、肌に馴染ませてください。' : 'Apply a small amount to dry areas of skin as needed.',
    howToLink: '#',
    leftSection: { title: '', items: [] },
    rightSection: { title: '', items: [] },
    centerTitle: '',
    centerImage: '',
    trust: {
      productName: isJa ? 'マザベジバウム' : 'MV Balm',
      certification: isJa ? '厚生労働省により医薬部外品認定' : 'quasi-drug certified by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
      type: 'cosmetic',
      title: 'Skin Function',
      subtitle: isJa ? 'マザベジバウム' : 'MV Balm',
      method: isJa ? '塗る / 保護する' : 'Apply / Protect',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Skin Healing', detail: 'Confidence' },
        { name: 'Intensive Repair', detail: 'Collagen' },
        { name: 'Moisturizing', detail: 'Deep nourish' },
        { name: 'Protection', detail: 'Barrier care' },
        { name: 'Nutrients', detail: '48 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description: 'Confidence collagen luxury balm with spirulina for intensive skin repair, deep nourishment, and multi-area protection.',
      },
      benefits: isJa
        ? [
            { title: '乾燥・荒れ肌', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['集中保湿・修復', 'かさつき改善', 'バリア機能を強化'] },
            { title: '唇・目元', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['唇の乾燥・荒れ改善', '目元の保湿', 'デリケートゾーンケア'] },
            { title: 'ボディケア', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['手・肘・かかとのケア', '乾燥ライン改善', '全身保湿'] },
            { title: 'アンチエイジング', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['シワ・たるみ改善', '肌の弾力を回復', '細胞の再生を促進'] },
          ]
        : [
            { title: 'Dry & Rough Skin', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['Intensive moisture & repair', 'Reduces flakiness', 'Strengthens skin barrier'] },
            { title: 'Lips & Eye Area', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Heals dry & chapped lips', 'Moisturizes eye area', 'Delicate zone care'] },
            { title: 'Body Care', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Hand, elbow & heel care', 'Improves dry lines', 'Full body moisturizing'] },
            { title: 'Anti-Aging', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Reduces wrinkles & sagging', 'Restores elasticity', 'Promotes cell regeneration'] },
          ],
    },
  };
}

export default async function MvBalmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvBalmProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジバウム"
        description="Luxury spirulina balm with Confidence collagen. 50g."
        image="/cdn/mv_balm.jpg"
        price={13.50}
        slug="mv-balm"
      />
      <ProductPage product={product} />
    </>
  );
}
