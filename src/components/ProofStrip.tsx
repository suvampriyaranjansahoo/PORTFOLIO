import React, { useEffect, useState, useRef } from 'react';
import { PROOF_POINTS, KEY_METRICS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProofStripProps {
  language?: Language;
}

export const ProofStrip: React.FC<ProofStripProps> = ({ language = 'en' }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(KEY_METRICS.map(() => 0));
  const metricsRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language]?.proof;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setCounts(KEY_METRICS.map(m => m.value));
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts(KEY_METRICS.map(m => m.value));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 950;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Analytical ease-out cubic curve (0.22, 1, 0.36, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3.2);

            const nextCounts = KEY_METRICS.map((metric) => {
              return metric.value * easeProgress;
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(KEY_METRICS.map(m => m.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const proofItems = [
    { label: t?.focusLabel || "FOCUS", value: t?.focusValue || "Data → Product → Business" },
    { label: t?.stackLabel || "CORE STACK", value: t?.stackValue || "SQL · Python · Power BI · Azure" },
    { label: t?.styleLabel || "WORK STYLE", value: t?.styleValue || "Question → Insight → Action" }
  ];

  return (
    <div className="max-w-[1160px] mx-auto px-5 sm:px-6 mb-14 sm:mb-20 space-y-4">
      {/* Proof Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#fecdd3]/60 dark:bg-white/[0.08] border border-[#fecdd3] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xs backdrop-blur-md">
        {proofItems.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white/85 dark:bg-[#141924]/85 p-4 sm:p-5 flex flex-col justify-center transition-colors hover:bg-white/95 dark:hover:bg-[#181f2c]/95"
          >
            <span className="font-mono text-[10px] tracking-widest text-[#a06b7a] dark:text-[#8b93a1] uppercase mb-1 font-semibold">
              {item.label}
            </span>
            <strong className="font-display text-sm sm:text-base font-semibold text-[#2d151c] dark:text-white">
              {item.value}
            </strong>
          </div>
        ))}
      </div>

      {/* Key Metrics Row */}
      <div 
        ref={metricsRef}
        id="key-metrics-grid"
        className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#fecdd3]/60 dark:bg-white/[0.08] border border-[#fecdd3] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xs backdrop-blur-md"
      >
        {KEY_METRICS.map((metric, idx) => {
          const displayValue = metric.decimal 
            ? counts[idx].toFixed(metric.decimal) 
            : Math.round(counts[idx]).toLocaleString();

          return (
            <div 
              key={idx} 
              className="bg-white/85 dark:bg-[#141924]/85 p-5 sm:p-6 group hover:bg-white/95 dark:hover:bg-[#1a2130]/90 transition-all cursor-default"
            >
              <div className="font-mono font-bold text-2xl sm:text-3xl text-[#2d151c] dark:text-white tracking-tight flex items-baseline gap-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <span className="group-hover:text-[#e11d48] dark:group-hover:text-[#fbbf24] transition-colors">{displayValue}</span>
                <span className="text-[#e11d48] dark:text-[#fbbf24] text-xl sm:text-2xl font-bold">{metric.suffix}</span>
              </div>
              <div className="font-mono text-[11px] text-[#5e3240] dark:text-[#8b93a1] group-hover:text-[#2d151c] dark:group-hover:text-white uppercase tracking-wider mt-1.5 line-clamp-1 font-semibold transition-colors">
                {metric.label}
              </div>
              <div className="text-[11px] text-[#a06b7a] dark:text-[#9ea7b4] mt-0.5 font-normal">
                {metric.note}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
