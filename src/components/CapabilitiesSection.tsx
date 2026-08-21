import React from 'react';
import { BarChart3, Target, Database, Brain, ArrowUpRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { InteractiveCard } from './InteractiveCard';

interface CapabilitiesSectionProps {
  language?: Language;
  onSelectCategory: (category: 'all' | 'product' | 'analytics' | 'engineering' | 'ai') => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ 
  language = 'en',
  onSelectCategory 
}) => {
  const t = TRANSLATIONS[language]?.capabilities;

  const capabilities = [
    {
      num: "01",
      title: language === 'de' ? "ANALYSIEREN" : language === 'fr' ? "ANALYSER" : language === 'hi' ? "विश्लेषण" : "ANALYZE",
      tech: "SQL · Python · Power BI",
      desc: language === 'de' 
        ? "Kundenverhalten, Jahresabschlussanalysen, KPI-Analytics, Kohortenmodellierung"
        : language === 'fr'
        ? "Comportement client, analyse des états financiers, KPIs, modélisation de cohortes"
        : language === 'hi'
        ? "ग्राहक व्यवहार, वित्तीय विवरण विश्लेषण, KPI एनालिटिक्स, कोहॉर्ट मॉडलिंग"
        : "Customer behavior, financial statement analysis, KPI analytics, cohort modeling",
      icon: <BarChart3 className="w-5 h-5 text-[#a66a12]" />,
      category: 'analytics' as const,
      projectsText: "Customer Analytics · Financial Analytics"
    },
    {
      num: "02",
      title: language === 'de' ? "ENTSCHEIDEN" : language === 'fr' ? "DÉCIDER" : language === 'hi' ? "प्राथमिकता" : "DECIDE",
      tech: "RICE · Product Analytics · Customer Voice",
      desc: language === 'de'
        ? "Roadmap-Priorisierung, Business-Empfehlungen, Review-Mining, PM-Memos"
        : language === 'fr'
        ? "Priorisation de roadmap, recommandations stratégiques, analyse d'avis, notes produit"
        : language === 'hi'
        ? "रोडमैप प्राथमिकता, व्यावसायिक सिफारिशें, समीक्षा विश्लेषण, PM मेमो"
        : "Roadmap prioritization, business recommendations, review mining, PM memos",
      icon: <Target className="w-5 h-5 text-[#a66a12]" />,
      category: 'product' as const,
      projectsText: "PriorityPe · Customer Analytics"
    },
    {
      num: "03",
      title: language === 'de' ? "ENGINEEREN" : language === 'fr' ? "CONCEVOIR" : language === 'hi' ? "इंजीनियरिंग" : "ENGINEER",
      tech: "Azure · PySpark · Databricks",
      desc: language === 'de'
        ? "Echtzeit-Streaming-ETL, Bronze-Silver-Gold-Architektur, Synapse Star-Schema"
        : language === 'fr'
        ? "ETL streaming en temps réel, architecture Bronze-Silver-Gold, schéma en étoile Synapse"
        : language === 'hi'
        ? "रीयल-टाइम स्ट्रीमिंग ETL, ब्रॉन्ज-सिल्वर-गोल्ड आर्किटेक्चर, साइनेप्स स्टार-स्कीमा"
        : "Real-time streaming ETL, Bronze-Silver-Gold architecture, Synapse star-schema",
      icon: <Database className="w-5 h-5 text-[#a66a12]" />,
      category: 'engineering' as const,
      projectsText: "MediFlowRT · Financial Pipelines"
    },
    {
      num: "04",
      title: language === 'de' ? "ENTWICKELN" : language === 'fr' ? "DÉPLOYER" : language === 'hi' ? "AI मॉडल" : "BUILD",
      tech: "ML · NLP · AI Systems",
      desc: language === 'de'
        ? "Prädiktive Modelle (XGBoost), SHAP Erklärbare KI, Transformer NLP-Pipelines"
        : language === 'fr'
        ? "Modélisation prédictive (XGBoost), IA explicable SHAP, pipelines NLP Transformers"
        : language === 'hi'
        ? "भविष्यवाणी मॉडलिंग (XGBoost), SHAP व्याख्या योग्य AI, ट्रांसफॉर्मर NLP पाइपलाइन"
        : "Predictive modeling (XGBoost), SHAP explainable AI, transformer NLP pipelines",
      icon: <Brain className="w-5 h-5 text-[#a66a12]" />,
      category: 'ai' as const,
      projectsText: "CardioInsight-AI · MindEase"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-[#151920] border-y border-[#dfe3e9] dark:border-[#262c36]">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2">
              {t?.label || "02 · WHAT I DO"}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight">
              {t?.heading || "Multi-Disciplinary Analytics & Execution"}
            </h2>
          </div>
          <p className="text-sm text-[#5c6472] dark:text-[#8b93a1] max-w-md">
            {t?.subheading || "Click any capability block to filter corresponding production projects below."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap) => (
            <InteractiveCard
              key={cap.num}
              onClick={() => {
                onSelectCategory(cap.category);
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              glowColor="rgba(99, 102, 241, 0.25)"
              className="p-6 cursor-pointer flex flex-col justify-between"
            >
              {/* Ghost number watermark */}
              <div className="ghost-watermark select-none text-black/[0.03] dark:text-white/[0.03] group-hover:scale-105 transition-transform duration-300">
                {cap.num}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-slate-400 font-semibold">{cap.num}</span>
                  <div className="glass-icon-badge group-hover:scale-110 transition-transform">
                    {cap.icon}
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                  {cap.title}
                </h3>
                <p className="font-mono text-xs text-indigo-600 dark:text-indigo-400 mb-3 font-medium">
                  {cap.tech}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white relative z-10">
                <span className="truncate">{cap.projectsText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-indigo-500" />
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
};
