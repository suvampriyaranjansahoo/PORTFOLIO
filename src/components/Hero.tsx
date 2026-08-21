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
import { KineticHeadline } from './KineticHeadline';
import { InteractiveCard } from './InteractiveCard';
import { SparklinePreview } from './SparklinePreview';

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
            <span>{t.available}</span>
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
              {t.roleHeadline}
            </p>

            <KineticHeadline
              text={PERSONAL_INFO.name}
              className="text-[#101318] dark:text-white"
            />
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed max-w-2xl font-normal">
            {t.tagline}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#work"
              id="hero-view-work-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101318] dark:bg-white text-white dark:text-[#101318] text-sm font-semibold hover:bg-[#202633] dark:hover:bg-gray-100 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
            >
              <span>{t.viewWork}</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              id="hero-contact-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#161b22] border border-[#bfc5cf] dark:border-[#30363d] text-[#101318] dark:text-white text-sm font-semibold hover:border-[#a66a12] hover:bg-[#f6f7f9] dark:hover:bg-[#1f242c] transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4 text-[#a66a12]" />
              <span>{t.contactMe}</span>
            </a>

            <button
              onClick={onOpenRecruiter}
              id="hero-recruiter-brief-btn"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/30 text-sm font-mono font-medium transition-all cursor-pointer hover:-translate-y-0.5 shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#a66a12]" />
              <span>{t.recruiterBrief}</span>
            </button>
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
            className="p-6 sm:p-7 space-y-5"
          >
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#dfe3e9] dark:border-[#262c36]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#a66a12]/10 border border-[#a66a12]/30 flex items-center justify-center font-mono font-bold text-sm text-[#a66a12] shadow-xs">
                  SPS
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#101318] dark:text-white">
                    B.Tech CSE '26
                  </div>
                  <div className="text-[11px] text-[#8b93a1]">
                    SOA University, Odisha
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                  8.18 CGPA
                </span>
                <SparklinePreview data={[7.8, 7.9, 8.0, 8.12, 8.18]} color="#10b981" width={48} height={16} />
              </div>
            </div>

            <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
              {t.asideCopy}
            </p>

            {/* Quick Live Telemetry Indicator */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-[#5c6472] dark:text-[#8b93a1]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Telemetry</span>
              </div>
              <span className="text-[#a66a12] font-semibold">120K+ rows benchmarked</span>
            </div>

            {/* Tech Strip */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8b93a1] mb-2.5">
                {t.coreCapabilities}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['SQL (CTEs/Window)', 'Python / PySpark', 'Power BI & DAX', 'Azure Synapse', 'RICE Framework', 'XGBoost & SHAP'].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-[#e6edf3] hover:border-[#a66a12]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};
