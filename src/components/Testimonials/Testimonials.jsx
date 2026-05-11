import { useState, useEffect, useRef } from 'react'
import './Testimonials.css'

const defaultTestimonials = [
  { name: 'Gouri Vijayakumar', course: '1st Year Fashion Designing', college: 'BGS & SJB Group of Institutions', quote: 'When I had no clue about Bangalore and its colleges, GrabGrade helped me explore all suitable options. They gave me an opportunity to directly talk with universities and made the process smooth.', avatar: '👩‍🎓' },
  { name: 'Umutijima Shyaka Odette', course: '1st Year BPT', college: 'Jain University', quote: 'I met them on Instagram when I was in Rwanda & frustrated about my approach to institutions. They helped me get the course I wanted with 100% Scholarship.', avatar: '👩‍💼' },
  { name: 'Mehar Ban K.R', course: '3rd Year BSc MIT', college: 'East Point Medical College', quote: 'As a new student at colleges in Bangalore, GrabGrade gave me convincing advice on choosing the right course and university. They supported me in this new city.', avatar: '👨‍🎓' },
  { name: 'Don Mathew', course: 'BSc Nursing', college: 'Shusruthy College of Nursing', quote: 'I highly recommend GrabGrade for anyone seeking guidance and support in their academic journey. The team was incredibly knowledgeable and provided me with personalized advice.', avatar: '👨‍⚕️' },
  { name: 'Rohith', course: 'BSc Psychology', college: 'Christ Deemed to be University', quote: 'I had a wonderful experience with GrabGrade. They were incredibly knowledgeable about different universities and their admission processes. Even after admission, they continued to provide support.', avatar: '👨‍🎓' },
  { name: 'Alan T Mathay', course: '1st Year BPT', college: 'MVM Group of Institutions', quote: 'Thanks to their support, I am now enrolled in a program that is perfect for me. They helped me identify my strengths and interests, providing valuable information about universities.', avatar: '👨‍💻' },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/homepage/testimonials')
      .then(r => r.json())
      .then(d => { if (d.success && d.data?.length) setTestimonials(d.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Students Say</h2>
          <p>Real stories from students who transformed their dreams into reality</p>
        </div>
        <div className="testimonials__viewport">
          <div
            className="testimonials__track"
            ref={trackRef}
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="testimonials__card">
                <div className="testimonials__quote-icon">"</div>
                <p className="testimonials__text">{t.quote}</p>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">{t.avatar}</div>
                  <div>
                    <h4 className="testimonials__name">{t.name}</h4>
                    <p className="testimonials__course">{t.course}</p>
                    <p className="testimonials__college">{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === currentIndex ? 'testimonials__dot--active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
