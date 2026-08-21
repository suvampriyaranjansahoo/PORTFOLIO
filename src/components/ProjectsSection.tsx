import React from 'react';
import { ArrowUpRight, BookOpen, Check, Clock, ExternalLink, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { getCaseStudyReadingTime } from '../utils/readingTime';
import { InteractiveCard } from './InteractiveCard';
import { SpatialProjectPreview } from './SpatialProjectPreview';

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

  const getCategoryCount = (catId: ProjectCategory) => {
    if (catId === 'all') return PROJECTS.length;
    return PROJECTS.filter(p => p.category === catId).length;
  };

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t?.filters.all || 'All Work' },
    { id: 'product', label: t?.filters.product || 'Product & RICE' },
    { id: 'analytics', label: t?.filters.analytics || 'Business & Financial Analytics' },
    { id: 'engineering', label: t?.filters.engineering || 'Data Engineering' },
    { id: 'ai', label: t?.filters.ai || 'AI / ML' }
  ];

  const currentCategoryLabel = categories.find(c => c.id === selectedCategory)?.label || 'Selected Category';

  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>{t?.label || "03 · SELECTED WORK & SPATIAL INTELLIGENCE"}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {t?.heading || "Proof, not project lists."}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Engineered spatial intelligence systems with interactive telemetry, empirical validation, and end-to-end architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-200/70 dark:bg-slate-900/80 rounded-2xl border border-slate-300/80 dark:border-slate-800 backdrop-blur-md">
            {categories.map((cat) => {
              const count = getCategoryCount(cat.id);
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-btn-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/40 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-300/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Notice (when filtered) */}
        {selectedCategory !== 'all' && (
          <div className="mb-6 p-3 px-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>
                Showing <strong>{filteredProjects.length}</strong> of <strong>{PROJECTS.length}</strong> projects in <strong>{currentCategoryLabel}</strong>
              </span>
            </div>
            <button
              onClick={() => onSelectCategory('all')}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Show All {PROJECTS.length} Projects
            </button>
          </div>
        )}

        {/* Spatial Intelligence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project, idx) => {
            const readingTime = project.caseStudyId ? getCaseStudyReadingTime(project.caseStudyId) : null;
            const isFeatured = project.featured;

            return (
              <InteractiveCard
                key={project.id}
                id={`project-card-${project.id}`}
                featured={isFeatured}
                glowColor={isFeatured ? "rgba(99, 102, 241, 0.32)" : "rgba(168, 85, 247, 0.22)"}
                containerClassName={isFeatured ? 'md:col-span-2' : ''}
                className={isFeatured ? 'p-6 sm:p-8' : 'p-6 sm:p-7'}
                renderSpatialPreview={(isHovered, coords) => (
                  <SpatialProjectPreview
                    projectId={project.id}
                    isHovered={isHovered}
                    coords={coords}
                  />
                )}
              >
                {/* Top Status Accent Line */}
                {isFeatured && (
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-purple-400 via-sky-400 to-emerald-400 shadow-[0_0_16px_rgba(139,92,246,0.8)]" />
                )}

                {/* Ghost watermark index number */}
                <div 
                  className={`ghost-watermark select-none transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1 ${
                    isFeatured 
                      ? 'text-indigo-950/10 dark:text-indigo-400/[0.04]' 
                      : 'text-slate-900/[0.03] dark:text-white/[0.03]'
                  }`}
                >
                  {project.index}
                </div>

                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    {/* Header Badges & Telemetry Ribbon */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {isFeatured ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.25)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                            <Sparkles className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                            FLAGSHIP SYSTEM
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                            <ShieldCheck className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                            VERIFIED
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {project.meta}
                        </span>
                        {readingTime && (
                          <span 
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/25"
                            title={`Estimated reading time: ${readingTime.detailText}`}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            <span>{readingTime.displayText}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 shadow-xs">
                        <Activity className="w-3 h-3 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                        <span>{project.metrics[0]?.value} {project.metrics[0]?.label}</span>
                      </div>
                    </div>

                    {/* Project Title & Subtitle */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl mb-1 tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-xs font-mono mb-3.5 text-indigo-600 dark:text-indigo-400/90 font-medium">
                      {project.tagline}
                    </div>

                    {/* Category Label */}
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[10px] font-mono uppercase font-bold border border-indigo-500/20">
                        {categories.find(c => c.id === project.category)?.label || project.category}
                      </span>
                    </div>

                    {/* Problem Statement */}
                    <div className="mb-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        PROBLEM STATEMENT
                      </div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200 border-l-2 border-indigo-500 pl-3 italic">
                        "{project.question}"
                      </div>
                    </div>

                    {/* Core Architectural Flow Badge */}
                    <div className="mb-4 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-600 dark:text-slate-300 flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0 uppercase text-[10px]">Pipeline:</span>
                      <span className="truncate">{project.flow}</span>
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
                          className="p-2.5 rounded-xl border transition-all duration-300 bg-slate-50/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 group-hover:border-indigo-500/30 group-hover:bg-slate-100/90 dark:group-hover:bg-slate-900/80 shadow-xs"
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

                    {/* Tag Pills Rising on Hover */}
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

                    {/* Actions Bar with Luminous CTA Button */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {project.caseStudyId ? (
                        <button
                          id={`case-study-btn-${project.id}`}
                          onClick={() => onOpenCaseStudy(project.caseStudyId!)}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-500/20 group/btn cursor-pointer"
                          title={readingTime ? `Read deep-dive (${readingTime.detailText})` : 'Read case study'}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{t?.caseStudyBtn || "View Case Study"}</span>
                          {readingTime && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white/20 text-white">
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

                      {project.id === 'prioritype' && (
                        <a
                          href="#demos"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                        >
                          <span>Try the RICE Prioritization Tool</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.id === 'financial-analytics' && (
                        <a
                          href="#demos"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                        >
                          <span>Open SQL Playground</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/40 transition-all group/repo"
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
