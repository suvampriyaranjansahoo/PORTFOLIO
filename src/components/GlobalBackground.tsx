import React, { useRef, useEffect, Component, ReactNode, ErrorInfo } from 'react';
import { useLivingNeuralBackground, MouseCoordinates } from '../utils/useLivingNeuralBackground';
import { NeuralSettings } from '../types';
import {
  Global3DBackground,
  CameraParallax,
  DecisionBoundaryPlane,
  NeuralPointCloudGroup,
} from './Global3DBackground';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  DepthOfFieldEffect,
  VignetteEffect
} from 'postprocessing';

/**
 * ThreeCanvasErrorBoundary
 * Catches any WebGL / Fiber / EffectComposer initialization errors gracefully
 * so 2D background and full portfolio remain fully functional on any GPU.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo?: string;
}

export class ThreeCanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[GlobalBackground] 3D Scene / Postprocessing caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Re-export postprocessing primitives for seamless composability
export { EffectComposer, BloomEffect as Bloom, DepthOfFieldEffect as DepthOfField, VignetteEffect as Vignette };

/**
 * GlobalBackground Component
 * 
 * 6-Layer Advanced Living 3D Neural Universe & Atmosphere:
 * - Layer 1: Deep atmospheric base (`--page-bg`) with seamless theme transitions.
 * - Layer 2: Independent drifting radial/elliptical ambient nebulae (Indigo, Amber, Cyan) with 20s-56s orbital periods.
 * - Layer 3: Distant neural network (Layer 0 on Canvas with low opacity bokeh and 1-3px parallax).
 * - Layer 4: Mid-distance neural connectivity mesh (Layer 1 on Canvas with active connection stretching and 3-7px parallax).
 * - Layer 5: Foreground flagship neural nodes & flowing luminous data signals (Layer 2 on Canvas with 5-12px parallax & gravity physics).
 * - Layer 6: 3D Depth Layer (PerspectiveCamera parallax, Decision Boundary plane at z=-12, point cloud at z=-4 to z=2, Bloom, Depth of Field & Vignette EffectComposer).
 * - Layer 7: Floating analytical geometry (slowly rotating orbital paths, dimensional arcs, telemetry coordinate markers).
 * - Layer 8: Portfolio content (intact, non-interfering).
 */
export interface GlobalBackgroundProps {
  motionEnabled?: boolean;
  nodeDensity?: number;
  connectionDensity?: number;
  pulseFrequency?: number;
  particleSpeed?: number;
  sensitivity?: number;
  visibility?: number;
  interactionStrength?: number;
  settings?: Partial<NeuralSettings>;
  systemPrefersReducedMotion?: boolean;
}

