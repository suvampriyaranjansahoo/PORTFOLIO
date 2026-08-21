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
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Role Switcher */}
        <div className="p-5 border-b border-[#dfe3e9] dark:border-[#262c36] bg-[#f6f7f9] dark:bg-[#0e1116] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b93a1]">
              Resume Preview & ATS Verification
            </div>
            <div id="resume-preview-title" className="font-display font-bold text-xl text-[#101318] dark:text-white">
              {selectedRole.title} Resume
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-modal-download-btn"
              tabIndex={0}
              onClick={() => onDownload(selectedRole)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#a66a12] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              id="close-resume-preview-btn"
              tabIndex={0}
              onClick={onClose}
              className="p-2 rounded-lg text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="px-6 py-2 border-b border-[#dfe3e9] dark:border-[#262c36] bg-white dark:bg-[#151920] flex items-center gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Resume Role Variants">
          {RESUME_ROLES.map((role) => (
            <button
              key={role.id}
              id={`resume-variant-${role.id}`}
              role="tab"
              aria-selected={selectedRole.id === role.id}
              tabIndex={0}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedRole.id === role.id
                  ? 'bg-[#101318] dark:bg-white text-white dark:text-[#101318] font-semibold'
                  : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
              }`}
            >
              <span>{role.icon}</span>
              <span>{role.title}</span>
            </button>
          ))}
        </div>

        {/* Formatted Paper View */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#dfe3e9]/30 dark:bg-[#0a0c10] flex justify-center">
          <div className="w-full max-w-2xl bg-white text-[#101318] p-8 sm:p-10 rounded-xl shadow-md border border-[#dfe3e9] space-y-6 text-sm font-sans">
            {/* Header */}
            <div className="text-center space-y-1 border-b border-gray-300 pb-4">
              <h1 className="font-display font-bold text-2xl tracking-wide uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="font-semibold text-xs text-[#a66a12]">
                {selectedRole.title} | {selectedRole.subtitle}
              </p>
              <p className="text-[11px] text-gray-600">
                {PERSONAL_INFO.location} • {PERSONAL_INFO.phone} • {PERSONAL_INFO.email}
              </p>
              <p className="text-[10px] text-gray-500 font-mono">
                LinkedIn: in/suvam-priyaranjan-sahoo-18b7412bb | GitHub: suvampriyaranjansahoo
              </p>
            </div>

            {/* Summary */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">
                {selectedRole.summary}
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Technical & Core Skills
              </h2>
              <div className="space-y-1 text-xs">
                {selectedRole.focusSkills.map((s, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <strong className="text-gray-900 min-w-[170px] text-[11px]">{s.category}:</strong>
                    <span className="text-gray-700 text-[11px]">{s.items}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Experience
              </h2>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Data Analyst Intern</span>
                  <span className="text-gray-600 font-normal">Sep 2025 – Oct 2025</span>
                </div>
                <div className="text-[11px] text-gray-600 italic">
                  Vodafone Intelligent Solutions (VOIS) — Remote
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-gray-700 pt-1">
                  <li>Cleaned and validated 50,000+ business records in SQL and Excel, improving reporting accuracy by 35%.</li>
                  <li>Automated Power BI and Excel reporting using DAX and Power Query, cutting manual turnaround by 40%.</li>
                  <li>Built churn-analysis KPI dashboards that surfaced retention signals, driving a 5% churn reduction.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Selected Key Projects
              </h2>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-gray-700">
                {selectedRole.topBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>{PERSONAL_INFO.education.university}</span>
                  <span className="text-gray-600 font-normal">{PERSONAL_INFO.education.period}</span>
                </div>
                <p className="text-[11px] text-gray-700">
                  {PERSONAL_INFO.education.degree} — CGPA: {PERSONAL_INFO.education.cgpa}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>{PERSONAL_INFO.education.higherSecondary.institution}, {PERSONAL_INFO.education.higherSecondary.location}</span>
                  <span className="text-gray-600 font-normal">{PERSONAL_INFO.education.higherSecondary.year}</span>
                </div>
                <p className="text-[11px] text-gray-700">
                  {PERSONAL_INFO.education.higherSecondary.qualification} — Score: {PERSONAL_INFO.education.higherSecondary.score}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>{PERSONAL_INFO.education.secondary.institution}, {PERSONAL_INFO.education.secondary.location}</span>
                  <span className="text-gray-600 font-normal">{PERSONAL_INFO.education.secondary.year}</span>
                </div>
                <p className="text-[11px] text-gray-700">
                  {PERSONAL_INFO.education.secondary.qualification} — Score: {PERSONAL_INFO.education.secondary.score}
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-1">
                Certifications
              </h2>
              <p className="text-[11px] text-gray-700">
                Oracle Agentic AI Foundations Associate (2026) · Databricks Fundamentals Accreditation · Introduction to Data Analytics — IBM (Coursera) · SQL — HackerRank · Data Visualization — VOIS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
