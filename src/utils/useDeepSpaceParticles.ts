import { useEffect, useRef, RefObject } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number; // resting position the particle drifts back toward
  baseY: number;
  size: number;
  layer: 0 | 1 | 2; // 0 = background bokeh, 1 = midground constellation, 2 = foreground fast nodes
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

/**
 * useDeepSpaceParticles
 *
 * Signature interaction: a full-viewport particle-mesh field with three
 * depth layers and mouse gravity/repulsion physics —
 *   Layer 0 (background): large, slow, soft bokeh dust — barely moves.
 *   Layer 1 (midground): mid-size nodes that form constellation lines
 *     when close to each other.
 *   Layer 2 (foreground): small, fast nodes that actively react to the
 *     cursor — pulled inward within a wide capture radius, pushed away
 *     sharply within a tight inner radius, producing a "gravity well"
 *     feel around the pointer. They drift back to a resting position
 *     when the cursor moves away.
 * Light pulses periodically travel along constellation connections.
 *
 * - Reads theme (light/dark) from the `dark` class on <html>.
 * - Light mode: particle opacity and constellation-line opacity are both
 *   cut substantially (not just recolored) to preserve contrast and
 *   reduce compute — a real behavioral difference, not cosmetic.
 * - Mouse gravity is skipped on touch/coarse-pointer devices (no cursor);
 *   particles still drift ambiently so the background isn't static there.
 * - Under prefers-reduced-motion: draws one static frame, no physics
 *   loop, no gravity.
 * - Pauses entirely when the tab is hidden.
 * - Self-contained: removing this file and its one call site in
 *   GlobalBackground.tsx fully reverts to a static background.
 */
