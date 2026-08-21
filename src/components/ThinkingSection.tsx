import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, LineChart, Target, Wrench, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface ThinkingSectionProps {
  language?: Language;
}

export const ThinkingSection: React.FC<ThinkingSectionProps> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language]?.thinking;

  const steps = [
    { 
      title: language === 'de' ? "GESCHÄFTSFRAGE" : language === 'fr' ? "QUESTION MÉTIER" : language === 'hi' ? "व्यावसायिक प्रश्न" : "BUSINESS QUESTION", 
      desc: language === 'de' ? "Fokus auf Klarheit: Welches Problem oder welches Abwanderungsrisiko lösen wir?" : language === 'fr' ? "Clarté stratégique : quelle décision ou quel risque de désabonnement résolvons-nous ?" : language === 'hi' ? "स्पष्टता से शुरुआत: हम किस व्यावसायिक निर्णय या जोखिम का समाधान कर रहे हैं?" : "Start with executive clarity: What decision or churn risk are we resolving?" 
    },
    { 
      title: language === 'de' ? "DATENBESCHAFFUNG" : language === 'fr' ? "COLLECTE DES DONNÉES" : language === 'hi' ? "डेटा संग्रहण" : "DATA SOURCING", 
      desc: language === 'de' ? "Erfassung transaktionaler Daten, Telemetrie und Kundenbewertungen." : language === 'fr' ? "Ingestion de flux transactionnels, télémétrie ou avis d'utilisateurs." : language === 'hi' ? "लेन-देन, टेलीमेट्री या ग्राहक समीक्षाओं से डेटा एकत्र करना।" : "Ingest multi-source transactional, telemetry, or Play Store review streams." 
    },
    { 
      title: language === 'de' ? "VALIDIERUNG" : language === 'fr' ? "VALIDATION RIGOUREUSE" : language === 'hi' ? "सटीक सत्यापन" : "RIGOROUS VALIDATION", 
      desc: language === 'de' ? "Schema-Prüfung, Nullwert-Behandlung, Ausreißer-Filterung und Audit-Integrität." : language === 'fr' ? "Vérification des schémas, traitement des valeurs nulles et intégrité d'audit." : language === 'hi' ? "स्कीमा जांच, अशक्त मान हैंडलिंग और डेटा ऑडिट अखंडता।" : "Enforce schema, null checks, outlier mitigation, and audit integrity." 
    },
    { 
      title: language === 'de' ? "EDA & EXPLORATION" : language === 'fr' ? "EXPLORATION & EDA" : language === 'hi' ? "डेटा अन्वेषण" : "EXPLORATION & EDA", 
      desc: language === 'de' ? "SQL CTEs, Fensterfunktionen, Kohortenkurven und Verteilungsanalysen." : language === 'fr' ? "CTEs SQL, fonctions de fenêtrage, courbes de cohortes et distributions." : language === 'hi' ? "SQL CTEs, विंडो फंक्शन्स, कोहॉर्ट कर्व्स और वितरण विश्लेषण।" : "SQL CTEs, window aggregations, cohort curves, and distribution checks." 
    },
    { 
      title: language === 'de' ? "URSACHENANALYSE" : language === 'fr' ? "ANALYSE CAUSALE" : language === 'hi' ? "मूल कारण विश्लेषण" : "ROOT CAUSE ANALYSIS", 
      desc: language === 'de' ? "Hinter die Symptome blicken: Systemengpässe, Reibungsverluste und Trigger identifizieren." : language === 'fr' ? "Identifier les frictions sous-jacentes, points de blocage ou pannes." : language === 'hi' ? "लक्षणों से आगे बढ़कर वास्तविक सिस्टम घर्षण और विफलताओं की पहचान।" : "Drill past symptoms into system friction, switch failures, or stock-out triggers." 
    },
    { 
      title: language === 'de' ? "SYNTHESE" : language === 'fr' ? "SYNTHÈSE DES INSIGHTS" : language === 'hi' ? "निष्कर्ष संश्लेषण" : "INSIGHT SYNTHESIS", 
      desc: language === 'de' ? "Quantitative Ergebnisse in klare Verhaltens- und Finanztreiber übersetzen." : language === 'fr' ? "Synthétiser les résultats quantitatifs en leviers comportementaux clairs." : language === 'hi' ? "मात्रात्मक निष्कर्षों को स्पष्ट व्यावसायिक संकेतकों में बदलना।" : "Synthesize quantitative findings into clear behavioral or financial drivers." 
    },
    { 
      title: language === 'de' ? "ROADMAP" : language === 'fr' ? "PLAN D'ACTION" : language === 'hi' ? "कार्य योजना" : "ACTIONABLE ROADMAP", 
      desc: language === 'de' ? "RICE-Scoring, Entscheidungsmemos, automatisierte KPI-Dashboards." : language === 'fr' ? "Scoring RICE, notes de synthèse, dashboards automatisés et alertes." : language === 'hi' ? "RICE स्कोरिंग, एक्जीक्यूटिव मेमो और स्वचालित KPI डैशबोर्ड।" : "RICE scoring, executive memos, automated KPI dashboards, and alerts." 
    },
    { 
      title: language === 'de' ? "ERFOLGSMESSUNG" : language === 'fr' ? "BOUCLE DE MESURE" : language === 'hi' ? "परिणाम मापन" : "MEASUREMENT LOOP", 
      desc: language === 'de' ? "Metriken nach dem Rollout nachverfolgen: % Churn-Reduktion, Performance & ROI." : language === 'fr' ? "Mesurer l'impact post-déploiement : baisse du churn, vitesse et ROI." : language === 'hi' ? "नतीजों की निगरानी: चर्न में कमी, क्वेरी गति और वास्तविक ROI।" : "Track post-deployment metrics: % churn drop, query speedup, and ROI." 
    }
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-[#dfe3e9] dark:border-[#262c36]">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6">
        <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t?.label || "05 · HOW I THINK"}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 space-y-5">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight">
              {t?.heading || "From question to measurable action."}
            </h2>
            <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
              {t?.copy || "I don't stop at what happened. I try to understand why it happened, what should change, and how we measure whether the change worked."}
            </p>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs space-y-2 text-xs font-mono text-[#5c6472] dark:text-[#9ea7b4]">
              <div className="flex items-center gap-2 text-[#101318] dark:text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>
                  {language === 'de' ? "Ganzheitliche Problemlösung" : language === 'fr' ? "Résolution de Bout en Bout" : language === 'hi' ? "समग्र समस्या समाधान" : "End-to-End Problem Ownership"}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {language === 'de'
                  ? "Ob Kundenabwanderung bei VOIS oder Insolvenzrisiken – jede Analyse schließt mit einer klaren Geschäftsempfehlung ab."
                  : language === 'fr'
                  ? "Qu'il s'agisse de churn client chez VOIS ou de bilans financiers, chaque analyse débouche sur une recommandation concrète."
                  : language === 'hi'
                  ? "चाहे VOIS में ग्राहक चर्न हो या वित्तीय जोखिम, प्रत्येक विश्लेषण एक ठोस व्यावसायिक समाधान पर समाप्त होता है।"
                  : "Whether diagnosing retail customer churn at VOIS or analyzing corporate bankruptcy filings, every analysis ends with an unambiguous business recommendation."}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] hover:border-[#a66a12] dark:hover:border-[#a66a12] transition-all shadow-xs group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#a66a12]">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#101318] dark:text-white tracking-tight group-hover:text-[#a66a12] transition-colors">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
