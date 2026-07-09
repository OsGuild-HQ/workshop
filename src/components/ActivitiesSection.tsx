import React from 'react';
import SectionHeading from './ui/SectionHeading';
import BlockQuestImg from '../assets/Block_Quest.png';
import osguildImg from '../assets/osguild.png';
import osguildWhiteImg from '../assets/Osguils-white.png';

interface ActivitiesSectionProps {
  isDarkBg: boolean;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ isDarkBg }) => {
  const hostLogo = isDarkBg ? osguildWhiteImg : osguildImg;
  const hostText = isDarkBg ? 'OSGuild-white' : 'OSGuild';

  return (
    <section id="activities" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="activities" title="Workshop Activities" />

      <div className="flex flex-col gap-20 mt-12">
        {/* Card 1: Block Quest */}
        <div 
          onClick={() => window.location.hash = '#block-quest'}
          className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch cursor-pointer hover:opacity-85 transition-opacity duration-200 group"
        >
          {/* Left Side: Big Image */}
          <div className="w-full md:w-[280px] lg:w-[340px] shrink-0 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={BlockQuestImg} 
              alt="Block Quest" 
              className="w-full h-full object-cover aspect-square group-hover:scale-102 transition-transform duration-300"
            />
          </div>

          {/* Right Side: Info & Details */}
          <div className="flex-grow flex flex-col justify-between text-left">
            <div>
              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold text-[var(--color-ink-dim)] mb-4">
                <span>Sat Jul 25 · 10:00 AM MUT - 5:00 PM MUT</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-dim)] opacity-40" />
                <span className="bg-[var(--color-glass-strong)] border border-[var(--color-line)] px-2.5 py-0.5 rounded-md text-[var(--color-orange)] font-bold">
                  Block Quest
                </span>
                <span className="bg-[var(--color-glass-strong)] border border-[var(--color-line)] px-2.5 py-0.5 rounded-md">
                  Open Source
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-[var(--color-ink)] mb-3">
                Block Quest
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed mb-6 font-mono">
                Block Quest is a technical challenge where participants experience the lifecycle of contributing to a real open-source project. Unlike traditional hackathons that focus on building new apps from scratch, Block Quest prioritizes investigation, technical reasoning, and the quality of contributions within existing codebases.
              </p>
            </div>

            {/* Footer with Host Info */}
            <div className="pt-4 mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={hostLogo} 
                  alt={hostText}
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
              <span className="font-mono text-xs font-semibold text-[var(--color-orange)] group-hover:underline flex items-center gap-1">
                Learn more about Block Quest →
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Base58 LARP Game */}
        <a 
          href="https://workshop.base58.school/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch cursor-pointer hover:opacity-85 transition-opacity duration-200 group no-underline text-inherit"
        >
          {/* Left Side: Styled Text Box instead of Image */}
          <div className="w-full md:w-[280px] lg:w-[340px] shrink-0 aspect-square flex items-center justify-center select-none">
            <span className="text-4xl font-bold font-mono text-[var(--color-ink)]">
              Base58⛓️🔓
            </span>
          </div>

          {/* Right Side: Info & Details */}
          <div className="flex-grow flex flex-col justify-between text-left">
            <div>
              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold text-[var(--color-ink-dim)] mb-4">
                <span>Sat Jul 25 · 1:30 PM MUT - 3:00 PM MUT</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-dim)] opacity-40" />
                <span className="bg-[var(--color-glass-strong)] border border-[var(--color-line)] px-2.5 py-0.5 rounded-md text-[var(--color-orange)] font-bold">
                  Consensus Game
                </span>
                <span className="bg-[var(--color-glass-strong)] border border-[var(--color-line)] px-2.5 py-0.5 rounded-md">
                  Interactive
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-[var(--color-ink)] mb-3">
                Base58 LARP Game
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed mb-6 font-mono">
                An interactive, live-action role-playing (LARP) game designed to deconstruct the mechanics of Bitcoin transactions, signatures, and blocks by acting out the consensus rules physically in real-time. Step into the shoes of the Bitcoin network.
              </p>
            </div>

            {/* Footer with Host Info */}
            <div className="pt-4 mt-6 flex items-center justify-between">
              <span className="text-1xl font-mono text-[var(--color-ink)]">
              Base58⛓️🔓
            </span>
              <span className="font-mono text-xs font-semibold text-[var(--color-orange)] group-hover:underline flex items-center gap-1">
                Learn more about Base58 →
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default ActivitiesSection;
