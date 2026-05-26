import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
<<<<<<< HEAD
<<<<<<< HEAD
  title: "Soulgreen | 芳疗名片手册",
  description: "内在探索 ✕ 科学基础，专注于植物对身心的真实支持。",
=======
  title: "植物静谧 Botanica | 芳疗名片手册",
  description: "手工工艺 ✕ 植物生物化学，专注于植物分子对身心的真实支持。",
>>>>>>> 3569e3f (first commit)
=======
  title: "Soulgreen | 芳疗名片手册",
  description: "内在探索 ✕ 科学基础，专注于植物对身心的真实支持。",
>>>>>>> 5a8303a (Save local changes before pull)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className="bg-[#F5F2EB] text-stone-800 antialiased min-h-screen flex flex-col">
<<<<<<< HEAD
<<<<<<< HEAD
        <Navbar />

        <main className="flex-grow">{children}</main>

        <footer className="bg-[#2D4232] text-[#F5F2EB]/80 py-8 text-center text-xs tracking-wide">
          <p className="mb-2">⚙️ 内在探索 ✕ 科学基础</p>
          <p>
            © {new Date().getFullYear()} Botanica Studio. All rights reserved.
          </p>
        </footer>
=======
          
          <Navbar /> 
=======
        <Navbar />
>>>>>>> 5a8303a (Save local changes before pull)

        <main className="flex-grow">{children}</main>

<<<<<<< HEAD
          <footer className="bg-[#2D4232] text-[#F5F2EB]/80 py-8 text-center text-xs tracking-wide">
            <p className="mb-2">⚙️ 手工工艺 ✕ 植物生物化学</p>
            <p>© {new Date().getFullYear()} Botanica Studio. All rights reserved.</p>
          </footer>
          
      
>>>>>>> 3569e3f (first commit)
=======
        <footer className="bg-[#2D4232] text-[#F5F2EB]/80 py-8 text-center text-xs tracking-wide">
          <p className="mb-2">⚙️ 内在探索 ✕ 科学基础</p>
          <p>
            © {new Date().getFullYear()} Botanica Studio. All rights reserved.
          </p>
        </footer>
>>>>>>> 5a8303a (Save local changes before pull)
      </body>
    </html>
  );
}
