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
            <span className="mr-2" role="img" aria-label="jackpot">
              🎰
            </span>
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Meter + feed layout */}
        <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-8">
          {/* ─── Vertical Power Bar ─── */}
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
      </div>
    </>
  );
}
