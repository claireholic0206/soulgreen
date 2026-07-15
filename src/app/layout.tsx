import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import HeaderComponent from "@/components/Header";

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
      <body style={{ background: "var(--bg)", color: "var(--text)", margin: 0, padding: 0 }}>
        <CartProvider>
          <HeaderComponent />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
const Footer = () => (
  <div
    style={{
      maxWidth: "1160px",
      margin: "0 auto",
      padding: "40px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      borderTop: "1px solid var(--border)",
    }}
  >
    <span style={{ fontFamily: "'Lora', serif", fontSize: "15px", color: "var(--primary-dark)" }}>
      Soulgreen
    </span>
    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
      © 2026 Soulgreen Studio · 香氛連接靈性与身心平衡
    </span>
  </div>
);
