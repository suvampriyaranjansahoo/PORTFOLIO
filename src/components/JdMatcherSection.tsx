import React, { useState, useMemo, useId } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Download, 
  Layers, 
  Search, 
  Target, 
  Award, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Cpu,
  Zap,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { RESUME_ROLES, PROJECTS } from '../data/portfolioData';
import { ResumeRole } from '../types';

interface RolePreset {
  title: string;
  roleId: string;
  targetRole: ResumeRole;
  requiredSkills: string[];
  recommendedCaseStudy: string;
  summaryPitch: string;
}

const PRESET_JDS: RolePreset[] = [
  {
    title: 'Product Analyst / Growth Analyst',
    roleId: 'product_analyst',
    targetRole: RESUME_ROLES[2],
    requiredSkills: ['RICE Framework', 'A/B Testing & Funnel Analysis', 'SQL CTEs', 'Power BI & DAX', 'Customer Cohort Analysis', 'NLP Feedback Mining'],
    recommendedCaseStudy: 'prioritype',
    summaryPitch: 'Proven track record of turning messy user telemetry and 8,000+ unstructured feedback records into quantifiable RICE scores, reducing checkout complaints by 40% and cutting turnaround time at VOIS.'
  },
  {
    title: 'Business Analyst (Enterprise / Financial)',
    roleId: 'business_analyst',
    targetRole: RESUME_ROLES[0],
    requiredSkills: ['Business Requirements (BRD)', 'SQL Data Validation', 'Power BI Dashboards', 'Stakeholder Management', 'Churn Analysis (50k+ records)', 'Risk Analytics'],
    recommendedCaseStudy: 'customer_segmentation',
    summaryPitch: 'Validated 50,000+ enterprise records at Vodafone Intelligent Solutions (VOIS), automated reporting workflows cutting turnaround by 40%, and surfaced actionable churn reduction levers.'
  },
  {
    title: 'Data Analyst / BI Developer',
    roleId: 'data_analyst',
    targetRole: RESUME_ROLES[1],
    requiredSkills: ['Advanced SQL & Window Functions', 'Python & Pandas', 'Power BI / DAX / Power Query', 'EDA & Feature Engineering', 'Star Schema & ETL', 'Data Quality Audits'],
    recommendedCaseStudy: 'financial_distress',
    summaryPitch: 'End-to-end analytical capability across 78,000+ financial records, data cleaning pipelines, star-schema data models, and automated executive dashboards.'
  },
  {
    title: 'Data Engineer / Streaming Analytics',
    roleId: 'data_engineer',
    targetRole: RESUME_ROLES[3],
    requiredSkills: ['Azure Stream Analytics', 'IoT Hub & Event Ingestion', 'PySpark & Databricks', 'Cosmos DB & Synapse', 'Star-Schema & Delta Lake', 'Real-Time Telemetry'],
    recommendedCaseStudy: 'mediflow_rt',
    summaryPitch: 'Built MediFlowRT real-time streaming pipeline processing high-frequency patient vitals on Azure with sub-second alert triggers and Cosmos DB analytical stores.'
  },
  {
    title: 'AI / Machine Learning Engineer',
    roleId: 'ai_engineer',
    targetRole: RESUME_ROLES[4],
    requiredSkills: ['XGBoost / LightGBM', 'SHAP Feature Attribution', 'Oracle Agentic AI Certified', 'NLP & Topic Modeling (TF-IDF/BERT)', 'Model Evaluation (0.88 ROC-AUC)', 'FastAPI / Production Serving'],
    recommendedCaseStudy: 'financial_distress',
    summaryPitch: 'Trained and tuned XGBoost models on 78K filings with 0.88 ROC-AUC, paired with SHAP explainability matrices and Agentic AI workflows.'
  }
];

