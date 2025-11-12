import React, { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  sectionSpacing?: 'sm' | 'md' | 'lg' | 'xl';
  scrollSnapping?: boolean;
  fullHeight?: boolean;
  className?: string;
}

const spacingMap = {
  sm: 'space-y-4',
  md: 'space-y-8',
  lg: 'space-y-12',
  xl: 'space-y-16',
};

export function PageWrapper({
  children,
  sectionSpacing = 'lg',
  scrollSnapping = false,
  fullHeight = false,
  className = '',
}: PageWrapperProps) {
  const baseClasses = 'w-full transition-colors duration-300';
  const spacingClasses = spacingMap[sectionSpacing];
  const snapClass = scrollSnapping ? 'snap-y snap-mandatory' : '';
  const heightClass = fullHeight ? 'min-h-screen' : '';

  return (
    <div
      className={`${baseClasses} ${spacingClasses} ${snapClass} ${heightClass} ${className}`.trim()}
      style={{
        scrollSnapType: scrollSnapping ? 'y mandatory' : undefined,
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<{ className?: string }>(child)) {
          const currentClass = child.props.className || '';
          const newClass = scrollSnapping
            ? `${currentClass} snap-start`.trim()
            : currentClass;
          return React.cloneElement(child, { className: newClass });
        }
        return child;
      })}
    </div>
  );
}
