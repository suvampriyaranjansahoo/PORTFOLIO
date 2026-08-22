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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const nextCounts = KEY_METRICS.map((metric) => {
              return metric.value * easeProgress;
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#dfe3e9]/60 dark:bg-white/[0.08] border border-[#dfe3e9]/80 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xs backdrop-blur-md">
        {proofItems.map((item, idx) => (
          <div key={idx} className="bg-white/75 dark:bg-[#141924]/75 p-4 sm:p-5 flex flex-col justify-center transition-colors hover:bg-white/90 dark:hover:bg-[#181f2c]/85">
            <span className="font-mono text-[10px] tracking-widest text-[#8b93a1] uppercase mb-1">
              {item.label}
            </span>
            <strong className="font-display text-sm sm:text-base font-semibold text-[#101318] dark:text-white">
              {item.value}
            </strong>
          </div>
        ))}
      </div>

      {/* Metrics Row */}
      <div 
        ref={metricsRef}
        id="key-metrics-grid"
        className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#dfe3e9]/60 dark:bg-white/[0.08] border border-[#dfe3e9]/80 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xs backdrop-blur-md"
      >
        {KEY_METRICS.map((metric, idx) => {
          const displayValue = metric.decimal 
            ? counts[idx].toFixed(metric.decimal) 
            : Math.round(counts[idx]).toLocaleString();

          return (
            <div 
              key={idx} 
              className="bg-white/75 dark:bg-[#141924]/75 p-5 sm:p-6 group hover:bg-white/90 dark:hover:bg-[#1a2130]/85 transition-all"
            >
              <div className="font-mono font-bold text-2xl sm:text-3xl text-[#101318] dark:text-white tracking-tight flex items-baseline gap-0.5 group-hover:text-[#a66a12] transition-colors">
                <span>{displayValue}</span>
                <span className="text-[#a66a12] text-xl sm:text-2xl">{metric.suffix}</span>
              </div>
              <div className="font-mono text-[11px] text-[#5c6472] dark:text-[#8b93a1] uppercase tracking-wider mt-1.5 line-clamp-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-[#8b93a1] dark:text-[#9ea7b4] mt-0.5">
                {metric.note}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
