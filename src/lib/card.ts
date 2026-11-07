/**
 * Canvas card rendering.
 *
 * Cards are drawn at a fixed 1080×1350 (4:5, feed-friendly) and previewed by
 * scaling the same canvas down with CSS, so what the user sees is what is
 * exported. All artwork is procedural — no external images, no stock assets,
 * which keeps the originality requirement clean and the export instant.
 *
 * Two rules the drawing code must never break:
 *  1. The words 願景/設想 (vision / proposal) are baked into the artwork, not
 *     just the surrounding copy, so a shared screenshot cannot imply the 2027
 *     scenes are facts.
 *  2. Text is measured and wrapped per language: CJK breaks by character,
 *     Latin by word. A naive split(' ') would break Chinese into one long line.
 */

export const CARD_W = 1080
export const CARD_H = 1350

const FONT_STACK =
  '"PingFang TC", "PingFang HK", "Microsoft JhengHei", "Noto Sans TC", "Hiragino Sans", sans-serif'

type Ctx = CanvasRenderingContext2D

/** Deterministic PRNG so one scenario always produces one identical card. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const isCJK = (ch: string) => /[\u3000-\u9fff\uf900-\ufaff\uff00-\uffef]/.test(ch)

/** Tokenise into break-able units: single CJK glyphs, whole Latin words. */
function tokenize(text: string): string[] {
  const out: string[] = []
  let buf = ''
  for (const ch of text) {
    if (isCJK(ch) || ch === ' ') {
      if (buf) {
        out.push(buf)
        buf = ''
      }
      out.push(ch)
    } else {
      buf += ch
    }
  }
  if (buf) out.push(buf)
  return out
}

