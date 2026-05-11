import { useState } from 'react'
import './Scholarships.css'

// ─────────────────────────────────────────────────────────────────────────────
// 🔗 REPLACE THIS with your deployed Google Apps Script Web App URL
// Steps: Extensions → Apps Script → Deploy → New deployment → Web App
//        Execute as: Me | Access: Anyone
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec'

const INITIAL_FORM = {
  name: '', email: '', phone: '', course: '', percentage: '', income: ''
}

const COURSES = [
  'Engineering (B.Tech / M.Tech)',
  'Medical Sciences (MBBS / BDS)',
  'Management (BBA / MBA)',
  'Law (BA LLB / BBA LLB)',
  'Science (B.Sc / M.Sc)',
  'Commerce (B.Com / CA)',
  'Arts & Humanities',
  'Architecture (B.Arch)',
  'Design (B.Des)',
  'Pharmacy / Nursing',
  'Other',
]

const INCOME_RANGES = [
  { value: 'below-2l', label: 'Below ₹2 Lakh' },
  { value: '2l-5l',   label: '₹2 – ₹5 Lakh'  },
  { value: '5l-8l',   label: '₹5 – ₹8 Lakh'  },
  { value: '8l-12l',  label: '₹8 – ₹12 Lakh' },
  { value: 'above-12l', label: 'Above ₹12 Lakh' },
]

const scholarships = [
  { title: 'Merit Scholarship',   amount: 'Up to 100%', eligibility: '85%+ in 12th', icon: '🏆' },
  { title: 'Need-Based Aid',      amount: 'Up to 75%',  eligibility: 'Family income < ₹5L/yr', icon: '💰' },
  { title: 'Sports Excellence',   amount: 'Up to 50%',  eligibility: 'State/National level', icon: '🏅' },
  { title: 'Women in STEM',       amount: 'Up to 60%',  eligibility: 'Female students in STEM', icon: '👩‍🔬' },
]

