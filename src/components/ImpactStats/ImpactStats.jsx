import { useState, useEffect, useRef } from 'react'
import './ImpactStats.css'

const defaultStats = [
  { icon: '🎓', value: 50000, suffix: '+', label: 'Students Guided', color: '#3b82f6' },
  { icon: '🏛️', value: 500, suffix: '+', label: 'Partner Colleges', color: '#06b6d4' },
  { icon: '📈', value: 95, suffix: '%', label: 'Success Rate', color: '#10b981' },
  { icon: '🏆', value: 8, suffix: '+', label: 'Years Experience', color: '#f59e0b' },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function ImpactStats() {
  const [stats, setStats] = useState(defaultStats)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/homepage/impact_stats')
      .then(r => r.json())
      .then(d => { if (d.success && d.data?.length) setStats(d.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="impact" ref={sectionRef} id="impact-stats">
      <div className="container">
        <div className="section-header">
          <h2>Our Impact in Numbers</h2>
          <p>Join thousands of successful students across India</p>
        </div>
        <div className="impact__grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`impact__card ${inView ? 'impact__card--visible' : ''}`}
              style={{ animationDelay: `${i * 0.15}s`, '--accent': stat.color }}
            >
              <div className="impact__icon">{stat.icon}</div>
              <div className="impact__value">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="impact__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
