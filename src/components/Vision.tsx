import { useMemo, useState } from 'react'
import { scenarios } from '../data/scenarios'
import { ui } from '../data/ui'
import { drawVisionCard } from '../lib/card'
import { useLang } from '../lib/i18n'
import { todayISO } from '../lib/time'
import CardFrame from './CardFrame'
import SectionHead from './SectionHead'

function formatDate(iso: string, lang: 'zh' | 'en') {
  const [y, m, d] = iso.split('-').map(Number)
  if (lang === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${d} ${months[m - 1]} ${y}`
  }
  return `${y}年${m}月${d}日`
}

export default function Vision() {
  const { t, lang } = useLang()
  const [picked, setPicked] = useState(scenarios[0].id)
  const [name, setName] = useState('')
  const [generated, setGenerated] = useState(false)
  const scenario = scenarios.find((s) => s.id === picked) ?? scenarios[0]

  const dateLine = useMemo(() => formatDate(todayISO(), lang), [lang])

  const draw = (ctx: CanvasRenderingContext2D) =>
    drawVisionCard(ctx, {
      scenarioName: t(scenario.name),
      vision: t(scenario.vision),
      tag: t(ui.vision.cardTag),
      name,
      dateLine,
      url: 'AI·香港30',
      note: t(ui.vision.fictional),
      seed: scenario.seed,
      lang,
    })

  return (
    <section id="vision" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHead index="04" title={t(ui.vision.title)} intro={t(ui.vision.intro)} />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
        <div>
          <h3 className="t-micro font-extrabold tracking-wide text-mute">{t(ui.vision.pick)}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {scenarios.map((s) => {
              const on = s.id === picked
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setPicked(s.id)}
                  aria-pressed={on}
                  className={`min-h-11 rounded-full border px-4 text-[0.8125rem] font-bold transition-colors ${
                    on
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/20 bg-paper text-ink/80 hover:border-ink/45'
                  }`}
                >
                  {t(s.name)}
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-ink/10 bg-paper-2/70 p-4">
              <h4 className="t-micro font-extrabold tracking-wide text-verm">
                {t(ui.vision.problem)}
              </h4>
              <p className="mt-2 t-body text-ink/80">{t(scenario.problem)}</p>
            </div>

            <blockquote className="border-l-2 border-jade pl-4">
              <p className="text-[1.0625rem] font-bold leading-relaxed text-ink sm:text-lg">
                {t(scenario.vision)}
              </p>
            </blockquote>

            <div className="rounded-2xl border border-ink/10 p-4">
              <h4 className="t-micro font-extrabold tracking-wide text-jade">
                {t(ui.vision.youthAction)}
              </h4>
              <p className="mt-2 t-body text-ink/80">{t(scenario.youthAction)}</p>
            </div>

            <div>
              <label htmlFor="vision-name" className="t-micro font-extrabold tracking-wide text-mute">
                {t(ui.vision.nameLabel)}
              </label>
              <input
                id="vision-name"
                type="text"
                value={name}
                maxLength={24}
                onChange={(e) => setName(e.target.value)}
                placeholder={t(ui.vision.namePlaceholder)}
                autoComplete="off"
                className="mt-2 min-h-12 w-full rounded-xl border border-ink/20 bg-white px-4 text-base outline-none focus:border-ink"
              />
              <p className="mt-2 t-micro text-mute">{t(ui.vision.nameNote)}</p>
            </div>

            {!generated && (
              <button
                type="button"
                onClick={() => setGenerated(true)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-verm px-6 text-sm font-extrabold text-white transition-transform active:scale-[0.99] sm:w-auto"
              >
                {t(ui.vision.generate)}
              </button>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-20">
          {generated ? (
            <CardFrame
              draw={draw}
              deps={[picked, name, lang, dateLine]}
              filename={`ai-hk-30-vision-${scenario.id}.png`}
              alt={t(ui.vision.canvasAlt)}
            />
          ) : (
            <div className="grid aspect-[4/5] place-items-center rounded-2xl border border-dashed border-ink/20 bg-paper-2/60 p-6 text-center">
              <p className="t-small text-mute">{t(ui.vision.cardTag)}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