function wrapText(ctx: Ctx, text: string, maxWidth: number, maxLines: number): string[] {
  const tokens = tokenize(text)
  const lines: string[] = []
  let line = ''

  for (const token of tokens) {
    const candidate = line + token
    if (ctx.measureText(candidate).width <= maxWidth || line === '') {
      line = candidate
      continue
    }
    lines.push(line.trimEnd())
    if (lines.length === maxLines) break
    line = token === ' ' ? '' : token
  }
  if (lines.length < maxLines && line.trim()) lines.push(line.trimEnd())

  if (lines.length === maxLines) {
    // Ellipsise only when content genuinely overflowed.
    const last = lines[maxLines - 1]
    if (ctx.measureText(last).width > maxWidth) {
      let cut = last
      while (cut.length > 1 && ctx.measureText(cut + '…').width > maxWidth) {
        cut = cut.slice(0, -1)
      }
      lines[maxLines - 1] = cut + '…'
    }
  }
  return lines
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

function font(ctx: Ctx, size: number, weight: number) {
  ctx.font = `${weight} ${size}px ${FONT_STACK}`
}

/** Procedural background: seeded arcs + dot grid + vignette. */
function paintBackdrop(ctx: Ctx, seed: number, accent: [string, string]) {
  const rand = mulberry32(seed)

  const bg = ctx.createLinearGradient(0, 0, CARD_W, CARD_H)
  bg.addColorStop(0, '#0b1220')
  bg.addColorStop(0.55, '#101a2d')
  bg.addColorStop(1, '#0a1a1a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, CARD_W, CARD_H)

  // Concentric rings, off-canvas centre so the arcs read as orbital paths.
  const cx = CARD_W * (0.2 + rand() * 0.6)
  const cy = CARD_H * (0.18 + rand() * 0.3)
  ctx.save()
  for (let i = 0; i < 7; i++) {
    const r = 160 + i * 92 + rand() * 40
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = i % 2 === 0 ? accent[0] : accent[1]
    ctx.globalAlpha = 0.06 + (i % 3) * 0.02
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
  ctx.restore()

  // Glow blobs
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 420)
  glow.addColorStop(0, accent[0])
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.globalAlpha = 0.22
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, CARD_W, CARD_H)

  // Dot grid
  ctx.globalAlpha = 0.12
  ctx.fillStyle = '#cfe4ff'
  for (let x = 48; x < CARD_W; x += 44) {
    for (let y = 48; y < CARD_H; y += 44) {
      ctx.fillRect(x, y, 1.6, 1.6)
    }
  }

  ctx.globalAlpha = 1
  const vign = ctx.createRadialGradient(CARD_W / 2, CARD_H / 2, 260, CARD_W / 2, CARD_H / 2, 900)
  vign.addColorStop(0, 'rgba(0,0,0,0)')
  vign.addColorStop(1, 'rgba(0,0,0,0.55)')
  ctx.fillStyle = vign
  ctx.fillRect(0, 0, CARD_W, CARD_H)
}

function paintBrandRail(ctx: Ctx, lang: 'zh' | 'en') {
  ctx.save()
  font(ctx, 26, 800)
  ctx.fillStyle = 'rgba(246,243,236,0.92)'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(lang === 'zh' ? 'AI·香港30' : 'AI · HK 30', 72, 96)

  font(ctx, 22, 600)
  ctx.fillStyle = 'rgba(246,243,236,0.5)'
  const right = lang === 'zh' ? '青年AI科普站' : 'Youth AI Science Station'
  ctx.textAlign = 'right'
  ctx.fillText(right, CARD_W - 72, 96)
  ctx.textAlign = 'left'

  ctx.strokeStyle = 'rgba(246,243,236,0.16)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(72, 122)
  ctx.lineTo(CARD_W - 72, 122)
  ctx.stroke()
  ctx.restore()
}

function paintWatermarkYear(ctx: Ctx) {
  ctx.save()
  font(ctx, 420, 900)
  ctx.fillStyle = 'rgba(255,255,255,0.035)'
  ctx.textAlign = 'right'
  ctx.fillText('2027', CARD_W + 10, 470)
  ctx.restore()
}

function paintFooter(ctx: Ctx, url: string, note: string) {
  ctx.save()
  ctx.strokeStyle = 'rgba(246,243,236,0.16)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(72, CARD_H - 132)
  ctx.lineTo(CARD_W - 72, CARD_H - 132)
  ctx.stroke()

  font(ctx, 22, 600)
  ctx.fillStyle = 'rgba(246,243,236,0.62)'
  ctx.fillText(url, 72, CARD_H - 82)

  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(246,243,236,0.42)'
  font(ctx, 20, 500)
  ctx.fillText(note, CARD_W - 72, CARD_H - 82)
  ctx.restore()
}

export type VisionCardModel = {
  scenarioName: string
  vision: string
  tag: string
  name: string
  dateLine: string
  url: string
  note: string
  seed: number
  lang: 'zh' | 'en'
}

export function drawVisionCard(ctx: Ctx, m: VisionCardModel) {
  ctx.clearRect(0, 0, CARD_W, CARD_H)
  paintBackdrop(ctx, m.seed, ['#16b39a', '#e8603f'])
  paintWatermarkYear(ctx)
  paintBrandRail(ctx, m.lang)

  ctx.save()
  // Scenario kicker
  font(ctx, 30, 700)
  ctx.fillStyle = '#e8603f'
  const kicker = wrapText(ctx, m.scenarioName, CARD_W - 144, 1)[0] ?? ''
  ctx.fillText(kicker, 72, 250)

  // Vision statement — the heart of the card
  font(ctx, m.lang === 'zh' ? 58 : 54, 800)
  ctx.fillStyle = '#f6f3ec'
  const lines = wrapText(ctx, m.vision, CARD_W - 144, 6)
  let y = 360
  for (const line of lines) {
    ctx.fillText(line, 72, y)
    y += m.lang === 'zh' ? 84 : 76
  }

  // Tag pill: the honesty marker, drawn as artwork
  const tagY = Math.min(y + 40, CARD_H - 330)
  font(ctx, 26, 800)
  const tagW = ctx.measureText(m.tag).width + 56
  ctx.fillStyle = 'rgba(22,179,154,0.16)'
  roundRect(ctx, 72, tagY, tagW, 52, 26)
  ctx.fill()
  ctx.strokeStyle = 'rgba(22,179,154,0.6)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.fillStyle = '#7fe3cf'
  ctx.fillText(m.tag, 100, tagY + 35)

  // Signature
  if (m.name.trim()) {
    font(ctx, 34, 700)
    ctx.fillStyle = '#f6f3ec'
    ctx.fillText(m.name.trim().slice(0, 24), 72, CARD_H - 220)
  }
  font(ctx, 24, 500)
  ctx.fillStyle = 'rgba(246,243,236,0.55)'
  ctx.fillText(m.dateLine, 72, CARD_H - 178)
  ctx.restore()

  paintFooter(ctx, m.url, m.note)
}

export type CommitmentCardModel = {
  lines: string[]
  statement: string
  name: string
  dateLine: string
  url: string
  tag: string
  note: string
  seed: number
  lang: 'zh' | 'en'
}

export function drawCommitmentCard(ctx: Ctx, m: CommitmentCardModel) {
  ctx.clearRect(0, 0, CARD_W, CARD_H)
  paintBackdrop(ctx, m.seed, ['#16b39a', '#c8442b'])
  paintWatermarkYear(ctx)
  paintBrandRail(ctx, m.lang)

  ctx.save()
  font(ctx, 30, 700)
  ctx.fillStyle = '#e8603f'
  ctx.fillText(m.tag, 72, 226)

  font(ctx, m.lang === 'zh' ? 40 : 36, 700)
  ctx.fillStyle = '#f6f3ec'
  let y = 300
  for (const item of m.lines.slice(0, 5)) {
    // Tick glyph drawn as a path: no font dependency, always renders.
    ctx.save()
    ctx.strokeStyle = '#7fe3cf'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(76, y - 12)
    ctx.lineTo(88, y - 1)
    ctx.lineTo(108, y - 24)
    ctx.stroke()
    ctx.restore()

    const wrapped = wrapText(ctx, item, CARD_W - 200, 2)
    for (const line of wrapped) {
      ctx.fillText(line, 136, y)
      y += m.lang === 'zh' ? 56 : 52
    }
    y += 26
  }

  // Statement
  const stY = Math.max(y + 20, CARD_H - 430)
  font(ctx, m.lang === 'zh' ? 30 : 26, 600)
  ctx.fillStyle = 'rgba(246,243,236,0.8)'
  let sy = stY
  for (const line of wrapText(ctx, m.statement, CARD_W - 144, 3)) {
    ctx.fillText(line, 72, sy)
    sy += 44
  }

  // Signature block
  ctx.strokeStyle = 'rgba(246,243,236,0.3)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(72, CARD_H - 268)
  ctx.lineTo(460, CARD_H - 268)
  ctx.stroke()

  font(ctx, 34, 700)
  ctx.fillStyle = '#f6f3ec'
  ctx.fillText(m.name.trim().slice(0, 24) || '—', 72, CARD_H - 226)

  font(ctx, 22, 500)
  ctx.fillStyle = 'rgba(246,243,236,0.55)'
  ctx.fillText(m.dateLine, 72, CARD_H - 188)
  ctx.restore()

  paintFooter(ctx, m.url, m.note)
}

/** Export with an iOS-safe fallback: try a blob download, else open the image. */
export async function exportCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
): Promise<'downloaded' | 'opened'> {
  const blob = await new Promise<Blob | null>((resolve) => {
    try {
      canvas.toBlob((b) => resolve(b), 'image/png')
    } catch {
      resolve(null)
    }
  })
  if (!blob) return 'opened'

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const supportsDownload = 'download' in a

  if (supportsDownload) {
    a.href = url
    a.download = filename
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 10_000)
    return 'downloaded'
  }

  window.open(url, '_blank', 'noopener')
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  return 'opened'
}
