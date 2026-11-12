"use client";

import { useState } from "react";
import Link from "next/link";
import {
  quizQuestions,
  DOSHA_DETAIL,
  DOSHA_KEYS,
  FORMULAS,
  FORMULA_ESSENTIAL_OIL_NOTE,
  computeResult,
  type DoshaKey,
  type DualKey,
  type QuizAnswer,
  type QuizResult,
} from "@/data/quizData";

const DOSHA_INFO: Record<DoshaKey, { tint: string; glyph: string; label: string }> = {
  V: { tint: "#8a9a7a", glyph: "风", label: "风能 Vata" },
  P: { tint: "#b8734f", glyph: "火", label: "火能 Pitta" },
  K: { tint: "#4a5940", glyph: "土", label: "水土能 Kapha" },
};

const pageStyle: React.CSSProperties = {
  fontFamily: "'Noto Sans SC', sans-serif",
  background: "#f7f3ea",
  color: "#28331f",
  lineHeight: 1.75,
  minHeight: "100vh",
};

const cardStyle: React.CSSProperties = {
  background: "#fffdf8",
  borderRadius: "22px",
  padding: "28px 30px",
};

const cardTitle: React.CSSProperties = {
  fontSize: "13px",
  letterSpacing: "2px",
  color: "#a08a5c",
  marginBottom: "12px",
  fontWeight: 600,
};

// 三轴雷达图：风在上、火在右下、水土在左下
function EnergyRadar({ percents }: { percents: Record<DoshaKey, number> }) {
  const cx = 150;
  const cy = 150;
  const R = 90;
  const scaleMax = Math.max(60, ...DOSHA_KEYS.map((k) => percents[k]));
  const angle: Record<DoshaKey, number> = { V: -90, P: 30, K: 150 };
  const pt = (k: DoshaKey, ratio: number) => {
    const a = (angle[k] * Math.PI) / 180;
    return [cx + R * ratio * Math.cos(a), cy + R * ratio * Math.sin(a)] as const;
  };
  const ring = (ratio: number) =>
    DOSHA_KEYS.map((k) => pt(k, ratio).join(",")).join(" ");
  const shape = DOSHA_KEYS.map((k) => pt(k, percents[k] / scaleMax).join(",")).join(" ");

  return (
    <svg viewBox="5 25 290 200" role="img" aria-label="三种能量占比雷达图" style={{ width: "100%", maxWidth: "380px", display: "block", margin: "0 auto" }}>
      {[1 / 3, 2 / 3, 1].map((r) => (
        <polygon key={r} points={ring(r)} fill="none" stroke="rgba(74,89,64,.18)" strokeWidth="1" />
      ))}
      {DOSHA_KEYS.map((k) => {
        const [x, y] = pt(k, 1);
        return <line key={k} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(74,89,64,.18)" strokeWidth="1" />;
      })}
      <polygon points={shape} fill="rgba(184,115,79,.22)" stroke="#b8734f" strokeWidth="2" strokeLinejoin="round" />
      {DOSHA_KEYS.map((k) => {
        const [x, y] = pt(k, percents[k] / scaleMax);
        return <circle key={k} cx={x} cy={y} r="4.5" fill={DOSHA_INFO[k].tint} />;
      })}
      {DOSHA_KEYS.map((k) => {
        const [x, y] = pt(k, 1.22);
        return (
          <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#4a5230">
            {DOSHA_DETAIL[k].short} {percents[k]}%
          </text>
        );
      })}
    </svg>
  );
}

