import React from 'react';
import { ArrowLeft, Compass, Brain, Search, Code, MessageSquare, Terminal, Award, HelpCircle, Layers, CheckCircle } from 'lucide-react';

interface BlockQuestDetailsProps {
  isDarkBg: boolean;
}

const BlockQuestDetailsSection: React.FC<BlockQuestDetailsProps> = ({ isDarkBg }) => {
  const objectives = [
    {
      icon: <Compass className="w-5 h-5 text-[var(--color-orange)]" />,
      title: 'Explore',
      desc: 'Navigate a curated open-source repository.'
    },
    {
      icon: <Brain className="w-5 h-5 text-[var(--color-orange)]" />,
      title: 'Understand',
      desc: 'Deconstruct an assigned engineering challenge or issue.'
    },
    {
      icon: <Search className="w-5 h-5 text-[var(--color-orange)]" />,
      title: 'Investigate',
      desc: 'Perform root-cause analysis within the existing codebase.'
    },
    {
      icon: <Code className="w-5 h-5 text-[var(--color-orange)]" />,
      title: 'Implement',
      desc: 'Propose and execute a technical solution.'
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[var(--color-orange)]" />,
      title: 'Communicate',
      desc: 'Defend implementation choices during the review process.'
    }
  ];

  const phases = [
    {
      num: '01',
      title: 'Briefing',
      subtitle: 'Phase 1',
      desc: 'Participants are provided with a "Contribution Kit" containing: a forked open-source repository, detailed challenge documentation and technical brief, and specific issues to be resolved and governing rules.'
    },
    {
      num: '02',
      title: 'Investigation',
      subtitle: 'Phase 2',
      desc: 'This critical stage is part of the evaluation. Participants are expected to: read and map the project architecture, identify the underlying cause of the assigned issue, and engage with maintainers to clarify requirements.'
    },
    {
      num: '03',
      title: 'Contribution',
      subtitle: 'Phase 3',
      desc: 'Participants move to execution, submitting: a Pull Request that adheres to project standards, and a clear explanation of the solution logic and tradeoffs considered.'
    },
    {
      num: '04',
      title: 'Review',
      subtitle: 'Phase 4',
      desc: 'OSGuild maintainers conduct a rigorous review of every submission, focusing on code quality, simplicity, documentation, and Git practices.'
    }
  ];

  const criteria = [
    { label: 'Problem Understanding', weight: 30 },
    { label: 'Quality of Solution', weight: 30 },
    { label: 'Pull Request Quality', weight: 20 },
    { label: 'Code Readability', weight: 10 },
    { label: 'Review & Communication', weight: 10 }
  ];

  const prizes = [
    { rank: '🥇 1st Place', amount: 'MUR 5,000', color: 'border-yellow-500/30 bg-yellow-500/5' },
    { rank: '🥈 2nd Place', amount: 'MUR 3,000', color: 'border-slate-400/30 bg-slate-400/5' },
    { rank: '🥉 3rd Place', amount: 'MUR 2,000', color: 'border-amber-600/30 bg-amber-600/5' }
  ];

  return (
    <section 
      className="py-20 md:py-28 max-w-[1000px] mx-auto px-4 md:px-8 relative overflow-hidden flex flex-col justify-start min-h-[90vh] text-left"
      style={{
        '--color-ink': isDarkBg ? '#ffffff' : '#111827',
        '--color-ink-dim': isDarkBg ? '#8b949e' : '#4b5563',
        '--color-line': isDarkBg ? '#30363d' : '#e5e7eb',
        '--color-bg-soft': isDarkBg ? '#161b22' : '#f3f4f6',
        '--color-glass': isDarkBg ? '#000000' : '#ffffff',
        '--color-glass-strong': isDarkBg ? '#111111' : '#f3f4f6',
        color: isDarkBg ? '#ffffff' : '#111827'
      } as React.CSSProperties}
    >
      {/* Navigation */}
      <nav className="absolute left-0 top-0 z-50 flex w-full items-center justify-between p-4 md:p-8 font-mono">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
          className="flex items-center gap-2 border border-[var(--color-line)] bg-[var(--color-glass)] px-4 py-2 text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 rounded-lg font-mono font-bold uppercase tracking-wider text-xs cursor-pointer shadow-[2px_2px_0_0_var(--color-ink)]"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          <span>back to home</span>
        </a>
      </nav>

      {/* Header */}
      <div className="mt-8 mb-12 border-b border-[var(--color-line)] pb-8">
        <div className="flex items-center gap-3 text-[var(--color-orange)] mb-3">
          <Terminal size={32} />
          <span className="font-mono text-sm uppercase tracking-wider font-semibold">Technical Challenge</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-4">
          Block Quest
        </h1>
        <p className="text-lg text-[var(--color-ink-dim)] leading-relaxed font-mono">
          Navigate and contribute to existing Bitcoin and FOSS infrastructure.
        </p>
      </div>

      {/* Core Objectives */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-[var(--color-ink)]">
          <CheckCircle className="text-[var(--color-orange)]" size={24} />
          Core Objective
        </h2>
        <p className="text-sm md:text-base text-[var(--color-ink-dim)] mb-6 font-mono">
          To cultivate high-agency developers capable of navigating complex Bitcoin and FOSS infrastructure by mastering the following:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start p-4 rounded-lg bg-[var(--color-bg-soft)] border border-[var(--color-line)]">
              <div className="border border-[var(--color-line)] p-2 rounded-lg bg-[var(--color-glass)] flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base text-[var(--color-ink)] font-heading">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--color-ink-dim)] leading-relaxed mt-1 font-mono">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge Structure */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-[var(--color-ink)]">
          <Layers className="text-[var(--color-orange)]" size={24} />
          Challenge Structure
        </h2>
        <p className="text-sm md:text-base text-[var(--color-ink-dim)] mb-6 font-mono">
          The challenge is executed in four distinct phases designed to reward thoughtful engineering over speed.
        </p>
        <div className="relative border-l border-[var(--color-line)] ml-4 pl-8 space-y-8">
          {phases.map((phase, idx) => (
            <div key={idx} className="relative text-left">
              {/* Phase Dot Node */}
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-[var(--color-orange)] bg-[var(--color-glass)] z-10" />
              <span className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest block mb-1">
                {phase.subtitle}
              </span>
              <h3 className="text-xl font-bold font-heading text-[var(--color-ink)] mb-2">
                {phase.title}
              </h3>
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed font-mono">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Judging Criteria */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-[var(--color-ink)]">
          <HelpCircle className="text-[var(--color-orange)]" size={24} />
          Judging Criteria
        </h2>
        <p className="text-sm md:text-base text-[var(--color-ink-dim)] mb-6 font-mono">
          There is no score for writing the most code. Evaluation is based on the following weights:
        </p>
        <div className="space-y-4 max-w-xl bg-[var(--color-bg-soft)] border border-[var(--color-line)] p-6 rounded-xl">
          {criteria.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm font-semibold font-mono">
                <span className="text-[var(--color-ink)]">{item.label}</span>
                <span className="text-[var(--color-orange)]">{item.weight}%</span>
              </div>
              <div className="w-full h-2.5 bg-[var(--color-line)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--color-orange)] rounded-full" 
                  style={{ width: `${item.weight}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prize Pool */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-[var(--color-ink)]">
          <Award className="text-[var(--color-orange)]" size={24} />
          Prize Pool & Recognition
        </h2>
        <p className="text-sm md:text-base text-[var(--color-ink-dim)] mb-6 font-mono">
          The total prize pool is **MUR 10,000**, positioned as a reward for technical excellence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {prizes.map((prize, idx) => (
            <div 
              key={idx} 
              className={`border border-[var(--color-line)] p-5 rounded-xl text-center font-mono flex flex-col justify-center items-center shadow-sm ${prize.color}`}
            >
              <span className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider block mb-2">
                {prize.rank}
              </span>
              <span className="text-xl font-black text-[var(--color-orange)]">
                {prize.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockQuestDetailsSection;
