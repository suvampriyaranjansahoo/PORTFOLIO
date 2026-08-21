import React, { useState } from 'react';
import { Users, TrendingUp, Filter, Sparkles, HelpCircle } from 'lucide-react';

interface CohortData {
  cohortMonth: string;
  size: number;
  months: number[];
}

const SEGMENTS = {
  all_users: {
    label: 'VOIS Customer Base (50,000 Records)',
    description: 'Post-intervention retention curve following automated DAX churn alerts and proactive support.',
    cohorts: [
      { cohortMonth: '2025 Jan', size: 10400, months: [100, 88.5, 82.1, 78.4, 76.0, 74.5, 73.8] },
      { cohortMonth: '2025 Feb', size: 11200, months: [100, 89.2, 83.0, 79.1, 77.2, 75.8] },
      { cohortMonth: '2025 Mar', size: 11800, months: [100, 90.1, 84.6, 81.2, 79.5] },
      { cohortMonth: '2025 Apr', size: 12500, months: [100, 91.4, 86.2, 83.0] },
      { cohortMonth: '2025 May', size: 13100, months: [100, 92.0, 87.5] },
      { cohortMonth: '2025 Jun', size: 14200, months: [100, 93.2] }
    ]
  },
  upi_power: {
    label: 'PriorityPe Power Users (UPI Frequent)',
    description: 'High-frequency transaction cohort with auto-switch routing enabled.',
    cohorts: [
      { cohortMonth: '2025 Jan', size: 3400, months: [100, 94.2, 91.0, 88.5, 87.0, 86.2, 85.5] },
      { cohortMonth: '2025 Feb', size: 3900, months: [100, 94.8, 91.8, 89.4, 88.1, 87.4] },
      { cohortMonth: '2025 Mar', size: 4500, months: [100, 95.5, 92.6, 90.8, 89.5] },
      { cohortMonth: '2025 Apr', size: 5200, months: [100, 96.2, 93.8, 92.0] },
      { cohortMonth: '2025 May', size: 5800, months: [100, 96.9, 94.5] },
      { cohortMonth: '2025 Jun', size: 6400, months: [100, 97.4] }
    ]
  }
};

