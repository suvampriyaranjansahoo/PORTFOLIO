import React, { useState, useEffect } from 'react';
import { Coffee, Flame, Sparkles, Plus, Zap, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoffeeFuelCounterProps {
  initialHours?: number;
  className?: string;
}

export const CoffeeFuelCounter: React.FC<CoffeeFuelCounterProps> = ({
  initialHours = 1480,
  className = '',
}) => {
  // Calculated base cups: 1 cup per ~2.3 hours of deep engineering & analysis
  const baseCups = Math.round(initialHours / 2.33);
  
  const [extraCups, setExtraCups] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sps_coffee_extra');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(baseCups + extraCups - 30);
  const totalCups = baseCups + extraCups;

  // Animated Count-up on mount
  useEffect(() => {
    let start = Math.max(0, totalCups - 45);
    const end = totalCups;
    const duration = 1200;
    const stepTime = Math.max(10, Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
      start += 1;
      setDisplayCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalCups]);

  const handleAddCoffee = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsBrewing(true);
    const newExtra = extraCups + 1;
    setExtraCups(newExtra);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sps_coffee_extra', String(newExtra));
    }

    // Mini energetic confetti burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 24,
      spread: 45,
      origin: { x, y },
      colors: ['#a66a12', '#d8a34f', '#78350f', '#f59e0b', '#fbbf24'],
      ticks: 120,
      gravity: 1.2,
      scalar: 0.8,
    });

    setTimeout(() => {
      setIsBrewing(false);
    }, 600);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExtraCups(0);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sps_coffee_extra');
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-amber-950/10 via-amber-900/5 to-transparent dark:from-amber-950/30 dark:via-[#151920] dark:to-[#0e1116] border border-amber-500/25 dark:border-amber-500/20 shadow-sm transition-all duration-300 hover:border-amber-500/40 group ${className}`}>
      
      {/* Background glowing cup silhouette watermark */}
      <div className="absolute -right-4 -bottom-6 opacity-5 dark:opacity-10 text-amber-500 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Coffee className="w-36 h-36" />
      </div>

      {/* Top subtle golden filament highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      {/* Header Row */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-[#a66a12] dark:text-amber-400">
            <Coffee className={`w-4 h-4 transition-transform ${isBrewing ? 'scale-125 rotate-12' : 'group-hover:scale-110'}`} />
            
            {/* Animated Steam Plumes */}
            <span className="absolute -top-2 left-3 w-1 h-2 bg-amber-400/70 rounded-full animate-bounce [animation-delay:0ms] opacity-80" />
            <span className="absolute -top-3 left-4.5 w-1 h-3 bg-amber-400/60 rounded-full animate-bounce [animation-delay:150ms] opacity-60" />
            <span className="absolute -top-2 left-6 w-1 h-2 bg-amber-400/70 rounded-full animate-bounce [animation-delay:300ms] opacity-80" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#a66a12] dark:text-amber-400">
                Work Ethic & Fuel Engine
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
                Live Metric
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-[#101318] dark:text-white">
              Coffee-to-Code Telemetry
            </h4>
          </div>
        </div>

        {/* Quick Fuel Tag */}
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-mono text-[#5c6472] dark:text-[#8b93a1]">
          <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
          <span>High Performance</span>
        </div>
      </div>

      {/* Main Metric Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-4">
        {/* Left Big Number (Cups) */}
        <div className="sm:col-span-6 flex items-baseline gap-2">
          <span className="font-mono font-black text-3xl sm:text-4xl text-[#101318] dark:text-amber-300 tracking-tight">
            {displayCount.toLocaleString()}
          </span>
          <span className="text-xs font-mono font-semibold text-[#a66a12] uppercase">
            Cups Consumed
          </span>
        </div>

        {/* Right Conversion Ratio Stats */}
        <div className="sm:col-span-6 grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded-lg bg-white/70 dark:bg-[#151920]/70 border border-[#dfe3e9] dark:border-[#262c36]">
            <div className="text-[#8b93a1]">Engineering Hours</div>
            <div className="font-bold text-[#101318] dark:text-white">
              {(initialHours + extraCups * 2.3).toFixed(0)}+ hrs
            </div>
          </div>
          <div className="p-2 rounded-lg bg-white/70 dark:bg-[#151920]/70 border border-[#dfe3e9] dark:border-[#262c36]">
            <div className="text-[#8b93a1]">Code Efficiency</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">
              99.4% Uptime
            </div>
          </div>
        </div>
      </div>

      {/* Fuel Consumption Breakdown Bars */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-[10px] font-mono text-[#8b93a1]">
          <span>Caffeine Distribution by Domain</span>
          <span className="text-[#a66a12] dark:text-amber-400">100% Arabica Roast</span>
        </div>
        
        <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
          <div 
            className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-500" 
            style={{ width: '45%' }} 
            title="45% Complex SQL CTEs & Star Schemas"
          />
          <div 
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500" 
            style={{ width: '32%' }} 
            title="32% ML Hyperparameter Optimization & PySpark"
          />
          <div 
            className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500" 
            style={{ width: '23%' }} 
            title="23% Power BI Dashboards & Product RICE Frameworks"
          />
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-[#8b93a1] pt-0.5">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            SQL & Pipelines (45%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            ML & Modeling (32%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Product & BI (23%)
          </span>
        </div>
      </div>

      {/* Interactive Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-amber-500/20 dark:border-amber-500/15">
        <p className="text-[11px] text-[#5c6472] dark:text-[#9ea7b4] italic flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
          <span>&ldquo;Turning dark roast into audited data models since 2022.&rdquo;</span>
        </p>

        <div className="flex items-center gap-2">
          {extraCups > 0 && (
            <button
              onClick={handleReset}
              title="Reset extra cups added"
              className="p-1.5 rounded-lg text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-xs"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={handleAddCoffee}
            disabled={isBrewing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-mono text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className={`w-3.5 h-3.5 ${isBrewing ? 'rotate-90' : ''} transition-transform`} />
            <Coffee className="w-3.5 h-3.5" />
            <span>{isBrewing ? 'Brewing...' : 'Add +1 Cup'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
