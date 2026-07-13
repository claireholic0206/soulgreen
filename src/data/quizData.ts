// src/data/quizData.ts
export type DoshaKey = "V" | "P" | "K";
export type OptionDosha = DoshaKey | "N"; // N = 跳过，不计分

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
  1: { tag: "第一部分", title: "先天体质 · Prakriti" },
  2: { tag: "第二部分", title: "当下状态 · Vikriti" },
  3: { tag: "第三部分", title: "身体信号" },
  4: { tag: "第四部分", title: "情绪与心理" },
} as const;

export const quizQuestions: Question[] = [
  // ── SECTION 1：先天体质 Prakriti ──────────────────────────────────
  {
    id: 1,
    section: 1,
    title: "你的体型偏向？",
    options: [
      { dosha: "V", label: "偏瘦、难增重", sub: "骨架小、关节明显" },
      { dosha: "P", label: "中等匀称", sub: "肌肉明显、身材比例好" },
      { dosha: "K", label: "偏丰腴、易增重", sub: "体格厚实、难减重" },
    ],
  },
  {
    id: 2,
    section: 1,
    title: "你的皮肤天生特质？",
    options: [
      { dosha: "V", label: "偏干、易起皮", sub: "粗糙、冬天特别明显" },
      { dosha: "P", label: "容易出油、发红", sub: "敏感、毛孔明显" },
      { dosha: "K", label: "偏油但光滑", sub: "水润、不易干燥" },
    ],
  },
  {
    id: 3,
    section: 1,
    title: "你的头发质地？",
    options: [
      { dosha: "V", label: "细软、卷曲易断", sub: "易打结、容易干燥" },
      { dosha: "P", label: "中等、偏软", sub: "容易出油、早生白发" },
      { dosha: "K", label: "粗硬丰厚", sub: "乌黑浓密、生长缓慢" },
    ],
  },
  {
    id: 4,
    section: 1,
    title: "你的消化状况天生倾向？",
    options: [
      { dosha: "V", label: "不规律、容易胀气", sub: "食欲忽大忽小" },
      { dosha: "P", label: "旺盛、容易饥饿", sub: "不吃饭就烦躁" },
      { dosha: "K", label: "稳定但消化慢", sub: "饱足感持久、不太饿" },
    ],
  },
  {
    id: 5,
    section: 1,
    title: "你的睡眠模式？",
    options: [
      { dosha: "V", label: "浅眠、难入睡、多梦", sub: "睡眠需求少但常感疲惫" },
      { dosha: "P", label: "入睡快、睡眠中等", sub: "有时会因思绪中断" },
      { dosha: "K", label: "深沉、难叫醒", sub: "睡眠需求多、起床困难" },
    ],
  },

  // ── SECTION 2：当下状态 Vikriti ──────────────────────────────────
  {
    id: 6,
    section: 2,
    title: "最近几周，你的能量状态？",
    note: "这部分反映你当下的状态，可能与先天体质不同",
    options: [
      { dosha: "V", label: "散亂、不稳定", sub: "一阵兴奋一阵疲惫" },
      { dosha: "P", label: "紧绷、过度燃烧", sub: "高效但容易上火" },
      { dosha: "K", label: "沉重、停滞感", sub: "动力不足、赖床" },
    ],
  },
  {
    id: 7,
    section: 2,
    title: "近期皮肤出现什么状况？",
    options: [
      { dosha: "V", label: "干燥、脱皮、肤色暗沉" },
      { dosha: "P", label: "发红、冒痘、油光明显" },
      { dosha: "K", label: "浮肿、毛孔堵塞" },
    ],
  },
  {
    id: 8,
    section: 2,
    title: "近期消化状况？",
    options: [
      { dosha: "V", label: "胀气、便秘、肠鸣" },
      { dosha: "P", label: "胃酸过多、排便急促" },
      { dosha: "K", label: "消化迟缓、恶心感" },
    ],
  },
  {
    id: 9,
    section: 2,
    title: "对气候的近期反应？",
    options: [
      { dosha: "V", label: "特别怕冷、怕风", sub: "末梢冰冷" },
      { dosha: "P", label: "特别怕热", sub: "流汗多、容易燥热" },
      { dosha: "K", label: "感觉沉重、不喜湿冷" },
    ],
  },
  {
    id: 10,
    section: 2,
    multi: true,
    title: "目前有哪些身体困扰？（可复选）",
    options: [
      { dosha: "V", label: "关节疼痛或僵硬" },
      { dosha: "P", label: "头痛或偏头痛" },
      { dosha: "K", label: "水肿或体重增加" },
      { dosha: "V", label: "失眠或睡眠障碍" },
      { dosha: "P", label: "皮肤发炎、湿诊" },
      { dosha: "K", label: "鼻塞或痰多" },
    ],
  },

  // ── SECTION 3：身体信號 ───────────────────────────────────────────
  {
    id: 11,
    section: 3,
    title: "你的口渴感与饮水习惯？",
    options: [
      { dosha: "V", label: "容易忘记喝水、口腔偏干", sub: "嘴唇容易干裂" },
      { dosha: "P", label: "经常口渴、喜欢冷饮", sub: "流汗多、补水需求高" },
      { dosha: "K", label: "很少感到口渴", sub: "即使不喝水也不太有感觉" },
    ],
  },
  {
    id: 12,
    section: 3,
    title: "你对压力的身体反应？",
    options: [
      { dosha: "V", label: "手腳冰冷、心跳加速", sub: "呼吸急促、脖子紧張" },
      { dosha: "P", label: "胃部灼热、容易上火", sub: "皮肤发红、額头出汗" },
      { dosha: "K", label: "想睡觉、食欲增加", sub: "渴望甜食、感觉麻木" },
    ],
  },
  {
    id: 13,
    section: 3,
    title: "你排便的习惯？",
    options: [
      { dosha: "V", label: "不规律、偏干硬", sub: "常有便秘困扰" },
      { dosha: "P", label: "偏松软、容易腹瀉", sub: "有时伴隨灼热感" },
      { dosha: "K", label: "规律但偏黏稠", sub: "消化慢、量多" },
    ],
  },
  {
    id: 14,
    section: 3,
    title: "你的月经周期特质（女性适用）",
    note: "男性或不适用者請选「跳过此题」",
    options: [
      { dosha: "V", label: "不规律、量少、偏痛" },
      { dosha: "P", label: "规律但量多、伴隨燥热情绪波动" },
      { dosha: "K", label: "规律、水肿感明显" },
      { dosha: "N", label: "跳过此题" },
    ],
  },
  {
    id: 15,
    section: 3,
    title: "运动后你的感受？",
    options: [
      { dosha: "V", label: "很快疲惫，需要长时间恢復" },
      { dosha: "P", label: "充滿活力，但容易过热" },
      { dosha: "K", label: "启动慢但耐力持久" },
    ],
  },
  {
    id: 16,
    section: 3,
    title: "你的說話方式？",
    options: [
      {
        dosha: "V",
        label: "語速快、話多、容易跳跃話题",
        sub: "有时說到一半忘了重点",
      },
      { dosha: "P", label: "清晰直接、有條理", sub: "喜欢辩論、表达有力" },
      {
        dosha: "K",
        label: "語速缓慢、深思后才开口",
        sub: "聲音低沉稳定、話不多但有份量",
      },
    ],
  },

  // ── SECTION 4：情绪与心理 ────────────────────────────────────────
  {
    id: 17,
    section: 4,
    title: "你通常如何回应情绪压力？",
    options: [
      { dosha: "V", label: "焦虑、擔心、过度思考", sub: "容易感到迷失或恐懼" },
      { dosha: "P", label: "愤怒、批判、急躁", sub: "强烈的挫折感" },
      { dosha: "K", label: "退縮、逃避、难以放下", sub: "依附感强、情绪鬱積" },
    ],
  },
  {
    id: 18,
    section: 4,
    title: "你的思考与学习方式？",
    options: [
      { dosha: "V", label: "快速吸收、容易忘记", sub: "跳跃思考、创意丰富" },
      { dosha: "P", label: "专注、逻辑、目标导向", sub: "完美主义、好辩" },
      { dosha: "K", label: "慢熟但记忆长久", sub: "善于归纳、稳定思考" },
    ],
  },
  {
    id: 19,
    section: 4,
    title: "你如何表达自己的需求？",
    options: [
      { dosha: "V", label: "难以开口、容易自我怀疑" },
      { dosha: "P", label: "直接、果断，有时过于强硬" },
      { dosha: "K", label: "倾向忍耐，不想冲突" },
    ],
  },
  {
    id: 20,
    section: 4,
    title: "你对香气的天然偏好？",
    options: [
      { dosha: "V", label: "温暖辛香、大地感", sub: "姜、肉桂、广藿香" },
      { dosha: "P", label: "清凉草本、花香", sub: "薄荷、熏衣草、玫瑰" },
      { dosha: "K", label: "清新柑橘、轻盈木质", sub: "佛手柑、尤加利、杜松" },
    ],
  },
  {
    id: 21,
    section: 4,
    title: "当你需要放松时，你倾向？",
    options: [
      { dosha: "V", label: "独处、安静、避开刺激" },
      { dosha: "P", label: "运动、冷静下来、解决问题" },
      { dosha: "K", label: "社交、美食、舒适的环境" },
    ],
  },
  {
    id: 22,
    section: 4,
    title: "近三个月整体心理感受？",
    options: [
      { dosha: "V", label: "焦虑、不安、容易分心" },
      { dosha: "P", label: "急躁、易怒、压力感重" },
      { dosha: "K", label: "倦怠、提不起劲、情绪低落" },
    ],
  },
  {
    id: 23,
    section: 4,
    multi: true,
    title: "你最希望芳疗帮助你改善哪方面？（可复选）",
    options: [
      { dosha: "V", label: "稳定神经、减少焦虑", sub: "提升安全感与定锚感" },
      { dosha: "P", label: "降火消炎、情绪降温", sub: "释放愤怒、增加清晰度" },
      { dosha: "K", label: "激活代谢、提振活力", sub: "释放停滞、重燃动力" },
    ],
  },
];

