import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function Footer() {
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
            Mother Vegetable Group
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
              Official Page
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

          {/* Privacy and Terms links */}
          <span
            className="text-[#25C760] text-[clamp(10px,1.2vw,14px)] font-medium tracking-[-0.025em] max-md:text-[clamp(9px,2vw,12px)]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <Link href="/privacy" className="text-[#25C760] no-underline hover:underline">
              Privacy Policy
            </Link>
            {' | '}
            <Link href="/terms" className="text-[#25C760] no-underline hover:underline">
              Terms and Conditions
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
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
