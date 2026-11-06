import ProductsClient from "./ProductsClient";
import { getCategoriesAndSaleProducts } from "@/lib/products-data";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  // 静态汇出模式下，这两个 fetch 只会在 next build 时执行一次，
  // 产生的是已经含资料的静态 HTML，浏览器不需要再打 API 拿分类/产品
  const { categories, products } = await getCategoriesAndSaleProducts();

  const saleProducts: Product[] = products.filter((p) => p.Is_Sale === true);

  return (
    <ProductsClient categories={categories} saleProducts={saleProducts} />
  );
}
