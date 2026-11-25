import { ui } from '../data/ui'
import type { Lang } from '../data/types'
import { useLang } from '../lib/i18n'

const LANGS: { id: Lang; label: { zh: string; en: string } }[] = [
  { id: 'zh', label: ui.langZh },
  { id: 'sc', label: ui.langSc },
  { id: 'en', label: ui.langEn },
]

const LINKS = [
  { id: 'timeline', label: ui.nav.timeline },
  { id: 'map', label: ui.nav.map },
  { id: 'lab', label: ui.nav.lab },
  { id: 'vision', label: ui.nav.vision },
  { id: 'ethics', label: ui.nav.ethics },
  { id: 'sources', label: ui.nav.sources },
]

export default function Header() {
  const { t, lang, setLang } = useLang()

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="group flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink text-[11px] font-extrabold text-paper"
          >
            30
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.9375rem] font-extrabold leading-tight tracking-tight">
              {t(ui.siteName)}
            </span>
            <span className="hidden truncate text-[0.6875rem] leading-tight text-mute sm:block">
              {t(ui.siteTagline)}
            </span>
          </span>
        </a>

        <nav aria-label={t(ui.menuLabel)} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="rounded-full px-3 py-2 text-[0.8125rem] font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {t(l.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          role="group"
          aria-label={t(ui.langLabel)}
          className="ml-auto flex shrink-0 items-center gap-0.5 rounded-full border border-ink/15 p-0.5 md:ml-2"
        >
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLang(l.id)}
              aria-pressed={lang === l.id}
              className={`min-h-9 rounded-full px-2.5 text-[0.75rem] font-bold transition-colors ${
                lang === l.id ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {t(l.label)}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
