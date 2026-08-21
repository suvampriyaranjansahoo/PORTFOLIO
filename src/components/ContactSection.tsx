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
        {/* Contact Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#151920] border border-[#dfe3e9] dark:border-[#262c36] shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="font-mono text-xs text-[#a66a12] tracking-widest uppercase">
              {t?.contactLabel || "09 · CONTACT & INITIATION"}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-[#101318] dark:text-white">
              {t?.contactHeading || "Let's build something useful together."}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#5c6472] dark:text-[#8b93a1] font-mono pt-1">
              <MapPin className="w-4 h-4 text-[#a66a12]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={PERSONAL_INFO.links.email}
              id="contact-email-action"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101318] dark:bg-white text-white dark:text-[#101318] font-semibold text-sm hover:opacity-90 transition-all shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>{t?.emailMe || "Email me"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              id="contact-copy-email-btn"
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#f6f7f9] dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#262c36] text-[#101318] dark:text-white text-sm font-mono hover:border-[#a66a12] transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-[#a66a12]" />
              <span>{t?.copyEmail || "Copy email"}</span>
            </button>

            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#f6f7f9] dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#262c36] text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white text-sm font-mono transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#f6f7f9] dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#262c36] text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white text-sm font-mono transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#f6f7f9] dark:bg-[#1a1f28] border border-[#dfe3e9] dark:border-[#262c36] text-[#5c6472] dark:text-[#8b93a1] hover:text-[#101318] dark:hover:text-white text-sm font-mono transition-colors"
            >
              <span>{PERSONAL_INFO.phone}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
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
