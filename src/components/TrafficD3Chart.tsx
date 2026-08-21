import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  Users, 
  FileDown, 
  Sparkles, 
  Activity, 
  Calendar, 
  Play, 
  Pause, 
  RotateCcw,
  BarChart3,
  MousePointerClick
} from 'lucide-react';

interface TrafficDataPoint {
  date: Date;
  visitors: number;
  caseStudyViews: number;
  resumeDownloads: number;
  contactInquiries: number;
}

type TimeRange = '7d' | '30d' | '90d';
type MetricFilter = 'all' | 'conversions' | 'downloads';

// Generate realistic simulated baseline data
function generateHistoricalData(days: number): TrafficDataPoint[] {
  const data: TrafficDataPoint[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    
    // Weekend vs weekday rhythm
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const baseVisitors = isWeekend ? 65 : 190;
    const noise = Math.floor((Math.sin(i * 0.4) + 1) * 35 + (Math.random() * 40 - 20));
    
    // Upward trend over time
    const trendFactor = 1 + (days - i) * 0.008;
    const visitors = Math.max(30, Math.round((baseVisitors + noise) * trendFactor));
    
    const caseStudyViews = Math.round(visitors * (0.42 + Math.random() * 0.12));
    const resumeDownloads = Math.round(visitors * (0.14 + Math.random() * 0.06));
    const contactInquiries = Math.max(1, Math.round(visitors * (0.04 + Math.random() * 0.03)));

    data.push({
      date: d,
      visitors,
      caseStudyViews,
      resumeDownloads,
      contactInquiries
    });
  }
  return data;
}

