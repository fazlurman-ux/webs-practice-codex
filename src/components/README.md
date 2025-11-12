# Components

Reusable React components following the project guidelines.

## Guidelines

- Use **named exports** only (no default exports)
- Write components as **functional components**
- Use **TypeScript** for all prop definitions
- Utilize **Tailwind CSS** for styling
- Keep components **focused and single-responsibility**
- Create sub-directories for component groups (e.g., `ui/`, `layouts/`)

## Structure Example

```
components/
├── ui/                    # Basic UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── layouts/               # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
├── sections/              # Page sections
│   └── Hero.tsx
└── 3d/                    # 3D-specific components
    └── Scene.tsx
```

## Example Component

```typescript
// components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## Best Practices

### Props Interface

Always define a TypeScript interface for component props:

```typescript
interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
  // ...
}
```

### Styling

- Prefer Tailwind CSS utility classes
- Use `className` prop for extensibility
- Avoid inline styles

### Performance

- Use `React.memo` for expensive renders
- Use `useCallback` for event handlers passed as props
- Lazy-load heavy components with `next/dynamic`

### Composition

- Split large components into smaller ones
- Use composition over prop drilling
- Consider state management (Valtio) for complex state

## Import Path Aliases

Use `@/components` for cleaner imports:

```typescript
// Good
import { Button } from '@/components/ui/Button';

// Avoid
import { Button } from '../../../components/ui/Button';
```
