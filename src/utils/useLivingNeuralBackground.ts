import { useEffect, useRef, RefObject } from 'react';

export type NodePersonalityType = 'flow' | 'magnetic' | 'repulsive' | 'orbital' | 'heavy' | 'light';

export interface CursorTrailSample {
  x: number;
  y: number;
  time: number;
  vx: number;
  vy: number;
  speed: number;
  dirX: number;
  dirY: number;
}

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
  
  // Intelligent Force Behavior & Personality
  personality: NodePersonalityType;
  mass: number;
  damping: number;
  springStiffness: number;
  elasticLag: number;
  swirlDir: 1 | -1;
  sensitivityMultiplier: number;
  
  // Natural Autonomous Breathing & Opacity States
  breathingPhase: number;
  breathingSpeed: number;
  baseOpacity: number;
  currentOpacity: number;
  targetOpacity: number;
  
  // High-Sensitivity 3-Zone Interaction State
  interactionZone: 0 | 1 | 2 | 3; // 0 = Idle, 1 = Outer Detection, 2 = Active Interaction, 3 = Close Contact
  interactionIntensity: number;
  
  // Ripple & Wake Kinematic Forces
  rippleForceX?: number;
  rippleForceY?: number;
  crossingGlowBoost?: number;
  rippleIllumination?: number;
  wakeActivation?: number;
  graphRippleActivation?: number;
  lastGraphRippleTime?: number;
  ambientScanIllumination?: number;
  quietZoneFactor?: number;
}

export interface DataSignal {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  type: 'indigo' | 'cyan' | 'amber';
  size: number;
  chainDepth?: number;
  intensity?: number;
}

export interface AmbientScanWave {
  x: number;
  y: number;
  currentDist: number;
  maxDist: number;
  speed: number;
  opacity: number;
  angle: number;
  sweepType: 'planar' | 'radial';
  colorType: 'indigo' | 'cyan' | 'amber';
}

export interface ConstellationLock {
  active: boolean;
  nodeIndices: number[];
  shape: 'triangle' | 'tetra' | 'pentagon' | 'cluster';
  startTime: number;
  duration: number; // total lifecycle in ms
  centerX: number;
  centerY: number;
  anchors: Array<{ x: number; y: number }>;
}

export interface QuietZoneRect {
  x: number;
  y: number;
  width: number;
  height: number;
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
  isStar?: boolean;
  rotation?: number;
  rotSpeed?: number;
  sparklePhase?: number;
}

export interface EnergyRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  opacity: number;
  colorType: 'indigo' | 'cyan' | 'amber';
  isClickRipple?: boolean;
}

export interface MicroSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  colorType: 'indigo' | 'cyan' | 'amber';
  isStar?: boolean;
  rotation?: number;
  rotSpeed?: number;
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
  activityLevel: number;
  primaryColor: 'indigo' | 'cyan' | 'amber';
}

/**
 * useLivingNeuralBackground
 * 
 * High-performance, multi-layered 3D living neural universe engine rendered
 * continuously on a hardware-accelerated Canvas with:
 * 
 * 1. 3 Multi-Depth Planes (Distant, Midground, Foreground) with independent parallax.
 * 2. Organic drift using sinusoidal phase oscillators & soft physics.
 * 3. Dynamic connection fade-in/fade-out based on distance.
 * 4. Neural Crossing & Close Interaction: mutual attraction drag force & trajectory elasticity.
 * 5. Rare Crossing Energy Events: cooldown-governed micro-spark emission & soft ripple waves.
 * 6. Flowing luminous data packets with trailing particle decays.
 * 7. Background Click / Tap Ripple Waves for non-interactive surface clicks.
 * 8. Cursor Interaction with spring-damped deflection and data wake.
 * 9. Section-aware scroll atmosphere modulation.
 * 10. Complete dark and light mode color harmony.
 * 11. Strict accessibility with prefers-reduced-motion static rendering.
 */
