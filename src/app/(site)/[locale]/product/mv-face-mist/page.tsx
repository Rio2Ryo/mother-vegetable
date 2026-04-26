import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジフェイスミスト — Mother Vegetable',
  description: 'Refreshing face mist with natural collagen. 50ml. Instant hydration.',
  openGraph: {
    title: 'マザベジフェイスミスト — Mother Vegetable',
    description: 'Refreshing face mist with natural collagen. 50ml.',
    images: [{ url: 'https://images.unsplash.com/photo-1601066551508-6d9cb1b9de65?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジフェイスミスト' }],
  },
};

function getMvFaceMistProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-face-mist',
    category: 'cosmetic',
    name: isJa ? 'マザベジフェイスミスト' : 'MV Face Mist',
    fullName: isJa ? 'マザベジフェイスミスト / 50ml' : 'Mother Vegetable Face Mist / 50ml',
    subtitle: '50ml',
    tagline: isJa ? '天然コラーゲン配合のフェイスミスト。' : 'Natural collagen face mist for instant hydration.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-face-mist')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1601066551508-6d9cb1b9de65?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-face-mist')?.galleryImages,
    benefits: isJa
      ? [
          '即効うるおい — ヒアルロン酸と天然コラーゲンの微細ミストが、瞬時に肌の奥までうるおいをチャージ。',
          'リフレッシュ感 — 心地よい清涼感で気分もリフレッシュ。仕事や外出先での気分転換にも。',
          'メイクの上から — メイクを崩さずシュッとひと吹き。乾燥が気になる時間帯のうるおい補給に。',
          'トラベル対応 — コンパクトサイズで持ち運びに便利。エアコンや乾燥した飛行機内でも使えます。',
        ]
      : [
          'Instant Hydration — Hyaluronic acid and natural collagen mist deliver instant hydration deep into skin.',
          'Refreshing Feel — Pleasant cooling sensation refreshes your mood during work or while out.',
          'Use Over Makeup — Spray without disturbing makeup for hydration replenishment when dryness is noticeable.',
          'Travel-Friendly — Compact size for easy portability. Use in air conditioning or dry airplane cabins.',
        ],
    howToUse: isJa
      ? '目を閉じ、顔から20cmほど離して2〜3プッシュをスプレーしてください。手のひらでやさしく押さえるように馴染ませます。朝の洗顔後・メイクの仕上げ・日中の乾燥対策・就寝前のうるおい補給など、いつでもお使いいただけます。エアコンの効いたオフィスや旅行先のホテルでも便利。'
      : 'Close your eyes and spray 2-3 pushes from about 20cm away from your face. Gently press into skin with your palms. Use anytime — after morning cleansing, as a makeup finish, for daytime dryness care, or as overnight hydration replenishment. Convenient in air-conditioned offices and travel hotels.',
    trust: {
      productName: isJa ? 'マザベジフェイスミスト' : 'MV Face Mist',
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
      subtitle: isJa ? 'マザベジフェイスミスト' : 'MV Face Mist',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: 'ヒアルロン酸 2%' },
            { label: 'タンパク質', value: '0.3g' },
            { label: '食物繊維', value: '0.1g' },
            { label: '脂質', value: '0.05g' },
            { label: '水分', value: '97g' },
          ]
        : [
            { label: 'Main Component', value: 'Hyaluronic Acid 2%' },
            { label: 'Protein', value: '0.3g' },
            { label: 'Dietary Fiber', value: '0.1g' },
            { label: 'Fat', value: '0.05g' },
            { label: 'Moisture', value: '97g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            'ミネラル・電解質バランス配合',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Complete indoor cultivation free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Balanced minerals and electrolytes',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '保湿ケア', items: ['ヒアルロン酸配合', '即効うるおい', '長時間キープ', '肌の水分バランス', '乾燥小じわをケア'] },
            { title: 'リフレッシュ', items: ['心地よい清涼感', '気分転換に', 'クールダウン効果', '汗ばむ季節に', '気持ちをリセット'] },
            { title: 'メイクキープ', items: ['化粧崩れ防止', 'メイクの上から使える', '化粧直しに便利', 'マスクの蒸れ対策', 'ベースメイクの仕上げ'] },
            { title: '旅行・外出', items: ['コンパクトサイズ', '機内持ち込みOK', 'オフィスの乾燥対策', 'いつでもどこでも', 'バッグに入れて持ち歩き'] },
          ]
        : [
            { title: 'Hydration Care', items: ['Hyaluronic acid blend', 'Instant hydration', 'Long-lasting', 'Skin moisture balance', 'Cares for dry fine lines'] },
            { title: 'Refreshment', items: ['Pleasant cooling feel', 'Mood refresh', 'Cool-down effect', 'For sweaty seasons', 'Reset your mood'] },
            { title: 'Makeup Setting', items: ['Prevents makeup melting', 'Use over makeup', 'Convenient for touch-ups', 'Anti-mask stuffiness', 'Base makeup finish'] },
            { title: 'Travel & Outings', items: ['Compact size', 'Carry-on friendly', 'Office dryness care', 'Anytime, anywhere', 'Carry in your bag'] },
          ],
    },
  };
}

export default async function MvFaceMistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvFaceMistProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジフェイスミスト"
        description="Refreshing face mist with natural collagen. 50ml."
        image="https://images.unsplash.com/photo-1601066551508-6d9cb1b9de65?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-face-mist"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
