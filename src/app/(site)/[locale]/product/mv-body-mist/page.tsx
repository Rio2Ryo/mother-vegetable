import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジボディミスト — Mother Vegetable',
  description: 'Refreshing body mist with natural nutrients. 50ml. Light fragrance for everyday freshness.',
  openGraph: {
    title: 'マザベジボディミスト — Mother Vegetable',
    description: 'Refreshing body mist with natural nutrients. 50ml.',
    images: [{ url: 'https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジボディミスト' }],
  },
};

function getMvBodyMistProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-body-mist',
    category: 'cosmetic',
    name: isJa ? 'マザベジボディミスト' : 'MV Body Mist',
    fullName: isJa ? 'マザベジボディミスト / 50ml' : 'Mother Vegetable Body Mist / 50ml',
    subtitle: '50ml',
    tagline: isJa ? '天然栄養素配合のリフレッシュボディミスト。' : 'Refreshing body mist with natural nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-body-mist')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-body-mist')?.galleryImages,
    benefits: isJa
      ? [
          'リフレッシュ — 軽やかなシトラスの香りで気分を瞬時にリフレッシュ。日中のリセットに最適。',
          '保湿ケア — グリセリン配合のミストが乾燥した肌にうるおいを補給し、しっとり感をキープ。',
          'ワークアウト後に — 運動後のほてった肌をクールダウン。汗ばむ季節の必須アイテム。',
          '携帯に便利 — コンパクトな50mlサイズ。バッグに入れて旅行・オフィス・外出先でいつでも使えます。',
        ]
      : [
          'Refreshment — Light citrus fragrance instantly refreshes your mood. Perfect for a midday reset.',
          'Hydration — Glycerin-infused mist replenishes moisture to dry skin and keeps it supple.',
          'Post-Workout — Cools down heated skin after exercise. An essential item for sweaty seasons.',
          'Travel-Friendly — Compact 50ml size. Slip it in your bag for travel, the office, or anywhere on the go.',
        ],
    howToUse: isJa
      ? 'リフレッシュ：顔や体から20cm程度離して軽くスプレー。お風呂上がりに：清潔な肌に全身にスプレーしてうるおい補給。日中のケア：乾燥や汗が気になるタイミングで気軽に。ワークアウト後：ほてった肌のクールダウンに。旅行先や外出先でも手軽にリフレッシュできます。'
      : 'Refreshing: Hold about 20cm away from face or body and spray lightly. After bath: Spray over clean skin for full-body hydration. Throughout the day: Use whenever you feel dry or sweaty. Post-workout: Cools down heated skin. Easy to use anytime, anywhere — perfect for travel or on-the-go refreshment.',
    trust: {
      productName: isJa ? 'マザベジボディミスト' : 'MV Body Mist',
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
      subtitle: isJa ? 'マザベジボディミスト' : 'MV Body Mist',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '精製水 92.5g' },
            { label: 'タンパク質', value: '0.1g以下' },
            { label: '食物繊維', value: '0g' },
            { label: '脂質', value: '0g' },
            { label: '水分', value: '92.5g' },
          ]
        : [
            { label: 'Main Component', value: 'Purified Water 92.5g' },
            { label: 'Protein', value: '0.1g or less' },
            { label: 'Dietary Fiber', value: '0g' },
            { label: 'Fat', value: '0g' },
            { label: 'Moisture', value: '92.5g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培由来成分',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・合成香料不使用',
            '抽出工程を最小限にした自然な処方',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Indoor-cultivated ingredients free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or synthetic fragrances',
            'Natural formulation with minimal extraction processes',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: 'リフレッシュ', items: ['気分転換に最適', 'シトラス系の爽やかな香り', '瞬時に気分リセット', '集中力サポート', '空気感をリフレッシュ'] },
            { title: '保湿ケア', items: ['軽やかなうるおい補給', '乾燥肌をしっとり', 'ベタつかない使用感', '肌のキメを整える', 'うるおいベールで保護'] },
            { title: 'ワークアウト後', items: ['ほてった肌をクールダウン', '汗ばむ季節に最適', '運動後の爽快感', 'ジムバッグに最適', 'リカバリーをサポート'] },
            { title: 'トラベル', items: ['機内持ち込みOKサイズ', '旅先でのリフレッシュ', '時差ボケ気分転換に', 'ホテルでのケアに', 'コンパクトで便利'] },
          ]
        : [
            { title: 'Refreshment', items: ['Perfect mood reset', 'Fresh citrus fragrance', 'Instant mood lift', 'Supports focus', 'Refreshes atmosphere'] },
            { title: 'Hydration', items: ['Light moisture boost', 'Soothes dry skin', 'Non-sticky feel', 'Smooths skin texture', 'Protective moisture veil'] },
            { title: 'Post-Workout', items: ['Cools heated skin', 'Ideal for sweaty seasons', 'Refreshing post-exercise', 'Perfect for gym bags', 'Supports recovery'] },
            { title: 'Travel', items: ['Carry-on friendly size', 'On-the-go refreshment', 'Beats jet lag fatigue', 'Hotel-room essential', 'Compact and convenient'] },
          ],
    },
  };
}

export default async function MvBodyMistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvBodyMistProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジボディミスト"
        description="Refreshing body mist with natural nutrients. 50ml."
        image="https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-body-mist"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