export function useLivingNeuralBackground(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  containerRef?: RefObject<HTMLElement | null>,
  mouseCoordsRef?: RefObject<MouseCoordinates>,
  motionEnabled: boolean = true,
  nodeDensityMultiplier: number = 1.0,
  connectionDensity: number = 1.0,
  pulseFrequency: number = 1.0,
  particleSpeed: number = 1.0,
  systemPrefersReducedMotion?: boolean,
  sensitivity: number = 1.4,
  visibility: number = 1.2,
  interactionStrength: number = 1.2
) {
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<NeuralNode[]>([]);
  const signalsRef = useRef<DataSignal[]>([]);
  const wakeParticlesRef = useRef<WakeParticle[]>([]);
  const energyRipplesRef = useRef<EnergyRipple[]>([]);
  const microSparksRef = useRef<MicroSpark[]>([]);
  const ambientScanWavesRef = useRef<AmbientScanWave[]>([]);
  const constellationLockRef = useRef<ConstellationLock | null>(null);
  const quietZonesRef = useRef<QuietZoneRect[]>([]);
  const lastCrossingEventRef = useRef<number>(0);
  const lastAmbientScanTimeRef = useRef<number>(performance.now());
  const lastConstellationTimeRef = useRef<number>(performance.now());
  const lastChainedPulseTimeRef = useRef<number>(0);
  const lastQuietZoneScanTimeRef = useRef<number>(0);
  const lastWakeSpawnRef = useRef<{ x: number; y: number; time: number }>({ x: -9999, y: -9999, time: 0 });
  const cursorTrailRef = useRef<CursorTrailSample[]>([]);
  const cursorVelocityRef = useRef<{ x: number; y: number; vx: number; vy: number; speed: number; angle: number; acceleration: number; time: number }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    angle: 0,
    acceleration: 0,
    time: 0,
  });
  const totalPacketsProcessedRef = useRef(142);
  const lastThroughputEmitRef = useRef(0);
  const synapticConnectionsRef = useRef<Map<string, { excitation: number; lastTime: number }>>(new Map());
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

    const isSystemReducedMotion = typeof systemPrefersReducedMotion === 'boolean' 
      ? systemPrefersReducedMotion 
      : (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const prefersReducedMotion = isSystemReducedMotion || !motionEnabled;
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // If reduced motion is active, clear any existing dynamic particles immediately
    if (prefersReducedMotion) {
      energyRipplesRef.current = [];
      microSparksRef.current = [];
      signalsRef.current = [];
      wakeParticlesRef.current = [];
    }

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
        const padding = 24;

        const x = col * cellW + padding + Math.random() * (cellW - padding * 2);
        const y = row * cellH + padding + Math.random() * (cellH - padding * 2);
        return { x, y };
      };

      // Helper to assign intelligent response personalities and physical characteristics
      const getPersonalityProps = (index: number) => {
        const pTypes: NodePersonalityType[] = ['flow', 'flow', 'magnetic', 'repulsive', 'orbital', 'heavy', 'light', 'flow', 'magnetic', 'orbital', 'repulsive', 'light'];
        const personality = pTypes[index % pTypes.length];
        
        let mass = 1.0;
        let damping = 0.942;
        let springStiffness = 0.0034;
        let elasticLag = 0.22;
        
        switch (personality) {
          case 'heavy':
            mass = 1.75 + (index % 3) * 0.12;
            damping = 0.962;
            springStiffness = 0.0022;
            elasticLag = 0.34;
            break;
          case 'light':
            mass = 0.58 + (index % 3) * 0.08;
            damping = 0.925;
            springStiffness = 0.0048;
            elasticLag = 0.12;
            break;
          case 'flow':
            mass = 0.92;
            damping = 0.946;
            springStiffness = 0.0032;
            elasticLag = 0.18;
            break;
          case 'magnetic':
            mass = 1.02;
            damping = 0.938;
            springStiffness = 0.0036;
            elasticLag = 0.22;
            break;
          case 'repulsive':
            mass = 0.88;
            damping = 0.934;
            springStiffness = 0.0035;
            elasticLag = 0.16;
            break;
          case 'orbital':
            mass = 1.05;
            damping = 0.944;
            springStiffness = 0.0033;
            elasticLag = 0.24;
            break;
        }

        return {
          personality,
          mass,
          damping,
          springStiffness,
          elasticLag,
          swirlDir: (index % 2 === 0 ? 1 : -1) as (1 | -1),
          sensitivityMultiplier: 0.92 + ((index * 7) % 32) / 100,
        };
      };

      // Layer 0: Distant bokeh nodes (faint, delicate, parallax 1-3px)
      for (let i = 0; i < DISTANT_COUNT; i++) {
        const { x, y } = generateGridPoint(i, DISTANT_COUNT);
        const baseOp = Math.min(0.68, (0.24 + Math.random() * 0.12) * visibility);
        const pProps = getPersonalityProps(i);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.10,
          vy: (Math.random() - 0.5) * 0.10,
          size: 0.75 + Math.random() * 0.55,
          layer: 0,
          depth: 0.25,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.003 + Math.random() * 0.004,
          orbitRadius: 14 + Math.random() * 20,
          pulseGlow: 0.30 + Math.random() * 0.35,
          pulseSpeed: 0.008 + Math.random() * 0.012,
          breathingPhase: Math.random() * Math.PI * 2,
          breathingSpeed: 0.012 + Math.random() * 0.012,
          baseOpacity: baseOp,
          currentOpacity: baseOp,
          targetOpacity: baseOp,
          interactionZone: 0,
          interactionIntensity: 0,
          crossingGlowBoost: 0,
          ...pProps,
        });
      }

      // Layer 1: Mid-depth active mesh nodes (parallax 3-7px)
      for (let i = 0; i < MID_COUNT; i++) {
        const { x, y } = generateGridPoint(i, MID_COUNT);
        const baseOp = Math.min(0.82, (0.42 + Math.random() * 0.14) * visibility);
        const pProps = getPersonalityProps(i + DISTANT_COUNT);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          size: 1.25 + Math.random() * 0.65,
          layer: 1,
          depth: 0.6,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.006,
          orbitRadius: 18 + Math.random() * 26,
          pulseGlow: 0.45 + Math.random() * 0.35,
          pulseSpeed: 0.012 + Math.random() * 0.018,
          breathingPhase: Math.random() * Math.PI * 2,
          breathingSpeed: 0.015 + Math.random() * 0.015,
          baseOpacity: baseOp,
          currentOpacity: baseOp,
          targetOpacity: baseOp,
          interactionZone: 0,
          interactionIntensity: 0,
          crossingGlowBoost: 0,
          ...pProps,
        });
      }

      // Layer 2: Foreground selected flagship nodes (luminous, responsive to cursor, parallax 6-14px)
      for (let i = 0; i < FOREGROUND_COUNT; i++) {
        const { x, y } = generateGridPoint(i, FOREGROUND_COUNT);
        const baseOp = Math.min(0.92, (0.58 + Math.random() * 0.16) * visibility);
        const pProps = getPersonalityProps(i + DISTANT_COUNT + MID_COUNT);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: 1.75 + Math.random() * 0.75,
          layer: 2,
          depth: 1.0,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.007 + Math.random() * 0.008,
          orbitRadius: 22 + Math.random() * 32,
          pulseGlow: 0.60 + Math.random() * 0.35,
          pulseSpeed: 0.016 + Math.random() * 0.022,
          breathingPhase: Math.random() * Math.PI * 2,
          breathingSpeed: 0.018 + Math.random() * 0.018,
          baseOpacity: baseOp,
          currentOpacity: baseOp,
          targetOpacity: baseOp,
          interactionZone: 0,
          interactionIntensity: 0,
          crossingGlowBoost: 0,
          ...pProps,
        });
      }

      nodesRef.current = nodes;
      signalsRef.current = [];
      energyRipplesRef.current = [];
      microSparksRef.current = [];
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

      const scrollY = window.scrollY;
      const contactEl = document.getElementById('contact');
      const academicsEl = document.getElementById('academics');
      const skillsEl = document.getElementById('skills');
      const experienceEl = document.getElementById('experience');
      const thinkingEl = document.getElementById('thinking');
      const demosEl = document.getElementById('demos');
      const workEl = document.getElementById('work') || document.getElementById('projects');
      const capabilitiesEl = document.getElementById('capabilities');
      const aboutEl = document.getElementById('about');

      if (contactEl && scrollY >= contactEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'contact';
      } else if (academicsEl && scrollY >= academicsEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'academics';
      } else if (skillsEl && scrollY >= skillsEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'skills';
      } else if (experienceEl && scrollY >= experienceEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'experience';
      } else if (thinkingEl && scrollY >= thinkingEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'thinking';
      } else if (demosEl && scrollY >= demosEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'demos';
      } else if (workEl && scrollY >= workEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'projects';
      } else if (capabilitiesEl && scrollY >= capabilitiesEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'capabilities';
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 320) {
        scrollRef.current.activeSection = 'about';
      } else {
        scrollRef.current.activeSection = 'hero';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Magical Data & Stardust Wake spawner (ethereal sparkling particles following cursor motion)
    const spawnWake = (clientX: number, clientY: number) => {
      if (!motionEnabled || prefersReducedMotion) return;
      const now = performance.now();
      const last = lastWakeSpawnRef.current;
      const dx = clientX - last.x;
      const dy = clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= 8 && (now - last.time > 20)) {
        const types: Array<'indigo' | 'cyan' | 'amber'> = ['cyan', 'indigo', 'amber', 'cyan'];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        const angle = Math.atan2(dy, dx);
        const perp = angle + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2);
        const drift = 0.15 + Math.random() * 0.35;
        const speed = Math.min(dist * 0.03, 0.9);
        const isStar = Math.random() < 0.45; // 45% of wake motes are magical twinkling 4-point stars

        wakeParticlesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 8,
          y: clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(perp) * drift - Math.cos(angle) * (0.08 * speed),
          vy: Math.sin(perp) * drift - Math.sin(angle) * (0.08 * speed),
          size: isStar ? 2.2 + Math.random() * 2.0 : 0.8 + Math.random() * 1.2,
          maxLife: 36 + Math.floor(Math.random() * 20),
          life: 36 + Math.floor(Math.random() * 20),
          colorType: chosenType,
          opacity: 0.75 + Math.random() * 0.25,
          isStar,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.12,
          sparklePhase: Math.random() * Math.PI * 2,
        });

        if (wakeParticlesRef.current.length > 36) {
          wakeParticlesRef.current.shift();
        }

        lastWakeSpawnRef.current = { x: clientX, y: clientY, time: now };
      }
    };

    // Global Pointer events for smooth multi-depth parallax and neural wake trail / ripple interaction
    const handleGlobalPointerMove = (e: MouseEvent | PointerEvent) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const now = performance.now();
      const prevX = mouseRef.current.screenX;
      const prevY = mouseRef.current.screenY;
      const dt = Math.max(1, now - (cursorVelocityRef.current.time || now));

      mouseRef.current.targetX = (e.clientX - centerX);
      mouseRef.current.targetY = (e.clientY - centerY);
      mouseRef.current.screenX = e.clientX;
      mouseRef.current.screenY = e.clientY;
      mouseRef.current.active = true;

      // Track cursor velocity, acceleration & trajectory history
      if (prevX > -1000) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        const rawSpeed = Math.sqrt(dx * dx + dy * dy) / dt;
        const clampedSpeed = Math.min(rawSpeed, 5.8);
        const prevSpeed = cursorVelocityRef.current.speed;
        const acceleration = (clampedSpeed - prevSpeed) / dt;
        const dirLength = Math.hypot(dx, dy);
        const dirX = dirLength > 0.001 ? dx / dirLength : 0;
        const dirY = dirLength > 0.001 ? dy / dirLength : 0;

        cursorVelocityRef.current = {
          x: e.clientX,
          y: e.clientY,
          vx: dx / dt,
          vy: dy / dt,
          speed: clampedSpeed,
          angle: Math.atan2(dy, dx),
          acceleration,
          time: now,
        };

        // Record to trail history for lagging wake physics
        const trail = cursorTrailRef.current;
        trail.push({
          x: e.clientX,
          y: e.clientY,
          time: now,
          vx: dx / dt,
          vy: dy / dt,
          speed: clampedSpeed,
          dirX,
          dirY,
        });

        // Prune trail points older than 420ms or beyond 24 items
        while (trail.length > 0 && (now - trail[0].time > 420 || trail.length > 24)) {
          trail.shift();
        }

        // 1. NEURAL WAKE TRAIL: Sequentially activate nearby nodes with subtle fading wake based on cursor speed/direction
        if (motionEnabled && !prefersReducedMotion) {
          const nodes = nodesRef.current;
          const wakeReach = 100 + Math.min(90, clampedSpeed * 32);
          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const ndx = n.x - e.clientX;
            const ndy = n.y - e.clientY;
            const dist = Math.sqrt(ndx * ndx + ndy * ndy);

            if (dist < wakeReach) {
              const prox = 1 - dist / wakeReach;
              const wakePower = prox * Math.min(1.0, 0.45 + clampedSpeed * 0.38) * (n.depth * 0.6 + 0.4);
              n.wakeActivation = Math.max(n.wakeActivation || 0, wakePower);

              // 2. RIPPLE PROPAGATION: When cursor strongly interacts (fast or close), trigger connected node graph ripple
              if (dist < 52 && clampedSpeed > 0.75 && (!n.lastGraphRippleTime || now - n.lastGraphRippleTime > 360)) {
                n.lastGraphRippleTime = now;
                n.graphRippleActivation = Math.max(n.graphRippleActivation || 0, 0.95);

                // Small micro ripple on the node itself
                if (energyRipplesRef.current.length < 12) {
                  energyRipplesRef.current.push({
                    x: n.x,
                    y: n.y,
                    radius: 2,
                    maxRadius: 36 * (n.depth + 0.3),
                    speed: 1.8 * particleSpeed,
                    opacity: 0.7,
                    colorType: n.layer === 2 ? 'amber' : 'cyan',
                  });
                }
              }
            }
          }
        }
      } else {
        cursorVelocityRef.current.time = now;
      }

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

    // Background Click / Touch Ripple Wave: Triggers temporary illumination of nearby nodes and a faint circular wave in empty space
    const handleBackgroundPointerDown = (e: MouseEvent | PointerEvent) => {
      if (!motionEnabled || prefersReducedMotion) return;
      
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ensure click is NOT on cards, buttons, links, inputs, dialogs, dropdowns, or interactive widgets
      const isInteractive = target.closest(
        'button, a, input, textarea, select, option, label, [role="button"], [role="tab"], [role="dialog"], [role="menu"], [role="menuitem"], .card-level-1, .card-level-2, .card-level-3, [data-interactive], form, iframe, nav, header, [data-prevent-ripple]'
      );
      if (isInteractive) return;

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Section-aware color selection for the ripple
      const currentSec = scrollRef.current.activeSection;
      let rippleColor: 'indigo' | 'cyan' | 'amber' = 'indigo';
      if (currentSec === 'skills' || currentSec === 'thinking') {
        rippleColor = Math.random() < 0.65 ? 'amber' : 'indigo';
      } else if (currentSec === 'projects' || currentSec === 'demos') {
        rippleColor = Math.random() < 0.6 ? 'cyan' : 'indigo';
      } else {
        rippleColor = Math.random() < 0.5 ? 'cyan' : 'indigo';
      }

      // Spawn faint circular ripple wave
      const rippleMaxRadius = Math.min(width, height) * 0.42 + 140;
      energyRipplesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: rippleMaxRadius,
        speed: 3.8,
        opacity: 0.85,
        colorType: rippleColor,
        isClickRipple: true,
      });

      // Immediate temporary illumination & gentle outward deflection of nearby nodes
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          const proximity = 1 - dist / 180;
          n.rippleIllumination = Math.max(n.rippleIllumination || 0, proximity * 0.9);
          n.crossingGlowBoost = Math.min(1.0, (n.crossingGlowBoost || 0) + proximity * 0.5);
          
          const push = proximity * 0.35 * (n.depth + 0.3);
          n.vx += (dx / dist) * push;
          n.vy += (dy / dist) * push;
        }
      }
    };

    if (isFinePointer && !prefersReducedMotion) {
      window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true, capture: true });
      window.addEventListener('mousemove', handleGlobalPointerMove, { passive: true, capture: true });
      document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    }
    window.addEventListener('pointerdown', handleBackgroundPointerDown, { passive: true });

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

    // Data signal spawner along valid connections with section-aware frequency and color modulation
    const maybeSpawnSignal = (validConnections: Array<{ from: number; to: number; layer: number }>, activeSection: string) => {
      if (validConnections.length === 0) return;
      const baseMaxSignals = activeSection === 'demos' ? 9 : 7;
      const maxSignals = Math.max(2, Math.min(24, Math.round(baseMaxSignals * pulseFrequency)));
      if (signalsRef.current.length >= maxSignals) return;

      let baseSpawnChance = (isDarkRef.current ? 0.04 : 0.03) * pulseFrequency;
      if (activeSection === 'demos') baseSpawnChance = (isDarkRef.current ? 0.07 : 0.055) * pulseFrequency;
      else if (activeSection === 'about' || activeSection === 'academics') baseSpawnChance = 0.022 * pulseFrequency;

      if (Math.random() < baseSpawnChance) {
        const conn = validConnections[Math.floor(Math.random() * validConnections.length)];
        let chosenType: 'indigo' | 'cyan' | 'amber' = 'indigo';
        if (activeSection === 'skills' || activeSection === 'thinking') {
          chosenType = Math.random() < 0.6 ? 'amber' : 'indigo';
        } else if (activeSection === 'projects' || activeSection === 'demos') {
          chosenType = Math.random() < 0.5 ? 'cyan' : 'indigo';
        } else {
          const types: Array<'indigo' | 'cyan' | 'amber'> = ['indigo', 'cyan', 'amber'];
          chosenType = types[Math.floor(Math.random() * types.length)];
        }

        signalsRef.current.push({
          fromIndex: conn.from,
          toIndex: conn.to,
          progress: 0,
          speed: (0.012 + Math.random() * 0.016) * particleSpeed,
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
      const nowTime = performance.now();

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

      // Synaptic connection excitation tracking: instant bright firing on cursor encounter, followed by a non-linear ease-out decay
      const getSynapticExcitation = (key: string, instantProximity: number, now: number) => {
        const map = synapticConnectionsRef.current;
        const existing = map.get(key);
        let currentVal = 0;
        
        if (existing) {
          const elapsedSec = (now - existing.lastTime) / 1000;
          // Non-linear exponential ease-out curve for natural synaptic recovery
          const decayFactor = Math.exp(-2.85 * elapsedSec);
          currentVal = existing.excitation * decayFactor;
        }

        if (instantProximity > currentVal) {
          // Instant synaptic excitation when cursor touches or comes in close contact
          currentVal = instantProximity;
          map.set(key, { excitation: currentVal, lastTime: now });
        } else if (currentVal > 0.008) {
          map.set(key, { excitation: currentVal, lastTime: now });
        } else if (existing) {
          map.delete(key);
          currentVal = 0;
        }

        // Return non-linear ease-out power response (fast high-luminescence core, smooth long tail)
        return Math.pow(currentVal, 0.88);
      };

      // ─── 0. SMART VISUAL QUIET ZONES UPDATE & CALCULATION ───
      // Periodically scan DOM for cards, text blocks, navigation and headers to establish visual quiet zones
      if (nowTime - lastQuietZoneScanTimeRef.current > 750) {
        lastQuietZoneScanTimeRef.current = nowTime;
        const quietElements = document.querySelectorAll(
          '.card-level-1, .card-level-2, .card-level-3, [data-quiet-zone], nav, header, form, footer, .quiet-zone-target'
        );
        const rects: QuietZoneRect[] = [];
        const padding = 16;
        for (let q = 0; q < quietElements.length; q++) {
          const el = quietElements[q];
          const b = el.getBoundingClientRect();
          if (b.bottom >= 0 && b.top <= height && b.right >= 0 && b.left <= width && b.width > 30 && b.height > 30) {
            rects.push({
              x: b.left - padding,
              y: b.top - padding,
              width: b.width + padding * 2,
              height: b.height + padding * 2,
            });
          }
        }
        quietZonesRef.current = rects;
      }

      // Helper: Calculate quiet zone suppression factor for any (x, y) point (0.0 = deep inside card, 1.0 = wide open negative space)
      const getQuietZoneFactor = (x: number, y: number) => {
        const rects = quietZonesRef.current;
        if (rects.length === 0) return 1.0;
        let minFactor = 1.0;
        for (let r = 0; r < rects.length; r++) {
          const rect = rects[r];
          if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
            // Point is inside a content element: measure distance to border for smooth edge falloff
            const distLeft = x - rect.x;
            const distRight = (rect.x + rect.width) - x;
            const distTop = y - rect.y;
            const distBottom = (rect.y + rect.height) - y;
            const distToEdge = Math.min(distLeft, distRight, distTop, distBottom);
            // Core inside gets factor ~0.38 - 0.45, smoothly blending out
            const insideFactor = 0.38 + Math.min(0.22, (1 - Math.min(distToEdge, 60) / 60) * 0.22);
            minFactor = Math.min(minFactor, insideFactor);
          }
        }
        return minFactor;
      };

      // ─── 0.5. AMBIENT INTELLIGENCE SCAN WAVES (LIFECYCLE & SPAWN) ───
      // Rare, gentle atmospheric scan pulse travelling across empty space (every ~11 - 16s)
      if (motionEnabled && !prefersReducedMotion && (nowTime - lastAmbientScanTimeRef.current > 11500)) {
        if (Math.random() < 0.07 * pulseFrequency) {
          lastAmbientScanTimeRef.current = nowTime;
          const sweepType: 'planar' | 'radial' = Math.random() < 0.55 ? 'planar' : 'radial';
          const startX = sweepType === 'radial' ? width * (0.15 + Math.random() * 0.7) : (Math.random() < 0.5 ? -40 : width + 40);
          const startY = sweepType === 'radial' ? height * (0.15 + Math.random() * 0.7) : (Math.random() < 0.5 ? -40 : height + 40);
          const maxDist = sweepType === 'radial' ? Math.max(width, height) * 0.85 : Math.max(width, height) * 1.4;
          const sec = scrollRef.current.activeSection;
          const colorType = (sec === 'skills' || sec === 'thinking') ? 'amber' : (sec === 'projects' || sec === 'demos') ? 'cyan' : 'indigo';

          ambientScanWavesRef.current.push({
            x: startX,
            y: startY,
            currentDist: 0,
            maxDist,
            speed: (1.2 + Math.random() * 1.0) * particleSpeed,
            opacity: 0.85,
            angle: Math.random() * Math.PI * 2,
            sweepType,
            colorType,
          });
        }
      }

      // ─── 0.8. CONSTELLATION LOCK EVENTS (SPAWN & LIFECYCLE) ───
      // Very rare, subtle temporary geometric stabilization of a local cluster of 3-5 nodes (every ~20s)
      if (motionEnabled && !prefersReducedMotion && !constellationLockRef.current && (nowTime - lastConstellationTimeRef.current > 18000)) {
        if (Math.random() < 0.05) {
          lastConstellationTimeRef.current = nowTime;
          // Find a candidate cluster in mid/foreground away from mouse and in relatively clear space
          const eligibleIndices: number[] = [];
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].layer >= 1) eligibleIndices.push(i);
          }

          if (eligibleIndices.length >= 4) {
            // Pick a seed node
            const seedIdx = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
            const seedNode = nodes[seedIdx];
            const cluster: Array<{ idx: number; dist: number }> = [];

            for (let i = 0; i < eligibleIndices.length; i++) {
              const otherIdx = eligibleIndices[i];
              if (otherIdx === seedIdx) continue;
              const oNode = nodes[otherIdx];
              const dx = oNode.x - seedNode.x;
              const dy = oNode.y - seedNode.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 180 && dist > 20) {
                cluster.push({ idx: otherIdx, dist });
              }
            }

            cluster.sort((a, b) => a.dist - b.dist);
            if (cluster.length >= 3) {
              const selectedCount = Math.min(4, cluster.length + 1);
              const nodeIndices = [seedIdx, ...cluster.slice(0, selectedCount - 1).map(c => c.idx)];
              
              // Calculate centroid
              let cX = 0, cY = 0;
              for (const idx of nodeIndices) {
                cX += nodes[idx].x;
                cY += nodes[idx].y;
              }
              cX /= nodeIndices.length;
              cY /= nodeIndices.length;

              // Generate geometric anchor points (regular polygon/star offset with radius ~65px)
              const radius = 55 + Math.random() * 25;
              const baseAngle = Math.random() * Math.PI * 2;
              const shapeChoices: Array<'triangle' | 'tetra' | 'pentagon'> = ['triangle', 'tetra', 'pentagon'];
              const shape = shapeChoices[Math.min(shapeChoices.length - 1, nodeIndices.length - 3)];
              const anchors: Array<{ x: number; y: number }> = [];

              for (let k = 0; k < nodeIndices.length; k++) {
                const a = baseAngle + (k * (Math.PI * 2) / nodeIndices.length);
                anchors.push({
                  x: cX + Math.cos(a) * radius,
                  y: cY + Math.sin(a) * radius,
                });
              }

              constellationLockRef.current = {
                active: true,
                nodeIndices,
                shape,
                startTime: nowTime,
                duration: 4800 + Math.random() * 2400, // 5 to 7.2s lifecycle
                centerX: cX,
                centerY: cY,
                anchors,
              };
            }
          }
        }
      }

      // Pass coordinates to container CSS custom properties for SVG & atmospheric layer parallax
      if (containerRef?.current && !prefersReducedMotion) {
        containerRef.current.style.setProperty('--bg-mouse-x', `${mouse.currentX.toFixed(2)}px`);
        containerRef.current.style.setProperty('--bg-mouse-y', `${mouse.currentY.toFixed(2)}px`);
      }

      // Connection threshold distances per layer (scaled by connectionDensity)
      const CONNECT_DISTANCES = [
        140 * connectionDensity,
        180 * connectionDensity,
        220 * connectionDensity
      ];
      const validConnections: Array<{ from: number; to: number; layer: number }> = [];

      // ─── 1. PHYSICS, NODE DRIFT, CLOSE ATTRACTION & CROSSING EVENTS ───
      if (!prefersReducedMotion) {
        // A. Basic Drift and Mouse Gravity & Constellation Lock Physics
        const cLock = constellationLockRef.current;
        let cLockProgress = 0;
        let cLockWeight = 0;
        if (cLock && cLock.active) {
          const elapsed = nowTime - cLock.startTime;
          cLockProgress = elapsed / cLock.duration;
          if (cLockProgress >= 1.0) {
            constellationLockRef.current = null;
          } else {
            // Smooth bell curve envelope: ease in, hold, ease out
            cLockWeight = Math.sin(cLockProgress * Math.PI);
          }
        }

        const cursorVel = cursorVelocityRef.current;
        const cursorTrail = cursorTrailRef.current;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Decay crossing glow boost, ripple illumination, wake activation, graph ripple, and ambient scan
          if (node.crossingGlowBoost && node.crossingGlowBoost > 0) {
            node.crossingGlowBoost *= 0.94;
          }
          if (node.rippleIllumination && node.rippleIllumination > 0) {
            node.rippleIllumination *= 0.92;
          }
          if (node.wakeActivation && node.wakeActivation > 0) {
            node.wakeActivation *= 0.95; // Smooth wake trail dissipation
          }
          if (node.ambientScanIllumination && node.ambientScanIllumination > 0) {
            node.ambientScanIllumination *= 0.93;
          }

          // 2. RIPPLE PROPAGATION: Propagate graph ripple activation and physical impulse through connected nodes
          let rippleImpulseX = 0;
          let rippleImpulseY = 0;
          if (node.graphRippleActivation && node.graphRippleActivation > 0.04) {
            const propIntensity = node.graphRippleActivation * 0.45;
            for (let j = 0; j < nodes.length; j++) {
              if (i === j) continue;
              const n2 = nodes[j];
              const cdx = n2.x - node.x;
              const cdy = n2.y - node.y;
              const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
              const maxConnDist = CONNECT_DISTANCES[node.layer];
              if (cdist < maxConnDist && cdist > 1) {
                const stepFalloff = (1 - cdist / maxConnDist) * propIntensity;
                if (stepFalloff > 0.06) {
                  n2.rippleIllumination = Math.max(n2.rippleIllumination || 0, stepFalloff * 0.88);
                  n2.crossingGlowBoost = Math.max(n2.crossingGlowBoost || 0, stepFalloff * 0.55);
                  // Subtle physical impulse along the connection vector
                  const impulseStrength = stepFalloff * 0.012 * particleSpeed;
                  n2.vx += (cdx / cdist) * impulseStrength;
                  n2.vy += (cdy / cdist) * impulseStrength;
                }
              }
            }
            node.graphRippleActivation *= 0.86;
          }

          // Gentle organic harmonic multi-frequency drift scaled by particleSpeed
          node.phase += node.phaseSpeed * particleSpeed;
          let targetDriftX = node.baseX + Math.cos(node.phase) * node.orbitRadius + Math.sin(node.phase * 0.43) * (node.orbitRadius * 0.28);
          let targetDriftY = node.baseY + Math.sin(node.phase * 0.82) * node.orbitRadius + Math.cos(node.phase * 0.37) * (node.orbitRadius * 0.24);

          // 5. CONSTELLATION LOCK: If node is part of active constellation lock, gently attract to its anchor
          if (cLock && cLock.active && cLockWeight > 0.01) {
            const anchorIdx = cLock.nodeIndices.indexOf(i);
            if (anchorIdx !== -1 && cLock.anchors[anchorIdx]) {
              const anchor = cLock.anchors[anchorIdx];
              targetDriftX = targetDriftX * (1 - cLockWeight * 0.85) + anchor.x * (cLockWeight * 0.85);
              targetDriftY = targetDriftY * (1 - cLockWeight * 0.85) + anchor.y * (cLockWeight * 0.85);
              node.crossingGlowBoost = Math.max(node.crossingGlowBoost || 0, cLockWeight * 0.65);
            }
          }

          // Natural return spring force toward orbital equilibrium
          let totalForceX = (targetDriftX - node.x) * node.springStiffness * particleSpeed;
          let totalForceY = (targetDriftY - node.y) * node.springStiffness * particleSpeed;

          // 3.5. GENTLE EDGE-REPULSION FORCE (Prevents clustering near canvas boundaries across all device viewports)
          const edgeThresholdX = Math.min(width * 0.14, 120);
          const edgeThresholdY = Math.min(height * 0.14, 120);

          if (node.x < edgeThresholdX) {
            const edgeDistFactor = (edgeThresholdX - node.x) / edgeThresholdX;
            totalForceX += (edgeDistFactor * edgeDistFactor) * 0.042 * particleSpeed;
          } else if (node.x > width - edgeThresholdX) {
            const edgeDistFactor = (node.x - (width - edgeThresholdX)) / edgeThresholdX;
            totalForceX -= (edgeDistFactor * edgeDistFactor) * 0.042 * particleSpeed;
          }

          if (node.y < edgeThresholdY) {
            const edgeDistFactor = (edgeThresholdY - node.y) / edgeThresholdY;
            totalForceY += (edgeDistFactor * edgeDistFactor) * 0.042 * particleSpeed;
          } else if (node.y > height - edgeThresholdY) {
            const edgeDistFactor = (node.y - (height - edgeThresholdY)) / edgeThresholdY;
            totalForceY -= (edgeDistFactor * edgeDistFactor) * 0.042 * particleSpeed;
          }

          // 4. MULTI-LAYER SPATIAL DEPTH & NON-LINEAR VELOCITY-SENSITIVE CURSOR INTERACTION
          const parallaxX = (mouse.currentX * 0.009 * (node.layer + 1));
          const parallaxY = (mouse.currentY * 0.009 * (node.layer + 1));

          // Multi-Zone Radii scaled non-linearly by cursor velocity:
          // Slow movements yield surgical, pinpoint precision (< 4px expansion)
          // Rapid sweeps expand non-linearly to generate wide, sweeping ripples and wakes (up to 135px expansion)
          const sensMult = node.sensitivityMultiplier || 1.0;
          const rawSpeed = cursorVel.speed || 0;
          const nonLinearSpeedFactor = Math.pow(Math.min(rawSpeed, 5.2), 1.42);
          const speedExpansion = Math.min(nonLinearSpeedFactor * 32, 135);

          const outerDetectionRadius = (290 + node.layer * 52 + speedExpansion) * sensitivity * sensMult;
          const activeInteractionRadius = (140 + node.layer * 40 + speedExpansion * 0.76) * sensitivity * sensMult;
          const closeContactRadius = (56 + node.layer * 20 + speedExpansion * 0.38) * sensitivity * sensMult;

          if (mouse.active) {
            const nodeScreenX = node.x + parallaxX;
            const nodeScreenY = node.y + parallaxY;
            const dx = mouse.screenX - nodeScreenX;
            const dy = mouse.screenY - nodeScreenY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const unitX = dx / dist;
            const unitY = dy / dist;

            if (dist < closeContactRadius) {
              // ─── ZONE 3: DIRECT NEURAL CONTACT (< 58-105px) ───
              // Elastic spring drag lagging behind cursor, strong momentum transfer, glowing core, ripple trigger
              node.interactionZone = 3;
              const rawZ3 = 1 - dist / closeContactRadius;
              const zone3Factor = rawZ3 * rawZ3 * (3 - 2 * rawZ3); // Smooth Hermite curve
              node.interactionIntensity = zone3Factor;

              // Elastic drag toward virtual lagging position for organic trailing inertia
              const lagDist = node.elasticLag * 16;
              const virtualTargetX = mouse.screenX - cursorVel.vx * lagDist;
              const virtualTargetY = mouse.screenY - cursorVel.vy * lagDist;
              const vdx = virtualTargetX - nodeScreenX;
              const vdy = virtualTargetY - nodeScreenY;

              const elasticPull = zone3Factor * 0.052 * interactionStrength * particleSpeed;
              totalForceX += vdx * elasticPull * (1.20 * node.depth);
              totalForceY += vdy * elasticPull * (1.20 * node.depth);

              // Impart cursor momentum
              const momFactor = zone3Factor * 0.14 * interactionStrength;
              totalForceX += cursorVel.vx * momFactor;
              totalForceY += cursorVel.vy * momFactor;

              node.targetOpacity = Math.min(1.0, (node.baseOpacity + 0.58 * zone3Factor) * visibility);
              node.crossingGlowBoost = Math.max(node.crossingGlowBoost || 0, zone3Factor * 1.0);

              // Trigger cascading ripple when cursor moves briskly through close contact
              if (cursorVel.speed > 0.58 && (!node.lastGraphRippleTime || nowTime - node.lastGraphRippleTime > 300)) {
                node.lastGraphRippleTime = nowTime;
                node.graphRippleActivation = Math.max(node.graphRippleActivation || 0, 0.95);
              }
            } else if (dist < activeInteractionRadius) {
              // ─── ZONE 2: ACTIVE INFLUENCE FIELD (58px - 210px) ───
              // Fluid directional flow, personality-specific behaviors (flow, magnetic, repulsive, orbital), enhanced glow
              node.interactionZone = 2;
              const rawZ2 = 1 - (dist - closeContactRadius) / (activeInteractionRadius - closeContactRadius);
              const zone2Factor = Math.max(0, Math.min(1, rawZ2 * rawZ2 * (3 - 2 * rawZ2)));
              node.interactionIntensity = zone2Factor * 0.82;

              // Directional fluid flow matching cursor vector with natural slipstream
              const flowPower = zone2Factor * 0.026 * interactionStrength * particleSpeed;
              totalForceX += cursorVel.vx * flowPower * (node.depth * 0.85 + 0.25);
              totalForceY += cursorVel.vy * flowPower * (node.depth * 0.85 + 0.25);

              // Personality-specific secondary kinematic behavior
              switch (node.personality) {
                case 'flow': {
                  // Strongly aligned with stream
                  const streamBoost = zone2Factor * 0.020 * interactionStrength * particleSpeed;
                  totalForceX += cursorVel.vx * streamBoost;
                  totalForceY += cursorVel.vy * streamBoost;
                  break;
                }
                case 'magnetic': {
                  // Attractive inward pull toward cursor
                  const magForce = zone2Factor * 0.018 * interactionStrength * particleSpeed;
                  totalForceX += unitX * magForce;
                  totalForceY += unitY * magForce;
                  break;
                }
                case 'repulsive': {
                  // Cushioning repulsion away from cursor path
                  const repForce = zone2Factor * 0.018 * interactionStrength * particleSpeed;
                  totalForceX -= unitX * repForce;
                  totalForceY -= unitY * repForce;
                  break;
                }
                case 'orbital': {
                  // Perpendicular vortex swirl around moving cursor
                  const swirlForce = zone2Factor * 0.022 * interactionStrength * particleSpeed * node.swirlDir;
                  totalForceX += -unitY * swirlForce;
                  totalForceY += unitX * swirlForce;
                  break;
                }
                case 'heavy': {
                  // Subtle trajectory lag
                  totalForceX += (unitX * 0.35 + cursorVel.vx * 0.10) * zone2Factor * 0.016;
                  totalForceY += (unitY * 0.35 + cursorVel.vy * 0.10) * zone2Factor * 0.016;
                  break;
                }
                case 'light': {
                  // Highly reactive directional flick
                  totalForceX += (unitX * 0.45 + cursorVel.vx * 0.18) * zone2Factor * 0.032;
                  totalForceY += (unitY * 0.45 + cursorVel.vy * 0.18) * zone2Factor * 0.032;
                  break;
                }
              }

              node.targetOpacity = Math.min(0.94, (node.baseOpacity + 0.38 * zone2Factor) * visibility);
              node.crossingGlowBoost = Math.max(node.crossingGlowBoost || 0, zone2Factor * 0.52);
            } else if (dist < outerDetectionRadius) {
              // ─── ZONE 1: OUTER SENSING FIELD (210px - 380px) ───
              // Gentle organic trajectory nudge & faint initial wake response
              node.interactionZone = 1;
              const rawZ1 = 1 - (dist - activeInteractionRadius) / (outerDetectionRadius - activeInteractionRadius);
              const zone1Factor = Math.max(0, Math.min(1, rawZ1 * rawZ1 * (3 - 2 * rawZ1)));
              node.interactionIntensity = zone1Factor * 0.40;

              const subtleNudge = zone1Factor * 0.0065 * interactionStrength * particleSpeed;
              totalForceX += (cursorVel.vx * 0.14 + unitX * 0.86) * subtleNudge;
              totalForceY += (cursorVel.vy * 0.14 + unitY * 0.86) * subtleNudge;

              node.targetOpacity = Math.min(0.88, (node.baseOpacity + 0.20 * zone1Factor) * visibility);
            } else {
              // Outside all zones (Idle)
              node.interactionZone = 0;
              node.interactionIntensity = 0;
              node.targetOpacity = node.baseOpacity;
            }
          } else {
            node.interactionZone = 0;
            node.interactionIntensity = 0;
            node.targetOpacity = node.baseOpacity;
          }

          // ─── CURSOR WAKE TRAIL PHYSICS (Lagging disturbance behind cursor path) ───
          if (cursorTrail.length > 1) {
            for (let t = cursorTrail.length - 1; t >= 0; t--) {
              const sample = cursorTrail[t];
              const age = nowTime - sample.time;
              if (age < 45 || age > 380) continue; // Focus on mid-age wake disturbance

              const wdx = sample.x - (node.x + parallaxX);
              const wdy = sample.y - (node.y + parallaxY);
              const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
              const wakeReach = (105 + sample.speed * 26) * sensitivity;

              if (wdist < wakeReach) {
                const wakeDistFactor = 1 - wdist / wakeReach;
                const timeFactor = 1 - (age - 45) / 335;
                const wakePush = wakeDistFactor * timeFactor * 0.011 * interactionStrength * particleSpeed;
                
                totalForceX += sample.dirX * wakePush;
                totalForceY += sample.dirY * wakePush;
                node.wakeActivation = Math.max(node.wakeActivation || 0, wakeDistFactor * timeFactor * 0.78);
                break;
              }
            }
          }

          // ─── ACCELERATION & VELOCITY INTEGRATION (F = ma with natural inertia) ───
          const accelX = totalForceX / (node.mass || 1.0);
          const accelY = totalForceY / (node.mass || 1.0);

          node.vx = (node.vx + accelX) * (node.damping || 0.942);
          node.vy = (node.vy + accelY) * (node.damping || 0.942);

          // Clamped velocity to prevent erratic spikes under extreme motion
          const currentSpeed = Math.hypot(node.vx, node.vy);
          const maxAllowedSpeed = 4.8 * particleSpeed;
          if (currentSpeed > maxAllowedSpeed) {
            const scale = maxAllowedSpeed / currentSpeed;
            node.vx *= scale;
            node.vy *= scale;
          }

          // Natural autonomous breathing effect
          node.breathingPhase += node.breathingSpeed * particleSpeed;

          // Smooth lerp of opacity toward targetOpacity with organic responsiveness
          const lerpRate = node.targetOpacity > node.currentOpacity ? 0.18 : 0.048;
          node.currentOpacity += (node.targetOpacity - node.currentOpacity) * lerpRate;
        }

        // B. Neural Crossing & Close Node Attraction (Gravitational/Elastic Inter-Node Drag)
        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            if (n1.layer === 0 && n2.layer === 0) continue; // Keep distant layer calm

            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const distSq = dx * dx + dy * dy;
            const closeRadius = 55 * Math.min(1.4, Math.max(0.7, connectionDensity));

            if (distSq < closeRadius * closeRadius && distSq > 1) {
              const dist = Math.sqrt(distSq);
              // Magnetic / elastic soft pull between close neurons
              const attractionForce = (1 - dist / closeRadius) * 0.0045 * Math.min(n1.depth, n2.depth) * particleSpeed;
              n1.vx += (dx / dist) * attractionForce / n1.mass;
              n1.vy += (dy / dist) * attractionForce / n1.mass;
              n2.vx -= (dx / dist) * attractionForce / n2.mass;
              n2.vy -= (dy / dist) * attractionForce / n2.mass;

              // Boost mutual glow
              n1.crossingGlowBoost = Math.max(n1.crossingGlowBoost || 0, (1 - dist / closeRadius) * 0.65);
              n2.crossingGlowBoost = Math.max(n2.crossingGlowBoost || 0, (1 - dist / closeRadius) * 0.65);

              // Rare Crossing Event Check (when two nodes cross under 22px with cooldown)
              if (dist < 22 && (nowTime - lastCrossingEventRef.current > 1400)) {
                lastCrossingEventRef.current = nowTime;
                const midX = (n1.x + n2.x) * 0.5;
                const midY = (n1.y + n2.y) * 0.5;

                // 1. Crossing ripple
                energyRipplesRef.current.push({
                  x: midX,
                  y: midY,
                  radius: 3,
                  maxRadius: 48,
                  speed: 1.8 * particleSpeed,
                  opacity: 0.85,
                  colorType: n1.layer === 2 || n2.layer === 2 ? 'amber' : 'cyan',
                });

                // 2. Micro-particles (sparks)
                for (let k = 0; k < 4; k++) {
                  const sparkAngle = Math.random() * Math.PI * 2;
                  const sparkSpeed = (0.4 + Math.random() * 0.8) * particleSpeed;
                  microSparksRef.current.push({
                    x: midX,
                    y: midY,
                    vx: Math.cos(sparkAngle) * sparkSpeed,
                    vy: Math.sin(sparkAngle) * sparkSpeed,
                    size: 1.0 + Math.random() * 1.2,
                    life: 24 + Math.floor(Math.random() * 12),
                    maxLife: 36,
                    colorType: Math.random() > 0.5 ? 'amber' : 'indigo',
                  });
                }
              }
            }
          }
        }

        // C. Apply Position Integration and Boundary Wrapping
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          node.x += node.vx * particleSpeed;
          node.y += node.vy * particleSpeed;

          const margin = 50;
          if (node.x < -margin) { node.x = width + margin; node.baseX = node.x; }
          if (node.x > width + margin) { node.x = -margin; node.baseX = node.x; }
          if (node.y < -margin) { node.y = height + margin; node.baseY = node.y; }
          if (node.y > height + margin) { node.y = -margin; node.baseY = node.y; }
        }
      }

      // ─── 1.5. AMBIENT SCAN WAVES PROPAGATION & PARTICLES SCANNING ───
      if (motionEnabled && !prefersReducedMotion && ambientScanWavesRef.current.length > 0) {
        const remainingScans: AmbientScanWave[] = [];
        for (let s = 0; s < ambientScanWavesRef.current.length; s++) {
          const scan = ambientScanWavesRef.current[s];
          scan.currentDist += scan.speed * particleSpeed;
          const scanProgress = scan.currentDist / scan.maxDist;
          scan.opacity = Math.max(0, Math.sin(scanProgress * Math.PI) * 0.75);

          // Scan wavefront illuminating nodes and connections in negative space
          const waveBand = 65;
          for (let nIdx = 0; nIdx < nodes.length; nIdx++) {
            const n = nodes[nIdx];
            let distToWave = 0;
            if (scan.sweepType === 'radial') {
              const dx = n.x - scan.x;
              const dy = n.y - scan.y;
              distToWave = Math.abs(Math.sqrt(dx * dx + dy * dy) - scan.currentDist);
            } else {
              // Planar sweep along scan.angle
              const proj = Math.cos(scan.angle) * (n.x - scan.x) + Math.sin(scan.angle) * (n.y - scan.y);
              distToWave = Math.abs(proj - scan.currentDist);
            }

            if (distToWave < waveBand) {
              const scanPower = (1 - distToWave / waveBand) * scan.opacity;
              n.ambientScanIllumination = Math.max(n.ambientScanIllumination || 0, scanPower * 0.75);
            }
          }

          // Draw soft, atmospheric ambient scan wavefront
          if (scanProgress < 1.0 && scan.opacity > 0.02) {
            const scanColor = scan.colorType === 'amber' ? palette.amber : scan.colorType === 'cyan' ? palette.cyan : palette.indigo;
            ctx.save();
            if (scan.sweepType === 'radial') {
              // Soft feathered radial aura ring
              const scanGrad = ctx.createRadialGradient(
                scan.x, 
                scan.y, 
                Math.max(0, scan.currentDist - waveBand * 1.2), 
                scan.x, 
                scan.y, 
                scan.currentDist + waveBand * 0.4
              );
              scanGrad.addColorStop(0, 'rgba(0,0,0,0)');
              scanGrad.addColorStop(0.5, `rgba(${scanColor}, ${(scan.opacity * (isDarkRef.current ? 0.075 : 0.038)).toFixed(3)})`);
              scanGrad.addColorStop(0.8, `rgba(${scanColor}, ${(scan.opacity * (isDarkRef.current ? 0.11 : 0.055)).toFixed(3)})`);
              scanGrad.addColorStop(1, 'rgba(0,0,0,0)');
              ctx.fillStyle = scanGrad;
              ctx.beginPath();
              ctx.arc(scan.x, scan.y, scan.currentDist + waveBand * 0.4, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Soft atmospheric planar scan band with feathered gradient edges
              const px = scan.x + Math.cos(scan.angle) * scan.currentDist;
              const py = scan.y + Math.sin(scan.angle) * scan.currentDist;
              const perpX = -Math.sin(scan.angle) * Math.max(width, height) * 1.5;
              const perpY = Math.cos(scan.angle) * Math.max(width, height) * 1.5;

              // Directional normal offset for gradient
              const normX = Math.cos(scan.angle) * waveBand * 0.7;
              const normY = Math.sin(scan.angle) * waveBand * 0.7;

              const linearGrad = ctx.createLinearGradient(px - normX, py - normY, px + normX, py + normY);
              linearGrad.addColorStop(0, 'rgba(0,0,0,0)');
              linearGrad.addColorStop(0.5, `rgba(${scanColor}, ${(scan.opacity * (isDarkRef.current ? 0.085 : 0.042)).toFixed(3)})`);
              linearGrad.addColorStop(1, 'rgba(0,0,0,0)');

              ctx.strokeStyle = linearGrad;
              ctx.lineWidth = waveBand * 1.2;
              ctx.beginPath();
              ctx.moveTo(px - perpX, py - perpY);
              ctx.lineTo(px + perpX, py + perpY);
              ctx.stroke();

              // Subtle leading luminous crest
              ctx.strokeStyle = `rgba(${scanColor}, ${(scan.opacity * (isDarkRef.current ? 0.14 : 0.07)).toFixed(3)})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(px - perpX, py - perpY);
              ctx.lineTo(px + perpX, py + perpY);
              ctx.stroke();
            }
            ctx.restore();
            remainingScans.push(scan);
          }
        }
        ambientScanWavesRef.current = remainingScans;
      }

      // ─── 2. RENDER LAYER 0 (DISTANT BOKEH & DISTANT CONNECTIONS, 1-3px PARALLAX) ───
      const distantNodes = nodes.filter(n => n.layer === 0);
      const parallax0X = mouse.currentX * 0.005;
      const parallax0Y = mouse.currentY * 0.005;

      for (let i = 0; i < distantNodes.length; i++) {
        const n1 = distantNodes[i];
        const x1 = n1.x + parallax0X;
        const y1 = n1.y + parallax0Y;
        const qzFactor1 = getQuietZoneFactor(x1, y1);
        const nodeBoost0 = getLocalBoost(x1, y1) * qzFactor1 * (
          1 + (n1.crossingGlowBoost || 0) * 0.4 + 
          (n1.rippleIllumination || 0) * 0.9 + 
          (n1.wakeActivation || 0) * 0.75 +
          (n1.ambientScanIllumination || 0) * 0.6
        );

        const breathFactor0 = 1.0 + Math.sin(n1.breathingPhase) * 0.14 + Math.cos(n1.breathingPhase * 0.7) * 0.06;
        const nodeAlpha0 = Math.min(0.95, Math.max(0.08, n1.currentOpacity * breathFactor0 * nodeBoost0));

        // Faint distant bokeh halo (normalized, delicate)
        const bokehRadius = n1.size * 2.2 * (1 + (nodeBoost0 - 1) * 0.25);
        const bokehGrad = ctx.createRadialGradient(x1, y1, 0, x1, y1, bokehRadius);
        bokehGrad.addColorStop(0, `rgba(${palette.indigo}, ${(nodeAlpha0 * (isDarkRef.current ? 0.32 : 0.18)).toFixed(3)})`);
        bokehGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(x1, y1, bokehRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.fillStyle = `rgba(${palette.indigo}, ${nodeAlpha0.toFixed(3)})`;
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
          const midX = (x1 + x2) * 0.5;
          const midY = (y1 + y2) * 0.5;
          const qzFactorLine = getQuietZoneFactor(midX, midY);
          const localBoost = getLocalBoost(midX, midY) * qzFactorLine;

          const stretch = (n1.interactionZone >= 2 || n2.interactionZone >= 2) ? 1.22 : (n1.interactionZone === 1 || n2.interactionZone === 1) ? 1.10 : 1.0;
          const maxDist = CONNECT_DISTANCES[0] * stretch * (1.0 + (localBoost - 1.0) * 0.3);

          if (dist < maxDist) {
            const extraBright = ((n1.wakeActivation || 0) + (n2.wakeActivation || 0)) * 0.3 + ((n1.ambientScanIllumination || 0) + (n2.ambientScanIllumination || 0)) * 0.25;
            const activityAlpha = ((n1.currentOpacity + n2.currentOpacity) * 0.5) * 0.25;

            let lineDistToMouse0 = 9999;
            if (mouse.active) {
              const segDx = x2 - x1;
              const segDy = y2 - y1;
              const segLenSq = segDx * segDx + segDy * segDy;
              if (segLenSq > 1) {
                const t = Math.max(0, Math.min(1, ((mouse.screenX - x1) * segDx + (mouse.screenY - y1) * segDy) / segLenSq));
                lineDistToMouse0 = Math.hypot(mouse.screenX - (x1 + t * segDx), mouse.screenY - (y1 + t * segDy));
              }
            }
            const instantProx0 = (mouse.active && lineDistToMouse0 < 200 * sensitivity)
              ? Math.pow(1 - lineDistToMouse0 / (200 * sensitivity), 1.2) * 0.26 * interactionStrength
              : 0;
            const synapticGlow0 = getSynapticExcitation(`0_${i}_${j}`, instantProx0, nowTime);

            const alpha = Math.min(0.85, (Math.pow(1 - dist / maxDist, 1.5) * palette.lineAlpha * 0.65 * visibility + activityAlpha + synapticGlow0 * 0.32 + extraBright) * localBoost);
            ctx.strokeStyle = `rgba(${palette.indigo}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.75 + (localBoost - 1.0) * 0.35 + (synapticGlow0 > 0.1 ? 0.25 : 0);
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
        const qzFactor1 = getQuietZoneFactor(x1, y1);
        const nodeBoost1 = getLocalBoost(x1, y1) * qzFactor1 * (
          1 + (n1.crossingGlowBoost || 0) * 0.6 + 
          (n1.rippleIllumination || 0) * 1.2 + 
          (n1.wakeActivation || 0) * 0.95 +
          (n1.ambientScanIllumination || 0) * 0.8
        );

        const breathFactor1 = 1.0 + Math.sin(n1.breathingPhase) * 0.16 + Math.cos(n1.breathingPhase * 0.65) * 0.08;
        const nodeAlpha1 = Math.min(1.0, Math.max(0.12, n1.currentOpacity * breathFactor1 * nodeBoost1));

        for (let j = i + 1; j < midNodes.length; j++) {
          const n2 = midNodes[j];
          const idx2 = nodes.indexOf(n2);
          const x2 = n2.x + parallax1X;
          const y2 = n2.y + parallax1Y;
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const midX = (x1 + x2) * 0.5;
          const midY = (y1 + y2) * 0.5;
          const qzFactorLine = getQuietZoneFactor(midX, midY);
          const localBoost = getLocalBoost(midX, midY) * qzFactorLine;

          const stretch = (n1.interactionZone >= 2 || n2.interactionZone >= 2) ? 1.28 : (n1.interactionZone === 1 || n2.interactionZone === 1) ? 1.14 : 1.0;
          const maxDist = CONNECT_DISTANCES[1] * stretch * (1.0 + (localBoost - 1.0) * 0.32);

          if (dist < maxDist) {
            const extraBright = (
              ((n1.crossingGlowBoost || 0) + (n2.crossingGlowBoost || 0)) * 0.45 + 
              ((n1.rippleIllumination || 0) + (n2.rippleIllumination || 0)) * 0.70 +
              ((n1.wakeActivation || 0) + (n2.wakeActivation || 0)) * 0.55 +
              ((n1.ambientScanIllumination || 0) + (n2.ambientScanIllumination || 0)) * 0.4
            );

            // Dynamic connection visibility calculation with segment projection & synaptic decay
            const distFalloff = Math.pow(1 - dist / maxDist, 1.25);
            const jointActivity = ((n1.currentOpacity + n2.currentOpacity) * 0.5) * 0.40;
            
            let lineDistToMouse = 9999;
            if (mouse.active) {
              const segDx = x2 - x1;
              const segDy = y2 - y1;
              const segLenSq = segDx * segDx + segDy * segDy;
              if (segLenSq > 1) {
                const t = Math.max(0, Math.min(1, ((mouse.screenX - x1) * segDx + (mouse.screenY - y1) * segDy) / segLenSq));
                const projX = x1 + t * segDx;
                const projY = y1 + t * segDy;
                lineDistToMouse = Math.hypot(mouse.screenX - projX, mouse.screenY - projY);
              }
            }

            const instantProximity = (mouse.active && lineDistToMouse < 240 * sensitivity) 
              ? Math.pow(1 - lineDistToMouse / (240 * sensitivity), 1.15) * 0.42 * interactionStrength 
              : 0;

            const synapticGlow = getSynapticExcitation(`1_${Math.min(idx1, idx2)}_${Math.max(idx1, idx2)}`, instantProximity, nowTime);

            const alpha = Math.min(0.98, (distFalloff * palette.lineAlpha * 1.20 * visibility + jointActivity + synapticGlow * 0.48 + extraBright) * localBoost);
            ctx.strokeStyle = `rgba(${palette.cyan}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.0 + (localBoost - 1.0) * 0.45 + extraBright * 0.8 + (n1.interactionZone >= 2 ? 0.4 : 0) + (synapticGlow > 0.08 ? 0.38 : 0);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            validConnections.push({ from: idx1, to: idx2, layer: 1 });
          }
        }

        // Draw midground node (normalized, delicate)
        const isHovered1 = n1.interactionZone >= 2 || (nodeBoost1 > 1.25);
        const glowRadius1 = n1.size * 2.4 * (1 + (nodeBoost1 - 1) * 0.25 + (isHovered1 ? 0.4 : 0));
        const glow1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, glowRadius1);
        glow1.addColorStop(0, `rgba(${palette.cyan}, ${(nodeAlpha1 * (isDarkRef.current ? 0.48 : 0.28)).toFixed(3)})`);
        glow1.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow1;
        ctx.beginPath();
        ctx.arc(x1, y1, glowRadius1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${palette.cyan}, ${nodeAlpha1.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x1, y1, n1.size * (1 + (nodeBoost1 - 1) * 0.12), 0, Math.PI * 2);
        ctx.fill();

        // Magical hover starlight glint & ring on midground nodes
        if (isHovered1) {
          ctx.strokeStyle = `rgba(${palette.cyan}, ${(nodeAlpha1 * 0.6).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(x1, y1, n1.size * 2.2, 0, Math.PI * 2);
          ctx.stroke();

          // 4-point sparkle cross
          const sparkSize = n1.size * 1.8;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(nodeAlpha1 * 0.75).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x1 - sparkSize, y1);
          ctx.lineTo(x1 + sparkSize, y1);
          ctx.moveTo(x1, y1 - sparkSize);
          ctx.lineTo(x1, y1 + sparkSize);
          ctx.stroke();
        }
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
        const qzFactor1 = getQuietZoneFactor(x1, y1);
        const nodeBoost2 = getLocalBoost(x1, y1) * qzFactor1 * (
          1 + (n1.crossingGlowBoost || 0) * 0.85 + 
          (n1.rippleIllumination || 0) * 1.55 + 
          (n1.wakeActivation || 0) * 1.15 +
          (n1.ambientScanIllumination || 0) * 0.95
        );

        const breathFactor2 = 1.0 + Math.sin(n1.breathingPhase) * 0.18 + Math.cos(n1.breathingPhase * 0.62) * 0.09;
        const nodeAlpha2 = Math.min(1.0, Math.max(0.18, n1.currentOpacity * breathFactor2 * nodeBoost2));

        for (let j = i + 1; j < fgNodes.length; j++) {
          const n2 = fgNodes[j];
          const idx2 = nodes.indexOf(n2);
          const x2 = n2.x + parallax2X;
          const y2 = n2.y + parallax2Y;
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const midX = (x1 + x2) * 0.5;
          const midY = (y1 + y2) * 0.5;
          const qzFactorLine = getQuietZoneFactor(midX, midY);
          const localBoost = getLocalBoost(midX, midY) * qzFactorLine;

          const stretch = (n1.interactionZone >= 2 || n2.interactionZone >= 2) ? 1.34 : (n1.interactionZone === 1 || n2.interactionZone === 1) ? 1.18 : 1.0;
          const maxDist = CONNECT_DISTANCES[2] * stretch * (1.0 + (localBoost - 1.0) * 0.35);

          if (dist < maxDist) {
            const extraBright = (
              ((n1.crossingGlowBoost || 0) + (n2.crossingGlowBoost || 0)) * 0.55 + 
              ((n1.rippleIllumination || 0) + (n2.rippleIllumination || 0)) * 0.85 +
              ((n1.wakeActivation || 0) + (n2.wakeActivation || 0)) * 0.65 +
              ((n1.ambientScanIllumination || 0) + (n2.ambientScanIllumination || 0)) * 0.45
            );

            // Dynamic connection visibility calculation for foreground layer with synaptic decay
            const distFalloff = Math.pow(1 - dist / maxDist, 1.12);
            const jointActivity = ((n1.currentOpacity + n2.currentOpacity) * 0.5) * 0.48;
            
            let lineDistToMouse = 9999;
            if (mouse.active) {
              const segDx = x2 - x1;
              const segDy = y2 - y1;
              const segLenSq = segDx * segDx + segDy * segDy;
              if (segLenSq > 1) {
                const t = Math.max(0, Math.min(1, ((mouse.screenX - x1) * segDx + (mouse.screenY - y1) * segDy) / segLenSq));
                const projX = x1 + t * segDx;
                const projY = y1 + t * segDy;
                lineDistToMouse = Math.hypot(mouse.screenX - projX, mouse.screenY - projY);
              }
            }

            const instantProximity = (mouse.active && lineDistToMouse < 280 * sensitivity) 
              ? Math.pow(1 - lineDistToMouse / (280 * sensitivity), 1.1) * 0.52 * interactionStrength 
              : 0;

            const synapticGlow = getSynapticExcitation(`2_${Math.min(idx1, idx2)}_${Math.max(idx1, idx2)}`, instantProximity, nowTime);

            const alpha = Math.min(1.0, (distFalloff * palette.lineAlpha * 1.55 * visibility + jointActivity + synapticGlow * 0.58 + extraBright) * localBoost);
            
            // Dual-tone gradient stroke between foreground nodes
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, `rgba(${palette.indigo}, ${alpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${palette.amber}, ${(alpha * 0.88).toFixed(3)})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5 + (localBoost - 1.0) * 0.6 + extraBright * 1.0 + (n1.interactionZone >= 2 ? 0.5 : 0) + (synapticGlow > 0.08 ? 0.52 : 0);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            validConnections.push({ from: idx1, to: idx2, layer: 2 });
          }
        }

        // Luminous flagship node halo & core (normalized, sleek)
        const isHovered2 = n1.interactionZone >= 2 || (nodeBoost2 > 1.3);
        const pulse = 1.0 + Math.sin(n1.phase * 2) * 0.18;
        const fgGlowRadius = n1.size * 2.6 * pulse * (1 + (nodeBoost2 - 1) * 0.25 + (isHovered2 ? 0.45 : 0));
        const fgGlow = ctx.createRadialGradient(x1, y1, 0, x1, y1, fgGlowRadius);
        fgGlow.addColorStop(0, `rgba(${palette.indigo}, ${(nodeAlpha2 * (isDarkRef.current ? 0.58 : 0.32)).toFixed(3)})`);
        fgGlow.addColorStop(0.5, `rgba(${palette.amber}, ${(nodeAlpha2 * (isDarkRef.current ? 0.24 : 0.14)).toFixed(3)})`);
        fgGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = fgGlow;
        ctx.beginPath();
        ctx.arc(x1, y1, fgGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = `rgba(${palette.indigo}, ${nodeAlpha2.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x1, y1, n1.size * (1 + (nodeBoost2 - 1) * 0.14 + (isHovered2 ? 0.2 : 0)), 0, Math.PI * 2);
        ctx.fill();

        // High-contrast pinpoint center
        ctx.fillStyle = isDarkRef.current ? '#ffffff' : '#4338ca';
        ctx.beginPath();
        ctx.arc(x1, y1, Math.max(0.6, n1.size * 0.35 * (1 + (nodeBoost2 - 1) * 0.12)), 0, Math.PI * 2);
        ctx.fill();

        // Magical celestial hover aura & sparkling star glint
        if (isHovered2) {
          // Concentric starlight halo ring
          ctx.strokeStyle = `rgba(${palette.amber}, ${(nodeAlpha2 * 0.65).toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.arc(x1, y1, n1.size * 2.8, 0, Math.PI * 2);
          ctx.stroke();

          // Delicate 4-point starlight glint
          const sparkSize = n1.size * 2.2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(nodeAlpha2 * 0.85).toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(x1 - sparkSize, y1);
          ctx.lineTo(x1 + sparkSize, y1);
          ctx.moveTo(x1, y1 - sparkSize);
          ctx.lineTo(x1, y1 + sparkSize);
          ctx.stroke();
        }
      }

      // ─── 4.2. RENDER ACTIVE CONSTELLATION LOCK VISUALS ───
      const activeLock = constellationLockRef.current;
      if (activeLock && activeLock.active && motionEnabled && !prefersReducedMotion) {
        const elapsed = nowTime - activeLock.startTime;
        const progress = elapsed / activeLock.duration;
        const weight = Math.sin(progress * Math.PI);

        if (weight > 0.02) {
          ctx.save();
          const lockAlpha = weight * (isDarkRef.current ? 0.45 : 0.28);
          ctx.strokeStyle = `rgba(${palette.cyan}, ${lockAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.0;
          ctx.setLineDash([3, 3]);

          // Draw polygon connections between anchored constellation nodes
          const cIndices = activeLock.nodeIndices;
          ctx.beginPath();
          for (let k = 0; k < cIndices.length; k++) {
            const nodeK = nodes[cIndices[k]];
            if (!nodeK) continue;
            const pX = mouse.currentX * (0.009 * (nodeK.layer + 1));
            const pY = mouse.currentY * (0.009 * (nodeK.layer + 1));
            const kX = nodeK.x + pX;
            const kY = nodeK.y + pY;

            if (k === 0) ctx.moveTo(kX, kY);
            else ctx.lineTo(kX, kY);
          }
          ctx.closePath();
          ctx.stroke();

          // Subtle constellation centroid data glyph
          const glyphPulse = 1.0 + Math.sin(nowTime * 0.005) * 0.2;
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(${palette.amber}, ${(weight * (isDarkRef.current ? 0.6 : 0.35)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(activeLock.centerX, activeLock.centerY, 2.5 * glyphPulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ─── 4.5. ANALYTICAL ORBITAL GEOMETRY & TELEMETRY ───
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

      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(${palette.indigo}, ${(geoAlpha * 0.8).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(trNode1X, trNode1Y, 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.65).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(trNode3X, trNode3Y, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.amber}, ${(geoAlpha * 0.85).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(trNode2X, trNode2Y, 1.6, 0, Math.PI * 2);
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
      ctx.arc(mlNode1X, mlNode1Y, 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.amber}, ${(geoAlpha * 0.8).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(mlNode2X, mlNode2Y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.cyan}, ${(geoAlpha * 0.6).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(mlNode3X, mlNode3Y, 1.2, 0, Math.PI * 2);
      ctx.fill();

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
      ctx.arc(bpNode1X, bpNode1Y, 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${palette.amber}, ${(geoAlpha * 0.75).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(bpNode2X, bpNode2Y, 1.6, 0, Math.PI * 2);
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

      // ─── 4.8. RENDER ENERGY RIPPLES & MICRO-SPARKS ───
      if (motionEnabled && !prefersReducedMotion) {
        // Ripples
        const remainingRipples: EnergyRipple[] = [];
        for (let i = 0; i < energyRipplesRef.current.length; i++) {
          const rip = energyRipplesRef.current[i];
          rip.radius += rip.speed * particleSpeed;
          rip.opacity = Math.max(0, 1 - (rip.radius / rip.maxRadius));

          // Dynamic wavefront node illumination: illuminates and gently nudges nodes as the wave expands past them
          const waveFrontThick = (rip.isClickRipple ? 52 : 30) * Math.max(0.7, particleSpeed * 0.8);
          for (let nIdx = 0; nIdx < nodes.length; nIdx++) {
            const n = nodes[nIdx];
            const dx = n.x - rip.x;
            const dy = n.y - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < rip.maxRadius && Math.abs(dist - rip.radius) < waveFrontThick) {
              const waveIntensity = (1 - Math.abs(dist - rip.radius) / waveFrontThick) * rip.opacity;
              n.rippleIllumination = Math.max(n.rippleIllumination || 0, waveIntensity * (rip.isClickRipple ? 0.95 : 0.65));
              
              if (dist > 1 && waveIntensity > 0.08) {
                const push = waveIntensity * (rip.isClickRipple ? 0.22 : 0.08) * (n.depth + 0.25) * particleSpeed;
                n.vx += (dx / dist) * push;
                n.vy += (dy / dist) * push;
              }
            }
          }

          if (rip.radius < rip.maxRadius && rip.opacity > 0.01) {
            const color = rip.colorType === 'amber' ? palette.amber : rip.colorType === 'cyan' ? palette.cyan : palette.indigo;

            if (rip.isClickRipple) {
              // 1. Soft atmospheric wave halo band (faint radial gradient)
              const haloRadiusInner = Math.max(0, rip.radius - 32);
              const haloRadiusOuter = rip.radius + 18;
              const haloGrad = ctx.createRadialGradient(rip.x, rip.y, haloRadiusInner, rip.x, rip.y, haloRadiusOuter);
              haloGrad.addColorStop(0, `rgba(${color}, 0)`);
              haloGrad.addColorStop(0.65, `rgba(${color}, ${(rip.opacity * (isDarkRef.current ? 0.16 : 0.08)).toFixed(3)})`);
              haloGrad.addColorStop(1, `rgba(${color}, 0)`);
              ctx.fillStyle = haloGrad;
              ctx.beginPath();
              ctx.arc(rip.x, rip.y, haloRadiusOuter, 0, Math.PI * 2);
              ctx.fill();

              // 2. Faint primary circular wave stroke
              ctx.strokeStyle = `rgba(${color}, ${(rip.opacity * (isDarkRef.current ? 0.65 : 0.42)).toFixed(3)})`;
              ctx.lineWidth = Math.max(0.7, 2.0 * rip.opacity);
              ctx.beginPath();
              ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
              ctx.stroke();

              // 3. Faint secondary trailing concentric ring for depth and polish
              if (rip.radius > 22) {
                ctx.setLineDash([4, 6]);
                ctx.strokeStyle = `rgba(${color}, ${(rip.opacity * (isDarkRef.current ? 0.32 : 0.18)).toFixed(3)})`;
                ctx.lineWidth = 0.85;
                ctx.beginPath();
                ctx.arc(rip.x, rip.y, rip.radius - 14, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            } else {
              // Standard crossing event ripple
              ctx.strokeStyle = `rgba(${color}, ${(rip.opacity * (isDarkRef.current ? 0.55 : 0.35)).toFixed(3)})`;
              ctx.lineWidth = Math.max(0.6, 1.8 * rip.opacity);
              ctx.beginPath();
              ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
              ctx.stroke();
            }

            remainingRipples.push(rip);
          }
        }
        energyRipplesRef.current = remainingRipples;

        // Micro-sparks
        const remainingSparks: MicroSpark[] = [];
        for (let i = 0; i < microSparksRef.current.length; i++) {
          const sp = microSparksRef.current[i];
          sp.x += sp.vx * particleSpeed;
          sp.y += sp.vy * particleSpeed;
          sp.vx *= 0.94;
          sp.vy *= 0.94;
          sp.life--;

          if (sp.life > 0) {
            const fade = sp.life / sp.maxLife;
            const color = sp.colorType === 'amber' ? palette.amber : sp.colorType === 'cyan' ? palette.cyan : palette.indigo;
            ctx.fillStyle = `rgba(${color}, ${(fade * (isDarkRef.current ? 0.9 : 0.7)).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size * fade, 0, Math.PI * 2);
            ctx.fill();

            remainingSparks.push(sp);
          }
        }
        microSparksRef.current = remainingSparks;
      }

      // ─── 5. FLOWING DATA SIGNALS & LUMINOUS PULSES (WITH DATA PULSE CHAIN LOGIC) ───
      if (motionEnabled && !prefersReducedMotion) {
        maybeSpawnSignal(validConnections, scroll.activeSection);

        const remainingSignals: DataSignal[] = [];
        let completedCount = 0;
        const newChainedSignals: DataSignal[] = [];

        for (let i = 0; i < signalsRef.current.length; i++) {
          const sig = signalsRef.current[i];
          if (sig.progress >= 1.0) {
            completedCount++;

            // 3. DATA PULSE CHAIN: Occasionally allow an energy pulse reaching a node to continue through 1-2 connected paths with reduced intensity
            const chainDepth = sig.chainDepth || 0;
            if (chainDepth < 2 && (nowTime - lastChainedPulseTimeRef.current > 650)) {
              // Intelligent probability check (rare, ~22% for depth 0, ~12% for depth 1)
              const chainChance = (chainDepth === 0 ? 0.22 : 0.12) * pulseFrequency;
              if (Math.random() < chainChance && validConnections.length > 0) {
                lastChainedPulseTimeRef.current = nowTime;
                const destNodeIdx = sig.toIndex;
                
                // Illuminate the destination node
                if (nodes[destNodeIdx]) {
                  nodes[destNodeIdx].rippleIllumination = Math.max(nodes[destNodeIdx].rippleIllumination || 0, 0.75 * (sig.intensity || 1.0));
                  nodes[destNodeIdx].crossingGlowBoost = Math.max(nodes[destNodeIdx].crossingGlowBoost || 0, 0.45);
                }

                // Find valid outbound connections starting from destNodeIdx (excluding the incoming link)
                const candidateOutbound = validConnections.filter(
                  c => (c.from === destNodeIdx && c.to !== sig.fromIndex) || (c.to === destNodeIdx && c.from !== sig.fromIndex)
                );

                if (candidateOutbound.length > 0) {
                  const pickCount = Math.min(candidateOutbound.length, Math.random() < 0.28 ? 2 : 1);
                  for (let p = 0; p < pickCount; p++) {
                    const pickedConn = candidateOutbound[p];
                    const nextFrom = destNodeIdx;
                    const nextTo = pickedConn.from === destNodeIdx ? pickedConn.to : pickedConn.from;
                    const nextIntensity = (sig.intensity || 1.0) * 0.65; // attenuated

                    newChainedSignals.push({
                      fromIndex: nextFrom,
                      toIndex: nextTo,
                      progress: 0,
                      speed: (0.014 + Math.random() * 0.016) * particleSpeed,
                      type: sig.type,
                      size: Math.max(1.6, sig.size * 0.75),
                      chainDepth: chainDepth + 1,
                      intensity: nextIntensity,
                    });
                  }
                }
              }
            }
          } else {
            remainingSignals.push(sig);
          }
        }

        // Add newly spawned chained signals (respecting max signal count)
        for (let c = 0; c < newChainedSignals.length; c++) {
          if (remainingSignals.length < 24) {
            remainingSignals.push(newChainedSignals[c]);
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

          const pFromX = mouse.currentX * (0.009 * (nFrom.layer + 1));
          const pFromY = mouse.currentY * (0.009 * (nFrom.layer + 1));
          const pToX = mouse.currentX * (0.009 * (nTo.layer + 1));
          const pToY = mouse.currentY * (0.009 * (nTo.layer + 1));

          const startX = nFrom.x + pFromX;
          const startY = nFrom.y + pFromY;
          const endX = nTo.x + pToX;
          const endY = nTo.y + pToY;

          const curX = startX + (endX - startX) * sig.progress;
          const curY = startY + (endY - startY) * sig.progress;

          const qzFactorSig = getQuietZoneFactor(curX, curY);
          const sigIntensity = (sig.intensity || 1.0) * qzFactorSig;

          const fade = Math.sin(sig.progress * Math.PI) * sigIntensity;
          const color = sig.type === 'amber' ? palette.amber : sig.type === 'cyan' ? palette.cyan : palette.indigo;

          // Trail particle
          const trailProgress = Math.max(0, sig.progress - 0.08);
          const trailX = startX + (endX - startX) * trailProgress;
          const trailY = startY + (endY - startY) * trailProgress;

          ctx.strokeStyle = `rgba(${color}, ${(fade * 0.48).toFixed(3)})`;
          ctx.lineWidth = sig.size * 0.75;
          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(curX, curY);
          ctx.stroke();

          // Glowing pulse head
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

      // ─── 6. MAGICAL CURSOR CELESTIAL FILAMENTS & STARDUST WAKE PARTICLES ───
      if (motionEnabled && !prefersReducedMotion) {
        // A. Magical Celestial Hover Tendrils: Connect cursor to 2-3 closest nodes with shimmering light filaments
        if (mouse.active) {
          const mX = mouse.screenX;
          const mY = mouse.screenY;
          const nearNodes: Array<{ node: NeuralNode; dist: number; scrX: number; scrY: number }> = [];

          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const pX = mouse.currentX * 0.009 * (n.layer + 1);
            const pY = mouse.currentY * 0.009 * (n.layer + 1);
            const scrX = n.x + pX;
            const scrY = n.y + pY;
            const dx = scrX - mX;
            const dy = scrY - mY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 155) {
              nearNodes.push({ node: n, dist, scrX, scrY });
            }
          }

          nearNodes.sort((a, b) => a.dist - b.dist);
          const topNear = nearNodes.slice(0, 3);

          for (let k = 0; k < topNear.length; k++) {
            const item = topNear[k];
            const filamentFactor = Math.pow(1 - item.dist / 155, 1.25);
            const filAlpha = filamentFactor * (isDarkRef.current ? 0.42 : 0.26);

            // Shimmering filament gradient
            const filGrad = ctx.createLinearGradient(mX, mY, item.scrX, item.scrY);
            filGrad.addColorStop(0, `rgba(${palette.amber}, ${filAlpha.toFixed(3)})`);
            filGrad.addColorStop(0.5, `rgba(${palette.cyan}, ${(filAlpha * 0.85).toFixed(3)})`);
            filGrad.addColorStop(1, `rgba(${palette.indigo}, ${(filAlpha * 0.45).toFixed(3)})`);

            ctx.strokeStyle = filGrad;
            ctx.lineWidth = 0.9 * filamentFactor + 0.3;
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(mX, mY);
            ctx.lineTo(item.scrX, item.scrY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Flowing stardust bead along the celestial filament
            const beadProgress = ( (nowTime * 0.0012 + k * 0.33) % 1.0 );
            const beadX = mX + (item.scrX - mX) * beadProgress;
            const beadY = mY + (item.scrY - mY) * beadProgress;
            const beadAlpha = Math.sin(beadProgress * Math.PI) * filamentFactor * (isDarkRef.current ? 0.75 : 0.55);

            ctx.fillStyle = `rgba(255, 255, 255, ${beadAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(beadX, beadY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // B. Magical Stardust & Twinkling Sparkle Particles
        const wakes = wakeParticlesRef.current;

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

        for (let i = 0; i < wakes.length; i++) {
          const p = wakes[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.93;
          p.vy *= 0.93;
          p.life--;

          if (p.rotation !== undefined && p.rotSpeed !== undefined) {
            p.rotation += p.rotSpeed;
          }

          const progress = Math.max(0, p.life / p.maxLife);
          const fade = Math.pow(progress, 1.4);
          const color = p.colorType === 'amber' ? palette.amber : p.colorType === 'cyan' ? palette.cyan : palette.indigo;

          if (p.isStar) {
            // Render Magical 4-Point Twinkling Sparkle Star
            const twinkle = Math.sin((p.sparklePhase || 0) + (1 - progress) * 8) * 0.35 + 0.65;
            const starRadius = p.size * progress * twinkle;
            const rot = p.rotation || 0;
            const innerR = starRadius * 0.22;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(rot);

            // Soft star glow halo
            const sGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, starRadius * 2.2);
            sGlow.addColorStop(0, `rgba(${color}, ${(fade * 0.4 * p.opacity).toFixed(3)})`);
            sGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = sGlow;
            ctx.beginPath();
            ctx.arc(0, 0, starRadius * 2.2, 0, Math.PI * 2);
            ctx.fill();

            // 4-point star shape
            ctx.fillStyle = `rgba(255, 255, 255, ${(fade * 0.95 * p.opacity).toFixed(3)})`;
            ctx.beginPath();
            for (let s = 0; s < 4; s++) {
              const a1 = (s * Math.PI) / 2;
              const a2 = a1 + Math.PI / 4;
              if (s === 0) ctx.moveTo(Math.cos(a1) * starRadius, Math.sin(a1) * starRadius);
              else ctx.lineTo(Math.cos(a1) * starRadius, Math.sin(a1) * starRadius);
              ctx.lineTo(Math.cos(a2) * innerR, Math.sin(a2) * innerR);
            }
            ctx.closePath();
            ctx.fill();

            ctx.restore();
          } else {
            // Render Delicate Glowing Stardust Mote
            const glowRadius = p.size * (2.2 + (1 - progress) * 1.2);
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
            glow.addColorStop(0, `rgba(${color}, ${(fade * (isDarkRef.current ? 0.38 : 0.22) * p.opacity).toFixed(3)})`);
            glow.addColorStop(0.55, `rgba(${color}, ${(fade * (isDarkRef.current ? 0.14 : 0.07) * p.opacity).toFixed(3)})`);
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(${color}, ${(fade * (isDarkRef.current ? 0.85 : 0.65) * p.opacity).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, p.size * 0.7 * progress), 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255, 255, 255, ${(fade * (isDarkRef.current ? 0.92 : 0.78) * p.opacity).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.3, p.size * 0.3 * progress), 0, Math.PI * 2);
            ctx.fill();
          }
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

    rafRef.current = requestAnimationFrame(animationLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('pointermove', handleGlobalPointerMove, true);
      window.removeEventListener('mousemove', handleGlobalPointerMove, true);
      window.removeEventListener('pointerdown', handleBackgroundPointerDown);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      themeObserver.disconnect();
    };
  }, [canvasRef, containerRef, mouseCoordsRef, motionEnabled, nodeDensityMultiplier, connectionDensity, pulseFrequency, particleSpeed, systemPrefersReducedMotion, sensitivity, visibility, interactionStrength]);
}
