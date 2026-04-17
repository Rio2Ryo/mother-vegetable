import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ石鹸 — Mother Vegetable',
  description: 'Handcrafted green nutrient-rich soap with natural collagen. 100g.',
  openGraph: {
    title: 'マザベジ石鹸 — Mother Vegetable',
    description: 'Natural collagen handcrafted soap. 100g.',
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
    tagline: isJa ? '天然コラーゲン配合の手作り石鹸。' : 'Premium natural collagen soap.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-soap')?.inStock ?? true,
    productImage: '/cdn/mv_soap.jpg',
    galleryImages: getProductBySlug('mv-soap')?.galleryImages,
    benefits: isJa
      ? [
          'やさしい洗浄力 — 天然コラーゲンが肌のうるおいを守りながら、汚れと余分な皮脂をしっかり落とします。',
          '極上の泡立ち — きめ細やかで弾力のある泡が肌を包み込み、摩擦を軽減しながら洗い上げます。',
          '顔にもボディにも — 洗顔・ボディウォッシュ・ハンドウォッシュとして全身に使える万能石鹸。',
          '手作りの品質 — 一つひとつ丁寧に手作りされた、48種の栄養素とコラーゲン配合のプレミアム石鹸。',
        ]
      : [
          'Gentle Cleansing — Natural collagen protects moisture while thoroughly removing dirt and excess sebum.',
          'Luxurious Lather — Fine, resilient foam envelops skin, reducing friction for a smooth wash.',
          'Face & Body — An all-in-one soap for face wash, body wash, and hand wash.',
          'Handcrafted Quality — Each bar is carefully handmade with premium plant-based nutrients and collagen.',
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
            { title: '普通肌', items: ['毎日のクレンジング', '毛穴をすっきり洗浄', '肌のキメを整える', '洗い上がりしっとり', '皮脂バランスを整える'] },
            { title: '敏感肌', items: ['肌をやさしくケア', '肌を落ち着かせる', '余分な皮脂を優しく除去', '敏感肌にも使える低刺激', '毎日使えるやさしさ'] },
            { title: 'すこやか肌', items: ['肌をすこやかに洗う', '肌にハリを与える', '透明感のある肌へ', 'コラーゲン配合で洗いながらうるおう', '毎日のケアに'] },
            { title: 'ボディケア', items: ['全身のうるおい洗浄', '清潔感をキープ', '肌のツヤをサポート', '手肌をやさしく洗うハンドウォッシュ', '背中・デコルテのケアにも'] },
          ]
        : [
            { title: 'Normal Skin', items: ['Daily cleansing', 'Deep pore cleanse', 'Smooths skin texture', 'Leaves skin soft after wash', 'Balances sebum levels'] },
            { title: 'Sensitive Skin', items: ['Gentle skin care', 'Calms skin', 'Gently removes excess oil', 'Low-irritation for sensitive skin', 'Gentle enough for daily use'] },
            { title: 'Healthy Skin', items: ['Cleanses for healthy skin', 'Adds firmness to skin', 'For radiant-looking skin', 'Collagen moisturizes while cleansing', 'For daily care'] },
            { title: 'Body Care', items: ['Moisturizing full-body wash', 'Keeps you feeling fresh', 'Supports skin radiance', 'Gentle hand wash for soft hands', 'Back & decolletage care'] },
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
        description="Handcrafted green nutrient-rich soap with natural collagen. 100g."
        image="/cdn/mv_soap.jpg"
        price={13.50}
        slug="mv-soap"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
