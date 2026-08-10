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
    title: "最近的睡眠狀況是？",
    options: [
      { dosha: "V", label: "容易淺眠、易醒、多夢" },
      { dosha: "P", label: "難以入睡，腦中常靜不下來" },
      { dosha: "K", label: "睡得沉，但醒來仍覺得疲倦" },
    ],
  },
  {
    id: 2,
    title: "情緒上，你比較容易是？",
    options: [
      { dosha: "V", label: "容易緊張焦慮、想法很多" },
      { dosha: "P", label: "容易急躁、無法忍受拖延" },
      { dosha: "K", label: "容易提不起勁、情緒悶悶的" },
    ],
  },
  {
    id: 3,
    title: "身體感受上，你比較接近？",
    options: [
      { dosha: "V", label: "手腳容易冰冷、皮膚偏乾" },
      { dosha: "P", label: "身體容易發熱、皮膚易泛紅或敏感" },
      { dosha: "K", label: "身體偏沉重，容易水腫" },
    ],
  },
  {
    id: 4,
    title: "你目前的生活步調是？",
    options: [
      { dosha: "V", label: "步調很快，常常同時處理很多事" },
      { dosha: "P", label: "行程滿檔，對自己要求很高" },
      { dosha: "K", label: "喜歡穩定步調，不太喜歡變動" },
    ],
  },
  {
    id: 5,
    title: "壓力來臨時，你通常會？",
    options: [
      { dosha: "V", label: "容易慌亂、坐立不安" },
      { dosha: "P", label: "容易發脾氣、感覺緊繃" },
      { dosha: "K", label: "容易封閉自己、懶得動作" },
    ],
  },
  {
    id: 6,
    title: "此刻的你，最想要的是？",
    options: [
      { dosha: "V", label: "安定與放鬆" },
      { dosha: "P", label: "降溫與釋放" },
      { dosha: "K", label: "喚醒與活力" },
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
    name: "Vata 風型",
    title: "風與空之能量偏盛 · Vata",
    summary: "目前的你偏向躁動不安、思緒紛飛，容易淺眠或感到不踏實。這是身心在提醒你，需要多一點溫潤與安定的照顧。",
    energyText: "Vata 對應「風與空」的能量，特質是靈活、多變、充滿創意；但失衡時容易顯得焦躁、乾燥、難以安定，也較容易影響睡眠與消化。",
    productsText: "溫潤基底油（荷荷芭、甜杏仁）+ 舒眠滾珠（薰衣草、檀香）+ 滋養按摩油（玫瑰、乳香）",
    ritual: "睡前以溫熱雙手將按摩油塗抹於足底與腹部，緩緩畫圈按摩，搭配 5 分鐘深呼吸，讓身體先於心安定下來。",
  },
  P: {
    name: "Pitta 火型",
    title: "火與水之能量偏盛 · Pitta",
    summary: "目前的你情緒容易緊繃、急躁，身體也可能偏燥熱或容易發炎反應。是時候為自己按下降溫鍵了。",
    energyText: "Pitta 對應「火與水」的能量，特質是專注、目標明確、行動力強；但失衡時容易顯得急躁、易怒、發熱發炎，也容易過度要求自己與他人。",
    productsText: "清涼舒緩噴霧（薄荷、玫瑰天竺葵）+ 舒緩精油（薰衣草、羅馬洋甘菊）+ 降溫按摩油（檀香、茉莉）",
    ritual: "午後於後頸與手腕輕噴清涼噴霧，閉眼做三次深長吐氣，讓緊繃的情緒與體感慢慢降溫。",
  },
  K: {
    name: "Kapha 水型",
    title: "土與水之能量偏盛 · Kapha",
    summary: "目前的你身體偏沉重遲緩，情緒也容易低落、提不起勁。你需要的是溫柔的喚醒，而非強迫自己振作。",
    energyText: "Kapha 對應「土與水」的能量，特質是穩定、溫和、包容力強；但失衡時容易顯得沉重、遲緩、缺乏動力，也較容易感到水腫或情緒低落。",
    productsText: "提振精油（甜橙、迷迭香）+ 活力滾珠（尤加利、檸檬）+ 輕盈噴霧（葡萄柚、薄荷）",
    ritual: "晨起將精油於掌心搓熱，深吸兩口氣喚醒嗅覺，再由四肢往心臟方向輕拍全身，促進循環與活力。",
  },
};
