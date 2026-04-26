import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジヘアオイル — Mother Vegetable',
  description: 'Natural hair oil with plant-based nutrients. 30ml. Keeps hair smooth and nourished.',
  openGraph: {
    title: 'マザベジヘアオイル — Mother Vegetable',
    description: 'Natural nourishing hair oil. 30ml.',
    images: [{ url: '/cdn/mv_hair_oil_detail.png', width: 800, height: 800, alt: 'マザベジヘアオイル' }],
  },
};

function getMvHairOilProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-hair-oil',
    category: 'cosmetic',
    name: isJa ? 'マザベジヘアオイル' : 'MV Hair Oil',
    fullName: isJa ? 'マザベジヘアオイル / 30ml' : 'Mother Vegetable Hair Oil / 30ml',
    subtitle: '30ml',
    tagline: isJa ? '天然植物由来成分配合の高保湿ヘアオイル。' : 'Nourishing hair oil with plant-based nutrients.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-hair-oil')?.inStock ?? true,
    productImage: '/cdn/mv_hair_oil_detail.png',
    galleryImages: getProductBySlug('mv-hair-oil')?.galleryImages,
    benefits: isJa
      ? [
          '乾燥髪のレスキュー — アルガンオイルとホホバオイルが髪一本一本に深く浸透し、パサつきや枝毛をケア。',
          'ヒートプロテクト — ドライヤーやヘアアイロンの熱から髪を守り、ダメージを最小限に抑えます。',
          '頭皮ケア — 軽いテクスチャーで頭皮にもなじみ、すこやかな頭皮環境をサポート。',
          'スタイリング — まとまりのある自然なツヤを与え、洗練された仕上がりに。シルクプロテイン配合。',
        ]
      : [
          'Dry Hair Rescue — Argan and jojoba oils deeply penetrate each strand, caring for dryness and split ends.',
          'Heat Protection — Shields hair from blow-dryer and flat-iron heat, minimizing damage.',
          'Scalp Care — Light texture absorbs into the scalp, supporting a healthy scalp environment.',
          'Styling — Adds natural shine and manageability for a polished finish. Infused with silk protein.',
        ],
    howToUse: isJa
      ? 'タオルドライ後：濡れた髪に1〜2滴を毛先中心になじませてからドライヤーでブロー。仕上げに：乾いた髪に少量を毛先になじませてツヤとまとまりをプラス。ヘアアイロン前：熱から髪を守るため、スタイリング前に薄くなじませます。頭皮ケア：指の腹で頭皮にもやさしくマッサージ。週1回のスペシャルケアにもおすすめ。'
      : 'After towel-drying: Apply 1-2 drops mainly to the ends of damp hair, then blow-dry. Finishing: Use a small amount on dry hair to add shine and smoothness. Before heat styling: Apply lightly to protect from heat damage. Scalp care: Gently massage into the scalp with fingertips. Also recommended as a weekly special-care treatment.',
    trust: {
      productName: isJa ? 'マザベジヘアオイル' : 'MV Hair Oil',
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
      subtitle: isJa ? 'マザベジヘアオイル' : 'MV Hair Oil',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: 'アルガンオイル 45.2g' },
            { label: 'タンパク質', value: 'シルクプロテイン 1.8g' },
            { label: '食物繊維', value: '0g' },
            { label: '脂質', value: 'ホホバオイル 38.5g' },
            { label: '水分', value: '0.2g以下' },
          ]
        : [
            { label: 'Main Component', value: 'Argan Oil 45.2g' },
            { label: 'Protein', value: 'Silk Protein 1.8g' },
            { label: 'Dietary Fiber', value: '0g' },
            { label: 'Fat', value: 'Jojoba Oil 38.5g' },
            { label: 'Moisture', value: '0.2g or less' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培由来オイル',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・合成香料不使用',
            'コールドプレス製法で栄養を保持',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Indoor-cultivated oils free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or synthetic fragrances',
            'Cold-pressed extraction preserves nutrients',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '乾燥髪ケア', items: ['毛先までうるおい補給', 'パサつきをケア', '枝切れ・枝毛をケア', '指通りなめらかに', '長時間の保湿'] },
            { title: 'ヒートプロテクト', items: ['ドライヤーの熱から保護', 'ヘアアイロン使用前に', 'カラー後の髪をケア', 'ダメージを最小限に', '熱変性をケア'] },
            { title: '頭皮ケア', items: ['頭皮環境を整える', 'マッサージで血行サポート', '乾燥した頭皮にうるおい', 'すこやかな頭皮へ', '健やかな髪を育む土台に'] },
            { title: 'スタイリング', items: ['自然なツヤをプラス', 'まとまりのある仕上がり', 'アホ毛をケア', '軽い使用感', 'スタイルキープをサポート'] },
          ]
        : [
            { title: 'Dry Hair Care', items: ['Hydration to the ends', 'Cares for dryness', 'Cares for split ends', 'Smooth finger-combing', 'Long-lasting moisture'] },
            { title: 'Heat Protection', items: ['Protects from blow-dryer heat', 'Use before flat iron', 'Cares for color-treated hair', 'Minimizes damage', 'Cares for heat denaturation'] },
            { title: 'Scalp Care', items: ['Balances scalp environment', 'Massage supports circulation', 'Hydrates dry scalp', 'Promotes healthy scalp', 'Foundation for healthy hair'] },
            { title: 'Styling', items: ['Adds natural shine', 'Manageable finish', 'Tames flyaways', 'Lightweight feel', 'Supports style retention'] },
          ],
    },
  };
}

export default async function MvHairOilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvHairOilProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジヘアオイル"
        description="Natural hair oil with plant-based nutrients. 30ml."
        image="/cdn/mv_hair_oil_detail.png"
        price={13.50}
        slug="mv-hair-oil"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
