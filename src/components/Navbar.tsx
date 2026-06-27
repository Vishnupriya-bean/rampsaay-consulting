import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { scrollToSection } from '../utils/scroll';
import { useHomepage } from '../context/HomepageContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useHomepage();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
          <span className="logo-dot" />
          <span className="logo-text">{data?.company_name_in_component || 'Rampsaay Consulting'}</span>
        </Link>

        {/* Links */}
        <ul className="navbar-links">
          <li>
            <button className="nav-link" onClick={() => handleNavClick('home')}>
              {data?.nav_home || 'Home'}
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => handleNavClick('services')}>
              {data?.nav_services || 'Services'}
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => handleNavClick('latest-insights')}>
              Blogs
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => handleNavClick('contact')}>
              {data?.nav_contact || 'Contact'}
            </button>
          </li>
        </ul>

        {/* CTA */}
        <button
          id="get-in-touch-btn"
          className="navbar-cta"
          onClick={() => handleNavClick('contact')}
        >
          {data?.nav_button_text || 'Get in touch'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
