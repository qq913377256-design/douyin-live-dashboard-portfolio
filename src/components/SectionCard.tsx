import type { ReactNode } from 'react'

type Props = {
  id: string
  number: string
  title: string
  intro?: string
  status?: string
  children: ReactNode
}

export function SectionCard({ id, number, title, intro, status, children }: Props) {
  return (
    <section className="section-card" id={id} aria-labelledby={`${id}-title`}>
      <header className="section-heading">
        <span className="section-number">{number}</span>
        <div>
          <div className="section-title-row">
            <h2 id={`${id}-title`} tabIndex={-1}>
              {title}
              <a className="heading-anchor" href={`#${id}`} aria-label={`链接到${title}`}>#</a>
            </h2>
            {status && <span className="status-tag status-badge-planned">{status}</span>}
          </div>
          {intro && <p className="section-intro">{intro}</p>}
        </div>
      </header>
      <div className="section-body">{children}</div>
    </section>
  )
}
