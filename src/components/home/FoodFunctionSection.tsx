'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function FoodFunctionSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const [copied, setCopied] = useState(false);

  // Main nutrients (top 5)
  const mainNutrients = [
    { name: 'エネルギー', amount: '398kcal', nameEN: 'Energy' },
    { name: 'たんぱく質', amount: '65g', nameEN: 'Protein' },
    { name: '脂質', amount: '6.5g', nameEN: 'Fat' },
    { name: '炭水化物', amount: '20g', nameEN: 'Carbohydrates' },
    { name: 'ミネラル', amount: '8g', nameEN: 'Minerals' },
  ];

  // Detailed nutrient breakdown
  const nutrientsWithAmount = [
    { name: 'C-フィコシアニン', amount: '約16-20g', nameEN: 'C-Phycocyanin' },
    { name: 'トリプトファン', amount: '0.93g', nameEN: 'Tryptophan' },
    { name: 'スレオニン', amount: '2.97g', nameEN: 'Threonine' },
    { name: 'イソロイシン', amount: '3.21g', nameEN: 'Isoleucine' },
    { name: 'ロイシン', amount: '4.95g', nameEN: 'Leucine' },
    { name: 'リシン', amount: '3.03g', nameEN: 'Lysine' },
    { name: 'メチオニン', amount: '1.15g', nameEN: 'Methionine' },
    { name: 'フェニルアラニン', amount: '2.78g', nameEN: 'Phenylalanine' },
    { name: 'バリン', amount: '3.51g', nameEN: 'Valine' },
    { name: 'ヒスチジン', amount: '1.09g', nameEN: 'Histidine' },
    { name: 'アルギニン', amount: '4.15g', nameEN: 'Arginine' },
    { name: 'システイン', amount: '0.66g', nameEN: 'Cysteine' },
    { name: 'チロシン', amount: '2.58g', nameEN: 'Tyrosine' },
    { name: 'アラニン', amount: '4.52g', nameEN: 'Alanine' },
    { name: 'アスパラギン酸', amount: '5.79g', nameEN: 'Aspartic Acid' },
    { name: 'グルタミン酸', amount: '8.39g', nameEN: 'Glutamic Acid' },
    { name: 'グリシン', amount: '3.10g', nameEN: 'Glycine' },
    { name: 'プロリン', amount: '2.38g', nameEN: 'Proline' },
    { name: 'セリン', amount: '3.00g', nameEN: 'Serine' },
    { name: '飽和脂肪酸', amount: '約2g', nameEN: 'Saturated Fatty Acids' },
    { name: 'オメガ3脂肪酸（α-リノレン酸含む）', amount: '約100mg', nameEN: 'Omega-3 Fatty Acids (incl. ALA)' },
    { name: 'オメガ6脂肪酸（γ-リノレン酸含む）', amount: '約1.5g', nameEN: 'Omega-6 Fatty Acids (incl. GLA)' },
    { name: '糖質(3種)', amount: '8g', nameEN: 'Sugars (3 types)' },
    { name: '食物繊維', amount: '12g', nameEN: 'Dietary Fiber' },
    { name: '食塩相当量（推定値）', amount: '1,050mg', nameEN: 'Salt Equivalent (estimated)' },
    { name: 'カリウム', amount: '1,360mg', nameEN: 'Potassium' },
    { name: 'マグネシウム', amount: '195mg', nameEN: 'Magnesium' },
    { name: 'カルシウム', amount: '120mg', nameEN: 'Calcium' },
    { name: 'リン', amount: '118mg', nameEN: 'Phosphorus' },
    { name: '鉄', amount: '28.5mg', nameEN: 'Iron' },
    { name: '亜鉛', amount: '2.0mg', nameEN: 'Zinc' },
    { name: '銅', amount: '0.3~0.4mg', nameEN: 'Copper' },
    { name: 'マンガン', amount: '1.9mg', nameEN: 'Manganese' },
    { name: 'ビタミンA（β-カロテン由来）', amount: '約100mg', nameEN: 'Vitamin A (from β-carotene)' },
    { name: 'ビタミンE', amount: '5mg', nameEN: 'Vitamin E' },
    { name: 'ビタミンK', amount: '25.5μg', nameEN: 'Vitamin K' },
    { name: 'ビタミンB1', amount: '2.38mg', nameEN: 'Vitamin B1' },
    { name: 'ビタミンB2', amount: '3.67mg', nameEN: 'Vitamin B2' },
    { name: 'ビタミンB3', amount: '12.8mg', nameEN: 'Vitamin B3' },
    { name: 'ビタミンB5', amount: '3.48mg', nameEN: 'Vitamin B5' },
    { name: 'ビタミンB6', amount: '0.36mg', nameEN: 'Vitamin B6' },
    { name: 'ビタミンB9', amount: '94μg', nameEN: 'Vitamin B9' },
    { name: 'ビタミンC', amount: '10mg', nameEN: 'Vitamin C' },
    { name: 'クロロフィルa（葉緑素）', amount: '0.3~1.1%', nameEN: 'Chlorophyll a' },
    { name: 'カロテノイド', amount: '0.03~0.5%', nameEN: 'Carotenoids' },
    { name: '核酸', amount: '4~6%', nameEN: 'Nucleic Acids' },
    { name: '水分', amount: '3~7%', nameEN: 'Moisture' },
  ];

  // Features table
  const featuresTable = isJa
    ? [
        ['植物や藻の始祖に当たるMother Vegetableのみを使用した完全天然素材/天然栄養素', '飲むタイプのMother Vegetableは、固い外核/細胞壁を持たない構造'],
        ['PM2.5などの外気や虫・鳥類などの混入が起こらない完全室内培養', '重金属・マイクロプラスチック汚染リスクを極限まで排除'],
        ['食品添加物 不使用', '農薬・化学肥料 不使用'],
        ['保存料・人工着色料・香料 不使用', '世界ドーピング防止機構（WADA）の定める違法成分無し'],
        ['動物や植物への栄養にも使用可能', '災害用備蓄品などの長期保存にも'],
      ]
    : [
        ['Made entirely from natural materials/nutrients derived solely from Mother Vegetable, the ancestor of plants and algae', 'Drinkable Mother Vegetable has no hard outer shell or cell wall structure'],
        ['Complete indoor cultivation free from PM2.5, insects, birds, and other contaminants', 'Minimizes heavy metal and microplastic contamination risks'],
        ['No food additives', 'No pesticides or chemical fertilizers'],
        ['No preservatives, artificial colors, or fragrances', 'No prohibited substances as defined by WADA (World Anti-Doping Agency)'],
        ['Can also be used as nutrition for animals and plants', 'Suitable for long-term storage as emergency disaster supplies'],
      ];

  // Build the prompt for clipboard
  const allNutrientsListForPrompt = [...mainNutrients, ...nutrientsWithAmount]
    .map((n) => {
      if (isJa) return `${n.name}: ${n.amount}`;
      const amountEN = n.amount.replace(/約/g, 'approx. ').replace(/μg/g, 'mcg');
      return `${n.nameEN}: ${amountEN}`;
    })
    .join('\n- ');

  const promptTemplate = isJa
    ? `以下の成分を含む食品について、期待できる効果を一般公開情報をもとに教えてください。
**断定は避け**、あくまで一般的に知られている情報に基づいてください。

前提条件として、この品種の特性は次の通りです。
以下の特性や環境下で育ち作られた品種がどのようなメリットが考えられるかを説明してください：
・植物の始祖にあたる天然素材のみを使用
・外核/細胞壁が柔らかい構造
・PM2.5などの外気や虫・鳥類などの混入が起こらない完全室内培養（Closed Bioreactor System）
・重金属・マイクロプラスチック汚染リスクを極限まで排除
・農薬・化学肥料 不使用
・食品添加物 不使用
・保存料・人工着色料・香料 不使用
・災害用備蓄品などの長期保存
・動物や植物への栄養にも使用可能


【出力形式（必ずこの順）】
1) **期待できる効果トップ5**
以下の成分群から期待できる主な効果を、重要度順に5つ挙げてください。
※最も多く含まれる成分はフィコシアニン（C-フィコシアニン：約16-20g/100g）です。
各効果について：
- どのような効果が期待できるか
- その効果の裏付けとなる成分（この成分リストの中から該当するもの）
- なぜその成分が効くとされているか（簡潔に）

2) **特定領域への期待される効果**
以下の領域について、この成分群から期待できる効果を説明してください：
- 腸内機能
- 睡眠
- 便通
- 運動機能
- 二日酔い
- 疲労

3) **犬や猫が食べた際に期待される効果**
以下の領域について、この成分群から期待できる効果を説明してください：
- 腸内機能
- 便通
- 涙やけ
- 被毛

4) **免責**：これは医療アドバイスではないこと、一般公開情報であることを掲載してください。詳細は専門家や医師に相談することを推奨してください。

【成分リスト（100g当たり）】
- ${allNutrientsListForPrompt}`
    : `Please tell me about the expected benefits of a food containing the following ingredients, based on publicly available information.
**Avoid definitive claims** and base your response on generally known information.

As a prerequisite, the characteristics of this variety are as follows.
Please explain what benefits can be expected from a variety grown and produced under the following characteristics and conditions:
- Uses only natural ingredients derived from the ancestor of plants
- Soft outer shell/cell wall structure
- Complete indoor cultivation (Closed Bioreactor System) free from outdoor air pollutants such as PM2.5, insects, birds, etc.
- Minimized risk of heavy metal and microplastic contamination
- No pesticides or chemical fertilizers
- No food additives
- No preservatives, artificial colors, or fragrances
- Suitable for long-term storage as emergency disaster supplies
- Can also be used as nutrition for animals and plants


【Output Format (in this order)】
1) **Top 5 Expected Benefits**
List the top 5 expected benefits from this ingredient group, in order of importance.
*Note: The most abundant ingredient is Phycocyanin (C-Phycocyanin: approx. 16-20g/100g).*
For each benefit:
- What effect can be expected
- Supporting ingredients from this list
- Why these ingredients are believed to be effective (briefly)

2) **Expected Effects in Specific Areas**
Explain the expected effects from this ingredient group in the following areas:
- Gut function
- Sleep
- Bowel movements
- Exercise performance
- Hangover recovery
- Fatigue

3) **Expected Effects When Consumed by Dogs and Cats**
Explain the expected effects from this ingredient group in the following areas:
- Gut function
- Bowel movements
- Tear staining
- Coat condition

4) **Disclaimer**: This is NOT medical advice and is based on publicly available information. We recommend consulting a specialist or physician for details.

【Ingredient List (per 100g)】
- ${allNutrientsListForPrompt}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptTemplate);
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

  const texts = {
    effectsTitle: isJa ? '効果効能の表現規制について' : 'About Regulatory Restrictions on Expressing Effects & Benefits',
    effectsDescription1: isJa
      ? '私たちMother Vegetableグループは、世界各地で活動を行っているため、効果効能に関する表現についても各国の法律・ガイドラインを遵守します。'
      : 'The Mother Vegetable Group operates worldwide, and we comply with the laws and guidelines of each country regarding the expression of effects and benefits.',
    effectsDescription3: isJa
      ? 'そこで、Mother Vegetable Achieveについて成分を全てオープンにします。以下の「クリップボードにコピー」のボタンを押すと全成分がコピーされますので、ChatGPTやGeminiなどのAIに入力し、これらの成分の特性については一般公開情報をご確認ください。'
      : 'Therefore, we are fully disclosing all ingredients of Mother Vegetable Achieve. Clicking the "Copy to Clipboard" button below will copy all ingredients. Please paste them into an AI service such as ChatGPT or Gemini, and refer to publicly available information regarding the characteristics of these ingredients.',
    featuresTitle: isJa ? 'Achieveの特性について' : 'About Achieve Characteristics',
    featuresNote: isJa
      ? '（多くお問い合わせいただく、腸内機能/睡眠/便/運動機能/二日酔い/疲労等については各国で表現規制が異なりますので、各自AIにてお調べください。）'
      : '(Regarding frequently asked topics such as gut health, sleep, bowel movements, exercise performance, hangovers, fatigue, etc., expression regulations vary by country, so please research using AI.)',
    copyButton: isJa ? '上記成分をクリップボードにコピー' : 'Copy Ingredients to Clipboard',
    copiedMessage: isJa
      ? '\u2705 コピーしました！次にAIを開いて貼り付けてください。'
      : '\u2705 Copied! Open an AI service and paste.',
  };

  return (
    <motion.div
      className="bg-black border-2 border-[#25C760] rounded-lg p-4 md:p-8 my-5 md:my-5"
      id="food-function"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h2 className="text-xl md:text-5xl font-bold text-center mb-1 md:mb-2" style={{ color: '#25c760' }}>
        Food Function
      </h2>
      <p className="text-sm md:text-2xl text-center mb-2 md:mb-4" style={{ color: '#25c760' }}>
        {isJa ? '飲むタイプのMother Vegetable' : 'Drinkable Mother Vegetable'}
      </p>
      <p className="text-center text-white text-base md:text-xl mb-4">Achieve</p>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-8 opacity-80" />

      {/* Food Video */}
      <div className="flex justify-center">
        <video
          src="/Images/Assets/homepage/product/food_video.mov"
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

      {/* Nutrient Section Container */}
      <div className="max-w-3xl mx-auto px-0 md:px-4">
        {/* Nutrients Title */}
        <h3 className="text-lg md:text-3xl font-bold text-center mb-2" style={{ color: '#25c760' }}>
          {isJa ? '栄養成分表示' : 'Nutrition Facts'}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm text-center mb-4 md:mb-6">
          {isJa ? '（100g当たり）' : '(per 100g)'}
        </p>

        {/* Main Nutrients */}
        <div className="mb-6 md:mb-8">
          <h4 className="text-sm md:text-lg font-bold text-center mb-3 md:mb-4 text-green-300">
            {isJa ? '主要項目' : 'Main Nutrients'}
          </h4>
          <div className="flex flex-wrap justify-center gap-2 md:grid md:grid-cols-5 md:gap-3 max-w-3xl mx-auto">
            {mainNutrients.map((nutrient, index) => (
              <div key={index} className="border-2 border-green-400 rounded-lg px-2 py-2 md:px-4 md:py-4 bg-green-900/40 text-center flex flex-col items-center justify-center w-[28%] md:w-auto">
                <div className="text-gray-100 text-[9px] md:text-sm font-semibold mb-1 leading-tight">
                  {isJa ? nutrient.name : nutrient.nameEN}
                </div>
                <div className="text-green-300 text-[9px] md:text-lg font-bold">
                  {isJa ? nutrient.amount : nutrient.amount.replace(/約/g, 'approx. ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div>
          <h4 className="text-sm md:text-lg font-bold text-center mb-3 md:mb-4 text-green-500/80">
            {isJa ? '栄養分の内訳（詳細）' : 'Nutritional Breakdown (Details)'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-flow-col md:grid-rows-8 md:auto-cols-fr gap-2 md:gap-3">
            {nutrientsWithAmount.map((nutrient, index) => (
              <div key={index} className="border border-green-500/40 rounded-lg px-2 py-2 md:px-3 md:py-3 bg-green-900/20 hover:bg-green-900/40 transition-colors">
                <div className="text-gray-200 text-[10px] md:text-xs font-medium leading-tight">
                  {isJa ? nutrient.name : nutrient.nameEN}
                </div>
                <div className="text-green-400 text-[11px] md:text-sm font-bold">
                  {isJa ? nutrient.amount : nutrient.amount.replace(/約/g, 'approx. ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-4 mt-12 md:mt-16">
        <h3 className="text-lg md:text-3xl font-bold text-center mb-6 md:mb-8" style={{ color: '#25c760' }}>
          {isJa ? (<>Achieveの<br className="md:hidden" />特性について</>) : texts.featuresTitle}
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
          {texts.effectsTitle}
        </h3>
        <div className="text-gray-300 text-sm md:text-base text-left leading-relaxed mb-8 md:mb-10 space-y-4 max-w-3xl mx-auto">
          <p>{texts.effectsDescription1}</p>
          <p>{texts.effectsDescription3}</p>
        </div>

        {/* Copy Button */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <button
            onClick={handleCopy}
            className="group flex flex-col items-center gap-2 md:gap-3 px-2 py-3 md:px-10 md:py-5 rounded-2xl font-bold text-[2.8vw] md:text-lg transition-all duration-300 hover:scale-105 border-2 border-[#25c760] bg-transparent hover:bg-[#25c760]/10 w-full md:w-auto"
            style={{ color: '#25c760' }}
          >
            <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="text-center">
              {isJa ? (<>タップして上記成分を<br className="md:hidden" />クリップボードにコピーし<br />以下のボタンからAIに質問する</>) : (<>Tap to copy ingredients to clipboard<br />and ask AI using the buttons below</>)}
            </span>
          </button>
          {copied && (
            <p className="text-green-400 text-sm md:text-base animate-pulse">{texts.copiedMessage}</p>
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
        <p className="text-gray-400 text-xs md:text-sm text-center italic">{texts.featuresNote}</p>
      </div>
    </motion.div>
  );
}
