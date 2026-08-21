import React, { useRef, useState, ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  featured?: boolean;
  glowColor?: string;
  edgeLighting?: boolean;
  onClick?: () => void;
  id?: string;
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
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Separate col-span classes if passed in className
  const isColSpan2 = className.includes('md:col-span-2') || containerClassName.includes('md:col-span-2');
  const cleanClassName = className.replace('md:col-span-2', '').trim();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoords({ x, y });

    // Subtle, elegant 3D perspective tilt (bounded to +/- 6.5 degrees for premium feel)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

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
          ? `perspective(1100px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(18px) translateY(-6px)`
          : 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        isolation: 'isolate',
      }}
      className={`relative rounded-[1.25rem] group holo-border-active p-[1.5px] shadow-xl transition-all duration-300 ${
        isColSpan2 ? 'md:col-span-2' : ''
      } ${containerClassName}`}
    >
      {/* Soft Ambient Dynamic Glow Following Cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30 overflow-hidden"
        style={{
          background: isHovered
            ? `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${glowColor}, rgba(168, 85, 247, 0.12) 40%, transparent 75%)`
            : 'none',
        }}
      />

      {/* Top Specular Metallic Purple-to-Blue Highlight */}
      {edgeLighting && (
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400/60 via-purple-400/70 via-sky-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-25 pointer-events-none" />
      )}

      {/* Subtle Corner Geometric Glass Accents */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-indigo-400/50 dark:border-indigo-400/40 opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-20" />

      {/* Floating Glassmorphic Pane with Layered 3D Depth */}
      <div 
        className={`relative z-10 w-full h-full rounded-[calc(1.25rem-1.5px)] glass-morphism-card overflow-hidden ${cleanClassName}`}
        style={{ transform: 'translateZ(14px)' }}
      >
        {/* Realistic Diagonal Glass Sheen Reflection */}
        <div className="glass-reflection-sheen" />

        {/* Dynamic Light Sheen Reacting to Cursor X Position */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: isHovered 
              ? `linear-gradient(${115 + (coords.x / 40)}deg, rgba(255, 255, 255, 0.07) 0%, transparent 60%)` 
              : 'none'
          }}
        />

        {/* Inner Card Content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

