import { nodes } from '../data/nodes'
import type { MapNode } from '../data/types'
import { ui } from '../data/ui'
import { useLang } from '../lib/i18n'

const OFFICIAL_MAP = 'http://bzdt.ch.mnr.gov.cn/'

const VIEW_W = 400
const VIEW_H = 300

/**
 * Approximate schematic positions, derived from real lat/lng (mapped into the
 * 400×300 viewBox below). These are NOT survey-accurate — the panel is
 * labelled 示意圖 for that reason. One location may hold several nodes (e.g.
 * both HKGAI and InnoHK sit in the Science Park).
 */
const LOCATIONS: {
  n: number
  x: number
  y: number
  nodeIds: string[]
  loc: 'sciencePark' | 'cyberport' | 'lokMaChau' | 'northernMetro'
}[] = [
  { n: 1, x: 238, y: 120, nodeIds: ['node-hkgai', 'node-innohk'], loc: 'sciencePark' },
  { n: 2, x: 190, y: 196, nodeIds: ['node-aisc'], loc: 'cyberport' },
  { n: 3, x: 157, y: 63, nodeIds: ['node-hsitp'], loc: 'lokMaChau' },
  { n: 4, x: 205, y: 74, nodeIds: ['node-northmetropolis'], loc: 'northernMetro' },
]

export default function HkLocationMap({ onOpen }: { onOpen: (node: MapNode) => void }) {
  const { t } = useLang()
  const byId = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className="mt-6 rounded-2xl border border-ink/12 bg-paper p-4 sm:p-5">
      <h3 className="t-h3">{t(ui.map.hkMapTitle)}</h3>

      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-[#eef4f1]">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={t(ui.map.hkMapTitle)}
        >
          {/* Northern Metropolis region (schematic area) */}
          <rect x="45" y="50" width="280" height="50" rx="10" fill="var(--color-verm)" opacity="0.13" />
          <text x="185" y="70" fontSize="10" fontWeight="700" fill="var(--color-verm)" textAnchor="middle">
            {t(ui.map.hkMapLoc.northernMetro)}
          </text>

          {/* Shenzhen boundary (dashed) */}
          <line
            x1="40"
            y1="46"
            x2="330"
            y2="46"
            stroke="var(--color-verm)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="300" y="34" fontSize="11" fill="var(--color-mute)" textAnchor="end">
            {t(ui.map.shenzhen)}
          </text>

          {/* Mainland: New Territories + Kowloon */}
          <path
            d="M40,52 L330,52 L336,84 L318,120 L288,142 L264,150 L244,150 L216,156 L200,170 L192,164 L180,150 L150,150 L118,150 L88,146 L60,120 L48,80 Z"
            fill="var(--color-jade-soft)"
            stroke="var(--color-jade)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Hong Kong Island */}
          <path
            d="M172,178 L202,174 L214,178 L220,190 L214,202 L200,208 L186,204 L176,196 Z"
            fill="var(--color-jade-soft)"
            stroke="var(--color-jade)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Lantau */}
          <path
            d="M50,116 L82,110 L102,122 L104,142 L94,168 L72,180 L50,168 L44,142 Z"
            fill="var(--color-jade-soft)"
            stroke="var(--color-jade)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Lamma (small island south of HK Island) */}
          <path
            d="M170,212 L182,214 L180,224 L168,220 Z"
            fill="var(--color-jade-soft)"
            stroke="var(--color-jade)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Land labels */}
          <text x="150" y="122" fontSize="11" fontWeight="700" fill="var(--color-jade)" textAnchor="middle">
            {t(ui.map.nt)}
          </text>
          <text x="196" y="161" fontSize="10" fill="var(--color-jade)" textAnchor="middle">
            {t(ui.map.kowloon)}
          </text>
          <text x="196" y="194" fontSize="10" fill="var(--color-jade)" textAnchor="middle">
            {t(ui.map.hkIsland)}
          </text>
          <text x="72" y="150" fontSize="10" fill="var(--color-jade)" textAnchor="middle">
            {t(ui.map.lantau)}
          </text>
        </svg>

        {LOCATIONS.map((loc) => {
          const primary = byId.get(loc.nodeIds[0])
          if (!primary) return null
          return (
            <button
              key={loc.n}
              type="button"
              onClick={() => onOpen(primary)}
              aria-label={`${loc.n} ${t(ui.map.hkMapLoc[loc.loc])} — ${t(primary.name)}`}
              className="absolute z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verm"
              style={{ left: `${(loc.x / VIEW_W) * 100}%`, top: `${(loc.y / VIEW_H) * 100}%` }}
            >
              <span className="num grid size-7 place-items-center rounded-full border-2 border-white bg-verm text-[11px] font-extrabold text-white shadow-md">
                {loc.n}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-2 t-micro text-mute">{t(ui.map.hkMapTap)}</p>

      <p className="mt-1 t-micro text-ink/70">
        {LOCATIONS.map((loc, i) => {
          const sep = i < LOCATIONS.length - 1 ? ' · ' : ''
          return (
            <span key={loc.n}>
              {loc.n} {t(ui.map.hkMapLoc[loc.loc])}
              {loc.nodeIds.length > 1 ? '（HKGAI · InnoHK）' : ''}
              {sep}
            </span>
          )
        })}
      </p>

      <p className="mt-3 border-t border-ink/10 pt-3 t-micro text-mute">
        {t(ui.map.hkMapNote)}{' '}
        <a
          href={OFFICIAL_MAP}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-mute/50 underline-offset-2 hover:decoration-ink"
        >
          {t(ui.map.officialMap)}
        </a>
      </p>
    </div>
  )
}
