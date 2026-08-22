import { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

/**
 * useButtonSparkles
 *
 * Implements a subtle, lightweight 'sparkle' particle effect that triggers
 * on the pointer when hovering over primary action buttons (.btn-primary, [data-sparkle-btn]).
 *
 * Features:
 * - Ultra-lightweight particle system rendered to a dedicated transparent pointer overlay canvas.
 * - Spawns delicate diamond starlets and radiant micro-shimmers in amber gold, electric cyan, and diamond white.
 * - Eases out quickly (300ms - 450ms lifespan) with power-curved decay.
 * - 0% CPU consumption when idle (RAF only loops while active particles exist).
 * - Gracefully respects prefers-reduced-motion and motion toggles.
 */
export function useButtonSparkles(motionEnabled: boolean = true) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const isRunningRef = useRef(false);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !isFinePointer || !motionEnabled) {
      // Remove canvas if present
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
        canvasRef.current = null;
      }
      return;
    }

    // Create global fixed sparkle overlay canvas if not existing
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'button-sparkle-overlay';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
      canvasRef.current = canvas;
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPARKLE_COLORS = [
      'rgba(245, 158, 11, ',   // Warm Gold
      'rgba(251, 191, 36, ',   // Solar Amber
      'rgba(56, 189, 248, ',   // Cyan Shimmer
      'rgba(255, 255, 255, ',  // Diamond White
    ];

    const spawnSparkles = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < 45) return; // Throttled to ~22 spawns/sec max
      lastSpawnRef.current = now;

      const count = 2 + Math.floor(Math.random() * 2); // 2-3 particles per spawn
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.0;
        const colorPrefix = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const maxLife = 18 + Math.floor(Math.random() * 10); // ~300ms - 460ms

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2, // slight upward float
          size: 1.8 + Math.random() * 1.8,
          maxLife,
          life: maxLife,
          color: colorPrefix,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.15,
        });
      }

      // Cap active particle count for ultra-lightweight performance
      if (particlesRef.current.length > 24) {
        particlesRef.current.splice(0, particlesRef.current.length - 24);
      }

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        requestAnimationFrame(renderLoop);
      }
    };

    const drawDiamondStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      rot: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(rot);
      context.beginPath();
      
      const step = Math.PI / spikes;
      for (let i = 0; i < 2 * spikes; i++) {
        const r = (i % 2 === 0) ? outerRadius : innerRadius;
        const currAngle = i * step;
        const x = Math.cos(currAngle) * r;
        const y = Math.sin(currAngle) * r;
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
      
      context.fillStyle = `${color}${alpha.toFixed(3)})`;
      context.shadowColor = `${color}0.8)`;
      context.shadowBlur = outerRadius * 1.8;
      context.fill();
      context.restore();
    };

    const renderLoop = () => {
      if (!canvas || !ctx) {
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.rotation += p.rotSpeed;
        p.life--;

        const progress = Math.max(0, p.life / p.maxLife);
        const alpha = Math.pow(progress, 1.4);
        const currentSize = p.size * (0.4 + 0.6 * progress);

        // Draw 4-pointed sparkle starlet
        drawDiamondStar(
          ctx,
          p.x,
          p.y,
          4,
          currentSize,
          currentSize * 0.28,
          p.rotation,
          p.color,
          alpha * 0.85
        );
      }

      particlesRef.current = particles.filter((p) => p.life > 0);

      if (particlesRef.current.length > 0) {
        requestAnimationFrame(renderLoop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        '.btn-primary, [data-sparkle-btn], .btn-primary-action'
      );
      if (target) {
        spawnSparkles(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
        canvasRef.current = null;
      }
      particlesRef.current = [];
      isRunningRef.current = false;
    };
  }, [motionEnabled]);
}
