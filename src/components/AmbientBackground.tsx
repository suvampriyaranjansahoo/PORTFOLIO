import React, { useEffect, useState } from 'react';
import { ConstellationCanvas } from './ConstellationCanvas';

export const AmbientBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 30 });

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

    const updatePosition = () => {
      // Smooth interpolation for fluid cinematic following
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Blueprint Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.065] transition-opacity duration-700"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0),
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 0, 0 0',
          color: 'var(--grid-color, #101318)',
        }}
      />

      {/* 2. Interactive Neural Particle Constellation Canvas */}
      <ConstellationCanvas />

      {/* 3. Interactive Spotlight that tracks the cursor fluidly */}
      <div
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-30 dark:opacity-20 transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: 'radial-gradient(circle, rgba(216, 163, 79, 0.45) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* 3. Deep Ambient Aurora Waves (Soft drifting glows) */}
      <div className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-amber-400/10 via-orange-500/5 to-transparent blur-[160px] animate-pulse-slow" />
      <div className="absolute top-[35%] -right-[15%] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-[180px] animate-float-slow" />
      <div className="absolute -bottom-[20%] left-[25%] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-amber-600/8 via-sky-500/5 to-transparent blur-[190px]" />

      {/* 4. Engineering Grid Diagonal Cross-hair Lines (Subtle Framing) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(166,106,18,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(216,163,79,0.08),rgba(0,0,0,0))]" />
    </div>
  );
};
