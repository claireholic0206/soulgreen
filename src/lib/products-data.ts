import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { toTwd } from "./currency";
import type { Product, Category } from "@/types/product";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// 靜態匯出模式下這些只會在 next build 時跑一次；
// revalidate 只在 next dev（或未來改用 ISR）時有意義，
// 讓開發時重複瀏覽同一頁不用每次都重打 Supabase。
const REVALIDATE_SECONDS = 60;

export const getProductById = unstable_cache(
  async (id: string): Promise<Product | null> => {
    const { data } = await getSupabase()
      .from("products")
      .select("*, categories(id, name_cn, name_en, slug)")
      .eq("id", id)
      .single();
    return data ? toTwd(data) : null;
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
      products: (products ?? []).map(toTwd),
    };
  },
  ["categories-and-sale-products"],
  { revalidate: REVALIDATE_SECONDS },
);
