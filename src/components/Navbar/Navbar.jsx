import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/colleges', label: 'Colleges', hasDropdown: true },
  { path: '/scholarships', label: 'Scholarships' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

const streamCategories = [
  { icon: '⚙️', label: 'Engineering', desc: 'B.Tech, M.Tech & more' },
  { icon: '🏥', label: 'Medical Sciences', desc: 'MBBS, BDS, BAMS' },
  { icon: '📊', label: 'Management', desc: 'BBA, MBA & Executive' },
  { icon: '⚖️', label: 'Law', desc: 'BA LLB, BBA LLB, LLM' },
  { icon: '🎨', label: 'Design & Arts', desc: 'B.Des, BFA, Visual Media' },
  { icon: '🔬', label: 'Science', desc: 'B.Sc, M.Sc, Research' },
  { icon: '📐', label: 'Architecture', desc: 'B.Arch, Planning' },
  { icon: '💼', label: 'Commerce', desc: 'B.Com, CA, Finance' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimer = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimer.current)
    setDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
        id="main-nav"
      >
        <div className="navbar__container">
          {/* ===== LOGO ===== */}
          <Link to="/" className="navbar__logo" id="nav-logo">
            <div className="navbar__logo-mark">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#logoGrad)"/>
                <path d="M8 14C8 10.686 10.686 8 14 8C16.21 8 18.14 9.128 19.26 10.84L21.46 9.42C19.86 7.02 17.1 5.5 14 5.5C9.306 5.5 5.5 9.306 5.5 14C5.5 18.694 9.306 22.5 14 22.5V20C10.686 20 8 17.314 8 14Z" fill="white" opacity="0.9"/>
                <circle cx="19" cy="19" r="3.5" fill="url(#dotGrad)"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                  <linearGradient id="dotGrad" x1="0" y1="0" x2="6" y2="6">
                    <stop offset="0%" stopColor="#22d3ee"/>
                    <stop offset="100%" stopColor="#a78bfa"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="navbar__logo-text">
              <span className="navbar__logo-grab">Grab</span>
              <span className="navbar__logo-grade">Grade</span>
            </span>
          </Link>

          {/* ===== CENTER NAV LINKS ===== */}
          <div className="navbar__links">
            {navLinks.map(link => (
              <div
                key={link.path}
                className="navbar__link-wrapper"
                onMouseEnter={() => link.hasDropdown && handleDropdownEnter()}
                onMouseLeave={() => link.hasDropdown && handleDropdownLeave()}
              >
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                  id={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg
                      className={`navbar__chevron ${dropdownOpen ? 'navbar__chevron--open' : ''}`}
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  )}
                  <span className="navbar__link-underline" />
                </Link>

                {/* Colleges Dropdown */}
                {link.hasDropdown && (
                  <div className={`navbar__dropdown ${dropdownOpen ? 'navbar__dropdown--open' : ''}`}>
                    <div className="navbar__dropdown-inner">
                      <div className="navbar__dropdown-header">
                        <span>Browse by Stream</span>
                        <Link to="/colleges" className="navbar__dropdown-view-all">
                          View All →
                        </Link>
                      </div>
                      <div className="navbar__dropdown-grid">
                        {streamCategories.map(stream => (
                          <Link
                            key={stream.label}
                            to="/colleges"
                            className="navbar__dropdown-item"
                          >
                            <span className="navbar__dropdown-item-icon">{stream.icon}</span>
                            <div className="navbar__dropdown-item-text">
                              <span className="navbar__dropdown-item-label">{stream.label}</span>
                              <span className="navbar__dropdown-item-desc">{stream.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ===== RIGHT CTAs ===== */}
          <div className="navbar__actions">
            <Link to="/contact" className="navbar__cta-ghost" id="nav-book-consultation">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Consultation
            </Link>
            <a href="tel:+919048021291" className="navbar__cta-phone" id="nav-phone">
              <span className="navbar__cta-phone-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </span>
              904 8021 291
            </a>
          </div>

          {/* ===== HAMBURGER ===== */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Accent line */}
        <div className="navbar__accent-line" />
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="navbar__drawer-inner">
          <div className="navbar__drawer-header">
            <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
              <div className="navbar__logo-mark">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="8" fill="url(#logoGrad2)"/>
                  <path d="M8 14C8 10.686 10.686 8 14 8C16.21 8 18.14 9.128 19.26 10.84L21.46 9.42C19.86 7.02 17.1 5.5 14 5.5C9.306 5.5 5.5 9.306 5.5 14C5.5 18.694 9.306 22.5 14 22.5V20C10.686 20 8 17.314 8 14Z" fill="white" opacity="0.9"/>
                  <circle cx="19" cy="19" r="3.5" fill="url(#dotGrad2)"/>
                  <defs>
                    <linearGradient id="logoGrad2" x1="0" y1="0" x2="28" y2="28">
                      <stop offset="0%" stopColor="#3B82F6"/>
                      <stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                    <linearGradient id="dotGrad2" x1="0" y1="0" x2="6" y2="6">
                      <stop offset="0%" stopColor="#22d3ee"/>
                      <stop offset="100%" stopColor="#a78bfa"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="navbar__logo-text">
                <span className="navbar__logo-grab">Grab</span>
                <span className="navbar__logo-grade">Grade</span>
              </span>
            </Link>
            <button
              className="navbar__drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <nav className="navbar__drawer-nav">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__drawer-link ${location.pathname === link.path ? 'navbar__drawer-link--active' : ''}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </nav>

          <div className="navbar__drawer-ctas">
            <Link
              to="/contact"
              className="navbar__drawer-cta navbar__drawer-cta--ghost"
              onClick={() => setMenuOpen(false)}
            >
              Book Consultation
            </Link>
            <a href="tel:+919048021291" className="navbar__drawer-cta navbar__drawer-cta--phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              904 8021 291
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <div className="navbar__drawer-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}
