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
  const isJa = locale === 'ja';

  const dogCatItems: HowToItem[] = [
    {
      id: 1,
      header: isJa ? 'ドライフード' : 'Dry Food',
      image: `${CDN_BASE}/10002.png`,
      title: isJa ? 'ドライフードにForeverを混ぜる' : 'Mix Forever over dry food',
      recommendations: [
        {
          label: isJa ? '体重10kg以上のペットの推奨量' : 'Recommended amount for pets 10kg and over',
          items: [isJa ? 'ドライフード – 適量' : 'Dry food \u2013 as needed', isJa ? 'Forever - 1本' : 'Forever - 1 stick'],
        },
        {
          label: isJa ? '体重10kg未満のペットの推奨量' : 'Recommended amount for pets under 10kg',
          items: [isJa ? 'ドライフード – 適量' : 'Dry food \u2013 as needed', isJa ? 'Forever - 1/2本' : 'Forever - 1/2 stick'],
        },
      ],
      notes: [
        isJa ? '*Foreverを30mlの水で溶かし、ドライフードにかけてください。' : '*Mix Forever with 30ml of water, then pour it over dry food.',
        isJa ? '（そのまま使用すると、ペットの息でパウダーが飛び散ることがあります。）' : '(If used dry, the powder may be blown into the air by your pet\u2019s breath.)',
      ],
    },
    {
      id: 2,
      header: isJa ? 'ウェットフード' : 'Wet Food',
      image: `${CDN_BASE}/10003.png`,
      title: isJa ? 'ウェットフードにForeverを混ぜる' : 'Mix Forever over wet food',
      recommendations: [
        {
          label: isJa ? '体重10kg以上のペットの推奨量' : 'Recommended amount for pets 10kg and over',
          items: [isJa ? 'ウェットフード – 適量' : 'Wet food \u2013 as needed', isJa ? 'Forever - 1本' : 'Forever - 1 stick'],
        },
        {
          label: isJa ? '体重10kg未満のペットの推奨量' : 'Recommended amount for pets under 10kg',
          items: [isJa ? 'ウェットフード – 適量' : 'Wet food \u2013 as needed', isJa ? 'Forever - 1/2本' : 'Forever - 1/2 stick'],
        },
      ],
      notes: [
        isJa ? '*よく混ぜてから与えてください。' : '*Mix well before feeding.',
        isJa ? '（そのまま使用すると、ペットの息でパウダーが飛び散ることがあります。）' : '(If used dry, the powder may be blown into the air by your pet\u2019s breath.)',
      ],
    },
    {
      id: 3,
      header: isJa ? '飲み水' : 'Drinking Water',
      image: `${CDN_BASE}/10004.jpg`,
      title: isJa ? '飲み水にForeverを混ぜる' : 'Mix Forever over drinking water',
      recommendations: [
        {
          label: isJa ? '推奨量' : 'Recommended amount',
          items: [isJa ? '飲み水 – 50ml' : 'Drinking water \u2013 50ml', isJa ? 'Forever - 1/4本' : 'Forever - 1/4 stick'],
        },
      ],
      notes: [
        isJa ? '*ペット、特に中型・大型犬や白い毛のペットは勢いよく飲む場合があるため、体や周囲に飛び散らないようスプーンを使ってください。' : '*Since pets, especially medium and large dogs or those with white fur, may drink vigorously, please use a spoon to avoid splashing on their bodies or nearby areas.',
      ],
    },
    {
      id: 4,
      header: isJa ? 'おやつ' : 'Treats',
      image: `${CDN_BASE}/10005.jpg`,
      title: isJa ? 'おやつにForeverを混ぜる' : 'Mix Forever over treats',
      recommendations: [
        {
          label: isJa ? '推奨量' : 'Recommended amount',
          items: [isJa ? 'おやつ – 適量' : 'Treat \u2013 as needed', isJa ? 'Forever - ごく少量' : 'Forever - a very small amount'],
        },
      ],
      notes: [
        isJa ? '*大量のForeverを単独で舐めると舌に付着する場合があります。おやつの割合を増やして一緒に与えてください。' : '*If a large amount of Forever is licked on its own, it may stick to the tongue. Please increase the proportion of treats and feed them together.',
      ],
    },
  ];

  const otherPetItems: HowToItem[] = [
    {
      id: 5,
      header: isJa ? '魚のエサ' : 'Fish Food',
      image: `${CDN_BASE}/10006.png`,
      title: isJa ? '魚のエサにForeverを混ぜる' : 'Mix Forever into fish food',
      recommendations: [
        {
          label: isJa ? '水槽に直接入れる場合の推奨量' : 'Recommended amount if adding directly to the tank',
          items: [
            isJa ? '魚のエサ – 適量' : 'Fish food \u2013 as needed',
            'Forever - 1/10' + (isJa ? '本' : ' stick') + ' (10\u2113)',
            isJa ? '*1日2〜3回与えてください。' : '*Feed 2-3 times a day.',
          ],
        },
        {
          label: isJa ? 'エサ袋に混ぜる場合の推奨量' : 'Recommended amount if mixing into the food bag',
          items: [
            isJa ? '魚のエサ – 100g' : 'Fish food \u2013 100g',
            isJa ? 'Forever - 1本' : 'Forever - 1 stick',
            isJa ? '*使用前によく振ってください。' : '*Shake well before use.',
          ],
        },
      ],
      notes: [
        isJa ? '*残ったForeverは水槽の植物の栄養になります。' : '*Any leftover Forever will serve as nutrients for the plants in the tank.',
      ],
    },
    {
      id: 6,
      header: isJa ? '鳥のエサ' : 'Bird Food',
      image: `${CDN_BASE}/10007.png`,
      title: isJa ? '鳥のエサにForeverを混ぜる' : 'Mix Forever into bird food',
      recommendations: [
        {
          label: isJa ? '直接入れる場合の推奨量' : 'Recommended amount if adding directly',
          items: [
            isJa ? '鳥のエサ – 適量' : 'Bird food \u2013 as needed',
            isJa ? 'Forever - ごく少量' : 'Forever - a very small amount',
            isJa ? '*よく混ぜてから与えてください。' : '*Mix well before feeding.',
          ],
        },
        {
          label: isJa ? 'エサ袋に混ぜる場合の推奨量' : 'Recommended amount if mixing into the food bag',
          items: [
            isJa ? '鳥のエサ – 100g' : 'Bird food \u2013 100g',
            isJa ? 'Forever - 1本' : 'Forever - 1 stick',
            isJa ? '*使用前によく振ってください。' : '*Shake well before use.',
          ],
        },
      ],
    },
    {
      id: 7,
      header: isJa ? 'ウサギのエサ' : 'Rabbit Food',
      image: `${CDN_BASE}/10008.png`,
      title: isJa ? 'ウサギのエサにForeverを混ぜる' : 'Mix Forever into rabbit food',
      recommendations: [
        {
          label: isJa ? '体重5kg以上のペットの推奨量' : 'Recommended amount for pets 5kg and over',
          items: [isJa ? 'ウサギのエサ – 適量' : 'Rabbit food \u2013 as needed', isJa ? 'Forever - 1/2本' : 'Forever - 1/2 stick'],
        },
        {
          label: isJa ? '体重5kg未満のペットの推奨量' : 'Recommended amount for pets under 5kg',
          items: [isJa ? 'ウサギのエサ – 適量' : 'Rabbit food \u2013 as needed', isJa ? 'Forever - 1/4本' : 'Forever - 1/4 stick'],
        },
      ],
      notes: [isJa ? '*よく混ぜてから与えてください。' : '*Mix well before feeding.'],
    },
    {
      id: 8,
      header: isJa ? 'ハムスターのエサ' : 'Hamster Food',
      image: `${CDN_BASE}/10009.png`,
      title: isJa ? 'ハムスターのエサにForeverを混ぜる' : 'Mix Forever into hamster food',
      recommendations: [
        {
          label: isJa ? '直接入れる場合の推奨量' : 'Recommended amount if adding directly',
          items: [
            isJa ? 'ハムスターのエサ – 適量' : 'Hamster food \u2013 as needed',
            isJa ? 'Forever - ごく少量' : 'Forever - a very small amount',
            isJa ? '*よく混ぜてから与えてください。' : '*Mix well before feeding.',
          ],
        },
        {
          label: isJa ? 'エサ袋に混ぜる場合の推奨量' : 'Recommended amount if mixing into the food bag',
          items: [
            isJa ? 'ハムスターのエサ – 100g' : 'Hamster food \u2013 100g',
            isJa ? 'Forever - 1本' : 'Forever - 1 stick',
            isJa ? '*使用前によく振ってください。' : '*Shake well before use.',
          ],
        },
      ],
    },
    {
      id: 9,
      header: isJa ? '小動物のエサ' : 'Small Pet Food',
      image: `${CDN_BASE}/10010.png`,
      title: isJa ? '小動物のエサにForeverを混ぜる' : 'Mix Forever into small pet food',
      recommendations: [
        {
          label: isJa ? '体重5kg以上のペットの推奨量' : 'Recommended amount for pets 5kg and over',
          items: [isJa ? '小動物のエサ – 適量' : 'Small pet food \u2013 as needed', isJa ? 'Forever - 1/2本' : 'Forever - 1/2 stick'],
        },
        {
          label: isJa ? '体重5kg未満のペットの推奨量' : 'Recommended amount for pets under 5kg',
          items: [isJa ? '小動物のエサ – 適量' : 'Small pet food \u2013 as needed', isJa ? 'Forever - 1/4本' : 'Forever - 1/4 stick'],
        },
      ],
      notes: [isJa ? '*よく混ぜてから与えてください。' : '*Mix well before feeding.'],
    },
    {
      id: 10,
      header: isJa ? '昆虫のエサ' : 'Insect Food',
      image: `${CDN_BASE}/10011.jpg`,
      title: isJa ? '昆虫のエサにForeverを混ぜる' : 'Mix Forever into insect food',
      recommendations: [
        {
          label: isJa ? '推奨量' : 'Recommended amount',
          items: [isJa ? 'ゼリー – 1個' : 'Jelly \u2013 1 piece', isJa ? 'Forever - 1/10本' : 'Forever - 1/10 stick'],
        },
      ],
    },
  ];

  const otherUseItems: HowToItem[] = [
    {
      id: 11,
      header: isJa ? '爬虫類の飲み水' : 'Drinking Water for Reptiles',
      image: `${CDN_BASE}/10012.png`,
      title: isJa ? '爬虫類の飲み水にForeverを混ぜる' : 'Mix Forever into drinking water for reptiles',
      recommendations: [
        {
          label: isJa ? '推奨量' : 'Recommended amount',
          items: [isJa ? '飲み水 - 50ml' : 'Drinking water - 50ml', isJa ? 'Forever - 1/4本' : 'Forever - 1/4 stick'],
        },
      ],
    },
    {
      id: 12,
      header: isJa ? '観葉植物' : 'Houseplants',
      image: `${CDN_BASE}/10013.jpg`,
      title: isJa ? 'Foreverを水に混ぜて観葉植物に与える' : 'Mix Forever with water and apply to houseplants',
      recommendations: [
        {
          label: isJa ? '推奨量' : 'Recommended amount',
          items: [isJa ? '水 - 1000ml' : 'Water - 1000ml', isJa ? 'Forever - 1/2本' : 'Forever - 1/2 stick'],
        },
      ],
      notes: [isJa ? '*6インチ（約18cm）の鉢には週1回与えてください。' : '*For a 6-inch (about 18cm) pot, apply once a week.'],
    },
  ];

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Page Title */}
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">
          {isJa ? 'Foreverの使い方' : 'How to Use Forever'}
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
            {isJa ? '犬＆猫' : 'Dog & Cat'}
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
            {isJa ? 'その他のペット' : 'Other Pets'}
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
            {isJa ? 'その他の使い方' : 'Other Uses'}
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
            {isJa ? 'Foreverを購入する' : 'To Buy Forever'}
          </a>
        </div>
      </div>
    </div>
  );
}
