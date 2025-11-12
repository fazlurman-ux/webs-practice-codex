import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'purple' | 'lime' | 'cyan';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-dark-700 text-dark-100 border border-dark-600',
    purple: 'bg-neon-purple/20 text-neon-purple border border-neon-purple neon-border',
    lime: 'bg-neon-lime/20 text-neon-lime border border-neon-lime neon-border-lime',
    cyan: 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan neon-border-cyan',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
