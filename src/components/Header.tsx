'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import CartPanel from './CartPanel';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [howToOpen, setHowToOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('Eng');
  const { toggleCart, totalItems } = useCartStore();

  return (
    <>
      <header className="bg-black sticky top-0 z-[1000] shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/Images/Assets/General/logo.png"
              alt="Mother Vegetable Logo"
              width={150}
              height={75}
              className="h-[75px] w-auto hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Nav */}
          <div className="flex items-center gap-5">
            <nav
              className={`${
                mobileMenuOpen ? 'right-0' : 'right-[-100%]'
              } fixed top-0 w-4/5 max-w-[300px] h-screen bg-black border-l-2 border-[#25C760] transition-all duration-300 z-[1000] pt-20 px-5 md:static md:w-auto md:max-w-none md:h-auto md:border-0 md:pt-0 md:px-0 md:flex md:items-center`}
            >
              <ul className="flex flex-col md:flex-row gap-[30px] md:gap-[35px] list-none m-0 p-0">
                <li>
                  <Link
                    href="/#food-function"
                    className="text-[#25C760] font-medium text-base hover:text-white transition-all duration-300 no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Food
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#cosmetic-function"
                    className="text-[#25C760] font-medium text-base hover:text-white transition-all duration-300 no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cosmetic
                  </Link>
                </li>
                <li
                  className="relative group"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button className="text-[#25C760] font-medium text-base hover:text-white transition-all duration-300 flex items-center gap-1 bg-transparent border-none cursor-pointer">
                    Products
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
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
                  <ul
                    className={`md:absolute md:top-full md:left-0 md:bg-black md:shadow-[0_8px_20px_rgba(0,0,0,0.3)] md:rounded-lg md:border md:border-[#25C760] md:min-w-[180px] md:mt-2 md:z-[1000] list-none p-0 ml-0 transition-all duration-300 ${
                      productsOpen
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'md:opacity-0 md:invisible md:-translate-y-2 md:pointer-events-none'
                    } static mt-2 ml-4`}
                  >
                    {['achieve', 'confidence', 'forever'].map((p) => (
                      <li key={p}>
                        <Link
                          href={`/product/${p}`}
                          className="block px-4 py-3 text-white font-medium text-sm hover:bg-[#25C760] transition-all duration-200 no-underline border-b border-[rgba(37,199,96,0.1)] last:border-b-0"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  className="relative group"
                  onMouseEnter={() => setHowToOpen(true)}
                  onMouseLeave={() => setHowToOpen(false)}
                >
                  <button className="text-[#25C760] font-medium text-base hover:text-white transition-all duration-300 flex items-center gap-1 bg-transparent border-none cursor-pointer">
                    How To Use
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${howToOpen ? 'rotate-180' : ''}`}
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
                  <ul
                    className={`md:absolute md:top-full md:left-0 md:bg-black md:shadow-[0_8px_20px_rgba(0,0,0,0.3)] md:rounded-lg md:border md:border-[#25C760] md:min-w-[180px] md:mt-2 md:z-[1000] list-none p-0 ml-0 transition-all duration-300 ${
                      howToOpen
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'md:opacity-0 md:invisible md:-translate-y-2 md:pointer-events-none'
                    } static mt-2 ml-4`}
                  >
                    {['achieve', 'confidence', 'forever'].map((p) => (
                      <li key={p}>
                        <Link
                          href={`/${p}-howto`}
                          className="block px-4 py-3 text-white font-medium text-sm hover:bg-[#25C760] transition-all duration-200 no-underline border-b border-[rgba(37,199,96,0.1)] last:border-b-0"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link
                    href="/mv/certifiedInstructor"
                    className="text-[#25C760] font-medium text-base hover:text-white transition-all duration-300 no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Certified Instructor
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    href="/healthcare"
                    className="text-[#25C760] font-medium text-base hover:text-white transition-all duration-300 no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Healthcare
                    <span className="block text-sm font-normal opacity-90">For Hospital</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Healthcare Button (Desktop) */}
            <Link
              href="/healthcare"
              className="hidden md:inline-flex flex-col items-center justify-center h-10 bg-black text-white border border-white px-3 rounded-md text-[11px] font-semibold leading-tight no-underline hover:bg-[#25C760] hover:text-black hover:border-[#25C760] hover:shadow-[0_8px_25px_rgba(37,199,96,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              Healthcare
              <span className="text-[10px] font-medium">For Hospital</span>
            </Link>

            {/* Language Selector */}
            <div
              className="relative border border-white rounded-md bg-transparent text-white px-4 py-2 font-medium text-sm cursor-pointer min-w-[60px] text-center h-10 flex items-center justify-center hover:bg-[#25C760] hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => setLangOpen(!langOpen)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <span>{currentLang}</span>
              {langOpen && (
                <div className="absolute top-full left-0 right-0 bg-black border border-[#25C760] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-[1000] mt-1">
                  {[
                    { code: 'en', label: 'Eng' },
                    { code: 'jp', label: '日' },
                  ].map((lang) => (
                    <div
                      key={lang.code}
                      className="px-4 py-2.5 text-white hover:bg-[#25C760] transition-all duration-200 border-b border-[rgba(37,199,96,0.1)] last:border-b-0 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLang(lang.label);
                        setLangOpen(false);
                      }}
                    >
                      {lang.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="bg-black text-white border border-white px-6 py-3 rounded-[5px] font-semibold text-sm cursor-pointer relative flex items-center gap-2 h-10 hover:shadow-[0_8px_25px_rgba(37,199,96,0.4)] hover:-translate-y-0.5 hover:bg-[#25C760] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
              {totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#25C760] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems()}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <Link
              href="/login"
              className="hidden md:flex text-white bg-black border border-white cursor-pointer h-10 w-10 rounded-[5px] items-center justify-center hover:shadow-[0_8px_25px_rgba(37,199,96,0.4)] hover:-translate-y-0.5 hover:bg-[#25C760] transition-all duration-300 no-underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col justify-around w-[30px] h-[30px] bg-transparent border-none cursor-pointer p-0 z-[1001]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={`w-full h-[3px] bg-[#25C760] rounded transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-x-[8px] translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-full h-[3px] bg-[#25C760] rounded transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-[3px] bg-[#25C760] rounded transition-all duration-300 ${
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
          className="fixed inset-0 bg-black/50 z-[999] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <CartPanel />
    </>
  );
}
