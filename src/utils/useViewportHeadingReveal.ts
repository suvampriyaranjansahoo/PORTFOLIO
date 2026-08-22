import { useEffect } from 'react';

/**
 * useViewportHeadingReveal
 *
 * Implements a micro-interaction where heading text elements perform a
 * 200ms 'ease-out' fade-in combined with a 5px upward slide when they
 * enter the viewport, enhancing the premium feel.
 *
 * - Targets h1, h2, h3 and .section-heading elements across all sections.
 * - Uses IntersectionObserver with a gentle margin to trigger smoothly upon scroll.
 * - Instantly reveals without animation if prefers-reduced-motion is active
 *   or motion is toggled off.
 */
export function useViewportHeadingReveal(motionEnabled: boolean = true) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headings = document.querySelectorAll<HTMLElement>(
      'h1, h2, h3, .section-heading, [data-reveal-heading]'
    );

    if (prefersReducedMotion || !motionEnabled) {
      headings.forEach((heading) => {
        heading.classList.remove('heading-reveal-init');
        heading.classList.add('heading-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('heading-revealed');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    headings.forEach((heading) => {
      // If element is already in viewport or above the fold on mount, reveal quickly
      const rect = heading.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        heading.classList.add('heading-reveal-init');
        // Small tick to ensure smooth initial transition
        requestAnimationFrame(() => {
          heading.classList.add('heading-revealed');
        });
      } else {
        heading.classList.add('heading-reveal-init');
        observer.observe(heading);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [motionEnabled]);
}