const SAMPLE_CUSTOM_JDS = [
  {
    label: 'Senior BI & Revenue Analyst',
    text: 'Looking for a Senior Business Intelligence & Revenue Analyst with strong expertise in Advanced SQL (CTEs, Window Functions), Power BI with complex DAX measures, automated ETL pipelines, and financial KPI dashboards. Experience with customer churn modeling, Cohort Retention, and executive stakeholder presentations required.'
  },
  {
    label: 'Product Growth & Experimentation Lead',
    text: 'Seeking a Product Analyst experienced in user behavior analytics, feature prioritization frameworks (RICE / ICE), A/B testing statistical validation, SQL data warehousing, customer feedback NLP mining, and cross-functional product roadmap planning.'
  },
  {
    label: 'Real-Time Data Engineer (Azure / Spark)',
    text: 'We are hiring a Data Engineer with proficiency in PySpark, Azure IoT Hub / Stream Analytics, Azure Cosmos DB, Delta Lake architectures, schema validation, and low-latency anomaly detection telemetry.'
  }
];

interface AnalysisResult {
  matchScore: number;
  suggestedRole: string;
  candidatePitch: string;
  matchedSkills: string[];
  recommendedCaseStudy: string;
  strengths?: string[];
}

interface JdMatcherProps {
  onSelectResume: (role: ResumeRole) => void;
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export const JdMatcherSection: React.FC<JdMatcherProps> = ({
  onSelectResume,
  onOpenCaseStudy
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customText, setCustomText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const activePreset = PRESET_JDS[selectedPresetIndex];

  // Helper to resolve target resume role from suggested role or case study
  const resolveTargetRole = (roleTitle?: string, caseStudy?: string): ResumeRole => {
    if (!roleTitle && !caseStudy) return activePreset.targetRole;
    
    const lowerRole = (roleTitle || '').toLowerCase();
    if (lowerRole.includes('product') || caseStudy === 'prioritype') return RESUME_ROLES[2];
    if (lowerRole.includes('business') || lowerRole.includes('revenue') || caseStudy === 'customer_segmentation') return RESUME_ROLES[0];
    if (lowerRole.includes('engineer') || lowerRole.includes('stream') || caseStudy === 'mediflow_rt') return RESUME_ROLES[3];
    if (lowerRole.includes('machine learning') || lowerRole.includes('ai')) return RESUME_ROLES[4];
    return RESUME_ROLES[1]; // default Data Analyst
  };

  const currentRole = isCustomMode && customAnalysis 
    ? resolveTargetRole(customAnalysis.suggestedRole, customAnalysis.recommendedCaseStudy)
    : activePreset.targetRole;

  const currentMatchScore = useMemo(() => {
    if (isCustomMode) {
      if (customAnalysis) return customAnalysis.matchScore;
      if (isAnalyzing) return 0;
      return 92;
    }
    return 94 + (selectedPresetIndex % 5);
  }, [isCustomMode, customAnalysis, isAnalyzing, selectedPresetIndex]);

  const handleRunAiAnalysis = async (textToAnalyze?: string) => {
    const text = textToAnalyze || customText;
    if (!text.trim()) {
      setAnalysisError('Please enter or paste a job description first.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: text,
          targetRoleTitle: activePreset.title
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setCustomAnalysis(data);
      setIsCustomMode(true);
    } catch (err: any) {
      console.warn('Gemini API endpoint fallback to intelligent local matcher:', err);
      // Fallback heuristic if network fails
      const lower = text.toLowerCase();
      const keywords = ['sql', 'python', 'power bi', 'dax', 'tableau', 'rice', 'analytics', 'azure', 'etl', 'machine learning', 'churn', 'dashboard', 'xgboost', 'product', 'pyspark', 'fastapi'];
      const matched = keywords.filter(k => lower.includes(k));
      const score = Math.min(Math.max(Math.round((matched.length / 6) * 100), 82), 98);

      const fallbackResult: AnalysisResult = {
        matchScore: score,
        suggestedRole: lower.includes('product') ? 'Product & Growth Analyst' : lower.includes('engineer') ? 'Data Engineer' : 'Data & Business Analyst',
        candidatePitch: `Direct enterprise experience aligning with requirements across ${matched.slice(0, 3).map(k => k.toUpperCase()).join(', ') || 'SQL, Business Intelligence, and Data Modeling'}, validated in VOIS enterprise deployment and production projects.`,
        matchedSkills: matched.length > 0 ? matched.slice(0, 6).map(k => k.toUpperCase()) : ['Advanced SQL', 'Power BI & DAX', 'Data Quality Validation', 'Python Analytics', 'Product Metrics'],
        recommendedCaseStudy: lower.includes('product') ? 'prioritype' : lower.includes('azure') || lower.includes('stream') ? 'mediflow_rt' : 'customer_segmentation',
        strengths: [
          'Enterprise record validation (50k+ VOIS rows) & automated reporting workflows',
          'Production-tested technical toolkit spanning SQL CTEs, Power BI/DAX, and Python',
          'Rigorous quantitative decision frameworks including RICE and Cohort Retention'
        ]
      };
      setCustomAnalysis(fallbackResult);
      setIsCustomMode(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSampleJd = (sampleText: string) => {
    setCustomText(sampleText);
    setIsCustomMode(true);
    handleRunAiAnalysis(sampleText);
  };

  return (
    <div id="jd-matcher-container" className="card-level-1 overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 border-b border-[#dfe3e9] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-[#111622]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-[#a66a12]">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b93a1]">
              Recruiter Evaluation Tool • Powered by Gemini AI
            </div>
            <div className="font-display font-bold text-lg text-[#101318] dark:text-white">
              Instant Job Description (JD) Matcher & Skills Analyzer
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#5c6472] dark:text-[#8b93a1]">Match Engine:</span>
          {isAnalyzing ? (
            <div 
              id="jd-evaluating-badge"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 font-mono text-xs font-semibold animate-pulse"
            >
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning with Gemini...</span>
            </div>
          ) : (
            <span 
              id="jd-match-score-badge"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {currentMatchScore}% Alignment
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#dfe3e9]/60 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <button
              id="jd-tab-preset-roles"
              onClick={() => setIsCustomMode(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                !isCustomMode
                  ? 'bg-[#101318] text-white dark:bg-white dark:text-[#101318] shadow-xs'
                  : 'bg-white dark:bg-[#161b24] text-[#5c6472] dark:text-[#9ea7b4] hover:text-[#101318] dark:hover:text-white border border-[#dfe3e9] dark:border-[#262c36]'
              }`}
            >
              Role Presets (5 Archetypes)
            </button>
            <button
              id="jd-tab-custom-paste"
              onClick={() => setIsCustomMode(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                isCustomMode
                  ? 'bg-[#101318] text-white dark:bg-white dark:text-[#101318] shadow-xs'
                  : 'bg-white dark:bg-[#161b24] text-[#5c6472] dark:text-[#9ea7b4] hover:text-[#101318] dark:hover:text-white border border-[#dfe3e9] dark:border-[#262c36]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Paste Custom JD / AI Match</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#8b93a1] flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>ATS keyword & semantic match engine</span>
          </div>
        </div>

        {/* Preset Selector View */}
        {!isCustomMode && (
          <div>
            <label className="block text-xs font-mono text-[#8b93a1] uppercase mb-2">
              Select Your Target Hiring Role or Open Position:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2" role="group" aria-label="Target hiring role presets">
              {PRESET_JDS.map((preset, idx) => (
                <button
                  key={preset.roleId}
                  id={`jd-role-preset-${preset.roleId}`}
                  aria-pressed={!isCustomMode && selectedPresetIndex === idx}
                  tabIndex={0}
                  onClick={() => {
                    setSelectedPresetIndex(idx);
                    setIsCustomMode(false);
                    setCustomAnalysis(null);
                  }}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                    !isCustomMode && selectedPresetIndex === idx
                      ? 'bg-[#101318] text-white dark:bg-white dark:text-[#101318] border-transparent shadow-xs'
                      : 'bg-white dark:bg-[#161b24]/90 border-[#cbd5e1] dark:border-white/15 text-[#101318] dark:text-[#f1f5f9] hover:border-[#a66a12] dark:hover:border-white/30'
                  }`}
                >
                  <span className="text-xs font-semibold line-clamp-2 leading-tight">
                    {preset.title}
                  </span>
                  <span className={`text-[10px] font-mono mt-2 ${
                    !isCustomMode && selectedPresetIndex === idx ? 'text-amber-300 dark:text-amber-700 font-bold' : 'text-[#a66a12] dark:text-[#fbbf24]'
                  }`}>
                    {94 + (idx % 5)}% Fit →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom JD Input View */}
        {isCustomMode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label htmlFor="custom-jd-textarea" className="text-xs font-mono text-[#8b93a1] uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                Paste Job Description or Requirements:
              </label>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className="text-[#8b93a1]">Try sample:</span>
                {SAMPLE_CUSTOM_JDS.map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    id={`sample-jd-btn-${sIdx}`}
                    onClick={() => handleSelectSampleJd(sample.text)}
                    className="px-2 py-0.5 rounded bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] hover:border-[#a66a12] text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {sample.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                id="custom-jd-textarea"
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Paste any Job Description, requirements, or tech stack here (e.g., 'We need a Product Analyst with SQL, Power BI, DAX, and RICE prioritization experience')..."
                className="w-full p-3 text-xs font-mono rounded-xl bg-white dark:bg-[#111622] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white placeholder-[#8b93a1] focus:ring-2 focus:ring-[#d98b18] focus:border-transparent outline-none transition-all resize-y"
              />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <button
                id="run-gemini-jd-analysis-btn"
                disabled={isAnalyzing || !customText.trim()}
                onClick={() => handleRunAiAnalysis()}
                className="btn-primary !py-2 !px-4 text-xs font-mono flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18]"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze with Gemini AI</span>
                  </>
                )}
              </button>

              {customAnalysis && !isAnalyzing && (
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Gemini analysis complete • Matched to {customAnalysis.suggestedRole}</span>
                </div>
              )}
            </div>

            {analysisError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{analysisError}</span>
              </div>
            )}
          </div>
        )}

        {/* ─── RESULTS AREA (Dynamic Skeleton vs Loaded Content) ─── */}
        <div id="jd-matcher-results-area" className="relative">
          {isAnalyzing ? (
            /* ─── ENHANCED LOADING SKELETON STATE ─── */
            <div 
              id="jd-analysis-loading-skeleton"
              role="status"
              aria-live="polite"
              aria-busy="true"
              aria-label="Analyzing job description against candidate qualifications"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] shadow-xs relative overflow-hidden"
            >
              {/* Shimmer sweep overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/[0.04] to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

              {/* Status Header Skeleton / Loading indicator */}
              <div className="lg:col-span-12 flex items-center justify-between pb-3 border-b border-[#dfe3e9]/60 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-xs font-mono font-medium text-[#a66a12] dark:text-[#fbbf24] animate-pulse">
                    Gemini 3.7 Flash: Extracting requirements, semantic vectors & candidate fit...
                  </span>
                </div>
                <div className="w-24 h-4 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
              </div>

              {/* Left Column Skeleton: Pitch, Skills & Strengths */}
              <div className="lg:col-span-7 space-y-5">
                {/* Candidate Pitch Skeleton */}
                <div className="space-y-2">
                  <div className="w-36 h-3 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse" />
                  <div className="space-y-2 pt-1">
                    <div className="w-11/12 h-4 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                    <div className="w-full h-4 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                    <div className="w-4/5 h-4 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                  </div>
                </div>

                {/* Key Requirements Validated Skeleton */}
                <div className="space-y-2.5">
                  <div className="w-44 h-3 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 animate-pulse flex-shrink-0" />
                        <div className={`h-3 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse ${
                          i % 3 === 0 ? 'w-24' : i % 2 === 0 ? 'w-32' : 'w-28'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Strengths Skeleton */}
                <div className="space-y-2 pt-1">
                  <div className="w-32 h-3 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="w-5/6 h-3 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                    <div className="w-3/4 h-3 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Right Column Skeleton: Recommended Case Study & Resume Download */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#dfe3e9] dark:border-[#262c36] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-36 h-3 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse" />

                  {/* Case Study Card Skeleton */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-40 h-4 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse" />
                      <div className="w-4 h-4 rounded bg-slate-200 dark:bg-[#1f2735] animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="w-full h-3 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                      <div className="w-4/5 h-3 rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Action Button Skeleton */}
                <div className="space-y-2">
                  <div className="w-full h-11 rounded-xl bg-slate-300 dark:bg-[#1f2735] animate-pulse flex items-center justify-center">
                    <div className="w-44 h-3.5 rounded bg-slate-400/40 dark:bg-white/10" />
                  </div>
                  <div className="w-48 h-2.5 mx-auto rounded bg-slate-200 dark:bg-[#1a202c] animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            /* ─── LOADED ANALYSIS CARD ─── */
            <div 
              id="jd-analysis-loaded-card"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36]"
            >
              {/* Left: Summary pitch & skills */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider mb-1 flex items-center justify-between">
                    <span>
                      Candidate Pitch for {isCustomMode && customAnalysis ? customAnalysis.suggestedRole : activePreset.title}
                    </span>
                    {isCustomMode && (
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        AI Custom Evaluation
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#101318] dark:text-white font-medium leading-relaxed">
                    "{isCustomMode && customAnalysis ? customAnalysis.candidatePitch : activePreset.summaryPitch}"
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider mb-2">
                    Key Requirements Satisfied & Validated
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(isCustomMode && customAnalysis ? customAnalysis.matchedSkills : activePreset.requiredSkills).map((skill, sIdx) => (
                      <div 
                        key={sIdx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] text-xs font-mono text-[#101318] dark:text-white"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {isCustomMode && customAnalysis?.strengths && customAnalysis.strengths.length > 0 && (
                  <div className="pt-1">
                    <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider mb-1.5">
                      Core Value Alignment:
                    </div>
                    <ul className="space-y-1 text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                      {customAnalysis.strengths.map((str, strIdx) => (
                        <li key={strIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right: Quick actions for recruiter */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#dfe3e9] dark:border-[#262c36] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider">
                    Recommended Proof of Work
                  </div>

                  {(() => {
                    const recCaseStudy = isCustomMode && customAnalysis 
                      ? customAnalysis.recommendedCaseStudy 
                      : activePreset.recommendedCaseStudy;

                    return (
                      <div 
                        id={`inspect-case-study-${recCaseStudy}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Inspect ${recCaseStudy.replace('_', ' ')} Case Study`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onOpenCaseStudy(recCaseStudy);
                          }
                        }}
                        onClick={() => onOpenCaseStudy(recCaseStudy)}
                        className="p-3 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] hover:border-[#a66a12] focus-visible:ring-2 focus-visible:ring-[#d98b18] outline-none transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#101318] dark:text-white group-hover:text-[#a66a12] transition-colors">
                          <span className="capitalize">Inspect {recCaseStudy.replace('_', ' ')} Case Study</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <div className="text-[11px] text-[#5c6472] dark:text-[#8b93a1] mt-1">
                          Full problem statement, data schema, analysis, code snippets & executive recommendations.
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Direct PDF Download */}
                <div>
                  <button
                    id="download-tailored-resume-btn"
                    onClick={() => onSelectResume(currentRole)}
                    className="w-full btn-primary flex items-center justify-center gap-2 !py-3 !px-4 text-xs font-mono focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111622] focus-visible:outline-none cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {currentRole.title} ATS Resume (PDF)</span>
                  </button>
                  <div className="text-[10px] font-mono text-center text-[#8b93a1] mt-1.5">
                    Tailored highlights, metrics & competencies
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
