'use client';

import { useState, useEffect } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = useTranslations('auth');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => { setMounted(true); }, []);

  // If already logged in, redirect
  useEffect(() => {
    if (mounted && status === 'authenticated' && session) {
      router.push('/');
    }
  }, [mounted, status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('errorInvalidCredentials');
        setSubmitting(false);
      } else {
        router.push('/');
      }
    } catch {
      setError('errorGeneric');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-[calc(100vh-80px)] flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-[900px]">
        <div className="border-2 border-[#25C760] rounded-[10px] bg-black/95 shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Background Image with Text Overlay (hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-4 min-h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-[10px] opacity-50"
                style={{ backgroundImage: "url('/Images/Assets/homepage/bannerImg.png')" }}
              />
              <div className="relative z-10 text-center flex flex-col items-center justify-center">
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-[2.7rem] leading-tight p-3">
                  {t('welcomeMessage')}
                </h1>
                <div className="p-2 text-white text-base font-bold">
                  {t('newUser')}
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="/signup"
                    className="inline-block bg-white text-black font-bold text-base px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    {t('signUpHere')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="w-full md:w-1/2 p-4">
              <div className="px-2.5 py-2.5 md:px-6 md:py-2.5">
                <div className="pb-0">
                  <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl">{t('loginTitle').toUpperCase()}</h1>
                </div>

                {/* Error Message */}
                {error && (
                  <div role="alert" className="mt-3 text-red-500 text-sm font-semibold">
                    {t(error)}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('emailAddress')}:
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="sample@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('password')}:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder={t('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  <div className="text-right">
                    <Link href="/forgot-password" className="text-[#25C760] text-xs hover:underline">
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  <div className="py-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-white text-black font-bold py-2 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#25C760] hover:text-white hover:border-[#25C760] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all disabled:opacity-50"
                    >
                      {submitting ? '...' : t('loginNow')}
                    </button>
                  </div>
                  {/* Google OAuth — hidden until credentials are configured */}
                </form>
                {/* Sign up link (visible on mobile, also shown at bottom) */}
                <div className="md:hidden">
                  <div className="flex items-center justify-center text-white text-xs pt-2">
                    {t('dontHaveAccount')}&nbsp;
                    <Link href="/signup" className="text-[#25C760] underline font-bold">
                      {t('signUpHere')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