export const CohortRetentionMatrix: React.FC = () => {
  const [selectedSegmentKey, setSelectedSegmentKey] = useState<'all_users' | 'upi_power'>('all_users');
  const [hoveredCell, setHoveredCell] = useState<{ cohort: string; monthIndex: number; value: number; size: number } | null>(null);

  const activeSegment = SEGMENTS[selectedSegmentKey];

  // Helper for heatmap cell color intensity
  const getCellColor = (val: number) => {
    if (val >= 95) return 'bg-emerald-600 text-white';
    if (val >= 90) return 'bg-emerald-500 text-white';
    if (val >= 85) return 'bg-emerald-500/80 text-white';
    if (val >= 80) return 'bg-emerald-500/60 text-emerald-950 dark:text-emerald-100';
    if (val >= 75) return 'bg-amber-500/50 text-amber-950 dark:text-amber-100';
    return 'bg-amber-500/30 text-amber-900 dark:text-amber-200';
  };

  return (
    <div className="bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#dfe3e9] dark:border-[#262c36] bg-[#f6f7f9] dark:bg-[#0e1116] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b93a1]">
              Product Economics & Churn Analysis
            </div>
            <div className="font-display font-bold text-lg text-[#101318] dark:text-white flex items-center gap-2">
              <span>Interactive Cohort Retention Matrix</span>
              <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Month 0 → Month 6+
              </span>
            </div>
          </div>
        </div>

        {/* Segment toggle buttons */}
        <div className="flex items-center gap-1.5" role="group" aria-label="Customer Segment Selector">
          <button
            id="cohort-segment-all-users"
            aria-pressed={selectedSegmentKey === 'all_users'}
            onClick={() => setSelectedSegmentKey('all_users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedSegmentKey === 'all_users'
                ? 'bg-[#101318] dark:bg-white text-white dark:text-[#101318] font-semibold shadow-xs'
                : 'bg-white dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#30363d] text-[#5c6472] dark:text-[#8b93a1]'
            }`}
          >
            VOIS Base (50K)
          </button>
          <button
            id="cohort-segment-upi-power"
            aria-pressed={selectedSegmentKey === 'upi_power'}
            onClick={() => setSelectedSegmentKey('upi_power')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedSegmentKey === 'upi_power'
                ? 'bg-[#101318] dark:bg-white text-white dark:text-[#101318] font-semibold shadow-xs'
                : 'bg-white dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#30363d] text-[#5c6472] dark:text-[#8b93a1]'
            }`}
          >
            PriorityPe Users
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-xs text-[#5c6472] dark:text-[#9ea7b4]">
          {activeSegment.description} Hover over any matrix cell to view active subscriber volume and retention dynamics.
        </p>

        {/* Matrix Table */}
        <div className="border border-[#dfe3e9] dark:border-[#30363d] rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-center text-xs font-mono">
            <thead className="bg-[#f6f7f9] dark:bg-[#1a1f28] border-b border-[#dfe3e9] dark:border-[#30363d] text-[#5c6472] dark:text-[#8b93a1]">
              <tr>
                <th className="p-2.5 px-3 text-left font-semibold">Cohort Month</th>
                <th className="p-2.5 px-3 font-semibold">Initial Users</th>
                <th className="p-2.5 px-3 font-semibold">M0</th>
                <th className="p-2.5 px-3 font-semibold">M1</th>
                <th className="p-2.5 px-3 font-semibold">M2</th>
                <th className="p-2.5 px-3 font-semibold">M3</th>
                <th className="p-2.5 px-3 font-semibold">M4</th>
                <th className="p-2.5 px-3 font-semibold">M5</th>
                <th className="p-2.5 px-3 font-semibold">M6</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfe3e9] dark:divide-[#262c36] bg-white dark:bg-[#151920]">
              {activeSegment.cohorts.map((row) => (
                <tr key={row.cohortMonth} className="hover:bg-[#f6f7f9]/50 dark:hover:bg-[#1a1f28]/30">
                  <td className="p-2.5 px-3 text-left font-semibold text-[#101318] dark:text-white whitespace-nowrap">
                    {row.cohortMonth}
                  </td>
                  <td className="p-2.5 px-3 text-[#5c6472] dark:text-[#8b93a1]">
                    {row.size.toLocaleString()}
                  </td>
                  {[0, 1, 2, 3, 4, 5, 6].map((mIdx) => {
                    const val = row.months[mIdx];
                    if (val === undefined) {
                      return <td key={mIdx} className="p-2.5 text-gray-300 dark:text-gray-700">-</td>;
                    }
                    return (
                      <td 
                        key={mIdx}
                        className="p-1"
                      >
                        <div 
                          role="button"
                          tabIndex={0}
                          aria-label={`${row.cohortMonth} Month ${mIdx} Retention: ${val.toFixed(1)}% (${Math.round(row.size * (val / 100)).toLocaleString()} active subscribers)`}
                          onMouseEnter={() => setHoveredCell({ cohort: row.cohortMonth, monthIndex: mIdx, value: val, size: row.size })}
                          onFocus={() => setHoveredCell({ cohort: row.cohortMonth, monthIndex: mIdx, value: val, size: row.size })}
                          className={`py-1.5 px-2 rounded font-semibold transition-transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-[#a66a12] outline-none cursor-pointer ${getCellColor(val)}`}
                        >
                          {val.toFixed(1)}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hover detail card */}
        {hoveredCell && (
          <div className="p-3.5 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] flex items-center justify-between text-xs font-mono animate-in fade-in duration-100">
            <div>
              <span className="text-[#8b93a1]">Inspecting: </span>
              <strong className="text-[#101318] dark:text-white">{hoveredCell.cohort} (Month {hoveredCell.monthIndex})</strong>
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              Retention: {hoveredCell.value}% ({Math.round(hoveredCell.size * (hoveredCell.value / 100)).toLocaleString()} active subscribers)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
