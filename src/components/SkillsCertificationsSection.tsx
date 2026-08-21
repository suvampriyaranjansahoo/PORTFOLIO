import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Terminal, Wrench } from 'lucide-react';
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
        <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2">
          {t?.label || "07 · TOOLBOX & CREDENTIALS"}
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight mb-8">
          {t?.heading || "Technical Inventory"}
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="holo-border-active p-[1.5px] rounded-xl group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-5 rounded-[10.5px] glass-morphism-card h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs font-semibold text-[#a66a12] tracking-wider mb-3 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-[10px] text-[#8b93a1] font-mono">0{idx + 1}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/90 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="font-mono text-xs text-[#8b93a1] tracking-widest uppercase mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#a66a12]" />
            <span>{t?.certsLabel || "Verified Certifications"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="holo-border-active p-[1.5px] rounded-xl group transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="p-4 rounded-[10.5px] glass-morphism-card flex items-center justify-between gap-3 h-full">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#101318] dark:text-white truncate group-hover:text-amber-500 transition-colors">
                      {cert.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#8b93a1]">
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
