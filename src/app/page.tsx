<<<<<<< HEAD
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
          {/* 左側：品牌理念 - 內容豐富、不空洞 */}
          <div className="space-y-6 text-[15px] leading-8 text-[#4a554a]">
            <p>
              Soulgreen 诞生于对自然生机的崇敬。我们深信，植物的力量是全方位的守护，不仅是心灵的慰藉，更是身体机能最坚实的后盾。
            </p>
            <p>
              品牌核心植根于瑞士 Usha Veda 自然疗法体系，以严谨的芳疗科学为基础，将大自然的精粹转化为温润的手作产品。透过植萃配方，成为你照顾家人与自己的坚实后盾。唯有先安稳了身体的运作，才能拥有面对世界的底气。
            </p>
          </div>

          {/* 右側：功能賣點 - 手機堆疊，電腦並排 */}
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

        {/* 底部：行動呼籲 - 跨裝置統一 */}
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
>>>>>>> 67b29a5 (Initial commit from Create Next App)
