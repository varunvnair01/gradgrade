import { Link } from 'react-router-dom'
import './Footer.css'

const quickLinks = [
  { label: 'Top Universities', path: '/colleges', icon: '🏛️' },
  { label: 'Scholarship Form', path: '/scholarships', icon: '🎓' },
  { label: 'About Us', path: '/about', icon: '🌐' },
  { label: 'Contact', path: '/contact', icon: '📍' },
]

const institutions = [
  'Jain Deemed-To-Be University',
  'Alliance University',
  'Sapthagiri NPS University',
  'Ramaiah University',
  'S Vyasa University',
]

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <Link to="/" className="footer__logo">
              <span>🎓</span>
              <span className="footer__logo-text">
                <span className="footer__logo-grab">Grab</span>
                <span className="footer__logo-grade">Grade</span>
              </span>
            </Link>
            <p className="footer__desc">
              GrabGrade mentors have shaped the future of <em>5000+</em> students and working professionals.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">📸</a>
              <a href="https://wa.me/919048021291" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="WhatsApp">💬</a>
              <a href="#" className="footer__social" aria-label="Facebook">👤</a>
              <a href="#" className="footer__social" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div className="footer__section">
            <h4 className="footer__title">Quick Links</h4>
            <div className="footer__title-bar"></div>
            <ul className="footer__list">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="footer__link">
                    <span>{link.icon}</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__title">Top Institutions</h4>
            <div className="footer__title-bar"></div>
            <ul className="footer__list">
              {institutions.map((name, i) => (
                <li key={i}>
                  <Link to="/colleges" className="footer__link">
                    <span>→</span> {name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/colleges" className="footer__link footer__link--highlight">
                  View All Colleges <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__title">Get in Touch</h4>
            <div className="footer__title-bar"></div>
            <div className="footer__contact">
              <div className="footer__contact-group">
                <span className="footer__contact-icon">📞</span>
                <div>
                  <a href="tel:+919048021291" className="footer__contact-link">+91-9048021291</a>
                </div>
              </div>
              <div className="footer__contact-group">
                <span className="footer__contact-icon">✉️</span>
                <div>
                  <a href="mailto:grabgrade.edu@gmail.com" className="footer__contact-link">
                    grabgrade.edu@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p>© {new Date().getFullYear()} GrabGrade. All rights reserved.</p>
            <div className="footer__bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms">Terms of Use</Link>
              <span>|</span>
              <Link to="/admin">Admin Panel</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
