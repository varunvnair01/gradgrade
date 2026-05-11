const collegeData = [
  {
    slug: 'jain-university',
    name: 'Jain Deemed-To-Be University',
    location: 'Bangalore, Karnataka',
    rating: 4.5,
    rank: '#1',
    tags: ['Engineering', 'Management', 'Science', 'Commerce', 'Arts and Humanities'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop',
    fees: '₹1.25L - ₹4L/year',
    founded: '1990',
    totalCourses: '200+',
    totalStreams: 6,
    overview: `Jain University, Bangalore is one of India's most sought-after private universities, offering more than 200 programs across UG, PG, law, engineering, commerce, arts, science, management, sports, and design disciplines. Accredited with an A++ grade by NAAC and ranked among the top universities in India by NIRF, QS, and Times Higher Education, Jain University is a top choice for students seeking quality higher education in Bangalore.

For the 2026 academic year, Jain University offers admissions across its flagship programs including BBA, BCA, B.Com, B.Tech (CSE, AI, ML, Data Science, Cybersecurity), BA LLB, BBA LLB, B.Sc, and a wide range of postgraduate programs. Annual fees start from Rs. 1,25,000 and go up to Rs. 4,00,000 depending on the program and specialization.

Why Choose Jain University Bangalore? NAAC A++ Accredited University, Ranked 85 by NIRF among Indian Universities, Ranked 91-95 in QS Asia University Rankings, 5-Star Rating by KSURF, Authorized Partner for Study in India (SII) Program. The university features an industry-integrated curriculum with top recruiters, 200+ global MoUs and exchange programs, state-of-the-art campus with world-class infrastructure, and a strong placement record with 1000+ recruiting companies.`,
    courses: [
      { name: 'B.Com (Regular & Professional)', fee: '₹2,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BBA (General & Specializations)', fee: '₹2,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BCA (Computer Applications)', fee: '₹2,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Tech (CSE, AI & ML, Data Science)', fee: '₹3,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'BA LLB / BBA LLB (Integrated Law)', fee: '₹3,00,000 per year', duration: '5 Years', level: 'UG' },
      { name: 'B.Sc (PCM, CBZ, Animation, Visual Media)', fee: '₹1,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'MBA (Marketing, Finance, HR, Analytics)', fee: '₹4,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.Tech (Various Specializations)', fee: '₹3,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'MCA (Master of Computer Applications)', fee: '₹2,50,000 per year', duration: '2 Years', level: 'PG' },
    ],
    features: [
      { title: 'Ranked 85 by NIRF | Top University in Bangalore 2026', description: 'Jain University is ranked 85 among top universities in India by the National Institutional Ranking Framework (NIRF) 2024, making it one of the best private universities in Bangalore for engineering, management, law, and science programs.' },
      { title: 'NAAC A++ Accredited & 5-Star KSURF Rated University', description: 'Jain University holds NAAC A++ accreditation – the highest grade awarded by the National Assessment and Accreditation Council – and a prestigious 5-Star rating by the Karnataka State Universities Rating Framework (KSURF).' },
      { title: '200+ Global MoUs & Exchange Programs', description: 'With partnerships across 40+ countries, Jain University offers students international exposure through semester exchange programs, dual-degree options, and collaborative research opportunities with top global universities.' },
      { title: 'Strong Placement Record with 1000+ Recruiters', description: 'Jain University boasts a robust placement cell with 1000+ recruiting companies including top MNCs like Deloitte, KPMG, TCS, Infosys, and Amazon, ensuring excellent career opportunities for graduates across all programs.' },
    ],
    resources: [
      { name: 'Jain University Brochure 2026', type: 'PDF', url: '#' },
      { name: 'Fee Structure Document', type: 'PDF', url: '#' },
      { name: 'Placement Report 2025', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 860 600 4306',
      email: 'admissions@jainuniversity.ac.in',
      website: 'www.jainuniversity.ac.in',
    },
  },
  {
    slug: 'christ-university',
    name: 'Christ University',
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    rank: '#2',
    tags: ['Arts', 'Science', 'Commerce', 'Management', 'Law'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop',
    fees: '₹1.5L - ₹6L/year',
    founded: '1969',
    totalCourses: '150+',
    totalStreams: 5,
    overview: `Christ University, Bangalore is one of India's premier institutions of higher learning, established in 1969 by the Carmelites of Mary Immaculate (CMI). It was declared a Deemed-to-be University in 2008 and has consistently been ranked among the top universities in India for academic excellence and holistic development.

With campuses in Bangalore (Central, Kengeri, and Yeshwanthpur), Delhi-NCR, and Pune, Christ University offers a diverse range of programs across arts, science, commerce, management, law, engineering, and social sciences. The university is known for its rigorous academic standards, vibrant campus life, and emphasis on research and innovation.

Christ University holds NAAC A++ accreditation, is ranked in the top 100 by NIRF, and is recognized by UGC. The university emphasizes a value-based education system with strong industry connections and a commitment to nurturing well-rounded professionals.`,
    courses: [
      { name: 'B.A. (English, Psychology, Economics, Political Science)', fee: '₹1,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Com (Regular, Professional, International Finance)', fee: '₹1,75,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BBA (Finance, Marketing, Analytics)', fee: '₹3,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Sc (Physics, Chemistry, Mathematics, Data Science)', fee: '₹1,60,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BA LLB / BBA LLB (Integrated Law)', fee: '₹3,50,000 per year', duration: '5 Years', level: 'UG' },
      { name: 'MBA (Various Specializations)', fee: '₹6,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.A. (English, Psychology, Economics)', fee: '₹1,50,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.Com (Finance & Taxation)', fee: '₹1,75,000 per year', duration: '2 Years', level: 'PG' },
    ],
    features: [
      { title: 'NAAC A++ Accredited – Highest Grade in India', description: 'Christ University has been accredited with the prestigious A++ grade by NAAC, reflecting its exceptional standards in teaching, research, infrastructure, and overall academic governance.' },
      { title: 'Top 100 NIRF Ranked University', description: 'Consistently ranked among the top 100 universities in India by NIRF, Christ University is recognized for its academic rigor, research output, and excellent student outcomes across all disciplines.' },
      { title: 'Multicampus Presence Across India', description: 'With campuses in Bangalore (3 locations), Delhi-NCR, and Pune, Christ University provides students with state-of-the-art facilities and diverse learning environments across the country.' },
      { title: 'Excellent Placement Record', description: 'Christ University maintains a strong placement record with top companies like EY, Deloitte, KPMG, Goldman Sachs, and JP Morgan recruiting from the campus, with highest packages reaching ₹30+ LPA.' },
    ],
    resources: [
      { name: 'Christ University Brochure 2026', type: 'PDF', url: '#' },
      { name: 'Fee Structure Document', type: 'PDF', url: '#' },
      { name: 'Admission Guide 2026', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 4012 9100',
      email: 'admissions@christuniversity.in',
      website: 'www.christuniversity.in',
    },
  },
  {
    slug: 'alliance-university',
    name: 'Alliance University',
    location: 'Bangalore, Karnataka',
    rating: 4.3,
    rank: '#3',
    tags: ['Engineering', 'Law', 'Management', 'Commerce'],
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=600&fit=crop',
    fees: '₹3L - ₹10L/year',
    founded: '2010',
    totalCourses: '80+',
    totalStreams: 4,
    overview: `Alliance University is a private university established in 2010 in Bangalore, Karnataka. It is one of the fastest-growing universities in India, known for its world-class infrastructure, industry-aligned curriculum, and strong emphasis on research and innovation.

The university offers programs across engineering, management, law, and commerce through its constituent colleges – Alliance College of Engineering and Design, Alliance School of Business, and Alliance School of Law. Alliance University is recognized by UGC and approved by AICTE and BCI.

Alliance University's Anekal campus spans over 45 acres with state-of-the-art laboratories, smart classrooms, a modern library, sports facilities, and comfortable hostels. The university has strong ties with international institutions and offers global immersion programs to students.`,
    courses: [
      { name: 'B.Tech (CSE, ECE, Mechanical, Civil)', fee: '₹4,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'BBA (Business Administration)', fee: '₹3,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Com (Hons)', fee: '₹3,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BA LLB / BBA LLB (Integrated Law)', fee: '₹4,00,000 per year', duration: '5 Years', level: 'UG' },
      { name: 'MBA (Marketing, Finance, HR, Operations)', fee: '₹8,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.Tech (Various Specializations)', fee: '₹3,50,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'LLM (Master of Laws)', fee: '₹3,00,000 per year', duration: '1 Year', level: 'PG' },
    ],
    features: [
      { title: 'World-Class 45-Acre Campus in Bangalore', description: 'Alliance University\'s Anekal campus features cutting-edge laboratories, smart classrooms, a comprehensive library, state-of-the-art sports complex, and modern residential facilities.' },
      { title: 'Top MBA Program in Karnataka', description: 'Alliance School of Business is recognized as one of the top B-schools in South India, with its MBA program consistently ranked among the best for return on investment and placement quality.' },
      { title: 'Global Immersion & Exchange Programs', description: 'The university offers semester-abroad programs and global immersion experiences with partner universities in the USA, UK, France, Germany, and Australia, giving students international exposure.' },
      { title: 'Strong Industry Connections', description: 'Alliance University maintains partnerships with 500+ companies for placements, internships, and industry projects. Top recruiters include Amazon, Microsoft, Deloitte, EY, and KPMG.' },
    ],
    resources: [
      { name: 'Alliance University Brochure 2026', type: 'PDF', url: '#' },
      { name: 'Fee Structure 2026', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 4619 9000',
      email: 'admissions@alliance.edu.in',
      website: 'www.alliance.edu.in',
    },
  },
  {
    slug: 'sapthagiri-nps-university',
    name: 'Sapthagiri NPS University',
    location: 'Bangalore, Karnataka',
    rating: 4.2,
    rank: '#4',
    tags: ['Medical', 'Nursing', 'Pharmacy', 'Allied Health Sciences'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&h=600&fit=crop',
    fees: '₹2L - ₹7L/year',
    founded: '1990',
    totalCourses: '45+',
    totalStreams: 4,
    overview: `Sapthagiri NPS University, Bangalore is a premier institution dedicated to healthcare and medical education. Established under the aegis of NPS Education Trust, the university has a strong legacy in producing some of the finest medical professionals in Karnataka and beyond.

The university offers programs across medical sciences, nursing, pharmacy, and allied health sciences. It is recognized by the National Medical Commission (NMC), Pharmacy Council of India (PCI), and Indian Nursing Council (INC). The affiliated Sapthagiri Hospital serves as the primary teaching hospital, providing students with extensive clinical exposure.

With a focus on practical learning, research, and community health, Sapthagiri NPS University prepares students for successful careers in healthcare. The campus is equipped with modern simulation labs, anatomy theatres, and research centers.`,
    courses: [
      { name: 'MBBS (Bachelor of Medicine & Surgery)', fee: '₹7,00,000 per year', duration: '5.5 Years', level: 'UG' },
      { name: 'B.Sc Nursing', fee: '₹2,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Pharm (Bachelor of Pharmacy)', fee: '₹2,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'BPT (Bachelor of Physiotherapy)', fee: '₹2,00,000 per year', duration: '4.5 Years', level: 'UG' },
      { name: 'MD / MS (Various Specializations)', fee: '₹6,00,000 per year', duration: '3 Years', level: 'PG' },
      { name: 'M.Sc Nursing (Specializations)', fee: '₹2,50,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'Pharm.D (Doctor of Pharmacy)', fee: '₹3,00,000 per year', duration: '6 Years', level: 'UG' },
    ],
    features: [
      { title: 'NMC Recognized Medical College', description: 'Sapthagiri NPS University is fully recognized by the National Medical Commission (NMC) for its MBBS and MD/MS programs, ensuring students receive nationally accredited medical education.' },
      { title: '750-Bed Teaching Hospital', description: 'The affiliated Sapthagiri Hospital is a 750-bed multi-specialty facility that provides students extensive clinical training across all medical and surgical specialties.' },
      { title: 'Modern Simulation & Research Labs', description: 'State-of-the-art simulation labs, advanced anatomical dissection halls, and dedicated research centers enable hands-on learning and cutting-edge medical research.' },
      { title: 'Strong Clinical Exposure from Year 1', description: 'Students begin clinical rotations early in their academic journey, gaining real-world patient interaction and bedside learning from the very first year.' },
    ],
    resources: [
      { name: 'University Prospectus 2026', type: 'PDF', url: '#' },
      { name: 'MBBS Fee Structure', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 2357 1777',
      email: 'admissions@sapthagiri.edu.in',
      website: 'www.sapthagiri.edu.in',
    },
  },
  {
    slug: 'ramaiah-university',
    name: 'Ramaiah University of Applied Sciences',
    location: 'Bangalore, Karnataka',
    rating: 4.6,
    rank: '#5',
    tags: ['Engineering', 'Medical', 'Architecture', 'Design', 'Management'],
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&h=600&fit=crop',
    fees: '₹3L - ₹12L/year',
    founded: '1962',
    totalCourses: '120+',
    totalStreams: 5,
    overview: `Ramaiah University of Applied Sciences (RUAS), formerly MS Ramaiah Institute of Technology, is one of Bangalore's most prestigious educational institutions. Founded in 1962 by the visionary Dr. M.S. Ramaiah, the institution has grown into a multi-disciplinary university offering programs across engineering, architecture, management, design, and health sciences.

RUAS is recognized by UGC, accredited by NAAC with an A+ grade, and its engineering programs are accredited by NBA. The university is known for its applied sciences approach, emphasizing practical skills, industry exposure, and research-driven learning.

The sprawling campus in the heart of Bangalore features world-class infrastructure, including advanced robotics labs, innovation centers, design studios, and a dedicated incubation center for student startups. RUAS alumni hold leadership positions in top global companies.`,
    courses: [
      { name: 'B.Tech (Computer Science, Electronics, Mechanical)', fee: '₹4,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Arch (Bachelor of Architecture)', fee: '₹3,50,000 per year', duration: '5 Years', level: 'UG' },
      { name: 'BBA (Business Administration)', fee: '₹3,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Des (Product, Fashion, Interior Design)', fee: '₹4,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Sc (Allied Health Sciences)', fee: '₹2,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'MBA (Business Analytics, Finance, Marketing)', fee: '₹6,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.Tech (AI, Robotics, VLSI, Structural)', fee: '₹3,50,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'Ph.D (Research Programs)', fee: '₹2,00,000 per year', duration: '3-5 Years', level: 'Doctoral' },
    ],
    features: [
      { title: 'NAAC A+ Accredited University', description: 'Ramaiah University holds NAAC A+ accreditation and NBA accreditation for multiple engineering programs, reflecting its commitment to maintaining high academic standards and quality education.' },
      { title: '60+ Years of Academic Excellence', description: 'Founded in 1962, RUAS has over six decades of experience in shaping professionals across diverse fields. The Ramaiah Group operates 100+ institutions serving over 50,000 students.' },
      { title: 'Innovation Hub & Startup Incubator', description: 'The university runs a dedicated Innovation Center and startup incubation program that has helped launch 50+ student startups, with funding support and mentorship from industry leaders.' },
      { title: 'Prime Bangalore Location', description: 'Located in the heart of Bangalore on MSR Nagar, the campus offers excellent connectivity and proximity to major IT parks, hospitals, and industry hubs in the Silicon Valley of India.' },
    ],
    resources: [
      { name: 'RUAS Prospectus 2026', type: 'PDF', url: '#' },
      { name: 'Fee Structure & Scholarships', type: 'PDF', url: '#' },
      { name: 'Placement Brochure 2025', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 4590 6000',
      email: 'admissions@msruas.ac.in',
      website: 'www.msruas.ac.in',
    },
  },
  {
    slug: 's-vyasa-university',
    name: 'S-VYASA University',
    location: 'Bangalore, Karnataka',
    rating: 4.1,
    rank: '#6',
    tags: ['Yoga', 'Science', 'Management', 'Naturopathy'],
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1200&h=600&fit=crop',
    fees: '₹1L - ₹4L/year',
    founded: '2002',
    totalCourses: '50+',
    totalStreams: 4,
    overview: `Swami Vivekananda Yoga Anusandhana Samsthana (S-VYASA) is India's premier yoga university, established in 2002 in Bangalore. It is a unique institution dedicated to integrating ancient Indian wisdom with modern science, offering programs in yoga, naturopathy, management, and allied sciences.

S-VYASA is recognized by UGC as a Deemed-to-be University and accredited by NAAC with an A grade. The university is a pioneer in yoga research and therapy, with its findings published in top international journals. It collaborates with WHO, AYUSH Ministry, and leading global universities for research.

The serene 100-acre campus in Jigani, South Bangalore provides the perfect environment for holistic learning. The university runs a 250-bed integrative medicine hospital (Prashanti Kutiram) offering yoga therapy alongside conventional medicine.`,
    courses: [
      { name: 'B.Sc Yoga (Yoga Science)', fee: '₹1,25,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BNYS (Bachelor of Naturopathy & Yogic Sciences)', fee: '₹3,50,000 per year', duration: '5.5 Years', level: 'UG' },
      { name: 'BBA (Business Administration)', fee: '₹1,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Sc (Psychology, Life Sciences)', fee: '₹1,25,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'M.Sc Yoga Therapy', fee: '₹1,50,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'MBA (Yoga & Management)', fee: '₹2,50,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'Ph.D (Yoga, Life Sciences, Management)', fee: '₹1,00,000 per year', duration: '3-5 Years', level: 'Doctoral' },
    ],
    features: [
      { title: 'India\'s Premier Yoga University', description: 'S-VYASA is internationally recognized as the leading institution for yoga education and research, with collaborations with WHO, AYUSH, and universities across 30+ countries.' },
      { title: 'NAAC A Grade Accredited', description: 'The university holds NAAC A grade accreditation, affirming its commitment to quality education, research output, and institutional governance in the fields of yoga and holistic sciences.' },
      { title: 'Integrative Medicine Hospital', description: 'Prashanti Kutiram, the 250-bed hospital on campus, offers a unique blend of yoga therapy, naturopathy, and modern medicine, serving as an exceptional clinical training ground for students.' },
      { title: 'Serene 100-Acre Campus', description: 'The lush, green campus in Jigani provides a tranquil environment ideal for yoga practice, meditation, and academic study, away from the hustle of the city while remaining accessible.' },
    ],
    resources: [
      { name: 'S-VYASA Brochure 2026', type: 'PDF', url: '#' },
      { name: 'BNYS Program Guide', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 2263 9906',
      email: 'registrar@svyasa.edu.in',
      website: 'www.svyasa.edu.in',
    },
  },
  {
    slug: 'pes-university',
    name: 'PES University',
    location: 'Bangalore, Karnataka',
    rating: 4.4,
    rank: '#7',
    tags: ['Engineering', 'Science', 'Management', 'Design'],
    image: 'https://images.unsplash.com/photo-1568792923760-d9a3a3c3fe45?w=1200&h=600&fit=crop',
    fees: '₹4L - ₹12L/year',
    founded: '1972',
    totalCourses: '75+',
    totalStreams: 4,
    overview: `PES University (formerly PES Institute of Technology) is one of Bangalore's most reputed private universities, particularly renowned for its engineering and technology programs. Established by the People's Education Society in 1972, PES University has consistently produced top-quality engineers, entrepreneurs, and researchers.

The university operates two campuses in Bangalore – the flagship campus at Hanumantha Nagar (100 Feet Ring Road) and a second campus at Electronic City. PES University is recognized by UGC, accredited by NAAC with an A grade, and its programs are approved by AICTE.

PES University is particularly famous for its Computer Science program, which is ranked among the top in India. The university has a vibrant entrepreneurial ecosystem, with several successful startups founded by PES alumni, and maintains strong industry partnerships with companies like Google, Microsoft, Intel, and MuSigma.`,
    courses: [
      { name: 'B.Tech (CSE – all specializations)', fee: '₹5,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Tech (ECE, EEE, Mechanical, Civil)', fee: '₹4,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'BBA (Business Administration)', fee: '₹3,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'B.Des (Product & Interaction Design)', fee: '₹4,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Sc (Physics, Mathematics, Electronics)', fee: '₹2,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'MBA (Technology Management, Finance)', fee: '₹6,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.Tech (CSE, ECE, VLSI, Networking)', fee: '₹3,50,000 per year', duration: '2 Years', level: 'PG' },
    ],
    features: [
      { title: 'Top-Ranked CSE Program in India', description: 'PES University\'s Computer Science program consistently ranks among the best in India, producing graduates who work at top tech companies globally including Google, Microsoft, Amazon, and Meta.' },
      { title: 'Strong Entrepreneurial Ecosystem', description: 'PES has one of the most active startup ecosystems among Indian universities, with a dedicated incubation center, venture funding support, and multiple successful alumni-founded companies worth $100M+.' },
      { title: 'NAAC A Grade & NBA Accredited', description: 'The university holds NAAC A grade accreditation and NBA accreditation for its engineering programs, ensuring students receive education that meets national and international quality benchmarks.' },
      { title: 'Industry-Integrated Learning', description: 'PES University partners with Google, Microsoft, Intel, Mu Sigma, and 200+ companies for live projects, hackathons, and industry visits, ensuring students are industry-ready from day one.' },
    ],
    resources: [
      { name: 'PES University Brochure 2026', type: 'PDF', url: '#' },
      { name: 'PESSAT Exam Guide', type: 'PDF', url: '#' },
      { name: 'Placement Report 2025', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 2672 1983',
      email: 'admissions@pes.edu',
      website: 'www.pes.edu',
    },
  },
  {
    slug: 'rv-university',
    name: 'RV University',
    location: 'Bangalore, Karnataka',
    rating: 4.5,
    rank: '#8',
    tags: ['Engineering', 'Design', 'Liberal Arts', 'Law', 'Commerce'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&h=600&fit=crop',
    fees: '₹3L - ₹9L/year',
    founded: '2019',
    totalCourses: '60+',
    totalStreams: 5,
    overview: `RV University (RVU) is one of Bangalore's newest and most ambitious universities, established in 2019 by the Rashtreeya Vidyalaya Educational Trust – the same trust behind the prestigious RV College of Engineering. Despite being relatively young, RVU has quickly established itself as a forward-thinking institution.

RV University offers programs through its schools of Engineering, Design & Innovation, Liberal Arts & Sciences, Computer Science & Engineering, Law, and Business & Management. The university follows a flexible, interdisciplinary curriculum that encourages students to explore multiple domains.

The modern campus features cutting-edge makerspaces, design studios, coding labs, moot courts, and collaborative learning spaces. RVU's unique pedagogy combines project-based learning, industry mentorship, and global exposure to produce graduates who are creative, critical thinkers.`,
    courses: [
      { name: 'B.Tech (CSE, AI, IoT, Cybersecurity)', fee: '₹4,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Des (UI/UX, Product Design, Visual Communication)', fee: '₹4,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.A. (Liberal Arts – Economics, Psychology, Media)', fee: '₹3,00,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'BBA LLB (Integrated Law)', fee: '₹3,50,000 per year', duration: '5 Years', level: 'UG' },
      { name: 'B.Com (Hons)', fee: '₹2,50,000 per year', duration: '3 Years', level: 'UG' },
      { name: 'MBA (Entrepreneurship, Digital Business)', fee: '₹6,00,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'M.Tech (Data Science, Computer Science)', fee: '₹3,50,000 per year', duration: '2 Years', level: 'PG' },
    ],
    features: [
      { title: 'Backed by RV Educational Trust Legacy', description: 'RV University is part of the 80+ year legacy of the Rashtreeya Vidyalaya Trust, which runs some of Bangalore\'s most respected institutions including RV College of Engineering and RV Institute of Management.' },
      { title: 'Interdisciplinary & Flexible Curriculum', description: 'RVU follows a modern, flexible curriculum that allows students to take courses across departments, encouraging interdisciplinary thinking and helping students develop a broad skill set for the future.' },
      { title: 'State-of-the-Art Modern Campus', description: 'The brand-new campus features makerspaces, design studios, innovation labs, a comprehensive library, world-class sports facilities, and collaborative learning spaces designed for the 21st century.' },
      { title: 'Strong Design & Innovation Focus', description: 'RVU\'s School of Design & Innovation is one of the best in South India, offering programs that blend creativity, technology, and business thinking to produce industry-ready designers.' },
    ],
    resources: [
      { name: 'RV University Brochure 2026', type: 'PDF', url: '#' },
      { name: 'Fee Structure & Scholarships', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 6817 6100',
      email: 'admissions@rvu.edu.in',
      website: 'www.rvu.edu.in',
    },
  },
  {
    slug: 'bms-college-of-engineering',
    name: 'BMS College of Engineering',
    location: 'Bangalore, Karnataka',
    rating: 4.3,
    rank: '#9',
    tags: ['Engineering', 'Architecture', 'Science', 'Management'],
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&h=600&fit=crop',
    fees: '₹2L - ₹5L/year',
    founded: '1946',
    totalCourses: '40+',
    totalStreams: 4,
    overview: `BMS College of Engineering (BMSCE) is one of India's oldest and most prestigious engineering institutions, established in 1946 by B.M. Sreenivasaiah in the Bull Temple Road area of Bangalore. It is one of the first private engineering colleges in India and has a glorious legacy of producing outstanding engineers, entrepreneurs, and leaders.

BMSCE is affiliated with Visvesvaraya Technological University (VTU) and is accredited by NAAC with an A+ grade. The institution offers undergraduate, postgraduate, and doctoral programs in engineering, architecture, science, and management.

Known for its strong alumni network, excellent placements, and vibrant campus culture, BMSCE attracts top talent from across Karnataka and India. The campus in the heart of Bangalore provides unmatched connectivity and access to the tech ecosystem.`,
    courses: [
      { name: 'B.E. (Computer Science & Engineering)', fee: '₹3,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.E. (Electronics & Communication)', fee: '₹2,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.E. (Mechanical Engineering)', fee: '₹2,00,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.E. (Information Science & Engineering)', fee: '₹2,50,000 per year', duration: '4 Years', level: 'UG' },
      { name: 'B.Arch (Architecture)', fee: '₹2,50,000 per year', duration: '5 Years', level: 'UG' },
      { name: 'M.Tech (CSE, VLSI, Structural, Thermal)', fee: '₹1,80,000 per year', duration: '2 Years', level: 'PG' },
      { name: 'MBA (VTU)', fee: '₹2,50,000 per year', duration: '2 Years', level: 'PG' },
    ],
    features: [
      { title: 'One of India\'s First Private Engineering Colleges', description: 'Established in 1946, BMSCE is among the first private engineering institutions in India with nearly 80 years of legacy in engineering education, producing generations of distinguished professionals.' },
      { title: 'NAAC A+ Grade Accredited', description: 'BMSCE holds NAAC A+ accreditation and multiple NBA-accredited programs, positioning it among the top-tier engineering colleges in Karnataka and India.' },
      { title: 'Extensive Alumni Network', description: 'BMSCE boasts a powerful alumni network of 50,000+ professionals across the globe, including founders of major tech companies, CEOs, and leaders in government and academia.' },
      { title: 'Prime Central Bangalore Location', description: 'Located near Bull Temple Road in the heart of Bangalore, BMSCE offers unmatched access to the city\'s tech ecosystem, industry events, and entrepreneurial opportunities.' },
    ],
    resources: [
      { name: 'BMSCE Prospectus 2026', type: 'PDF', url: '#' },
      { name: 'CET Counselling Guide', type: 'PDF', url: '#' },
      { name: 'Placement Statistics 2025', type: 'PDF', url: '#' },
    ],
    contact: {
      phone: '+91 80 2662 2130',
      email: 'principal@bmsce.ac.in',
      website: 'www.bmsce.ac.in',
    },
  },
]

export default collegeData
