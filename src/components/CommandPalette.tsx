import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Sparkles, BookOpen, Layers, Terminal, ExternalLink, Sliders, Activity, Zap, Compass, RotateCcw, Check, Wind } from 'lucide-react';
import { RESUME_ROLES, PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { ResumeRole, NeuralSettings } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResume: (role: ResumeRole) => void;
  onOpenCaseStudy: (id: string) => void;
  onOpenRecruiter: () => void;
  neuralSettings?: NeuralSettings;
  onUpdateNeuralSettings?: (settings: Partial<NeuralSettings>) => void;
  onResetNeuralSettings?: () => void;
  motionEnabled?: boolean;
  onToggleMotion?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectResume,
  onOpenCaseStudy,
  onOpenRecruiter,
  neuralSettings = { 
    connectionDensity: 1.0, 
    pulseFrequency: 1.0, 
    particleSpeed: 1.0,
    sensitivity: 1.4,
    visibility: 1.2,
    interactionStrength: 1.2
  },
  onUpdateNeuralSettings,
  onResetNeuralSettings,
  motionEnabled = true,
  onToggleMotion
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'neural'>('search');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [highlightedSetting, setHighlightedSetting] = useState<'density' | 'frequency' | 'speed' | 'sensitivity' | 'visibility' | 'interaction' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveSensitivity = neuralSettings.sensitivity ?? 1.4;
  const effectiveVisibility = neuralSettings.visibility ?? 1.2;
  const effectiveInteractionStrength = neuralSettings.interactionStrength ?? 1.2;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      setHighlightedSetting(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const items = [
    {
      id: 'neural-panel-main',
      title: 'Neural Background Control Panel',
      subtitle: 'Tune sensitivity, visibility, interaction strength, synaptic density, and pulse speeds live',
      category: 'Neural Atmosphere',
      icon: <Sliders className="w-4 h-4 text-[#a66a12]" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting(null);
      }
    },
    {
      id: 'neural-sensitivity-quick',
      title: 'Adjust Neural Sensitivity',
      subtitle: `Current: ${effectiveSensitivity.toFixed(1)}x — Multi-zone outer detection, active radius & pointer awareness`,
      category: 'Neural Atmosphere',
      icon: <Compass className="w-4 h-4 text-cyan-500" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting('sensitivity');
      }
    },
    {
      id: 'neural-visibility-quick',
      title: 'Adjust Neural Visibility & Opacity',
      subtitle: `Current: ${effectiveVisibility.toFixed(1)}x — Control node contrast, connection brightness & background presence`,
      category: 'Neural Atmosphere',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting('visibility');
      }
    },
    {
      id: 'neural-strength-quick',
      title: 'Adjust Interaction Strength',
      subtitle: `Current: ${effectiveInteractionStrength.toFixed(1)}x — Calibrate cursor attraction, velocity drag & kinetic deflection`,
      category: 'Neural Atmosphere',
      icon: <Activity className="w-4 h-4 text-indigo-500" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting('interaction');
      }
    },
    {
      id: 'neural-density-quick',
      title: 'Adjust Connection Density',
      subtitle: `Current: ${neuralSettings.connectionDensity.toFixed(1)}x — Control synaptic connection radius and cluster density`,
      category: 'Neural Atmosphere',
      icon: <Activity className="w-4 h-4 text-cyan-500" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting('density');
      }
    },
    {
      id: 'neural-pulse-quick',
      title: 'Adjust Pulse Frequency',
      subtitle: `Current: ${neuralSettings.pulseFrequency.toFixed(1)}x — Accelerate or calm luminous data packet throughput`,
      category: 'Neural Atmosphere',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting('frequency');
      }
    },
    {
      id: 'neural-speed-quick',
      title: 'Adjust Particle Speed & Ripple Dynamics',
      subtitle: `Current: ${neuralSettings.particleSpeed.toFixed(1)}x — Modify nodal kinetic drift and acoustic wave velocity`,
      category: 'Neural Atmosphere',
      icon: <Wind className="w-4 h-4 text-indigo-500" />,
      action: () => {
        setActiveTab('neural');
        setHighlightedSetting('speed');
      }
    },
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
    if (activeTab === 'search') {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setActiveTab('neural');
      } else if (e.key === 'Escape') {
        onClose();
      }
    } else {
      if (e.key === 'Tab' || e.key === 'Escape') {
        e.preventDefault();
        if (e.key === 'Escape') {
          onClose();
        } else {
          setActiveTab('search');
        }
      }
    }
  };

  const presets = [
    {
      name: 'Zen Calm',
      desc: 'Subtle synaptic mesh, relaxed data flow',
      values: { connectionDensity: 0.7, pulseFrequency: 0.5, particleSpeed: 0.5, sensitivity: 0.9, visibility: 0.8, interactionStrength: 0.8 },
      icon: '🧘'
    },
    {
      name: 'Balanced',
      desc: 'Default organic neural network harmony',
      values: { connectionDensity: 1.0, pulseFrequency: 1.0, particleSpeed: 1.0, sensitivity: 1.2, visibility: 1.0, interactionStrength: 1.0 },
      icon: '⚖️'
    },
    {
      name: 'High Synapse',
      desc: 'Denser web, brisk packet traffic & active wake',
      values: { connectionDensity: 1.4, pulseFrequency: 1.7, particleSpeed: 1.3, sensitivity: 1.5, visibility: 1.3, interactionStrength: 1.4 },
      icon: '⚡'
    },
    {
      name: 'Quantum Matrix',
      desc: 'Ultra sensitivity, high visibility & energetic response',
      values: { connectionDensity: 1.7, pulseFrequency: 2.2, particleSpeed: 1.6, sensitivity: 1.8, visibility: 1.6, interactionStrength: 1.7 },
      icon: '🌌'
    },
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    if (onUpdateNeuralSettings) {
      onUpdateNeuralSettings(preset.values);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl card-level-1 overflow-hidden animate-in zoom-in-95 duration-150 !rounded-2xl shadow-2xl border border-[#dfe3e9] dark:border-white/[0.12]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-[#dfe3e9] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-[#111622]/90">
          <div className="flex items-center gap-1.5 p-1 bg-[#ebeff5] dark:bg-[#1a202c] rounded-xl text-xs font-mono">
            <button
              id="cmd-tab-search"
              onClick={() => {
                setActiveTab('search');
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'search'
                  ? 'bg-white dark:bg-[#252d3d] text-[#101318] dark:text-white shadow-xs font-semibold'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#101318] dark:hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search & Commands</span>
            </button>
            
            <button
              id="cmd-tab-neural"
              onClick={() => setActiveTab('neural')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'neural'
                  ? 'bg-white dark:bg-[#252d3d] text-[#a66a12] dark:text-[#f3ab3f] shadow-xs font-semibold'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#a66a12] dark:hover:text-[#f3ab3f]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#a66a12] dark:text-[#f3ab3f]" />
              <span>Neural Controls</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live Synced" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#30363d] rounded text-[#8b93a1]">
              ESC
            </kbd>
          </div>
        </div>

        {activeTab === 'search' ? (
          <>
            {/* Input Search Field */}
            <div className="flex items-center gap-3 p-4 border-b border-[#dfe3e9] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-[#111622]/90">
              <Search className="w-5 h-5 text-[#8b93a1]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search projects, resumes, demos, or type 'neural' to tune background..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent border-0 outline-none text-sm text-[#101318] dark:text-white placeholder-[#8b93a1] font-sans"
              />
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-[#8b93a1]">
                  No matching commands or files found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      id={`cmd-item-${item.id}`}
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

                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded flex-shrink-0 ml-2 ${
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
              <span>↑↓ Navigate · ↵ Select · Tab Switch Tab</span>
              <span>Suvam Priyaranjan Sahoo</span>
            </div>
          </>
        ) : (
          /* Dedicated Neural Network Control Panel View */
          <div className="p-4 sm:p-5 max-h-[480px] overflow-y-auto space-y-5 bg-white dark:bg-[#0f141d]">
            {/* Header Telemetry Status */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafc] dark:bg-[#161c28] border border-[#e2e8f0] dark:border-[#232b3b]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#a66a12]/10 dark:bg-[#a66a12]/20 text-[#a66a12] dark:text-[#f3ab3f]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#101318] dark:text-white flex items-center gap-1.5">
                    Neural Physics Canvas
                    <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-sm">
                      LIVE SYNC
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                    Changes immediately adjust the living background simulation in real-time
                  </div>
                </div>
              </div>

              {onResetNeuralSettings && (
                <button
                  id="neural-btn-reset-defaults"
                  onClick={onResetNeuralSettings}
                  title="Reset to 1.0x balanced defaults"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-[#64748b] hover:text-[#a66a12] dark:text-[#94a3b8] dark:hover:text-[#f3ab3f] bg-white dark:bg-[#1f2737] border border-[#cbd5e1] dark:border-[#334155] rounded-lg transition-colors shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>

            {/* Atmospheric Quick Presets */}
            <div>
              <div className="text-xs font-semibold font-mono uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#a66a12]" />
                <span>Atmospheric Presets</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presets.map((preset) => {
                  const isCurrent = 
                    Math.abs(neuralSettings.connectionDensity - preset.values.connectionDensity) < 0.05 &&
                    Math.abs(neuralSettings.pulseFrequency - preset.values.pulseFrequency) < 0.05 &&
                    Math.abs(neuralSettings.particleSpeed - preset.values.particleSpeed) < 0.05;
                  
                  return (
                    <button
                      key={preset.name}
                      id={`neural-preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isCurrent
                          ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/15 text-[#a66a12] dark:text-[#f3ab3f] shadow-xs'
                          : 'border-[#e2e8f0] dark:border-[#232b3b] hover:border-[#cbd5e1] dark:hover:border-[#334155] bg-[#f8fafc] dark:bg-[#161c28] text-[#334155] dark:text-[#cbd5e1]'
                      }`}
                    >
                      <div className="text-sm font-semibold flex items-center justify-between">
                        <span>{preset.icon} {preset.name}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-[#a66a12]" />}
                      </div>
                      <div className="text-[10px] text-[#64748b] dark:text-[#94a3b8] mt-1 line-clamp-1">
                        {preset.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders & Granular Tuning Section */}
            <div className="space-y-4 pt-1">
              {/* 1. Neural Sensitivity Control */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                highlightedSetting === 'sensitivity'
                  ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/10 ring-1 ring-[#a66a12]'
                  : 'border-[#e2e8f0] dark:border-[#232b3b] bg-[#f8fafc]/70 dark:bg-[#161c28]/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#101318] dark:text-white">Neural Sensitivity</span>
                      <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">Detection radius & pointer responsiveness across all 3 zones</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ sensitivity: Math.max(0.5, Math.round((effectiveSensitivity - 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Decrease sensitivity"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#a66a12] dark:text-[#f3ab3f] min-w-[42px] text-center px-1.5 py-0.5 bg-white dark:bg-[#1e2533] border border-[#e2e8f0] dark:border-[#2d3748] rounded">
                      {effectiveSensitivity.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ sensitivity: Math.min(2.0, Math.round((effectiveSensitivity + 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Increase sensitivity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                  {[
                    { label: 'Low', val: 0.8 },
                    { label: 'Normal', val: 1.0 },
                    { label: 'High', val: 1.4 },
                    { label: 'Ultra', val: 1.8 }
                  ].map((lvl) => {
                    const isSelected = Math.abs(effectiveSensitivity - lvl.val) < 0.05;
                    return (
                      <button
                        key={lvl.label}
                        onClick={() => onUpdateNeuralSettings?.({ sensitivity: lvl.val })}
                        className={`py-1 px-2 rounded-lg text-[11px] font-mono border transition-all ${
                          isSelected
                            ? 'bg-[#a66a12] text-white border-[#a66a12] font-bold shadow-xs'
                            : 'bg-white dark:bg-[#1a2130] border-[#cbd5e1] dark:border-[#2e394d] text-[#475569] dark:text-[#94a3b8] hover:border-[#a66a12]'
                        }`}
                      >
                        {lvl.label} <span className="text-[9px] opacity-80">({lvl.val}x)</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8">0.5x</span>
                  <input
                    id="slider-neural-sensitivity"
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={effectiveSensitivity}
                    onChange={(e) => onUpdateNeuralSettings?.({ sensitivity: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-[#e2e8f0] dark:bg-[#2a3446] rounded-lg appearance-none cursor-pointer accent-[#a66a12] dark:accent-[#f3ab3f]"
                  />
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8 text-right">2.0x</span>
                </div>
              </div>

              {/* 2. Neural Visibility / Opacity Control */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                highlightedSetting === 'visibility'
                  ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/10 ring-1 ring-[#a66a12]'
                  : 'border-[#e2e8f0] dark:border-[#232b3b] bg-[#f8fafc]/70 dark:bg-[#161c28]/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#101318] dark:text-white">Neural Visibility & Opacity</span>
                      <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">Node luminescence, synaptic line alpha & atmospheric presence</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ visibility: Math.max(0.5, Math.round((effectiveVisibility - 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Decrease visibility"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#a66a12] dark:text-[#f3ab3f] min-w-[42px] text-center px-1.5 py-0.5 bg-white dark:bg-[#1e2533] border border-[#e2e8f0] dark:border-[#2d3748] rounded">
                      {effectiveVisibility.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ visibility: Math.min(2.0, Math.round((effectiveVisibility + 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Increase visibility"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                  {[
                    { label: 'Subtle', val: 0.7 },
                    { label: 'Balanced', val: 1.0 },
                    { label: 'Visible', val: 1.3 },
                    { label: 'Intense', val: 1.7 }
                  ].map((lvl) => {
                    const isSelected = Math.abs(effectiveVisibility - lvl.val) < 0.05;
                    return (
                      <button
                        key={lvl.label}
                        onClick={() => onUpdateNeuralSettings?.({ visibility: lvl.val })}
                        className={`py-1 px-2 rounded-lg text-[11px] font-mono border transition-all ${
                          isSelected
                            ? 'bg-[#a66a12] text-white border-[#a66a12] font-bold shadow-xs'
                            : 'bg-white dark:bg-[#1a2130] border-[#cbd5e1] dark:border-[#2e394d] text-[#475569] dark:text-[#94a3b8] hover:border-[#a66a12]'
                        }`}
                      >
                        {lvl.label} <span className="text-[9px] opacity-80">({lvl.val}x)</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8">0.5x</span>
                  <input
                    id="slider-neural-visibility"
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={effectiveVisibility}
                    onChange={(e) => onUpdateNeuralSettings?.({ visibility: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-[#e2e8f0] dark:bg-[#2a3446] rounded-lg appearance-none cursor-pointer accent-[#a66a12] dark:accent-[#f3ab3f]"
                  />
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8 text-right">2.0x</span>
                </div>
              </div>

              {/* 3. Interaction Strength Control */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                highlightedSetting === 'interaction'
                  ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/10 ring-1 ring-[#a66a12]'
                  : 'border-[#e2e8f0] dark:border-[#232b3b] bg-[#f8fafc]/70 dark:bg-[#161c28]/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#101318] dark:text-white">Interaction Strength</span>
                      <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">Elastic pull force, cursor velocity transfer & kinetic impulse</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ interactionStrength: Math.max(0.4, Math.round((effectiveInteractionStrength - 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Decrease interaction strength"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#a66a12] dark:text-[#f3ab3f] min-w-[42px] text-center px-1.5 py-0.5 bg-white dark:bg-[#1e2533] border border-[#e2e8f0] dark:border-[#2d3748] rounded">
                      {effectiveInteractionStrength.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ interactionStrength: Math.min(2.0, Math.round((effectiveInteractionStrength + 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Increase interaction strength"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                  {[
                    { label: 'Gentle', val: 0.7 },
                    { label: 'Responsive', val: 1.2 },
                    { label: 'Strong', val: 1.7 }
                  ].map((lvl) => {
                    const isSelected = Math.abs(effectiveInteractionStrength - lvl.val) < 0.05;
                    return (
                      <button
                        key={lvl.label}
                        onClick={() => onUpdateNeuralSettings?.({ interactionStrength: lvl.val })}
                        className={`py-1 px-2 rounded-lg text-[11px] font-mono border transition-all ${
                          isSelected
                            ? 'bg-[#a66a12] text-white border-[#a66a12] font-bold shadow-xs'
                            : 'bg-white dark:bg-[#1a2130] border-[#cbd5e1] dark:border-[#2e394d] text-[#475569] dark:text-[#94a3b8] hover:border-[#a66a12]'
                        }`}
                      >
                        {lvl.label} <span className="text-[9px] opacity-80">({lvl.val}x)</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8">0.4x</span>
                  <input
                    id="slider-interaction-strength"
                    type="range"
                    min="0.4"
                    max="2.0"
                    step="0.1"
                    value={effectiveInteractionStrength}
                    onChange={(e) => onUpdateNeuralSettings?.({ interactionStrength: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-[#e2e8f0] dark:bg-[#2a3446] rounded-lg appearance-none cursor-pointer accent-[#a66a12] dark:accent-[#f3ab3f]"
                  />
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8 text-right">2.0x</span>
                </div>
              </div>

              {/* 4. Connection Density Control */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                highlightedSetting === 'density'
                  ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/10 ring-1 ring-[#a66a12]'
                  : 'border-[#e2e8f0] dark:border-[#232b3b] bg-[#f8fafc]/70 dark:bg-[#161c28]/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#101318] dark:text-white">Synaptic Connection Density</span>
                      <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">Threshold distance for neuron interlinking & mesh formation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ connectionDensity: Math.max(0.4, Math.round((neuralSettings.connectionDensity - 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Decrease density"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#a66a12] dark:text-[#f3ab3f] min-w-[42px] text-center px-1.5 py-0.5 bg-white dark:bg-[#1e2533] border border-[#e2e8f0] dark:border-[#2d3748] rounded">
                      {neuralSettings.connectionDensity.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ connectionDensity: Math.min(2.0, Math.round((neuralSettings.connectionDensity + 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Increase density"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8">0.4x</span>
                  <input
                    id="slider-connection-density"
                    type="range"
                    min="0.4"
                    max="2.0"
                    step="0.1"
                    value={neuralSettings.connectionDensity}
                    onChange={(e) => onUpdateNeuralSettings?.({ connectionDensity: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-[#e2e8f0] dark:bg-[#2a3446] rounded-lg appearance-none cursor-pointer accent-[#a66a12] dark:accent-[#f3ab3f]"
                  />
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8 text-right">2.0x</span>
                </div>
              </div>

              {/* 2. Pulse Frequency Control */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                highlightedSetting === 'frequency'
                  ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/10 ring-1 ring-[#a66a12]'
                  : 'border-[#e2e8f0] dark:border-[#232b3b] bg-[#f8fafc]/70 dark:bg-[#161c28]/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#101318] dark:text-white">Signal Pulse Frequency</span>
                      <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">Rate of glowing analytical data packets traversing active synapses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ pulseFrequency: Math.max(0.3, Math.round((neuralSettings.pulseFrequency - 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Decrease frequency"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#a66a12] dark:text-[#f3ab3f] min-w-[42px] text-center px-1.5 py-0.5 bg-white dark:bg-[#1e2533] border border-[#e2e8f0] dark:border-[#2d3748] rounded">
                      {neuralSettings.pulseFrequency.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ pulseFrequency: Math.min(2.5, Math.round((neuralSettings.pulseFrequency + 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Increase frequency"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8">0.3x</span>
                  <input
                    id="slider-pulse-frequency"
                    type="range"
                    min="0.3"
                    max="2.5"
                    step="0.1"
                    value={neuralSettings.pulseFrequency}
                    onChange={(e) => onUpdateNeuralSettings?.({ pulseFrequency: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-[#e2e8f0] dark:bg-[#2a3446] rounded-lg appearance-none cursor-pointer accent-[#a66a12] dark:accent-[#f3ab3f]"
                  />
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8 text-right">2.5x</span>
                </div>
              </div>

              {/* 3. Particle Speed Control */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                highlightedSetting === 'speed'
                  ? 'border-[#a66a12] bg-[#a66a12]/5 dark:bg-[#a66a12]/10 ring-1 ring-[#a66a12]'
                  : 'border-[#e2e8f0] dark:border-[#232b3b] bg-[#f8fafc]/70 dark:bg-[#161c28]/60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <div>
                      <span className="text-xs font-semibold text-[#101318] dark:text-white">Particle Speed & Ripple Dynamics</span>
                      <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">Orbital kinetic drift, acoustic wave propagation, and spark velocity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ particleSpeed: Math.max(0.3, Math.round((neuralSettings.particleSpeed - 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Decrease speed"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#a66a12] dark:text-[#f3ab3f] min-w-[42px] text-center px-1.5 py-0.5 bg-white dark:bg-[#1e2533] border border-[#e2e8f0] dark:border-[#2d3748] rounded">
                      {neuralSettings.particleSpeed.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => onUpdateNeuralSettings?.({ particleSpeed: Math.min(2.5, Math.round((neuralSettings.particleSpeed + 0.1) * 10) / 10) })}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white dark:bg-[#202838] border border-[#cbd5e1] dark:border-[#334155] text-xs font-bold hover:bg-[#e2e8f0] dark:hover:bg-[#2d3748]"
                      title="Increase speed"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8">0.3x</span>
                  <input
                    id="slider-particle-speed"
                    type="range"
                    min="0.3"
                    max="2.5"
                    step="0.1"
                    value={neuralSettings.particleSpeed}
                    onChange={(e) => onUpdateNeuralSettings?.({ particleSpeed: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-[#e2e8f0] dark:bg-[#2a3446] rounded-lg appearance-none cursor-pointer accent-[#a66a12] dark:accent-[#f3ab3f]"
                  />
                  <span className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] w-8 text-right">2.5x</span>
                </div>
              </div>
            </div>

            {/* Motion Switch info footer */}
            <div className="pt-2 border-t border-[#e2e8f0] dark:border-[#232b3b] flex items-center justify-between text-xs">
              <div className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                Click anywhere on empty background space to trigger an energy ripple wave
              </div>
              {onToggleMotion && (
                <button
                  id="neural-btn-toggle-motion"
                  onClick={onToggleMotion}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-[#cbd5e1] dark:border-[#334155] hover:bg-[#f1f5f9] dark:hover:bg-[#1e2533] text-[#334155] dark:text-[#cbd5e1] transition-colors"
                >
                  Motion: {motionEnabled ? 'Enabled' : 'Paused'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
