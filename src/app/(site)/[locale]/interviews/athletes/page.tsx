import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'アスリートインタビュー｜Mazavege Shop',
  description: 'Mother Vegetableを活用するアスリートのインタビューを紹介します。',
};

type AthleteInterview = {
  name: string;
  nameEn: string;
  sport: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  profile: string[];
  achievements: string[];
  motherVegetableUse: string[];
};

const interviews: AthleteInterview[] = [
  {
    name: '伊藤 友広',
    nameEn: 'Tomohiro Ito',
    sport: '陸上競技 / 400m・4×400mリレー',
    image: '/images/interviews/ito-tomohiro.jpg',
    imageAlt: '伊藤友広さんのプロフィール画像',
    sourceUrl: 'https://001sprint.com/member/ito/',
    profile: [
      '1982年8月16日生まれ。秋田県出身。',
      '400m自己ベストは45秒63。高校時代に国体少年男子A400mで優勝し、アジアジュニア選手権では400mで5位、4×400mリレーではアンカーとして優勝に貢献。国体成年男子400mでも優勝。',
      'アテネオリンピックでは日本代表として4×400mリレー第3走者を務め、日本過去最高順位となる4位入賞に貢献。',
      '国際陸上競技連盟公認指導者資格（キッズ対象）を取得し、年間1万人以上の小中学生に走りの指導やスクールを展開している。',
    ],
    achievements: [
      'アテネオリンピック 4×400mリレー 4位入賞',
      '国体少年男子A400m 優勝',
      'アジアジュニア選手権 4×400mリレー 優勝',
      '国体成年男子400m 優勝',
    ],
    motherVegetableUse: [
      '現在、日本各地の小学校や中学校でかけっこを教えるイベントを行っています。そこでは、ただ体を鍛えるだけでは速く走れないこと、そして自分の体に摂取するものが体を作り、それが速く走ることにつながるということを伝えるために、Mother Vegetableの「Achieve」を飲んでもらいながら、子どもたちの体を健康にしつつ、元気に体を動かす楽しさをお届けしています。',
      '世田谷区や渋谷区、千代田区や板橋区の公立小学校で実際にこのAchieve体験をしてもらっていますが、どんなものに混ぜても飲めるAchieveは、綺麗な緑色に変わるため、そのドリンクの色味が子どもたちのハートを完全にキャッチしています。目で見て栄養を楽しみながら、体の健康についても考えることができるため、お子さんにも保護者の方にもとても好評です。',
      '走ること×食育のコラボレーションをすることで、子どもたちをMother Vegetableとともにサポートできればと考えています。',
    ],
  },
  {
    name: '永原 和可那',
    nameEn: 'Wakana Nagahara',
    sport: 'バドミントン / ピックルボール',
    image: '/images/interviews/nagahara-wakana.jpg',
    imageAlt: '永原和可那さんのプロフィール画像',
    sourceUrl: 'https://www.waka7gahara.com/',
    profile: [
      '1996年1月9日生まれ。北海道芽室町出身。元バドミントン日本代表選手。',
      '青森山田高校時代にインターハイ団体戦と女子ダブルスの二冠を達成。2014年に北都銀行へ入行し、松本麻佑選手と「ナガマツペア」を結成。',
      '2018年・2019年の世界バドミントン選手権で女子ダブルス2連覇を達成。2019年には世界ランキング1位に輝き、日本の女子ダブルスをけん引した。',
      '東京2020オリンピックでは女子ダブルス5位。パリ2024オリンピックにも出場。2024年の現役引退後は、バドミントンとピックルボールの二刀流アスリートとして、講習・講演・イベント・次世代育成にも取り組んでいる。',
    ],
    achievements: [
      '世界バドミントン選手権 女子ダブルス 2連覇（2018年・2019年）',
      '東京2020オリンピック 女子ダブルス 5位',
      'パリ2024オリンピック 出場',
      '2019年 世界ランキング1位',
      '2020年 全英オープン 女子ダブルス優勝',
    ],
    motherVegetableUse: [
      '私はバドミントンで世界選手権2連覇（日本初）をしたことがきっかけで、国技がバドミントンであるマレーシアにおいて、Mother Vegetableさんと一緒にコラボイベントを開催させていただきました。',
      'イベントではバドミントンを指導しつつ、メンタル面についてアドバイスをしました。子どもたちはついつい体の鍛錬のみに励んでしまいがちですが、鍛錬だけでは勝ち上がることはできず、精神面が非常に重要です。そこで、精神の安定と体が摂取するものというのは非常に関係性が高く、重金属などのリスクが極めて低いというMother Vegetableの「Achieve」や「Confidence」を愛用して、精神的な安定と体の鍛錬を両立させています。',
      'また、私は出身地が北海道ということもあり、現在は北海道の特産品とMother Vegetableをコラボさせて、地元に恩返しができるように準備を進めているところです。',
      'アスリートは現役時代がピークのように思われるかもしれませんが、Mother Vegetableと出会い、引退後だからこそ地域のために頑張れることがたくさんあると気づきました。これからもMother Vegetableとともに、地域経済や子どもたちのスポーツを支えていきたいと考えています。',
    ],
  },
];

export default async function AthleteInterviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Interview</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">アスリートインタビュー</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl md:leading-10">
            Mother Vegetableを活用しながら、競技・地域・子どもたちの未来を支えるアスリートの取り組みを紹介します。
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-12">
          {interviews.map((interview) => (
            <article key={interview.name} className="overflow-hidden rounded-[2rem] border border-[#25C760]/35 bg-white/[0.035] shadow-[0_0_30px_rgba(37,199,96,0.08)]">
              <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
                <div className="relative min-h-[420px] bg-[#25C760]/5">
                  <Image
                    src={interview.image}
                    alt={interview.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 360px"
                    priority={interview.name === '伊藤 友広'}
                  />
                </div>
                <div className="p-7 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#25C760]">{interview.sport}</p>
                  <h2 className="mt-3 text-3xl font-black md:text-5xl">{interview.name}</h2>
                  <p className="mt-2 text-lg font-semibold text-gray-400">{interview.nameEn}</p>

                  <section className="mt-8">
                    <h3 className="text-xl font-black text-[#25C760]">プロフィール</h3>
                    <div className="mt-4 space-y-4 text-[15px] leading-8 text-gray-300 md:text-base">
                      {interview.profile.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="mt-8">
                    <h3 className="text-xl font-black text-[#25C760]">主な成績</h3>
                    <ul className="mt-4 space-y-2 text-gray-300">
                      {interview.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#25C760]" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-8 rounded-3xl border border-[#25C760]/25 bg-[#25C760]/[0.06] p-6">
                    <h3 className="text-xl font-black text-[#25C760]">Mother Vegetableを活用してなにをしているか</h3>
                    <div className="mt-4 space-y-5 text-[15px] leading-8 text-gray-200 md:text-base">
                      {interview.motherVegetableUse.map((paragraph) => (
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
                    参考プロフィールを見る
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
