import type { Commitment } from './types'

/**
 * Five commitments, each paired with a reason a 15-year-old could act on
 * tomorrow. Normative statements, so no citation is required — but they are
 * deliberately concrete so the card is not a slogan.
 */
export const commitments: Commitment[] = [
  {
    id: 'privacy',
    text: {
      zh: '我不會把別人的個人資料、相片或對話貼進 AI 工具。',
      en: 'I will not paste other people’s personal data, photos or conversations into AI tools.',
    },
    why: {
      zh: '貼上去的內容可能被記錄、被訓練，而且收不回來。',
      en: 'What you paste may be logged, may be trained on, and cannot be taken back.',
    },
  },
  {
    id: 'bias',
    text: {
      zh: '我會問：這個結果是從哪些人的數據學來的？誰不在裡面？',
      en: 'I will ask whose data this result was learned from — and who is missing from it.',
    },
    why: {
      zh: '數據沒有代表某群人，模型就會對他們出錯，而且錯得很有自信。',
      en: 'If a group is absent from the data, the model errs on them — confidently.',
    },
  },
  {
    id: 'copyright',
    text: {
      zh: '我不會把 AI 生成的圖或文字當成自己的原創作品。',
      en: 'I will not present AI-generated images or text as my own original work.',
    },
    why: {
      zh: '比賽與學校都要求原創；隱瞞生成過程，等於連自己都不信得過。',
      en: 'Competitions and schools require original work; hiding the process means not trusting your own work.',
    },
  },
  {
    id: 'verify',
    text: {
      zh: '我會用官方來源核對 AI 給我的數字與日期，查不到就不寫。',
      en: 'I will check AI-supplied figures and dates against an official source, and leave out what I cannot verify.',
    },
    why: {
      zh: '語言模型會把不確定的內容講得像事實；查一次，通常只要一分鐘。',
      en: 'Language models state guesses as facts. Checking usually takes a minute.',
    },
  },
  {
    id: 'help',
    text: {
      zh: '我會用 AI 幫一個具體的人解決一個具體的問題。',
      en: 'I will use AI to solve one concrete problem for one real person.',
    },
    why: {
      zh: '技術的價值不在展示，而在有人因為它過得容易一點。',
      en: 'The value of a technology is not the demo; it is that someone’s day got easier.',
    },
  },
]
