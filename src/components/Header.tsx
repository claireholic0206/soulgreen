"use client";

import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          font-size: 28px;
          font-weight: 700;
          color: var(--primary-dark);
          letter-spacing: 0.01em;
          cursor: pointer;
          flex-shrink: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-left: auto;
          margin-right: 28px;
        }
        .header-nav a {
          font-size: 13px;
          color: var(--text-sub);
          font-weight: 400;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
        }
        .header-nav a:hover {
          color: var(--primary-dark);
        }
        .header-nav-mobile-hide {
          display: inline;
        }
        .cart-icon {
          width: 18px;
          height: 18px;
          display: inline-block;
          vertical-align: middle;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .menu-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: none;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }
        .menu-icon {
          width: 20px;
          height: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .menu-icon span {
          width: 20px;
          height: 2px;
          background: var(--text-sub);
          transition: all 0.3s;
          display: block;
        }
        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(250,250,248,0.98);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          display: none;
          flex-direction: column;
          gap: 0;
        }
        .mobile-nav.open {
          display: flex;
        }
        .mobile-nav a {
          padding: 14px 20px;
          font-size: 13px;
          color: var(--text-sub);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.2s;
        }
        .mobile-nav a:hover {
          background: var(--bg-mid);
          color: var(--primary-dark);
        }
        .mobile-nav a:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .header-logo {
            font-size: 18px;
          }
          .header-nav {
            gap: 16px;
            display: none;
          }
          .header-actions {
            gap: 12px;
          }
          .menu-button {
            display: flex;
          }
        }
        @media (max-width: 640px) {
          .header-logo {
            font-size: 16px;
          }
          .header-actions {
            gap: 8px;
          }
        }
      `}</style>
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          position: "relative",
          width: "100%",
        }}
      >
        <a href="/" className="header-logo" style={{ textDecoration: "none" }}>
          Soulgreen
        </a>
        <div className="header-nav">
          <a href="/">首頁</a>
          <a href="/products">芳疗產品</a>
          <a href="/quiz">体質測驗</a>
          <a href="/services" className="header-nav-mobile-hide">专属服务</a>
        </div>

        <div className="header-actions">
          <a href="/cart" style={{ display: "flex", alignItems: "center" }}>
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </a>
          <button
            className="menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--text-sub)" }}
          >
            <div className="menu-icon">
              <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translateY(10px)" : "none" }} />
              <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
              <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translateY(-10px)" : "none" }} />
            </div>
          </button>
        </div>

        <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>首頁</a>
          <a href="/products" onClick={() => setMobileMenuOpen(false)}>芳疗產品</a>
          <a href="/quiz" onClick={() => setMobileMenuOpen(false)}>体質測驗</a>
          <a href="/services" onClick={() => setMobileMenuOpen(false)}>专属服务</a>
        </div>
      </div>
    </div>
  );
}
