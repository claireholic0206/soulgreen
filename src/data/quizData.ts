export type DoshaKey = "V" | "P" | "K";

export interface QuizOption {
  label: string;
  dosha: DoshaKey;
}

export interface Question {
  id: number;
  title: string;
  options: QuizOption[];
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    title: "最近的睡眠状况是？",
    options: [
      { dosha: "V", label: "容易浅眠、易醒、多梦" },
      { dosha: "P", label: "难以入睡，脑中常静不下来" },
      { dosha: "K", label: "睡得沉，但醒来仍觉得疲倦" },
    ],
  },
  {
    id: 2,
    title: "情绪上，你比较容易是？",
    options: [
      { dosha: "V", label: "容易紧张焦虑、想法很多" },
      { dosha: "P", label: "容易急躁、无法忍受拖延" },
      { dosha: "K", label: "容易提不起劲、情绪闷闷的" },
    ],
  },
  {
    id: 3,
    title: "身体感受上，你比较接近？",
    options: [
      { dosha: "V", label: "手脚容易冰冷、皮肤偏干" },
      { dosha: "P", label: "身体容易发热、皮肤易泛红或敏感" },
      { dosha: "K", label: "身体偏沉重，容易水肿" },
    ],
  },
  {
    id: 4,
    title: "你目前的生活步调是？",
    options: [
      { dosha: "V", label: "步调很快，常常同时处理很多事" },
      { dosha: "P", label: "行程满档，对自己要求很高" },
      { dosha: "K", label: "喜欢稳定步调，不太喜欢变动" },
    ],
  },
  {
    id: 5,
    title: "压力来临时，你通常会？",
    options: [
      { dosha: "V", label: "容易慌乱、坐立不安" },
      { dosha: "P", label: "容易发脾气、感觉紧绷" },
      { dosha: "K", label: "容易封闭自己、懒得动作" },
    ],
  },
  {
    id: 6,
    title: "此刻的你，最想要的是？",
    options: [
      { dosha: "V", label: "安定与放松" },
      { dosha: "P", label: "降温与释放" },
      { dosha: "K", label: "唤醒与活力" },
    ],
  },
];

export const DOSHA_DETAIL: Record<
  DoshaKey,
  {
    name: string;
    title: string;
    summary: string;
    energyText: string;
    productsText: string;
    ritual: string;
  }
> = {
  V: {
    name: "Vata 风型",
    title: "风与空之能量偏盛 · Vata",
    summary: "目前的你偏向躁动不安、思绪纷飞，容易浅眠或感到不踏实。这是身心在提醒你，需要多一点温润与安定的照顾。",
    energyText: "Vata 对应「风与空」的能量，特质是灵活、多变、充满创意；但失衡时容易显得焦躁、干燥、难以安定，也较容易影响睡眠与消化。",
    productsText: "温润基底油（荷荷芭、甜杏仁）+ 舒眠滚珠（薰衣草、檀香）+ 滋养按摩油（玫瑰、乳香）",
    ritual: "睡前以温热双手将按摩油涂抹于足底与腹部，缓缓画圈按摩，搭配 5 分钟深呼吸，让身体先于心安定下来。",
  },
  P: {
    name: "Pitta 火型",
    title: "火与水之能量偏盛 · Pitta",
    summary: "目前的你情绪容易紧绷、急躁，身体也可能偏燥热或容易发炎反应。是时候为自己按下降温键了。",
    energyText: "Pitta 对应「火与水」的能量，特质是专注、目标明确、行动力强；但失衡时容易显得急躁、易怒、发热发炎，也容易过度要求自己与他人。",
    productsText: "清凉舒缓喷雾（薄荷、玫瑰天竺葵）+ 舒缓精油（薰衣草、罗马洋甘菊）+ 降温按摩油（檀香、茉莉）",
    ritual: "午后于后颈与手腕轻喷清凉喷雾，闭眼做三次深长吐气，让紧绷的情绪与体感慢慢降温。",
  },
  K: {
    name: "Kapha 水型",
    title: "土与水之能量偏盛 · Kapha",
    summary: "目前的你身体偏沉重迟缓，情绪也容易低落、提不起劲。你需要的是温柔的唤醒，而非强迫自己振作。",
    energyText: "Kapha 对应「土与水」的能量，特质是稳定、温和、包容力强；但失衡时容易显得沉重、迟缓、缺乏动力，也较容易感到水肿或情绪低落。",
    productsText: "提振精油（甜橙、迷迭香）+ 活力滚珠（尤加利、柠檬）+ 轻盈喷雾（葡萄柚、薄荷）",
    ritual: "晨起将精油于掌心搓热，深吸两口气唤醒嗅觉，再由四肢往心脏方向轻拍全身，促进循环与活力。",
  },
};
