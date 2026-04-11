import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ石鹸 — Mother Vegetable',
  description: 'Handcrafted green spirulina soap with Confidence collagen. 100g. Deep cleansing with skin care.',
  openGraph: {
    title: 'マザベジ石鹸 — Mother Vegetable',
    description: 'Confidence collagen spirulina soap for deep cleansing and skin healing.',
    images: [{ url: '/images/mv_soap.jpg', width: 800, height: 800, alt: 'マザベジ石鹸' }],
  },
};

function getMvSoapProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-soap',
    name: isJa ? 'マザベジ石鹸' : 'MV Soap',
    fullName: isJa ? 'マザベジ石鹸 / 100g' : 'Mother Vegetable Soap / 100g',
    subtitle: '100g',
    taglineJp: '',
    tagline: isJa ? 'Confidenceコラーゲン配合の手作り石鹸。' : 'Confidence-powered spirulina soap.',
    price: 13.50,
    currency: 'USD',
    priceDisplay: 'USD 13.50',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-soap')?.inStock ?? true,
    productImage: '/images/mv_soap.jpg',
    videoUrls: [],
    mainVideoUrl: '',
    benefits: isJa
      ? ['肌トラブル改善 — Confidenceコラーゲンが洗いながら肌を修復。', 'スピルリナの天然成分でディープクレンジングと美肌効果。']
      : ['Skin Healing Effect — Confidence collagen cleanses while healing skin.', 'Natural spirulina deep cleanse with anti-aging benefits.'],
    howToUse: isJa ? '水で泡立て、顔や体に優しくマッサージしてください。' : 'Lather with water and massage onto face and body.',
    howToLink: '#',
    leftSection: { title: '', items: [] },
    rightSection: { title: '', items: [] },
    centerTitle: '',
    centerImage: '',
    trust: {
      productName: isJa ? 'マザベジ石鹸' : 'MV Soap',
      certification: isJa ? '厚生労働省によりヒューマングレード食品認定' : 'certified human grade food by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
      title: 'Skin Function',
      subtitle: isJa ? 'マザベジ石鹸' : 'MV Soap',
      method: isJa ? '泡立て / 洗う' : 'Lather / Cleanse',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Skin Healing', detail: 'Confidence' },
        { name: 'Deep Cleanse', detail: 'Spirulina' },
        { name: 'Anti-Aging', detail: 'Collagen' },
        { name: 'Moisturizing', detail: 'Natural oils' },
        { name: 'Nutrients', detail: '48 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description: 'Handcrafted spirulina soap with Confidence collagen for deep cleansing, skin healing, and natural anti-aging care.',
      },
      benefits: isJa
        ? [
            { title: '普通肌', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['毎日のクレンジング', '毛穴をすっきり洗浄', '肌のキメを整える'] },
            { title: '肌トラブル', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['肌トラブル改善', 'にきび・炎症を抑制', '肌を落ち着かせる'] },
            { title: '年齢肌', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['アンチエイジング洗顔', '肌の弾力を回復', 'シワ・たるみ予防'] },
            { title: 'ボディケア', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['全身の保湿洗浄', '体臭・汗の予防', '肌のツヤアップ'] },
          ]
        : [
            { title: 'Normal Skin', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['Daily cleansing', 'Deep pore cleanse', 'Smooths skin texture'] },
            { title: 'Skin Trouble', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Skin healing effect', 'Reduces acne & inflammation', 'Calms irritated skin'] },
            { title: 'Mature Skin', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Anti-aging cleanse', 'Restores elasticity', 'Prevents wrinkles & sagging'] },
            { title: 'Body Care', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Moisturizing full-body wash', 'Prevents body odor', 'Adds skin radiance'] },
          ],
    },
  };
}

export default async function MvSoapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvSoapProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ石鹸"
        description="Handcrafted green spirulina soap with Confidence collagen. 100g."
        image="/images/mv_soap.jpg"
        price={13.50}
        slug="mv-soap"
      />
      <ProductPage product={product} />
    </>
  );
}
