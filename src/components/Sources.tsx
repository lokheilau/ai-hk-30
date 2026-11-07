import { sources } from '../data/sources'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import SectionHead from './SectionHead'

export default function Sources() {
  const { t } = useLang()

  const blocks = [
    { title: ui.sources.methodTitle, body: ui.sources.method },
    { title: ui.sources.aiTitle, body: ui.sources.ai },
    { title: ui.sources.privacyTitle, body: ui.sources.privacy },
    { title: ui.sources.licenceTitle, body: ui.sources.licence },
  ]

  return (
    <section id="sources" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHead index="06" title={t(ui.sources.title)} intro={t(ui.sources.intro)} />

      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map((b) => (
          <div key={t(b.title)} className="rounded-2xl border border-ink/10 bg-white/60 p-4">
            <h3 className="t-micro font-extrabold tracking-wide text-jade">{t(b.title)}</h3>
            <p className="mt-2 t-small text-ink/75">{t(b.body)}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 t-h3">{t(ui.sources.tableOrg)}</h3>
      <p className="mt-1 t-micro text-mute">
        {sources.length} · {t(ui.sources.tableAccessed)} 2026-11-07
      </p>

      <ol className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
        {sources.map((s, i) => (
          <li
            key={s.id}
            id={`src-${s.id}`}
            className="scroll-mt-24 py-3"
          >
            <div className="flex gap-3">
              <span className="num w-7 shrink-0 pt-0.5 text-[0.75rem] font-extrabold text-ink/35">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] font-bold leading-snug">{t(s.title)}</p>
                <p className="mt-0.5 t-micro text-mute">{t(s.org)}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-micro font-bold text-jade underline decoration-jade/40 underline-offset-2 hover:decoration-jade"
                  >
                    {t(ui.sources.open)} ↗
                  </a>
                  <span className="num t-micro text-mute">
                    {t(ui.sources.tableAccessed)} {s.accessed}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
