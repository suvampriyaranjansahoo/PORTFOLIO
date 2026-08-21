import React from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Command, 
  Mail, 
  Sparkles,
  Database,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { KineticHeadline } from './KineticHeadline';
import { InteractiveCard } from './InteractiveCard';

interface HeroProps {
  language?: Language;
  onOpenCommand: () => void;
  onOpenRecruiter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language = 'en', onOpenCommand, onOpenRecruiter }) => {
  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS['en'].hero;

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-16 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Subtle ambient lighting accent behind Hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-amber-500/5 dark:bg-amber-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Eyebrow & Status Chip */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-[#dfe3e9]/60 dark:bg-[#1a202c] text-[#4a5260] dark:text-[#a0a8b5] border border-[#dfe3e9] dark:border-[#2d3748] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a66a12] animate-pulse"></span>
            {t.eyebrow}
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to full-time and graduate opportunities</span>
          </div>
        </div>

        {/* Minimalist scroll cue */}
        <a 
          href="#about"
          className="hidden sm:flex items-center gap-2.5 text-xs font-mono text-[#8b93a1] hover:text-[#a66a12] transition-colors cursor-pointer group"
        >
          <div className="w-[1px] h-6 bg-[#bfc5cf] dark:bg-[#30363d] relative overflow-hidden rounded-full">
            <div className="absolute top-[-100%] left-0 w-full h-full bg-[#a66a12] dark:bg-amber-400 animate-scroll-drip" />
          </div>
          <span className="tracking-widest uppercase text-[10px]">SCROLL</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left main intro */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs sm:text-sm text-[#a66a12] font-semibold tracking-wider uppercase">
              DATA · PRODUCT · BUSINESS ANALYTICS
            </p>
            <KineticHeadline
              text={PERSONAL_INFO.name}
              className="text-[#101318] dark:text-white"
            />
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed max-w-2xl font-normal">
            I turn messy data into decisions — from customer retention and financial risk to product prioritization and real-time analytics.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#work"
              id="hero-view-work-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101318] dark:bg-white text-white dark:text-[#101318] text-sm font-semibold hover:bg-[#202633] dark:hover:bg-gray-100 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              id="hero-contact-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#161b22] border border-[#bfc5cf] dark:border-[#30363d] text-[#101318] dark:text-white text-sm font-semibold hover:border-[#a66a12] hover:bg-[#f6f7f9] dark:hover:bg-[#1f242c] transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4 text-[#a66a12]" />
              <span>CONTACT ME</span>
            </a>
          </div>

          {/* Socials & Quick Command Palette trigger */}
          <div className="flex flex-wrap items-center gap-5 pt-3 text-xs font-mono text-[#5c6472] dark:text-[#8b93a1]">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#101318] dark:hover:text-white transition-colors group"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-[#dfe3e9] dark:text-[#30363d]">/</span>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#101318] dark:hover:text-white transition-colors group"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-[#dfe3e9] dark:text-[#30363d]">/</span>
            <button
              onClick={onOpenRecruiter}
              className="inline-flex items-center gap-1 hover:text-[#101318] dark:hover:text-white transition-colors group cursor-pointer"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <span className="text-[#dfe3e9] dark:text-[#30363d]">/</span>
            <button
              id="hero-command-palette-btn"
              onClick={onOpenCommand}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#dfe3e9] dark:border-[#30363d] bg-white/70 dark:bg-[#161b22]/70 hover:bg-white dark:hover:bg-[#1f242c] text-[#101318] dark:text-[#f2f4f7] transition-all cursor-pointer shadow-2xs"
              title="Open quick command palette"
            >
              <Command className="w-3 h-3 text-[#a66a12]" />
              <span>⌘K / Ctrl+K</span>
            </button>
          </div>
        </div>

        {/* Right side info card */}
        <div className="lg:col-span-4">
          <InteractiveCard
            featured={true}
            glowColor="rgba(216, 163, 79, 0.45)"
            className="p-6 sm:p-7 space-y-6"
          >
            {/* Academic Signal */}
            <div className="pb-5 border-b border-[#dfe3e9] dark:border-[#262c36]">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#101318] dark:text-white leading-tight">
                      B.Tech Computer Science
                    </h4>
                    <div className="text-[10px] text-[#5c6472] dark:text-[#8b93a1] mt-0.5">
                      ITER, SOA University
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    8.18 CGPA
                  </span>
                  <span className="text-[9px] font-mono text-[#5c6472] dark:text-[#8b93a1]">
                    Graduating 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Role Cluster */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8b93a1]">
                Professional Capabilities
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-1.5 h-7 bg-blue-500/40 rounded-full group-hover:bg-blue-500 transition-colors" />
                  <div>
                    <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold tracking-wider">ANALYZE</div>
                    <div className="text-xs font-semibold text-[#101318] dark:text-[#e6edf3]">Data & Business Analytics</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-1.5 h-7 bg-purple-500/40 rounded-full group-hover:bg-purple-500 transition-colors" />
                  <div>
                    <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold tracking-wider">DECIDE</div>
                    <div className="text-xs font-semibold text-[#101318] dark:text-[#e6edf3]">Product & Decision Analytics</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-1.5 h-7 bg-emerald-500/40 rounded-full group-hover:bg-emerald-500 transition-colors" />
                  <div>
                    <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">ENGINEER</div>
                    <div className="text-xs font-semibold text-[#101318] dark:text-[#e6edf3]">Data Engineering</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-1.5 h-7 bg-orange-500/40 rounded-full group-hover:bg-orange-500 transition-colors" />
                  <div>
                    <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-bold tracking-wider">BUILD</div>
                    <div className="text-xs font-semibold text-[#101318] dark:text-[#e6edf3]">AI & ML Systems</div>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};
