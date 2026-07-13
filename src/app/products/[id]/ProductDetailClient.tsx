"use client";

import { useState } from "react";
import { T } from "@/components/TextConverter";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const DOSHA_COLOR: Record<string, string> = {
  V: "#7F77DD",
  P: "#D85A30",
  K: "#1D9E75",
};
const DOSHA_LABEL: Record<string, string> = {
  V: "Vata 风型",
  P: "Pitta 火型",
  K: "Kapha 土水型",
};
const DOSHA_BG: Record<string, string> = {
  V: "rgba(127,119,221,0.08)",
  P: "rgba(216,90,48,0.08)",
  K: "rgba(29,158,117,0.08)",
};

const ESSENTIAL_OIL_CATEGORY = "03";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const isEssentialOil = product.category_id === ESSENTIAL_OIL_CATEGORY;
  const dosha = product.dosha_type;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link
          href="/products"
          className="text-xs text-[#A09890] hover:text-[#4A5E4D] transition-colors flex items-center gap-1"
        >
          ← <T>返回產品列表</T>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* 左：圖片 */}
          <div>
            <div className="relative aspect-square bg-[#F3F1ED] rounded-2xl overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name_cn ?? ""}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{
                    background:
                      dosha && DOSHA_BG[dosha] ? DOSHA_BG[dosha] : "#F3F1ED",
                  }}
                >
                  <span className="text-5xl">🌿</span>
                </div>
              )}
              {product.Is_Sale && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D85A30] text-white text-[10px] px-3 py-1 rounded-full tracking-wider">
                    <T>優惠中</T>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 右：資訊 */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              {product.categories && (
                <span className="text-[10px] tracking-wider text-[#A09890] uppercase">
                  <T>{product.categories.name_cn}</T>
                </span>
              )}
              {dosha && DOSHA_LABEL[dosha] && (
                <>
                  <span className="text-[#D6D2C8] text-xs">·</span>
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded-full tracking-wider"
                    style={{
                      background: DOSHA_BG[dosha],
                      color: DOSHA_COLOR[dosha],
                    }}
                  >
                    {DOSHA_LABEL[dosha]}
                  </span>
                </>
              )}
            </div>

            <div>
              <h1 className="font-serif text-3xl text-[#4A5E4D] leading-tight mb-1">
                <T>{product.name_cn ?? ""}</T>
              </h1>
              {product.name_en && (
                <p className="text-sm text-[#A09890]">{product.name_en}</p>
              )}
              {isEssentialOil && product.latin_name && (
                <p className="text-xs text-[#A09890] italic mt-0.5">
                  {product.latin_name}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-4">
              {product.price != null && (
                <p className="text-2xl text-[#4A5E4D] font-medium">
                  ¥ {product.price.toLocaleString()}
                </p>
              )}
              {product.volume && (
                <p className="text-sm text-[#A09890]">{product.volume}</p>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-[#6E6B66] leading-relaxed">
                <T>{product.description}</T>
              </p>
            )}

            {isEssentialOil && (
              <div className="bg-[#F3F1ED] rounded-xl p-4 space-y-2">
                {product.origin && (
                  <div className="flex gap-3 text-xs">
                    <span className="text-[#A09890] w-16 flex-shrink-0">
                      <T>產地</T>
                    </span>
                    <span className="text-[#4A5E4D]">
                      <T>{product.origin}</T>
                    </span>
                  </div>
                )}
                {product.method && (
                  <div className="flex gap-3 text-xs">
                    <span className="text-[#A09890] w-16 flex-shrink-0">
                      <T>萃取方式</T>
                    </span>
                    <span className="text-[#4A5E4D]">
                      <T>{product.method}</T>
                    </span>
                  </div>
                )}
                {product.is_organic !== null && (
                  <div className="flex gap-3 text-xs">
                    <span className="text-[#A09890] w-16 flex-shrink-0">
                      <T>認證</T>
                    </span>
                    <span className="text-[#4A5E4D]">
                      {product.is_organic ? <T>有機認證</T> : <T>天然農法</T>}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name_cn ?? product.name_en ?? "",
                    price: product.price ?? null,
                    volume: product.volume,
                    image: product.image_url,
                  });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className="w-full py-4 bg-[#4A5E4D] text-white text-xs tracking-[0.2em] uppercase rounded-md hover:bg-[#2E2E2C] transition-all"
              >
                <T>{added ? "已加入購物車 ✓" : "加入購物車"}</T>
              </button>
            </div>
          </div>
        </div>

        {/* 下方詳细資訊 */}
        {(product.ingredients || product.usage) && (
          <div className="mt-12 border-t border-[#E2DDD5] pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.ingredients && (
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-[#4A5E4D]/60 mb-4">
                  <T>成分</T>
                </h2>
                <p className="text-sm text-[#6E6B66] leading-relaxed">
                  <T>{product.ingredients}</T>
                </p>
              </div>
            )}
            {product.usage && (
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-[#4A5E4D]/60 mb-4">
                  <T>使用方式</T>
                </h2>
                <p className="text-sm text-[#6E6B66] leading-relaxed">
                  <T>{product.usage}</T>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Dosha 說明 */}
        {dosha && DOSHA_LABEL[dosha] && (
          <div
            className="mt-8 rounded-2xl p-6"
            style={{ background: DOSHA_BG[dosha] }}
          >
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-2"
              style={{ color: DOSHA_COLOR[dosha] }}
            >
              <T>适合体质</T>
            </p>
            <p className="font-serif text-lg text-[#4A5E4D] mb-2">
              {DOSHA_LABEL[dosha]}
            </p>
            <p className="text-xs text-[#6E6B66] leading-relaxed">
              <T>想了解自己的体质？</T>
            </p>
            <Link
              href="/quiz"
              className="inline-block mt-3 text-xs tracking-wider underline"
              style={{ color: DOSHA_COLOR[dosha] }}
            >
              <T>进行体质測驗 →</T>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
