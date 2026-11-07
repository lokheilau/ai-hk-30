import { useState } from 'react'
import { nodes } from '../data/nodes'
import type { MapNode } from '../data/types'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'
import HkLocationMap from './HkLocationMap'
import NodeSheet from './NodeSheet'
import SectionHead from './SectionHead'

const OFFICIAL_MAP = 'http://bzdt.ch.mnr.gov.cn/'

export default function MapPanel() {
  const { t } = useLang()
  const [open, setOpen] = useState<MapNode | null>(null)

  const national = nodes.filter((n) => n.band === 'cn')
  const hk = nodes.filter((n) => n.band === 'hk')

  const NodeButton = ({ node, index }: { node: MapNode; index: number }) => (
    <button
      type="button"
      onClick={() => setOpen(node)}
      className="group relative flex w-full items-start gap-3 rounded-2xl border border-paper/15 bg-paper/[0.04] p-3 text-left transition-colors hover:border-paper/40 hover:bg-paper/[0.08] active:scale-[0.995]"
    >
      <span
        aria-hidden="true"
        className={`num grid size-7 shrink-0 place-items-center rounded-full text-[0.6875rem] font-extrabold ${
          node.band === 'cn' ? 'bg-jade/30 text-[#8ff0d9]' : 'bg-verm/30 text-[#ffb9a6]'
        }`}
      >
        {index + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.875rem] font-bold leading-snug text-paper">
          {t(node.name)}
        </span>
        <span className="mt-0.5 block t-micro leading-snug text-paper/50">{t(node.place)}</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-paper/35 transition-transform group-hover:translate-x-0.5 group-hover:text-paper/70"
      >
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )

  return (
    <section id="map" className="bg-paper-2/60 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHead index="02" title={t(ui.map.title)} intro={t(ui.map.intro)} />

        <div className="relative overflow-hidden rounded-3xl border border-ink/15 bg-ink p-4 text-paper sm:p-6">
          <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-25" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-jade/20 blur-3xl"
          />

          <div className="relative">
            {/* Band: national capability */}
            <div className="flex items-center gap-2">
              <span className="num t-micro font-extrabold text-[#8ff0d9]">A</span>
              <h3 className="t-micro font-extrabold tracking-wide text-paper/70">
                {t(ui.map.bandCn)}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-paper/15" />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {national.map((n, i) => (
                <NodeButton key={n.id} node={n} index={i} />
              ))}
            </div>

            {/* Connector: national capability flowing to Hong Kong's role */}
            <div className="relative my-4 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-jade/10 via-jade/60 to-verm/60" />
              <span className="flex items-center gap-1.5 rounded-full border border-paper/20 px-3 py-1 t-micro font-bold text-paper/60">
                {t(ui.map.nationalLabel)}
                <svg viewBox="0 0 24 24" className="size-3">
                  <path
                    d="M4 12h14m-4-4 4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t(ui.map.hkLabel)}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-verm/60 via-verm/60 to-verm/10" />
            </div>

            {/* Band: Hong Kong's role */}
            <div className="flex items-center gap-2">
              <span className="num t-micro font-extrabold text-[#ffb9a6]">B</span>
              <h3 className="t-micro font-extrabold tracking-wide text-paper/70">
                {t(ui.map.bandHk)}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-paper/15" />
            </div>
            <div className="mt-3 grid gap-2">
              {hk.map((n, i) => (
                <NodeButton key={n.id} node={n} index={i} />
              ))}
            </div>

            <div className="mt-5 border-t border-paper/10 pt-4">
              <p className="t-micro leading-relaxed text-paper/45">
                <strong className="font-extrabold text-paper/60">{t(ui.map.diagramTitle)}</strong>
                {' — '}
                {t(ui.map.diagramNote)}
              </p>
              <a
                href={OFFICIAL_MAP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-paper/20 px-3 t-micro font-bold text-paper/70 hover:border-paper/50 hover:text-paper"
              >
                {t(ui.map.officialMap)}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3">
                  <path
                    d="M14 4h6v6m0-6L10 14M9 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only">({t(ui.a11y.opensNew)})</span>
              </a>
            </div>
          </div>
        </div>

        <HkLocationMap onOpen={setOpen} />
      </div>

      <NodeSheet node={open} onClose={() => setOpen(null)} />
    </section>
  )
}
