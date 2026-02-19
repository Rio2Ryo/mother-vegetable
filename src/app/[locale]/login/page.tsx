'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);

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
                  WELCOME TO MOTHER VEGETABLE!
                </h1>
                <div className="p-2 text-white text-base font-bold">
                  New User?
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href={`/${locale}/signup`}
                    className="inline-block bg-white text-black font-bold text-base px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#25C760] hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    SIGN UP HERE
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="w-full md:w-1/2 p-4">
              <div className="px-2.5 py-2.5 md:px-6 md:py-2.5">
                <div className="pb-0">
                  <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl">LOGIN</h1>
                </div>
                <form action="/login" method="POST">
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      Email Address:
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="sample@email.com"
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>
                  <div className="py-2">
                    <label className="block text-[#25C760] font-semibold text-sm mb-1">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
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
                  <div className="flex justify-end text-sm">
                    <a
                      href="/forgetPassword"
                      className="text-[#25C760] underline hover:text-[#3C8063] transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="py-4">
                    <button
                      type="submit"
                      name="login"
                      className="w-full bg-white text-black font-bold py-2 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#25C760] hover:text-white hover:border-[#25C760] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all"
                    >
                      LOGIN NOW
                    </button>
                  </div>
                  <div className="text-center py-2 text-white text-sm">
                    or Login with
                  </div>
                  <div className="flex justify-center py-1">
                    <a href="#" className="hover:scale-105 transition-transform cursor-pointer">
                      <Image
                        src="/Images/Authenticate/google_logo.png"
                        alt="Google"
                        width={40}
                        height={40}
                        className="px-1"
                      />
                    </a>
                  </div>
                </form>
                {/* Sign up link (visible on mobile, also shown at bottom) */}
                <div className="md:hidden">
                  <div className="flex items-center justify-center text-white text-xs pt-2">
                    Don&apos;t have an account?&nbsp;
                    <Link href={`/${locale}/signup`} className="text-[#25C760] underline font-bold">
                      SIGN UP HERE
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
