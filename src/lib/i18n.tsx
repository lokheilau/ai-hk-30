import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { sify } from 'chinese-conv'
import type { Bi, Lang } from '../data/types'

const STORAGE_KEY = 'aihk30.lang'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (b: Bi) => string
}

const LangContext = createContext<Ctx | null>(null)

// Cache conversions: many strings are identical across renders, and sify is a
// per-character lookup we do not want to repeat on every render.
const scCache = new Map<string, string>()
const toSimplified = (s: string) => {
  const hit = scCache.get(s)
  if (hit !== undefined) return hit
  const out = sify(s)
  scCache.set(s, out)
  return out
}

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'sc' || saved === 'en') return saved
  } catch {
    /* private mode / storage disabled — fall through to default */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'zh'
  if (nav.startsWith('en')) return 'en'
  // 繁中 is the primary language of the competition; only default to 簡中 for a
  // clearly Simplified-Chinese browser locale (zh-CN / zh-Hans / zh-SG).
  if (nav.startsWith('zh')) {
    return nav.includes('hans') || nav.includes('cn') || nav.includes('sg') ? 'sc' : 'zh'
  }
  return 'zh'
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* not fatal: the choice still applies for this session */
    }
  }

  useEffect(() => {
    document.documentElement.lang =
      lang === 'zh' ? 'zh-Hant-HK' : lang === 'sc' ? 'zh-Hans-HK' : 'en'
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (b: Bi) => (lang === 'en' ? b.en : lang === 'sc' ? toSimplified(b.zh) : b.zh),
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
