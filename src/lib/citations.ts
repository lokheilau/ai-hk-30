import { sources } from '../data/sources'

const order = new Map(sources.map((s, i) => [s.id, i + 1]))

export const sourceNo = (id: string): number => order.get(id) ?? 0

export const sourceById = (id: string) => sources.find((s) => s.id === id)

export const sourceAnchor = (id: string) => `src-${id}`
