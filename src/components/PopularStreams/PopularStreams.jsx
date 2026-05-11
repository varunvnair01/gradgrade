import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PopularStreams.css'

const defaultStreams = [
  { icon: '⚙️', title: 'Engineering', description: 'Computer Science, Mechanical, Civil, Electronics', color: '#3b82f6', bg: '#eff6ff' },
  { icon: '🏥', title: 'Medical Sciences', description: 'MBBS, Nursing, Pharmacy, Physiotherapy', color: '#ef4444', bg: '#fef2f2' },
  { icon: '💼', title: 'Management', description: 'MBA, BBA, Finance, Marketing', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: '🏗️', title: 'Architecture', description: 'Civil Architecture, Interior Design', color: '#f59e0b', bg: '#fffbeb' },
  { icon: '🎨', title: 'Arts & Design', description: 'Fashion Design, Fine Arts, Animation', color: '#ec4899', bg: '#fdf2f8' },
  { icon: '⚖️', title: 'Law', description: 'LLB, Corporate Law, International Law', color: '#06b6d4', bg: '#ecfeff' },
  { icon: '💰', title: 'Commerce', description: 'B.Com, CA, Accounting, Economics', color: '#10b981', bg: '#ecfdf5' },
  { icon: '🔬', title: 'Science', description: 'BSc, Physics, Chemistry, Biology, Mathematics', color: '#6366f1', bg: '#eef2ff' },
]

export default function PopularStreams() {
  const [streams, setStreams] = useState(defaultStreams)

  useEffect(() => {
    fetch('http://localhost:4000/api/homepage/streams')
      .then(r => r.json())
      .then(d => { if (d.success && d.data?.length) setStreams(d.data) })
      .catch(() => {})
  }, [])

  return (
    <section className="streams" id="popular-streams">
      <div className="container">
        <div className="section-header">
          <h2>Popular Streams</h2>
          <p>Explore diverse academic programs across top institutions in India</p>
        </div>
        <div className="streams__grid">
          {streams.map((stream, i) => (
            <Link
              to="/colleges"
              key={i}
              className="streams__card"
              style={{ '--stream-color': stream.color, '--stream-bg': stream.bg }}
            >
              <div className="streams__icon">{stream.icon}</div>
              <h3 className="streams__title">{stream.title}</h3>
              <p className="streams__desc">{stream.description}</p>
              <span className="streams__arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
