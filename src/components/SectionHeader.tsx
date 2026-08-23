import React, { useEffect, useRef, useState } from 'react';

export interface SectionHeaderProps {
  num?: string;
  label: React.ReactNode;
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  num,
  label,
  heading,
  subheading,
  icon,
  action,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parse number if not explicitly passed (e.g. "02 · WHAT I DO" -> num: "02", cleanLabel: "WHAT I DO")
  let displayNum = num;
  let cleanLabel: React.ReactNode = label;
  if (!displayNum && typeof label === 'string' && label.includes('·')) {
    const parts = label.split('·');
    displayNum = parts[0].trim();
    cleanLabel = parts.slice(1).join('·').trim();
  }

  return (
    <div ref={containerRef} className={`mb-8 sm:mb-10 ${className}`}>
      {/* Top Number, Label & Expanding Divider */}
      <div className="flex items-center gap-3 mb-2.5">
        {displayNum && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-rose-500/10 dark:bg-[#fbbf24]/10 text-[#e11d48] dark:text-[#fbbf24] border border-rose-500/20 dark:border-[#fbbf24]/20 shadow-2xs">
            {displayNum}
          </span>
        )}

        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#5e3240] dark:text-[#9ea7b4] tracking-widest uppercase">
          {icon && <span className="text-[#e11d48] dark:text-[#fbbf24]">{icon}</span>}
          <span>{cleanLabel}</span>
        </div>

        {/* Subtle Animated Divider Line */}
        <div className="flex-1 h-px bg-gradient-to-r from-rose-300/60 via-rose-200/30 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-[#e11d48]/40 to-transparent dark:from-[#fbbf24]/40 transition-transform duration-600 ease-out origin-left ${
              isVisible ? 'scale-x-100' : 'scale-x-0'
            }`} 
          />
        </div>

        {action && <div className="hidden sm:block shrink-0">{action}</div>}
      </div>

      {/* Main Heading & Subtitle Flex Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2d151c] dark:text-white tracking-[-0.025em] leading-[1.12]">
            {heading}
          </h2>
          {subheading && (
            <p className="text-xs sm:text-sm text-[#5e3240] dark:text-[#9ea7b4] leading-relaxed max-w-2xl font-normal">
              {subheading}
            </p>
          )}
        </div>

        {action && <div className="sm:hidden shrink-0 mt-2">{action}</div>}
      </div>
    </div>
  );
};
