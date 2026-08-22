import { useEffect } from 'react';

/**
 * useTilt3DCards
 *
 * Adds physics-based 3D tilt + specular light tracking to every element
 * already using the `.card-level-1` or `.card-level-2` classes, WITHOUT
 * needing to edit any of those component files individually.
 *
 * How: a single `mousemove` listener on `window` finds the card under the
 * cursor via `elementFromPoint` / `closest()`, computes the cursor's
 * normalized offset from that card's center, and writes the result as CSS
 * custom properties directly on that one DOM element:
 *   --tilt-x, --tilt-y   (rotation, consumed by .card-level-1/2 in CSS)
 *   --spot-x, --spot-y   (specular highlight position, 0-100%)
 * All the actual visual work (transform, gradient) lives in CSS, which
 * means this hook only ever touches style properties, never markup,
 * content, or React state — so no existing component's props, handlers,
 * or click targets are affected. Interactive elements inside a tilted
 * card stay exactly where the browser visually renders them (CSS
 * transforms move the whole hit-testable box together), so clicks remain
 * accurate.
 *
 * - Skipped entirely on touch/coarse-pointer devices (no cursor to track)
 *   and under prefers-reduced-motion (tilt never engages).
 * - On mouseleave from a card, that card's tilt smoothly resets to 0 via
 *   the CSS transition already defined on the class, not JS.
 * - Call this once, at the app root (e.g. in App.tsx) — it self-installs
 *   and cleans up on unmount.
 */
export function useTilt3DCards() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const MAX_TILT_DEG = 3.5;
    let activeCard: HTMLElement | null = null;
    let frame: number | null = null;
    let pendingEvent: MouseEvent | null = null;

    const applyTilt = () => {
      frame = null;
      if (!pendingEvent) return;
      const e = pendingEvent;

      const target = (e.target as HTMLElement)?.closest<HTMLElement>('.card-level-1, .card-level-2, .card-level-3');

      // If we've moved off the previously active card, smoothly reset it.
      if (activeCard && activeCard !== target) {
        activeCard.style.setProperty('--tilt-x', '0deg');
        activeCard.style.setProperty('--tilt-y', '0deg');
        activeCard.style.setProperty('--spot-opacity', '0.12');
        activeCard = null;
      }

      if (!target) return;
      activeCard = target;

      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2); // -1 to 1
      const dy = (e.clientY - cy) / (rect.height / 2); // -1 to 1

      const rotateY = (dx * MAX_TILT_DEG).toFixed(2);
      const rotateX = (-dy * MAX_TILT_DEG).toFixed(2);
      const spotX = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
      const spotY = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);

      target.style.setProperty('--tilt-x', `${rotateX}deg`);
      target.style.setProperty('--tilt-y', `${rotateY}deg`);
      target.style.setProperty('--spot-x', `${spotX}%`);
      target.style.setProperty('--spot-y', `${spotY}%`);
      target.style.setProperty('--spot-opacity', '1');
    };

    const handleMove = (e: MouseEvent) => {
      pendingEvent = e;
      if (frame === null) frame = requestAnimationFrame(applyTilt);
    };

    const handleLeaveWindow = () => {
      if (activeCard) {
        activeCard.style.setProperty('--tilt-x', '0deg');
        activeCard.style.setProperty('--tilt-y', '0deg');
        activeCard.style.setProperty('--spot-opacity', '0.16');
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
        activeCard.style.removeProperty('--spot-opacity');
      }
    };
  }, []);
}
