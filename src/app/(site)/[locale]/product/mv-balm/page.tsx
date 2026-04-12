import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジバウム — Mother Vegetable',
  description: 'Luxury nutrient-rich balm with Confidence collagen. 50g. Multi-purpose skin healing.',
  openGraph: {
    title: 'マザベジバウム — Mother Vegetable',
    description: 'Confidence collagen luxury balm for intensive skin repair.',
    images: [{ url: '/cdn/mv_balm.jpg', width: 800, height: 800, alt: 'マザベジバウム' }],
  },
};

function getMvBalmProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-balm',
    category: 'cosmetic',
    name: isJa ? 'マザベジバウム' : 'MV Balm',
    fullName: isJa ? 'マザベジバウム / 50g' : 'Mother Vegetable Balm / 50g',
    subtitle: '50g',
    tagline: isJa ? 'Confidenceコラーゲン配合のラグジュアリーバウム。' : 'Confidence-powered luxury balm.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-balm')?.inStock ?? true,
    productImage: '/cdn/mv_balm.jpg',
    galleryImages: getProductBySlug('mv-balm')?.galleryImages,
    benefits: isJa
      ? [
          '集中リペア — Confidenceコラーゲンが乾燥・ひび割れ・荒れた肌を集中的に修復・保護。',
          'マルチユース — 唇・手・肘・かかと・目元など、全身の乾燥が気になる部分にこれ1つでケア。',
          'ポータブル — コンパクトサイズで持ち運びに便利。外出先でもいつでもケア可能。',
          '天然成分配合 — 48種の栄養素と天然由来オイルをベースに、肌に優しいナチュラル処方。',
        ]
      : [
          'Intensive Repair — Confidence collagen intensively restores and protects dry, cracked, and rough skin.',
          'Multi-Use — One balm for lips, hands, elbows, heels, eye area, and any dry zone on the body.',
          'Portable — Compact size for on-the-go care anytime, anywhere.',
          'Natural Ingredients — A gentle, natural formula based on plant-based nutrients and plant-derived oils.',
        ],
    howToUse: isJa
      ? '唇：荒れや乾燥が気になるときに薄く塗布。手・指先：キューティクルや指先の乾燥に少量を馴染ませます。乾燥部分：肘・かかと・膝など乾燥しやすい部分に集中ケア。目元：デリケートな目元にも優しく使えます。就寝前のナイトケアにもおすすめ。'
      : 'Lips: Apply a thin layer whenever dryness or chapping occurs. Hands & cuticles: Work a small amount into cuticles and fingertips. Dry patches: Use as a concentrated treatment on elbows, heels, and knees. Eye area: Gentle enough for the delicate skin around the eyes. Also recommended as an overnight night-care treatment.',
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
      subtitle: isJa ? 'マザベジバウム' : 'MV Balm',
      circles: [
        { name: 'Shea Butter', detail: 'Moisturizer' },
        { name: 'Beeswax', detail: 'Sealant' },
        { name: 'Jojoba Oil', detail: 'Nourishing' },
        { name: 'Vitamin E', detail: 'Antioxidant' },
        { name: 'Coconut Oil', detail: 'Hydration' },
      ],
      benefits: isJa
        ? [
            { title: '乾燥・荒れ肌', items: ['集中保湿・修復', 'かさつき改善', 'バリア機能を強化', '肌荒れを鎮静', '長時間の保護膜形成'] },
            { title: '唇・目元', items: ['唇の乾燥・荒れ改善', '目元の保湿', 'デリケートゾーンケア', 'ひび割れ唇の集中修復', '縦ジワを目立たなくする'] },
            { title: 'ボディケア', items: ['手・肘・かかとのケア', '乾燥ライン改善', '全身保湿', 'キューティクルケア', 'ネイル周りの保護'] },
            { title: 'アンチエイジング', items: ['シワ・たるみ改善', '肌の弾力を回復', '細胞の再生を促進', 'コラーゲンでハリを与える', '乾燥小ジワを予防'] },
          ]
        : [
            { title: 'Dry & Rough Skin', items: ['Intensive moisture & repair', 'Reduces flakiness', 'Strengthens skin barrier', 'Calms irritated skin', 'Forms long-lasting protective layer'] },
            { title: 'Lips & Eye Area', items: ['Heals dry & chapped lips', 'Moisturizes eye area', 'Delicate zone care', 'Intensive lip crack repair', 'Smooths fine lip lines'] },
            { title: 'Body Care', items: ['Hand, elbow & heel care', 'Improves dry lines', 'Full body moisturizing', 'Cuticle care', 'Protects nail surroundings'] },
            { title: 'Anti-Aging', items: ['Reduces wrinkles & sagging', 'Restores elasticity', 'Promotes cell regeneration', 'Collagen adds firmness', 'Prevents fine lines from dryness'] },
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
        description="Luxury nutrient-rich balm with Confidence collagen. 50g."
        image="/cdn/mv_balm.jpg"
        price={13.50}
        slug="mv-balm"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
