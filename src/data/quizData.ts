// src/data/quizData.ts
export type DoshaType = 'V' | 'P' | 'K';

export interface Question {
  id: number;
  title: string;
  options: { val: DoshaType; label: string }[];
}

export const quizQuestions: Question[] = [
  // --- 身体结构 (1-5) ---
  { id: 1, title: "您的体型特征？", options: [{val: 'V', label: '纤细、骨骼明显、难增重'}, {val: 'P', label: '中等、肌肉结实、体重易控'}, {val: 'K', label: '丰满、骨架宽大、易增重'}] },
  { id: 2, title: "您的肤质状况？", options: [{val: 'V', label: '干燥、粗糙、易冷'}, {val: 'P', label: '敏感、易泛红、易长痘'}, {val: 'K', label: '油润、厚实、肤色均匀'}] },
  { id: 3, title: "您的头发特质？", options: [{val: 'V', label: '干枯、易分叉、发量少'}, {val: 'P', label: '细软、易灰白或脱发、易出油'}, {val: 'K', label: '浓密、有光泽、发质粗硬'}] },
  //{ id: 4, title: "您的眼睛外观？", options: [{val: 'V', label: '细小、活泼、眼球转动快'}, {val: 'P', label: '明亮、锐利、怕光'}, {val: 'K', label: '大而深、睫毛长、眼神稳定'}] },
  //{ id: 5, title: "您的关节状态？", options: [{val: 'V', label: '纤细、常有弹响、易疼痛'}, {val: 'P', label: '中等、活动灵活'}, {val: 'K', label: '粗大、非常稳固'}] },

  // --- 代谢与消化 (6-11) ---
  { id: 4, title: "您的消化力？", options: [{val: 'V', label: '不规律、常胀气、便秘'}, {val: 'P', label: '强劲、容易饿、排便规律'}, {val: 'K', label: '缓慢、进食后沉重、易积食'}] },
  { id: 5, title: "您对寒暑的偏好？", options: [{val: 'V', label: '怕冷、偏好温暖气候'}, {val: 'P', label: '怕热、偏好凉爽气候'}, {val: 'K', label: '适应力强、偏好干燥温暖'}] },
  { id: 6, title: "您的食欲波动？", options: [{val: 'V', label: '起伏大、常忘记吃饭'}, {val: 'P', label: '准时强劲、不进食会急躁'}, {val: 'K', label: '稳定、较少有强烈饥饿感'}] },
  { id: 7, title: "您的口渴感？", options: [{val: 'V', label: '很少口渴、甚至忘了喝水'}, {val: 'P', label: '极易口渴、喜欢冰饮'}, {val: 'K', label: '中等、很少感到口渴'}] },
  { id: 8, title: "您的睡眠深度？", options: [{val: 'V', label: '易醒、多梦、睡眠质量浅'}, {val: 'P', label: '中等、容易入睡、规律'}, {val: 'K', label: '深沉、不易被唤醒、时长长'}] },
  //{ id: 11, title: "您的体力耐力？", options: [{val: 'V', label: '爆发力强但易疲劳'}, {val: 'P', label: '中等耐力、工作效率高'}, {val: 'K', label: '耐力极佳、可以长时间工作'}] },

  // --- 心理与情感 (12-16) ---
  //{ id: 7, title: "您的思维模式？", options: [{val: 'V', label: '跳跃、创意多、思绪多'}, {val: 'P', label: '逻辑清晰、专注、有计划'}, {val: 'K', label: '稳重、理解慢但记忆深刻'}] },
  //{ id: 13, title: "压力下的情绪？", options: [{val: 'V', label: '焦虑、担忧、恐惧'}, {val: 'P', label: '愤怒、挑剔、急躁'}, {val: 'K', label: '冷漠、退缩、容易懈怠'}] },
  //{ id: 14, title: "您对待金钱的态度？", options: [{val: 'V', label: '花钱冲动、不善理财'}, {val: 'P', label: '精打细算、投资理财'}, {val: 'K', label: '保守、倾向储蓄、节俭'}] },
  { id: 9, title: "您的社交倾向？", options: [{val: 'V', label: '健谈、社交圈广'}, {val: 'P', label: '主导型、喜欢辩论或竞争'}, {val: 'K', label: '稳重、忠诚、喜欢小型聚会'}] },
  //{ id: 16, title: "面对变化的适应力？", options: [{val: 'V', label: '喜欢改变、易被新事物吸引'}, {val: 'P', label: '能处理改变、有条理'}, {val: 'K', label: '抗拒改变、习惯维持现状'}] },

  // --- 行为习惯 (17-21) ---
  { id: 10, title: "您的谈话语速？", options: [{val: 'V', label: '快而多、常跳跃话题'}, {val: 'P', label: '清晰、尖锐、直接'}, {val: 'K', label: '缓慢、深思熟虑、温和'}] },
 // { id: 18, title: "您的步态？", options: [{val: 'V', label: '快而轻、脚步匆忙'}, {val: 'P', label: '坚定、有节奏'}, {val: 'K', label: '平稳、沉着、缓慢'}] },
  //{ id: 19, title: "您的专注力？", options: [{val: 'V', label: '容易分心、难以久坐'}, {val: 'P', label: '高度集中、目标导向'}, {val: 'K', label: '沉稳、专注时间长'}] },
  //{ id: 20, title: "您对待批评的态度？", options: [{val: 'V', label: '容易受伤、产生自我怀疑'}, {val: 'P', label: '好辩、防御性强'}, {val: 'K', label: '不在乎、容易遗忘或忽视'}] },
  //{ id: 21, title: "您的情绪复原力？", options: [{val: 'V', label: '心情波动频繁'}, {val: 'P', label: '持续时间适中'}, {val: 'K', label: '情绪稳定、很少剧烈波动'}] },
];