export const TrafficD3Chart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeMetric, setActiveMetric] = useState<MetricFilter>('all');
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(false);
  const [dataset, setDataset] = useState<TrafficDataPoint[]>(() => generateHistoricalData(30));
  const [hoveredPoint, setHoveredPoint] = useState<TrafficDataPoint | null>(null);

  // Re-generate baseline data when time range changes
  const daysCount = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    const count = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    setDataset(generateHistoricalData(count));
  };

  const handleResetData = () => {
    setDataset(generateHistoricalData(daysCount));
    setIsLiveSimulating(false);
  };

  // Live simulation ticker
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setDataset((prev) => {
        const last = prev[prev.length - 1];
        const nextDate = new Date(last.date);
        nextDate.setDate(nextDate.getDate() + 1);

        const isWeekend = nextDate.getDay() === 0 || nextDate.getDay() === 6;
        const base = isWeekend ? 80 : 210;
        const noise = Math.floor(Math.random() * 60 - 30);
        const visitors = Math.max(40, base + noise);
        const caseStudyViews = Math.round(visitors * (0.45 + Math.random() * 0.1));
        const resumeDownloads = Math.round(visitors * (0.16 + Math.random() * 0.05));
        const contactInquiries = Math.max(1, Math.round(visitors * 0.05));

        const nextPoint: TrafficDataPoint = {
          date: nextDate,
          visitors,
          caseStudyViews,
          resumeDownloads,
          contactInquiries
        };

        return [...prev.slice(1), nextPoint];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Aggregate KPI metrics
  const kpis = useMemo(() => {
    const totalVisitors = dataset.reduce((acc, d) => acc + d.visitors, 0);
    const totalCaseStudies = dataset.reduce((acc, d) => acc + d.caseStudyViews, 0);
    const totalDownloads = dataset.reduce((acc, d) => acc + d.resumeDownloads, 0);
    const totalContacts = dataset.reduce((acc, d) => acc + d.contactInquiries, 0);
    
    const convRate = totalVisitors > 0 ? ((totalDownloads + totalContacts) / totalVisitors * 100).toFixed(1) : '0.0';
    const csPerVisitor = totalVisitors > 0 ? (totalCaseStudies / totalVisitors).toFixed(2) : '0';

    return {
      totalVisitors,
      totalDownloads,
      totalContacts,
      convRate,
      csPerVisitor
    };
  }, [dataset]);

  // D3 Chart Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || dataset.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const containerWidth = containerRef.current.clientWidth || 700;
    const height = 340;
    const margin = { top: 25, right: 30, bottom: 40, left: 50 };
    const innerWidth = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('width', containerWidth).attr('height', height);

    // Setup Scales
    const xExtent = d3.extent<TrafficDataPoint, Date>(dataset, (d) => d.date);
    const startDate = xExtent[0] || new Date();
    const endDate = xExtent[1] || new Date();
    const xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, innerWidth]);

    const maxVisitorValue = d3.max<TrafficDataPoint, number>(dataset, (d) => d.visitors) ?? 200;
    const maxDownloadValue = d3.max<TrafficDataPoint, number>(dataset, (d) => d.resumeDownloads) ?? 50;

    const yMax = activeMetric === 'downloads' 
      ? Number(maxDownloadValue) * 1.25 
      : Number(maxVisitorValue) * 1.2;

    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([innerHeight, 0])
      .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Gradients Definition
    const defs = svg.append('defs');

    // Main Area Gradient (Amber/Gold)
    const areaGradient = defs.append('linearGradient')
      .attr('id', 'd3-traffic-area-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#a66a12')
      .attr('stop-opacity', 0.35);
    areaGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#a66a12')
      .attr('stop-opacity', 0.01);

    // Secondary Downloads Gradient (Emerald)
    const downloadGradient = defs.append('linearGradient')
      .attr('id', 'd3-download-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    downloadGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 0.3);
    downloadGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 0.0);

    // Grid lines
    const yGrid = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => '')
      .ticks(5);

    g.append('g')
      .attr('class', 'grid-lines opacity-20 dark:opacity-10')
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', 'currentColor')
      .attr('stroke-dasharray', '3 3');

    // Area Generator
    if (activeMetric === 'all') {
      const area = d3.area<TrafficDataPoint>()
        .x((d) => xScale(d.date))
        .y0(innerHeight)
        .y1((d) => yScale(d.visitors))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(dataset)
        .attr('fill', 'url(#d3-traffic-area-gradient)')
        .attr('d', area);
    }

    // Line Generator for Total Visitors
    if (activeMetric === 'all') {
      const lineVisitors = d3.line<TrafficDataPoint>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.visitors))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', '#a66a12')
        .attr('stroke-width', 2.5)
        .attr('stroke-linecap', 'round')
        .attr('d', lineVisitors);
    }

    // Line Generator for Case Study Reads
    if (activeMetric === 'all' || activeMetric === 'conversions') {
      const lineCaseStudy = d3.line<TrafficDataPoint>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.caseStudyViews))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', activeMetric === 'all' ? '4 4' : 'none')
        .attr('d', lineCaseStudy);
    }

    // Line Generator for Downloads
    if (activeMetric === 'all' || activeMetric === 'downloads' || activeMetric === 'conversions') {
      if (activeMetric === 'downloads') {
        const areaDownload = d3.area<TrafficDataPoint>()
          .x((d) => xScale(d.date))
          .y0(innerHeight)
          .y1((d) => yScale(d.resumeDownloads))
          .curve(d3.curveMonotoneX);

        g.append('path')
          .datum(dataset)
          .attr('fill', 'url(#d3-download-gradient)')
          .attr('d', areaDownload);
      }

      const lineDownloads = d3.line<TrafficDataPoint>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.resumeDownloads))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', '#10b981')
        .attr('stroke-width', 2.2)
        .attr('d', lineDownloads);
    }

    // X Axis
    const xAxis = d3.axisBottom(xScale)
      .ticks(Math.max(4, Math.floor(innerWidth / 90)))
      .tickFormat((domainValue) => d3.timeFormat('%b %d')(domainValue as Date));

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .attr('class', 'text-[11px] font-mono text-[#5c6472] dark:text-[#8b93a1]')
      .call(xAxis)
      .select('.domain')
      .attr('stroke', '#8b93a1')
      .attr('stroke-opacity', 0.4);

    // Y Axis
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d}`);

    g.append('g')
      .attr('class', 'text-[11px] font-mono text-[#5c6472] dark:text-[#8b93a1]')
      .call(yAxis)
      .select('.domain')
      .remove();

    // Interactive Hover Crosshair & Tooltip Overlay
    const focus = g.append('g').style('display', 'none');

    // Vertical line
    focus.append('line')
      .attr('class', 'focus-line')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#a66a12')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3 3');

    // Highlight Dots
    focus.append('circle')
      .attr('class', 'focus-dot-visitors')
      .attr('r', 4.5)
      .attr('fill', '#a66a12')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    focus.append('circle')
      .attr('class', 'focus-dot-downloads')
      .attr('r', 4)
      .attr('fill', '#10b981')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Bisector for finding nearest point
    const bisectDate = d3.bisector<TrafficDataPoint, Date>((d) => d.date).left;

    // Transparent overlay for catching mouse events
    svg.append('rect')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => {
        focus.style('display', 'none');
        setHoveredPoint(null);
      })
      .on('mousemove', function(event) {
        const [mouseX] = d3.pointer(event);
        const x0 = xScale.invert(mouseX);
        const i = bisectDate(dataset, x0, 1);
        const d0 = dataset[i - 1];
        const d1 = dataset[i];
        if (!d0) return;
        const d = !d1 ? d0 : (x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0);

        setHoveredPoint(d);

        const xPos = xScale(d.date);
        focus.select('.focus-line').attr('transform', `translate(${xPos},0)`);

        focus.select('.focus-dot-visitors')
          .attr('transform', `translate(${xPos},${yScale(d.visitors)})`)
          .style('display', activeMetric === 'all' ? null : 'none');

        focus.select('.focus-dot-downloads')
          .attr('transform', `translate(${xPos},${yScale(d.resumeDownloads)})`)
          .style('display', activeMetric === 'all' || activeMetric === 'downloads' ? null : 'none');
      });

  }, [dataset, activeMetric]);

  return (
    <div className="space-y-6" id="d3-traffic-demo-container">
      {/* Top Banner & Control Strip */}
      <div className="card-level-2 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#a66a12]/10 text-[#a66a12]">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="font-display font-bold text-base text-[#101318] dark:text-white">
              Portfolio Traffic & Recruiter Engagement Analytics
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              D3.js Live Engine
            </span>
          </div>
          <p className="text-xs text-[#5c6472] dark:text-[#8b93a1] mt-1">
            Interactive D3 scale mapping, SVG paths, cubic Bézier interpolation, and simulated visitor funnel dynamics.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Filter */}
          <div className="inline-flex p-1 rounded-lg bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#30363d]" role="group" aria-label="Time range selector">
            {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                id={`traffic-timerange-${range}`}
                aria-pressed={timeRange === range}
                tabIndex={0}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-white dark:bg-[#21262d] text-[#101318] dark:text-white shadow-xs font-bold'
                    : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Metric View Filter */}
          <div className="inline-flex p-1 rounded-lg bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#30363d]" role="group" aria-label="Metric filter selector">
            <button
              id="traffic-metric-all"
              aria-pressed={activeMetric === 'all'}
              tabIndex={0}
              onClick={() => setActiveMetric('all')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeMetric === 'all'
                  ? 'bg-[#a66a12] text-white font-bold'
                  : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
              }`}
            >
              All Funnel
            </button>
            <button
              id="traffic-metric-conversions"
              aria-pressed={activeMetric === 'conversions'}
              tabIndex={0}
              onClick={() => setActiveMetric('conversions')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeMetric === 'conversions'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
              }`}
            >
              Conversions
            </button>
            <button
              id="traffic-metric-downloads"
              aria-pressed={activeMetric === 'downloads'}
              tabIndex={0}
              onClick={() => setActiveMetric('downloads')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                activeMetric === 'downloads'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white'
              }`}
            >
              Downloads
            </button>
          </div>

          {/* Live Simulator Ticker */}
          <button
            id="traffic-live-simulate-btn"
            aria-pressed={isLiveSimulating}
            aria-label="Toggle live traffic simulation stream"
            tabIndex={0}
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              isLiveSimulating
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-white dark:bg-[#161b22] border-[#dfe3e9] dark:border-[#30363d] text-[#101318] dark:text-white hover:border-[#a66a12]'
            }`}
          >
            {isLiveSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Simulating Stream...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#a66a12]" />
                <span>Simulate Live Traffic</span>
              </>
            )}
          </button>

          <button
            id="traffic-reset-btn"
            aria-label="Reset to historical benchmark"
            tabIndex={0}
            onClick={handleResetData}
            title="Reset to historical benchmark"
            className="p-1.5 rounded-lg border border-[#dfe3e9] dark:border-[#30363d] text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 card-level-3">
          <div className="flex items-center justify-between text-[#8b93a1]">
            <span className="text-[11px] font-mono uppercase">Total Visitors</span>
            <Users className="w-3.5 h-3.5 text-[#a66a12]" />
          </div>
          <div className="mt-1 text-xl font-display font-bold text-[#101318] dark:text-white">
            {kpis.totalVisitors.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            +18.4% vs prev {timeRange}
          </div>
        </div>

        <div className="p-3 card-level-3">
          <div className="flex items-center justify-between text-[#8b93a1]">
            <span className="text-[11px] font-mono uppercase">ATS Resumes Grabbed</span>
            <FileDown className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="mt-1 text-xl font-display font-bold text-emerald-600 dark:text-emerald-400">
            {kpis.totalDownloads.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-[#5c6472] dark:text-[#8b93a1] mt-0.5">
            {(kpis.totalDownloads / (dataset.length || 1)).toFixed(1)}/day avg
          </div>
        </div>

        <div className="p-3 card-level-3">
          <div className="flex items-center justify-between text-[#8b93a1]">
            <span className="text-[11px] font-mono uppercase">Recruiter Conversion</span>
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="mt-1 text-xl font-display font-bold text-blue-600 dark:text-blue-400">
            {kpis.convRate}%
          </div>
          <div className="text-[10px] font-mono text-[#5c6472] dark:text-[#8b93a1] mt-0.5">
            High-intent actions
          </div>
        </div>

        <div className="p-3 card-level-3">
          <div className="flex items-center justify-between text-[#8b93a1]">
            <span className="text-[11px] font-mono uppercase">Case Study Depth</span>
            <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="mt-1 text-xl font-display font-bold text-[#101318] dark:text-white">
            {kpis.csPerVisitor} <span className="text-xs font-normal text-[#8b93a1]">per visit</span>
          </div>
          <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 mt-0.5">
            Strong technical retention
          </div>
        </div>
      </div>

      {/* D3 Canvas Card */}
      <div 
        ref={containerRef}
        className="relative p-5 card-level-1 overflow-hidden"
      >
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#a66a12]" />
              <span className="text-[#101318] dark:text-white">Total Visitors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-blue-500 border-t border-dashed" />
              <span className="text-[#101318] dark:text-white">Case Study Reads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-[#101318] dark:text-white">Resume Downloads</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#8b93a1] flex items-center gap-1">
            <MousePointerClick className="w-3 h-3 text-[#a66a12]" />
            Hover chart for point inspection
          </div>
        </div>

        {/* SVG Container */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <svg 
            ref={svgRef} 
            role="img"
            aria-label="Interactive D3.js chart showing portfolio traffic and conversion trends"
            className="w-full select-none" 
          />
        </div>

        {/* Hovered Point Info Card Overlay */}
        {hoveredPoint && (
          <div className="absolute top-16 right-8 p-3 rounded-xl bg-white/95 dark:bg-[#0e1116]/95 backdrop-blur-md border border-[#a66a12]/40 shadow-xl text-xs font-mono pointer-events-none animate-in fade-in duration-100 min-w-[200px]">
            <div className="text-[11px] font-bold text-[#a66a12] border-b border-[#dfe3e9] dark:border-[#30363d] pb-1 mb-1.5 flex items-center justify-between">
              <span>{d3.timeFormat('%A, %B %d, %Y')(hoveredPoint.date)}</span>
              <Calendar className="w-3 h-3 opacity-60" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#5c6472] dark:text-[#8b93a1]">Total Visitors:</span>
                <span className="font-bold text-[#101318] dark:text-white">{hoveredPoint.visitors}</span>
              </div>
              <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                <span>Case Study Views:</span>
                <span className="font-bold">{hoveredPoint.caseStudyViews}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span>Resume Downloads:</span>
                <span className="font-bold">{hoveredPoint.resumeDownloads}</span>
              </div>
              <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 pt-1 border-t border-[#dfe3e9] dark:border-[#30363d]">
                <span>Contact Inquiries:</span>
                <span className="font-bold">{hoveredPoint.contactInquiries}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Technical Footnote on D3 Architecture */}
      <div className="p-4 rounded-xl bg-[#f6f7f9] dark:bg-[#0e1116] border border-[#dfe3e9] dark:border-[#30363d] text-xs text-[#5c6472] dark:text-[#8b93a1] flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[#a66a12] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#101318] dark:text-white font-mono text-[11px] uppercase tracking-wide">
            Under the Hood: Native D3.js Data Pipeline
          </p>
          <p>
            Renders mathematical time-scales with <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#a66a12] font-mono">d3.scaleTime()</code>, smooth monotone curve paths with <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#a66a12] font-mono">d3.curveMonotoneX</code>, dynamic domain rescaling, binary bisector search for low-overhead mouse interactions, and SVG linear gradients.
          </p>
        </div>
      </div>
    </div>
  );
};
