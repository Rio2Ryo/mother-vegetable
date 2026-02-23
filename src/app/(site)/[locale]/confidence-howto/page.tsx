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

const skinConditions: ApplicationSection[] = [
  {
    number: 1,
    title: 'Dark Spots / Wrinkles',
    image: '10002.jpg',
    method: 'Apply directly',
    amount: 'As needed',
  },
  {
    number: 2,
    title: 'Wounds / Acne',
    image: '10003.jpg',
    method: 'Apply directly',
    amount: 'As needed',
    notes: [
      'Cover with gauze or bandage after application',
      'For large wounds, mix with ointment, cream, or water',
    ],
  },
  {
    number: 3,
    title: 'Odor',
    image: '10004.jpg',
    method: 'Apply or Mix',
    amount: 'Apply: as needed / Mix: Body Lotion + 1/10 stick',
  },
  {
    number: 4,
    title: 'Allergy-prone Skin',
    image: '10005.jpg',
    method: 'Apply or Mix',
    amount: 'Apply: as needed / Mix: Ointment + 1/10 stick',
  },
  {
    number: 5,
    title: 'Burn Scars',
    image: '10006.jpg',
    method: 'Mix into ointment',
    amount: 'Ointment/Cream + 1/10 stick',
  },
  {
    number: 6,
    title: 'Hair Thinning',
    image: '10007.jpg',
    method: 'Mix into shampoo / hair tonic',
    amount: 'Shampoo 100ml + 1/10 stick / Hair tonic 100ml + 1 stick',
  },
  {
    number: 7,
    title: 'Face Shine Control',
    image: '10008.jpg',
    method: 'Apply directly',
    amount: 'Direct: as needed / Face powder 100mg + 1 stick',
  },
  {
    number: 8,
    title: 'Freckles and Redness',
    image: '10009.jpg',
    method: 'Apply directly',
    amount: 'As needed',
  },
];

const skincareProducts: ApplicationSection[] = [
  {
    number: 9,
    title: 'Cleansing',
    image: '10010.jpg',
    method: 'Mix into cleanser',
    amount: 'Oil/Balm/Cream + 1/10 stick',
  },
  {
    number: 10,
    title: 'Face Wash',
    image: '10011.jpg',
    method: 'Mix into face wash',
    amount: 'Face wash + 1/10 stick',
  },
  {
    number: 11,
    title: 'Lotion',
    image: '10012.jpg',
    method: 'Mix into lotion',
    amount: 'Direct: Lotion + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 12,
    title: 'Emulsion',
    image: '10013.jpg',
    method: 'Mix into emulsion',
    amount: 'Direct: Emulsion + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 13,
    title: 'Serum / Booster Serum',
    image: '10014.jpg',
    method: 'Mix into serum',
    amount: 'Direct: Serum + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 14,
    title: 'Ointment',
    image: '10015.jpg',
    method: 'Mix into ointment',
    amount: 'Ointment + 1/10 stick',
  },
  {
    number: 15,
    title: 'Face Cream',
    image: '10016.jpg',
    method: 'Mix into face cream',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 16,
    title: 'Face Mask',
    image: '10017.jpg',
    method: 'Apply before face mask',
    amount: '1 sheet + 1/10 stick',
  },
  {
    number: 17,
    title: 'Sunscreen Cream',
    image: '10018.jpg',
    method: 'Mix into sunscreen',
    amount: 'Sunscreen + 1/10 stick',
  },
  {
    number: 18,
    title: 'Primer',
    image: '10019.jpg',
    method: 'Mix into primer',
    amount: 'Primer + 1/10 stick',
  },
  {
    number: 19,
    title: 'Liquid Foundation',
    image: '10020.jpg',
    method: 'Mix into foundation',
    amount: 'Foundation + 1/10 stick',
  },
  {
    number: 20,
    title: 'Face Powder',
    image: '10021.jpg',
    method: 'Mix into face powder',
    amount: 'Direct: as needed / Powder 100mg + 1 stick',
    notes: ['Can be used alone as face powder'],
  },
];

const hairCare: ApplicationSection[] = [
  {
    number: 21,
    title: 'Shampoo',
    image: '10022.jpg',
    method: 'Mix into shampoo',
    amount: 'Shampoo + 1/10 stick',
  },
  {
    number: 22,
    title: 'Hair Treatment',
    image: '10023.jpg',
    method: 'Mix into treatment',
    amount: 'Treatment + 1/10 stick',
  },
  {
    number: 23,
    title: 'Hair Pack',
    image: '10024.jpg',
    method: 'Mix into hair pack',
    amount: 'Hair Pack + 1/10 stick',
  },
  {
    number: 24,
    title: 'Leave-in Hair Treatment',
    image: '10025.jpg',
    method: 'Mix into treatment',
    amount: 'Treatment + 1/10 stick',
  },
];

