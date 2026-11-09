// 阿育吠陀体质比例测验：题库、分类规则、油浴参考配方。
// 要增减题目：直接改 quizQuestions（每题选项 A=风 V、B=火 P、C=水土 K），计分、百分比会自动跟着变。
// 要调整配方：改下面的 FORMULAS。

export type DoshaKey = "V" | "P" | "K";
export const DOSHA_KEYS: DoshaKey[] = ["V", "P", "K"];

export interface QuizOption {
  label: string;
  dosha: DoshaKey;
}

export interface Question {
  id: number;
  section: string;
  title: string;
  options: QuizOption[];
}

const q = (
  id: number,
  section: string,
  title: string,
  a: string,
  b: string,
  c: string,
): Question => ({
  id,
  section,
  title,
  options: [
    { dosha: "V", label: a },
    { dosha: "P", label: b },
    { dosha: "K", label: c },
  ],
});

const S1 = "骨架外观与肌肤质地";
const S2 = "消化、睡眠与代谢习惯";
const S3 = "心智模式与老化特征";

export const quizQuestions: Question[] = [
  q(1, S1, "体型与骨架", "身材偏瘦长、骨架小、难增重", "身材匀称、肌肉线条明显、体重易维持", "骨架大、结实圆润、容易发胖且难瘦"),
  q(2, S1, "皮肤触感与状况", "特别干燥、粗糙、季节交替易起屑", "敏弱易泛红、易长痘、晒太阳易长斑", "厚实光滑、偏油、不易长细纹但毛孔较明显"),
  q(3, S1, "手脚温度与发汗", "手脚经常冰冷、不太流汗、极度怕冷", "手脚温热、非常怕热、稍微动就大汗淋漓", "体温适中、耐冷也耐热，但极度讨厌湿冷"),
  q(4, S1, "头发与发质", "干燥、毛躁、细软或易分叉", "细软、易出油、有头皮敏感或早白倾向", "浓密、黑亮粗硬、具自然光泽"),
  q(5, S2, "食欲与消化", "食欲忽大忽小、吃多易胀气便秘", "消化极强、饿了容易发脾气、胃酸偏多", "食欲稳定但消化慢、耐得住空腹"),
  q(6, S2, "排便状况", "易便秘、粪便干硬呈颗粒状", "排便频率高（1天多次）、偏软或易拉肚子", "非常规律（1天1次）、份量多偶尔偏黏重"),
  q(7, S2, "睡眠品质", "浅眠、多梦、入睡慢、易被风吹草动吵醒", "入睡快、梦境多为竞赛或充满张力的画面", "睡得极沉、早上很难赖床、晨起易昏沉"),
  q(8, S2, "体力与精力曲线", "爆发力强但耐力差、精力忽高忽低", "冲劲十足、目标导向、易过度透支", "启动慢但耐力与持久力极佳"),
  q(9, S3, "面对压力的反应", "焦虑、紧张、恐慌、胡思乱想", "急躁、易怒、没耐性、充满批判性", "逃避、沉闷、固执、不想面对改变"),
  q(10, S3, "最困扰的老化问题", "干纹细纹增加快、脸部凹陷缺水", "斑点沉淀、慢性发炎泛红、微血管丝", "轮廓线松弛下垂、双下巴、脸部易水肿"),
  q(11, S3, "口渴与饮水偏好", "经常嘴唇干口渴、喜欢喝温热水", "经常口渴且量大、强烈偏好冰水或清凉饮料", "很少主动觉得口渴、偏好常温水"),
  q(12, S3, "说话与行动步调", "讲话快、手势多、步调迅速但容易疲倦", "讲话坚定直接、行动充满主导性与效率", "讲话温柔节奏慢、行动沉稳放松"),
];

// ── 分类规则（可调整）──
// 某一能量占比 ≥ 此值 → 「单一能量显着型」
export const SINGLE_DOMINANT_MIN_PERCENT = 60;
// 占比最低的那一项答题数 ≤ 此值 → 「双体质」；否则视为「三体质（较均衡）」
export const DUAL_MAX_THIRD_COUNT = 2;

export type DualKey = "VP" | "VK" | "PK";

export interface OilBathFormula {
  name: string;
  traits?: string;
  baseOils: string[];
  essentialOils?: string;
}

