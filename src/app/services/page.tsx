"use client";

import { useState } from "react";
import { T } from "@/components/TextConverter";

export default function ConsultationForm() {
  const sectionClass =
    "bg-white p-8 rounded-2xl border border-stone-100 shadow-sm";
  const labelClass =
    "block text-xs font-bold text-[#2D4232] mb-3 uppercase tracking-wider after:content-['*'] after:ml-1 after:text-red-500";
  const inputClass =
    "w-full p-4 bg-[#FDFBF7] border border-stone-200 rounded-lg focus:ring-1 focus:ring-[#2D4232] outline-none transition";

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <form
        action="https://formspree.io/f/xdajlpak"
        method="POST"
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
                name="name"
                required
                className={inputClass}
                placeholder="Nickname"
              />
            </div>
            <div>
              <label className={labelClass}>
                <T>WeChat ID</T>
              </label>
              <input
                name="wechat"
                required
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
                  name="energy"
                  value={item}
                  required
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
                  name="concerns"
                  value={item}
                  className="mr-3 accent-[#2D4232]"
                />{" "}
                <T>{item}</T>
              </label>
            ))}
          </div>
          <textarea
            name="symptoms"
            required
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
                  name="chakra_test"
                  value="yes"
                  required
                  className="mr-2 accent-[#2D4232]"
                />{" "}
                <T>愿意</T>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="chakra_test"
                  value="no"
                  required
                  className="mr-2 accent-[#2D4232]"
                />{" "}
                <T>暂时不用</T>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-16 py-4 bg-[#2D4232] text-white rounded-full font-medium hover:bg-[#1e2e22] transition-all shadow-md text-sm tracking-widest uppercase"
          >
            <T>发送咨询需求</T>
          </button>
        </div>
      </form>
    </main>
  );
}
