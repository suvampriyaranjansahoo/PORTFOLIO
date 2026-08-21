import React, { useRef } from 'react';
import { useSignatureSpotlight } from '../utils/useSignatureSpotlight';

/**
 * GlobalBackground Component
 * 
 * Renders a fixed, non-interactive (pointer-events-none) analytical atmospheric background
 * with dark mode "analytical universe" (obsidian base, indigo radials, restrained amber glow,
 * faint mathematical grid, sparse constellation nodes, subtle orbital arcs) and light mode
 * "sophisticated workspace" (warm-white base, cool-gray/indigo washes, amber highlights,
 * low-opacity analytical drafting grid and geometric guides).
 * 
 * Entirely decoupled from content to guarantee zero text, layout, or interaction changes.
 */
export const GlobalBackground: React.FC = React.memo(() => {
  const rootRef = useRef<HTMLDivElement>(null);
  useSignatureSpotlight(rootRef);

  return (
    <div
      ref={rootRef}
      id="global-page-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
      style={{
        // @ts-ignore - custom properties consumed by .signature-spotlight below
        '--spotlight-x': '50%',
        '--spotlight-y': '30%',
        '--spotlight-opacity': '0',
      }}
    >
      {/* ─── SIGNATURE INTERACTION: cursor-aware spotlight ───
          Pure CSS radial gradient positioned via custom properties written
          by useSignatureSpotlight. Raises grid/node visibility near the
          cursor without any per-frame React re-render. */}
      <div className="signature-spotlight absolute inset-0 transition-opacity duration-500" />
      {/* ─── 1. BASE ATMOSPHERIC GRADIENTS (LIGHT & DARK) ─── */}
      <div className="absolute inset-0 transition-opacity duration-700" style={{ background: 'var(--page-bg)' }} />

      {/* Light Mode Atmospheric Radiance */}
      <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-700">
        {/* Soft cool-slate / indigo radiance at top-right */}
        <div
          className="absolute -top-[10%] -right-[10%] w-[900px] h-[900px] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.22) 0%, rgba(199, 210, 254, 0.20) 36%, transparent 70%)',
          }}
        />
        {/* Restrained warm amber highlight at mid-left */}
        <div
          className="absolute top-[35%] -left-[15%] w-[800px] h-[800px] rounded-full blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(217, 139, 24, 0.17) 0%, rgba(254, 243, 199, 0.25) 48%, transparent 72%)',
          }}
        />
        {/* Soft geometric slate atmosphere at bottom */}
        <div
          className="absolute bottom-[5%] right-[10%] w-[850px] h-[850px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(224, 231, 255, 0.24) 50%, transparent 72%)',
          }}
        />
      </div>

      {/* Dark Mode Analytical Universe Atmosphere */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700">
        {/* Deep primary indigo nebula at top-right */}
        <div
          className="absolute -top-[12%] -right-[12%] w-[1000px] h-[1000px] rounded-full blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.36) 0%, rgba(49, 46, 129, 0.18) 44%, transparent 72%)',
          }}
        />
        {/* Extremely restrained warm amber ambient glow mid-left */}
        <div
          className="absolute top-[38%] -left-[12%] w-[850px] h-[850px] rounded-full blur-[180px]"
          style={{
            background: 'radial-gradient(circle, rgba(217, 139, 24, 0.18) 0%, rgba(180, 83, 9, 0.09) 42%, transparent 70%)',
          }}
        />
        {/* Deep cyan/slate data field at lower right */}
        <div
          className="absolute bottom-[8%] right-[5%] w-[950px] h-[950px] rounded-full blur-[170px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(67, 56, 202, 0.12) 45%, transparent 72%)',
          }}
        />
      </div>

      {/* ─── 2. MATHEMATICAL ANALYTICAL GRID ─── */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse 95% 85% at 50% 35%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 35%, black 40%, transparent 95%)',
        }}
      />

      {/* ─── 3. VECTOR ARCS, ORBITAL LINES & CONSTELLATION DATA NODES ─── */}
      <svg
        className="absolute inset-0 w-full h-full text-slate-400/25 dark:text-indigo-400/20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle linear gradients for vector paths */}
          <linearGradient id="vector-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="amber-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d98b18" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d98b18" stopOpacity="0" />
          </linearGradient>

          {/* Node marker pattern */}
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Top-Right Orbital Arcs (Periphery) */}
        <g className="opacity-75 dark:opacity-85">
          <ellipse
            cx="92%"
            cy="8%"
            rx="420"
            ry="240"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="1"
            strokeDasharray="4 8"
            transform="rotate(-15, 1200, 100)"
          />
          <ellipse
            cx="92%"
            cy="8%"
            rx="640"
            ry="360"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="0.75"
            transform="rotate(-15, 1200, 100)"
          />
          <circle cx="82%" cy="14%" r="2" className="fill-indigo-500/40 dark:fill-indigo-400/60" />
          <circle cx="75%" cy="6%" r="1.5" className="fill-slate-400/40 dark:fill-indigo-300/50" />
          <circle cx="94%" cy="22%" r="2.5" className="fill-amber-500/40 dark:fill-amber-400/50" />
          <line
            x1="82%"
            y1="14%"
            x2="94%"
            y2="22%"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="opacity-40"
          />
        </g>

        {/* Mid-Left Vector Coordinate Marks & Subtle Orbit */}
        <g className="opacity-60 dark:opacity-75">
          <ellipse
            cx="6%"
            cy="48%"
            rx="520"
            ry="310"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="0.85"
            strokeDasharray="6 10"
            transform="rotate(22, 100, 500)"
          />
          {/* Sparse Analytical Data Nodes */}
          <circle cx="8%" cy="42%" r="2" className="fill-indigo-500/40 dark:fill-indigo-400/60" />
          <circle cx="14%" cy="54%" r="2" className="fill-amber-500/40 dark:fill-amber-400/60" />
          <circle cx="4%" cy="60%" r="1.5" className="fill-slate-400/30 dark:fill-slate-500/40" />
          <line
            x1="8%"
            y1="42%"
            x2="14%"
            y2="54%"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            className="opacity-30"
          />
          <line
            x1="14%"
            y1="54%"
            x2="4%"
            y2="60%"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            className="opacity-20"
          />

          {/* Coordinate Crosshairs (Peripheral) */}
          <g className="text-slate-400/30 dark:text-indigo-400/30">
            <line x1="2%" y1="36%" x2="4%" y2="36%" stroke="currentColor" strokeWidth="1" />
            <line x1="3%" y1="35%" x2="3%" y2="37%" stroke="currentColor" strokeWidth="1" />
          </g>
        </g>

        {/* Bottom Peripheral Geometry (Spacious & Clean) */}
        <g className="opacity-50 dark:opacity-60">
          <ellipse
            cx="88%"
            cy="88%"
            rx="480"
            ry="260"
            fill="none"
            stroke="url(#vector-grad-1)"
            strokeWidth="0.75"
            strokeDasharray="8 12"
          />
          <circle cx="80%" cy="84%" r="2" className="fill-indigo-500/40 dark:fill-indigo-400/50" />
          <circle cx="91%" cy="92%" r="2.5" className="fill-amber-500/30 dark:fill-amber-400/50" />
          <line
            x1="80%"
            y1="84%"
            x2="91%"
            y2="92%"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="opacity-30"
          />
          {/* Subtle Axis Tick Mark */}
          <g className="text-slate-400/30 dark:text-indigo-400/25">
            <line x1="96%" y1="78%" x2="98%" y2="78%" stroke="currentColor" strokeWidth="1" />
            <line x1="97%" y1="77%" x2="97%" y2="79%" stroke="currentColor" strokeWidth="1" />
          </g>
        </g>
      </svg>

      {/* ─── 4. ULTRA-SUBTLE VIGNETTE FOR CLEAN DEPTH ─── */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-70 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 80% 80% at 50% 50%, transparent 60%, rgba(10, 14, 22, 0.4) 100%)',
        }}
      />
    </div>
  );
});
