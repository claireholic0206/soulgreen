"use client";

import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2D4232] font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-12 md:mb-20 text-left md:text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] opacity-60 mb-3 block">
            Soulgreen Studio
          </span>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6 text-[15px] leading-8 text-[#4a554a]">
            <p>Soulgreen 诞生于对自然生机的崇敬。我们深信，植物的力量是全方位的守护。</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-6 border border-[#2D4232]/10 shadow-sm rounded-lg">
              <h3 className="font-bold text-sm mb-2">科学严谨</h3>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
