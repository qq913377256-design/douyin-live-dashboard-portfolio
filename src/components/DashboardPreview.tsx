import { useEffect, useRef, useState } from 'react'

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`
const focusableSelector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function DashboardPreview() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)]
      if (!focusable.length) return
      const first = focusable[0]; const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <div id="dashboard-shot" className="dashboard-preview">
      <button className="dashboard-image-button" type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setOpen(true) }} aria-label="打开看板原尺寸预览">
        <img src={asset('dashboard-current.webp')} alt="使用合成数据生成的深色直播健康诊断看板全景" loading="lazy" />
      </button>
      <button className="button button-secondary preview-button" type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setOpen(true) }}>查看大图</button>
      <p className="figure-caption">蓝色曲线呈现在线趋势，粉色信号标记评论互动，绿色状态用于商品与健康状态；事件标线将数据变化与业务动作对齐。</p>
      {open && (
        <div ref={dialogRef} className="image-dialog" role="dialog" aria-modal="true" aria-labelledby="preview-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <h2 id="preview-title" className="sr-only">看板原尺寸预览</h2>
          <button ref={closeRef} className="dialog-close" type="button" onClick={() => setOpen(false)}>关闭预览 <span aria-hidden="true">×</span></button>
          <img src={asset('dashboard-current.webp')} alt="使用合成数据生成的深色直播健康诊断看板全景大图" />
        </div>
      )}
    </div>
  )
}
