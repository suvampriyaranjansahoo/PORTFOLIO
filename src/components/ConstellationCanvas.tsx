import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  layer: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number; isHovering: boolean }>({
    x: -1000,
    y: -1000,
    radius: 220,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Color palette: Vivid Amber Gold, Electric Cyan, Neon Indigo, Warm Yellow
    const colors = [
      'rgba(216, 163, 79,',   // Gold
      'rgba(245, 158, 11,',   // Vivid Amber
      'rgba(56, 189, 248,',   // Cyan
      'rgba(129, 140, 248,',  // Electric Indigo
      'rgba(251, 191, 36,',   // Bright Sun
    ];

    let particles: Particle[] = [];
    const particleCount = Math.min(110, Math.max(55, Math.floor((width * height) / 13000)));

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const layer = Math.random() < 0.35 ? 1 : Math.random() < 0.7 ? 2 : 3;
        const baseRadius = layer === 1 ? Math.random() * 2.5 + 2.2 : layer === 2 ? Math.random() * 1.8 + 1.2 : Math.random() * 1.2 + 0.8;
        const speed = layer === 1 ? 0.6 : layer === 2 ? 0.4 : 0.2;
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: baseRadius,
          baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: layer === 1 ? 0.85 : layer === 2 ? 0.55 : 0.35,
          layer,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Radar scanline sweep
    let scanY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radar scanline sweep line across the grid
      scanY += 1.2;
      if (scanY > height + 80) scanY = -80;
      
      const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY);
      scanGrad.addColorStop(0, 'rgba(216, 163, 79, 0)');
      scanGrad.addColorStop(0.5, 'rgba(216, 163, 79, 0.04)');
      scanGrad.addColorStop(1, 'rgba(245, 158, 11, 0.12)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 80, width, 80);

      const mouse = mouseRef.current;

      // 1. Draw connecting constellation filaments between adjacent nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = p1.layer === 1 || p2.layer === 1 ? 160 : 120;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.35 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(216, 163, 79, ${lineAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      // 2. Update & Draw Particles with Mouse Laser Tethering
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Wrap boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius && mouse.isHovering) {
          // Connect to mouse cursor with golden laser filament
          const mAlpha = (1 - mDist / mouse.radius) * 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${mAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Magnetic gentle attraction
          const force = (1 - mDist / mouse.radius) * 2.2;
          p.x += (mdx / mDist) * force;
          p.y += (mdy / mDist) * force;
          p.radius = p.baseRadius * 1.8;
        } else {
          // Gentle pulsing radius
          const pulse = Math.sin(p.pulsePhase) * 0.35 + 1;
          p.radius = p.baseRadius * pulse;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = 'rgba(216, 163, 79, 0.7)';
        ctx.shadowBlur = p.layer === 1 ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-90 dark:opacity-100 transition-opacity"
    />
  );
};
