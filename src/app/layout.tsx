import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const fonts = {
  googleapis: [
    {
      href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      rel: "stylesheet",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap",
      rel: "stylesheet",
    },
  ],
};

export const metadata: Metadata = {
  title: "Soulgreen | 芳疗名片手册",
  description: "内在探索 ✕ 科学基础，专注于植物对身心的真实支持。",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "google-fonts-lora": fonts.googleapis[0].href,
    "google-fonts-inter": fonts.googleapis[1].href,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg)", color: "var(--text)", margin: 0, padding: 0 }}>
        <CartProvider>
          <CartDrawer />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
