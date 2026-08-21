import React from 'react';
import { ArrowUpRight, BookOpen, Check, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

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
    <section id="work" className="py-16 sm:py-20 overflow-hidden">
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
          <div 
            role="tablist"
            aria-label="Project Categories"
            className="flex flex-wrap gap-1.5 p-1 bg-[#dfe3e9]/60 dark:bg-[#1a1f28] rounded-xl border border-[#dfe3e9] dark:border-[#262c36]"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                tabIndex={0}
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
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                project.featured
                  ? 'md:col-span-2 bg-[#111419] text-white border-[#262c36] shadow-xl p-6 sm:p-8'
                  : 'bg-white dark:bg-[#151920] border-[#dfe3e9] dark:border-[#262c36] p-6 sm:p-7 shadow-xs hover:border-[#a66a12] dark:hover:border-[#a66a12]'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3 h-3" />
                        FLAGSHIP PROOF
                      </span>
                    )}
                    <span className={`text-[10px] font-mono font-semibold uppercase ${
                      project.featured ? 'text-[#a0a8b5]' : 'text-[#8b93a1]'
                    }`}>
                      {project.meta}
                    </span>
                  </div>

                  <span className={`text-xs font-mono font-bold ${
                    project.featured ? 'text-amber-300' : 'text-[#a66a12]'
                  }`}>
                    {project.metrics[0]?.value} {project.metrics[0]?.label}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className={`font-display font-bold text-xl sm:text-2xl mb-1.5 tracking-tight ${
                  project.featured ? 'text-white' : 'text-[#101318] dark:text-white'
                }`}>
                  {project.title}
                </h3>
                <div className={`text-xs font-mono mb-4 ${
                  project.featured ? 'text-amber-200/80' : 'text-[#a66a12]'
                }`}>
                  {project.tagline}
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-5 ${
                  project.featured ? 'text-[#c6cad1]' : 'text-[#5c6472] dark:text-[#9ea7b4]'
                }`}>
                  {project.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {project.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className={`p-2.5 rounded-xl border ${
                        project.featured
                          ? 'bg-[#181d24] border-[#2c3240]'
                          : 'bg-[#f6f7f9] dark:bg-[#1a1f28] border-[#dfe3e9] dark:border-[#30363d]'
                      }`}
                    >
                      <div className={`font-mono font-bold text-sm sm:text-base ${
                        project.featured ? 'text-amber-300' : 'text-[#a66a12]'
                      }`}>
                        {m.value}
                      </div>
                      <div className={`text-[10px] font-mono uppercase mt-0.5 line-clamp-1 ${
                        project.featured ? 'text-[#8b93a1]' : 'text-[#5c6472] dark:text-[#8b93a1]'
                      }`}>
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
                      className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                        project.featured
                          ? 'bg-[#212630] border-[#303846] text-[#c6cad1]'
                          : 'bg-[#f6f7f9] dark:bg-[#1a1f28] border-[#dfe3e9] dark:border-[#30363d] text-[#5c6472] dark:text-[#8b93a1]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                project.featured ? 'border-[#2c3240]' : 'border-[#dfe3e9] dark:border-[#262c36]'
              }`}>
                {project.caseStudyId ? (
                  <button
                    id={`case-study-btn-${project.id}`}
                    onClick={() => onOpenCaseStudy(project.caseStudyId!)}
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold hover:underline cursor-pointer ${
                      project.featured ? 'text-amber-300' : 'text-[#a66a12]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t?.caseStudyBtn || "View Case Study →"}</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-mono text-[#8b93a1]">Verified Project</span>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-mono transition-colors ${
                    project.featured 
                      ? 'text-[#c6cad1] hover:text-white' 
                      : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
                  }`}
                >
                  <span>{t?.repoBtn || "Repository"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
