import React from 'react';
import { Mail, Copy, ArrowUpRight, MapPin, Sparkles, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, TRANSLATIONS } from '../data/translations';

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
        <div className="card-level-1 p-8 sm:p-12 !bg-[#111419] dark:!bg-[#131823]/95 text-white border-[#262c36] dark:border-white/[0.1] shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-8">
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

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <a
              href={PERSONAL_INFO.links.email}
              id="contact-email-action"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#101318] font-semibold text-sm hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#a66a12]" />
              <span>{t?.emailMe || "Email me"}</span>
            </a>

            <button
              id="contact-copy-email-btn"
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#212630] border border-[#303846] text-white text-sm font-mono hover:bg-[#2c3340] transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-[#d8a34f]" />
              <span>{t?.copyEmail || "Copy email"}</span>
            </button>

            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#212630] border border-[#303846] text-[#c6cad1] hover:text-white text-sm font-mono hover:bg-[#2c3340] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#212630] border border-[#303846] text-[#c6cad1] hover:text-white text-sm font-mono hover:bg-[#2c3340] transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8b93a1]">
          <div>© 2026 {PERSONAL_INFO.name}. All rights reserved.</div>
          <div className="text-right">Data → Insight → Decision → Impact</div>
        </footer>
      </div>
    </section>
  );
};
