import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Eye, EyeOff } from 'lucide-react';
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
import { GlobalBackground } from './components/GlobalBackground';
import { MotionAccessibilityToggle } from './components/MotionAccessibilityToggle';
import { DataStreamCounter } from './components/DataStreamCounter';
import { SectionAmbientAtmosphere } from './components/SectionAmbientAtmosphere';
import { useTilt3DCards } from './utils/useTilt3DCards';
import { useButtonSparkles } from './utils/useButtonSparkles';
import { useViewportHeadingReveal } from './utils/useViewportHeadingReveal';
import { ProjectCategory, ResumeRole, NeuralSettings } from './types';
import { generateResumePDF, generateFullPortfolioPDF } from './utils/pdfGenerator';
import { PERSONAL_INFO } from './data/portfolioData';
import { Language } from './data/translations';
import { FloatingTableOfContents } from './components/FloatingTableOfContents';

export default function App() {
  useTilt3DCards();
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

  // Section Visibility / Folding state for Floating Table of Contents
  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('portfolio_hidden_sections');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const handleToggleSection = (sectionId: string) => {
    setHiddenSections((prev) => {
      const updated = { ...prev, [sectionId]: !prev[sectionId] };
      try {
        localStorage.setItem('portfolio_hidden_sections', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleCollapseAll = () => {
    const collapsed = {
      about: true,
      capabilities: true,
      work: true,
      demos: true,
      thinking: true,
      experience: true,
      skills: true,
      academics: true,
    };
    setHiddenSections(collapsed);
    try {
      localStorage.setItem('portfolio_hidden_sections', JSON.stringify(collapsed));
    } catch {
      // ignore
    }
    showToast('All collapsible sections hidden', 'info');
  };

  const handleExpandAll = () => {
    setHiddenSections({});
    try {
      localStorage.removeItem('portfolio_hidden_sections');
    } catch {
      // ignore
    }
    showToast('All portfolio sections expanded', 'success');
  };

  const renderCollapsibleSection = (
    id: string,
    title: string,
    children: React.ReactNode
  ) => {
    const isHidden = !!hiddenSections[id];

    if (isHidden) {
      return (
        <div id={id} className="scroll-mt-24 max-w-[1160px] mx-auto px-5 sm:px-6 my-6 transition-all duration-300">
          <div className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-[#fecdd3] dark:border-white/10 bg-[#fff5f7]/80 dark:bg-white/[0.02] backdrop-blur-xs text-xs font-mono text-[#643644] dark:text-[#9ea7b4] shadow-xs">
            <div className="flex items-center gap-2.5">
              <EyeOff className="w-4 h-4 text-[#e11d48] dark:text-[#fbbf24]" />
              <span>Section hidden: <strong className="text-[#2d151c] dark:text-white">{title}</strong></span>
            </div>
            <button
              onClick={() => handleToggleSection(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 dark:bg-amber-500/20 text-[#e11d48] dark:text-[#fbbf24] hover:bg-rose-500/20 font-semibold cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Show Section</span>
            </button>
          </div>
        </div>
      );
    }

    return <>{children}</>;
  };

  // Accessibility: OS-level Reduced Motion Detection & Neural Motion Toggle
  const [systemPrefersReducedMotion, setSystemPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [motionEnabled, setMotionEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('neural-motion-preference');
      if (saved !== null) {
        return saved === 'enabled';
      }
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });

  useButtonSparkles(motionEnabled);
  useViewportHeadingReveal(motionEnabled);

  // Granular Visual Complexity Control: Neural Node Density (0.3 - 1.6)
  const [nodeDensity, setNodeDensity] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('neural-node-density');
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed >= 0.3 && parsed <= 1.6) return parsed;
      }
    }
    return 1.0;
  });

  const handleNodeDensityChange = (density: number) => {
    const clamped = Math.max(0.3, Math.min(1.6, Math.round(density * 10) / 10));
    setNodeDensity(clamped);
    if (typeof window !== 'undefined') {
      localStorage.setItem('neural-node-density', clamped.toString());
    }
  };

  // Dedicated Neural Network Tuning Settings (Connection Density, Pulse Frequency, Particle Speed, Sensitivity, Visibility, Interaction Strength, Preset Mode)
  const [neuralSettings, setNeuralSettings] = useState<NeuralSettings>(() => {
    if (typeof window !== 'undefined') {
      const savedPreset = localStorage.getItem('neural-preset-mode') as any;
      const savedConn = localStorage.getItem('neural-connection-density');
      const savedPulse = localStorage.getItem('neural-pulse-frequency');
      const savedSpeed = localStorage.getItem('neural-particle-speed');
      const savedSens = localStorage.getItem('neural-sensitivity');
      const savedVis = localStorage.getItem('neural-visibility');
      const savedInteract = localStorage.getItem('neural-interaction-strength');
      return {
        presetMode: (savedPreset && ['cosmic', 'topographic', 'constellation', 'quantum', 'zen'].includes(savedPreset)) ? savedPreset : 'cosmic',
        connectionDensity: savedConn ? Math.max(0.4, Math.min(2.0, parseFloat(savedConn) || 1.0)) : 1.0,
        pulseFrequency: savedPulse ? Math.max(0.3, Math.min(2.5, parseFloat(savedPulse) || 1.0)) : 1.0,
        particleSpeed: savedSpeed ? Math.max(0.3, Math.min(2.5, parseFloat(savedSpeed) || 1.0)) : 1.0,
        sensitivity: savedSens ? Math.max(0.6, Math.min(2.4, parseFloat(savedSens) || 1.4)) : 1.4,
        visibility: savedVis ? Math.max(0.6, Math.min(2.2, parseFloat(savedVis) || 1.2)) : 1.2,
        interactionStrength: savedInteract ? Math.max(0.5, Math.min(2.0, parseFloat(savedInteract) || 1.2)) : 1.2,
      };
    }
    return {
      presetMode: 'cosmic',
      connectionDensity: 1.0,
      pulseFrequency: 1.0,
      particleSpeed: 1.0,
      sensitivity: 1.4,
      visibility: 1.2,
      interactionStrength: 1.2,
    };
  });

  const handleUpdateNeuralSettings = (updates: Partial<NeuralSettings>) => {
    setNeuralSettings(prev => {
      const next = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        if (updates.presetMode !== undefined) {
          localStorage.setItem('neural-preset-mode', updates.presetMode);
        }
        if (updates.connectionDensity !== undefined) {
          localStorage.setItem('neural-connection-density', updates.connectionDensity.toString());
        }
        if (updates.pulseFrequency !== undefined) {
          localStorage.setItem('neural-pulse-frequency', updates.pulseFrequency.toString());
        }
        if (updates.particleSpeed !== undefined) {
          localStorage.setItem('neural-particle-speed', updates.particleSpeed.toString());
        }
        if (updates.sensitivity !== undefined) {
          localStorage.setItem('neural-sensitivity', updates.sensitivity.toString());
        }
        if (updates.visibility !== undefined) {
          localStorage.setItem('neural-visibility', updates.visibility.toString());
        }
        if (updates.interactionStrength !== undefined) {
          localStorage.setItem('neural-interaction-strength', updates.interactionStrength.toString());
        }
      }
      return next;
    });
  };

  const handleResetNeuralSettings = () => {
    const defaults: NeuralSettings = {
      presetMode: 'cosmic',
      connectionDensity: 1.0,
      pulseFrequency: 1.0,
      particleSpeed: 1.0,
      sensitivity: 1.4,
      visibility: 1.2,
      interactionStrength: 1.2,
    };
    setNeuralSettings(defaults);
    if (typeof window !== 'undefined') {
      localStorage.setItem('neural-preset-mode', 'cosmic');
      localStorage.setItem('neural-connection-density', '1.0');
      localStorage.setItem('neural-pulse-frequency', '1.0');
      localStorage.setItem('neural-particle-speed', '1.0');
      localStorage.setItem('neural-sensitivity', '1.4');
      localStorage.setItem('neural-visibility', '1.2');
      localStorage.setItem('neural-interaction-strength', '1.2');
    }
  };

  // Listen to OS prefers-reduced-motion media query changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setSystemPrefersReducedMotion(e.matches);
      // Auto-update if user hasn't stored a manual preference
      const saved = localStorage.getItem('neural-motion-preference');
      if (saved === null) {
        setMotionEnabled(!e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, []);

  // Update HTML data-reduce-motion attribute for system-wide CSS animation synchronization
  useEffect(() => {
    if (!motionEnabled) {
      document.documentElement.setAttribute('data-reduce-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduce-motion');
    }
  }, [motionEnabled]);

  const handleToggleMotion = () => {
    setMotionEnabled(prev => {
      const next = !prev;
      localStorage.setItem('neural-motion-preference', next ? 'enabled' : 'disabled');
      showToast(
        next 
          ? 'Neural canvas animations active' 
          : 'Neural animations paused (Reduced Motion)', 
        'info'
      );
      return next;
    });
  };

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

  const handleDownloadFullPortfolio = () => {
    try {
      generateFullPortfolioPDF();
      showToast('Master Portfolio Dossier (PDF) downloaded successfully!');
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.8 }
      });
    } catch (err) {
      showToast('Generating Master Portfolio PDF...', 'info');
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
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden font-sans antialiased selection:bg-[#a66a12]/20 selection:text-[#a66a12] transition-colors duration-500 ease-out" style={{ color: 'var(--text-primary)' }}>
      {/* Global Analytical Atmosphere Background System */}
      <GlobalBackground 
        motionEnabled={motionEnabled} 
        nodeDensity={nodeDensity}
        settings={neuralSettings}
        systemPrefersReducedMotion={systemPrefersReducedMotion}
      />

      <div id="top" />

      {/* Floating Table of Contents on Right Side */}
      <FloatingTableOfContents 
        language={language}
        hiddenSections={hiddenSections}
        onToggleSection={handleToggleSection}
        onCollapseAll={handleCollapseAll}
        onExpandAll={handleExpandAll}
      />

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

      <main className="relative z-10 w-full max-w-[100vw] overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenCommand={() => setCommandPaletteOpen(true)}
          onOpenRecruiter={() => setRecruiterModalOpen(true)}
        />

        {/* Recruiter Proof Points & Live Animated Metrics */}
        <ProofStrip language={language} />

        {/* 01 · Who I Am & Professional Profile */}
        {renderCollapsibleSection(
          'about',
          language === 'de' ? 'Über mich & Säulen' : language === 'fr' ? 'Profil & Piliers' : language === 'hi' ? 'परिचय व मुख्य स्तंभ' : 'About & Pillars',
          <AboutSection
            language={language}
            onOpenRecruiter={() => setRecruiterModalOpen(true)}
          />
        )}

        {/* 02 · What I Do (Capabilities Grid) */}
        {renderCollapsibleSection(
          'capabilities',
          language === 'de' ? 'Kernkompetenzen' : language === 'fr' ? 'Compétences Clés' : language === 'hi' ? 'मुख्य क्षमताएं' : 'Capabilities Grid',
          <CapabilitiesSection 
            language={language}
            onSelectCategory={setSelectedCategory} 
          />
        )}

        {/* 03 · Selected Work (Featured Case Studies & Filtering) */}
        {renderCollapsibleSection(
          'work',
          language === 'de' ? 'Ausgewählte Projekte' : language === 'fr' ? 'Projets Phares' : language === 'hi' ? 'चयनित परियोजनाएं' : 'Selected Projects',
          <ProjectsSection
            language={language}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenCaseStudy={(id) => setCaseStudyId(id)}
          />
        )}

        {/* 04 · Interactive Demos (RICE, Risk, SQL Runner, Pipeline, Cohort) */}
        {renderCollapsibleSection(
          'demos',
          language === 'de' ? 'Interaktive Demos' : language === 'fr' ? 'Démonstrateurs' : language === 'hi' ? 'इंटरैक्टिव डेमो' : 'Interactive Demos',
          <InteractiveDemos language={language} />
        )}

        {/* Recruiter Evaluation Engine · Instant Job Description (JD) Matcher */}
        <section className="section-ambient-container ambient-theme-violet my-16 overflow-hidden">
          <SectionAmbientAtmosphere />
          <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6">
            <JdMatcherSection
              onSelectResume={handleDownloadResume}
              onOpenCaseStudy={(id) => setCaseStudyId(id)}
            />
          </div>
        </section>

        {/* 05 · How I Think (8-step Analytical Decision Framework) */}
        {renderCollapsibleSection(
          'thinking',
          language === 'de' ? 'Analytische Methodik' : language === 'fr' ? 'Méthodologie' : language === 'hi' ? 'निर्णय कार्यप्रणाली' : 'How I Think (Methodology)',
          <ThinkingSection language={language} />
        )}

        {/* 06 · Enterprise Experience (Vodafone Intelligent Solutions VOIS) */}
        {renderCollapsibleSection(
          'experience',
          language === 'de' ? 'Unternehmenserfahrung' : language === 'fr' ? 'Expérience VOIS' : language === 'hi' ? 'व्यावसायिक अनुभव' : 'Enterprise VOIS Experience',
          <ExperienceSection language={language} />
        )}

        {/* 07 · Technical Toolbox & Verified Certifications */}
        {renderCollapsibleSection(
          'skills',
          language === 'de' ? 'Technologie-Toolbox' : language === 'fr' ? 'Boîte à Outils' : language === 'hi' ? 'तकनीकी उपकरण' : 'Toolbox & Certifications',
          <SkillsCertificationsSection language={language} />
        )}

        {/* 08 · Scholastic Foundation & Academic Credentials */}
        {renderCollapsibleSection(
          'academics',
          language === 'de' ? 'Akademischer Werdegang' : language === 'fr' ? 'Formation Académique' : language === 'hi' ? 'शैक्षणिक योग्यता' : 'Academics & Scholastic Foundation',
          <AcademicsSection language={language} />
        )}

        {/* 09 · Currently Exploring & Contact */}
        <ContactSection
          language={language}
          onCopyEmail={handleCopyEmail}
          onOpenRecruiter={() => setRecruiterModalOpen(true)}
          onDownloadFullPortfolio={handleDownloadFullPortfolio}
          motionEnabled={motionEnabled}
          onToggleMotion={handleToggleMotion}
          systemPrefersReducedMotion={systemPrefersReducedMotion}
        />
      </main>

      {/* Persistent Synaptic Data Throughput Stream HUD */}
      <DataStreamCounter
        motionEnabled={motionEnabled}
        nodeDensity={nodeDensity}
      />

      {/* Floating Accessibility Motion & 3D Atmosphere Presets Control Button */}
      <MotionAccessibilityToggle
        motionEnabled={motionEnabled}
        onToggle={handleToggleMotion}
        systemPrefersReducedMotion={systemPrefersReducedMotion}
        nodeDensity={nodeDensity}
        onNodeDensityChange={handleNodeDensityChange}
        presetMode={neuralSettings.presetMode || 'cosmic'}
        onPresetModeChange={(mode) => handleUpdateNeuralSettings({ presetMode: mode })}
        onEmitShockwave={() => {
          showToast('3D Kinetic Shockwave impulse emitted', 'info');
        }}
      />

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
        neuralSettings={neuralSettings}
        onUpdateNeuralSettings={handleUpdateNeuralSettings}
        onResetNeuralSettings={handleResetNeuralSettings}
        motionEnabled={motionEnabled}
        onToggleMotion={handleToggleMotion}
      />

      {/* Toast Notification Pill */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
