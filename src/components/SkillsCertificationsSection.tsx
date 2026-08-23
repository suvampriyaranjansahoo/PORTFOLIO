import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Terminal, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';
import { SectionHeader } from './SectionHeader';

interface SkillsCertificationsSectionProps {
  language?: Language;
}

export const SkillsCertificationsSection: React.FC<SkillsCertificationsSectionProps> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language]?.skills;

  return (
    <section id="skills" className="section-ambient-container ambient-theme-warm py-16 sm:py-20 overflow-hidden border-b border-[#fecdd3]/70 dark:border-white/[0.08]">
      {/* Thematic Ambient Light Shift (Warmer Amber/Gold Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
        <SectionHeader
          label={t?.label || "07 · TOOLBOX & CREDENTIALS"}
          heading={t?.heading || "Technical Inventory"}
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 card-level-2 flex flex-col justify-between bg-white/90 dark:bg-[#141924]/85 border border-[#fecdd3] dark:border-white/10 hover:border-[#e11d48] dark:hover:border-white/30 transition-all shadow-xs"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-[#e11d48] dark:text-[#fbbf24] tracking-wider mb-3">
                  {cat.category}
                </div>
                <ul className="space-y-1.5 text-xs text-[#5e3240] dark:text-[#9ea7b4]">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="font-mono text-xs text-[#a06b7a] dark:text-[#8b93a1] tracking-widest uppercase mb-4 flex items-center gap-2 font-semibold">
            <Award className="w-4 h-4 text-[#e11d48] dark:text-[#fbbf24]" />
            <span>{t?.certsLabel || "Verified Certifications"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 card-level-3 flex items-center justify-between gap-3 hover:border-[#e11d48] dark:hover:border-white/30 transition-all bg-white/80 dark:bg-[#141924]/70 border border-[#fecdd3]/70 dark:border-white/10 shadow-2xs"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#2d151c] dark:text-white truncate">
                    {cert.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#a06b7a] dark:text-[#8b93a1]">
                    {cert.issuer} · {cert.year}
                  </div>
                </div>

                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
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
