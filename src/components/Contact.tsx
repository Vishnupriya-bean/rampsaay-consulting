import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.contact-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact-inner">
        {/* Header */}
        <div ref={headRef} className="contact-head">
          <span className="section-label">03 · Contact</span>
          <h2 className="contact-title">Let&apos;s talk.</h2>
          <p className="contact-subtitle">
            A short note about your context is the best place to start.
            We&apos;ll reply within two business days.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="contact-cards">
          {/* Email */}
          <a
            href="mailto:hello@rampsaayconsulting.xyz"
            className="contact-card"
            id="contact-email-card"
          >
            <div className="contact-card-header">
              <span className="contact-card-icon" aria-hidden="true">
                {/* Envelope icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </span>
              <span className="contact-card-type">Email</span>
            </div>
            <span className="contact-card-value">hello@rampsaayconsulting.xyz</span>
            <span className="contact-card-note">
              Best for proposals, briefs, and detailed introductions.
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+919818273612"
            className="contact-card"
            id="contact-phone-card"
          >
            <div className="contact-card-header">
              <span className="contact-card-icon" aria-hidden="true">
                {/* Phone icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.19 2 2 0 012.1 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <span className="contact-card-type">Phone</span>
            </div>
            <span className="contact-card-value">+91 98182 73612</span>
            <span className="contact-card-note">
              Business hours, India Standard Time.
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
