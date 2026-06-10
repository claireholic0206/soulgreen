// src/data/quizData.ts
export type DoshaKey = "V" | "P" | "K";
export type OptionDosha = DoshaKey | "N"; // N = 跳過，不計分

export interface QuizOption {
  label: string;
  sub?: string;
  dosha: OptionDosha;
}

export interface Question {
  id: number;
  section: 1 | 2 | 3 | 4;
  multi?: boolean;
  title: string;
  note?: string;
  options: QuizOption[];
}

export const SECTION_META = {
  1: { tag: "第一部分", title: "先天體質 · Prakriti" },
  2: { tag: "第二部分", title: "當下狀態 · Vikriti" },
  3: { tag: "第三部分", title: "身體信號" },
  4: { tag: "第四部分", title: "情緒與心理" },
} as const;

export const quizQuestions: Question[] = [
  // ── SECTION 1：先天體質 Prakriti ──────────────────────────────────
  {
    id: 1,
    section: 1,
    title: "你的體型偏向？",
    options: [
      { dosha: "V", label: "偏瘦、難增重", sub: "骨架小、關節明顯" },
      { dosha: "P", label: "中等勻稱", sub: "肌肉明顯、身材比例好" },
      { dosha: "K", label: "偏豐腴、易增重", sub: "體格厚實、難減重" },
    ],
  },
  {
    id: 2,
    section: 1,
    title: "你的皮膚天生特質？",
    options: [
      { dosha: "V", label: "偏乾、易起皮", sub: "粗糙、冬天特別明顯" },
      { dosha: "P", label: "容易出油、發紅", sub: "敏感、毛孔明顯" },
      { dosha: "K", label: "偏油但光滑", sub: "水潤、不易乾燥" },
    ],
  },
  {
    id: 3,
    section: 1,
    title: "你的頭髮質地？",
    options: [
      { dosha: "V", label: "細軟、捲曲易斷", sub: "易打結、容易乾燥" },
      { dosha: "P", label: "中等、偏軟", sub: "容易出油、早生白髮" },
      { dosha: "K", label: "粗硬豐厚", sub: "烏黑濃密、生長緩慢" },
    ],
  },
  {
    id: 4,
    section: 1,
    title: "你的消化狀況天生傾向？",
    options: [
      { dosha: "V", label: "不規律、容易脹氣", sub: "食慾忽大忽小" },
      { dosha: "P", label: "旺盛、容易饑餓", sub: "不吃飯就煩躁" },
      { dosha: "K", label: "穩定但消化慢", sub: "飽足感持久、不太餓" },
    ],
  },
  {
    id: 5,
    section: 1,
    title: "你的睡眠模式？",
    options: [
      { dosha: "V", label: "淺眠、難入睡、多夢", sub: "睡眠需求少但常感疲憊" },
      { dosha: "P", label: "入睡快、睡眠中等", sub: "有時會因思緒中斷" },
      { dosha: "K", label: "深沉、難叫醒", sub: "睡眠需求多、起床困難" },
    ],
  },

  // ── SECTION 2：當下狀態 Vikriti ──────────────────────────────────
  {
    id: 6,
    section: 2,
    title: "最近幾週，你的能量狀態？",
    note: "這部分反映你當下的狀態，可能與先天體質不同",
    options: [
      { dosha: "V", label: "散亂、不穩定", sub: "一陣興奮一陣疲憊" },
      { dosha: "P", label: "緊繃、過度燃燒", sub: "高效但容易上火" },
      { dosha: "K", label: "沉重、停滯感", sub: "動力不足、賴床" },
    ],
  },
  {
    id: 7,
    section: 2,
    title: "近期皮膚出現什麼狀況？",
    options: [
      { dosha: "V", label: "乾燥、脫皮、膚色暗沉" },
      { dosha: "P", label: "發紅、冒痘、油光明顯" },
      { dosha: "K", label: "浮腫、毛孔堵塞" },
    ],
  },
  {
    id: 8,
    section: 2,
    title: "近期消化狀況？",
    options: [
      { dosha: "V", label: "脹氣、便秘、腸鳴" },
      { dosha: "P", label: "胃酸過多、排便急促" },
      { dosha: "K", label: "消化遲緩、噁心感" },
    ],
  },
  {
    id: 9,
    section: 2,
    title: "對氣候的近期反應？",
    options: [
      { dosha: "V", label: "特別怕冷、怕風", sub: "末梢冰冷" },
      { dosha: "P", label: "特別怕熱", sub: "流汗多、容易燥熱" },
      { dosha: "K", label: "感覺沉重、不喜濕冷" },
    ],
  },
  {
    id: 10,
    section: 2,
    multi: true,
    title: "目前有哪些身體困擾？（可複選）",
    options: [
      { dosha: "V", label: "關節疼痛或僵硬" },
      { dosha: "P", label: "頭痛或偏頭痛" },
      { dosha: "K", label: "水腫或體重增加" },
      { dosha: "V", label: "失眠或睡眠障礙" },
      { dosha: "P", label: "皮膚發炎、濕疹" },
      { dosha: "K", label: "鼻塞或痰多" },
    ],
  },

  // ── SECTION 3：身體信號 ───────────────────────────────────────────
  {
    id: 11,
    section: 3,
    title: "你的口渴感與飲水習慣？",
    options: [
      { dosha: "V", label: "容易忘記喝水、口腔偏乾", sub: "嘴唇容易乾裂" },
      { dosha: "P", label: "經常口渴、喜歡冷飲", sub: "流汗多、補水需求高" },
      { dosha: "K", label: "很少感到口渴", sub: "即使不喝水也不太有感覺" },
    ],
  },
  {
    id: 12,
    section: 3,
    title: "你對壓力的身體反應？",
    options: [
      { dosha: "V", label: "手腳冰冷、心跳加速", sub: "呼吸急促、脖子緊張" },
      { dosha: "P", label: "胃部灼熱、容易上火", sub: "皮膚發紅、額頭出汗" },
      { dosha: "K", label: "想睡覺、食慾增加", sub: "渴望甜食、感覺麻木" },
    ],
  },
  {
    id: 13,
    section: 3,
    title: "你排便的習慣？",
    options: [
      { dosha: "V", label: "不規律、偏乾硬", sub: "常有便秘困擾" },
      { dosha: "P", label: "偏鬆軟、容易腹瀉", sub: "有時伴隨灼熱感" },
      { dosha: "K", label: "規律但偏黏稠", sub: "消化慢、量多" },
    ],
  },
  {
    id: 14,
    section: 3,
    title: "你的月經週期特質（女性適用）",
    note: "男性或不適用者請選「跳過此題」",
    options: [
      { dosha: "V", label: "不規律、量少、偏痛" },
      { dosha: "P", label: "規律但量多、伴隨燥熱情緒波動" },
      { dosha: "K", label: "規律、水腫感明顯" },
      { dosha: "N", label: "跳過此題" },
    ],
  },
  {
    id: 15,
    section: 3,
    title: "運動後你的感受？",
    options: [
      { dosha: "V", label: "很快疲憊，需要長時間恢復" },
      { dosha: "P", label: "充滿活力，但容易過熱" },
      { dosha: "K", label: "啟動慢但耐力持久" },
    ],
  },
  {
    id: 16,
    section: 3,
    title: "你的說話方式？",
    options: [
      {
        dosha: "V",
        label: "語速快、話多、容易跳躍話題",
        sub: "有時說到一半忘了重點",
      },
      { dosha: "P", label: "清晰直接、有條理", sub: "喜歡辯論、表達有力" },
      {
        dosha: "K",
        label: "語速緩慢、深思後才開口",
        sub: "聲音低沉穩定、話不多但有份量",
      },
    ],
  },

  // ── SECTION 4：情緒與心理 ────────────────────────────────────────
  {
    id: 17,
    section: 4,
    title: "你通常如何回應情緒壓力？",
    options: [
      { dosha: "V", label: "焦慮、擔心、過度思考", sub: "容易感到迷失或恐懼" },
      { dosha: "P", label: "憤怒、批判、急躁", sub: "強烈的挫折感" },
      { dosha: "K", label: "退縮、逃避、難以放下", sub: "依附感強、情緒鬱積" },
    ],
  },
  {
    id: 18,
    section: 4,
    title: "你的思考與學習方式？",
    options: [
      { dosha: "V", label: "快速吸收、容易忘記", sub: "跳躍思考、創意豐富" },
      { dosha: "P", label: "專注、邏輯、目標導向", sub: "完美主義、好辯" },
      { dosha: "K", label: "慢熟但記憶長久", sub: "善於歸納、穩定思考" },
    ],
  },
  {
    id: 19,
    section: 4,
    title: "你如何表達自己的需求？",
    options: [
      { dosha: "V", label: "難以開口、容易自我懷疑" },
      { dosha: "P", label: "直接、果斷，有時過於強硬" },
      { dosha: "K", label: "傾向忍耐，不想衝突" },
    ],
  },
  {
    id: 20,
    section: 4,
    title: "你對香氣的天然偏好？",
    options: [
      { dosha: "V", label: "溫暖辛香、大地感", sub: "薑、肉桂、廣藿香" },
      { dosha: "P", label: "清涼草本、花香", sub: "薄荷、薰衣草、玫瑰" },
      { dosha: "K", label: "清新柑橘、輕盈木質", sub: "佛手柑、尤加利、杜松" },
    ],
  },
  {
    id: 21,
    section: 4,
    title: "當你需要放鬆時，你傾向？",
    options: [
      { dosha: "V", label: "獨處、安靜、避開刺激" },
      { dosha: "P", label: "運動、冷靜下來、解決問題" },
      { dosha: "K", label: "社交、美食、舒適的環境" },
    ],
  },
  {
    id: 22,
    section: 4,
    title: "近三個月整體心理感受？",
    options: [
      { dosha: "V", label: "焦慮、不安、容易分心" },
      { dosha: "P", label: "急躁、易怒、壓力感重" },
      { dosha: "K", label: "倦怠、提不起勁、情緒低落" },
    ],
  },
  {
    id: 23,
    section: 4,
    multi: true,
    title: "你最希望芳療幫助你改善哪方面？（可複選）",
    options: [
      { dosha: "V", label: "穩定神經、減少焦慮", sub: "提升安全感與定錨感" },
      { dosha: "P", label: "降火消炎、情緒降溫", sub: "釋放憤怒、增加清晰度" },
      { dosha: "K", label: "激活代謝、提振活力", sub: "釋放停滯、重燃動力" },
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
        name: "降火複方按摩油",
        desc: "薄荷、玫瑰、檀香精準冷卻過熱體質，舒緩皮膚慢性發炎，安撫急躁情緒",
        tag: "Cooling Body Oil · 降火 · 消炎",
      },
      {
        icon: "🌿",
        name: "清涼頭皮舒緩噴霧",
        desc: "薄荷、茶樹、德國洋甘菊配方，直接噴於頭皮，即時舒緩油膩、敏感與緊繃感",
        tag: "Scalp Relief Mist · 頭皮舒緩 · 清涼",
      },
      {
        icon: "🛁",
        name: "玫瑰清涼浴鹽",
        desc: "玫瑰花瓣與瀉鹽的清涼配方，泡浴時釋放積累的身體熱氣，平復過度激動的神經系統",
        tag: "Rose Cooling Bath Salt · 降溫 · 放鬆",
      },
    ],
  },
  K: {
    name: "Kapha 土水型",
    series: "煥活流動系列 · Energizing",
    essence:
      "地與水的能量，代表著穩定、愛與深厚滋養。你是天生的支柱，但失衡時容易停滯、沉重與抑鬱。",
    advice:
      "喚醒感官，打破沈滯。透過溫熱提振的芳療配方激活內在流動，重燃對生命的熱情。",
    oils: "迷迭香 · 薑 · 黑胡椒 · 尤加利 · 佛手柑",
    imbalanceSigns: [
      "水腫停滯",
      "代謝緩慢",
      "情緒低落",
      "鼻塞痰多",
      "動力不足",
    ],
    products: [
      {
        icon: "🔥",
        name: "排毒淋巴按摩油",
        desc: "杜松漿果、絲柏、黑胡椒激活淋巴循環，消解停滯與水腫，喚醒沉重的土水體質",
        tag: "Detox Lymph Oil · 淋巴排毒 · 消腫",
      },
      {
        icon: "🛁",
        name: "煥活提振浴鹽",
        desc: "迷迭香、薑、葡萄柚配方，泡浴時全面激活循環代謝，驅散身體的沉重與停滯感",
        tag: "Energizing Bath Salt · 提振 · 代謝",
      },
      {
        icon: "☀️",
        name: "晨間活力噴霧",
        desc: "佛手柑、薑黃、甜橙的陽光配方，早晨噴於胸口與手腕，點燃一天的動力與清醒",
        tag: "Morning Boost Mist · 提振精神 · 晨間",
      },
    ],
  },
};
