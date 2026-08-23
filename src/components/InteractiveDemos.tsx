import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowUpDown, 
  Activity, 
  Layers, 
  RotateCcw, 
  Terminal, 
  Network, 
  Users 
} from 'lucide-react';
import { INITIAL_RICE_ITEMS } from '../data/portfolioData';
import { RiceItem } from '../types';
import { SqlPlayground } from './SqlPlayground';
import { PipelineArchitecture } from './PipelineArchitecture';
import { CohortRetentionMatrix } from './CohortRetentionMatrix';
import { TrafficD3Chart } from './TrafficD3Chart';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';
import { RiskConstellationCanvas } from './RiskConstellationCanvas';
import { SectionHeader } from './SectionHeader';

type DemoTab = 'traffic' | 'rice' | 'risk' | 'sql' | 'pipeline' | 'cohort';

interface InteractiveDemosProps {
  language?: Language;
}

export const InteractiveDemos: React.FC<InteractiveDemosProps> = ({ language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<DemoTab>('traffic');
  const t = TRANSLATIONS[language]?.demos;

  // RICE Explorer State
  const [items, setItems] = useState<RiceItem[]>(INITIAL_RICE_ITEMS);
  const [impactWeight, setImpactWeight] = useState<number>(1.0);
  const [effortWeight, setEffortWeight] = useState<number>(1.0);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(INITIAL_RICE_ITEMS[0].id);

  // Financial Risk State
  const [roa, setRoa] = useState<number>(3.5); // Profitability %
  const [currentRatio, setCurrentRatio] = useState<number>(1.8); // Liquidity
  const [debtToEquity, setDebtToEquity] = useState<number>(1.2); // Leverage
  const [cashFlowRatio, setCashFlowRatio] = useState<number>(0.15); // Cash Flow / Total Debt
  const [workingCapitalRatio, setWorkingCapitalRatio] = useState<number>(0.25); // WC / Assets

  // Compute RICE scores dynamically
  const rankedItems = useMemo(() => {
    return [...items].map((item) => {
      const weightedImpact = item.impact * impactWeight;
      const weightedEffort = Math.max(0.5, item.effort * effortWeight);
      const score = Math.round((item.reach * weightedImpact * (item.confidence / 100)) / weightedEffort);
      return {
        ...item,
        score
      };
    }).sort((a, b) => b.score - a.score);
  }, [items, impactWeight, effortWeight]);

  const activeTheme = useMemo(() => {
    return items.find(i => i.id === selectedThemeId) || items[0];
  }, [items, selectedThemeId]);

  // Compute XGBoost financial distress probability proxy
  const riskCalculation = useMemo(() => {
    const logit = 0.5 - (0.28 * roa) - (0.45 * currentRatio) + (0.65 * debtToEquity) - (1.1 * cashFlowRatio) - (0.8 * workingCapitalRatio);
    const riskProbability = Math.max(0.01, Math.min(0.99, 1 / (1 + Math.exp(-logit))));
    
    let riskLevel = 'Low Risk / Stable';
    let riskColor = 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (riskProbability > 0.65) {
      riskLevel = 'High Distress Warning';
      riskColor = 'text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/30';
    } else if (riskProbability > 0.35) {
      riskLevel = 'Moderate Caution';
      riskColor = 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30';
    }

    const shapContributions = [
      { name: 'Return on Total Assets (ROA)', value: (5.0 - roa) * 0.12, raw: `${roa.toFixed(1)}%` },
      { name: 'Total Debt / Total Equity', value: (debtToEquity - 1.0) * 0.35, raw: `${debtToEquity.toFixed(2)}x` },
      { name: 'Operating Cash Flow / Total Debt', value: (0.25 - cashFlowRatio) * 0.42, raw: cashFlowRatio.toFixed(2) },
      { name: 'Current Assets / Current Liabilities', value: (2.2 - currentRatio) * 0.25, raw: `${currentRatio.toFixed(1)}x` },
      { name: 'Working Capital / Total Assets', value: (0.4 - workingCapitalRatio) * 0.24, raw: workingCapitalRatio.toFixed(2) }
    ];

    return {
      probability: (riskProbability * 100).toFixed(1),
      riskLevel,
      riskColor,
      shapContributions
    };
  }, [roa, currentRatio, debtToEquity, cashFlowRatio, workingCapitalRatio]);

  return (
    <section id="demos" className="section-ambient-container ambient-theme-emerald py-16 sm:py-20 border-y border-[#fecdd3]/70 dark:border-white/[0.08] overflow-hidden">
      {/* Thematic Ambient Light Shift (Emerald & Quantitative Mint Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
        <SectionHeader
          label={t?.label || "04 · INTERACTIVE SANDBOX & TECHNICAL DEMOS"}
          heading={t?.heading || "Test the Prioritization, Risk & SQL Engines Live"}
          subheading={t?.subheading || "Live mathematical and data models proving how quantitative analysis drives product roadmaps, credit decisions, and real-time streams."}
        />

        {/* Demo Selector Tabs */}
        <div 
          role="tablist"
          aria-label="Interactive Demo Sandboxes"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar"
        >
          <button
            id="demo-tab-traffic"
            role="tab"
            aria-selected={activeTab === 'traffic'}
            tabIndex={0}
            onClick={() => setActiveTab('traffic')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
              activeTab === 'traffic' ? 'tab-btn-active' : ''
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Portfolio Traffic & D3.js</span>
          </button>

          <button
            id="demo-tab-rice"
            role="tab"
            aria-selected={activeTab === 'rice'}
            tabIndex={0}
            onClick={() => setActiveTab('rice')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
              activeTab === 'rice' ? 'tab-btn-active' : ''
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Product RICE Prioritization</span>
          </button>

          <button
            id="demo-tab-risk"
            role="tab"
            aria-selected={activeTab === 'risk'}
            tabIndex={0}
            onClick={() => setActiveTab('risk')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
              activeTab === 'risk' ? 'tab-btn-active' : ''
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-rose-500" />
            <span>Financial Risk & SHAP (XGBoost)</span>
          </button>

          <button
            id="demo-tab-sql"
            role="tab"
            aria-selected={activeTab === 'sql'}
            tabIndex={0}
            onClick={() => setActiveTab('sql')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
              activeTab === 'sql' ? 'tab-btn-active' : ''
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>Interactive SQL Query Runner</span>
          </button>

          <button
            id="demo-tab-pipeline"
            role="tab"
            aria-selected={activeTab === 'pipeline'}
            tabIndex={0}
            onClick={() => setActiveTab('pipeline')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
              activeTab === 'pipeline' ? 'tab-btn-active' : ''
            }`}
          >
            <Network className="w-3.5 h-3.5 text-blue-500" />
            <span>Data Pipeline Architecture</span>
          </button>

          <button
            id="demo-tab-cohort"
            role="tab"
            aria-selected={activeTab === 'cohort'}
            tabIndex={0}
            onClick={() => setActiveTab('cohort')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
              activeTab === 'cohort' ? 'tab-btn-active' : ''
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>Cohort Retention Matrix</span>
          </button>
        </div>

        {/* TAB 0: D3 PORTFOLIO TRAFFIC & FUNNEL */}
        {activeTab === 'traffic' && <TrafficD3Chart />}

        {/* TAB 1: RICE */}
        {activeTab === 'rice' && (
          <div className="card-level-1 p-6 sm:p-8 bg-white/95 dark:bg-[#141924]/90 border border-[#fecdd3] dark:border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#e11d48] dark:text-[#fbbf24] font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> PRIORITYPE ENGINE
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 dark:bg-white/5 border border-[#fecdd3]/60 dark:border-white/10 text-[#5e3240] dark:text-[#8b93a1]">
                    6,000 Reviews Dataset
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#2d151c] dark:text-white tracking-tight">
                  UPI RICE Prioritization Sandbox
                </h3>
                <p className="text-xs text-[#5e3240] dark:text-[#9ea7b4]">
                  Adjust the strategic multipliers below to dynamically re-rank product roadmap items based on severity versus developer bandwidth.
                </p>

                {/* Multipliers */}
                <div className="space-y-3.5 p-4 card-level-2 bg-white/80 dark:bg-white/[0.03] border border-[#fecdd3]/60 dark:border-white/10">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#5e3240] dark:text-[#8b93a1]">Impact Multiplier</span>
                      <strong className="text-[#2d151c] dark:text-white font-bold">{impactWeight.toFixed(1)}x</strong>
                    </div>
                    <input
                      id="rice-impact-slider"
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={impactWeight}
                      onChange={(e) => setImpactWeight(parseFloat(e.target.value))}
                      className="w-full accent-[#e11d48] dark:accent-[#fbbf24] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#a06b7a] dark:text-[#8b93a1] mt-0.5">
                      <span>Balanced</span>
                      <span>High Severity</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#5e3240] dark:text-[#8b93a1]">Effort Sensitivity</span>
                      <strong className="text-[#2d151c] dark:text-white font-bold">{effortWeight.toFixed(1)}x</strong>
                    </div>
                    <input
                      id="rice-effort-slider"
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={effortWeight}
                      onChange={(e) => setEffortWeight(parseFloat(e.target.value))}
                      className="w-full accent-[#e11d48] dark:accent-[#fbbf24] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#a06b7a] dark:text-[#8b93a1] mt-0.5">
                      <span>Speed focus</span>
                      <span>Cost-sensitive</span>
                    </div>
                  </div>
                </div>

                {/* Top Item PM Note */}
                <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-[#fbbf24]/10 border border-rose-500/20 dark:border-[#fbbf24]/20 text-xs">
                  <div className="font-mono font-semibold text-[#e11d48] dark:text-[#fbbf24] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> PM Recommendation for #{1} ({rankedItems[0].theme})
                  </div>
                  <p className="text-[#5e3240] dark:text-[#c4cad4] leading-relaxed font-normal">
                    {rankedItems[0].reasoning}
                  </p>
                </div>
              </div>

              {/* Right: Ranked Themes */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#a06b7a] dark:text-[#8b93a1] px-1 font-semibold">
                  <span>RANKED UPI COMPLAINT THEMES</span>
                  <span>RICE SCORE</span>
                </div>

                <div className="space-y-2">
                  {rankedItems.map((item, idx) => {
                    const isSelected = item.id === activeTheme.id;
                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${item.theme} for detailed review`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedThemeId(item.id);
                          }
                        }}
                        onClick={() => setSelectedThemeId(item.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between focus:ring-2 focus:ring-[#e11d48] outline-none ${
                          isSelected
                            ? 'bg-[#2d151c] text-white border-[#2d151c] dark:bg-white dark:text-[#101318] dark:border-white shadow-sm'
                            : 'card-level-2 hover:border-[#e11d48] text-[#2d151c] dark:text-white bg-white/80 dark:bg-white/[0.03] border-[#fecdd3]/60 dark:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`font-mono text-sm font-bold ${
                            idx === 0 ? 'text-[#e11d48] dark:text-[#fbbf24]' : isSelected ? 'text-white dark:text-[#101318]' : 'text-[#a06b7a] dark:text-[#8b93a1]'
                          }`}>
                            #{idx + 1}
                          </span>
                          <div className="truncate">
                            <div className="text-sm font-semibold truncate">{item.theme}</div>
                            <div className={`text-xs font-mono mt-0.5 truncate ${
                              isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-[#a06b7a] dark:text-[#8b93a1]'
                            }`}>
                              Reach: {item.reach.toLocaleString()} · Impact: {item.impact}/5 · Confidence: {item.confidence}% · Effort: {item.effort}w
                            </div>
                          </div>
                        </div>

                        <div className="font-mono font-bold text-base flex-shrink-0 ml-3">
                          {item.score.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL RISK */}
        {activeTab === 'risk' && (
          <div className="card-level-1 p-6 sm:p-8 bg-white/95 dark:bg-[#141924]/90 border border-[#fecdd3] dark:border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#e11d48] dark:text-[#fbbf24] font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> RISK & DISTRESS BENCHMARK
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 dark:bg-white/5 border border-[#fecdd3]/60 dark:border-white/10 text-[#5e3240] dark:text-[#8b93a1]">
                    78,682 Records · XGBoost 0.857
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#2d151c] dark:text-white tracking-tight">
                  Corporate Distress Warning Simulator
                </h3>
                <p className="text-xs text-[#5e3240] dark:text-[#9ea7b4]">
                  Simulate balance sheet ratios to inspect live default probability and SHAP explainability deltas.
                </p>

                {/* Ratio Sliders */}
                <div className="space-y-3 p-4 card-level-2 bg-white/80 dark:bg-white/[0.03] border border-[#fecdd3]/60 dark:border-white/10">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5e3240] dark:text-[#8b93a1]">Profitability (ROA %):</span>
                      <strong className="text-[#2d151c] dark:text-white font-bold">{roa.toFixed(1)}%</strong>
                    </div>
                    <input
                      id="risk-roa-slider"
                      aria-label="Profitability ROA percentage"
                      type="range"
                      min="-5.0"
                      max="15.0"
                      step="0.5"
                      value={roa}
                      onChange={(e) => setRoa(parseFloat(e.target.value))}
                      className="w-full accent-[#e11d48] dark:accent-[#fbbf24] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5e3240] dark:text-[#8b93a1]">Liquidity (Current Ratio):</span>
                      <strong className="text-[#2d151c] dark:text-white font-bold">{currentRatio.toFixed(2)}x</strong>
                    </div>
                    <input
                      id="risk-liquidity-slider"
                      aria-label="Liquidity current ratio"
                      type="range"
                      min="0.5"
                      max="4.0"
                      step="0.1"
                      value={currentRatio}
                      onChange={(e) => setCurrentRatio(parseFloat(e.target.value))}
                      className="w-full accent-[#e11d48] dark:accent-[#fbbf24] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5e3240] dark:text-[#8b93a1]">Leverage (Debt to Equity):</span>
                      <strong className="text-[#2d151c] dark:text-white font-bold">{debtToEquity.toFixed(2)}x</strong>
                    </div>
                    <input
                      id="risk-leverage-slider"
                      aria-label="Leverage debt to equity ratio"
                      type="range"
                      min="0.2"
                      max="5.0"
                      step="0.1"
                      value={debtToEquity}
                      onChange={(e) => setDebtToEquity(parseFloat(e.target.value))}
                      className="w-full accent-[#e11d48] dark:accent-[#fbbf24] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5e3240] dark:text-[#8b93a1]">Operating Cash Flow / Debt:</span>
                      <strong className="text-[#2d151c] dark:text-white font-bold">{cashFlowRatio.toFixed(2)}</strong>
                    </div>
                    <input
                      id="risk-cashflow-slider"
                      aria-label="Operating cash flow to debt ratio"
                      type="range"
                      min="-0.2"
                      max="0.6"
                      step="0.05"
                      value={cashFlowRatio}
                      onChange={(e) => setCashFlowRatio(parseFloat(e.target.value))}
                      className="w-full accent-[#e11d48] dark:accent-[#fbbf24] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Output & SHAP */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 card-level-2 bg-white/80 dark:bg-white/[0.03] border border-[#fecdd3]/60 dark:border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#a06b7a] dark:text-[#8b93a1] font-semibold">Model Risk Assessment</div>
                      <div className="text-xs font-mono text-[#5e3240] dark:text-[#9ea7b4]">XGBoost Ensemble Prediction</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${riskCalculation.riskColor}`}>
                      {riskCalculation.riskLevel}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-[#fecdd3]/60 dark:border-white/[0.08]">
                    <span className="text-xs font-mono text-[#5e3240] dark:text-[#8b93a1]">Probability of Default:</span>
                    <span className="font-mono font-bold text-3xl text-[#2d151c] dark:text-white">
                      {riskCalculation.probability}%
                    </span>
                  </div>
                </div>

                {/* SHAP contributions */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-[#a06b7a] dark:text-[#8b93a1] uppercase font-semibold">
                    SHAP Explainability Delta (Marginal Risk Impact)
                  </div>
                  {riskCalculation.shapContributions.map((shap, idx) => {
                    const isRiskDriver = shap.value > 0.2;
                    return (
                      <div key={idx} className="flex items-center justify-between text-xs font-mono p-2.5 card-level-3 bg-white/80 dark:bg-white/[0.02] border border-[#fecdd3]/50 dark:border-white/5">
                        <span className="text-[#5e3240] dark:text-[#9ea7b4]">{shap.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#a06b7a] dark:text-[#8b93a1]">{shap.raw}</span>
                          <span className={`font-semibold ${isRiskDriver ? 'text-rose-500 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}`}>
                            {isRiskDriver ? `+${shap.value.toFixed(2)}` : `${shap.value.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3D Advanced Depth Constellation & Decision Boundary Field */}
            <div className="mt-8 pt-6 border-t border-[#fecdd3]/60 dark:border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-mono text-xs text-[#e11d48] dark:text-[#fbbf24] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> 3D Spatial Feature Distribution & Decision Boundary
                  </h4>
                  <p className="text-xs text-[#5e3240] dark:text-[#9ea7b4] mt-0.5">
                    Interactive 3D depth-separated constellation with mouse parallax, bloom luminescence, and depth-of-field optics.
                  </p>
                </div>
              </div>
              <RiskConstellationCanvas />
            </div>
          </div>
        )}

        {/* TAB 3: SQL RUNNER */}
        {activeTab === 'sql' && <SqlPlayground />}

        {/* TAB 4: DATA PIPELINE ARCHITECTURE */}
        {activeTab === 'pipeline' && <PipelineArchitecture />}

        {/* TAB 5: COHORT RETENTION MATRIX */}
        {activeTab === 'cohort' && <CohortRetentionMatrix />}
      </div>
    </section>
  );
};
