'use client';

import { Link, useRouter, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { useAffiliateStore } from '@/store/affiliateStore';
import { useSession, signOut } from 'next-auth/react';
import CartPanel from './CartPanel';

const langOptions = [
  { code: 'en' as const, label: 'Eng' },
  { code: 'ja' as const, label: '日本語' },
  { code: 'zh' as const, label: '中文' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [howToOpen, setHowToOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  const currentLangLabel = langOptions.find((l) => l.code === locale)?.label ?? 'Eng';

  function switchLocale(newLocale: 'en' | 'ja' | 'zh') {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  }

  // NextAuth session for regular users
  const { data: session, status } = useSession();

  // Zustand store for instructor auth (separate system)
  const currentInstructor = useAffiliateStore((s) => s.currentInstructor);
  const instructorToken = useAffiliateStore((s) => s.instructorToken);
  const instructorLogout = useAffiliateStore((s) => s.logout);

  const isUserLoggedIn = mounted && status === 'authenticated' && !!session?.user;
  const isInstructorLoggedIn = mounted && !!currentInstructor;
  const isLoggedIn = isUserLoggedIn || isInstructorLoggedIn;

  // Instructor-registered check: show instructor menu if token or currentInstructor exists (no active login required)
  const isRegisteredInstructor = mounted && (!!instructorToken || !!currentInstructor);

  const displayName = isUserLoggedIn
    ? (session?.user?.name || session?.user?.email || '')
    : (currentInstructor?.fullName || '');
  const displayEmail = isUserLoggedIn
    ? (session?.user?.email || '')
    : (currentInstructor?.email || '');

  useEffect(() => { setMounted(true); }, []);

  function handleLogout() {
    if (isUserLoggedIn) {
      signOut({ callbackUrl: '/' });
    }
    if (isInstructorLoggedIn) {
      instructorLogout();
    }
    setProfileOpen(false);
    if (!isUserLoggedIn) {
      router.push('/');
    }
  }

  // Timeout refs for delayed dropdown close
  const howToTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openHowTo = useCallback(() => {
    if (howToTimeout.current) { clearTimeout(howToTimeout.current); howToTimeout.current = null; }
    setHowToOpen(true);
  }, []);
  const closeHowTo = useCallback(() => {
    howToTimeout.current = setTimeout(() => setHowToOpen(false), 150);
  }, []);

  const openProfile = useCallback(() => {
    if (profileTimeout.current) { clearTimeout(profileTimeout.current); profileTimeout.current = null; }
    setProfileOpen(true);
  }, []);
  const closeProfile = useCallback(() => {
    profileTimeout.current = setTimeout(() => setProfileOpen(false), 150);
  }, []);

  const router = useRouter();

  return (
    <>
      <header role="banner" className="bg-black sticky top-0 z-[1000] shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between h-20 max-lg:px-[15px] max-lg:h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[15px]">
            <Image
              src="/Images/Assets/General/logo.png"
              alt="Mother Vegetable Logo"
              width={150}
              height={75}
              className="h-[75px] w-auto hover:scale-105 transition-all duration-300 max-lg:h-[50px]"
              priority
            />
          </Link>

          {/* Nav */}
          <div className="flex items-center gap-2.5 lg:gap-4">
            <nav
              aria-label="Main navigation"
              className={`${
                mobileMenuOpen ? 'right-0' : 'right-[-100%]'
              } fixed top-0 w-4/5 max-w-[300px] h-screen bg-black border-l-2 border-[#25C760] transition-all duration-300 z-[1000] pt-20 px-5 shadow-[-5px_0_15px_rgba(0,0,0,0.3)] lg:shadow-none lg:static lg:w-auto lg:max-w-none lg:h-auto lg:border-0 lg:pt-0 lg:px-0 lg:flex lg:items-center max-[600px]:w-[90%] max-[600px]:max-w-[280px] max-[600px]:pt-[70px] max-[600px]:px-[15px]`}
            >
              {/* Mobile profile buttons */}
              <div className="hidden max-lg:flex max-lg:flex-col gap-[10px] mb-4">
                {isLoggedIn ? (
                  <>
                    <div className="py-3 px-4 border-2 border-[#25C760] rounded-lg">
                      <p className="text-[#25C760] font-semibold text-base">{displayName}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{displayEmail}</p>
                    </div>
                    {isUserLoggedIn && (
                      <Link
                        href="/account"
                        className="flex items-center w-full py-3 px-4 bg-black border-2 border-[#25C760] rounded-lg text-white text-base font-medium cursor-pointer transition-all duration-300 no-underline hover:bg-[rgba(37,199,96,0.1)] hover:border-[#3C8063]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 576 512">
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                        </svg>
                        {t('myAccount')}
                      </Link>
                    )}
                    {isInstructorLoggedIn && (
                      <Link
                        href="/instructor/dashboard"
                        className="flex items-center w-full py-3 px-4 bg-black border-2 border-[#25C760] rounded-lg text-white text-base font-medium cursor-pointer transition-all duration-300 no-underline hover:bg-[rgba(37,199,96,0.1)] hover:border-[#3C8063]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-2" width="16" height="16" fill="currentColor" viewBox="0 0 512 512">
                          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64z" />
                        </svg>
                        {t('dashboard')}
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="flex items-center w-full py-3 px-4 bg-black border-2 border-red-500/50 rounded-lg text-red-400 text-base font-medium cursor-pointer transition-all duration-300 hover:bg-red-500/10 hover:border-red-500"
                    >
                      <svg className="w-4 h-4 mr-2" width="16" height="16" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center w-full py-3 px-4 bg-black border-2 border-[#25C760] rounded-lg text-white text-base font-medium cursor-pointer transition-all duration-300 no-underline hover:bg-[rgba(37,199,96,0.1)] hover:border-[#3C8063]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                      {t('login')}
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center w-full py-3 px-4 bg-black border-2 border-[#25C760] rounded-lg text-white text-base font-medium cursor-pointer transition-all duration-300 no-underline hover:bg-[rgba(37,199,96,0.1)] hover:border-[#3C8063]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" width="16" height="16" fill="currentColor" viewBox="0 0 640 512">
                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                      </svg>
                      {t('signUp')}
                    </Link>
                    {/* Instructor-portal mobile login entry hidden per yakon's request */}
                  </>
                )}
              </div>

              <ul className="flex flex-col lg:flex-row gap-0 lg:gap-8 list-none m-0 p-0 max-lg:pt-2">
                {/* Products */}
                <li className="max-lg:w-full">
                  <Link
                    href="/products"
                    className="text-[#25C760] text-[15px] whitespace-nowrap hover:text-white hover:-translate-y-0.5 transition-all duration-300 no-underline block py-3 lg:py-0 max-lg:text-base max-lg:text-white max-lg:py-4 max-lg:px-2 max-lg:border-b max-lg:border-[rgba(37,199,96,0.2)] max-lg:hover:text-[#25C760] max-lg:hover:translate-x-2 max-lg:hover:translate-y-0"
                    style={{ fontWeight: 500, fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('allProducts')}
                  </Link>
                </li>
                {/* How to Use */}
                <li
                  className="relative group max-lg:w-full"
                  onMouseEnter={openHowTo}
                  onMouseLeave={closeHowTo}
                >
                  <button
                    className="text-[#25C760] text-[15px] whitespace-nowrap hover:text-white hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1 bg-transparent border-none cursor-pointer py-3 lg:py-0 max-lg:text-base max-lg:text-white max-lg:py-4 max-lg:px-2 max-lg:border-b max-lg:border-[rgba(37,199,96,0.2)] max-lg:w-full max-lg:hover:text-[#25C760] max-lg:hover:translate-x-2 max-lg:hover:translate-y-0"
                    style={{ fontWeight: 500, fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setHowToOpen(!howToOpen)}
                  >
                    {t('howToUse')}
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${howToOpen ? 'rotate-180' : ''}`}
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`lg:absolute lg:top-full lg:left-0 lg:z-[1000] lg:pt-2 transition-all duration-300 ${
                      howToOpen
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'lg:opacity-0 lg:invisible lg:-translate-y-[10px] lg:pointer-events-none max-lg:hidden'
                    } static mt-0 ml-4 lg:mt-0 lg:ml-0`}
                  >
                    <ul className="lg:bg-black lg:shadow-[0_8px_20px_rgba(0,0,0,0.3)] lg:rounded-lg lg:border lg:border-[#25C760] lg:min-w-[180px] list-none p-0 m-0">
                      {['achieve', 'confidence'].map((p) => (
                        <li key={p}>
                          <Link
                            href={`/${p}-howto`}
                            className="block px-4 py-2.5 text-white font-medium text-sm hover:bg-[#25C760] hover:text-white transition-all duration-200 no-underline border-b border-[rgba(37,199,96,0.1)] last:border-b-0"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                {/* News */}
                <li className="max-lg:w-full">
                  <Link
                    href="/news"
                    className="text-[#25C760] text-[15px] whitespace-nowrap hover:text-white hover:-translate-y-0.5 transition-all duration-300 no-underline block py-3 lg:py-0 max-lg:text-base max-lg:text-white max-lg:py-4 max-lg:px-2 max-lg:border-b max-lg:border-[rgba(37,199,96,0.2)] max-lg:hover:text-[#25C760] max-lg:hover:translate-x-2 max-lg:hover:translate-y-0"
                    style={{ fontWeight: 500, fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('news')}
                  </Link>
                </li>
                {/* Instructor-portal entry hidden from public nav (per yakon's request).
                    Instructor accounts can still access /instructor/login directly. */}
              </ul>
            </nav>

            {/* Language Selector */}
            <div
              className="relative border border-white/60 rounded bg-transparent text-white px-2 py-1.5 font-medium text-xs cursor-pointer min-w-[44px] text-center h-9 flex items-center justify-center gap-1 hover:bg-[#25C760] hover:border-[#25C760] hover:text-black transition-all duration-300"
              style={{ fontFamily: 'Arial, sans-serif' }}
              onClick={() => setLangOpen(!langOpen)}
            >
              <svg className="w-3.5 h-3.5 opacity-70" fill="currentColor" viewBox="0 0 512 512">
                <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7 10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5 11.5 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.5-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm245.1 0c-10 63.9-29.8 117.4-55.3 151.6 78.3-20.7 142-77.5 171.9-151.6H376.7z" />
              </svg>
              <span>{currentLangLabel}</span>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-[999]" onClick={(e) => { e.stopPropagation(); setLangOpen(false); }} />
                  <div className="absolute top-full left-0 right-0 bg-black border border-[#25C760] rounded shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-[1000] mt-1 overflow-hidden min-w-[80px]">
                    {langOptions.map((lang) => (
                      <div
                        key={lang.code}
                        className="px-3 py-2 text-white text-xs hover:bg-[#25C760] hover:text-black transition-all duration-200 border-b border-[rgba(37,199,96,0.1)] last:border-b-0 cursor-pointer text-center font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          switchLocale(lang.code);
                        }}
                      >
                        {lang.label}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="bg-black text-white border border-white/60 rounded w-9 h-9 cursor-pointer relative flex items-center justify-center hover:bg-[#25C760] hover:border-[#25C760] hover:text-black transition-all duration-300"
            >
              <svg className="w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
              {totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#25C760] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-[glow_2s_ease-in-out_infinite]">
                  {totalItems()}
                </span>
              )}
            </button>

            {/* Profile Button (Desktop) */}
            <div
              className="hidden lg:flex relative text-white bg-black border border-white/60 cursor-pointer h-9 rounded items-center justify-center hover:bg-[#25C760] hover:border-[#25C760] hover:text-black transition-all duration-300"
              style={{ minWidth: isLoggedIn ? 'auto' : '36px', paddingInline: isLoggedIn ? '10px' : '0' }}
              onMouseEnter={openProfile}
              onMouseLeave={closeProfile}
            >
              <svg className="w-4 h-4 shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              {isLoggedIn && (
                <span className="ml-2 text-sm font-medium truncate max-w-[100px]">{displayName}</span>
              )}
              {/* Profile Dropdown */}
              <div
                className={`absolute top-full right-0 z-[1000] pt-2 transition-all duration-300 ${
                  profileOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible -translate-y-[10px] pointer-events-none'
                }`}
              >
                <div className="bg-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] rounded-lg border border-[#25C760] min-w-[200px] w-max">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-[rgba(37,199,96,0.1)]">
                        <p className="text-[#25C760] font-semibold text-sm">{displayName}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{displayEmail}</p>
                      </div>
                      {isUserLoggedIn && (
                        <Link
                          href="/account"
                          className="flex items-center px-4 py-3 no-underline text-white font-medium text-sm transition-all duration-200 border-b border-[rgba(37,199,96,0.1)] hover:bg-[#25C760] hover:text-white"
                        >
                          <svg className="w-[14px] h-[14px] mr-[10px]" fill="currentColor" viewBox="0 0 576 512">
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                          </svg>
                          {t('myAccount')}
                        </Link>
                      )}
                      {isInstructorLoggedIn && (
                        <Link
                          href="/instructor/dashboard"
                          className="flex items-center px-4 py-3 no-underline text-white font-medium text-sm transition-all duration-200 border-b border-[rgba(37,199,96,0.1)] hover:bg-[#25C760] hover:text-white"
                        >
                          <svg className="w-[14px] h-[14px] mr-[10px]" width="14" height="14" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64z" />
                          </svg>
                          {t('dashboard')}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 bg-transparent border-none no-underline text-red-400 font-medium text-sm transition-all duration-200 cursor-pointer hover:bg-red-500/20 hover:text-red-300"
                      >
                        <svg className="w-[14px] h-[14px] mr-[10px]" width="14" height="14" fill="currentColor" viewBox="0 0 512 512">
                          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                        </svg>
                        {t('logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-3 no-underline text-white font-medium text-sm transition-all duration-200 border-b border-[rgba(37,199,96,0.1)] hover:bg-[#25C760] hover:text-white"
                      >
                        <svg className="w-[14px] h-[14px] mr-[10px]" width="14" height="14" fill="currentColor" viewBox="0 0 512 512">
                          <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                        </svg>
                        {t('login')}
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center px-4 py-3 no-underline text-white font-medium text-sm transition-all duration-200 border-b border-[rgba(37,199,96,0.1)] hover:bg-[#25C760] hover:text-white"
                      >
                        <svg className="w-[14px] h-[14px] mr-[10px]" width="14" height="14" fill="currentColor" viewBox="0 0 640 512">
                          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                        </svg>
                        {t('signUp')}
                      </Link>
                      {/* Instructor portal link removed from desktop dropdown per yakon's request */}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Hamburger */}
            <button
              className="hidden max-lg:flex flex-col justify-around w-[30px] h-[30px] bg-transparent border-none cursor-pointer p-0 z-[1001]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={`w-full h-[3px] bg-[#25C760] rounded-sm transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-x-[8px] translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-full h-[3px] bg-[#25C760] rounded-sm transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-[3px] bg-[#25C760] rounded-sm transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 translate-x-[6px] -translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] hidden max-lg:block"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <CartPanel />
    </>
  );
}
