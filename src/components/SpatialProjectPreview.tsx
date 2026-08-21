import React from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Layers, 
  LineChart, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  PieChart, 
  CheckCircle2, 
  ArrowUpRight,
  GitBranch,
  HeartPulse,
  MessageSquareCode,
  Gauge
} from 'lucide-react';

interface SpatialProjectPreviewProps {
  projectId: string;
  isHovered: boolean;
  coords: { x: number; y: number };
}

export const SpatialProjectPreview: React.FC<SpatialProjectPreviewProps> = ({
  projectId,
  isHovered,
  coords
}) => {
  // Micro-parallax calculations for 3D elements inside preview
  const offsetX = isHovered ? (coords.x - 200) / 25 : 0;
  const offsetY = isHovered ? (coords.y - 150) / 25 : 0;

  switch (projectId) {
    case 'prioritype':
      return (
        <div className="relative w-full rounded-2xl overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 border border-indigo-500/20 backdrop-blur-xl shadow-inner">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          {/* Ambient micro light bloom */}
          <div 
            className="absolute w-36 h-36 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none transition-all duration-300"
            style={{ 
              top: `${Math.max(10, Math.min(80, coords.y / 4))}%`, 
              left: `${Math.max(10, Math.min(80, coords.x / 4))}%` 
            }}
          />

          {/* Floating Spatial Header */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-indigo-500/15 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-indigo-300 uppercase">
                RICE Prioritization Matrix HUD
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
              6,000 REVIEWS MINED
            </span>
          </div>

          {/* Core HUD Spatial Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-3.5 relative z-10">
            {/* Left: Top 3 Ranked Complaint Themes */}
            <div className="sm:col-span-7 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>SURFACED TOPIC</span>
                <span>RICE SCORE</span>
              </div>

              {[
                { rank: '01', topic: 'Failed UPI Debit Without Refund', score: '840.0', pct: 95, color: 'from-amber-400 to-rose-500', app: 'PhonePe · GPay' },
                { rank: '02', topic: 'SMS OTP Latency / Timeout', score: '672.0', pct: 76, color: 'from-indigo-400 to-purple-500', app: 'Paytm · GPay' },
                { rank: '03', topic: 'Bank Server 503 HTTP Sync Error', score: '520.0', pct: 60, color: 'from-cyan-400 to-blue-500', app: 'All Platforms' },
              ].map((item, i) => (
                <div 
                  key={i}
                  style={{
                    transform: isHovered ? `translateX(${offsetX * (0.3 + i * 0.2)}px) translateY(${offsetY * (0.2 + i * 0.1)}px)` : 'none',
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-400/40 transition-colors group/item"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-indigo-400 shrink-0">
                        #{item.rank}
                      </span>
                      <span className="font-sans text-xs font-semibold text-slate-200 truncate group-hover/item:text-white">
                        {item.topic}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-indigo-300 shrink-0">
                      {item.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-slate-500 shrink-0">{item.app}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dynamic Spatial Weightings & Radar Node */}
            <div 
              style={{
                transform: isHovered ? `translateX(${-offsetX * 0.4}px) translateY(${-offsetY * 0.4}px)` : 'none',
                transition: 'transform 0.15s ease-out',
              }}
              className="sm:col-span-5 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300 font-semibold mb-2">
                  <span>RICE COEFFICIENTS</span>
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                </div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Reach (R):</span>
                    <span className="text-indigo-300 font-semibold">1,200 users/mo</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Impact (I):</span>
                    <span className="text-indigo-300 font-semibold">3.0 (Massive)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Confidence (C):</span>
                    <span className="text-indigo-300 font-semibold">90%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Effort (E):</span>
                    <span className="text-indigo-300 font-semibold">4.0 Person-Weeks</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-indigo-500/15 flex items-center justify-between">
                <span className="font-mono text-[9px] text-slate-400 uppercase">Formula: (R × I × C) / E</span>
                <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  TOP PRIORITY #1
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-indigo-500/15 font-mono text-[10px] text-slate-400 relative z-10">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-indigo-400" />
              <span>TF-IDF + KMeans Vector Clustering</span>
            </span>
            <span className="text-indigo-300">VADER Sentiment Polarity: -0.84</span>
          </div>
        </div>
      );

    case 'financial-analytics':
      return (
        <div className="relative w-full rounded-2xl overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-slate-950/70 via-indigo-950/40 to-slate-900/80 border border-purple-500/20 backdrop-blur-xl shadow-inner">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Telemetry Header */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-purple-500/15 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-purple-300 uppercase">
                XGBoost Distress Radar & SHAP Spectrum
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30">
              ROC-AUC 0.857
            </span>
          </div>

          {/* 3D Visualizer: SHAP Feature Importance Waterfall */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-3.5 relative z-10">
            <div className="sm:col-span-8 space-y-2">
              <div className="text-[10px] font-mono text-slate-400 px-1">
                TOP SHAP PREDICTIVE FINANCIAL RATIOS
              </div>

              {[
                { name: 'Retained Earnings / Total Assets', shap: '+0.428', bar: '88%', positive: true },
                { name: 'EBITDA / Total Debt Ratio', shap: '+0.364', bar: '74%', positive: true },
                { name: 'Working Capital / Total Assets', shap: '+0.291', bar: '60%', positive: true },
                { name: 'Market Value of Equity / Liabilities', shap: '+0.215', bar: '45%', positive: true },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    transform: isHovered ? `translateX(${offsetX * (0.2 + idx * 0.15)}px)` : 'none',
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-300 truncate">{item.name}</div>
                    <div className="h-1 rounded-full bg-slate-800 mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                        style={{ width: item.bar }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-purple-300 shrink-0">
                    {item.shap}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Early Warning Gauge Widget */}
            <div 
              style={{
                transform: isHovered ? `translateX(${-offsetX * 0.3}px) translateY(${-offsetY * 0.3}px)` : 'none',
                transition: 'transform 0.15s ease-out',
              }}
              className="sm:col-span-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex flex-col justify-between text-center"
            >
              <div className="text-[10px] font-mono text-purple-300 font-semibold">
                ALTMAN Z-SCORE ENGINE
              </div>
              <div className="my-2">
                <div className="font-mono text-2xl font-bold text-emerald-400">
                  2.84
                </div>
                <div className="text-[9px] font-mono text-slate-400 uppercase mt-0.5">
                  Safe Zone &gt; 2.6
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-300">
                78,682 Records
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-purple-500/15 font-mono text-[10px] text-slate-400 relative z-10">
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-purple-400" />
              <span>Benchmarked: XGBoost, Random Forest, Logistic, LightGBM</span>
            </span>
            <span className="text-purple-300">18 Financial Filings Ratios</span>
          </div>
        </div>
      );

    case 'mediflowrt':
      return (
        <div className="relative w-full rounded-2xl overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 backdrop-blur-xl shadow-inner">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="flex items-center justify-between gap-2 pb-3 border-b border-cyan-500/15 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-cyan-300 uppercase">
                Azure Streaming ETL Pipeline DAG
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
              12ms STREAM LATENCY
            </span>
          </div>

          {/* DAG Pipeline Diagram */}
          <div className="my-4 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
              {[
                { stage: 'Telemetry Ingest', tech: 'Azure Event Hub', color: 'border-cyan-500/40 text-cyan-300' },
                { stage: 'Bronze/Silver/Gold', tech: 'Databricks Delta', color: 'border-blue-500/40 text-blue-300' },
                { stage: 'Star-Schema DW', tech: 'Synapse SQL', color: 'border-indigo-500/40 text-indigo-300' },
                { stage: 'Live Monitor', tech: 'Power BI Ops', color: 'border-amber-500/40 text-amber-300' },
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div 
                    style={{
                      transform: isHovered ? `translateY(${offsetY * (0.2 + idx * 0.1)}px)` : 'none',
                      transition: 'transform 0.15s ease-out',
                    }}
                    className={`flex-1 w-full p-2.5 rounded-xl bg-slate-900/80 border ${step.color} text-center`}
                  >
                    <div className="text-[10px] text-slate-400 font-mono uppercase">{step.stage}</div>
                    <div className="font-semibold text-slate-200 text-xs mt-0.5">{step.tech}</div>
                  </div>
                  {idx < 3 && (
                    <div className="hidden sm:block text-slate-600 font-bold">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-cyan-500/15 font-mono text-[10px] text-slate-400 relative z-10">
            <span className="flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>3 Hospital Units Monitored (ICU, ER, General)</span>
            </span>
            <span className="text-emerald-400 font-semibold">+25% Query Speedup</span>
          </div>
        </div>
      );

    case 'customer-retention':
      return (
        <div className="relative w-full rounded-2xl overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-emerald-950/30 border border-emerald-500/20 backdrop-blur-xl shadow-inner">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-500/15 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-emerald-300 uppercase">
                RFM Cohort Segmentation Grid & CLV
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
              10,000+ TXNS
            </span>
          </div>

          {/* RFM Cohorts 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2.5 my-3.5 relative z-10 font-mono text-xs">
            {[
              { segment: 'Champions (R5, F5, M5)', size: '28% Revenue', desc: 'Highest CLV, frequent basket size', color: 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300' },
              { segment: 'Loyal Customers (R4, F4)', size: '34% Volume', desc: 'Consistent repeat cadence', color: 'border-indigo-500/30 bg-indigo-950/30 text-indigo-300' },
              { segment: 'At Risk (R1, F4, M4)', size: '15% Churn Alert', desc: 'High historic spend, inactive 60d+', color: 'border-amber-500/30 bg-amber-950/30 text-amber-300' },
              { segment: 'Hibernating (R1, F1)', size: '23% Base', desc: 'Win-back reactivation campaigns', color: 'border-rose-500/30 bg-rose-950/30 text-rose-300' },
            ].map((cohort, i) => (
              <div 
                key={i}
                style={{
                  transform: isHovered ? `translateX(${offsetX * (0.2 + i * 0.1)}px)` : 'none',
                  transition: 'transform 0.15s ease-out',
                }}
                className={`p-2.5 rounded-xl border ${cohort.color}`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="truncate">{cohort.segment}</span>
                  <span className="text-[10px] opacity-90">{cohort.size}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{cohort.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-emerald-500/15 font-mono text-[10px] text-slate-400 relative z-10">
            <span>DAX Star-Schema Data Model</span>
            <span className="text-emerald-400 font-semibold">−12% Stock-Out Occurrences</span>
          </div>
        </div>
      );

    case 'cardioinsight':
      return (
        <div className="relative w-full rounded-2xl overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-rose-950/30 via-slate-900/60 to-purple-950/40 border border-rose-500/20 backdrop-blur-xl shadow-inner">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="flex items-center justify-between gap-2 pb-3 border-b border-rose-500/15 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-rose-300 uppercase">
                Clinical Ensemble: XGBoost + Deep NN
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-rose-500/20 text-rose-200 border border-rose-400/30">
              90.5% ACCURACY
            </span>
          </div>

          {/* Model Architecture & SHAP Biomarkers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5 relative z-10 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase mb-1">Dual-Stream Voting</div>
              <div className="text-slate-200 font-semibold text-xs">XGBoost (55%) + Deep MLP (45%)</div>
              <div className="text-[10px] text-emerald-400 mt-1">ROC-AUC: 0.940 Benchmark</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase mb-1">Key SHAP Biomarkers</div>
              <div className="text-slate-200 font-semibold text-xs">ST-Depression (oldpeak), Thal, CP</div>
              <div className="text-[10px] text-rose-300 mt-1">Full Clinical Interpretability</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-rose-500/15 font-mono text-[10px] text-slate-400 relative z-10">
            <span>TensorFlow + Scikit-Learn</span>
            <span className="text-rose-300">Physician-Ready Risk Summary</span>
          </div>
        </div>
      );

    case 'mindease':
      return (
        <div className="relative w-full rounded-2xl overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-indigo-950/40 border border-purple-500/20 backdrop-blur-xl shadow-inner">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="flex items-center justify-between gap-2 pb-3 border-b border-purple-500/15 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-purple-300 uppercase">
                Transformer Emotion Classifier Pipeline
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30">
              87% EMOTION MATCH
            </span>
          </div>

          {/* NLP Pipeline Stage */}
          <div className="my-3.5 space-y-2 relative z-10 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] text-slate-400">INPUT UTTERANCE</div>
                <div className="text-slate-200 text-xs mt-0.5">&quot;Feeling overwhelmed with semester finals...&quot;</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold shrink-0">
                STRESS / ANXIETY
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Hugging Face Tokenizer</span>
              <span className="text-emerald-400">Zero-lag Flask Streamlit Endpoint</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-purple-500/15 font-mono text-[10px] text-slate-400 relative z-10">
            <span className="flex items-center gap-1">
              <MessageSquareCode className="w-3.5 h-3.5 text-purple-400" />
              <span>Prompt Chaining & Sentiment Validation</span>
            </span>
            <span className="text-purple-300">Empathetic Response Engine</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
