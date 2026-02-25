'use client';

import { Suspense, useState, useEffect, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAffiliateStore } from '@/store/affiliateStore';
import { getStoredReferralCode } from '@/lib/affiliate';
import { useSearchParams } from 'next/navigation';

export default function InstructorRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const t = useTranslations('instructor');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const currentInstructor = useAffiliateStore((s) => s.currentInstructor);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [parentReferralCode, setParentReferralCode] = useState('');
  const [desiredReferralCode, setDesiredReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const code = getStoredReferralCode();
    if (code) setParentReferralCode(code);

    // Show canceled message
    if (searchParams.get('canceled') === 'true') {
      setError(t('paymentCanceled'));
    }
  }, [searchParams, t]);

  // If already logged in as instructor, redirect to dashboard
  useEffect(() => {
    if (mounted && currentInstructor) {
      router.push('/instructor/dashboard');
    }
  }, [mounted, currentInstructor, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError(t('errorFullName'));
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('errorEmail'));
      return;
    }
    if (!phone.trim()) {
      setError(t('errorPhone'));
      return;
    }
    if (password.length < 6) {
      setError(t('errorPasswordLength'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('errorPasswordMatch'));
      return;
    }
    if (!desiredReferralCode.trim()) {
      setError(t('errorDesiredReferralCode'));
      return;
    }
    if (!/^[A-Za-z0-9_-]{3,20}$/.test(desiredReferralCode.trim())) {
      setError(t('errorReferralCodeFormat'));
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/instructor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          referralCode: parentReferralCode.trim() || undefined,
          desiredReferralCode: desiredReferralCode.trim(),
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('errorGeneric'));
        setSubmitting(false);
        return;
      }

      if (data.url) {
        // Store instructor ID and token for post-payment dashboard sync
        if (data.instructorId) {
          localStorage.setItem('mv-pending-instructor', data.instructorId);
        }
        if (data.token) {
          // Pre-set the token in the store so the dashboard can sync after Stripe redirect
          const { setCurrentInstructor } = useAffiliateStore.getState();
          const currentState = useAffiliateStore.getState();
          if (!currentState.instructorToken) {
            // Store token without full instructor data (will be synced after redirect)
            useAffiliateStore.setState({ instructorToken: data.token });
          }
        }
        // Redirect to Stripe Checkout for $250/year subscription
        window.location.href = data.url;
      } else {
        setError(t('errorGeneric'));
        setSubmitting(false);
      }
    } catch {
      setError(t('errorGeneric'));
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60';

  return (
    <div className="bg-black min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-[900px]">
        <div className="border-2 border-[#25C760] rounded-[10px] bg-black/95 shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Background Image with Text Overlay (hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-4 min-h-[500px]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-[10px] opacity-50"
                style={{ backgroundImage: "url('/Images/Assets/homepage/bannerImg.png')" }}
              />
              <div className="relative z-10 text-center flex flex-col items-center justify-center">
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-[2.2rem] leading-tight p-3">
                  {t('becomeInstructor')}
                </h1>
                <p className="text-white text-sm px-4 mb-4 leading-relaxed">
                  {t('registerBenefits')}
                </p>
                <div className="bg-[#25C760]/10 border border-[#25C760]/30 rounded-lg p-3 mx-4 mb-4">
                  <p className="text-[#25C760] font-bold text-lg">{t('subscriptionPrice')}</p>
                  <p className="text-white/60 text-xs">{t('subscriptionDesc')}</p>
                </div>
                <div className="p-2 text-white text-base font-bold">
                  {t('alreadyRegistered')}
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="/instructor/login"
                    className="inline-block bg-white text-black font-bold text-base px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    {t('loginHere')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="w-full md:w-1/2 p-4">
              <div className="px-2.5 py-2.5 md:px-6 md:py-2.5">
                <div className="pb-2">
                  <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl">
                    {t('registerTitle')}
                  </h1>
                  <p className="text-white/60 text-sm mt-1">{t('registerSubtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('fullName')}:
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t('fullNamePlaceholder')}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('email')}:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('phone')}:
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Desired Referral Code */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('desiredReferralCode')}:
                    </label>
                    <input
                      type="text"
                      value={desiredReferralCode}
                      onChange={(e) => setDesiredReferralCode(e.target.value.toUpperCase())}
                      placeholder={t('desiredReferralCodePlaceholder')}
                      required
                      className={inputClass}
                    />
                    <p className="text-white/40 text-xs mt-1">{t('desiredReferralCodeHint')}</p>
                  </div>

                  {/* Password */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('password')}:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('passwordPlaceholder')}
                        required
                        className={inputClass}
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
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('confirmPassword')}:
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t('confirmPasswordPlaceholder')}
                        required
                        className={inputClass}
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

                  {/* Parent Referral Code (optional) */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('referralCodeOptional')}:
                    </label>
                    <input
                      type="text"
                      value={parentReferralCode}
                      onChange={(e) => setParentReferralCode(e.target.value)}
                      placeholder={t('referralCodePlaceholder')}
                      className={inputClass}
                    />
                    <p className="text-white/40 text-xs mt-1">{t('referralCodeHint')}</p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="py-2">
                      <p role="alert" className="text-red-400 text-sm text-center">{error}</p>
                    </div>
                  )}

                  {/* Subscription Price Notice */}
                  <div className="py-2">
                    <div className="p-3 bg-gray-900 border border-gray-700 rounded-[5px] text-center">
                      <p className="text-white text-sm font-semibold">{t('subscriptionPrice')}</p>
                      <p className="text-white/40 text-xs mt-1">{t('subscriptionNotice')}</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="py-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#25C760] text-white font-bold py-2.5 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#3C8063] hover:border-[#3C8063] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? t('registering') : t('registerAndPay')}
                    </button>
                  </div>
                </form>

                {/* Login link (visible on mobile) */}
                <div className="md:hidden">
                  <div className="flex justify-center text-xs pt-2">
                    {t('alreadyRegistered')}&nbsp;
                    <Link href="/instructor/login" className="text-[#25C760] underline font-bold">
                      {t('loginHere')}
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
