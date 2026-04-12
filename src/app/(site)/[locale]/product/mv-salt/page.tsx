import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジ塩 — Mother Vegetable',
  description:
    'Green nutrient-infused salt. 50g. Rich in minerals and 48 nutrients. ¥2,000.',
  openGraph: {
    title: 'マザベジ塩 — Mother Vegetable',
    description: 'Green mineral-rich salt with 48 natural nutrients.',
    images: [{ url: '/cdn/mv_salt.jpg', width: 800, height: 800, alt: 'マザベジ塩' }],
  },
};

function getMvSaltProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';

  return {
    id: 'mv-salt',
    category: 'food',
    name: isJa ? 'マザベジ塩' : 'MV Salt',
    fullName: isJa ? 'マザベジ塩 / 50g' : 'Mother Vegetable Salt / 50g',
    subtitle: '50g',
    tagline: isJa ? '48種の栄養素配合の緑色の塩。' : 'Green nutrient-infused salt.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',
    priceMvt: '4 MVT',
    inStock: getProductBySlug('mv-salt')?.inStock ?? true,
    productImage: '/cdn/mv_salt.jpg',
    galleryImages: getProductBySlug('mv-salt')?.galleryImages,
    benefits: isJa
      ? [
          'ミネラル豊富 — 天然塩に48種の植物由来栄養素が加わり、鉄・亜鉛・マグネシウムなどを効率的に摂取。',
          '手軽に栄養強化 — 普段の塩をマザベジ塩に替えるだけで、毎日の食事の栄養価がアップ。',
          '旨味を引き立てる — 植物由来の天然アミノ酸が食材本来の味を深く引き出します。',
          '万能調味料 — 調理・味付け・仕上げ・保存まで、あらゆるシーンで活躍する万能塩。',
        ]
      : [
          'Mineral-Rich — Combines natural salt with 48 plant-based nutrients including iron, zinc, and magnesium.',
          'Effortless Nutrition — Simply replace your regular salt to boost daily nutritional intake.',
          'Enhances Natural Flavor — Plant-derived amino acids bring out the deeper taste of every ingredient.',
          'Versatile All-Purpose Salt — Perfect for cooking, seasoning, finishing, and even food preservation.',
        ],
    howToUse: isJa
      ? '調理時：煮物・炒め物・スープなど通常の塩と同量でお使いください。味付け：食卓で料理の仕上げに一振り。おにぎり・サラダ・ゆで卵にもおすすめ。保存食：漬物や干物など伝統的な保存にも最適です。'
      : 'Cooking: Use the same amount as regular salt in soups, stir-fries, and simmered dishes. Finishing: Sprinkle over salads, rice balls, boiled eggs, and grilled meats. Preserving: Ideal for traditional pickling and curing methods.',
    trust: {
      productName: isJa ? 'マザベジ塩' : 'MV Salt',
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
      subtitle: isJa ? 'マザベジ塩' : 'MV Salt',
      circles: isJa
        ? [
            { name: '必須脂肪酸', detail: '必須脂肪酸 (9種)' },
            { name: 'アミノ酸', detail: 'アミノ酸 (10種)' },
            { name: 'ビタミン', detail: '必須ビタミン (18種)' },
            { name: 'ミネラル', detail: '主要ミネラル (3種)' },
            { name: 'その他', detail: 'その他の機能性成分 (9種)' },
          ]
        : [
            { name: 'Essential Fatty Acids', detail: 'Essential Fatty Acids (9 types)' },
            { name: 'Amino Acids', detail: 'Amino Acids (10 types)' },
            { name: 'Vital Vitamins', detail: 'Vital Vitamins (18 types)' },
            { name: 'Key Minerals', detail: 'Key Minerals For Balance (3 types)' },
            { name: 'Other Functional', detail: 'Other Functional Ingredients (9 types)' },
          ],
      nutrientCount: isJa ? '48種の栄養素' : '48 Nutrients',
      nutrientList: 'Potassium, sodium, magnesium, calcium, phosphorus, iron, manganese, zinc, copper, Vitamin A, B1, B2, B3, B5, B6, B9, C, E, K, tryptophan, threonine, leucine, isoleucine, lysine, methionine, phenylalanine, valine, histidine, arginine, cystine, tyrosine, alanine, aspartic acid, glutamic acid, serine, glycine, proline, saturated fatty acids, omega-3 fatty acids, omega-6 fatty acids, C-phycocyanin, chlorophyll a, total carotenoids, nucleic acids, glycogen-like polysaccharides, glucan-like polysaccharides, cellulose',
      benefits: isJa
        ? [
            { title: '子ども', items: ['成長に必要なミネラル補給', '免疫力の向上', '骨の成長をサポート', '鉄分で集中力アップ', '偏食でもミネラル確保'] },
            { title: '成人', items: ['毎日の栄養補給を手軽に', '代謝の改善', '疲労軽減', '電解質バランスの維持', '抗酸化ミネラルで細胞保護'] },
            { title: '高齢者', items: ['ミネラルバランスの維持', '食欲と栄養摂取の向上', '骨密度の促進', '減塩しながら栄養補給', '消化を助けるミネラル配合'] },
            { title: 'アスリート', items: ['電解質の効率的な補給', '筋肉回復のサポート', '効率的な栄養吸収', '運動後のミネラル補充', '持久力向上をサポート'] },
          ]
        : [
            { title: 'Children', items: ['Essential minerals for growth', 'Boosts immunity', 'Supports bone development', 'Iron improves focus & concentration', 'Ensures mineral intake for picky eaters'] },
            { title: 'Adults', items: ['Effortless daily nutrition', 'Improves metabolism', 'Reduces fatigue', 'Maintains electrolyte balance', 'Antioxidant minerals protect cells'] },
            { title: 'Seniors', items: ['Maintains mineral balance', 'Boosts appetite & nutrient intake', 'Promotes bone density', 'Nutrition boost with less sodium', 'Digestive-friendly mineral blend'] },
            { title: 'Athletes', items: ['Efficient electrolyte replenishment', 'Supports muscle recovery', 'Enhanced nutrient absorption', 'Post-workout mineral restoration', 'Supports endurance performance'] },
          ],
    },
  };
}

export default async function MvSaltPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvSaltProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジ塩"
        description="Green nutrient-infused salt. 50g. Rich in minerals and 48 nutrients."
        image="/cdn/mv_salt.jpg"
        price={13.50}
        slug="mv-salt"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
