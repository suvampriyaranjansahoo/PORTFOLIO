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

  const activeTheme = rankedItems.find((t) => t.id === selectedThemeId) || rankedItems[0];

  // Compute Financial Risk Score
  const riskCalculation = useMemo(() => {
    const roaScore = Math.max(0, (5 - roa) * 0.22);
    const liquidityScore = Math.max(0, (2.2 - currentRatio) * 0.25);
    const leverageScore = Math.max(0, (debtToEquity - 0.8) * 0.28);
    const cashFlowScore = Math.max(0, (0.3 - cashFlowRatio) * 0.35);
    const wcScore = Math.max(0, (0.4 - workingCapitalRatio) * 0.24);

    const rawRisk = (roaScore + liquidityScore + leverageScore + cashFlowScore + wcScore);
    const riskProbability = Math.min(0.96, Math.max(0.04, 1 / (1 + Math.exp(- (rawRisk * 2.8 - 2.6)))));

    let riskLevel = 'LOW RISK';
    let riskColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    if (riskProbability > 0.65) {
      riskLevel = 'HIGH DISTRESS';
      riskColor = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
    } else if (riskProbability > 0.35) {
      riskLevel = 'MODERATE CAUTION';
      riskColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    }

    const shapContributions = [
      { name: 'Retained Earnings / Assets (ROA proxy)', value: (5 - roa) * 0.22, raw: `${roa.toFixed(1)}%` },
      { name: 'Cash Flow / Total Debt', value: (0.3 - cashFlowRatio) * 0.35, raw: cashFlowRatio.toFixed(2) },
      { name: 'Debt to Equity Ratio', value: (debtToEquity - 0.8) * 0.28, raw: `${debtToEquity.toFixed(1)}x` },
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
    <section id="demos" className="section-ambient-container ambient-theme-emerald py-16 sm:py-20 border-y border-[#dfe3e9]/70 dark:border-white/[0.08] overflow-hidden">
      {/* Thematic Ambient Light Shift (Emerald & Quantitative Mint Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2">
              {t?.label || "04 · INTERACTIVE SANDBOX & TECHNICAL DEMOS"}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#101318] dark:text-white tracking-tight">
              {t?.heading || "Test the Prioritization, Risk & SQL Engines Live"}
            </h2>
          </div>
          <p className="text-sm text-[#5c6472] dark:text-[#8b93a1] max-w-md">
            {t?.subheading || "Live mathematical and data models proving how quantitative analysis drives product roadmaps, credit decisions, and real-time streams."}
          </p>
        </div>

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
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
              activeTab === 'traffic' ? 'tab-btn-active' : ''
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#a66a12] dark:text-[#fbbf24]" />
            <span>Portfolio Traffic & D3.js</span>
          </button>

          <button
            id="demo-tab-rice"
            role="tab"
            aria-selected={activeTab === 'rice'}
            tabIndex={0}
            onClick={() => setActiveTab('rice')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
              activeTab === 'rice' ? 'tab-btn-active' : ''
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#a66a12] dark:text-[#fbbf24]" />
            <span>Product RICE Prioritization</span>
          </button>

          <button
            id="demo-tab-risk"
            role="tab"
            aria-selected={activeTab === 'risk'}
            tabIndex={0}
            onClick={() => setActiveTab('risk')}
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
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
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
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
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
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
            className={`tab-btn focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
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
          <div className="card-level-1 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#a66a12] font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> PRIORITYPE ENGINE
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded card-level-3 text-[#5c6472] dark:text-[#8b93a1]">
                    6,000 Reviews Dataset
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#101318] dark:text-white tracking-tight">
                  UPI RICE Prioritization Sandbox
                </h3>
                <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                  Adjust the strategic multipliers below to dynamically re-rank product roadmap items based on severity versus developer bandwidth.
                </p>

                {/* Multipliers */}
                <div className="space-y-3.5 p-4 card-level-2">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">Impact Multiplier</span>
                      <strong className="text-[#101318] dark:text-white">{impactWeight.toFixed(1)}x</strong>
                    </div>
                    <input
                      id="rice-impact-slider"
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={impactWeight}
                      onChange={(e) => setImpactWeight(parseFloat(e.target.value))}
                      className="w-full accent-[#a66a12] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#8b93a1] mt-0.5">
                      <span>Balanced</span>
                      <span>High Severity</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">Effort Sensitivity</span>
                      <strong className="text-[#101318] dark:text-white">{effortWeight.toFixed(1)}x</strong>
                    </div>
                    <input
                      id="rice-effort-slider"
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={effortWeight}
                      onChange={(e) => setEffortWeight(parseFloat(e.target.value))}
                      className="w-full accent-[#a66a12] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#8b93a1] mt-0.5">
                      <span>Speed focus</span>
                      <span>Cost-sensitive</span>
                    </div>
                  </div>
                </div>

                {/* Top Item PM Note */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="font-mono font-semibold text-[#a66a12] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> PM Recommendation for #{1} ({rankedItems[0].theme})
                  </div>
                  <p className="text-[#5c6472] dark:text-[#c4cad4] leading-relaxed">
                    {rankedItems[0].reasoning}
                  </p>
                </div>
              </div>

              {/* Right: Ranked Themes */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8b93a1] px-1">
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
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between focus:ring-2 focus:ring-[#a66a12] outline-none ${
                          isSelected
                            ? 'bg-[#101318] text-white border-[#101318] dark:bg-white dark:text-[#101318] dark:border-white shadow-sm'
                            : 'card-level-2 hover:border-[#a66a12] text-[#101318] dark:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`font-mono text-sm font-bold ${
                            idx === 0 ? 'text-[#a66a12]' : isSelected ? 'text-white dark:text-[#101318]' : 'text-[#8b93a1]'
                          }`}>
                            #{idx + 1}
                          </span>
                          <div className="truncate">
                            <div className="text-sm font-semibold truncate">{item.theme}</div>
                            <div className={`text-xs font-mono mt-0.5 truncate ${
                              isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-[#8b93a1]'
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
          <div className="card-level-1 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#a66a12] font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> RISK & DISTRESS BENCHMARK
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded card-level-3 text-[#5c6472] dark:text-[#8b93a1]">
                    78,682 Records · XGBoost 0.857
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#101318] dark:text-white tracking-tight">
                  Corporate Distress Warning Simulator
                </h3>
                <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4]">
                  Simulate balance sheet ratios to inspect live default probability and SHAP explainability deltas.
                </p>

                {/* Ratio Sliders */}
                <div className="space-y-3 p-4 card-level-2">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">Profitability (ROA %):</span>
                      <strong className="text-[#101318] dark:text-white">{roa.toFixed(1)}%</strong>
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
                      className="w-full accent-[#a66a12] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">Liquidity (Current Ratio):</span>
                      <strong className="text-[#101318] dark:text-white">{currentRatio.toFixed(2)}x</strong>
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
                      className="w-full accent-[#a66a12] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">Leverage (Debt to Equity):</span>
                      <strong className="text-[#101318] dark:text-white">{debtToEquity.toFixed(2)}x</strong>
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
                      className="w-full accent-[#a66a12] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#5c6472] dark:text-[#8b93a1]">Operating Cash Flow / Debt:</span>
                      <strong className="text-[#101318] dark:text-white">{cashFlowRatio.toFixed(2)}</strong>
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
                      className="w-full accent-[#a66a12] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Output & SHAP */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 card-level-2">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#8b93a1]">Model Risk Assessment</div>
                      <div className="text-xs font-mono text-[#5c6472] dark:text-[#9ea7b4]">XGBoost Ensemble Prediction</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${riskCalculation.riskColor}`}>
                      {riskCalculation.riskLevel}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-[#dfe3e9] dark:border-white/[0.08]">
                    <span className="text-xs font-mono text-[#5c6472] dark:text-[#8b93a1]">Probability of Default:</span>
                    <span className="font-mono font-bold text-3xl text-[#101318] dark:text-white">
                      {riskCalculation.probability}%
                    </span>
                  </div>
                </div>

                {/* SHAP contributions */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-[#8b93a1] uppercase">
                    SHAP Explainability Delta (Marginal Risk Impact)
                  </div>
                  {riskCalculation.shapContributions.map((shap, idx) => {
                    const isRiskDriver = shap.value > 0.2;
                    return (
                      <div key={idx} className="flex items-center justify-between text-xs font-mono p-2.5 card-level-3">
                        <span className="text-[#5c6472] dark:text-[#9ea7b4]">{shap.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#8b93a1]">{shap.raw}</span>
                          <span className={`font-semibold ${isRiskDriver ? 'text-rose-500' : 'text-emerald-500'}`}>
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
            <div className="mt-8 pt-6 border-t border-[#dfe3e9] dark:border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-mono text-xs text-[#a66a12] dark:text-[#fbbf24] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> 3D Spatial Feature Distribution & Decision Boundary
                  </h4>
                  <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4] mt-0.5">
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
