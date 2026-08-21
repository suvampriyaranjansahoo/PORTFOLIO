import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface SkillsCertificationsSectionProps {
  language?: Language;
}

export const SkillsCertificationsSection: React.FC<SkillsCertificationsSectionProps> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language]?.skills;

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
        <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
          {t?.label || "07 · TOOLBOX & CREDENTIALS"}
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-8">
          {t?.heading || "Technical Inventory"}
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="holo-border-active p-[1.5px] rounded-2xl group transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="p-5 rounded-[calc(1rem-1.5px)] glass-morphism-card h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider mb-3.5 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-[10px] text-slate-400 font-mono">0{idx + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="glass-tech-pill text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>{t?.certsLabel || "Verified Certifications"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="holo-border-active p-[1.5px] rounded-xl group transition-all duration-300 hover:-translate-y-0.5 shadow-md"
              >
                <div className="p-4 rounded-[calc(0.75rem-1.5px)] glass-morphism-card flex items-center justify-between gap-3 h-full">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cert.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {cert.issuer} · {cert.year}
                    </div>
                  </div>

                  <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

