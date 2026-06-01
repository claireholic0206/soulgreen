"use client";

import { useState } from "react";
import { quizQuestions } from "@/data/quizData";
import { T } from "@/components/TextConverter";

type DoshaKey = "V" | "P" | "K";

export default function QuizPage() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<DoshaKey, number>>({
    V: 0,
    P: 0,
    K: 0,
  });
  const [result, setResult] = useState<DoshaKey | null>(null);

  const progress = (currentStep / quizQuestions.length) * 100;

  const handleSelect = (val: DoshaKey) => {
    const newScores = { ...scores, [val]: scores[val] + 1 };
    setScores(newScores);

    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const winner = Object.keys(newScores).reduce((a, b) =>
        newScores[a as DoshaKey] > newScores[b as DoshaKey] ? a : b,
      ) as DoshaKey;
      setResult(winner);
      setStage("result");
    }
  };

  // 1. 介紹頁面
  if (stage === "intro") {
    return (
      <main className="min-h-screen bg-[#FDFBF7] py-24 px-6 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#2D4232]/50 mb-6">
            <T>身心諮詢室</T>
          </h2>
          <h1 className="text-4xl font-serif text-[#2D4232] mb-8 leading-tight">
            <T>尋找身心的平衡點</T>
          </h1>
          <p className="text-stone-600 mb-12 leading-relaxed text-sm">
            <T>
              在阿育吠陀的智慧中，每個人都是由三種能量組成的獨特聚合體。這份測驗將帶您重新解讀身體的語言，找出當下最需要的自然療癒處方。
            </T>
          </p>
          <button
            onClick={() => setStage("quiz")}
            className="w-full py-4 bg-[#2D4232] text-white rounded-full tracking-widest hover:bg-[#1e2e22] transition-all"
          >
            <T>開始進行諮詢</T>
          </button>
        </div>
      </main>
    );
  }

  // 2. 結果頁面
  if (stage === "result" && result) {
    return (
      <ResultPage
        dosha={result}
        onReset={() => {
          setStage("intro");
          setCurrentStep(0);
          setScores({ V: 0, P: 0, K: 0 });
        }}
      />
    );
  }

  // 3. 測驗頁面
  const currentQ = quizQuestions[currentStep];
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-xl mx-auto">
        <div className="w-full bg-stone-200 h-1 mb-10 rounded-full overflow-hidden">
          <div
            className="bg-[#2D4232] h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mb-6 text-[10px] tracking-[0.3em] text-[#2D4232]/50 uppercase">
          <T>題目</T> {currentStep + 1} / {quizQuestions.length}
        </div>
        <h2 className="text-3xl font-serif text-[#2D4232] mb-10 leading-tight">
          <T>{currentQ.title}</T>
        </h2>
        <div className="space-y-4">
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.val)}
              className="w-full text-left p-6 bg-white border border-stone-200 rounded-xl hover:border-[#2D4232] transition-all duration-300 active:scale-[0.98] shadow-sm"
            >
              <T>{opt.label}</T>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

function ResultPage({
  dosha,
  onReset,
}: {
  dosha: DoshaKey;
  onReset: () => void;
}) {
  const details = {
    V: {
      title: "Vata 瓦塔",
      series: "大地根植系列 (Grounding)",
      essence: "風與空的能量，代表著變動、輕盈與創造力。",
      advice: "回歸大地，找回穩定感。透過溫暖香氣，讓浮動心靈落地。",
      oils: "推薦：岩蘭草、檀香、甜橙",
    },
    P: {
      title: "Pitta 皮塔",
      series: "清涼舒壓系列 (Soothing)",
      essence: "火的能量，代表著轉化、熱情、智慧與精準執行力。",
      advice: "適度降溫，給心靈留白。透過清涼香氣，撫平內心波瀾。",
      oils: "推薦：洋甘菊、薰衣草、乳香",
    },
    K: {
      title: "Kapha 卡法",
      series: "煥活流動系列 (Energizing)",
      essence: "地與水的能量，代表著穩定、滋養、愛與深厚耐力。",
      advice: "喚醒感官，打破沈滯。透過活力香氣，激發身心流動感。",
      oils: "推薦：葡萄柚、迷迭香、黑胡椒",
    },
  };

  const data = details[dosha];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 text-center">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">
          <T>您的體質類型</T>
        </h2>
        <h1 className="text-4xl font-serif text-[#2D4232] mb-2">
          {data.title}
        </h1>
        <p className="text-[#2D4232]/80 italic text-sm mb-12">
          <T>{data.series}</T>
        </p>

        <section className="text-left mb-8">
          <h3 className="text-sm font-bold text-[#2D4232] mb-3 uppercase tracking-widest">
            <T>核心本質</T>
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            <T>{data.essence}</T>
          </p>
        </section>

        <section className="bg-[#2D4232]/5 p-6 rounded-2xl mb-8">
          <h3 className="text-sm font-bold text-[#2D4232] mb-3 uppercase tracking-widest">
            <T>Soulgreen 處方</T>
          </h3>
          <p className="text-stone-700 leading-relaxed text-sm mb-4">
            <T>{data.advice}</T>
          </p>
          <p className="text-[#2D4232] font-bold text-sm border-t border-[#2D4232]/10 pt-4">
            <T>{data.oils}</T>
          </p>
        </section>

        <a
          href="/products"
          className="block w-full py-4 bg-[#2D4232] text-white rounded-full text-sm tracking-widest hover:bg-[#1e2e22] transition-all mb-4"
        >
          <T>瀏覽完整產品系列</T>
        </a>
        <button
          onClick={onReset}
          className="text-stone-400 hover:text-[#2D4232] text-xs underline uppercase tracking-widest"
        >
          <T>重新測試</T>
        </button>
      </div>
    </div>
  );
}
