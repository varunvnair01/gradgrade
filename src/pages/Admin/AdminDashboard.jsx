import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CollegeEditor from './CollegeEditor';
import HomepageEditor from './HomepageEditor';
import './Admin.css';

export default function AdminDashboard() {
  const [mode, setMode] = useState('colleges');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin');
  }, [navigate]);

  const toast = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  return (
    <div className="adm">
      <div className="container">
        <header className="adm__header">
          <div className="adm__header-left">
            <h1>🎓 Admin Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className={`adm__mode-btn ${mode === 'colleges' ? 'adm__mode-btn--active' : ''}`}
              onClick={() => setMode('colleges')}
            >🏫 Colleges</button>
            <button
              className={`adm__mode-btn ${mode === 'homepage' ? 'adm__mode-btn--active' : ''}`}
              onClick={() => setMode('homepage')}
            >🏠 Homepage</button>
            <button
              onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin'); }}
              className="adm__logout"
            >Logout</button>
          </div>
        </header>

        {msg.text && <div className={`adm__toast adm__toast--${msg.type}`}>{msg.text}</div>}

        {mode === 'colleges' && <CollegeEditor toast={toast} />}
        {mode === 'homepage' && <HomepageEditor toast={toast} />}
      </div>
    </div>
  );
}
