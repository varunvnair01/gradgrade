import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import collegeData from '../../data/collegeData'
import './CollegeDetail.css'

export default function CollegeDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedCourses, setExpandedCourses] = useState({})
  const [isSaved, setIsSaved] = useState(false)
  const [showMobileCTA, setShowMobileCTA] = useState(false)
  const tabsRef = useRef(null)
  const heroRef = useRef(null)

  const [college, setCollege] = useState(null)
  const [loading, setLoading] = useState(true)

  // Show floating mobile CTA after scrolling past hero
  useEffect(() => {
    fetch(`http://localhost:4000/api/colleges/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCollege(data.data)
        } else {
          // Fallback to local data
          const localCollege = collegeData.find(c => c.slug === slug)
          setCollege(localCollege || null)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('API unavailable, using local data', err)
        const localCollege = collegeData.find(c => c.slug === slug)
        setCollege(localCollege || null)
        setLoading(false)
      })

    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        setShowMobileCTA(heroBottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  if (loading) {
    return (
      <div className="cd-not-found">
        <div className="container">
          <h2>Loading details...</h2>
        </div>
      </div>
    )
  }

  if (!college) {
    return (
      <div className="cd-not-found">
        <div className="container">
          <div className="cd-not-found__icon">🏫</div>
          <h2>College Not Found</h2>
          <p>The college you're looking for doesn't exist or has been removed.</p>
          <Link to="/colleges" className="btn btn-primary">← Back to Colleges</Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'courses', label: 'Courses', icon: '🎓' },
    { id: 'features', label: 'Features', icon: '🏆' },
    { id: 'resources', label: 'Resources', icon: '📥' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
  ]

  const toggleCourseExpand = (index) => {
    setExpandedCourses(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: college.name,
          text: `Check out ${college.name} on GradGrade`,
          url: window.location.href,
        })
      } catch (e) { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const courseDescriptions = {
    'UG': 'Undergraduate program with comprehensive curriculum',
    'PG': 'Postgraduate program for advanced specialization',
    'Doctoral': 'Research-oriented doctoral program',
  }

  return (
    <div className="cd">
      {/* ===== HERO BANNER ===== */}
      <div className="cd__hero" ref={heroRef}>
        <img src={college.image} alt={college.name} className="cd__hero-img" />
        <div className="cd__hero-overlay" />
        <div className="cd__hero-content">
          <button className="cd__back-btn" onClick={() => navigate('/colleges')} aria-label="Go back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Back
          </button>

          <div className="cd__hero-badges">
            <span className="cd__badge cd__badge--rank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {college.rank}
            </span>
            <span className="cd__badge cd__badge--rating">⭐ {college.rating}/5</span>
          </div>

          <h1 className="cd__title">{college.name}</h1>

          <div className="cd__location-row">
            <span className="cd__location-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {college.location}
            </span>
            <span className="cd__fee-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              {college.fees}
            </span>
          </div>

          {/* Quick Action Icons */}
          <div className="cd__quick-actions">
            <a href={`https://${college.contact.website}`} target="_blank" rel="noopener noreferrer" className="cd__action-btn" title="Visit Website">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>Website</span>
            </a>
            <a href={`mailto:${college.contact.email}`} className="cd__action-btn" title="Send Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Email</span>
            </a>
            <a href={`tel:${college.contact.phone}`} className="cd__action-btn" title="Call Now">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </a>
            <a href={`https://wa.me/919048021291?text=${encodeURIComponent(`Hi! I'm interested in ${college.name}. Please share details.`)}`} target="_blank" rel="noopener noreferrer" className="cd__action-btn cd__action-btn--whatsapp" title="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== INFO STATS BAR ===== */}
      <div className="cd__stats-bar">
        <div className="cd__stats-bar-inner container">
          <div className="cd__stat-pill">
            <div className="cd__stat-pill-icon cd__stat-pill-icon--rating">⭐</div>
            <div className="cd__stat-pill-content">
              <span className="cd__stat-pill-value">{college.rating}</span>
              <span className="cd__stat-pill-label">Rating</span>
            </div>
          </div>
          <div className="cd__stat-pill">
            <div className="cd__stat-pill-icon cd__stat-pill-icon--streams">📚</div>
            <div className="cd__stat-pill-content">
              <span className="cd__stat-pill-value">{college.totalStreams}</span>
              <span className="cd__stat-pill-label">Streams</span>
            </div>
          </div>
          <div className="cd__stat-pill">
            <div className="cd__stat-pill-icon cd__stat-pill-icon--courses">🎓</div>
            <div className="cd__stat-pill-content">
              <span className="cd__stat-pill-value">{college.totalCourses}</span>
              <span className="cd__stat-pill-label">Courses</span>
            </div>
          </div>
          <div className="cd__stat-pill">
            <div className="cd__stat-pill-icon cd__stat-pill-icon--founded">🏛️</div>
            <div className="cd__stat-pill-content">
              <span className="cd__stat-pill-value">{college.founded}</span>
              <span className="cd__stat-pill-label">Founded</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TAB NAVIGATION ===== */}
      <div className="cd__tabs-wrapper" ref={tabsRef}>
        <div className="cd__tabs container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`cd__tab ${activeTab === tab.id ? 'cd__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`tab-${tab.id}`}
            >
              <span className="cd__tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="cd__main">
        <div className="cd__content-grid container">

          {/* LEFT COLUMN */}
          <div className="cd__left">

            {/* ===== OVERVIEW TAB ===== */}
            {activeTab === 'overview' && (
              <div className="cd__panel animate-fadeIn">
                <div className="cd__panel-header">
                  <div className="cd__panel-icon">📋</div>
                  <div>
                    <h2 className="cd__panel-title">About {college.name}</h2>
                    <p className="cd__panel-subtitle">Complete overview and key highlights</p>
                  </div>
                </div>

                <div className="cd__overview-text">
                  {college.overview.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="cd__highlights-grid">
                  <div className="cd__highlight-card">
                    <div className="cd__highlight-icon-wrap cd__highlight-icon-wrap--blue">🏛️</div>
                    <div className="cd__highlight-info">
                      <span className="cd__highlight-label">Founded</span>
                      <span className="cd__highlight-value">{college.founded}</span>
                    </div>
                  </div>
                  <div className="cd__highlight-card">
                    <div className="cd__highlight-icon-wrap cd__highlight-icon-wrap--emerald">📚</div>
                    <div className="cd__highlight-info">
                      <span className="cd__highlight-label">Total Courses</span>
                      <span className="cd__highlight-value">{college.totalCourses}</span>
                    </div>
                  </div>
                  <div className="cd__highlight-card">
                    <div className="cd__highlight-icon-wrap cd__highlight-icon-wrap--amber">⭐</div>
                    <div className="cd__highlight-info">
                      <span className="cd__highlight-label">Rating</span>
                      <span className="cd__highlight-value">{college.rating} / 5.0</span>
                    </div>
                  </div>
                  <div className="cd__highlight-card">
                    <div className="cd__highlight-icon-wrap cd__highlight-icon-wrap--rose">💰</div>
                    <div className="cd__highlight-info">
                      <span className="cd__highlight-label">Fee Range</span>
                      <span className="cd__highlight-value">{college.fees}</span>
                    </div>
                  </div>
                </div>

                {/* Stream Tags */}
                <div className="cd__streams-section">
                  <h3 className="cd__mini-heading">Available Streams</h3>
                  <div className="cd__stream-chips">
                    {(college.tags || []).map((tag, i) => (
                      <span key={i} className="cd__stream-chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== COURSES TAB ===== */}
            {activeTab === 'courses' && (
              <div className="cd__panel animate-fadeIn">
                <div className="cd__panel-header">
                  <div className="cd__panel-icon">🎓</div>
                  <div>
                    <h2 className="cd__panel-title">Courses & Fees</h2>
                    <p className="cd__panel-subtitle">{college.courses.length} programs available</p>
                  </div>
                </div>

                <div className="cd__courses-list">
                  {college.courses.map((course, i) => (
                    <div key={i} className={`cd__course-card ${expandedCourses[i] ? 'cd__course-card--expanded' : ''}`}>
                      <div className="cd__course-top">
                        <div className="cd__course-info">
                          <h4 className="cd__course-name">{course.name}</h4>
                          <div className="cd__course-tags">
                            <span className={`cd__course-level cd__course-level--${course.level.toLowerCase()}`}>
                              {course.level}
                            </span>
                            <span className="cd__course-duration">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {course.duration}
                            </span>
                          </div>
                        </div>
                        <div className="cd__course-fee-block">
                          <span className="cd__course-fee">{course.fee}</span>
                        </div>
                      </div>

                      <div className="cd__course-desc">
                        <p>{courseDescriptions[course.level] || 'Comprehensive academic program with industry-focused curriculum'}</p>
                      </div>

                      <div className="cd__course-actions">
                        <button
                          className="cd__course-btn cd__course-btn--readmore"
                          onClick={() => toggleCourseExpand(i)}
                        >
                          {expandedCourses[i] ? 'Show Less' : 'Read More'}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedCourses[i] ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                      </div>

                      {expandedCourses[i] && (
                        <div className="cd__course-expanded animate-fadeIn">
                          <div className="cd__course-detail-grid">
                            <div className="cd__course-detail-item">
                              <span className="cd__course-detail-label">Duration</span>
                              <span className="cd__course-detail-value">{course.duration}</span>
                            </div>
                            <div className="cd__course-detail-item">
                              <span className="cd__course-detail-label">Annual Fee</span>
                              <span className="cd__course-detail-value">{course.fee}</span>
                            </div>
                            <div className="cd__course-detail-item">
                              <span className="cd__course-detail-label">Level</span>
                              <span className="cd__course-detail-value">{course.level === 'UG' ? 'Undergraduate' : course.level === 'PG' ? 'Postgraduate' : 'Doctoral'}</span>
                            </div>
                            <div className="cd__course-detail-item">
                              <span className="cd__course-detail-label">Mode</span>
                              <span className="cd__course-detail-value">Full Time</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== FEATURES TAB ===== */}
            {activeTab === 'features' && (
              <div className="cd__panel animate-fadeIn">
                <div className="cd__panel-header">
                  <div className="cd__panel-icon">🏆</div>
                  <div>
                    <h2 className="cd__panel-title">Key Features</h2>
                    <p className="cd__panel-subtitle">What makes this institution special</p>
                  </div>
                </div>

                <div className="cd__features-grid">
                  {college.features.map((feature, i) => (
                    <div key={i} className="cd__feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="cd__feature-number">{String(i + 1).padStart(2, '0')}</div>
                      <div className="cd__feature-body">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== RESOURCES TAB ===== */}
            {activeTab === 'resources' && (
              <div className="cd__panel animate-fadeIn">
                <div className="cd__panel-header">
                  <div className="cd__panel-icon">📥</div>
                  <div>
                    <h2 className="cd__panel-title">Resources & Downloads</h2>
                    <p className="cd__panel-subtitle">Brochures, fee structure & documents</p>
                  </div>
                </div>

                <div className="cd__resources-grid">
                  {college.resources.map((res, i) => (
                    <a key={i} href={res.url} className="cd__resource-card" target="_blank" rel="noopener noreferrer">
                      <div className="cd__resource-icon-wrap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                      </div>
                      <div className="cd__resource-info">
                        <h4>{res.name}</h4>
                        <span className="cd__resource-type">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                          {res.type} Document
                        </span>
                      </div>
                      <div className="cd__resource-download-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ===== GALLERY TAB ===== */}
            {activeTab === 'gallery' && (
              <div className="cd__panel animate-fadeIn">
                <div className="cd__panel-header">
                  <div className="cd__panel-icon">📸</div>
                  <div>
                    <h2 className="cd__panel-title">Photo Gallery</h2>
                    <p className="cd__panel-subtitle">Campus, facilities, and student life</p>
                  </div>
                </div>

                <div className="cd__gallery-grid">
                  {college.photos && college.photos.length > 0 ? (
                    college.photos.map((photo, i) => (
                      <div key={i} className="cd__gallery-item">
                        <img src={photo} alt={`${college.name} gallery ${i+1}`} loading="lazy" />
                      </div>
                    ))
                  ) : (
                    <p>No photos available at the moment.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT SIDEBAR (Desktop) ===== */}
          <aside className="cd__sidebar">
            {/* CTA Card */}
            <div className="cd__cta-card">
              <div className="cd__cta-header">
                <h3>Interested in this College?</h3>
                <p>Get details on admission, fees & scholarships</p>
              </div>

              <Link to="/contact" className="cd__cta-btn cd__cta-btn--apply" id="apply-now-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                Apply Now
              </Link>

              <Link to="/contact" className="cd__cta-btn cd__cta-btn--fee" id="download-fee-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Fee Structure
              </Link>

              <Link to="/contact" className="cd__cta-btn cd__cta-btn--callback" id="request-callback-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Request Callback
              </Link>

              <div className="cd__cta-divider" />

              <div className="cd__cta-secondary">
                <button className={`cd__cta-icon-btn ${isSaved ? 'cd__cta-icon-btn--saved' : ''}`} onClick={() => setIsSaved(!isSaved)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button className="cd__cta-icon-btn" onClick={handleShare}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Share
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="cd__sidebar-card">
              <h3 className="cd__sidebar-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3"/></svg>
                Contact Information
              </h3>
              <div className="cd__sidebar-contact-list">
                <a href={`tel:${college.contact.phone}`} className="cd__sidebar-contact-item">
                  <div className="cd__sidebar-contact-icon">📞</div>
                  <div>
                    <span className="cd__sidebar-contact-label">Phone</span>
                    <span className="cd__sidebar-contact-value">{college.contact.phone}</span>
                  </div>
                </a>
                <a href={`mailto:${college.contact.email}`} className="cd__sidebar-contact-item">
                  <div className="cd__sidebar-contact-icon">📧</div>
                  <div>
                    <span className="cd__sidebar-contact-label">Email</span>
                    <span className="cd__sidebar-contact-value">{college.contact.email}</span>
                  </div>
                </a>
                <a href={`https://${college.contact.website}`} target="_blank" rel="noopener noreferrer" className="cd__sidebar-contact-item">
                  <div className="cd__sidebar-contact-icon">🌐</div>
                  <div>
                    <span className="cd__sidebar-contact-label">Website</span>
                    <span className="cd__sidebar-contact-value">{college.contact.website}</span>
                  </div>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ===== MOBILE FLOATING CTA ===== */}
      <div className={`cd__mobile-cta ${showMobileCTA ? 'cd__mobile-cta--visible' : ''}`}>
        <Link to="/contact" className="cd__mobile-cta-btn cd__mobile-cta-btn--apply">
          Apply Now
        </Link>
        <a
          href={`https://wa.me/919048021291?text=${encodeURIComponent(`Hi! I'm interested in ${college.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cd__mobile-cta-btn cd__mobile-cta-btn--whatsapp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}
