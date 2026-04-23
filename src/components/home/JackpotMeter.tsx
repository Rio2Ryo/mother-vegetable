"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */
const CURRENT_PURCHASES = 67;
const TARGET_PURCHASES = 100;
const PROGRESS_PCT = (CURRENT_PURCHASES / TARGET_PURCHASES) * 100;
const IS_ACHIEVED = CURRENT_PURCHASES >= TARGET_PURCHASES;

const MOCK_RECENT_PURCHASES = [
  { name: "まっちゃ好き", product: "マザベジ塩", time: "2分" },
  { name: "健康マニア", product: "Achieve", time: "5分" },
  { name: "MV愛用者", product: "Confidence", time: "12分" },
  { name: "グリーンライフ", product: "マザベジ味噌", time: "18分" },
  { name: "ナチュラルさん", product: "MV ソープ", time: "25分" },
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
@keyframes shimmer-up {
  0% { background-position: 0 200%; }
  100% { background-position: 0 -200%; }
}
`;

/* ------------------------------------------------------------------ */
/* Reward items data                                                   */
/* ------------------------------------------------------------------ */
const REWARDS = [
  { icon: "🏷️", key: "rewardDiscount", descKey: "rewardDiscountDesc" },
  { icon: "🎁", key: "rewardGoods", descKey: "rewardGoodsDesc" },
  { icon: "🪙", key: "rewardToken", descKey: "rewardTokenDesc" },
] as const;

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
/* MazaVege-chan mascot – grows with purchase progress                  */
/* ------------------------------------------------------------------ */
function MazaVegiChan({ progress }: { progress: number }) {
  // Scale from 0.35 (0%) to 1.0 (100%)
  const scale = 0.35 + (progress / 100) * 0.65;
  // Sprout stage: tiny seed → small sprout → medium plant → full bloom
  const stage = progress < 25 ? 0 : progress < 50 ? 1 : progress < 75 ? 2 : 3;
  const labels = ["たねちゃん", "ふたばちゃん", "すくすくちゃん", "マザベジちゃん"];

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 80 * scale, height: 110 * scale }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Pot */}
        <rect x="30" y="120" width="60" height="35" rx="8" fill="#5a3e28" />
        <rect x="25" y="115" width="70" height="12" rx="4" fill="#6b4c30" />
        <ellipse cx="60" cy="122" rx="28" ry="4" fill="#3d2a1a" opacity="0.3" />

        {/* Soil */}
        <ellipse cx="60" cy="122" rx="25" ry="6" fill="#4a3520" />

        {/* Stem – taller at higher stages */}
        <motion.rect
          x="57"
          y={stage === 0 ? 115 : stage === 1 ? 90 : stage === 2 ? 65 : 45}
          width="6"
          rx="3"
          fill="#25c760"
          initial={{ height: 0 }}
          animate={{ height: stage === 0 ? 10 : stage === 1 ? 35 : stage === 2 ? 60 : 80 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Leaves – appear from stage 1 */}
        {stage >= 1 && (
          <>
            <motion.ellipse
              cx="45" cy={stage >= 3 ? 70 : stage >= 2 ? 80 : 95}
              rx="14" ry="8"
              fill="#25c760"
              initial={{ scale: 0 }} animate={{ scale: 1, rotate: -15 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.ellipse
              cx="75" cy={stage >= 3 ? 75 : stage >= 2 ? 85 : 100}
              rx="14" ry="8"
              fill="#1fb350"
              initial={{ scale: 0 }} animate={{ scale: 1, rotate: 15 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </>
        )}

        {/* More leaves at stage 2+ */}
        {stage >= 2 && (
          <>
            <motion.ellipse
              cx="42" cy={stage >= 3 ? 55 : 65}
              rx="12" ry="7"
              fill="#1fb350"
              initial={{ scale: 0 }} animate={{ scale: 1, rotate: -25 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <motion.ellipse
              cx="78" cy={stage >= 3 ? 58 : 68}
              rx="12" ry="7"
              fill="#25c760"
              initial={{ scale: 0 }} animate={{ scale: 1, rotate: 25 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </>
        )}

        {/* Face – appears from stage 1 */}
        {stage >= 1 && (
          <g>
            {/* Head circle */}
            <motion.circle
              cx="60" cy={stage >= 3 ? 38 : stage >= 2 ? 52 : 78}
              r={stage >= 3 ? 22 : stage >= 2 ? 18 : 14}
              fill="#5dfa8e"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
            {/* Eyes */}
            <circle cx={54} cy={stage >= 3 ? 35 : stage >= 2 ? 49 : 76} r="2.5" fill="#1a3d1a" />
            <circle cx={66} cy={stage >= 3 ? 35 : stage >= 2 ? 49 : 76} r="2.5" fill="#1a3d1a" />
            {/* Smile */}
            <path
              d={`M ${54} ${stage >= 3 ? 43 : stage >= 2 ? 56 : 82} Q 60 ${stage >= 3 ? 50 : stage >= 2 ? 62 : 87} ${66} ${stage >= 3 ? 43 : stage >= 2 ? 56 : 82}`}
              stroke="#1a3d1a" strokeWidth="2" fill="none" strokeLinecap="round"
            />
            {/* Cheeks */}
            <circle cx={49} cy={stage >= 3 ? 42 : stage >= 2 ? 55 : 81} r="3" fill="#ff9fbb" opacity="0.5" />
            <circle cx={71} cy={stage >= 3 ? 42 : stage >= 2 ? 55 : 81} r="3" fill="#ff9fbb" opacity="0.5" />
          </g>
        )}

        {/* Flower/crown at stage 3 */}
        {stage >= 3 && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <circle cx="52" cy="18" r="6" fill="#fbbf24" opacity="0.9" />
            <circle cx="68" cy="18" r="6" fill="#fbbf24" opacity="0.9" />
            <circle cx="60" cy="12" r="7" fill="#f59e0b" opacity="0.9" />
            <circle cx="60" cy="14" r="4" fill="#fde68a" />
          </motion.g>
        )}

        {/* Seed at stage 0 */}
        {stage === 0 && (
          <motion.ellipse
            cx="60" cy="112" rx="8" ry="10" fill="#5dfa8e"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.svg>

      {/* Label */}
      <motion.span
        className="text-[10px] md:text-xs font-bold text-[#25c760] whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {labels[stage]}
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function JackpotMeter() {
  const t = useTranslations("jackpot");

  return (
    <>
      {/* Inject keyframe CSS once */}
      <style>{sparkleCSS}</style>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-950 p-6 md:p-10 shadow-2xl">
        {/* Radial gradient background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(37,199,96,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            <span className="mr-2" role="img" aria-label="power">
              ⚡
            </span>
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Meter + feed layout */}
        <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-8">
          {/* ─── Power Bar + マザベジちゃん ─── */}
          <div className="flex flex-col items-center gap-3 shrink-0">
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
                    border: "2px solid rgba(37,199,96,0.25)",
                    animation: "pulse-glow 2.5s ease-in-out infinite",
                  }}
                >
                  {/* Filled portion – grows from bottom */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full rounded-b-lg"
                    style={{
                      background:
                        "linear-gradient(0deg, #1a9b4a 0%, #25c760 50%, #5dfa8e 100%)",
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
                      background:
                        "radial-gradient(ellipse at 50% 50%, rgba(93,250,142,0.7) 0%, transparent 70%)",
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
                  <Sparkles count={10} />
                </div>
              </div>

              {/* ─── マザベジちゃん ─── */}
              <MazaVegiChan progress={PROGRESS_PCT} />
            </div>
          </div>

          {/* ─── Recent Purchases Feed ─── */}
          <div className="relative flex-1 w-full rounded-xl border border-white/5 bg-black/30 p-4 md:p-6 self-stretch">
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

        {/* ─── Jackpot Rewards Section ─── */}
        <motion.div
          className="relative mt-8 rounded-xl border border-[#25c760]/20 bg-gradient-to-br from-[#25c760]/5 to-transparent p-5 md:p-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Section header */}
          <div className="mb-5 text-center">
            <motion.h3
              className="text-lg md:text-xl font-bold text-white"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="mr-2" role="img" aria-label="gift">
                🎉
              </span>
              {t("rewardsTitle")}
            </motion.h3>
            <p className="mt-1 text-xs md:text-sm text-gray-400">
              {t("rewardsSubtitle")}
            </p>
          </div>

          {/* Reward cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <span className="relative block text-3xl mb-2" role="img">
                  {reward.icon}
                </span>
                <p className="relative text-sm md:text-base font-bold text-[#25c760]">
                  {t(reward.key)}
                </p>
                <p className="relative mt-1 text-xs text-gray-400">
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
