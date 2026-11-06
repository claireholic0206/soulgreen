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
      fontFamily: "'Noto Sans SC', sans-serif"
    }}>
      <style>{`
        @media (max-width: 560px) {
          .sg-cart-drawer {
            width: 100vw !important;
          }
        }
      `}</style>
      {/* 背景覆盖 */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(40,51,31,.35)",
          cursor: "pointer"
        }}
      />

      {/* 抽屉 */}
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
        {/* 标题和关闭按钮 */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px"
        }}>
          <h3 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "22px",
            fontWeight: 600,
            margin: 0,
            color: "#28331f"
          }}>
            我的购物清单
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
            清单目前是空的，去看看喜欢的产品吧。
          </p>
        ) : (
          <>
            {/* 购物清单 */}
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
                  {/* 产品图片 */}
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

                  {/* 产品资讯 */}
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
                      {item.quantity} × {item.price ? `¥${item.price.toLocaleString()}` : ""}
                    </div>
                  </div>

                  {/* 移除按钮 */}
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

            {/* 小计和操作按钮 */}
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
                <span>小计</span>
                <span>¥{totalPrice.toLocaleString()}</span>
              </div>
              <Link
                href="/#consult"
                onClick={(e) => {
                  setCartOpen(false);
                  // 如果已经在首页，换 hash 不会触发 Next.js 的换页卷动。
                  // 改成手动触发 hashchange，让首页自己既有的卷动逻辑接手处理。
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
                前往预约咨询，确认我的清单
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
