import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon' | 'depth';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-dark-800 border border-dark-700 rounded-lg',
    glass: 'glass rounded-lg',
    neon: 'glass-neon rounded-lg',
    depth: 'bg-dark-800 border border-dark-700 rounded-lg depth-lg',
  };

  return (
    <div
      className={`p-6 transition-base hover:depth-md ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
