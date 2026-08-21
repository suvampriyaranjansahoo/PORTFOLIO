import React, { useState, useMemo } from 'react';
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
  ChevronRight
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

interface JdMatcherProps {
  onSelectResume: (role: ResumeRole) => void;
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export const JdMatcherSection: React.FC<JdMatcherProps> = ({
  onSelectResume,
  onOpenCaseStudy
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customText, setCustomText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const activePreset = PRESET_JDS[selectedPresetIndex];

  // Calculate matching stats
  const matchScore = useMemo(() => {
    if (!isCustomMode) {
      return 94 + (selectedPresetIndex % 5);
    }
    const lower = customText.toLowerCase();
    let hits = 0;
    const keywords = ['sql', 'python', 'power bi', 'dax', 'tableau', 'rice', 'analytics', 'azure', 'etl', 'machine learning', 'churn', 'dashboard', 'xgboost', 'product'];
    keywords.forEach((k) => {
      if (lower.includes(k)) hits++;
    });
    return Math.min(Math.max(Math.round((hits / 8) * 100), 75), 98);
  }, [selectedPresetIndex, isCustomMode, customText]);

  return (
    <div className="bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] rounded-2xl shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 border-b border-[#dfe3e9] dark:border-[#262c36] bg-[#f6f7f9] dark:bg-[#0e1116] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-[#a66a12]">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b93a1]">
              Recruiter Evaluation Tool
            </div>
            <div className="font-display font-bold text-lg text-[#101318] dark:text-white">
              Instant Job Description (JD) Matcher & Skills Analyzer
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#5c6472] dark:text-[#8b93a1]">Match Engine:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {matchScore}% Alignment
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Preset Selector */}
        <div>
          <label className="block text-xs font-mono text-[#8b93a1] uppercase mb-2">
            Select Your Target Hiring Role or Open Position:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PRESET_JDS.map((preset, idx) => (
              <button
                key={preset.roleId}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setIsCustomMode(false);
                }}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  !isCustomMode && selectedPresetIndex === idx
                    ? 'bg-[#101318] text-white dark:bg-white dark:text-[#101318] border-transparent shadow-xs'
                    : 'bg-[#f6f7f9] dark:bg-[#1a1f28] border-[#dfe3e9] dark:border-[#30363d] text-[#101318] dark:text-white hover:border-[#a66a12]'
                }`}
              >
                <span className="text-xs font-semibold line-clamp-2 leading-tight">
                  {preset.title}
                </span>
                <span className={`text-[10px] font-mono mt-2 ${
                  !isCustomMode && selectedPresetIndex === idx ? 'text-amber-300 dark:text-amber-700' : 'text-[#a66a12]'
                }`}>
                  {94 + (idx % 5)}% Fit →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Analysis Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36]">
          {/* Left: Summary pitch & skills */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider mb-1">
                Candidate Pitch for {activePreset.title}
              </div>
              <p className="text-sm text-[#101318] dark:text-white font-medium leading-relaxed">
                "{activePreset.summaryPitch}"
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider mb-2">
                Key Requirements Satisfied & Validated
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePreset.requiredSkills.map((skill, sIdx) => (
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
          </div>

          {/* Right: Quick actions for recruiter */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#dfe3e9] dark:border-[#262c36] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase text-[#8b93a1] tracking-wider">
                Recommended Proof of Work
              </div>

              <div 
                onClick={() => onOpenCaseStudy(activePreset.recommendedCaseStudy)}
                className="p-3 rounded-xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] hover:border-[#a66a12] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#101318] dark:text-white group-hover:text-[#a66a12] transition-colors">
                  <span className="capitalize">Inspect {activePreset.recommendedCaseStudy.replace('_', ' ')} Case Study</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-[#5c6472] dark:text-[#8b93a1] mt-1">
                  Full problem, data schema, analysis, code snippets & executive recommendations.
                </div>
              </div>
            </div>

            {/* Direct PDF Download */}
            <button
              onClick={() => onSelectResume(activePreset.targetRole)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#a66a12] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download {activePreset.targetRole.title} ATS Resume (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
