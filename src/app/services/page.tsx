"use client";

import { useEffect } from "react";

// 舊的「專屬服務」表單頁（以前靠寄 email 送出）。現在統一用首頁的預約諮詢表單，
// 保留這個網址只是避免舊連結 404，直接導回首頁的諮詢區塊。
export default function ServicesRedirect() {
  useEffect(() => {
    window.location.replace("/#consult");
  }, []);
  return null;
}
