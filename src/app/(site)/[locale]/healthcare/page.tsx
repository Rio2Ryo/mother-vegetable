import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import ResearchSlider from '@/components/healthcare/ResearchSlider';

export const metadata: Metadata = {
  title: 'Healthcare — Clinical Research & Certifications',
  description:
    'Explore the science behind Mother Vegetable. GMP, HACCP, and JFRL certified. Clinical research on 45+ vegetable extract benefits.',
};

/* ------------------------------------------------------------------ */
/*  Healthcare / ALL 45E  –  Complete clinical product page            */
/* ------------------------------------------------------------------ */

/* ---------- SVG icon helper (inline so no external dep) ----------- */

function HeroIcon({ name }: { name: string }) {
  const svgStyle = { width: '32px', height: '32px', maxWidth: '32px', maxHeight: '32px' } as const;
  const map: Record<string, React.ReactNode> = {
    users: (
      <svg width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    check: (
      <svg width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    ),
    heart: (
      <svg width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
    ),
    clipboard: (
      <svg width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
    ),
  };
  return <span className="hero-icon-wrap text-[#BDF626]">{map[name] ?? null}</span>;
}

function PatientIcon({ name }: { name: string }) {
  const common = 'w-8 h-8';
  const svgStyle = { width: '32px', height: '32px', maxWidth: '32px', maxHeight: '32px' } as const;
  const map: Record<string, React.ReactNode> = {
    clock: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    ),
    bed: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
    ),
    elderly: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2" /><path d="M10 22V16l-2-4 4-2 4 2-2 4v6" /><path d="M20 17l-2 5" /></svg>
    ),
    doctor: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
    ),
    heartPulse: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" /><path d="M12 6v4l2 2" /></svg>
    ),
    vial: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2v2" /><path d="M17 2v2" /><path d="M7 4h10l1 16H6L7 4z" /><path d="M6 12h12" /></svg>
    ),
  };
  return <>{map[name] ?? null}</>;
}

