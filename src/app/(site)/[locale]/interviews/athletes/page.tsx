import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Athlete Interviews｜Mazavege Shop',
  description: 'Interviews with athletes who use Mother Vegetable.',
};

type AthleteInterview = {
  name: string;
  nameEn: string;
  sport: string;
  sportEn: string;
  image: string;
  imageAlt: string;
  imageAltEn: string;
  sourceUrl: string;
  profile: string[];
  profileEn: string[];
  achievements: string[];
  achievementsEn: string[];
  motherVegetableUse: string[];
  motherVegetableUseEn: string[];
};

const interviews: AthleteInterview[] = [
  {
    name: '伊藤 友広',
    nameEn: 'Tomohiro Ito',
    sport: '陸上競技 / 400m・4×400mリレー',
    sportEn: 'Track and Field / 400m, 4×400m Relay',
    image: '/images/interviews/ito-tomohiro.jpg',
    imageAlt: '伊藤友広さんのプロフィール画像',
    imageAltEn: 'Profile photo of Tomohiro Ito',
    sourceUrl: 'https://001sprint.com/member/ito/',
    profile: [
      '1982年8月16日生まれ。秋田県出身。',
      '400m自己ベストは45秒63。高校時代に国体少年男子A400mで優勝し、アジアジュニア選手権では400mで5位、4×400mリレーではアンカーとして優勝に貢献。国体成年男子400mでも優勝。',
      'アテネオリンピックでは日本代表として4×400mリレー第3走者を務め、日本過去最高順位となる4位入賞に貢献。',
      '国際陸上競技連盟公認指導者資格（キッズ対象）を取得し、年間1万人以上の小中学生に走りの指導やスクールを展開している。',
    ],
    profileEn: [
      'Born on August 16, 1982, in Akita Prefecture, Japan.',
      'His personal best in the 400m is 45.63 seconds. In high school, he won the Boys A 400m at the National Sports Festival, placed 5th in the 400m at the Asian Junior Championships, and helped Japan win the 4×400m relay as the anchor. He also won the adult men’s 400m at the National Sports Festival.',
      'At the Athens Olympic Games, he represented Japan as the third runner in the 4×400m relay and contributed to Japan’s fourth-place finish, the country’s highest-ever placing in the event at the time.',
      'He holds an IAAF-certified coaching qualification for children and currently teaches running and holds schools for more than 10,000 elementary and junior high school students each year.',
    ],
    achievements: [
      'アテネオリンピック 4×400mリレー 4位入賞',
      '国体少年男子A400m 優勝',
      'アジアジュニア選手権 4×400mリレー 優勝',
      '国体成年男子400m 優勝',
    ],
    achievementsEn: [
      'Athens Olympic Games: 4th place in the 4×400m relay',
      'National Sports Festival Boys A 400m: Champion',
      'Asian Junior Championships 4×400m relay: Champion',
      'National Sports Festival Adult Men’s 400m: Champion',
    ],
    motherVegetableUse: [
      '現在、日本各地の小学校や中学校でかけっこを教えるイベントを行っています。そこでは、ただ体を鍛えるだけでは速く走れないこと、そして自分の体に摂取するものが体を作り、それが速く走ることにつながるということを伝えるために、Mother Vegetableの「Achieve」を飲んでもらいながら、子どもたちの体を健康にしつつ、元気に体を動かす楽しさをお届けしています。',
      '世田谷区や渋谷区、千代田区や板橋区の公立小学校で実際にこのAchieve体験をしてもらっていますが、どんなものに混ぜても飲めるAchieveは、綺麗な緑色に変わるため、そのドリンクの色味が子どもたちのハートを完全にキャッチしています。目で見て栄養を楽しみながら、体の健康についても考えることができるため、お子さんにも保護者の方にもとても好評です。',
      '走ること×食育のコラボレーションをすることで、子どもたちをMother Vegetableとともにサポートできればと考えています。',
    ],
    motherVegetableUseEn: [
      'Ito currently holds running events at elementary and junior high schools across Japan. Through these events, he teaches children that speed does not come only from physical training, but also from what they put into their bodies. By letting them try Mother Vegetable “Achieve,” he helps children think about health while also enjoying the fun of moving their bodies with energy.',
      'Children at public elementary schools in Setagaya, Shibuya, Chiyoda, and Itabashi wards have already experienced Achieve. Because Achieve can be mixed into many kinds of drinks and turns them a beautiful green color, it immediately captures children’s attention. It allows them to enjoy nutrition visually while also thinking about body health, and it has been very well received by both children and parents.',
      'By combining running with food education, he hopes to support children together with Mother Vegetable.',
    ],
  },
  {
    name: '永原 和可那',
    nameEn: 'Wakana Nagahara',
    sport: 'バドミントン / ピックルボール',
    sportEn: 'Badminton / Pickleball',
    image: '/images/interviews/nagahara-wakana.jpg',
    imageAlt: '永原和可那さんのプロフィール画像',
    imageAltEn: 'Profile photo of Wakana Nagahara',
    sourceUrl: 'https://www.waka7gahara.com/',
    profile: [
      '1996年1月9日生まれ。北海道芽室町出身。元バドミントン日本代表選手。',
      '青森山田高校時代にインターハイ団体戦と女子ダブルスの二冠を達成。2014年に北都銀行へ入行し、松本麻佑選手と「ナガマツペア」を結成。',
      '2018年・2019年の世界バドミントン選手権で女子ダブルス2連覇を達成。2019年には世界ランキング1位に輝き、日本の女子ダブルスをけん引した。',
      '東京2020オリンピックでは女子ダブルス5位。パリ2024オリンピックにも出場。2024年の現役引退後は、バドミントンとピックルボールの二刀流アスリートとして、講習・講演・イベント・次世代育成にも取り組んでいる。',
    ],
    profileEn: [
      'Born on January 9, 1996, in Memuro, Hokkaido. Former member of Japan’s national badminton team.',
      'While attending Aomori Yamada High School, she won both the team event and women’s doubles at the Inter-High School Championships. In 2014, she joined Hokuto Bank and formed the “Nagamatsu” pair with Mayu Matsumoto.',
      'She won back-to-back women’s doubles titles at the BWF World Championships in 2018 and 2019. In 2019, she reached world No. 1 and became one of the leading players in Japanese women’s doubles.',
      'She placed 5th in women’s doubles at the Tokyo 2020 Olympic Games and also competed at the Paris 2024 Olympic Games. After retiring from professional badminton in 2024, she has continued activities as a dual-sport athlete in badminton and pickleball, while also working on coaching, lectures, events, and next-generation development.',
    ],
    achievements: [
      '世界バドミントン選手権 女子ダブルス 2連覇（2018年・2019年）',
      '東京2020オリンピック 女子ダブルス 5位',
      'パリ2024オリンピック 出場',
      '2019年 世界ランキング1位',
      '2020年 全英オープン 女子ダブルス優勝',
    ],
    achievementsEn: [
      'BWF World Championships Women’s Doubles: Back-to-back champion in 2018 and 2019',
      'Tokyo 2020 Olympic Games Women’s Doubles: 5th place',
      'Paris 2024 Olympic Games: Competed',
      '2019: World No. 1 ranking',
      '2020 All England Open Women’s Doubles: Champion',
    ],
    motherVegetableUse: [
      '私はバドミントンで世界選手権2連覇（日本初）をしたことがきっかけで、国技がバドミントンであるマレーシアにおいて、Mother Vegetableさんと一緒にコラボイベントを開催させていただきました。',
      'イベントではバドミントンを指導しつつ、メンタル面についてアドバイスをしました。子どもたちはついつい体の鍛錬のみに励んでしまいがちですが、鍛錬だけでは勝ち上がることはできず、精神面が非常に重要です。そこで、精神の安定と体が摂取するものというのは非常に関係性が高く、重金属などのリスクが極めて低いというMother Vegetableの「Achieve」や「Confidence」を愛用して、精神的な安定と体の鍛錬を両立させています。',
      'また、私は出身地が北海道ということもあり、現在は北海道の特産品とMother Vegetableをコラボさせて、地元に恩返しができるように準備を進めているところです。',
      'アスリートは現役時代がピークのように思われるかもしれませんが、Mother Vegetableと出会い、引退後だからこそ地域のために頑張れることがたくさんあると気づきました。これからもMother Vegetableとともに、地域経済や子どもたちのスポーツを支えていきたいと考えています。',
    ],
    motherVegetableUseEn: [
      'After becoming the first Japanese pair to win back-to-back world championships in badminton, Nagahara held a collaborative event with Mother Vegetable in Malaysia, where badminton is a national sport.',
      'At the event, she coached badminton and also spoke about mental strength. Children often focus only on physical training, but training alone is not enough to keep winning; mental strength is extremely important. She believes there is a strong connection between mental stability and what the body takes in, and she uses Mother Vegetable “Achieve” and “Confidence,” which are designed with extremely low heavy-metal risk, to balance mental stability with physical training.',
      'Because she is from Hokkaido, she is also preparing collaborations between Mother Vegetable and Hokkaido specialty products so that she can give back to her hometown.',
      'Athletes are often seen as reaching their peak during their competitive careers, but through Mother Vegetable she realized there are many ways to contribute to local communities precisely after retirement. She hopes to continue supporting regional economies and children’s sports together with Mother Vegetable.',
    ],
  },
];

