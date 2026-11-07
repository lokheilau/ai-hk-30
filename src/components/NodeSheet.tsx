import { useEffect, useRef, useState } from 'react'
import type { MapNode } from '../data/types'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import Cite from './Cite'

type Tab = 'principle' | 'national' | 'hkRole' | 'youth' | 'sources'

const TABS: { id: Tab; label: { zh: string; en: string } }[] = [
  { id: 'principle', label: ui.map.tabs.principle },
  { id: 'national', label: ui.map.tabs.national },
  { id: 'hkRole', label: ui.map.tabs.hkRole },
  { id: 'youth', label: ui.map.tabs.youth },
  { id: 'sources', label: ui.map.tabs.sources },
]

export default function NodeSheet({ node, onClose }: { node: MapNode | null; onClose: () => void }) {
  const { t } = useLang()
  const [tab, setTab] = useState<Tab>('principle')
  const panel = useRef<HTMLDivElement | null>(null)
  const restoreTo = useRef<Element | null>(null)

  useEffect(() => {
    if (!node) return
    setTab('principle')
    restoreTo.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel.current) return
      // Minimal focus trap: keep Tab inside the sheet.
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      if (restoreTo.current instanceof HTMLElement) restoreTo.current.focus()
    }
  }, [node, onClose])

  if (!node) return null

  const body: Record<Tab, React.ReactNode> = {
    principle: (
      <div className="space-y-3">
        <p className="t-body text-paper/85">{t(node.principle)}</p>
        <div className="rounded-xl border border-verm/40 bg-verm/10 p-3">
          <p className="t-micro font-extrabold tracking-wide text-verm-bright">
            {t(ui.map.mythLabel)}
          </p>
          <p className="mt-1 t-small text-paper/80">{t(node.myth)}</p>
        </div>
      </div>
    ),
    national: (
      <div className="space-y-3">
        <p className="t-body text-paper/85">{t(node.national)}</p>
        {node.metrics && node.metrics.length > 0 && (
          <ul className="grid grid-cols-2 gap-2">
            {node.metrics.map((m, i) => (
              <li key={i} className="rounded-xl border border-paper/15 bg-paper/5 p-3">
                <span className="num block text-lg font-extrabold leading-none">
                  {m.value}
                  <span className="ml-1 text-[0.6875rem] font-bold text-paper/60">
                    {t(m.unit)}
                  </span>
                </span>
                <span className="mt-1 block t-micro text-paper/45">
                  {t(ui.map.metricAsOf)} {m.asOf}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
    hkRole: <p className="t-body text-paper/85">{t(node.hkRole)}</p>,
    youth: (
      <div className="rounded-xl border border-jade-bright/40 bg-jade/15 p-3">
        <p className="t-body text-paper/90">{t(node.youth)}</p>
      </div>
    ),
    sources: (
      <div>
        <Cite ids={node.sourceIds} />
        <ul className="mt-2 space-y-2">
          {node.sourceIds.map((id) => (
            <li key={id}>
              <a
                href={`#src-${id}`}
                onClick={onClose}
                className="block rounded-xl border border-paper/15 px-3 py-2 t-small text-paper/80 hover:border-paper/40"
              >
                {t(ui.map.tabs.sources)} · {id}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${t(ui.map.detailLabel)}: ${t(node.name)}`}
    >
      <button
        type="button"
        aria-label={t(ui.map.close)}
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />
      <div
        ref={panel}
        tabIndex={-1}
        className="relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-3xl bg-ink text-paper shadow-2xl outline-none sm:max-w-xl sm:rounded-3xl"
      >
        <div className="flex items-start gap-3 border-b border-paper/10 p-4">
          <div className="min-w-0 flex-1">
            <p className="t-micro font-bold text-paper/45">{t(node.place)}</p>
            <h3 className="mt-0.5 t-h3 leading-snug">{t(node.name)}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(ui.map.close)}
            className="-mr-1 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-paper/60 hover:bg-paper/10 hover:text-paper"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div
          role="tablist"
          aria-label={t(ui.map.detailLabel)}
          className="hide-scrollbar flex gap-1 overflow-x-auto border-b border-paper/10 px-3 py-2"
        >
          {TABS.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              type="button"
              aria-selected={tab === tb.id}
              onClick={() => setTab(tb.id)}
              className={`min-h-9 shrink-0 rounded-full px-3 t-micro font-extrabold transition-colors ${
                tab === tb.id ? 'bg-paper text-ink' : 'text-paper/60 hover:bg-paper/10'
              }`}
            >
              {t(tb.label)}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {body[tab]}
        </div>
      </div>
    </div>
  )
}