// ── 体质說明 ──────────────────────────────────────────────────────
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
    name: "Vata 风型",
    series: "大地根植系列 · Grounding",
    essence:
      "风与空的能量，代表著變动、轻盈与创造力。你的心靈像风一樣靈活，充滿靈感，但也容易分散与焦虑。",
    advice:
      "回归大地，找回稳定感。透过温暖香气建立日常儀式，讓浮动的心靈落地，給神经系統真正的休息。",
    oils: "广藿香 · 姜 · 甜橙 · 岩蘭草 · 乳香",
    imbalanceSigns: [
      "焦虑失眠",
      "皮肤干燥",
      "胀气便秘",
      "末梢冰冷",
      "思绪散亂",
    ],
    products: [
      {
        icon: "🌿",
        name: "扎根平衡按摩油",
        desc: "以广藿香、姜、岩蘭草為核心，温暖定锚，稳定风型神经系統，缓解焦虑与末梢冰冷",
        tag: "Grounding Body Oil · 舒缓焦虑 · 暖身",
      },
      {
        icon: "🫙",
        name: "暖身滋養润肤膏",
        desc: "乳木果与甜杏仁油深度滋润干燥肌肤，乳香与甜橙香气安撫紧绷的神经末梢",
        tag: "Warming Body Butter · 保湿 · 定神",
      },
      {
        icon: "💨",
        name: "安眠舒缓噴霧",
        desc: "真正熏衣草、羅馬洋甘菊、佛手柑的黃金比例，睡前噴于枕头与頸部，引导深層放松",
        tag: "Deep Sleep Mist · 助眠 · 放松",
      },
    ],
  },
  P: {
    name: "Pitta 火型",
    series: "清凉舒压系列 · Soothing",
    essence:
      "火的能量，代表著轉化、热情、智慧与精准執行力。你天生目标导向，但失衡时容易燃烧过度、急躁发炎。",
    advice:
      "适度降温，給心靈留白。透过清凉香气撫平內在的火焰，在高效中保持滋養与平静。",
    oils: "薄荷 · 玫瑰 · 檀香 · 茉莉 · 德國洋甘菊",
    imbalanceSigns: [
      "皮肤发炎",
      "胃酸过多",
      "急躁易怒",
      "过热出汗",
      "完美主义",
    ],
    products: [
      {
        icon: "🌊",
        name: "降火复方按摩油",
        desc: "薄荷、玫瑰、檀香精准冷卻过热体质，舒缓皮肤慢性发炎，安撫急躁情绪",
        tag: "Cooling Body Oil · 降火 · 消炎",
      },
      {
        icon: "🌿",
        name: "清凉头皮舒缓噴霧",
        desc: "薄荷、茶樹、德國洋甘菊配方，直接噴于头皮，即时舒缓油膩、敏感与紧绷感",
        tag: "Scalp Relief Mist · 头皮舒缓 · 清凉",
      },
      {
        icon: "🛁",
        name: "玫瑰清凉浴鹽",
        desc: "玫瑰花瓣与瀉鹽的清凉配方，泡浴时释放積累的身体热气，平復过度激动的神经系統",
        tag: "Rose Cooling Bath Salt · 降温 · 放松",
      },
    ],
  },
  K: {
    name: "Kapha 土水型",
    series: "煥活流动系列 · Energizing",
    essence:
      "地与水的能量，代表著稳定、愛与深厚滋養。你是天生的支柱，但失衡时容易停滞、沉重与抑鬱。",
    advice:
      "喚醒感官，打破沈滞。透过温热提振的芳疗配方激活內在流动，重燃对生命的热情。",
    oils: "迷迭香 · 姜 · 黑胡椒 · 尤加利 · 佛手柑",
    imbalanceSigns: [
      "水肿停滞",
      "代谢缓慢",
      "情绪低落",
      "鼻塞痰多",
      "动力不足",
    ],
    products: [
      {
        icon: "🔥",
        name: "排毒淋巴按摩油",
        desc: "杜松漿果、絲柏、黑胡椒激活淋巴循环，消解停滞与水肿，喚醒沉重的土水体质",
        tag: "Detox Lymph Oil · 淋巴排毒 · 消肿",
      },
      {
        icon: "🛁",
        name: "煥活提振浴鹽",
        desc: "迷迭香、姜、葡萄柚配方，泡浴时全面激活循环代谢，驅散身体的沉重与停滞感",
        tag: "Energizing Bath Salt · 提振 · 代谢",
      },
      {
        icon: "☀️",
        name: "晨间活力噴霧",
        desc: "佛手柑、姜黃、甜橙的陽光配方，早晨噴于胸口与手腕，点燃一天的动力与清醒",
        tag: "Morning Boost Mist · 提振精神 · 晨间",
      },
    ],
  },
};
