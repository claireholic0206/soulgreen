"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { T } from "@/components/TextConverter"; // 假設您的轉換組件已具備繁轉簡邏輯

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "全部產品" },
    { id: "blend-oil", label: "複方精華油" },
    { id: "single-oil", label: "單方精油" },
    { id: "carrier-oil", label: "植物基底油" },
    { id: "cold-process-soap", label: "能量洗沐" },
    { id: "seasonal", label: "時令限定" },
  ];

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-3xl font-serif text-[#2D4232]">
            <T>植物功能與能量資料庫</T>
          </h1>
        </header>

        {/* 分類導航：強制折行，移除滾動條 */}
        <nav className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setExpandedId(null);
              }}
              className={`px-6 py-2 rounded-full text-xs transition border ${
                activeTab === cat.id
                  ? "bg-[#2D4232] text-white border-[#2D4232]"
                  : "bg-white border-stone-200 text-stone-600 hover:border-[#2D4232]"
              }`}
            >
              <T>{cat.label}</T>
            </button>
          ))}
        </nav>

        {/* 產品網格 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <article
              key={p.id}
              className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex flex-col transition-all duration-300"
            >
              {/* 圖片渲染：僅在有 image 路徑時顯示 */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <span className="text-[10px] text-stone-400 font-mono">
                {p.id}
              </span>
              <h3 className="font-bold font-serif text-[#2D4232] my-1">
                <T>{p.name}</T>
              </h3>
              <p className="text-[10px] text-stone-400">{p.nameEn}</p>

              {p.latinName && (
                <p className="text-[10px] text-[#8A9A86] italic mb-4 font-mono">
                  {p.latinName}
                </p>
              )}

              <div className="flex-grow">
                <p className="text-[12px] text-stone-600 leading-relaxed mb-4">
                  <T>{p.Description}</T>
                </p>

                {/* 展開詳情區域：欄位有資料才顯示 */}
                {expandedId === p.id && (
                  <div className="pt-4 border-t border-stone-100 space-y-3 animate-in fade-in duration-300">
                    {p.Ingredients && (
                      <InfoRow label="成分" value={p.Ingredients} />
                    )}
                    {p.Usage && <InfoRow label="用途" value={p.Usage} />}
                    {p.Method && <InfoRow label="方法" value={p.Method} />}
                  </div>
                )}
              </div>

              <button
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                className="mt-6 w-full text-center py-2 border border-[#2D4232] text-[10px] uppercase tracking-widest cursor-pointer hover:bg-[#2D4232] hover:text-white transition"
              >
                <T>{expandedId === p.id ? "收起詳情" : "查看完整參數"}</T>
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

// 輔助組件：確保欄位格式統一，且自動進行繁簡轉換
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#2D4232] uppercase">
        <T>{label}</T>
      </p>
      <p className="text-[11px] text-stone-500">
        <T>{value}</T>
      </p>
    </div>
  );
}
