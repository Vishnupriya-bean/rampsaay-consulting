import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToSection } from '../utils/scroll';
import { useHomepage } from '../context/HomepageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const paraRef    = useRef<HTMLParagraphElement>(null);
  const btnsRef    = useRef<HTMLDivElement>(null);
  const quoteRef   = useRef<HTMLDivElement>(null);
  const { data } = useHomepage();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(badgeRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 })
      .fromTo(h1Ref.current,     { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.3')
      .fromTo(paraRef.current,   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo(btnsRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(quoteRef.current,  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.7');
  }, []);

  const renderTagline = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 2) return text;
    const lastTwo = words.slice(-2).join(' ');
    const rest = words.slice(0, -2).join(' ');
    return (
      <>
        {rest}{' '}
        <em className="hero-heading--italic">{lastTwo}</em>
      </>
    );
  };

  return (
    <section id="home" ref={sectionRef} className="hero">
      {/* Decorative gradient orbs */}
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />

      <div className="hero-inner">
        {/* Left column */}
        <div className="hero-left">
          <div ref={badgeRef} className="hero-badge">
            <span className="hero-badge-dot" />
            <span>{data?.business_type || 'Sole Proprietorship'}</span>
            <span className="hero-badge-sep">·</span>
            <span>{data?.country || 'India'}</span>
          </div>

          <h1 ref={h1Ref} className="hero-heading">
            {data?.tagline ? renderTagline(data.tagline) : (
              <>
                Quiet expertise for{' '}
                <em className="hero-heading--italic">loud transformations.</em>
              </>
            )}
          </h1>

          <p ref={paraRef} className="hero-para">
            {data?.description || 'Rampsaay Consulting helps leaders move from intent to outcome — across digital transformation, AI innovation & inclusion, and IT delivery execution.'}
          </p>

          <div ref={btnsRef} className="hero-btns">
            <button
              id="start-conversation-btn"
              className="btn-primary"
              onClick={() => scrollToSection(data?.primary_button_link || 'contact')}
            >
              {data?.primary_button_text || 'Start a conversation'}
            </button>
            <button
              id="explore-services-btn"
              className="btn-outline"
              onClick={() => scrollToSection(data?.secondary_button_link || 'services')}
            >
              {data?.secondary_button_text || 'Explore services'}
            </button>
          </div>
        </div>

        {/* Right column — quote card */}
        <div ref={quoteRef} className="hero-right">
          <div className="quote-card">
            <blockquote className="quote-text">
              "{data?.quote || 'Strategy that ships. Technology that includes. Delivery that holds.'}"
            </blockquote>
            <div className="quote-author">
              <div className="quote-avatar">{data?.company_name_in_component?.charAt(0) || 'R'}</div>
              <div className="quote-meta">
                <span className="quote-name">{data?.company_name_in_component || 'Rampsaay Consulting'}</span>
                <span className="quote-sub">{data?.company_policy || 'Practice principles'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
