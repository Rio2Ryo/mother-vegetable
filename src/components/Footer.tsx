import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#e9e9e9] py-12 pb-[30px]">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Country badges */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Japan', 'South Korea', 'Hong Kong', 'Malaysia', 'Singapore',
              'Indonesia', 'Thailand', 'Mongolia', 'Australia', 'Germany',
              'Italy', 'France', 'Switzerland', 'United Kingdom', 'Canada',
              'USA', 'Brazil', 'Peru'
            ].map((country) => (
              <span
                key={country}
                className="inline-block bg-[#e9e9e9] text-black px-3 py-2 rounded-sm text-[14px] leading-normal border border-[#ccc]"
                style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 700 }}
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* Company name */}
        <div className="mt-[30px] mb-5">
          <h3 className="text-[#1a2323] text-xl" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 700 }}>
            Mother Vegetable Group
          </h3>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 md:gap-12 mt-5">
          {/* Company info & address */}
          <div>
            <Link href="/">
              <Image
                src="/Images/Assets/General/logo.png"
                alt="Mother Vegetable"
                width={120}
                height={60}
                className="h-[60px] w-auto mb-4"
              />
            </Link>
            <p className="text-[#1a2323] text-[14px] leading-relaxed max-w-sm" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>
              Mother Vegetable - Natural healing products born from Earth&apos;s life force 3.5 billion years ago.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[#1a2323] font-bold text-base mb-4" style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>Products</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/product/achieve" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Achieve</Link></li>
              <li><Link href="/product/confidence" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Confidence</Link></li>
              <li><Link href="/product/forever" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Forever</Link></li>
            </ul>
          </div>

          {/* How To Use */}
          <div>
            <h4 className="text-[#1a2323] font-bold text-base mb-4" style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>How To Use</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/achieve-howto" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Achieve</Link></li>
              <li><Link href="/confidence-howto" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Confidence</Link></li>
              <li><Link href="/forever-howto" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Forever</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#1a2323] font-bold text-base mb-4" style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>Company</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/healthcare" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Healthcare</Link></li>
              <li><Link href="/mv/certifiedInstructor" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Certified Instructor</Link></li>
              <li><Link href="/privacy" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[#1a2323] font-bold text-base mb-4" style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>Account</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/login" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Login</Link></li>
              <li><Link href="/signup" className="text-[#1a2323] text-[14px] hover:text-[#25C760] transition-colors no-underline" style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: 600 }}>Sign Up</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#ccc] text-center">
          <p className="text-[#1a2323]/50 text-sm" style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>
            &copy; {new Date().getFullYear()} Mother Vegetable. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
