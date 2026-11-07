import { useMemo, useRef, useState } from 'react'
import { milestones } from '../data/milestones'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import Cite from './Cite'
import SectionHead from './SectionHead'

type Filter = 'all' | 'cn' | 'hk'

export default function Timeline() {
  const { t } = useLang()
  const [filter, setFilter] = useState<Filter>('all')
  const rail = useRef<HTMLDivElement | null>(null)

  const items = useMemo(() => {
    const list = [...milestones].sort((a, b) => a.year - b.year)
    return filter === 'all' ? list : list.filter((m) => m.track === filter)
  }, [filter])

  const nudge = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const filters: { id: Filter; label: { zh: string; en: string } }[] = [
    { id: 'all', label: ui.timeline.filterAll },
    { id: 'cn', label: ui.timeline.trackCn },
    { id: 'hk', label: ui.timeline.trackHk },
  ]

  return (
    <section id="timeline" className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHead
          index="01"
          title={t(ui.timeline.title)}
          intro={t(ui.timeline.intro)}
          aside={
            <div className="flex shrink-0 gap-1" role="group" aria-label={t(ui.timeline.whichTrack)}>
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`min-h-9 rounded-full px-3 t-micro font-extrabold transition-colors ${
                    filter === f.id ? 'bg-ink text-paper' : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                  }`}
                >
                  {t(f.label)}
                </button>
              ))}
            </div>
          }
        />

        <div className="relative">
          <div
            ref={rail}
            tabIndex={0}
            role="group"
            aria-label={t(ui.timeline.title)}
            className="hide-scrollbar -mx-4 flex snap-x-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6"
          >
            {items.map((m, i) => {
              const cn = m.track === 'cn'
              return (
                <article
                  key={m.id}
                  data-card
                  className="snap-start-always flex w-[80vw] max-w-[19rem] shrink-0 flex-col rounded-2xl border border-ink/10 bg-white/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="num text-2xl font-extrabold tracking-tight">{m.year}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 t-micro font-extrabold ${
                        cn ? 'bg-jade-soft text-jade' : 'bg-verm-soft text-verm'
                      }`}
                    >
                      {cn ? t(ui.timeline.trackCn) : t(ui.timeline.trackHk)}
                    </span>
                  </div>
                  <h3 className="mt-3 t-h3 leading-snug">{t(m.title)}</h3>
                  <p className="mt-2 flex-1 t-small text-ink/70">
                    {t(m.body)}
                    <Cite ids={m.sourceIds} />
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[0.625rem] font-bold text-ink/25">
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
                  </div>
                </article>
              )
            })}

            {/* The rail ends at the anniversary, not at the last data point. */}
            <article className="snap-start-always flex w-[80vw] max-w-[19rem] shrink-0 flex-col justify-between rounded-2xl bg-ink p-4 text-paper">
              <div>
                <span className="num text-2xl font-extrabold tracking-tight">2027</span>
                <h3 className="mt-3 t-h3 leading-snug text-verm-bright">
                  {t(ui.timeline.anniversary)}
                </h3>
                <p className="mt-2 t-small text-paper/70">
                  {t({
                    zh: '三十年的時間軸到這裡仍未結束：下一個三十年，是由現在的青年寫的。',
                    en: 'The thirty-year line does not end here. The next thirty years are written by today’s youth.',
                  })}
                </p>
              </div>
              <span className="mt-3 text-[0.625rem] font-bold tracking-wide text-paper/40">
                1997 — 2027
              </span>
            </article>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="t-micro text-mute sm:hidden">{t(ui.timeline.swipeHint)}</p>
            <p className="hidden t-micro text-mute sm:block">
              {items.length} / {milestones.length}
            </p>
            <div className="hidden gap-1 sm:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label={t({ zh: '上一個', en: 'Previous' })}
                className="grid size-10 place-items-center rounded-full border border-ink/15 hover:border-ink/40"
              >
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label={t({ zh: '下一個', en: 'Next' })}
                className="grid size-10 place-items-center rounded-full border border-ink/15 hover:border-ink/40"
              >
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
