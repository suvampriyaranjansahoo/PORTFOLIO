import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  FileSpreadsheet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  LucideIcon
} from 'lucide-react';
import { Language } from '../data/translations';

interface Milestone {
  id: string;
  step: string;
  title: string;
  period: string;
  badge: string;
  metric: string;
  metricLabel: string;
  metricColor: string;
  icon: LucideIcon;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  language?: Language;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ language = 'en' }) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('m1');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const milestones: Milestone[] = [
    {
      id: 'm1',
      step: 'PHASE 01',
      title: language === 'de' ? 'Datenbereinigung & Qualitätssicherung' : language === 'fr' ? 'Ingestion et Audit de Qualité des Données' : language === 'hi' ? 'डेटा अंतर्ग्रहण और गुणवत्ता ऑडिट' : 'Data Ingestion & Integrity Auditing',
      period: 'Sep 2025 · Week 1–2',
      badge: '50K+ Records Validated',
      metric: '+35%',
      metricLabel: language === 'de' ? 'Berichtsgenauigkeit' : language === 'fr' ? 'Précision des Rapports' : language === 'hi' ? 'सटीकता में सुधार' : 'Reporting Accuracy Lift',
      metricColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      icon: Database,
      description: language === 'de'
        ? 'Bereinigung und Validierung von 50.000+ Geschäftsdatensätzen in SQL & Excel mit rigorosen Integritätsprüfungen.'
        : language === 'fr'
        ? 'Nettoyage et validation de plus de 50 000 enregistrements télécoms sous SQL et Excel avec contrôles de cohérence stricts.'
        : language === 'hi'
        ? 'SQL और Excel में 50,000+ व्यावसायिक रिकॉर्ड्स को साफ़ और मान्य किया, डेटा अखंडता में 35% सुधार किया।'
        : 'Audited and cleaned 50,000+ business and telemetry records using complex SQL queries and Excel validation formulas.',
      achievements: [
        'Formulated multi-column SQL consistency queries to resolve null values, outlier spikes, and duplicate transactions.',
        'Structured transactional telemetry schemas to enforce data completeness before downstream reporting ingestion.',
        'Decreased recurring monthly data error tickets by 35% across core telecommunication reporting tables.'
      ],
      technologies: ['SQL (CTEs, Window Functions)', 'Microsoft Excel', 'Data Profiling', 'Schema Standardization']
    },
    {
      id: 'm2',
      step: 'PHASE 02',
      title: language === 'de' ? 'Power BI & DAX Modellautomatisierung' : language === 'fr' ? 'Modélisation DAX & Automatisation Power BI' : language === 'hi' ? 'Power BI और DAX डेटा मॉडलिंग ऑटोमेशन' : 'Automated Data Modeling & DAX Workflows',
      period: 'Sep–Oct 2025 · Week 3–4',
      badge: 'Star-Schema & Power Query',
      metric: '-40%',
      metricLabel: language === 'de' ? 'Manuelle Durchlaufzeit' : language === 'fr' ? 'Temps de Traitement' : language === 'hi' ? 'टर्नअराउंड समय' : 'Turnaround Time',
      metricColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      icon: Zap,
      description: language === 'de'
        ? 'Automatisierung von Power BI-Dashboards und Datenmodellen via DAX und Power Query zur Beschleunigung der Berichterstattung.'
        : language === 'fr'
        ? 'Automatisation des flux Power BI et conception de modèles DAX réduisant les délais manuels de 40%.'
        : language === 'hi'
        ? 'DAX और Power Query का उपयोग करके रिपोर्टिंग वर्कफ़्लो को स्वचालित किया जिससे समय 40% कम हुआ।'
        : 'Engineered automated Power BI semantic models and DAX calculation measures replacing static spreadsheet compiling.',
      achievements: [
        'Built dynamic DAX measures for rolling-period KPIs, year-over-year deltas, and cross-filter calculations.',
        'Designed star-schema dimensional structures in Power Query, enabling sub-second visual filtering on heavy tables.',
        'Eliminated over 15 hours per week of manual spreadsheet copy-pasting for operations leadership.'
      ],
      technologies: ['Power BI', 'DAX Measures', 'Power Query M', 'Star-Schema Modeling']
    },
    {
      id: 'm3',
      step: 'PHASE 03',
      title: language === 'de' ? 'Kunden-Churn-Frühwarnsystem' : language === 'fr' ? 'Signaux Précurseurs de Churn & Rétention' : language === 'hi' ? 'ग्राहक चर्न चेतावनी और प्रतिधारण विश्लेषण' : 'Early-Warning Churn Signals & Retention KPIs',
      period: 'Oct 2025 · Week 5–6',
      badge: 'Cross-Functional Strategy',
      metric: '-5%',
      metricLabel: language === 'de' ? 'Churn-Reduktion' : language === 'fr' ? 'Réduction du Churn' : language === 'hi' ? 'चर्न में कमी' : 'Customer Churn Reduction',
      metricColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
      icon: TrendingUp,
      description: language === 'de'
        ? 'Entwicklung von Churn-KPI-Dashboards zur Erkennung früher Abwanderungsrisiken und gezielten Kundenbindung.'
        : language === 'fr'
        ? 'Création de tableaux de bord KPI identifiant les signaux précoces de désabonnement pour actions ciblées.'
        : language === 'hi'
        ? 'चर्न-विश्लेषण डैशबोर्ड विकसित किए जिससे ग्राहक प्रतिधारण टीम को 5% चर्न कम करने में मदद मिली।'
        : 'Created customer telemetry KPI dashboards surfacing drop-off patterns and early-warning usage degradation.',
      achievements: [
        'Analyzed customer usage trajectories to identify key inflection points preceding contract cancellation.',
        'Integrated automated visual alert badges in Power BI to highlight high-risk enterprise accounts.',
        'Directly supported cross-functional customer success campaigns that reduced quarter-over-quarter churn by 5%.'
      ],
      technologies: ['Cohort Analysis', 'Customer Retention Modeling', 'Power BI Executive Views', 'Root-Cause Analytics']
    },
    {
      id: 'm4',
      step: 'PHASE 04',
      title: language === 'de' ? 'Executive-Briefing & Produktionsübergabe' : language === 'fr' ? 'Revue Exécutive & Déploiement Opérationnel' : language === 'hi' ? 'कार्यकारी प्रस्तुति और उत्पादन हैंडऑफ़' : 'Executive Briefing & Production Rollout',
      period: 'Oct 2025 · Week 7–8',
      badge: '100% On-Time Sign-Off',
      metric: '100%',
      metricLabel: language === 'de' ? 'Erfolgreiche Übergabe' : language === 'fr' ? 'Déploiement Réussi' : language === 'hi' ? 'सफल हैंडऑफ़' : 'Production Sign-Off',
      metricColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      icon: Award,
      description: language === 'de'
        ? 'Präsentation der Ergebnisse vor Fachbereichsleitern, Dokumentation des Datenwörterbuchs und vollständige Übergabe.'
        : language === 'fr'
        ? 'Présentation aux directeurs métiers, documentation complète du dictionnaire de données et transition réussie.'
        : language === 'hi'
        ? 'व्यावसायिक अधिकारियों के सामने प्रस्तुति दी, डेटा डिक्शनरी बनाई और उत्पादन सिस्टम को सफलतापूर्वक सौंपा।'
        : 'Presented analytics insights to departmental directors, documented standard operating procedures, and transitioned production assets.',
      achievements: [
        'Authored comprehensive data dictionary and SOP documentation for DAX calculations and data governance.',
        'Conducted knowledge transfer workshops with remote analytics teams for seamless production maintenance.',
        'Received commendation for technical rigor, analytical accuracy, and prompt delivery of enterprise deliverables.'
      ],
      technologies: ['Executive Storytelling', 'Data Governance Documentation', 'SOP Transfer', 'Cross-Functional Handover']
    }
  ];

  // Scroll trigger detection
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight * 0.6 && rect.bottom >= windowHeight * 0.2) {
        const totalHeight = rect.height;
        const currentY = windowHeight * 0.6 - rect.top;
        const progress = Math.max(0, Math.min(1, currentY / totalHeight));
        setScrollProgress(progress);

        // Map progress to active milestone
        const index = Math.min(milestones.length - 1, Math.floor(progress * milestones.length));
        setActiveMilestoneId(milestones[index].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [milestones.length]);

  const activeMilestone = milestones.find(m => m.id === activeMilestoneId) || milestones[0];

  return (
    <div ref={containerRef} className="mt-8 pt-8 border-t border-[#dfe3e9] dark:border-[#262c36] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#a66a12] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'de' ? 'INTERAKTIVE MEILENSTEIN-ZEITLEISTE' : language === 'fr' ? 'CHRONOLOGIE INTERACTIVE DES ÉTAPES' : language === 'hi' ? 'इंटरैक्टिव माइलस्टोन समयरेखा' : 'INTERACTIVE ENGAGEMENT TIMELINE'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full card-level-3 text-[#5c6472] dark:text-[#8b93a1]">
              Scroll-Triggered · VOIS
            </span>
          </div>
          <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] mt-1">
            {language === 'de' 
              ? 'Klicken Sie auf eine Phase oder scrollen Sie, um wichtige Meilensteine und messbare Ergebnisse zu erkunden.'
              : language === 'fr'
              ? 'Cliquez sur une phase ou faites défiler pour explorer les étapes clés et les résultats quantifiés.'
              : language === 'hi'
              ? 'प्रत्येक चरण पर क्लिक करें या स्क्रॉल करके प्रमुख उपलब्धियों और विवरणों को देखें।'
              : 'Click any phase or scroll through the section to explore key milestones, quantifiable metrics, and deliverables.'}
          </p>
        </div>

        {/* Phase selector pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              id={`timeline-btn-${m.id}`}
              onClick={() => setActiveMilestoneId(m.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                activeMilestoneId === m.id
                  ? 'bg-[#a66a12] text-white border-[#a66a12] font-bold shadow-sm'
                  : 'card-level-3 text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:border-[#a66a12]'
              }`}
            >
              Phase 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step navigation with vertical progress track */}
        <div className="lg:col-span-5 relative space-y-3">
          {/* Vertical Glowing Connector Line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-[#dfe3e9] dark:bg-[#262c36] -z-0" />
          <div 
            className="absolute left-[23px] top-6 w-0.5 bg-[#a66a12] transition-all duration-300 -z-0"
            style={{ 
              height: `${Math.max(0, Math.min(100, scrollProgress * 100))}%` 
            }}
          />

          {milestones.map((m, idx) => {
            const isActive = m.id === activeMilestoneId;
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${m.title}`}
                onClick={() => setActiveMilestoneId(m.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveMilestoneId(m.id);
                  }
                }}
                className={`relative z-10 p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                  isActive
                    ? 'card-level-1 border-[#a66a12] dark:border-[#d8a34f] shadow-md !bg-amber-500/[0.04] dark:!bg-amber-500/[0.08]'
                    : 'card-level-2 hover:border-[#a66a12]/60 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Node icon with glowing ring when active */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all font-mono text-xs font-bold ${
                  isActive
                    ? 'bg-[#a66a12] text-white shadow-sm ring-4 ring-[#a66a12]/20'
                    : 'card-level-3 text-[#5c6472] dark:text-[#8b93a1]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                      isActive ? 'text-[#a66a12] dark:text-[#fbbf24]' : 'text-[#8b93a1]'
                    }`}>
                      {m.step} · {m.period}
                    </span>
                    <span className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#a66a12] dark:text-[#fbbf24]' : 'text-[#5c6472] dark:text-[#8b93a1]'
                    }`}>
                      {m.metric}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-[#101318] dark:text-white mt-0.5 truncate">
                    {m.title}
                  </h4>
                  <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] mt-0.5 line-clamp-1">
                    {m.badge}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Milestone Detailed Breakdown */}
        <div className="lg:col-span-7 card-level-1 p-6 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#dfe3e9] dark:border-[#262c36]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-[#a66a12] tracking-wider uppercase">
                  {activeMilestone.step}
                </span>
                <span className="text-xs font-mono text-[#8b93a1]">· {activeMilestone.period}</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101318] dark:text-white">
                {activeMilestone.title}
              </h3>
            </div>

            {/* Metric pill */}
            <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 font-mono ${activeMilestone.metricColor}`}>
              <span className="font-bold text-lg">{activeMilestone.metric}</span>
              <span className="text-xs font-semibold uppercase">{activeMilestone.metricLabel}</span>
            </div>
          </div>

          <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
            {activeMilestone.description}
          </p>

          {/* Achievement Bullets */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-[#a66a12] dark:text-[#fbbf24] font-semibold uppercase tracking-wider">
              {language === 'de' ? 'SCHLÜSSELLEISTUNGEN & ERGEBNISSE' : language === 'fr' ? 'RÉALISATIONS CLÉS' : language === 'hi' ? 'प्रमुख परिणाम और उपलब्धियां' : 'KEY ACHIEVEMENTS & DELIVERABLES'}
            </div>
            {activeMilestone.achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                <CheckCircle2 className="w-4 h-4 text-[#a66a12] dark:text-[#fbbf24] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          {/* Applied Stack Tags */}
          <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36] flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-[#8b93a1] mr-1">Applied Stack:</span>
            {activeMilestone.technologies.map(tech => (
              <span 
                key={tech}
                className="px-2.5 py-0.5 rounded text-[11px] font-mono card-level-3 text-[#5c6472] dark:text-[#8b93a1]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
