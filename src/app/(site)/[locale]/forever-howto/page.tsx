import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Use Forever for Pets',
  description: 'Learn how to use Mother Vegetable Forever supplement to support your pet\'s health and longevity.',
};

const CDN_BASE = 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever';

type HowToItem = {
  id: number;
  header: string;
  image: string;
  title: string;
  recommendations: {
    label: string;
    items: string[];
  }[];
  notes?: string[];
};

const dogCatItems: HowToItem[] = [
  {
    id: 1,
    header: 'Dry Food',
    image: `${CDN_BASE}/10002.png`,
    title: 'Mix Forever over dry food',
    recommendations: [
      {
        label: 'Recommended amount for pets 10kg and over',
        items: ['Dry food \u2013 as needed', 'Forever - 1 stick'],
      },
      {
        label: 'Recommended amount for pets under 10kg',
        items: ['Dry food \u2013 as needed', 'Forever - 1/2 stick'],
      },
    ],
    notes: [
      '*Mix Forever with 30ml of water, then pour it over dry food.',
      '(If used dry, the powder may be blown into the air by your pet\u2019s breath.)',
    ],
  },
  {
    id: 2,
    header: 'Wet Food',
    image: `${CDN_BASE}/10003.png`,
    title: 'Mix Forever over wet food',
    recommendations: [
      {
        label: 'Recommended amount for pets 10kg and over',
        items: ['Wet food \u2013 as needed', 'Forever - 1 stick'],
      },
      {
        label: 'Recommended amount for pets under 10kg',
        items: ['Wet food \u2013 as needed', 'Forever - 1/2 stick'],
      },
    ],
    notes: [
      '*Mix well before feeding.',
      '(If used dry, the powder may be blown into the air by your pet\u2019s breath.)',
    ],
  },
  {
    id: 3,
    header: 'Drinking Water',
    image: `${CDN_BASE}/10004.jpg`,
    title: 'Mix Forever over drinking water',
    recommendations: [
      {
        label: 'Recommended amount',
        items: ['Drinking water \u2013 50ml', 'Forever - 1/4 stick'],
      },
    ],
    notes: [
      '*Since pets, especially medium and large dogs or those with white fur, may drink vigorously, please use a spoon to avoid splashing on their bodies or nearby areas.',
    ],
  },
  {
    id: 4,
    header: 'Treats',
    image: `${CDN_BASE}/10005.jpg`,
    title: 'Mix Forever over treats',
    recommendations: [
      {
        label: 'Recommended amount',
        items: ['Treat \u2013 as needed', 'Forever - a very small amount'],
      },
    ],
    notes: [
      '*If a large amount of Forever is licked on its own, it may stick to the tongue. Please increase the proportion of treats and feed them together.',
    ],
  },
];

const otherPetItems: HowToItem[] = [
  {
    id: 5,
    header: 'Fish Food',
    image: `${CDN_BASE}/10006.png`,
    title: 'Mix Forever into fish food',
    recommendations: [
      {
        label: 'Recommended amount if adding directly to the tank',
        items: [
          'Fish food \u2013 as needed',
          'Forever - 1/10 stick (10\u2113)',
          '*Feed 2-3 times a day.',
        ],
      },
      {
        label: 'Recommended amount if mixing into the food bag',
        items: [
          'Fish food \u2013 100g',
          'Forever - 1 stick',
          '*Shake well before use.',
        ],
      },
    ],
    notes: [
      '*Any leftover Forever will serve as nutrients for the plants in the tank.',
    ],
  },
  {
    id: 6,
    header: 'Bird Food',
    image: `${CDN_BASE}/10007.png`,
    title: 'Mix Forever into bird food',
    recommendations: [
      {
        label: 'Recommended amount if adding directly',
        items: [
          'Bird food \u2013 as needed',
          'Forever - a very small amount',
          '*Mix well before feeding.',
        ],
      },
      {
        label: 'Recommended amount if mixing into the food bag',
        items: [
          'Bird food \u2013 100g',
          'Forever - 1 stick',
          '*Shake well before use.',
        ],
      },
    ],
  },
  {
    id: 7,
    header: 'Rabbit Food',
    image: `${CDN_BASE}/10008.png`,
    title: 'Mix Forever into rabbit food',
    recommendations: [
      {
        label: 'Recommended amount for pets 5kg and over',
        items: ['Rabbit food \u2013 as needed', 'Forever - 1/2 stick'],
      },
      {
        label: 'Recommended amount for pets under 5kg',
        items: ['Rabbit food \u2013 as needed', 'Forever - 1/4 stick'],
      },
    ],
    notes: ['*Mix well before feeding.'],
  },
  {
    id: 8,
    header: 'Hamster Food',
    image: `${CDN_BASE}/10009.png`,
    title: 'Mix Forever into hamster food',
    recommendations: [
      {
        label: 'Recommended amount if adding directly',
        items: [
          'Hamster food \u2013 as needed',
          'Forever - a very small amount',
          '*Mix well before feeding.',
        ],
      },
      {
        label: 'Recommended amount if mixing into the food bag',
        items: [
          'Hamster food \u2013 100g',
          'Forever - 1 stick',
          '*Shake well before use.',
        ],
      },
    ],
  },
  {
    id: 9,
    header: 'Small Pet Food',
    image: `${CDN_BASE}/10010.png`,
    title: 'Mix Forever into small pet food',
    recommendations: [
      {
        label: 'Recommended amount for pets 5kg and over',
        items: ['Small pet food \u2013 as needed', 'Forever - 1/2 stick'],
      },
      {
        label: 'Recommended amount for pets under 5kg',
        items: ['Small pet food \u2013 as needed', 'Forever - 1/4 stick'],
      },
    ],
    notes: ['*Mix well before feeding.'],
  },
  {
    id: 10,
    header: 'Insect Food',
    image: `${CDN_BASE}/10011.jpg`,
    title: 'Mix Forever into insect food',
    recommendations: [
      {
        label: 'Recommended amount',
        items: ['Jelly \u2013 1 piece', 'Forever - 1/10 stick'],
      },
    ],
  },
];

