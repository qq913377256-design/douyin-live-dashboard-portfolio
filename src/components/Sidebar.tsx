import { useEffect, useRef, type MouseEvent } from 'react'
import type { NavItem } from '../content'

type Props = {
  items: NavItem[]
  activeId: string
  open: boolean
  onOpen: () => void
  onClose: () => void
}

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Sidebar({ items, activeId, open, onOpen, onClose }: Props) {
  const drawerRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) openRef.current?.focus()
      wasOpenRef.current = false
      return
    }
    wasOpenRef.current = true
    const scrollY = window.scrollY
    const previousOverflow = document.body.style.overflow
    const mainContent = document.getElementById('main-content')
    const supportsInert = mainContent ? 'inert' in mainContent : false
    const previousInert = mainContent?.inert ?? false
    const previousAriaHidden = mainContent?.getAttribute('aria-hidden')
    document.body.style.overflow = 'hidden'
    if (mainContent) {
      if (supportsInert) mainContent.inert = true
      else mainContent.setAttribute('aria-hidden', 'true')
    }
    closeRef.current?.focus()
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const onDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = [...drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector)]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    desktopQuery.addEventListener('change', onDesktopChange)
    if (desktopQuery.matches) onClose()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktopQuery.removeEventListener('change', onDesktopChange)
      document.body.style.overflow = previousOverflow
      if (mainContent) {
        if (supportsInert) mainContent.inert = previousInert
        else if (previousAriaHidden == null) mainContent.removeAttribute('aria-hidden')
        else mainContent.setAttribute('aria-hidden', previousAriaHidden)
      }
      window.scrollTo(0, scrollY)
    }
  }, [open, onClose])

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    window.history.pushState(null, '', `#${id}`)
    onClose()
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.getElementById(`${id}-title`)?.focus({ preventScroll: true })
    }, open ? 230 : 0)
  }

  const nav = (
    <>
      <p className="sidebar-kicker">LIVE OPS / PORTFOLIO</p>
      <div className="sidebar-title">页面目录</div>
      <nav aria-label="页面目录">
        <ol className="nav-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(event) => navigate(event, item.id)} className={activeId === item.id ? 'active' : ''} aria-current={activeId === item.id ? 'location' : undefined}>
                <span>{item.number}</span>{item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <p className="sidebar-note">非抖音官方产品。指标为采样值、代理指标、规则结果或模型分类。</p>
    </>
  )

  return (
    <>
      <aside className="sidebar sidebar-desktop">{nav}</aside>
      <header className="mobile-header">
        <a href="#home" className="mobile-brand">直播健康诊断</a>
        <button ref={openRef} className="menu-button" type="button" onClick={onOpen} aria-expanded={open} aria-controls="mobile-drawer">
          <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>目录
        </button>
      </header>
      <div className={`drawer-layer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <button className="drawer-backdrop" type="button" onClick={onClose} aria-label="关闭目录" tabIndex={open ? 0 : -1} />
        <aside ref={drawerRef} id="mobile-drawer" className="sidebar drawer" role="dialog" aria-modal="true" aria-label="移动端页面目录">
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose} aria-label="关闭目录"><span aria-hidden="true">×</span></button>
          {nav}
        </aside>
      </div>
    </>
  )
}
