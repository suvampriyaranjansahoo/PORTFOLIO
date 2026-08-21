import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveDemos } from './components/InteractiveDemos';
import { JdMatcherSection } from './components/JdMatcherSection';
import { ThinkingSection } from './components/ThinkingSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsCertificationsSection } from './components/SkillsCertificationsSection';
import { AcademicsSection } from './components/AcademicsSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { RecruiterModal } from './components/RecruiterModal';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { CommandPalette } from './components/CommandPalette';
import { Toast } from './components/Toast';
import { ProjectCategory, ResumeRole } from './types';
import { generateResumePDF } from './utils/pdfGenerator';
import { PERSONAL_INFO } from './data/portfolioData';
import { Language } from './data/translations';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [caseStudyId, setCaseStudyId] = useState<string | null>(null);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState<boolean>(false);
  const [resumePreviewRole, setResumePreviewRole] = useState<ResumeRole | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  // Handle Theme Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Keyboard shortcuts for Command Palette (⌘K / Ctrl+K) and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCaseStudyId(null);
        setRecruiterModalOpen(false);
        setResumePreviewRole(null);
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleDownloadResume = (role: ResumeRole) => {
    try {
      generateResumePDF(role);
      showToast(`${role.title} resume downloaded successfully`);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (err) {
      showToast(`Generating ${role.title} PDF resume...`, 'info');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      showToast(`Copied ${PERSONAL_INFO.email} to clipboard!`);
    } catch {
      showToast(PERSONAL_INFO.email, 'info');
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#f6f7f9] dark:bg-[#0e1116] text-[#101318] dark:text-[#f2f4f7] font-sans antialiased selection:bg-[#a66a12]/20 selection:text-[#a66a12] transition-colors duration-300 ease-in-out">
      <div id="top" />

      {/* Primary Sticky Header */}
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        language={language}
        onSelectLanguage={setLanguage}
        onOpenRecruiter={() => setRecruiterModalOpen(true)}
        onSelectResume={handleDownloadResume}
        onPreviewResume={(role) => setResumePreviewRole(role)}
        onShowToast={showToast}
      />

      <main className="w-full max-w-[100vw] overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenCommand={() => setCommandPaletteOpen(true)}
          onOpenRecruiter={() => setRecruiterModalOpen(true)}
        />

        {/* Recruiter Proof Points & Live Animated Metrics */}
        <ProofStrip language={language} />

        {/* 01 · Who I Am & Professional Profile */}
        <AboutSection
          language={language}
          onOpenRecruiter={() => setRecruiterModalOpen(true)}
        />

        {/* 02 · What I Do (Capabilities Grid) */}
        <CapabilitiesSection 
          language={language}
          onSelectCategory={setSelectedCategory} 
        />

        {/* 03 · Selected Work (Featured Case Studies & Filtering) */}
        <ProjectsSection
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenCaseStudy={(id) => setCaseStudyId(id)}
        />

        {/* 04 · Interactive Demos (RICE, Risk, SQL Runner, Pipeline, Cohort) */}
        <InteractiveDemos language={language} />

        {/* Recruiter Evaluation Engine · Instant Job Description (JD) Matcher */}
        <div className="max-w-[1160px] mx-auto px-5 sm:px-6 my-16">
          <JdMatcherSection
            onSelectResume={handleDownloadResume}
            onOpenCaseStudy={(id) => setCaseStudyId(id)}
          />
        </div>

        {/* 05 · How I Think (8-step Analytical Decision Framework) */}
        <ThinkingSection language={language} />

        {/* 06 · Enterprise Experience (Vodafone Intelligent Solutions VOIS) */}
        <ExperienceSection language={language} />

        {/* 07 · Technical Toolbox & Verified Certifications */}
        <SkillsCertificationsSection language={language} />

        {/* 08 · Scholastic Foundation & Academic Credentials */}
        <AcademicsSection language={language} />

        {/* 09 · Currently Exploring & Contact */}
        <ContactSection
          language={language}
          onCopyEmail={handleCopyEmail}
          onOpenRecruiter={() => setRecruiterModalOpen(true)}
        />
      </main>

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        caseStudyId={caseStudyId}
        onClose={() => setCaseStudyId(null)}
      />

      {/* 60-Second Recruiter Brief Modal */}
      <RecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
        onSelectResume={handleDownloadResume}
        onOpenCaseStudy={(id) => {
          setRecruiterModalOpen(false);
          setCaseStudyId(id);
        }}
      />

      {/* Tailored Resume Interactive Preview & ATS Check */}
      <ResumePreviewModal
        initialRole={resumePreviewRole}
        onClose={() => setResumePreviewRole(null)}
        onDownload={handleDownloadResume}
      />

      {/* Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectResume={handleDownloadResume}
        onOpenCaseStudy={(id) => setCaseStudyId(id)}
        onOpenRecruiter={() => setRecruiterModalOpen(true)}
      />

      {/* Toast Notification Pill */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
