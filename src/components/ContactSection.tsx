import React from 'react';
import { Mail, Copy, ArrowUpRight, MapPin, Sparkles, Check, Coffee } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';
import { AnimatedCoffeeWidget } from './AnimatedCoffeeWidget';

interface ContactSectionProps {
  language?: Language;
  onCopyEmail: () => void;
  onOpenRecruiter: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  language = 'en',
  onCopyEmail, 
  onOpenRecruiter 
}) => {
  const t = TRANSLATIONS[language]?.contact;

  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-[#dfe3e9] dark:border-[#262c36]">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6 space-y-12">
        {/* Currently Exploring Banner */}
        <div className="holo-border-active p-[1.5px] rounded-3xl shadow-xl">
          <div className="p-6 sm:p-8 rounded-[calc(1.5rem-1.5px)] glass-morphism-card">
            <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">
              {t?.exploringLabel || "08 · CURRENTLY EXPLORING"}
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-2">
              {t?.exploringHeading || "Business Analyst · Data Analyst · Product Analyst · Data Engineer · AI/ML Engineer"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {t?.exploringCopy || "Open to full-time roles, graduate opportunities, and analytics positions where business problems, product thinking, and technical execution intersect."}
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="holo-border-active p-[1.5px] rounded-[2rem] shadow-2xl">
          <div className="relative overflow-hidden p-8 sm:p-12 rounded-[calc(2rem-1.5px)] glass-morphism-card text-white flex flex-col md:flex-row md:items-end justify-between gap-8 group">
            {/* Ghost watermark index */}
            <div className="ghost-watermark select-none text-white/[0.03] group-hover:scale-105 transition-transform duration-300">
              09
            </div>

            <div className="space-y-4 relative z-10 max-w-xl">
              <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
                {t?.contactLabel || "09 · CONTACT & INITIATION"}
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-slate-900 dark:text-white">
                {t?.contactHeading || "Let's build something useful together."}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-mono pt-1">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 relative z-10">
              <a
                href={PERSONAL_INFO.links.email}
                id="contact-email-action"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 group/btn"
              >
                <Mail className="w-4 h-4" />
                <span>{t?.emailMe || "Email me"}</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover/btn:rotate-45 transition-transform duration-300">
                  ↗
                </div>
              </a>

              <button
                id="contact-copy-email-btn"
                onClick={onCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-mono hover:border-indigo-500/50 transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>{t?.copyEmail || "Copy email"}</span>
              </button>

              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white text-sm font-mono transition-colors group/link"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white text-sm font-mono transition-colors group/link"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll-Driven Animated Coffee & Project Hours Productivity Widget */}
        <AnimatedCoffeeWidget totalHours={1480} />

        {/* Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8b93a1]">
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}. All rights reserved.</span>
            <span className="hidden sm:inline text-[#dfe3e9] dark:text-[#262c36]">·</span>
            <a 
              href="#about" 
              className="inline-flex items-center gap-1 text-[#a66a12] dark:text-amber-400 hover:underline"
              title="View Coffee Fuel Telemetry"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Fuel Engine Active</span>
            </a>
          </div>
          <div className="text-right">Data → Insight → Decision → Impact</div>
        </footer>
      </div>
    </section>
  );
};
