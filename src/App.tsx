import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import './index.css';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

import { useHomepage } from './context/HomepageContext';

function App() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { data } = useHomepage();

  /* ── Page-load wipe-out animation ─────────────────────────── */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      yPercent: -100,
      duration: 1.1,
      ease: 'power4.inOut',
      delay: 0.1,
      onComplete: () => {
        if (overlay) overlay.style.display = 'none';
      },
    });
  }, []);

  return (
    <BrowserRouter>
      {/* Page-load transition overlay */}
      <div ref={overlayRef} className="page-overlay" aria-hidden="true">
        <div className="overlay-logo">
          <span className="overlay-dot" />
          <span className="overlay-text">{data?.company_name || 'Rampsaay Consulting'}</span>
        </div>
      </div>

      {/* App */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-dot" />
            <span className="footer-name">{data?.footer_company_name || 'Rampsaay Consulting'}</span>
          </div>
          <p className="footer-copy">
            {data?.footer_copyright || `© ${new Date().getFullYear()} Rampsaay Consulting. Sole Proprietorship · India.`}
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
