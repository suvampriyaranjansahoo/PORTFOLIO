import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Terminal,
  Activity,
  Zap
} from 'lucide-react';

interface PipelineNode {
  id: string;
  stageNumber: string;
  name: string;
  tech: string;
  latency: string;
  description: string;
  details: {
    inputFormat: string;
    throughput: string;
    errorHandling: string;
    businessOutcome: string;
  };
}

const MEDIFLOW_NODES: PipelineNode[] = [
  {
    id: 'ingest',
    stageNumber: '01',
    name: 'Telemetry Ingestion',
    tech: 'Azure IoT Hub / Event Hubs',
    latency: '< 45ms',
    description: 'High-frequency vitals & UPI transactional events streaming via AMQP/MQTT protocols.',
    details: {
      inputFormat: 'JSON Payloads (HeartRate, SpO2, Latency, BankNodeID)',
      throughput: '12,000+ events/min partition capacity',
      errorHandling: 'Dead Letter Queue (DLQ) with automatic retry policy',
      businessOutcome: 'Zero packet loss during peak transaction and patient monitoring spikes.'
    }
  },
  {
    id: 'stream',
    stageNumber: '02',
    name: 'Stream Processing & Rules',
    tech: 'Azure Stream Analytics (SQL)',
    latency: '< 180ms',
    description: 'Tumbling 5-second window aggregations detecting bradycardia, tachycardia & switch timeouts.',
    details: {
      inputFormat: 'Windowed SQL stream query with tumbling window',
      throughput: 'Sub-second pattern recognition engine',
      errorHandling: 'Schema validation filter discarding corrupt timestamps',
      businessOutcome: 'Reduced critical alert false-positives by 30% through rolling averages.'
    }
  },
  {
    id: 'storage',
    stageNumber: '03',
    name: 'Analytical & Cold Store',
    tech: 'Azure Cosmos DB & Synapse Delta',
    latency: '< 60ms',
    description: 'Dual-path architecture: hot operational documents in Cosmos DB, cold batch parquet in Synapse.',
    details: {
      inputFormat: 'NoSQL Document Store + Parquet Partitioned by Date',
      throughput: 'Multi-region 99.999% SLA write availability',
      errorHandling: 'Automated snapshot checkpoints and partition rebalancing',
      businessOutcome: 'Powers sub-second medical queries and historic cross-sectional research.'
    }
  },
  {
    id: 'serving',
    stageNumber: '04',
    name: 'Executive BI & Alerting',
    tech: 'Power BI Live Streaming + Webhook',
    latency: '< 450ms',
    description: 'Real-time telemetry dashboards with direct SMS/Webhook dispatch for medical interventions.',
    details: {
      inputFormat: 'DirectQuery / Push Dataset to Power BI Service',
      throughput: 'Instant UI refresh every 1,000ms',
      errorHandling: 'Fallback email alerts if webhook receiver drops connection',
      businessOutcome: 'Actionable response time reduced from minutes to sub-second triggers.'
    }
  }
];

export const PipelineArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(MEDIFLOW_NODES[0]);

  return (
    <div className="card-level-1 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#dfe3e9] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-[#111622]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b93a1]">
              Systems Architecture & Data Engineering
            </div>
            <div className="font-display font-bold text-lg text-[#101318] dark:text-white flex items-center gap-2">
              <span>Interactive Data Pipeline Inspector</span>
              <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                Azure Streaming & Synapse
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8b93a1]">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>End-to-End Latency: &lt; 450ms</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Node Pipeline Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {MEDIFLOW_NODES.map((node, idx) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`Select Stage ${node.stageNumber}: ${node.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNode(node);
                  }
                }}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative group focus:ring-2 focus:ring-[#a66a12] outline-none ${
                  isSelected
                    ? 'bg-[#101318] text-white dark:bg-white dark:text-[#101318] border-transparent shadow-md'
                    : 'bg-[#f6f7f9] dark:bg-[#1a1f28] border-[#dfe3e9] dark:border-[#30363d] text-[#101318] dark:text-white hover:border-[#a66a12]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 dark:bg-black/10' : 'bg-[#dfe3e9] dark:bg-[#262c36] text-[#5c6472] dark:text-[#8b93a1]'
                  }`}>
                    Stage {node.stageNumber}
                  </span>
                  <span className={`text-[10px] font-mono ${
                    isSelected ? 'text-amber-300 dark:text-amber-700' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {node.latency}
                  </span>
                </div>

                <div className="text-xs font-bold truncate mb-1">
                  {node.name}
                </div>
                <div className={`text-[10px] font-mono truncate ${
                  isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-[#8b93a1]'
                }`}>
                  {node.tech}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="p-5 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#262c36] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dfe3e9] dark:border-[#262c36] pb-3">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#8b93a1]">
                Inspecting Stage {selectedNode.stageNumber}
              </div>
              <div className="font-display font-bold text-base text-[#101318] dark:text-white">
                {selectedNode.name} — <span className="text-[#a66a12] font-mono text-sm">{selectedNode.tech}</span>
              </div>
            </div>
            <div className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] text-[#5c6472] dark:text-[#8b93a1]">
              SLA Benchmark: {selectedNode.latency}
            </div>
          </div>

          <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4]">
            {selectedNode.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="text-[10px] font-mono text-[#8b93a1] uppercase mb-1">Input Format & Schema</div>
              <div className="text-xs font-mono text-[#101318] dark:text-white truncate">
                {selectedNode.details.inputFormat}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="text-[10px] font-mono text-[#8b93a1] uppercase mb-1">Throughput & Capacity</div>
              <div className="text-xs font-mono text-[#101318] dark:text-white truncate">
                {selectedNode.details.throughput}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="text-[10px] font-mono text-[#8b93a1] uppercase mb-1">Resilience & Error Handling</div>
              <div className="text-xs font-mono text-[#101318] dark:text-white truncate">
                {selectedNode.details.errorHandling}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36]">
              <div className="text-[10px] font-mono text-[#8b93a1] uppercase mb-1">Enterprise Business Outcome</div>
              <div className="text-xs font-mono text-[#a66a12] truncate">
                {selectedNode.details.businessOutcome}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
