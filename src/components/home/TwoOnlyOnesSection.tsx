'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useState, useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function TwoOnlyOnesSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';

  const [isMuted1, setIsMuted1] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const toggleMute = (ref: React.RefObject<HTMLVideoElement | null>, isMuted: boolean, setMuted: (v: boolean) => void) => {
    const video = ref.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (video.paused) {
      void video.play().catch(() => {});
    }
    setMuted(nextMuted);
  };

  const MuteButton = ({ isMuted, onClick }: { isMuted: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      aria-label={isMuted ? (isJa ? 'ミュート解除' : 'Unmute') : (isJa ? 'ミュート' : 'Mute')}
      className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full bg-black/40 px-3 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M4 9v6h3l4 3V6l-4 3H4z" />
          <line x1="16" y1="9" x2="20" y2="13" />
          <line x1="20" y1="9" x2="16" y2="13" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M4 9v6h3l4 3V6l-4 3H4z" />
          <path d="M16 9a4 4 0 0 1 0 6" />
          <path d="M18.5 7.5a7 7 0 0 1 0 9" />
        </svg>
      )}
    </button>
  );

  return (
    <motion.div
      className="pt-12 md:pt-20 pb-4 md:pb-32 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-0 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-12">
            {isJa ? '２つのオンリーワン' : 'Two Only Ones'}
          </h2>

          <div className="text-xs md:text-base text-gray-300 max-w-5xl mx-auto">
            {/* Desktop View */}
            <p className="hidden md:block leading-[2] whitespace-pre-line">
              {isJa ? (
                <>
                  MOTHER VEGETABLE PROJECTは{'\n'}2つのオンリーワン事業を中心として地球とすべての生命の回復を目指す世界唯一のプロジェクトです。{'\n\n'}このプロセスにおいて、各施設は24時間365日CO<sub>2</sub>を吸収し酸素を生成することで大気を浄化します。{'\n'}それと同時に生成されるマザーベジタブル製品および魚貝類の養殖業により、人間と生物の健康向上に貢献します。{'\n\n'}またその施設を世界各地に展開することで、さらに8つの産業分野に発展することが可能です。
                </>
              ) : (
                <>
                  The MOTHER VEGETABLE PROJECT is{'\n'}the world&apos;s only project that aims to restore the Earth and all life,{'\n'}centered around two one-of-a-kind businesses.{'\n\n'}In this process, each facility purifies the atmosphere by absorbing CO<sub>2</sub>{'\n'}and generating oxygen 24 hours a day, 365 days a year,{'\n'}while simultaneously contributing to improving the health of humans{'\n'}and living organisms through Mother Vegetable products and the aquaculture of fish and shellfish.{'\n\n'}Furthermore, by expanding these facilities around the world,{'\n'}it will develop into eight additional industrial sectors.
                </>
              )}
            </p>

            {/* Mobile View */}
            <div className="block md:hidden leading-[2] text-[10px] text-center px-4">
              {isJa ? (
                <>
                  <p className="mb-4">MOTHER VEGETABLE PROJECTは2つのオンリーワン事業を中心として地球とすべての生命の回復を目指す世界唯一のプロジェクトです。</p>
                  <p className="mb-4">このプロセスにおいて、各施設は24時間365日CO<sub>2</sub>を吸収し酸素を生成することで大気を浄化します。それと同時に生成されるマザーベジタブル製品および魚貝類の養殖業により、人間と生物の健康向上に貢献します。</p>
                  <p>またその施設を世界各地に展開することで、さらに8つの産業分野に発展することが可能です。</p>
                </>
              ) : (
                <>
                  <p className="mb-4">The MOTHER VEGETABLE PROJECT is the world&apos;s only project that aims to restore the Earth and all life, centered around two one-of-a-kind businesses.</p>
                  <p className="mb-4">In this process, each facility purifies the atmosphere by absorbing CO<sub>2</sub> and generating oxygen 24 hours a day, 365 days a year, while simultaneously contributing to improving the health of humans and living organisms through Mother Vegetable products and the aquaculture of fish and shellfish.</p>
                  <p>Furthermore, by expanding these facilities around the world, it will develop into eight additional industrial sectors.</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-0 md:p-8 mb-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Left Section - I */}
            <motion.div variants={cardVariants} className="flex flex-col">
              <div className="flex items-center justify-center mb-8">
                <div className="relative px-6 py-3">
                  <span className="text-lg md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{'\u2160'}</span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col border border-green-400 rounded-lg w-[97%] md:w-full mx-auto">
                <div className="flex-grow">
                  <div className="flex justify-center my-6">
                    <div>
                      <h3 className="text-green-400 text-xl md:text-2xl font-semibold text-center mb-10">
                        Mother Vegetable
                      </h3>
                      <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg mx-auto">
                        <Image
                          src="/Images/Assets/homepage/mother-vegetable-microscopic.png"
                          alt={isJa ? 'マザーベジタブル' : 'Mother Vegetable'}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-[1.9] whitespace-pre-line mb-4 text-sm md:text-base">
                    {isJa
                      ? '地球最初の植物であるマザーベジタブルが人類に至るまでの進化を研究。以下の3種類のマザーベジタブルを提供しています。'
                      : "Researching the evolution of Mother Vegetable, Earth's first plant, leading up to humanity. We offer the following three types of Mother Vegetable products."}
                  </p>

                  <div className="space-y-2">
                    <p className="text-green-400 font-semibold text-sm md:text-base">
                      {isJa ? '① 食品：' : '\u2460 Food:'}
                    </p>
                    <p className="text-white text-sm md:text-base">
                      {isJa
                        ? '人類に必要な48種類の栄養素を含む飲用タイプ。'
                        : 'A drinkable type containing 48 nutrients essential for humanity.'}
                    </p>

                    <p className="text-green-400 font-semibold text-sm md:text-base">
                      {isJa ? '② スキンケア：' : '\u2461 Skincare:'}
                    </p>
                    <p className="text-white text-sm md:text-base">
                      {isJa ? '肌を整えるスキンケアタイプ' : 'A skincare type that conditions the skin.'}
                    </p>

                    <p className="text-green-400 font-semibold text-sm md:text-base">
                      {isJa ? '③ 魚貝類の養殖：' : '\u2462 Aquaculture of Fish and Shellfish:'}
                    </p>
                    <p className="text-white text-sm md:text-base">
                      {isJa
                        ? '化学物質が一切なく、魚貝類の養殖に使用する高タンパク質の飼料タイプ。'
                        : 'A high-protein feed type, completely free of chemicals, used for aquaculture of fish and shellfish.'}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative w-[65%] md:w-1/2 mx-auto">
                    <video
                      ref={videoRef1}
                      className="w-full h-auto rounded-lg"
                      src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/mazavege_top.mp4"
                      autoPlay
                      loop
                      muted={isMuted1}
                      playsInline
                    />
                    <MuteButton isMuted={isMuted1} onClick={() => toggleMute(videoRef1, isMuted1, setIsMuted1)} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - II */}
            <motion.div variants={cardVariants} className="flex flex-col">
              <div className="flex items-center justify-center mb-8">
                <div className="relative px-6 py-3">
                  <span className="text-lg md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{'\u2161'}</span>
                </div>
              </div>

              <div className="p-6 border border-green-400 rounded-lg flex-grow flex flex-col w-[97%] md:w-full mx-auto">
                <div className="flex-grow">
                  <div className="my-6">
                    <h3 className="text-green-400 text-xl md:text-2xl font-semibold text-center mb-10">
                      Small Earth Factory (SEF)
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                      <div className="w-full md:max-w-xs h-48 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src="/Images/Assets/homepage/sef-solar-panels.jpg"
                          alt={isJa ? 'MOTHER VEGETABLE培養システム' : 'MV Cultivation System'}
                          width={300}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full md:max-w-xs h-48 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src="/Images/Assets/homepage/sef.png"
                          alt={isJa ? 'MOTHER VEGETABLEファクトリー' : 'MV Factory'}
                          width={300}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-green-400 font-semibold text-sm md:text-base">
                      {'\u2460'} CO<sub>2</sub> offset:
                    </p>
                    <p className="text-white mb-3 text-sm md:text-base">
                      {isJa ? (
                        <>マザーベジタブル生産の過程でCO<sub>2</sub>を吸収し（天然スギの700倍）、O<sub>2</sub>の排出をする、「小さな地球」を再現。</>
                      ) : (
                        <>Absorbing CO<sub>2</sub> (700 times that of natural cedar) and emitting O<sub>2</sub> in the process of Mother Vegetable production, recreating a &quot;Small Earth.&quot;</>
                      )}
                    </p>

                    <p className="text-green-400 font-semibold text-sm md:text-base">
                      {'\u2461'} ZERO Emission:
                    </p>
                    <p className="text-white mb-3 text-sm md:text-base">
                      {isJa ? (
                        <>外部電力、化石燃料などCO<sub>2</sub>を排出するエネルギーを一切使用せず稼働が可能。</>
                      ) : (
                        <>Capable of operating without using any CO<sub>2</sub>-emitting energy sources, including external electricity or fossil fuels.</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative w-[65%] md:w-1/2 mx-auto">
                    <video
                      ref={videoRef2}
                      className="w-full h-auto rounded-lg"
                      src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/sef_top.mp4"
                      autoPlay
                      loop
                      muted={isMuted2}
                      playsInline
                    />
                    <MuteButton isMuted={isMuted2} onClick={() => toggleMute(videoRef2, isMuted2, setIsMuted2)} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
