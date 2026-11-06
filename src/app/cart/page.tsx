"use client";

import { useEffect } from "react";

// 舊的購物車結帳頁（以前靠寄 email 送出清單）。現在改成在首頁的預約諮詢表單確認清單，
// 保留這個網址只是避免舊連結 404，直接導回首頁的諮詢區塊。
export default function CartRedirect() {
  useEffect(() => {
    window.location.replace("/#consult");
  }, []);
  return null;
}
