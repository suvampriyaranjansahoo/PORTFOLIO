import React from 'react';
import { ArrowUpRight, BookOpen, Check, Clock, ExternalLink, Layers, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { getCaseStudyReadingTime } from '../utils/readingTime';
import { InteractiveCard } from './InteractiveCard';

interface ProjectsSectionProps {
  language?: Language;
  selectedCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  onOpenCaseStudy: (id: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  language = 'en',
  selectedCategory,
  onSelectCategory,
  onOpenCaseStudy
}) => {
  const t = TRANSLATIONS[language]?.work;

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t?.filters.all || 'All Work' },
    { id: 'product', label: t?.filters.product || 'Product & RICE' },
    { id: 'analytics', label: t?.filters.analytics || 'Business & Financial Analytics' },
    { id: 'engineering', label: t?.filters.engineering || 'Data Engineering' },
    { id: 'ai', label: t?.filters.ai || 'AI / ML' }
  ];

  return (
    <section id="work" className="py-16 sm:py-20">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2">
              {t?.label || "03 · SELECTED WORK"}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight">
              {t?.heading || "Proof, not project lists."}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#dfe3e9]/60 dark:bg-[#1a1f28] rounded-xl border border-[#dfe3e9] dark:border-[#262c36]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#101318] dark:bg-white text-white dark:text-[#101318] font-semibold shadow-xs'
                    : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => {
            const readingTime = project.caseStudyId ? getCaseStudyReadingTime(project.caseStudyId) : null;

            return (
              <InteractiveCard
                key={project.id}
                featured={project.featured}
                glowColor={project.featured ? "rgba(99, 102, 241, 0.3)" : "rgba(139, 92, 246, 0.2)"}
                containerClassName={project.featured ? 'md:col-span-2' : ''}
                className={project.featured ? 'p-6 sm:p-8 space-y-4' : 'p-6 sm:p-7 space-y-4'}
              >
                {/* Top Glowing Status Ribbon for Flagship & Live Projects */}
                {project.featured && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-400 via-sky-400 to-amber-400 shadow-[0_0_14px_rgba(139,92,246,0.6)]" />
                )}

                {/* Ghost watermark index number */}
                <div 
                  className={`ghost-watermark select-none transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-1 ${
                    project.featured 
                      ? 'text-white/[0.04]' 
                      : 'text-black/[0.03] dark:text-white/[0.03]'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    {/* Header Badge & Telemetry */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {project.featured ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 dark:text-indigo-200 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            FLAGSHIP SYSTEM
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-500/10 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">
                            <ShieldCheck className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                            VERIFIED
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {project.meta}
                        </span>
                        {readingTime && (
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                            title={`Estimated reading time: ${readingTime.detailText}`}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            <span>{readingTime.displayText}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 shadow-xs">
                        <Activity className="w-3 h-3 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                        <span>{project.metrics[0]?.value} {project.metrics[0]?.label}</span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl mb-1.5 tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-xs font-mono mb-4 text-indigo-600 dark:text-indigo-400/90 font-medium">
                      {project.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-5 text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>

                    {/* Metrics Grid with Spec-Sheet Micro-Borders */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                      {project.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2.5 rounded-xl border transition-all duration-300 bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80 group-hover:border-indigo-500/30 group-hover:bg-slate-100/80 dark:group-hover:bg-slate-900/80 shadow-xs"
                        >
                          <div className="font-mono font-bold text-sm sm:text-base text-indigo-600 dark:text-indigo-300">
                            {m.value}
                          </div>
                          <div className="text-[10px] font-mono uppercase mt-0.5 line-clamp-1 text-slate-500 dark:text-slate-400">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass-tech-pill"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                    {project.caseStudyId ? (
                      <button
                        id={`case-study-btn-${project.id}`}
                        onClick={() => onOpenCaseStudy(project.caseStudyId!)}
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer group/btn"
                        title={readingTime ? `Read deep-dive (${readingTime.detailText})` : 'Read case study'}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{t?.caseStudyBtn || "View Case Study"}</span>
                        {readingTime && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono border bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300">
                            {readingTime.displayText}
                          </span>
                        )}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Production Ready</span>
                      </span>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group/repo"
                    >
                      <span>{t?.repoBtn || "Repository"}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
