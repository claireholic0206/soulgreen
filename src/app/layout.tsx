import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

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
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250,250,248,0.94)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <style>{`
        .header-logo {
          font-family: 'Lora', 'Lora', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-dark);
          letter-spacing: 0.01em;
          cursor: pointer;
          flex-shrink: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @media (max-width: 640px) {
          .header-logo {
            font-family: 'Lora', 'Lora', serif;
            font-size: 17px;
          }
        }
      `}</style>
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div className="header-logo">
          Soulgreen Aroma
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              fontSize: "13px",
              color: "var(--text-sub)",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            首頁
          </a>
          <a
            href="/products"
            style={{
              fontSize: "13px",
              color: "var(--text-sub)",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            芳疗產品
          </a>
          <a
            href="/quiz"
            style={{
              fontSize: "13px",
              color: "var(--text-sub)",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            体质測驗
          </a>
          <a
            href="/services"
            style={{
              fontSize: "13px",
              color: "var(--text-sub)",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            专屬服務
          </a>
          <a
            href="/cart"
            style={{
              fontSize: "13px",
              color: "var(--text-sub)",
              fontWeight: 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            購物車 🛒
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
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
}
