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
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] card-level-1 overflow-hidden flex flex-col !rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#fecdd3] dark:border-white/[0.08] flex items-start justify-between gap-4 bg-[#fff5f7] dark:bg-[#111622]/90">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-[#e11d48] dark:text-amber-300 border border-rose-500/20 mb-2">
              <Sparkles className="w-3 h-3 text-[#e11d48] dark:text-amber-300" /> 60-SECOND RECRUITER EXECUTIVE SUMMARY
            </div>
            <h2 id="recruiter-modal-title" className="font-display font-bold text-2xl sm:text-3xl text-[#2d151c] dark:text-white">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-xs font-mono text-[#e11d48] dark:text-[#fbbf24] mt-0.5 font-semibold">
              {PERSONAL_INFO.roleHeadline}
            </p>
          </div>

          <button
            id="close-recruiter-modal-btn"
            tabIndex={0}
            onClick={onClose}
            className="p-2 rounded-xl text-[#5e3240] dark:text-[#8b93a1] hover:text-[#2d151c] dark:hover:text-white hover:bg-rose-100/60 dark:hover:bg-white/5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 bg-[#fff5f7]/40 dark:bg-[#0e121b]">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="card-level-3 p-3 bg-white dark:bg-white/5 border border-[#fecdd3] dark:border-white/10">
              <div className="font-mono font-bold text-lg text-[#2d151c] dark:text-white">50K+</div>
              <div className="text-[10px] font-mono text-[#5e3240] dark:text-[#8b93a1] font-medium">Records Validated</div>
            </div>
            <div className="card-level-3 p-3 bg-white dark:bg-white/5 border border-[#fecdd3] dark:border-white/10">
              <div className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">-40%</div>
              <div className="text-[10px] font-mono text-[#5e3240] dark:text-[#8b93a1] font-medium">Reporting Turnaround</div>
            </div>
            <div className="card-level-3 p-3 bg-white dark:bg-white/5 border border-[#fecdd3] dark:border-white/10">
              <div className="font-mono font-bold text-lg text-rose-600 dark:text-indigo-400">-5%</div>
              <div className="text-[10px] font-mono text-[#5e3240] dark:text-[#8b93a1] font-medium">Customer Churn</div>
            </div>
            <div className="card-level-3 p-3 bg-white dark:bg-white/5 border border-[#fecdd3] dark:border-white/10">
              <div className="font-mono font-bold text-lg text-[#e11d48] dark:text-[#fbbf24]">8.18</div>
              <div className="text-[10px] font-mono text-[#5e3240] dark:text-[#8b93a1] font-medium">CGPA (ITER CSE)</div>
            </div>
          </div>

          {/* Quick Fit Summary */}
          <div className="card-level-2 p-4 space-y-2 text-xs text-[#5e3240] dark:text-[#9ea7b4] bg-white dark:bg-[#151920] border border-[#fecdd3] dark:border-white/10">
            <div className="font-mono font-bold text-xs text-[#2d151c] dark:text-white uppercase tracking-wider">
              Why Hire Suvam?
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed">
              <li><strong className="text-[#2d151c] dark:text-white font-bold">Proven Enterprise Delivery:</strong> Interned at Vodafone Intelligent Solutions (VOIS), built automated DAX/Power Query reporting, and supported KPI churn modeling.</li>
              <li><strong className="text-[#2d151c] dark:text-white font-bold">Deep Analytical Range:</strong> From SQL CTE data quality auditing and PySpark streaming ETL to customer RFM/CLV cohort segmentation.</li>
              <li><strong className="text-[#2d151c] dark:text-white font-bold">Product & Decision Mindset:</strong> Designed PriorityPe with RICE scoring and PM memo recommendations.</li>
            </ul>
          </div>

          {/* Quick Resume Download Role Selector */}
          <div>
            <div className="text-xs font-mono text-[#5e3240] dark:text-[#8b93a1] font-bold uppercase mb-2">
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
                  className="p-2.5 rounded-xl text-left bg-white dark:bg-white/5 border border-[#fecdd3] dark:border-white/10 hover:border-[#e11d48] dark:hover:border-white/30 hover:bg-[#fff5f7] dark:hover:bg-white/10 transition-colors flex items-center justify-between group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none shadow-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{role.icon}</span>
                    <span className="text-xs font-semibold text-[#2d151c] dark:text-white group-hover:text-[#e11d48] dark:group-hover:text-[#fbbf24] truncate">
                      {role.title}
                    </span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-[#5e3240] group-hover:text-[#e11d48] dark:group-hover:text-[#fbbf24]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#fecdd3] dark:border-white/[0.08] bg-[#fff5f7] dark:bg-[#111622]/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs font-mono">
            <a
              href={PERSONAL_INFO.links.email}
              className="inline-flex items-center gap-1 text-[#e11d48] dark:text-[#fbbf24] hover:underline font-bold focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none rounded"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#5e3240] dark:text-[#8b93a1] hover:text-[#e11d48] hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none rounded"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="btn-primary !px-4 !py-2 text-xs font-mono focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111622] focus-visible:outline-none"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};
