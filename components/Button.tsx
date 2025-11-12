import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'font-bold transition-base rounded-lg focus:outline-none';

  const variants = {
    primary: 'bg-dark-800 text-white border border-dark-700 hover:bg-dark-700 hover:depth-md active:depth-sm',
    secondary: 'bg-dark-900 text-neon-purple border border-neon-purple hover:shadow-neon-purple',
    ghost: 'text-neon-purple hover:bg-dark-800 border-0',
    neon: 'bg-gradient-neon-purple text-black font-bold border border-neon-purple hover:shadow-neon-purple hover:scale-105',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
