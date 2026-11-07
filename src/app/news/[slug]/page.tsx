import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPostBySlug, formatPostDate } from "@/lib/posts";
import NewsTopBar from "@/components/NewsTopBar";

export const dynamicParams = false;

// 静态导出时，动态路由至少要有一个参数，否则建置会失败。
// 还没有文章时放一个占位参数，页面会直接回 404（见下方 notFound）。
export function generateStaticParams() {
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  return post ? { title: `${post.title} | Soulgreen`, description: post.summary } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ea", color: "#28331f", fontFamily: "'Noto Sans SC Variable', 'Noto Sans SC', sans-serif" }}>
      <style>{`
        .post-body { font-size: 16px; line-height: 1.95; font-weight: 300; color: #3d4733; }
        .post-body p { margin: 0 0 1.4em; }
        .post-body h2 { font-family: 'Noto Serif SC Variable', 'Noto Serif SC', serif; font-size: 22px; font-weight: 600; margin: 2em 0 .7em; color: #28331f; }
        .post-body h3 { font-size: 18px; font-weight: 600; margin: 1.6em 0 .6em; color: #28331f; }
        .post-body img { max-width: 100%; height: auto; border-radius: 16px; margin: 1em 0; }
        .post-body a { color: #b8734f; text-decoration: underline; }
        .post-body ul, .post-body ol { padding-left: 1.4em; margin: 0 0 1.4em; }
        .post-body ul { list-style: disc; }
        .post-body ol { list-style: decimal; }
      `}</style>
      <NewsTopBar />
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 6vw 120px" }}>
        <Link href="/news/" style={{ fontSize: "14px", color: "#8a7a5c" }}>← 最新动态</Link>
        <div style={{ fontSize: "13px", color: "#b8734f", letterSpacing: "1px", margin: "36px 0 12px" }}>
          {post.type} · {formatPostDate(post.date)}
        </div>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 600, margin: "0 0 32px", lineHeight: 1.4 }}>
          {post.title}
        </h1>
        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt="" style={{ width: "100%", borderRadius: "20px", marginBottom: "36px" }} />
        )}
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </div>
  );
}
