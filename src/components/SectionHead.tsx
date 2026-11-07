type Props = {
  index: string
  title: string
  intro?: string
  aside?: React.ReactNode
}

export default function SectionHead({ index, title, intro, aside }: Props) {
  return (
    <div className="mb-7 sm:mb-9">
      <div className="flex items-baseline gap-3">
        <span className="num t-micro font-extrabold text-verm">{index}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/15" />
        {aside}
      </div>
      <h2 className="mt-3 t-h2 text-balance">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl t-body text-ink/70">{intro}</p>}
    </div>
  )
}
