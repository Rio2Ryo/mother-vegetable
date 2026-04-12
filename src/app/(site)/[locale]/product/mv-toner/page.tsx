import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ化粧水 — Mother Vegetable',
  description: 'Nutrient-infused facial toner with natural collagen. 150ml. Skin healing and anti-aging.',
  openGraph: {
    title: 'マザベジ化粧水 — Mother Vegetable',
    description: 'Natural collagen toner for skin healing and anti-aging.',
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
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-toner')?.inStock ?? true,
    productImage: '/cdn/mv_toner.jpg',
    galleryImages: getProductBySlug('mv-toner')?.galleryImages,
    benefits: isJa
      ? [
          'ディープ保湿 — 天然コラーゲンと天然栄養素が角質層まで浸透し、長時間うるおいをキープ。',
          'エイジングケア — コラーゲン生成を促進し、シワ・たるみ・くすみにアプローチ。',
          '肌トラブル改善 — 天然コラーゲンの修復力で荒れ肌・赤み・炎症を鎮静。',
          '低刺激処方 — 敏感肌にも安心の優しい処方。植物由来の天然成分で肌をいたわります。',
        ]
      : [
          'Deep Hydration — Natural collagen and nutrients penetrate the stratum corneum for long-lasting moisture.',
          'Anti-Aging Care — Promotes collagen production to target wrinkles, sagging, and dullness.',
          'Skin Healing — Natural collagen calms rough skin, redness, and inflammation.',
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
      subtitle: isJa ? '自信' : 'Confidence',
      circles: isJa
        ? [
            { name: 'シミ・そばかす', detail: 'シミ・そばかす' },
            { name: 'ニキビ・ニキビ跡', detail: 'ニキビ・ニキビ跡' },
            { name: '傷跡・火傷跡', detail: '傷跡・やけど跡' },
            { name: '臭い', detail: '臭い：顔、首、脇、Vゾーン、足' },
            { name: 'ツヤ', detail: 'ツヤ：清潔感を保つ、ナチュラル/アーストーン' },
          ]
        : [
            { name: 'Dark Spots', detail: 'Dark Spots, Freckles' },
            { name: 'Acne', detail: 'Acne, Acne scars' },
            { name: 'Wounds & Scars', detail: 'Wounds, Scars, Burn Marks' },
            { name: 'Odor', detail: 'Odor: Face, Neck, Underarms, V-Zone, Feet' },
            { name: 'Shine', detail: 'Shine: Maintains A Clean Look, Natural/Earth Tones' },
          ],
      medicalText: '医薬部外品として認定されたマザーベジタブルは、術後回復、火傷跡の改善、がんケア、皮脂コントロールなど、世界中の医療機関で信頼されています。肌の自然な治癒力とバランス回復をサポートします。',
      benefits: isJa
        ? [
            { title: '乾燥肌', items: ['深い保湿効果', 'バリア機能の強化', 'キメを整える', '長時間うるおいキープ', '乾燥による小ジワを予防'] },
            { title: '敏感肌', items: ['肌トラブル改善', '炎症を抑制', '肌を落ち着かせる', '低刺激で毎日使える', '赤みをケア'] },
            { title: '年齢肌', items: ['シワ・たるみ改善', '肌の弾力を回復', '細胞の再生を促進', 'くすみを解消し透明感アップ', 'ハリとツヤを取り戻す'] },
            { title: '美容重視', items: ['透明感アップ', '毛穴を引き締める', '美白効果', '化粧ノリを改善', 'トーンアップ効果'] },
          ]
        : [
            { title: 'Dry Skin', items: ['Deep hydration', 'Strengthens skin barrier', 'Smooths texture', 'Long-lasting moisture retention', 'Prevents fine lines from dryness'] },
            { title: 'Sensitive Skin', items: ['Skin healing effect', 'Reduces inflammation', 'Calms irritated skin', 'Gentle enough for daily use', 'Soothes redness'] },
            { title: 'Mature Skin', items: ['Reduces wrinkles & sagging', 'Restores elasticity', 'Promotes cell regeneration', 'Clears dullness for radiant skin', 'Revives firmness & glow'] },
            { title: 'Beauty Focus', items: ['Brightening effect', 'Tightens pores', 'Whitening benefits', 'Improves makeup adherence', 'Even skin tone'] },
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
