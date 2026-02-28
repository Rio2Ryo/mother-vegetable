'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams, useParams } from 'next/navigation';

export default function VerifyEmailTokenPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const calledRef = useRef(false);

  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const token = params.token as string;
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    async function verify() {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setStatus('success');
        } else {
          setError(data.error || 'errorGeneric');
          setStatus('error');
        }
      } catch {
        setError('errorGeneric');
        setStatus('error');
      }
    }

    verify();
  }, [token, email]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => router.push('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="bg-black min-h-[calc(100vh-80px)] flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-[450px]">
        <div className="border-2 border-[#25C760] rounded-[10px] bg-black/95 shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 text-center">
            {status === 'loading' && (
              <>
                <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#25C760] border-t-transparent rounded-full animate-spin" />
                <p className="text-white/80 text-sm">{t('verifyingEmail')}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl mb-4">
                  {t('emailVerified')}
                </h1>
                <p className="text-white/80 text-sm mb-6">
                  {t('emailVerifiedDesc')}
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-white text-black font-bold text-sm px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                >
                  {t('backToLogin')}
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <h1 className="font-['Ubuntu'] font-bold text-red-500 text-2xl md:text-3xl mb-4">
                  {t(error)}
                </h1>
                <div className="space-y-3">
                  <Link
                    href="/verify-email"
                    className="inline-block bg-white text-black font-bold text-sm px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    {t('sendVerificationLink')}
                  </Link>
                  <div>
                    <Link href="/login" className="text-[#25C760] text-xs hover:underline">
                      {t('backToLogin')}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
