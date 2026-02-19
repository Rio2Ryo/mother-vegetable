'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAffiliateStore } from '@/store/affiliateStore';

export default function InstructorLoginPage() {
  const router = useRouter();
  const t = useTranslations('instructor');
  const login = useAffiliateStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError(t('errorFillFields'));
      return;
    }

    setSubmitting(true);

    const success = login(email.trim(), password);
    if (success) {
      router.push('/instructor/dashboard');
    } else {
      setError(t('errorInvalidCredentials'));
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60';

  return (
    <div className="bg-black min-h-[calc(100vh-80px)] flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-[900px]">
        <div className="border-2 border-[#25C760] rounded-[10px] bg-black/95 shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Background Image (hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-4 min-h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-[10px] opacity-50"
                style={{ backgroundImage: "url('/Images/Assets/homepage/bannerImg.png')" }}
              />
              <div className="relative z-10 text-center flex flex-col items-center justify-center">
                <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-[2.2rem] leading-tight p-3">
                  {t('welcomeBack')}
                </h1>
                <p className="text-white text-sm px-4 mb-4 leading-relaxed">
                  {t('loginSubtext')}
                </p>
                <div className="p-2 text-white text-base font-bold">
                  {t('noAccount')}
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="/instructor/register"
                    className="inline-block bg-white text-black font-bold text-base px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    {t('registerHere')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="w-full md:w-1/2 p-4">
              <div className="px-2.5 py-2.5 md:px-6 md:py-2.5">
                <div className="pb-2">
                  <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl">
                    {t('loginTitle')}
                  </h1>
                  <p className="text-white/60 text-sm mt-1">{t('loginDescription')}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="py-2">
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

                  {/* Password */}
                  <div className="py-2">
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

                  {/* Error */}
                  {error && (
                    <div className="py-2">
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="py-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-white text-black font-bold py-2 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#25C760] hover:text-white hover:border-[#25C760] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? t('loggingIn') : t('loginButton')}
                    </button>
                  </div>
                </form>

                {/* Register link (visible on mobile) */}
                <div className="md:hidden">
                  <div className="flex items-center justify-center text-white text-xs pt-2">
                    {t('noAccount')}&nbsp;
                    <Link href="/instructor/register" className="text-[#25C760] underline font-bold">
                      {t('registerHere')}
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