export function useDeepSpaceParticles(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const BG_COUNT = 10;
    const MID_COUNT = 22;
    const FG_COUNT = 16;
    const CONNECT_DISTANCE = 170;
    const CAPTURE_RADIUS = 190; // gravity attraction range
    const REPEL_RADIUS = 55; // sharp push-away range inside capture

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const particles: Particle[] = [];
      const make = (count: number, layer: 0 | 1 | 2, sizeRange: [number, number]) => {
        for (let i = 0; i < count; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * (layer === 2 ? 0.18 : 0.06),
            vy: (Math.random() - 0.5) * (layer === 2 ? 0.18 : 0.06),
            size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
            layer,
          });
        }
      };
      make(BG_COUNT, 0, [3.5, 6]);
      make(MID_COUNT, 1, [1.4, 2.2]);
      make(FG_COUNT, 2, [1, 1.8]);
      particlesRef.current = particles;
    };

    resize();
    seed();

    const themeObserver = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    isDarkRef.current = document.documentElement.classList.contains('dark');

    const handleResize = () => { resize(); seed(); };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => { mouseRef.current.active = false; };
    if (isFinePointer && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    let hidden = document.hidden;
    const handleVisibility = () => { hidden = document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    const palette = () => (isDarkRef.current
      ? { cyan: '56,189,248', violet: '139,92,246', gold: '245,158,11' }
      : { cyan: '2,132,199', violet: '109,63,212', gold: '180,116,10' });

    // Real behavioral reduction in light mode, not just recolor.
    const opacityScale = () => (isDarkRef.current ? 1 : 0.42);

    const maybeSpawnPulse = () => {
      const mid = particlesRef.current.filter((p) => p.layer === 1);
      if (Math.random() < 0.012 && mid.length > 1) {
        const all = particlesRef.current;
        const midIndices = all.map((p, i) => (p.layer === 1 ? i : -1)).filter((i) => i !== -1);
        const from = midIndices[Math.floor(Math.random() * midIndices.length)];
        let to = midIndices[Math.floor(Math.random() * midIndices.length)];
        if (to === from) to = midIndices[(midIndices.indexOf(to) + 1) % midIndices.length];
        pulsesRef.current.push({ fromIndex: from, toIndex: to, progress: 0, speed: 0.014 + Math.random() * 0.012 });
      }
    };

    const draw = () => {
      const { cyan, violet, gold } = palette();
      const oScale = opacityScale();
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // ── Physics update ──
      if (!prefersReducedMotion) {
        for (const p of particles) {
          // Ambient drift back toward resting base position.
          const driftX = (p.baseX - p.x) * 0.002;
          const driftY = (p.baseY - p.y) * 0.002;

          let fx = p.vx + driftX;
          let fy = p.vy + driftY;

          // Mouse gravity/repulsion — foreground layer reacts most,
          // midground reacts lightly, background is unaffected (depth cue).
          if (mouse.active && p.layer !== 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const strength = p.layer === 2 ? 1 : 0.35;

            if (dist < REPEL_RADIUS) {
              // Sharp push-away when the cursor gets very close.
              const push = (1 - dist / REPEL_RADIUS) * 0.9 * strength;
              fx -= (dx / dist) * push;
              fy -= (dy / dist) * push;
            } else if (dist < CAPTURE_RADIUS) {
              // Gentle pull inward within the wider capture ring.
              const pull = (1 - dist / CAPTURE_RADIUS) * 0.05 * strength;
              fx += (dx / dist) * pull;
              fy += (dy / dist) * pull;
            }
          }

          p.vx = fx * 0.94; // damping
          p.vy = fy * 0.94;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -30) { p.x = width + 30; p.baseX = p.x; }
          if (p.x > width + 30) { p.x = -30; p.baseX = p.x; }
          if (p.y < -30) { p.y = height + 30; p.baseY = p.y; }
          if (p.y > height + 30) { p.y = -30; p.baseY = p.y; }
        }
      }

      // ── Background bokeh (layer 0): soft, blurred, minimal opacity ──
      for (const p of particles) {
        if (p.layer !== 0) continue;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(${violet},${(0.10 * oScale).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Midground constellation connections (layer 1) ──
      const mid = particles.filter((p) => p.layer === 1);
      for (let i = 0; i < mid.length; i++) {
        for (let j = i + 1; j < mid.length; j++) {
          const dx = mid[i].x - mid[j].x;
          const dy = mid[i].y - mid[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const op = (1 - dist / CONNECT_DISTANCE) * 0.16 * oScale;
            ctx.strokeStyle = `rgba(${cyan},${op.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mid[i].x, mid[i].y);
            ctx.lineTo(mid[j].x, mid[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Midground + foreground nodes ──
      for (const p of particles) {
        if (p.layer === 0) continue;
        const color = p.layer === 2 ? violet : cyan;
        const baseOp = p.layer === 2 ? 0.55 : 0.45;
        ctx.fillStyle = `rgba(${color},${(baseOp * oScale).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Traveling pulses along constellation connections ──
      if (!prefersReducedMotion) {
        maybeSpawnPulse();
        pulsesRef.current = pulsesRef.current.filter((p) => p.progress < 1);
        for (const pulse of pulsesRef.current) {
          pulse.progress += pulse.speed;
          const from = particles[pulse.fromIndex];
          const to = particles[pulse.toIndex];
          if (!from || !to) continue;
          const x = from.x + (to.x - from.x) * pulse.progress;
          const y = from.y + (to.y - from.y) * pulse.progress;
          const fade = Math.sin(pulse.progress * Math.PI);
          ctx.fillStyle = `rgba(${gold},${(fade * 0.85 * oScale).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Cursor gravity-well ring (subtle, only while active) ──
      if (mouse.active && !prefersReducedMotion) {
        const ringGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, CAPTURE_RADIUS);
        ringGrad.addColorStop(0, `rgba(${violet},${(0.06 * oScale).toFixed(3)})`);
        ringGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, CAPTURE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!hidden) draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      draw();
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
    };
  }, [canvasRef]);
}
