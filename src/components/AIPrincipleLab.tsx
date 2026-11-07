import { useEffect, useRef, useState } from 'react'
import type * as tf from '@tensorflow/tfjs'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import {
  disposeModel,
  embeddingOf,
  fileToImage,
  getBundle,
  predictHead,
  trainHead,
  type TfBundle,
  type TrainProgress,
} from '../lib/lab'
import SectionHead from './SectionHead'

const MIN_PER_CLASS = 5
const MAX_PER_CLASS = 10
const EPOCHS = 50

type Phase = 'idle' | 'loading-model' | 'extracting' | 'training' | 'ready'

interface Sample {
  id: string
  file: File
  /** Object URL for the thumbnail grid. */
  thumb: string
}

interface LabClass {
  id: string
  label: string
  samples: Sample[]
}

interface Prediction {
  probs: number[]
  top: number
}

const makeId = () => `s${Math.random().toString(36).slice(2, 10)}`

function defaultClasses(): LabClass[] {
  return [
    { id: 'a', label: '', samples: [] },
    { id: 'b', label: '', samples: [] },
  ]
}

/** Label placeholder lives in ui, but the *stored* default must be real text. */
function placeholderLabels(): [string, string] {
  return ['菠蘿包', '叉燒包']
}

export default function AIPrincipleLab() {
  const { t } = useLang()
  const [classes, setClasses] = useState<LabClass[]>(defaultClasses)
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState<TrainProgress | null>(null)
  const [extracting, setExtracting] = useState<{ done: number; total: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [testUrl, setTestUrl] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [predicting, setPredicting] = useState(false)
  const [barPcts, setBarPcts] = useState<number[]>([])

  const bundleRef = useRef<TfBundle | null>(null)
  const headRef = useRef<tf.LayersModel | null>(null)

  const labels = classes.map((c) => c.label.trim())
  const counts = classes.map((c) => c.samples.length)
  const canTrain = counts.every((n) => n >= MIN_PER_CLASS)
  const busy = phase === 'loading-model' || phase === 'extracting' || phase === 'training'

  // Revoke the test-image object URL when it changes or on unmount.
  useEffect(() => {
    return () => {
      if (testUrl) URL.revokeObjectURL(testUrl)
    }
  }, [testUrl])

  // Animate confidence bars from 0 → real value on every new prediction.
  useEffect(() => {
    if (!prediction) {
      setBarPcts([])
      return
    }
    setBarPcts(classes.map(() => 0))
    const raf = requestAnimationFrame(() => {
      setBarPcts(prediction.probs.map((p) => p * 100))
    })
    return () => cancelAnimationFrame(raf)
  }, [prediction, classes.length])

  const revokeSample = (sample: Sample) => URL.revokeObjectURL(sample.thumb)

  const onLabel = (id: string, value: string) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, label: value } : c)))
  }

  const onFiles = (id: string, files: FileList) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const room = MAX_PER_CLASS - c.samples.length
        if (room <= 0) return c
        const imgs = Array.from(files)
          .filter((f) => f.type.startsWith('image/'))
          .slice(0, room)
          .map((file) => ({ id: makeId(), file, thumb: URL.createObjectURL(file) }))
        return { ...c, samples: [...c.samples, ...imgs] }
      }),
    )
    setPrediction(null)
  }

  const onRemove = (classId: string, sampleId: string) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id !== classId) return c
        const target = c.samples.find((s) => s.id === sampleId)
        if (target) revokeSample(target)
        return { ...c, samples: c.samples.filter((s) => s.id !== sampleId) }
      }),
    )
    setPrediction(null)
  }

  const reset = () => {
    classes.forEach((c) => c.samples.forEach(revokeSample))
    disposeModel(headRef.current)
    headRef.current = null
    setClasses(defaultClasses())
    setPhase('idle')
    setProgress(null)
    setExtracting(null)
    setError(null)
    setTestUrl(null)
    setPrediction(null)
    setBarPcts([])
  }

  const onTrain = async () => {
    if (!canTrain || busy) return
    setError(null)
    setPrediction(null)
    setTestUrl(null)
    setProgress(null)
    setPhase('loading-model')

    try {
      const bundle = await getBundle()
      bundleRef.current = bundle
      setPhase('extracting')

      const xs: Float32Array[] = []
      const ys: number[][] = []
      const total = classes.reduce((sum, c) => sum + c.samples.length, 0)
      let done = 0

      for (let ci = 0; ci < classes.length; ci++) {
        const cls = classes[ci]
        for (const sample of cls.samples) {
          const img = await fileToImage(sample.file)
          xs.push(embeddingOf(bundle, img))
          const row = classes.map(() => 0)
          row[ci] = 1
          ys.push(row)
          done += 1
          setExtracting({ done, total })
        }
      }

      setPhase('training')
      const head = await trainHead(bundle, xs, ys, (p) => setProgress(p))
      disposeModel(headRef.current)
      headRef.current = head
      setPhase('ready')
      setExtracting(null)
    } catch (err) {
      console.error(err)
      setError(t(ui.lab.errorModel))
      setPhase('idle')
      setExtracting(null)
      setProgress(null)
    }
  }

  const onTestFile = async (file: File) => {
    const bundle = bundleRef.current
    const head = headRef.current
    if (!bundle || !head) return

    setTestUrl(URL.createObjectURL(file))
    setPrediction(null)
    setPredicting(true)

    try {
      const img = await fileToImage(file)
      const emb = embeddingOf(bundle, img)
      const probs = predictHead(bundle, head, emb)
      let top = 0
      for (let i = 1; i < probs.length; i++) if (probs[i] > probs[top]) top = i
      setPrediction({ probs, top })
    } catch (err) {
      console.error(err)
      setError(t(ui.lab.errorGeneric))
    } finally {
      setPredicting(false)
    }
  }

  const accentFor = (i: number) => (i === 0 ? 'jade' : 'verm')

  return (
    <section id="lab" className="bg-paper py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHead index="03" title={t(ui.lab.title)} intro={t(ui.lab.intro)} />

        <p
          role="note"
          className="mb-7 rounded-2xl border border-verm/30 bg-verm-soft/60 px-4 py-3 text-[0.9375rem] font-bold text-ink"
        >
          {t(ui.lab.disclaimer)}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {classes.map((cls, i) => {
            const accent = accentFor(i)
            const full = cls.samples.length >= MAX_PER_CLASS
            return (
              <div key={cls.id} className="rounded-2xl border border-ink/12 bg-paper p-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.6875rem] font-extrabold text-white ${
                      accent === 'jade' ? 'bg-jade' : 'bg-verm'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={cls.label}
                    maxLength={20}
                    onChange={(e) => onLabel(cls.id, e.target.value)}
                    placeholder={placeholderLabels()[i]}
                    aria-label={`${t(ui.lab.classLabel)} ${i + 1}`}
                    className="min-h-11 min-w-0 flex-1 rounded-lg border border-ink/15 bg-white px-3 text-[0.9375rem] font-bold outline-none focus:border-ink"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="num t-micro font-extrabold text-mute">
                    {t(ui.lab.count).replace('{n}', String(cls.samples.length))} / {MAX_PER_CLASS}
                  </span>
                  <span className="t-micro text-mute">{t(ui.lab.addImagesHint)}</span>
                </div>

                {cls.samples.length > 0 ? (
                  <ul className="mt-3 grid grid-cols-5 gap-2">
                    {cls.samples.map((s) => (
                      <li key={s.id} className="group relative">
                        <img
                          src={s.thumb}
                          alt=""
                          className="aspect-square w-full rounded-lg border border-ink/10 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => onRemove(cls.id, s.id)}
                          aria-label={t(ui.lab.removeImage)}
                          className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-paper shadow hover:bg-verm"
                        >
                          <svg viewBox="0 0 24 24" className="size-3">
                            <path
                              d="M6 6l12 12M18 6 6 18"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 grid aspect-[4/2] place-items-center rounded-lg border border-dashed border-ink/15 text-center t-small text-mute">
                    {t(ui.lab.emptyHint)}
                  </div>
                )}

                <label
                  className={`mt-3 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border text-sm font-bold transition-colors ${
                    full
                      ? 'cursor-not-allowed border-ink/10 text-ink/30'
                      : 'border-ink/20 hover:border-ink/50'
                  }`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
                    <path
                      d="M12 5v14m-7-7h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                  </svg>
                  {full ? t(ui.lab.full) : t(ui.lab.addImages)}
                  {!full && (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files) onFiles(cls.id, e.target.files)
                        e.target.value = ''
                      }}
                    />
                  )}
                </label>
              </div>
            )
          })}
        </div>

        {/* Training control + progress */}
        <div className="mt-6 rounded-2xl border border-ink/12 bg-ink p-4 text-paper sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-extrabold">{t(ui.lab.howTitle)}</p>
              <p className="mt-1 max-w-xl t-small text-paper/60">{t(ui.lab.how)}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {phase === 'ready' && (
                <button
                  type="button"
                  onClick={reset}
                  className="min-h-12 rounded-full border border-paper/25 px-5 text-sm font-bold hover:border-paper/50"
                >
                  {t(ui.lab.reset)}
                </button>
              )}
              <button
                type="button"
                onClick={onTrain}
                disabled={!canTrain || busy}
                className="min-h-12 rounded-full bg-verm px-6 text-sm font-extrabold text-white transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-paper/15 disabled:text-paper/40"
              >
                {phase === 'ready' ? t(ui.lab.retrain) : t(ui.lab.train)}
              </button>
            </div>
          </div>

          {!canTrain && phase !== 'ready' && (
            <p className="mt-4 text-sm text-paper/70" aria-live="polite">
              {t(ui.lab.minHint)}
            </p>
          )}

          {(phase === 'loading-model' || phase === 'extracting' || phase === 'training') && (
            <div className="mt-4">
              <ProgressBar
                label={
                  phase === 'loading-model'
                    ? t(ui.lab.loadingModel)
                    : phase === 'extracting'
                      ? `${t(ui.lab.extracting)} ${extracting?.done ?? 0}/${extracting?.total ?? 0}`
                      : `${t(ui.lab.epoch)
                          .replace('{e}', String(progress?.epoch ?? 0))
                          .replace('{n}', String(EPOCHS))}`
                }
                value={
                  phase === 'loading-model'
                    ? 0
                    : phase === 'extracting'
                      ? ((extracting?.done ?? 0) / Math.max(1, extracting?.total ?? 1)) * 100
                      : ((progress?.epoch ?? 0) / EPOCHS) * 100
                }
                indeterminate={phase === 'loading-model'}
              />
              {phase === 'training' && progress && (
                <p className="num mt-2 t-micro text-paper/60">
                  {t(ui.lab.loss)} {progress.loss.toFixed(3)} · {t(ui.lab.accuracy)}{' '}
                  {Math.round(progress.acc * 100)}%
                </p>
              )}
            </div>
          )}

          {phase === 'ready' && (
            <p className="mt-4 text-sm font-bold text-jade-bright" aria-live="polite">
              ✓ {t(ui.lab.done)}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-lg bg-verm/20 px-3 py-2 text-sm font-bold text-[#ffd9d0]" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Test + confidence */}
        <div className="mt-6 rounded-2xl border border-ink/12 bg-paper-2/60 p-4 sm:p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="md:w-56 md:shrink-0">
              <h3 className="t-h3">{t(ui.lab.testTitle)}</h3>
              <p className="mt-1 t-small text-mute">{t(ui.lab.testHint)}</p>

              {testUrl ? (
                <div className="relative mt-3 overflow-hidden rounded-xl border border-ink/10">
                  <img src={testUrl} alt={t(ui.lab.testPreview)} className="aspect-square w-full object-cover" />
                  {predicting && (
                    <div className="absolute inset-0 grid place-items-center bg-ink/50 text-paper">
                      <span className="text-sm font-bold">{t(ui.lab.analyzing)}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-3 grid aspect-square w-full place-items-center rounded-xl border border-dashed border-ink/15 text-center t-small text-mute">
                  {phase === 'ready' ? t(ui.lab.noTestYet) : t(ui.lab.trainFirst)}
                </div>
              )}

              <label
                className={`mt-3 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/20 text-sm font-bold transition-colors ${
                  phase === 'ready' ? 'hover:border-ink/50' : 'cursor-not-allowed border-ink/10 text-ink/30'
                }`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
                  <path
                    d="M12 5v14m-7-7h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                </svg>
                {t(ui.lab.testButton)}
                {phase === 'ready' && (
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) onTestFile(f)
                      e.target.value = ''
                    }}
                  />
                )}
              </label>
            </div>

            <div className="min-w-0 flex-1">
              {prediction ? (
                <div>
                  <p className="text-sm font-extrabold">
                    {t(ui.lab.prediction)}
                    <span className={`${accentFor(prediction.top) === 'jade' ? 'text-jade' : 'text-verm'}`}>
                      {labels[prediction.top] || placeholderLabels()[prediction.top]}
                    </span>
                    <span className="num ml-2 t-micro font-extrabold text-mute">
                      {Math.round(prediction.probs[prediction.top] * 100)}%
                    </span>
                  </p>

                  <ul className="mt-4 space-y-3">
                    {classes.map((cls, i) => {
                      const pct = barPcts[i] ?? 0
                      const raw = prediction.probs[i]
                      const accent = accentFor(i)
                      const label = cls.label.trim() || placeholderLabels()[i]
                      return (
                        <li key={cls.id}>
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm font-bold">{label}</span>
                            <span className="num t-micro font-extrabold text-mute">
                              {t(ui.lab.confidence)} {Math.round(raw * 100)}%
                            </span>
                          </div>
                          <div
                            className="mt-1 h-3 overflow-hidden rounded-full bg-ink/10"
                            role="progressbar"
                            aria-valuenow={Math.round(raw * 100)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${label} ${t(ui.lab.confidence)}`}
                          >
                            <div
                              className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                                accent === 'jade' ? 'bg-jade' : 'bg-verm'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  <p className="mt-4 t-micro text-mute">
                    {Math.abs(prediction.probs[0] - prediction.probs[1]) < 0.15
                      ? t(ui.lab.uncertain)
                      : t(ui.lab.disclaimer)}
                  </p>
                </div>
              ) : (
                <div className="grid h-full min-h-40 place-items-center rounded-xl border border-dashed border-ink/15 p-6 text-center">
                  <p className="max-w-sm t-small text-mute">
                    {phase === 'ready' ? t(ui.lab.awaitTest) : t(ui.lab.trainFirst)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 border-t border-ink/10 pt-3 t-micro text-mute">
            {t(ui.lab.privacy)}
          </p>
        </div>
      </div>
    </section>
  )
}

function ProgressBar({
  label,
  value,
  indeterminate,
}: {
  label: string
  value: number
  indeterminate?: boolean
}) {
  const width = indeterminate ? 100 : Math.max(0, Math.min(100, value))
  return (
    <div>
      <p className="num t-micro font-extrabold text-paper/80">{label}</p>
      <div
        className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper/15"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(width)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full bg-jade-bright transition-[width] duration-300 ${
            indeterminate ? 'w-full animate-pulse' : ''
          }`}
          style={indeterminate ? undefined : { width: `${width}%` }}
        />
      </div>
    </div>
  )
}
