import { useState, useEffect } from 'react'

const NAV = [
  { label: '회사소개', href: '#about' },
  { label: '서비스',   href: '#services' },
  { label: '고객서비스', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <a href="#" className="logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="logo-icon">HK</div>
            <div>
              <div className="logo-name">한국화물운송</div>
              <div className="logo-sub">Korea Cargo Transport</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav>
            <ul className="nav">
              {NAV.map(n => (
                <li key={n.href}>
                  <a href={n.href} onClick={e => handleNav(e, n.href)}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right */}
          <div className="header-right">
            <a href="tel:1588-0000" className="header-phone">
              <PhoneIcon />
              1588-0000
            </a>
            <a
              href="#contact"
              className="btn btn-primary header-cta"
              onClick={e => handleNav(e, '#contact')}
            >
              무료 견적 받기
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="burger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="메뉴"
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {NAV.map(n => (
          <a key={n.href} href={n.href} onClick={e => handleNav(e, n.href)}>{n.label}</a>
        ))}
        <a href="tel:1588-0000" className="mobile-phone">
          <PhoneIcon size={18} /> 1588-0000
        </a>
      </nav>
    </>
  )
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.06 6.06l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}
