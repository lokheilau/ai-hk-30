import { sourceAnchor, sourceNo } from '../lib/citations'
import { useLang } from '../lib/i18n'
import { ui } from '../data/ui'

/**
 * Superscript citation markers. Each links to the matching row in 來源, so a
 * judge reading a claim can reach the official page in one tap — this is the
 * visible form of the 嚴謹性 criterion rather than a footer disclaimer.
 */
export default function Cite({ ids }: { ids: string[] }) {
  const { t } = useLang()
  const valid = ids.filter((id) => sourceNo(id) > 0)
  if (valid.length === 0) return null

  return (
    <sup className="ml-1 whitespace-nowrap">
      {valid.map((id, i) => (
        <a
          key={id}
          href={`#${sourceAnchor(id)}`}
          title={`${t(ui.a11y.citeRef)} ${sourceNo(id)}`}
          className="num rounded px-0.5 text-[0.6875rem] font-bold text-jade underline decoration-jade/40 underline-offset-2 hover:decoration-jade"
        >
          [{sourceNo(id)}]{i < valid.length - 1 ? '' : ''}
        </a>
      ))}
    </sup>
  )
}
