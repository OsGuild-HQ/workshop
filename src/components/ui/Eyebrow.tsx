import React from 'react';

interface EyebrowProps {
  text: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ text }) => {
  return (
    <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-orange)] select-none">
      // {text}
    </span>
  );
};

export default Eyebrow;
