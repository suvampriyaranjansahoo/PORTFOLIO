import React from 'react';
import { ArrowUpRight, BookOpen, Check, ExternalLink, Layers, Sparkles, TrendingUp, Zap, Target, ShieldCheck } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';
import { SectionHeader } from './SectionHeader';
import { ProjectVisualPreview } from './ProjectVisualPreview';

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
    <section id="work" className="section-ambient-container ambient-theme-cool py-16 sm:py-20 overflow-hidden">
      {/* Thematic Ambient Light Shift (Cooler Cyan / Electric Ice Blue Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
        <SectionHeader
          label={t?.label || "03 · SELECTED WORK"}
          heading={t?.heading || "Proof, not project lists."}
          action={
            <div 
              role="tablist"
              aria-label="Project Categories"
              className="flex flex-wrap gap-1.5 p-1 bg-white/90 dark:bg-[#161b24]/90 rounded-xl border border-[#fecdd3] dark:border-white/10 shadow-2xs backdrop-blur-md"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`filter-btn-${cat.id}`}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  tabIndex={0}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`filter-chip focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
                    selectedCategory === cat.id ? 'filter-chip-active' : ''
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          }
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const badge = project.impactBadge;

            return (
              <div
                key={project.id}
                className="project-card-interactive card-level-2 group/card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white/95 dark:bg-[#141924]/90 border border-[#fecdd3] dark:border-white/10"
              >
                <div>
                  {/* Top Bar: Category Meta & Prominent Impact Statistic Badge */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#a06b7a] dark:text-[#8b93a1]">
                        {project.meta}
                      </span>
                    </div>

                    {/* Small Key Impact Statistics Badge */}
                    {badge ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-tight bg-gradient-to-r from-rose-500/10 to-rose-500/5 dark:from-sky-500/15 dark:to-indigo-500/10 border border-rose-500/25 dark:border-sky-400/30 text-[#e11d48] dark:text-[#38bdf8] shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] dark:bg-[#38bdf8] animate-pulse-glow shrink-0" />
                        <span className="tabular-nums">{badge.value}</span>
                        <span className="text-[10px] font-medium opacity-85 hidden sm:inline">{badge.label.split(' ')[0]}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono font-bold text-[#e11d48] dark:text-[#fbbf24]">
                        {project.metrics[0]?.value} {project.metrics[0]?.label}
                      </span>
                    )}
                  </div>

                  {/* Visual Media Carousel / Hover Preview */}
                  {project.media && project.media.length > 0 && (
                    <ProjectVisualPreview
                      projectId={project.id}
                      mediaList={project.media}
                      projectTitle={project.title}
                      projectFlow={project.flow}
                      onOpenCaseStudy={project.caseStudyId ? () => onOpenCaseStudy(project.caseStudyId!) : undefined}
                    />
                  )}

                  {/* Project Title with Tightened Geometric Display Hierarchy */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl mb-1.5 tracking-[-0.025em] leading-snug text-[#2d151c] dark:text-white group-hover/card:text-[#e11d48] dark:group-hover/card:text-[#38bdf8] transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Editorial Subtitle / Tagline */}
                  <div className="text-xs font-mono mb-2 text-[#e11d48] dark:text-[#38bdf8] font-semibold tracking-tight">
                    {project.tagline}
                  </div>

                  {/* Solved Question Accent */}
                  {project.question && (
                    <div className="text-xs italic text-[#7e4354] dark:text-[#94a3b8] mb-3.5 border-l-2 border-[#fecdd3] dark:border-white/15 pl-2.5 py-0.5 leading-relaxed font-sans">
                      &ldquo;{project.question}&rdquo;
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm leading-[1.65] mb-5 text-[#5e3240] dark:text-[#9ea7b4]">
                    {project.description}
                  </p>

                  {/* Metrics Grid / Data Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="metric-strip-card p-2.5 rounded-xl border border-[#fecdd3]/60 dark:border-white/5 bg-rose-500/5 dark:bg-white/[0.03]"
                      >
                        <div className="font-mono font-bold text-sm sm:text-base tabular-nums text-[#e11d48] dark:text-[#fbbf24]">
                          {m.value}
                        </div>
                        <div className="text-[10px] font-mono uppercase mt-0.5 line-clamp-1 text-[#5e3240] dark:text-[#8b93a1] font-medium tracking-wider">
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
                        className="tech-pill text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t border-[#fecdd3]/60 dark:border-[#262c36] flex items-center justify-between gap-3">
                  {project.caseStudyId ? (
                    <button
                      id={`case-study-btn-${project.id}`}
                      onClick={() => onOpenCaseStudy(project.caseStudyId!)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold hover:underline cursor-pointer rounded px-1.5 py-1 focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none text-[#e11d48] dark:text-[#38bdf8] group/btn transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span>{t?.caseStudyBtn || "View Case Study →"}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-[#a06b7a] dark:text-[#8b93a1] font-medium">Verified Project</span>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors rounded px-2 py-1 focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none text-[#5e3240] dark:text-[#8b93a1] hover:text-[#2d151c] dark:hover:text-white font-medium group/link"
                  >
                    <span>{t?.repoBtn || "Repository"}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

