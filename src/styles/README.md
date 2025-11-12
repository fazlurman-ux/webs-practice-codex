# Styles

Global styles, CSS modules, and Tailwind CSS configuration.

## Structure

```
styles/
├── globals.css         # Global styles
├── variables.css       # CSS custom properties
├── animations.css      # Custom animations
└── [component].module.css  # Component-specific modules
```

## Tailwind CSS

This project uses **Tailwind CSS 4** with PostCSS.

### Configuration

- **tailwind.config.ts**: Main Tailwind configuration
- **postcss.config.mjs**: PostCSS configuration

### Utility-First Approach

```html
<!-- Use Tailwind utilities directly in components -->
<div
  className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md"
>
  <h1 className="text-2xl font-bold text-gray-900">Hello World</h1>
</div>
```

### CSS Modules

For component-specific styles:

```typescript
// components/Card.tsx
import styles from '@/styles/card.module.css';

export function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        Card content
      </div>
    </div>
  );
}
```

```css
/* styles/card.module.css */
.container {
  @apply rounded-lg shadow-md overflow-hidden;
}

.content {
  @apply p-4;
}
```

## Global Styles

Place application-wide styles in `globals.css`:

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base overrides */
@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-white text-gray-900;
  }
}

/* Custom components */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors;
  }
}
```

## CSS Variables

Define custom CSS variables in `variables.css`:

```css
/* styles/variables.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #ef4444;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```

## Animations

Custom animations in `animations.css`:

```css
/* styles/animations.css */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Best Practices

### Do's ✓

- Use Tailwind utilities for most styling
- Use CSS modules for scoped component styles
- Define reusable Tailwind components with `@layer`
- Use CSS custom properties for design tokens

### Don'ts ✗

- Avoid inline styles
- Don't mix Tailwind and inline CSS
- Avoid deeply nested selectors
- Don't override Tailwind utilities unnecessarily

## Dark Mode

Configure dark mode in Tailwind config:

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f5f5f5',
          900: '#111111',
        },
      },
    },
  },
};
```

Use dark mode classes:

```html
<div className="bg-white dark:bg-gray-900">
  Content that changes with dark mode
</div>
```

## Responsive Design

Use Tailwind's responsive prefixes:

```html
<div className="w-full md:w-1/2 lg:w-1/3">Responsive width</div>
```

Breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
