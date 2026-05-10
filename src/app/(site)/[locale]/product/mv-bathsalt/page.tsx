import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジバスソルト — Mother Vegetable',
  description: 'Mineral-rich bath salt with 48 nutrients. 200g. Relaxing bath experience with essential oils.',
  openGraph: {
    title: 'マザベジバスソルト — Mother Vegetable',
    description: 'Mineral-rich relaxing bath salt. 200g.',
    images: [{ url: '/Images/Assets/General/og-logo.png', width: 1200, height: 630, alt: 'Mother Vegetable' }],
  },
};

function getMvBathSaltProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-bathsalt',
    category: 'cosmetic',
    name: isJa ? 'マザベジバスソルト' : 'MV Bath Salt',
    fullName: isJa ? 'マザベジバスソルト / 200g' : 'Mother Vegetable Bath Salt / 200g',
    subtitle: '200g',
    tagline: isJa ? '48種の栄養素配合のミネラルバスソルト。' : 'Mineral-rich bath salt with 48 nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-bathsalt')?.inStock ?? true,
    productImage: '/cdn/mv_bathsalt_detail.png',
    galleryImages: getProductBySlug('mv-bathsalt')?.galleryImages,
    benefits: isJa
      ? [
          'リラクゼーション — 48種の栄養素とエプソムソルトが、一日の疲れを心身ともにほぐすバスタイムを演出。',
          '筋肉のケア — マグネシウム豊富なエプソムソルトが運動後のだるさや張りをケア。',
          '肌をやわらかく — ミネラル成分が肌をやさしくケアし、しっとりやわらかな仕上がりに。',
          'アロマセラピー — 厳選した天然エッセンシャルオイル配合で、香りに包まれる癒しのひと時を。',
        ]
      : [
          'Relaxation — 48 nutrients and Epsom salt create a bath that releases the day\'s tension from body and mind.',
          'Muscle Relief — Magnesium-rich Epsom salt cares for post-workout fatigue and tightness.',
          'Skin Softening — Mineral ingredients gently care for skin, leaving it soft and supple.',
          'Aromatherapy — Carefully selected natural essential oils envelop you in healing fragrance.',
        ],
    howToUse: isJa
      ? '入浴時：浴槽のお湯（150〜200L）に大さじ2〜3杯（約30〜50g）を入れ、よくかき混ぜてから入浴。15〜20分ゆっくり浸かるのがおすすめ。リフレッシュ：足湯にも使えます（小さじ1〜2杯）。スペシャルケア：運動後や週末のリラックスタイムに。残り湯は洗濯にはご使用いただけません。'
      : 'For bathing: Add 2-3 tablespoons (about 30-50g) to a bathtub (150-200L), stir well, and soak. A 15-20 minute soak is recommended. Refreshing: Can also be used for foot baths (1-2 teaspoons). Special care: Perfect after exercise or for weekend relaxation. Note: leftover bathwater should not be used for laundry.',
    trust: {
      productName: isJa ? 'マザベジバスソルト' : 'MV Bath Salt',
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
      subtitle: isJa ? 'マザベジバスソルト' : 'MV Bath Salt',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: 'エプソムソルト 180g' },
            { label: 'タンパク質', value: '0g' },
            { label: '食物繊維', value: '0g' },
            { label: '脂質', value: 'エッセンシャルオイル 0.5g' },
            { label: '水分', value: '0.5g以下' },
          ]
        : [
            { label: 'Main Component', value: 'Epsom Salt 180g' },
            { label: 'Protein', value: '0g' },
            { label: 'Dietary Fiber', value: '0g' },
            { label: 'Fat', value: 'Essential Oils 0.5g' },
            { label: 'Moisture', value: '0.5g or less' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培由来成分',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・合成香料不使用',
            '天然エッセンシャルオイルのみ使用',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Indoor-cultivated ingredients free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or synthetic fragrances',
            'Uses only natural essential oils',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: 'リラクゼーション', items: ['一日の疲れをリセット', '心身ともにほぐす', '深いリラックス感', '質の高い睡眠サポート', 'ストレス解消'] },
            { title: '筋肉ケア', items: ['運動後のケア', 'マグネシウム配合', '張りをほぐす', 'スポーツ後の必須アイテム', '疲労回復をサポート'] },
            { title: '肌をやわらかく', items: ['ミネラルでうるおい補給', '肌をしっとりやわらかく', 'キメを整える', '乾燥した肌をケア', 'すべすべな肌へ'] },
            { title: 'アロマセラピー', items: ['天然エッセンシャルオイル', '癒しの香り', '気分転換に最適', 'バスタイムを格上げ', '心地よい香りに包まれる'] },
          ]
        : [
            { title: 'Relaxation', items: ['Resets the day\'s fatigue', 'Soothes body and mind', 'Deep relaxation', 'Supports quality sleep', 'Relieves stress'] },
            { title: 'Muscle Relief', items: ['Post-workout care', 'Magnesium-rich formula', 'Eases tightness', 'Essential after sports', 'Supports recovery'] },
            { title: 'Skin Softening', items: ['Mineral hydration', 'Soft and supple skin', 'Smooths skin texture', 'Cares for dry skin', 'Silky-smooth finish'] },
            { title: 'Aromatherapy', items: ['Natural essential oils', 'Healing fragrance', 'Perfect mood lift', 'Elevates bath time', 'Wrapped in comforting scent'] },
          ],
    },
  };
}

export default async function MvBathSaltPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvBathSaltProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジバスソルト"
        description="Mineral-rich bath salt with 48 nutrients. 200g."
        image="/cdn/mv_bathsalt_detail.png"
        price={13.50}
        slug="mv-bathsalt"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