const bodyCare: ApplicationSection[] = [
  {
    number: 25,
    title: 'Body Soap',
    image: '10026.jpg',
    method: 'Mix into body soap',
    amount: 'Body Soap + 1/10 stick',
  },
  {
    number: 26,
    title: 'Hand Soap',
    image: '10027.jpg',
    method: 'Mix into hand soap',
    amount: 'Hand Soap + 1/10 stick',
  },
  {
    number: 27,
    title: 'Body Cream',
    image: '10028.jpg',
    method: 'Mix into body cream',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 28,
    title: 'Shaving Foam',
    image: '10029.jpg',
    method: 'Mix into shaving foam',
    amount: 'Shaving Foam + 1/10 stick',
  },
  {
    number: 29,
    title: 'Nail Oil',
    image: '10030.jpg',
    method: 'Mix into nail oil',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
  },
];

const otherPersonalCare: ApplicationSection[] = [
  {
    number: 30,
    title: 'Hand Cream',
    image: '10031.jpg',
    method: 'Mix into hand cream',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 31,
    title: 'Tooth Paste',
    image: '10032.jpg',
    method: 'Mix into toothpaste',
    amount: 'Toothpaste + 1/10 stick',
    notes: ['FDA Premium Food Grade safe'],
  },
  {
    number: 32,
    title: 'Mouthwash',
    image: '10033.jpg',
    method: 'Mix into mouthwash',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
    notes: ['FDA Premium Food Grade safe'],
  },
  {
    number: 33,
    title: "Athlete's Foot Cream",
    image: '10034.jpg',
    method: 'Mix into cream',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 34,
    title: 'Antiseptic',
    image: '10035.jpg',
    method: 'Mix into antiseptic',
    amount: 'Direct: + 1/10 stick / Bottle: 100ml + 1 stick',
  },
  {
    number: 35,
    title: 'Insect Bite Cream',
    image: '10036.jpg',
    method: 'Mix into cream',
    amount: 'Cream + 1/10 stick',
  },
  {
    number: 36,
    title: 'Lip Balm',
    image: '10037.jpg',
    method: 'Mix into lip balm',
    amount: 'Lip balm + 1/10 stick',
    notes: ['Apply to balm or Apply directly first'],
  },
];

type CategoryData = {
  title: string;
  sections: ApplicationSection[];
};

const categories: CategoryData[] = [
  { title: 'Skin Conditions', sections: skinConditions },
  { title: 'Skincare Products', sections: skincareProducts },
  { title: 'Hair Care', sections: hairCare },
  { title: 'Body Care', sections: bodyCare },
  { title: 'Other Personal Care', sections: otherPersonalCare },
];

function SectionCard({ section }: { section: ApplicationSection }) {
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
              <span className="text-[#25C760] font-semibold whitespace-nowrap">Method:</span>
              <span className="text-white/90">{section.method}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-semibold whitespace-nowrap">Amount:</span>
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

function CategorySection({ category }: { category: CategoryData }) {
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
        <SectionCard key={section.number} section={section} />
      ))}
    </div>
  );
}

export default async function ConfidenceHowToPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Page Title */}
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">
          How to Use Confidence
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
            <h2 className="text-white font-bold text-xl mb-4">Apply - Rub In</h2>
            <p className="text-white text-sm leading-relaxed opacity-90">
              Apply Confidence powder directly onto the skin area you want to treat.
              Gently rub the powder in using circular motions. This method is especially
              effective for targeting specific skin concerns like dark spots, acne scars,
              and wound marks.
            </p>
          </div>
          <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-4">Mix - Mix In</h2>
            <p className="text-white text-sm leading-relaxed opacity-90">
              Mix Confidence powder into your existing cosmetics, skincare products, or
              daily essentials. This allows you to enhance the healing properties of
              products you already use and love.
            </p>
          </div>
        </div>

        {/* All 36 Application Sections by Category */}
        {categories.map((category) => (
          <CategorySection key={category.title} category={category} />
        ))}

        {/* Buy button */}
        <div className="text-center py-8">
          <a
            href="/product/confidence"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            To Buy Confidence
          </a>
        </div>

        <div className="text-center py-8">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
