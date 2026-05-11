const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded images statically
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));

const COLLEGES_FILE = path.join(__dirname, 'data', 'colleges.json');

// Read colleges from JSON
const getColleges = () => {
  try {
    const data = fs.readFileSync(COLLEGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading colleges.json:', err);
    return [];
  }
};

// Write colleges to JSON
const saveColleges = (data) => {
  try {
    fs.writeFileSync(COLLEGES_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing colleges.json:', err);
  }
};

// Store form submissions in memory (would use DB in production)
const contactSubmissions = [];
const scholarshipSubmissions = [];

// ===== API Routes =====

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  // Hardcoded simple password for demonstration. Use bcrypt/JWT in production.
  if (password === 'varunvnairA@1') {
    res.json({ success: true, token: 'fake-jwt-token-12345' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Middleware to protect admin routes
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === 'Bearer fake-jwt-token-12345') {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

// Get all colleges
app.get('/api/colleges', (req, res) => {
  const { search, stream } = req.query;
  const colleges = getColleges();
  let filtered = [...colleges];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(q))) ||
      c.location.toLowerCase().includes(q)
    );
  }

  if (stream && stream !== 'All') {
    filtered = filtered.filter(c => c.tags && c.tags.includes(stream));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// Get single college by slug
app.get('/api/colleges/:slug', (req, res) => {
  const colleges = getColleges();
  const college = colleges.find(c => c.slug === req.params.slug);
  if (!college) return res.status(404).json({ success: false, message: 'College not found' });
  res.json({ success: true, data: college });
});

// Create a new college (Admin Only)
app.post('/api/colleges', requireAuth, (req, res) => {
  const colleges = getColleges();
  const newCollege = req.body;
  
  if (!newCollege.name || !newCollege.slug) {
    return res.status(400).json({ success: false, message: 'Name and slug are required' });
  }

  // Check for duplicate slug
  if (colleges.find(c => c.slug === newCollege.slug)) {
    return res.status(400).json({ success: false, message: 'A college with this slug already exists' });
  }

  // Set defaults for missing fields
  const college = {
    slug: newCollege.slug,
    name: newCollege.name,
    location: newCollege.location || '',
    rating: parseFloat(newCollege.rating) || 0,
    rank: newCollege.rank || '',
    tags: newCollege.tags || [],
    image: newCollege.image || '',
    fees: newCollege.fees || '',
    founded: newCollege.founded || '',
    totalCourses: newCollege.totalCourses || '0',
    totalStreams: parseInt(newCollege.totalStreams) || 0,
    overview: newCollege.overview || '',
    courses: newCollege.courses || [],
    features: newCollege.features || [],
    resources: newCollege.resources || [],
    contact: newCollege.contact || { phone: '', email: '', website: '' },
    photos: newCollege.photos || [],
  };

  colleges.push(college);
  saveColleges(colleges);
  
  res.status(201).json({ success: true, message: 'College created successfully', data: college });
});

// Update a college (Admin Only)
app.put('/api/colleges/:slug', requireAuth, (req, res) => {
  const colleges = getColleges();
  const index = colleges.findIndex(c => c.slug === req.params.slug);
  
  if (index === -1) return res.status(404).json({ success: false, message: 'College not found' });
  
  colleges[index] = { ...colleges[index], ...req.body };
  saveColleges(colleges);
  
  res.json({ success: true, message: 'College updated successfully', data: colleges[index] });
});

// Delete a college (Admin Only)
app.delete('/api/colleges/:slug', requireAuth, (req, res) => {
  const colleges = getColleges();
  const index = colleges.findIndex(c => c.slug === req.params.slug);
  
  if (index === -1) return res.status(404).json({ success: false, message: 'College not found' });
  
  const deleted = colleges.splice(index, 1)[0];
  saveColleges(colleges);
  
  res.json({ success: true, message: 'College deleted successfully', data: deleted });
});

// Image Upload (Base64) - stores as file and returns URL
app.post('/api/upload', requireAuth, (req, res) => {
  try {
    const { image, filename } = req.body;
    
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // Extract base64 data
    const matches = image.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ success: false, message: 'Invalid image format' });
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');
    
    const safeName = (filename || `image_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '_');
    const finalName = `${safeName}_${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, finalName);
    
    fs.writeFileSync(filePath, buffer);
    
    const imageUrl = `http://localhost:${PORT}/uploads/${finalName}`;
    res.json({ success: true, url: imageUrl, filename: finalName });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message, course } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
  }
  const submission = { id: contactSubmissions.length + 1, name, email, phone, message, course, createdAt: new Date() };
  contactSubmissions.push(submission);
  console.log('📩 New contact submission:', submission);
  res.json({ success: true, message: 'Contact form submitted successfully', data: submission });
});

// Scholarship form submission
app.post('/api/scholarships', (req, res) => {
  const { name, email, phone, course, percentage, income } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
  }
  const submission = { id: scholarshipSubmissions.length + 1, name, email, phone, course, percentage, income, createdAt: new Date() };
  scholarshipSubmissions.push(submission);
  console.log('🎓 New scholarship application:', submission);
  res.json({ success: true, message: 'Scholarship application submitted successfully', data: submission });
});

// Get all contact submissions (for admin)
app.get('/api/admin/contacts', (req, res) => {
  res.json({ success: true, count: contactSubmissions.length, data: contactSubmissions });
});

// Get all scholarship submissions (for admin)
app.get('/api/admin/scholarships', (req, res) => {
  res.json({ success: true, count: scholarshipSubmissions.length, data: scholarshipSubmissions });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const colleges = getColleges();
  res.json({
    success: true,
    data: {
      totalColleges: colleges.length,
      totalContacts: contactSubmissions.length,
      totalScholarships: scholarshipSubmissions.length,
      studentsGuided: 50000,
      successRate: 95,
      yearsExperience: 8,
    }
  });
});

// ===== Homepage Sections API =====
const HOMEPAGE_FILE = path.join(__dirname, 'data', 'homepage.json');

const getHomepage = () => {
  try {
    const data = fs.readFileSync(HOMEPAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading homepage.json:', err);
    return {};
  }
};

const saveHomepage = (data) => {
  try {
    fs.writeFileSync(HOMEPAGE_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing homepage.json:', err);
  }
};

// Get all homepage sections
app.get('/api/homepage', (req, res) => {
  const data = getHomepage();
  res.json({ success: true, data });
});

// Get a specific homepage section
app.get('/api/homepage/:section', (req, res) => {
  const data = getHomepage();
  const section = data[req.params.section];
  if (section === undefined) return res.status(404).json({ success: false, message: 'Section not found' });
  res.json({ success: true, data: section });
});

// Update a homepage section
app.put('/api/homepage/:section', requireAuth, (req, res) => {
  const data = getHomepage();
  const key = req.params.section;
  const validKeys = ['hero_slides', 'hero_stats', 'impact_stats', 'services', 'testimonials', 'cta', 'streams'];
  if (!validKeys.includes(key)) return res.status(400).json({ success: false, message: 'Invalid section' });
  data[key] = req.body.data;
  saveHomepage(data);
  res.json({ success: true, message: `${key} updated successfully` });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`\n🎓 GrabGrade API Server running on http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   GET    /api/colleges          - List colleges`);
  console.log(`   GET    /api/colleges/:slug    - Get college details`);
  console.log(`   POST   /api/colleges          - Create new college (Protected)`);
  console.log(`   PUT    /api/colleges/:slug    - Update college details (Protected)`);
  console.log(`   DELETE /api/colleges/:slug    - Delete college (Protected)`);
  console.log(`   POST   /api/upload            - Upload image (Protected)`);
  console.log(`   POST   /api/admin/login        - Admin authentication`);
  console.log(`   POST   /api/contact            - Submit contact form`);
  console.log(`   POST   /api/scholarships       - Submit scholarship form`);
  console.log(`   GET    /api/stats              - Get platform stats`);
  console.log(`   GET    /api/health             - Health check\n`);
});
