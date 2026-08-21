import React from 'react';
import { Award, ShieldCheck, Database, Hexagon, Monitor, Code2, LineChart, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

interface SkillsCertificationsSectionProps {
  language?: Language;
}

const getCertStyle = (issuer: string) => {
  if (issuer.includes('Oracle')) return { icon: Database, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
  if (issuer.includes('Databricks')) return { icon: Hexagon, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
  if (issuer.includes('IBM')) return { icon: Monitor, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
  if (issuer.includes('HackerRank')) return { icon: Code2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  if (issuer.includes('VOIS')) return { icon: LineChart, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  return { icon: Award, color: 'text-[#a66a12] dark:text-[#a66a12]', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
};

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, idx) => {
              const style = getCertStyle(cert.issuer);
              const Icon = style.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs flex flex-col gap-4 transition-all hover:border-[#a66a12]/40 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-2.5 rounded-lg shrink-0 border ${style.bg} ${style.color} ${style.border}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-[#101318] dark:text-white group-hover:text-[#a66a12] transition-colors leading-tight mb-1.5">
                      {cert.title}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">{cert.issuer}</span>
                      <span className="text-[#dfe3e9] dark:text-[#262c36]">•</span>
                      <span className="text-[#a66a12] font-semibold">{cert.year}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#a66a12]" />
                    <span className="text-xs font-mono text-[#5c6472] dark:text-[#8b93a1] uppercase tracking-wider">{cert.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

