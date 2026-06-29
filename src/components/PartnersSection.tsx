import React from 'react';
import SectionHeading from './ui/SectionHeading';
import LogoLoop from './LogoLoop';
import { partners } from '../data/partners';

const PartnersSection: React.FC = () => {
  const logoItems = partners.map((partner) => {
    let content;
    if (partner.placeholder) {
      content = (
        <span className="text-base font-bold tracking-tight font-heading text-[var(--color-ink-dim)] opacity-60">
          Coming Soon
        </span>
      );
    } else if (partner.logo) {
      const isOsguild = partner.id === 'osguild';
      const logoClass = isOsguild 
        ? "h-16 md:h-20 max-w-full object-contain" 
        : "h-14 md:h-16 max-w-full object-contain";

      if (partner.logoDark) {
        content = (
          <>
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className={`partner-logo-light ${logoClass}`} 
            />
            <img 
              src={partner.logoDark} 
              alt={partner.name} 
              className={`partner-logo-dark ${logoClass}`} 
            />
          </>
        );
      } else {
        content = (
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className={logoClass} 
          />
        );
      }
    } else {
      content = (
        <span className="text-base font-bold tracking-tight font-heading text-[var(--color-ink)]">
          {partner.name}
        </span>
      );
    }

    return {
      node: (
        <div className="flex items-center justify-center select-none min-w-[150px] md:min-w-[200px] h-[90px]">
          {content}
        </div>
      )
    };
  });

  return (
    <section id="partners" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="community partners" title="Community Partners" />
      <div className="max-w-5xl mx-auto overflow-hidden">
        <LogoLoop
          logos={logoItems}
          speed={60}
          gap={48}
          logoHeight={90}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="var(--bg)"
        />
      </div>
    </section>
  );
};

export default PartnersSection;

