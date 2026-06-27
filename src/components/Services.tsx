import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHomepage } from '../context/HomepageContext';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const { data } = useHomepage();

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

  const getServiceList = () => {
    if (!data) return [];
    
    return [
      {
        icon: data.service1_icon,
        title: data.service1_title,
        description: data.service1_description,
        items: [data.service1_feature1, data.service1_feature2, data.service1_feature3].filter(Boolean)
      },
      {
        icon: data.service2_icon,
        title: data.service2_title,
        description: data.service2_description,
        items: [data.service2_feature1, data.service2_feature2, data.service2_feature3].filter(Boolean)
      },
      {
        icon: data.service3_icon,
        title: data.service3_title,
        description: data.service3_description,
        items: [data.service3_feature1, data.service3_feature2, data.service3_feature3].filter(Boolean)
      }
    ];
  };

  const services = getServiceList();

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services-inner">
        {/* Header */}
        <div ref={headRef} className="services-head">
          <span className="section-label">
            {data?.section2_number || '02'} · {data?.section2_label || 'Practice'}
          </span>
          <h2 className="services-title">
            {data?.practice_heading || 'Three disciplines.'}<br />
            <em className="services-title--italic">{data?.practice_subheading || 'One quiet operating system.'}</em>
          </h2>
          <p className="services-desc">
            {data?.practice_description || 'We work alongside small, senior teams — typically as a trusted external partner to CXOs, programme sponsors, and transformation leaders.'}
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
