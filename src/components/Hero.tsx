import { site } from '../content'
import { Disclaimer } from './Disclaimer'

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="home-title">
      <div className="pulse-decoration" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-content">
        <p className="eyebrow">{site.eyebrow}</p>
        <h1 id="home-title" tabIndex={-1}>{site.title}</h1>
        <p className="hero-subtitle">{site.subtitle}</p>
        <ul className="tag-list" aria-label="项目标签">
          {site.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <dl className="hero-meta">
          {site.meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.status && <span className="status-dot" aria-hidden="true" />}{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="hero-actions">
          <a className="button button-primary" href="#demo">观看60秒演示</a>
          <a className="button button-secondary" href="#metrics">查看指标口径</a>
          <a className="text-action" href="#roadmap">查看路线图 <span aria-hidden="true">↓</span></a>
        </div>
        <Disclaimer text={site.disclaimer} compact />
      </div>
    </section>
  )
}
