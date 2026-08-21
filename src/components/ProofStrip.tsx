import React, { useEffect, useState, useRef } from 'react';
import { PROOF_POINTS, KEY_METRICS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SparklinePreview } from './SparklinePreview';

interface ProofStripProps {
  language?: Language;
}

export const ProofStrip: React.FC<ProofStripProps> = ({ language = 'en' }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(KEY_METRICS.map((m) => m.value));
  const metricsRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language]?.proof;

  useEffect(() => {
    // Only run counter animation on mount once
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
            } else {
              setCounts(KEY_METRICS.map((m) => m.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const proofItems = [
    { label: "FOCUS", value: "Data → Product → Business" },
    { label: "CORE STACK", value: "SQL · Python · Power BI · Azure" },
    { label: "WORKING APPROACH", value: "Analyze → Decide → Engineer → Build" }
  ];

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 mb-12 sm:mb-16 space-y-4">
      {/* Proof Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {proofItems.map((item, idx) => (
          <div 
            key={idx} 
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs flex flex-col justify-center transition-all hover:border-[#a66a12]/40"
          >
            <span className="font-mono text-[10px] tracking-widest text-[#8b93a1] uppercase mb-1 font-semibold">
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
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {KEY_METRICS.map((metric, idx) => {
          const decimal = 'decimal' in metric && typeof (metric as { decimal?: number }).decimal === 'number'
            ? (metric as { decimal?: number }).decimal
            : undefined;
          const displayValue = decimal !== undefined 
            ? counts[idx].toFixed(decimal) 
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
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs flex flex-col justify-between transition-all hover:border-[#a66a12]/40 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-mono font-bold text-2xl sm:text-3xl text-[#101318] dark:text-white tracking-tight flex items-baseline gap-0.5 group-hover:text-[#a66a12] transition-colors">
                    <span>{displayValue}</span>
                    <span className="text-[#a66a12] text-xl sm:text-2xl">{metric.suffix}</span>
                  </div>
                  <SparklinePreview 
                    data={sparklineDatasets[idx % sparklineDatasets.length]} 
                    color="#a66a12" 
                    width={52} 
                    height={20}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="font-mono text-[11px] text-[#5c6472] dark:text-[#a0a8b5] uppercase tracking-wider mt-1.5 line-clamp-1 font-semibold">
                  {metric.label}
                </div>
              </div>
              <div className="text-[11px] text-[#8b93a1] mt-2.5 pt-2 border-t border-[#dfe3e9] dark:border-[#262c36]">
                {metric.note}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
