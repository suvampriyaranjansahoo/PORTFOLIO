import React from 'react';

export interface SectionAmbientAtmosphereProps {
  className?: string;
  themeClass?: string;
  showCenterBlob?: boolean;
}

/**
 * SectionAmbientAtmosphere
 * Renders high-performance, GPU-accelerated ambient light fields that dynamically inherit
 * the section's unique CSS variables (--section-ambient-primary, --section-ambient-secondary, etc.).
 * Pauses automatically when prefers-reduced-motion is active.
 */
export const SectionAmbientAtmosphere: React.FC<SectionAmbientAtmosphereProps> = React.memo(({
  className = '',
  themeClass = '',
  showCenterBlob = true,
}) => {
  return (
    <div 
      className={`section-ambient-glow ${themeClass} ${className}`}
      aria-hidden="true"
    >
      {/* Primary Ambient Light Nebula (Top-Right drifting) */}
      <div className="section-ambient-blob section-ambient-blob-1" />

      {/* Secondary Ambient Light Core (Bottom-Left drifting) */}
      <div className="section-ambient-blob section-ambient-blob-2" />

      {/* Midground Harmonic Accent Glow */}
      {showCenterBlob && (
        <div className="section-ambient-blob section-ambient-blob-3" />
      )}
    </div>
  );
});
