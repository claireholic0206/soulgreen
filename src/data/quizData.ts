// src/data/quizData.ts
export type DoshaKey = "V" | "P" | "K";
export type OptionDosha = DoshaKey | "N";

export interface QuizOption {
  label: string;
  sub?: string;
  dosha: OptionDosha;
}

export interface Question {
  id: number;
  section: 1 | 2;
  type?: "single" | "multi" | "rank";
  multi?: boolean;
  title: string;
  note?: string;
  options: QuizOption[];
}

export const SECTION_META = {
  1: { tag: "第一部分", title: "基礎體質 · Prakriti" },
  2: { tag: "第二部分", title: "當下狀態 · Vikriti" },
} as const;

export const quizQuestions: Question[] = [
  // ── PART A：基礎體質 Prakriti（Q1-10）──────────────────────────────────

  {
    id: 1,
    section: 1,
    type: "rank",
    title: "Q1：體型偏向",
    options: [
      { dosha: "V", label: "纖細、骨架明顯、不易增重" },
      { dosha: "P", label: "中等體格、肌肉結實、體重適中" },
      { dosha: "K", label: "骨架較大、身型豐潤、容易增重" },
    ],
  },
  {
    id: 2,
    section: 1,
    type: "rank",
    title: "Q2：皮膚特質",
    options: [
      { dosha: "V", label: "偏乾、容易粗糙、不易長痘" },
      { dosha: "P", label: "溫暖、容易出油、易長痘或有雀斑" },
      { dosha: "K", label: "光滑濕潤、毛孔細緻、較厚實" },
    ],
  },
  {
    id: 3,
    section: 1,
    type: "rank",
    title: "Q3：頭髮質地",
    options: [
      { dosha: "V", label: "乾燥粗糙、偏少或偏細" },
      { dosha: "P", label: "柔順有光澤、髮量適中、易白易禿" },
      { dosha: "K", label: "厚實有光澤、髮量多、波浪或捲曲" },
    ],
  },
  {
    id: 4,
    section: 1,
    type: "rank",
    title: "Q4：消化",
    options: [
      { dosha: "V", label: "容易脹氣、便秘、消化不規律" },
      { dosha: "P", label: "消化能力強、易胃酸、有時腹瀉" },
      { dosha: "K", label: "消化慢、飽足感持久、代謝較慢" },
    ],
  },
  {
    id: 5,
    section: 1,
    type: "rank",
    title: "Q5：思考方式",
    options: [
      { dosha: "V", label: "快速、靈活、易分散、難專注" },
      { dosha: "P", label: "專注邏輯強、完美主義、堅持己見" },
      { dosha: "K", label: "穩定、決策慢、記憶好、傾向依賴" },
    ],
  },
  {
    id: 6,
    section: 1,
    type: "rank",
    title: "Q6：情緒特質",
    options: [
      { dosha: "V", label: "變化快、易焦慮或恐懼、難以穩定" },
      { dosha: "P", label: "強烈直接、易被激怒、快速平復" },
      { dosha: "K", label: "穩定平和、不易波動、很少極端情緒" },
    ],
  },
  {
    id: 7,
    section: 1,
    type: "rank",
    title: "Q7：體溫調節",
    options: [
      { dosha: "V", label: "經常覺得冷、特別是手腳" },
      { dosha: "P", label: "經常覺得熱、容易出汗或燥熱" },
      { dosha: "K", label: "體溫適中、身體可能感覺沈重" },
    ],
  },
  {
    id: 8,
    section: 1,
    type: "rank",
    title: "Q8：睡眠",
    options: [
      { dosha: "V", label: "淺眠、容易醒、失眠或多夢" },
      { dosha: "P", label: "品質中等、規律、醒後迅速清醒" },
      { dosha: "K", label: "深沈、需要長時間、起床困難" },
    ],
  },
  {
    id: 9,
    section: 1,
    type: "rank",
    title: "Q9：溝通風格",
    options: [
      { dosha: "V", label: "語速快、話多、容易跳題" },
      { dosha: "P", label: "清晰直接、有條理、喜歡辯論" },
      { dosha: "K", label: "語速緩慢、深思後開口、話不多" },
    ],
  },
  {
    id: 10,
    section: 1,
    type: "rank",
    title: "Q10：面對變化",
    options: [
      { dosha: "V", label: "喜歡變化、容易適應、容易不安" },
      { dosha: "P", label: "想要主導、需要控制、因變化焦躁" },
      { dosha: "K", label: "抗拒變化、喜歡穩定、需要時間調整" },
    ],
  },

  // ── PART B：當下狀態 Vikriti（Q11-15）──────────────────────────────────

  {
    id: 11,
    section: 2,
    type: "rank",
    title: "Q11：消化與排便（當下）",
    options: [
      { dosha: "V", label: "容易脹氣、便秘、消化不規律" },
      { dosha: "P", label: "消化能力強、有胃酸、胃灼熱或腹瀉" },
      { dosha: "K", label: "消化慢、飯後昏沉、體重增加" },
    ],
  },
  {
    id: 12,
    section: 2,
    type: "rank",
    title: "Q12：主要情緒（當下）",
    options: [
      { dosha: "V", label: "焦慮、不安、恐懼、思緒混亂" },
      { dosha: "P", label: "易怒、烦躁、批判、看什麼都不順眼" },
      { dosha: "K", label: "倦怠、提不起勁、情緒低落" },
    ],
  },
  {
    id: 13,
    section: 2,
    type: "rank",
    title: "Q13：睡眠狀況（當下）",
    options: [
      { dosha: "V", label: "睡眠不穩、容易夜醒、多夢、難入睡" },
      { dosha: "P", label: "無法放鬆、淺眠易醒、凌晨驚醒" },
      { dosha: "K", label: "睡眠過多卻疲倦、難起床、白天打瞌睡" },
    ],
  },
  {
    id: 14,
    section: 2,
    type: "rank",
    title: "Q14：壓力反應（當下）",
    options: [
      { dosha: "V", label: "精力起伏、易疲倦、神經緊繃、焦慮" },
      { dosha: "P", label: "無法休息、總是忙碌、過熱、急躁" },
      { dosha: "K", label: "難以啟動、動力不足、沉重、遲鈍" },
    ],
  },
  {
    id: 15,
    section: 2,
    type: "rank",
    title: "Q15：能量與動力（當下）",
    options: [
      { dosha: "V", label: "不穩定、一下活躍一下疲倦、難恢復" },
      { dosha: "P", label: "精力充沛或容易燃燒過度、無法放鬆" },
      { dosha: "K", label: "穩定持久、啟動困難、缺乏動力" },
    ],
  },
];

