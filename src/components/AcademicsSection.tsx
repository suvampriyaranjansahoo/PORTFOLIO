import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Database, 
  Calculator, 
  Code2, 
  FileCheck2,
  ArrowRight,
  ArrowDown,
  Network
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface AcademicsSectionProps {
  language?: Language;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ language = 'en' }) => {
  return (
    <section id="academics" className="relative py-20 overflow-hidden bg-[#0a0d14] border-t border-[#262c36]">
      {/* SECTION 1: Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.15)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_rgba(88,28,135,0.08)_0%,_transparent_60%)]" />
        
        {/* Network / Dotted Paths Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '32px 32px' 
          }}
        />
        
        {/* Subtle Geometric Wireframes / Nodes */}
        <div className="absolute top-1/4 left-10 w-64 h-64 border border-[#262c36] rounded-full opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-[#262c36] rounded-full opacity-10 translate-x-1/3" />
      </div>

      <div className="relative max-w-[1160px] mx-auto px-4 sm:px-6 z-10">
        
        {/* SECTION 1: Intro */}
        <div className="mb-12">
          <div className="font-mono text-xs text-[#3b82f6] tracking-widest uppercase mb-3 flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 · ACADEMIC JOURNEY</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Building a strong technical foundation.
          </h2>
          <p className="text-[#8b93a1] max-w-2xl text-sm leading-relaxed">
            A structured academic journey combining computer science fundamentals, quantitative thinking, data systems, and practical problem-solving.
          </p>
        </div>

        {/* SECTION 2: Academic Credentials */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Card 1: B.Tech Degree (Primary) */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-[#101318] bg-gradient-to-br from-[#151920]/90 to-[#0a0d14]/90 backdrop-blur-xl border border-[#3b82f6]/30 shadow-[0_0_30px_-15px_rgba(59,130,246,0.2)] hover:border-[#3b82f6]/50 transition-colors group overflow-hidden flex flex-col lg:w-2/3">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Header: Label and Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#8b93a1] font-semibold flex items-center gap-2">
                    <span className="text-blue-400">01 —</span> BACHELOR'S DEGREE
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-semibold tracking-widest uppercase text-blue-400">
                  <Award className="w-3.5 h-3.5" />
                  First Class with Distinction
                </div>
              </div>

              {/* Title and CGPA */}
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                <div className="space-y-2 max-w-lg">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    B.Tech in Computer Science & Engineering
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-[#8b93a1] font-mono">
                    <span className="text-[#e6edf3]">Siksha 'O' Anusandhan University (ITER)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#5c6472] font-mono mt-1">
                    <span>2022–2026</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Bhubaneswar, Odisha</span>
                  </div>
                </div>
                <div className="shrink-0 md:text-right">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#5c6472] mb-1">
                    CGPA
                  </div>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    8.18 <span className="text-xl sm:text-2xl text-[#5c6472] font-normal">/ 10</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-6 border-t border-[#262c36]/60 flex-grow">
                <h4 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#8b93a1] mb-4">
                  Academic Highlights & Applied Focus
                </h4>
                <ul className="space-y-3 text-sm text-[#9ea7b4]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 opacity-80" />
                    <span>Built a strong foundation in algorithms, database systems, statistics, software engineering, and computer networks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 opacity-80" />
                    <span>Applied academic concepts through hands-on projects in data analytics, machine learning, cloud technologies, and intelligent systems.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 opacity-80" />
                    <span>Developed practical technical experience using Python, SQL, Power BI, Azure, Databricks, and machine learning frameworks.</span>
                  </li>
                </ul>
              </div>
              
              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-[#262c36]/40 flex items-center gap-2 text-xs font-mono text-[#5c6472]">
                <FileCheck2 className="w-3.5 h-3.5" />
                Academic transcripts and supporting documents available upon request.
              </div>
            </div>
          </div>

          {/* Secondary Cards (12th & 10th) */}
          <div className="lg:w-1/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Card 2: 12th */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-[#151920]/80 backdrop-blur-md border border-[#262c36] hover:border-[#10b981]/40 shadow-sm hover:shadow-[0_4px_20px_-10px_rgba(16,185,129,0.15)] transition-all group overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#8b93a1] font-semibold flex items-center gap-2 mb-4">
                  <span className="text-emerald-400">02 —</span> HIGHER SECONDARY
                </div>
                <div className="mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#5c6472] mb-1">
                    Aggregate
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white group-hover:text-emerald-400 transition-colors">
                    93.85%
                  </div>
                </div>
                <div className="mt-auto space-y-1.5">
                  <h3 className="text-sm font-semibold text-[#e6edf3]">12th · PCM</h3>
                  <div className="text-xs text-[#8b93a1] leading-relaxed">
                    Saraswati Vidya Mandir, Berhampur
                  </div>
                  <div className="text-xs font-mono text-[#5c6472]">
                    2021
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: 10th */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-[#151920]/80 backdrop-blur-md border border-[#262c36] hover:border-[#a855f7]/40 shadow-sm hover:shadow-[0_4px_20px_-10px_rgba(168,85,247,0.15)] transition-all group overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#8b93a1] font-semibold flex items-center gap-2 mb-4">
                  <span className="text-purple-400">03 —</span> SECONDARY SCHOOL
                </div>
                <div className="mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#5c6472] mb-1">
                    Aggregate
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white group-hover:text-purple-400 transition-colors">
                    90.67%
                  </div>
                </div>
                <div className="mt-auto space-y-1.5">
                  <h3 className="text-sm font-semibold text-[#e6edf3]">10th</h3>
                  <div className="text-xs text-[#8b93a1] leading-relaxed">
                    SSVM, Nayagarh
                  </div>
                  <div className="text-xs font-mono text-[#5c6472]">
                    2019
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SECTION 4: Core Academic Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {/* Card A */}
          <div className="p-6 rounded-2xl bg-[#151920]/60 backdrop-blur-md border border-[#262c36] hover:border-[#3b82f6]/40 transition-colors group">
            <Database className="w-5 h-5 text-blue-400 mb-4" />
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Data & Systems Foundation
            </h4>
            <div className="flex flex-wrap gap-2">
              {['DBMS & SQL Optimization', 'Data Structures & Algorithms', 'Statistical Modelling', 'Distributed Systems'].map(skill => (
                <div key={skill} className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#0a0d14]/80 border border-[#262c36] text-[#8b93a1] group-hover:border-[#3b82f6]/30 group-hover:text-[#e6edf3] transition-colors">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Card B */}
          <div className="p-6 rounded-2xl bg-[#151920]/60 backdrop-blur-md border border-[#262c36] hover:border-[#a855f7]/40 transition-colors group">
            <Calculator className="w-5 h-5 text-purple-400 mb-4" />
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Mathematics & Quantitative Rigor
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Probability & Statistics', 'Differential Calculus', 'Linear Algebra', 'Applied Economics'].map(skill => (
                <div key={skill} className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#0a0d14]/80 border border-[#262c36] text-[#8b93a1] group-hover:border-[#a855f7]/30 group-hover:text-[#e6edf3] transition-colors">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Card C */}
          <div className="p-6 rounded-2xl bg-[#151920]/60 backdrop-blur-md border border-[#262c36] hover:border-[#10b981]/40 transition-colors group">
            <Code2 className="w-5 h-5 text-emerald-400 mb-4" />
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Software Engineering & Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Object-Oriented Design', 'Operating Systems', 'Computer Networks', 'Cloud Computing', 'API & Distributed Architecture'].map(skill => (
                <div key={skill} className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#0a0d14]/80 border border-[#262c36] text-[#8b93a1] group-hover:border-[#10b981]/30 group-hover:text-[#e6edf3] transition-colors">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: Skills Derived From Academic Experience */}
        <div className="mb-20 px-4 sm:px-8 py-10 rounded-3xl border border-[#262c36]/40 bg-gradient-to-b from-[#151920]/40 to-transparent">
          <div className="text-center mb-10">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-3">From Fundamentals to Application</h3>
            <p className="text-sm text-[#8b93a1] max-w-xl mx-auto">
              Translating computer science fundamentals into practical data, analytics, engineering, and AI solutions.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-3 relative max-w-5xl mx-auto">
            {/* Background connection line (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-[#262c36] via-[#3b82f6]/30 to-[#262c36] -translate-y-1/2 z-0" />

            <FlowCard title="Computer Science Fundamentals" tech="Python · Java · C++ · SQL" activeColor="text-blue-400" borderHover="hover:border-blue-500/40" />
            <Arrow direction="right" />
            <Arrow direction="down" />
            
            <FlowCard title="Data & Analytics" tech="Pandas · Power BI · Excel · Statistics" activeColor="text-purple-400" borderHover="hover:border-purple-500/40" />
            <Arrow direction="right" />
            <Arrow direction="down" />

            <FlowCard title="Cloud & Engineering" tech="Azure · Databricks · PySpark · ETL" activeColor="text-emerald-400" borderHover="hover:border-emerald-500/40" />
            <Arrow direction="right" />
            <Arrow direction="down" />

            <FlowCard title="AI & Machine Learning" tech="Scikit-learn · TensorFlow · NLP · CV" activeColor="text-orange-400" borderHover="hover:border-orange-500/40" />
          </div>
        </div>

        {/* SECTION 6: Currently Exploring Closing Card */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#262c36] via-[#3b82f6]/30 to-[#262c36] overflow-hidden group">
          <div className="absolute top-0 right-0 p-5">
            {/* Pulsing Node */}
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </div>
          </div>
          <div className="p-8 sm:p-10 rounded-[calc(1rem-1px)] bg-[#101318] flex flex-col gap-4 relative z-10">
            <div className="font-mono text-[10px] font-semibold tracking-widest uppercase text-blue-400 flex items-center gap-2">
              <Network className="w-3.5 h-3.5" />
              CURRENTLY EXPLORING
            </div>
            
            <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white">
              Business Analyst <span className="text-[#262c36] mx-1 sm:mx-2 font-light">/</span> Data Analyst <span className="text-[#262c36] mx-1 sm:mx-2 font-light">/</span> Product Analyst <br className="hidden sm:block" /> <span className="hidden sm:inline-block mt-2">Data Engineer <span className="text-[#262c36] mx-1 sm:mx-2 font-light">/</span> AI/ML Engineer</span>
            </h3>
            
            <p className="text-sm text-[#8b93a1] max-w-3xl leading-relaxed mt-2">
              Open to full-time and graduate opportunities where data analysis, business problem-solving, product thinking, and technical execution come together to create measurable impact.
            </p>

            <div className="mt-4 pt-5 border-t border-[#262c36]/60 flex flex-wrap items-center gap-4 text-xs font-mono text-[#5c6472]">
              <span className="flex items-center gap-1.5 text-blue-400"><Sparkles className="w-3.5 h-3.5" /> Available for opportunities</span>
              <span className="hidden sm:inline text-[#262c36]">•</span>
              <span>Open to relocation</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const FlowCard = ({ title, tech, activeColor, borderHover }: { title: string, tech: string, activeColor: string, borderHover: string }) => (
  <div className={`w-full lg:w-64 p-5 rounded-xl bg-[#101318] border border-[#262c36] shadow-sm relative z-10 ${borderHover} transition-colors duration-300 group`}>
    <div className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8b93a1] mb-2 group-hover:${activeColor} transition-colors duration-300`}>{title}</div>
    <div className="text-[11px] font-mono text-[#5c6472]">{tech}</div>
  </div>
);

const Arrow = ({ direction }: { direction: 'right' | 'down' }) => (
  <div className="relative z-10 shrink-0 text-[#262c36]">
    {direction === 'right' ? (
      <ArrowRight className="hidden lg:block w-4 h-4" />
    ) : (
      <ArrowDown className="lg:hidden w-4 h-4 my-1 opacity-50" />
    )}
  </div>
);

