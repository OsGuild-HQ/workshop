import React from 'react';

interface CheckItemProps {
  label: string;
  className?: string;
}

const CheckItem: React.FC<CheckItemProps> = ({ label, className = '' }) => {
  return (
    <div className={`flex items-start gap-3 text-left ${className}`}>
      <div className="flex items-center justify-center w-5 h-5 mt-0.5 rounded bg-[var(--color-orange)] border-2 border-[var(--color-ink)] shrink-0 select-none">
        <svg
          className="w-3.5 h-3.5 text-[var(--color-ink)] stroke-[3]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-[1rem] text-[var(--color-ink)] font-medium leading-tight">
        {label}
      </span>
    </div>
  );
};

export default CheckItem;
