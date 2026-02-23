'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale } from 'next-intl';

/* ------------------------------------------------------------------ */
/* Comparison Slider                                                    */
/* ------------------------------------------------------------------ */

function ComparisonSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(newPos);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches[0]) updatePosition(e.touches[0].clientX);
    };
    const handleEnd = () => { isDragging.current = false; };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [updatePosition]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none border-2 border-[#25c760]"
      onClick={(e) => updatePosition(e.clientX)}
    >
      <Image src={afterImage} alt="After" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <Image src={beforeImage} alt="Before" fill className="object-cover" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute top-0 bottom-0 w-0.5 bg-[#25c760]" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#25c760] rounded-full flex items-center justify-center cursor-ew-resize border-2 border-black"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <span className="text-black text-sm font-bold">{'\u27F7'}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before & After Modal                                                 */
/* ------------------------------------------------------------------ */

function BeforeAfterModal({ isOpen, onClose, isJa }: { isOpen: boolean; onClose: () => void; isJa: boolean }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const beforeAfterData = [
    {
      title: isJa ? '50代女性・3週間後' : 'Female, 50s \u00B7 After 3 weeks of use',
      description: isJa
        ? '年を重ねるにつれて頬のシミが気になっていたのですが、3週間ほど塗い続けると、シミが目立たなくなり、肌もトーンアップして自信を持てるようになりました。'
        : 'As I got older, dark spots and under-eye shadows became more visible. After using this for a few weeks, my skin looked softer, brighter, and I felt confident again.',
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_6.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_6.png',
      beforeText: isJa ? '頬のシミが目立ち、メイク崩れも気になっていた。' : 'Noticeable dark spots and under-eye circles, with makeup easily coming off by afternoon.',
      afterText: isJa ? 'シミが目立たなくなり、自然なトーンアップを実現。メイクの持ちも良くなった。' : 'Spots appeared lighter and more diffused, giving a brighter, even-toned look. Foundation stayed on better and looked smoother.',
    },
    {
      title: isJa ? '80代女性・1ヶ月後' : 'Woman in her 80s \u00B7 1 month of use',
      description: isJa
        ? 'ずっと治らなかったシミが、1ヶ月間塗り込んで使用すると徐々に薄くなり、大きなシミは気にならなくなりました。年を重ねても、Confidenceで適切にケアすれば改善するのを実感しました。'
        : 'The dark spots that had been prominent gradually faded, and my overall complexion became more even. I realized that even as we age, when we care for our skin properly, it truly responds.',
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_7.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_7.png',
      beforeText: isJa ? '腕にある複数のシミがずっと治らなかった。' : 'Multiple dark spots on the arms and cheeks with an overall dull tone.',
      afterText: isJa ? '大きなシミは完全に消えて、全体的にシミの色が薄くなった。' : 'Spots have lightened, skin tone looks more even, and firmness has returned for renewed confidence in bare skin.',
    },
    {
      title: isJa ? '40代女性・3日後' : 'Female, 40s \u00B7 After 3 days of use',
      description: isJa
        ? '処方クリームに混ぜて使い始めると、3日後にはひび割れがなくなって、赤みが目立たなくなってきました。かゆみも少なくなって、今はすごく快適です。これからも使い続けます。'
        : "I started using it together with my prescribed cream, and within three days the flakiness and redness noticeably improved. My skin felt smoother, less itchy, and much more comfortable. I\u2019ll definitely keep using it.",
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_1.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_1.png',
      beforeText: isJa ? '乾燥による痒みやカサつきに悩んでいた。' : 'Visible dry patches and rough texture caused by dryness.',
      afterText: isJa ? '痒みがおさまり、カサつきもなくなったので快適そうです。' : 'Redness visibly reduced, and small red spots became lighter and less noticeable.',
    },
    {
      title: isJa ? '10歳男の子・10日後' : 'Male, age 10 \u00B7 After 10 days of use',
      description: isJa
        ? 'カサつきと痒みに悩んでいましたが、ステロイドを使うのは避けたかったので、Confidenceでケアをしていました。すると、わずか10日で痒みやカサつきが治まり、今はすごく快適そうです。'
        : 'We wanted to avoid using steroids, so we continued gentle daily care. In just 10 days, the flakiness and redness calmed down, and his skin looked much cleaner and smoother.',
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_2.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_2.png',
      beforeText: isJa ? '乾燥による痒みやカサつきに悩んでいた。' : 'Visible dry patches and rough texture caused by dryness.',
      afterText: isJa ? '痒みがおさまり、カサつきもなくなったので快適そうです。' : 'Redness visibly reduced, and small red spots became lighter and less noticeable.',
    },
    {
      title: isJa ? '5歳男の子・2日後' : 'Male, age 5 \u00B7 After 2 days of use',
      description: isJa
        ? '硬水の刺激や乾燥で赤みが出ていましたが、ハンドクリームと一緒に使い始めると、たった2日で目に見えて症状が治まりました。'
        : 'Because his hands were easily irritated by hard water, we used this together with hand cream. Within just two days, the roughness faded and his skin became noticeably smoother.',
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_5.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_5.png',
      beforeText: isJa ? '手首から手の甲にかけて目に見える赤みと乾燥。' : 'Visible redness and dryness from the wrist to the back of the hand.',
      afterText: isJa ? '赤みがなくなり、乾燥も抑えられました。' : 'Skin appeared smoother, more even, and visibly healthier\u2014with a clean, natural glow even in photos.',
    },
    {
      title: isJa ? '50代女性・10時間後' : 'Female, 50s \u00B7 After 10 hours of use',
      description: isJa
        ? '寝る前にConfidenceを塗り、翌朝確認すると、たった10時間なのに炎症がかなり抑えられて、赤みも少なくなっていて驚きました。'
        : "I had been struggling with redness and swelling that wouldn\u2019t go away. After applying it before bed, the dryness eased, and by morning the redness had noticeably calmed.",
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_3.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_3.png',
      beforeText: isJa ? '怪我による炎症とかさぶた。' : 'Circular red area near the wrist with scabbing and visible inflammation.',
      afterText: isJa ? 'Confidenceを塗布後わずか10時間で炎症がかなり抑えられました。' : 'Skin appeared more hydrated and even-toned, with reduced redness and swelling.',
    },
    {
      title: isJa ? '50代女性・2日後' : 'Female, 50s \u00B7 After 2 days of use',
      description: isJa
        ? '1ヶ月以上治らなかったやけどの痕が、2日も経たない間に傷跡が薄くなって、赤みも少なくなりました。'
        : "My burn hadn\u2019t healed for over a month, but after applying it at night, the dryness eased. Within 48 hours, the redness visibly calmed down and my skin felt more comfortable.",
      beforeImage: '/Images/Assets/homepage/beforeAfter/before_4.png',
      afterImage: '/Images/Assets/homepage/beforeAfter/after_4.png',
      beforeText: isJa ? '1ヶ月間改善しなかった腕のやけどや赤み、乾燥に悩まされていた。' : "Persistent redness and dryness from an arm burn that hadn\u2019t improved for a month.",
      afterText: isJa ? 'わずか2日で傷跡が目に見えて改善した。' : 'Skin looked clearer and healthier, with noticeably less irritation during daily activities.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-2 md:p-4" style={{ zIndex: 9999 }} onClick={onClose}>
      <div className="bg-black border-2 border-[#25c760] rounded-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-end p-2 bg-black z-10">
          <button onClick={onClose} className="text-[#25c760] hover:text-green-400 text-2xl px-2">{'\u2715'}</button>
        </div>
        <div className="text-center pb-6 px-4">
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">Confidence</h2>
          <p className="text-[#25c760] text-sm md:text-lg">Before & After</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            {isJa ? '※個人の感想です。結果には個人差があります。' : '* Individual results may vary. These are personal experiences.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 pb-6">
          {beforeAfterData.map((item, index) => (
            <div key={index} className="border border-[#25c760] rounded-lg p-4 bg-[#131217]">
              <h3 className="text-[#25c760] text-base md:text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm mb-4 leading-relaxed">{item.description}</p>
              <div className="mb-4">
                <ComparisonSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
              </div>
              <div className="flex justify-center gap-2 mb-4">
                <span className="px-5 py-1.5 bg-[#1a1a1a] text-white text-xs md:text-sm rounded-full border border-green-400">Before</span>
                <span className="px-5 py-1.5 bg-[#1a1a1a] text-white text-xs md:text-sm rounded-full border border-green-400">After</span>
              </div>
              <div className="bg-[#000] p-4 mb-3 rounded-r">
                <h4 className="text-[#25c760] text-sm font-bold mb-2">Before</h4>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{item.beforeText}</p>
              </div>
              <div className="bg-[#0d1f1a] p-4 rounded-r">
                <h4 className="text-[#25c760] text-sm font-bold mb-2">After</h4>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{item.afterText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                       */
/* ------------------------------------------------------------------ */

export default function CosmeticFunctionSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cosmetic ingredients
  const cosmeticNutrients = [
    { name: '無水ケイ酸', amount: '97.1g', nameEN: 'Anhydrous Silica' },
    { name: 'たんぱく質', amount: '2.4~2.6g', nameEN: 'Protein' },
    { name: '炭水化物（食物繊維）', amount: '0.3~0.5g', nameEN: 'Carbohydrates (Dietary Fiber)' },
    { name: '脂質', amount: '0.1g未満', nameEN: 'Fat' },
    { name: '水分', amount: '0.1g', nameEN: 'Moisture' },
  ];

  const featuresTable = isJa
    ? [
        ['植物や藻の始祖に当たるMother Vegetableのみを使用した完全天然素材/天然栄養素', '塗るタイプのMother Vegetableは、主成分が非晶質の無水ケイ酸'],
        ['PM2.5などの外気や虫・鳥類などの混入が起こらない完全室内培養', '重金属・マイクロプラスチック汚染リスクを極限まで排除'],
        ['保存料・人工着色料・香料 不使用', '無水ケイ酸を「抽出」する作業がなく、Mother Vegetableを乾燥させたのみの天然'],
        ['農薬・化学肥料 不使用', '医薬部外品原料規格をクリア'],
        ['動物や植物への使用が可能', '長期保存が可能'],
      ]
    : [
        ['Made entirely from natural materials/nutrients derived solely from Mother Vegetable, the ancestor of plants and algae', 'The main component of topical Mother Vegetable is amorphous anhydrous silica'],
        ['Complete indoor cultivation free from PM2.5, insects, birds, and other contaminants', 'Minimizes heavy metal and microplastic contamination risks'],
        ['No preservatives, artificial colors, or fragrances', 'No extraction process for anhydrous silica \u2014 simply dried Mother Vegetable in its natural form'],
        ['No pesticides or chemical fertilizers', 'Meets quasi-drug raw material standards'],
        ['Can be used on animals and plants', 'Suitable for long-term storage'],
      ];

  // Prompt for clipboard
  const cosmeticNutrientsListForPrompt = cosmeticNutrients
    .map((n) => {
      if (isJa) return `${n.name}: ${n.amount}`;
      const amountEN = n.amount.replace(/未満/g, 'or less');
      return `${n.nameEN}: ${amountEN}`;
    })
    .join('\n- ');

  const cosmeticPromptTemplate = isJa
    ? `以下の成分を含む医薬部外品原料規格を満たした原材料（かつ、FDAの規格のPremium Food powder gradeを満たした原材料）について、肌に塗った場合に期待できる効果を一般公開情報をもとに教えてください。
**断定は避け**、あくまで一般的に知られている情報に基づいてください。

前提条件として、原材料の特性は次の通りです。
・植物の始祖にあたる天然素材のみを使用
・非晶質の無水ケイ酸が97.1%のパウダー形状
・生命の証として、高純度無水ケイ酸97.1%でありながら、脂質や食物繊維がパウダーに残っている。
・PM2.5などの外気や虫・鳥類などの混入が起こらない完全室内培養（Closed Bioreactor System）
・重金属・マイクロプラスチック汚染リスクを極限まで排除
・農薬・化学肥料 不使用
・保存料・人工着色料・香料 不使用
・動物や植物にも使用可能

【出力形式（必ずこの順）】
1) **肌に塗ることで期待できる効果トップ5**
2) **特定領域への期待される効果**（切創、アレルギー肌、バリア機能、保湿、皮脂汚れ、頭皮、化粧下地の使用/テカり、体臭、肌のトーン）
3) **犬や猫に塗布した際に期待される効果**（ダニ、被毛、アレルギー肌、口臭）
4) **免責**

【成分リスト（100g当たり）】
- ${cosmeticNutrientsListForPrompt}`
    : `Please tell me about the expected benefits of applying to the skin raw materials that meet Japanese Quasi-Drug Raw Material Standards containing the following ingredients, based on publicly available information.
**Avoid definitive claims** and base your response on generally known information.

Characteristics of the raw materials:
- Uses only natural ingredients derived from the ancestor of plants
- Amorphous anhydrous silica at 97.1% in powder form
- Despite being 97.1% high-purity anhydrous silica, lipids and dietary fiber remain in the powder
- Complete indoor cultivation (Closed Bioreactor System)
- Minimized risk of heavy metal and microplastic contamination
- No pesticides or chemical fertilizers
- No preservatives, artificial colors, or fragrances
- Can also be used on animals and plants

【Output Format (in this order)】
1) **Top 5 Expected Benefits When Applied to Skin**
2) **Expected Effects in Specific Areas** (Cuts, Allergy-prone skin, Barrier function, Moisturizing, Sebum/dirt, Scalp, Makeup base/Oiliness, Body odor, Skin tone)
3) **Expected Effects When Applied to Dogs and Cats** (Mites, Coat, Allergy-prone skin, Bad breath)
4) **Disclaimer**

【Ingredient List (per 100g)】
- ${cosmeticNutrientsListForPrompt}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cosmeticPromptTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const aiServices = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', logo: '/ai/chatgpt.svg' },
    { name: 'Gemini', url: 'https://gemini.google.com/', logo: '/ai/gemini.svg' },
  ];

  const cosmeticTexts = {
    effectsTitle: isJa ? '効果効能の表現規制について' : 'About Regulatory Restrictions on Expressing Effects & Benefits',
    effectsDescription1: isJa
      ? '私たちMother Vegetableグループは、世界各地で活動を行っているため、効果効能に関する表現についても各国の法律・ガイドラインを遵守します。'
      : 'The Mother Vegetable Group operates worldwide, and we comply with the laws and guidelines of each country regarding the expression of effects and benefits.',
    effectsDescription3: isJa
      ? 'そこで、Mother Vegetable Confidenceについて成分を全てオープンにします。以下の「クリップボードにコピー」のボタンを押すと全成分がコピーされますので、ChatGPTやGeminiなどのAIに入力し、これらの成分の特性については一般公開情報をご確認ください。'
      : 'Therefore, we are fully disclosing all ingredients of Mother Vegetable Confidence. Clicking the "Copy to Clipboard" button below will copy all ingredients. Please paste them into an AI service such as ChatGPT or Gemini, and refer to publicly available information regarding the characteristics of these ingredients.',
    copyButton: isJa ? '上記成分をクリップボードにコピー' : 'Copy Ingredients to Clipboard',
    copiedMessage: isJa
      ? '\u2705 コピーしました！次にAIを開いて貼り付けてください。'
      : '\u2705 Copied! Open an AI service and paste.',
    featuresNote: isJa
      ? '（多くお問い合わせいただく、保湿、皮脂汚れ、傷口、アレルギー肌、デリケートゾーン等のニオイ、化粧下地への応用などについては各国で表現規制が異なりますので、各自AIにてお調べください。）'
      : '(Regarding frequently asked topics such as moisturizing, sebum/dirt removal, wounds, allergy-prone skin, odor in delicate areas, use as a makeup base, etc., expression regulations vary by country, so please research using AI.)',
    featuresTitle: isJa ? 'Confidenceの特性について' : 'About Confidence Characteristics',
  };

  return (
    <>
      <motion.div
        className="bg-black border-2 border-[#25c760] rounded-lg p-4 md:p-8 my-5 md:my-5"
        id="cosmetic-function"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h2 className="text-xl md:text-5xl font-bold text-center mb-1 md:mb-2 text-white">
          Cosmetic Function
        </h2>
        <p className="text-sm md:text-2xl text-center mb-2 md:mb-4 text-white">
          {isJa ? '肌に塗るタイプのMother Vegetable' : 'Mother Vegetable for Skin Application'}
        </p>
        <p className="text-center text-white text-base md:text-xl mb-4">Confidence</p>

        <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-8 opacity-80" />

        {/* Cosmetic Video */}
        <div className="flex justify-center">
          <video
            src="/Images/Assets/homepage/product/cosmetic_video.mov"
            autoPlay
            loop
            muted
            playsInline
            className="h-24 md:h-24 w-auto object-contain rounded-lg"
          />
        </div>

        {/* Bracket Image */}
        <div className="flex justify-center mb-4 md:mb-6">
          <Image src="/Images/Assets/homepage/bracket_v2.png" alt="Bracket" width={800} height={40} className="w-full max-w-2xl object-contain" />
        </div>

        {/* Ingredient Section */}
        <div className="max-w-3xl mx-auto px-0 md:px-4">
          <h3 className="text-lg md:text-3xl font-bold text-center mb-2" style={{ color: '#25c760' }}>
            {isJa ? '成分表示' : 'Ingredient Information'}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm text-center mb-4 md:mb-6">
            {isJa ? '（100g当たり）' : '(per 100g)'}
          </p>
          <div className="grid grid-cols-5 gap-2 md:gap-3 mb-8">
            {cosmeticNutrients.map((nutrient, index) => (
              <div key={index} className="border-2 border-green-300 rounded-lg px-1 py-2 md:px-3 md:py-3 bg-green-800/50 hover:bg-green-700/50 transition-colors text-center">
                <div className="text-white text-[10px] md:text-xs font-semibold leading-tight">
                  {isJa ? nutrient.name : nutrient.nameEN}
                </div>
                <div className="text-green-200 text-[10px] md:text-sm font-bold">
                  {isJa ? nutrient.amount : nutrient.amount.replace(/未満/g, 'or less')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-4 mt-12 md:mt-16">
          <h3 className="text-lg md:text-3xl font-bold text-center mb-6 md:mb-8" style={{ color: '#25c760' }}>
            {cosmeticTexts.featuresTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-6">
            {featuresTable.flat().map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 min-w-[6px] rounded-full bg-[#25c760]" />
                <span className="text-gray-200 text-xs md:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Effects & Benefits Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-4 mt-12 md:mt-16">
          <h3 className="text-lg md:text-3xl font-bold text-center mb-6 md:mb-8" style={{ color: '#25c760' }}>
            {cosmeticTexts.effectsTitle}
          </h3>
          <div className="text-gray-300 text-sm md:text-base text-left leading-relaxed mb-8 md:mb-10 space-y-4 max-w-3xl mx-auto">
            <p>{cosmeticTexts.effectsDescription1}</p>
            <p>{cosmeticTexts.effectsDescription3}</p>
          </div>

          {/* Copy Button */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <button
              onClick={handleCopy}
              className="group flex items-center gap-2 md:gap-3 px-5 py-3 md:px-10 md:py-5 rounded-2xl font-bold text-sm md:text-lg transition-all duration-300 hover:scale-105 border-2 border-[#25c760] bg-transparent hover:bg-[#25c760]/10 md:whitespace-nowrap"
              style={{ color: '#25c760' }}
            >
              <svg className="w-8 h-8 md:w-6 md:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span className="text-left">
                {isJa ? (<>上記成分を<br className="md:hidden" />クリップボードにコピー</>) : cosmeticTexts.copyButton}
              </span>
            </button>
            {copied && (
              <p className="text-green-400 text-sm md:text-base animate-pulse">{cosmeticTexts.copiedMessage}</p>
            )}
          </div>

          {/* AI Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
            {aiServices.map((service, index) => (
              <a
                key={index}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 md:px-6 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 bg-gray-800 hover:bg-gray-700 border border-gray-600"
              >
                <Image src={service.logo} alt={service.name} width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-white">{service.name}</span>
              </a>
            ))}
          </div>

          {/* Note */}
          <p className="text-gray-400 text-xs md:text-sm text-center italic">{cosmeticTexts.featuresNote}</p>
        </div>

        {/* Before & After Button */}
        <motion.div
          className="flex items-center justify-center my-[30px] max-[490px]:my-[15px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => setIsPopupOpen(true)}
            className="group inline-flex items-center justify-center gap-2.5 py-3 px-[30px] border-2 border-[#25C760] rounded-[30px] bg-transparent text-[#25C760] font-semibold text-[1.1rem] max-[767px]:text-[0.95rem] max-[530px]:text-[0.85rem] transition-all duration-300 relative overflow-hidden shadow-[0_0_15px_rgba(37,199,96,0.2)] hover:bg-[#25C760] hover:text-black hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(37,199,96,0.4)] cursor-pointer outline-none"
            type="button"
          >
            <span className="relative z-[1] text-[1.2rem] font-bold text-[#25C760] group-hover:text-white transition-colors duration-300">{'\u2713'}</span>
            <span className="relative z-[1] group-hover:tracking-[1px] group-hover:text-white transition-all duration-300">Before & After</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Before & After Modal */}
      <BeforeAfterModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} isJa={isJa} />
    </>
  );
}
