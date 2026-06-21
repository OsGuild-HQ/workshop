import React from 'react';

interface ButtonProps {
  as?: 'button' | 'a';
  href?: string;
  variant?: 'primary' | 'ghost';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  as: Component = 'button',
  href,
  variant = 'primary',
  onClick,
  className = '',
  children
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-mono text-[0.875rem] font-semibold uppercase tracking-[0.05em] py-3 px-6 rounded-md border-2 transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] focus-visible:outline-offset-2 select-none cursor-pointer';

  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_var(--color-ink)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[4px_4px_0_0_var(--color-ink)]'
      : 'bg-transparent text-[var(--color-ink)] border-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] hover:shadow-[0_2px_12px_rgba(247,147,26,0.15)]';

  if (Component === 'a') {
    return (
      <a href={href} onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
