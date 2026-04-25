"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */
const CURRENT_PURCHASES = 78;
const TARGET_PURCHASES = 100;
const PROGRESS_PCT = (CURRENT_PURCHASES / TARGET_PURCHASES) * 100;
const IS_ACHIEVED = CURRENT_PURCHASES >= TARGET_PURCHASES;
const MVT_REWARD_ON_MAX = 500;

const MOCK_RECENT_PURCHASES = [
  { name: "まっちゃ好き", product: "マザベジ塩", time: "2分" },
  { name: "健康マニア", product: "Achieve", time: "5分" },
  { name: "MV愛用者", product: "Confidence", time: "12分" },
  { name: "グリーンライフ", product: "マザベジ味噌", time: "18分" },
  { name: "ナチュラルさん", product: "MV ソープ", time: "25分" },
  { name: "べジータ", product: "マザベジわさび", time: "30分" },
  { name: "オーガニック派", product: "MV トナー", time: "38分" },
  { name: "味噌っ子", product: "マザベジポン酢", time: "42分" },
  { name: "美肌ママ", product: "MV バーム", time: "51分" },
  { name: "抹茶ラバー", product: "マザベジ抹茶", time: "55分" },
  { name: "発酵おじさん", product: "マザベジ味噌", time: "63分" },
  { name: "スキンケア命", product: "MV ソープ", time: "70分" },
];

/* ------------------------------------------------------------------ */
/* Sparkle keyframes (injected once via <style>)                       */
/* ------------------------------------------------------------------ */
const sparkleCSS = `
@keyframes sparkle-float {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(0); opacity: 0; }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 8px 2px rgba(37,199,96,0.4), 0 0 20px 4px rgba(37,199,96,0.15); }
  50% { box-shadow: 0 0 16px 6px rgba(37,199,96,0.6), 0 0 40px 10px rgba(37,199,96,0.25); }
}
@keyframes pulse-glow-gold {
  0%, 100% { box-shadow: 0 0 12px 4px rgba(251,191,36,0.55), 0 0 30px 10px rgba(251,191,36,0.25); }
  50% { box-shadow: 0 0 28px 10px rgba(251,191,36,0.8), 0 0 60px 18px rgba(251,191,36,0.4); }
}
@keyframes shimmer-up {
  0% { background-position: 0 200%; }
  100% { background-position: 0 -200%; }
}
`;

/* ------------------------------------------------------------------ */
/* Reward icons – brand-specific SVGs (Founder, Fish, MVT coin, Superwood) */
/* ------------------------------------------------------------------ */
function IconFounder() {
  // Earth + crown — "build SEF together, your name is on it"
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="rwd-earth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5dfa8e" />
          <stop offset="100%" stopColor="#1a9b4a" />
        </linearGradient>
      </defs>
      {/* Crown */}
      <path d="M16 18 L22 8 L32 16 L42 8 L48 18 L46 24 L18 24 Z"
        fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="22" cy="11" r="2" fill="#fde68a" />
      <circle cx="32" cy="9"  r="2.2" fill="#fde68a" />
      <circle cx="42" cy="11" r="2" fill="#fde68a" />
      {/* Earth */}
      <circle cx="32" cy="40" r="14" fill="url(#rwd-earth)" stroke="#0a4d2e" strokeWidth="1.5" />
      <path d="M22 36 Q26 33 31 35 Q35 37 30 41 Q26 44 22 42 Z" fill="#1ea84e" opacity="0.85" />
      <path d="M36 44 Q41 41 44 45 Q42 49 38 48 Z" fill="#1ea84e" opacity="0.85" />
      <circle cx="32" cy="40" r="14" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}

