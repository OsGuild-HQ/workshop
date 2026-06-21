import React from 'react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { speakers } from '../data/speakers';

const SpeakersSection: React.FC = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section id="speakers" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="speakers" title="Speakers" />
      
      {speakers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <GlassCard key={speaker.id} className="flex flex-col items-center text-center p-6 h-full">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[var(--color-line)] bg-[var(--color-bg-soft)] flex items-center justify-center select-none">
                {speaker.image ? (
                  <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-xl font-bold text-[var(--color-orange)]">
                    {getInitials(speaker.name)}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1 text-[var(--color-ink)] font-heading">
                {speaker.name}
              </h3>
              <div className="font-mono text-xs text-[var(--color-ink-dim)] uppercase tracking-wider mb-3">
                {speaker.role} @ {speaker.organization}
              </div>
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">
                {speaker.bio}
              </p>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <GlassCard hover={false} className="border-dashed border-2 border-[var(--color-line)] py-12 px-6 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-sm text-[var(--color-ink-dim)] uppercase tracking-widest">
              More speakers coming soon
            </span>
          </GlassCard>
        </div>
      )}
    </section>
  );
};

export default SpeakersSection;
