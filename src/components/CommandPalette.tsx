import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, ArrowRight, ExternalLink, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';
import { RESUME_ROLES, PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { ResumeRole } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResume: (role: ResumeRole) => void;
  onOpenCaseStudy: (id: string) => void;
  onOpenRecruiter: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectResume,
  onOpenCaseStudy,
  onOpenRecruiter
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const items = [
    {
      id: 'recruiter',
      title: 'Open Recruiter Mode',
      subtitle: '60-second executive summary for hiring managers',
      category: 'Overview',
      icon: <Sparkles className="w-4 h-4 text-[#a66a12]" />,
      action: () => {
        onOpenRecruiter();
        onClose();
      }
    },
    ...RESUME_ROLES.map((role) => ({
      id: `resume-${role.id}`,
      title: `Download ${role.title} Resume (PDF)`,
      subtitle: role.subtitle,
      category: 'Tailored Resumes',
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onSelectResume(role);
        onClose();
      }
    })),
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: proj.question,
      category: 'Projects',
      icon: <BookOpen className="w-4 h-4 text-indigo-500" />,
      action: () => {
        if (proj.caseStudyId) {
          onOpenCaseStudy(proj.caseStudyId);
        } else {
          window.open(proj.githubUrl, '_blank');
        }
        onClose();
      }
    })),
    {
      id: 'demos-d3',
      title: 'Portfolio Traffic & Funnel D3.js Visualizer',
      subtitle: 'Native D3 time scales, SVG area gradients & live stream simulation',
      category: 'Analytics Demos',
      icon: <Layers className="w-4 h-4 text-[#a66a12]" />,
      action: () => {
        const el = document.getElementById('demos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'demos-sql',
      title: 'SQL Query Runner & CTE Sandbox',
      subtitle: 'Execute live SQL queries on churn & transaction schemas',
      category: 'Technical Demos',
      icon: <Terminal className="w-4 h-4 text-indigo-500" />,
      action: () => {
        const el = document.getElementById('demos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'demos-pipeline',
      title: 'Data Pipeline Architecture Inspector',
      subtitle: 'Explore Azure Streaming & Synapse latency SLAs',
      category: 'Technical Demos',
      icon: <Layers className="w-4 h-4 text-blue-500" />,
      action: () => {
        const el = document.getElementById('demos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'demos-cohort',
      title: 'Cohort Retention Matrix & Heatmap',
      subtitle: 'Inspect Month 0 to Month 6+ customer retention dynamics',
      category: 'Analytics Demos',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        const el = document.getElementById('demos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'demos-rice',
      title: 'RICE Explorer Interactive Sandbox',
      subtitle: 'Simulate UPI complaint prioritization live',
      category: 'Product Demos',
      icon: <Layers className="w-4 h-4 text-amber-500" />,
      action: () => {
        const el = document.getElementById('demos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'academics-section',
      title: 'Academics & Quantitative Credentials',
      subtitle: 'B.Tech CSE (8.18 CGPA), 12th PCM (93.85%), 10th (90.67%)',
      category: 'Education & Credentials',
      icon: <Layers className="w-4 h-4 text-[#a66a12]" />,
      action: () => {
        const el = document.getElementById('academics');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      subtitle: 'github.com/suvampriyaranjansahoo',
      category: 'Links',
      icon: <ExternalLink className="w-4 h-4 text-gray-500" />,
      action: () => {
        window.open(PERSONAL_INFO.links.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/suvam-priyaranjan-sahoo',
      category: 'Links',
      icon: <ExternalLink className="w-4 h-4 text-blue-500" />,
      action: () => {
        window.open(PERSONAL_INFO.links.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl card-level-1 overflow-hidden animate-in zoom-in-95 duration-150 !rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 p-4 border-b border-[#dfe3e9] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-[#111622]/90">
          <Search className="w-5 h-5 text-[#8b93a1]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, tailored resumes, interactive demos, or profiles..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-0 outline-none text-sm text-[#101318] dark:text-white placeholder-[#8b93a1] font-sans"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#30363d] rounded text-[#8b93a1]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-[#8b93a1]">
              No matching commands or files found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      item.action();
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 px-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none ${
                    isSelected
                      ? 'bg-[#101318] text-white dark:bg-white dark:text-[#101318]'
                      : 'hover:bg-[#f6f7f9] dark:hover:bg-[#1f242c] text-[#101318] dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10 dark:bg-black/10' : 'bg-[#f6f7f9] dark:bg-[#0e1116]'}`}>
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{item.title}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-[#8b93a1]'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded flex-shrink-0 ${
                    isSelected ? 'bg-white/20 dark:bg-black/10 text-white dark:text-[#101318]' : 'bg-[#f6f7f9] dark:bg-[#0e1116] text-[#8b93a1]'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 px-4 border-t border-[#dfe3e9] dark:border-[#262c36] bg-[#f6f7f9] dark:bg-[#0e1116] flex items-center justify-between text-[10px] font-mono text-[#8b93a1]">
          <span>↑↓ Navigate · ↵ Select · Esc Close</span>
          <span>Suvam Priyaranjan Sahoo</span>
        </div>
      </div>
    </div>
  );
};