// ── 體質說明 ──────────────────────────────────────────────────────
export const DOSHA_DETAIL: Record<
  DoshaKey,
  {
    name: string;
    series: string;
    essence: string;
    advice: string;
    oils: string;
    imbalanceSigns: string[];
    products: { icon: string; name: string; desc: string; tag: string }[];
  }
> = {
  V: {
    name: "Vata 風型",
    series: "大地根植系列 · Grounding",
    essence:
      "風與空的能量，代表著變動、輕盈與創造力。你的心靈像風一樣靈活，充滿靈感，但也容易分散與焦慮。",
    advice:
      "回歸大地，找回穩定感。透過溫暖香氣建立日常儀式，讓浮動的心靈落地，給神經系統真正的休息。",
    oils: "廣藿香 · 薑 · 甜橙 · 岩蘭草 · 乳香",
    imbalanceSigns: [
      "焦慮失眠",
      "皮膚乾燥",
      "脹氣便秘",
      "末梢冰冷",
      "思緒散亂",
    ],
    products: [
      {
        icon: "🌿",
        name: "扎根平衡按摩油",
        desc: "以廣藿香、薑、岩蘭草為核心，溫暖定錨，穩定風型神經系統，緩解焦慮與末梢冰冷",
        tag: "Grounding Body Oil · 舒緩焦慮 · 暖身",
      },
      {
        icon: "🫙",
        name: "暖身滋養潤膚膏",
        desc: "乳木果與甜杏仁油深度滋潤乾燥肌膚，乳香與甜橙香氣安撫緊繃的神經末梢",
        tag: "Warming Body Butter · 保濕 · 定神",
      },
      {
        icon: "💨",
        name: "安眠舒緩噴霧",
        desc: "真正薰衣草、羅馬洋甘菊、佛手柑的黃金比例，睡前噴於枕頭與頸部，引導深層放鬆",
        tag: "Deep Sleep Mist · 助眠 · 放鬆",
      },
    ],
  },
  P: {
    name: "Pitta 火型",
    series: "清涼舒壓系列 · Soothing",
    essence:
      "火的能量，代表著轉化、熱情、智慧與精準執行力。你天生目標導向，但失衡時容易燃燒過度、急躁發炎。",
    advice:
      "適度降溫，給心靈留白。透過清涼香氣撫平內在的火焰，在高效中保持滋養與平靜。",
    oils: "薄荷 · 玫瑰 · 檀香 · 茉莉 · 德國洋甘菊",
    imbalanceSigns: [
      "皮膚發炎",
      "胃酸過多",
      "急躁易怒",
      "過熱出汗",
      "完美主義",
    ],
    products: [
      {
        icon: "🌊",
        name: "清涼舒緩精油",
        desc: "薄荷與德國洋甘菊的組合，快速降溫，平撫火型的急躁感，帶來冷靜與清晰",
        tag: "Cooling Essential Oil · 降火 · 清涼",
      },
      {
        icon: "🌹",
        name: "玫瑰舒心香膏",
        desc: "玫瑰精油搭配檀香與茉莉，滋養敏感肌膚，撫平情緒，帶來柔和的寧靜",
        tag: "Rose Heart Balm · 舒心 · 滋潤",
      },
      {
        icon: "❄️",
        name: "夜間冷靜噴霧",
        desc: "洋甘菊與薄荷的降火組合，幫助火型在晚間放下控制，進入深度休息",
        tag: "Cooling Night Mist · 放鬆 · 助眠",
      },
    ],
  },
  K: {
    name: "Kapha 土水型",
    series: "喚醒活力系列 · Activating",
    essence:
      "土與水的能量，代表著穩定、包容與深厚的耐心。你值得信賴，但失衡時容易陷入停滯與遲鈍。",
    advice:
      "喚醒內在動力，重拾熱情。透過溫暖、辛香的香氣激活能量，打破慣性，重新啟動生活。",
    oils: "薑 · 肉桂 · 黑胡椒 · 檸檬 · 尤加利",
    imbalanceSigns: [
      "身體沉重",
      "消化遲緩",
      "情緒低落",
      "缺乏動力",
      "水腫浮腫",
    ],
    products: [
      {
        icon: "🔥",
        name: "啟動活力精油",
        desc: "薑、肉桂、黑胡椒的辛香組合，快速溫暖，喚醒土水型的內在動力，打破停滯感",
        tag: "Activating Essential Oil · 溫暖 · 提神",
      },
      {
        icon: "🍋",
        name: "清新檸檬按摩油",
        desc: "檸檬與尤加利的清新活力，促進循環，舒緩身體沉重感，帶來輕盈感受",
        tag: "Energizing Body Oil · 提振 · 輕盈",
      },
      {
        icon: "⚡",
        name: "晨間喚醒噴霧",
        desc: "黑胡椒與檸檬的刺激香氣，早晨一噴立即清醒，幫助土水型快速進入行動模式",
        tag: "Morning Activation Mist · 提神 · 啟動",
      },
    ],
  },
};
