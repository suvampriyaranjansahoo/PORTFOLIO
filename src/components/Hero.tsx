import React from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Command, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Terminal,
  Database,
  BarChart3,
  Award,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';

interface HeroProps {
  language?: Language;
  onOpenCommand: () => void;
  onOpenRecruiter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language = 'en', onOpenCommand, onOpenRecruiter }) => {
  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS['en'].hero;

  return (
    <section 
      id="hero" 
      className="section-ambient-container ambient-theme-indigo relative pt-12 sm:pt-20 pb-12 sm:pb-16 max-w-[1160px] mx-auto px-5 sm:px-6 overflow-hidden"
    >
      {/* Thematic Ambient Light Shift (Hero Deep Analytical Indigo & Warm Gold Glow) */}
      <SectionAmbientAtmosphere />

      {/* 1. Status / Eyebrow (Entrance Step 1) */}
      <div className="hero-enter-1 flex flex-wrap items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/90 dark:bg-[#161b24]/90 text-[#643644] dark:text-[#94a3b8] border border-[#fecdd3] dark:border-white/10 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] dark:bg-[#fbbf24] animate-pulse"></span>
          {t.eyebrow}
        </span>

        <div className="status-indicator-active">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t.available}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left main intro */}
        <div className="lg:col-span-8 space-y-6">
          {/* 2. Major Identity & Positioning (Entrance Step 2) */}
          <div className="hero-enter-2 space-y-2.5">
            <p className="font-mono text-xs sm:text-sm text-[#e11d48] dark:text-[#fbbf24] font-semibold tracking-wider uppercase">
              {t.roleHeadline}
            </p>

            <h1 className="hero-heading-interactive font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.035em] leading-[1.04] text-[#2d151c] dark:text-white cursor-default select-text">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          {/* 3. Supporting Tagline (Entrance Step 3) */}
          <div className="hero-enter-3">
            <p className="text-base sm:text-lg lg:text-xl text-[#643644] dark:text-[#9ea7b4] leading-relaxed max-w-2xl font-normal">
              {t.tagline}
            </p>
          </div>

          {/* 4. Action buttons & Quick Links (Entrance Step 4) */}
          <div className="hero-enter-4 space-y-5 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                id="hero-view-work-btn"
                className="btn-primary px-5 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none group"
              >
                <span>{t.viewWork}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                className="btn-secondary px-5 py-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none group"
              >
                <Mail className="w-4 h-4 text-[#e11d48] dark:text-[#fbbf24] group-hover:scale-110 transition-transform" />
                <span>{t.contactMe}</span>
              </a>

              <button
                onClick={onOpenRecruiter}
                id="hero-recruiter-brief-btn"
                className="btn-accent-subtle px-4 py-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none group"
              >
                <Sparkles className="w-4 h-4 text-[#e11d48] dark:text-[#fbbf24] group-hover:rotate-12 transition-transform" />
                <span>{t.recruiterBrief}</span>
              </button>
            </div>

            {/* Socials & Quick Command Palette trigger */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-[#643644] dark:text-[#8b93a1]">
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#2d151c] dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none rounded group"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-rose-200 dark:text-[#30363d]">/</span>

              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#2d151c] dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none rounded group"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-rose-200 dark:text-[#30363d]">/</span>

              <button
                id="hero-command-palette-btn"
                onClick={onOpenCommand}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#fecdd3] dark:border-white/15 bg-white dark:bg-[#161b24]/90 hover:bg-[#fff0f3] dark:hover:bg-[#1f2636] text-[#2d151c] dark:text-[#f2f4f7] transition-all cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none"
                title="Open quick command palette"
              >
                <Command className="w-3 h-3 text-[#e11d48] dark:text-[#fbbf24]" />
                <span>⌘K / Ctrl+K</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Right side info card (Entrance Step 5) */}
        <div className="hero-enter-5 lg:col-span-4 card-level-1 p-6 sm:p-7 space-y-5 bg-white/95 dark:bg-[#131823]/90 border border-[#fecdd3] dark:border-white/10">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#fecdd3]/60 dark:border-[#262c36]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-[#fbbf24]/10 border border-rose-500/30 dark:border-[#fbbf24]/30 flex items-center justify-center font-mono font-bold text-sm text-[#e11d48] dark:text-[#fbbf24] shadow-2xs">
                SPS
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[#2d151c] dark:text-white">
                  B.Tech CSE '26
                </div>
                <div className="text-[11px] text-[#a06b7a] dark:text-[#8b93a1]">
                  SOA University, Odisha
                </div>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
              8.18 CGPA
            </span>
          </div>

          <p className="text-xs text-[#643644] dark:text-[#9ea7b4] leading-relaxed">
            {t.asideCopy}
          </p>

          {/* Tech Strip */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#a06b7a] dark:text-[#8b93a1] mb-2.5 font-semibold">
              {t.coreCapabilities}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['SQL (CTEs/Window)', 'Python / PySpark', 'Power BI & DAX', 'Azure Synapse', 'RICE Framework', 'XGBoost & SHAP'].map((skill) => (
                <span
                  key={skill}
                  className="tech-pill"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
