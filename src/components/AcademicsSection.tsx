import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Database, 
  Calculator, 
  Code2, 
  Layers,
  ChevronRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { ACADEMIC_MILESTONES, ACADEMIC_DOMAINS, PERSONAL_INFO } from '../data/portfolioData';
import { AcademicMilestone } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';

interface AcademicsSectionProps {
  language?: Language;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ language = 'en' }) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('btech');
  const t = TRANSLATIONS[language]?.academics;

  const selectedMilestone: AcademicMilestone = 
    ACADEMIC_MILESTONES.find(m => m.id === selectedMilestoneId) || ACADEMIC_MILESTONES[0];

  return (
    <section id="academics" className="section-ambient-container ambient-theme-emerald py-16 sm:py-20 border-t border-[#dfe3e9] dark:border-[#262c36] overflow-hidden">
      {/* Thematic Ambient Light Shift (Scholarly Forest Emerald & Slate Sapphire Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>{t?.label || "08 · SCHOLASTIC FOUNDATION & QUANTITATIVE RIGOR"}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight">
              {t?.heading || "Academic Credentials & Disciplines"}
            </h2>
          </div>
          <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4] max-w-md">
            {t?.subheading || "A consistent record of quantitative distinction — combining Computer Science systems, calculus, and relational theory."}
          </p>
        </div>

        {/* Top Summary Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="card-level-2 p-4 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-[#a66a12] shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-[#8b93a1]">B.Tech Computer Science</div>
              <div className="text-lg font-display font-bold text-[#101318] dark:text-white">
                8.18 <span className="text-xs font-normal text-[#8b93a1]">/ 10 CGPA</span>
              </div>
              <div className="text-[11px] text-[#5c6472] dark:text-[#9ea7b4]">ITER, SOA University (2022–2026)</div>
            </div>
          </div>

          <div className="card-level-2 p-4 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-[#8b93a1]">Higher Secondary (12th PCM)</div>
              <div className="text-lg font-display font-bold text-emerald-600 dark:text-emerald-400">
                93.85% <span className="text-xs font-normal text-[#8b93a1]">Aggregate</span>
              </div>
              <div className="text-[11px] text-[#5c6472] dark:text-[#9ea7b4]">Saraswati Vidya Mandir, Berhampur (2021)</div>
            </div>
          </div>

          <div className="card-level-2 p-4 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-[#8b93a1]">Secondary School (10th)</div>
              <div className="text-lg font-display font-bold text-blue-600 dark:text-blue-400">
                90.67% <span className="text-xs font-normal text-[#8b93a1]">Aggregate</span>
              </div>
              <div className="text-[11px] text-[#5c6472] dark:text-[#9ea7b4]">SSVM, Nayagarh (2019)</div>
            </div>
          </div>
        </div>

        {/* Interactive Milestone Inspector & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Milestone List Selector (Left) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase text-[#8b93a1] tracking-wider px-1 mb-1">
              {t?.selectLabel || "Select Qualification:"}
            </div>

            {ACADEMIC_MILESTONES.map((m) => {
              const isSelected = m.id === selectedMilestoneId;
              return (
                <button
                  key={m.id}
                  id={`academic-milestone-${m.id}`}
                  aria-pressed={isSelected}
                  tabIndex={0}
                  onClick={() => setSelectedMilestoneId(m.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#1c222d] border-[#a66a12] shadow-sm ring-1 ring-[#a66a12]/30'
                      : 'card-level-3 hover:border-[#a66a12]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-[#a66a12]/10 text-[#a66a12]">
                      {m.badge}
                    </span>
                    <span className="text-xs font-mono text-[#8b93a1]">{m.year}</span>
                  </div>

                  <div className="font-semibold text-sm text-[#101318] dark:text-white leading-snug">
                    {m.degree}
                  </div>

                  <div className="text-xs text-[#5c6472] dark:text-[#9ea7b4] mt-1 truncate">
                    {m.institution}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#dfe3e9] dark:border-[#262c36] flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#101318] dark:text-white">
                      {m.score}
                    </span>
                    <span className="text-[11px] font-mono text-[#8b93a1] flex items-center gap-1">
                      <span>{language === 'de' ? 'Details ansehen' : language === 'fr' ? 'Voir détails' : language === 'hi' ? 'विवरण देखें' : 'View details'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-[#a66a12]' : ''}`} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Milestone Panel (Right) */}
          <div className="lg:col-span-8">
            <div className="h-full card-level-1 p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-[#dfe3e9] dark:border-[#262c36]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {selectedMilestone.honors || 'Distinction'}
                      </span>
                      <span className="text-xs font-mono text-[#8b93a1]">
                        {selectedMilestone.period}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101318] dark:text-white">
                      {selectedMilestone.degree}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#5c6472] dark:text-[#9ea7b4] mt-1.5">
                      <span className="font-medium text-[#101318] dark:text-white">
                        {selectedMilestone.institution}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#a66a12]" />
                        {selectedMilestone.location}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 p-3 card-level-3">
                    <div className="text-[10px] font-mono uppercase text-[#8b93a1]">
                      {selectedMilestone.scoreType}
                    </div>
                    <div className="text-2xl font-display font-bold text-[#a66a12]">
                      {selectedMilestone.score}
                    </div>
                  </div>
                </div>

                {/* Key Scholastic Highlights */}
                <div className="my-5">
                  <h4 className="text-xs font-mono uppercase font-semibold text-[#101318] dark:text-white tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#a66a12]" />
                    <span>{language === 'de' ? "Akademische Schwerpunkte & Praxis" : language === 'fr' ? "Points Forts & Focus Pratique" : language === 'hi' ? "शैक्षणिक विशेषताएं एवं व्यावहारिक अनुप्रयोग" : "Academic Highlights & Applied Focus"}</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#5c6472] dark:text-[#9ea7b4]">
                    {selectedMilestone.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Relevant Coursework & Disciplines */}
                <div>
                  <h4 className="text-xs font-mono uppercase font-semibold text-[#101318] dark:text-white tracking-wider mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#a66a12]" />
                    <span>{language === 'de' ? "Relevante Studienfächer & Disziplinen" : language === 'fr' ? "Matières Clés & Disciplines" : language === 'hi' ? "संबंधित पाठ्यक्रम और मुख्य विषय" : "Relevant Coursework & Core Disciplines"}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMilestone.coursework.map((course, idx) => (
                      <span
                        key={idx}
                        className="card-level-3 px-2.5 py-1 text-xs font-mono text-[#101318] dark:text-white"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Verification Note */}
              <div className="pt-4 border-t border-[#dfe3e9] dark:border-[#262c36] flex items-center justify-between text-xs text-[#8b93a1]">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#a66a12]" />
                  <span>{t?.transcriptsNote || "Transcripts & marksheets available upon recruiter request"}</span>
                </span>
                <span className="font-mono text-[11px] text-[#a66a12]">{t?.verifiedCandidate || "Verified Candidate"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Domains Breakdown (3 Pillars) */}
        <div>
          <div className="font-mono text-xs text-[#8b93a1] tracking-widest uppercase mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#a66a12]" />
            <span>{t?.pillarsLabel || "Academic Pillars Applied to Industry"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACADEMIC_DOMAINS.map((domain, idx) => {
              const Icon = idx === 0 ? Database : idx === 1 ? Calculator : Code2;
              return (
                <div
                  key={idx}
                  className="card-level-2 p-5"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="p-2 rounded-lg bg-[#a66a12]/10 text-[#a66a12]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h4 className="font-semibold text-sm text-[#101318] dark:text-white">
                      {domain.title}
                    </h4>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                    {domain.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a66a12]" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