// 油浴参考配方（配方内容之后会再调整，只要改这里）。
// 单一显着型目前只有基底油，精油搭配留给一对一咨询。
export const FORMULAS: {
  single: Record<DoshaKey, OilBathFormula>;
  dual: Record<DualKey, OilBathFormula>;
} = {
  single: {
    V: {
      name: "风能显著型",
      baseOils: ["100% 冷压芝麻油（温热安神）"],
    },
    P: {
      name: "火能显著型",
      baseOils: ["100% 冷压椰子油（清凉降火）"],
    },
    K: {
      name: "水土能显著型",
      baseOils: ["80% 轻质芝麻油／杏桃仁油", "20% 蓖麻油（活化推动）"],
    },
  },
  dual: {
    VP: {
      name: "风火型 Vata-Pitta",
      traits: "既容易干燥焦虑，皮肤又容易敏弱发炎。",
      baseOils: [
        "60% 冷压芝麻油（补水抗干、安抚风能）",
        "40% 冷压椰子油或甜杏仁油（镇静退火、舒缓敏弱）",
      ],
      essentialOils: "真实薰衣草 8 滴（风火双修）＋ 罗马洋甘菊 4 滴（降火）＋ 乳香 4 滴（沉降风能）",
    },
    VK: {
      name: "风水型 Vata-Kapha",
      traits: "皮肤干燥怕冷，但同时容易水肿、晨起体重沉重。",
      baseOils: [
        "50% 冷压芝麻油（祛寒滋养）",
        "35% 杏桃仁油（质地较轻盈）",
        "15% 蓖麻油（强效推动水肿与毒素）",
      ],
      essentialOils: "甜橙 6 滴 ＋ 迷迭香 5 滴 ＋ 丝柏 5 滴（促进淋巴循环与温热）",
    },
    PK: {
      name: "火水型 Pitta-Kapha",
      traits: "体质偏热易发炎，但代谢慢、容易出油与体液滞留。",
      baseOils: [
        "60% 葵花籽油或荷荷芭油（清爽不油腻、清热）",
        "40% 冷压椰子油（带走体内湿热）",
      ],
      essentialOils: "葡萄柚 8 滴 ＋ 苦橙叶 4 滴 ＋ 大西洋雪松 4 滴（清热排水）",
    },
  },
};

export const FORMULA_ESSENTIAL_OIL_NOTE = "以 50ml 基底油计算";

export const DOSHA_DETAIL: Record<
  DoshaKey,
  {
    name: string;
    short: string;
    title: string;
    summary: string;
    energyText: string;
    ritual: string;
  }
> = {
  V: {
    name: "Vata 风型",
    short: "风能",
    title: "风与空之能量偏盛 · Vata",
    summary: "目前的你偏向躁动不安、思绪纷飞，容易浅眠或感到不踏实。这是身心在提醒你，需要多一点温润与安定的照顾。",
    energyText: "Vata 对应「风与空」的能量，特质是灵活、多变、充满创意；但失衡时容易显得焦躁、干燥、难以安定，也较容易影响睡眠与消化。",
    ritual: "睡前以温热双手将按摩油涂抹于足底与腹部，缓缓画圈按摩，搭配 5 分钟深呼吸，让身体先于心安定下来。",
  },
  P: {
    name: "Pitta 火型",
    short: "火能",
    title: "火与水之能量偏盛 · Pitta",
    summary: "目前的你情绪容易紧绷、急躁，身体也可能偏燥热或容易发炎反应。是时候为自己按下降温键了。",
    energyText: "Pitta 对应「火与水」的能量，特质是专注、目标明确、行动力强；但失衡时容易显得急躁、易怒、发热发炎，也容易过度要求自己与他人。",
    ritual: "午后于后颈与手腕轻喷清凉喷雾，闭眼做三次深长吐气，让紧绷的情绪与体感慢慢降温。",
  },
  K: {
    name: "Kapha 水土型",
    short: "水土能",
    title: "土与水之能量偏盛 · Kapha",
    summary: "目前的你身体偏沉重迟缓，情绪也容易低落、提不起劲。你需要的是温柔的唤醒，而非强迫自己振作。",
    energyText: "Kapha 对应「土与水」的能量，特质是稳定、温和、包容力强；但失衡时容易显得沉重、迟缓、缺乏动力，也较容易感到水肿或情绪低落。",
    ritual: "晨起将精油于掌心搓热，深吸两口气唤醒嗅觉，再由四肢往心脏方向轻拍全身，促进循环与活力。",
  },
};

// ── 计算 ──
export interface QuizResult {
  counts: Record<DoshaKey, number>;
  percents: Record<DoshaKey, number>;
  kind: "single" | "dual" | "tri";
  // 依占比由高到低排序（并列时维持 V、P、K 的顺序）
  order: DoshaKey[];
  formulaKey: DoshaKey | DualKey | null;
}

export function computeResult(answers: DoshaKey[]): QuizResult {
  const counts: Record<DoshaKey, number> = { V: 0, P: 0, K: 0 };
  answers.forEach((d) => {
    counts[d]++;
  });
  const total = answers.length || 1;
  const percents = {
    V: Math.round((counts.V / total) * 100),
    P: Math.round((counts.P / total) * 100),
    K: Math.round((counts.K / total) * 100),
  } as Record<DoshaKey, number>;

  const order = [...DOSHA_KEYS].sort((a, b) => counts[b] - counts[a]);
  const [first, second, third] = order;

  if (percents[first] >= SINGLE_DOMINANT_MIN_PERCENT) {
    return { counts, percents, kind: "single", order, formulaKey: first };
  }
  if (counts[third] <= DUAL_MAX_THIRD_COUNT) {
    const pair = DOSHA_KEYS.filter((k) => k === first || k === second).join("") as DualKey;
    return { counts, percents, kind: "dual", order, formulaKey: pair };
  }
  return { counts, percents, kind: "tri", order, formulaKey: null };
}
