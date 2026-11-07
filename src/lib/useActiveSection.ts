import { useEffect, useState } from 'react'

/** Tracks which section is dominant in the viewport, for nav highlighting. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const ratios = new Map<string, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.intersectionRatio)
        let best = active
        let top = 0
        for (const [id, r] of ratios) {
          if (r > top) {
            top = r
            best = id
          }
        }
        if (top > 0.08) setActive(best)
      },
      { rootMargin: '-15% 0px -50% 0px', threshold: [0, 0.1, 0.3, 0.6, 1] },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')])

  return active
}
