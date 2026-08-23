import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { RESUME_ROLES, PERSONAL_INFO } from '../data/portfolioData';
import { ResumeRole } from '../types';

interface ResumePreviewModalProps {
  initialRole: ResumeRole | null;
  onClose: () => void;
  onDownload: (role: ResumeRole) => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  initialRole,
  onClose,
  onDownload
}) => {
  if (!initialRole) return null;

  const [selectedRole, setSelectedRole] = useState<ResumeRole>(initialRole);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] card-level-1 overflow-hidden flex flex-col !rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Role Switcher */}
        <div className="p-5 border-b border-[#fecdd3] dark:border-white/[0.08] bg-[#fff5f7] dark:bg-[#111622]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#e11d48] dark:text-[#8b93a1]">
              Resume Preview & ATS Verification
            </div>
            <div id="resume-preview-title" className="font-display font-bold text-xl text-[#2d151c] dark:text-white">
              {selectedRole.title} Resume
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-modal-download-btn"
              tabIndex={0}
              onClick={() => onDownload(selectedRole)}
              className="btn-primary !px-3.5 !py-2 text-xs font-mono focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111622] focus-visible:outline-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              id="close-resume-preview-btn"
              tabIndex={0}
              onClick={onClose}
              className="p-2 rounded-xl text-[#5e3240] dark:text-[#8b93a1] hover:text-[#2d151c] dark:hover:text-white hover:bg-rose-100/60 dark:hover:bg-white/5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="px-6 py-2 border-b border-[#fecdd3] dark:border-[#262c36] bg-[#fce4e8]/50 dark:bg-[#151920] flex items-center gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Resume Role Variants">
          {RESUME_ROLES.map((role) => (
            <button
              key={role.id}
              id={`resume-variant-${role.id}`}
              role="tab"
              aria-selected={selectedRole.id === role.id}
              tabIndex={0}
              onClick={() => setSelectedRole(role)}
              className={`filter-chip whitespace-nowrap flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none ${
                selectedRole.id === role.id ? 'filter-chip-active' : ''
              }`}
            >
              <span>{role.icon}</span>
              <span>{role.title}</span>
            </button>
          ))}
        </div>

        {/* Formatted Paper View */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#fff5f7] dark:bg-[#0a0c10] flex justify-center">
          <div className="w-full max-w-2xl bg-white text-[#2d151c] p-8 sm:p-10 rounded-xl shadow-lg border border-[#fecdd3] space-y-6 text-sm font-sans">
            {/* Header */}
            <div className="text-center space-y-1 border-b border-rose-200 pb-4">
              <h1 className="font-display font-bold text-2xl tracking-wide uppercase text-[#2d151c]">
                {PERSONAL_INFO.name}
              </h1>
              <p className="font-bold text-xs text-[#e11d48]">
                {selectedRole.title} | {selectedRole.subtitle}
              </p>
              <p className="text-[11px] text-[#5e3240] font-medium">
                {PERSONAL_INFO.location} • {PERSONAL_INFO.phone} • {PERSONAL_INFO.email}
              </p>
              <p className="text-[10px] text-[#885465] font-mono">
                LinkedIn: in/suvam-priyaranjan-sahoo-18b7412bb | GitHub: suvampriyaranjansahoo
              </p>
            </div>

            {/* Summary */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#2d151c] border-b border-[#fecdd3] pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs text-[#2d151c] leading-relaxed">
                {selectedRole.summary}
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#2d151c] border-b border-[#fecdd3] pb-1 mb-2">
                Technical & Core Skills
              </h2>
              <div className="space-y-1 text-xs">
                {selectedRole.focusSkills.map((s, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <strong className="text-[#2d151c] font-bold min-w-[170px] text-[11px]">{s.category}:</strong>
                    <span className="text-[#3b1d26] text-[11px]">{s.items}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#2d151c] border-b border-[#fecdd3] pb-1 mb-2">
                Experience
              </h2>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-[#2d151c]">
                  <span>Data Analyst Intern</span>
                  <span className="text-[#5e3240] font-normal">Sep 2025 – Oct 2025</span>
                </div>
                <div className="text-[11px] text-[#5e3240] italic font-medium">
                  Vodafone Intelligent Solutions (VOIS) — Remote
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-[#2d151c] pt-1 leading-relaxed">
                  <li>Cleaned and validated 50,000+ business records in SQL and Excel, improving reporting accuracy by 35%.</li>
                  <li>Automated Power BI and Excel reporting using DAX and Power Query, cutting manual turnaround by 40%.</li>
                  <li>Built churn-analysis KPI dashboards that surfaced retention signals, driving a 5% churn reduction.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#2d151c] border-b border-[#fecdd3] pb-1 mb-2">
                Selected Key Projects
              </h2>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-[#2d151c] leading-relaxed">
                {selectedRole.topBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#2d151c] border-b border-[#fecdd3] pb-1 mb-2">
                Education
              </h2>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#2d151c]">
                  <span>{PERSONAL_INFO.education.university}</span>
                  <span className="text-[#5e3240] font-normal">{PERSONAL_INFO.education.period}</span>
                </div>
                <p className="text-[11px] text-[#2d151c]">
                  {PERSONAL_INFO.education.degree} — CGPA: {PERSONAL_INFO.education.cgpa}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#2d151c]">
                  <span>{PERSONAL_INFO.education.higherSecondary.institution}, {PERSONAL_INFO.education.higherSecondary.location}</span>
                  <span className="text-[#5e3240] font-normal">{PERSONAL_INFO.education.higherSecondary.year}</span>
                </div>
                <p className="text-[11px] text-[#2d151c]">
                  {PERSONAL_INFO.education.higherSecondary.qualification} — Score: {PERSONAL_INFO.education.higherSecondary.score}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#2d151c]">
                  <span>{PERSONAL_INFO.education.secondary.institution}, {PERSONAL_INFO.education.secondary.location}</span>
                  <span className="text-[#5e3240] font-normal">{PERSONAL_INFO.education.secondary.year}</span>
                </div>
                <p className="text-[11px] text-[#2d151c]">
                  {PERSONAL_INFO.education.secondary.qualification} — Score: {PERSONAL_INFO.education.secondary.score}
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#2d151c] border-b border-[#fecdd3] pb-1 mb-1">
                Certifications
              </h2>
              <p className="text-[11px] text-[#2d151c] leading-relaxed">
                Oracle Agentic AI Foundations Associate (2026) · Databricks Fundamentals Accreditation · Introduction to Data Analytics — IBM (Coursera) · SQL — HackerRank · Data Visualization — VOIS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
