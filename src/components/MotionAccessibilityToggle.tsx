import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Pause, 
  ShieldCheck, 
  Sliders, 
  X, 
  RotateCcw, 
  Layers, 
  Box, 
  Orbit, 
  Zap, 
  Radio, 
  Check, 
  Activity,
  Waves
} from 'lucide-react';
import { BackgroundPresetMode } from '../types';
import { triggerGlobal3DShockwave } from './Global3DBackground';

interface MotionAccessibilityToggleProps {
  motionEnabled: boolean;
  onToggle: () => void;
  systemPrefersReducedMotion: boolean;
  nodeDensity: number;
  onNodeDensityChange: (density: number) => void;
  presetMode?: BackgroundPresetMode;
  onPresetModeChange?: (mode: BackgroundPresetMode) => void;
  onEmitShockwave?: () => void;
}

const PRESETS: Array<{
  id: BackgroundPresetMode;
  name: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'cosmic',
    name: 'Cosmic Synapse',
    desc: 'Luminous 3D graph with synaptic sparks & gravitational pull',
    icon: <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
  },
  {
    id: 'topographic',
    name: '3D Topographic Mesh',
    desc: 'Undulating loss-landscape terrain with vertex deformation',
    icon: <Waves className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
  },
  {
    id: 'constellation',
    name: 'Constellation Network',
    desc: 'Geometric Delaunay polyhedra with elastic spring links',
    icon: <Box className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
  },
  {
    id: 'quantum',
    name: 'Quantum Particle Field',
    desc: 'High-density micro swarm with 3D depth-of-field bloom',
    icon: <Orbit className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
  },
  {
    id: 'zen',
    name: 'Minimal Zen',
    desc: 'Monochrome ambient breathing with calm reading contrast',
    icon: <Radio className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
  }
];

