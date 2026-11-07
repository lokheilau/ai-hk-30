import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-[0.9375rem] font-extrabold">{t(ui.siteFull)}</p>
            <p className="mt-2 t-small text-paper/60">{t(ui.footer.built)}</p>
            <p className="mt-1 t-micro text-paper/40">{t(ui.footer.theme)}</p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="t-micro text-paper/40">{t(ui.footer.noTrack)}</p>
            <a
              href="#top"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-paper/25 px-4 t-micro font-bold text-paper/80 hover:border-paper/60 hover:text-paper"
            >
              {t(ui.footer.backTop)}
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3">
                <path
                  d="M12 19V5m0 0-6 6m6-6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
