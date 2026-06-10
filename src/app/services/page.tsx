"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { T } from "@/components/TextConverter";

export default function ConsultationForm() {
  const [stage, setStage] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    from_name: "",
    wechat_id: "",
    energy_level: "",
    healing_goals: [] as string[],
    additional_notes: "",
    chakra_detection: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = "template_azxgpe8";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const sectionClass =
    "bg-white p-8 rounded-2xl border border-stone-100 shadow-sm";
  const labelClass =
    "block text-xs font-bold text-[#2D4232] mb-3 uppercase tracking-wider after:content-['*'] after:ml-1 after:text-red-500";
  const inputClass =
    "w-full p-4 bg-[#FDFBF7] border border-stone-200 rounded-lg focus:ring-1 focus:ring-[#2D4232] outline-none transition";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        healing_goals: (e.target as HTMLInputElement).checked
          ? [...prev.healing_goals, value]
          : prev.healing_goals.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.from_name ||
      !formData.wechat_id ||
      !formData.energy_level ||
      formData.healing_goals.length === 0 ||
      !formData.additional_notes ||
      !formData.chakra_detection
    ) {
      setErrorMsg("請填寫所有必填項目");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name,
          wechat_id: formData.wechat_id,
          energy_level: formData.energy_level,
          healing_goals: formData.healing_goals.join("、"),
          additional_notes: formData.additional_notes,
          chakra_detection:
            formData.chakra_detection === "yes" ? "愿意" : "暂时不用",
        },
        publicKey
      );
      setStage("success");
    } catch (error) {
      setErrorMsg("提交失败，请稍后重试");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (stage === "success") {
    return (
      <main className="min-h-screen bg-[#FDFBF7] py-24 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="text-3xl font-serif text-[#2D4232] mb-4">
            <T>感谢您的信任</T>
          </h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            <T>
              您的咨询需求已收到，我将在 3-5
              个工作日内与您联系，为您量身规划专属的植物配方方案。
            </T>
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-3 bg-[#2D4232] text-white rounded-full hover:bg-[#3D5A45] transition-all"
          >
            <T>返回产品页</T>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* 標題與引導文案 */}
        <header className="text-center mb-12">
          <h2 className="text-3xl font-serif text-[#2D4232] mb-8 tracking-tight">
            <T>Soulgreen 个案咨询</T>
          </h2>

          <div className="space-y-6 text-stone-600 text-sm font-light leading-relaxed max-w-lg mx-auto bg-white/50 p-8 rounded-2xl border border-stone-100">
            <p>
              <T>
                不论是为忙碌的自己寻求安顿，或是为挚爱的家人寻求温和的支持，我将透过这份咨询，深入倾听您的需求，为您量身规划守护全家人的植物配方。
              </T>
            </p>
            <p className="font-medium text-[#2D4232]">
              <T>您的信任，是我们开启疗愈之旅的第一步。</T>
            </p>
          </div>
        </header>

        {/* 區塊 1：基本資料 */}
        <div className={sectionClass}>
          <h3 className="text-lg font-serif text-[#2D4232] mb-6">
            <T>关于您与家人</T>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>
                <T>您的称呼</T>
              </label>
              <input
                name="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Nickname"
              />
            </div>
            <div>
              <label className={labelClass}>
                <T>WeChat ID</T>
              </label>
              <input
                name="wechat_id"
                value={formData.wechat_id}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="ID"
              />
            </div>
          </div>
        </div>

        {/* 區塊 2：體質與能量 */}
        <div className={sectionClass}>
          <h3 className="text-lg font-serif text-[#2D4232] mb-6">
            <T>体质与能量倾向</T>
          </h3>
          <label className={labelClass}>
            <T>您日常的身心能量感受通常是？</T>
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "容易疲倦，晨间难以启动",
              "波动较大，午后易枯竭",
              "规律稳定，保有活力",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center p-4 border border-stone-200 rounded-lg cursor-pointer hover:border-[#2D4232] transition text-sm text-stone-600"
              >
                <input
                  type="radio"
                  name="energy_level"
                  value={item}
                  checked={formData.energy_level === item}
                  onChange={handleInputChange}
                  className="mr-3 accent-[#2D4232]"
                />{" "}
                <T>{item}</T>
              </label>
            ))}
          </div>
        </div>

        {/* 區塊 3：核心需求 */}
        <div className={sectionClass}>
          <h3 className="text-lg font-serif text-[#2D4232] mb-6">
            <T>疗愈目标</T>
          </h3>
          <label className={labelClass}>
            <T>最想呵护的身心状态 (可复选)</T>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {[
              "呼吸道不适",
              "睡眠品质差",
              "情绪压力管理",
              "肌肤过敏修护",
              "经期困扰调理",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition text-sm text-stone-600"
              >
                <input
                  type="checkbox"
                  name="healing_goals"
                  value={item}
                  checked={formData.healing_goals.includes(item)}
                  onChange={handleInputChange}
                  className="mr-3 accent-[#2D4232]"
                />{" "}
                <T>{item}</T>
              </label>
            ))}
          </div>
          <textarea
            name="additional_notes"
            value={formData.additional_notes}
            onChange={handleInputChange}
            placeholder="Please describe your needs..."
            className={inputClass + " h-32"}
          />
        </div>

        {/* 操作區 */}
        <div className="flex flex-col items-center gap-8 py-4">
          <div className="text-center">
            <p className="text-xs text-stone-500 mb-4">
              <T>是否加入脉轮检测，以辅助规划心灵滋养配方？</T>
            </p>
            <div className="flex gap-8 justify-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="chakra_detection"
                  value="yes"
                  checked={formData.chakra_detection === "yes"}
                  onChange={handleInputChange}
                  className="mr-2 accent-[#2D4232]"
                />{" "}
                <T>愿意</T>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="chakra_detection"
                  value="no"
                  checked={formData.chakra_detection === "no"}
                  onChange={handleInputChange}
                  className="mr-2 accent-[#2D4232]"
                />{" "}
                <T>暂时不用</T>
              </label>
            </div>
          </div>

          {status === "error" && (
            <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full md:w-auto px-16 py-4 bg-[#2D4232] text-white rounded-full font-medium hover:bg-[#1e2e22] transition-all shadow-md text-sm tracking-widest uppercase disabled:opacity-50"
          >
            <T>{status === "sending" ? "发送中..." : "发送咨询需求"}</T>
          </button>
        </div>
      </form>
    </main>
  );
}
