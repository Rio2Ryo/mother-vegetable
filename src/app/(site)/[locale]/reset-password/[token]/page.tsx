'use client';

import { useState, useEffect } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams, useParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const token = params.token as string;
  const email = searchParams.get('email') || '';

  // Auto-redirect to login after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('errorPasswordLength');
      return;
    }
    if (password !== confirmPassword) {
      setError('errorPasswordMatch');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'errorGeneric');
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
                  {t('resetSuccess')}
                </h1>
                <p className="text-white/80 text-sm mb-6">
                  {t('resetSuccessDesc')}
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
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl mb-6">
                  {t('resetPasswordTitle')}
                </h1>

                {error && (
                  <div role="alert" className="mb-4 text-red-500 text-sm font-semibold">
                    {t(error)}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('newPassword')}:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder={t('newPassword')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs bg-transparent border-none cursor-pointer"
                      >
                        {showPassword ? t('hidePassword') : t('showPassword')}
                      </button>
                    </div>
                  </div>
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('confirmNewPassword')}:
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder={t('confirmNewPassword')}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      {submitting ? t('resettingPassword') : t('resetPassword')}
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
