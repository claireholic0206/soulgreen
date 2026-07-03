import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { T } from "@/components/TextConverter";
import ProductDetailClient from "./ProductDetailClient";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function generateStaticParams() {
  try {
    const { data } = await getSupabase().from("products").select("id");
    return (data ?? []).map((p) => ({ id: p.id }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 靜態匯出模式下，這個 fetch 只會在 next build 時執行一次，
  // 產生的是已經含資料的靜態 HTML，瀏覽器不需要再打 API
  const { data: product } = await getSupabase()
    .from("products")
    .select("*, categories(id, name_cn, name_en, slug)")
    .eq("id", id)
    .single();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-400 mb-4">
            <T>找不到此產品</T>
          </p>
          <Link href="/products" className="text-xs text-[#2D4232] underline">
            <T>返回產品列表</T>
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
