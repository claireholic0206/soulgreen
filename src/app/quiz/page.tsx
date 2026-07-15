"use client";

import { useState, useEffect } from "react";
import {
  quizQuestions,
  DOSHA_DETAIL,
  SECTION_META,
  type DoshaKey,
  type OptionDosha,
} from "@/data/quizData";
import { T } from "@/components/TextConverter";

// ── 工具函式 ─────────────────────────────────────────────────────
function getSection(qIndex: number): 1 | 2 {
  const n = qIndex + 1;
  if (n <= 10) return 1;
  return 2;
}

// ── 主頁面 ────────────────────────────────────────────────────────
export default function QuizPage() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [currentStep, setCurrentStep] = useState(0);

  // 單选答案：qId -> OptionDosha
  const [answers, setAnswers] = useState<Record<number, OptionDosha>>({});
  // 多选答案：qId -> index[]
  const [multiAnswers, setMultiAnswers] = useState<Record<number, number[]>>(
    {},
  );
  // 排序答案：qId -> { V/P/K: 排名(1/2/3) }
  const [rankAnswers, setRankAnswers] = useState<
    Record<number, Record<string, number>>
  >({});

  // 结果
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

  // Auto-initialize rankings when entering a rank-type question
  useEffect(() => {
    if (currentQ.type === "rank" && rankAnswers[currentQ.id] === undefined) {
      const defaultRanks: Record<string, number> = {};
      currentQ.options.forEach((opt, idx) => {
        defaultRanks[opt.dosha] = idx + 1;
      });
      setRankAnswers((prev) => ({ ...prev, [currentQ.id]: defaultRanks }));
    }
  }, [currentQ.id]);

  // 目前题目是否已作答
  const isAnswered = currentQ.type === "rank"
    ? rankAnswers[currentQ.id] !== undefined
    : currentQ.multi
      ? (multiAnswers[currentQ.id]?.length ?? 0) > 0
      : answers[currentQ.id] !== undefined;

  // ── 计算结果 ──
  const calcResult = (
    finalAnswers: Record<number, OptionDosha>,
    finalMulti: Record<number, number[]>,
    finalRankAnswers: Record<number, Record<string, number>>,
  ) => {
    const totals: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };
    const vikritis: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };

    quizQuestions.forEach((q) => {
      const isVikriti = q.section >= 2;
      if (q.type === "rank") {
        // 排序题计分：排名 1 -> 3分、排名 2 -> 2分、排名 3 -> 1分
        const rankData = finalRankAnswers[q.id];
        if (rankData) {
          q.options.forEach((opt) => {
            const dosha = opt.dosha as DoshaKey;
            const rank = rankData[dosha];
            if (rank === 1) {
              totals[dosha] += 3;
            } else if (rank === 2) {
              totals[dosha] += 2;
            } else if (rank === 3) {
              totals[dosha] += 1;
            }
          });
        }
      } else if (q.multi) {
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
      calcResult(answers, multiAnswers, rankAnswers);
    } else {
      setCurrentStep((s) => Math.min(s + 1, total - 1));
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleRankSelect = (dosha: DoshaKey, rank: number) => {
    const current = rankAnswers[currentQ.id] ?? {};
    const newRanks = { ...current };

    // If this rank is already assigned to another dosha, swap them
    const currentDoshaRank = newRanks[dosha];
    if (currentDoshaRank === rank) {
      // Deselect if clicking same rank again
      delete newRanks[dosha];
    } else {
      // Find which dosha currently has this rank and swap
      const doshaWithThisRank = Object.entries(newRanks).find(
        ([_, r]) => r === rank,
      )?.[0] as DoshaKey | undefined;

      if (doshaWithThisRank && currentDoshaRank) {
        // Swap: move the other dosha to the current one's rank
        newRanks[doshaWithThisRank] = currentDoshaRank;
      } else if (doshaWithThisRank) {
        // Remove the rank from the other dosha
        delete newRanks[doshaWithThisRank];
      }

      newRanks[dosha] = rank;
    }

    setRankAnswers({ ...rankAnswers, [currentQ.id]: newRanks });
  };

  const handleReset = () => {
    setStage("intro");
    setCurrentStep(0);
    setAnswers({});
    setMultiAnswers({} as Record<number, number[]>);
    setRankAnswers({});
    setPrimary(null);
    setSecondary(null);
    setImbalance(null);
    setDoshaPercent({ V: 0, P: 0, K: 0 });
  };

  // ── 介紹頁 ────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <main className="min-h-screen bg-[#FAFAF8] py-24 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#4A5E4D]/50 mb-5">
            <T>身心諮询室 · Soulgreen Studio</T>
          </p>
          <h1 className="text-4xl font-serif text-[#4A5E4D] mb-5 leading-tight">
            <em className="italic text-[#B8975A]">
              <T>探索</T>
            </em>{" "}
            <T>你的督夏能量</T>
          </h1>
          <p className="text-[#6E6B66] mb-8 leading-relaxed text-sm">
            <T>
              阿育吠陀認為，每個人屬於自己的能量配置（Prakriti），但壓力、飲食、季節、年齡會讓當下的狀態（Vikriti）偏移。這份問卷幫助你深入了解當下的體質狀態與失衡傾向，運用植物的力量，幫助你找回平衡。
            </T>
          </p>
          <p className="text-[#6E6B66] mb-8 leading-relaxed text-sm">
            <T>
              大多數人是混合體質，沒有哪種體質比較好或壞，每種能量都有其天賦與挑戰。不要過度思考，觀察本身就是練習。
            </T>
          </p>

          {/* 三督夏 pill */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {[
              { label: "Vata 风", color: "#7F77DD" },
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

          <p className="text-xs text-[#A09890] mb-4 bg-[#F3F1ED] rounded-lg px-5 py-3 border border-#E2DDD5">
            <T>約需 3–5 分鐘 · 共 15 題 · 結果含專屬配方推薦</T>
          </p>
          <div className="bg-white rounded-lg px-5 py-3 border border-#E2DDD5 mb-8">
            <p className="text-xs text-[#4A5E4D] font-medium mb-2">💡 <T>如何回答</T></p>
            <p className="text-xs text-[#6E6B66] leading-relaxed">
              <T>每題有三個選項，請用 1、2、3 排序：</T>
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-[#6E6B66]">
                <span className="font-medium text-[#4A5E4D]">1</span> = <T>最像我</T>
              </p>
              <p className="text-xs text-[#6E6B66]">
                <span className="font-medium text-[#4A5E4D]">2</span> = <T>有點像我</T>
              </p>
              <p className="text-xs text-[#6E6B66]">
                <span className="font-medium text-[#4A5E4D]">3</span> = <T>最不像我</T>
              </p>
            </div>
          </div>

          <button
            onClick={() => setStage("quiz")}
            className="w-full py-4 bg-[#4A5E4D] text-white text-xs tracking-[0.25em] uppercase rounded-md hover:bg-[#2E2E2C] transition-all"
          >
            <T>开始进行测验</T>
          </button>
        </div>
      </main>
    );
  }

  // ── 结果頁 ────────────────────────────────────────────────────
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
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Section header & intro */}
      <div className="bg-[#F3F1ED] border-b border-#E2DDD5 px-6 py-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A5E4D]/50">
          <T>{sectionMeta.tag}</T>
        </p>
        <p className="font-serif text-lg text-[#4A5E4D] mt-0.5">
          <T>{sectionMeta.title}</T>
        </p>

        {currentStep === 0 && (
          <p className="text-sm text-[#6E6B66] mt-3 leading-relaxed max-w-lg">
            <T>
              首先，我們來探索你的先天體質 · Prakriti
              ——這是你與生俱來的身心特質。即使多年來可能因生活而改變，這個核心特質將始終是你的基礎。
            </T>
          </p>
        )}

        {currentStep === 10 && (
          <p className="text-sm text-[#6E6B66] mt-3 leading-relaxed max-w-lg">
            <T>
              現在讓我們檢視你當下的身心狀態 · Vikriti
              ——這反映了現在失衡的能量。透過這份理解，我們能為你推薦最適合恢復平衡的芳療配方。
            </T>
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="px-6 pt-5 pb-2 max-w-xl mx-auto">
        <div className="flex justify-between text-[11px] text-[#A09890] mb-2">
          <span>
            <T>问卷进度</T>
          </span>
          <span>
            {currentStep + 1} / {total}
          </span>
        </div>
        <div className="w-full bg-#E2DDD5 h-[2px] rounded-full overflow-hidden">
          <div
            className="bg-[#4A5E4D] h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-xl mx-auto px-6 py-6">
        <p className="text-[10px] tracking-[0.2em] text-[#4A5E4D]/40 mb-3">
          {String(currentStep + 1).padStart(2, "0")}
        </p>
        <h2 className="text-2xl font-serif text-[#4A5E4D] mb-3 leading-snug">
          <T>{currentQ.title}</T>
        </h2>
        {currentQ.note && (
          <p className="text-xs text-[#A09890] italic mb-5">
            <T>{currentQ.note}</T>
          </p>
        )}

        {currentQ.type === "rank" ? (
          <div className="space-y-4 mt-6">
            <div className="bg-[#F3F1ED] rounded-lg px-4 py-3 border border-#E2DDD5">
              <p className="text-xs text-[#4A5E4D] font-medium mb-2">📍 <T>排序說明</T></p>
              <div className="flex justify-between gap-2">
                <div className="text-center flex-1">
                  <p className="text-xs font-bold text-[#4A5E4D]">1</p>
                  <p className="text-[10px] text-[#6E6B66]"><T>最像我</T></p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-xs font-bold text-[#4A5E4D]">2</p>
                  <p className="text-[10px] text-[#6E6B66]"><T>有點像</T></p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-xs font-bold text-[#4A5E4D]">3</p>
                  <p className="text-[10px] text-[#6E6B66]"><T>最不像我</T></p>
                </div>
              </div>
            </div>
            {currentQ.options.map((opt, i) => {
              const dosha = opt.dosha as DoshaKey;
              const currentRank = rankAnswers[currentQ.id]?.[dosha];

              return (
                <div
                  key={i}
                  className="border border-#E2DDD5 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="flex-1">
                    <span className="text-sm text-[#4A5E4D] leading-relaxed block">
                      <T>{opt.label}</T>
                    </span>
                    {opt.sub && (
                      <span className="block text-xs text-[#A09890] mt-0.5">
                        <T>{opt.sub}</T>
                      </span>
                    )}
                  </span>
                  <div className="flex gap-2 flex-shrink-0">
                    {[1, 2, 3].map((rank) => (
                      <button
                        key={rank}
                        onClick={() => handleRankSelect(dosha, rank)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
                          currentRank === rank
                            ? "bg-[#4A5E4D] text-white border-[#4A5E4D]"
                            : "border-#E2DDD5 text-[#A09890] hover:border-[#4A5E4D]"
                        }`}
                      >
                        {rank}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
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
                      ? "border-[#4A5E4D] bg-[#4A5E4D]/5"
                      : "border-#E2DDD5 bg-white hover:border-[#7A8C7D]"
                  }`}
                >
                  {/* Dot */}
                  <span
                    className={`mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center border transition-all ${
                      currentQ.multi ? "rounded-sm" : "rounded-full"
                    } ${
                      isSel ? "border-[#4A5E4D] bg-[#4A5E4D]" : "border-stone-300"
                    }`}
                  >
                    {isSel && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    )}
                  </span>

                  <span>
                    <span className="text-sm text-[#4A5E4D] leading-relaxed">
                      <T>{opt.label}</T>
                    </span>
                    {opt.sub && (
                      <span className="block text-xs text-[#A09890] mt-0.5">
                        <T>{opt.sub}</T>
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="sticky bottom-0 bg-[#FAFAF8] border-t border-#E2DDD5 px-6 py-4 flex justify-between items-center max-w-xl mx-auto">
        <button
          onClick={handlePrev}
          className={`text-xs border border-#E2DDD5 text-[#A09890] px-5 py-2.5 rounded-md hover:border-[#4A5E4D] hover:text-[#4A5E4D] transition-all ${
            currentStep === 0 ? "invisible" : ""
          }`}
        >
          <T>← 上一题</T>
        </button>

        {(currentQ.multi || currentQ.type === "rank" || isLast) && (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="text-xs bg-[#4A5E4D] text-white px-7 py-2.5 rounded-md tracking-widest uppercase disabled:opacity-30 hover:bg-[#2E2E2C] transition-all"
          >
            <T>{isLast ? "查看我的体质 →" : "繼續 →"}</T>
          </button>
        )}
      </div>
    </main>
  );
}

// ── 结果頁元件 ────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-[#FAFAF8] pb-20">
      {/* Hero */}
      <div className="text-center px-6 pt-14 pb-8">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-sm font-semibold tracking-wider"
          style={{ background: DOSHA_BG[primary], color: DOSHA_COLOR[primary] }}
        >
          {primary}
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#4A5E4D]/50 mb-3">
          <T>你的督夏体质</T>
        </p>
        <h1 className="text-3xl font-serif text-[#4A5E4D] mb-2">
          <T>{pd.name}</T>
        </h1>
        <p className="text-sm text-[#A09890]">
          <T>次体质：</T>
          <T>{sd.name}</T>
        </p>
      </div>

      {/* 督夏比例條 */}
      <div className="max-w-lg mx-auto px-6 mb-8">
        {(["V", "P", "K"] as DoshaKey[]).map((d) => (
          <div key={d} className="flex items-center gap-3 mb-3">
            <span className="text-xs w-14 text-[#A09890] tracking-wider">
              {d === "V" ? "Vata" : d === "P" ? "Pitta" : "Kapha"}
            </span>
            <div className="flex-1 h-1.5 bg-#E2DDD5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${doshaPercent[d]}%`,
                  background: DOSHA_COLOR[d],
                }}
              />
            </div>
            <span className="text-xs text-[#A09890] w-9 text-right">
              {doshaPercent[d]}%
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-lg mx-auto px-6 space-y-4">
        {/* 體質組合說明 */}
        <div className="bg-white border border-#E2DDD5 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A5E4D]/50 mb-4">
            <T>你的體質組合</T>
          </p>
          <div className="space-y-5">
            {/* 主體質 */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: DOSHA_BG[primary], color: DOSHA_COLOR[primary] }}
                >
                  {primary}
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg text-[#4A5E4D] mb-1">
                    <T>{pd.name}</T>
                  </p>
                  <p className="text-xs text-[#A09890] font-medium">
                    <T>{pd.series}</T>
                  </p>
                </div>
              </div>
              <div className="ml-15 space-y-2">
                <p className="text-xs text-[#6E6B66] leading-relaxed">
                  <T>{pd.essence}</T>
                </p>
                <div className="pt-2 border-t border-#E2DDD5">
                  <p className="text-[10px] text-[#A09890] font-medium mb-1">💡 <T>核心能量</T></p>
                  <p className="text-xs text-[#6E6B66]">
                    {primary === "V" && <T>創新、靈活、適應變化。你能夠快速適應新環境，具有高度的直覺力和創意思維。</T>}
                    {primary === "P" && <T>轉化、精准執行、追求卓越。你充滿熱情和野心，擅長完成任務並實現目標。</T>}
                    {primary === "K" && <T>穩定、包容、深厚耐心。你是值得信賴的朋友，能提供強大的支持和安全感。</T>}
                  </p>
                </div>
              </div>
            </div>

            {/* 副體質 */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: DOSHA_BG[secondary], color: DOSHA_COLOR[secondary] }}
                >
                  {secondary}
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg text-[#4A5E4D] mb-1">
                    <T>{sd.name}</T>
                  </p>
                  <p className="text-xs text-[#A09890] font-medium">
                    <T>{sd.series}</T>
                  </p>
                </div>
              </div>
              <div className="ml-15 space-y-2">
                <p className="text-xs text-[#6E6B66] leading-relaxed">
                  <T>{sd.essence}</T>
                </p>
                <div className="pt-2 border-t border-#E2DDD5">
                  <p className="text-[10px] text-[#A09890] font-medium mb-1">🎭 <T>輔助特質</T></p>
                  <p className="text-xs text-[#6E6B66]">
                    {secondary === "V" && <T>為主體質增添靈活性和創意。你能在變化中保持冷靜，思維跳躍且富有想像力。</T>}
                    {secondary === "P" && <T>為主體質帶來專注力和執行力。你追求完美，對細節的把握能力強。</T>}
                    {secondary === "K" && <T>為主體質提供穩定性和耐心。你能深思熟慮後做出決定，具有強大的堅持力。</T>}
                  </p>
                </div>
              </div>
            </div>

            {/* 組合特點 */}
            <div className="bg-gradient-to-r from-[#F3F1ED] to-transparent rounded-lg p-3 border border-#E2DDD5/50">
              <p className="text-[10px] text-[#A09890] font-medium mb-2">🔄 <T>體質互動方式</T></p>
              <p className="text-xs text-[#6E6B66] leading-relaxed">
                {primary === "V" && secondary === "P" && <T>創新與執行的完美搭配。你既有創意又能實踐，但需要避免過度消耗精力。</T>}
                {primary === "V" && secondary === "K" && <T>靈活與穩定的平衡。你既能適應變化又能保持穩定，是理想的平衡體質。</T>}
                {primary === "P" && secondary === "V" && <T>精准與創新的融合。你既聚焦目標又充滿靈感，但需要放下完美主義。</T>}
                {primary === "P" && secondary === "K" && <T>卓越與耐心的結合。你既追求完美又能深思熟慮，是天生的領袖體質。</T>}
                {primary === "K" && secondary === "V" && <T>穩定與靈活的對話。你既可靠又能創新，在變化中保持安全感。</T>}
                {primary === "K" && secondary === "P" && <T>耐心與執行的融合。你既穩定又能追求卓越，是實幹家和思想家的結合。</T>}
              </p>
            </div>
          </div>
        </div>

        {/* 主体质解讀 */}
        <div className="bg-[#F3F1ED] border border-#E2DDD5 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A5E4D]/50 mb-3">
            <T>你的特質與建議</T> · <T>{pd.name}</T>
          </p>
          <p className="text-sm text-[#6E6B66] leading-relaxed mb-4">
            <T>{pd.advice}</T>
          </p>
          <div className="border-t border-stone-300 pt-4 text-xs text-[#4A5E4D]">
            <span className="text-[#A09890]">
              <T>推薦精油：</T>
            </span>
            <span className="font-medium">
              <T>{pd.oils}</T>
            </span>
          </div>
        </div>

        {/* Your Imbalance Is */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: DOSHA_BG[imbalance],
            borderColor: DOSHA_COLOR[imbalance],
          }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: DOSHA_COLOR[imbalance] }}>
            <T>Your Imbalance Is</T>
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: DOSHA_BG[imbalance], color: DOSHA_COLOR[imbalance], border: `2px solid ${DOSHA_COLOR[imbalance]}` }}
              >
                {imbalance}
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg" style={{ color: DOSHA_COLOR[imbalance] }} >
                  <T>{id.name}</T>
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: `${DOSHA_COLOR[imbalance]}dd` }}>
              {imbalance === "V" && (
                <T>失衡的風型能量會表現為焦慮、思緒混亂、消化不適（脹氣便秘）、睡眠障礙和神經緊張。你可能感到難以集中注意力，身體容易疲倦，肌膚乾燥。這些症狀來自於過度的活動和缺乏根基感。透過建立穩定的日常儀式、保持溫暖和滋養，可以有效平衡風型的浮躁能量。</T>
              )}
              {imbalance === "P" && (
                <T>失衡的火型能量會表現為易怒、急躁、皮膚發炎、消化問題（胃酸過多）和完美主義傾向。你可能感到過度燃燒、無法放鬆，甚至變得苛刻和批判。這些症狀來自於過度努力和內在的熊熊烈火。透過降溫、充分休息和放下控制欲，可以重新平衡火型的熱情能量。</T>
              )}
              {imbalance === "K" && (
                <T>失衡的土水型能量會表現為遲鈍、情緒低落、消化緩慢、體重增加和缺乏動力。你可能感到沉重、無興趣，甚至想逃避責任。這些症狀來自於停滯和缺乏刺激。透過提升活力、嘗試新事物和增加運動，可以重新喚醒土水型的穩定能量。</T>
              )}
            </p>
          </div>
        </div>

        {/* 當下失衡信號 */}
        <div className="bg-white border border-#E2DDD5 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A5E4D]/50 mb-3">
            <T>具體失衡症狀</T>
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

        {/* 日常調理建議 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-#E2DDD5 rounded-xl p-4">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#4A5E4D]/50 mb-3 font-medium">
              <T>睡眠建議</T>
            </p>
            <p className="text-xs text-[#6E6B66] leading-relaxed">
              {primary === "V" && <T>保持規律作息，晚上10點前入睡。避免過度刺激，創造溫暖安定的睡眠環境。</T>}
              {primary === "P" && <T>晚上需要充分冷靜。避免工作至深夜，睡前30分鐘放下手機，保持涼爽的臥室溫度。</T>}
              {primary === "K" && <T>早起很重要。建議6-7點起床，避免過度睡眠。適度運動幫助提升睡眠質量。</T>}
            </p>
          </div>
          <div className="bg-white border border-#E2DDD5 rounded-xl p-4">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#4A5E4D]/50 mb-3 font-medium">
              <T>飲食建議</T>
            </p>
            <p className="text-xs text-[#6E6B66] leading-relaxed">
              {primary === "V" && <T>溫暖、滋潤的食物。避免生冷、刺激性食物。多喝溫水，選擇易消化的飲食。</T>}
              {primary === "P" && <T>清涼、苦味食物。避免過辣、過熱的食物。多吃綠葉蔬菜和水果，保持飲食清淡。</T>}
              {primary === "K" && <T>溫暖、辛香的食物。避免油膩、重口味。適度進食，選擇促進消化的香料。</T>}
            </p>
          </div>
        </div>

        {/* 運動建議 */}
        <div className="bg-gradient-to-br from-[#F3F1ED] to-white border border-#E2DDD5 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A5E4D]/50 mb-4 font-medium">
            <T>日常活動建議</T>
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-lg">🧘</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#4A5E4D] mb-1">
                  {primary === "V" && <T>瑜伽 · 太極</T>}
                  {primary === "P" && <T>游泳 · 瑜伽</T>}
                  {primary === "K" && <T>快走 · 跑步</T>}
                </p>
                <p className="text-xs text-[#6E6B66]">
                  {primary === "V" && <T>需要穩定、接地的運動，建議每週3-4次，避免過度耗損。</T>}
                  {primary === "P" && <T>需要冷靜、平衡的運動，建議每週4-5次，在涼爽時段進行。</T>}
                  {primary === "K" && <T>需要激動、刺激的運動，建議每天30-45分鐘，保持新鮮感和動力。</T>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 季節性護理 */}
        <div className="bg-white border border-#E2DDD5 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A5E4D]/50 mb-4 font-medium">
            <T>季節調適</T>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-[#4A5E4D] mb-2">🌸 春季</p>
              <p className="text-xs text-[#6E6B66]">
                {primary === "V" && <T>多喝溫水，避免春風。</T>}
                {primary === "P" && <T>清淡飲食，早睡早起。</T>}
                {primary === "K" && <T>多運動，避免濕度過高。</T>}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A5E4D] mb-2">☀️ 夏季</p>
              <p className="text-xs text-[#6E6B66]">
                {primary === "V" && <T>保持冷靜，避免過熱。</T>}
                {primary === "P" && <T>充分休息，清涼環境。</T>}
                {primary === "K" && <T>適度活動，避免過度。</T>}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A5E4D] mb-2">🍂 秋季</p>
              <p className="text-xs text-[#6E6B66]">
                {primary === "V" && <T>保濕養護，增加油脂。</T>}
                {primary === "P" && <T>避免燥熱，潤肺滋陰。</T>}
                {primary === "K" && <T>提升活力，避免懶散。</T>}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A5E4D] mb-2">❄️ 冬季</p>
              <p className="text-xs text-[#6E6B66]">
                {primary === "V" && <T>溫暖滋養，早睡晚起。</T>}
                {primary === "P" && <T>適度活動，保持溫暖。</T>}
                {primary === "K" && <T>刺激活力，保持溫度。</T>}
              </p>
            </div>
          </div>
        </div>

        {/* 壓力管理 */}
        <div className="bg-white border border-#E2DDD5 rounded-xl p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#4A5E4D]/50 mb-4 font-medium">
            <T>壓力管理秘訣</T>
          </p>
          {primary === "V" && (
            <div className="space-y-2 text-xs text-[#6E6B66]">
              <p>✓ <T>建立日常儀式感，讓生活有序</T></p>
              <p>✓ <T>定時定量進食，穩定血糖</T></p>
              <p>✓ <T>練習靜坐冥想，5-10分鐘即可</T></p>
              <p>✓ <T>與信任的人傾訴，減輕心理負擔</T></p>
            </div>
          )}
          {primary === "P" && (
            <div className="space-y-2 text-xs text-[#6E6B66]">
              <p>✓ <T>設定優先級，避免完美主義</T></p>
              <p>✓ <T>定期休息，不要過度燃燒</T></p>
              <p>✓ <T>練習放鬆呼吸，特別在關鍵時刻</T></p>
              <p>✓ <T>接受不完美，放下對他人的評判</T></p>
            </div>
          )}
          {primary === "K" && (
            <div className="space-y-2 text-xs text-[#6E6B66]">
              <p>✓ <T>每天設定具體目標，增加動力</T></p>
              <p>✓ <T>與朋友互動，打破單調感</T></p>
              <p>✓ <T>嘗試新事物，刺激新鮮感</T></p>
              <p>✓ <T>早起運動，啟動新一天的活力</T></p>
            </div>
          )}
        </div>

        {/* 產品推薦 */}
        <div>
          <h2 className="font-serif text-xl text-[#4A5E4D] mt-6 mb-1">
            <T>专屬芳疗配方推薦</T>
          </h2>
          <p className="text-xs text-[#A09890] mb-4">
            <T>根據你的体质与当下状态，以下配方最能支持你的身心平衡</T>
          </p>
          <div className="space-y-3">
            {pd.products.map((p) => (
              <a
                key={p.name}
                href="/products"
                className="flex items-start gap-4 bg-white border border-#E2DDD5 rounded-xl p-4 hover:border-[#7A8C7D] transition-all group"
              >
                <span className="text-2xl mt-0.5">{p.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#4A5E4D] mb-1 group-hover:text-[#2E2E2C]">
                    <T>{p.name}</T>
                  </p>
                  <p className="text-xs text-[#6E6B66] leading-relaxed mb-2">
                    <T>{p.desc}</T>
                  </p>
                  <p className="text-[10px] tracking-wider text-[#7A8C7D] uppercase">
                    <T>{p.tag}</T>
                  </p>
                </div>
                <span className="text-stone-300 group-hover:text-[#4A5E4D] transition-colors text-lg">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA 預約諮询 */}
        <div className="bg-[#4A5E4D] rounded-2xl p-8 text-center mt-6">
          <h2 className="font-serif text-2xl text-[#FAFAF8] mb-3">
            <T>深度諮询</T>
          </h2>
          <p className="text-xs text-[#FAFAF8]/70 leading-relaxed mb-6">
            <T>
              每一个体质都是独一無二的組合。讓我們的認證芳疗師為你設计完整的个人化疗癒计划，從精油选择到日常调理，全方位守護你的身心。
            </T>
          </p>
          <a
            href="/services"
            className="block w-full py-3.5 bg-[#FAFAF8] text-[#4A5E4D] text-xs tracking-[0.2em] uppercase rounded-md font-medium hover:opacity-90 transition-all mb-3"
          >
            <T>預約一对一諮询</T>
          </a>
          <a
            href="/products"
            className="block w-full py-3.5 border border-[#FAFAF8]/30 text-[#FAFAF8] text-xs tracking-[0.2em] uppercase rounded-md hover:bg-[#FAFAF8]/10 transition-all"
          >
            <T>瀏覽更多產品</T>
          </a>
        </div>

        {/* 重新測驗 */}
        <div className="text-center pt-2 pb-4">
          <button
            onClick={onReset}
            className="text-xs text-[#A09890] underline hover:text-[#4A5E4D] transition-colors"
          >
            <T>重新測驗</T>
          </button>
        </div>
      </div>
    </div>
  );
}
