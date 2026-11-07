import Link from "next/link";
import type { Metadata } from "next";
import { posts, formatPostDate } from "@/lib/posts";
import NewsTopBar from "@/components/NewsTopBar";

export const metadata: Metadata = {
  title: "最新动态 | Soulgreen",
  description: "Soulgreen 的新品介绍与文章。",
};

const shell: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f7f3ea",
  color: "#28331f",
  fontFamily: "'Noto Sans SC Variable', 'Noto Sans SC', sans-serif",
};

export default function NewsPage() {
  return (
    <div style={shell}>
      <NewsTopBar />
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "72px 6vw 120px" }}>
        <div style={{ fontSize: "13px", letterSpacing: "4px", color: "#b8734f", marginBottom: "14px", fontWeight: 600 }}>
          JOURNAL
        </div>
        <h1 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, margin: "0 0 48px" }}>
          最新动态
        </h1>

        {posts.length === 0 ? (
          // 还没有任何文章时的空状态（正式设计稿出来后再调整样式）
          <div style={{ background: "#fffdf8", borderRadius: "24px", padding: "64px 32px", textAlign: "center" }}>
            <p className="font-serif" style={{ fontSize: "20px", margin: "0 0 12px" }}>新品与文章，即将与你见面</p>
            <p style={{ fontSize: "14.5px", color: "#8a7a5c", fontWeight: 300, margin: "0 0 32px" }}>
              我们正在准备第一批内容，先来看看现有的产品，或预约一次一对一咨询吧。
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#products" style={{ background: "#2f3b26", color: "#fbf8f0", padding: "13px 30px", borderRadius: "100px", fontSize: "14.5px" }}>
                浏览产品
              </Link>
              <Link href="/#consult" style={{ border: "1px solid rgba(74,89,64,.3)", color: "#4a5940", padding: "13px 30px", borderRadius: "100px", fontSize: "14.5px" }}>
                预约咨询
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/news/${p.slug}/`} style={{ display: "block", background: "#fffdf8", borderRadius: "20px", overflow: "hidden", color: "inherit" }}>
                {p.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
                )}
                <div style={{ padding: "22px 24px 26px" }}>
                  <div style={{ fontSize: "12px", color: "#b8734f", letterSpacing: "1px", marginBottom: "8px" }}>
                    {p.type} · {formatPostDate(p.date)}
                  </div>
                  <h2 className="font-serif" style={{ fontSize: "19px", fontWeight: 600, margin: "0 0 8px" }}>{p.title}</h2>
                  {p.summary && <p style={{ fontSize: "14px", color: "#5c6650", fontWeight: 300, margin: 0 }}>{p.summary}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
