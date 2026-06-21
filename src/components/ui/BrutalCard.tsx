import React from 'react';

interface BrutalCardProps {
  as?: React.ElementType;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const BrutalCard: React.FC<BrutalCardProps> = ({
  as: Component = 'div',
  hover = true,
  className = '',
  children
}) => {
  const hoverClass = hover ? 'brutal-card-hover' : '';
  const Tag = Component as any;
  return (
    <Tag className={`brutal-card ${hoverClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default BrutalCard;
