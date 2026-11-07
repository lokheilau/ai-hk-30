/** Anniversary maths. The SAR was established on 1997-07-01; the 30th is 2027-07-01. */
export const SAR_ESTABLISHED = Date.UTC(1997, 6, 1, 0, 0, 0) // 1997-07-01T00:00Z
export const THIRTIETH = Date.UTC(2027, 6, 1, 0, 0, 0)

export type Remaining = { days: number; hours: number; mins: number; secs: number; done: boolean }

export function remaining(now: number): Remaining {
  const diff = THIRTIETH - now
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, done: true }
  const secs = Math.floor(diff / 1000)
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
    done: false,
  }
}

/** How far along the 1997→2027 path today sits, 0–100. */
export function anniversaryProgress(now: number): number {
  const span = THIRTIETH - SAR_ESTABLISHED
  const done = Math.min(Math.max(now - SAR_ESTABLISHED, 0), span)
  return (done / span) * 100
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

/** Today as YYYY-MM-DD in local time — used to sign the commitment card. */
export function todayISO(now = Date.now()): string {
  const d = new Date(now)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}
