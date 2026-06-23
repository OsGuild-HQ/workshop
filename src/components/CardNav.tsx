import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export interface CardNavProps {
  logo: string;
  isDarkBg: boolean;
  toggleTheme: () => void;
  className?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  isDarkBg,
  toggleTheme,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Career Pathway', href: '#career-pathway' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Venue', href: '#details' }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset spacing for floating navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] z-[99] top-[1.2em] md:top-[2em] ${className}`}>
      <nav className="w-full bg-[var(--nav-bg)] border border-[var(--color-line)] backdrop-blur-xl rounded-2xl shadow-md px-6 py-3 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logo-container flex items-center">
            <span className="logo-text font-bold tracking-tight text-xl text-[var(--color-ink)] font-heading select-none">
              {logo}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-mono text-sm font-medium text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 cursor-pointer"
              aria-label={`Switch to ${isDarkBg ? 'light' : 'dark'} mode`}
            >
              {isDarkBg ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Get Started Button */}
            <a
              href="#cta"
              onClick={(e) => handleScroll(e, '#cta')}
              className="px-4 py-2 border-2 border-[var(--color-ink)] bg-[#34C759] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg shadow-[2px_2px_0_0_var(--color-ink)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0_0_var(--color-ink)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0_0_var(--color-ink)] transition-all duration-150 select-none text-center"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-colors cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (only theme toggle & get started) */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-[var(--color-line)] flex flex-col gap-4 md:hidden">
            {/* Theme Switcher Toggle Row */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-glass)] text-[var(--color-ink)] font-mono text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-[var(--color-glass-strong)] transition-all duration-200"
            >
              <span>{isDarkBg ? 'Light Mode' : 'Dark Mode'}</span>
              {isDarkBg ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Get Started CTA */}
            <a
              href="#cta"
              onClick={(e) => handleScroll(e, '#cta')}
              className="w-full py-3 border-2 border-[var(--color-ink)] bg-[#34C759] text-white font-mono text-sm font-bold uppercase tracking-wider rounded-xl shadow-[3px_3px_0_0_var(--color-ink)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_var(--color-ink)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[3px_3px_0_0_var(--color-ink)] transition-all duration-150 select-none text-center"
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};
export default CardNav;
