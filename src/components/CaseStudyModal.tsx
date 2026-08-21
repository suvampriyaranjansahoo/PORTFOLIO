import React, { useState } from 'react';
import { X, CheckCircle2, Code2, BookOpen, Sparkles, ExternalLink, ArrowRight, Target, Award } from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';

interface CaseStudyModalProps {
  caseStudyId: string | null;
  onClose: () => void;
}

const STAR_SUMMARIES: Record<string, { situation: string; task: string; action: string; result: string }> = {
  prioritype: {
    situation: "Product teams at fintech apps received 8,000+ unstructured customer complaint reviews across app stores with zero automated mechanism to prioritize feature bugs versus cosmetic requests.",
    task: "Engineer an objective, data-driven prioritization engine utilizing NLP and the RICE mathematical framework (Reach, Impact, Confidence, Effort) to rank backlog items.",
    action: "Built a Python & HuggingFace pipeline scraping and clustering reviews, extracted key complaint themes via TF-IDF, and integrated an interactive simulator for real-time roadmap weighting.",
    result: "Reduced manual backlog review time by 60%, identified Bank Switch 04 timeout spikes, and reduced checkout complaints by 40% in simulation."
  },
  financial_distress: {
    situation: "Traditional linear bankruptcy scoring models suffered from high false-negative rates when assessing distress in volatile macroeconomic conditions across 78,000+ corporate filings.",
    task: "Train, tune, and explain an advanced non-linear gradient-boosted machine learning model to predict 1-year corporate insolvency with interpretable risk attributions.",
    action: "Cleaned and standardized 80+ financial ratios, trained an XGBoost classifier with SMOTE oversampling for class imbalance, and generated SHAP summary matrices for balance sheet risk drivers.",
    result: "Achieved a 0.88 ROC-AUC score (outperforming Altman-Z 0.72 baseline) and isolated leverage and retained earnings as the top 2 predictive indicators."
  },
  customer_segmentation: {
    situation: "A retail financial base of 50,000+ customer records exhibited high churn and low upsell response due to generic mass-marketing campaigns.",
    task: "Segment the customer base into high-value, churn-risk, and dormant clusters to enable tailored retention strategies.",
    action: "Engineered RFM (Recency, Frequency, Monetary) features, conducted K-Means clustering with Elbow and Silhouette optimization, and mapped actionable personas.",
    result: "Identified high-margin VIP segment generating 48% of total revenue with 2.8x higher repeat velocity, enabling targeted campaigns reducing churn by 5%."
  },
  mediflow_rt: {
    situation: "High-frequency patient monitoring and telemetry streams overwhelmed traditional relational databases with unacceptable latency spikes.",
    task: "Architect an end-to-end cloud streaming analytics pipeline delivering sub-second anomaly detection.",
    action: "Configured Azure IoT Hub for event ingestion, implemented Azure Stream Analytics with 5-second tumbling SQL windows, and persisted hot state to Cosmos DB and cold telemetry to Azure Synapse.",
    result: "Delivered <450ms end-to-end latency SLA with zero packet loss across 12,000+ events/min load tests."
  }
};

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudyId, onClose }) => {
  if (!caseStudyId) return null;
  const study = CASE_STUDIES[caseStudyId] || CASE_STUDIES['prioritype'] || CASE_STUDIES['financial_distress'];
  const starData = STAR_SUMMARIES[caseStudyId] || STAR_SUMMARIES['prioritype'];

  const tabKeys: (keyof typeof study.tabs)[] = [
    'problem',
    'data',
    'analysis',
    'method',
    'insight',
    'recommendation'
  ];

  const [activeTab, setActiveTab] = useState<keyof typeof study.tabs>('problem');
  const [viewStarMode, setViewStarMode] = useState<boolean>(false);
  const currentTab = study.tabs[activeTab];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] card-level-1 overflow-hidden flex flex-col !rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#dfe3e9] dark:border-white/[0.08] flex items-start justify-between gap-4 bg-[#f8fafc] dark:bg-[#111622]/90">
          <div>
            <div className="font-mono text-xs text-[#a66a12] tracking-wider uppercase mb-1">
              {study.meta}
            </div>
            <h2 id="case-study-title" className="font-display font-bold text-2xl sm:text-3xl text-[#101318] dark:text-white">
              {study.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5c6472] dark:text-[#9ea7b4] mt-1">
              {study.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="case-study-star-toggle-btn"
              aria-pressed={viewStarMode}
              tabIndex={0}
              onClick={() => setViewStarMode(!viewStarMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                viewStarMode
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{viewStarMode ? 'Standard Deep-Dive' : 'STAR Method Brief'}</span>
            </button>

            <button
              id="close-case-study-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
              aria-label="Close modal"
              tabIndex={0}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-3 gap-px bg-[#dfe3e9] dark:bg-white/[0.08] border-b border-[#dfe3e9] dark:border-white/[0.08]">
          {study.stats.map((stat, idx) => (
            <div key={idx} className="bg-white/95 dark:bg-[#141924]/90 p-3 sm:p-4 text-center">
              <div className="font-mono font-bold text-base sm:text-lg text-[#101318] dark:text-white">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-[#8b93a1] uppercase truncate">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* STAR MODE VIEW */}
        {viewStarMode ? (
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#f8fafc] dark:bg-[#0e121a] space-y-4">
            <div className="font-mono text-xs text-[#a66a12] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Recruiter STAR Method Interview Summary
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-level-2 p-4 space-y-1.5">
                <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  [S] SITUATION
                </div>
                <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                  {starData.situation}
                </p>
              </div>

              <div className="card-level-2 p-4 space-y-1.5">
                <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                  [T] TASK
                </div>
                <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                  {starData.task}
                </p>
              </div>

              <div className="card-level-2 p-4 space-y-1.5">
                <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  [A] ACTION
                </div>
                <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                  {starData.action}
                </p>
              </div>

              <div className="card-level-2 p-4 space-y-1.5">
                <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  [R] RESULT & BUSINESS IMPACT
                </div>
                <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                  {starData.result}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="px-6 pt-3 border-b border-[#dfe3e9] dark:border-[#262c36] bg-white dark:bg-[#151920] flex items-center gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Case Study Sections">
              {tabKeys.map((key, idx) => (
                <button
                  key={key}
                  id={`case-study-tab-${key}`}
                  role="tab"
                  aria-selected={activeTab === key}
                  aria-controls={`case-study-panel-${key}`}
                  tabIndex={0}
                  onClick={() => setActiveTab(key)}
                  className={`tab-btn !px-3 !py-2 text-xs font-mono rounded-t-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                    activeTab === key ? 'tab-btn-active' : ''
                  }`}
                >
                  0{idx + 1} {study.tabs[key].title}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <div 
              id={`case-study-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`case-study-tab-${activeTab}`}
              className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#f6f7f9] dark:bg-[#0e1116] space-y-6"
            >
              <div className="bg-white dark:bg-[#151920] p-6 rounded-xl border border-[#dfe3e9] dark:border-[#262c36] shadow-xs space-y-4">
                <h3 className="font-display font-bold text-xl text-[#101318] dark:text-white">
                  {currentTab.title}
                </h3>

                <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed">
                  {currentTab.content}
                </p>

                {currentTab.bulletPoints && (
                  <div className="space-y-2 pt-2">
                    {currentTab.bulletPoints.map((bp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentTab.codeSnippet && (
                  <div className="mt-4 pt-4 border-t border-[#dfe3e9] dark:border-[#262c36]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8b93a1] mb-2">
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-[#a66a12] dark:text-[#fbbf24]" /> Code Implementation
                      </span>
                      <span>{currentTab.codeSnippet.language}</span>
                    </div>
                    <pre className="p-4 rounded-lg bg-[#111419] text-[#e6edf3] font-mono text-xs overflow-x-auto border border-[#262c36] leading-relaxed">
                      <code>{currentTab.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#dfe3e9] dark:border-[#262c36] bg-white dark:bg-[#151920] flex items-center justify-between">
          <div className="text-xs font-mono text-[#8b93a1]">
            {!viewStarMode && `Step ${tabKeys.indexOf(activeTab) + 1} of ${tabKeys.length}`}
          </div>

          <div className="flex items-center gap-2">
            {!viewStarMode && tabKeys.indexOf(activeTab) < tabKeys.length - 1 ? (
              <button
                onClick={() => setActiveTab(tabKeys[tabKeys.indexOf(activeTab) + 1])}
                className="btn-secondary !px-4 !py-2 text-xs font-mono flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
              >
                <span>Next Section</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-primary !px-4 !py-2 text-xs font-mono focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
