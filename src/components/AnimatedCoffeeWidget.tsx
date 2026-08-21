import React, { useEffect, useState } from 'react';
import { Sparkles, Flame, Clock, Award, Coffee, Plus, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractiveCard } from './InteractiveCard';

interface AnimatedCoffeeWidgetProps {
  totalHours?: number;
  className?: string;
}

export const AnimatedCoffeeWidget: React.FC<AnimatedCoffeeWidgetProps> = ({
  totalHours = 1480,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0.35);
  const [boostCups, setBoostCups] = useState<number>(0);
  const [isBrewing, setIsBrewing] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      // Map scroll progress smoothly from 0.25 to 1.0
      const rawProgress = window.scrollY / totalScroll;
      const calculated = Math.min(1, Math.max(0.25, rawProgress));
      setScrollProgress(calculated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalEffectiveProgress = Math.min(1, scrollProgress + boostCups * 0.08);
  const currentHoursLogged = Math.min(totalHours, Math.round(totalHours * totalEffectiveProgress));
  const fillPercentage = Math.round(totalEffectiveProgress * 100);
  
  // Liquid height in SVG: from bottom (Y=68) up to top rim (Y=26)
  const liquidY = 68 - (totalEffectiveProgress * 42);

  const handleBoostCoffee = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsBrewing(true);
    setBoostCups((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { x, y },
      colors: ['#a66a12', '#d8a34f', '#f59e0b', '#fbbf24', '#ffffff'],
      ticks: 100,
      gravity: 1.1,
      scalar: 0.9,
    });

    setTimeout(() => {
      setIsBrewing(false);
    }, 600);
  };

  const handleResetBoost = () => {
    setBoostCups(0);
  };

  return (
    <div id="coffee-telemetry" className={`w-full ${className}`}>
      <InteractiveCard
        featured={true}
        glowColor="rgba(245, 158, 11, 0.4)"
        className="p-5 sm:p-7 bg-[#fbfcfd]/90 dark:bg-[#11141a]/90 backdrop-blur-xl border border-amber-500/30 dark:border-amber-500/25 shadow-xl space-y-5"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/25 dark:border-amber-500/20">
          <div className="flex items-center gap-4">
            {/* SVG Animated Liquid Fill Coffee Mug */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              {/* Dynamic Steam plumes with rising animation */}
              <div className="absolute -top-3 left-4 flex gap-1.5 pointer-events-none">
                <span className="w-1.5 h-3.5 bg-amber-400/90 rounded-full animate-bounce [animation-delay:0ms] opacity-90 shadow-sm" />
                <span className="w-1.5 h-5 bg-amber-300/80 rounded-full animate-bounce [animation-delay:150ms] opacity-95 shadow-sm" />
                <span className="w-1.5 h-3.5 bg-amber-400/90 rounded-full animate-bounce [animation-delay:300ms] opacity-90 shadow-sm" />
              </div>

              <svg
                viewBox="0 0 80 80"
                className="w-16 h-16 drop-shadow-lg overflow-visible"
              >
                <defs>
                  {/* Animated Liquid Gradient */}
                  <linearGradient id="liquidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="40%" stopColor="#b45309" />
                    <stop offset="80%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>

                  {/* Liquid Wave Pattern Clip */}
                  <clipPath id="mugInteriorClipPath">
                    <path d="M 22 26 L 25 65 A 6 6 0 0 0 31 71 L 49 71 A 6 6 0 0 0 55 65 L 58 26 Z" />
                  </clipPath>
                </defs>

                {/* Mug Handle */}
                <path
                  d="M 54 32 C 69 32 69 58 52 59"
                  fill="none"
                  stroke="#a66a12"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="dark:stroke-amber-400 transition-colors"
                />

                {/* Outer Ceramic Mug Body */}
                <path
                  d="M 20 24 L 24 66 A 8 8 0 0 0 32 74 L 48 74 A 8 8 0 0 0 56 66 L 60 24 Z"
                  fill="#ffffff"
                  stroke="#a66a12"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  className="dark:fill-[#1e232d] dark:stroke-amber-400 transition-colors"
                />

                {/* Mug Lip */}
                <ellipse
                  cx="40"
                  cy="24"
                  rx="20"
                  ry="5"
                  fill="#f6f7f9"
                  stroke="#a66a12"
                  strokeWidth="3.5"
                  className="dark:fill-[#262c36] dark:stroke-amber-400"
                />

                {/* Liquid fill clipped inside the mug */}
                <g clipPath="url(#mugInteriorClipPath)">
                  {/* Dynamic rising liquid rect */}
                  <rect
                    x="18"
                    y={liquidY}
                    width="44"
                    height="60"
                    fill="url(#liquidGrad)"
                    className="transition-all duration-300 ease-out"
                  />

                  {/* Surface liquid shimmer ellipse */}
                  <ellipse
                    cx="40"
                    cy={liquidY}
                    rx="17"
                    ry="3.5"
                    fill="#fef3c7"
                    opacity="0.95"
                    className="transition-all duration-300 ease-out"
                  />
                </g>

                {/* Front Ceramic Lip Rim */}
                <path
                  d="M 20 24 C 20 29 60 29 60 24"
                  fill="none"
                  stroke="#a66a12"
                  strokeWidth="3.5"
                  className="dark:stroke-amber-400"
                />
              </svg>

              {/* Dynamic percentage badge */}
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-mono text-[10px] font-bold shadow-md ring-2 ring-white dark:ring-[#11141a]">
                {fillPercentage}%
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#a66a12] dark:text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Scroll-Driven Telemetry</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  Active Real-time
                </span>
              </div>
              <h4 className="font-display font-bold text-lg sm:text-xl text-[#101318] dark:text-white mt-0.5">
                Coffee Fuel & Engineering Depth
              </h4>
            </div>
          </div>

          {/* Real-time hours indicator & Interactive Quick Fuel */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2.5 bg-white/90 dark:bg-[#151920]/90 px-4 py-2.5 rounded-xl border border-amber-500/30 shadow-sm">
              <Clock className="w-4 h-4 text-[#a66a12] dark:text-amber-400 shrink-0" />
              <div className="text-right">
                <div className="font-mono font-black text-2xl sm:text-3xl text-[#101318] dark:text-amber-300 leading-none">
                  {currentHoursLogged.toLocaleString()}
                  <span className="text-xs font-normal text-[#8b93a1]"> / {totalHours}+ hrs</span>
                </div>
                <div className="text-[10px] font-mono text-[#8b93a1] mt-1">
                  Verified Engineering Velocity
                </div>
              </div>
            </div>

            <button
              onClick={handleBoostCoffee}
              className={`p-2.5 rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-[#a66a12] dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer ${
                isBrewing ? 'ring-2 ring-amber-400' : ''
              }`}
              title="Click to boost fuel level and trigger confetti"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[9px] font-mono font-bold">Brew</span>
            </button>

            {boostCups > 0 && (
              <button
                onClick={handleResetBoost}
                className="p-2 rounded-lg text-[#8b93a1] hover:text-[#101318] dark:hover:text-white transition-colors"
                title="Reset boost"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Velocity & Fuel Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#5c6472] dark:text-[#9ea7b4] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Scroll-Driven Liquid Fill Level</span>
            </span>
            <span className="font-bold text-[#a66a12] dark:text-amber-400 font-mono">
              {fillPercentage}% Fuel Capacity ({currentHoursLogged} Hours Logged)
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden p-0.5 border border-amber-500/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 transition-all duration-300 shadow-sm"
              style={{ width: `${Math.max(6, fillPercentage)}%` }}
            />
          </div>
        </div>

        {/* Productivity Breakdown Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-1 text-[11px] font-mono">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151920]/70 border border-[#dfe3e9] dark:border-[#262c36] text-center shadow-xs">
            <div className="text-[#8b93a1] text-[10px] uppercase">Data Engineering</div>
            <div className="font-bold text-sm text-[#101318] dark:text-white mt-0.5">580+ hrs</div>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151920]/70 border border-[#dfe3e9] dark:border-[#262c36] text-center shadow-xs">
            <div className="text-[#8b93a1] text-[10px] uppercase">ML & Analytics</div>
            <div className="font-bold text-sm text-[#101318] dark:text-white mt-0.5">520+ hrs</div>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151920]/70 border border-[#dfe3e9] dark:border-[#262c36] text-center shadow-xs">
            <div className="text-[#8b93a1] text-[10px] uppercase">BI & RICE Models</div>
            <div className="font-bold text-sm text-[#101318] dark:text-white mt-0.5">380+ hrs</div>
          </div>
        </div>
      </InteractiveCard>
    </div>
  );
};
