import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ石鹸 — Mother Vegetable',
  description: 'Handcrafted green spirulina soap with Confidence collagen. 100g. Deep cleansing with skin care.',
  openGraph: {
    title: 'マザベジ石鹸 — Mother Vegetable',
    description: 'Confidence collagen spirulina soap for deep cleansing and skin healing.',
    images: [{ url: '/cdn/mv_soap.jpg', width: 800, height: 800, alt: 'マザベジ石鹸' }],
  },
};

function getMvSoapProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-soap',
    category: 'cosmetic',
    name: isJa ? 'マザベジ石鹸' : 'MV Soap',
    fullName: isJa ? 'マザベジ石鹸 / 100g' : 'Mother Vegetable Soap / 100g',
    subtitle: '100g',
    tagline: isJa ? 'Confidenceコラーゲン配合の手作り石鹸。' : 'Confidence-powered spirulina soap.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-soap')?.inStock ?? true,
    productImage: '/cdn/mv_soap.jpg',
    benefits: isJa
      ? [
          'やさしい洗浄力 — Confidenceコラーゲンが肌のうるおいを守りながら、汚れと余分な皮脂をしっかり落とします。',
          '極上の泡立ち — きめ細やかで弾力のある泡が肌を包み込み、摩擦を軽減しながら洗い上げます。',
          '顔にもボディにも — 洗顔・ボディウォッシュ・ハンドウォッシュとして全身に使える万能石鹸。',
          '手作りの品質 — 一つひとつ丁寧に手作りされた、スピルリナとコラーゲン配合のプレミアム石鹸。',
        ]
      : [
          'Gentle Cleansing — Confidence collagen protects moisture while thoroughly removing dirt and excess sebum.',
          'Luxurious Lather — Fine, resilient foam envelops skin, reducing friction for a smooth wash.',
          'Face & Body — An all-in-one soap for face wash, body wash, and hand wash.',
          'Handcrafted Quality — Each bar is carefully handmade with premium spirulina and collagen.',
        ],
    howToUse: isJa
      ? '洗顔：ぬるま湯で十分に泡立て、泡で顔を包み込むように優しく洗います。こすらずに泡の力で汚れを浮かせ、ぬるま湯でしっかりすすいでください。ボディ：たっぷりの泡で全身を優しくマッサージ。手洗い：日常の手洗いにもお使いいただけます。'
      : 'Face wash: Lather thoroughly with lukewarm water and gently wash by letting the foam envelop your face. Let the foam lift impurities without rubbing, then rinse well. Body wash: Massage generous foam over the entire body. Hand wash: Also suitable for everyday hand washing.',
    trust: {
      productName: isJa ? 'マザベジ石鹸' : 'MV Soap',
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
      subtitle: isJa ? 'マザベジ石鹸' : 'MV Soap',
      circles: [
        { name: 'Skin Healing', detail: 'Confidence' },
        { name: 'Deep Cleanse', detail: 'Spirulina' },
        { name: 'Anti-Aging', detail: 'Collagen' },
        { name: 'Moisturizing', detail: 'Natural oils' },
        { name: 'Nutrients', detail: '48 types' },
      ],
      benefits: isJa
        ? [
            { title: '普通肌', items: ['毎日のクレンジング', '毛穴をすっきり洗浄', '肌のキメを整える', '洗い上がりしっとり', '皮脂バランスを整える'] },
            { title: '肌トラブル', items: ['肌トラブル改善', 'にきび・炎症を抑制', '肌を落ち着かせる', '余分な皮脂を優しく除去', '敏感肌にも使える低刺激'] },
            { title: '年齢肌', items: ['アンチエイジング洗顔', '肌の弾力を回復', 'シワ・たるみ予防', 'くすみを落とし透明感アップ', 'コラーゲンで洗いながら保湿'] },
            { title: 'ボディケア', items: ['全身の保湿洗浄', '体臭・汗の予防', '肌のツヤアップ', '手荒れを防ぐハンドウォッシュ', '背中・デコルテのケアにも'] },
          ]
        : [
            { title: 'Normal Skin', items: ['Daily cleansing', 'Deep pore cleanse', 'Smooths skin texture', 'Leaves skin soft after wash', 'Balances sebum levels'] },
            { title: 'Skin Trouble', items: ['Skin healing effect', 'Reduces acne & inflammation', 'Calms irritated skin', 'Gently removes excess oil', 'Low-irritation for sensitive skin'] },
            { title: 'Mature Skin', items: ['Anti-aging cleanse', 'Restores elasticity', 'Prevents wrinkles & sagging', 'Removes dullness for radiant skin', 'Collagen moisturizes while cleansing'] },
            { title: 'Body Care', items: ['Moisturizing full-body wash', 'Prevents body odor', 'Adds skin radiance', 'Gentle hand wash prevents dryness', 'Back & decolletage care'] },
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
        image="/cdn/mv_soap.jpg"
        price={13.50}
        slug="mv-soap"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
