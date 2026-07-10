import { useState } from 'react'
import { videoChapters, videoSummary } from '../content'

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

export function VideoDemo() {
  const [failed, setFailed] = useState(false)
  return (
    <>
      <div className="media-frame">
        <div className="video-stage" aria-busy={!failed ? undefined : false}>
          {!failed ? (
            <video controls muted preload="metadata" poster={asset('dashboard-poster.webp')} onError={() => setFailed(true)}>
              <source src={asset('dashboard-demo.mp4')} type="video/mp4" />
            </video>
          ) : (
            <div className="media-error" role="status">
              <strong>演示视频暂不可用</strong>
              <span>可先查看下方的完整看板截图。</span>
              <a href="#dashboard-shot">前往看板截图</a>
            </div>
          )}
        </div>
      </div>
      <div className="chapter-strip" aria-label="视频片段目录">
        {videoChapters.map((chapter, index) => <span key={chapter}><b>{String(index + 1).padStart(2, '0')}</b>{chapter}</span>)}
      </div>
      <p className="media-note">视频使用虚构场次与合成演示数据，不包含真实账号、直播链接或用户标识。</p>
      <div className="video-transcript" aria-label="视频等价文字摘要">
        <h3>一分钟分镜摘要</h3>
        <ol>{videoSummary.map((item) => <li key={item}>{item}</li>)}</ol>
      </div>
    </>
  )
}
