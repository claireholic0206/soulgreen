"use client";

import { useState } from "react";
import {
  quizQuestions,
  DOSHA_DETAIL,
  type DoshaKey,
} from "@/data/quizData";

const DOSHA_INFO: Record<DoshaKey, { tint: string; glyph: string }> = {
  V: { tint: "#8a9a7a", glyph: "風" },
  P: { tint: "#b8734f", glyph: "火" },
  K: { tint: "#4a5940", glyph: "土" },
};

export default function QuizPage() {
  const [stage, setStage] = useState<"quiz" | "result">("quiz");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<DoshaKey[]>([]);
  const [result, setResult] = useState<DoshaKey | null>(null);

  const total = quizQuestions.length;
  const currentQ = quizQuestions[currentStep];
  const isLast = currentStep === total - 1;

  const handleSelectOption = (dosha: DoshaKey) => {
    const newAnswers = [...answers, dosha];
    setAnswers(newAnswers);

    if (isLast) {
      const counts: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };
      newAnswers.forEach((d) => {
        counts[d]++;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const dominant = (sorted[0][0] as DoshaKey) || "V";
      setResult(dominant);
      setStage("result");
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setAnswers((a) => a.slice(0, -1));
    }
  };

  const handleReset = () => {
    setStage("quiz");
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  // ── 結果頁 ────
  if (stage === "result" && result) {
    const resultDetail = DOSHA_DETAIL[result];
    const info = DOSHA_INFO[result];

    return (
      <div style={{
        fontFamily: "'Noto Sans TC', sans-serif",
        background: "#f7f3ea",
        color: "#28331f",
        lineHeight: 1.75,
        minHeight: "100vh",
        padding: "40px 6vw 120px"
      }}>
        <style>{`
          .font-serif { font-family: 'Noto Serif TC', serif; }
          .sg-fade-up { animation: sg-fade-up 0.6s ease both; }
          @keyframes sg-fade-up {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* 標題區 */}
          <div className="sg-fade-up" style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: info.tint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <span className="font-serif" style={{
                fontSize: "26px",
                color: "#fff"
              }}>
                {info.glyph}
              </span>
            </div>
            <div>
              <div style={{
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#a08a5c"
              }}>
                你目前的能量傾向
              </div>
              <h3 className="font-serif" style={{
                fontSize: "26px",
                fontWeight: 600,
                margin: "4px 0 0"
              }}>
                {resultDetail.title}
              </h3>
            </div>
          </div>

          {/* 描述文本 */}
          <p style={{
            fontSize: "15px",
            color: "#4a5230",
            margin: "0 0 48px",
            fontWeight: 300,
            lineHeight: 1.7
          }}>
            {resultDetail.summary}
          </p>

          {/* 三個資訊框 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "48px"
          }}>
            <div style={{
              background: "#fffdf8",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(40,51,31,.04)"
            }}>
              <div style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                color: "#8a7a5c",
                marginBottom: "12px",
                textTransform: "uppercase"
              }}>
                能量傾向說明
              </div>
              <p style={{
                fontSize: "14.5px",
                color: "#4a5230",
                margin: "0",
                fontWeight: 300,
                lineHeight: 1.6
              }}>
                {resultDetail.energyText}
              </p>
            </div>

            <div style={{
              background: "#fffdf8",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(40,51,31,.04)"
            }}>
              <div style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                color: "#8a7a5c",
                marginBottom: "12px",
                textTransform: "uppercase"
              }}>
                為你推薦
              </div>
              <p style={{
                fontSize: "14.5px",
                color: "#4a5230",
                margin: "0",
                fontWeight: 400,
                lineHeight: 1.6
              }}>
                {resultDetail.productsText}
              </p>
            </div>

            <div style={{
              background: "#fffdf8",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(40,51,31,.04)"
            }}>
              <div style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                color: "#8a7a5c",
                marginBottom: "12px",
                textTransform: "uppercase"
              }}>
                建議的自我照顧儀式
              </div>
              <p style={{
                fontSize: "14.5px",
                color: "#4a5230",
                margin: "0",
                fontWeight: 300,
                lineHeight: 1.6
              }}>
                {resultDetail.ritual}
              </p>
            </div>
          </div>

          {/* 按鈕 */}
          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => {
                window.location.href = "/?section=consult#consult";
              }}
              style={{
                background: "#b8734f",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: "100px",
                fontSize: "14.5px",
                letterSpacing: ".5px",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "inline-block"
              }}
            >
              預約專屬諮詢
            </button>
            <button
              onClick={handleReset}
              style={{
                background: "none",
                border: "1px solid rgba(74,89,64,.25)",
                color: "#4a5940",
                padding: "14px 30px",
                borderRadius: "100px",
                fontSize: "14.5px",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              重新測驗
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── 測驗頁 ────
  return (
    <div style={{
      fontFamily: "'Noto Sans TC', sans-serif",
      background: "#f7f3ea",
      color: "#28331f",
      lineHeight: 1.75,
      minHeight: "100vh"
    }}>
      <style>{`
        .font-serif { font-family: 'Noto Serif TC', serif; }
      `}</style>

      <div style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "40px 6vw"
      }}>
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "36px"
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "4px",
                flex: 1,
                borderRadius: "2px",
                background: i < currentStep ? "#b8734f" : "rgba(74,89,64,.15)",
                transition: "background 0.3s ease"
              }}
            />
          ))}
        </div>

        <div style={{
          fontSize: "13px",
          letterSpacing: "2px",
          color: "#a08a5c",
          marginBottom: "12px"
        }}>
          問題 {currentStep + 1} / {total}
        </div>

        <h3 className="font-serif" style={{
          fontSize: "24px",
          fontWeight: 600,
          margin: "0 0 32px",
          lineHeight: 1.5
        }}>
          {currentQ.title}
        </h3>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "40px"
        }}>
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelectOption(opt.dosha)}
              style={{
                textAlign: "left",
                background: "#f7f3ea",
                border: "1px solid rgba(74,89,64,.12)",
                padding: "18px 24px",
                borderRadius: "16px",
                fontSize: "15px",
                fontFamily: "inherit",
                color: "#28331f",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#eef1e6";
                e.currentTarget.style.borderColor = "#6b7a4f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f7f3ea";
                e.currentTarget.style.borderColor = "rgba(74,89,64,.12)";
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {currentStep > 0 && (
          <button
            onClick={handlePrev}
            style={{
              marginBottom: "28px",
              background: "none",
              border: "none",
              color: "#8a7a5c",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "inherit",
              padding: "0"
            }}
          >
            ← 上一題
          </button>
        )}
      </div>
    </div>
  );
}
