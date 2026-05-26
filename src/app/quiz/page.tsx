"use client";

import { useState } from "react";
import { quizQuestions } from "@/data/quizData";
import { T } from "@/components/TextConverter";

type DoshaKey = "V" | "P" | "K";

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<DoshaKey, number>>({
    V: 0,
    P: 0,
    K: 0,
  });
  const [finished, setFinished] = useState(false);

  const progress = (currentStep / quizQuestions.length) * 100;

  const handleSelect = (val: DoshaKey) => {
    setScores((prev) => ({ ...prev, [val]: prev[val] + 1 }));
    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const winner = Object.keys(scores).reduce((a, b) =>
      scores[a as DoshaKey] > scores[b as DoshaKey] ? a : b,
    ) as DoshaKey;
    return <ResultPage dosha={winner} />;
  }

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

function ResultPage({ dosha }: { dosha: "V" | "P" | "K" }) {
  const details = {
    V: {
      title: "Vata 瓦塔",
      essence:
        "Vata 体质的核心是『风』与『空』的能量，代表着变动、轻盈与创造力。",
      imbalance: "当能量失衡时，容易感到焦虑、失眠、消化不良或思绪过于跳跃。",
      advice:
        "建议透过规律的作息、温暖的饮食与规律的居家空间，来安定散乱的能量。",
      oils: "推荐精油：甜橙、天竺葵、檀香（温暖且安抚神经）",
    },
    P: {
      title: "Pitta 皮塔",
      essence:
        "Pitta 体质的核心是『火』的能量，代表着转化、热情、智慧与精准的执行力。",
      imbalance:
        "当能量失衡时，容易表现出急躁、愤怒、好辩，或是身体容易发炎与燥热。",
      advice:
        "建议透过降温的饮食、冥想与适度的放松，将过盛的火元素转化为冷静的洞察力。",
      oils: "推荐精油：薄荷、薰衣草、依兰依兰（清凉且平缓燥热）",
    },
    K: {
      title: "Kapha 卡法",
      essence:
        "Kapha 体质的核心是『地』与『水』的能量，代表着稳定、滋养、爱与深厚的耐力。",
      imbalance:
        "当能量失衡时，容易感到沉重、迟钝、对现状过于安逸，或是体重过度增加。",
      advice:
        "建议透过适度的体能锻炼、多变化的感官刺激与规律的清理，来保持流动的生命力。",
      oils: "推荐精油：尤加利、迷迭香、葡萄柚（提振与促进代谢）",
    },
  };

  const data = details[dosha];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
        <div className="text-center mb-12">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">
            <T>您的体质类型</T>
          </h2>
          <h1 className="text-4xl font-serif text-[#2D4232]">{data.title}</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-bold text-[#2D4232] mb-3 uppercase tracking-widest">
              <T>核心本质</T>
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm">
              <T>{data.essence}</T>
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#2D4232] mb-3 uppercase tracking-widest">
              <T>能量失衡时</T>
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm">
              <T>{data.imbalance}</T>
            </p>
          </section>

          {/* 新增：芳療建議區 */}
          <section className="bg-[#2D4232]/5 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-[#2D4232] mb-3 uppercase tracking-widest text-center">
              <T>芳疗建议</T>
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm text-center">
              <T>{data.advice}</T>
            </p>
            {/* 加入這行來顯示精油 */}
            <p className="text-[#2D4232] font-medium text-sm text-center border-t border-[#2D4232]/10 pt-3">
              <T>{data.oils}</T>
            </p>
          </section>

          {/* 新增：導航連結 */}
          <div className="grid grid-cols-1 gap-3 pt-6">
            <a
              href="/products"
              className="w-full py-4 bg-[#2D4232] text-white text-center rounded-full text-sm tracking-widest hover:bg-[#1e2e22] transition-all"
            >
              <T>浏览产品</T>
            </a>
            <a
              href="/services"
              className="w-full py-4 bg-transparent border border-[#2D4232] text-[#2D4232] text-center rounded-full text-sm tracking-widest hover:bg-[#2D4232]/5 transition-all"
            >
              <T>订制专属配方</T>
            </a>
          </div>
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => window.location.reload()}
            className="text-stone-400 hover:text-[#2D4232] text-xs underline uppercase tracking-widest"
          >
            <T>重新测试</T>
          </button>
        </div>
      </div>
    </div>
  );
}
