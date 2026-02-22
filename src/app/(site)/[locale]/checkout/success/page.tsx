"use client";

import { Suspense, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cart";
import { clearStoredReferralCode } from "@/lib/affiliate";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);
  const t = useTranslations('checkout');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
    clearStoredReferralCode();

    if (sessionId) {
      setOrderId(sessionId.substring(0, 16).toUpperCase());
    }
    setLoading(false);
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#25C760] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#25C760] mx-auto flex items-center justify-center">
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">{t('thankYou')}</h1>
        <p className="text-gray-400">
          {t('orderPlaced')}
        </p>
        {orderId && (
          <p className="text-sm text-gray-500">
            {t('sessionLabel')}:{" "}
            <span className="text-[#25C760] font-mono">{orderId}</span>
          </p>
        )}
        <p className="text-sm text-gray-500">
          {t('confirmationEmail')}
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors"
        >
          {t('continueShopping')}
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-[#25C760] text-lg">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
