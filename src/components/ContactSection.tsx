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
    <section id="contact" className="section-ambient-container ambient-theme-warm py-16 sm:py-20 border-t border-[#fecdd3] dark:border-[#262c36] overflow-hidden">
      {/* Thematic Ambient Light Shift (Warm Bronze & Rose Quartz Executive Glow) */}
      <SectionAmbientAtmosphere />

      <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-6 space-y-12">
        {/* Currently Exploring Banner */}
        <div className="card-level-2 p-6 sm:p-8 bg-white/95 dark:bg-[#141924]/90 border border-[#fecdd3] dark:border-white/10">
          <div className="font-mono text-xs text-[#e11d48] dark:text-[#fbbf24] font-bold tracking-widest uppercase mb-2">
            {t?.exploringLabel || "08 · CURRENTLY EXPLORING"}
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2d151c] dark:text-white mb-2 leading-snug">
            {t?.exploringHeading || "Business Analyst · Data Analyst · Product Analyst · Data Engineer · AI/ML Engineer"}
          </h3>
          <p className="text-sm sm:text-base text-[#5e3240] dark:text-[#9ea7b4] leading-relaxed max-w-3xl font-medium">
            {t?.exploringCopy || "Open to full-time roles, graduate opportunities, and analytics positions where business problems, product thinking, and technical execution intersect."}
          </p>
        </div>

        {/* Contact & PDF Dossier Action Card */}
        <div className="card-level-1 p-8 sm:p-12 bg-white/95 dark:bg-[#131823]/90 backdrop-blur-xl border border-[#fecdd3] dark:border-white/[0.12] shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="font-mono text-xs font-bold text-[#e11d48] dark:text-[#fbbf24] tracking-widest uppercase">
              {t?.contactLabel || "09 · CONTACT & VERIFICATION"}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-[#2d151c] dark:text-white">
              {t?.contactHeading || "Let's build something useful together."}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#5e3240] dark:text-rose-200/90 font-mono font-medium pt-1">
              <MapPin className="w-4 h-4 text-[#e11d48] dark:text-rose-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onDownloadFullPortfolio && (
              <button
                id="contact-download-full-portfolio-btn"
                onClick={onDownloadFullPortfolio}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#e11d48] via-[#d91e46] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white font-mono text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
              >
                <FileDown className="w-4 h-4" />
                <span>{downloadFullPortfolioLabel}</span>
              </button>
            )}

            <a
              href={PERSONAL_INFO.links.email}
              id="contact-email-action"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-semibold font-mono transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>{t?.emailMe || "Email me"}</span>
            </a>

            <button
              id="contact-copy-email-btn"
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#fff5f7] dark:bg-white/10 hover:bg-[#ffe4e9] dark:hover:bg-white/15 border border-[#fecdd3] dark:border-white/20 text-[#2d151c] dark:text-white text-sm font-mono font-semibold transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <Copy className="w-4 h-4 text-[#e11d48] dark:text-rose-300" />
              <span>{t?.copyEmail || "Copy email"}</span>
            </button>

            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-[#fff5f7] dark:bg-white/10 hover:bg-[#ffe4e9] dark:hover:bg-white/15 border border-[#fecdd3] dark:border-white/20 text-[#2d151c] hover:text-[#e11d48] dark:text-[#e2e8f0] dark:hover:text-white text-sm font-mono font-semibold transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#e11d48] dark:text-inherit" />
            </a>

            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-[#fff5f7] dark:bg-white/10 hover:bg-[#ffe4e9] dark:hover:bg-white/15 border border-[#fecdd3] dark:border-white/20 text-[#2d151c] hover:text-[#e11d48] dark:text-[#e2e8f0] dark:hover:text-white text-sm font-mono font-semibold transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#131823] focus-visible:outline-none"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#e11d48] dark:text-inherit" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#5e3240] dark:text-[#8b93a1] font-medium">
          <div>© 2026 {PERSONAL_INFO.name}. All rights reserved.</div>
          
          {onToggleMotion && (
            <button
              id="footer-motion-toggle-btn"
              role="switch"
              aria-checked={motionEnabled}
              aria-label={motionEnabled ? "Pause neural background animations (reduce motion)" : "Enable neural background animations"}
              onClick={onToggleMotion}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#fecdd3] dark:border-white/10 bg-[#fff5f7] dark:bg-white/5 hover:bg-[#ffe4e9] dark:hover:bg-white/10 text-[#2d151c] dark:text-slate-300 font-medium transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:outline-none"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${motionEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'}`} />
              <span>Animations: {motionEnabled ? 'Active' : 'Paused (Reduced Motion)'}</span>
              {systemPrefersReducedMotion && (
                <span className="text-[10px] text-[#e11d48] dark:text-amber-400 font-mono font-semibold">(OS Default)</span>
              )}
            </button>
          )}

          <div className="text-right">Data → Insight → Decision → Impact</div>
        </footer>
      </div>
    </section>
  );
};
