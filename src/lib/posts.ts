import postsData from "@/data/posts.json";

export interface Post {
  slug: string;
  title: string;
  date: string;
  type: string;
  summary: string;
  cover: string | null;
  html: string;
}

// 由 scripts/build-content.mjs 从 content/posts/*.md 产生，已按日期新到旧排序。
export const posts = postsData as Post[];

export const hasPosts = posts.length > 0;

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string): string {
  const [y, m, d] = date.split("-");
  return `${y}.${m}.${d}`;
}
