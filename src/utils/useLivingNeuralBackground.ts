import { useEffect, useRef, RefObject } from 'react';

export interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  layer: 0 | 1 | 2; // 0 = distant (z: 0.25), 1 = mid (z: 0.6), 2 = foreground (z: 1.0)
  depth: number;
  phase: number;
  phaseSpeed: number;
  orbitRadius: number;
  pulseGlow: number;
  pulseSpeed: number;
}

export interface DataSignal {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  type: 'indigo' | 'cyan' | 'amber';
  size: number;
}

export interface WakeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  colorType: 'indigo' | 'cyan' | 'amber';
  opacity: number;
}

export interface MouseCoordinates {
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  active: boolean;
}

export interface SectionAtmosphere {
  name: string;
  activityLevel: number; // 0.5 (calm) to 1.3 (high)
  primaryColor: 'indigo' | 'cyan' | 'amber';
}

/**
 * useLivingNeuralBackground
 * 
 * High-performance, multi-layered 3D living neural universe engine rendered
 * continuously on a hardware-accelerated Canvas with global mouse tracking
 * and real-time multi-depth parallax coordination.
 * 
 * Features:
 * 1. 3 Depth Planes (Distant, Midground, Foreground) with independent parallax offsets.
 * 2. Organic drift using sinusoidal phase oscillators & soft physics.
 * 3. Dynamically evolving neural mesh with smooth distance-based falloff.
 * 4. Flowing luminous data packets with trailing particle decays.
 * 5. Global pointer tracking with spring-damped interpolation (1px to 14px multi-plane).
 * 6. Coordinates dispatched to CSS custom properties on container for SVG & ambient layer parallax.
 * 7. Section-aware scroll atmosphere modulation.
 * 8. Full light/dark mode chromatic translation.
 * 9. Strict accessibility with prefers-reduced-motion static rendering.
 */
