import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Pause, ShieldCheck, Sliders, X, RotateCcw, Check } from 'lucide-react';

interface MotionAccessibilityToggleProps {
  motionEnabled: boolean;
  onToggle: () => void;
  systemPrefersReducedMotion: boolean;
  nodeDensity: number;
  onNodeDensityChange: (density: number) => void;
}

export const MotionAccessibilityToggle: React.FC<MotionAccessibilityToggleProps> = ({
  motionEnabled,
  onToggle,
  systemPrefersReducedMotion,
  nodeDensity,
  onNodeDensityChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto"
      id="neural-motion-accessibility-container"
    >
      {/* Expanded Accessibility & Visual Density Popover */}
      {isOpen && (
        <div 
          role="dialog"
          aria-labelledby="accessibility-menu-heading"
          aria-modal="false"
          id="motion-density-settings-panel"
          className="mb-2 p-4 rounded-2xl bg-[#10141e]/95 dark:bg-[#0c101c]/95 border border-slate-300/80 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs shadow-2xl backdrop-blur-xl w-72 sm:w-80 transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5 font-semibold text-[#a66a12] dark:text-[#f59e0b]">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span id="accessibility-menu-heading" className="text-xs font-bold tracking-wide">
                ACCESSIBILITY & CANVAS CONTROLS
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility controls"
              className="p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1. Motion Toggle Switch */}
          <div className="mb-4 p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Background Animations</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {motionEnabled ? 'Active organic drift & parallax' : 'Paused for visual comfort'}
              </p>
            </div>

            <button
              role="switch"
              aria-checked={motionEnabled}
              onClick={onToggle}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98b18] ${
                motionEnabled ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  motionEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2. Neural Node Density Slider */}
          <div className="mb-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="neural-node-density-range"
                className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Node Density</span>
              </label>
              <div className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">
                {densityPercent}% <span className="text-slate-400 dark:text-slate-500 font-normal">({getDensityDescriptor(densityPercent)})</span>
              </div>
            </div>

            {/* Range Input Slider */}
            <div className="relative pt-1">
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
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d98b18] dark:accent-[#f59e0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98b18]"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                <span>30% (Sparse)</span>
                <span>100% (Default)</span>
                <span>160% (Dense)</span>
              </div>
            </div>

            {/* Density Presets */}
            <div className="flex gap-1.5 pt-1">
              {[
                { label: 'Sparse', value: 0.4 },
                { label: 'Standard', value: 1.0 },
                { label: 'Dense', value: 1.4 },
              ].map((preset) => {
                const isSelected = Math.abs(nodeDensity - preset.value) < 0.05;
                return (
                  <button
                    key={preset.label}
                    onClick={() => onNodeDensityChange(preset.value)}
                    className={`flex-1 py-1 px-2 rounded-lg font-mono text-[10px] border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 font-bold'
                        : 'bg-slate-100/60 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-white/10'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Active Node Count Readout */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1">
              <span>Active Synaptic Nodes:</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">~{estimatedNodes} nodes</span>
            </div>
          </div>

          {/* Reset / Status Footer */}
          <div className="pt-2 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-[10px]">
            {systemPrefersReducedMotion ? (
              <span className="text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                ● OS prefers reduced motion
              </span>
            ) : (
              <span className="text-slate-400 font-mono">Preferences saved</span>
            )}

            <button
              onClick={() => {
                onNodeDensityChange(1.0);
              }}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 font-mono hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
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
          className={`group relative flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none ${
            motionEnabled
              ? "bg-white/85 dark:bg-[#121724]/85 hover:bg-white dark:hover:bg-[#161d2e] border-slate-300/80 dark:border-white/15 text-slate-800 dark:text-slate-200"
              : "bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100/90 dark:hover:bg-amber-900/50 border-amber-300/70 dark:border-amber-500/30 text-amber-900 dark:text-amber-200"
          }`}
        >
          {/* Status Indicator Dot */}
          <span className="relative flex h-2 w-2 items-center justify-center">
            {motionEnabled ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            )}
          </span>

          {/* Icon */}
          <span className="transition-transform duration-150 group-hover:scale-110">
            {motionEnabled ? (
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Pause className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            )}
          </span>

          {/* Text Label */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide font-medium">
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Motion:</span>
            <span className={motionEnabled ? "font-bold text-emerald-700 dark:text-emerald-400" : "font-bold text-amber-700 dark:text-amber-300"}>
              {motionEnabled ? "ON" : "OFF"}
            </span>
          </div>
        </button>

        {/* Settings / Density Trigger Button */}
        <button
          id="neural-density-settings-btn"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open neural density and accessibility settings"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 sm:p-2.5 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none ${
            isOpen
              ? "bg-amber-500 text-white border-amber-600 shadow-amber-500/25"
              : "bg-white/85 dark:bg-[#121724]/85 hover:bg-white dark:hover:bg-[#161d2e] border-slate-300/80 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
