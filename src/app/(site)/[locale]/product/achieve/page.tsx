import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductPage, { type ProductPageData } from '@/components/ProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';

export const metadata: Metadata = {
  title: 'Achieve — 48 Nutrients in One Stick',
  description:
    'Mother Vegetable Achieve delivers 48 different nutrients in a single stick. Premium health supplement for daily wellness. USD 36.70 with free worldwide shipping.',
  openGraph: {
    title: 'Mother Vegetable Achieve — 48 Nutrients in One Stick',
    description: 'Premium health supplement delivering 48 nutrients in one stick.',
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable Achieve' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable Achieve — 48 Nutrients in One Stick',
    description: 'Premium health supplement delivering 48 nutrients in one stick.',
  },
};

function getAchieveProduct(locale: string): ProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'achieve',
    name: 'Achieve',
    fullName: 'Mother Vegetable Achieve - 30 sticks',
    subtitle: isJa ? '身体のために' : 'for Body',
    taglineJp: '',
    tagline: isJa ? '48種の栄養素を一度に。' : '48 different nutrients at once.',
    price: 36.70,
    currency: 'USD',
    priceDisplay: 'USD 36.70',
    productImage: '/cdn/products_achieve_10001.png',
    videoUrls: [
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_1.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_2.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_3.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_4.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_5.mp4',
    ],
    mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
    benefits: isJa
      ? [
          '健康な腸をサポートし、全身の細胞再生を促進。',
          '便秘改善、睡眠向上、体重管理をサポート。',
        ]
      : [
          'Supports a healthy gut, Regeneration of cells throughout the body.',
          'Helps relieve constipation, improve sleep, and aid weight management.',
        ],
    howToUse: isJa
      ? 'スティック1本をお飲み物やお食事に加えるだけ。'
      : 'Simply add one stick into your drink or meal.',
    howToLink: '/achieve-howto',

    leftSection: {
      title: isJa ? '飲み物' : 'Drink',
      items: [
        { name: isJa ? '水' : 'Water', image: '/Images/Assets/achieve/mazekomu/water_green.png' },
        { name: isJa ? 'ジュース' : 'Juice', image: '/Images/Assets/achieve/mazekomu/juice.png' },
        { name: isJa ? 'コーラ' : 'Cola', image: '/Images/Assets/achieve/mazekomu/cola.png' },
        { name: isJa ? 'ビール' : 'Beer', image: '/Images/Assets/achieve/mazekomu/beer.png' },
        { name: isJa ? 'ワイン' : 'White wine', image: '/Images/Assets/achieve/mazekomu/whiteWine.png' },
        { name: isJa ? 'ハイボール' : 'Highball', image: '/Images/Assets/achieve/mazekomu/highball.png' },
      ],
    },
    rightSection: {
      title: isJa ? '食べ物' : 'Food',
      items: [
        { name: isJa ? 'チャーハン' : 'Fried Rice', image: '/Images/Assets/achieve/mazekomu/friedRice.png' },
        { name: isJa ? 'ラーメン' : 'Ramen', image: '/Images/Assets/achieve/mazekomu/ramen.png' },
        { name: isJa ? 'サラダ' : 'Salad', image: '/Images/Assets/achieve/mazekomu/salad.png' },
        { name: isJa ? 'ヨーグルト' : 'Yogurt', image: '/Images/Assets/achieve/mazekomu/yogurt.png' },
        { name: isJa ? 'パスタ' : 'Pasta', image: '/Images/Assets/achieve/mazekomu/pasta.png' },
        { name: isJa ? '天ぷら' : 'Tempura', image: '/Images/Assets/achieve/mazekomu/tempura.png' },
      ],
    },
    centerTitle: isJa ? '混ぜる' : 'Mix In',
    centerImage: '/Images/Assets/achieve/mazekomu/mazekomu.png',

    trust: {
      productName: 'Achieve',
      certification: isJa
        ? '厚生労働省によりヒューマングレード食品認定'
        : 'certified human grade food by Ministry of Health, Labour and Welfare (MHLW), Japan',
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
      type: 'food',
      title: 'Food Function',
      subtitle: 'Achieve',
      method: isJa ? '加える / 混ぜる' : 'Add / Mix In',
      videoUrl: '/Images/Assets/homepage/product/food_video.mov',
      circles: [
        { name: 'Essential Fatty Acids', detail: '9 types' },
        { name: 'Amino Acids', detail: '10 types' },
        { name: 'Vital Vitamins', detail: '18 types' },
        { name: 'Key Minerals For Balance', detail: '3 types' },
        { name: 'Other Functional Ingredients', detail: '9 types' },
      ],
      summary: {
        total: '48 Nutrients',
        description:
          'Potassium, sodium, magnesium, calcium, phosphorus, iron, manganese, zinc, copper, Vitamin A, B1, B2, B3, B5, B6, B9, C, E, K, tryptophan, threonine, leucine, isoleucine, lysine, methionine, phenylalanine, valine, histidine, arginine, cystine, tyrosine, alanine, aspartic acid, glutamic acid, serine, glycine, proline, saturated fatty acids, omega-3 fatty acids, omega-6 fatty acids, C-phycocyanin, chlorophyll a, total carotenoids, nucleic acids, spirulan, glycogen-like polysaccharides, β-glucan-like polysaccharides, cellulose.',
      },
      benefits: isJa
        ? [
            {
              title: '子ども',
              image: '/Images/Assets/homepage/foodFunction/children.png',
              items: ['集中力の向上', '学習能力の向上', '骨の成長をサポート', '免疫力の向上', '食欲増進'],
            },
            {
              title: '成人',
              image: '/Images/Assets/homepage/foodFunction/alduts.png',
              items: ['便秘・消化の改善', '睡眠の質の向上', '疲労軽減', '細胞の老化と炎症の抑制', 'ダイエットサポート*'],
            },
            {
              title: '高齢者',
              image: '/Images/Assets/homepage/foodFunction/seniors.png',
              items: ['睡眠の質と血行の改善', '食欲と栄養摂取の向上', '内臓機能のサポート', '骨密度の促進'],
            },
            {
              title: 'アスリート',
              image: '/Images/Assets/homepage/foodFunction/athletes.png',
              items: ['添加物の解毒', '筋肉回復と持久力の向上', '効率的な栄養吸収', '炎症軽減と回復サポート', 'トレーニング効果の向上'],
            },
          ]
        : [
            {
              title: 'Children',
              image: '/Images/Assets/homepage/foodFunction/children.png',
              items: ['Improves concentration', 'Enhances learning ability', 'Supports bone growth', 'Boosts immunity', 'Increases appetite'],
            },
            {
              title: 'Adults',
              image: '/Images/Assets/homepage/foodFunction/alduts.png',
              items: ['Improves constipation and digestion', 'Enhances sleep quality', 'Reduces fatigue', 'Suppresses cellular aging and inflammation', 'Supports dieting*'],
            },
            {
              title: 'Seniors',
              image: '/Images/Assets/homepage/foodFunction/seniors.png',
              items: ['Improves sleep quality and blood circulation', 'Boosts appetite and nutrient intake', 'Supports internal organ function', 'Promotes bone density'],
            },
            {
              title: 'Athletes',
              image: '/Images/Assets/homepage/foodFunction/athletes.png',
              items: ['Detoxifies additives', 'Aids muscle recovery and improves endurance', 'Provides efficient nutrient absorption', 'Reduces inflammation and supports recovery', 'Enhances training effectiveness'],
            },
          ],
    },
  };
}

export default async function AchievePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const achieveProduct = getAchieveProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="Mother Vegetable Achieve"
        description="48 different nutrients in one stick. Premium health supplement for daily wellness."
        image="/cdn/products_achieve_10001.png"
        price={36.70}
        slug="achieve"
      />
      <ProductPage product={achieveProduct} />
    </>
  );
}