export const MotionAccessibilityToggle: React.FC<MotionAccessibilityToggleProps> = ({
  motionEnabled,
  onToggle,
  systemPrefersReducedMotion,
  nodeDensity,
  onNodeDensityChange,
  presetMode = 'cosmic',
  onPresetModeChange,
  onEmitShockwave
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'physics'>('presets');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const densityPercent = Math.round(nodeDensity * 100);
  const estimatedNodes = Math.round(92 * nodeDensity);

  const getDensityDescriptor = (val: number) => {
    if (val <= 40) return 'Minimal';
    if (val <= 70) return 'Sparse';
    if (val <= 110) return 'Balanced';
    if (val <= 140) return 'Rich';
    return 'Ultra-Dense';
  };

  const handleShockwaveTrigger = () => {
    if (onEmitShockwave) {
      onEmitShockwave();
    } else {
      triggerGlobal3DShockwave(0, 0, 1.4);
    }
  };

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto"
      id="neural-motion-accessibility-container"
    >
      {/* Expanded Accessibility, Presets & 3D Physics Popover */}
      {isOpen && (
        <div 
          role="dialog"
          aria-labelledby="accessibility-menu-heading"
          aria-modal="false"
          id="motion-density-settings-panel"
          className="mb-2 p-4 rounded-2xl bg-white/95 dark:bg-[#10141e]/95 border border-[#fecdd3] dark:border-white/15 text-[#2d151c] dark:text-slate-200 text-xs shadow-2xl backdrop-blur-xl w-80 sm:w-96 transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#fecdd3]/70 dark:border-white/10 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5 font-semibold text-[#e11d48] dark:text-[#fbbf24]">
              <ShieldCheck className="w-4 h-4 text-[#e11d48] dark:text-[#fbbf24]" />
              <span id="accessibility-menu-heading" className="text-xs font-bold tracking-wide font-mono">
                CANVAS & 3D ATMOSPHERE
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close canvas controls"
              className="p-1 rounded-lg hover:bg-rose-100/60 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs (Presets vs Advanced Tuning) */}
          <div className="flex gap-1 p-1 bg-rose-50/70 dark:bg-white/5 rounded-xl mb-3 border border-[#fecdd3]/50 dark:border-white/5 font-mono text-[11px]">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-white dark:bg-[#1e2538] text-[#e11d48] dark:text-white font-bold shadow-xs'
                  : 'text-[#643644] dark:text-slate-400 hover:text-[#2d151c] dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Presets</span>
            </button>

            <button
              onClick={() => setActiveTab('physics')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'physics'
                  ? 'bg-white dark:bg-[#1e2538] text-[#e11d48] dark:text-white font-bold shadow-xs'
                  : 'text-[#643644] dark:text-slate-400 hover:text-[#2d151c] dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Physics & Kinematics</span>
            </button>
          </div>

          {/* TAB 1: 3D BACKGROUND PRESET SELECTOR */}
          {activeTab === 'presets' && (
            <div className="space-y-2 mb-3 max-h-60 overflow-y-auto pr-0.5 no-scrollbar">
              {PRESETS.map((preset) => {
                const isSelected = presetMode === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onPresetModeChange && onPresetModeChange(preset.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50/90 dark:bg-rose-950/30 border-[#e11d48] dark:border-rose-500/50 shadow-xs'
                        : 'bg-white/60 dark:bg-white/[0.02] border-[#fecdd3]/60 dark:border-white/5 hover:border-[#e11d48]/40 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="mt-0.5 p-1 rounded-md bg-white dark:bg-white/10 shadow-2xs">
                      {preset.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-semibold ${
                          isSelected ? 'text-[#e11d48] dark:text-rose-300' : 'text-[#2d151c] dark:text-slate-200'
                        }`}>
                          {preset.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#e11d48] dark:text-rose-400" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#643644] dark:text-slate-400 leading-snug mt-0.5">
                        {preset.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 2: PHYSICS, DENSITY & SHOCKWAVES */}
          {activeTab === 'physics' && (
            <div className="space-y-3.5 mb-3">
              {/* 1. Motion Toggle Switch */}
              <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-white/5 border border-[#fecdd3]/60 dark:border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#2d151c] dark:text-slate-100 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>3D Parallax & Motion</span>
                  </div>
                  <p className="text-[10px] text-[#643644] dark:text-slate-400 leading-tight">
                    {motionEnabled ? 'Active organic drift, gyro tilt & bloom' : 'Paused for visual stillness'}
                  </p>
                </div>

                <button
                  role="switch"
                  aria-checked={motionEnabled}
                  onClick={onToggle}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48] ${
                    motionEnabled ? 'bg-[#e11d48] dark:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      motionEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2. Interactive Shockwave Trigger */}
              <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-white/5 border border-[#fecdd3]/60 dark:border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#2d151c] dark:text-slate-100 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Kinetic Shockwave</span>
                  </div>
                  <p className="text-[10px] text-[#643644] dark:text-slate-400 leading-tight">
                    Emit spherical impulse pulse across 3D lattice
                  </p>
                </div>

                <button
                  onClick={handleShockwaveTrigger}
                  className="px-2.5 py-1 rounded-lg bg-[#e11d48] text-white hover:bg-[#be123c] font-mono text-[10px] font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Trigger Pulse
                </button>
              </div>

              {/* 3. Neural Node Density Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="neural-node-density-range"
                    className="font-semibold text-[#2d151c] dark:text-slate-100 flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>Node Density</span>
                  </label>
                  <div className="font-mono text-[11px] font-bold text-[#e11d48] dark:text-amber-400">
                    {densityPercent}% <span className="text-[#643644] dark:text-slate-500 font-normal">({getDensityDescriptor(densityPercent)})</span>
                  </div>
                </div>

                <input
                  id="neural-node-density-range"
                  type="range"
                  min="30"
                  max="160"
                  step="10"
                  value={densityPercent}
                  onChange={(e) => onNodeDensityChange(Number(e.target.value) / 100)}
                  aria-valuemin={30}
                  aria-valuemax={160}
                  aria-valuenow={densityPercent}
                  aria-valuetext={`${densityPercent} percent density, approximately ${estimatedNodes} neural nodes`}
                  className="w-full h-2 bg-rose-200/70 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#e11d48] dark:accent-[#fbbf24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
                />

                <div className="flex justify-between text-[9px] font-mono text-[#643644] dark:text-slate-400">
                  <span>30% (Sparse)</span>
                  <span>100% (Default)</span>
                  <span>160% (Dense)</span>
                </div>
              </div>
            </div>
          )}

          {/* Reset / Status Footer */}
          <div className="pt-2 border-t border-[#fecdd3]/70 dark:border-white/10 flex items-center justify-between text-[10px]">
            {systemPrefersReducedMotion ? (
              <span className="text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                ● OS prefers reduced motion
              </span>
            ) : (
              <span className="text-[#643644] dark:text-slate-400 font-mono">
                Preset: <strong>{PRESETS.find(p => p.id === presetMode)?.name}</strong>
              </span>
            )}

            <button
              onClick={() => {
                onNodeDensityChange(1.0);
                if (onPresetModeChange) onPresetModeChange('cosmic');
              }}
              className="text-[#643644] hover:text-[#2d151c] dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 font-mono hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Control Pill Button */}
      <div className="flex items-center gap-1.5">
        {/* Main Motion Switch Toggle */}
        <button
          id="neural-motion-toggle-btn"
          role="switch"
          aria-checked={motionEnabled}
          aria-label={motionEnabled ? "Pause neural background animations (reduce motion)" : "Enable neural background animations"}
          onClick={onToggle}
          className={`group relative flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none ${
            motionEnabled
              ? "bg-white/90 dark:bg-[#121724]/85 hover:bg-white dark:hover:bg-[#161d2e] border-[#fecdd3] dark:border-white/15 text-[#2d151c] dark:text-slate-200"
              : "bg-rose-50/90 dark:bg-amber-950/40 hover:bg-rose-100/90 dark:hover:bg-amber-900/50 border-[#fecdd3] dark:border-amber-500/30 text-rose-950 dark:text-amber-200"
          }`}
        >
          {/* Status Indicator Dot */}
          <span className="relative flex h-2 w-2 items-center justify-center">
            {motionEnabled ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 dark:bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e11d48] dark:bg-emerald-500" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            )}
          </span>

          {/* Icon */}
          <span className="transition-transform duration-150 group-hover:scale-110">
            {motionEnabled ? (
              <Sparkles className="w-3.5 h-3.5 text-[#e11d48] dark:text-indigo-400" />
            ) : (
              <Pause className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            )}
          </span>

          {/* Text Label */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide font-medium">
            <span className="hidden sm:inline text-[#643644] dark:text-slate-400">3D Atmosphere:</span>
            <span className={motionEnabled ? "font-bold text-[#e11d48] dark:text-emerald-400" : "font-bold text-amber-700 dark:text-amber-300"}>
              {motionEnabled ? "ON" : "OFF"}
            </span>
          </div>
        </button>

        {/* Settings / Density Trigger Button */}
        <button
          id="neural-density-settings-btn"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open 3D atmosphere presets and accessibility settings"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 sm:p-2.5 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none ${
            isOpen
              ? "bg-[#e11d48] text-white border-[#be123c] shadow-rose-500/25"
              : "bg-white/90 dark:bg-[#121724]/85 hover:bg-white dark:hover:bg-[#161d2e] border-[#fecdd3] dark:border-white/15 text-[#2d151c] dark:text-slate-300 hover:text-[#e11d48] dark:hover:text-amber-400"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
