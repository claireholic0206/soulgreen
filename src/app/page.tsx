"use client";

import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2D4232] font-sans">
      {/* 使用 container 限制最大寬度，確保電腦端不會過度拉伸 */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* 頂部：標題區塊 - 電腦端置中，手機端靠左 */}
        <header className="mb-12 md:mb-20 text-left md:text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] opacity-60 mb-3 block">
            Soulgreen Studio
          </span>
        </header>

        {/* 核心內容區：採用 CSS Grid，自動適應設備寬度 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          {/* 左側：品牌理念 */}
          <div className="space-y-6 text-[15px] leading-8 text-[#4a554a]">
            <p>
              Soulgreen 诞生于对自然生机的崇敬。我们深信，植物的力量是全方位的守护，不仅是心灵的慰藉，更是身体机能最坚实的后盾。
            </p>
            <p>
              品牌核心植根于瑞士 Usha Veda 自然疗法体系，以严谨的芳疗科学为基础，将大自然的精粹转化为温润的手作产品。透过植萃配方，成为你照顾家人与自己的坚实后盾。唯有先安稳了身体的运作，才能拥有面对世界的底气。
            </p>
          </div>

          {/* 右側：功能賣點 */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: "科学严谨", desc: "传承瑞士体系，以临床芳疗科学为核心。" },
              { title: "植萃辅助", desc: "精选自然精粹，提供身体与情绪的平衡。" },
              { title: "全方守护", desc: "从日常调理到身心安抚，稳固生活支持。" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 border border-[#2D4232]/10 shadow-sm rounded-lg hover:border-[#2D4232]/30 transition-all">
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-[13px] text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 底部：行動呼籲 */}
        <footer className="text-center pt-8 border-t border-[#2D4232]/10">
          <a 
            href="/quiz" 
            className="inline-block w-full md:w-auto px-16 py-4 bg-[#2D4232] text-white text-sm font-medium tracking-[0.1em] hover:bg-[#3D5A45] transition-all rounded-md"
          >
            开始探索专属配方
          </a>
        </footer>
      </div>
    </main>
  );
}
