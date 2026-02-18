import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[rgba(37,199,96,0.2)] py-12">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Logo & description */}
          <div className="flex-1">
            <Link href="/">
              <Image
                src="/Images/Assets/General/logo.png"
                alt="Mother Vegetable"
                width={120}
                height={60}
                className="h-[60px] w-auto mb-4"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Mother Vegetable - Natural healing products born from Earth&apos;s life force 3.5 billion years ago.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[#25C760] font-bold text-base mb-4">Products</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/product/achieve" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Achieve</Link></li>
              <li><Link href="/product/confidence" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Confidence</Link></li>
              <li><Link href="/product/forever" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Forever</Link></li>
            </ul>
          </div>

          {/* How To Use */}
          <div>
            <h4 className="text-[#25C760] font-bold text-base mb-4">How To Use</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/achieve-howto" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Achieve</Link></li>
              <li><Link href="/confidence-howto" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Confidence</Link></li>
              <li><Link href="/forever-howto" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Forever</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#25C760] font-bold text-base mb-4">Company</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/healthcare" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Healthcare</Link></li>
              <li><Link href="/mv/certifiedInstructor" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Certified Instructor</Link></li>
              <li><Link href="/privacy" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[#25C760] font-bold text-base mb-4">Account</h4>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><Link href="/login" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Login</Link></li>
              <li><Link href="/signup" className="text-white/70 text-sm hover:text-[#25C760] transition-colors no-underline">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        {/* Country offices */}
        <div className="mt-12 pt-8 border-t border-[rgba(37,199,96,0.1)]">
          <h4 className="text-[#25C760] font-bold text-center mb-4">Mother Vegetable Group</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Japan', 'South Korea', 'Hong Kong', 'Malaysia', 'Singapore',
              'Indonesia', 'Thailand', 'Mongolia', 'Australia', 'Germany',
              'Italy', 'France', 'Switzerland', 'United Kingdom', 'Canada',
              'USA', 'Brazil', 'Peru'
            ].map((country) => (
              <span
                key={country}
                className="bg-[#e9e9e9] text-black px-3 py-1.5 rounded-sm text-xs font-bold"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Mother Vegetable. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
