import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import Countdown from './Countdown'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-paper"
      aria-labelledby="hero-title"
    >
      {/* Decorative only: two soft light sources and a dot grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 size-[22rem] rounded-full bg-jade/25 blur-[90px]" />
        <div className="absolute -right-20 top-32 size-[18rem] rounded-full bg-verm/25 blur-[90px]" />
        <div className="grain absolute inset-0 opacity-[0.35]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        <div className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] text-paper/60">
          <span className="inline-block size-1.5 rounded-full bg-verm-bright" aria-hidden="true" />
          {t(ui.hero.kicker)}
        </div>

        <h1 id="hero-title" className="mt-5 t-display">
          <span className="block">AI · 香港</span>
          <span className="relative inline-block">
            <span className="text-verm-bright">30</span>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-verm-bright/80 to-transparent"
            />
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-paper/75 sm:text-base">
          {t(ui.siteTagline)}
        </p>

        <div className="mt-8">
          <Countdown />
        </div>

        <p className="mt-8 max-w-xl t-small text-paper/60">{t(ui.hero.premise)}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#timeline"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-sm font-extrabold text-ink transition-transform active:scale-[0.98]"
          >
            {t(ui.hero.ctaPrimary)}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#map"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-paper/25 px-6 text-sm font-bold text-paper/90 transition-colors hover:border-paper/50"
          >
            {t(ui.hero.ctaSecondary)}
          </a>
        </div>

        <p className="mt-8 max-w-lg border-l-2 border-jade-bright/50 pl-3 t-micro text-paper/45">
          {t(ui.hero.rules)}
        </p>
      </div>
    </section>
  )
}
