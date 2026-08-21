import React, { useEffect, useRef } from 'react';

interface KineticHeadlineProps {
  text: string;
  className?: string;
  accentChar?: string;
  accentClass?: string;
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  className = '',
  accentChar = '.',
  accentClass = 'text-[#a66a12] dark:text-amber-400',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll<HTMLSpanElement>('span.kinetic-char');

    const handleMouseMove = (e: MouseEvent) => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120; // magnetic influence radius

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const moveX = -dx * force * 0.38;
          const moveY = -dy * force * 0.38;
          letter.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        } else {
          letter.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    };

    const handleMouseLeave = () => {
      letters.forEach((letter) => {
        letter.style.transform = 'translate3d(0, 0, 0)';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <h1 
      ref={containerRef} 
      className={`flex flex-wrap select-none font-display font-bold text-3xl xs:text-4xl sm:text-6xl lg:text-7xl tracking-[-0.035em] leading-[1.06] ${className}`}
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {text.split(' ').map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap mr-2.5 sm:mr-4 last:mr-0">
          {word.split('').map((char, charIdx) => {
            const isAccent = char === accentChar;
            return (
              <span
                key={charIdx}
                className={`kinetic-char inline-block transition-transform duration-100 ease-out ${
                  isAccent ? accentClass : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};
