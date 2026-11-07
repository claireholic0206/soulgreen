"use client";

import { createClient } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { posts, hasPosts, formatPostDate } from "@/lib/posts";
import type { Product } from "@/types/product";

const CATEGORY_IMAGE_BY_NAME: Record<string, string> = {
  "功能复方": "/focus1.jpg",
  "单方精油": "/focus2.jpg",
  "阿育吠陀": "/focus3.jpg",
  "植物基底油": "/focus4.jpg",
  "季节限定": "/focus5.jpg",
};

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const { cartOpen, setCartOpen, totalCount, items: cartItems, totalPrice: cartTotalPrice } = useCart();
  const [teaserProducts, setTeaserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [consultName, setConsultName] = useState("");
  const [consultContact, setConsultContact] = useState("");
  const [consultTopic, setConsultTopic] = useState("");
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultSending, setConsultSending] = useState(false);

  useEffect(() => {
    const section = searchParams.get("section");
    if (section && !loading) {
      // 产品载入完成后，给 DOM 一点时间渲染，再滚动
      requestAnimationFrame(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, [searchParams, loading]);

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
          .limit(20);

        setTeaserProducts(products ?? []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(
    new Map(
      teaserProducts
        .filter((p): p is Product & { categories: NonNullable<Product["categories"]> } => !!p.categories)
        .map(p => [p.categories.id, p.categories])
    ).values()
  );

  useEffect(() => {
    // 处理 hash 跳转
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const filteredProducts = teaserProducts.filter(p => p.categories?.id === selectedCategory);

  return (
    <div style={{ fontFamily: "'Noto Sans SC', sans-serif", background: "#f7f3ea", color: "#28331f", lineHeight: 1.75, overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: #c9a961; color: #28331f; }

        .font-serif { font-family: 'Noto Serif SC', serif; }
        .sg-fade-up { animation: sg-fade-up 0.9s ease both; }
        .sg-pulse-ring { animation: sg-pulse-ring 2.4s infinite; }
        .sg-drift { animation: sg-drift 14s ease-in-out infinite; }

        @keyframes sg-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sg-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(184,115,79,.35); }
          100% { box-shadow: 0 0 0 14px rgba(184,115,79,0); }
        }
        @keyframes sg-drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-14px,18px) scale(1.04); }
        }

        a { color: #6b7a4f; text-decoration: none; }
        a:hover { color: #b8734f; }

        /* 锚点跳转时，扣掉 sticky nav 的高度，避免标题被挡住。
           用 scroll-margin-top 而不是算死的像素位置，
           不管上面产品数量多寡改变了页面高度都还是会跳到正确位置 */
        #story, #products, #news, #assessment, #consult { scroll-margin-top: 96px; }

        .sg-hero { min-height: 92vh; }
        .sg-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; position: relative; max-width: 1240px; margin: 0 auto; }
        .sg-story-img-wrap { width: 280px; height: 360px; }
        .sg-products-grid { display: grid; grid-template-columns: 0.85fr 1.4fr; gap: 80px; align-items: start; }
        .sg-nav-links { display: flex; align-items: center; gap: 36px; font-size: 15px; letter-spacing: .5px; }
        .sg-nav-links a:not(:last-child) { display: block; }
        .sg-assessment-card { padding: 52px 48px; }
        .sg-consult-form { padding: 44px; }
        .sg-hero-actions { display: flex; gap: 18px; flex-wrap: wrap; }

        @media (max-width: 860px) {
          .sg-nav-links { gap: 18px !important; font-size: 13.5px !important; }
          .sg-nav-links a:not(:last-child) { display: none !important; }
          .sg-hero { min-height: 78vh !important; }
          .sg-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .sg-story-img-wrap { width: 100% !important; max-width: 280px !important; height: auto !important; aspect-ratio: 4/5; margin: 0 auto; }
          .sg-products-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          section { padding-left: 5vw !important; padding-right: 5vw !important; }
          #story, #consult { padding-top: 80px !important; padding-bottom: 80px !important; }
          #products { padding-top: 100px !important; padding-bottom: 90px !important; }
          #assessment { padding-top: 80px !important; padding-bottom: 80px !important; }
          .sg-assessment-card { padding: 36px 24px !important; }
          .sg-consult-form { padding: 32px 24px !important; }
        }

        @media (max-width: 560px) {
          .sg-hero-actions a { width: 100%; text-align: center; }
        }
      `}</style>

      {/* ──── NAV ──── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 6vw",
        background: "rgba(247,243,234,.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(40,51,31,.08)"
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "26px",
          fontWeight: 600,
          letterSpacing: "2px",
          color: "#4a5940"
        }}>
          Soulgreen <span style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#8a7a5c",
            letterSpacing: "1px",
            marginLeft: "6px"
          }}>芳疗</span>
        </div>
        <div className="sg-nav-links">
          <a href="#story">品牌理念</a>
          <a href="#products">产品</a>
          {hasPosts && <a href="#news">最新动态</a>}
          <a href="#assessment">状态评估</a>
          <a href="#consult">预约咨询</a>
          <button onClick={() => setCartOpen(true)} style={{
            position: "relative",
            background: "none",
            border: "1px solid rgba(74,89,64,.25)",
            borderRadius: "100px",
            padding: "9px 20px",
            fontSize: "14px",
            fontFamily: "inherit",
            color: "#4a5940",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none"
          }}>
            购物清单
            {totalCount > 0 && (
              <span style={{
                background: "#b8734f",
                color: "#fff",
                fontSize: "11px",
                minWidth: "18px",
                height: "18px",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px"
              }}>
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ──── HERO ──── */}
      <section className="sg-hero" style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden"
      }}>
        <img
          src="/hero.jpg"
          alt="hero"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(40,51,31,.15) 0%, rgba(40,51,31,.1) 40%, rgba(40,51,31,.72) 100%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "relative",
          padding: "0 6vw 8vw",
          maxWidth: "780px",
          animation: "sg-fade-up .9s ease both"
        }}>
          <div style={{
            fontSize: "14px",
            letterSpacing: "4px",
            color: "#e7dfc8",
            marginBottom: "18px",
            textTransform: "uppercase"
          }}>
            Aromatherapy · Ayurveda · 天然身心疗愈
          </div>
          <h1 className="font-serif" style={{
            fontSize: "clamp(38px, 5.2vw, 68px)",
            fontWeight: 600,
            color: "#fbf8f0",
            margin: "0 0 22px",
            lineHeight: 1.35
          }}>
            在香气里，<br/>找回与自然同步的自己
          </h1>
          <p style={{
            fontSize: "17px",
            color: "#ece5d3",
            maxWidth: "520px",
            margin: "0 0 34px",
            fontWeight: 300,
            lineHeight: 1.7
          }}>
            纯粹植物萃取，结合阿育吠陀身心智慧，为你与家人打造温柔而深刻的日常仪式。
          </p>
          <div className="sg-hero-actions">
            <a href="#assessment" style={{
              background: "#b8734f",
              color: "#fbf8f0",
              padding: "15px 32px",
              borderRadius: "100px",
              fontSize: "15px",
              letterSpacing: "1px",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(184,115,79,0.35)",
              display: "inline-block"
            }}>
              开始身心状态评估
            </a>
            <a href="#products" style={{
              border: "1px solid rgba(251,248,240,.5)",
              color: "#fbf8f0",
              padding: "15px 32px",
              borderRadius: "100px",
              fontSize: "15px",
              letterSpacing: "1px",
              textDecoration: "none",
              display: "inline-block"
            }}>
              探索产品
            </a>
          </div>
        </div>
      </section>

      {/* ──── BRAND STORY ──── */}
      <section id="story" style={{
        background: "#2f3b26",
        color: "#ece5d3",
        padding: "130px 6vw",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,97,.14), transparent 70%)",
          top: "-160px",
          right: "-160px",
          animation: "sg-drift 14s ease-in-out infinite"
        }} />
        <div className="sg-two-col">
          <div>
            <div className="sg-story-img-wrap" style={{
              borderRadius: "6% 40% 6% 40%",
              overflow: "hidden",
              background: "rgba(201,169,97,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img
                src="/branding.jpg"
                alt="Soulgreen 品牌故事"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div>
            <div style={{
              fontSize: "13px",
              letterSpacing: "4px",
              color: "#b8734f",
              marginBottom: "16px",
              textTransform: "uppercase",
              fontWeight: 600
            }}>
              Our Philosophy
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 600,
              margin: "0 0 28px",
              color: "#fbf8f0"
            }}>
              相信身体本来，<br/>就懂得如何疗愈自己
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#d6cfba",
              fontWeight: 300,
              margin: "0 0 20px",
              lineHeight: 1.8
            }}>
              Soulgreen 源自于一个简单的信念：当我们愿意慢下来，贴近植物、贴近呼吸，身体与情绪都会找到属于自己的节奏。
            </p>
            <p style={{
              fontSize: "16px",
              color: "#d6cfba",
              fontWeight: 300,
              margin: 0,
              lineHeight: 1.8
            }}>
              我们以阿育吠陀的身心智慧为底蕴，结合纯净植物萃取，将每一瓶产品都设计成一段安定练习——给重视健康、渴望被自然温柔拥抱的你与家人。
            </p>
          </div>
        </div>
      </section>

      {/* ──── PRODUCTS ──── */}
      <section id="products" style={{
        padding: "170px 6vw 150px",
        maxWidth: "1360px",
        margin: "0 auto"
      }}>
        <div style={{ textAlign: "center", marginBottom: "88px" }}>
          <div style={{
            fontSize: "13px",
            letterSpacing: "4px",
            color: "#b8734f",
            marginBottom: "16px",
            textTransform: "uppercase",
            fontWeight: 600
          }}>
            Product Rituals
          </div>
          <h2 className="font-serif" style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 600,
            margin: "0 0 18px"
          }}>
            五大品项，各自延展出属于你的香气
          </h2>
          <p style={{
            color: "#5c6650",
            maxWidth: "600px",
            margin: "0 auto",
            fontWeight: 300,
            fontSize: "15px"
          }}>
            每个品项底下都有十数款配方，依你的品类选择，慢慢浏览、慢慢感受。
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "76px"
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "13px 30px",
                  borderRadius: "100px",
                  fontSize: "14.5px",
                  letterSpacing: "1px",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  border: selectedCategory === cat.id ? "none" : "1px solid rgba(74,89,64,.25)",
                  background: selectedCategory === cat.id ? "#4a5940" : "transparent",
                  color: selectedCategory === cat.id ? "#fbf8f0" : "#4a5940",
                  transition: "all 0.3s ease"
                }}
              >
                {cat.name_cn}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid with Featured */}
        {!loading && categories.length > 0 && selectedCategory && (
          <div className="sg-products-grid" style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.4fr",
            gap: "80px",
            alignItems: "start"
          }}>
            {/* Left: Featured Info */}
            <div>
              <div style={{
                aspectRatio: "4/5",
                borderRadius: "30px",
                overflow: "hidden",
                marginBottom: "30px",
                background: "#f0e8dc"
              }}>
                <img
                  src={CATEGORY_IMAGE_BY_NAME[categories.find(c => c.id === selectedCategory)?.name_cn ?? ""] ?? "/focus1.jpg"}
                  alt={categories.find(c => c.id === selectedCategory)?.name_cn ?? "分类精选"}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{
                fontSize: "13px",
                letterSpacing: "3px",
                color: "#b8734f",
                marginBottom: "14px",
                textTransform: "uppercase"
              }}>
                {categories.find(c => c.id === selectedCategory)?.name_en || "Featured"}
              </div>
              <h3 className="font-serif" style={{
                fontSize: "28px",
                fontWeight: 600,
                margin: "0 0 18px"
              }}>
                {categories.find(c => c.id === selectedCategory)?.name_cn || "精选"}
              </h3>
              <p style={{
                color: "#5c6650",
                fontWeight: 300,
                fontSize: "15px",
                margin: "0 0 22px",
                maxWidth: "400px"
              }}>
                {categories.find(c => c.id === selectedCategory)?.slug || "精心挑选的优质品项"}
              </p>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                fontSize: "13px",
                color: "#8a7a5c",
                borderTop: "1px solid rgba(74,89,64,.12)",
                paddingTop: "18px"
              }}>
                <span style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#b8734f"
                }} />
                {filteredProducts.length} 件商品
              </div>
            </div>

            {/* Right: Product Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "44px 30px"
            }}>
              {filteredProducts.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#8a7a5c" }}>
                  暂无商品
                </div>
              ) : (
                filteredProducts.map((p: Product) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    <div style={{
                      aspectRatio: "1/1",
                      borderRadius: "22px",
                      overflow: "hidden",
                      marginBottom: "20px",
                      background: "#f0e8dc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name_cn || ""}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ color: "#8a7a5c", fontSize: "14px" }}>[产品图片]</div>
                      )}
                    </div>
                    <h4 style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: "16.5px",
                      fontWeight: 600,
                      margin: "0 0 7px"
                    }}>
                      {p.name_cn}
                    </h4>
                    <p style={{
                      fontSize: "13.5px",
                      color: "#6b7562",
                      margin: "0 0 8px",
                      fontWeight: 300
                    }}>
                      {p.usage || p.name_en}
                    </p>
                    <p style={{
                      fontSize: "13.5px",
                      color: "#b8734f",
                      margin: 0,
                      fontWeight: 500
                    }}>
                      ¥{p.price?.toLocaleString()}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "40px", color: "#8a7a5c" }}>
            加载中...
          </div>
        )}
      </section>

      {/* ──── NEWS（还没有文章时整个区块不显示；内容放在 content/posts/） ──── */}
      {hasPosts && (
        <section id="news" style={{ background: "#f7f3ea", padding: "120px 6vw 40px" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "44px" }}>
              <div>
                <div style={{ fontSize: "13px", letterSpacing: "4px", color: "#b8734f", marginBottom: "16px", fontWeight: 600 }}>
                  JOURNAL
                </div>
                <h2 className="font-serif" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 600, margin: 0 }}>
                  最新动态
                </h2>
              </div>
              <Link href="/news/" style={{ fontSize: "14.5px", color: "#4a5940" }}>查看全部 →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px" }}>
              {posts.slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/news/${p.slug}/`} style={{ display: "block", background: "#fffdf8", borderRadius: "20px", overflow: "hidden", color: "inherit" }}>
                  {p.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
                  )}
                  <div style={{ padding: "22px 24px 26px" }}>
                    <div style={{ fontSize: "12px", color: "#b8734f", letterSpacing: "1px", marginBottom: "8px" }}>
                      {p.type} · {formatPostDate(p.date)}
                    </div>
                    <h3 className="font-serif" style={{ fontSize: "19px", fontWeight: 600, margin: "0 0 8px" }}>{p.title}</h3>
                    {p.summary && <p style={{ fontSize: "14px", color: "#5c6650", fontWeight: 300, margin: 0 }}>{p.summary}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──── ASSESSMENT SECTION ──── */}
      <section id="assessment" style={{
        background: "linear-gradient(180deg, #eee7d6 0%, #f7f3ea 100%)",
        padding: "120px 6vw",
        position: "relative"
      }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              fontSize: "13px",
              letterSpacing: "4px",
              color: "#b8734f",
              marginBottom: "16px",
              textTransform: "uppercase",
              fontWeight: 600
            }}>
              Ayurveda Check-in
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 600,
              margin: "0 0 18px"
            }}>
              此刻的你，是什么状态？
            </h2>
            <p style={{
              color: "#5c6650",
              maxWidth: "520px",
              margin: "0 auto",
              fontWeight: 300,
              fontSize: "15px"
            }}>
              这不是体质诊断，而是一份根据你「目前的身心感受」，为你推荐合适仪式与产品的小测验。
            </p>
          </div>

          <div className="sg-assessment-card" style={{
            background: "#fffdf8",
            borderRadius: "28px",
            boxShadow: "0 16px 46px rgba(40,51,31,.05)",
            textAlign: "center",
            minHeight: "380px"
          }}>
            <div style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              background: "#eef1e6",
              margin: "0 auto 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "sg-pulse-ring 2.4s infinite"
            }}>
              <span className="font-serif" style={{
                fontSize: "32px",
                color: "#6b7a4f"
              }}>
                气
              </span>
            </div>
            <p style={{
              fontSize: "16px",
              color: "#4a5230",
              margin: "0 0 34px",
              fontWeight: 300,
              lineHeight: 1.7
            }}>
              6 道选择题，约 1 分钟，找到最适合现在的你的产品组合。
            </p>
            <Link href="/quiz" style={{
              display: "inline-block",
              background: "#2f3b26",
              color: "#fbf8f0",
              border: "none",
              padding: "16px 40px",
              borderRadius: "100px",
              fontSize: "15px",
              letterSpacing: "1px",
              cursor: "pointer",
              textDecoration: "none"
            }}>
              开始评估
            </Link>
          </div>
        </div>
      </section>

      {/* ──── CONSULT SECTION ──── */}
      <section id="consult" style={{
        background: "#2f3b26",
        padding: "130px 6vw",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,248,240,.08), transparent 70%)",
          bottom: "-140px",
          left: "-100px",
          animation: "sg-drift 16s ease-in-out infinite"
        }} />
        <div className="sg-two-col" style={{
          maxWidth: "1180px",
          margin: "0 auto"
        }}>
          <div>
            <div style={{
              fontSize: "13px",
              letterSpacing: "4px",
              color: "#b8734f",
              marginBottom: "16px",
              textTransform: "uppercase",
              fontWeight: 600
            }}>
              Book a Consultation
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 600,
              color: "#fbf8f0",
              margin: "0 0 24px"
            }}>
              让芳疗顾问，<br/>为你量身规划仪式
            </h2>
            <p style={{
              color: "#d6cfba",
              fontWeight: 300,
              fontSize: "15.5px",
              margin: "0 0 32px",
              lineHeight: 1.8
            }}>
              无论是初次接触精油、想改善睡眠困扰，或想为家人挑选合适的照护方式，我们都乐意倾听并提供建议。
            </p>
            <div style={{
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "4/3",
              borderRadius: "24px",
              overflow: "hidden",
              background: "rgba(251,248,240,0.08)"
            }}>
              <img
                src="/consultation.jpg"
                alt="芳疗顾问咨询情境"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="sg-consult-form" style={{
            background: "#fbf8f0",
            borderRadius: "28px",
            position: "relative",
            boxShadow: "0 20px 50px rgba(0,0,0,.12)"
          }}>
            {consultSubmitted ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "400px",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "48px",
                  marginBottom: "24px",
                  color: "#8a7a5c"
                }}>
                  ✓
                </div>
                <h3 className="font-serif" style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  margin: "0 0 16px",
                  color: "#28331f"
                }}>
                  已收到你的讯息
                </h3>
                <p style={{
                  fontSize: "15px",
                  color: "#4a5230",
                  margin: "0 0 32px",
                  lineHeight: 1.6,
                  maxWidth: "400px"
                }}>
                  感谢 {consultName} 的信任，我们将尽快透过你留下的方式与你联系。
                </p>
                <button
                  onClick={() => {
                    setConsultSubmitted(false);
                    setConsultName("");
                    setConsultContact("");
                    setConsultTopic("");
                  }}
                  style={{
                    background: "none",
                    border: "1px solid rgba(74,89,64,.3)",
                    color: "#4a5940",
                    padding: "12px 28px",
                    borderRadius: "100px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "inherit"
                  }}
                >
                  再填一份
                </button>
              </div>
            ) : (
              <div>
                {cartItems.length > 0 && (
                  <div style={{
                    background: "#f7f3ea",
                    borderRadius: "14px",
                    padding: "18px 20px",
                    marginBottom: "24px"
                  }}>
                    <div style={{
                      fontSize: "13px",
                      letterSpacing: "1px",
                      color: "#6b7562",
                      marginBottom: "10px",
                      fontWeight: 500
                    }}>
                      已选商品清单
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {cartItems.map((item) => (
                        <div key={item.id} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          color: "#28331f"
                        }}>
                          <span>{item.name} × {item.quantity}</span>
                          <span>{item.price ? `¥${(item.price * item.quantity).toLocaleString()}` : ""}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#28331f",
                      marginTop: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid rgba(74,89,64,.15)"
                    }}>
                      <span>小计</span>
                      <span>¥{cartTotalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  color: "#6b7562",
                  marginBottom: "8px",
                  fontWeight: 500
                }}>
                  姓名
                </label>
              <input
                type="text"
                placeholder="请输入你的姓名"
                value={consultName}
                onChange={(e) => setConsultName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(74,89,64,.18)",
                  fontSize: "15px",
                  marginBottom: "20px",
                  background: "#f7f3ea",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />

              <label style={{
                display: "block",
                fontSize: "13px",
                letterSpacing: "1px",
                color: "#6b7562",
                marginBottom: "8px",
                fontWeight: 500
              }}>
                联络方式（电话、Email或Wechat）
              </label>
              <input
                type="text"
                placeholder="方便联络你的方式"
                value={consultContact}
                onChange={(e) => setConsultContact(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(74,89,64,.18)",
                  fontSize: "15px",
                  marginBottom: "20px",
                  background: "#f7f3ea",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />

              <label style={{
                display: "block",
                fontSize: "13px",
                letterSpacing: "1px",
                color: "#6b7562",
                marginBottom: "8px",
                fontWeight: 500
              }}>
                想咨询的主题（可选）
              </label>
              <textarea
                placeholder="例如：睡眠不佳、想为长辈推荐产品等"
                rows={4}
                value={consultTopic}
                onChange={(e) => setConsultTopic(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(74,89,64,.18)",
                  fontSize: "15px",
                  marginBottom: "28px",
                  background: "#f7f3ea",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />

              <button
                disabled={consultSending}
                onClick={async () => {
                  if (!consultName.trim() || !consultContact.trim()) {
                    alert("请填写姓名和联络方式");
                    return;
                  }

                  setConsultSending(true);
                  try {
                    const cartItemsText = cartItems.length > 0
                      ? cartItems
                          .map((item) => `${item.name} x${item.quantity}${item.price ? `（¥${(item.price * item.quantity).toLocaleString()}）` : ""}`)
                          .join("\n")
                      : "无";

                    const supabase = createClient(
                      process.env.NEXT_PUBLIC_SUPABASE_URL!,
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    );

                    // supabase-js 失败时是回传 error 而不是丢例外，要自己检查，
                    // 否则存失败了画面还是会显示「已收到」。
                    const { error } = await supabase.from("consultations").insert({
                      name: consultName,
                      contact: consultContact,
                      topic: consultTopic,
                      cart_items: cartItemsText,
                      created_at: new Date().toISOString(),
                    });
                    if (error) throw error;

                    setConsultSubmitted(true);
                  } catch (error) {
                    console.error("提交失败:", error);
                    alert("提交失败，请稍后重试");
                  } finally {
                    setConsultSending(false);
                  }
                }}
                style={{
                  width: "100%",
                  background: consultSending ? "#5c6650" : "#2f3b26",
                  color: "#fbf8f0",
                  border: "none",
                  padding: "17px",
                  borderRadius: "100px",
                  fontSize: "15.5px",
                  letterSpacing: "1px",
                  cursor: consultSending ? "default" : "pointer",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  transition: "background 0.3s",
                  opacity: consultSending ? 0.85 : 1
                }}>
                {consultSending ? "送出中…" : "送出咨询预约"}
              </button>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ──── FOOTER ──── */}
      <footer style={{
        background: "#28331f",
        color: "#a8a48c",
        padding: "60px 6vw 40px",
        textAlign: "center"
      }}>
        <div className="font-serif" style={{
          fontSize: "24px",
          color: "#fbf8f0",
          letterSpacing: "2px",
          marginBottom: "14px"
        }}>
          Soulgreen
        </div>
        <p style={{
          fontSize: "13.5px",
          fontWeight: 300,
          maxWidth: "460px",
          margin: "0 auto 28px"
        }}>
          纯粹植物萃取 · 阿育吠陀身心智慧 · 陪你与家人建立每日的疗愈仪式
        </p>
        <div style={{
          fontSize: "12.5px",
          color: "#6f7a5c"
        }}>
          © 2026 Soulgreen 芳疗。以自然之名，温柔以待。
        </div>
      </footer>
    </div>
  );
}
