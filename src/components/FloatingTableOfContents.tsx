import React, { useState, useEffect } from 'react';
import { List, X, ChevronRight, Bookmark, Eye, EyeOff } from 'lucide-react';
import { Language } from '../data/translations';

interface TOCSection {
  id: string;
  num: string;
  label: string;
}

interface FloatingTableOfContentsProps {
  language?: Language;
}

export const FloatingTableOfContents: React.FC<FloatingTableOfContentsProps> = ({ language = 'en' }) => {
  const [activeId, setActiveId] = useState<string>('hero');
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portfolio_toc_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const sections: TOCSection[] = [
    { id: 'top', num: '00', label: language === 'de' ? 'Start' : language === 'fr' ? 'Accueil' : language === 'hi' ? 'प्रारंभ' : 'Overview' },
    { id: 'about', num: '01', label: language === 'de' ? 'Über mich' : language === 'fr' ? 'Profil' : language === 'hi' ? 'परिचय' : 'About' },
    { id: 'capabilities', num: '02', label: language === 'de' ? 'Kompetenzen' : language === 'fr' ? 'Compétences' : language === 'hi' ? 'क्षमताएं' : 'Capabilities' },
    { id: 'work', num: '03', label: language === 'de' ? 'Projekte' : language === 'fr' ? 'Projets' : language === 'hi' ? 'परियोजनाएं' : 'Selected Work' },
    { id: 'demos', num: '04', label: language === 'de' ? 'Demos' : language === 'fr' ? 'Démos' : language === 'hi' ? 'डेमो' : 'Interactive Demos' },
    { id: 'thinking', num: '05', label: language === 'de' ? 'Denkweise' : language === 'fr' ? 'Méthodologie' : language === 'hi' ? 'कार्यप्रणाली' : 'How I Think' },
    { id: 'experience', num: '06', label: language === 'de' ? 'Erfahrung' : language === 'fr' ? 'Expérience' : language === 'hi' ? 'अनुभव' : 'Experience' },
    { id: 'skills', num: '07', label: language === 'de' ? 'Toolbox' : language === 'fr' ? 'Boîte à Outils' : language === 'hi' ? 'उपकरण' : 'Toolbox' },
    { id: 'academics', num: '08', label: language === 'de' ? 'Ausbildung' : language === 'fr' ? 'Formation' : language === 'hi' ? 'शिक्षा' : 'Academics' },
    { id: 'contact', num: '09', label: language === 'de' ? 'Kontakt' : language === 'fr' ? 'Contact' : language === 'hi' ? 'संपर्क' : 'Contact' },
  ];

  // Scroll listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

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

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If dismissed, render a small restore button in bottom-right
  if (isDismissed) {
    return (
      <button
        id="restore-toc-btn"
        onClick={handleRestore}
        title="Show Table of Contents"
        aria-label="Show Table of Contents"
        className="fixed right-4 bottom-20 z-40 hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 dark:bg-[#131823]/90 backdrop-blur-md border border-[#dfe3e9] dark:border-white/10 shadow-lg text-xs font-mono text-[#5c6472] dark:text-[#9ea7b4] hover:text-[#101318] dark:hover:text-white hover:border-[#a66a12] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
      >
        <List className="w-3.5 h-3.5 text-[#a66a12]" />
        <span>TOC</span>
      </button>
    );
  }

  return (
    <aside
      id="floating-table-of-contents"
      aria-label="Table of Contents"
      className="fixed right-3.5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col w-52 bg-white/90 dark:bg-[#131823]/90 backdrop-blur-md border border-[#dfe3e9] dark:border-white/10 rounded-2xl shadow-xl p-3.5 transition-all duration-300"
    >
      {/* Header with Title and Remove Button */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#dfe3e9] dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-[#a66a12]" />
          <span className="text-[11px] font-mono font-bold text-[#101318] dark:text-white uppercase tracking-wider">
            {language === 'de' ? 'INHALT' : language === 'fr' ? 'SOMMAIRE' : language === 'hi' ? 'अनुक्रमणिका' : 'CONTENTS'}
          </span>
        </div>

        <button
          id="remove-toc-btn"
          onClick={handleDismiss}
          title="Remove Table of Contents"
          aria-label="Remove Table of Contents"
          className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-[#8b93a1] hover:text-[#101318] dark:hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="space-y-1">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              id={`toc-nav-item-${section.id}`}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                isActive
                  ? 'bg-amber-500/10 dark:bg-amber-500/15 text-[#a66a12] dark:text-[#fbbf24] font-bold shadow-xs'
                  : 'text-[#5c6472] dark:text-[#9ea7b4] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className={`text-[10px] ${isActive ? 'text-[#a66a12] dark:text-[#fbbf24]' : 'text-[#8b93a1]'}`}>
                  {section.num}
                </span>
                <span className="truncate">{section.label}</span>
              </div>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#a66a12] dark:bg-[#fbbf24] flex-shrink-0 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Minimal Footer Info */}
      <div className="mt-3 pt-2 border-t border-[#dfe3e9] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8b93a1]">
        <span>Scroll synced</span>
        <button
          onClick={handleDismiss}
          className="hover:underline cursor-pointer text-[#a66a12] dark:text-[#d8a34f]"
        >
          Hide
        </button>
      </div>
    </aside>
  );
};
