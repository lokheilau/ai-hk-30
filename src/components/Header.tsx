import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'

const LINKS = [
  { id: 'timeline', label: ui.nav.timeline },
  { id: 'map', label: ui.nav.map },
  { id: 'lab', label: ui.nav.lab },
  { id: 'vision', label: ui.nav.vision },
  { id: 'ethics', label: ui.nav.ethics },
  { id: 'sources', label: ui.nav.sources },
]

export default function Header() {
  const { t, toggle } = useLang()

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

        <button
          type="button"
          onClick={toggle}
          aria-label={t(ui.langLabel)}
          className="ml-auto flex min-h-11 items-center gap-1.5 rounded-full border border-ink/15 px-3 text-[0.8125rem] font-bold transition-colors hover:border-ink/40 md:ml-2"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
            <path
              d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9m0-18c-2.5 2.4-4 5.6-4 9s1.5 6.6 4 9M3.5 9h17M3.5 15h17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
          <span>{t(ui.langToggle)}</span>
        </button>
      </div>
    </header>
  )
}
