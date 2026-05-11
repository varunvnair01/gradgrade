import './About.css'

const team = [
  { name: 'Expert Counselors', desc: 'Experienced education professionals guiding your path', icon: '👨‍🏫' },
  { name: 'Admission Specialists', desc: 'Dedicated team for seamless admission process', icon: '📋' },
  { name: 'Student Mentors', desc: 'Alumni network providing real campus insights', icon: '🎓' },
]

const milestones = [
  { year: '2018', title: 'Founded', desc: 'GrabGrade started with a mission to simplify college admissions' },
  { year: '2019', title: '1000+ Students', desc: 'Helped over 1000 students find their dream colleges' },
  { year: '2021', title: 'Pan India Expansion', desc: 'Expanded our services across major Indian cities' },
  { year: '2023', title: '500+ Partner Colleges', desc: 'Built partnerships with top institutions nationwide' },
  { year: '2025', title: '50,000+ Students', desc: 'Reached the milestone of guiding 50,000+ students' },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="about-page__hero">
        <div className="container">
          <span className="about-page__badge">About GrabGrade</span>
          <h1>Transforming Education <br/>One Student at a Time</h1>
          <p>We are a team of passionate education professionals committed to helping students navigate their academic journey with confidence.</p>
        </div>
      </div>

      <section className="about-page__mission">
        <div className="container">
          <div className="about-page__mission-grid">
            <div className="about-page__mission-card">
              <div className="about-page__mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To democratize access to quality education by providing expert guidance, personalized counseling, and end-to-end admission support to every student regardless of their background.</p>
            </div>
            <div className="about-page__mission-card">
              <div className="about-page__mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted education consultancy, empowering millions of students to make informed decisions about their academic and professional careers.</p>
            </div>
            <div className="about-page__mission-card">
              <div className="about-page__mission-icon">💎</div>
              <h3>Our Values</h3>
              <p>Transparency, student-first approach, integrity in guidance, and commitment to excellence define everything we do at GrabGrade.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-page__timeline">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones that shaped GrabGrade</p>
          </div>
          <div className="about-page__timeline-items">
            {milestones.map((m, i) => (
              <div key={i} className={`about-page__timeline-item ${i % 2 === 0 ? 'about-page__timeline-item--left' : 'about-page__timeline-item--right'}`}>
                <div className="about-page__timeline-dot"></div>
                <div className="about-page__timeline-content">
                  <span className="about-page__timeline-year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page__team">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <p>Meet the experts behind your success</p>
          </div>
          <div className="about-page__team-grid">
            {team.map((t, i) => (
              <div key={i} className="about-page__team-card">
                <div className="about-page__team-icon">{t.icon}</div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
