'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAffiliateStore } from '@/store/affiliateStore';
import { getStoredReferralCode } from '@/lib/affiliate';

export default function InstructorRegisterPage() {
  const router = useRouter();
  const t = useTranslations('instructor');
  const register = useAffiliateStore((s) => s.register);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState(() => getStoredReferralCode() || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

    setSubmitting(true);

    const result = register({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      referralCode: referralCode.trim() || undefined,
    });

    if (result.success) {
      router.push('/instructor/dashboard');
    } else {
      setError(result.error || t('errorGeneric'));
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

                <form onSubmit={handleSubmit}>
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
                        {showPassword ? 'HIDE' : 'SHOW'}
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
                        {showConfirmPassword ? 'HIDE' : 'SHOW'}
                      </button>
                    </div>
                  </div>

                  {/* Referral Code (optional) */}
                  <div className="py-1.5">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      {t('referralCodeOptional')}:
                    </label>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder={t('referralCodePlaceholder')}
                      className={inputClass}
                    />
                    <p className="text-white/40 text-xs mt-1">{t('referralCodeHint')}</p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="py-2">
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="py-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#25C760] text-white font-bold py-2.5 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#3C8063] hover:border-[#3C8063] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? t('registering') : t('registerButton')}
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