function IconFish() {
  // Friendly fish over water ripples – AquaCulture
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="rwd-fish" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5dfa8e" />
          <stop offset="100%" stopColor="#1a9b4a" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path d="M10 32 Q20 18 38 22 Q48 24 50 32 Q48 40 38 42 Q20 46 10 32 Z"
        fill="url(#rwd-fish)" stroke="#0a4d2e" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Tail */}
      <path d="M48 24 L58 18 L58 46 L48 40 Z" fill="#1ea84e" stroke="#0a4d2e" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Eye */}
      <circle cx="40" cy="29" r="2.5" fill="#fff" />
      <circle cx="40.5" cy="29" r="1.3" fill="#0a4d2e" />
      {/* Smile */}
      <path d="M37 33 Q40 36 43 33" stroke="#0a4d2e" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="14" cy="20" r="2" fill="#5dfa8e" opacity="0.7" />
      <circle cx="20" cy="14" r="1.4" fill="#5dfa8e" opacity="0.6" />
      {/* Ripples */}
      <path d="M6 52 Q12 48 18 52 Q24 56 30 52 Q36 48 42 52 Q48 56 54 52 Q60 48 62 52"
        stroke="#5dfa8e" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function IconMvtCoin() {
  // Gold coin with green leaf inside — MVT mega boost
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 mx-auto" aria-hidden="true">
      <defs>
        <radialGradient id="rwd-coin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="22" fill="url(#rwd-coin)" stroke="#7a4a07" strokeWidth="2" />
      <circle cx="32" cy="32" r="18" fill="none" stroke="#fde68a" strokeWidth="1" opacity="0.6" />
      {/* Leaf */}
      <path d="M32 18 Q44 24 38 38 Q26 44 24 32 Q22 22 32 18 Z"
        fill="#1ea84e" stroke="#0a4d2e" strokeWidth="1.2" />
      <path d="M28 36 Q32 28 36 24" stroke="#0a4d2e" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* x5 badge */}
      <g transform="translate(44 8)">
        <circle r="9" fill="#dc2626" stroke="#fff" strokeWidth="1.5" />
        <text textAnchor="middle" y="3.5" fontSize="9" fontWeight="900" fill="#fff" fontFamily="Arial">×5</text>
      </g>
    </svg>
  );
}

