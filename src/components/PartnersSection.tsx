import React from 'react';
import SectionHeading from './ui/SectionHeading';
import LogoLoop from './LogoLoop';
import { partners } from '../data/partners';

const PartnersSection: React.FC = () => {
  const logoItems = partners.map((partner) => ({
    node: (
      <div className="px-8 py-4 border border-[var(--color-line)] rounded-lg bg-[var(--color-glass)] min-w-[200px] h-[60px] flex items-center justify-center select-none">
        <span className={`text-base font-bold tracking-tight font-heading ${partner.placeholder ? 'text-[var(--color-ink-dim)] opacity-60' : 'text-[var(--color-ink)]'}`}>
          {partner.placeholder ? "Coming Soon" : partner.name}
        </span>
      </div>
    )
  }));

  return (
    <section id="partners" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="community partners" title="Community Partners" />
      <div className="max-w-5xl mx-auto overflow-hidden">
        <LogoLoop
          logos={logoItems}
          speed={60}
          gap={32}
          logoHeight={60}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="var(--bg)"
        />
      </div>
    </section>
  );
};

export default PartnersSection;