function ResultView({ result, onReset }: { result: QuizResult; onReset: () => void }) {
  const primary = result.order[0];
  const secondary = result.order[1];
  const detail = DOSHA_DETAIL[primary];

  const formula =
    result.kind === "single"
      ? FORMULAS.single[primary]
      : result.kind === "dual" && result.formulaKey
        ? FORMULAS.dual[result.formulaKey as DualKey]
        : FORMULAS.tri;

  const heading =
    result.kind === "tri" ? "三种能量较为均衡" : formula?.name ?? detail.name;

  return (
    <div style={{ ...pageStyle, padding: "40px 6vw 120px" }}>
      <style>{`
        .font-serif { font-family: 'Noto Serif SC', serif; }
        .sg-fade-up { animation: sg-fade-up 0.6s ease both; }
        @keyframes sg-fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div className="sg-fade-up" style={{ marginBottom: "36px" }}>
          <div style={{ fontSize: "13px", letterSpacing: "2px", color: "#a08a5c" }}>你的能量比例</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 600, margin: "6px 0 0" }}>
            {heading}
          </h2>
        </div>

        <div className="sg-fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "center", marginBottom: "28px" }}>
          <div style={{ ...cardStyle }}>
            <EnergyRadar percents={result.percents} />
          </div>
          <div style={{ ...cardStyle }}>
            <div style={cardTitle}>占比</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {result.order.map((k) => (
                <div key={k}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", marginBottom: "6px" }}>
                    <span>{DOSHA_INFO[k].label}</span>
                    <span style={{ fontWeight: 600 }}>{result.percents[k]}%</span>
                  </div>
                  <div style={{ height: "10px", borderRadius: "5px", background: "rgba(74,89,64,.1)" }}>
                    <div style={{ width: `${result.percents[k]}%`, height: "100%", borderRadius: "5px", background: DOSHA_INFO[k].tint, transition: "width .6s ease" }} />
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "13px", color: "#8a7a5c", margin: "20px 0 0", fontWeight: 300 }}>
              多数人都是两种甚至三种能量的混合，占比越高，代表这股能量在你身上越明显。
            </p>
          </div>
        </div>

        <div className="sg-fade-up" style={{ ...cardStyle, marginBottom: "24px" }}>
          <div style={cardTitle}>能量解读</div>
          {result.kind === "single" && (
            <>
              <p style={{ margin: "0 0 12px", fontWeight: 300 }}>{detail.summary}</p>
              <p style={{ margin: 0, fontWeight: 300, color: "#5c6650" }}>{detail.energyText}</p>
            </>
          )}
          {result.kind === "dual" && (
            <>
              {formula?.traits && <p style={{ margin: "0 0 12px", fontWeight: 300 }}>特征：{formula.traits}</p>}
              <p style={{ margin: "0 0 10px", fontWeight: 300, color: "#5c6650" }}>{DOSHA_DETAIL[primary].energyText}</p>
              <p style={{ margin: 0, fontWeight: 300, color: "#5c6650" }}>{DOSHA_DETAIL[secondary].energyText}</p>
            </>
          )}
          {result.kind === "tri" && (
            <p style={{ margin: 0, fontWeight: 300 }}>
              你的风、火、水土三种能量比例比较接近，说明目前身心状态相对均衡，也可能同时带有多种倾向。
              这类体质的搭配比较个别化，建议在一对一咨询时，依你当下的状态再为你细细调配。
            </p>
          )}
        </div>

        <div className="sg-fade-up" style={{ ...cardStyle, marginBottom: "36px" }}>
          <div style={cardTitle}>油浴量身配方（参考）</div>
          {formula ? (
            <>
              <div style={{ fontSize: "14px", color: "#8a7a5c", marginBottom: "6px" }}>基底油</div>
              <ul style={{ margin: "0 0 18px", paddingLeft: "1.2em", listStyle: "disc", fontWeight: 300 }}>
                {formula.baseOils.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <div style={{ fontSize: "14px", color: "#8a7a5c", marginBottom: "6px" }}>精油（{FORMULA_ESSENTIAL_OIL_NOTE}）</div>
              <p style={{ margin: 0, fontWeight: 300 }}>
                {formula.essentialOils ?? "精油搭配会在一对一咨询时，依你的状态与香气偏好为你调配。"}
              </p>
            </>
          ) : (
            <p style={{ margin: 0, fontWeight: 300 }}>专属配方将在一对一咨询时，依你的状态与香气偏好为你调配。</p>
          )}
          <p style={{ fontSize: "13px", color: "#8a7a5c", margin: "20px 0 0", fontWeight: 300 }}>
            以上为参考方向，不作为医疗建议；实际比例与精油会依你的状况在一对一咨询时调整。
          </p>
        </div>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link href="/#consult" style={{ background: "#b8734f", color: "#fff", padding: "14px 34px", borderRadius: "100px", fontSize: "14.5px", letterSpacing: ".5px" }}>
            预约专属咨询
          </Link>
          <button
            onClick={onReset}
            style={{ background: "none", border: "1px solid rgba(74,89,64,.25)", color: "#4a5940", padding: "14px 30px", borderRadius: "100px", fontSize: "14.5px", cursor: "pointer", fontFamily: "inherit" }}
          >
            重新测验
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  // 每题的选择：primary（最像我）/ secondary（也有点像），存的是选项的顺位
  const [picks, setPicks] = useState<{ primary: number | null; secondary: number | null }[]>(
    () => quizQuestions.map(() => ({ primary: null, secondary: null })),
  );
  const [result, setResult] = useState<QuizResult | null>(null);

  const total = quizQuestions.length;
  const currentQ = quizQuestions[currentStep];
  const pick = picks[currentStep];
  const isLast = currentStep === total - 1;

  const handleTap = (i: number) => {
    setPicks((prev) =>
      prev.map((p, idx) => {
        if (idx !== currentStep) return p;
        if (p.primary === null) return { primary: i, secondary: null };
        if (i === p.primary) return { primary: p.secondary, secondary: null };
        if (i === p.secondary) return { ...p, secondary: null };
        return { ...p, secondary: i };
      }),
    );
  };

  const handleNext = () => {
    if (pick.primary === null) return;
    if (!isLast) {
      setCurrentStep((s) => s + 1);
      return;
    }
    const answers: QuizAnswer[] = picks.map((p, idx) => ({
      primary: quizQuestions[idx].options[p.primary as number].dosha,
      secondary: p.secondary !== null ? quizQuestions[idx].options[p.secondary].dosha : undefined,
    }));
    setResult(computeResult(answers));
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setPicks(quizQuestions.map(() => ({ primary: null, secondary: null })));
    setResult(null);
  };

  if (result) return <ResultView result={result} onReset={handleReset} />;

  const canNext = pick.primary !== null;

  return (
    <div style={pageStyle}>
      <style>{`
        .font-serif { font-family: 'Noto Serif SC', serif; }
        .sg-opt { transition: all .2s ease; }
        .sg-opt:hover { border-color: #6b7a4f !important; }
      `}</style>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 6vw" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "36px" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "4px",
                flex: 1,
                borderRadius: "2px",
                background: i < currentStep ? "#b8734f" : "rgba(74,89,64,.15)",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>

        <div style={{ fontSize: "13px", letterSpacing: "2px", color: "#a08a5c", marginBottom: "6px" }}>
          问题 {currentStep + 1} / {total}
        </div>
        <div style={{ fontSize: "13px", color: "#b8734f", marginBottom: "14px" }}>{currentQ.section}</div>

        <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 14px", lineHeight: 1.5 }}>
          {currentQ.title}
        </h3>

        {currentStep === 0 ? (
          <p style={{ fontSize: "14px", color: "#5c6650", background: "#fffdf8", borderRadius: "14px", padding: "14px 18px", margin: "0 0 24px", lineHeight: 1.8, fontWeight: 300 }}>
            不需要很精准——凭第一直觉，选「大部分时候最像你」的一项就好，有七八成像就可以选。
            如果还有另一项也有点像，可以再点选一项，当作「也有点像」。
          </p>
        ) : (
          <p style={{ fontSize: "13.5px", color: "#8a7a5c", margin: "0 0 24px", fontWeight: 300 }}>
            先选最像你的一项；另一项也有点像的话，可再选一项。
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
          {currentQ.options.map((opt, i) => {
            const isPrimary = pick.primary === i;
            const isSecondary = pick.secondary === i;
            return (
              <button
                key={i}
                className="sg-opt"
                onClick={() => handleTap(i)}
                style={{
                  textAlign: "left",
                  background: isPrimary ? "#eef1e6" : isSecondary ? "#fbf3ea" : "#f7f3ea",
                  border: isPrimary
                    ? "1.5px solid #6b7a4f"
                    : isSecondary
                      ? "1.5px dashed #b8734f"
                      : "1px solid rgba(74,89,64,.12)",
                  padding: "18px 24px",
                  borderRadius: "16px",
                  fontSize: "15px",
                  fontFamily: "inherit",
                  color: "#28331f",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <span>{opt.label}</span>
                {(isPrimary || isSecondary) && (
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "12px",
                      padding: "3px 12px",
                      borderRadius: "100px",
                      background: isPrimary ? "#6b7a4f" : "#b8734f",
                      color: "#fff",
                    }}
                  >
                    {isPrimary ? "最像我" : "也有点像"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={!canNext}
          style={{
            background: canNext ? "#2f3b26" : "#a8a48c",
            color: "#fbf8f0",
            border: "none",
            padding: "15px 40px",
            borderRadius: "100px",
            fontSize: "15px",
            letterSpacing: "1px",
            cursor: canNext ? "pointer" : "default",
            fontFamily: "inherit",
            marginBottom: "28px",
          }}
        >
          {isLast ? "查看结果" : "下一题 →"}
        </button>

        {currentStep > 0 && (
          <div>
            <button
              onClick={handlePrev}
              style={{ background: "none", border: "none", color: "#8a7a5c", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", padding: 0 }}
            >
              ← 上一题
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
