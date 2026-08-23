import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  Bookmark, 
  Compass, 
  Eye, 
  EyeOff, 
  Search, 
  Maximize2, 
  Minimize2,
  Sparkles
} from 'lucide-react';
import { Language } from '../data/translations';

export interface TOCSection {
  id: string;
  targetId: string;
  num: string;
  label: string;
  shortLabel: string;
  keywords: string;
}

interface FloatingTableOfContentsProps {
  language?: Language;
  hiddenSections?: Record<string, boolean>;
  onToggleSection?: (sectionId: string) => void;
  onCollapseAll?: () => void;
  onExpandAll?: () => void;
}

export const FloatingTableOfContents: React.FC<FloatingTableOfContentsProps> = ({ 
  language = 'en',
  hiddenSections = {},
  onToggleSection,
  onCollapseAll,
  onExpandAll
}) => {
  const [activeId, setActiveId] = useState<string>('top');
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portfolio_toc_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  // Trigger smooth slide-in on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const sections: TOCSection[] = useMemo(() => [
    { 
      id: 'top', 
      targetId: 'hero',
      num: '00', 
      label: language === 'de' ? 'Übersicht & Profil' : language === 'fr' ? 'Vue d\'ensemble' : language === 'hi' ? 'प्रारंभ व अवलोकन' : 'Overview & Hero',
      shortLabel: 'Overview',
      keywords: 'hero profile header introduction suvam analyst summary metrics'
    },
    { 
      id: 'about', 
      targetId: 'about',
      num: '01', 
      label: language === 'de' ? 'Über mich & Säulen' : language === 'fr' ? 'Profil & Piliers' : language === 'hi' ? 'परिचय व मुख्य स्तंभ' : 'About & Pillars',
      shortLabel: 'About',
      keywords: 'about profile background pillars philosophy value proposition'
    },
    { 
      id: 'capabilities', 
      targetId: 'capabilities',
      num: '02', 
      label: language === 'de' ? 'Kernkompetenzen' : language === 'fr' ? 'Compétences Clés' : language === 'hi' ? 'मुख्य क्षमताएं' : 'Capabilities Grid',
      shortLabel: 'Capabilities',
      keywords: 'capabilities analyze product engineer build sql python spark machine learning'
    },
    { 
      id: 'work', 
      targetId: 'work',
      num: '03', 
      label: language === 'de' ? 'Ausgewählte Projekte' : language === 'fr' ? 'Projets Phares' : language === 'hi' ? 'चयनित परियोजनाएं' : 'Selected Projects',
      shortLabel: 'Projects',
      keywords: 'projects work case studies churn prioritype mediflow cardio financial analytics'
    },
    { 
      id: 'demos', 
      targetId: 'demos',
      num: '04', 
      label: language === 'de' ? 'Interaktive Demos' : language === 'fr' ? 'Démonstrateurs' : language === 'hi' ? 'इंटरैक्टिव डेमो' : 'Interactive Demos',
      shortLabel: 'Demos',
      keywords: 'demos interactive sql runner rice matrix risk constellation pipeline cohort'
    },
    { 
      id: 'thinking', 
      targetId: 'thinking',
      num: '05', 
      label: language === 'de' ? 'Analytische Methodik' : language === 'fr' ? 'Méthodologie' : language === 'hi' ? 'निर्णय कार्यप्रणाली' : 'How I Think',
      shortLabel: 'Methodology',
      keywords: 'thinking framework methodology 8-step decision process hypothesis testing root cause'
    },
    { 
      id: 'experience', 
      targetId: 'experience',
      num: '06', 
      label: language === 'de' ? 'Unternehmenserfahrung' : language === 'fr' ? 'Expérience VOIS' : language === 'hi' ? 'व्यावसायिक अनुभव' : 'Enterprise VOIS',
      shortLabel: 'Experience',
      keywords: 'experience enterprise vois vodafone timeline milestone dax churn accuracy'
    },
    { 
      id: 'skills', 
      targetId: 'skills',
      num: '07', 
      label: language === 'de' ? 'Technologie-Toolbox' : language === 'fr' ? 'Boîte à Outils' : language === 'hi' ? 'तकनीकी उपकरण' : 'Toolbox & Certs',
      shortLabel: 'Toolbox',
      keywords: 'skills toolbox certifications sql python power bi databricks azure aws snowflake'
    },
    { 
      id: 'academics', 
      targetId: 'academics',
      num: '08', 
      label: language === 'de' ? 'Akademischer Werdegang' : language === 'fr' ? 'Formation Académique' : language === 'hi' ? 'शैक्षणिक योग्यता' : 'Academics',
      shortLabel: 'Academics',
      keywords: 'academics education degree b.tech computer science bput coursework honors'
    },
    { 
      id: 'contact', 
      targetId: 'contact',
      num: '09', 
      label: language === 'de' ? 'Kontakt & Dossier' : language === 'fr' ? 'Contact & Dossier' : language === 'hi' ? 'संपर्क व डोजियर' : 'Contact & PDF',
      shortLabel: 'Contact',
      keywords: 'contact email connect linkedin resume download pdf full portfolio dossier'
    },
  ], [language]);

  // Enhanced scroll listener with bottom bounds detection & percentage
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // Overall page scroll percentage calculation
    const maxScroll = docHeight - windowHeight;
    const currentPercent = maxScroll > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / maxScroll) * 100))) : 0;
    setScrollPercentage(currentPercent);

    // Bottom of page bounds collision check (scrolled near bottom edge)
    const distFromBottom = docHeight - (scrollY + windowHeight);
    setIsNearBottom(distFromBottom < 140);

    // Bottom of page special check: If near bottom, activate contact
    if (distFromBottom < 80) {
      setActiveId('contact');
      return;
    }

    // Focal point in viewport for triggering (around 25% to 35% from the top of the viewport)
    const focalPointY = scrollY + Math.min(windowHeight * 0.32, 280);

    let currentSectionId = 'top';

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      // If section is hidden, skip activating it unless it's top/contact
      if (hiddenSections[sec.id] && sec.id !== 'top' && sec.id !== 'contact') {
        continue;
      }

      const targetElement = document.getElementById(sec.targetId) || document.getElementById(sec.id);
      
      if (targetElement) {
        const top = targetElement.offsetTop;
        if (top <= focalPointY) {
          currentSectionId = sec.id;
        }
      }
    }

    setActiveId(currentSectionId);
  }, [sections, hiddenSections]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('portfolio_toc_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const handleRestore = () => {
    setIsDismissed(false);
    try {
      localStorage.setItem('portfolio_toc_dismissed', 'false');
    } catch {
      // ignore
    }
  };

  const scrollToSection = (section: TOCSection) => {
    // If the section is currently hidden, unhide it first!
    if (hiddenSections[section.id] && onToggleSection) {
      onToggleSection(section.id);
    }

    if (section.id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Allow slight timeout if section was just expanded
    setTimeout(() => {
      const element = document.getElementById(section.targetId) || document.getElementById(section.id);
      if (element) {
        const navOffset = 75; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, hiddenSections[section.id] ? 50 : 0);
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase().trim();
    return sections.filter(sec => 
      sec.label.toLowerCase().includes(q) ||
      sec.shortLabel.toLowerCase().includes(q) ||
      sec.num.includes(q) ||
      sec.keywords.toLowerCase().includes(q)
    );
  }, [sections, searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSections.length > 0) {
      e.preventDefault();
      scrollToSection(filteredSections[0]);
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  const activeSection = sections.find(s => s.id === activeId) || sections[0];
  const allCollapsed = sections.every(sec => sec.id === 'top' || sec.id === 'contact' || hiddenSections[sec.id]);
  const hiddenCount = Object.values(hiddenSections).filter(Boolean).length;

  // If dismissed, render an elegant, minimal restore trigger in the bottom-right corner
  if (isDismissed) {
    return (
      <button
        id="restore-toc-btn"
        onClick={handleRestore}
        title="Show Table of Contents"
        aria-label="Show Table of Contents"
        className="fixed right-4 bottom-20 z-40 hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-[#131823]/95 backdrop-blur-md border border-[#fecdd3] dark:border-white/10 shadow-xl text-xs font-mono text-[#5e3240] dark:text-[#9ea7b4] hover:text-[#2d151c] dark:hover:text-white hover:border-[#e11d48] dark:hover:border-[#fbbf24] transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none"
      >
        <Compass className="w-3.5 h-3.5 text-[#e11d48] dark:text-[#fbbf24] group-hover:rotate-45 transition-transform" />
        <span className="font-semibold">{language === 'de' ? 'Inhalt' : language === 'fr' ? 'Sommaire' : language === 'hi' ? 'सूची' : 'Contents'}</span>
        <span className="px-1.5 py-0.2 rounded bg-rose-500/15 text-[#e11d48] dark:text-[#fbbf24] font-bold text-[10px]">
          {activeSection.num}
        </span>
      </button>
    );
  }

  return (
    <aside
      id="floating-table-of-contents"
      aria-label="Floating Table of Contents"
      className={`fixed right-3.5 z-40 hidden xl:flex flex-col w-64 bg-white/95 dark:bg-[#131823]/95 backdrop-blur-md border border-[#fecdd3] dark:border-white/10 rounded-2xl shadow-2xl p-3.5 ring-1 ring-rose-500/5 dark:ring-white/[0.05] max-h-[calc(100vh-130px)] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        isMounted ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'
      } ${
        isNearBottom 
          ? 'bottom-16 top-auto translate-y-0' 
          : 'top-1/2 -translate-y-1/2'
      }`}
    >
      {/* Header with Title, Progress Bar & Remove Button */}
      <div className="pb-2.5 mb-2 border-b border-[#fecdd3] dark:border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-[#e11d48] dark:text-[#fbbf24]" />
            <span className="text-[11px] font-mono font-bold text-[#2d151c] dark:text-white uppercase tracking-wider">
              {language === 'de' ? 'INHALTSVERZEICHNIS' : language === 'fr' ? 'TABLE DES MATIÈRES' : language === 'hi' ? 'अनुक्रमणिका' : 'TABLE OF CONTENTS'}
            </span>
          </div>

          <button
            id="remove-toc-btn"
            onClick={handleDismiss}
            title={language === 'de' ? 'Inhaltsverzeichnis ausblenden' : language === 'fr' ? 'Masquer le sommaire' : language === 'hi' ? 'हटाएं' : 'Hide Table of Contents'}
            aria-label="Hide Table of Contents"
            className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-white/10 text-[#885465] hover:text-[#2d151c] dark:hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Global Reading / Scroll Depth Progress Bar */}
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-[9.5px] font-mono text-[#885465]">
            <span className="truncate">Current: <strong className="text-[#e11d48] dark:text-[#fbbf24]">{activeSection.shortLabel}</strong></span>
            <span>{scrollPercentage}%</span>
          </div>
          <div className="w-full h-1 bg-[#fce4e8] dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#e11d48] to-[#f43f5e] dark:from-[#fbbf24] dark:to-[#f59e0b] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${scrollPercentage}%` }}
            />
          </div>
        </div>

        {/* Quick-Filter Search Field */}
        <div className="relative mt-2.5">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#885465]">
            <Search className="w-3 h-3" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={language === 'de' ? 'Abschnitt suchen...' : language === 'fr' ? 'Filtrer les sections...' : language === 'hi' ? 'खोजें...' : 'Search sections...'}
            className="w-full pl-7 pr-7 py-1 text-[11px] font-mono rounded-lg bg-[#fff5f7] dark:bg-[#0e1116] border border-[#fecdd3] dark:border-white/10 text-[#2d151c] dark:text-white placeholder-[#885465] focus:outline-none focus:border-[#e11d48] dark:focus:border-[#fbbf24] focus:ring-1 focus:ring-[#e11d48] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-[#885465] hover:text-[#2d151c] dark:hover:text-white cursor-pointer"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Expand All & Collapse All Controls */}
        <div className="flex items-center justify-between mt-2 pt-1 text-[10px] font-mono text-[#885465]">
          <div className="flex items-center gap-1">
            <button
              id="toc-expand-all-btn"
              onClick={onExpandAll}
              title="Expand all portfolio sections"
              className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-rose-50 dark:hover:bg-white/10 hover:text-[#2d151c] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Maximize2 className="w-2.5 h-2.5 text-[#e11d48] dark:text-[#fbbf24]" />
              <span>Expand All</span>
            </button>
            <span className="opacity-30">|</span>
            <button
              id="toc-collapse-all-btn"
              onClick={onCollapseAll}
              title="Collapse/hide all toggleable sections"
              className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-rose-50 dark:hover:bg-white/10 hover:text-[#2d151c] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Minimize2 className="w-2.5 h-2.5 text-[#885465]" />
              <span>Collapse All</span>
            </button>
          </div>
          {hiddenCount > 0 && (
            <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/10 text-[#e11d48] dark:text-[#fbbf24]">
              {hiddenCount} hidden
            </span>
          )}
        </div>
      </div>

      {/* Navigation items with Visual Highlighting, Hover Scale, and Eye Toggle Buttons */}
      <nav 
        className="space-y-1 overflow-y-auto max-h-[calc(100vh-310px)] pr-0.5 scrollbar-thin scrollbar-thumb-[#fecdd3] dark:scrollbar-thumb-white/10" 
        aria-label="Page Sections Navigation"
      >
        {filteredSections.length === 0 ? (
          <div className="py-4 text-center text-xs font-mono text-[#885465]">
            <p>No section matches "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-1.5 text-[10px] text-[#e11d48] dark:text-[#fbbf24] hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        ) : (
          filteredSections.map((section) => {
            const isActive = activeId === section.id;
            const isHidden = !!hiddenSections[section.id];
            const canToggle = section.id !== 'top' && section.id !== 'contact';

            return (
              <div
                key={section.id}
                id={`toc-nav-item-${section.id}`}
                className={`group relative w-full flex items-center justify-between rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500/15 via-rose-500/10 to-transparent dark:from-amber-500/25 dark:via-amber-500/15 text-[#2d151c] dark:text-white font-bold border-l-[3px] border-l-[#e11d48] dark:border-l-[#fbbf24] shadow-xs scale-[1.02] hover:scale-[1.03]'
                    : isHidden
                    ? 'opacity-60 text-[#885465] hover:opacity-100 hover:bg-rose-50/50 dark:hover:bg-white/5 border-l-[3px] border-l-transparent'
                    : 'text-[#5e3240] dark:text-[#9ea7b4] hover:text-[#2d151c] dark:hover:text-white hover:bg-rose-50/70 dark:hover:bg-white/5 hover:translate-x-0.5 border-l-[3px] border-l-transparent'
                }`}
              >
                {/* Main Link click target (scrolls & reveals if hidden) */}
                <button
                  onClick={() => scrollToSection(section)}
                  aria-current={isActive ? 'true' : undefined}
                  className="flex-1 text-left px-2.5 py-1.5 flex items-center gap-2 min-w-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none rounded-l-xl"
                  title={isHidden ? `Click to reveal and jump to ${section.label}` : `Jump to ${section.label}`}
                >
                  {/* Step number badge */}
                  <span className={`text-[10px] font-mono px-1 py-0.5 rounded shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-[#e11d48] dark:bg-[#fbbf24] text-white dark:text-[#101318] font-bold shadow-xs' 
                      : isHidden
                      ? 'bg-[#fce4e8] dark:bg-white/5 text-[#885465]'
                      : 'text-[#885465] group-hover:text-[#2d151c] dark:group-hover:text-white'
                  }`}>
                    {section.num}
                  </span>

                  {/* Section title label */}
                  <span className={`truncate text-xs ${
                    isActive 
                      ? 'font-bold text-[#2d151c] dark:text-white' 
                      : isHidden
                      ? 'line-through text-[#885465]'
                      : 'font-normal'
                  }`}>
                    {section.label}
                  </span>
                </button>

                {/* Right controls: Eye Visibility Toggle + Active Radar Beacon */}
                <div className="flex items-center gap-1 pr-2 shrink-0">
                  {/* Eye Toggle Button */}
                  {canToggle && onToggleSection && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSection(section.id);
                      }}
                      title={isHidden ? `Show section "${section.shortLabel}"` : `Hide section "${section.shortLabel}"`}
                      aria-label={isHidden ? `Show section ${section.shortLabel}` : `Hide section ${section.shortLabel}`}
                      className={`p-1 rounded-md transition-colors cursor-pointer ${
                        isHidden 
                          ? 'text-rose-700/80 dark:text-amber-400/80 hover:bg-rose-500/20' 
                          : 'text-[#885465] opacity-40 group-hover:opacity-100 hover:text-[#2d151c] dark:hover:text-white hover:bg-rose-100/50 dark:hover:bg-white/10'
                      }`}
                    >
                      {isHidden ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}

                  {/* Active visual indicator: Pulsing Radar Beacon */}
                  {isActive && !isHidden && (
                    <span className="relative flex h-2 w-2 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e11d48] dark:bg-[#fbbf24]"></span>
                    </span>
                  )}

                  {!isActive && !isHidden && (
                    <ChevronRight className="w-3 h-3 text-[#885465] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </nav>

      {/* Minimal Footer Info & Hide Shortcut */}
      <div className="mt-2.5 pt-2 border-t border-[#fecdd3] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#885465] shrink-0">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Viewport sync
        </span>
        <button
          onClick={handleDismiss}
          className="hover:underline cursor-pointer text-[#e11d48] dark:text-[#fbbf24] font-medium"
        >
          {language === 'de' ? 'Ausblenden' : language === 'fr' ? 'Masquer' : language === 'hi' ? 'छुपाएं' : 'Dismiss'}
        </button>
      </div>
    </aside>
  );
};
