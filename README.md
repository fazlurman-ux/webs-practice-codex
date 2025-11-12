# Next.js 14 3D Graphics Application

A modern Next.js 14 project with TypeScript, App Router, Tailwind CSS, and 3D graphics capabilities using Three.js.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4 + PostCSS
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animation**: Framer Motion
- **State Management**: Valtio
- **Analytics**: Vercel Analytics
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Font Loading**: Next.js optimized fonts

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and helpers
├── styles/          # Global styles and CSS modules
└── assets/
    ├── models/      # 3D model files (.glb, .gltf)
    └── textures/    # Texture files for 3D models

public/
├── fonts/           # Custom font files
└── [assets]/        # Static assets

```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Run type checking
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Preview on Vercel
npm run preview

# Model optimization (placeholder)
npm run optimize:models
```

## Configuration

### TypeScript Path Aliases

Path aliases are configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Use aliases for cleaner imports:

```typescript
// Instead of: import { Button } from '../../../components/ui/Button'
import { Button } from '@/components/ui/Button';
```

### ESLint & Prettier

- **ESLint**: Configured with Next.js + TypeScript presets
- **Rules**:
  - No default exports for components
  - Organized import statements
  - React display name warnings
  - TypeScript strict checking

- **Prettier**: Automatic code formatting
  - 2-space indentation
  - Single quotes
  - 80-character line width
  - Trailing commas in ES5

### Git Hooks (Husky)

Pre-commit hooks run lint-staged to ensure code quality:

```bash
# Automatically runs on commit
npx lint-staged

# Staged files are:
# 1. Linted with ESLint
# 2. Fixed if possible
# 3. Formatted with Prettier
```

## Dependencies

### Core Dependencies

- `react@^18.2.0` - React library
- `react-dom@^18.2.0` - React DOM bindings
- `next@^14.0.0` - Next.js framework

### 3D Graphics & Animation

- `three@^0.160.0` - 3D graphics library
- `@react-three/fiber@^8.14.0` - React renderer for Three.js
- `@react-three/drei@^9.88.0` - Helper components for R3F
- `framer-motion@^10.16.0` - Animation library

### Utilities

- `valtio@^1.13.0` - Minimal state helper
- `@vercel/analytics@^1.1.0` - Vercel analytics

### Development Dependencies

- `typescript@^5` - TypeScript compiler
- `eslint@^8` - Linter
- `eslint-config-next@^14.0.0` - Next.js ESLint config
- `eslint-plugin-import@^2` - Import sorting plugin
- `prettier@^3.1.0` - Code formatter
- `husky@^8.0.0` - Git hooks manager
- `lint-staged@^15.1.0` - Run linters on staged files
- `@tailwindcss/postcss@^4` - Tailwind CSS with PostCSS v8
- `tailwindcss@^4` - Utility-first CSS framework
- `@types/*` - TypeScript type definitions

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `start` | Start production server |
| `lint` | Run ESLint |
| `lint:fix` | Run ESLint with auto-fix |
| `format` | Format code with Prettier |
| `format:check` | Check formatting without changes |
| `type-check` | Run TypeScript type checking |
| `optimize:models` | Optimize 3D models (placeholder) |
| `preview` | Deploy preview to Vercel |

## Component Guidelines

### Do's ✓
- Use functional components
- Export named exports (not default)
- Use TypeScript for type safety
- Keep components small and focused
- Use Tailwind CSS for styling
- Document complex components

### Don'ts ✗
- Avoid default exports (enforced by ESLint)
- Don't use inline styles
- Avoid prop drilling (consider Valtio for state)
- Don't create large monolithic components

## Examples

### Creating a Component

```typescript
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Using 3D Graphics with React Three Fiber

```typescript
// src/components/Scene.tsx
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/example.glb');
  return <primitive object={scene} />;
}

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Model />
    </Canvas>
  );
}
```

## Performance Tips

1. Use dynamic imports for heavy components
2. Optimize images with Next.js Image component
3. Lazy-load 3D models
4. Use React.memo for expensive renders
5. Profile with React DevTools
6. Use Code Splitting for large dependencies

## Troubleshooting

### Dependencies Issues
If you encounter dependency conflicts:
```bash
rm -rf node_modules package-lock.json
npm install
```

### ESLint Errors
Fix ESLint errors automatically:
```bash
npm run lint:fix
```

### Port Already in Use
```bash
npm run dev -- -p 3001
```

## Deployment

The project is configured for deployment on Vercel:

```bash
npm run preview
```

Or connect your repository directly to Vercel for automatic deployments.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Contributing

1. Create a feature branch from `main`
2. Make your changes and commit with meaningful messages
3. Ensure linting passes: `npm run lint`
4. Submit a pull request

## License

This project is private and proprietary.
