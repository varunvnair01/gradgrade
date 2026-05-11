import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', course: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch (err) {
      // Backend might not be running
    }
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', phone: '', message: '', course: '' })
  }

  return (
    <div className="contact-page">
      <div className="contact-page__hero">
        <div className="container">
          <span className="contact-page__badge">Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We&apos;re here to help you find the perfect academic path</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-page__grid">
          <div className="contact-page__info">
            <h2>Let&apos;s Connect</h2>
            <p>Fill out the form or reach us directly. Our team typically responds within 2 hours.</p>

            <div className="contact-page__cards">
              <div className="contact-page__info-card">
                <span className="contact-page__info-icon">📞</span>
                <div>
                  <h4>Call Us</h4>
                  <a href="tel:+919048021291">+91-9048021291</a>
                </div>
              </div>
              <div className="contact-page__info-card">
                <span className="contact-page__info-icon">✉️</span>
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:grabgrade.edu@gmail.com">grabgrade.edu@gmail.com</a>
                </div>
              </div>
              <div className="contact-page__info-card">
                <span className="contact-page__info-icon">📍</span>
                <div>
                  <h4>Visit Us</h4>
                  <p>Bangalore, Karnataka, India</p>
                </div>
              </div>
              <div className="contact-page__info-card">
                <span className="contact-page__info-icon">⏰</span>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 9AM - 7PM</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-page__form" onSubmit={handleSubmit} id="contact-form">
            {submitted && (
              <div className="contact-page__success">
                ✅ Thank you! We&apos;ll get back to you shortly.
              </div>
            )}
            <div className="contact-page__form-row">
              <div className="contact-page__field">
                <label htmlFor="contact-name">Full Name</label>
                <input type="text" id="contact-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
              </div>
              <div className="contact-page__field">
                <label htmlFor="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
            </div>
            <div className="contact-page__form-row">
              <div className="contact-page__field">
                <label htmlFor="contact-phone">Phone</label>
                <input type="tel" id="contact-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
              </div>
              <div className="contact-page__field">
                <label htmlFor="contact-course">Interested Course</label>
                <select id="contact-course" name="course" value={form.course} onChange={handleChange}>
                  <option value="">Select a course</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical Sciences</option>
                  <option value="management">Management</option>
                  <option value="arts">Arts & Design</option>
                  <option value="law">Law</option>
                  <option value="science">Science</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="contact-page__field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your goals..." rows={5} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary contact-page__submit" id="contact-submit">
              Send Message <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
