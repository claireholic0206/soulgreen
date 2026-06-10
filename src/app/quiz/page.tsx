"use client";

import { useState } from "react";
import {
  quizQuestions,
  DOSHA_DETAIL,
  SECTION_META,
  type DoshaKey,
  type OptionDosha,
} from "@/data/quizData";
import { T } from "@/components/TextConverter";

// ── 工具函式 ─────────────────────────────────────────────────────
function getSection(qIndex: number): 1 | 2 | 3 | 4 {
  const n = qIndex + 1;
  if (n <= 5) return 1;
  if (n <= 10) return 2;
  if (n <= 16) return 3;
  return 4;
}

// ── 主頁面 ────────────────────────────────────────────────────────
export default function QuizPage() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [currentStep, setCurrentStep] = useState(0);

  // 單選答案：qId -> OptionDosha
  const [answers, setAnswers] = useState<Record<number, OptionDosha>>({});
  // 多選答案：qId -> index[]
  const [multiAnswers, setMultiAnswers] = useState<Record<number, number[]>>(
    {},
  );

  // 結果
  const [primary, setPrimary] = useState<DoshaKey | null>(null);
  const [secondary, setSecondary] = useState<DoshaKey | null>(null);
  const [imbalance, setImbalance] = useState<DoshaKey | null>(null);
  const [doshaPercent, setDoshaPercent] = useState<Record<DoshaKey, number>>({
    V: 0,
    P: 0,
    K: 0,
  });

  const total = quizQuestions.length;
  const progress = ((currentStep + 1) / total) * 100;
  const currentQ = quizQuestions[currentStep];
  const isLast = currentStep === total - 1;
  const currentSection = getSection(currentStep);
  const sectionMeta = SECTION_META[currentSection];

  // 目前題目是否已作答
  const isAnswered = currentQ.multi
    ? (multiAnswers[currentQ.id]?.length ?? 0) > 0
    : answers[currentQ.id] !== undefined;

  // ── 計算結果 ──
  const calcResult = (
    finalAnswers: Record<number, OptionDosha>,
    finalMulti: Record<number, number[]>,
  ) => {
    const totals: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };
    const vikritis: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };

    quizQuestions.forEach((q) => {
      const isVikriti = q.section >= 2;
      if (q.multi) {
        const sel = finalMulti[q.id] ?? [];
        sel.forEach((idx) => {
          const d = q.options[idx].dosha;
          if (d === "N") return;
          totals[d] += 1;
          if (isVikriti) vikritis[d] += 1;
        });
      } else {
        const d = finalAnswers[q.id];
        if (!d || d === "N") return;
        totals[d] += 2;
        if (isVikriti) vikritis[d] += 2;
      }
    });

    const sum = totals.V + totals.P + totals.K || 1;
    const pct: Record<DoshaKey, number> = {
      V: Math.round((totals.V / sum) * 100),
      P: Math.round((totals.P / sum) * 100),
      K: 0,
    };
    pct.K = 100 - pct.V - pct.P;

    const sorted = (["V", "P", "K"] as DoshaKey[]).sort(
      (a, b) => totals[b] - totals[a],
    );
    const vikSorted = (["V", "P", "K"] as DoshaKey[]).sort(
      (a, b) => vikritis[b] - vikritis[a],
    );

    setPrimary(sorted[0]);
    setSecondary(sorted[1]);
    setImbalance(vikSorted[0]);
    setDoshaPercent(pct);
    setStage("result");
  };

  // ── 事件 ──
  const handleSelect = (dosha: OptionDosha) => {
    const next = { ...answers, [currentQ.id]: dosha };
    setAnswers(next);
    if (!isLast) {
      setTimeout(() => setCurrentStep((s) => Math.min(s + 1, total - 1)), 280);
    }
  };

  const handleMultiToggle = (optIndex: number) => {
    const cur = multiAnswers[currentQ.id] ?? [];
    const pos = cur.indexOf(optIndex);
    const next =
      pos > -1 ? cur.filter((i) => i !== optIndex) : [...cur, optIndex];
    setMultiAnswers({ ...multiAnswers, [currentQ.id]: next });
  };

  const handleNext = () => {
    if (isLast) {
      calcResult(answers, multiAnswers);
    } else {
      setCurrentStep((s) => Math.min(s + 1, total - 1));
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleReset = () => {
    setStage("intro");
    setCurrentStep(0);
    setAnswers({});
    setMultiAnswers({} as Record<number, number[]>);
    setPrimary(null);
    setSecondary(null);
    setImbalance(null);
    setDoshaPercent({ V: 0, P: 0, K: 0 });
  };

  // ── 介紹頁 ────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <main className="min-h-screen bg-[#FDFBF7] py-24 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#2D4232]/50 mb-5">
            <T>身心諮詢室 · Soulgreen Studio</T>
          </p>
          <h1 className="text-4xl font-serif text-[#2D4232] mb-5 leading-tight">
            <em className="italic text-[#B8975A]">
              <T>探索</T>
            </em>{" "}
            <T>你的督夏能量</T>
          </h1>
          <p className="text-stone-600 mb-8 leading-relaxed text-sm">
            <T>
              阿育吠陀認為，每個人皆由風（Vata）、火（Pitta）、土水（Kapha）三種生命能量組成。這份問卷結合瑞士芳療科學，幫助你深入了解當下的體質狀態與失衡傾向，找到最適合你的植萃配方。
            </T>
          </p>

          {/* 三督夏 pill */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {[
              { label: "Vata 風", color: "#7F77DD" },
              { label: "Pitta 火", color: "#D85A30" },
              { label: "Kapha 土水", color: "#1D9E75" },
            ].map((d) => (
              <span
                key={d.label}
                className="text-[11px] tracking-widest px-5 py-1.5 rounded-full border font-medium"
                style={{ borderColor: d.color, color: d.color }}
              >
                {d.label}
              </span>
            ))}
          </div>

          <p className="text-xs text-stone-400 mb-8 bg-[#F5F2EB] rounded-lg px-5 py-3 border border-stone-200">
            <T>約需 5–8 分鐘 · 共 23 題 · 結果含專屬配方推薦</T>
          </p>

          <button
            onClick={() => setStage("quiz")}
            className="w-full py-4 bg-[#2D4232] text-white text-xs tracking-[0.25em] uppercase rounded-md hover:bg-[#3D5A45] transition-all"
          >
            <T>開始進行諮詢</T>
          </button>
        </div>
      </main>
    );
  }

  // ── 結果頁 ────────────────────────────────────────────────────
  if (stage === "result" && primary && secondary && imbalance) {
    return (
      <ResultPage
        primary={primary}
        secondary={secondary}
        imbalance={imbalance}
        doshaPercent={doshaPercent}
        onReset={handleReset}
      />
    );
  }

  // ── 測驗頁 ────────────────────────────────────────────────────
  const DOSHA_COLORS: Record<DoshaKey, string> = {
    V: "#7F77DD",
    P: "#D85A30",
    K: "#1D9E75",
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* Section header */}
      <div className="bg-[#F5F2EB] border-b border-stone-200 px-6 py-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D4232]/50">
          <T>{sectionMeta.tag}</T>
        </p>
        <p className="font-serif text-lg text-[#2D4232] mt-0.5">
          <T>{sectionMeta.title}</T>
        </p>
      </div>

      {/* Progress */}
      <div className="px-6 pt-5 pb-2 max-w-xl mx-auto">
        <div className="flex justify-between text-[11px] text-stone-400 mb-2">
          <span>
            <T>問卷進度</T>
          </span>
          <span>
            {currentStep + 1} / {total}
          </span>
        </div>
        <div className="w-full bg-stone-200 h-[2px] rounded-full overflow-hidden">
          <div
            className="bg-[#2D4232] h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-xl mx-auto px-6 py-6">
        <p className="text-[10px] tracking-[0.2em] text-[#2D4232]/40 mb-3">
          {String(currentStep + 1).padStart(2, "0")}
        </p>
        <h2 className="text-2xl font-serif text-[#2D4232] mb-3 leading-snug">
          <T>{currentQ.title}</T>
        </h2>
        {currentQ.note && (
          <p className="text-xs text-stone-400 italic mb-5">
            <T>{currentQ.note}</T>
          </p>
        )}

        <div className="space-y-3 mt-6">
          {currentQ.options.map((opt, i) => {
            const isSel = currentQ.multi
              ? (multiAnswers[currentQ.id] ?? []).includes(i)
              : answers[currentQ.id] === opt.dosha;

            return (
              <button
                key={i}
                onClick={() =>
                  currentQ.multi
                    ? handleMultiToggle(i)
                    : handleSelect(opt.dosha)
                }
                className={`w-full text-left px-5 py-4 border rounded-xl flex items-start gap-4 transition-all duration-200 active:scale-[0.99] ${
                  isSel
                    ? "border-[#2D4232] bg-[#2D4232]/5"
                    : "border-stone-200 bg-white hover:border-[#8A9A86]"
                }`}
              >
                {/* Dot */}
                <span
                  className={`mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center border transition-all ${
                    currentQ.multi ? "rounded-sm" : "rounded-full"
                  } ${
                    isSel ? "border-[#2D4232] bg-[#2D4232]" : "border-stone-300"
                  }`}
                >
                  {isSel && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                  )}
                </span>

                <span>
                  <span className="text-sm text-[#2D4232] leading-relaxed">
                    <T>{opt.label}</T>
                  </span>
                  {opt.sub && (
                    <span className="block text-xs text-stone-400 mt-0.5">
                      <T>{opt.sub}</T>
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav */}
      <div className="sticky bottom-0 bg-[#FDFBF7] border-t border-stone-200 px-6 py-4 flex justify-between items-center max-w-xl mx-auto">
        <button
          onClick={handlePrev}
          className={`text-xs border border-stone-200 text-stone-400 px-5 py-2.5 rounded-md hover:border-[#2D4232] hover:text-[#2D4232] transition-all ${
            currentStep === 0 ? "invisible" : ""
          }`}
        >
          <T>← 上一題</T>
        </button>

        {(currentQ.multi || isLast) && (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="text-xs bg-[#2D4232] text-white px-7 py-2.5 rounded-md tracking-widest uppercase disabled:opacity-30 hover:bg-[#3D5A45] transition-all"
          >
            <T>{isLast ? "查看我的體質 →" : "繼續 →"}</T>
          </button>
        )}
      </div>
    </main>
  );
}

// ── 結果頁元件 ────────────────────────────────────────────────────
function ResultPage({
  primary,
  secondary,
  imbalance,
  doshaPercent,
  onReset,
}: {
  primary: DoshaKey;
  secondary: DoshaKey;
  imbalance: DoshaKey;
  doshaPercent: Record<DoshaKey, number>;
  onReset: () => void;
}) {
  const pd = DOSHA_DETAIL[primary];
  const sd = DOSHA_DETAIL[secondary];
  const id = DOSHA_DETAIL[imbalance];

  const DOSHA_COLOR: Record<DoshaKey, string> = {
    V: "#7F77DD",
    P: "#D85A30",
    K: "#1D9E75",
  };
  const DOSHA_BG: Record<DoshaKey, string> = {
    V: "rgba(127,119,221,0.08)",
    P: "rgba(216,90,48,0.08)",
    K: "rgba(29,158,117,0.08)",
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Hero */}
      <div className="text-center px-6 pt-14 pb-8">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-sm font-semibold tracking-wider"
          style={{ background: DOSHA_BG[primary], color: DOSHA_COLOR[primary] }}
        >
          {primary}
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2D4232]/50 mb-3">
          <T>你的督夏體質</T>
        </p>
        <h1 className="text-3xl font-serif text-[#2D4232] mb-2">
          <T>{pd.name}</T>
        </h1>
        <p className="text-sm text-stone-400">
          <T>次體質：</T>
          <T>{sd.name}</T>
        </p>
      </div>

      {/* 督夏比例條 */}
      <div className="max-w-lg mx-auto px-6 mb-8">
        {(["V", "P", "K"] as DoshaKey[]).map((d) => (
          <div key={d} className="flex items-center gap-3 mb-3">
            <span className="text-xs w-14 text-stone-400 tracking-wider">
              {d === "V" ? "Vata" : d === "P" ? "Pitta" : "Kapha"}
            </span>
            <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${doshaPercent[d]}%`,
                  background: DOSHA_COLOR[d],
                }}
              />
            </div>
            <span className="text-xs text-stone-400 w-9 text-right">
              {doshaPercent[d]}%
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-lg mx-auto px-6 space-y-4">
        {/* 體質解讀 */}
        <div className="bg-[#F5F2EB] border border-stone-200 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#2D4232]/50 mb-3">
            <T>體質解讀</T> · <T>{pd.name}</T>
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            <T>{pd.essence}</T>
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            <T>{pd.advice}</T>
          </p>
          <div className="border-t border-stone-300 pt-4 text-xs text-[#2D4232]">
            <span className="text-stone-400">
              <T>推薦精油：</T>
            </span>
            <span className="font-medium">
              <T>{pd.oils}</T>
            </span>
          </div>
        </div>

        {/* 當下失衡信號 */}
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#2D4232]/50 mb-3">
            <T>當下失衡信號</T> · <T>{id.name}</T>
          </p>
          <div className="flex flex-wrap gap-2">
            {id.imbalanceSigns.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                  borderColor: DOSHA_COLOR[imbalance],
                  color: DOSHA_COLOR[imbalance],
                }}
              >
                <T>{s}</T>
              </span>
            ))}
          </div>
        </div>

        {/* 產品推薦 */}
        <div>
          <h2 className="font-serif text-xl text-[#2D4232] mt-6 mb-1">
            <T>專屬芳療配方推薦</T>
          </h2>
          <p className="text-xs text-stone-400 mb-4">
            <T>根據你的體質與當下狀態，以下配方最能支持你的身心平衡</T>
          </p>
          <div className="space-y-3">
            {pd.products.map((p) => (
              <a
                key={p.name}
                href="/products"
                className="flex items-start gap-4 bg-white border border-stone-200 rounded-xl p-4 hover:border-[#8A9A86] transition-all group"
              >
                <span className="text-2xl mt-0.5">{p.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2D4232] mb-1 group-hover:text-[#3D5A45]">
                    <T>{p.name}</T>
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed mb-2">
                    <T>{p.desc}</T>
                  </p>
                  <p className="text-[10px] tracking-wider text-[#8A9A86] uppercase">
                    <T>{p.tag}</T>
                  </p>
                </div>
                <span className="text-stone-300 group-hover:text-[#2D4232] transition-colors text-lg">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA 預約諮詢 */}
        <div className="bg-[#2D4232] rounded-2xl p-8 text-center mt-6">
          <h2 className="font-serif text-2xl text-[#FDFBF7] mb-3">
            <T>深度諮詢</T>
          </h2>
          <p className="text-xs text-[#FDFBF7]/70 leading-relaxed mb-6">
            <T>
              每一個體質都是獨一無二的組合。讓我們的認證芳療師為你設計完整的個人化療癒計劃，從精油選擇到日常調理，全方位守護你的身心。
            </T>
          </p>
          <a
            href="/services"
            className="block w-full py-3.5 bg-[#FDFBF7] text-[#2D4232] text-xs tracking-[0.2em] uppercase rounded-md font-medium hover:opacity-90 transition-all mb-3"
          >
            <T>預約一對一諮詢</T>
          </a>
          <a
            href="/products"
            className="block w-full py-3.5 border border-[#FDFBF7]/30 text-[#FDFBF7] text-xs tracking-[0.2em] uppercase rounded-md hover:bg-[#FDFBF7]/10 transition-all"
          >
            <T>瀏覽更多產品</T>
          </a>
        </div>

        {/* 重新測驗 */}
        <div className="text-center pt-2 pb-4">
          <button
            onClick={onReset}
            className="text-xs text-stone-400 underline hover:text-[#2D4232] transition-colors"
          >
            <T>重新測驗</T>
          </button>
        </div>
      </div>
    </div>
  );
}
