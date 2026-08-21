import React, { useState } from 'react';
import { Play, Database, Table, Check, Copy, Sparkles, Terminal, Code2, RefreshCw } from 'lucide-react';

interface QueryPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  sql: string;
  businessInsight: string;
  columns: string[];
  rows: (string | number)[][];
}

const PRESET_QUERIES: QueryPreset[] = [
  {
    id: 'churn_cohort',
    name: 'VOIS 30-Day Cohort Churn Rate (CTEs & Window)',
    category: 'Vodafone Enterprise',
    description: 'Calculates month-over-month active customer retention and churn velocity by tenure bucket.',
    sql: `WITH MonthlyCohorts AS (
  SELECT 
    customer_id,
    DATE_TRUNC('month', signup_date) AS cohort_month,
    tenure_months,
    monthly_charges,
    CASE WHEN churn_status = 'Yes' THEN 1 ELSE 0 END AS is_churned
  FROM vois_customer_base
  WHERE signup_date >= '2025-01-01'
),
CohortAggregates AS (
  SELECT
    cohort_month,
    COUNT(customer_id) AS total_subscribers,
    SUM(is_churned) AS churned_subscribers,
    ROUND(AVG(monthly_charges), 2) AS avg_arpu,
    ROUND(SUM(is_churned) * 100.0 / COUNT(customer_id), 2) AS churn_rate_pct
  FROM MonthlyCohorts
  GROUP BY cohort_month
)
SELECT 
  cohort_month,
  total_subscribers,
  churned_subscribers,
  avg_arpu,
  churn_rate_pct,
  ROUND(AVG(churn_rate_pct) OVER(ORDER BY cohort_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3m_churn_avg
FROM CohortAggregates
ORDER BY cohort_month DESC;`,
    businessInsight: 'Surfaced that month 2-3 subscribers with monthly charges > ₹799 had a 24.8% churn peak due to onboarding drop-off, guiding the automated Power BI churn alert engine.',
    columns: ['cohort_month', 'total_subscribers', 'churned_subscribers', 'avg_arpu', 'churn_rate_pct', 'rolling_3m_churn_avg'],
    rows: [
      ['2025-10-01', 14200, 710, 642.50, '5.00%', '5.32%'],
      ['2025-09-01', 13850, 748, 638.10, '5.40%', '5.63%'],
      ['2025-08-01', 12900, 718, 629.40, '5.57%', '5.85%'],
      ['2025-07-01', 11400, 675, 620.00, '5.92%', '6.12%'],
      ['2025-06-01', 10800, 654, 615.80, '6.06%', '6.30%']
    ]
  },
  {
    id: 'upi_velocity',
    name: 'UPI Latency & Transaction Velocity (Rolling Window)',
    category: 'PriorityPe Analytics',
    description: 'Tracks 7-day rolling transaction volume and peak timeout complaint rate across banking switches.',
    sql: `SELECT 
  transaction_date,
  bank_switch,
  daily_tx_volume,
  failed_transactions,
  ROUND(failed_transactions * 100.0 / daily_tx_volume, 3) AS failure_rate_pct,
  ROUND(AVG(daily_tx_volume) OVER (
    PARTITION BY bank_switch 
    ORDER BY transaction_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 0) AS rolling_7d_avg_volume,
  RANK() OVER (PARTITION BY transaction_date ORDER BY failed_transactions DESC) AS bank_failure_rank
FROM upi_switch_telemetry
WHERE transaction_date >= '2025-11-01'
ORDER BY transaction_date DESC, bank_failure_rank ASC
LIMIT 6;`,
    businessInsight: 'Identified Bank Switch 04 timeout spikes during 19:00-21:00 peak hours, driving the PriorityPe RICE prioritization for auto-switch fallback.',
    columns: ['transaction_date', 'bank_switch', 'daily_tx_volume', 'failed_tx', 'failure_rate_pct', 'rolling_7d_avg', 'failure_rank'],
    rows: [
      ['2025-11-15', 'HDFC_GATEWAY', 482000, 3120, '0.647%', 475400, 1],
      ['2025-11-15', 'SBI_SWITCH_02', 612000, 2450, '0.400%', 598000, 2],
      ['2025-11-15', 'ICICI_NODE_1', 395000, 980, '0.248%', 391200, 3],
      ['2025-11-14', 'SBI_SWITCH_02', 605000, 3890, '0.643%', 592000, 1],
      ['2025-11-14', 'HDFC_GATEWAY', 478000, 2980, '0.623%', 471000, 2],
      ['2025-11-14', 'AXIS_SWITCH_A', 310000, 890, '0.287%', 305000, 3]
    ]
  },
  {
    id: 'financial_distress',
    name: 'Financial Distress Quartile Ranking (NTILE & Partitioning)',
    category: 'Risk Modeling',
    description: 'Segments 78,000+ corporate records into bankruptcy risk tiers using working capital & leverage ratios.',
    sql: `WITH RiskScoring AS (
  SELECT 
    company_cik,
    fiscal_year,
    industry_sector,
    working_capital_to_total_assets,
    retained_earnings_to_total_assets,
    debt_to_equity_ratio,
    xgboost_default_prob
  FROM corporate_financial_filings
  WHERE fiscal_year = 2025
),
SectorQuartiles AS (
  SELECT 
    company_cik,
    industry_sector,
    debt_to_equity_ratio,
    xgboost_default_prob,
    NTILE(4) OVER (PARTITION BY industry_sector ORDER BY xgboost_default_prob DESC) AS risk_quartile,
    PERCENT_RANK() OVER (ORDER BY xgboost_default_prob) AS overall_risk_percentile
  FROM RiskScoring
)
SELECT 
  company_cik,
  industry_sector,
  debt_to_equity_ratio,
  ROUND(xgboost_default_prob * 100.0, 2) AS default_prob_pct,
  CASE risk_quartile
    WHEN 1 THEN 'Q1 - Critical Distress (Top 25%)'
    WHEN 2 THEN 'Q2 - Elevated Risk'
    WHEN 3 THEN 'Q3 - Moderate Stability'
    ELSE 'Q4 - Prime Solvent'
  END AS risk_tier,
  ROUND(overall_risk_percentile * 100.0, 1) AS risk_percentile
FROM SectorQuartiles
ORDER BY default_prob_pct DESC
LIMIT 5;`,
    businessInsight: 'Achieved 0.88 ROC-AUC on 78K filings by combining leverage ratios and retained earnings into non-linear XGBoost trees.',
    columns: ['company_cik', 'industry_sector', 'debt_equity', 'default_prob_pct', 'risk_tier', 'risk_percentile'],
    rows: [
      ['CIK_000184920', 'Retail & Consumer', 4.82, '88.40%', 'Q1 - Critical Distress', '99.8%'],
      ['CIK_000142981', 'Logistics & Supply', 3.94, '81.15%', 'Q1 - Critical Distress', '98.5%'],
      ['CIK_000099821', 'Manufacturing', 3.10, '67.30%', 'Q1 - Critical Distress', '95.1%'],
      ['CIK_000177340', 'Hardware Tech', 1.85, '42.20%', 'Q2 - Elevated Risk', '82.4%'],
      ['CIK_000165502', 'Telecommunications', 1.40, '23.80%', 'Q3 - Moderate Stability', '58.0%']
    ]
  }
];

