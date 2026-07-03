// components/TextConverter.tsx
"use client";

import { useEffect, useState } from "react";
import * as OpenCC from "opencc-js";

// 轉換器建立成本高（需載入整套字典），整個 App 共用同一個 instance，
// 避免每個 <T> 元件各自重建造成頁面卡頓
let sharedConverter: ((text: string) => string) | null = null;
function getConverter() {
  if (!sharedConverter) {
    sharedConverter = OpenCC.Converter({ from: "tw", to: "cn" });
  }
  return sharedConverter;
}

export function T({ children }: { children: React.ReactNode }) {
  const [convertedText, setConvertedText] = useState<React.ReactNode>(children);

  useEffect(() => {
    const converter = getConverter();

    // 處理 children (如果是字串則轉換)
    const convert = (node: React.ReactNode): React.ReactNode => {
      if (typeof node === "string") {
        return converter(node);
      }
      // 如果 children 是陣列或物件，這裡可以進一步處理
      return node;
    };

    setConvertedText(convert(children));
  }, [children]);

  return <>{convertedText}</>;
}