export function useLivingNeuralBackground(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  containerRef?: RefObject<HTMLElement | null>,
  mouseCoordsRef?: RefObject<MouseCoordinates>,
  motionEnabled: boolean = true,
  nodeDensityMultiplier: number = 1.0
) {
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<NeuralNode[]>([]);
  const signalsRef = useRef<DataSignal[]>([]);
  const wakeParticlesRef = useRef<WakeParticle[]>([]);
  const lastWakeSpawnRef = useRef<{ x: number; y: number; time: number }>({ x: -9999, y: -9999, time: 0 });
  const totalPacketsProcessedRef = useRef(142);
  const lastThroughputEmitRef = useRef(0);
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    screenX: -9999,
    screenY: -9999,
    active: false,
  });
  const scrollRef = useRef({ progress: 0, targetProgress: 0, activeSection: 'hero' });
  const sectionHoverRef = useRef({ isOverSection: false, targetBoost: 1.0, currentBoost: 1.0 });
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Node configuration according to viewport density across the entire screen
    const seedNodes = () => {
      const isMobile = width < 640;
      const isTablet = width < 1024;
      const density = (isMobile ? 0.6 : isTablet ? 0.85 : 1.0) * nodeDensityMultiplier;

      const DISTANT_COUNT = Math.max(6, Math.round(26 * density));
      const MID_COUNT = Math.max(10, Math.round(42 * density));
      const FOREGROUND_COUNT = Math.max(6, Math.round(24 * density));

      const nodes: NeuralNode[] = [];

      // Helper to generate coordinates evenly distributed across a 2D spatial grid with jitter
      const generateGridPoint = (index: number, total: number) => {
        const cols = Math.max(3, Math.round(Math.sqrt(total * (width / Math.max(height, 1)))));
        const rows = Math.max(3, Math.ceil(total / cols));
        const col = index % cols;
        const row = Math.floor(index / cols);
        const cellW = width / cols;
        const cellH = height / rows;
        const x = (col + 0.12 + Math.random() * 0.76) * cellW;
        const y = (row + 0.12 + Math.random() * 0.76) * cellH;
        return { x: Math.max(10, Math.min(width - 10, x)), y: Math.max(10, Math.min(height - 10, y)) };
      };

      // Layer 0: Distant background network (faint, small, slow parallax 1-3px)
      for (let i = 0; i < DISTANT_COUNT; i++) {
        const { x, y } = generateGridPoint(i, DISTANT_COUNT);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size: 1.2 + Math.random() * 1.0,
          layer: 0,
          depth: 0.25,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.003 + Math.random() * 0.004,
          orbitRadius: 15 + Math.random() * 25,
          pulseGlow: 0.3 + Math.random() * 0.4,
          pulseSpeed: 0.01 + Math.random() * 0.015,
        });
      }

      // Layer 1: Midground neural network (active connections, data signal paths, parallax 3-7px)
      for (let i = 0; i < MID_COUNT; i++) {
        const { x, y } = generateGridPoint(i, MID_COUNT);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          size: 2.0 + Math.random() * 1.4,
          layer: 1,
          depth: 0.6,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.006,
          orbitRadius: 20 + Math.random() * 35,
          pulseGlow: 0.5 + Math.random() * 0.5,
          pulseSpeed: 0.012 + Math.random() * 0.018,
        });
      }

      // Layer 2: Foreground selected flagship nodes (luminous, responsive to cursor, parallax 6-14px)
      for (let i = 0; i < FOREGROUND_COUNT; i++) {
        const { x, y } = generateGridPoint(i, FOREGROUND_COUNT);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.20,
          vy: (Math.random() - 0.5) * 0.20,
          size: 3.0 + Math.random() * 1.8,
          layer: 2,
          depth: 1.0,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.007 + Math.random() * 0.008,
          orbitRadius: 28 + Math.random() * 45,
          pulseGlow: 0.7 + Math.random() * 0.5,
          pulseSpeed: 0.016 + Math.random() * 0.022,
        });
      }

      nodesRef.current = nodes;
      signalsRef.current = [];
    };

    resize();
    seedNodes();

    // Theme tracking
    const updateTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    };
    updateTheme();
    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Scroll & Section Observer for Section-Aware Atmosphere
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      scrollRef.current.targetProgress = progress;

      // Detect current active section based on scroll position
      const scrollY = window.scrollY;
      const heroEl = document.getElementById('top');
      const projectsEl = document.getElementById('projects');
      const experienceEl = document.getElementById('experience');
      const demosEl = document.getElementById('demos');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollY >= contactEl.offsetTop - 300) {
        scrollRef.current.activeSection = 'contact';
      } else if (demosEl && scrollY >= demosEl.offsetTop - 300) {
        scrollRef.current.activeSection = 'demos';
      } else if (experienceEl && scrollY >= experienceEl.offsetTop - 300) {
        scrollRef.current.activeSection = 'experience';
      } else if (projectsEl && scrollY >= projectsEl.offsetTop - 300) {
        scrollRef.current.activeSection = 'projects';
      } else {
        scrollRef.current.activeSection = 'hero';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Data Wake spawner (subtle particles following cursor motion)
    const spawnWake = (clientX: number, clientY: number) => {
      if (!motionEnabled || prefersReducedMotion) return;
      const now = performance.now();
      const last = lastWakeSpawnRef.current;
      const dx = clientX - last.x;
      const dy = clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn when cursor moves by at least 10px and at reasonable cadence
      if (dist >= 10 && (now - last.time > 24)) {
        const types: Array<'indigo' | 'cyan' | 'amber'> = ['indigo', 'cyan', 'indigo', 'amber'];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        const angle = Math.atan2(dy, dx);
        const perp = angle + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2);
        const drift = 0.12 + Math.random() * 0.28;
        const speed = Math.min(dist * 0.025, 0.8);

        wakeParticlesRef.current.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(perp) * drift - Math.cos(angle) * (0.10 * speed),
          vy: Math.sin(perp) * drift - Math.sin(angle) * (0.10 * speed),
          size: 1.1 + Math.random() * 1.3,
          maxLife: 32 + Math.floor(Math.random() * 16), // ~0.55s to 0.8s lifespan
          life: 32 + Math.floor(Math.random() * 16),
          colorType: chosenType,
          opacity: 0.65 + Math.random() * 0.25,
        });

        // Cap buffer to keep performance ultra-lightweight
        if (wakeParticlesRef.current.length > 28) {
          wakeParticlesRef.current.shift();
        }

        lastWakeSpawnRef.current = { x: clientX, y: clientY, time: now };
      }
    };

    // Global Pointer events for smooth multi-depth parallax
    const handleGlobalPointerMove = (e: MouseEvent | PointerEvent) => {
      const centerX = width / 2;
      const centerY = height / 2;
      mouseRef.current.targetX = (e.clientX - centerX);
      mouseRef.current.targetY = (e.clientY - centerY);
      mouseRef.current.screenX = e.clientX;
      mouseRef.current.screenY = e.clientY;
      mouseRef.current.active = true;

      // Detect if cursor is positioned over a specific section container or card
      try {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const isOver = !!target?.closest('section, .section-ambient-container, .card-level-1, .card-level-2, .card-level-3, [data-section]');
        sectionHoverRef.current.isOverSection = isOver;
        sectionHoverRef.current.targetBoost = isOver ? 1.32 : 1.0;
      } catch {
        // Fallback for isolated pointer calls
      }

      spawnWake(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.active = false;
      sectionHoverRef.current.isOverSection = false;
      sectionHoverRef.current.targetBoost = 1.0;
    };

    if (isFinePointer && !prefersReducedMotion) {
      window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true, capture: true });
      window.addEventListener('mousemove', handleGlobalPointerMove, { passive: true, capture: true });
      document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    }

    const handleWindowResize = () => {
      resize();
      seedNodes();
    };
    window.addEventListener('resize', handleWindowResize);

    let isDocumentHidden = document.hidden;
    const handleVisibility = () => {
      isDocumentHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Color palettes
    const getPalette = () => {
      if (isDarkRef.current) {
        return {
          indigo: '129, 140, 248',
          cyan: '56, 189, 248',
          amber: '245, 158, 11',
          violet: '167, 139, 250',
          baseText: '242, 244, 248',
          lineAlpha: 0.24,
          nodeAlpha: 0.70,
        };
      } else {
        return {
          indigo: '79, 70, 229',
          cyan: '8, 145, 178',
          amber: '217, 119, 6',
          violet: '109, 40, 217',
          baseText: '16, 20, 29',
          lineAlpha: 0.14,
          nodeAlpha: 0.50,
        };
      }
    };

    // Data signal spawner along valid connections
    const maybeSpawnSignal = (validConnections: Array<{ from: number; to: number; layer: number }>) => {
      if (validConnections.length === 0) return;
      if (signalsRef.current.length >= 7) return;

      const spawnChance = isDarkRef.current ? 0.04 : 0.03;
      if (Math.random() < spawnChance) {
        const conn = validConnections[Math.floor(Math.random() * validConnections.length)];
        const types: Array<'indigo' | 'cyan' | 'amber'> = ['indigo', 'cyan', 'amber'];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        signalsRef.current.push({
          fromIndex: conn.from,
          toIndex: conn.to,
          progress: 0,
          speed: 0.012 + Math.random() * 0.016,
          type: chosenType,
          size: conn.layer === 2 ? 3.2 : 2.4,
        });
      }
    };

    // Main render loop
    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const palette = getPalette();
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const scroll = scrollRef.current;

      // Synchronize target coordinates from mouseCoordsRef if provided
      if (mouseCoordsRef?.current) {
        mouse.targetX = mouseCoordsRef.current.offsetX;
        mouse.targetY = mouseCoordsRef.current.offsetY;
        mouse.screenX = mouseCoordsRef.current.clientX;
        mouse.screenY = mouseCoordsRef.current.clientY;
        mouse.active = mouseCoordsRef.current.active;
      }

      // Parallax smooth interpolation (eased spring response)
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.055;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.055;
      scroll.progress += (scroll.targetProgress - scroll.progress) * 0.08;

      // Section hover smooth interpolation for localized feedback
      const secHover = sectionHoverRef.current;
      secHover.currentBoost += (secHover.targetBoost - secHover.currentBoost) * 0.08;
      const sectionBoost = secHover.currentBoost;

      // Localized feedback helper: dynamically increases connectivity intensity near cursor and active section containers
      const getLocalBoost = (x: number, y: number) => {
        if (!mouse.active || prefersReducedMotion) {
          return sectionBoost;
        }
        const dx = x - mouse.screenX;
        const dy = y - mouse.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 320) {
          return sectionBoost;
        }
        const proximity = Math.pow(1 - dist / 320, 1.25);
        return sectionBoost * (1.0 + proximity * 0.42);
      };

      // Pass coordinates to container CSS custom properties for SVG & atmospheric layer parallax
      if (containerRef?.current && !prefersReducedMotion) {
        containerRef.current.style.setProperty('--bg-mouse-x', `${mouse.currentX.toFixed(2)}px`);
        containerRef.current.style.setProperty('--bg-mouse-y', `${mouse.currentY.toFixed(2)}px`);
      }

      // Connection threshold distances per layer
      const CONNECT_DISTANCES = [140, 180, 220];
      const validConnections: Array<{ from: number; to: number; layer: number }> = [];

      // ─── 1. PHYSICS & NODE POSITION UPDATES ───
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Gentle organic orbital drift
          node.phase += node.phaseSpeed;
          const targetDriftX = node.baseX + Math.cos(node.phase) * node.orbitRadius;
          const targetDriftY = node.baseY + Math.sin(node.phase * 0.8) * node.orbitRadius;

          node.vx += (targetDriftX - node.x) * 0.0025;
          node.vy += (targetDriftY - node.y) * 0.0025;

          // Parallax depth offset factor per layer
          const parallaxX = (mouse.currentX * 0.009 * (node.layer + 1));
          const parallaxY = (mouse.currentY * 0.009 * (node.layer + 1));

          // Interactive mouse gravity / gentle deflection
          if (mouse.active && node.layer >= 1) {
            const nodeScreenX = node.x + parallaxX;
            const nodeScreenY = node.y + parallaxY;
            const dx = mouse.screenX - nodeScreenX;
            const dy = mouse.screenY - nodeScreenY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            if (dist < 70) {
              // Gentle push away if directly on cursor
              const push = (1 - dist / 70) * 0.75;
              node.vx -= (dx / dist) * push;
              node.vy -= (dy / dist) * push;
            } else if (dist < 200) {
              // Soft gravity attraction
              const pull = (1 - dist / 200) * 0.05 * node.depth;
              node.vx += (dx / dist) * pull;
              node.vy += (dy / dist) * pull;
            }
          }

          // Damping
          node.vx *= 0.93;
          node.vy *= 0.93;
          node.x += node.vx;
          node.y += node.vy;

          // Wrap boundaries smoothly
          const margin = 50;
          if (node.x < -margin) { node.x = width + margin; node.baseX = node.x; }
          if (node.x > width + margin) { node.x = -margin; node.baseX = node.x; }
          if (node.y < -margin) { node.y = height + margin; node.baseY = node.y; }
          if (node.y > height + margin) { node.y = -margin; node.baseY = node.y; }
        }
      }

      // ─── 2. RENDER LAYER 0 (DISTANT BOKEH & DISTANT CONNECTIONS, 1-3px PARALLAX) ───
      const distantNodes = nodes.filter(n => n.layer === 0);
      const parallax0X = mouse.currentX * 0.005;
      const parallax0Y = mouse.currentY * 0.005;

      for (let i = 0; i < distantNodes.length; i++) {
        const n1 = distantNodes[i];
        const x1 = n1.x + parallax0X;
        const y1 = n1.y + parallax0Y;
        const nodeBoost0 = getLocalBoost(x1, y1);

        // Faint distant bokeh halo
        const bokehGrad = ctx.createRadialGradient(x1, y1, 0, x1, y1, n1.size * 5 * (1 + (nodeBoost0 - 1) * 0.25));
        bokehGrad.addColorStop(0, `rgba(${palette.indigo}, ${Math.min(0.4, (isDarkRef.current ? 0.14 : 0.07) * nodeBoost0)})`);
        bokehGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(x1, y1, n1.size * 5 * (1 + (nodeBoost0 - 1) * 0.25), 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.fillStyle = `rgba(${palette.indigo}, ${Math.min(0.8, (isDarkRef.current ? 0.38 : 0.22) * nodeBoost0)})`;
        ctx.beginPath();
        ctx.arc(x1, y1, n1.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < distantNodes.length; j++) {
          const n2 = distantNodes[j];
          const x2 = n2.x + parallax0X;
          const y2 = n2.y + parallax0Y;
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const localBoost = getLocalBoost((x1 + x2) * 0.5, (y1 + y2) * 0.5);
          const maxDist = CONNECT_DISTANCES[0] * (1.0 + (localBoost - 1.0) * 0.3);

          if (dist < maxDist) {
            const alpha = Math.min(0.75, Math.pow(1 - dist / maxDist, 1.6) * palette.lineAlpha * 0.5 * localBoost);
            ctx.strokeStyle = `rgba(${palette.indigo}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.75 + (localBoost - 1.0) * 0.35;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // ─── 3. RENDER LAYER 1 (MIDGROUND CONNECTIONS & NODES, 3-7px PARALLAX) ───
      const midNodes = nodes.filter(n => n.layer === 1);
      const parallax1X = mouse.currentX * 0.014;
      const parallax1Y = mouse.currentY * 0.014;

      for (let i = 0; i < midNodes.length; i++) {
        const n1 = midNodes[i];
        const idx1 = nodes.indexOf(n1);
        const x1 = n1.x + parallax1X;
        const y1 = n1.y + parallax1Y;
        const nodeBoost1 = getLocalBoost(x1, y1);

        for (let j = i + 1; j < midNodes.length; j++) {
          const n2 = midNodes[j];
          const idx2 = nodes.indexOf(n2);
          const x2 = n2.x + parallax1X;
          const y2 = n2.y + parallax1Y;
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const localBoost = getLocalBoost((x1 + x2) * 0.5, (y1 + y2) * 0.5);
          const maxDist = CONNECT_DISTANCES[1] * (1.0 + (localBoost - 1.0) * 0.32);

          if (dist < maxDist) {
            const alpha = Math.min(0.9, Math.pow(1 - dist / maxDist, 1.4) * palette.lineAlpha * 0.9 * localBoost);
            ctx.strokeStyle = `rgba(${palette.cyan}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.0 + (localBoost - 1.0) * 0.45;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            validConnections.push({ from: idx1, to: idx2, layer: 1 });
          }
        }

        // Draw midground node
        const glowRadius = n1.size * 3.0 * (1 + (nodeBoost1 - 1) * 0.35);
        const glow = ctx.createRadialGradient(x1, y1, 0, x1, y1, glowRadius);
        glow.addColorStop(0, `rgba(${palette.cyan}, ${Math.min(0.65, (isDarkRef.current ? 0.32 : 0.16) * nodeBoost1)})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x1, y1, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${palette.cyan}, ${Math.min(1.0, (isDarkRef.current ? 0.80 : 0.60) * nodeBoost1)})`;
        ctx.beginPath();
        ctx.arc(x1, y1, n1.size * (1 + (nodeBoost1 - 1) * 0.15), 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── 4. RENDER LAYER 2 (FOREGROUND FLAGSHIP NODES & ACTIVE MESH, 6-14px PARALLAX) ───
      const fgNodes = nodes.filter(n => n.layer === 2);
      const parallax2X = mouse.currentX * 0.028;
      const parallax2Y = mouse.currentY * 0.028;

      for (let i = 0; i < fgNodes.length; i++) {
        const n1 = fgNodes[i];
        const idx1 = nodes.indexOf(n1);
        const x1 = n1.x + parallax2X;
        const y1 = n1.y + parallax2Y;
        const nodeBoost2 = getLocalBoost(x1, y1);

        for (let j = i + 1; j < fgNodes.length; j++) {
          const n2 = fgNodes[j];
          const idx2 = nodes.indexOf(n2);
          const x2 = n2.x + parallax2X;
          const y2 = n2.y + parallax2Y;
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const localBoost = getLocalBoost((x1 + x2) * 0.5, (y1 + y2) * 0.5);
          const maxDist = CONNECT_DISTANCES[2] * (1.0 + (localBoost - 1.0) * 0.35);

          if (dist < maxDist) {
            const alpha = Math.min(1.0, Math.pow(1 - dist / maxDist, 1.2) * palette.lineAlpha * 1.4 * localBoost);
            
            // Dual-tone gradient stroke between foreground nodes
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, `rgba(${palette.indigo}, ${alpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${palette.amber}, ${(alpha * 0.85).toFixed(3)})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5 + (localBoost - 1.0) * 0.6;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            validConnections.push({ from: idx1, to: idx2, layer: 2 });
          }
        }

        // Luminous flagship node halo & core
        const pulse = 1.0 + Math.sin(n1.phase * 2) * 0.25;
        const fgGlowRadius = n1.size * 4.5 * pulse * (1 + (nodeBoost2 - 1) * 0.35);
        const fgGlow = ctx.createRadialGradient(x1, y1, 0, x1, y1, fgGlowRadius);
        fgGlow.addColorStop(0, `rgba(${palette.indigo}, ${Math.min(0.85, (isDarkRef.current ? 0.48 : 0.25) * nodeBoost2)})`);
        fgGlow.addColorStop(0.5, `rgba(${palette.amber}, ${Math.min(0.5, (isDarkRef.current ? 0.18 : 0.09) * nodeBoost2)})`);
        fgGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = fgGlow;
        ctx.beginPath();
        ctx.arc(x1, y1, fgGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = `rgba(${palette.indigo}, ${Math.min(1.0, (isDarkRef.current ? 0.95 : 0.85) * nodeBoost2)})`;
        ctx.beginPath();
        ctx.arc(x1, y1, n1.size * (1 + (nodeBoost2 - 1) * 0.18), 0, Math.PI * 2);
        ctx.fill();

        // High-contrast pinpoint center
        ctx.fillStyle = isDarkRef.current ? '#ffffff' : '#4338ca';
        ctx.beginPath();
        ctx.arc(x1, y1, Math.max(0.8, n1.size * 0.4 * (1 + (nodeBoost2 - 1) * 0.15)), 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── 4.5. ANALYTICAL ORBITAL GEOMETRY & TELEMETRY (CANVAS-ACCELERATED) ───
      // Seamlessly render orbital trajectories, geodesics, crosshairs, and telemetry on the single canvas
      const geoParallaxX = mouse.currentX * 0.012;
      const geoParallaxY = mouse.currentY * 0.012;
      const geoAlpha = isDarkRef.current ? 0.35 : 0.22;

      ctx.save();
      // Top-Right Orbital Geometries
      const trX = width * 0.92 + geoParallaxX;
      const trY = height * 0.08 + geoParallaxY;
      ctx.strokeStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.55).toFixed(3)})`;
      ctx.lineWidth = 1.0;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(trX, trY, 460, 260, -15 * Math.PI / 180, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.strokeStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.35).toFixed(3)})`;
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      ctx.ellipse(trX, trY, 680, 380, -15 * Math.PI / 180, 0, Math.PI * 2);
      ctx.stroke();

      // Top-right data nodes & dashed connection
      const trNode1X = width * 0.82 + geoParallaxX;
      const trNode1Y = height * 0.14 + geoParallaxY;
      const trNode2X = width * 0.94 + geoParallaxX;
      const trNode2Y = height * 0.22 + geoParallaxY;
      const trNode3X = width * 0.75 + geoParallaxX;
      const trNode3Y = height * 0.06 + geoParallaxY;

      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.45).toFixed(3)})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(trNode1X, trNode1Y);
      ctx.lineTo(trNode2X, trNode2Y);
      ctx.stroke();

      // Nodes on top right
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.8).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(trNode1X, trNode1Y, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.65).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(trNode3X, trNode3Y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.amber}, ${(geoAlpha * 0.85).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(trNode2X, trNode2Y, 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Telemetry labels
      ctx.font = '600 8.5px ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace';
      ctx.fillStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.75).toFixed(3)})`;
      ctx.fillText('DIM_768', width * 0.73 + geoParallaxX, height * 0.10 + geoParallaxY);
      ctx.fillText('LAT: 12ms', width * 0.88 + geoParallaxX, height * 0.27 + geoParallaxY);

      // Mid-Left Orbital Geometry & Crosshairs
      const mlX = width * 0.06 + geoParallaxX;
      const mlY = height * 0.48 + geoParallaxY;
      ctx.strokeStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.50).toFixed(3)})`;
      ctx.lineWidth = 1.0;
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.ellipse(mlX, mlY, 540, 320, 22 * Math.PI / 180, 0, Math.PI * 2);
      ctx.stroke();

      // Mid-left dashed connections
      const mlNode1X = width * 0.08 + geoParallaxX;
      const mlNode1Y = height * 0.42 + geoParallaxY;
      const mlNode2X = width * 0.14 + geoParallaxX;
      const mlNode2Y = height * 0.54 + geoParallaxY;
      const mlNode3X = width * 0.04 + geoParallaxX;
      const mlNode3Y = height * 0.60 + geoParallaxY;

      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.40).toFixed(3)})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(mlNode1X, mlNode1Y);
      ctx.lineTo(mlNode2X, mlNode2Y);
      ctx.lineTo(mlNode3X, mlNode3Y);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.75).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(mlNode1X, mlNode1Y, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.amber}, ${(geoAlpha * 0.8).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(mlNode2X, mlNode2Y, 2.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.6).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(mlNode3X, mlNode3Y, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Mid-left precision crosshairs
      const chX = width * 0.03 + geoParallaxX;
      const chY = height * 0.36 + geoParallaxY;
      ctx.strokeStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.55).toFixed(3)})`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(chX - 6, chY);
      ctx.lineTo(chX + 6, chY);
      ctx.moveTo(chX, chY - 6);
      ctx.lineTo(chX, chY + 6);
      ctx.stroke();

      ctx.fillStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.7).toFixed(3)})`;
      ctx.fillText('NODE_04', width * 0.05 + geoParallaxX, height * 0.39 + geoParallaxY);
      ctx.fillText('SYNC: OK', width * 0.12 + geoParallaxX, height * 0.64 + geoParallaxY);

      // Bottom Peripheral Geometry
      const bpX = width * 0.88 + geoParallaxX;
      const bpY = height * 0.88 + geoParallaxY;
      ctx.strokeStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.45).toFixed(3)})`;
      ctx.lineWidth = 0.85;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.ellipse(bpX, bpY, 500, 280, 0, 0, Math.PI * 2);
      ctx.stroke();

      const bpNode1X = width * 0.80 + geoParallaxX;
      const bpNode1Y = height * 0.84 + geoParallaxY;
      const bpNode2X = width * 0.91 + geoParallaxX;
      const bpNode2Y = height * 0.92 + geoParallaxY;

      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.4).toFixed(3)})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(bpNode1X, bpNode1Y);
      ctx.lineTo(bpNode2X, bpNode2Y);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.7).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(bpNode1X, bpNode1Y, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.amber}, ${(geoAlpha * 0.75).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(bpNode2X, bpNode2Y, 2.8, 0, Math.PI * 2);
      ctx.fill();

      const ch2X = width * 0.97 + geoParallaxX;
      const ch2Y = height * 0.78 + geoParallaxY;
      ctx.strokeStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.5).toFixed(3)})`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(ch2X - 5, ch2Y);
      ctx.lineTo(ch2X + 5, ch2Y);
      ctx.moveTo(ch2X, ch2Y - 5);
      ctx.lineTo(ch2X, ch2Y + 5);
      ctx.stroke();

      ctx.fillStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.7).toFixed(3)})`;
      ctx.fillText('VECTOR / 03', width * 0.84 + geoParallaxX, height * 0.80 + geoParallaxY);

      ctx.restore();

      // ─── 5. FLOWING DATA SIGNALS & LUMINOUS PULSES ───
      if (motionEnabled && !prefersReducedMotion) {
        maybeSpawnSignal(validConnections);

        // Track completed packets
        const remainingSignals: DataSignal[] = [];
        let completedCount = 0;
        for (let i = 0; i < signalsRef.current.length; i++) {
          if (signalsRef.current[i].progress >= 1.0) {
            completedCount++;
          } else {
            remainingSignals.push(signalsRef.current[i]);
          }
        }
        if (completedCount > 0) {
          totalPacketsProcessedRef.current += completedCount;
        }
        signalsRef.current = remainingSignals;

        for (let i = 0; i < signalsRef.current.length; i++) {
          const sig = signalsRef.current[i];
          sig.progress += sig.speed;

          const nFrom = nodes[sig.fromIndex];
          const nTo = nodes[sig.toIndex];
          if (!nFrom || !nTo) continue;

          // Parallax for from/to nodes
          const pFromX = mouse.currentX * (0.009 * (nFrom.layer + 1));
          const pFromY = mouse.currentY * (0.009 * (nFrom.layer + 1));
          const pToX = mouse.currentX * (0.009 * (nTo.layer + 1));
          const pToY = mouse.currentY * (0.009 * (nTo.layer + 1));

          const startX = nFrom.x + pFromX;
          const startY = nFrom.y + pFromY;
          const endX = nTo.x + pToX;
          const endY = nTo.y + pToY;

          // Position of packet
          const curX = startX + (endX - startX) * sig.progress;
          const curY = startY + (endY - startY) * sig.progress;

          // Natural sine fade (0 -> 1 -> 0)
          const fade = Math.sin(sig.progress * Math.PI);
          const color = sig.type === 'amber' ? palette.amber : sig.type === 'cyan' ? palette.cyan : palette.indigo;

          // 1. Trail particle
          const trailProgress = Math.max(0, sig.progress - 0.08);
          const trailX = startX + (endX - startX) * trailProgress;
          const trailY = startY + (endY - startY) * trailProgress;

          ctx.strokeStyle = `rgba(${color}, ${(fade * 0.48).toFixed(3)})`;
          ctx.lineWidth = sig.size * 0.75;
          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(curX, curY);
          ctx.stroke();

          // 2. Glowing pulse head
          const pulseGrad = ctx.createRadialGradient(curX, curY, 0, curX, curY, sig.size * 3.5);
          pulseGrad.addColorStop(0, `rgba(${color}, ${(fade * 0.85).toFixed(3)})`);
          pulseGrad.addColorStop(0.5, `rgba(${color}, ${(fade * 0.35).toFixed(3)})`);
          pulseGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(curX, curY, sig.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = `rgba(255, 255, 255, ${(fade * 0.95).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(curX, curY, sig.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ─── 6. SUBTLE CURSOR DATA WAKE PARTICLES ───
      if (motionEnabled && !prefersReducedMotion && wakeParticlesRef.current.length > 0) {
        const wakes = wakeParticlesRef.current;

        // Faint neural connective filaments between consecutive wake nodes
        for (let i = 0; i < wakes.length - 1; i++) {
          const p1 = wakes[i];
          const p2 = wakes[i + 1];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 46) {
            const ratio1 = p1.life / p1.maxLife;
            const ratio2 = p2.life / p2.maxLife;
            const lineFade = Math.min(ratio1, ratio2) * (1 - dist / 46);
            const lineAlpha = (lineFade * (isDarkRef.current ? 0.22 : 0.14)).toFixed(3);

            ctx.strokeStyle = `rgba(${palette.indigo}, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Render individual wake particles with fading radial glows
        for (let i = 0; i < wakes.length; i++) {
          const p = wakes[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.93;
          p.vy *= 0.93;
          p.life--;

          const progress = Math.max(0, p.life / p.maxLife);
          const fade = Math.pow(progress, 1.5);
          const color = p.colorType === 'amber' ? palette.amber : p.colorType === 'cyan' ? palette.cyan : palette.indigo;

          // 1. Soft ambient glow halo
          const glowRadius = p.size * (2.6 + (1 - progress) * 1.4);
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          glow.addColorStop(0, `rgba(${color}, ${(fade * (isDarkRef.current ? 0.42 : 0.25) * p.opacity).toFixed(3)})`);
          glow.addColorStop(0.55, `rgba(${color}, ${(fade * (isDarkRef.current ? 0.16 : 0.08) * p.opacity).toFixed(3)})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // 2. Micro neural node core
          ctx.fillStyle = `rgba(${color}, ${(fade * (isDarkRef.current ? 0.85 : 0.65) * p.opacity).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.6, p.size * 0.75 * progress), 0, Math.PI * 2);
          ctx.fill();

          // 3. Bright pinpoint white center
          ctx.fillStyle = `rgba(255, 255, 255, ${(fade * (isDarkRef.current ? 0.90 : 0.75) * p.opacity).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.4, p.size * 0.35 * progress), 0, Math.PI * 2);
          ctx.fill();
        }

        wakeParticlesRef.current = wakes.filter(p => p.life > 0);
      }

      // ─── 7. DISPATCH REAL-TIME THROUGHPUT TELEMETRY ───
      const now = performance.now();
      if (now - lastThroughputEmitRef.current > 100) {
        lastThroughputEmitRef.current = now;
        if (motionEnabled && !prefersReducedMotion) {
          const activeCount = signalsRef.current.length;
          let speedSum = 0;
          for (let i = 0; i < signalsRef.current.length; i++) {
            speedSum += signalsRef.current[i].speed * 1000;
          }
          // Dynamic throughput synced with active signals speed and frequency
          const baseThroughput = 18.5 * nodeDensityMultiplier;
          const signalContribution = speedSum * 2.4 * nodeDensityMultiplier;
          const jitter = Math.sin(now * 0.003) * 3.5;
          const calculatedThroughput = Math.max(8.0, baseThroughput + signalContribution + jitter);
          const networkLoad = Math.min(98, Math.round((activeCount / 7) * 70 + (nodeDensityMultiplier * 25)));

          window.dispatchEvent(new CustomEvent('neural-throughput-update', {
            detail: {
              throughputMBps: calculatedThroughput,
              activeSignalsCount: activeCount,
              maxSignals: 7,
              totalPacketsProcessed: totalPacketsProcessedRef.current,
              networkLoadPercent: networkLoad,
              nodeCount: nodesRef.current.length,
              motionEnabled: true
            }
          }));
        } else {
          window.dispatchEvent(new CustomEvent('neural-throughput-update', {
            detail: {
              throughputMBps: 0,
              activeSignalsCount: 0,
              maxSignals: 7,
              totalPacketsProcessed: totalPacketsProcessedRef.current,
              networkLoadPercent: 0,
              nodeCount: nodesRef.current.length,
              motionEnabled: false
            }
          }));
        }
      }
    };

    const animationLoop = () => {
      if (!isDocumentHidden) {
        renderFrame();
      }
      rafRef.current = requestAnimationFrame(animationLoop);
    };

    if (!motionEnabled || prefersReducedMotion) {
      renderFrame();
    } else {
      rafRef.current = requestAnimationFrame(animationLoop);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handleGlobalPointerMove, { capture: true });
      window.removeEventListener('mousemove', handleGlobalPointerMove, { capture: true });
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
    };
  }, [canvasRef, containerRef, mouseCoordsRef, motionEnabled, nodeDensityMultiplier]);
}
