import React from 'react';
import SectionHeading from './ui/SectionHeading';
import SpotlightCard from './SpotlightCard';
import { topics } from '../data/topics';
import { GitBranch, Github, Sparkles, Eye, Bitcoin, Radio } from 'lucide-react';

const TopicsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const classes = "w-7 h-7 text-[var(--color-orange)]";
    switch (iconName) {
      case 'git-branch':
        return <GitBranch className={classes} aria-hidden="true" />;
      case 'github':
        return <Github className={classes} aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className={classes} aria-hidden="true" />;
      case 'eye':
        return <Eye className={classes} aria-hidden="true" />;
      case 'bitcoin':
        return <Bitcoin className={classes} aria-hidden="true" />;
      case 'radio':
        return <Radio className={classes} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section id="topics" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="topics covered" title="Topics Covered" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <SpotlightCard key={topic.id} className="flex flex-col items-start text-left h-full">
            <div className="mb-4">
              {getIcon(topic.icon)}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-ink)] font-heading">
              {topic.title}
            </h3>
            <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">
              {topic.description}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default TopicsSection;
