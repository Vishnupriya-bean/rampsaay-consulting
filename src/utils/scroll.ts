import gsap from 'gsap';

/**
 * Smoothly scrolls to a section by ID with a short GSAP flash-highlight animation
 * on the target section, giving visual feedback that something happened.
 */
export const scrollToSection = (id: string): void => {
  const target = document.getElementById(id);
  if (!target) return;

  // Smooth native scroll
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // GSAP subtle flash on arrival
  gsap.fromTo(
    target,
    { backgroundImage: 'none' },
    {
      delay: 0.55,
      duration: 0.6,
      ease: 'power2.inOut',
      onStart: () => {
        gsap.fromTo(
          target,
          { outline: '0px solid transparent' },
          {
            outline: '0px solid transparent',
            duration: 0.01,
          }
        );
      },
    }
  );
};
