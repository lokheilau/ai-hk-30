export type Lang = 'zh' | 'en'

/** Every user-visible string exists in both languages. No fallbacks, no gaps. */
export type Bi = { zh: string; en: string }

export interface Source {
  id: string
  org: Bi
  title: Bi
  url: string
  /** ISO date the page was opened and the claim checked. */
  accessed: string
}

export interface Metric {
  value: string
  unit: Bi
  /** YYYY-MM — every number is anchored in time, never free-floating. */
  asOf: string
  note?: Bi
}

export type Track = 'cn' | 'hk'

export interface Milestone {
  id: string
  year: number
  track: Track
  title: Bi
  body: Bi
  sourceIds: string[]
}

export interface MapNode {
  id: string
  band: Track
  name: Bi
  place: Bi
  /** Mechanism, in plain language. This is what carries 科學性. */
  principle: Bi
  national: Bi
  hkRole: Bi
  youth: Bi
  myth: Bi
  metrics?: Metric[]
  sourceIds: string[]
  /** Which national capability this HK node connects to, for the relation lines. */
  links?: string[]
}

export interface Scenario {
  id: string
  name: Bi
  problem: Bi
  vision: Bi
  youthAction: Bi
  /** Deterministic art seed so the same scenario always renders the same card. */
  seed: number
  /** Only present when the scenario quotes a figure; proposals need no source. */
  sourceIds?: string[]
}

export interface Commitment {
  id: string
  text: Bi
  why: Bi
}
