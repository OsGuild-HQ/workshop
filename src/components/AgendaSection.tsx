import React, { useState } from 'react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { agendaData } from '../data/agenda';
import { Check } from 'lucide-react';

const AgendaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'day-1' | 'day-2'>('day-1');
  const track = agendaData[activeTab];

  return (
    <section id="agenda" className="py-16 md:py-24 max-w-[800px] mx-auto px-4 md:px-8 text-left">
      <SectionHeading eyebrow="agenda" title="Roadmap" intro="A look at our scheduled sessions and tracks." />

      {/* Tab Switcher */}
      <div className="flex justify-center gap-4 mb-16 font-mono text-sm">
        <button
          onClick={() => setActiveTab('day-1')}
          className={`px-5 py-2.5 rounded-md border-2 font-semibold transition-all duration-200 cursor-pointer select-none ${
            activeTab === 'day-1'
              ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[1px] -translate-y-[1px]'
              : 'bg-transparent text-[var(--color-ink-dim)] border-[var(--color-line)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]'
          }`}
        >
          Day 1
        </button>
        <button
          onClick={() => setActiveTab('day-2')}
          className={`px-5 py-2.5 rounded-md border-2 font-semibold transition-all duration-200 cursor-pointer select-none ${
            activeTab === 'day-2'
              ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[1px] -translate-y-[1px]'
              : 'bg-transparent text-[var(--color-ink-dim)] border-[var(--color-line)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]'
          }`}
        >
          Day 2
        </button>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative border-l border-[var(--color-line)] ml-4 md:ml-6 pl-8 md:pl-10 pb-8 flex flex-col gap-12">
        {track.slots.map((slot, index) => {
          // Node dot classes
          let dotColorClasses = 'border-[var(--color-line)] bg-[var(--color-bg-soft)]';
          let textColorClass = 'text-[var(--color-ink-dim)] opacity-60';

          if (slot.status === 'completed') {
            dotColorClasses = 'border-[var(--color-orange)] bg-[var(--color-orange)]';
            textColorClass = 'text-[var(--color-ink)]';
          } else if (slot.status === 'active') {
            dotColorClasses = 'border-[var(--color-orange)] bg-[var(--bg)]';
            textColorClass = 'text-[var(--color-ink)]';
          }

          return (
            <div key={index} className="relative flex flex-col gap-4 text-left">
              {/* Vertical line indicator node */}
              <div 
                className={`absolute -left-[41px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full border-4 ${dotColorClasses} z-10 transition-all duration-300`} 
              />

              {/* Slot Header */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold tracking-wide text-[var(--color-ink-dim)] bg-[var(--color-bg-soft)] px-2 py-0.5 rounded border border-[var(--color-line)]">
                  {slot.time}
                </span>
                <h3 className={`text-xl font-bold font-heading tracking-tight ${textColorClass}`}>
                  {slot.label}
                </h3>
                {slot.badge && (
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[rgba(52,199,89,0.12)] text-[var(--color-orange)] border border-[rgba(52,199,89,0.3)] select-none">
                    {slot.badge}
                  </span>
                )}
              </div>

              {/* Slot Details (Cards / Lists) */}
              {slot.details && slot.details.length > 0 && (
                <div className="flex flex-col gap-3 mt-2 w-full max-w-[620px]">
                  {slot.details.map((detail, dIdx) => {
                    if (detail.type === 'card') {
                      return (
                        <GlassCard key={dIdx} hover={false} className="flex flex-col items-start p-6 w-full border border-[var(--color-line)] shadow-sm relative overflow-hidden">
                          {detail.completed && (
                            <div className="absolute right-4 top-4 w-6 h-6 rounded-full bg-[rgba(52,199,89,0.12)] border border-[rgba(52,199,89,0.3)] flex items-center justify-center text-[var(--color-orange)]">
                              <Check size={14} className="stroke-[3]" />
                            </div>
                          )}
                          <div className="font-heading text-4xl font-bold tracking-tight text-[var(--color-ink)] mb-1">
                            {detail.number}
                          </div>
                          <span className="text-sm font-semibold text-[var(--color-ink-dim)]">
                            {detail.title}
                          </span>
                        </GlassCard>
                      );
                    }

                    // List items
                    return (
                      <div 
                        key={dIdx} 
                        className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-glass)] border border-[var(--color-line)] backdrop-blur-sm w-full"
                      >
                        <div className="flex items-center gap-3 text-sm font-medium text-[var(--color-ink)]">
                          <span className="text-base select-none">{detail.emoji}</span>
                          <span>{detail.title}</span>
                        </div>
                        {detail.completed && (
                          <Check size={16} className="text-[var(--color-orange)] stroke-[3]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AgendaSection;
