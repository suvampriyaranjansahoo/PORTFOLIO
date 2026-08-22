import { useEffect, useRef, RefObject } from 'react';

/**
 * useSignatureSpotlight
 *
 * The portfolio's signature interaction: a soft light that follows the cursor
 * across the analytical background, gently raising the grid/node opacity nearby.
 *
 * - Writes only two CSS custom properties (--spotlight-x, --spotlight-y) onto
 *   the background root, consumed purely in CSS. No React re-renders on move.
 * - Disabled entirely on touch/coarse-pointer devices (no cursor to track).
 * - Disabled entirely under prefers-reduced-motion.
 * - Throttled via requestAnimationFrame so it never floods the main thread.
 */
export function useSignatureSpotlight(targetRef: RefObject<HTMLElement | null>) {
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        const xPct = (e.clientX / window.innerWidth) * 100;
        const yPct = (e.clientY / window.innerHeight) * 100;
        target.style.setProperty('--spotlight-x', `${xPct.toFixed(2)}%`);
        target.style.setProperty('--spotlight-y', `${yPct.toFixed(2)}%`);
        target.style.setProperty('--spotlight-opacity', '1');
        frame.current = null;
      });
    };

    const handleLeave = () => {
      target.style.setProperty('--spotlight-opacity', '0');
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [targetRef]);
}
