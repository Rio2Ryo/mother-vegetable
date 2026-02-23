import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Use Confidence Cream',
  description: 'Step-by-step guide for applying Mother Vegetable Confidence cream for optimal skin vitality and radiance.',
};

const CDN_BASE = 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence';

type ApplicationSection = {
  number: number;
  title: string;
  image: string;
  method: string;
  amount: string;
  notes?: string[];
};

type CategoryData = {
  title: string;
  sections: ApplicationSection[];
};

function SectionCard({ section, isJa }: { section: ApplicationSection; isJa: boolean }) {
  return (
    <div className="bg-black border border-[#25C760] rounded-xl p-4 md:p-6 mb-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {/* Image on the left */}
        <div className="w-full md:w-[280px] flex-shrink-0">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={`${CDN_BASE}/${section.image}`}
              alt={section.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>
        </div>

        {/* Content on the right */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#25C760] text-black font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              {section.number}
            </span>
            <h3 className="text-white font-bold text-lg md:text-xl">{section.title}</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-semibold whitespace-nowrap">{isJa ? '方法:' : 'Method:'}</span>
              <span className="text-white/90">{section.method}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-semibold whitespace-nowrap">{isJa ? '量:' : 'Amount:'}</span>
              <span className="text-white/90">{section.amount}</span>
            </div>
            {section.notes && section.notes.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/10">
                {section.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-white/70 text-xs mt-1">
                    <span className="text-[#25C760]">*</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ category, isJa }: { category: CategoryData; isJa: boolean }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-[#25C760]/30" />
        <h2 className="text-[#25C760] font-bold text-xl md:text-2xl tracking-wide text-center whitespace-nowrap">
          {category.title}
        </h2>
        <div className="h-px flex-1 bg-[#25C760]/30" />
      </div>
      {category.sections.map((section) => (
        <SectionCard key={section.number} section={section} isJa={isJa} />
      ))}
    </div>
  );
}

export default async function ConfidenceHowToPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';

  const skinConditions: ApplicationSection[] = [
    {
      number: 1,
      title: isJa ? 'シミ / しわ' : 'Dark Spots / Wrinkles',
      image: '10002.jpg',
      method: isJa ? '直接塗る' : 'Apply directly',
      amount: isJa ? '適量' : 'As needed',
    },
    {
      number: 2,
      title: isJa ? '傷 / ニキビ' : 'Wounds / Acne',
      image: '10003.jpg',
      method: isJa ? '直接塗る' : 'Apply directly',
      amount: isJa ? '適量' : 'As needed',
      notes: [
        isJa ? '塗布後、ガーゼまたは絆創膏で覆ってください' : 'Cover with gauze or bandage after application',
        isJa ? '大きな傷には、軟膏、クリーム、または水と混ぜてください' : 'For large wounds, mix with ointment, cream, or water',
      ],
    },
    {
      number: 3,
      title: isJa ? '臭い' : 'Odor',
      image: '10004.jpg',
      method: isJa ? '塗るまたは混ぜる' : 'Apply or Mix',
      amount: isJa ? '塗る: 適量 / 混ぜる: ボディローション + 1/10本' : 'Apply: as needed / Mix: Body Lotion + 1/10 stick',
    },
    {
      number: 4,
      title: isJa ? 'アレルギー肌' : 'Allergy-prone Skin',
      image: '10005.jpg',
      method: isJa ? '塗るまたは混ぜる' : 'Apply or Mix',
      amount: isJa ? '塗る: 適量 / 混ぜる: 軟膏 + 1/10本' : 'Apply: as needed / Mix: Ointment + 1/10 stick',
    },
    {
      number: 5,
      title: isJa ? '火傷跡' : 'Burn Scars',
      image: '10006.jpg',
      method: isJa ? '軟膏に混ぜる' : 'Mix into ointment',
      amount: isJa ? '軟膏/クリーム + 1/10本' : 'Ointment/Cream + 1/10 stick',
    },
    {
      number: 6,
      title: isJa ? '薄毛' : 'Hair Thinning',
      image: '10007.jpg',
      method: isJa ? 'シャンプー/育毛剤に混ぜる' : 'Mix into shampoo / hair tonic',
      amount: isJa ? 'シャンプー 100ml + 1/10本 / 育毛剤 100ml + 1本' : 'Shampoo 100ml + 1/10 stick / Hair tonic 100ml + 1 stick',
    },
    {
      number: 7,
      title: isJa ? 'テカリコントロール' : 'Face Shine Control',
      image: '10008.jpg',
      method: isJa ? '直接塗る' : 'Apply directly',
      amount: isJa ? '直接: 適量 / フェイスパウダー 100mg + 1本' : 'Direct: as needed / Face powder 100mg + 1 stick',
    },
    {
      number: 8,
      title: isJa ? 'そばかす・赤み' : 'Freckles and Redness',
      image: '10009.jpg',
      method: isJa ? '直接塗る' : 'Apply directly',
      amount: isJa ? '適量' : 'As needed',
    },
  ];

  const skincareProducts: ApplicationSection[] = [
    {
      number: 9,
      title: isJa ? 'クレンジング' : 'Cleansing',
      image: '10010.jpg',
      method: isJa ? 'クレンジングに混ぜる' : 'Mix into cleanser',
      amount: isJa ? 'オイル/バーム/クリーム + 1/10本' : 'Oil/Balm/Cream + 1/10 stick',
    },
    {
      number: 10,
      title: isJa ? '洗顔' : 'Face Wash',
      image: '10011.jpg',
      method: isJa ? '洗顔料に混ぜる' : 'Mix into face wash',
      amount: isJa ? '洗顔料 + 1/10本' : 'Face wash + 1/10 stick',
    },
    {
      number: 11,
      title: isJa ? '化粧水' : 'Lotion',
      image: '10012.jpg',
      method: isJa ? '化粧水に混ぜる' : 'Mix into lotion',
      amount: isJa ? '直接: 化粧水 + 1/10本 / ボトル: 100ml + 1本' : 'Direct: Lotion + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 12,
      title: isJa ? '乳液' : 'Emulsion',
      image: '10013.jpg',
      method: isJa ? '乳液に混ぜる' : 'Mix into emulsion',
      amount: isJa ? '直接: 乳液 + 1/10本 / ボトル: 100ml + 1本' : 'Direct: Emulsion + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 13,
      title: isJa ? '美容液 / ブースターセラム' : 'Serum / Booster Serum',
      image: '10014.jpg',
      method: isJa ? '美容液に混ぜる' : 'Mix into serum',
      amount: isJa ? '直接: 美容液 + 1/10本 / ボトル: 100ml + 1本' : 'Direct: Serum + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 14,
      title: isJa ? '軟膏' : 'Ointment',
      image: '10015.jpg',
      method: isJa ? '軟膏に混ぜる' : 'Mix into ointment',
      amount: isJa ? '軟膏 + 1/10本' : 'Ointment + 1/10 stick',
    },
    {
      number: 15,
      title: isJa ? 'フェイスクリーム' : 'Face Cream',
      image: '10016.jpg',
      method: isJa ? 'フェイスクリームに混ぜる' : 'Mix into face cream',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 16,
      title: isJa ? 'フェイスマスク' : 'Face Mask',
      image: '10017.jpg',
      method: isJa ? 'フェイスマスクの前に塗る' : 'Apply before face mask',
      amount: isJa ? '1枚 + 1/10本' : '1 sheet + 1/10 stick',
    },
    {
      number: 17,
      title: isJa ? '日焼け止め' : 'Sunscreen Cream',
      image: '10018.jpg',
      method: isJa ? '日焼け止めに混ぜる' : 'Mix into sunscreen',
      amount: isJa ? '日焼け止め + 1/10本' : 'Sunscreen + 1/10 stick',
    },
    {
      number: 18,
      title: isJa ? '化粧下地' : 'Primer',
      image: '10019.jpg',
      method: isJa ? '化粧下地に混ぜる' : 'Mix into primer',
      amount: isJa ? '化粧下地 + 1/10本' : 'Primer + 1/10 stick',
    },
    {
      number: 19,
      title: isJa ? 'リキッドファンデーション' : 'Liquid Foundation',
      image: '10020.jpg',
      method: isJa ? 'ファンデーションに混ぜる' : 'Mix into foundation',
      amount: isJa ? 'ファンデーション + 1/10本' : 'Foundation + 1/10 stick',
    },
    {
      number: 20,
      title: isJa ? 'フェイスパウダー' : 'Face Powder',
      image: '10021.jpg',
      method: isJa ? 'フェイスパウダーに混ぜる' : 'Mix into face powder',
      amount: isJa ? '直接: 適量 / パウダー 100mg + 1本' : 'Direct: as needed / Powder 100mg + 1 stick',
      notes: [isJa ? 'フェイスパウダーとして単独使用可能' : 'Can be used alone as face powder'],
    },
  ];

  const hairCare: ApplicationSection[] = [
    {
      number: 21,
      title: isJa ? 'シャンプー' : 'Shampoo',
      image: '10022.jpg',
      method: isJa ? 'シャンプーに混ぜる' : 'Mix into shampoo',
      amount: isJa ? 'シャンプー + 1/10本' : 'Shampoo + 1/10 stick',
    },
    {
      number: 22,
      title: isJa ? 'ヘアトリートメント' : 'Hair Treatment',
      image: '10023.jpg',
      method: isJa ? 'トリートメントに混ぜる' : 'Mix into treatment',
      amount: isJa ? 'トリートメント + 1/10本' : 'Treatment + 1/10 stick',
    },
    {
      number: 23,
      title: isJa ? 'ヘアパック' : 'Hair Pack',
      image: '10024.jpg',
      method: isJa ? 'ヘアパックに混ぜる' : 'Mix into hair pack',
      amount: isJa ? 'ヘアパック + 1/10本' : 'Hair Pack + 1/10 stick',
    },
    {
      number: 24,
      title: isJa ? '洗い流さないトリートメント' : 'Leave-in Hair Treatment',
      image: '10025.jpg',
      method: isJa ? 'トリートメントに混ぜる' : 'Mix into treatment',
      amount: isJa ? 'トリートメント + 1/10本' : 'Treatment + 1/10 stick',
    },
  ];

  const bodyCare: ApplicationSection[] = [
    {
      number: 25,
      title: isJa ? 'ボディソープ' : 'Body Soap',
      image: '10026.jpg',
      method: isJa ? 'ボディソープに混ぜる' : 'Mix into body soap',
      amount: isJa ? 'ボディソープ + 1/10本' : 'Body Soap + 1/10 stick',
    },
    {
      number: 26,
      title: isJa ? 'ハンドソープ' : 'Hand Soap',
      image: '10027.jpg',
      method: isJa ? 'ハンドソープに混ぜる' : 'Mix into hand soap',
      amount: isJa ? 'ハンドソープ + 1/10本' : 'Hand Soap + 1/10 stick',
    },
    {
      number: 27,
      title: isJa ? 'ボディクリーム' : 'Body Cream',
      image: '10028.jpg',
      method: isJa ? 'ボディクリームに混ぜる' : 'Mix into body cream',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 28,
      title: isJa ? 'シェービングフォーム' : 'Shaving Foam',
      image: '10029.jpg',
      method: isJa ? 'シェービングフォームに混ぜる' : 'Mix into shaving foam',
      amount: isJa ? 'シェービングフォーム + 1/10本' : 'Shaving Foam + 1/10 stick',
    },
    {
      number: 29,
      title: isJa ? 'ネイルオイル' : 'Nail Oil',
      image: '10030.jpg',
      method: isJa ? 'ネイルオイルに混ぜる' : 'Mix into nail oil',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    },
  ];

  const otherPersonalCare: ApplicationSection[] = [
    {
      number: 30,
      title: isJa ? 'ハンドクリーム' : 'Hand Cream',
      image: '10031.jpg',
      method: isJa ? 'ハンドクリームに混ぜる' : 'Mix into hand cream',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 31,
      title: isJa ? '歯磨き粉' : 'Tooth Paste',
      image: '10032.jpg',
      method: isJa ? '歯磨き粉に混ぜる' : 'Mix into toothpaste',
      amount: isJa ? '歯磨き粉 + 1/10本' : 'Toothpaste + 1/10 stick',
      notes: [isJa ? 'FDA プレミアムフードグレード安全認定' : 'FDA Premium Food Grade safe'],
    },
    {
      number: 32,
      title: isJa ? 'マウスウォッシュ' : 'Mouthwash',
      image: '10033.jpg',
      method: isJa ? 'マウスウォッシュに混ぜる' : 'Mix into mouthwash',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
      notes: [isJa ? 'FDA プレミアムフードグレード安全認定' : 'FDA Premium Food Grade safe'],
    },
    {
      number: 33,
      title: isJa ? '水虫クリーム' : "Athlete's Foot Cream",
      image: '10034.jpg',
      method: isJa ? 'クリームに混ぜる' : 'Mix into cream',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 34,
      title: isJa ? '消毒液' : 'Antiseptic',
      image: '10035.jpg',
      method: isJa ? '消毒液に混ぜる' : 'Mix into antiseptic',
      amount: isJa ? '直接: + 1/10本 / ボトル: 100ml + 1本' : 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    },
    {
      number: 35,
      title: isJa ? '虫刺されクリーム' : 'Insect Bite Cream',
      image: '10036.jpg',
      method: isJa ? 'クリームに混ぜる' : 'Mix into cream',
      amount: isJa ? 'クリーム + 1/10本' : 'Cream + 1/10 stick',
    },
    {
      number: 36,
      title: isJa ? 'リップバーム' : 'Lip Balm',
      image: '10037.jpg',
      method: isJa ? 'リップバームに混ぜる' : 'Mix into lip balm',
      amount: isJa ? 'リップバーム + 1/10本' : 'Lip balm + 1/10 stick',
      notes: [isJa ? 'バームに塗るか直接塗ってから使用' : 'Apply to balm or Apply directly first'],
    },
  ];

  const categories: CategoryData[] = [
    { title: isJa ? '肌の悩み' : 'Skin Conditions', sections: skinConditions },
    { title: isJa ? 'スキンケア製品' : 'Skincare Products', sections: skincareProducts },
    { title: isJa ? 'ヘアケア' : 'Hair Care', sections: hairCare },
    { title: isJa ? 'ボディケア' : 'Body Care', sections: bodyCare },
    { title: isJa ? 'その他のパーソナルケア' : 'Other Personal Care', sections: otherPersonalCare },
  ];

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Page Title */}
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">
          {isJa ? 'Confidenceの使い方' : 'How to Use Confidence'}
        </h1>
        <Image
          src="/Images/Assets/homepage/underline.png"
          alt="Underline"
          width={250}
          height={10}
          className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]"
        />

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-10 border border-[#25C760]/30">
          <Image
            src={`${CDN_BASE}/10001.png`}
            alt="Confidence - How to Use"
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority
          />
        </div>

        {/* Methods Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-4">{isJa ? '塗る・すり込む' : 'Apply - Rub In'}</h2>
            <p className="text-white text-sm leading-relaxed opacity-90">
              {isJa
                ? 'Confidenceパウダーを直接肌に塗り、円を描くようにやさしくすり込みます。シミ、ニキビ跡、傷跡などの特定の肌悩みに特に効果的です。'
                : 'Apply Confidence powder directly onto the skin area you want to treat. Gently rub the powder in using circular motions. This method is especially effective for targeting specific skin concerns like dark spots, acne scars, and wound marks.'}
            </p>
          </div>
          <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-4">{isJa ? '混ぜる・混合' : 'Mix - Mix In'}</h2>
            <p className="text-white text-sm leading-relaxed opacity-90">
              {isJa
                ? 'Confidenceパウダーをお手持ちの化粧品、スキンケア製品、日用品に混ぜてご使用ください。愛用製品のヒーリング効果を高めることができます。'
                : 'Mix Confidence powder into your existing cosmetics, skincare products, or daily essentials. This allows you to enhance the healing properties of products you already use and love.'}
            </p>
          </div>
        </div>

        {/* All 36 Application Sections by Category */}
        {categories.map((category) => (
          <CategorySection key={category.title} category={category} isJa={isJa} />
        ))}

        {/* Buy button */}
        <div className="text-center py-8">
          <a
            href="/product/confidence"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            {isJa ? 'Confidenceを購入する' : 'To Buy Confidence'}
          </a>
        </div>

        <div className="text-center py-8">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
