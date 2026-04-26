import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジハンドクリーム — Mother Vegetable',
  description: 'Moisturizing hand cream with natural collagen. 30g. Soft and supple hands.',
  openGraph: {
    title: 'マザベジハンドクリーム — Mother Vegetable',
    description: 'Moisturizing hand cream with natural collagen. 30g.',
    images: [{ url: 'https://images.unsplash.com/photo-1741896136021-ae070f0b6f24?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジハンドクリーム' }],
  },
};

function getMvHandcreamProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-handcream',
    category: 'cosmetic',
    name: isJa ? 'マザベジハンドクリーム' : 'MV Hand Cream',
    fullName: isJa ? 'マザベジハンドクリーム / 30g' : 'Mother Vegetable Hand Cream / 30g',
    subtitle: '30g',
    tagline: isJa ? '天然コラーゲン配合のハンドクリーム。' : 'Natural collagen hand cream.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-handcream')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1741896136021-ae070f0b6f24?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-handcream')?.galleryImages,
    benefits: isJa
      ? [
          '深部保湿 — シアバターとセラミドが手肌の奥までうるおいを届け、しっとりやわらかな手に。',
          'キューティクルケア — 指先や爪まわりの乾燥をケアし、健やかな指先をサポート。',
          'エイジングケア — 天然コラーゲンが手肌のハリと弾力を保ち、年齢を感じさせない手元へ。',
          '速攻浸透 — ベタつかずスッと馴染む処方で、塗った直後からスマホやキーボード操作も快適。',
        ]
      : [
          'Deep Moisturizing — Shea butter and ceramides deliver hydration deep into the skin for soft, supple hands.',
          'Cuticle Care — Cares for dryness around fingertips and nails to support healthy-looking nails.',
          'Anti-Aging Care — Natural collagen helps maintain firmness and elasticity for youthful-looking hands.',
          'Fast Absorption — Non-greasy formula absorbs quickly, so you can use phones and keyboards comfortably right after application.',
        ],
    howToUse: isJa
      ? '適量を手の甲に取り、両手で優しく馴染ませます。指先・爪まわり・指の関節など、乾燥が気になる部分には重ね付けがおすすめ。手洗い後や水仕事の後、就寝前のナイトケアとしてお使いください。デスクワーク中の乾燥対策にも便利です。'
      : 'Take an appropriate amount on the back of your hand and gently massage with both hands. Layer on fingertips, around nails, and finger joints where dryness is noticeable. Use after washing hands, after housework, or as overnight night-care before sleep. Also convenient for dryness during desk work.',
    trust: {
      productName: isJa ? 'マザベジハンドクリーム' : 'MV Hand Cream',
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
      subtitle: isJa ? 'マザベジハンドクリーム' : 'MV Hand Cream',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: 'シアバター 15%' },
            { label: 'タンパク質', value: '0.5g' },
            { label: '食物繊維', value: '0.2g' },
            { label: '脂質', value: '18g' },
            { label: '水分', value: '78g' },
          ]
        : [
            { label: 'Main Component', value: 'Shea Butter 15%' },
            { label: 'Protein', value: '0.5g' },
            { label: 'Dietary Fiber', value: '0.2g' },
            { label: 'Fat', value: '18g' },
            { label: 'Moisture', value: '78g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            'グリセリン・セラミド・天然コラーゲン配合',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Complete indoor cultivation free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Glycerin, ceramide, and natural collagen blend',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '乾燥した手肌', items: ['深部までしっとり', '荒れた手をケア', 'バリア機能サポート', '長時間の保湿', '手洗い後のケアに最適'] },
            { title: 'キューティクル', items: ['指先の乾燥ケア', '爪まわりを保護', 'ささくれをケア', '健やかな指先へ', 'ネイルケアの仕上げに'] },
            { title: 'エイジングケア', items: ['ハリのある手元へ', '弾力をサポート', '若々しい印象', 'コラーゲン配合', '手元の年齢サインをケア'] },
            { title: '毎日のケア', items: ['ベタつかない使用感', '手早く馴染む', 'スマホ操作も快適', '香り控えめ', 'いつでもどこでも使える'] },
          ]
        : [
            { title: 'Dry Hands', items: ['Deep moisturizing', 'Cares for rough hands', 'Supports skin barrier', 'Long-lasting hydration', 'Ideal after washing hands'] },
            { title: 'Cuticles', items: ['Cares for fingertip dryness', 'Protects around nails', 'Cares for hangnails', 'For healthy fingertips', 'Perfect manicure finish'] },
            { title: 'Anti-Aging Care', items: ['For firmer hands', 'Supports elasticity', 'Youthful impression', 'Collagen-infused', 'Cares for age signs on hands'] },
            { title: 'Daily Care', items: ['Non-greasy feel', 'Quick absorption', 'Comfortable for phone use', 'Subtle fragrance', 'Use anytime, anywhere'] },
          ],
    },
  };
}

export default async function MvHandcreamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvHandcreamProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジハンドクリーム"
        description="Moisturizing hand cream with natural collagen. 30g."
        image="https://images.unsplash.com/photo-1741896136021-ae070f0b6f24?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-handcream"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
