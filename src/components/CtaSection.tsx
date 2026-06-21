import React from 'react';
import Button from './ui/Button';

const CtaSection: React.FC = () => {
  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden text-center max-w-[1180px] mx-auto px-4 md:px-8">
      {/* Subtle background glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-10 bg-[var(--color-orange)]"
        aria-hidden="true"
      />
      
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight text-[var(--color-ink)] font-heading mb-6">
          Start Your Open Source Journey
        </h2>
        <p className="text-[1.125rem] text-[var(--color-ink-dim)] leading-relaxed mb-10 max-w-[60ch]">
          Whether you're writing your first line of code or looking to contribute to larger projects, Genesis is designed to help you take the next step.
        </p>
        <Button variant="primary" as="a" href="#register">
          Register for Genesis
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
