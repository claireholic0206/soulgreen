import Link from "next/link";
import { T } from "@/components/TextConverter";
import { getAllProductIds, getProductById } from "@/lib/products-data";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  try {
    const ids = await getAllProductIds();
    return ids.map((id) => ({ id }));
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

  // 静态匯出模式下，这个 fetch 只会在 next build 时執行一次，
  // 產生的是已经含資料的静态 HTML，瀏覽器不需要再打 API
  const product = await getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#A09890] mb-4">
            <T>找不到此產品</T>
          </p>
          <Link href="/products" className="text-xs text-[#4A5E4D] underline">
            <T>返回產品列表</T>
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
