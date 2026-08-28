import React, { useState } from 'react';
import { 
  Layers, 
  BarChart3, 
  Workflow, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ExternalLink,
  Table,
  CheckCircle2
} from 'lucide-react';
import { ProjectMedia } from '../types';

interface ProjectVisualPreviewProps {
  projectId: string;
  mediaList?: ProjectMedia[];
  projectTitle: string;
  projectFlow?: string;
  onOpenCaseStudy?: () => void;
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({
  projectId,
  mediaList = [],
  projectTitle,
  projectFlow,
  onOpenCaseStudy
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  if (!mediaList || mediaList.length === 0) return null;

  const currentMedia = mediaList[currentIndex] || mediaList[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  const renderVisualStage = (media: ProjectMedia) => {
    switch (media.type) {
      case 'image':
        return (
          <div className="relative w-full h-full min-h-[170px] max-h-[190px] overflow-hidden rounded-xl bg-[#141822] flex items-center justify-center group/img">
            <img
              src={media.url}
              alt={media.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover/img:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
              <span className="font-semibold text-[11px] truncate drop-shadow-sm">{media.title}</span>
              {media.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white shrink-0">
                  {media.badge}
                </span>
              )}
            </div>
          </div>
        );

      case 'diagram':
        return (
          <div className="relative w-full h-full min-h-[170px] max-h-[190px] p-3.5 rounded-xl bg-gradient-to-br from-[#121620] to-[#182030] text-white flex flex-col justify-between border border-white/10 overflow-hidden font-mono shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-400">
                <Workflow className="w-3.5 h-3.5" />
                <span>{media.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {media.badge || 'ETL ARCHITECTURE'}
              </span>
            </div>

            {/* Architecture Node Stream */}
            <div className="my-2.5 flex items-center justify-between gap-1 text-[10px] overflow-x-auto no-scrollbar py-1">
              <div className="px-2.5 py-1.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center shrink-0">
                <div className="text-[8px] uppercase tracking-wider text-rose-400">01. INGEST</div>
                <div className="font-bold">Raw Stream</div>
              </div>
              <div className="text-slate-500 font-bold">→</div>
              <div className="px-2.5 py-1.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-center shrink-0">
                <div className="text-[8px] uppercase tracking-wider text-amber-400">02. COMPUTE</div>
                <div className="font-bold">PySpark ETL</div>
              </div>
              <div className="text-slate-500 font-bold">→</div>
              <div className="px-2.5 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center shrink-0">
                <div className="text-[8px] uppercase tracking-wider text-emerald-400">03. SERVE</div>
                <div className="font-bold">Power BI</div>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 line-clamp-1 font-sans">
              {media.caption}
            </p>
          </div>
        );

      case 'chart':
        return (
          <div className="relative w-full h-full min-h-[170px] max-h-[190px] p-3.5 rounded-xl bg-[#0f141f] text-white flex flex-col justify-between border border-white/10 overflow-hidden font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{media.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {media.badge || 'ML METRICS'}
              </span>
            </div>

            {/* Visual Simulated SVG Chart / Radar */}
            <div className="my-1.5 h-16 w-full flex items-end gap-1.5 px-2 bg-black/40 rounded-lg p-2 border border-white/5">
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-emerald-500/80 rounded-t h-[88%] transition-all" />
                <span className="text-[8px] text-slate-400">XGBoost</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-sky-500/80 rounded-t h-[76%] transition-all" />
                <span className="text-[8px] text-slate-400">RF</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-indigo-500/80 rounded-t h-[68%] transition-all" />
                <span className="text-[8px] text-slate-400">LR</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-rose-500/80 rounded-t h-[52%] transition-all" />
                <span className="text-[8px] text-slate-400">Altman-Z</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-300">
              <span className="truncate">{media.caption}</span>
              <span className="text-emerald-400 font-bold shrink-0 ml-1">AUC: 0.857</span>
            </div>
          </div>
        );

      case 'dashboard':
      default:
        return (
          <div className="relative w-full h-full min-h-[170px] max-h-[190px] p-3.5 rounded-xl bg-gradient-to-br from-[#101726] to-[#0c101a] text-white flex flex-col justify-between border border-white/10 overflow-hidden font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400">
                <Table className="w-3.5 h-3.5" />
                <span>{media.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {media.badge || 'INTERACTIVE PREVIEW'}
              </span>
            </div>

            {/* RICE / Metric Preview Table Mock */}
            <div className="my-2 bg-black/40 rounded-lg p-2 border border-white/5 space-y-1.5 text-[9px]">
              <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/10 uppercase tracking-wider font-semibold">
                <span>Complaint Theme</span>
                <span>Reach</span>
                <span>RICE</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="truncate max-w-[120px] font-medium text-rose-300">Bank Switch Timeout</span>
                <span>4,200</span>
                <span className="font-bold text-emerald-400">18.4k</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="truncate max-w-[120px] font-medium text-amber-300">Refund Auto-Credit</span>
                <span>3,150</span>
                <span className="font-bold text-emerald-400">12.1k</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 line-clamp-1 font-sans">
              {media.caption}
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className="relative w-full mb-4.5 rounded-xl overflow-hidden group/carousel border border-[#fecdd3]/80 dark:border-white/10 bg-[#fff5f7]/60 dark:bg-black/40 shadow-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Media Stage */}
      <div className="relative w-full min-h-[170px] max-h-[190px]">
        {renderVisualStage(currentMedia)}

        {/* Carousel Navigation Arrows (Visible on hover or mobile) */}
        {mediaList.length > 1 && (
          <div className="absolute inset-y-0 inset-x-1.5 flex items-center justify-between pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
            <button
              onClick={handlePrev}
              aria-label="Previous preview"
              className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next preview"
              className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Carousel Dots & View Modal Trigger */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
            {mediaList.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Slide ${idx + 1}`}
                className={`pointer-events-auto transition-all rounded-full ${
                  currentIndex === idx 
                    ? 'w-4 h-1.5 bg-white shadow-xs' 
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Media Type Thumb Strip Selector */}
      {mediaList.length > 1 && (
        <div className="px-2.5 py-1.5 bg-white/95 dark:bg-[#111622] border-t border-[#fecdd3]/60 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-[#5e3240] dark:text-[#9ea7b4]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {mediaList.map((m, idx) => (
              <button
                key={m.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-rose-500/10 dark:bg-sky-500/20 text-[#e11d48] dark:text-[#38bdf8] font-bold border border-rose-500/30 dark:border-sky-500/30'
                    : 'hover:bg-rose-500/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'
                }`}
              >
                {m.title}
              </button>
            ))}
          </div>
          <span className="text-[9px] font-mono text-[#a06b7a] dark:text-[#8b93a1] pl-2 shrink-0">
            {currentIndex + 1}/{mediaList.length}
          </span>
        </div>
      )}
    </div>
  );
};
