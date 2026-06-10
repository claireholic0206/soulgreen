"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { T } from "@/components/TextConverter";
import type { Category, Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const DOSHA_COLOR: Record<string, string> = {
  V: "#7F77DD",
  P: "#D85A30",
  K: "#1D9E75",
};
const DOSHA_LABEL: Record<string, string> = {
  V: "Vata",
  P: "Pitta",
  K: "Kapha",
};
const DOSHA_BG: Record<string, string> = {
  V: "#3C3489",
  P: "#993C1D",
  K: "#0F6E56",
};

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id");
      if (data) setCategories(data);
      if (error) console.error("categories error:", error);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from("products")
        .select("*, categories(id, name_cn, name_en, slug)")
        .order("id");

      if (activeCategory !== "all") {
        query = query.eq("category_id", activeCategory);
      }

      const { data, error } = await query;
      if (data) setProducts(data);
      if (error) console.error("products error:", error);
      setLoading(false);
    };
    fetchProducts();
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <div className="bg-[#F5F2EB] border-b border-stone-200 px-6 py-14 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2D4232]/50 mb-3">
          <T>Soulgreen Studio</T>
        </p>
        <h1 className="font-serif text-3xl text-[#2D4232] mb-3 leading-tight">
          <T>植萃芳療產品</T>
        </h1>
        <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
          <T>結合阿育吠陀智慧與瑞士芳療科學，為你的體質量身打造</T>
        </p>
      </div>

      {/* 分類 Tab */}
      <div className="sticky top-[57px] z-40 bg-[#FDFBF7] border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full text-[11px] tracking-wider transition-all border ${
                activeCategory === "all"
                  ? "bg-[#2D4232] border-[#2D4232] text-white font-medium"
                  : "border-stone-200 text-stone-400 hover:border-[#8A9A86] hover:text-[#2D4232]"
              }`}
            >
              <T>全部</T>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[11px] tracking-wider transition-all border whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-[#2D4232] border-[#2D4232] text-white font-medium"
                    : "border-stone-200 text-stone-400 hover:border-[#8A9A86] hover:text-[#2D4232]"
                }`}
              >
                <T>{cat.name_cn}</T>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 產品 Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="bg-stone-100 animate-pulse w-full aspect-square" />
                <div className="pt-3 space-y-2">
                  <div className="bg-stone-100 animate-pulse h-3 w-1/2 rounded" />
                  <div className="bg-stone-100 animate-pulse h-4 w-3/4 rounded" />
                  <div className="bg-stone-100 animate-pulse h-3 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-stone-400 text-sm">
            <T>此分類暫無產品</T>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const dosha = product.dosha_type;
  const hasImage = !!product.image_url;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-[#8A9A86] hover:shadow-sm transition-all duration-300">
        {/* 圖片區：固定正方形比例 */}
        <div className="relative w-full aspect-square overflow-hidden">
          {hasImage ? (
            <Image
              src={product.image_url!}
              alt={product.name_cn ?? ""}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            // 無圖：品牌色塊佔位
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{
                background:
                  dosha && DOSHA_BG[dosha] ? DOSHA_BG[dosha] : "#2D4232",
              }}
            >
              <span className="text-3xl">🌿</span>
              {dosha && DOSHA_LABEL[dosha] && (
                <span className="text-[10px] tracking-widest text-white/70 uppercase">
                  {DOSHA_LABEL[dosha]}
                </span>
              )}
            </div>
          )}

          {/* Badge 區 */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.Is_Sale && (
              <span className="bg-[#D85A30] text-white text-[9px] px-2 py-0.5 rounded-full tracking-wider">
                <T>優惠</T>
              </span>
            )}
            {dosha && DOSHA_LABEL[dosha] && hasImage && (
              <span
                className="text-[9px] px-2 py-0.5 rounded-full tracking-wider text-white"
                style={{ background: DOSHA_COLOR[dosha] }}
              >
                {DOSHA_LABEL[dosha]}
              </span>
            )}
          </div>
        </div>

        {/* 文字區 */}
        <div className="p-3 md:p-4">
          {product.categories && (
            <p className="text-[9px] tracking-wider text-stone-400 uppercase mb-1">
              <T>{product.categories.name_cn}</T>
            </p>
          )}
          <p className="text-sm font-medium text-[#2D4232] leading-snug mb-0.5 group-hover:text-[#3D5A45] transition-colors line-clamp-2">
            <T>{product.name_cn ?? ""}</T>
          </p>
          {product.volume && (
            <p className="text-[10px] text-stone-400 mb-1.5">
              {product.volume}
            </p>
          )}
          {product.price != null && (
            <p className="text-sm text-[#2D4232] font-medium">
              ¥ {product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
