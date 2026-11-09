import type { Metadata } from "next";
import NewsTopBar from "@/components/NewsTopBar";

// 个案初谈问卷的独立入口：不放在首页与导览列，只发给要做个案的人。
// 目前问卷放在飞书。之后如果换成自己做的表单，只要改这个页面，发给客人的网址不用变。
const INTAKE_FORM_URL = "https://ocnvrguusm8c.feishu.cn/share/base/webpage/shrcn0pbnmMZYDADeCfUALFeOCf";

export const metadata: Metadata = {
  title: "芳疗个案初谈问卷 | Soulgreen",
  robots: { index: false, follow: false },
};

export default function IntakePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ea", color: "#28331f", fontFamily: "'Noto Sans SC', sans-serif" }}>
      <NewsTopBar />
      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 6vw 120px", textAlign: "center" }}>
        <div style={{ fontSize: "13px", letterSpacing: "4px", color: "#b8734f", marginBottom: "16px", fontWeight: 600 }}>
          AROMATHERAPY CONSULTATION
        </div>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 600, margin: "0 0 20px" }}>
          芳疗个案初谈问卷
        </h1>
        <p style={{ fontSize: "15px", color: "#5c6650", fontWeight: 300, lineHeight: 1.9, margin: "0 0 12px" }}>
          这份问卷是为了了解你目前的身体、情绪、生活状态与香气偏好，帮助芳疗师更全面地了解你的需求。
        </p>
        <p style={{ fontSize: "14px", color: "#8a7a5c", fontWeight: 300, margin: "0 0 36px" }}>
          预计填写时间 8–10 分钟 · 本问卷不作为医疗诊断或治疗依据
        </p>
        <a
          href={INTAKE_FORM_URL}
          style={{ display: "inline-block", background: "#2f3b26", color: "#fbf8f0", padding: "16px 44px", borderRadius: "100px", fontSize: "15px", letterSpacing: "1px" }}
        >
          开始填写
        </a>
      </main>
    </div>
  );
}
