"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { storeReferralCode } from "@/lib/affiliate";

const INSTRUCTOR_LANDING_URL = "https://mv-instructor-landing.vercel.app";

/**
 * Referral redirect route: /r/[code]
 *
 * 1. Stores the referral code in localStorage + cookie (30 days)
 * 2. Redirects to the external instructor landing page with ?ref=CODE
 */
export default function ReferralRedirectPage() {
  const params = useParams();

  useEffect(() => {
    const code = params?.code as string | undefined;
    if (!code) return;

    // Persist referral code locally
    storeReferralCode(code);

    // Redirect to the instructor landing page with the ref param
    window.location.href = `${INSTRUCTOR_LANDING_URL}?ref=${encodeURIComponent(code)}`;
  }, [params]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">リダイレクト中...</p>
    </div>
  );
}
