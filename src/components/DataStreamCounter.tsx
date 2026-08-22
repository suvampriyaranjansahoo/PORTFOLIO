import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, ChevronUp, ChevronDown, Layers, Zap } from 'lucide-react';

export interface NeuralStreamData {
  throughputMBps: number;
  activeSignalsCount: number;
  maxSignals: number;
  totalPacketsProcessed: number;
  networkLoadPercent: number;
  nodeCount: number;
  motionEnabled: boolean;
}

interface DataStreamCounterProps {
  motionEnabled: boolean;
  nodeDensity: number;
}

export const DataStreamCounter: React.FC<DataStreamCounterProps> = ({
  motionEnabled,
  nodeDensity,
}) => {
  const [streamData, setStreamData] = useState<NeuralStreamData>({
    throughputMBps: motionEnabled ? 64.2 : 0,
    activeSignalsCount: motionEnabled ? 3 : 0,
    maxSignals: 7,
    totalPacketsProcessed: 142,
    networkLoadPercent: 42,
    nodeCount: Math.round(92 * nodeDensity),
    motionEnabled,
  });

  const [expanded, setExpanded] = useState(false);
  const [throughputHistory, setThroughputHistory] = useState<number[]>([45, 52, 60, 78, 64, 70, 85, 92]);

  // Listen to live throughput telemetry dispatched from the living neural background canvas
  useEffect(() => {
    const handleThroughputEvent = (e: Event) => {
      const customEvent = e as CustomEvent<NeuralStreamData>;
      if (customEvent.detail) {
        setStreamData(customEvent.detail);
        setThroughputHistory(prev => {
          const next = [...prev.slice(1), customEvent.detail.throughputMBps];
          return next;
        });
      }
    };

    window.addEventListener('neural-throughput-update', handleThroughputEvent);
    return () => {
      window.removeEventListener('neural-throughput-update', handleThroughputEvent);
    };
  }, []);

  // Format throughput display value
  const displayThroughput = motionEnabled 
    ? streamData.throughputMBps > 0 
      ? streamData.throughputMBps.toFixed(1) 
      : '0.0'
    : '0.0';

  const maxVal = Math.max(...throughputHistory, 120);

  return (
    <div
      id="neural-data-stream-counter"
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start pointer-events-auto select-none"
    >
      {/* Expanded Technical Telemetry Card */}
      {expanded && (
        <div 
          role="region"
          aria-label="Neural Network Telemetry Details"
          className="mb-2 p-3.5 rounded-2xl bg-[#10141e]/95 dark:bg-[#0c101c]/95 border border-slate-300/60 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs shadow-2xl backdrop-blur-xl w-64 sm:w-72 transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-white/10 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#a66a12] dark:text-[#f59e0b]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span>SYNAPTIC STREAM TELEMETRY</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              motionEnabled 
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
            }`}>
              {motionEnabled ? 'LIVE' : 'STANDBY'}
            </span>
          </div>

          {/* Mini Real-Time Activity Sparkline */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              <span>STREAM FREQUENCY (MB/s)</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{displayThroughput} MB/s</span>
            </div>
            <div className="h-8 w-full bg-slate-900/5 dark:bg-black/40 rounded-lg p-1 flex items-end justify-between gap-1 border border-slate-200/50 dark:border-white/5">
              {throughputHistory.map((val, idx) => {
                const heightPercent = motionEnabled ? Math.max(12, Math.min(100, (val / maxVal) * 100)) : 8;
                return (
                  <div
                    key={idx}
                    style={{ height: `${heightPercent}%` }}
                    className={`flex-1 rounded-sm transition-all duration-300 ${
                      motionEnabled
                        ? idx === throughputHistory.length - 1
                          ? 'bg-amber-500 shadow-sm shadow-amber-500/50'
                          : 'bg-indigo-500/70 dark:bg-indigo-400/60'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400 text-[9px]">ACTIVE SIGNALS</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${motionEnabled ? 'bg-cyan-500' : 'bg-slate-400'}`} />
                {streamData.activeSignalsCount} / {streamData.maxSignals} pkts
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400 text-[9px]">NODE DENSITY</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 mt-0.5">
                <Layers className="w-3 h-3 text-amber-500" />
                {Math.round(nodeDensity * 100)}% ({streamData.nodeCount} nodes)
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400 text-[9px]">TOTAL ROUTED</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {streamData.totalPacketsProcessed} pulses
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400 text-[9px]">FLOW LOAD</div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                {motionEnabled ? `${streamData.networkLoadPercent}%` : '0%'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Docked Pill Button */}
      <button
        id="neural-throughput-hud-btn"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="Toggle neural data throughput stream telemetry"
        className={`group flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0e14] focus-visible:outline-none ${
          expanded
            ? "bg-white dark:bg-[#151c2e] border-[#d98b18] dark:border-[#f59e0b] text-slate-900 dark:text-white"
            : "bg-white/85 dark:bg-[#101524]/85 hover:bg-white dark:hover:bg-[#141b2e] border-slate-300/80 dark:border-white/15 text-slate-800 dark:text-slate-200"
        }`}
      >
        {/* Animated Synapse Pulse Dot */}
        <span className="relative flex h-2 w-2 items-center justify-center">
          {motionEnabled ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400" />
          )}
        </span>

        {/* Dynamic Throughput Rate Readout */}
        <div className="flex items-baseline gap-1.5 font-mono text-[11px] tracking-wide">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden xs:inline uppercase">Stream:</span>
          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {displayThroughput}
          </span>
          <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">MB/s</span>
        </div>

        {/* Live Active Stream Micro-Bars */}
        <div className="flex items-center gap-0.5 h-3 px-1 border-l border-slate-200 dark:border-white/10">
          {[1, 2, 3].map((barIndex) => {
            const isActive = motionEnabled && streamData.activeSignalsCount >= barIndex;
            return (
              <span
                key={barIndex}
                className={`w-0.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'h-3 bg-gradient-to-t from-cyan-500 to-amber-500 animate-pulse'
                    : 'h-1.5 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            );
          })}
        </div>

        {/* Expand / Collapse Icon */}
        <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform">
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </span>
      </button>
    </div>
  );
};
