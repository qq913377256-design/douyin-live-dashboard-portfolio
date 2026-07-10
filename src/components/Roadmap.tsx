import type { RoadmapStage } from '../content'

export function Roadmap({ stages }: { stages: RoadmapStage[] }) {
  return (
    <div className="roadmap-grid">
      {stages.map((stage) => (
        <article key={stage.phase} className={`roadmap-card roadmap-${stage.status === '已完成' ? 'done' : stage.status === '规划中' ? 'planned' : 'future'}`}>
          <div className="roadmap-topline">
            <span className="phase">{stage.phase}</span><span className="priority">{stage.priority}</span>
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.goal}</p>
          <p className="roadmap-features">{stage.features}</p>
          <span className="status-tag">{stage.status}</span>
        </article>
      ))}
    </div>
  )
}
