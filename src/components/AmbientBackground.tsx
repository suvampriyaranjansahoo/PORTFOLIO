import React, { useEffect, useState } from 'react';
import { DeepDataUniverseCanvas } from './DeepDataUniverseCanvas';

export const AmbientBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 30 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 50;
    let targetY = 30;
    let currentX = 50;
    let currentY = 30;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    const updatePosition = () => {
      // Smooth interpolation for fluid cinematic following
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Midnight Base Void & Ambient Spatial Gradient Canvas */}
      <div className="absolute inset-0 bg-[#f4f6fb] dark:bg-[#050811] transition-colors duration-500" />

      {/* 2. Volumetric Deep Blue-Violet Atmospheric Light Fields */}
      <div 
        className="absolute -top-[10%] left-[10%] w-[900px] h-[900px] rounded-full blur-[180px] opacity-40 dark:opacity-30 pointer-events-none transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(139, 92, 246, 0.12) 40%, rgba(5, 8, 17, 0) 75%)',
          transform: `translateY(${scrollProgress * 0.25}px)`
        }}
      />
      <div 
        className="absolute top-[30%] -right-[10%] w-[850px] h-[850px] rounded-full blur-[200px] opacity-35 dark:opacity-25 pointer-events-none transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(56, 189, 248, 0.1) 45%, rgba(5, 8, 17, 0) 75%)',
          transform: `translateY(-${scrollProgress * 0.2}px)`
        }}
      />
      <div 
        className="absolute top-[65%] -left-[15%] w-[800px] h-[800px] rounded-full blur-[190px] opacity-30 dark:opacity-20 pointer-events-none transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(5, 8, 17, 0) 75%)',
          transform: `translateY(${scrollProgress * 0.15}px)`
        }}
      />
      <div 
        className="absolute -bottom-[10%] right-[15%] w-[750px] h-[750px] rounded-full blur-[180px] opacity-25 dark:opacity-20 pointer-events-none transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(216, 163, 79, 0.15) 0%, rgba(168, 85, 247, 0.08) 45%, rgba(5, 8, 17, 0) 75%)',
        }}
      />

      {/* 3. Localized Dynamic Spotlight tracking cursor without visual glare */}
      <div
        className="absolute w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25 dark:opacity-20 transition-transform duration-150 ease-out pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(56, 189, 248, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* 4. Sub-pixel Analytical Cartesian Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0),
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 48px 48px, 48px 48px',
          backgroundPosition: '0 0, 0 0, 0 0',
          color: 'var(--grid-color, #6366f1)',
        }}
      />

      {/* 5. Spatial 3D Deep Data Universe Canvas (Crystalline geometry, data currents, orbital rings) */}
      <DeepDataUniverseCanvas />

      {/* 6. Microscopic Mathematical Telemetry & Analytical Markings in Margins */}
      <div className="absolute inset-0 pointer-events-none font-mono text-[9px] text-indigo-400/10 dark:text-indigo-400/15 overflow-hidden select-none">
        <span className="absolute top-12 left-8 hidden lg:block tracking-widest">
          SYS.MAT::[RICE = (R·I·C)/E] · DIM_768
        </span>
        <span className="absolute top-36 right-8 hidden lg:block tracking-widest">
          ∇L(θ) = E[x·(y - ŷ)] · AUC=0.857
        </span>
        <span className="absolute top-[48%] left-6 hidden xl:block tracking-widest">
          LAT: 12ms · AZURE_STREAM_DAG_0x4F
        </span>
        <span className="absolute top-[68%] right-8 hidden xl:block tracking-widest">
          SHAP_WATERFALL::[+0.428 RE/TA]
        </span>
        <span className="absolute bottom-16 left-10 hidden lg:block tracking-widest">
          COHORT_MATRIX::R4_F4_M5 · CLV_OPT
        </span>
      </div>

      {/* 7. Subtle Edge Refraction & Vignette Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,transparent_60%,rgba(5,8,17,0.4)_100%)] dark:bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,transparent_60%,rgba(5,8,17,0.75)_100%)] pointer-events-none" />
    </div>
  );
};

