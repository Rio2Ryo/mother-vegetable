import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ生姜茶 — Mother Vegetable',
  description: 'Warming ginger tea blended with Mother Vegetable nutrients. 30g.',
  openGraph: {
    title: 'マザベジ生姜茶 — Mother Vegetable',
    description: 'Nutrient-rich warming ginger tea. 30g.',
    images: [{ url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジ生姜茶' }],
  },
};

function getMvGingerTeaProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-ginger-tea',
    category: 'food',
    name: isJa ? 'マザベジ生姜茶' : 'MV Ginger Tea',
    fullName: isJa ? 'マザベジ生姜茶 / 30g' : 'Mother Vegetable Ginger Tea / 30g',
    subtitle: '30g',
    tagline: isJa ? '体を温めるマザベジ栄養素ブレンドの生姜茶。' : 'Warming ginger tea blended with Mother Vegetable nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-ginger-tea')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-ginger-tea')?.galleryImages,
    benefits: isJa
      ? [
          'ぽかぽか温活 — ジンゲロール・ショウガオールが体の内側からじんわり温め、冷えやすい季節の毎日をサポート。',
          'すっきり後味 — 生姜のピリッとした辛味と爽やかな香りで、食後のリセットや気分転換に。',
          '48種の栄養素配合 — マザベジ独自ブレンドで、ビタミン・ミネラルをバランスよく補給。',
          'ノンカフェイン処方 — カフェインに敏感な方や就寝前のリラックスタイムにも安心。',
        ]
      : [
          'Warming Comfort — Gingerol and shogaol gently warm you from the inside, perfect for cooler days.',
          'Crisp Finish — Ginger’s spicy kick and fresh aroma offer a refreshing post-meal reset.',
          '48 Nutrients Blended — Mother Vegetable’s proprietary blend supplies balanced vitamins and minerals.',
          'Caffeine-Free — Gentle for those sensitive to caffeine and for evening wind-down.',
        ],
    howToUse: isJa
      ? 'お湯に溶かす：カップにティースプーン1杯（約3g）を入れ、お湯150〜200mlを注いでよく混ぜます。お好みでハチミツやレモンを加えて。冷たく：水や炭酸水で割ってジンジャースカッシュに。料理に：煮込み料理や炒め物の隠し味として、生姜の風味と栄養素をプラス。'
      : 'Hot drink: Place 1 teaspoon (about 3g) in a cup, add 150–200ml of hot water, and stir well. Add honey or lemon to taste. Cold drink: Mix with cold water or sparkling water for a ginger fizz. Cooking: Use as a secret-ingredient flavor boost in stews and stir-fries.',
    trust: {
      productName: isJa ? 'マザベジ生姜茶' : 'MV Ginger Tea',
      certification: isJa ? '食品衛生法に基づく品質管理' : 'Quality controlled under the Food Sanitation Act of Japan',
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
      subtitle: isJa ? 'マザベジ生姜茶' : 'MV Ginger Tea',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '88.5g' },
            { label: 'タンパク質', value: '8.4〜9.2g' },
            { label: '食物繊維', value: '14.1g' },
            { label: '脂質', value: '4.2g' },
            { label: '水分', value: '9.4g' },
          ]
        : [
            { label: 'Main Component', value: '88.5g' },
            { label: 'Protein', value: '8.4~9.2g' },
            { label: 'Dietary Fiber', value: '14.1g' },
            { label: 'Fat', value: '4.2g' },
            { label: 'Moisture', value: '9.4g' },
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
            { title: '温活サポート', items: ['体を内側から温める', '冷えやすい季節に', '朝の目覚めの一杯に', '就寝前のリラックスに', '冬のお供に'] },
            { title: '健康サポート', items: ['ジンゲロール配合', 'ショウガオール配合', 'ビタミン補給', 'ミネラル補給', '毎日の栄養補助'] },
            { title: 'リフレッシュ', items: ['爽やかな香り', '気分転換に', 'すっきりとした後味', '食後のリセットに', '集中したい時に'] },
            { title: 'アレンジ', items: ['ハチミツを加えて', 'レモンを添えて', '炭酸水で割って', '料理の隠し味に', 'チャイ風アレンジに'] },
          ]
        : [
            { title: 'Warming Care', items: ['Warms from within', 'For cool seasons', 'Morning starter cup', 'Evening relaxation', 'Winter companion'] },
            { title: 'Health Support', items: ['Contains gingerol', 'Contains shogaol', 'Vitamin replenishment', 'Mineral replenishment', 'Daily nutrition support'] },
            { title: 'Refreshment', items: ['Fresh aroma', 'Mood lift', 'Crisp finish', 'Post-meal reset', 'Boost focus'] },
            { title: 'Variations', items: ['Add honey', 'Add lemon', 'Mix with sparkling water', 'Use as cooking accent', 'Make a chai-style drink'] },
          ],
    },
  };
}

export default async function MvGingerTeaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvGingerTeaProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ生姜茶"
        description="Warming ginger tea blended with Mother Vegetable nutrients. 30g."
        image="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-ginger-tea"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
