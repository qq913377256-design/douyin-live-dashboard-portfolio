import type { Metric } from '../content'

export function MetricTable({ metrics }: { metrics: Metric[] }) {
  return (
    <>
      <p className="table-hint">可左右滑动查看全部口径</p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="核心指标口径表，可横向滚动">
        <table>
          <caption>核心指标的定义、默认窗口、业务含义与注意事项</caption>
          <thead><tr><th scope="col">指标</th><th scope="col">定义 / 公式</th><th scope="col">默认窗口</th><th scope="col">业务含义</th><th scope="col">注意事项</th></tr></thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.name}>
                <th scope="row">{metric.name}</th>
                <td><code>{metric.formula}</code></td>
                <td>{metric.window}</td><td>{metric.meaning}</td><td>{metric.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
