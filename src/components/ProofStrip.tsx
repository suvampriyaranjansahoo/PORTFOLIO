import React, { useEffect, useState, useRef } from 'react';
import { PROOF_POINTS, KEY_METRICS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SparklinePreview } from './SparklinePreview';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {proofItems.map((item, idx) => (
          <div 
            key={idx} 
            className="relative overflow-hidden bg-white/85 dark:bg-[#151920]/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#dfe3e9] dark:border-[#262c36] shadow-xs flex flex-col justify-center transition-all duration-300 hover:border-[#a66a12]/50 hover:shadow-md group"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-[10px] tracking-widest text-[#8b93a1] uppercase mb-1">
              {item.label}
            </span>
            <strong className="font-display text-sm sm:text-base font-semibold text-[#101318] dark:text-white group-hover:text-[#a66a12] dark:group-hover:text-amber-300 transition-colors">
              {item.value}
            </strong>
          </div>
        ))}
      </div>

      {/* Metrics Row */}
      <div 
        ref={metricsRef}
        id="key-metrics-grid"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {KEY_METRICS.map((metric, idx) => {
          const displayValue = metric.decimal 
            ? counts[idx].toFixed(metric.decimal) 
            : Math.round(counts[idx]).toLocaleString();

          // Representative historical benchmark sparkline data
          const sparklineDatasets = [
            [20, 45, 60, 85, 120], // 120k+ records
            [72, 79, 83, 88, 90.5], // 90.5% accuracy
            [15, 22, 29, 35, 40], // 40% reduction
            [7.2, 7.5, 7.8, 8.0, 8.18] // 8.18 CGPA
          ];

          return (
            <div 
              key={idx} 
              className="relative overflow-hidden bg-white/85 dark:bg-[#151920]/85 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#dfe3e9] dark:border-[#262c36] shadow-xs group hover:border-[#a66a12]/60 dark:hover:border-[#a66a12]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top micro metallic highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="font-mono font-bold text-2xl sm:text-3xl text-[#101318] dark:text-white tracking-tight flex items-baseline gap-0.5 group-hover:text-[#a66a12] dark:group-hover:text-amber-300 transition-colors">
                    <span>{displayValue}</span>
                    <span className="text-[#a66a12] text-xl sm:text-2xl">{metric.suffix}</span>
                  </div>
                  <SparklinePreview 
                    data={sparklineDatasets[idx % sparklineDatasets.length]} 
                    color="#d8a34f" 
                    width={52} 
                    height={20}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="font-mono text-[11px] text-[#5c6472] dark:text-[#8b93a1] uppercase tracking-wider mt-1.5 line-clamp-1 font-semibold">
                  {metric.label}
                </div>
              </div>
              <div className="text-[11px] text-[#8b93a1] dark:text-[#5c6472] mt-2 pt-2 border-t border-[#dfe3e9]/60 dark:border-[#262c36]/60">
                {metric.note}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
