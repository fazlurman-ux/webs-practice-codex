# Utilities & Helpers

Utility functions, constants, and helper libraries used throughout the application.

## Structure

```
lib/
├── constants/          # Application constants
├── utils/              # Utility functions
├── types/              # Shared TypeScript types
└── api/                # API client utilities (if needed)
```

## Common Utilities

### Type Utilities

Define reusable types for your application:

```typescript
// lib/types/common.ts
export type Maybe<T> = T | null | undefined;
export type Awaitable<T> = T | Promise<T>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### Constants

Store application-wide constants:

```typescript
// lib/constants/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const DEFAULT_THEME = 'light';
export const ANIMATION_DURATION = 300;
```

### Formatting

Utility functions for common operations:

```typescript
// lib/utils/formatting.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}...` : text;
}

export function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

### Validation

Input validation helpers:

```typescript
// lib/utils/validation.ts
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### 3D Utilities

Helpers for Three.js and React Three Fiber:

```typescript
// lib/utils/three.ts
import { Vector3, Euler } from 'three';

export function createVector3(x = 0, y = 0, z = 0): Vector3 {
  return new Vector3(x, y, z);
}

export function createEuler(x = 0, y = 0, z = 0): Euler {
  return new Euler(x, y, z);
}

export function vectorToArray(vector: Vector3): [number, number, number] {
  return [vector.x, vector.y, vector.z];
}
```

## Import Path Aliases

Use `@/lib` for cleaner imports:

```typescript
import { formatDate } from '@/lib/utils/formatting';
import { isEmail } from '@/lib/utils/validation';
import type { Maybe } from '@/lib/types/common';
```

## Best Practices

1. **Pure Functions**: Keep utility functions pure and side-effect free
2. **Documentation**: Add JSDoc comments for complex functions
3. **Testing**: Utility functions should be well-tested
4. **Performance**: Avoid unnecessary computations
5. **Reusability**: Design utilities to be generic and flexible
6. **Organization**: Group related utilities together
