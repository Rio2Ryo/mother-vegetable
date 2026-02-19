'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function SignupPage() {
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-black min-h-[calc(100vh-80px)] flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-[900px]">
        <div className="border-2 border-[#25C760] rounded-[10px] bg-black/95 shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Signup Form */}
            <div className="w-full md:w-1/2 p-4">
              <div className="px-2.5 py-2.5 md:px-6 md:py-2.5">
                <div className="pb-0">
                  <h1 className="font-['Ubuntu'] font-bold text-[#25C760] text-2xl md:text-3xl">SIGN UP</h1>
                </div>
                <form id="signup" action="/signup" method="POST">
                  {/* Google Sign Up Button */}
                  <div className="flex justify-center py-2 w-full mt-4">
                    <button
                      type="button"
                      className="w-full bg-black border-2 border-[#25C760] text-white font-semibold py-2.5 rounded-[5px] cursor-pointer hover:bg-[#25C760] hover:text-white transition-all flex items-center justify-center"
                    >
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="w-6 h-6"
                        style={{ display: 'block' }}
                      >
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                      <span className="ml-2">Sign Up with Google</span>
                    </button>
                  </div>

                  <div className="text-center py-3 text-white text-sm">
                    or
                  </div>

                  {/* Username */}
                  <div className="py-2">
                    <label htmlFor="username" className="block text-[#25C760] font-semibold text-sm mb-1">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      required
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>

                  {/* Email */}
                  <div className="py-2">
                    <label htmlFor="email" className="block text-[#25C760] font-semibold text-sm mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                    />
                  </div>

                  {/* Password */}
                  <div className="py-2">
                    <label htmlFor="password" className="block text-[#25C760] font-semibold text-sm mb-1">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
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

                  {/* Confirm Password */}
                  <div className="py-2">
                    <label htmlFor="confirm_password" className="block text-[#25C760] font-semibold text-sm mb-1">
                      Confirm Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        required
                        className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
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

                  {/* Sign Up Button */}
                  <div className="py-3">
                    <button
                      type="submit"
                      className="w-full bg-[#25C760] text-white font-bold py-2 rounded-[5px] border-2 border-[#25C760] cursor-pointer shadow-[0_4px_12px_rgba(37,199,96,0.3)] hover:bg-[#3C8063] hover:border-[#3C8063] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,199,96,0.4)] transition-all"
                    >
                      SIGN UP NOW
                    </button>
                  </div>
                </form>

                {/* Sign in link (visible on mobile) */}
                <div className="md:hidden">
                  <div className="flex justify-center text-xs pt-2">
                    Already have an account?&nbsp;
                    <Link href={`/${locale}/login`} className="text-[#25C760] underline font-bold">
                      SIGN IN HERE
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
                  WELCOME TO MOTHER VEGETABLE!
                </h1>
                <div className="p-2 text-white text-base font-bold">
                  Already have an account?
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href={`/${locale}/login`}
                    className="inline-block bg-[#25C760] text-white font-bold text-base px-6 py-2 rounded-[5px] border-2 border-[#25C760] shadow-lg no-underline hover:bg-[#3C8063] hover:border-[#3C8063] hover:-translate-y-0.5 transition-all"
                  >
                    SIGN IN HERE
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
