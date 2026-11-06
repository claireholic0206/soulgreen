"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [status, setStatus] = useState("连线中...");

  useEffect(() => {
    async function checkConnection() {
      // 试着捞出 products 表的一笔资料
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(1);

      if (error) {
        setStatus("连线失败: " + error.message);
        console.error(error);
      } else {
        setStatus("连线成功！已取得资料: " + JSON.stringify(data));
      }
    }
    checkConnection();
  }, []);

  return <div>测试结果：{status}</div>;
}
