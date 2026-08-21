import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  FileSpreadsheet, 
  Layers, 
  LineChart, 
  Target, 
  Database, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  GraduationCap,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { CoffeeFuelCounter } from './CoffeeFuelCounter';
import { InteractiveCard } from './InteractiveCard';

interface AboutSectionProps {
  language?: Language;
  onOpenRecruiter?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  language = 'en',
  onOpenRecruiter
}) => {
  const [activePillar, setActivePillar] = useState<'business' | 'product' | 'engineering'>('business');
  const t = TRANSLATIONS[language]?.about || TRANSLATIONS['en'].about;

  const pillars = [
    {
      id: 'business' as const,
      label: language === 'de' ? 'Business Analytics' : language === 'fr' ? 'Business Analytics' : language === 'hi' ? 'बिजनेस एनालिटिक्स' : 'Business Analytics',
      badge: 'Decisions & ROI',
      icon: LineChart,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      headline: 'Uncovering the "Why" Behind the Numbers',
      summary: 'Bridging technical data stores with executive decision-making. I turn disparate operational data into automated KPI dashboards, cohort retention models, and revenue risk assessments that stakeholders can trust.',
      keySkills: ['KPI Definition & Discovery', 'DAX & Power Query Automation', 'Cohort Retention & Churn Analysis', 'Executive & Board Reporting'],
      proofMetric: '50K+ business records audited & 40% reporting cycle cut at VOIS'
    },
    {
      id: 'product' as const,
      label: language === 'de' ? 'Produkt-Analytik' : language === 'fr' ? 'Product Analytics' : language === 'hi' ? 'प्रोडक्ट एनालिटिक्स' : 'Product Analytics',
      badge: 'Prioritization & UX',
      icon: Target,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      headline: 'Data-Backed Roadmaps & Prioritization',
      summary: 'Using qualitative feedback and quantitative behavioral data to guide what to build next. Experienced in applying the RICE framework, customer sentiment clustering (NLP), and funnel drop-off analysis to eliminate roadmap guesswork.',
      keySkills: ['RICE & ICE Scoring Frameworks', 'User Review NLP Topic Modeling', 'Funnel & Conversion Tracking', 'Feature Impact Evaluation'],
      proofMetric: '6,000+ UPI app reviews mined into 8 structured feature themes (PriorityPe)'
    },
    {
      id: 'engineering' as const,
      label: language === 'de' ? 'Data Engineering' : language === 'fr' ? 'Data Engineering' : language === 'hi' ? 'डेटा इंजीनियरिंग' : 'Data Engineering',
      badge: 'Scale & Integrity',
      icon: Database,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      headline: 'Reliable Pipelines & Dimensional Models',
      summary: 'Building the foundational plumbing that powers analytics. Strong foundation in relational SQL, Bronze/Silver/Gold layered architectures, star-schema data modeling, and real-time PySpark streaming on Microsoft Azure.',
      keySkills: ['Complex SQL (CTEs, Window Functions)', 'Star-Schema & Dimensional Modeling', 'Azure Databricks & PySpark ETL', 'Data Quality & Reconciliation'],
      proofMetric: '78K+ financial records analyzed & sub-second streaming pipelines engineered'
    }
  ];

  const currentPillar = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <section id="about" className="py-14 sm:py-20 border-t border-[#dfe3e9] dark:border-[#262c36]">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t?.label || "01 · WHO I AM & PROFESSIONAL PROFILE"}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight leading-tight mb-4">
            {t?.heading || "Data that answers business questions."}
          </h2>
          <p className="text-base sm:text-lg text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
            {t?.p1 || "I am a 2026 Computer Science Engineering graduate who operates at the intersection of data analysis, product intuition, and robust data engineering."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Narrative & Interactive Domain Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Core Narrative */}
            <div className="space-y-4 text-sm sm:text-base text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed bg-white/70 dark:bg-[#151920]/70 p-5 sm:p-6 rounded-2xl border border-[#dfe3e9] dark:border-[#262c36] shadow-xs">
              <p>
                {t?.p2 || "At Vodafone Intelligent Solutions (VOIS), I validated over 50,000+ business records, automated complex Power BI reporting workflows using DAX and Power Query to slash turnaround by 40%, and built churn-analysis KPIs directly linked to a cross-functional 5% churn reduction."}
              </p>
              <p>
                {t?.p3 || "My independent projects range from customer segmentation and financial distress analysis across 78,000+ records to building PriorityPe (an NLP + RICE product prioritization engine) and MediFlowRT (real-time Azure streaming analytics)."}
              </p>
            </div>

            {/* Interactive Domain Pillar Selector */}
            <div className="pt-1">
              <div className="text-xs font-mono uppercase text-[#8b93a1] tracking-wider mb-3">
                How I Bridge Analytical Domains:
              </div>

              {/* Tab Pills */}
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] mb-4">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  const isActive = activePillar === pillar.id;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillar(pillar.id)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-[#1c222d] text-[#101318] dark:text-white shadow-xs border border-[#dfe3e9] dark:border-[#30363d]'
                          : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? pillar.color : ''}`} />
                      <span className="hidden sm:inline">{pillar.label}</span>
                      <span className="sm:hidden">{pillar.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Pillar Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-2 rounded-lg ${currentPillar.bgColor} ${currentPillar.color}`}>
                      <currentPillar.icon className="w-4 h-4" />
                    </span>
                    <h3 className="font-semibold text-base text-[#101318] dark:text-white">
                      {currentPillar.headline}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${currentPillar.bgColor} ${currentPillar.color} border ${currentPillar.borderColor}`}>
                    {currentPillar.badge}
                  </span>
                </div>

                <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                  {currentPillar.summary}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentPillar.keySkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Proof Metric Tag */}
                <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36] flex items-center gap-2 text-xs font-mono text-[#a66a12]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{currentPillar.proofMetric}</span>
                </div>
              </div>
            </div>

            {/* Core Operating Principles */}
            <div className="pt-1">
              <div className="text-xs font-mono uppercase text-[#8b93a1] tracking-wider mb-3">
                Core Working Principles:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101318] dark:text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Audit Before Modeling</span>
                  </div>
                  <p className="text-[11px] text-[#5c6472] dark:text-[#8b93a1] leading-normal">
                    Reconcile edge-cases and validate distributions before drawing conclusions.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101318] dark:text-white">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                    <span>Focus on Decision ROI</span>
                  </div>
                  <p className="text-[11px] text-[#5c6472] dark:text-[#8b93a1] leading-normal">
                    Every analysis must answer: &ldquo;What should we do differently tomorrow?&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101318] dark:text-white">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" />
                    <span>Pragmatic Stack</span>
                  </div>
                  <p className="text-[11px] text-[#5c6472] dark:text-[#8b93a1] leading-normal">
                    Choose the right tool — from quick SQL pivots to automated Azure pipelines.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Fast Profile Card & Key Credentials Bento (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Profile Summary Bento */}
            <InteractiveCard
              featured={true}
              glowColor="rgba(216, 163, 79, 0.45)"
              className="p-6 space-y-5"
            >
              
              <div className="flex items-center justify-between pb-4 border-b border-[#dfe3e9] dark:border-[#262c36]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#a66a12]/10 flex items-center justify-center font-display font-bold text-lg text-[#a66a12]">
                    SP
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#101318] dark:text-white">
                      {PERSONAL_INFO.name}
                    </div>
                    <div className="text-xs text-[#a66a12] font-mono">
                      2026 B.Tech CSE Candidate
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available 2026
                </span>
              </div>

              {/* Academic Highlights */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#a66a12] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#101318] dark:text-white">
                      B.Tech in Computer Science & Engineering
                    </div>
                    <div className="text-[#5c6472] dark:text-[#9ea7b4]">
                      {PERSONAL_INFO.education.university} · <span className="font-mono font-bold text-[#101318] dark:text-white">8.18 / 10 CGPA</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#8b93a1]">
                      {PERSONAL_INFO.education.period}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#dfe3e9] dark:border-[#262c36]">
                  <Briefcase className="w-4 h-4 text-[#a66a12] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#101318] dark:text-white">
                      Data Analyst Intern
                    </div>
                    <div className="text-[#5c6472] dark:text-[#9ea7b4]">
                      Vodafone Intelligent Solutions (VOIS) · Sep–Oct 2025
                    </div>
                    <div className="text-[11px] text-[#5c6472] dark:text-[#8b93a1] mt-0.5">
                      Automated reporting with DAX/Power Query; built retention KPI tracking.
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Stack Pills */}
              <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36]">
                <div className="text-[10px] font-mono uppercase text-[#8b93a1] mb-2">
                  Daily Technology Stack:
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white">SQL (PostgreSQL/Synapse)</span>
                  <span className="px-2 py-0.5 rounded bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white">Python (Pandas, Scikit-learn)</span>
                  <span className="px-2 py-0.5 rounded bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white">Power BI & DAX</span>
                  <span className="px-2 py-0.5 rounded bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white">Microsoft Azure</span>
                  <span className="px-2 py-0.5 rounded bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white">Advanced Excel & Power Query</span>
                  <span className="px-2 py-0.5 rounded bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white">RICE Prioritization</span>
                </div>
              </div>

              {/* Target Roles & Location */}
              <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8b93a1]">Target Roles:</span>
                  <span className="font-semibold text-[#101318] dark:text-white text-right">Data · Business · Product Analyst</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b93a1]">Location:</span>
                  <span className="text-[#101318] dark:text-white text-right">Gurgaon / Bhubaneswar / Remote</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href="#work"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#101318] dark:bg-white text-white dark:text-[#101318] text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {onOpenRecruiter && (
                  <button
                    onClick={onOpenRecruiter}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#dfe3e9] dark:border-[#30363d] bg-[#f6f7f9] dark:bg-[#0e1116] text-xs font-mono font-medium text-[#101318] dark:text-white hover:border-[#a66a12] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#a66a12]" />
                    <span>60s Brief</span>
                  </button>
                )}
              </div>

            </InteractiveCard>

            {/* Schooling Merit Callout */}
            <div className="p-4 rounded-xl bg-[#f6f7f9] dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] flex items-center justify-between text-xs">
              <div>
                <span className="font-mono text-[11px] text-[#8b93a1] uppercase">Pre-Engineering Distinction</span>
                <div className="font-semibold text-[#101318] dark:text-white mt-0.5">
                  12th Science (PCM): <span className="text-emerald-600 dark:text-emerald-400">93.85%</span> · 10th: <span className="text-emerald-600 dark:text-emerald-400">90.67%</span>
                </div>
              </div>
              <a
                href="#academics"
                className="text-[11px] font-mono text-[#a66a12] hover:underline shrink-0 ml-2"
              >
                View Details →
              </a>
            </div>

            {/* Coffee Consumed & Engineering Fuel Counter */}
            <CoffeeFuelCounter initialHours={1480} />

          </div>

        </div>

      </div>
    </section>
  );
};
