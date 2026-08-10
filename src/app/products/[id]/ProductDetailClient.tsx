"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useCart } from "@/context/CartContext";
import { toTwd } from "@/lib/currency";
import type { Product } from "@/types/product";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, setCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product.category_id) return;

      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );

        const { data } = await supabase
          .from("products")
          .select("*, categories(id, name_cn, name_en, slug)")
          .eq("category_id", product.category_id)
          .neq("id", product.id)
          .limit(4);

        setRelatedProducts((data ?? []).map(toTwd));
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product.id, product.category_id]);

  return (
    <div style={{ fontFamily: "'Noto Sans TC', sans-serif", background: "#f7f3ea", color: "#28331f", lineHeight: 1.75, overflowX: "hidden" }}>
      <style>{`
        .font-serif { font-family: 'Noto Serif TC', serif; }
        .sg-fade-up { animation: sg-fade-up 0.9s ease both; }
        @keyframes sg-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sg-product-grid {
          display: grid;
          gridTemplateColumns: 1fr 1fr;
          gap: 72px;
          alignItems: flex-start;
          marginBottom: 100px;
        }
        @media (max-width: 860px) {
          .sg-product-grid {
            gridTemplateColumns: 1fr;
            gap: 48px;
          }
          .sg-product-image {
            position: static !important;
            aspectRatio: 4/5;
          }
        }
        @media (min-width: 861px) {
          .sg-product-image {
            max-height: 500px;
            max-width: 400px;
          }
        }
        @media (max-width: 560px) {
          .sg-product-grid {
            gap: 32px;
            marginBottom: 60px;
          }
        }
      `}</style>

      <main style={{
        position: "relative",
        minHeight: "100vh",
        background: "#f7f3ea"
      }}>
        <div style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "40px 6vw 120px"
        }}>
          {/* 返回按鈕 */}
          <Link href="/#products" style={{
            background: "none",
            border: "none",
            color: "#6b7562",
            fontSize: "14.5px",
            cursor: "pointer",
            fontFamily: "inherit",
            padding: "0",
            marginBottom: "44px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none"
          }}>
            ← 返回產品列表
          </Link>

          {/* 主要內容網格 */}
          <div className="sg-product-grid">
            {/* 左邊：產品圖片 */}
            <div className="sg-product-image" style={{
              aspectRatio: "4/5",
              borderRadius: "28px",
              overflow: "hidden",
              position: "sticky",
              top: "40px",
              background: "#f0e8dc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8a7a5c",
              fontSize: "14px"
            }}>
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name_cn || ""}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "[產品圖片]"
              )}
            </div>

            {/* 右邊：產品資訊 */}
            <div>
              {/* 分類名稱 */}
              <div style={{
                fontSize: "13px",
                letterSpacing: "3px",
                color: "#b8734f",
                marginBottom: "14px",
                textTransform: "uppercase"
              }}>
                {product.categories?.name_cn || "產品"}
              </div>

              {/* 產品標題 */}
              <h2 className="font-serif" style={{
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 600,
                margin: "0 0 18px"
              }}>
                {product.name_cn}
              </h2>

              {/* 產品描述 */}
              <p style={{
                color: "#5c6650",
                fontWeight: 300,
                fontSize: "16px",
                margin: "0 0 24px"
              }}>
                {product.description}
              </p>

              {/* 價格 */}
              <div style={{
                fontSize: "22px",
                color: "#28331f",
                fontWeight: 500,
                marginBottom: "30px"
              }}>
                NT$ {product.price?.toLocaleString()}
              </div>

              {/* 主要成分框 */}
              {product.ingredients && (
                <div style={{
                  background: "#fffdf8",
                  borderRadius: "18px",
                  padding: "22px 26px",
                  marginBottom: "32px"
                }}>
                  <div style={{
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    color: "#8a7a5c",
                    marginBottom: "10px",
                    textTransform: "uppercase"
                  }}>
                    主要成分
                  </div>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px"
                  }}>
                    {product.ingredients.split("、").slice(0, 5).map((ingredient, index) => (
                      <span key={index} style={{
                        background: "#f0e8dc",
                        color: "#6b7562",
                        padding: "8px 16px",
                        borderRadius: "100px",
                        fontSize: "14px",
                        fontWeight: 300
                      }}>
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 香氣與使用建議框 */}
              <div style={{
                background: "#fffdf8",
                borderRadius: "18px",
                padding: "22px 26px",
                marginBottom: "32px"
              }}>
                <div style={{
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  color: "#8a7a5c",
                  marginBottom: "10px",
                  textTransform: "uppercase"
                }}>
                  香氣與使用建議
                </div>
                <p style={{
                  fontSize: "14.5px",
                  color: "#4a5230",
                  margin: "0",
                  fontWeight: 300
                }}>
                  {product.method || "請洽詢客服了解使用方式"}
                </p>
              </div>

              {/* 數量選擇和加入購物車 */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* 數量選擇器 */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(74,89,64,.2)",
                  borderRadius: "100px",
                  overflow: "hidden"
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "40px",
                      height: "44px",
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "#4a5940"
                    }}
                  >
                    −
                  </button>
                  <span style={{
                    width: "36px",
                    textAlign: "center",
                    fontSize: "15px"
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: "40px",
                      height: "44px",
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "#4a5940"
                    }}
                  >
                    ＋
                  </button>
                </div>

                {/* 加入購物清單按鈕 */}
                <button
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name_cn || product.name_en || "產品",
                      price: product.price,
                      image: product.image_url,
                      volume: product.volume
                    }, quantity);
                    setCartOpen(true);
                  }}
                  style={{
                    flex: 1,
                    background: "#4a5940",
                    color: "#fbf8f0",
                    border: "none",
                    padding: "16px 28px",
                    borderRadius: "100px",
                    fontSize: "15px",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.3s ease"
                  }}
                >
                  加入購物清單
                </button>
              </div>
            </div>
          </div>

          {/* 同系列產品 */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-serif" style={{
                fontSize: "22px",
                fontWeight: 600,
                margin: "0 0 32px"
              }}>
                同系列還有
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "28px"
              }}>
                {relatedProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{
                      background: "#fffdf8",
                      borderRadius: "18px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    }}>
                      <div style={{
                        aspectRatio: "1",
                        background: "#f0e8dc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      }}>
                        {prod.image_url ? (
                          <img
                            src={prod.image_url}
                            alt={prod.name_cn || ""}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                        ) : (
                          <span style={{ color: "#8a7a5c" }}>[圖片]</span>
                        )}
                      </div>
                      <div style={{ padding: "18px" }}>
                        <h4 className="font-serif" style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          margin: "0 0 6px"
                        }}>
                          {prod.name_cn}
                        </h4>
                        <p style={{
                          fontSize: "13px",
                          color: "#6b7562",
                          margin: "0 0 10px",
                          fontWeight: 300
                        }}>
                          {prod.usage}
                        </p>
                        <div style={{
                          fontSize: "15px",
                          color: "#28331f",
                          fontWeight: 500
                        }}>
                          NT$ {prod.price?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
