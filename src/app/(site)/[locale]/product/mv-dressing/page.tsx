import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジドレッシング — Mother Vegetable',
  description: 'Premium salad dressing with 48 nutrients. 150ml.',
  openGraph: {
    title: 'マザベジドレッシング — Mother Vegetable',
    description: 'Premium nutrient-rich salad dressing. 150ml.',
    images: [{ url: 'https://images.unsplash.com/photo-1638324396082-69209f24abdc?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジドレッシング' }],
  },
};

function getMvDressingProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-dressing',
    category: 'food',
    name: isJa ? 'マザベジドレッシング' : 'MV Dressing',
    fullName: isJa ? 'マザベジドレッシング / 150ml' : 'Mother Vegetable Dressing / 150ml',
    subtitle: '150ml',
    tagline: isJa ? '48種の栄養素配合のプレミアムドレッシング。' : 'Premium nutrient-rich salad dressing.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-dressing')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1638324396082-69209f24abdc?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-dressing')?.galleryImages,
    benefits: isJa
      ? [
          '黄金比ブレンド — 厳選オイル・ビネガー・調味料を絶妙なバランスで配合した本格派ドレッシング。',
          '栄養素を毎食に — 48種の栄養素をかけるだけで補給。サラダの栄養価を大きく引き上げます。',
          '野菜が美味しくなる — 素材の旨味を引き立てる味わいで、子どもも野菜が進むメニューへ。',
          'マルチユース — サラダだけでなく、グリル野菜・蒸し野菜・冷しゃぶ・カルパッチョにも。',
        ]
      : [
          'Golden-Ratio Blend — Carefully balanced oil, vinegar, and seasonings deliver authentic dressing flavor.',
          'Nutrients With Every Meal — Add 48 nutrients in a single drizzle, boosting your salad nutrition.',
          'Makes Vegetables Delicious — A flavor that draws out vegetable umami so even children eat more greens.',
          'Multi-Use — Beyond salad, perfect for grilled vegetables, steamed vegetables, cold shabu-shabu, and carpaccio.',
        ],
    howToUse: isJa
      ? 'サラダに：よく振ってから新鮮な野菜にたっぷりかけて。蒸し野菜・グリル野菜：温野菜に絡めるとコクのある一品に。冷しゃぶ・カルパッチョ：肉や魚にかけるだけで本格メニューに。マリネ液：野菜や鶏むね肉を漬け込めば、しっとり美味しく。'
      : 'On salads: Shake well, then drizzle generously over fresh vegetables. Steamed or grilled vegetables: Toss with warm veg for a richer side. Cold shabu-shabu / carpaccio: Pour over meat or fish for an instant restaurant-style dish. Marinade: Soak vegetables or chicken breast for tender, flavorful results.',
    trust: {
      productName: isJa ? 'マザベジドレッシング' : 'MV Dressing',
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
      subtitle: isJa ? 'マザベジドレッシング' : 'MV Dressing',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '植物油・醸造酢・調味料' },
            { label: 'タンパク質', value: '0.5〜1.0g' },
            { label: '食物繊維', value: '0.3〜0.5g' },
            { label: '脂質', value: '45〜55g' },
            { label: '水分', value: '30〜35g' },
          ]
        : [
            { label: 'Main Component', value: 'Vegetable Oil / Brewed Vinegar / Seasonings' },
            { label: 'Protein', value: '0.5~1.0g' },
            { label: 'Dietary Fiber', value: '0.3~0.5g' },
            { label: 'Fat', value: '45~55g' },
            { label: 'Moisture', value: '30~35g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培の栄養素を配合',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '黄金比でブレンドした本格派の味わい',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Enriched with nutrients from contaminant-free indoor cultivation',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Authentic flavor blended in golden ratio',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '子ども', items: ['野菜嫌い対策', '栄養補給', '食欲増進', '優しい味わい', '毎日の食事が楽しく'] },
            { title: '成人', items: ['毎食で栄養補給', '健康的な食生活', 'カロリーコントロール', '美味しく続けやすい', '料理のレパートリーアップ'] },
            { title: '高齢者', items: ['食欲アップ', '栄養補給サポート', '柔らかな味わい', '食べやすい', '少量で深い味わい'] },
            { title: '幅広い使い方', items: ['サラダドレッシング', 'マリネ液', '蒸し野菜のソース', 'カルパッチョソース', '冷しゃぶのタレ'] },
          ]
        : [
            { title: 'Children', items: ['Helps with vegetable aversion', 'Nutrient replenishment', 'Boosts appetite', 'Gentle flavor', 'Makes daily meals fun'] },
            { title: 'Adults', items: ['Nutrients every meal', 'Healthy eating habits', 'Calorie control', 'Delicious & sustainable', 'Expands recipe repertoire'] },
            { title: 'Seniors', items: ['Boosts appetite', 'Supports nutrient intake', 'Soft, mellow flavor', 'Easy to enjoy', 'Deep flavor in small amounts'] },
            { title: 'Versatile Uses', items: ['Salad dressing', 'Marinade liquid', 'Steamed vegetable sauce', 'Carpaccio sauce', 'Cold shabu-shabu sauce'] },
          ],
    },
  };
}

export default async function MvDressingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvDressingProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジドレッシング"
        description="Premium salad dressing with 48 nutrients. 150ml."
        image="https://images.unsplash.com/photo-1638324396082-69209f24abdc?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-dressing"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
