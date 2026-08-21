import React, { useEffect, useState, useRef } from 'react';
import { KEY_METRICS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SparklinePreview } from './SparklinePreview';
import { Compass, Database, Workflow, Sparkles, TrendingUp } from 'lucide-react';

interface ProofStripProps {
  language?: Language;
}

export const ProofStrip: React.FC<ProofStripProps> = ({ language = 'en' }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(KEY_METRICS.map((m) => m.value));
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

  const sparklineDatasets = [
    [20, 45, 60, 85, 120], // 120k+ records
    [72, 79, 83, 88, 90.5], // 90.5% accuracy
    [15, 22, 29, 35, 40], // 40% reduction
    [7.2, 7.5, 7.8, 8.0, 8.18] // 8.18 CGPA
  ];

  return (
    <div 
      ref={metricsRef} 
      id="proof-metrics-bento"
      className="max-w-[1160px] mx-auto px-4 sm:px-6 mb-12 sm:mb-16"
    >
      {/* Unified Bento Grid (3 Pillars Top + 4 Metrics Bottom in a seamless cohesive layout) */}
      <div className="rounded-2xl bg-white/60 dark:bg-[#12161f]/80 border border-[#dfe3e9] dark:border-[#262c36] p-3 sm:p-4 shadow-sm backdrop-blur-sm space-y-3">
        
        {/* Top 3 Focus Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#181e2a] border border-[#dfe3e9] dark:border-[#262c36] flex items-center gap-3 transition-all hover:border-[#a66a12]/40">
            <div className="p-2 rounded-lg bg-[#a66a12]/10 text-[#a66a12] shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-widest text-[#8b93a1] uppercase font-bold">
                Analytical Focus
              </div>
              <div className="font-display text-xs sm:text-sm font-semibold text-[#101318] dark:text-white truncate">
                Data → Product → Business
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#181e2a] border border-[#dfe3e9] dark:border-[#262c36] flex items-center gap-3 transition-all hover:border-[#a66a12]/40">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-widest text-[#8b93a1] uppercase font-bold">
                Production Stack
              </div>
              <div className="font-display text-xs sm:text-sm font-semibold text-[#101318] dark:text-white truncate">
                SQL · Python · Power BI · Azure
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#181e2a] border border-[#dfe3e9] dark:border-[#262c36] flex items-center gap-3 transition-all hover:border-[#a66a12]/40">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <Workflow className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-widest text-[#8b93a1] uppercase font-bold">
                Working Pipeline
              </div>
              <div className="font-display text-xs sm:text-sm font-semibold text-[#101318] dark:text-white truncate">
                Analyze → Decide → Engineer → Build
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Numerical Proof Points */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {KEY_METRICS.map((metric, idx) => {
            const decimal = 'decimal' in metric && typeof (metric as { decimal?: number }).decimal === 'number'
              ? (metric as { decimal?: number }).decimal
              : undefined;
            const displayValue = decimal !== undefined 
              ? counts[idx].toFixed(decimal) 
              : Math.round(counts[idx]).toLocaleString();

            return (
              <div 
                key={idx} 
                className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-2xs flex flex-col justify-between transition-all hover:border-[#a66a12]/50 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-mono font-bold text-2xl sm:text-3xl text-[#101318] dark:text-white tracking-tight flex items-baseline gap-0.5 group-hover:text-[#a66a12] transition-colors">
                      <span>{displayValue}</span>
                      <span className="text-[#a66a12] text-lg sm:text-2xl">{metric.suffix}</span>
                    </div>
                    <SparklinePreview 
                      data={sparklineDatasets[idx % sparklineDatasets.length]} 
                      color="#a66a12" 
                      width={48} 
                      height={18}
                      className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-[#5c6472] dark:text-[#a0a8b5] uppercase tracking-wider mt-1 font-semibold truncate">
                    {metric.label}
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#8b93a1] mt-2 pt-2 border-t border-[#dfe3e9] dark:border-[#262c36] truncate">
                  {metric.note}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
