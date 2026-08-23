import React from 'react';
import { Mail, Copy, ArrowUpRight, MapPin, Sparkles, Check, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { SectionAmbientAtmosphere } from './SectionAmbientAtmosphere';

interface ContactSectionProps {
  language?: Language;
  onCopyEmail: () => void;
  onOpenRecruiter: () => void;
  onDownloadFullPortfolio?: () => void;
  motionEnabled?: boolean;
  onToggleMotion?: () => void;
  systemPrefersReducedMotion?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  language = 'en',
  onCopyEmail, 
  onOpenRecruiter,
  onDownloadFullPortfolio,
  motionEnabled = true,
  onToggleMotion,
  systemPrefersReducedMotion = false,
}) => {
  const t = TRANSLATIONS[language]?.contact;

  const downloadFullPortfolioLabel = 
    language === 'de' ? 'Gesamtes Portfolio-PDF herunterladen' :
    language === 'fr' ? 'Télécharger Portfolio Complet (PDF)' :
    language === 'hi' ? 'पूर्ण पोर्टफोलियो PDF डाउनलोड करें' :
    'Download Full Portfolio PDF';

  return (
    <section id="contact" className="section-ambient-container ambient-theme-warm py-16 sm:py-20 border-t border-[#dfe3e9] dark:border-[#262c36] overflow-hidden">
      {/* Thematic Ambient Light Shift (Warm Bronze & Amber Executive Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6 space-y-12">
        {/* Currently Exploring Banner */}
        <div className="card-level-2 p-6 sm:p-8">
          <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase mb-2">
            {t?.exploringLabel || "08 · CURRENTLY EXPLORING"}
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#101318] dark:text-white mb-2">
            {t?.exploringHeading || "Business Analyst · Data Analyst · Product Analyst · Data Engineer · AI/ML Engineer"}
          </h3>
          <p className="text-sm text-[#5c6472] dark:text-[#9ea7b4] leading-relaxed max-w-3xl">
            {t?.exploringCopy || "Open to full-time roles, graduate opportunities, and analytics positions where business problems, product thinking, and technical execution intersect."}
          </p>
        </div>

        {/* Contact Card */}
        <div className="card-level-1 p-8 sm:p-12 !bg-[#111419]/90 dark:!bg-[#131823]/80 backdrop-blur-xl text-white border-[#262c36] dark:border-white/[0.12] shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#d8a34f] tracking-widest uppercase">
              {t?.contactLabel || "09 · CONTACT"}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight">
              {t?.contactHeading || "Let's build something useful together."}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#c6cad1] font-mono pt-1">
              <MapPin className="w-4 h-4 text-[#d8a34f]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {onDownloadFullPortfolio && (
              <button
                id="contact-download-full-portfolio-btn"
                onClick={onDownloadFullPortfolio}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#a66a12] to-[#b45309] hover:from-[#925c0e] hover:to-[#9a4308] text-white font-mono text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
              >
                <FileDown className="w-4 h-4" />
                <span>{downloadFullPortfolioLabel}</span>
              </button>
            )}

            <a
              href={PERSONAL_INFO.links.email}
              id="contact-email-action"
              className="btn-primary px-5 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <Mail className="w-4 h-4 text-[#a66a12] dark:text-[#fbbf24]" />
              <span>{t?.emailMe || "Email me"}</span>
            </a>

            <button
              id="contact-copy-email-btn"
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-mono transition-all cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <Copy className="w-4 h-4 text-[#fbbf24]" />
              <span>{t?.copyEmail || "Copy email"}</span>
            </button>

            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#e2e8f0] hover:text-white text-sm font-mono transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#e2e8f0] hover:text-white text-sm font-mono transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8b93a1]">
          <div>© 2026 {PERSONAL_INFO.name}. All rights reserved.</div>
          
          {onToggleMotion && (
            <button
              id="footer-motion-toggle-btn"
              role="switch"
              aria-checked={motionEnabled}
              aria-label={motionEnabled ? "Pause neural background animations (reduce motion)" : "Enable neural background animations"}
              onClick={onToggleMotion}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300/80 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#d98b18] focus-visible:outline-none"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${motionEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>Animations: {motionEnabled ? 'Active' : 'Paused (Reduced Motion)'}</span>
              {systemPrefersReducedMotion && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">(OS Default)</span>
              )}
            </button>
          )}

          <div className="text-right">Data → Insight → Decision → Impact</div>
        </footer>
      </div>
    </section>
  );
};
