import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'dark';
}

export const Section: React.FC<SectionProps> = ({
  padding = 'md',
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const paddingClasses = {
    sm: 'section-padding-sm',
    md: 'section-padding',
    lg: 'section-padding-lg',
    xl: 'section-padding-xl',
  };

  const variants = {
    default: 'bg-dark-900',
    gradient: 'bg-gradient-dark',
    dark: 'bg-dark-950',
  };

  return (
    <section
      className={`${variants[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
