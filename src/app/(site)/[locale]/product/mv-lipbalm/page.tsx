import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SimpleProductPage, { type SimpleProductPageData } from '@/components/SimpleProductPage';
import ProductJsonLd from '@/components/ProductJsonLd';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'マザベジリップバーム — Mother Vegetable',
  description: 'Natural collagen lip balm. 5g. Soft, nourished lips all day.',
  openGraph: {
    title: 'マザベジリップバーム — Mother Vegetable',
    description: 'Natural collagen lip balm. 5g.',
    images: [{ url: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop', width: 800, height: 800, alt: 'マザベジリップバーム' }],
  },
};

function getMvLipbalmProduct(locale: string): SimpleProductPageData {
  const isJa = locale === 'ja';
  return {
    id: 'mv-lipbalm',
    category: 'cosmetic',
    name: isJa ? 'マザベジリップバーム' : 'MV Lip Balm',
    fullName: isJa ? 'マザベジリップバーム / 5g' : 'Mother Vegetable Lip Balm / 5g',
    subtitle: '5g',
    tagline: isJa ? '天然コラーゲン配合のリップバーム。' : 'Natural collagen lip balm for nourished lips.',
    price: 13.50,
    currency: 'USD',
    priceJpy: '¥2,000',

    inStock: getProductBySlug('mv-lipbalm')?.inStock ?? true,
    productImage: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop',
    galleryImages: getProductBySlug('mv-lipbalm')?.galleryImages,
    benefits: isJa
      ? [
          '集中保湿 — 天然コラーゲンと天然由来オイルが、荒れて乾いた唇を集中的に修復・保護。',
          'ふっくらケア — 乾燥でしぼんだ唇にうるおいを与え、ふっくらとしたヘルシーな唇に。',
          'ティント効果 — ほんのり自然な血色感を演出。すっぴんでも色付き、メイクの下地にも。',
          '長時間保護 — 天然ワックスが薄いベールを形成し、乾燥や紫外線から唇をやさしくガード。',
        ]
      : [
          'Intensive Moisturizing — Natural collagen and plant-derived oils intensively repair and protect chapped, dry lips.',
          'Plumping Care — Gives moisture to thin, dry lips for a plump, healthy look.',
          'Tinted Effect — Adds a hint of natural color. Wear bare-faced or as a lip makeup base.',
          'Long-Lasting Protection — Natural wax forms a thin veil that gently guards lips from dryness and UV rays.',
        ],
    howToUse: isJa
      ? '清潔な唇に適量を直接塗布、または指に取って優しく馴染ませます。乾燥が気になる時はいつでも重ね塗りOK。メイクの下地としてリップカラーの前に使うと、発色と持ちが良くなります。就寝前にたっぷり塗ってナイトケアとしてもおすすめ。寒い季節の必需品です。'
      : 'Apply directly to clean lips or take on your finger and gently massage in. Reapply anytime dryness is noticeable. Use as a lip makeup base before lip color for better pigment and longevity. Recommended as overnight night-care by applying generously before sleep. An essential for cold seasons.',
    trust: {
      productName: isJa ? 'マザベジリップバーム' : 'MV Lip Balm',
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
      subtitle: isJa ? 'マザベジリップバーム' : 'MV Lip Balm',
      ingredientInfo: isJa
        ? [
            { label: '主成分', value: '天然コラーゲン 5%' },
            { label: 'タンパク質', value: '0.4g' },
            { label: '食物繊維', value: '0.1g' },
            { label: '脂質', value: '32g' },
            { label: '水分', value: '60g' },
          ]
        : [
            { label: 'Main Component', value: 'Natural Collagen 5%' },
            { label: 'Protein', value: '0.4g' },
            { label: 'Dietary Fiber', value: '0.1g' },
            { label: 'Fat', value: '32g' },
            { label: 'Moisture', value: '60g' },
          ],
      characteristics: isJa
        ? [
            '天然素材のみで作られています',
            '汚染物質のない完全室内栽培',
            '重金属・マイクロプラスチック汚染リスクを最小化',
            '防腐剤・人工着色料・香料不使用',
            '天然オイル・ワックス・コラーゲン配合',
            '厳格な検査による品質認定',
          ]
        : [
            'Made entirely from natural materials',
            'Complete indoor cultivation free from contaminants',
            'Minimizes heavy metal and microplastic contamination risks',
            'No preservatives, artificial colors, or fragrances',
            'Natural oils, wax, and collagen blend',
            'Certified quality through rigorous testing',
          ],
      benefits: isJa
        ? [
            { title: '乾燥した唇', items: ['集中保湿ケア', 'ひび割れケア', 'カサつきを防ぐ', 'なめらかな唇に', '長時間うるおいキープ'] },
            { title: '血色・色味', items: ['自然な血色感', 'ほんのりティント', '健康的な印象', 'すっぴんメイクに', '唇本来の美しさを引き出す'] },
            { title: '保護バリア', items: ['乾燥から守る', '紫外線から守る', '寒さから守る', '薄いベール膜', 'デリケートな唇を保護'] },
            { title: 'ナイトケア', items: ['就寝前にたっぷり', '朝までうるおい', '翌朝ふっくら', 'リップマスク代わりに', '集中ナイトケア'] },
          ]
        : [
            { title: 'Dry Lips', items: ['Intensive moisture care', 'Cares for cracked lips', 'Prevents flakiness', 'For smooth lips', 'Long-lasting hydration'] },
            { title: 'Color & Tint', items: ['Natural flush', 'Subtle tint', 'Healthy impression', 'For bare-face makeup', 'Brings out natural lip beauty'] },
            { title: 'Protective Barrier', items: ['Protects from dryness', 'Protects from UV', 'Protects from cold', 'Thin veil layer', 'Protects delicate lips'] },
            { title: 'Overnight Care', items: ['Apply generously before bed', 'Hydration until morning', 'Plump lips next day', 'Use as a lip mask', 'Intensive night care'] },
          ],
    },
  };
}

export default async function MvLipbalmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = getMvLipbalmProduct(locale);
  return (
    <>
      <ProductJsonLd
        name="マザベジリップバーム"
        description="Natural collagen lip balm. 5g."
        image="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop"
        price={13.50}
        slug="mv-lipbalm"
      />
      <SimpleProductPage product={product} />
    </>
  );
}
