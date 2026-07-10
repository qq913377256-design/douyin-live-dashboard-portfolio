import { useCallback, useEffect, useState } from 'react'
import {
  alerts, alertStatusNote, analysisChains, architecture, businessQuestions, dataStatement, eventDefinitions,
  faqs, features, footerCopy, metrics, navItems, observableData, reportFlow, reportOutline,
  roadmap, sectionIntros, site, techTags, unavailableData,
} from './content'
import { DashboardPreview } from './components/DashboardPreview'
import { Disclaimer } from './components/Disclaimer'
import { Hero } from './components/Hero'
import { MetricTable } from './components/MetricTable'
import { Roadmap } from './components/Roadmap'
import { SectionCard } from './components/SectionCard'
import { Sidebar } from './components/Sidebar'
import { VideoDemo } from './components/VideoDemo'

function App() {
  const [activeId, setActiveId] = useState(() => window.location.hash.slice(1) || 'home')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    const elements = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveId(visible[0].target.id)
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.08] })
    elements.forEach((element) => observer.observe(element))
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const hashId = window.location.hash.slice(1)
    if (hashId) window.setTimeout(() => document.getElementById(hashId)?.scrollIntoView(), 0)
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">跳到正文</a>
      <Sidebar items={navItems} activeId={activeId} open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={closeDrawer} />
      <main id="main-content" className="main-content">
        <div className="content-wrap">
          <Hero />
          <SectionCard id="demo" number="02" title="60秒演示" intro={sectionIntros.demo}>
            <VideoDemo />
            <DashboardPreview />
          </SectionCard>

          <SectionCard id="features" number="03" title="看板功能" intro={sectionIntros.features}>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article className="feature-card" key={feature.name}>
                  <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{feature.name}</h3>
                  <p className="business-question">{feature.question}</p>
                  <dl><div><dt>关键展示</dt><dd>{feature.display}</dd></div></dl>
                  <p className="action-box"><b>运营动作</b>{feature.action}</p>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="data-scope" number="04" title="数据范围" intro={sectionIntros['data-scope']}>
            <div className="scope-grid">
              <article className="scope-card scope-observable"><h3>当前可观测</h3><ul>{observableData.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article className="scope-card scope-unavailable"><h3>当前不可获得</h3><ul>{unavailableData.map((item) => <li key={item.name}><b>{item.name}</b><span>{item.reason}</span></li>)}</ul></article>
            </div>
            <Disclaimer text={dataStatement} />
          </SectionCard>

          <SectionCard id="metrics" number="05" title="指标口径" intro={sectionIntros.metrics}>
            <MetricTable metrics={metrics} />
            <div className="event-definitions">
              <h3>三个关键事件的统一定义</h3>
              <div>{eventDefinitions.map((event, index) => <article key={event.name}><span>{String(index + 1).padStart(2, '0')}</span><h4>{event.name}</h4><p>{event.definition}</p></article>)}</div>
            </div>
          </SectionCard>

          <SectionCard id="alerts" number="06" title="异常与建议" intro={sectionIntros.alerts}>
            <p className="config-note">{alertStatusNote}</p>
            <div className="alert-grid">
              {alerts.map((alert) => <article key={alert.scene} className={`alert-card level-${alert.level}`}>
                <div className="alert-head"><h3>{alert.scene}</h3><span className="level-tag">{alert.level}</span></div>
                <dl><div><dt>触发原因</dt><dd>{alert.trigger}</dd></div><div><dt>关键数据</dt><dd>{alert.data}</dd></div><div><dt>发生时间</dt><dd>{alert.time}</dd></div></dl>
                <p className="alert-action"><b>建议动作</b>{alert.action}</p>
              </article>)}
            </div>
          </SectionCard>

          <SectionCard id="analysis" number="07" title="运营分析方法" intro={sectionIntros.analysis}>
            <div className="questions-block"><h3>这个看板可以回答什么</h3><ul>{businessQuestions.map((question) => <li key={question}>{question}</li>)}</ul></div>
            <div className="analysis-list">
              {analysisChains.map((chain, index) => <article key={chain.phenomenon} className="analysis-chain" aria-label={`分析案例${index + 1}：${chain.phenomenon}`}>
                <div><span>现象</span><strong>{chain.phenomenon}</strong></div><i aria-hidden="true" /><div><span>可能原因</span><strong>{chain.cause}</strong></div><i aria-hidden="true" /><div><span>下一步验证</span><strong>{chain.verify}</strong></div><i aria-hidden="true" /><div><span>运营动作</span><strong>{chain.action}</strong></div>
              </article>)}
            </div>
          </SectionCard>

          <SectionCard id="report" number="08" title="直播复盘报告" intro={sectionIntros.report} status="规划中 · Phase 2">
            <div className="planning-banner"><b>当前状态：规划中</b><span>尚未作为现成功能开放，以下是确定的产品结构与交付方向。</span></div>
            <ol className="report-flow">{reportFlow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
            <article className="report-paper"><div className="binding-line" aria-hidden="true" /><p className="paper-kicker">EXPECTED REPORT / PHASE 2</p><h3>单场直播复盘报告</h3><ol>{reportOutline.map((item) => <li key={item}>{item}</li>)}</ol><p className="paper-note">预期输出为结构化 Markdown，并支持导出 PDF；不在此处伪造已生成报告。</p></article>
          </SectionCard>

          <SectionCard id="roadmap" number="09" title="路线图" intro={sectionIntros.roadmap}>
            <Roadmap stages={roadmap} />
          </SectionCard>

          <SectionCard id="technology" number="10" title="技术实现" intro={sectionIntros.technology}>
            <div className="architecture" aria-label="系统分层架构">
              <div className="architecture-flow">{architecture.map((layer, index) => <div className="architecture-step" key={layer.name}><article><h3>{layer.name}</h3><p>{layer.detail}</p></article>{index < architecture.length - 1 && <i aria-hidden="true" />}</div>)}</div>
              <aside className="static-site-node"><span>独立展示</span><h3>在线作品页</h3><p>静态站点 · 无实时API连接</p></aside>
            </div>
            <ul className="tech-tags" aria-label="技术栈">{techTags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </SectionCard>

          <SectionCard id="faq" number="11" title="常见问题" intro={sectionIntros.faq}>
            <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<span aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
          </SectionCard>

          <footer className="site-footer">
            <div><span>{footerCopy.type}</span><span>{footerCopy.stack}</span><span>最后更新：{site.updated}</span></div>
            <p>{footerCopy.note}</p>
          </footer>
        </div>
      </main>
      <button className={`back-to-top${showTop ? ' visible' : ''}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="返回顶部" tabIndex={showTop ? 0 : -1}><span aria-hidden="true">↑</span></button>
    </div>
  )
}

export default App
