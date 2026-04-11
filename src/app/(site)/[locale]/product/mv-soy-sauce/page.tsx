import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ醤油 — Mother Vegetable',
  description:
    'Premium dark soy sauce with 48 nutrients. 150ml. Rich umami flavor. ¥2,000.',
  openGraph: {
    title: 'マザベジ醤油 — Mother Vegetable',
    description: 'Nutrient-infused premium dark soy sauce with 48 natural nutrients.',
    images: [{ url: '/cdn/mv_soy_sauce.jpg', width: 800, height: 800, alt: 'マザベジ醤油' }],
  },
};

function getMvSoySauceProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'mv-soy-sauce',
    category: 'food',
    name: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
    fullName: isJa ? 'マザベジ醤油 / 150ml' : 'Mother Vegetable Soy Sauce / 150ml',
    subtitle: '150ml',
    tagline: isJa ? '48種の栄養素配合のプレミアム醤油。' : 'Premium nutrient-rich dark soy sauce.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-soy-sauce')?.inStock ?? true,
    productImage: '/cdn/mv_soy_sauce.jpg',
    benefits: isJa
      ? [
          '旨味を極める — 植物由来の天然アミノ酸が醤油の旨味を深く引き立て、料理の味わいをワンランクアップ。',
          '栄養強化調味料 — 48種の栄養素を含み、調味するだけで日々の栄養バランスを整えます。',
          '和食との相性抜群 — 刺身・寿司・煮物など伝統的な和食をより一層引き立てる本格醤油。',
          '職人仕込み — 伝統的な醸造技法に48種の栄養素を融合させた、こだわりの逸品。',
        ]
      : [
          'Ultimate Umami — Plant-derived natural amino acids deepen the soy sauce flavor, elevating every dish.',
          'Nutrient-Fortified Seasoning — Contains 48 nutrients, improving your daily nutritional balance with every use.',
          'Perfect for Japanese Cuisine — Enhances sashimi, sushi, simmered dishes, and other traditional fare.',
          'Artisanal Craft — A premium blend of traditional brewing techniques and natural nutrient infusion.',
        ],
    howToUse: isJa
      ? '調理に：煮物・炒め物・照り焼きの味付けに。付け醤油：刺身・寿司・冷奴などのつけダレとして。マリネ：肉や魚の下味に漬け込んで旨味をプラス。ドレッシング：オリーブオイルやお酢と合わせて和風ドレッシングに。'
      : 'Cooking: Season simmered dishes, stir-fries, and teriyaki. Dipping: Serve alongside sashimi, sushi, and cold tofu. Marinades: Marinate meat or fish to infuse deep umami. Dressing: Mix with olive oil and vinegar for a Japanese-style dressing.',
    trust: {
      productName: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
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
      subtitle: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
      circles: [
        { name: 'Umami Amino Acids', detail: 'Glutamic acid' },
        { name: 'Fermented Enzymes', detail: 'Natural brew' },
        { name: 'B Vitamins', detail: 'B1, B2, B6' },
        { name: 'Antioxidants', detail: 'Polyphenols' },
        { name: 'Nutrient Infusion', detail: '48 nutrients' },
      ],
      benefits: isJa
        ? [
            { title: '子ども', items: ['栄養豊富な調味料で偏食対策', '免疫力の向上', '食欲増進・食事が楽しくなる', '鉄分・亜鉛で成長をサポート', '消化を助ける発酵食品'] },
            { title: '成人', items: ['毎日の食事で栄養補給', '代謝の改善', '細胞の老化を抑制', '腸内環境の改善', '抗酸化成分で疲労回復'] },
            { title: '高齢者', items: ['食欲と栄養摂取の向上', '内臓機能のサポート', '骨密度の促進', '発酵パワーで消化をサポート', '少量で深い味わい・減塩に貢献'] },
            { title: 'アスリート', items: ['効率的な栄養吸収', '筋肉回復のサポート', '炎症軽減', 'アミノ酸で持久力アップ', '発酵食品で腸内環境を整える'] },
          ]
        : [
            { title: 'Children', items: ['Nutrient-rich seasoning for picky eaters', 'Boosts immunity', 'Increases appetite & makes meals enjoyable', 'Iron & zinc support growth', 'Fermented food aids digestion'] },
            { title: 'Adults', items: ['Daily nutrition through meals', 'Improves metabolism', 'Suppresses cellular aging', 'Improves gut health', 'Antioxidants aid fatigue recovery'] },
            { title: 'Seniors', items: ['Boosts appetite & nutrient intake', 'Supports internal organ function', 'Promotes bone density', 'Fermented power aids digestion', 'Deep flavor in small amounts for lower sodium'] },
            { title: 'Athletes', items: ['Efficient nutrient absorption', 'Supports muscle recovery', 'Reduces inflammation', 'Amino acids boost endurance', 'Fermented food supports gut health'] },
          ],
    },
  };
}

export default async function MvSoySaucePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvSoySauceProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ醤油"
        description="Premium dark soy sauce with 48 nutrients. 150ml. Rich umami flavor."
        image="/cdn/mv_soy_sauce.jpg"
        price={13.50}
        slug="mv-soy-sauce"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
