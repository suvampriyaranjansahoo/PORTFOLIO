import React, { useRef, useState, ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  featured?: boolean;
  glowColor?: string;
  onClick?: () => void;
  id?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  containerClassName = '',
  featured = false,
  glowColor = 'rgba(216, 163, 79, 0.45)',
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

    // Enhanced 3D perspective tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Up to 8 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 8;

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
          ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(16px) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'transform',
        isolation: 'isolate',
      }}
      className={`relative rounded-2xl group holo-border-active p-[2px] shadow-lg transition-all duration-300 ${
        isColSpan2 ? 'md:col-span-2' : ''
      } ${containerClassName}`}
    >
      {/* Specular Radial Spotlight Beam on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30 overflow-hidden"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 70%)`
            : 'none',
        }}
      />

      {/* Top Edge Metallic Specular Golden Highlight */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Technical Corner HUD Brackets for Precision Analytics Aesthetics */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-500/80 dark:border-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-500/80 dark:border-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-500/80 dark:border-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-500/80 dark:border-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

      {/* Card Content Container with 3D Depth and Glass Morphism */}
      <div 
        className={`relative z-10 w-full h-full rounded-[14px] glass-morphism-card overflow-hidden ${cleanClassName}`}
        style={{ transform: 'translateZ(12px)' }}
      >
        {children}
      </div>
    </div>
  );
};
