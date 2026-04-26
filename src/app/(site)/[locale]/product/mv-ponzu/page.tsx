import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジポン酢 — Mother Vegetable',
  description: 'Citrus ponzu sauce with 48 nutrients. 150ml.',
  openGraph: {
    title: 'マザベジポン酢 — Mother Vegetable',
    description: 'Premium nutrient-rich citrus ponzu sauce. 150ml.',
    images: [{ url: 'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジポン酢' }],
  },
};

function getMvPonzuProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-ponzu',
    category: 'food',
    name: isJa ? 'マザベジポン酢' : 'MV Ponzu',
    fullName: isJa ? 'マザベジポン酢 / 150ml' : 'Mother Vegetable Ponzu / 150ml',
    subtitle: '150ml',
    tagline: isJa ? '48種の栄養素配合の柑橘香るポン酢。' : 'Citrus-fragrant ponzu sauce with 48 nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-ponzu')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-ponzu')?.galleryImages,
    benefits: isJa
      ? [
          '柑橘の香り — 厳選した柑橘果汁の爽やかな酸味と香りが、料理を爽やかに引き締めます。',
          '本格出汁仕立て — 鰹・昆布の旨味をベースに、48種の栄養素を融合した深い味わい。',
          '減塩志向 — まろやかな酸味で塩分を抑えつつ、しっかりとした満足感のある味わい。',
          '万能調味料 — 鍋・サラダ・焼き魚・冷奴など、和洋中問わずあらゆる料理に活躍。',
        ]
      : [
          'Citrus Aroma — Refreshing acidity and aroma from carefully selected citrus juice brighten any dish.',
          'Authentic Dashi Base — Bonito and kombu umami fused with 48 nutrients for deep, layered flavor.',
          'Lower Sodium — Mellow acidity reduces salt while keeping a deeply satisfying taste.',
          'All-Purpose Seasoning — Works with hot pots, salads, grilled fish, cold tofu, and Japanese, Western, or Chinese cuisine.',
        ],
    howToUse: isJa
      ? '鍋料理に：水炊き・しゃぶしゃぶの定番つけダレに。焼き魚・グリルに：焼き魚や肉のグリルにかけてさっぱりと。サラダドレッシングに：オリーブオイルと合わせて和風ドレッシングに。冷奴・お刺身に：そのままかけて素材の味を引き立てます。'
      : 'Hot pots: Classic dipping sauce for mizutaki and shabu-shabu. Grilled fish & meat: Drizzle over grilled fish or meat for a refreshing finish. Salad dressing: Mix with olive oil for a Japanese-style dressing. Cold tofu & sashimi: Pour directly to highlight the natural flavor.',
    trust: {
      productName: isJa ? 'マザベジポン酢' : 'MV Ponzu',
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
      subtitle: isJa ? 'マザベジポン酢' : 'MV Ponzu',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '柑橘果汁・醤油・出汁' },
            { label: 'タンパク質', value: '3.5〜4.0g' },
            { label: '食物繊維', value: '0.2g' },
            { label: '脂質', value: '0.1g以下' },
            { label: '塩分相当量', value: '7.5g' },
          ]
        : [
            { label: 'Main Component', value: 'Citrus Juice / Soy Sauce / Dashi' },
            { label: 'Protein', value: '3.5~4.0g' },
            { label: 'Dietary Fiber', value: '0.2g' },
            { label: 'Fat', value: '0.1g or less' },
            { label: 'Salt Equivalent', value: '7.5g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培の栄養素を配合',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '本格出汁と柑橘果汁を贅沢にブレンド',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Enriched with nutrients from contaminant-free indoor cultivation',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Generously blends authentic dashi and citrus juice',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '子ども', items: ['野菜が食べやすくなる', 'さっぱり味で食欲増進', '栄養素配合で健康サポート', '柑橘の香りで食卓を楽しく', 'まろやかな酸味'] },
            { title: '成人', items: ['毎日の食事に栄養プラス', '減塩サポート', '代謝を整える', '夏バテ予防にも', 'さっぱり食欲増進'] },
            { title: '高齢者', items: ['さっぱり食べやすい', '食欲を引き出す', '減塩に貢献', '消化を助ける', '栄養素を手軽に補給'] },
            { title: '幅広い使い方', items: ['鍋料理のつけダレ', '焼き魚・グリル料理に', 'サラダドレッシング', '冷奴・お刺身に', 'マリネ・和え物に'] },
          ]
        : [
            { title: 'Children', items: ['Makes vegetables easier to eat', 'Refreshing taste boosts appetite', 'Supports health with 48 nutrients', 'Citrus aroma enlivens meals', 'Mellow acidity'] },
            { title: 'Adults', items: ['Adds nutrition to daily meals', 'Supports salt reduction', 'Balances metabolism', 'Helps fight summer fatigue', 'Refreshes appetite'] },
            { title: 'Seniors', items: ['Refreshing & easy to eat', 'Encourages appetite', 'Supports lower sodium intake', 'Aids digestion', 'Easy nutrient replenishment'] },
            { title: 'Versatile Uses', items: ['Hot pot dipping sauce', 'Grilled fish & meat', 'Salad dressing', 'Cold tofu & sashimi', 'Marinades & ae-mono'] },
          ],
    },
  };
}

export default async function MvPonzuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvPonzuProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジポン酢"
        description="Citrus ponzu sauce with 48 nutrients. 150ml."
        image="https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-ponzu"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
