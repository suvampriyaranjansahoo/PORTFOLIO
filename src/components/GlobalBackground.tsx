import React, { useRef, useEffect } from 'react';
import { useLivingNeuralBackground, MouseCoordinates } from '../utils/useLivingNeuralBackground';

/**
 * GlobalBackground Component
 * 
 * 6-Layer Advanced Living 3D Neural Universe & Atmosphere:
 * - Layer 1: Deep atmospheric base (`--page-bg`) with seamless theme transitions.
 * - Layer 2: Independent drifting radial/elliptical ambient nebulae (Indigo, Amber, Cyan) with 20s-56s orbital periods.
 * - Layer 3: Distant neural network (Layer 0 on Canvas with low opacity bokeh and 1-3px parallax).
 * - Layer 4: Mid-distance neural connectivity mesh (Layer 1 on Canvas with active connection stretching and 3-7px parallax).
 * - Layer 5: Foreground flagship neural nodes & flowing luminous data signals (Layer 2 on Canvas with 5-12px parallax & gravity physics).
 * - Layer 6: Floating analytical geometry (slowly rotating orbital paths, dimensional arcs, telemetry coordinate markers).
 * - Layer 7: Portfolio content (intact, non-interfering).
 */
export const GlobalBackground: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useLivingNeuralBackground(canvasRef, containerRef, mouseCoordsRef);

  return (
    <div
      ref={containerRef}
      id="global-page-background"
      aria-hidden="true"
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

      {/* ─── LAYERS 3, 4, 5: LIVING 3D NEURAL CANVAS (DISTANT, MID, FOREGROUND & DATA SIGNALS) ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* ─── LAYER 6: FLOATING ANALYTICAL GEOMETRY & ORBITAL PATHS ─── */}
      <svg
        className="absolute inset-0 w-full h-full text-slate-400/25 dark:text-indigo-400/20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ 
          zIndex: 2,
          transform: 'translate3d(calc(var(--bg-mouse-x, 0px) * 0.016), calc(var(--bg-mouse-y, 0px) * 0.016), 0)',
          willChange: 'transform',
        }}
      >
        <defs>
          <linearGradient id="vector-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="amber-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d98b18" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d98b18" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Top-Right Orbital Arcs & Dimensional Paths */}
        <g className="opacity-75 dark:opacity-85">
          <ellipse
            className="neural-orbit neural-orbit-slow"
            cx="92%"
            cy="8%"
            rx="460"
            ry="260"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            transform="rotate(-15, 1200, 100)"
          />
          <ellipse
            className="neural-orbit"
            cx="92%"
            cy="8%"
            rx="680"
            ry="380"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="0.85"
            transform="rotate(-15, 1200, 100)"
          />
          <circle cx="82%" cy="14%" r="2.2" className="data-node fill-indigo-500/50 dark:fill-indigo-400/70" />
          <circle cx="75%" cy="6%" r="1.6" className="data-node data-node-delayed fill-slate-400/40 dark:fill-indigo-300/60" />
          <circle cx="94%" cy="22%" r="2.8" className="data-node data-node-amber fill-amber-500/50 dark:fill-amber-400/70" />
          <line
            x1="82%"
            y1="14%"
            x2="94%"
            y2="22%"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 4"
            className="opacity-45"
          />
          <g className="data-label text-slate-500/50 dark:text-indigo-300/60">
            <text x="73%" y="10%">DIM_768</text>
            <text x="88%" y="27%">LAT: 12ms</text>
          </g>
        </g>

        {/* Mid-Left Vector Coordinates & Orbital Geometry */}
        <g className="opacity-65 dark:opacity-75">
          <ellipse
            className="neural-orbit neural-orbit-slow"
            cx="6%"
            cy="48%"
            rx="540"
            ry="320"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="1"
            strokeDasharray="6 10"
            transform="rotate(22, 100, 500)"
          />
          <circle cx="8%" cy="42%" r="2.2" className="data-node data-node-delayed fill-indigo-500/50 dark:fill-indigo-400/70" />
          <circle cx="14%" cy="54%" r="2.4" className="data-node data-node-amber fill-amber-500/50 dark:fill-amber-400/70" />
          <circle cx="4%" cy="60%" r="1.8" className="data-node fill-slate-400/40 dark:fill-slate-500/50" />
          <line
            x1="8%"
            y1="42%"
            x2="14%"
            y2="54%"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 3"
            className="opacity-35"
          />
          <line
            x1="14%"
            y1="54%"
            x2="4%"
            y2="60%"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 3"
            className="opacity-25"
          />

          {/* Precision Crosshairs */}
          <g className="text-slate-400/40 dark:text-indigo-400/40">
            <line x1="2%" y1="36%" x2="4%" y2="36%" stroke="currentColor" strokeWidth="1" />
            <line x1="3%" y1="35%" x2="3%" y2="37%" stroke="currentColor" strokeWidth="1" />
          </g>
          <g className="data-label text-slate-500/45 dark:text-indigo-300/60">
            <text x="5%" y="39%">NODE_04</text>
            <text x="12%" y="64%">SYNC: OK</text>
          </g>
        </g>

        {/* Bottom Peripheral Geometry */}
        <g className="opacity-55 dark:opacity-65">
          <ellipse
            className="neural-orbit"
            cx="88%"
            cy="88%"
            rx="500"
            ry="280"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="0.85"
            strokeDasharray="8 12"
          />
          <circle cx="80%" cy="84%" r="2.2" className="data-node data-node-delayed fill-indigo-500/50 dark:fill-indigo-400/60" />
          <circle cx="91%" cy="92%" r="2.8" className="data-node data-node-amber fill-amber-500/40 dark:fill-amber-400/60" />
          <line
            x1="80%"
            y1="84%"
            x2="91%"
            y2="92%"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            className="opacity-35"
          />
          <g className="text-slate-400/35 dark:text-indigo-400/30">
            <line x1="96%" y1="78%" x2="98%" y2="78%" stroke="currentColor" strokeWidth="1" />
            <line x1="97%" y1="77%" x2="97%" y2="79%" stroke="currentColor" strokeWidth="1" />
          </g>
          <g className="data-label text-slate-500/45 dark:text-cyan-200/55">
            <text x="84%" y="80%">VECTOR / 03</text>
          </g>
        </g>
      </svg>

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
