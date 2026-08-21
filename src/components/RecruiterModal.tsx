import React from 'react';
import { X, Sparkles, Download, ArrowUpRight, CheckCircle2, FileText, Mail } from 'lucide-react';
import { PERSONAL_INFO, RESUME_ROLES } from '../data/portfolioData';
import { ResumeRole } from '../types';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResume: (role: ResumeRole) => void;
  onOpenCaseStudy: (id: string) => void;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({
  isOpen,
  onClose,
  onSelectResume,
  onOpenCaseStudy
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 border-b border-[#dfe3e9] dark:border-[#262c36] flex items-start justify-between gap-4 bg-[#f6f7f9] dark:bg-[#0e1116]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-500/20 mb-2">
              <Sparkles className="w-3 h-3 text-[#a66a12]" /> 60-SECOND RECRUITER EXECUTIVE SUMMARY
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#101318] dark:text-white">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-xs font-mono text-[#a66a12] mt-0.5">
              {PERSONAL_INFO.roleHeadline}
            </p>
          </div>

          <button
            id="close-recruiter-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-3 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="font-mono font-bold text-lg text-[#101318] dark:text-white">50K+</div>
              <div className="text-[10px] font-mono text-[#8b93a1]">Records Validated</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">-40%</div>
              <div className="text-[10px] font-mono text-[#8b93a1]">Reporting Turnaround</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">-5%</div>
              <div className="text-[10px] font-mono text-[#8b93a1]">Customer Churn</div>
            </div>
            <div className="p-3 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="font-mono font-bold text-lg text-[#a66a12]">8.18</div>
              <div className="text-[10px] font-mono text-[#8b93a1]">CGPA (ITER CSE)</div>
            </div>
          </div>

          {/* Quick Fit Summary */}
          <div className="p-4 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] space-y-2 text-xs text-[#5c6472] dark:text-[#9ea7b4]">
            <div className="font-mono font-bold text-xs text-[#101318] dark:text-white uppercase tracking-wider">
              Why Hire Suvam?
            </div>
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong className="text-[#101318] dark:text-white">Proven Enterprise Delivery:</strong> Interned at Vodafone Intelligent Solutions (VOIS), built automated DAX/Power Query reporting, and supported KPI churn modeling.</li>
              <li><strong className="text-[#101318] dark:text-white">Deep Analytical Range:</strong> From SQL CTE data quality auditing and PySpark streaming ETL to customer RFM/CLV cohort segmentation.</li>
              <li><strong className="text-[#101318] dark:text-white">Product & Decision Mindset:</strong> Designed PriorityPe with RICE scoring and PM memo recommendations.</li>
            </ul>
          </div>

          {/* Quick Resume Download Role Selector */}
          <div>
            <div className="text-xs font-mono text-[#8b93a1] uppercase mb-2">
              Download Tailored Resume By Target Role:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RESUME_ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    onSelectResume(role);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg text-left bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] hover:border-[#a66a12] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{role.icon}</span>
                    <span className="text-xs font-semibold text-[#101318] dark:text-white group-hover:text-[#a66a12] truncate">
                      {role.title}
                    </span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-[#8b93a1] group-hover:text-[#a66a12]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#dfe3e9] dark:border-[#262c36] bg-[#f6f7f9] dark:bg-[#0e1116] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs font-mono">
            <a
              href={PERSONAL_INFO.links.email}
              className="inline-flex items-center gap-1 text-[#a66a12] hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#5c6472] dark:text-[#8b93a1] hover:underline"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#101318] dark:bg-white text-white dark:text-[#101318] text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};
