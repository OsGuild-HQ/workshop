import React from 'react';
import { Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-soft)] py-12 mt-16">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          {/* Group 1: Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-heading font-bold text-lg text-[var(--color-ink)]">
              GENESIS WORKSHOP
            </span>
            <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">
              Clean digital infrastructure, built from first principles.
            </p>
          </div>

          {/* Group 2: Organized By */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-orange)]">
              // Organized By
            </span>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-ink)] font-mono">
              <span>OSGuild</span>
              <span>BitDevs Mauritius</span>
              <a href="#lunch" className="text-[var(--color-orange)] hover:underline mt-1 font-bold">
                Lunch Voucher & Order Portal 🍱
              </a>
            </div>
          </div>

          {/* Group 3: Connect */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-orange)]">
              // Connect
            </span>
            <div className="flex items-center gap-4">
              {/* TODO: replace # with real URLs once supplied by organizer */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--color-ink-dim)] hover:text-[var(--color-orange)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] rounded p-1"
                aria-label="OSGuild on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--color-ink-dim)] hover:text-[var(--color-orange)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] rounded p-1"
                aria-label="OSGuild GitHub repository"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:info@osguild.org" 
                className="text-[var(--color-ink-dim)] hover:text-[var(--color-orange)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] rounded p-1"
                aria-label="Contact OSGuild via Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Group 4: Bottom row / info */}
          <div className="flex flex-col justify-between h-full md:items-end text-sm text-[var(--color-ink-dim)]">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-orange)] hidden md:block">
              // Status
            </div>
            <span className="font-mono text-xs md:text-right mt-2 md:mt-0 select-none">
              [SYSTEM_ONLINE]
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[var(--color-line)] text-xs text-[var(--color-ink-dim)] font-mono">
          <span>&copy; {currentYear} Genesis Workshop. All rights reserved.</span>
          <span className="mt-2 md:mt-0 text-[10px] tracking-wider uppercase opacity-50">
            FOSS guidelines applied
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
