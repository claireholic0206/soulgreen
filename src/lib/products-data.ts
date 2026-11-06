import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Product, Category } from "@/types/product";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// 静态汇出模式下这些只会在 next build 时跑一次；
// revalidate 只在 next dev（或未来改用 ISR）时有意义，
// 让开发时重复浏览同一页不用每次都重打 Supabase。
const REVALIDATE_SECONDS = 60;

export const getProductById = unstable_cache(
  async (id: string): Promise<Product | null> => {
    const { data } = await getSupabase()
      .from("products")
      .select("*, categories(id, name_cn, name_en, slug)")
      .eq("id", id)
      .single();
    return data ?? null;
  },
  ["product-by-id"],
  { revalidate: REVALIDATE_SECONDS },
);

export const getAllProductIds = unstable_cache(
  async (): Promise<string[]> => {
    const { data } = await getSupabase().from("products").select("id");
    return (data ?? []).map((p) => p.id);
  },
  ["all-product-ids"],
  { revalidate: REVALIDATE_SECONDS },
);

export const getCategoriesAndSaleProducts = unstable_cache(
  async (): Promise<{ categories: Category[]; products: Product[] }> => {
    const [{ data: categories }, { data: products }] = await Promise.all([
      getSupabase().from("categories").select("*").order("id"),
      getSupabase()
        .from("products")
        .select("*, categories(id, name_cn, name_en, slug)")
        .order("id"),
    ]);
    return {
      categories: categories ?? [],
      products: products ?? [],
    };
  },
  ["categories-and-sale-products"],
  { revalidate: REVALIDATE_SECONDS },
);
