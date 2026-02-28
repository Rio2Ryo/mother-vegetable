'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const t = useTranslations('auth');
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setError('errorGeneric');
      }
    } catch {
      setError('errorGeneric');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-[calc(100vh-80px)] flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-[450px]">
        <div className="border-2 border-[#25C760] rounded-[10px] bg-black/95 shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {success ? (
              <div className="text-center">
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl mb-4">
                  {t('verificationEmailSent')}
                </h1>
                <p className="text-white/80 text-sm mb-6">
                  {t('verificationEmailSentDesc')}
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-white text-black font-bold text-sm px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                >
                  {t('backToLogin')}
                </Link>
              </div>
            ) : (
              <>
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl mb-2">
                  {t('verifyEmailTitle')}
                </h1>
                <p className="text-white/60 text-sm mb-6">
                  {t('verifyEmailDesc')}
                </p>

                {error && (
                  <div role="alert" className="mb-4 text-red-500 text-sm font-semibold">
                    {t(error)}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('emailAddress')}:
                    </label>
                    <input
                      type="email"
                      placeholder="sample@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>
                  <div className="py-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-white text-black font-bold py-2 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#25C760] hover:text-white hover:border-[#25C760] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all disabled:opacity-50"
                    >
                      {submitting ? t('sendingVerification') : t('sendVerificationLink')}
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <Link href="/login" className="text-[#25C760] text-xs hover:underline">
                    {t('backToLogin')}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
