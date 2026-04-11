import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ化粧水 — Mother Vegetable',
  description: 'Spirulina-infused facial toner with Confidence collagen. 150ml. Skin healing and anti-aging.',
  openGraph: {
    title: 'マザベジ化粧水 — Mother Vegetable',
    description: 'Confidence collagen toner for skin healing and anti-aging.',
    images: [{ url: '/images/mv_toner.jpg', width: 800, height: 800, alt: 'マザベジ化粧水' }],
  },
};

function getMvTonerProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-toner',
    name: isJa ? 'マザベジ化粧水' : 'MV Toner',
    fullName: isJa ? 'マザベジ化粧水 / 150ml' : 'Mother Vegetable Toner / 150ml',
    subtitle: '150ml',
    taglineJp: '',
    tagline: isJa ? 'Confidenceコラーゲン配合の化粧水。' : 'Confidence-powered skin toner.',
    price: 13.50,
    currency: 'USD',
    priceDisplay: 'USD 13.50',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-toner')?.inStock ?? true,
    productImage: '/images/mv_toner.jpg',
    videoUrls: [],
    mainVideoUrl: '',
    benefits: isJa
      ? ['肌トラブル改善 — Confidenceコラーゲンが肌を修復・再生。', 'スピルリナ栄養素で深く保湿し、シワを軽減。']
      : ['Skin Healing Effect — Confidence collagen repairs and restores skin.', 'Deeply hydrates and reduces wrinkles with spirulina nutrients.'],
    howToUse: isJa ? '洗顔後、朝晩に顔と首に馴染ませてください。' : 'Apply to cleansed face and neck morning and evening.',
    howToLink: '#',
    leftSection: { title: '', items: [] },
    rightSection: { title: '', items: [] },
    centerTitle: '',
    centerImage: '',
    trust: {
      productName: isJa ? 'マザベジ化粧水' : 'MV Toner',
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
      subtitle: isJa ? 'マザベジ化粧水' : 'MV Toner',
      method: isJa ? '塗る / 馴染ませる' : 'Apply / Pat in',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Skin Healing', detail: 'Confidence' },
        { name: 'Anti-Aging', detail: 'Collagen' },
        { name: 'Hydration', detail: 'Spirulina' },
        { name: 'Brightening', detail: 'Vitamins' },
        { name: 'Nutrients', detail: '48 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description: 'Confidence collagen-powered toner with spirulina nutrients for deep hydration, skin healing, and anti-aging benefits.',
      },
      benefits: isJa
        ? [
            { title: '乾燥肌', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['深い保湿効果', 'バリア機能の強化', 'キメを整える'] },
            { title: '敏感肌', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['肌トラブル改善', '炎症を抑制', '肌を落ち着かせる'] },
            { title: '年齢肌', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['シワ・たるみ改善', '肌の弾力を回復', '細胞の再生を促進'] },
            { title: '美容重視', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['透明感アップ', '毛穴を引き締める', '美白効果'] },
          ]
        : [
            { title: 'Dry Skin', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['Deep hydration', 'Strengthens skin barrier', 'Smooths texture'] },
            { title: 'Sensitive Skin', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Skin healing effect', 'Reduces inflammation', 'Calms irritated skin'] },
            { title: 'Mature Skin', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Reduces wrinkles & sagging', 'Restores elasticity', 'Promotes cell regeneration'] },
            { title: 'Beauty Focus', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Brightening effect', 'Tightens pores', 'Whitening benefits'] },
          ],
    },
  };
}

export default async function MvTonerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvTonerProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ化粧水"
        description="Spirulina-infused facial toner with Confidence collagen. 150ml."
        image="/images/mv_toner.jpg"
        price={13.50}
        slug="mv-toner"
      />
      <ProductPage product={product} />
    </>
  );
}
