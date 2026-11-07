import { useMemo, useState } from 'react'
import { commitments } from '../data/commitments'
import { ui } from '../data/ui'
import { drawCommitmentCard } from '../lib/card'
import { useLang } from '../lib/i18n'
import { todayISO } from '../lib/time'
import CardFrame from './CardFrame'
import SectionHead from './SectionHead'

const NEEDED = 4

function formatDate(iso: string, lang: 'zh' | 'en') {
  const [y, m, d] = iso.split('-').map(Number)
  if (lang === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${d} ${months[m - 1]} ${y}`
  }
  return `${y}年${m}月${d}日`
}

export default function Ethics() {
  const { t, lang } = useLang()
  const [picked, setPicked] = useState<string[]>([])
  const [name, setName] = useState('')
  const [generated, setGenerated] = useState(false)

  const toggle = (id: string) => {
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
    setGenerated(false)
  }

  const canGenerate = picked.length >= NEEDED
  const chosen = commitments.filter((c) => picked.includes(c.id))
  const dateLine = useMemo(() => formatDate(todayISO(), lang), [lang])

  const draw = (ctx: CanvasRenderingContext2D) =>
    drawCommitmentCard(ctx, {
      lines: chosen.map((c) => t(c.text)),
      statement: t(ui.ethics.statement),
      name,
      dateLine,
      url: 'AI·香港30',
      tag: t(ui.ethics.cardTag),
      note: t(ui.ethics.note),
      seed: 1997 + picked.length * 37,
      lang,
    })

  return (
    <section id="ethics" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHead index="05" title={t(ui.ethics.title)} intro={t(ui.ethics.intro)} />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
        <div>
          <ul className="space-y-2.5">
            {commitments.map((c) => {
              const on = picked.includes(c.id)
              return (
                <li key={c.id}>
                  <label
                    className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors ${
                      on ? 'border-jade bg-jade-soft/50' : 'border-ink/12 bg-paper hover:border-ink/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(c.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors ${
                        on ? 'border-jade bg-jade text-white' : 'border-ink/25'
                      }`}
                    >
                      {on && (
                        <svg viewBox="0 0 24 24" className="size-4">
                          <path
                            d="m5 13 4 4L19 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-bold leading-relaxed">
                        {t(c.text)}
                      </span>
                      <span className="mt-1 block t-micro text-mute">
                        {t(ui.ethics.why)}：{t(c.why)}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="num rounded-full bg-ink/5 px-3 py-1.5 t-micro font-extrabold">
              {t(ui.ethics.counter)} {picked.length}/{commitments.length}
            </span>
            <button
              type="button"
              onClick={() => {
                setPicked(commitments.map((c) => c.id))
                setGenerated(false)
              }}
              className="min-h-9 rounded-full border border-ink/15 px-3 t-micro font-bold hover:border-ink/40"
            >
              {t(ui.ethics.selectAll)}
            </button>
            <button
              type="button"
              onClick={() => {
                setPicked([])
                setGenerated(false)
              }}
              className="min-h-9 rounded-full border border-ink/15 px-3 t-micro font-bold hover:border-ink/40"
            >
              {t(ui.ethics.clear)}
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="commit-name" className="t-micro font-extrabold tracking-wide text-mute">
                {t(ui.ethics.nameLabel)}
              </label>
              <input
                id="commit-name"
                type="text"
                value={name}
                maxLength={24}
                onChange={(e) => setName(e.target.value)}
                placeholder={t(ui.ethics.namePlaceholder)}
                autoComplete="off"
                className="mt-2 min-h-12 w-full rounded-xl border border-ink/20 bg-white px-4 text-base outline-none focus:border-ink"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                disabled={!canGenerate}
                onClick={() => setGenerated(true)}
                className="min-h-12 w-full rounded-full bg-verm px-6 text-sm font-extrabold text-white transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-ink/20 disabled:text-ink/40"
              >
                {canGenerate
                  ? t(ui.ethics.make)
                  : t(ui.ethics.needMore).replace('{n}', String(NEEDED - picked.length))}
              </button>
            </div>
          </div>

          <p className="mt-3 t-micro text-mute">{t(ui.vision.nameNote)}</p>
        </div>

        <div className="lg:sticky lg:top-20">
          {generated && canGenerate ? (
            <CardFrame
              draw={draw}
              deps={[picked.join(','), name, lang, dateLine]}
              filename="ai-hk-30-commitment.png"
              alt={t(ui.ethics.canvasAlt)}
            />
          ) : (
            <div className="grid aspect-[4/5] place-items-center rounded-2xl border border-dashed border-ink/20 bg-paper-2/60 p-6 text-center">
              <p className="t-small text-mute">
                {canGenerate ? t(ui.ethics.ready) : t(ui.ethics.needMore).replace('{n}', String(NEEDED - picked.length))}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