const otherUseItems: HowToItem[] = [
  {
    id: 11,
    header: 'Drinking Water for Reptiles',
    image: `${CDN_BASE}/10012.png`,
    title: 'Mix Forever into drinking water for reptiles',
    recommendations: [
      {
        label: 'Recommended amount',
        items: ['Drinking water - 50ml', 'Forever - 1/4 stick'],
      },
    ],
  },
  {
    id: 12,
    header: 'Houseplants',
    image: `${CDN_BASE}/10013.jpg`,
    title: 'Mix Forever with water and apply to houseplants',
    recommendations: [
      {
        label: 'Recommended amount',
        items: ['Water - 1000ml', 'Forever - 1/2 stick'],
      },
    ],
    notes: ['*For a 6-inch (about 18cm) pot, apply once a week.'],
  },
];

function HowToCard({ item }: { item: HowToItem }) {
  return (
    <section className="bg-black border border-[#25C760] rounded-xl p-4 md:p-6 mb-6">
      <h4 className="text-[#25C760] font-bold text-lg mb-4">{item.header}</h4>
      <div className="flex flex-col md:flex-row gap-5">
        {/* Image */}
        <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
          <Image
            src={item.image}
            alt={item.header}
            width={240}
            height={240}
            className="rounded-lg object-contain w-[200px] h-auto md:w-[240px]"
          />
        </div>
        {/* Content */}
        <div className="flex-1">
          <h5 className="text-white font-bold text-base md:text-lg mb-4">{item.title}</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            {item.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-black/50 border border-[#25C760]/30 rounded-lg p-3">
                <p className="text-[#25C760] text-sm font-semibold mb-2">
                  {'\u3010'}{rec.label}{'\u3011'}
                </p>
                {rec.items.map((line, i) => {
                  const isNote = line.startsWith('*');
                  return (
                    <p key={i} className={`text-white text-sm leading-relaxed ${isNote ? 'text-white/70 mt-1 text-xs' : ''}`}>
                      {isNote ? line : `${String.fromCharCode(0x2460 + i)}${line}`}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
          {item.notes && item.notes.length > 0 && (
            <div className="mt-2">
              {item.notes.map((note, idx) => (
                <p key={idx} className="text-white/60 text-xs leading-relaxed">{note}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function ForeverHowToPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Page Title */}
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">
          How to Use Forever
        </h1>
        <Image
          src="/Images/Assets/homepage/underline.png"
          alt="Underline"
          width={250}
          height={10}
          className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]"
        />

        {/* Hero Image */}
        <div className="flex justify-center pb-6">
          <Image
            src={`${CDN_BASE}/10001.png`}
            alt="Forever Product"
            width={800}
            height={400}
            className="w-full max-w-[800px] h-auto rounded-xl"
          />
        </div>

        {/* ===== Dog & Cat Section ===== */}
        <div className="mb-4">
          <h3 className="text-[#25C760] font-bold text-xl md:text-2xl text-center mb-6 tracking-wide">
            Dog &amp; Cat
          </h3>
          {dogCatItems.map((item) => (
            <HowToCard key={item.id} item={item} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center py-4 mb-4">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} />
        </div>

        {/* ===== Other Pets Section ===== */}
        <div className="mb-4">
          <h3 className="text-[#25C760] font-bold text-xl md:text-2xl text-center mb-6 tracking-wide">
            Other Pets
          </h3>
          {otherPetItems.map((item) => (
            <HowToCard key={item.id} item={item} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center py-4 mb-4">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} />
        </div>

        {/* ===== Other Uses Section ===== */}
        <div className="mb-4">
          <h3 className="text-[#25C760] font-bold text-xl md:text-2xl text-center mb-6 tracking-wide">
            Other Uses
          </h3>
          {otherUseItems.map((item) => (
            <HowToCard key={item.id} item={item} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center py-4">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} />
        </div>

        {/* Buy link */}
        <div className="text-center py-8">
          <a
            href="/product/forever"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            To Buy Forever
          </a>
        </div>
      </div>
    </div>
  );
}
