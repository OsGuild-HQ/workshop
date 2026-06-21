import React from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  align?: 'center' | 'left';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, intro, className = '', align = 'center' }) => {
  const alignClasses = align === 'left' ? 'items-start text-left mx-0' : 'items-center text-center mx-auto';
  return (
    <div className={`flex flex-col mb-12 max-w-2xl px-4 ${alignClasses} ${className}`}>
      <Eyebrow text={eyebrow} />
      <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-[var(--color-ink)] font-heading">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-[1rem] text-[var(--color-ink-dim)] leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
