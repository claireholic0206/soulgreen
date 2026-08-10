import ProductsClient from "./ProductsClient";
import { getCategoriesAndSaleProducts } from "@/lib/products-data";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  // 静态匯出模式下，这兩个 fetch 只会在 next build 时執行一次，
  // 產生的是已经含資料的静态 HTML，瀏覽器不需要再打 API 拿分類/產品
  const { categories, products } = await getCategoriesAndSaleProducts();

  const saleProducts: Product[] = products.filter((p) => p.Is_Sale === true);

  return (
    <ProductsClient categories={categories} saleProducts={saleProducts} />
  );
}