export const GlobalBackground: React.FC<GlobalBackgroundProps> = React.memo(({ 
  motionEnabled = true, 
  nodeDensity = 1.0,
  connectionDensity: propConnectionDensity,
  pulseFrequency: propPulseFrequency,
  particleSpeed: propParticleSpeed,
  sensitivity: propSensitivity,
  visibility: propVisibility,
  interactionStrength: propInteractionStrength,
  settings,
  systemPrefersReducedMotion
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectiveConnectionDensity = propConnectionDensity ?? settings?.connectionDensity ?? 1.0;
  const effectivePulseFrequency = propPulseFrequency ?? settings?.pulseFrequency ?? 1.0;
  const effectiveParticleSpeed = propParticleSpeed ?? settings?.particleSpeed ?? 1.0;
  const effectiveSensitivity = propSensitivity ?? settings?.sensitivity ?? 1.4;
  const effectiveVisibility = propVisibility ?? settings?.visibility ?? 1.2;
  const effectiveInteractionStrength = propInteractionStrength ?? settings?.interactionStrength ?? 1.2;

  // Store cursor's clientX and clientY in a ref for global tracking without unnecessary re-renders
  const mouseCoordsRef = useRef<MouseCoordinates>({
    clientX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    clientY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    offsetX: 0,
    offsetY: 0,
    active: false,
  });

  // Track mouse movement globally on the window and pass coordinates to all child layers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      mouseCoordsRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        offsetX,
        offsetY,
        active: true,
      };

      // Reflect mouse coordinates directly on document.documentElement for global native CSS var() usage across all cards
      const root = document.documentElement;
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
      root.style.setProperty('--bg-mouse-x', `${offsetX.toFixed(2)}px`);
      root.style.setProperty('--bg-mouse-y', `${offsetY.toFixed(2)}px`);

      if (containerRef.current) {
        containerRef.current.style.setProperty('--cursor-x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--cursor-y', `${e.clientY}px`);
        containerRef.current.style.setProperty('--bg-mouse-x', `${offsetX.toFixed(2)}px`);
        containerRef.current.style.setProperty('--bg-mouse-y', `${offsetY.toFixed(2)}px`);
      }
    };

    const handleMouseLeave = () => {
      mouseCoordsRef.current.active = false;
      mouseCoordsRef.current.offsetX = 0;
      mouseCoordsRef.current.offsetY = 0;
      
      const root = document.documentElement;
      root.style.setProperty('--bg-mouse-x', '0px');
      root.style.setProperty('--bg-mouse-y', '0px');

      if (containerRef.current) {
        containerRef.current.style.setProperty('--bg-mouse-x', '0px');
        containerRef.current.style.setProperty('--bg-mouse-y', '0px');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useLivingNeuralBackground(
    canvasRef, 
    containerRef, 
    mouseCoordsRef, 
    motionEnabled, 
    nodeDensity,
    effectiveConnectionDensity,
    effectivePulseFrequency,
    effectiveParticleSpeed,
    systemPrefersReducedMotion,
    effectiveSensitivity,
    effectiveVisibility,
    effectiveInteractionStrength
  );

  return (
    <div
      ref={containerRef}
      id="global-page-background"
      aria-hidden="true"
      data-motion-active={motionEnabled ? "true" : "false"}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* ─── LAYER 1: BASE ATMOSPHERIC BASE (LIGHT & DARK) ─── */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: 'var(--page-bg)' }}
      />

      {/* ─── LAYER 2: SLOWLY MOVING AMBIENT LIGHT SOURCES (20s - 60s DRIFT + DEPTH PARALLAX) ─── */}
      {/* Light Mode Atmosphere across Entire Screen */}
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-700 pointer-events-none"
        style={{
          transform: 'translate3d(calc(var(--bg-mouse-x, 0px) * -0.012), calc(var(--bg-mouse-y, 0px) * -0.012), 0)',
          willChange: 'transform',
        }}
      >
        {/* Soft cool-indigo nebula (top-right drifting) */}
        <div
          className="ambient-light ambient-light-indigo absolute -top-[10%] -right-[8%] w-[900px] h-[900px] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.16) 0%, rgba(199, 210, 254, 0.18) 40%, transparent 70%)',
          }}
        />
        {/* Warm amber energy field (mid-left drifting) */}
        <div
          className="ambient-light ambient-light-amber absolute top-[30%] -left-[10%] w-[850px] h-[850px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(217, 139, 24, 0.13) 0%, rgba(254, 243, 199, 0.20) 45%, transparent 72%)',
          }}
        />
        {/* Central analytical atmospheric glow (behind main section cards) */}
        <div
          className="ambient-light ambient-light-cyan absolute top-[52%] left-[22%] w-[850px] h-[850px] rounded-full blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, rgba(224, 231, 255, 0.16) 48%, transparent 70%)',
          }}
        />
        {/* Soft cyan analytical glow (lower right & bottom) */}
        <div
          className="ambient-light ambient-light-cyan absolute bottom-[4%] right-[6%] w-[900px] h-[900px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(8, 145, 178, 0.12) 0%, rgba(224, 231, 255, 0.20) 50%, transparent 72%)',
          }}
        />
      </div>

      {/* Dark Mode Analytical Universe Atmosphere across Entire Screen */}
      <div 
        className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          transform: 'translate3d(calc(var(--bg-mouse-x, 0px) * -0.014), calc(var(--bg-mouse-y, 0px) * -0.014), 0)',
          willChange: 'transform',
        }}
      >
        {/* Deep electric indigo primary nebula (top right) */}
        <div
          className="ambient-light ambient-light-indigo absolute -top-[10%] -right-[10%] w-[1000px] h-[1000px] rounded-full blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.30) 0%, rgba(49, 46, 129, 0.18) 42%, transparent 72%)',
          }}
        />
        {/* Restrained amber ambient core (mid left) */}
        <div
          className="ambient-light ambient-light-amber absolute top-[30%] -left-[8%] w-[880px] h-[880px] rounded-full blur-[180px]"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(180, 83, 9, 0.08) 45%, transparent 70%)',
          }}
        />
        {/* Central luminous analytical nebula (covering center of all sections) */}
        <div
          className="ambient-light ambient-light-indigo absolute top-[50%] left-[18%] w-[950px] h-[950px] rounded-full blur-[170px]"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.18) 0%, rgba(30, 27, 75, 0.14) 46%, transparent 72%)',
          }}
        />
        {/* Deep cyan / data field (lower right) */}
        <div
          className="ambient-light ambient-light-cyan absolute bottom-[4%] right-[4%] w-[950px] h-[950px] rounded-full blur-[170px]"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(67, 56, 202, 0.12) 48%, transparent 72%)',
          }}
        />
      </div>

      {/* ─── MATHEMATICAL DRAFTING GRID (FULL VIEWPORT COVERAGE) ─── */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-45 dark:opacity-30 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 50%, transparent 95%)',
          transform: 'translate3d(calc(var(--bg-mouse-x, 0px) * 0.004), calc(var(--bg-mouse-y, 0px) * 0.004), 0)',
        }}
      />

      {/* ─── UNIFIED PERFORMANT NEURAL CANVAS (DISTANT, MID, FOREGROUND, ANALYTICAL GEOMETRY & DATA SIGNALS) ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* ─── 3D SPATIAL DEPTH SCENE WITH PERSPECTIVE CAMERA PARALLAX & POST-PROCESSING (SAFE ERROR BOUNDARY) ─── */}
      <ThreeCanvasErrorBoundary>
        <Global3DBackground motionEnabled={motionEnabled && !systemPrefersReducedMotion} />
      </ThreeCanvasErrorBoundary>

      {/* ─── VIGNETTE FOR CLEAN CINEMATIC DEPTH ─── */}
      <div
        className="absolute inset-0 opacity-35 dark:opacity-65 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 80% 80% at 50% 50%, transparent 60%, rgba(10, 14, 22, 0.4) 100%)',
          zIndex: 3,
        }}
      />
    </div>
  );
});
