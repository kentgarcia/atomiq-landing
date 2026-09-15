import { useEffect, useState } from 'react'
import './Navbar.css'
import { navLinks } from '@/lib/landing'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open ])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const atBottom =
          window.innerHeight + y >= document.documentElement.scrollHeight - 40
        const finalCta = document.getElementById('download')
        const atFinalCta = finalCta
          ? finalCta.getBoundingClientRect().top < window.innerHeight * 0.7
          : false
        if (open || atBottom || atFinalCta) {
          setHidden(false)
        } else if (y > 140 && y > lastY + 4) {
          setHidden(true)
        } else if (y < lastY - 4 || y <= 140) {
          setHidden(false)
        }
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [open ])

  return (
    <header className={`nav-float${hidden ? ' nav-float--hidden' : ''}`}>
      <nav className="nav-pill" aria-label="Primary">
        <a className="nav-brand" href="/" aria-label="AtomIQ home">
          <img
            className="nav-brand__logo"
            src="/icon-128.png"
            alt="AtomIQ logo"
            width={44}
            height={44}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a className="nav-links__a" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a className="nav-cta" href="#download">
            <span className="nav-cta__full">Download App</span>
            <span className="nav-cta__short" aria-hidden="true">
              Download
            </span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle__bar" aria-hidden="true" />
            <span className="nav-toggle__bar" aria-hidden="true" />
            <span className="nav-toggle__bar" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-menu" id="nav-menu">
          <ul className="nav-menu__list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="nav-menu__a"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
