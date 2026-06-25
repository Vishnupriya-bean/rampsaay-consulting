import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import './index.css';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const overlayRef = useRef<HTMLDivElement>(null);

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
    <>
      {/* Page-load transition overlay */}
      <div ref={overlayRef} className="page-overlay" aria-hidden="true">
        <div className="overlay-logo">
          <span className="overlay-dot" />
          <span className="overlay-text">Rampsaay Consulting</span>
        </div>
      </div>

      {/* App */}
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-dot" />
            <span className="footer-name">Rampsaay Consulting</span>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Rampsaay Consulting. Sole Proprietorship · India.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
