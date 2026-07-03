import { createClient } from "@supabase/supabase-js";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // 靜態匯出模式下，這兩個 fetch 只會在 next build 時執行一次，
  // 產生的是已經含資料的靜態 HTML，瀏覽器不需要再打 API 拿分類/產品
  const [{ data: categories, error: categoriesError }, { data: products, error: productsError }] =
    await Promise.all([
      supabase.from("categories").select("*").order("id"),
      supabase
        .from("products")
        .select("*, categories(id, name_cn, name_en, slug)")
        .order("id"),
    ]);

  if (categoriesError) console.error("categories error:", categoriesError);
  if (productsError) console.error("products error:", productsError);

  const saleProducts: Product[] = (products ?? []).filter(
    (p) => p.Is_Sale === true,
  );

  return (
    <ProductsClient categories={categories ?? []} saleProducts={saleProducts} />
  );
}
