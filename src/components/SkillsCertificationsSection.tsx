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
    <section id="skills" className="py-16 sm:py-20 max-w-[1160px] mx-auto px-4 sm:px-6">
      <div>
        <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2 font-semibold">
          {t?.label || "07 · TOOLBOX & CREDENTIALS"}
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#101318] dark:text-white tracking-tight mb-8">
          {t?.heading || "Technical Inventory"}
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs flex flex-col justify-between transition-all hover:border-[#a66a12]/40"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-[#a66a12] tracking-wider mb-3.5 flex items-center justify-between">
                  <span>{cat.category}</span>
                  <span className="text-[10px] text-[#8b93a1] font-mono">0{idx + 1}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-[#e6edf3]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="font-mono text-xs text-[#8b93a1] tracking-widest uppercase mb-4 flex items-center gap-2 font-semibold">
            <Award className="w-4 h-4 text-[#a66a12]" />
            <span>{t?.certsLabel || "Verified Certifications"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs flex items-center justify-between gap-3 transition-all hover:border-[#a66a12]/40 group"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#101318] dark:text-white truncate group-hover:text-[#a66a12] transition-colors">
                    {cert.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#5c6472] dark:text-[#8b93a1]">
                    {cert.issuer} · {cert.year}
                  </div>
                </div>

                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

