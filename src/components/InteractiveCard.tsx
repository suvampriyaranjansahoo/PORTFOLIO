import React, { useRef, useState, useCallback, useEffect, ReactNode } from 'react';
import { inspectAncestorLayoutContext, GlassDiagnosticReport } from '../utils/gpuClippingDiagnostic';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  featured?: boolean;
  glowColor?: string;
  edgeLighting?: boolean;
  onClick?: () => void;
  id?: string;
  debug?: boolean;
  renderSpatialPreview?: (isHovered: boolean, coords: { x: number; y: number }) => ReactNode;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  containerClassName = '',
  featured = false,
  glowColor = 'rgba(99, 102, 241, 0.25)',
  edgeLighting = true,
  onClick,
  id,
  debug: propDebug = false,
  renderSpatialPreview,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [normalized, setNormalized] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDebugMode, setIsDebugMode] = useState<boolean>(propDebug);
  const [diagnosticReport, setDiagnosticReport] = useState<GlassDiagnosticReport | null>(null);

  // Global toggle listener for diagnostic mode (Ctrl+Shift+D or Alt+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') || (e.altKey && e.key.toLowerCase() === 'd')) {
        setIsDebugMode((prev) => !prev);
      }
    };

    // Check URL parameters for ?glassdebug=1
    if (typeof window !== 'undefined' && window.location.search.includes('glassdebug')) {
      setIsDebugMode(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Run GPU Clipping & Ancestor Stacking Context Diagnostic Check
  useEffect(() => {
    if (cardInnerRef.current) {
      const report = inspectAncestorLayoutContext(cardInnerRef.current);
      setDiagnosticReport(report);
    }
  }, []);

  // Separate col-span classes if passed in className
  const isColSpan2 = className.includes('md:col-span-2') || containerClassName.includes('md:col-span-2');
  const cleanClassName = className.replace('md:col-span-2', '').trim();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate local mouse position within the card
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      if (cardRef.current) {
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }

      // Calculate exact card center point
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate normalized delta coordinates (-1 to 1) from the center point
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      setCoords({ x, y });
      setNormalized({ x: deltaX, y: deltaY });

      // Calculate precision rotation angles from center
      const maxTilt = 5.5;
      const rotateX = -deltaY * maxTilt;
      const rotateY = deltaX * maxTilt;

      setRotate({ x: rotateX, y: rotateY });
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setNormalized({ x: 0, y: 0 });
  };

  const debugClass = isDebugMode
    ? diagnosticReport?.hasClippingHazard
      ? 'border-debug-warning'
      : 'border-debug-pass'
    : '';

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1200px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(16px) translateY(-6px)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        transformStyle: 'preserve-3d',
        transition: isHovered 
          ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease' 
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        willChange: isHovered ? 'transform' : 'auto',
        isolation: 'isolate',
        ['--mouse-x' as string]: `${coords.x}px`,
        ['--mouse-y' as string]: `${coords.y}px`,
      } as React.CSSProperties}
      className={`relative rounded-[1.5rem] group holo-border-active p-[1.5px] transition-all duration-300 ${
        isColSpan2 ? 'md:col-span-2' : ''
      } ${containerClassName}`}
    >
      {/* Diagnostic Overlay HUD when Debug Mode is active */}
      {isDebugMode && diagnosticReport && (
        <div className="absolute -top-7 left-3 z-50 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur-md border border-sky-400/40 text-[9px] font-mono text-sky-300 shadow-lg pointer-events-none select-none">
          <span className={`w-1.5 h-1.5 rounded-full ${diagnosticReport.hasClippingHazard ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
          <span>GPU-CTX: {diagnosticReport.ancestorCount} ANC</span>
          <span className="text-slate-500">|</span>
          <span>BLUR: {diagnosticReport.computedBackdropFilter !== 'none' ? 'ACTIVE' : 'OFF'}</span>
          {diagnosticReport.hasClippingHazard && (
            <span className="text-rose-400 font-bold ml-1">CLIP HAZARD</span>
          )}
        </div>
      )}

      {/* 1. Ambient Radial Glow Expanding Behind Card */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10 blur-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${coords.x + 24}px ${coords.y + 24}px, ${
                featured ? 'rgba(99, 102, 241, 0.28)' : glowColor
              }, rgba(168, 85, 247, 0.14) 45%, rgba(56, 189, 248, 0.08) 70%, transparent 85%)`
            : 'none',
        }}
      />

      {/* 2. Top Specular Metallic Edge Illumination */}
      {edgeLighting && (
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400/80 via-purple-400/90 via-sky-400/80 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none" />
      )}

      {/* 3. Subtle Corner Geometric Glass Reticles */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-25" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-25" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-25" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-25" />

      {/* 4. Primary Smoked Glass Shell */}
      <div 
        ref={cardInnerRef}
        data-z-index={diagnosticReport?.computedZIndex || '10'}
        data-blur-status={diagnosticReport?.computedBackdropFilter !== 'none' ? 'OK' : 'OFF'}
        className={`relative z-10 w-full h-full rounded-[calc(1.5rem-1.5px)] glass-morphism-card flex flex-col justify-between ${debugClass} ${cleanClassName}`}
        style={{ 
          transform: 'translateZ(14px)',
          transformStyle: 'preserve-3d',
          ['--mouse-x' as string]: `${coords.x}px`,
          ['--mouse-y' as string]: `${coords.y}px`,
        } as React.CSSProperties}
      >
        {/* Dynamic Light Field / Glass Caustics */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"
          style={{
            borderRadius: 'inherit',
            background: isHovered 
              ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.08) 35%, rgba(56, 189, 248, 0.04) 65%, transparent 80%)`
              : 'none'
          }}
        />

        {/* Viewing Angle Shifting Holographic Diagonal Sheen */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-300 z-20"
          style={{
            borderRadius: 'inherit',
            background: isHovered 
              ? `linear-gradient(${120 + normalized.x * 25}deg, rgba(255, 255, 255, 0.12) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 65%)` 
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, transparent 50%)'
          }}
        />

        {/* Secondary Glass Substrate Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0 rounded-[inherit]" />

        {/* Spatial Preview Interface (if provided) with Parallax Depth Separation */}
        {renderSpatialPreview && (
          <div 
            className="relative z-20 mb-4 transition-transform duration-200"
            style={{
              transform: isHovered 
                ? `translateZ(28px) translateX(${normalized.x * 4}px) translateY(${normalized.y * 3}px)`
                : 'translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {renderSpatialPreview(isHovered, coords)}
          </div>
        )}

        {/* Recessed / Floating Inner Content */}
        <div 
          className="relative z-10 w-full flex-1 flex flex-col justify-between"
          style={{
            transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
