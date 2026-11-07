import { useEffect, useState } from 'react'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import { anniversaryProgress, pad2, remaining } from '../lib/time'

export default function Countdown() {
  const { t } = useLang()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => {
      // Do not burn battery while the tab sits in the background.
      if (document.visibilityState === 'visible') setNow(Date.now())
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const r = remaining(now)
  const pct = anniversaryProgress(now)
  const cells = [
    { v: r.days, l: ui.hero.days, big: true },
    { v: r.hours, l: ui.hero.hours, big: false },
    { v: r.mins, l: ui.hero.mins, big: false },
    { v: r.secs, l: ui.hero.secs, big: false },
  ]

  return (
    <div>
      <p className="mb-2 text-[0.6875rem] font-bold tracking-[0.08em] text-paper/45">
        {t(ui.hero.countdownLabel)}
      </p>
      <div className="flex items-end gap-2 sm:gap-3">
        {cells.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            <span
              className={`num rounded-xl border border-paper/15 bg-paper/[0.06] px-2.5 py-1.5 font-extrabold leading-none ${
                c.big ? 'text-[1.75rem] sm:text-4xl' : 'text-xl sm:text-2xl'
              }`}
            >
              {c.big ? c.v : pad2(c.v)}
            </span>
            <span className="mt-1 text-[0.625rem] font-semibold text-paper/50">{t(c.l)}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 max-w-sm" aria-hidden="true">
        <div className="mb-1.5 flex items-center justify-between text-[0.625rem] font-bold tracking-wide text-paper/40">
          <span className="num">1997</span>
          <span className="num">{pct.toFixed(1)}%</span>
          <span className="num">2027</span>
        </div>
        <div className="relative h-px w-full bg-paper/20">
          <span
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-jade-bright/60 to-verm-bright/70"
            style={{ width: `${pct}%` }}
          />
          <span
            className="absolute -top-[3.5px] size-2 rounded-full bg-verm-bright shadow-[0_0_0_4px_rgba(232,96,63,0.18)]"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>
    </div>
  )
}