export default function Scholarships() {
  const [form, setForm]           = useState(INITIAL_FORM)
  const [errors, setErrors]       = useState({})
  const [status, setStatus]       = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg]   = useState('')

  // ── field change ──────────────────────────────────────────────────────────
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // clear individual error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // ── validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.name.trim())       errs.name       = 'Full name is required'
    if (!form.email.trim())      errs.email      = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                 errs.email      = 'Enter a valid email'
    if (!form.phone.trim())      errs.phone      = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)))
                                 errs.phone      = 'Enter a valid 10-digit mobile number'
    if (!form.course)            errs.course     = 'Please select a course'
    if (!form.percentage.trim()) errs.percentage = '12th percentage is required'
    else if (isNaN(form.percentage) || +form.percentage < 0 || +form.percentage > 100)
                                 errs.percentage = 'Enter a valid percentage (0–100)'
    if (!form.income)            errs.income     = 'Please select income range'
    return errs
  }

  // ── submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('loading')

    // Payload for Google Sheets
    const payload = {
      name:       form.name.trim(),
      email:      form.email.trim().toLowerCase(),
      phone:      form.phone.trim(),
      course:     form.course,
      percentage: form.percentage.trim(),
      income:     form.income,
    }

    try {
      // Google Apps Script requires no-cors for cross-origin POST
      await fetch(GOOGLE_SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',          // GAS doesn't set CORS headers
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      // no-cors means we can't read the response — treat as success
      setStatus('success')
      setForm(INITIAL_FORM)

      // Open WhatsApp with pre-filled message after 1.5s
      setTimeout(() => {
        const msg = encodeURIComponent(
          `Hi GrabGrade! I just applied for a scholarship.\n\n` +
          `Name: ${payload.name}\n` +
          `Course: ${payload.course}\n` +
          `12th: ${payload.percentage}%\n` +
          `Phone: ${payload.phone}\n\n` +
          `Please help me with the next steps.`
        )
        window.open(`https://wa.me/919048021291?text=${msg}`, '_blank')
      }, 1500)

    } catch (err) {
      console.error('Submission error:', err)
      setErrorMsg('Something went wrong. Please try again or call us directly.')
      setStatus('error')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrors({})
    setErrorMsg('')
    setForm(INITIAL_FORM)
  }

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="sch">
      {/* ── HERO ── */}
      <div className="sch__hero">
        <div className="container">
          <span className="sch__hero-badge">🎓 Financial Aid</span>
          <h1>Scholarship Opportunities</h1>
          <p>Unlock your potential with scholarships at 500+ partner institutions</p>
        </div>
      </div>

      {/* ── SCHOLARSHIP TYPES ── */}
      <section className="sch__types">
        <div className="container">
          <div className="section-header">
            <h2>Available Scholarships</h2>
            <p>Explore scholarship opportunities across partner institutions</p>
          </div>
          <div className="sch__types-grid">
            {scholarships.map((s, i) => (
              <div key={i} className="sch__type-card">
                <div className="sch__type-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <div className="sch__type-amount">{s.amount}</div>
                <p className="sch__type-eligibility">{s.eligibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="sch__form-section" id="apply">
        <div className="container">
          <div className="sch__form-wrapper">

            {/* Left info panel */}
            <div className="sch__info">
              <div className="sch__info-eyebrow">Apply Now</div>
              <h2>Get Your Scholarship Evaluated</h2>
              <p>Fill out the form and our counsellors will assess your eligibility within 24 hours — completely free.</p>

              <ul className="sch__benefits">
                <li>
                  <span className="sch__benefit-icon">✅</span>
                  <span>Free eligibility assessment</span>
                </li>
                <li>
                  <span className="sch__benefit-icon">✅</span>
                  <span>Personalized scholarship matching</span>
                </li>
                <li>
                  <span className="sch__benefit-icon">✅</span>
                  <span>End-to-end application assistance</span>
                </li>
                <li>
                  <span className="sch__benefit-icon">✅</span>
                  <span>500+ partner colleges across India</span>
                </li>
              </ul>

              <div className="sch__info-contact">
                <div className="sch__info-contact-label">Need instant help?</div>
                <a href="tel:+919048021291" className="sch__info-phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  +91 904 8021 291
                </a>
              </div>
            </div>

            {/* Right form card */}
            <div className="sch__form-card">

              {/* ── SUCCESS STATE ── */}
              {status === 'success' ? (
                <div className="sch__success">
                  <div className="sch__success-icon">🎉</div>
                  <h3>Application Submitted!</h3>
                  <p>Your scholarship application has been received. Our team will reach out within <strong>24 hours</strong>.</p>
                  <p className="sch__success-whatsapp-note">
                    Opening WhatsApp for instant contact…
                  </p>
                  <div className="sch__success-actions">
                    <a
                      href={`https://wa.me/919048021291?text=${encodeURIComponent('Hi GrabGrade! I just submitted my scholarship application. Please guide me with next steps.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sch__success-btn sch__success-btn--whatsapp"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                    <button className="sch__success-btn sch__success-btn--new" onClick={resetForm}>
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                /* ── FORM ── */
                <form
                  className="sch__form"
                  onSubmit={handleSubmit}
                  id="scholarship-form"
                  noValidate
                >
                  <div className="sch__form-title">
                    <h3>Scholarship Application</h3>
                    <p>All fields are required</p>
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="sch__error-banner">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errorMsg}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className={`sch__field ${errors.name ? 'sch__field--error' : ''}`}>
                    <label htmlFor="sch-name">
                      Full Name <span className="sch__required">*</span>
                    </label>
                    <input
                      type="text"
                      id="sch-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                    {errors.name && <span className="sch__field-error">{errors.name}</span>}
                  </div>

                  {/* Email + Phone */}
                  <div className="sch__form-row">
                    <div className={`sch__field ${errors.email ? 'sch__field--error' : ''}`}>
                      <label htmlFor="sch-email">
                        Email <span className="sch__required">*</span>
                      </label>
                      <input
                        type="email"
                        id="sch-email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                      {errors.email && <span className="sch__field-error">{errors.email}</span>}
                    </div>
                    <div className={`sch__field ${errors.phone ? 'sch__field--error' : ''}`}>
                      <label htmlFor="sch-phone">
                        Phone <span className="sch__required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="sch-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        autoComplete="tel"
                        maxLength={10}
                      />
                      {errors.phone && <span className="sch__field-error">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Course + Percentage */}
                  <div className="sch__form-row">
                    <div className={`sch__field ${errors.course ? 'sch__field--error' : ''}`}>
                      <label htmlFor="sch-course">
                        Preferred Course <span className="sch__required">*</span>
                      </label>
                      <div className="sch__select-wrap">
                        <select
                          id="sch-course"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                        >
                          <option value="">Select course</option>
                          {COURSES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <svg className="sch__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                      {errors.course && <span className="sch__field-error">{errors.course}</span>}
                    </div>
                    <div className={`sch__field ${errors.percentage ? 'sch__field--error' : ''}`}>
                      <label htmlFor="sch-percentage">
                        12th Percentage <span className="sch__required">*</span>
                      </label>
                      <input
                        type="number"
                        id="sch-percentage"
                        name="percentage"
                        value={form.percentage}
                        onChange={handleChange}
                        placeholder="e.g. 85"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      {errors.percentage && <span className="sch__field-error">{errors.percentage}</span>}
                    </div>
                  </div>

                  {/* Family Income */}
                  <div className={`sch__field ${errors.income ? 'sch__field--error' : ''}`}>
                    <label htmlFor="sch-income">
                      Family Annual Income <span className="sch__required">*</span>
                    </label>
                    <div className="sch__select-wrap">
                      <select
                        id="sch-income"
                        name="income"
                        value={form.income}
                        onChange={handleChange}
                      >
                        <option value="">Select income range</option>
                        {INCOME_RANGES.map(r => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      <svg className="sch__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                    {errors.income && <span className="sch__field-error">{errors.income}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="sch__submit"
                    id="scholarship-submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="sch__spinner" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Apply for Scholarship
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="sch__privacy">
                    🔒 Your information is secure and will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SETUP NOTICE for dev ── */}
      {GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID') && (
        <div className="sch__dev-notice">
          <strong>⚠️ Dev Notice:</strong> Replace <code>YOUR_SCRIPT_ID_HERE</code> in{' '}
          <code>Scholarships.jsx</code> with your Google Apps Script Web App URL to activate live data capture.
        </div>
      )}
    </div>
  )
}
