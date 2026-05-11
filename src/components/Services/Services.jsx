import { useState, useEffect } from 'react'
import './Services.css'

const defaultServices = [
  { icon: '🧭', title: 'Career Counseling', description: 'Get expert guidance for your career path with personalized assessments and industry insights.' },
  { icon: '📝', title: 'Admission Support', description: 'End-to-end admission assistance from application to enrollment at top institutions.' },
  { icon: '📄', title: 'Document Assistance', description: 'Complete documentation support including applications, transcripts, and recommendations.' },
  { icon: '💬', title: '24/7 Support', description: 'Round-the-clock assistance and guidance through chat, phone, and email.' },
  { icon: '👑', title: 'Premium Guidance', description: 'Exclusive mentorship from industry experts and alumni of top universities.' },
]

export default function Services() {
  const [services, setServices] = useState(defaultServices)

  useEffect(() => {
    fetch('http://localhost:4000/api/homepage/services')
      .then(r => r.json())
      .then(d => { if (d.success && d.data?.length) setServices(d.data) })
      .catch(() => {})
  }, [])

  return (
    <section className="services" id="our-services">
      <div className="services__bg-elements">
        <div className="services__circle services__circle--1"></div>
        <div className="services__circle services__circle--2"></div>
      </div>
      <div className="container">
        <div className="services__header">
          <h2>Our Services</h2>
          <p>Next-generation solutions for your academic evolution</p>
        </div>
        <div className="services__grid">
          {services.map((service, i) => (
            <div key={i} className="services__card" id={`service-card-${i}`}>
              <div className="services__card-icon">{service.icon}</div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
              <div className="services__card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
