import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import collegeData from '../../data/collegeData'
import './FeaturedColleges.css'

function StarRating({ rating }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  return (
    <div className="fc__rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`fc__star ${i < fullStars ? 'fc__star--full' : i === fullStars && hasHalf ? 'fc__star--half' : ''}`}>
          ⭐
        </span>
      ))}
      <span className="fc__rating-value">{rating}</span>
    </div>
  )
}

export default function FeaturedColleges() {
  const [colleges, setColleges] = useState([])
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

  const featuredColleges = colleges.slice(0, 6)

  return (
    <section className="fc" id="featured-colleges">
      <div className="container">
        <div className="section-header">
          <h2>Featured Colleges</h2>
          <p>Handpicked excellence from top institutions across India</p>
        </div>

        {loading ? (
          <div style={{textAlign: 'center', padding: '2rem 0'}}>Loading colleges...</div>
        ) : (
          <div className="fc__grid">
            {featuredColleges.map((college, i) => (
              <div key={i} className="fc__card" id={`college-card-${i}`}>
                <div className="fc__image-wrapper">
                  <img src={college.image} alt={college.name} className="fc__image" loading="lazy" />
                  <div className="fc__tags">
                    {college.tags.slice(0, 2).map((tag, j) => (
                      <span key={j} className="fc__tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="fc__body">
                  <h3 className="fc__name">{college.name}</h3>
                  <p className="fc__location">📍 {college.location}</p>
                  <StarRating rating={college.rating} />
                  <div className="fc__actions">
                    <Link to="/contact" className="fc__btn fc__btn--primary">Apply</Link>
                    <Link to={`/colleges/${college.slug}`} className="fc__btn fc__btn--outline">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="fc__more">
          <Link to="/colleges" className="btn btn-primary" id="explore-all-colleges">
            Explore All Colleges <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
