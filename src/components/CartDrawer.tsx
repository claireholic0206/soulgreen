"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeItem, totalPrice } = useCart();

  if (!cartOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 300,
      fontFamily: "'Noto Sans TC', sans-serif"
    }}>
      <style>{`
        @media (max-width: 560px) {
          .sg-cart-drawer {
            width: 100vw !important;
          }
        }
      `}</style>
      {/* 背景覆蓋 */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(40,51,31,.35)",
          cursor: "pointer"
        }}
      />

      {/* 抽屜 */}
      <div className="sg-cart-drawer" style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(420px, 92vw)",
        background: "#fbf8f0",
        boxShadow: "-20px 0 60px rgba(0,0,0,.15)",
        padding: "36px 32px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* 標題和關閉按鈕 */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px"
        }}>
          <h3 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "22px",
            fontWeight: 600,
            margin: 0,
            color: "#28331f"
          }}>
            我的購物清單
          </h3>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#6b7562",
              padding: 0
            }}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{
            color: "#8a7a5c",
            fontWeight: 300,
            fontSize: "14.5px"
          }}>
            清單目前是空的，去看看喜歡的產品吧。
          </p>
        ) : (
          <>
            {/* 購物清單 */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              flex: 1,
              marginBottom: "22px"
            }}>
              {items.map((item) => (
                <div key={item.id} style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center"
                }}>
                  {/* 產品圖片 */}
                  <div style={{
                    width: "76px",
                    height: "76px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#f0e8dc"
                  }}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#8a7a5c"
                      }}>
                        🌿
                      </div>
                    )}
                  </div>

                  {/* 產品資訊 */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      marginBottom: "4px",
                      color: "#28331f"
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      color: "#8a7a5c"
                    }}>
                      {item.quantity} × {item.price ? `NT$ ${item.price.toLocaleString()}` : ""}
                    </div>
                  </div>

                  {/* 移除按鈕 */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#a8a48c",
                      fontSize: "13px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      padding: 0,
                      flexShrink: 0
                    }}
                  >
                    移除
                  </button>
                </div>
              ))}
            </div>

            {/* 小計和操作按鈕 */}
            <div style={{
              borderTop: "1px solid rgba(74,89,64,.15)",
              paddingTop: "22px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: "20px",
                color: "#28331f"
              }}>
                <span>小計</span>
                <span>NT$ {totalPrice.toLocaleString()}</span>
              </div>
              <Link
                href="/#consult"
                onClick={(e) => {
                  setCartOpen(false);
                  // 如果已經在首頁，換 hash 不會觸發 Next.js 的換頁捲動。
                  // 改成手動觸發 hashchange，讓首頁自己既有的捲動邏輯接手處理。
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    if (window.location.hash === "#consult") {
                      window.dispatchEvent(new HashChangeEvent("hashchange"));
                    } else {
                      window.location.hash = "consult";
                    }
                  }
                }}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#b8734f",
                  color: "#fff",
                  padding: "15px",
                  borderRadius: "100px",
                  fontSize: "14.5px",
                  letterSpacing: ".5px",
                  textDecoration: "none",
                  fontFamily: "inherit"
                }}
              >
                前往預約諮詢，確認我的清單
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
