'use client';

import { useState, useEffect } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useAffiliateStore } from '@/store/affiliateStore';
import { getStoredReferralCode } from '@/lib/affiliate';
import { useTranslations } from 'next-intl';
import { signIn, useSession } from 'next-auth/react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const getInstructorByReferralCode = useAffiliateStore((s) => s.getInstructorByReferralCode);
  const t = useTranslations('auth');
  const tInstructor = useTranslations('instructor');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const code = getStoredReferralCode();
    if (code) {
      const instructor = getInstructorByReferralCode(code);
      if (instructor) {
        setReferrerName(instructor.fullName);
      }
    }
  }, [mounted, getInstructorByReferralCode]);

  // If already logged in, redirect to home
  useEffect(() => {
    if (mounted && status === 'authenticated' && session) {
      router.push('/');
    }
  }, [mounted, status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Client-side validation
    if (!username.trim()) {
      setError('errorUsernameRequired');
      setSubmitting(false);
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('errorEmailRequired');
      setSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setError('errorPasswordLength');
      setSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('errorPasswordMatch');
      setSubmitting(false);
      return;
    }

    try {
      // Create account via server API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'errorGeneric');
        setSubmitting(false);
        return;
      }

      // Auto-login with NextAuth after successful registration
      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        // Account created but auto-login failed - redirect to login
        setSuccess(true);
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/'), 1500);
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
            {/* Left Column: Signup Form */}
            <div className="w-full md:w-1/2 p-4">
              <div className="px-2.5 py-2.5 md:px-6 md:py-2.5">
                <div className="pb-0">
                  <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl">{t('signupTitle').toUpperCase()}</h1>
                </div>

                {/* Referral Banner */}
                {referrerName && (
                  <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-[#25C760]/10 border border-[#25C760]/30 rounded-[5px] text-sm">
                    <svg className="w-4 h-4 text-[#25C760] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-300 text-xs">
                      {tInstructor('referredBy')} <span className="text-[#25C760] font-medium">{referrerName}</span>
                    </span>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mt-3 p-3 bg-[#25C760]/10 border border-[#25C760]/30 rounded-[5px] text-[#25C760] text-sm font-semibold text-center">
                    {t('signupSuccess')}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-3 text-red-500 text-sm font-semibold">
                    {t(error)}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Google OAuth — hidden until credentials are configured */}

                  {/* Username */}
                  <div className="py-2">
                    <label htmlFor="username" className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('username')}:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder={t('username')}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>

                  {/* Email */}
                  <div className="py-2">
                    <label htmlFor="email" className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('emailAddress')}:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t('emailAddress')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>

                  {/* Password */}
                  <div className="py-2">
                    <label htmlFor="password" className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('password')}:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder={t('password')}
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

                  {/* Confirm Password */}
                  <div className="py-2">
                    <label htmlFor="confirm_password" className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('confirmPassword')}:
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm_password"
                        name="confirm_password"
                        placeholder={t('confirmPassword')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs bg-transparent border-none cursor-pointer"
                      >
                        {showConfirmPassword ? t('hidePassword') : t('showPassword')}
                      </button>
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <div className="py-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#25C760] text-white font-bold py-2 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#3C8063] hover:border-[#3C8063] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all disabled:opacity-50"
                    >
                      {submitting ? '...' : t('signUpNow')}
                    </button>
                  </div>
                </form>

                {/* Sign in link (visible on mobile) */}
                <div className="md:hidden">
                  <div className="flex justify-center text-xs pt-2">
                    {t('alreadyHaveAccount')}&nbsp;
                    <Link href="/login" className="text-[#25C760] underline font-bold">
                      {t('signInHere')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Background Image with Text Overlay (hidden on mobile) */}
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
                  {t('alreadyHaveAccount')}
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="/login"
                    className="inline-block bg-[#25C760] text-white font-bold text-base px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#3C8063] hover:border-[#3C8063] hover:-translate-y-0.5 transition-all"
                  >
                    {t('signInHere')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
