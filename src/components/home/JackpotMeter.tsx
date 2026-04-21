"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */
const CURRENT_PURCHASES = 67;
const TARGET_PURCHASES = 100;
const REMAINING = TARGET_PURCHASES - CURRENT_PURCHASES;
const PROGRESS_PCT = (CURRENT_PURCHASES / TARGET_PURCHASES) * 100;
const IS_ACHIEVED = CURRENT_PURCHASES >= TARGET_PURCHASES;

const MOCK_RECENT_PURCHASES = [
  { name: "田中", product: "マザベジ塩", time: "2分" },
  { name: "佐藤", product: "Achieve", time: "5分" },
  { name: "鈴木", product: "Confidence", time: "12分" },
  { name: "高橋", product: "マザベジ味噌", time: "18分" },
  { name: "渡辺", product: "MV ソープ", time: "25分" },
];

export default function JackpotMeter() {
  const t = useTranslations("jackpot");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-10 shadow-2xl">
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[70%] rounded-full blur-[100px]"
        style={{ background: "rgba(37,199,96,0.15)" }}
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

      {/* Progress number */}
      <div className="relative mb-3 text-center">
        <span
          className="text-5xl md:text-6xl font-extrabold tabular-nums"
          style={{ color: "#25c760" }}
        >
          {CURRENT_PURCHASES}
        </span>
        <span className="text-2xl md:text-3xl font-semibold text-gray-500">
          {" "}
          / {TARGET_PURCHASES}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative mx-auto mb-4 h-6 max-w-xl overflow-hidden rounded-full bg-gray-700/60">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #1a9b4a, #25c760, #5dfa8e)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${PROGRESS_PCT}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Status text */}
      <p className="relative mb-8 text-center text-base md:text-lg font-medium text-gray-300">
        {IS_ACHIEVED ? (
          <span style={{ color: "#25c760" }}>
            <span role="img" aria-label="celebration">
              🎉
            </span>{" "}
            {t("achieved")}
          </span>
        ) : (
          t("remaining", { count: REMAINING })
        )}
      </p>

      {/* Recent purchases feed */}
      <div className="relative rounded-xl border border-white/5 bg-black/30 p-4 md:p-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          {t("recentPurchases")}
        </h3>
        <ul className="space-y-2">
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
  );
}
