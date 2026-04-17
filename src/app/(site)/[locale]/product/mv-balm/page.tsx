import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジバウム — Mother Vegetable',
  description: 'Luxury nutrient-rich balm with natural collagen. 50g. Multi-purpose care.',
  openGraph: {
    title: 'マザベジバウム — Mother Vegetable',
    description: 'Natural collagen luxury balm. 50g.',
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
    tagline: isJa ? '天然コラーゲン配合のラグジュアリーバウム。' : 'Premium natural collagen luxury balm.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-balm')?.inStock ?? true,
    productImage: '/cdn/mv_balm.jpg',
    galleryImages: getProductBySlug('mv-balm')?.galleryImages,
    benefits: isJa
      ? [
          '集中リペア — 天然コラーゲンが乾燥・ひび割れ・荒れた肌を集中的に修復・保護。',
          'マルチユース — 唇・手・肘・かかと・目元など、全身の乾燥が気になる部分にこれ1つでケア。',
          'ポータブル — コンパクトサイズで持ち運びに便利。外出先でもいつでもケア可能。',
          '天然成分配合 — 48種の栄養素と天然由来オイルをベースに、肌に優しいナチュラル処方。',
        ]
      : [
          'Intensive Repair — Natural collagen intensively restores and protects dry, cracked, and rough skin.',
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
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '97.1g' },
            { label: 'タンパク質', value: '2.4〜2.6g' },
            { label: '食物繊維', value: '0.3〜0.5g' },
            { label: '脂質', value: '0.1g以下' },
            { label: '水分', value: '0.1g' },
          ]
        : [
            { label: 'Main Component', value: '97.1g' },
            { label: 'Protein', value: '2.4~2.6g' },
            { label: 'Dietary Fiber', value: '0.3~0.5g' },
            { label: 'Fat', value: '0.1g or less' },
            { label: 'Moisture', value: '0.1g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '抽出工程のない自然な形状',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Complete indoor cultivation free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Natural form without extraction processes',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '乾燥・荒れ肌', items: ['集中保湿ケア', 'かさつきをケア', 'バリア機能をサポート', '肌を落ち着かせる', '長時間の保護膜形成'] },
            { title: '唇・目元', items: ['唇の乾燥をケア', '目元の保湿', 'デリケートゾーンケア', '唇のうるおいを守る', '乾燥から守る'] },
            { title: 'ボディケア', items: ['手・肘・かかとのケア', '乾燥をケア', '全身保湿', 'キューティクルケア', 'ネイル周りの保護'] },
            { title: '毎日のケア', items: ['肌にハリを与える', '肌をすこやかに保つ', 'うるおいを補給', 'コラーゲン配合', '乾燥から肌を守る'] },
          ]
        : [
            { title: 'Dry & Rough Skin', items: ['Intensive moisture care', 'Cares for flakiness', 'Supports skin barrier', 'Calms skin', 'Forms long-lasting protective layer'] },
            { title: 'Lips & Eye Area', items: ['Cares for dry lips', 'Moisturizes eye area', 'Delicate zone care', 'Keeps lips moisturized', 'Protects from dryness'] },
            { title: 'Body Care', items: ['Hand, elbow & heel care', 'Cares for dryness', 'Full body moisturizing', 'Cuticle care', 'Protects nail surroundings'] },
            { title: 'Daily Care', items: ['Adds firmness to skin', 'Keeps skin healthy', 'Replenishes moisture', 'Collagen-infused', 'Protects skin from dryness'] },
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
        description="Luxury nutrient-rich balm with natural collagen. 50g."
        image="/cdn/mv_balm.jpg"
        price={13.50}
        slug="mv-balm"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
