import { createClient } from "@supabase/supabase-js";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // 静态匯出模式下，这兩个 fetch 只会在 next build 时執行一次，
  // 產生的是已经含資料的静态 HTML，瀏覽器不需要再打 API 拿分類/產品
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