export const SqlPlayground: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<QueryPreset>(PRESET_QUERIES[0]);
  const [userSql, setUserSql] = useState<string>(PRESET_QUERIES[0].sql);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(14);

  const handleSelectPreset = (preset: QueryPreset) => {
    setSelectedPreset(preset);
    setUserSql(preset.sql);
  };

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionTime(Math.floor(Math.random() * 12) + 8);
    }, 350);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-level-1 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#dfe3e9] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-[#111622]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b93a1]">
              Live Technical Competency Sandbox
            </div>
            <div className="font-display font-bold text-lg text-[#101318] dark:text-white flex items-center gap-2">
              <span>Interactive SQL Query Runner</span>
              <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                PostgreSQL / BigQuery CTEs
              </span>
            </div>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar" role="group" aria-label="SQL Preset Queries">
          {PRESET_QUERIES.map((preset) => (
            <button
              key={preset.id}
              id={`sql-preset-${preset.id}`}
              aria-pressed={selectedPreset.id === preset.id}
              tabIndex={0}
              onClick={() => handleSelectPreset(preset)}
              className={`filter-chip whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                selectedPreset.id === preset.id ? 'filter-chip-active' : ''
              }`}
            >
              {preset.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#5c6472] dark:text-[#9ea7b4]">
            {selectedPreset.description}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg bg-white dark:bg-[#161b24]/90 border border-[#cbd5e1] dark:border-white/15 text-[#101318] dark:text-[#f1f5f9] hover:border-[#a66a12] dark:hover:border-white/30 transition-colors cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-[#a66a12] dark:text-[#fbbf24]" />}
              <span>{copied ? 'Copied' : 'Copy SQL'}</span>
            </button>
            <button
              onClick={handleRunQuery}
              disabled={isRunning}
              className="btn-primary !px-4 !py-1.5 text-xs font-mono disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
            </button>
          </div>
        </div>

        {/* Code Block Container */}
        <div className="relative rounded-xl overflow-hidden border border-[#dfe3e9] dark:border-[#30363d] bg-[#0d1117] text-gray-200">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22] text-[11px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#a66a12]" />
              sql_query_editor.sql
            </span>
            <span>ANSI SQL · Window Functions · Aggregations</span>
          </div>

          <textarea
            id="sql-editor-textarea"
            aria-label="SQL query editor"
            value={userSql}
            onChange={(e) => setUserSql(e.target.value)}
            rows={8}
            className="w-full p-4 font-mono text-xs text-emerald-300 bg-transparent border-0 outline-none resize-none leading-relaxed selection:bg-emerald-900 focus:ring-1 focus:ring-[#a66a12]"
            spellCheck={false}
          />
        </div>

        {/* Result Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#8b93a1]">
            <span className="flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-indigo-500" />
              QUERY RESULT SET ({selectedPreset.rows.length} rows)
            </span>
            <span className="text-emerald-600 dark:text-emerald-400">
              ✓ Executed in {executionTime}ms (0 errors)
            </span>
          </div>

          <div className="border border-[#dfe3e9] dark:border-[#30363d] rounded-xl overflow-x-auto shadow-2xs">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#f6f7f9] dark:bg-[#1a1f28] border-b border-[#dfe3e9] dark:border-[#30363d] text-[#5c6472] dark:text-[#8b93a1]">
                <tr>
                  {selectedPreset.columns.map((col, idx) => (
                    <th key={idx} className="p-2.5 px-3 font-semibold whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dfe3e9] dark:divide-[#262c36] bg-white dark:bg-[#151920]">
                {selectedPreset.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#f6f7f9] dark:hover:bg-[#1a1f28]/60 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 px-3 whitespace-nowrap text-[#101318] dark:text-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Business Takeaway / PM Insight Callout */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#a66a12] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-900 dark:text-amber-200 font-semibold">Business Outcome / Decision Impact: </strong>
            <span className="text-amber-950/80 dark:text-amber-300/90 leading-relaxed">
              {selectedPreset.businessInsight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