function IconSuperwood() {
  // Wood block house — Superwood DIY kit
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="rwd-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a06e3d" />
          <stop offset="100%" stopColor="#553319" />
        </linearGradient>
      </defs>
      {/* Roof */}
      <polygon points="14,28 32,12 50,28" fill="#1ea84e" stroke="#0a4d2e" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="32,12 50,28 46,28 32,16" fill="#0a4d2e" opacity="0.4" />
      {/* House body — wood blocks */}
      <rect x="16" y="28" width="32" height="22" fill="url(#rwd-wood)" stroke="#3d2410" strokeWidth="1.5" />
      {/* Plank lines */}
      <line x1="16" y1="34" x2="48" y2="34" stroke="#3d2410" strokeWidth="0.8" opacity="0.7" />
      <line x1="16" y1="40" x2="48" y2="40" stroke="#3d2410" strokeWidth="0.8" opacity="0.7" />
      <line x1="16" y1="46" x2="48" y2="46" stroke="#3d2410" strokeWidth="0.8" opacity="0.7" />
      {/* Door */}
      <rect x="28" y="38" width="8" height="12" fill="#3d2410" stroke="#1a0e07" strokeWidth="1" />
      <circle cx="34" cy="44" r="0.8" fill="#fbbf24" />
      {/* Block stack on the side */}
      <rect x="50" y="42" width="9" height="4" fill="url(#rwd-wood)" stroke="#3d2410" strokeWidth="0.8" />
      <rect x="50" y="46" width="9" height="4" fill="url(#rwd-wood)" stroke="#3d2410" strokeWidth="0.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Reward items data – mapped to SVG components by `iconKey`           */
/* ------------------------------------------------------------------ */
type RewardItem = { iconKey: "founder" | "fish" | "mvtCoin" | "superwood"; key: string; descKey: string };
const REWARDS: readonly RewardItem[] = [
  { iconKey: "founder",   key: "rewardFounder",   descKey: "rewardFounderDesc"   },
  { iconKey: "fish",      key: "rewardFish",      descKey: "rewardFishDesc"      },
  { iconKey: "mvtCoin",   key: "rewardMvtBoost",  descKey: "rewardMvtBoostDesc"  },
  { iconKey: "superwood", key: "rewardSuperwood", descKey: "rewardSuperwoodDesc" },
] as const;

function RewardIcon({ iconKey }: { iconKey: RewardItem["iconKey"] }) {
  switch (iconKey) {
    case "founder":   return <IconFounder />;
    case "fish":      return <IconFish />;
    case "mvtCoin":   return <IconMvtCoin />;
    case "superwood": return <IconSuperwood />;
  }
}

/* ------------------------------------------------------------------ */
/* Section header icons – replace generic emoji with branded SVGs      */
/* ------------------------------------------------------------------ */
function IconLightningBolt({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 48" width={size * 0.66} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="bolt-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <filter id="bolt-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M19 1 L4 26 L13 26 L9 47 L28 18 L18 18 L22 1 Z"
        fill="url(#bolt-grad)"
        stroke="#7a4a07"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#bolt-glow)"
      />
      <path d="M17 4 L7 24 L13 24" stroke="#fffbe6" strokeWidth="0.8" fill="none" opacity="0.7" />
    </svg>
  );
}

function IconRewardsTrophy({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="trophy-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <radialGradient id="trophy-gem" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#1ea84e" />
        </radialGradient>
      </defs>
      {/* Cup */}
      <path
        d="M16 8 L48 8 L46 30 Q44 40 32 42 Q20 40 18 30 Z"
        fill="url(#trophy-grad)"
        stroke="#7a4a07"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Side handles */}
      <path d="M16 12 Q6 14 8 24 Q10 30 16 28" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 12 Q58 14 56 24 Q54 30 48 28" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      {/* Stem */}
      <rect x="28" y="42" width="8" height="8" fill="#b45309" />
      {/* Base */}
      <rect x="20" y="50" width="24" height="6" rx="2" fill="url(#trophy-grad)" stroke="#7a4a07" strokeWidth="1.5" />
      <rect x="22" y="56" width="20" height="4" fill="#7a4a07" />
      {/* MV gem on cup */}
      <circle cx="32" cy="22" r="6" fill="url(#trophy-gem)" stroke="#0a4d2e" strokeWidth="1.2" />
      <path d="M32 18 Q35 22 32 26 Q29 22 32 18 Z" fill="#fffbe6" opacity="0.6" />
      {/* Sparkles */}
      <g fill="#fde68a" opacity="0.9">
        <path d="M8 6 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1z" />
        <path d="M56 4 l0.7 2 2 0.7 -2 0.7 -0.7 2 -0.7 -2 -2 -0.7 2 -0.7z" />
        <path d="M52 38 l0.7 2 2 0.7 -2 0.7 -0.7 2 -0.7 -2 -2 -0.7 2 -0.7z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small sparkle component                                             */
/* ------------------------------------------------------------------ */
function Sparkles({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const left = 10 + Math.random() * 80; // % inside the bar
        const delay = Math.random() * 3; // s
        const duration = 1.5 + Math.random() * 1.5;
        const size = 2 + Math.random() * 3;
        return (
          <span
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${left}%`,
              bottom: `${PROGRESS_PCT - 4}%`,
              width: size,
              height: size,
              background: "white",
              animation: `sparkle-float ${duration}s ${delay}s ease-out infinite`,
            }}
          />
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Confetti burst – used when IS_ACHIEVED                              */
/* ------------------------------------------------------------------ */
const CONFETTI_COLORS = [
  "#25c760",
  "#5dfa8e",
  "#fbbf24",
  "#f59e0b",
  "#ff9fbb",
  "#f472b6",
  "#fde68a",
  "#34d399",
];

type ConfettiParticle = {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  rotate: number;
  shape: "square" | "circle";
};

// Deterministic pseudo-random so SSR and client render identically
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildConfetti(count: number, seed = 42): ConfettiParticle[] {
  const rand = seededRand(seed);
  return Array.from({ length: count }, (_, i) => {
    const size = 6 + rand() * 8;
    return {
      id: i,
      left: rand() * 100,
      color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)] as string,
      size,
      duration: 2.4 + rand() * 2.4,
      delay: rand() * 2.5,
      driftX: (rand() - 0.5) * 240,
      rotate: (rand() - 0.5) * 720,
      shape: rand() > 0.5 ? "square" : "circle",
    };
  });
}

const CONFETTI: ConfettiParticle[] = buildConfetti(42);

function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CONFETTI.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-10%",
            width: p.size,
            height: p.shape === "circle" ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.shape === "circle" ? "9999px" : "2px",
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["0%", "120%"],
            x: [0, p.driftX],
            rotate: [0, p.rotate],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
            times: [0, 0.1, 0.85, 1],
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Starburst rays behind the mascot                                    */
/* ------------------------------------------------------------------ */
function Starburst() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div
        className="absolute"
        style={{
          width: 220,
          height: 220,
          background:
            "conic-gradient(from 0deg, rgba(251,191,36,0.55) 0deg, transparent 18deg, rgba(251,191,36,0.55) 36deg, transparent 54deg, rgba(253,230,138,0.55) 72deg, transparent 90deg, rgba(251,191,36,0.55) 108deg, transparent 126deg, rgba(251,191,36,0.55) 144deg, transparent 162deg, rgba(253,230,138,0.55) 180deg, transparent 198deg, rgba(251,191,36,0.55) 216deg, transparent 234deg, rgba(251,191,36,0.55) 252deg, transparent 270deg, rgba(253,230,138,0.55) 288deg, transparent 306deg, rgba(251,191,36,0.55) 324deg, transparent 342deg)",
          borderRadius: "9999px",
          filter: "blur(2px)",
          opacity: 0.55,
          animation: "starburst-spin 14s linear infinite",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 22%, rgba(0,0,0,1) 60%)",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 22%, rgba(0,0,0,1) 60%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radial sweep overlay                                                */
/* ------------------------------------------------------------------ */
function RadialSweep() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.28) 0%, rgba(93,250,142,0.18) 40%, transparent 70%)",
        animation: "radial-sweep 3.2s ease-in-out infinite",
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Golden shimmer ribbon banner – top of card when IS_ACHIEVED         */
/* ------------------------------------------------------------------ */
function JackpotRibbon({ main, sub }: { main: string; sub: string }) {
  return (
    <motion.div
      className="relative mx-auto mb-5 w-full max-w-2xl"
      initial={{ y: -60, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
    >
      <div
        className="relative overflow-hidden rounded-xl border-2 border-yellow-200/70 py-3 px-4 text-center"
        style={{
          background:
            "linear-gradient(90deg, #b45309 0%, #fbbf24 20%, #fde68a 50%, #fbbf24 80%, #b45309 100%)",
          backgroundSize: "200% 100%",
          animation:
            "ribbon-shimmer 3.5s linear infinite, pulse-glow-gold 2.4s ease-in-out infinite",
          color: "#3d2a00",
          textShadow: "0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Moving shine overlay */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.65) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "ribbon-shimmer 2.2s linear infinite",
            mixBlendMode: "overlay",
          }}
        />
        <p className="relative text-lg md:text-2xl font-black tracking-wider">
          {main}
        </p>
        <p className="relative mt-0.5 text-[11px] md:text-sm font-bold tracking-[0.25em] uppercase">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* マザベジちゃん mascot – single character, grows subtly with progress */
/* ------------------------------------------------------------------ */
function MazaVegiChan({ progress }: { progress: number }) {
  const isMax = progress >= 100;
  // Always shown as full mascot; size scales up noticeably with progress
  const t = Math.min(1, Math.max(0, progress / 100));
  const scale = 0.8 + t * 0.7;   // 0.8 -> 1.5 (up to 50% larger at MAX)
  const opacity = 0.85 + t * 0.15; // 0.85 -> 1.0

  return (
    <motion.div
      className="relative flex flex-col items-center gap-1"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Starburst behind mascot – only on MAX */}
      {isMax && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 0 }}
        >
          <Starburst />
        </div>
      )}

      {/* Mascot image with stage-based scale/opacity */}
      <motion.div
        className="relative"
        style={{ zIndex: 1 }}
        animate={
          isMax
            ? { y: [0, -8, 0, -4, 0], rotate: [-4, 4, -3, 3, -4], scale: [scale, scale * 1.06, scale] }
            : { y: [0, -4, 0] }
        }
        transition={
          isMax
            ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale, opacity }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ filter: isMax ? "drop-shadow(0 0 18px rgba(251,191,36,0.7))" : "none" }}
        >
          <Image
            src="/cdn/mazaveji-mama.png"
            alt="マザベジちゃん"
            width={180}
            height={220}
            priority={false}
            className="pointer-events-none select-none"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.span
        className="relative z-10 text-[10px] md:text-xs font-bold whitespace-nowrap"
        style={{ color: isMax ? "#fbbf24" : "#25c760" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        マザベジちゃん
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function JackpotMeter() {
  const t = useTranslations("jackpot");
  const locale = useLocale();

  return (
    <>
      {/* Inject keyframe CSS once */}
      <style>{sparkleCSS}</style>

      <div className="relative rounded-2xl border border-white/10 bg-gray-950 p-6 md:p-10 shadow-2xl [&>*]:relative">
        {/* Radial gradient background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(37,199,96,0.10) 0%, transparent 60%)",
          }}
        />

        {/* MAX-only glowing radial sweep behind the meter */}
        {IS_ACHIEVED && <RadialSweep />}

        {/* MAX-only confetti burst over the card */}
        {IS_ACHIEVED && <ConfettiBurst />}

        {/* Golden shimmer ribbon banner */}
        {IS_ACHIEVED && (
          <JackpotRibbon
            main={t("jackpotMaxBanner")}
            sub={t("jackpotMaxBannerSub")}
          />
        )}

        {/* Header */}
        <div className="relative mb-6 text-center">
          <h2 className="inline-flex items-center justify-center gap-2.5 text-2xl md:text-3xl font-bold text-white tracking-wide">
            <IconLightningBolt size={32} />
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Meter + feed layout */}
        <div className="relative flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-8">
          {/* ─── Power Bar + マザベジママ ─── */}
          <div className="flex flex-col items-center gap-3 shrink-0 mx-auto md:mx-0">
            {/* Status label */}
            <motion.p
              className="text-sm md:text-base font-bold tracking-wider text-center"
              style={{ color: IS_ACHIEVED ? "#fbbf24" : "#25c760" }}
              animate={
                IS_ACHIEVED
                  ? { scale: [1, 1.08, 1], opacity: [1, 0.8, 1] }
                  : {}
              }
              transition={
                IS_ACHIEVED
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            >
              {IS_ACHIEVED ? t("jackpotFull") : t("charging")}
            </motion.p>

            {/* Bar + Mascot row */}
            <div className="flex flex-row items-end gap-4">
              {/* Bar container */}
              <div className="relative flex items-end" style={{ height: 320, width: 64 }}>
                {/* "POWER" label – vertical text along the left */}
                <span
                  className="absolute -left-7 top-1/2 -translate-y-1/2 text-[10px] font-extrabold tracking-[0.35em] text-gray-600 select-none"
                  style={{ writingMode: "vertical-lr", textOrientation: "mixed", transform: "rotate(180deg) translateY(50%)" }}
                >
                  POWER
                </span>

                {/* Outer bezel */}
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, #111 0%, #1a1a1a 100%)",
                    border: IS_ACHIEVED
                      ? "2px solid rgba(251,191,36,0.55)"
                      : "2px solid rgba(37,199,96,0.25)",
                    animation: IS_ACHIEVED
                      ? "pulse-glow-gold 2.2s ease-in-out infinite"
                      : "pulse-glow 2.5s ease-in-out infinite",
                  }}
                >
                  {/* Filled portion – grows from bottom */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full rounded-b-lg"
                    style={{
                      background: IS_ACHIEVED
                        ? "linear-gradient(0deg, #1a9b4a 0%, #25c760 35%, #5dfa8e 65%, #fde68a 85%, #fbbf24 100%)"
                        : "linear-gradient(0deg, #1a9b4a 0%, #25c760 50%, #5dfa8e 100%)",
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${PROGRESS_PCT}%` }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />

                  {/* Pulsing glow at fill level */}
                  <motion.div
                    className="absolute left-0 w-full"
                    style={{
                      height: 16,
                      bottom: `calc(${PROGRESS_PCT}% - 8px)`,
                      background: IS_ACHIEVED
                        ? "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.85) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at 50% 50%, rgba(93,250,142,0.7) 0%, transparent 70%)",
                      filter: "blur(4px)",
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Shimmer overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                      backgroundSize: "100% 200%",
                      animation: "shimmer-up 3s linear infinite",
                    }}
                  />

                  {/* Sparkle particles */}
                  <Sparkles count={IS_ACHIEVED ? 18 : 10} />
                </div>
              </div>

              {/* ─── マザベジちゃん ─── */}
              <MazaVegiChan progress={PROGRESS_PCT} />
            </div>
          </div>

          {/* ─── Recent Purchases Feed ─── */}
          <div className="relative flex-1 w-full min-w-0 rounded-xl border border-white/5 bg-black/30 p-4 md:p-6 self-stretch">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("recentPurchases")}
            </h3>
            <ul className="space-y-3">
              {MOCK_RECENT_PURCHASES.map((p, i) => (
                <motion.li
                  key={i}
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <span className="text-gray-300">
                    {t("purchasedBy", { name: p.name, product: p.product })}
                  </span>
                  <span className="ml-4 shrink-0 text-xs text-gray-500">
                    {t("ago", { time: p.time })}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── SEF Gallery (below the meter + feed row) ─── */}
        <div className="relative mt-6 md:mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="/cdn/sef_building_home.png" alt="SEF Building" className="w-full h-48 md:h-56 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="/cdn/sef_factory.jpg" alt="SEF Factory" className="w-full h-48 md:h-56 object-cover" />
            </div>
          </div>
        </div>

        {/* ─── Jackpot Rewards Section ─── */}
        <motion.div
          className="relative mt-8 rounded-xl border border-[#25c760]/20 bg-gradient-to-br from-[#25c760]/5 to-transparent p-5 md:p-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* MVT drop banner – only on MAX */}
          {IS_ACHIEVED && (
            <div className="mb-5 flex justify-center">
              <motion.div
                className="relative inline-flex items-center gap-3 rounded-full border-2 border-yellow-300/80 px-5 py-2.5 shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24 0%, #fde68a 45%, #fbbf24 100%)",
                  color: "#3d2a00",
                  animation:
                    "mvt-drop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both, pulse-glow-gold 2.4s ease-in-out 1.6s infinite",
                }}
                initial={false}
                whileHover={{ scale: 1.04 }}
              >
                <span
                  className="inline-block text-2xl md:text-3xl"
                  style={{
                    animation: "coin-spin 2.4s linear infinite",
                    transformStyle: "preserve-3d",
                  }}
                  role="img"
                  aria-label="coin"
                >
                  🪙
                </span>
                <span className="text-base md:text-xl font-black tracking-wider">
                  {t("mvtEarned", { amount: MVT_REWARD_ON_MAX })}
                </span>
              </motion.div>
            </div>
          )}

          {/* Section header */}
          <div className="mb-5 text-center">
            {/* Sample badge — these perks are illustrative examples */}
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-300/40 text-yellow-300 text-[10px] md:text-xs font-bold tracking-wider uppercase">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
                Sample / サンプル
              </span>
            </div>
            <motion.h3
              className="inline-flex items-center justify-center gap-2.5 text-lg md:text-xl font-bold text-white"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <IconRewardsTrophy size={28} />
              {t("rewardsTitle")}
            </motion.h3>
            <p className="mt-1 text-xs md:text-sm text-gray-400">
              {t("rewardsSubtitle")}
            </p>
            <p className="mt-1 text-[10px] md:text-xs text-yellow-400/70 italic">
              {locale === 'ja'
                ? '※ 上記特典は構想段階のサンプルです。実際の内容は変更される場合があります。'
                : locale === 'zh'
                ? '※ 以上奖励为概念样例，实际内容可能有所变更。'
                : '※ These perks are illustrative samples and the final program may differ.'}
            </p>
          </div>

          {/* Reward cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REWARDS.map((reward, i) => (
              <motion.div
                key={reward.key}
                className="group relative overflow-hidden rounded-lg border border-white/5 bg-black/40 p-4 text-center transition-colors hover:border-[#25c760]/30"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Subtle glow on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(37,199,96,0.08) 0%, transparent 70%)",
                  }}
                />
                <div className="relative mb-3 flex items-center justify-center">
                  <RewardIcon iconKey={reward.iconKey} />
                </div>
                <p className="relative text-sm md:text-base font-bold text-[#25c760] leading-snug">
                  {t(reward.key)}
                </p>
                <p className="relative mt-1.5 text-xs text-gray-400 leading-relaxed">
                  {t(reward.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
