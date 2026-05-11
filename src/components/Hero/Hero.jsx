import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import hero1 from '../../assets/images/hero1.png'
import hero2 from '../../assets/images/hero2.png'
import hero3 from '../../assets/images/hero3.png'
import './Hero.css'

const defaultSlides = [
  { image: hero1, title: 'Alliance University', subtitle: 'Admission Started 2025' },
  { image: hero2, title: 'Christ University', subtitle: 'Top Ranked in Bangalore' },
  { image: hero3, title: 'Your Future Starts Here', subtitle: 'Expert Guidance for 500+ Colleges' },
]

const defaultStats = [
  { icon: '🏛️', value: '500+', label: 'Colleges' },
  { icon: '👥', value: '50K+', label: 'Students' },
  { icon: '📈', value: '95%', label: 'Success' },
  { icon: '⭐', value: '4.8', label: 'Rating' },
]

// Map local asset paths for images that come from API
const resolveImage = (img) => {
  if (img.includes('hero1')) return hero1
  if (img.includes('hero2')) return hero2
  if (img.includes('hero3')) return hero3
  return img
}

export default function Hero() {
  const [slides, setSlides] = useState(defaultSlides)
  const [stats, setStats] = useState(defaultStats)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/api/homepage')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          if (d.data.hero_slides?.length) setSlides(d.data.hero_slides.map(s => ({ ...s, image: resolveImage(s.image) })))
          if (d.data.hero_stats?.length) setStats(d.data.hero_stats)
        }
      })
      .catch(() => {})
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="hero" id="hero-section">
      <div className="hero__slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} className="hero__slide-image" />
          </div>
        ))}
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <div className="hero__badge">
          <span>✨</span> Trusted by 50,000+ Students <span>🎓</span>
        </div>

        <h1 className="hero__title" key={currentSlide}>
          {slides[currentSlide]?.title}
        </h1>
        <p className="hero__subtitle">
          {slides[currentSlide]?.subtitle}
        </p>

        <div className="hero__stats">
          {stats.map((stat, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-icon">{stat.icon}</span>
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <Link to="/colleges" className="hero__cta">
          Apply Now <span>→</span>
        </Link>

        <div className="hero__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hero__search-wrapper">
        <div className="hero__search">
          <span className="hero__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search colleges, courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="hero__search-input"
            id="hero-search-input"
          />
          <Link
            to={searchQuery ? `/colleges?q=${searchQuery}` : '/colleges'}
            className="hero__search-btn"
            id="hero-search-btn"
          >
            Search
          </Link>
        </div>
      </div>
    </section>
  )
}
