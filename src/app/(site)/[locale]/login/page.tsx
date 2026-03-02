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
                  {/* OAuth Divider */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-white/20" />
                    <span className="text-white/60 text-xs">{t('or')}</span>
                    <div className="flex-1 h-px bg-white/20" />
                  </div>

                  {/* Google OAuth */}
                  <button
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-[5px] border-2 border-gray-300 cursor-pointer hover:bg-gray-100 hover:-translate-y-0.5 transition-all text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {t('google')}
                  </button>

                  {/* Facebook OAuth */}
                  <button
                    type="button"
                    onClick={() => signIn('facebook', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white font-semibold py-2 rounded-[5px] border-2 border-[#1877F2] cursor-pointer hover:bg-[#166FE5] hover:-translate-y-0.5 transition-all text-sm mt-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    {t('facebook')}
                  </button>
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
