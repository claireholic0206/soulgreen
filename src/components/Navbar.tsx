"use client"; // 務必保留，因為使用了 useState

import { useState } from 'react';
import { T } from '@/components/TextConverter';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCount } = useCart();

  const navLinks = [
    { name: "首页", href: "/" },
    { name: "芳疗产品", href: "/products" },
    { name: "专属服务", href: "/services" },
    { name: "体质测验", href: "/quiz" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <span className="text-xl font-bold text-[#2D4232] tracking-wider font-serif">
          <T>Soulgreen Aroma</T>
        </span>

        {/* 電腦版選單 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-[#8A9A86] transition-colors">
              <T>{link.name}</T>
            </a>
          ))}
          <CartIcon totalCount={totalCount} />
        </div>

        {/* 手機版：購物車 + 漢堡按鈕 */}
        <div className="flex md:hidden items-center gap-1">
          <CartIcon totalCount={totalCount} />
          <button
            className="p-2 text-[#2D4232]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 手機版下拉選單 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col space-y-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-stone-600 hover:text-[#8A9A86] transition-colors block py-2"
              onClick={() => setIsMenuOpen(false)} // 點擊後關閉選單
            >
              <T>{link.name}</T>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function CartIcon({ totalCount }: { totalCount: number }) {
  return (
    <a
      href="/cart"
      className="relative p-2 text-[#2D4232] hover:text-[#8A9A86] transition-colors"
      aria-label="購物車"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-[#D85A30] text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
          {totalCount > 9 ? "9+" : totalCount}
        </span>
      )}
    </a>
  );
}