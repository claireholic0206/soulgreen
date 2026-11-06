"use client";

import { useEffect } from "react";

// 旧的购物车结帐页（以前靠寄 email 送出清单）。现在改成在首页的预约咨询表单确认清单，
// 保留这个网址只是避免旧连结 404，直接导回首页的咨询区块。
export default function CartRedirect() {
  useEffect(() => {
    window.location.replace("/#consult");
  }, []);
  return null;
}
