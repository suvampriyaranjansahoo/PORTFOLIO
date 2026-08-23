import React from 'react';
import { Briefcase, Building2, CheckCircle2, TrendingUp, Zap, Clock, FileSpreadsheet } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';
import { ExperienceTimeline } from './ExperienceTimeline';

interface ExperienceSectionProps {
  language?: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language]?.experience;

  return (
    <section id="experience" className="section-ambient-container ambient-theme-indigo py-16 sm:py-20 border-y border-[#dfe3e9]/70 dark:border-white/[0.08] overflow-hidden">
      {/* Thematic Ambient Light Shift (Enterprise Indigo & Sapphire Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
        <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2">
          {t?.label || "06 · EXPERIENCE"}
        </div>
        
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight mb-8">
          {t?.heading || "Enterprise Track Record"}
        </h2>

        <div className="card-level-1 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dfe3e9] dark:border-[#262c36]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-[#a66a12]">VOIS</span>
                <span className="text-xs font-mono text-[#8b93a1]">· Enterprise Telecommunications Analytics</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#101318] dark:text-white">
                Data Analyst Intern
              </h3>
              <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4]">
                Vodafone Intelligent Solutions (VOIS) — Remote
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg card-level-3 font-mono text-xs text-[#101318] dark:text-white self-start md:self-auto">
              <Clock className="w-3.5 h-3.5 text-[#a66a12]" />
              <span>Sep 2025 – Oct 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
            <div className="card-level-2 p-4">
              <div className="font-mono font-bold text-xl text-emerald-600 dark:text-emerald-400">
                +35%
              </div>
              <div className="font-mono text-xs text-[#101318] dark:text-white font-semibold mt-0.5">
                {language === 'de' ? "Berichtsgenauigkeit" : language === 'fr' ? "Précision des Rapports" : language === 'hi' ? "रिपोर्टिंग सटीकता" : "Reporting Accuracy"}
              </div>
              <div className="text-xs text-[#5c6472] dark:text-[#8b93a1] mt-1">
                {language === 'de' ? "50.000+ Datensätze in SQL & Excel bereinigt" : language === 'fr' ? "50 000+ données nettoyées sous SQL & Excel" : language === 'hi' ? "SQL और Excel में 50,000+ रिकॉर्ड्स सत्यापित" : "50,000+ records cleaned and validated in SQL & Excel"}
              </div>
            </div>

            <div className="card-level-2 p-4">
              <div className="font-mono font-bold text-xl text-amber-600 dark:text-amber-400">
                -40%
              </div>
              <div className="font-mono text-xs text-[#101318] dark:text-white font-semibold mt-0.5">
                {language === 'de' ? "Durchlaufzeit" : language === 'fr' ? "Délai de Traitement" : language === 'hi' ? "टर्नअराउंड समय" : "Turnaround Time"}
              </div>
              <div className="text-xs text-[#5c6472] dark:text-[#8b93a1] mt-1">
                {language === 'de' ? "Power BI & Power Query automatisierte Workflows" : language === 'fr' ? "Automatisation Power BI & Power Query" : language === 'hi' ? "Power BI व Power Query स्वचालित वर्कफ़्लो" : "Power BI & Power Query automated workflow pipelines"}
              </div>
            </div>

            <div className="card-level-2 p-4">
              <div className="font-mono font-bold text-xl text-indigo-600 dark:text-indigo-400">
                -5%
              </div>
              <div className="font-mono text-xs text-[#101318] dark:text-white font-semibold mt-0.5">
                {language === 'de' ? "Churn-Reduktion" : language === 'fr' ? "Réduction du Churn" : language === 'hi' ? "चर्न में कमी" : "Churn Reduction"}
              </div>
              <div className="text-xs text-[#5c6472] dark:text-[#8b93a1] mt-1">
                {language === 'de' ? "Frühwarnsignale für strategische Kundenbindung" : language === 'fr' ? "Indicateurs d'alerte pour la fidélisation" : language === 'hi' ? "ग्राहक प्रतिधारण के लिए प्रारंभिक चेतावनी संकेत" : "Surfaced retention signals feeding cross-functional actions"}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-[#5c6472] dark:text-[#9ea7b4]">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a66a12] mt-2 flex-shrink-0" />
              <p>
                {language === 'de'
                  ? "Bereinigung und Validierung von über 50.000 Geschäftsdatensätzen mit SQL und Excel unter Anwendung strenger Vollständigkeits- und Duplikatprüfungen (+35% Datenqualität)."
                  : language === 'fr'
                  ? "Nettoyage et validation de plus de 50 000 enregistrements opérationnels avec SQL et Excel, améliorant la précision globale de 35%."
                  : language === 'hi'
                  ? "SQL और Excel में 50,000+ व्यावसायिक रिकॉर्ड्स को साफ़ और मान्य किया, जिससे डाउनस्ट्रीम रिपोर्टिंग सटीकता में 35% का सुधार हुआ।"
                  : "Cleaned and validated 50,000+ business records in SQL and Excel, applying rigorous completeness, outlier, and duplicate resolution checks to improve downstream reporting accuracy by 35%."}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a66a12] mt-2 flex-shrink-0" />
              <p>
                {language === 'de'
                  ? "Automatisierung von Power BI-Berichten und Datenmodellen mittels DAX und Power Query (-40% manuelle Durchlaufzeit)."
                  : language === 'fr'
                  ? "Automatisation des tableaux de bord Power BI et modèles de données via DAX et Power Query (-40% de temps de traitement manuel)."
                  : language === 'hi'
                  ? "DAX उपायों और Power Query का उपयोग करके Power BI रिपोर्टिंग को स्वचालित किया, जिससे मैनुअल समय 40% कम हुआ।"
                  : "Automated Power BI reporting and Excel data models using DAX measures and Power Query, cutting manual turnaround by 40% and giving department leaders instant visibility into operational metrics."}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a66a12] mt-2 flex-shrink-0" />
              <p>
                {language === 'de'
                  ? "Entwicklung von Churn-Analyse-Dashboards zur frühzeitigen Erkennung von Kundenabwanderungsrisiken, was zu einer Reduktion des Churns um 5% beitrug."
                  : language === 'fr'
                  ? "Conception de tableaux de bord KPI de rétention identifiant les signaux précoces de churn (-5% de désabonnement client)."
                  : language === 'hi'
                  ? "चर्न-विश्लेषण KPI डैशबोर्ड विकसित किए जिससे ग्राहक चर्न में 5% की कमी लाने में सीधा सहयोग मिला।"
                  : "Built churn-analysis KPI dashboards that surfaced early-warning retention risk patterns, directly supporting a strategic initiative that reduced customer churn by 5%."}
              </p>
            </div>
          </div>

          {/* Scroll-Triggered Interactive Milestone Timeline */}
          <ExperienceTimeline language={language} />
        </div>
      </div>
    </section>
  );
};