function PurposeIcon({ name }: { name: string }) {
  const common = 'w-8 h-8';
  const svgStyle = { width: '32px', height: '32px', maxWidth: '32px', maxHeight: '32px' } as const;
  const map: Record<string, React.ReactNode> = {
    hospital: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9h1" /><path d="M9 13h1" /><path d="M9 17h1" /></svg>
    ),
    chart: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
    ),
    shield: (
      <svg className={common} width="32" height="32" style={svgStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
    ),
  };
  return <>{map[name] ?? null}</>;
}

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default async function HealthcarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';

  /* ---------- localized static data -------------------------------- */

  const heroCards = [
    {
      value: '20-50%',
      icon: 'users',
      label: isJa ? '栄養ギャップが生じる可能性' : 'Nutritional gaps may occur',
      sub: isJa ? 'コホートやスクリーニング基準により報告範囲は異なります。' : 'Reported ranges vary by cohort and screening criteria.',
    },
    {
      value: isJa ? '非合成' : 'Non-Synthetic',
      icon: 'check',
      label: isJa ? '天然由来成分のみ使用（合成品不使用）' : 'Made from natural sources (no synthetics)',
    },
    {
      value: isJa ? 'コファクター完備' : 'Cofactor-Complete',
      icon: 'heart',
      label: isJa ? '必須アミノ酸9種 \u2022 ビタミン13種 \u2022 ミネラル16種' : '9 EAAs \u2022 13 Vitamins \u2022 16 Minerals',
    },
    {
      value: isJa ? 'ガイドライン準拠' : 'Guideline-Informed',
      icon: 'clipboard',
      label: isJa ? '微量栄養素の充足をサポート' : 'Supports micronutrient adequacy',
    },
  ];

  const purposeChecks = isJa
    ? [
        '経口摂取が制限、不安定、または不十分な場合',
        '急性疾患、手術、または生理的ストレスにより代謝需要が増大している場合',
        '正常な生理機能をサポートするために微量栄養素の充足が臨床的に適応される場合',
      ]
    : [
        'Oral intake is limited, inconsistent, or inadequate',
        'Metabolic demand is elevated due to acute illness, surgery, or physiological stress',
        'Micronutrient adequacy is clinically indicated to support normal physiological function',
      ];

  const purposeCards = isJa
    ? [
        { icon: 'hospital', text: '不十分な摂取 / 栄養摂取の低下' },
        { icon: 'chart', text: '代謝需要の増大' },
        { icon: 'shield', text: '必須微量栄養素サポート' },
      ]
    : [
        { icon: 'hospital', text: 'Suboptimal Intake / Reduced Nutritional Intake' },
        { icon: 'chart', text: 'Higher Metabolic Requirement' },
        { icon: 'shield', text: 'Essential Micronutrient Support' },
      ];

  const guidelineCards = isJa
    ? [
        {
          title: 'ESPEN微量栄養素ガイドライン',
          text: 'ビタミンや微量元素を含む微量栄養素は、欠乏を防ぎ回復を支援するために、栄養療法の開始時から提供されるべきです。',
          citation: 'ESPEN臨床栄養ガイドラインに基づく',
        },
        {
          title: 'ASPENクリティカルケアガイダンス',
          text: '標準的な栄養投与量では微量栄養素の要件を完全に満たせない場合があり、重症患者では補充が必要になることがあります。',
          citation: 'ASPEN臨床栄養推奨に基づく',
        },
        {
          title: '手術・ERASパスウェイ',
          text: '早期の栄養サポートと適切な微量栄養素摂取は、合併症の減少と術後回復の改善に関連しています。',
          citation: 'ERAS周術期栄養原則に基づく',
        },
      ]
    : [
        {
          title: 'ESPEN Micronutrient Guidelines',
          text: 'Micronutrients, including vitamins and trace elements, should be provided from the start of nutrition therapy to prevent deficiency and support recovery.',
          citation: 'Based on ESPEN practical clinical nutrition guidelines',
        },
        {
          title: 'ASPEN Critical Care Guidance',
          text: 'Standard feeding volumes may not fully meet micronutrient requirements, and supplementation may be necessary in critically ill patients.',
          citation: 'Based on ASPEN clinical nutrition recommendations',
        },
        {
          title: 'Surgery & ERAS Pathways',
          text: 'Early nutritional support and adequate micronutrient intake are associated with reduced complications and improved postoperative recovery.',
          citation: 'Based on ERAS perioperative nutrition principles',
        },
      ];

  const guidelineFits = isJa
    ? [
        { label: 'ERAS周術期ケア', image: '/images/medical/benefit_1.png' },
        { label: 'ICUおよびハイリスク病棟', image: '/images/medical/benefit_2.png' },
        { label: 'フレイルとサルコペニア管理', image: '/images/medical/benefit_3.png' },
        { label: '創傷ケアと褥瘡サポート', image: '/images/medical/benefit_4.png' },
      ]
    : [
        { label: 'ERAS Perioperative Care', image: '/images/medical/benefit_1.png' },
        { label: 'ICU and High-Risk Wards', image: '/images/medical/benefit_2.png' },
        { label: 'Frailty and Sarcopenia Management', image: '/images/medical/benefit_3.png' },
        { label: 'Wound Care and Pressure Injury Support', image: '/images/medical/benefit_4.png' },
      ];

  const patientProfiles = isJa
    ? [
        { icon: 'clock', title: '術後回復', desc: '早期経口摂取とERASプロトコルをサポート' },
        { icon: 'bed', title: '入院中または安静中の患者', desc: '安静、活動制限、または長期入院' },
        { icon: 'elderly', title: '高齢者とフレイル', desc: '食欲減退、または栄養的脆弱性' },
        { icon: 'doctor', title: '栄養不良リスクのある患者', desc: '経口摂取不良、吐き気、または疾患関連の栄養低下' },
        { icon: 'heartPulse', title: '集中治療後の回復', desc: 'ICU退室直後または高い栄養需要' },
        { icon: 'vial', title: '経管栄養の補助', desc: 'ONSまたはEN療法を補完するよう設計' },
      ]
    : [
        { icon: 'clock', title: 'Post-Surgical Recovery', desc: 'Supports early oral intake and ERAS protocols' },
        { icon: 'bed', title: 'Hospitalised or Immobilised Patients', desc: 'Bed rest, reduced mobility, or prolonged hospital stay' },
        { icon: 'elderly', title: 'Older Adults & Frailty', desc: 'Reduced appetite, or nutritional vulnerability' },
        { icon: 'doctor', title: 'Patients at Risk of Malnutrition', desc: 'Poor oral intake, nausea, or disease-related nutritional decline' },
        { icon: 'heartPulse', title: 'Critical Care Recovery', desc: 'Recent ICU discharge or Higher nutrition needs' },
        { icon: 'vial', title: 'Tube Feeding Adjunct', desc: 'Designed to complement ONS or EN regimens.' },
      ];

  const benefitCards = isJa
    ? [
        { tag: '筋肉代謝と筋力', desc: 'ロイシンリッチな必須アミノ酸が筋タンパク質合成を促進し、特に高齢者や安静中の患者に重要です。', image: '/images/medical/benefit_1.png' },
        { tag: '安全、天然、非合成', desc: '最小限のリスクで日常的な患者使用向けに設計され、既存の栄養計画に容易に統合できます。', image: '/images/medical/benefit_2.png' },
        { tag: '代謝エネルギー生成', desc: 'ビタミンB群＋マグネシウム＋鉄 → ATP生成と酸素供給。', image: '/images/medical/benefit_3.png' },
        { tag: '創傷・組織修復', desc: 'ビタミンC、銅、亜鉛、リジン、硫黄がコラーゲン形成と抗酸化保護をサポートします。', image: '/images/medical/benefit_4.png' },
        { tag: '免疫安定性', desc: 'ビタミンA、D、E、亜鉛、セレンが免疫応答経路を強化します。', image: '/images/medical/benefit_5.png' },
      ]
    : [
        { tag: 'Muscle Metabolism & Strength', desc: 'Leucine-rich EAAs stimulate muscle protein synthesis, especially important for older adults and immobilized patients.', image: '/images/medical/benefit_1.png' },
        { tag: 'Safe, Natural, Non-Synthetic', desc: 'Designed for daily patient use with minimal risk and easy integration into existing feeding plans.', image: '/images/medical/benefit_2.png' },
        { tag: 'Metabolic Energy Production', desc: 'B-vitamins + magnesium + iron \u2192 ATP creation and oxygen delivery.', image: '/images/medical/benefit_3.png' },
        { tag: 'Wound & Tissue Repair', desc: 'Vitamin C, copper, zinc, lysine, and sulfur support collagen formation and antioxidant protection.', image: '/images/medical/benefit_4.png' },
        { tag: 'Immune Stability', desc: 'Vitamin A, D, E, zinc, and selenium strengthen immune response pathways.', image: '/images/medical/benefit_5.png' },
      ];

  const certDocuments = isJa
    ? [
        { label: 'JFRL食品試験報告書', preview: '/Images/medical/pdf/cert/JFRL Food Test Preview.jpg', pdf: '/Images/medical/pdf/cert/JFRL Food Test Report.pdf' },
        { label: '日本輸入許可証', preview: '/Images/medical/pdf/cert/Japan Import Permit Preview.jpg', pdf: '/Images/medical/pdf/cert/Japan Import Permit.pdf' },
      ]
    : [
        { label: 'JFRL Food Test Report', preview: '/Images/medical/pdf/cert/JFRL Food Test Preview.jpg', pdf: '/Images/medical/pdf/cert/JFRL Food Test Report.pdf' },
        { label: 'Japan Import Permit', preview: '/Images/medical/pdf/cert/Japan Import Permit Preview.jpg', pdf: '/Images/medical/pdf/cert/Japan Import Permit.pdf' },
      ];

  const blogEntries = isJa
    ? [
        { title: '回復リソースライブラリ', desc: '栄養が重要な理由と正しい摂り方を理解する', source: 'ESPEN Micronutrient Guideline (2022)' },
        { title: '代謝・微量栄養素インサイト', desc: 'ビタミン、アミノ酸、体の回復メカニズムを解説する記事', source: 'ASPEN Critical Care Guidelines (ICU, 2020)' },
        { title: '専門家の記事と研究', desc: '科学、回復、実際の患者ニーズをつなぐ知識', source: 'High-Leucine Essential Amino Acid Supplementation Study' },
      ]
    : [
        { title: 'Your Recovery Resource Library', desc: 'Understand why nutrition matters\u2014and how to get it right', source: 'ESPEN Micronutrient Guideline (2022)' },
        { title: 'Metabolic & Micronutrient Insights', desc: 'Articles explaining vitamins, amino acids, and how the body heals', source: 'ASPEN Critical Care Guidelines (ICU, 2020)' },
        { title: 'Expert Articles & Research', desc: 'Knowledge that connects science, recovery, and real patient needs', source: 'High-Leucine Essential Amino Acid Supplementation Study' },
      ];

  const functionLabels = isJa
    ? ['免疫防御', '細胞修復', 'コラーゲン形成', '筋タンパク質合成', 'エネルギー代謝']
    : ['Immune Defense', 'Cellular Repair', 'Collagen Formation', 'Muscle Protein Synthesis', 'Energy Metabolism'];

  return (
    <div className="bg-white text-[#333] font-[Inter,sans-serif]">
      {/* SVG sizing fallback styles - must be at top */}
      <style dangerouslySetInnerHTML={{ __html: `
        .icon-container { width: 48px !important; height: 48px !important; min-width: 48px !important; max-width: 48px !important; overflow: hidden; }
        .icon-container svg { width: 32px !important; height: 32px !important; max-width: 32px !important; max-height: 32px !important; }
        .hero-icon-wrap { display: inline-flex; width: 32px; height: 32px; }
        .hero-icon-wrap svg { width: 32px !important; height: 32px !important; }
        .ticker-star { width: 16px !important; height: 16px !important; max-width: 16px !important; max-height: 16px !important; flex-shrink: 0; }
      `}} />
      {/* ============================================================ */}
      {/*  SECTION 1 — Hero Banner                                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/medical/section_1_banner.png"
            alt="Healthcare hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#036A31] uppercase mb-4">
              Mother Vegetable | About
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-6">
              {isJa ? (
                <>ALL 45E:<br />患者回復のための完全コファクター栄養</>
              ) : (
                <>ALL 45E:<br />The Complete Cofactor Nutrition for Patient Recovery</>
              )}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#333] mb-8 max-w-xl">
              {isJa
                ? '入院中の成人における代謝安定性、組織修復、免疫機能をサポートするために設計された、天然・非合成の必須アミノ酸、ビタミン、ミネラルのブレンドです。'
                : 'A natural, non-synthetic blend of all essential amino acids, vitamins and minerals designed to support metabolic stability, tissue repair and immune function in hospitalised adults.'}
            </p>
            <a
              href="#what-is-all45e"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#036A31] transition-colors"
            >
              {isJa ? 'ALL 45Eとは？' : 'What is ALL 45E?'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hero stat cards */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {heroCards.map((card) => (
              <div
                key={card.value}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xl md:text-2xl font-bold leading-tight">{card.value}</span>
                  <HeroIcon name={card.icon} />
                </div>
                <p className="text-sm text-[#333] leading-snug">{card.label}</p>
                {card.sub && (
                  <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — Ticker                                          */}
      {/* ============================================================ */}
      <section className="bg-black py-3 overflow-hidden">
        <div className="flex animate-[ticker_20s_linear_infinite] whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="inline-flex items-center gap-2 text-[#BDF626] text-sm font-medium mx-8">
              <svg className="ticker-star w-4 h-4 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {isJa
                ? '臨床栄養 \u00a0|\u00a0 周術期回復 \u00a0|\u00a0 クリティカルケア \u00a0|\u00a0 高齢者サポート \u00a0|\u00a0 創傷治癒'
                : 'Clinical Nutrition \u00a0|\u00a0 Perioperative Recovery \u00a0|\u00a0 Critical Care \u00a0|\u00a0 Geriatric Support \u00a0|\u00a0 Wound Healing'}
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — Clinical Purpose                                */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                {isJa ? '臨床目的' : 'Clinical Purpose'}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-5">
                {isJa
                  ? 'ALL 45Eは、回復を助け、代謝機能を維持し、臨床的安定性を促進するために完全な栄養カバレッジが必要な場合に、包括的な微量栄養素と必須アミノ酸のサポートを提供するよう処方されています。'
                  : 'ALL 45E is formulated to provide comprehensive micronutrient and essential amino acid support where full nutritional coverage is required to aid recovery, maintain metabolic function, and promote overall clinical stability.'}
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                {isJa
                  ? '以下の状況において、栄養戦略に組み込むことができます：'
                  : 'It may be incorporated into a nutritional strategy in situations where:'}
              </p>

              <div className="space-y-4">
                {purposeChecks.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#036A31] text-white flex items-center justify-center text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <p className="text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: purpose cards */}
            <div className="space-y-4">
              {purposeCards.map((card) => (
                <div
                  key={card.text}
                  className="flex items-center gap-4 bg-[#f8faf8] border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="icon-container w-12 h-12 rounded-xl bg-[#036A31]/10 text-[#036A31] flex items-center justify-center shrink-0">
                    <PurposeIcon name={card.icon} />
                  </div>
                  <span className="text-sm md:text-base font-medium">{card.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer quote */}
          <div className="mt-12 bg-[#f4f8f5] border border-[#036A31]/10 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-base md:text-lg italic text-[#333] max-w-3xl mx-auto">
              {isJa
                ? '\u201CALL 45Eは、標準的な臨床栄養介入を補完するものであり、代替するものではありません。\u201D'
                : '\u201CALL 45E is designed to complement, not replace, standard clinical nutrition interventions.\u201D'}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — Our Mission                                     */}
      {/* ============================================================ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/medical/section_4_banner.png"
            alt="Mission background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 text-center text-white">
          <p className="text-sm font-semibold tracking-widest text-[#BDF626] uppercase mb-4">
            {isJa ? '私たちのミッション：' : 'Our Mission:'}
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-8 max-w-4xl mx-auto">
            {isJa
              ? '人体に必要なすべてのビルディングブロックを過不足なく提供すること。'
              : 'To provide the human body with every essential building block it needs \u2014 no more, no less.'}
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-white/90 leading-relaxed">
            <p>
              {isJa
                ? 'マザーベジタブルでは、臨床栄養のための科学的根拠に基づいた天然原料を開発しています。'
                : 'At Mother Vegetable, we develop science-driven, natural raw materials for clinical nutrition.'}
            </p>
            <p>
              {isJa
                ? '当社の処方は、特に摂取が予測不能で不十分、または障害のある病院環境において、回復を静かに損なう日常的な栄養ギャップを埋めるよう設計されています。'
                : 'Our formulations are designed to close daily nutritional gaps that silently compromise recovery, particularly in hospital environments where intake is often unpredictable, insufficient or impaired.'}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — What Is ALL 45E?                                */}
      {/* ============================================================ */}
      <section id="what-is-all45e" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#036A31] uppercase mb-3">
                {isJa ? 'Mother Vegetable | ALL 45Eとは' : 'Mother Vegetable | What is All 45E'}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                {isJa ? 'ALL 45Eとは？' : 'What Is ALL 45E?'}
              </h2>
              <p className="text-base md:text-lg font-bold leading-relaxed mb-6">
                {isJa
                  ? 'ALL 45Eは、食事摂取が生理的需要を満たさない場合に代謝回復をサポートするよう設計された、コファクターベースの医療栄養処方です。'
                  : 'ALL 45E is a cofactor-based medical nutrition formula designed to support metabolic recovery when dietary intake does not meet physiological demands.'}
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                {isJa
                  ? 'タンパク質合成、エネルギー代謝、免疫機能、細胞安定性をサポートするために、必須アミノ酸、ビタミン、ミネラルの完全なプロファイルを提供します。'
                  : 'It provides a complete profile of essential amino acids, vitamins, and minerals to support protein synthesis, energy metabolism, immune function, and cellular stability.'}
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                {isJa
                  ? 'ALL 45Eは、手術後、急性疾患後、または高齢者に一般的に見られる臨床的に関連する微量栄養素ギャップに対処することを目的としています。'
                  : 'ALL 45E is intended to help address clinically relevant micronutrient gaps commonly observed following surgery, acute illness, or in older adults.'}
              </p>
            </div>

            {/* Right: info box with floating labels */}
            <div className="relative bg-[#0B1F14] rounded-3xl p-8 md:p-10 min-h-[400px] flex flex-col justify-center">
              <div className="text-white space-y-4 mb-8">
                <p className="text-base font-medium">
                  {isJa
                    ? 'ALL 45Eはカロリーやタンパク質を代替するものではありません。'
                    : 'ALL 45E does not replace calories or protein.'}
                </p>
                <p className="text-base">
                  {isJa
                    ? '代わりに、体が以下のために必要とする必須微量栄養素とアミノ酸の基盤を提供します：'
                    : 'Instead, it provides the essential micronutrient and amino acid foundation the body needs for:'}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {functionLabels.map((label) => (
                  <span
                    key={label}
                    className="bg-[#BDF626] text-black text-xs md:text-sm font-semibold px-4 py-2 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 6 — Backed by Clinical Guidelines                   */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-[#036A31] uppercase mb-3">
              {isJa ? 'Mother Vegetable | 臨床ガイドライン' : 'Mother Vegetable | Clinical Guidelines'}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {isJa ? '臨床ガイドラインに裏付けられた' : 'Backed by Clinical Guidelines'}
            </h2>
            <p className="text-base md:text-lg text-[#555]">
              {isJa ? 'ALL 45Eは主要な推奨事項に沿っています：' : 'ALL 45E aligns with major recommendations:'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {guidelineCards.map((card) => (
              <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-[#555] mb-4">{card.text}</p>
                <small className="text-xs text-gray-400 italic">{card.citation}</small>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-base text-[#555] mb-2">
              {isJa
                ? '早期の栄養は不可欠です。微量栄養素の充足は合併症を減らし、回復をサポートします。'
                : 'Early nutrition is essential; micronutrient adequacy reduces complications and supports recovery.'}
            </p>
            <p className="text-base font-bold">
              {isJa ? 'ALL 45Eは以下にシームレスに適合します：' : 'ALL 45E fits seamlessly into:'}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {guidelineFits.map((item) => (
              <div key={item.label} className="relative rounded-2xl overflow-hidden h-48 md:h-56 group">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 7 — Indications & Patient Profiles                  */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {isJa ? '適応症と患者プロファイル' : 'Indications & Patient Profiles'}
            </h2>
            <p className="text-base md:text-lg text-[#555]">
              {isJa
                ? 'ALL 45Eは以下を含む成人患者に検討できます：'
                : 'ALL 45E may be considered for adult patients including:'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patientProfiles.map((p) => (
              <div key={p.title} className="flex items-start gap-4 bg-[#f8faf8] border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="icon-container w-12 h-12 rounded-xl bg-[#036A31]/10 text-[#036A31] flex items-center justify-center shrink-0">
                  <PatientIcon name={p.icon} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{p.title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 8 — Certified By                                    */}
      {/* ============================================================ */}
      <section className="py-12 md:py-16 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              {isJa ? '認証' : 'Certified By'}
            </h2>
            <div className="flex items-center gap-8 md:gap-12">
              {['gmp', 'jfrl', 'haccp'].map((cert) => (
                <Image
                  key={cert}
                  src={`/Images/medical/${cert}.png`}
                  alt={cert.toUpperCase()}
                  width={100}
                  height={100}
                  className="w-[80px] md:w-[100px] h-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 9 — Clinical Benefits at a Glance                   */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Text card */}
            <div className="bg-[#0B1F14] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-center lg:row-span-2">
              <p className="text-xs font-semibold tracking-widest text-[#BDF626] uppercase mb-3">
                {isJa ? 'Mother Vegetable | 臨床エビデンス' : 'Mother Vegetable | Clinical Evidence'}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                {isJa ? '臨床効果の概要' : 'Clinical Benefits at a Glance'}
              </h2>
              <p className="text-base text-white/80 leading-relaxed mb-6">
                {isJa
                  ? 'ALL 45Eは、代謝機能、回復、臨床的安定性に必要な必須栄養基盤を提供します。'
                  : 'ALL 45E provides the essential nutritional foundation required for metabolic function, recovery, and clinical stability.'}
              </p>
              <ul className="space-y-3">
                {benefitCards.map((b) => (
                  <li key={b.tag} className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#BDF626] shrink-0" />
                    {b.tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image benefit cards */}
            {benefitCards.map((b) => (
              <div key={b.tag} className="relative rounded-2xl overflow-hidden h-64 group">
                <Image
                  src={b.image}
                  alt={b.tag}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block bg-[#BDF626] text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {b.tag}
                  </span>
                  <p className="text-white text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 10 — International Guidelines & Research            */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-16 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {isJa ? (
                <>国際ガイドラインと<br />公表された臨床研究</>
              ) : (
                <>International Guidelines &amp;<br />Published Clinical Research</>
              )}
            </h2>
            <p className="text-base md:text-lg text-[#555] max-w-3xl mx-auto">
              {isJa
                ? 'ALL 45Eは、回復のための微量栄養素の充足を支持するESPEN、ASPEN、ERASガイドラインに沿っています。'
                : 'ALL 45E aligns with ESPEN, ASPEN, and ERAS guidelines supporting micronutrient adequacy for recovery.'}
            </p>
          </div>

          <ResearchSlider />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 11 — What's Inside ALL 45E                          */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                {isJa ? 'ALL 45Eの成分' : 'What\u0027s Inside ALL 45E'}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                {isJa
                  ? 'ALL 45Eは、代謝回復をサポートするために、必須アミノ酸、ビタミン、ミネラルの完全なプロファイルを提供するよう処方されています。'
                  : 'ALL 45E is formulated to provide a complete profile of essential amino acids, vitamins, and minerals to support metabolic recovery.'}
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-8">
                {isJa
                  ? '各栄養素は、エネルギー代謝、酵素活性化、免疫安定性、組織修復をサポートする定義された生理的機能のために選択されています。'
                  : 'Each nutrient is selected for a defined physiological function\u2014supporting energy metabolism, enzyme activation, immune stability, and tissue repair.'}
              </p>

              <h3 className="text-lg font-bold mb-4">
                {isJa ? '主要成分・栄養素グループ' : 'Key Ingredients & Nutrient Groups'}
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="font-bold text-base mb-1">
                    {isJa ? '\u2022 必須アミノ酸（EAA）' : '\u2022 Essential Amino Acids (EAAs)'}
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    {isJa
                      ? 'ロイシン、イソロイシン、バリン、リジン、スレオニン、メチオニン、フェニルアラニン、トリプトファン、ヒスチジン'
                      : 'Leucine, Isoleucine, Valine, Lysine, Threonine, Methionine, Phenylalanine, Tryptophan, Histidine'}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-base mb-1">
                    {isJa ? '\u2022 ビタミン' : '\u2022 Vitamins'}
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed mb-1">
                    {isJa ? 'ビタミンA、C、D、E、K' : 'Vitamins A, C, D, E, K'}
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    {isJa ? 'ビタミンB群（B1、B2、B3、B5、B6、B7、B9、B12）' : 'B-complex vitamins (B1, B2, B3, B5, B6, B7, B9, B12)'}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-base mb-1">
                    {isJa ? '\u2022 ミネラル・微量元素' : '\u2022 Minerals & Trace Elements'}
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    {isJa
                      ? 'カルシウム、マグネシウム、亜鉛、鉄、セレン、銅、ヨウ素、マンガン、クロム、モリブデン'
                      : 'Calcium, Magnesium, Zinc, Iron, Selenium, Copper, Iodine, Manganese, Chromium, Molybdenum'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: product image area */}
            <div className="relative rounded-3xl overflow-hidden min-h-[450px] md:min-h-[550px]">
              <Image
                src="/images/medical/section_whats_inside.png"
                alt="ALL 45E product"
                fill
                className="object-cover"
              />
              {/* Overlays */}
              <div className="absolute top-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 text-sm leading-relaxed">
                {isJa
                  ? 'ALL 45Eの各成分は、回復に不可欠な生化学的経路をサポートする定義された代謝的役割を果たします。'
                  : 'Each component in ALL 45E serves a defined metabolic role, supporting biochemical pathways essential for recovery.'}
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 text-sm leading-relaxed text-center">
                {isJa
                  ? '非合成微量栄養素 \u2022 ベジタリアン対応 \u2022 臨床栄養サポート用に設計'
                  : 'Non-synthetic micronutrients \u2022 Suitable for vegetarian diets \u2022 Designed for clinical nutrition support'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 12 — Quality, Safety & Certifications               */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-[#036A31] uppercase mb-3">
              {isJa ? 'Mother Vegetable | 認証' : 'Mother Vegetable | Certificate'}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 inline-flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#036A31]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {isJa ? '品質、安全性、認証' : 'Quality, Safety & Certifications'}
            </h2>
            <p className="text-base md:text-lg text-[#555] max-w-3xl mx-auto">
              {isJa
                ? 'ALL 45Eは、一貫性、トレーサビリティ、施設要件をサポートするよう設計された構造化された品質・安全性フレームワークの下で製造されています。'
                : 'ALL 45E is manufactured under a structured quality and safety framework designed to support consistency, traceability, and institutional requirements.'}
            </p>
          </div>

          {/* Certification document cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {certDocuments.map((doc) => (
              <a
                key={doc.label}
                href={doc.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group block"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                  <Image
                    src={doc.preview}
                    alt={doc.label}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      {isJa ? '表示' : 'View'}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[#036A31] text-white text-center">
                  <span className="text-sm font-semibold">{doc.label}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 italic max-w-xl mx-auto">
              {isJa ? (
                <>医療専門家向けです。<br />適用は施設のプロトコルと臨床判断に従ってください。</>
              ) : (
                <>Intended for healthcare professional use.<br />Application should follow institutional protocols and clinical judgment.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 13 — Blog / News                                    */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#036A31] uppercase mb-2">
                {isJa ? 'Mother Vegetable | ニュース＆ブログ' : 'Mother Vegetable | News & Blog'}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {isJa ? (
                  <>最新ニュース<br />＆ブログ</>
                ) : (
                  <>Our Latest<br />News &amp; Blog</>
                )}
              </h2>
            </div>
            <a href="#" className="text-sm font-semibold text-[#036A31] hover:underline hidden md:inline-flex items-center gap-1">
              {isJa ? 'すべてのブログを見る \u2192' : 'View All Blog \u2192'}
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogEntries.map((blog) => (
              <div key={blog.title} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100">
                  <Image
                    src="/images/medical/research_placeholder.png"
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">PDF</span>
                    <span className="text-xs text-gray-400">23 January 2022</span>
                  </div>
                  <h3 className="text-base font-bold mb-2">{blog.title}</h3>
                  <p className="text-sm text-[#555] mb-3">{blog.desc}</p>
                  <a href="#" className="text-[#036A31] text-sm font-semibold hover:underline">
                    {isJa ? '続きを読む \u2192' : 'Read More \u2192'}
                  </a>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {isJa ? '出典' : 'Source'}: &ldquo;{blog.source}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
