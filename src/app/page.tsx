"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

export default function HomePage() {
  const [teaserProducts, setTeaserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );

        const { data: products } = await supabase
          .from("products")
          .select("*, categories(id, name_cn, name_en, slug)")
          .eq("Is_Sale", true)
          .limit(3);

        setTeaserProducts(products ?? []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const features = [
    {
      title: "科學嚴謹",
      desc: "傳承瑞士體系，以臨床芳療科學為核心。",
      icon: "diamond",
    },
    {
      title: "植萃輔助",
      desc: "精選自然精粹，提供身體與情緒的平衡。",
      icon: "leaf",
    },
    {
      title: "全方守護",
      desc: "從日常調理到身心安撫，穩固生活支持。",
      icon: "shield",
    },
  ];

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "96px 48px 88px",
          textAlign: "center",
          overflow: "hidden",
          background: "#FAFAF8",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 15% 80%, rgba(221,232,222,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(232,201,168,0.35) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 500,
              marginBottom: "24px",
            }}
          >
            SOULGREEN AROMA
          </div>
          <style>{`
            .hero-title {
              font-family: 'Lora', serif;
              font-size: 52px;
              font-weight: 400;
              line-height: 1.4;
              color: var(--text);
              margin: 0 auto 22px;
            }
            .hero-title em {
              font-style: italic;
              color: var(--primary);
            }
            @media (max-width: 640px) {
              .hero-title {
                font-size: 42px;
              }
            }
          `}</style>
          <h1 className="hero-title">
            安靜地，<em>回到自己</em>
          </h1>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "var(--text-sub)",
              maxWidth: "460px",
              margin: "0 auto 40px",
            }}
          >
            芳療不僅是氣味的愉悅，更是連接內在與外在的橋樑。Soulgreen 將瑞士芳療的科學嚴謹，與阿育吠陀的身心智慧合而為一，陪你找回內在節奏。
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/quiz"
              style={{
                display: "inline-block",
                background: "var(--primary-dark)",
                color: "var(--bg)",
                border: "none",
                borderRadius: "999px",
                padding: "14px 34px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "background 0.18s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2E2E2C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary-dark)")}
            >
              開始體質測試
            </Link>
            <Link
              href="/products"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "var(--primary-dark)",
                border: "1px solid var(--primary-dark)",
                borderRadius: "999px",
                padding: "14px 34px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              瀏覽芳療產品
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 48px 96px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-mid)",
                borderRadius: "16px",
                padding: "32px 26px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "var(--primary-muted)",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {f.icon === "diamond" && (
                  <span
                    style={{
                      width: "13px",
                      height: "13px",
                      background: "var(--primary-dark)",
                      transform: "rotate(45deg)",
                      display: "block",
                    }}
                  />
                )}
                {f.icon === "leaf" && (
                  <span
                    style={{
                      width: "20px",
                      height: "14px",
                      background: "var(--primary-dark)",
                      borderRadius: "0 100% 0 100%",
                      transform: "rotate(-45deg)",
                      display: "block",
                    }}
                  />
                )}
                {f.icon === "shield" && (
                  <span
                    style={{
                      width: "16px",
                      height: "18px",
                      background: "var(--primary-dark)",
                      clipPath: "polygon(50% 0%,100% 20%,100% 60%,50% 100%,0% 60%,0% 20%)",
                      display: "block",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 48px", marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--primary-muted)",
              display: "block",
            }}
          />
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>
      </div>

      {/* Product Teaser */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 48px 100px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontWeight: 500,
                marginBottom: "10px",
              }}
            >
              Selected Botanicals
            </div>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                fontSize: "26px",
                fontWeight: 400,
                color: "var(--text)",
                margin: 0,
              }}
            >
              草本與香氣的對話
            </h2>
          </div>
          <Link
            href="/products"
            style={{
              fontSize: "13px",
              color: "var(--primary)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            查看全部商品 →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "18px",
          }}
        >
          {loading ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              加載中...
            </div>
          ) : teaserProducts.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              暫無商品
            </div>
          ) : (
            teaserProducts.map((p: Product) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#8A9A86")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1",
                    background: "var(--bg-mid)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    overflow: "hidden",
                  }}
                >
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name_cn || ""}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    "[圖片]"
                  )}
                </div>
                <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text)" }}>{p.name_cn}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                      {p.name_en}
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-sub)", lineHeight: 1.6, flex: 1 }}>
                    {p.usage}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{p.volume}</div>
                      <div style={{ fontSize: "15px", color: "var(--text)", fontWeight: 500 }}>¥ {p.price}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      style={{
                        background: "transparent",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "999px",
                        padding: "8px 16px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-muted)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      加入購物
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* CTA Band */}
      <div style={{ background: "#2E2E2C", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "30px",
              fontWeight: 400,
              color: "white",
              margin: "0 0 14px",
            }}
          >
            還不確定從何開始？
          </h2>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(250,250,248,0.75)",
              lineHeight: 1.8,
              margin: "0 0 32px",
            }}
          >
            用半小時，讓高質測試的為你帶來方向 — 直接面對面詢問，由香氛師為你量身建議。
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/quiz"
              style={{
                display: "inline-block",
                background: "white",
                color: "var(--primary-dark)",
                border: "none",
                borderRadius: "999px",
                padding: "13px 30px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              開始體質測試
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(250,250,248,0.4)",
                borderRadius: "999px",
                padding: "13px 30px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.04em",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,250,248,0.4)")}
            >
              預訂諮詢
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
