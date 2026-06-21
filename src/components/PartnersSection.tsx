import React from 'react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { partners } from '../data/partners';

const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="community partners" title="Community Partners" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
        {partners.map((partner) => {
          if (partner.placeholder) {
            return (
              <GlassCard
                key={partner.id}
                hover={false}
                className="border-dashed border-2 border-[var(--color-line)] bg-transparent flex flex-col items-center justify-center p-6 text-center min-h-[100px]"
              >
                <span className="font-mono text-xs text-[var(--color-ink-dim)] uppercase tracking-wider select-none">
                  Coming Soon
                </span>
              </GlassCard>
            );
          }

          return (
            <GlassCard
              key={partner.id}
              className="flex items-center justify-center p-6 text-center min-h-[100px]"
            >
              <span className="text-lg font-bold tracking-tight text-[var(--color-ink)] font-heading select-none">
                {partner.name}
              </span>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};

export default PartnersSection;
