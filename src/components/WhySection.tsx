import React from 'react';
import SectionHeading from './ui/SectionHeading';
import { whyCards } from '../data/whyCards';
import { Compass, Cpu, Users } from 'lucide-react';

const WhySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'compass':
        return <Compass className="w-8 h-8 text-[var(--color-orange)]" aria-hidden="true" />;
      case 'cpu':
        return <Cpu className="w-8 h-8 text-[var(--color-orange)]" aria-hidden="true" />;
      case 'users':
        return <Users className="w-8 h-8 text-[var(--color-orange)]" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section id="why-genesis" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="why genesis" title="Why Genesis Workshop?" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {whyCards.map((card) => (
          <div key={card.id} className="flex flex-col items-start text-left p-2">
            <div className="mb-4">
              {getIcon(card.icon)}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--color-ink)] font-heading">
              {card.title}
            </h3>
            <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
