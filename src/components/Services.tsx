import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

const services: ServiceCard[] = [
  {
    icon: '⟳',
    title: 'Digital Transformation',
    description:
      'Re-imagining operating models, technology landscapes, and the everyday rituals that make change stick.',
    items: ['Target operating models', 'Tech & data strategy', 'Change enablement'],
  },
  {
    icon: '✦',
    title: 'AI Innovation & Inclusion',
    description:
      'Practical, responsible AI — designed so the people closest to the work are the ones it serves first.',
    items: ['AI opportunity mapping', 'Responsible adoption', 'Inclusion by design'],
  },
  {
    icon: '⌖',
    title: 'IT Delivery Execution',
    description:
      'Programme rescue, delivery oversight, and the steady hand that turns roadmaps into shipped outcomes.',
    items: ['Programme governance', 'Delivery turnaround', 'Vendor & PMO oversight'],
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading reveal */
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
        }
      );

      /* Cards stagger */
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services-inner">
        {/* Header */}
        <div ref={headRef} className="services-head">
          <span className="section-label">02 · Practice</span>
          <h2 className="services-title">
            Three disciplines.<br />
            <em className="services-title--italic">One quiet operating system.</em>
          </h2>
          <p className="services-desc">
            We work alongside small, senior teams — typically as a trusted external
            partner to CXOs, programme sponsors, and transformation leaders.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="services-grid">
          {services.map((svc) => (
            <div key={svc.title} className="service-card">
              <div className="svc-icon" aria-hidden="true">{svc.icon}</div>
              <h3 className="svc-title">{svc.title}</h3>
              <p className="svc-desc">{svc.description}</p>
              <ul className="svc-list">
                {svc.items.map((item) => (
                  <li key={item} className="svc-list-item">
                    <span className="svc-list-arrow" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
