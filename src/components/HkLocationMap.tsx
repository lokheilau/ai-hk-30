import hkMapJpg from '../assets/hk-map.jpg'
import hkMapWebp from '../assets/hk-map.webp'
import { nodes } from '../data/nodes'
import type { MapNode } from '../data/types'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'

const OFFICIAL_MAP = 'https://www.map.gov.hk'

/**
 * Marker positions are percentages of the base map image. They are computed
 * from the printed map's centre (22.3696°N, 114.1371°E) and scale (1:288895),
 * so they are schematic rather than survey-accurate — hence the note below.
 */
const POINTS: { n: number; x: number; y: number; nodeIds: string[]; loc: 'sciencePark' | 'cyberport' | 'lokMaChau' }[] = [
  { n: 1, x: 56.6, y: 43.2, nodeIds: ['node-hkgai', 'node-innohk'], loc: 'sciencePark' },
  { n: 2, x: 49.4, y: 64.8, nodeIds: ['node-aisc'], loc: 'cyberport' },
  { n: 3, x: 43.7, y: 29.9, nodeIds: ['node-hsitp'], loc: 'lokMaChau' },
]

// Northern Metropolis is a region, so it is drawn as a shaded area, not a dot.
const REGION = { nodeId: 'node-northmetropolis', left: 33, top: 24, width: 27, height: 14 }

export default function HkLocationMap({ onOpen }: { onOpen: (node: MapNode) => void }) {
  const { t } = useLang()
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const northNode = byId.get(REGION.nodeId)

  return (
    <div className="mt-6 rounded-2xl border border-ink/12 bg-paper p-4 sm:p-5">
      <h3 className="t-h3">{t(ui.map.hkMapTitle)}</h3>

      <div className="relative mt-4 overflow-hidden rounded-xl border border-ink/10 bg-[#eef4f1]">
        <picture>
          <source type="image/webp" srcSet={hkMapWebp} />
          <img
            src={hkMapJpg}
            alt={t(ui.map.hkMapTitle)}
            className="block h-auto w-full"
            width={1684}
            height={1191}
            loading="lazy"
          />
        </picture>

        {/* Northern Metropolis region (shaded, clickable) */}
        {northNode && (
          <button
            type="button"
            onClick={() => onOpen(northNode)}
            aria-label={`4 ${t(ui.map.hkMapLoc.northernMetro)} — ${t(northNode.name)}`}
            className="absolute z-10 rounded-lg border border-verm/60 bg-verm/10 transition-colors hover:bg-verm/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-verm"
            style={{
              left: `${REGION.left}%`,
              top: `${REGION.top}%`,
              width: `${REGION.width}%`,
              height: `${REGION.height}%`,
            }}
          >
            <span className="num grid h-full place-items-center text-[0.6875rem] font-extrabold text-verm">
              ④ {t(ui.map.hkMapLoc.northernMetro)}
            </span>
          </button>
        )}

        {/* Point markers */}
        {POINTS.map((p) => {
          const node = byId.get(p.nodeIds[0])
          if (!node) return null
          return (
            <button
              key={p.n}
              type="button"
              onClick={() => onOpen(node)}
              aria-label={`${p.n} ${t(ui.map.hkMapLoc[p.loc])} — ${t(node.name)}`}
              className="absolute z-20 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verm"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="num grid size-7 place-items-center rounded-full border-2 border-white bg-verm text-[11px] font-extrabold text-white shadow-md">
                {p.n}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-2 t-micro text-mute">{t(ui.map.hkMapTap)}</p>

      <p className="mt-1 t-micro text-ink/70">
        {`① ${t(ui.map.hkMapLoc.sciencePark)}（HKGAI · InnoHK） · ② ${t(ui.map.hkMapLoc.cyberport)} · ③ ${t(ui.map.hkMapLoc.lokMaChau)} · ④ ${t(ui.map.hkMapLoc.northernMetro)}`}
      </p>

      <p className="mt-3 border-t border-ink/10 pt-3 t-micro text-mute">
        {t(ui.map.hkMapNote)}{' '}
        <a
          href={OFFICIAL_MAP}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-mute/50 underline-offset-2 hover:decoration-ink"
        >
          {t(ui.map.hkMapBase)}
        </a>
      </p>
    </div>
  )
}
