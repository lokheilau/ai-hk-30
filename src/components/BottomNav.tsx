import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import { useActiveSection } from '../lib/useActiveSection'

const ICONS: Record<string, string> = {
  timeline: 'M3 12h3m3 0h3m3 0h3M5 12a1.6 1.6 0 1 0 0-.001M12 12a1.6 1.6 0 1 0 0-.001M19 12a1.6 1.6 0 1 0 0-.001',
  map: 'M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Zm0 0v15m6-12v15',
  vision: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm2 8 4-4 3 3 2-2 3 3',
  lab: 'M12 4a4 4 0 0 1 4 4 4 4 0 0 1-1.6 3.2l-1.4 1.05V15h-2v-3.2L9.6 11.2A4 4 0 0 1 8 8a4 4 0 0 1 4-4Zm-1 14h2v2h-2v-2Z',
  ethics: 'M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Zm-2.5 9 2 2 4-4',
  sources: 'M4 5a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5Zm3 0v14m0-10h8m-8 4h8',
}

const SECTION_IDS = ['top', 'timeline', 'map', 'lab', 'vision', 'ethics', 'sources']

export default function BottomNav() {
  const { t } = useLang()
  const active = useActiveSection(SECTION_IDS)
  const items = [
    { id: 'timeline', label: ui.nav.timeline },
    { id: 'map', label: ui.nav.map },
    { id: 'lab', label: ui.nav.lab },
    { id: 'vision', label: ui.nav.vision },
    { id: 'ethics', label: ui.nav.ethics },
    { id: 'sources', label: ui.nav.sources },
  ]

  return (
    <nav
      aria-label={t(ui.menuLabel)}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch">
        {items.map((it) => {
          const on = active === it.id
          return (
            <li key={it.id} className="flex-1">
              <a
                href={`#${it.id}`}
                aria-current={on ? 'true' : undefined}
                className={`flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-[0.625rem] font-bold transition-colors ${
                  on ? 'text-verm' : 'text-ink/55'
                }`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
                  <path
                    d={ICONS[it.id]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={on ? 2.1 : 1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t(it.label)}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
