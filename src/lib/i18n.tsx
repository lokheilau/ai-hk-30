import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Bi, Lang } from '../data/types'

const STORAGE_KEY = 'aihk30.lang'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (b: Bi) => string
}

const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    /* private mode / storage disabled — fall through to default */
  }
  // 繁中 is the primary language of the competition; only auto-switch when the
  // browser explicitly prefers English over Chinese.
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'zh'
  return nav.startsWith('en') ? 'en' : 'zh'
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* not fatal: the toggle still works for this session */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant-HK' : 'en'
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === 'zh' ? 'en' : 'zh'),
      t: (b: Bi) => (lang === 'en' ? b.en : b.zh),
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
