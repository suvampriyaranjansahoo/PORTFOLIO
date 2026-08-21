import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  ChevronDown, 
  Download, 
  Eye, 
  FileText, 
  Menu, 
  Moon, 
  Sun, 
  X, 
  Sparkles,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { RESUME_ROLES, PERSONAL_INFO } from '../data/portfolioData';
import { ResumeRole } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenRecruiter: () => void;
  onSelectResume: (role: ResumeRole) => void;
  onPreviewResume: (role: ResumeRole) => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  language,
  onSelectLanguage,
  onOpenRecruiter,
  onSelectResume,
  onPreviewResume,
  onShowToast
}) => {
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const resumeMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language].nav;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English (EN)', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी (HI)', flag: '🇮🇳' },
    { code: 'de', label: 'Deutsch (DE)', flag: '🇩🇪' },
    { code: 'fr', label: 'Français (FR)', flag: '🇫🇷' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Calculate immediately on mount
    handleScroll();

    const handleClickOutside = (e: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(e.target as Node)) {
        setResumeMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDownload = (role: ResumeRole, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onSelectResume(role);
    setResumeMenuOpen(false);
  };

  const handlePreview = (role: ResumeRole, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onPreviewResume(role);
    setResumeMenuOpen(false);
  };

  const handleLangChange = (code: Language) => {
    onSelectLanguage(code);
    setLangMenuOpen(false);
    onShowToast(`Language changed to ${code.toUpperCase()}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f6f7f9]/90 dark:bg-[#0e1116]/90 backdrop-blur-md border-b border-[#dfe3e9] dark:border-[#262c36] transition-colors duration-200">
      {/* Slim Fixed Progress Bar at the top of the header */}
      <div 
        id="scroll-progress-container"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-black/5 dark:bg-white/5 z-[60] pointer-events-none"
      >
        <div 
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-[#a66a12] via-amber-500 to-[#c88820] shadow-[0_0_8px_rgba(166,106,18,0.5)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <a 
          href="#top" 
          id="brand-logo-link"
          className="font-display font-bold text-sm sm:text-base lg:text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1 whitespace-nowrap text-[#101318] dark:text-white shrink-0 min-w-fit"
        >
          <span className="font-bold">{PERSONAL_INFO.name}</span>
          <span className="text-[#a66a12]">.</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm text-[#5c6472] dark:text-[#a0a8b5]" aria-label="Main Navigation">
          <a href="#about" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.about}</a>
          <a href="#work" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.work}</a>
          <a href="#demos" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.demos}</a>
          <a href="#experience" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.experience}</a>
          <a href="#skills" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.toolbox}</a>
          <a href="#academics" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.academics}</a>
          <a href="#coffee-telemetry" className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-semibold transition-colors">
            <span>☕</span>
            <span>Fuel</span>
          </a>
          <a href="#contact" className="hover:text-[#101318] dark:hover:text-white transition-colors">{t.contact}</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div className="relative" ref={langMenuRef}>
            <button
              id="language-switcher-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-white dark:bg-[#151920] border border-[#bfc5cf] dark:border-[#262c36] text-[#101318] dark:text-white hover:border-[#a66a12] transition-colors cursor-pointer shadow-2xs"
              title="Switch Portfolio Language"
              aria-label="Language selector"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#a66a12]" />
              <span className="uppercase font-bold">{language}</span>
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div 
                id="language-dropdown-menu"
                className="absolute right-0 top-full mt-2 w-[160px] bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="text-[10px] font-mono uppercase text-[#8b93a1] px-2 py-1 border-b border-[#dfe3e9] dark:border-[#262c36] mb-1">
                  Language / Sprache
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLangChange(l.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-left transition-colors cursor-pointer ${
                      language === l.code
                        ? 'bg-[#a66a12]/10 text-[#a66a12] font-semibold'
                        : 'text-[#101318] dark:text-white hover:bg-[#f6f7f9] dark:hover:bg-[#1f242c]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </div>
                    {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-[#a66a12]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recruiter Mode Button */}
          <button
            id="recruiter-mode-btn"
            onClick={onOpenRecruiter}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-[#101318] dark:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-900 dark:text-amber-300 transition-all cursor-pointer"
            title="Open quick 60-second summary for hiring managers"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#a66a12]" />
            <span>{t.recruiterMode}</span>
          </button>

          {/* Resume Dropdown */}
          <div className="relative" ref={resumeMenuRef}>
            <button
              id="resume-dropdown-btn"
              onClick={() => setResumeMenuOpen(!resumeMenuOpen)}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-white dark:bg-[#151920] border border-[#bfc5cf] dark:border-[#262c36] text-[#101318] dark:text-white shadow-xs hover:border-[#a66a12] transition-all cursor-pointer"
              aria-expanded={resumeMenuOpen}
              aria-haspopup="true"
            >
              <FileText className="w-3.5 h-3.5 text-[#a66a12]" />
              <span className="hidden xs:inline">{t.resume}</span>
              <span className="xs:hidden">CV</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${resumeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {resumeMenuOpen && (
              <div 
                id="resume-dropdown-menu"
                className="absolute right-0 top-full mt-2 w-[calc(100vw-32px)] max-w-[340px] bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between px-2 py-1.5 border-b border-[#dfe3e9] dark:border-[#262c36] mb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8b93a1]">
                    Tailored Resumes (5 Roles)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ATS-Ready
                  </span>
                </div>

                <div className="space-y-1">
                  {RESUME_ROLES.map((role) => (
                    <div 
                      key={role.id}
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-[#f6f7f9] dark:hover:bg-[#1f242c] transition-colors cursor-pointer"
                      onClick={() => handleDownload(role)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base">{role.icon}</span>
                        <div className="text-left truncate">
                          <div className="text-xs font-semibold text-[#101318] dark:text-white group-hover:text-[#a66a12] transition-colors">
                            {role.title}
                          </div>
                          <div className="text-[10px] font-mono text-[#5c6472] dark:text-[#8b93a1] truncate">
                            {role.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          id={`preview-resume-btn-${role.id}`}
                          onClick={(e) => handlePreview(role, e)}
                          title="Preview in browser"
                          className="p-1.5 rounded-md text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`download-resume-btn-${role.id}`}
                          onClick={(e) => handleDownload(role, e)}
                          title="Download PDF"
                          className="p-1.5 rounded-md text-[#a66a12] hover:bg-[#a66a12]/10"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-[#dfe3e9] dark:border-[#262c36] px-2 text-[10px] font-mono text-[#8b93a1] text-center">
                  Click any role for instant tailored PDF download
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-[#dfe3e9] dark:border-[#262c36] bg-white dark:bg-[#151920] text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-[#dfe3e9] dark:border-[#262c36] bg-white dark:bg-[#151920] text-[#101318] dark:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#dfe3e9] dark:border-[#262c36] bg-[#f6f7f9] dark:bg-[#0e1116] px-6 py-4 space-y-3 animate-in fade-in duration-150 max-w-full overflow-hidden">
          <nav className="flex flex-col gap-3 font-medium text-sm text-[#5c6472] dark:text-[#a0a8b5]">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.about}</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.work}</a>
            <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.demos}</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.experience}</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.toolbox}</a>
            <a href="#academics" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.academics}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#101318] dark:hover:text-white py-1">{t.contact}</a>
          </nav>

          <div className="pt-3 border-t border-[#dfe3e9] dark:border-[#262c36] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRecruiter();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono font-medium rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a66a12]" />
              <span>{t.recruiterMode}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
