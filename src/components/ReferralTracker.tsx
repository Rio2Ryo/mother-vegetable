'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { storeReferralCode } from '@/lib/affiliate';

/**
 * Client component that captures ?ref=CODE from the URL
 * and persists it in localStorage + cookie for 30 days.
 * Rendered in the locale layout so it runs on every page.
 */
export default function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      storeReferralCode(refCode);
    }
  }, [searchParams]);

  return null;
}
