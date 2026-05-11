import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import collegeData from '../../data/collegeData'
import './Colleges.css'

const streamFilters = ['All', 'Engineering', 'Medical', 'Management', 'Arts', 'Science', 'Law', 'Architecture']

export default function Colleges() {
  const [colleges, setColleges] = useState([])
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/api/colleges')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setColleges(data.data)
        } else {
          setColleges(collegeData)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('API unavailable, using local data', err)
        setColleges(collegeData)
        setLoading(false)
      })
  }, [])

  const filtered = colleges.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    const matchFilter = activeFilter === 'All' || (c.tags && c.tags.includes(activeFilter))
    return matchSearch && matchFilter
  })

  return (
    <div className="colleges-page">
      <div className="colleges-page__hero">
        <div className="container">
          <h1>All Colleges & Universities</h1>
          <p>Find the perfect institution for your academic journey</p>
          <div className="colleges-page__search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search colleges, courses, streams..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="colleges-search"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="colleges-page__filters">
          {streamFilters.map(f => (
            <button
              key={f}
              className={`colleges-page__filter ${activeFilter === f ? 'colleges-page__filter--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="colleges-page__count">
          {loading ? 'Loading colleges...' : `Showing ${filtered.length} colleges`}
        </p>

        <div className="colleges-page__grid">
          {filtered.map((college, i) => (
            <div key={i} className="colleges-page__card">
              <div className="colleges-page__card-image">
                <img src={college.image} alt={college.name} loading="lazy" />
                <div className="colleges-page__card-tags">
                  {(college.tags || []).slice(0, 2).map((t, j) => (
                    <span key={j} className="colleges-page__card-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="colleges-page__card-body">
                <h3>{college.name}</h3>
                <p className="colleges-page__card-location">📍 {college.location}</p>
                <div className="colleges-page__card-meta">
                  <span>⭐ {college.rating}</span>
                  <span>💰 {college.fees}</span>
                  <span>🏛️ Est. {college.founded}</span>
                </div>
                <div className="colleges-page__card-actions">
                  <Link to="/contact" className="btn btn-primary" style={{padding: '0.6rem 1.5rem', fontSize: '0.875rem'}}>
                    Apply Now
                  </Link>
                  <Link to={`/colleges/${college.slug}`} className="colleges-page__card-details">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="colleges-page__empty">
            <p>🔍 No colleges found matching your criteria. Try different filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
