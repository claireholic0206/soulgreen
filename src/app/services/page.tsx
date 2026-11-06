"use client";

import { useEffect } from "react";

// 旧的「专属服务」表单页（以前靠寄 email 送出）。现在统一用首页的预约咨询表单，
// 保留这个网址只是避免旧连结 404，直接导回首页的咨询区块。
export default function ServicesRedirect() {
  useEffect(() => {
    window.location.replace("/#consult");
  }, []);
  return null;
}
