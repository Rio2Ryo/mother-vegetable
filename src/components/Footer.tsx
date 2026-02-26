'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-black border-t-2 border-[#25C760] py-10 mt-20 max-md:py-[30px] max-md:mt-[60px] max-[480px]:py-[25px] max-[480px]:mt-10">
      <div className="max-w-[1400px] mx-auto px-5 text-center max-md:px-[15px]">
        <div className="flex flex-col gap-2 text-center">
          {/* Logo */}
          <div>
            <Image
              src="/Images/favicon.png"
              alt="Mother Vegetable Logo"
              width={40}
              height={40}
              className="max-w-[40px] h-auto mb-2 inline-block max-md:max-w-[35px]"
            />
          </div>

          {/* Company name */}
          <p
            className="text-[#25C760] text-[clamp(10px,1.2vw,14px)] font-medium tracking-[-0.025em] m-0 max-md:text-[clamp(9px,2vw,12px)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {t('companyName')}
          </p>

          {/* Official Page link */}
          <p
            className="text-[#25C760] text-[clamp(10px,1.2vw,14px)] font-medium tracking-[-0.025em] m-0 my-2 max-md:text-[clamp(9px,2vw,12px)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <a
              href="https://www.mothervegetable.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline"
            >
              {t('officialPage')}
            </a>
          </p>

          {/* Country grid - 9 columns on desktop, 6 on mobile */}
          <div className="grid grid-cols-9 gap-0.5 mx-auto mt-[15px] max-w-[800px] justify-center pb-1 max-[1024px]:max-w-[600px] max-md:grid-cols-6 max-md:gap-1.5">
            {[
              'Japan', 'South Korea', 'Hong Kong', 'Malaysia', 'Singapore',
              'Indonesia', 'Thailand', 'Mongolia', 'Australia', 'Germany',
              'Italy', 'France', 'Switzerland', 'United Kingdom', 'Canada',
              'USA', 'Brazil', 'Peru'
            ].map((country) => (
              <div
                key={country}
                className="text-[#25C760] text-[clamp(10px,1.2vw,14px)] font-medium whitespace-nowrap tracking-[-0.025em] text-center max-md:text-[clamp(9px,2vw,12px)]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {country}
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-4 mt-3 mb-2">
            <span
              className="text-[#25C760] text-[clamp(10px,1.2vw,14px)] font-medium tracking-[-0.025em] mr-1 max-md:text-[clamp(9px,2vw,12px)]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {t('followUs')}
            </span>
            {/* Instagram */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#25C760] hover:text-green-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#25C760] hover:text-green-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-[#25C760] hover:text-green-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#25C760] hover:text-green-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.46z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>

          {/* Privacy and Terms links */}
          <span
            className="text-[#25C760] text-[clamp(10px,1.2vw,14px)] font-medium tracking-[-0.025em] max-md:text-[clamp(9px,2vw,12px)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <Link href="/privacy" className="text-[#25C760] no-underline hover:underline">
              {t('privacyPolicy')}
            </Link>
            {' | '}
            <Link href="/terms" className="text-[#25C760] no-underline hover:underline">
              {t('termsAndConditions')}
            </Link>
          </span>

          {/* Copyright */}
          <p
            className="text-white text-[clamp(10px,1.2vw,14px)] font-medium tracking-[-0.025em] m-0 leading-[1.4] max-md:text-[clamp(9px,2vw,12px)] max-[480px]:text-xs"
            style={{ fontFamily: 'Arial, sans-serif', color: '#25C760' }}
          >
            &copy; {new Date().getFullYear()} MOTHER VEGETABLE PROJECT.
          </p>
          <p
            className="text-white text-[clamp(10px,1.2vw,14px)] font-normal tracking-[-0.025em] m-0 leading-[1.4] opacity-80 -mt-2 max-md:text-[clamp(9px,2vw,12px)] max-[480px]:text-xs"
            style={{ fontFamily: 'Arial, sans-serif', color: '#25C760' }}
          >
            {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
