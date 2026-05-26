// components/TextConverter.tsx
"use client";

import { useEffect, useState } from "react";
import * as OpenCC from "opencc-js";

export function T({ children }: { children: React.ReactNode }) {
  const [convertedText, setConvertedText] = useState<React.ReactNode>(children);

  useEffect(() => {
    // 建立繁轉簡的轉換器
    const converter = OpenCC.Converter({ from: "tw", to: "cn" });

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