export default async function AthleteInterviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Interview</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{isEn ? 'Athlete Interviews' : 'アスリートインタビュー'}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl md:leading-10">
            {isEn ? 'Introducing athletes who use Mother Vegetable while supporting the future of sports, local communities, and children.' : 'Mother Vegetableを活用しながら、競技・地域・子どもたちの未来を支えるアスリートの取り組みを紹介します。'}
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-12">
          {interviews.map((interview) => {
            const profile = isEn ? interview.profileEn : interview.profile;
            const achievements = isEn ? interview.achievementsEn : interview.achievements;
            const uses = isEn ? interview.motherVegetableUseEn : interview.motherVegetableUse;
            return (
            <article key={interview.name} className="overflow-hidden rounded-[2rem] border border-[#25C760]/35 bg-white/[0.035] shadow-[0_0_30px_rgba(37,199,96,0.08)]">
              <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
                <div className="relative min-h-[420px] bg-[#25C760]/5">
                  <Image
                    src={interview.image}
                    alt={isEn ? interview.imageAltEn : interview.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 360px"
                    priority={interview.name === '伊藤 友広'}
                  />
                </div>
                <div className="p-7 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#25C760]">{isEn ? interview.sportEn : interview.sport}</p>
                  <h2 className="mt-3 text-3xl font-black md:text-5xl">{isEn ? interview.nameEn : interview.name}</h2>
                  <p className="mt-2 text-lg font-semibold text-gray-400">{isEn ? interview.name : interview.nameEn}</p>

                  <section className="mt-8">
                    <h3 className="text-xl font-black text-[#25C760]">{isEn ? 'Profile' : 'プロフィール'}</h3>
                    <div className="mt-4 space-y-4 text-[15px] leading-8 text-gray-300 md:text-base">
                      {profile.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="mt-8">
                    <h3 className="text-xl font-black text-[#25C760]">{isEn ? 'Major achievements' : '主な成績'}</h3>
                    <ul className="mt-4 space-y-2 text-gray-300">
                      {achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#25C760]" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-8 rounded-3xl border border-[#25C760]/25 bg-[#25C760]/[0.06] p-6">
                    <h3 className="text-xl font-black text-[#25C760]">{isEn ? 'How they use Mother Vegetable' : 'Mother Vegetableを活用してなにをしているか'}</h3>
                    <div className="mt-4 space-y-5 text-[15px] leading-8 text-gray-200 md:text-base">
                      {uses.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <a
                    href={interview.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white no-underline transition hover:border-[#25C760] hover:bg-[#25C760] hover:text-black"
                  >
                    {isEn ? 'View reference profile' : '参考プロフィールを見る'}
                  </a>
                </div>
              </div>
            </article>
          );})}
        </div>
      </section>
    </main>
  );
}
