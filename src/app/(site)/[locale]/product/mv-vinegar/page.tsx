import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジビネガー — Mother Vegetable',
  description: 'Premium rice vinegar with 48 nutrients. 150ml.',
  openGraph: {
    title: 'マザベジビネガー — Mother Vegetable',
    description: 'Premium nutrient-rich rice vinegar. 150ml.',
    images: [{ url: '/cdn/mv_vinegar_detail.png', width: 800, height: 800, alt: 'マザベジビネガー' }],
  },
};

function getMvVinegarProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-vinegar',
    category: 'food',
    name: isJa ? 'マザベジビネガー' : 'MV Vinegar',
    fullName: isJa ? 'マザベジビネガー / 150ml' : 'Mother Vegetable Vinegar / 150ml',
    subtitle: '150ml',
    tagline: isJa ? '48種の栄養素配合のプレミアムビネガー。' : 'Premium nutrient-rich vinegar with 48 nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-vinegar')?.inStock ?? true,
    productImage: '/cdn/mv_vinegar_detail.png',
    galleryImages: getProductBySlug('mv-vinegar')?.galleryImages,
    benefits: isJa
      ? [
          'まろやか酢酸 — 長期熟成で角の取れた酢酸が、料理を優しく引き締めます。',
          'アミノ酸豊富 — 米麹由来の天然アミノ酸と48種の栄養素が、深い旨味とコクを生み出します。',
          '健康ドリンクにも — 水や炭酸で割るだけで、毎日続けたいヘルシードリンクの完成。',
          '万能調味料 — 寿司酢・ピクルス・マリネ・ドレッシングまで、和洋問わず幅広く活躍。',
        ]
      : [
          'Mellow Acetic Acid — Long-aged acetic acid loses its sharpness and gently sharpens flavor in any dish.',
          'Rich in Amino Acids — Natural amino acids from rice koji combined with 48 nutrients create deep umami and richness.',
          'For Health Drinks — Simply mix with water or sparkling water for a refreshing daily wellness drink.',
          'Versatile Seasoning — Sushi vinegar, pickles, marinades, dressings, and more — Japanese or Western cuisine.',
        ],
    howToUse: isJa
      ? '寿司酢に：砂糖と塩を加えて、本格すし飯に。ドレッシングに：オイルと合わせて自家製ドレッシングに。ピクルス・マリネに：野菜や肉を漬け込み、まろやかな酸味を浸透させて。健康ドリンク：大さじ1杯を水・炭酸水・はちみつ等で割って毎日のリフレッシュに。'
      : 'Sushi vinegar: Add sugar and salt to make authentic sushi rice. Dressing: Combine with oil for a homemade salad dressing. Pickles & marinade: Steep vegetables or meat to infuse mellow acidity. Health drink: Dilute one tablespoon in water, sparkling water, or honey for daily refreshment.',
    trust: {
      productName: isJa ? 'マザベジビネガー' : 'MV Vinegar',
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
      subtitle: isJa ? 'マザベジビネガー' : 'MV Vinegar',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '米酢（酢酸 4.5%）' },
            { label: 'タンパク質', value: '0.3〜0.5g' },
            { label: '食物繊維', value: '0g' },
            { label: '脂質', value: '0g' },
            { label: 'アミノ酸', value: '豊富に含有' },
          ]
        : [
            { label: 'Main Component', value: 'Rice Vinegar (Acetic Acid 4.5%)' },
            { label: 'Protein', value: '0.3~0.5g' },
            { label: 'Dietary Fiber', value: '0g' },
            { label: 'Fat', value: '0g' },
            { label: 'Amino Acids', value: 'Abundantly Included' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培の栄養素を配合',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '長期熟成によるまろやかな味わい',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Enriched with nutrients from contaminant-free indoor cultivation',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Mellow flavor from long aging',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '日々の健康', items: ['酢酸で代謝サポート', 'アミノ酸補給', '疲労回復をサポート', '栄養素配合', '毎日続けやすい'] },
            { title: '美容・ダイエット', items: ['代謝を整える', 'むくみケアサポート', '腸内環境ケア', '低カロリー', '健康的な食生活に'] },
            { title: '料理を引き立てる', items: ['素材の旨味を引き出す', 'まろやかな酸味', '減塩のサポート', '色鮮やかに仕上げる', '保存性アップ'] },
            { title: '幅広い使い方', items: ['寿司酢ベース', 'ピクルス・マリネ', '自家製ドレッシング', '健康ドリンクに', '中華・洋食にも'] },
          ]
        : [
            { title: 'Daily Wellness', items: ['Acetic acid supports metabolism', 'Amino acid replenishment', 'Supports fatigue recovery', 'Nutrient-infused', 'Easy to keep up daily'] },
            { title: 'Beauty & Diet', items: ['Balances metabolism', 'Supports anti-puffiness care', 'Care for gut environment', 'Low calorie', 'For healthy eating habits'] },
            { title: 'Enhances Cooking', items: ['Brings out ingredient umami', 'Mellow acidity', 'Supports salt reduction', 'Brightens colors', 'Improves preservation'] },
            { title: 'Versatile Uses', items: ['Sushi vinegar base', 'Pickles & marinade', 'Homemade dressing', 'For health drinks', 'Chinese & Western cuisine'] },
          ],
    },
  };
}

export default async function MvVinegarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvVinegarProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジビネガー"
        description="Premium rice vinegar with 48 nutrients. 150ml."
        image="/cdn/mv_vinegar_detail.png"
        price={13.50}
        slug="mv-vinegar"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
