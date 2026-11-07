import type { Scenario } from './types'

/**
 * Editorial content, deliberately free of statistics so nothing here needs a
 * citation. These are proposals for 2027, and every card carries the
 * 「願景 · 設想」tag so a shared screenshot cannot read as a news report.
 */
export const scenarios: Scenario[] = [
  {
    id: 'health',
    name: { zh: '醫療：把最急的個案排到最前', en: 'Health: the most urgent case goes first' },
    problem: {
      zh: '急症室的分流要靠人手判斷，繁忙時段誰先誰後，往往取決於幾分鐘內的觀察。醫護的時間被文書分薄，病人只能等。',
      en: 'Triage depends on human judgement under pressure. Paperwork eats clinical time, and patients wait.',
    },
    vision: {
      zh: '到 2027，病人在見醫生之前，AI 已把最緊急的個案排到前面；醫護省下的一分鐘，回到病人身邊。',
      en: 'By 2027, AI surfaces the most urgent cases before a doctor arrives, and every minute saved goes back to the patient.',
    },
    youthAction: {
      zh: '學會問一句：這個建議是根據哪些數據？如果數據沒有包括長者或少數族裔，我會提出來。',
      en: 'Learn to ask which data a recommendation is based on — and to say so when older people or ethnic minorities are missing from it.',
    },
    seed: 1997,
  },
  {
    id: 'education',
    name: { zh: '教育：一個不會不耐煩的練習夥伴', en: 'Education: a practice partner with endless patience' },
    problem: {
      zh: '班級人數固定，學生快慢不一。練習不足的學生愈來愈怕錯，而老師的時間要分給全班。',
      en: 'Class sizes are fixed and paces differ. Students who fall behind start fearing mistakes, and a teacher’s time is shared across everyone.',
    },
    vision: {
      zh: '到 2027，每個學生都有一個不會不耐煩的練習夥伴：它負責出題與提示，判斷對錯的仍然是老師。',
      en: 'By 2027, every student has a tireless practice partner that sets questions and hints — while the teacher still makes the judgement.',
    },
    youthAction: {
      zh: '用 AI 補自己的弱項，但把答案自己再做一次；錯的地方要能講出為甚麼錯。',
      en: 'Use AI to shore up weak spots, then redo the work yourself and be able to explain why the wrong answer was wrong.',
    },
    seed: 2022,
  },
  {
    id: 'transport',
    name: { zh: '交通：不再靠猜的等車時間', en: 'Transport: waiting times you can trust' },
    problem: {
      zh: '同一條巴士線，早上與黃昏的到站時間可以差很遠。長者和小童過路燈的秒數，未必配得上他們的步伐。',
      en: 'The same bus route behaves differently at rush hour. Pedestrian signal timings do not always match the pace of older people or small children.',
    },
    vision: {
      zh: '到 2027，到站時間不再靠猜，過路燈會按實際步伐調整秒數；一個城市的效率，表現在它願不願意等最慢的人。',
      en: 'By 2027, arrival times are trustworthy and crossing signals adapt to real walking pace — a city’s efficiency shows in whom it is willing to wait for.',
    },
    youthAction: {
      zh: '記錄一次真實的等車與過路經驗，指出哪一項數據應該被加入模型。',
      en: 'Record one real wait and one real crossing, then name the data that should be added to the model.',
    },
    seed: 2007,
  },
  {
    id: 'elders',
    name: { zh: '長者數字包容：講一句就查到', en: 'Digital inclusion: ask in Cantonese, get an answer' },
    problem: {
      zh: '政府服務陸續搬上網，但對不慣打字的長者，密碼、選單與英文縮寫都是門檻；有些人因此放棄查詢，直接不再使用。',
      en: 'Public services keep moving online, but passwords, menus and English abbreviations lock out people who do not type. Some simply give up.',
    },
    vision: {
      zh: '到 2027，長者用粵語講一句，就查到政府服務的答案；不必學打字，也不必記密碼。科技進步與否，看最不熟悉科技的人能否用得上。',
      en: 'By 2027, an older person asks a question in Cantonese and gets the answer — no typing, no passwords. Progress is measured by whether the least technical person can use it.',
    },
    youthAction: {
      zh: '陪一位長者用語音問一次真實問題，記下它在哪一步出錯，然後告訴開發者。',
      en: 'Sit with an older person, ask one real question by voice, note exactly where it fails, and tell the people who built it.',
    },
    seed: 2017,
  },
  {
    id: 'culture',
    name: { zh: '文化創作：粵語故事由我們訓練', en: 'Culture: Cantonese stories trained by us' },
    problem: {
      zh: '大模型多以普通話與英文語料訓練，粵語的語氣、俚語與街市聲音容易被磨平，年輕人的本地經驗反而被少數模型代言。',
      en: 'Large models are mostly trained on Mandarin and English, flattening Cantonese tone, slang and street sound. Local experience ends up voiced by someone else’s model.',
    },
    vision: {
      zh: '到 2027，年輕人的粵語故事、街市聲音與舊區影像，成為訓練本地模型的文化材料，而不是被少數大模型代言。',
      en: 'By 2027, young people’s Cantonese stories, market sounds and old-district images become training material for local models — not something a handful of foreign models speak for.',
    },
    youthAction: {
      zh: '有意識地記錄一種快要消失的本地聲音，並註明授權條款，讓它能被合法使用。',
      en: 'Deliberately record one disappearing local sound, state its licence clearly, and make it legally usable.',
    },
    seed: 2027,
  },
]
