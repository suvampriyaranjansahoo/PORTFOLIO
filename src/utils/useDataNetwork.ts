import { useEffect, useRef, RefObject } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulsePhase: number;
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

/**
 * useDataNetwork
 *
 * Signature interaction: a sparse, slow-drifting network of nodes on a
 * <canvas>, connected by lines when close enough, with light pulses that
 * periodically travel along connections. Overall activity (pulse frequency,
 * glow intensity) rises and falls with scroll velocity, so the network
 * feels like it's tracking the page with the reader rather than looping
 * on a fixed timer.
 *
 * - Renders on a <canvas> painted behind all content (see GlobalBackground).
 * - Reads theme (light/dark) from the `dark` class on <html> via
 *   MutationObserver, so colors stay in sync with the existing theme toggle
 *   without needing any prop threading.
 * - Pauses the animation loop entirely when the tab is hidden
 *   (visibilitychange) or under prefers-reduced-motion (draws one static
 *   frame and stops).
 * - Self-contained: removing this file and its one call site in
 *   GlobalBackground.tsx fully reverts the background to fully static,
 *   zero impact on any other component.
 */
export function useDataNetwork(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const scrollActivityRef = useRef(0.15); // baseline ambient activity, 0-1
  const lastScrollYRef = useRef(0);
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const NODE_COUNT = 26;
    const CONNECT_DISTANCE = 190;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedNodes = () => {
      const nodes: Node[] = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = nodes;
    };

    resize();
    seedNodes();

    const themeObserver = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    isDarkRef.current = document.documentElement.classList.contains('dark');

    const handleResize = () => {
      resize();
      seedNodes();
    };
    window.addEventListener('resize', handleResize);

    // Scroll velocity feeds ambient network activity: scrolling raises it,
    // it decays back toward a low baseline when idle.
    lastScrollYRef.current = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollYRef.current);
      lastScrollYRef.current = y;
      scrollActivityRef.current = Math.min(1, scrollActivityRef.current + delta * 0.004);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let hidden = document.hidden;
    const handleVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const colors = () => (isDarkRef.current
      ? { node: '99,102,241', pulse: '217,139,24', line: '99,102,241' }
      : { node: '79,70,229', pulse: '184,116,12', line: '79,70,229' });

    const maybeSpawnPulse = () => {
      const activity = scrollActivityRef.current;
      // Higher activity -> higher chance per frame of a new pulse.
      if (Math.random() < 0.004 + activity * 0.05 && nodesRef.current.length > 1) {
        const from = Math.floor(Math.random() * nodesRef.current.length);
        let to = Math.floor(Math.random() * nodesRef.current.length);
        if (to === from) to = (to + 1) % nodesRef.current.length;
        pulsesRef.current.push({ fromIndex: from, toIndex: to, progress: 0, speed: 0.012 + Math.random() * 0.012 });
      }
    };

    const draw = () => {
      const { node, pulse, line } = colors();
      const activity = scrollActivityRef.current;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      // Drift nodes gently, wrap at edges.
      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
          n.pulsePhase += 0.015;
        }
      }

      // Connections between nearby nodes.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const baseOpacity = (1 - dist / CONNECT_DISTANCE) * (0.10 + activity * 0.12);
            ctx.strokeStyle = `rgba(${line},${baseOpacity.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes, gently pulsing in size/opacity.
      for (const n of nodes) {
        const pulseFactor = prefersReducedMotion ? 0.5 : (Math.sin(n.pulsePhase) + 1) / 2;
        const radius = 1.6 + pulseFactor * 1.2;
        const opacity = 0.35 + pulseFactor * 0.25 + activity * 0.15;
        ctx.fillStyle = `rgba(${node},${Math.min(opacity, 0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Traveling pulses along connections.
      if (!prefersReducedMotion) {
        maybeSpawnPulse();
        pulsesRef.current = pulsesRef.current.filter((p) => p.progress < 1);
        for (const p of pulsesRef.current) {
          p.progress += p.speed;
          const from = nodes[p.fromIndex];
          const to = nodes[p.toIndex];
          if (!from || !to) continue;
          const x = from.x + (to.x - from.x) * p.progress;
          const y = from.y + (to.y - from.y) * p.progress;
          const fade = Math.sin(p.progress * Math.PI); // fades in and out along the path
          ctx.fillStyle = `rgba(${pulse},${(fade * 0.9).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Decay ambient activity back toward a low baseline.
      scrollActivityRef.current = Math.max(0.15, scrollActivityRef.current * 0.985);
    };

    const loop = () => {
      if (!hidden) draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      draw(); // single static frame, no loop
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
    };
  }, [canvasRef]);
}
