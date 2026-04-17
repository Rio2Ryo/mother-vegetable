import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ化粧水 — Mother Vegetable',
  description: 'Nutrient-infused facial toner with natural collagen. 150ml.',
  openGraph: {
    title: 'マザベジ化粧水 — Mother Vegetable',
    description: 'Natural collagen facial toner. 150ml.',
    images: [{ url: '/cdn/mv_toner.jpg', width: 800, height: 800, alt: 'マザベジ化粧水' }],
  },
};

function getMvTonerProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-toner',
    category: 'cosmetic',
    name: isJa ? 'マザベジ化粧水' : 'MV Toner',
    fullName: isJa ? 'マザベジ化粧水 / 150ml' : 'Mother Vegetable Toner / 150ml',
    subtitle: '150ml',
    tagline: isJa ? '天然コラーゲン配合の化粧水。' : 'Premium natural collagen skin toner.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-toner')?.inStock ?? true,
    productImage: '/cdn/mv_toner.jpg',
    galleryImages: getProductBySlug('mv-toner')?.galleryImages,
    benefits: isJa
      ? [
          'うるおいケア — 天然コラーゲンと天然栄養素が角質層まで浸透し、長時間うるおいをキープ。',
          '肌をすこやかに — 天然コラーゲンと栄養素で肌のコンディションを整えます。',
          '毎日のスキンケアに — 天然コラーゲン配合で、日々のお手入れをサポート。',
          '低刺激処方 — 敏感肌にも安心の優しい処方。植物由来の天然成分で肌をいたわります。',
        ]
      : [
          'Moisture Care — Natural collagen and nutrients penetrate the stratum corneum for long-lasting moisture.',
          'Healthy Skin — Natural collagen and nutrients help keep skin looking its best.',
          'Daily Skincare — Natural collagen formula supports your everyday skincare routine.',
          'Gentle Formula — A low-irritation formula safe for sensitive skin, using natural plant-derived ingredients.',
        ],
    howToUse: isJa
      ? '朝晩の洗顔後、適量を手のひらまたはコットンに取り、顔全体と首に優しくパッティング。化粧水の後に美容液やクリームを重ねると効果的です。特に乾燥が気になる部分には重ね付けをおすすめします。'
      : 'After cleansing morning and evening, pour an appropriate amount onto your palm or a cotton pad. Gently pat across the entire face and neck. Layer with serum or cream afterward for best results. Apply extra layers on particularly dry areas.',
    trust: {
      productName: isJa ? 'マザベジ化粧水' : 'MV Toner',
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
      subtitle: isJa ? 'マザベジ化粧水' : 'MV Toner',
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
            { title: '乾燥肌', items: ['うるおいを与える', 'バリア機能をサポート', 'キメを整える', '長時間うるおいキープ', '乾燥から肌を守る'] },
            { title: '敏感肌', items: ['肌をやさしくケア', '肌を落ち着かせる', '低刺激で毎日使える', '天然成分配合', '肌のコンディションを整える'] },
            { title: 'エイジングサイン', items: ['肌にハリを与える', '肌をすこやかに保つ', 'うるおいを補給', '透明感のある肌へ', '毎日のケアに'] },
            { title: '美容ケア', items: ['透明感アップ', '毛穴をケア', '肌のトーンを整える', '化粧ノリをサポート', '肌をなめらかに'] },
          ]
        : [
            { title: 'Dry Skin', items: ['Provides moisture', 'Supports skin barrier', 'Smooths texture', 'Long-lasting moisture retention', 'Protects from dryness'] },
            { title: 'Sensitive Skin', items: ['Gentle skin care', 'Calms skin', 'Gentle enough for daily use', 'Natural ingredients', 'Supports skin condition'] },
            { title: 'Aging Signs', items: ['Adds firmness to skin', 'Keeps skin healthy', 'Replenishes moisture', 'For radiant-looking skin', 'For daily care'] },
            { title: 'Beauty Care', items: ['Brightening care', 'Pore care', 'Evens skin tone', 'Supports makeup adherence', 'Smooths skin'] },
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
        description="Nutrient-infused facial toner with natural collagen. 150ml."
        image="/cdn/mv_toner.jpg"
        price={13.50}
        slug="mv-toner"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
