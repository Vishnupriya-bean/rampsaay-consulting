import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToSection } from '../utils/scroll';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-dot" />
          <span className="logo-text">Rampsaay Consulting</span>
        </div>

        {/* Links */}
        <ul className="navbar-links">
          <li>
            <button className="nav-link" onClick={() => scrollToSection('home')}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection('services')}>
              Services
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </li>
        </ul>

        {/* CTA */}
        <button
          id="get-in-touch-btn"
          className="navbar-cta"
          onClick={() => scrollToSection('contact')}
        >
          Get in touch
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
