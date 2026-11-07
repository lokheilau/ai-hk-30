import { useEffect, useRef, useState } from 'react'
import { CARD_H, CARD_W, exportCanvas } from '../lib/card'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'

type Props = {
  draw: (ctx: CanvasRenderingContext2D) => void
  /** Changes whenever the artwork should be redrawn. */
  deps: unknown[]
  filename: string
  alt: string
}

/**
 * Fixed-size canvas scaled by CSS. Rendering at 1080×1350 and displaying at
 * container width means the preview and the exported PNG are the same pixels.
 */
export default function CardFrame({ draw, deps, filename, alt }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [state, setState] = useState<'idle' | 'saved' | 'opened'>('idle')
  const { t } = useLang()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    draw(ctx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const onDownload = async () => {
    const canvas = ref.current
    if (!canvas) return
    const result = await exportCanvas(canvas, filename)
    setState(result === 'downloaded' ? 'saved' : 'opened')
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-[0_18px_50px_-24px_rgba(11,18,32,0.5)]">
        <canvas
          ref={ref}
          width={CARD_W}
          height={CARD_H}
          role="img"
          aria-label={alt}
          className="block h-auto w-full"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-extrabold text-paper transition-transform active:scale-[0.99]"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
            <path
              d="M12 3v11m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t(ui.vision.download)}
        </button>
        <p className="text-center t-micro text-mute" aria-live="polite">
          {state === 'saved' || state === 'opened' ? t(ui.vision.downloadHint) : ''}
        </p>
      </div>
    </div>
  )
}
