import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Soulgreen | 芳疗名片手册",
  description: "内在探索 ✕ 科学基础，专注于植物对身心的真实支持。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className="bg-[#F5F2EB] text-stone-800 antialiased min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">{children}</main>

        <footer className="bg-[#2D4232] text-[#F5F2EB]/80 py-8 text-center text-xs tracking-wide">
          <p className="mb-2">⚙️ 内在探索 ✕ 科学基础</p>
          <p>
            © {new Date().getFullYear()} Botanica Studio. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
