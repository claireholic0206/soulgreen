// 把 content/posts/*.md 转成 src/data/posts.json（建置前自动执行）。
// 新增文章只要在 content/posts/ 放一个 .md 档，详见 content/README.md。
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "content", "posts");
const outFile = join(root, "src", "data", "posts.json");

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: 开头缺少 --- 包起来的文章信息（title、date 等）`);
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1 || line.trim().startsWith("#")) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2] };
}

const posts = [];
mkdirSync(postsDir, { recursive: true });
for (const file of readdirSync(postsDir)) {
  if (!file.endsWith(".md") || file.startsWith("_")) continue;
  const { meta, body } = parseFrontmatter(readFileSync(join(postsDir, file), "utf8"), file);
  if (!meta.title) throw new Error(`${file}: 缺少 title`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date ?? "")) throw new Error(`${file}: date 要写成 2026-11-10 这种格式`);
  if (meta.draft === "true") continue;
  posts.push({
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    date: meta.date,
    type: meta.type || "文章",
    summary: meta.summary || "",
    cover: meta.cover || null,
    html: marked.parse(body, { async: false }),
  });
}
posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n");
console.log(`[content] ${posts.length} 篇文章 → src/data/posts.json`);
