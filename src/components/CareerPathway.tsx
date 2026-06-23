import React from 'react';
import SectionHeading from './ui/SectionHeading';
import { Flag, Terminal, Cpu, Award } from 'lucide-react';

interface PathwayStep {
  id: number;
  meta: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CareerPathway: React.FC = () => {
  const steps: PathwayStep[] = [
    {
      id: 1,
      meta: 'Start',
      title: 'Genesis Workshop',
      description: 'Kickstart your open source journey. Get hands-on mentorship, open-source workflow onboarding, and join the local developer community.',
      icon: <Flag className="w-6 h-6 text-[#34C759]" aria-hidden="true" />
    },
    {
      id: 2,
      meta: 'Cohort Training',
      title: 'OSGuild 6-Week Pathway',
      description: 'Deep dive into Bitcoin protocols, Rust development, FOSS guidelines, and collaborative code reviews under guidance from senior devs.',
      icon: <Terminal className="w-6 h-6 text-[var(--color-ink)]" aria-hidden="true" />
    },
    {
      id: 3,
      meta: 'Residency Phase',
      title: 'Btrust Builders Pathway',
      description: 'Advance your skills through localized builder programs, testing, and building production-grade core infrastructure tools.',
      icon: <Cpu className="w-6 h-6 text-[var(--color-ink)]" aria-hidden="true" />
    },
    {
      id: 4,
      meta: 'Funding & FOSS',
      title: 'Open Source Contribution',
      description: 'Reach the finish line. Secure full-time funding grants to work continuously on self-directed open-source contributions.',
      icon: <Award className="w-6 h-6 text-[#34C759]" aria-hidden="true" />
    }
  ];

  return (
    <section id="career-pathway" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="career pathway" title="Career Pathway" />

      {/* Desktop Horizontal Timeline */}
      <div className="hidden md:block relative w-full mt-8">
        {/* Connection Line */}
        <div 
          className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-[var(--color-line)] -translate-y-1/2" 
          aria-hidden="true"
        />

        <div className="grid grid-cols-4 gap-8">
          {steps.map((step) => {
            const isBound = step.id === 1 || step.id === steps.length;
            return (
              <div key={step.id} className="flex flex-col items-center text-center relative group">
                {/* Step Circle Node */}
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-[var(--color-bg-soft)] border-2 z-10 transition-all duration-300 ${
                    isBound 
                      ? 'border-[#34C759] shadow-[0_0_15px_rgba(52,199,89,0.2)]' 
                      : 'border-[var(--color-line)] group-hover:border-[var(--color-ink)]'
                  }`}
                >
                  {step.icon}
                </div>

                {/* Step Content */}
                <span className={`text-[10px] uppercase font-mono tracking-wider mt-6 font-semibold ${
                  isBound ? 'text-[#34C759]' : 'text-[var(--color-ink-dim)]'
                }`}>
                  {step.meta}
                </span>
                
                <h3 className="text-lg font-semibold mt-2 mb-3 text-[var(--color-ink)] font-heading">
                  {step.title}
                </h3>
                
                <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="block md:hidden relative pl-6 border-l-2 border-dashed border-[var(--color-line)] ml-4 mt-8 space-y-10">
        {steps.map((step) => {
          const isBound = step.id === 1 || step.id === steps.length;
          return (
            <div key={step.id} className="relative flex flex-col items-start">
              {/* Circle indicator aligned to the border */}
              <div 
                className={`absolute -left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--color-bg-soft)] border-2 transition-all duration-300 ${
                  isBound 
                    ? 'border-[#34C759] shadow-[0_0_10px_rgba(52,199,89,0.15)]' 
                    : 'border-[var(--color-line)]'
                }`}
              >
                {/* Render icon scaled down for mobile circle */}
                <div className="scale-75 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              {/* Step Content */}
              <span className={`text-[9px] uppercase font-mono tracking-wider font-semibold ${
                isBound ? 'text-[#34C759]' : 'text-[var(--color-ink-dim)]'
              }`}>
                {step.meta}
              </span>
              
              <h3 className="text-lg font-semibold mt-1 mb-2 text-[var(--color-ink)] font-heading">
                {step.title}
              </h3>
              
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CareerPathway;
