import React from 'react';

interface GlassCardProps {
  as?: React.ElementType;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({
  as: Component = 'div',
  hover = true,
  className = '',
  children
}) => {
  const hoverClass = hover ? 'glass-card-hover' : '';
  const Tag = Component as any;
  return (
    <Tag className={`glass-card ${hoverClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default GlassCard;
