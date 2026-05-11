import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CTA.css'

const defaultCta = {
  tagline: 'Start Your Journey Today',
  title: 'Join <strong>50,000+</strong> students who achieved their dreams with expert guidance',
  subtitle: 'GrabGrade mentors have shaped the future of 5000+ students and working professionals.',
  buttonText: 'Book Free Consultation',
  buttonLink: '/contact',
}

export default function CTA() {
  const [cta, setCta] = useState(defaultCta)

  useEffect(() => {
    fetch('http://localhost:4000/api/homepage/cta')
      .then(r => r.json())
      .then(d => { if (d.success && d.data) setCta({ ...defaultCta, ...d.data }) })
      .catch(() => {})
  }, [])

  return (
    <section className="cta" id="cta-section">
      <div className="cta__bg">
        <div className="cta__circle cta__circle--1"></div>
        <div className="cta__circle cta__circle--2"></div>
        <div className="cta__particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`cta__particle cta__particle--${i + 1}`}></div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="cta__content">
          <p className="cta__tagline">{cta.tagline}</p>
          <h2 className="cta__title" dangerouslySetInnerHTML={{ __html: cta.title }} />
          <p className="cta__subtitle">{cta.subtitle}</p>
          <Link to={cta.buttonLink} className="cta__button" id="cta-book-consultation">
            <span>📅</span> {cta.buttonText} <span>→</span>
          </Link>
          <div className="cta__trust">
            <div className="cta__trust-item">
              <span className="cta__stars">⭐⭐⭐⭐⭐</span>
              <span className="cta__trust-text">4.9/5</span>
            </div>
            <div className="cta__trust-divider"></div>
            <div className="cta__trust-item">
              <span>👥</span>
              <span className="cta__trust-text"><strong>50K+</strong> Students</span>
            </div>
            <div className="cta__trust-divider"></div>
            <div className="cta__trust-item">
              <span>🇮🇳</span>
              <span className="cta__trust-text">Trusted across India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
