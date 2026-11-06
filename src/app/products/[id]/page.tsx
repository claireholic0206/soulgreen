import Link from "next/link";
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

  // 静态汇出模式下，这个 fetch 只会在 next build 时执行一次，
  // 产生的是已经含资料的静态 HTML，浏览器不需要再打 API
  const product = await getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#A09890] mb-4">
            找不到此产品
          </p>
          <Link href="/products" className="text-xs text-[#4A5E4D] underline">
            返回产品列表
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
