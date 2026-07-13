"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import Image from "next/image";
import { T } from "@/components/TextConverter";
import { useCart } from "@/context/CartContext";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } =
    useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!name.trim() || (!phone.trim() && !email.trim())) {
      setStatus("error");
      setErrorMsg("請填寫姓名，並至少留下電話或 Email 其中一項聯繫方式");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const orderList = items
      .map(
        (item) =>
          `・${item.name}${item.volume ? ` (${item.volume})` : ""} x ${item.quantity}` +
          (item.price != null
            ? ` = ¥${(item.price * item.quantity).toLocaleString()}`
            : ""),
      )
      .join("\n");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMsg("郵件服務尚未設定，請聯繫網站管理員");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          customer_name: name,
          customer_phone: phone,
          customer_email: email,
          customer_note: note,
          order_list: orderList,
          total_price: totalPrice.toLocaleString(),
        },
        { publicKey },
      );
      setStatus("success");
      clearCart();
    } catch {
      setStatus("error");
      setErrorMsg("發送失敗，請稍後再試");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-3xl mb-4">🌿</p>
          <h1 className="font-serif text-2xl text-[#4A5E4D] mb-3">
            <T>已收到您的購物清單</T>
          </h1>
          <p className="text-sm text-[#A09890] mb-8 leading-relaxed">
            <T>我們會盡快與您聯繫確認訂單與付款方式，謝謝您的耐心等候。</T>
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-[#4A5E4D] text-white text-xs tracking-[0.2em] uppercase rounded-md hover:bg-[#2E2E2C] transition-all"
          >
            <T>繼續選購</T>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-serif text-2xl text-[#4A5E4D] mb-6">
          <T>購物清單</T>
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#A09890] mb-4">
              <T>購物車是空的</T>
            </p>
            <Link
              href="/products"
              className="text-xs text-[#4A5E4D] underline"
            >
              <T>前往選購商品</T>
            </Link>
          </div>
        ) : (
          <>
            {/* 購物清單 */}
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white border border-[#E2DDD5] rounded-xl p-3"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#F3F1ED]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">
                        🌿
                      </div>
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-[#4A5E4D] truncate">
                      <T>{item.name}</T>
                    </p>
                    {item.volume && (
                      <p className="text-[10px] text-[#A09890]">
                        {item.volume}
                      </p>
                    )}
                    {item.price != null && (
                      <p className="text-xs text-[#4A5E4D] mt-0.5">
                        ¥ {item.price.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-[#E2DDD5] rounded-md text-[#4A5E4D] hover:bg-[#F3F1ED] transition-colors"
                      aria-label="減少數量"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-[#E2DDD5] rounded-md text-[#4A5E4D] hover:bg-[#F3F1ED] transition-colors"
                      aria-label="增加數量"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-stone-300 hover:text-[#D85A30] transition-colors text-xs ml-2"
                    aria-label="移除"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* 總計 */}
            <div className="flex justify-between items-center border-t border-[#E2DDD5] pt-4 mb-10">
              <span className="text-sm text-[#6E6B66]">
                <T>總計</T>
              </span>
              <span className="text-xl text-[#4A5E4D] font-medium">
                ¥ {totalPrice.toLocaleString()}
              </span>
            </div>

            {/* 聯繫方式表單 */}
            <div className="bg-white border border-[#E2DDD5] rounded-xl p-6">
              <h2 className="font-serif text-lg text-[#4A5E4D] mb-1">
                <T>填寫聯繫方式</T>
              </h2>
              <p className="text-xs text-[#A09890] mb-5">
                <T>提交後我們會以您留下的方式與您聯繫，確認訂單與付款方式</T>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#6E6B66] mb-1.5">
                    <T>姓名</T> *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-[#E2DDD5] rounded-md focus:outline-none focus:border-[#4A5E4D] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#6E6B66] mb-1.5">
                      <T>電話</T>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-[#E2DDD5] rounded-md focus:outline-none focus:border-[#4A5E4D] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E6B66] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-[#E2DDD5] rounded-md focus:outline-none focus:border-[#4A5E4D] transition-colors"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-[#A09890] -mt-2">
                  <T>電話與 Email 請至少填寫一項</T>
                </p>

                <div>
                  <label className="block text-xs text-[#6E6B66] mb-1.5">
                    <T>備註</T>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-[#E2DDD5] rounded-md focus:outline-none focus:border-[#4A5E4D] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-[#D85A30]">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-[#4A5E4D] text-white text-xs tracking-[0.2em] uppercase rounded-md hover:bg-[#2E2E2C] transition-all disabled:opacity-50"
                >
                  <T>{status === "sending" ? "傳送中..." : "送出購物清單"}</T>
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
