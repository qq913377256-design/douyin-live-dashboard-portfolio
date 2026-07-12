import type { Metric } from '../content'

export function MetricTable({ metrics }: { metrics: Metric[] }) {
  return (
    <>
      <p className="table-hint">指标名称与看板中的提示文案保持一致</p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="核心指标口径表，可横向滚动">
        <table className="metric-table">
          <caption>核心指标与Tooltip短文案</caption>
          <thead><tr><th scope="col">指标</th><th scope="col">Tooltip短文案</th></tr></thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.name}>
                <th scope="row">{metric.name}</th>
                <td>{metric.tooltip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
