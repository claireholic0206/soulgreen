# 問卷邏輯備份 - Soulgreen Ayurveda Quiz

備份日期：2026-07-27
用途：保留原有的 Prakriti/Vikriti 計算邏輯，以便簡化問卷時參考

## 核心邏輯說明

### 計分系統
- **Prakriti（基線體質）**：Q1-Q6，每題選一個選項
  - 統計每個 dosha (V/P/K) 被選中的次數
  - 最多的 dosha 即為使用者的基線體質

- **Vikriti（當前失衡狀態）**：Q7-Q16
  - Q7（消化狀態）：權重 2 倍
  - Q8（身體狀態）：多選題，每個選中選項 +1
  - Q9-Q16：各單選題，每題 +1
  - 最高分的 dosha 即為當前失衡狀態

### 計算邏輯（src/app/quiz/page.tsx 中的 calcResult 函數）

```typescript
const calcResult = () => {
  // 1. 計算 Prakriti (Q1-6)
  const prakrutiTotals: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };
  for (let i = 1; i <= 6; i++) {
    const answer = prakritiAnswers[i];
    if (answer && answer !== "N") {
      prakrutiTotals[answer] += 1;
    }
  }
  // 取最多的那個作為 Prakriti
  const prakrutiDoshas = Object.entries(prakrutiTotals).sort((a, b) => b[1] - a[1]);
  setPrakruti((prakrutiDoshas[0][0] as DoshaKey) || "V");

  // 2. 計算 Vikriti (Q7-16)
  const vikrutiTotals: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };
  
  // Q7 權重 2 倍
  const agni = vikrutiAnswers[7];
  if (agni && agni !== "N") {
    vikrutiTotals[agni as DoshaKey] += 2;
  }

  // Q8 多選題
  const ama8 = vikrutiAnswers[8];
  if (Array.isArray(ama8)) {
    ama8.forEach((idx) => {
      const dosha = quizQuestions[8].options[idx].dosha;
      if (dosha && dosha !== "N") {
        vikrutiTotals[dosha as DoshaKey] += 1;
      }
    });
  }

  // Q9-Q16 單選題
  for (let i = 9; i <= 16; i++) {
    const answer = vikrutiAnswers[i];
    if (answer && answer !== "N") {
      vikrutiTotals[answer as DoshaKey] += 1;
    }
  }

  // 取最多的那個作為 Vikriti
  const vikrutiDoshas = Object.entries(vikrutiTotals).sort((a, b) => b[1] - a[1]);
  const resultVikriti = (vikrutiDoshas[0][0] as DoshaKey) || "V";
  setVikriti(resultVikriti);
  setStage("result");
};
```

## 當前問卷結構 (16 題)

### 第一部分：Prakriti（6 題）
- Q1：骨架與體格 (V/P/K)
- Q2：皮膚特質 (V/P/K)
- Q3：長期消化模式 (V/P/K)
- Q4：精力與活動風格 (V/P/K)
- Q5：記憶與思考方式 (V/P/K)
- Q6：長期情緒傾向 (V/P/K)

### 第二部分：Vikriti（10 題）
- Q7：消化狀態 (P/K/V/P) - 權重 2 倍
- Q8：身體經常感受到的狀態 (K/P/P/V/K) - 多選題
- Q9：焦慮不安 (V/N)
- Q10：排便問題 (V/N)
- Q11：易怒急躁 (P/N)
- Q12：皮膚問題 (P/N)
- Q13：動力不足 (K/N)
- Q14：體重增加 (K/N)
- Q15：睡眠品質 (V/P/K/N)
- Q16：環境敏感 (V/N)

## 結果呈現

三個 Dosha 的詳細資訊（DOSHA_DETAIL）包含：
- name, series, essence, core, mechanism
- bodySigns, mindSigns
- diet, lifestyle, exercise
- foods, oils, imbalanceSigns
- energyText（能量傾向說明）
- productsText（為你推薦）
- ritual（建議的自我照顧儀式）
- vikrutiDescription（結果頁上方的描述文案）

## 簡化建議

如果要簡化問卷，可以考慮：
1. **減少題數**：保留 Q1-6（Prakriti）+ 核心的 Vikriti 題目
2. **修改結構**：改為只計算當前狀態（Vikriti），不分 Prakriti
3. **簡化選項**：減少每題的選項數量
4. **改變權重**：調整 Q7 的權重或 Q8 的計分方式

**計算邏輯會保持一致**，只需要修改 `quizQuestions` 陣列和計分的迴圈範圍即可。
