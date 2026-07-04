import React from 'react';
import SectionHeading from './ui/SectionHeading';
import { speakers } from '../data/speakers';
import { Github, Twitter, Globe } from 'lucide-react';

const NostrIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path d="M9,2C7.9,2,7,2.9,7,4c0,0.6,0.3,1.1,0.7,1.4L6.1,10.7C5.3,10.9,4.7,11.6,4.7,12.5C4.7,13.9,5.8,15,7.2,15h1.2l-0.7,6.3c0,0.4,0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7l0.7-6.3h2.3l0.7,6.3c0,0.4,0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7l-0.7-6.3h0.6c1.4,0,2.5-1.1,2.5-2.5c0-0.9-0.6-1.6-1.4-2.1l-1.6-5.3C13.7,5.1,14,4.6,14,4C14,2.9,13.1,2,12,2H9z M12.5,4c0,0.3-0.2,0.5-0.5,0.5S11.5,4.3,11.5,4s0.2-0.5,0.5-0.5S12.5,3.7,12.5,4z" />
  </svg>
);

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
        <div className="flex flex-wrap justify-center gap-y-12 gap-x-12 max-w-5xl mx-auto">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="flex flex-col items-center text-center w-full max-w-[280px]">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mb-6 border border-[var(--color-line)] bg-[var(--color-bg-soft)] flex items-center justify-center select-none transition-transform duration-300 hover:scale-105">
                {speaker.image ? (
                  <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-2xl font-bold text-[var(--color-orange)]">
                    {getInitials(speaker.name)}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-1 text-[var(--color-ink)] font-heading">
                {speaker.name}
              </h3>
              
              <div className="text-sm text-[var(--color-ink-dim)] mb-4 min-h-[20px]">
                {speaker.role ? (
                  <>
                    {speaker.role}
                    {speaker.organization && ` @ ${speaker.organization}`}
                  </>
                ) : (
                  speaker.organization || ''
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {speaker.nostr && (
                  <a 
                    href={speaker.nostr} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#a855f7] hover:text-[#c084fc] transition-colors"
                    title={`${speaker.name} on Nostr`}
                  >
                    <NostrIcon className="w-5 h-5 fill-current" />
                  </a>
                )}
                {speaker.twitter && (
                  <a 
                    href={speaker.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[var(--color-ink-dim)] opacity-60 hover:opacity-100 hover:text-[var(--color-ink)] transition-all"
                    title={`${speaker.name} on Twitter`}
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {speaker.github && (
                  <a 
                    href={speaker.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[var(--color-ink-dim)] opacity-60 hover:opacity-100 hover:text-[var(--color-ink)] transition-all"
                    title={`${speaker.name} on GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {speaker.website && (
                  <a 
                    href={speaker.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[var(--color-ink-dim)] opacity-60 hover:opacity-100 hover:text-[var(--color-ink)] transition-all"
                    title={`${speaker.name}'s Website`}
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-12 border-dashed border-2 border-[var(--color-line)] rounded-lg bg-[var(--color-glass)]">
          <span className="font-mono text-sm text-[var(--color-ink-dim)] uppercase tracking-widest">
            More speakers coming soon
          </span>
        </div>
      )}
    </section>
  );
};

export default SpeakersSection;
