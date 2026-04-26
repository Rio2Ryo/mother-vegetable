import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジオリーブオイル — Mother Vegetable',
  description: 'Extra virgin olive oil infused with Mother Vegetable nutrients. 100ml.',
  openGraph: {
    title: 'マザベジオリーブオイル — Mother Vegetable',
    description: 'Premium extra virgin olive oil with 48 nutrients. 100ml.',
    images: [{ url: '/cdn/mv_olive_detail.png', width: 800, height: 800, alt: 'マザベジオリーブオイル' }],
  },
};

function getMvOliveProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-olive',
    category: 'food',
    name: isJa ? 'マザベジオリーブオイル' : 'MV Olive Oil',
    fullName: isJa ? 'マザベジオリーブオイル / 100ml' : 'Mother Vegetable Olive Oil / 100ml',
    subtitle: '100ml',
    tagline: isJa ? '48種の栄養素配合のエクストラバージンオリーブオイル。' : 'Premium extra virgin olive oil with 48 nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-olive')?.inStock ?? true,
    productImage: '/cdn/mv_olive_detail.png',
    galleryImages: getProductBySlug('mv-olive')?.galleryImages,
    benefits: isJa
      ? [
          'エクストラバージン — 一番搾りの上質なオリーブオイルに、48種の栄養素を加えた贅沢な逸品。',
          'オレイン酸豊富 — 健康をサポートする良質な不飽和脂肪酸とビタミンEをバランスよく含有。',
          '万能調理油 — サラダのドレッシング、パン付け、加熱調理まで、あらゆる料理に活躍。',
          '香り高い風味 — フルーティーで芳醇な香りが料理の味わいをワンランク引き上げます。',
        ]
      : [
          'Extra Virgin — Top-grade first-press olive oil enriched with 48 essential nutrients.',
          'Rich in Oleic Acid — Balanced healthy unsaturated fatty acids and vitamin E to support wellbeing.',
          'Versatile Cooking Oil — Perfect for dressings, dipping bread, and everyday hot cooking.',
          'Aromatic Flavor — A fruity, full-bodied aroma that elevates the taste of every dish.',
        ],
    howToUse: isJa
      ? 'サラダに：そのまま回しかけて素材の味を引き立てます。パン付け：バゲットや天然酵母パンに塩と一緒に。加熱調理：パスタ・炒め物・グリルに。仕上げに：スープやカルパッチョの香りづけにひとたらし。'
      : 'On salads: Drizzle directly to enhance the natural flavor of fresh ingredients. Bread dipping: Pair with baguette or sourdough and a pinch of salt. Hot cooking: Use for pasta, sautes, and grilling. Finishing: Add a drizzle to soups or carpaccio for fragrance.',
    trust: {
      productName: isJa ? 'マザベジオリーブオイル' : 'MV Olive Oil',
      certification: isJa ? '厚生労働省によりヒューマングレード食品認定' : 'certified human grade food by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
      subtitle: isJa ? 'マザベジオリーブオイル' : 'MV Olive Oil',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: 'オリーブ油 99g' },
            { label: 'タンパク質', value: '0g' },
            { label: '食物繊維', value: '0g' },
            { label: '脂質', value: '99g（オレイン酸 73g）' },
            { label: '水分', value: '0.1g以下' },
          ]
        : [
            { label: 'Main Component', value: 'Olive Oil 99g' },
            { label: 'Protein', value: '0g' },
            { label: 'Dietary Fiber', value: '0g' },
            { label: 'Fat', value: '99g (Oleic Acid 73g)' },
            { label: 'Moisture', value: '0.1g or less' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培の栄養素を配合',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '低温圧搾（コールドプレス）製法',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Enriched with nutrients from contaminant-free indoor cultivation',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Cold-press extraction method',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '日々の健康', items: ['オレイン酸で健康サポート', 'ビタミンE配合', '抗酸化成分', '良質な脂質補給', '毎日の食事に活力を'] },
            { title: '料理を引き立てる', items: ['素材の味を引き出す', 'フルーティーな香り', '料理の風味アップ', '加熱調理にも対応', '冷製料理にも最適'] },
            { title: '美容・エイジングケア', items: ['ビタミンEで美容サポート', '抗酸化作用', '良質な脂質補給', 'ハリのある毎日に', '内側から整える'] },
            { title: '幅広い使い方', items: ['サラダドレッシング', 'パン付けオイル', 'パスタ・炒め物', '仕上げの香り付け', '低温調理にも最適'] },
          ]
        : [
            { title: 'Daily Wellness', items: ['Oleic acid supports wellness', 'Vitamin E infused', 'Antioxidant components', 'Quality fats replenishment', 'Energizes daily meals'] },
            { title: 'Enhances Cooking', items: ['Brings out ingredient flavor', 'Fruity aroma', 'Boosts dish character', 'Suitable for hot cooking', 'Ideal for cold dishes too'] },
            { title: 'Beauty & Aging Care', items: ['Vitamin E supports beauty', 'Antioxidant action', 'Quality fats replenishment', 'For a vibrant everyday', 'Restores from within'] },
            { title: 'Versatile Uses', items: ['Salad dressing', 'Bread-dipping oil', 'Pasta & sauteing', 'Finishing aroma', 'Ideal for low-heat cooking'] },
          ],
    },
  };
}

export default async function MvOlivePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvOliveProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジオリーブオイル"
        description="Extra virgin olive oil infused with Mother Vegetable nutrients. 100ml."
        image="/cdn/mv_olive_detail.png"
        price={13.50}
        slug="mv-olive"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
