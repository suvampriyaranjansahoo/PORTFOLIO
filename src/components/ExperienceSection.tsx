import React, { useState } from 'react';
import { Briefcase, Building2, CheckCircle2, TrendingUp, Zap, Clock, FileSpreadsheet, Sparkles, Database, LayoutDashboard, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { SparklinePreview } from './SparklinePreview';

interface ExperienceSectionProps {
  language?: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language = 'en' }) => {
  const [showExecutiveView, setShowExecutiveView] = useState<boolean>(false);
  const t = TRANSLATIONS[language]?.experience;

  const deliverables = [
    {
      id: 'audit',
      metric: '+35%',
      metricLabel: language === 'de' ? "Berichtsgenauigkeit" : language === 'fr' ? "Précision des Rapports" : language === 'hi' ? "रिपोर्टिंग सटीकता" : "Data & Audit Accuracy",
      sparkline: [10, 18, 22, 28, 35],
      sparklineColor: '#10b981',
      title: "Data Quality & Record Audit Engine",
      tools: ["SQL CTEs", "Excel Advanced", "Outlier Mitigation"],
      summary: "Cleaned and validated 50,000+ business records in SQL and Excel, applying rigorous completeness, outlier, and duplicate resolution checks to improve downstream reporting accuracy by 35%.",
      impact: "50,000+ audited enterprise records across regional telecommunications telemetry."
    },
    {
      id: 'automation',
      metric: '-40%',
      metricLabel: language === 'de' ? "Durchlaufzeit" : language === 'fr' ? "Délai de Traitement" : language === 'hi' ? "टर्नअराउंड समय" : "Turnaround Time",
      sparkline: [50, 42, 35, 28, 15],
      sparklineColor: '#f59e0b',
      title: "Automated Power BI & DAX Reporting",
      tools: ["Power BI", "DAX Measures", "Power Query ETL"],
      summary: "Automated Power BI reporting and Excel data models using DAX measures and Power Query, cutting manual turnaround by 40% and giving department leaders instant visibility into operational metrics.",
      impact: "Weekly reporting cycle compressed from 14 hours down to sub-hourly automated refreshes."
    },
    {
      id: 'churn',
      metric: '-5%',
      metricLabel: language === 'de' ? "Churn-Reduktion" : language === 'fr' ? "Réduction du Churn" : language === 'hi' ? "चर्न में कमी" : "Customer Churn Drop",
      sparkline: [12, 10, 9, 8, 7],
      sparklineColor: '#a66a12',
      title: "Retention & Churn Risk KPI Dashboard",
      tools: ["Cohort Tracking", "KPI Discovery", "Executive Alerts"],
      summary: "Built churn-analysis KPI dashboards that surfaced early-warning retention risk patterns, directly supporting a strategic initiative that reduced customer churn by 5%.",
      impact: "Identified high-drop tenure clusters and fed proactive customer retention workflows."
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 max-w-[1160px] mx-auto px-4 sm:px-6">
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2 font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t?.label || "06 · EXPERIENCE"}</span>
            </div>
            
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#101318] dark:text-white tracking-tight">
              {t?.heading || "Enterprise Track Record"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExecutiveView(!showExecutiveView)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                showExecutiveView
                  ? 'bg-[#a66a12] text-white border-[#a66a12] font-semibold'
                  : 'bg-white dark:bg-[#151920] border-[#dfe3e9] dark:border-[#262c36] text-[#5c6472] dark:text-[#a0a8b5] hover:text-[#101318] dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{showExecutiveView ? 'Standard View' : 'Executive Dashboard View'}</span>
            </button>
          </div>
        </div>

        {/* Main Enterprise Showcase Container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs space-y-6">
          
          {/* Header Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dfe3e9] dark:border-[#262c36]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-white bg-[#e60000] px-2 py-0.5 rounded">VOIS</span>
                <span className="text-xs font-mono text-[#8b93a1]">· Vodafone Intelligent Solutions (Global Shared Services)</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101318] dark:text-white">
                Data Analyst Intern
              </h3>
              <p className="text-sm text-[#5c6472] dark:text-[#a0a8b5]">
                Enterprise Business Analytics, Churn Intelligence & Automated Power BI Architecture — Remote
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] font-mono text-xs text-[#101318] dark:text-white self-start md:self-auto shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#a66a12]" />
              <span>Sep 2025 – Oct 2025</span>
            </div>
          </div>

          {/* SIMULATED EXECUTIVE DASHBOARD VIEW (WHEN TOGGLED) */}
          {showExecutiveView ? (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#dfe3e9] dark:border-[#262c36] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#a66a12] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>VOIS KPI REPORTING DECK · EXECUTIVE PREVIEW</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Live Snapshot
                </span>
              </div>

              {/* KPI Top Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
                  <div className="text-[10px] font-mono text-[#8b93a1] uppercase">Audited Database Size</div>
                  <div className="text-xl font-mono font-bold text-[#101318] dark:text-white mt-0.5">50,000+</div>
                  <div className="text-[10px] text-emerald-500 font-mono mt-1">99.8% reconciliation rate</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
                  <div className="text-[10px] font-mono text-[#8b93a1] uppercase">Automated Turnaround</div>
                  <div className="text-xl font-mono font-bold text-amber-500 mt-0.5">-40%</div>
                  <div className="text-[10px] text-[#5c6472] dark:text-[#8b93a1] font-mono mt-1">DAX Power Query engine</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
                  <div className="text-[10px] font-mono text-[#8b93a1] uppercase">Net Retention Impact</div>
                  <div className="text-xl font-mono font-bold text-[#a66a12] mt-0.5">-5.0%</div>
                  <div className="text-[10px] text-emerald-500 font-mono mt-1">Churn rate reduction</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
                  <div className="text-[10px] font-mono text-[#8b93a1] uppercase">Pipeline Status</div>
                  <div className="text-xl font-mono font-bold text-emerald-500 mt-0.5">100%</div>
                  <div className="text-[10px] text-[#5c6472] dark:text-[#8b93a1] font-mono mt-1">Weekly automated sync</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] text-xs text-[#5c6472] dark:text-[#8b93a1]">
                <strong className="text-[#101318] dark:text-white">Business Decision Outcome: </strong>
                Empowered cross-functional customer success leads with real-time churn risk indicators, enabling proactive customer outreach before contract renewal drop-offs.
              </div>
            </div>
          ) : (
            /* 3-DELIVERABLE BENTO CARDS */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deliverables.map((del) => (
                <div
                  key={del.id}
                  className="p-5 rounded-2xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] flex flex-col justify-between space-y-4 hover:border-[#a66a12]/50 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono font-bold text-2xl text-[#101318] dark:text-white group-hover:text-[#a66a12] transition-colors">
                          {del.metric}
                        </div>
                        <div className="font-mono text-[10px] uppercase text-[#8b93a1] font-bold mt-0.5">
                          {del.metricLabel}
                        </div>
                      </div>
                      <SparklinePreview 
                        data={del.sparkline} 
                        color={del.sparklineColor} 
                        width={52} 
                        height={20}
                        className="opacity-80 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>

                    <h4 className="font-display font-bold text-base text-[#101318] dark:text-white leading-tight">
                      {del.title}
                    </h4>

                    <p className="text-xs text-[#5c6472] dark:text-[#a0a8b5] leading-relaxed">
                      {del.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36] space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {del.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-[#181e2a] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] font-mono text-[#a66a12] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{del.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Operational Summary Strip */}
          <div className="p-4 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#5c6472] dark:text-[#a0a8b5]">
              <Database className="w-4 h-4 text-[#a66a12]" />
              <span>Core Tooling: SQL (PostgreSQL), Advanced Excel, Power BI Desktop, DAX Studio, Power Query ETL</span>
            </div>
            <a
              href="#demos"
              className="inline-flex items-center gap-1 font-mono text-[#a66a12] hover:underline shrink-0"
            >
              <span>Test SQL Queries in Runner →</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
