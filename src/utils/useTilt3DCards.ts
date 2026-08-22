import { useEffect } from 'react';

/**
 * useTilt3DCards — Spatial Intelligence Panels Engine
 *
 * Implements cursor-responsive 3D perspective tilt, dynamic light angle
 * calculation, non-uniform structural frame refraction, and layered optical
 * depth tracking across all .card-level-1, .card-level-2, .card-level-3, and
 * .spatial-panel elements.
 *
 * Mathematical and visual properties updated dynamically via CSS custom properties:
 *   --tilt-x, --tilt-y           (perspective rotation, capped at 3.5°)
 *   --spot-x, --spot-y           (specular light center position, 0-100%)
 *   --light-angle                (directional angle from card center to pointer)
 *   --spot-opacity               (glass reflection intensity)
 *   --ambient-opacity            (contextual back-glow expansion)
 *   --border-glow-opacity        (non-uniform edge refraction illumination)
 *
 * Zero React re-renders: updates CSS variables directly via requestAnimationFrame.
 * Full graceful degradation for prefers-reduced-motion and touch devices.
 */
export function useTilt3DCards() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const MAX_TILT_DEG = 3.6; // Strictly capped at 3.6 degrees for refined analytical instrument aesthetic
    let activeCard: HTMLElement | null = null;
    let frame: number | null = null;
    let pendingEvent: MouseEvent | null = null;

    const resetCardStyles = (card: HTMLElement) => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--spot-opacity', '0.12');
      card.style.setProperty('--ambient-opacity', '0.45');
      card.style.setProperty('--border-glow-opacity', '0.45');
      card.style.setProperty('--spot-x', '50%');
      card.style.setProperty('--spot-y', '50%');
    };

    const applyTilt = () => {
      frame = null;
      if (!pendingEvent) return;
      const e = pendingEvent;

      // Check if motion is disabled via HTML attribute
      if (document.documentElement.getAttribute('data-reduce-motion') === 'true') {
        if (activeCard) {
          resetCardStyles(activeCard);
          activeCard = null;
        }
        return;
      }

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        '.card-level-1, .card-level-2, .card-level-3, .spatial-panel, .spatial-card'
      );

      // If moved off previous card, smoothly reset it
      if (activeCard && activeCard !== target) {
        resetCardStyles(activeCard);
        activeCard = null;
      }

      if (!target) return;
      activeCard = target;

      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Normalized coordinates from card center (-1 to +1)
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

      const rotateY = (dx * MAX_TILT_DEG).toFixed(2);
      const rotateX = (-dy * MAX_TILT_DEG).toFixed(2);
      
      // Percentage coordinates within card bounding box (0% to 100%)
      const spotX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)).toFixed(1);
      const spotY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)).toFixed(1);

      // Directional angle of the light vector relative to card center
      const angleRad = Math.atan2(e.clientY - cy, e.clientX - cx);
      const angleDeg = ((angleRad * (180 / Math.PI)) + 360 + 90) % 360;

      target.style.setProperty('--tilt-x', `${rotateX}deg`);
      target.style.setProperty('--tilt-y', `${rotateY}deg`);
      target.style.setProperty('--spot-x', `${spotX}%`);
      target.style.setProperty('--spot-y', `${spotY}%`);
      target.style.setProperty('--light-angle', `${angleDeg.toFixed(1)}deg`);
      target.style.setProperty('--spot-opacity', '1');
      target.style.setProperty('--ambient-opacity', '0.85');
      target.style.setProperty('--border-glow-opacity', '0.95');
    };

    const handleMove = (e: MouseEvent) => {
      pendingEvent = e;
      if (frame === null) frame = requestAnimationFrame(applyTilt);
    };

    const handleLeaveWindow = () => {
      if (activeCard) {
        resetCardStyles(activeCard);
        activeCard = null;
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
      if (frame !== null) cancelAnimationFrame(frame);
      if (activeCard) {
        activeCard.style.removeProperty('--tilt-x');
        activeCard.style.removeProperty('--tilt-y');
        activeCard.style.removeProperty('--spot-x');
        activeCard.style.removeProperty('--spot-y');
        activeCard.style.removeProperty('--light-angle');
        activeCard.style.removeProperty('--spot-opacity');
        activeCard.style.removeProperty('--ambient-opacity');
        activeCard.style.removeProperty('--border-glow-opacity');
      }
    };
  }, []);
}

