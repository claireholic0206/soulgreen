"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [status, setStatus] = useState("連線中...");

  useEffect(() => {
    async function checkConnection() {
      // 試著撈出 products 表的一筆資料
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(1);

      if (error) {
        setStatus("連線失敗: " + error.message);
        console.error(error);
      } else {
        setStatus("連線成功！已取得資料: " + JSON.stringify(data));
      }
    }
    checkConnection();
  }, []);

  return <div>測試結果：{status}</div>;
}
